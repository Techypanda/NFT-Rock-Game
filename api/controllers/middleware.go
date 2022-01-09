package controllers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RockAPICors() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			origins, found := os.LookupEnv("ORIGINS")
			fmt.Println(origins)
			if found {
				c.Echo().Use(middleware.CORSWithConfig(middleware.CORSConfig{
					AllowOrigins: []string{"http://localhost:8000", "http://localhost:3000"}, // strings.Split(origins, ","),
					AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
					AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
				}))
				return next(c)
			} else {
				fmt.Println("Please Define ORIGINS In Environment")
				return c.Echo().Close()
			}
		}
	}
}
