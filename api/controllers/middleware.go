package controllers

import (
	"fmt"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RockAPICors() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			origins, found := os.LookupEnv("ORIGINS")
			if found {
				c.Echo().Use(middleware.CORSWithConfig(middleware.CORSConfig{
					AllowOrigins: strings.Split(origins, ","),
					AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
				}))
				return next(c)
			} else {
				fmt.Println("Please Define ORIGINS In Environment")
				return c.Echo().Close()
			}
		}
	}
}
