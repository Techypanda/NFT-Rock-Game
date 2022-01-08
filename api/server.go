package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"hb": "i am sentient",
		})
	})
	port, exists := os.LookupEnv("PORT")
	if exists {
		e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
	} else {
		e.Logger.Fatal(e.Start(":1323"))
	}
}
