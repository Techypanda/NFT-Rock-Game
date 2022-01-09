package controllers

import (
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

var AccessTokenSecret string
var RefreshTokenSecret string

// Access Token expires in 15 minutes, signed with access token secret
// Refresh token expires in 24 hours, signed with refresh token secret
func TokenPair(username string) (string, string, error) {
	claims := &TokenClaims{
		username,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * 15).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	accessToken, err := token.SignedString([]byte(AccessTokenSecret))
	if err != nil {
		return "", "", err
	}
	claims = &TokenClaims{
		username,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}
	token = jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	refreshToken, err := token.SignedString([]byte(RefreshTokenSecret))
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, err
}

func exchangeTokens() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		username := user.Claims.(*TokenClaims).Username
		accessToken, refreshToken, err := TokenPair(username)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]interface{}{
				"error": "bad refresh",
			})
		} else {
			return c.JSON(http.StatusOK, map[string]interface{}{
				"access":  accessToken,
				"refresh": refreshToken,
			})
		}
	}
}

func TokenPrivateRoutes(e *echo.Group) {
	log.Println("🔒 /api/v1/refresh - POST - Retrieve new token pair given refresh")
	e.POST("/api/v1/refresh", exchangeTokens())
}
