package controllers

import (
	"fmt"
	"log"
	"net/http"
	"net/mail"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"techytechster.com/rockapi/models"
)

var SessionSecret string

type RegisterUserPayload struct {
	Username        *string `json:"username" form:"username" query:"username"`
	Email           *string `json:"email" form:"email" query:"email"`
	Password        *string `json:"password" form:"password" query:"password"`
	ConfirmPassword *string `json:"confirmpassword" form:"confirmpassword" query:"confirmpassword"`
}
type LoginPayload struct {
	Identity   *string `json:"identity" form:"identity" query:"identity"`
	Password   *string `json:"password" form:"password" query:"password"`
	RememberMe bool    `json:"rememberme" form:"rememberme" query:"rememberme"`
}
type TokenClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func UserRoutes(e *echo.Echo) {
	log.Println("🚀 /api/v1/user - POST - Register A User")
	log.Println("🚀 /api/v1/login - POST - Login As User")
	log.Println("🚀 /api/v1/logout - GET - Logout As User")
	log.Println("🚀 /api/v1/loggedin - GET - Check If Logged In")
	e.POST("/api/v1/user", registerUser())
	e.POST("/api/v1/login", loginUser())
	e.GET("/api/v1/loggedin", checkLogin())
	e.GET("/api/v1/logout", logout())
}

func PrivateUserRoutes(e *echo.Group) {
	log.Println("🔒 /api/v1/user - GET - See My Details")
	e.GET("/api/v1/user", myDetails())
}

func checkHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func myDetails() echo.HandlerFunc {
	return func(c echo.Context) error {
		u := models.User{}
		user := c.Get("user").(*jwt.Token)
		username := user.Claims.(*TokenClaims).Username
		db.Where("username ILIKE ? OR email ILIKE ?", username, username).First(&u)
		return c.JSON(http.StatusOK, map[string]interface{}{
			"username": u.Username,
		})
	}
}

func checkLogin() echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, err := session.Get("session", c)
		username := sess.Values["username"]
		if username != nil {
			if err != nil {
				return c.JSON(http.StatusOK, map[string]interface{}{
					"loggedIn": false,
				})
			} else {
				username := sess.Values["username"]
				return c.JSON(http.StatusOK, map[string]interface{}{
					"loggedIn": true,
					"msg":      fmt.Sprintf("you are logged in %s", username),
				})
			}
		} else {
			return c.JSON(http.StatusOK, map[string]interface{}{
				"loggedIn": false,
			})
		}
	}
}

func logout() echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, _ := session.Get("session", c)
		sess.Options = &sessions.Options{
			Path:     "/",
			MaxAge:   -1,
			HttpOnly: true,
			Secure:   false,
		}
		sess.Values = nil
		sess.Save(c.Request(), c.Response())
		return c.JSON(http.StatusOK, map[string]interface{}{
			"msg": "bye user",
		})
	}
}

func loginUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		payload := new(LoginPayload)
		if err := c.Bind(payload); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": err.Error(),
			})
		}
		if payload.Identity == nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "identity is empty, please use email/username",
			})
		}
		if payload.Password == nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "password is empty",
			})
		}
		var user models.User
		res := db.Where("username ILIKE ? OR email ILIKE ?", payload.Identity, payload.Identity).First(&user)
		if res.Error != nil {
			return c.JSON(http.StatusBadRequest, map[string]interface{}{
				"error": "invalid username/password",
			})
		}
		if checkHash(*payload.Password, user.Password) {
			if payload.RememberMe {
				sess, _ := session.Get("session", c)
				sess.Options = &sessions.Options{
					Path:     "/",
					MaxAge:   86400 * 7,
					HttpOnly: true,
					Secure:   false,
				}
				sess.Values["username"] = user.Username
				sess.Save(c.Request(), c.Response()) // TODO: Investigate using sessions & JWT
				accessToken, refreshToken, terr := TokenPair(user.Username)
				if terr != nil {
					return c.JSON(http.StatusOK, map[string]interface{}{
						"error": terr.Error(),
					})
				}
				return c.JSON(http.StatusOK, map[string]interface{}{ // return access refresh anyway :/
					"access":  accessToken,
					"refresh": refreshToken,
				})
				// return c.JSON(http.StatusOK, map[string]interface{}{
				// 	"success": true,
				// })
			} else {
				accessToken, refreshToken, terr := TokenPair(user.Username)
				if terr != nil {
					return c.JSON(http.StatusOK, map[string]interface{}{
						"error": terr.Error(),
					})
				}
				return c.JSON(http.StatusOK, map[string]interface{}{
					"access":  accessToken,
					"refresh": refreshToken,
				})
			}
		} else {
			return c.JSON(http.StatusUnauthorized, map[string]interface{}{
				"error": "bad password/identity",
			})
		}
	}
}

func registerUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		payload := new(RegisterUserPayload)
		if err := c.Bind(payload); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": err.Error(),
			})
		}
		if payload.Username == nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "username is missing",
			})
		}
		if payload.Password == nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "password is missing",
			})
		}
		if payload.ConfirmPassword == nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "confirmpassword is missing",
			})
		}
		if *payload.Password != *payload.ConfirmPassword {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "passwords do not match",
			})
		}
		if payload.Email != nil {
			_, err := mail.ParseAddress(*payload.Email)
			if err != nil {
				return c.JSON(http.StatusBadRequest, map[string]interface{}{
					"error": fmt.Sprintf("bad email: %s, ", err.Error()),
				})
			}
		}
		u, err := models.CreateUser(*payload.Username, payload.Email, *payload.Password)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]interface{}{
				"error": err.Error(),
			})
		}
		var users []models.User
		var res *gorm.DB
		if payload.Email != nil {
			db.Where("username ILIKE ? OR email ILIKE ?", payload.Username, payload.Email).Find(&users)
		} else {
			db.Where("username ILIKE ?", payload.Username).Find(&users)
		}
		if len(users) > 0 {
			return c.JSON(http.StatusInternalServerError, map[string]interface{}{
				"error": "username or email (if supplied) already taken",
			})
		}
		res = db.Create(&u)
		if res.Error != nil {
			log.Println("Database Error - ", res.Error.Error())
			return c.JSON(http.StatusInternalServerError, map[string]interface{}{
				"error": res.Error.Error(),
			})
		}
		return c.JSON(http.StatusOK, map[string]interface{}{
			"username": u.Username,
			"email":    u.Email,
		})
	}
}
