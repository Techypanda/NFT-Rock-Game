package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"techytechster.com/rockapi/controllers"
)

func generateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}
	return b, nil
}

func generateSecret(s int) (string, error) {
	b, err := generateRandomBytes(s)
	return base64.URLEncoding.EncodeToString(b), err
}

func main() {
	var err error
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8000", "http://localhost"},
		AllowMethods:     []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		AllowCredentials: true,
	}))
	// e.Use(controllers.RockAPICors())
	controllers.SessionSecret, err = generateSecret(128)
	e.Use(session.Middleware(sessions.NewCookieStore([]byte(controllers.SessionSecret))))
	restricted := e.Group("")
	restricted.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(controllers.SessionSecret),
		Claims:     &controllers.TokenClaims{},
	}))
	// Routes
	controllers.UserRoutes(e)
	controllers.PrivateUserRoutes(restricted)
	// Initialization
	if err != nil {
		log.Println("Failed To Generate A Secret For Sessions: ", err.Error())
	} else {
		log.Println("Generated Secret For Sessions: ", controllers.SessionSecret)
		if err = controllers.InitializeDatabase(); err != nil {
			log.Printf("Failed to setup database: %s\n", err.Error())
		} else {
			port, exists := os.LookupEnv("PORT")
			if exists {
				e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
			} else {
				e.Logger.Fatal(e.Start(":1323"))
			}
		}
	}
}
