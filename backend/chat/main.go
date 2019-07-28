package main

import (
  "os"
  "fmt"
  "log"
  "net/http"
)

func main() {

  r := newRoom()
  r.tracer = trace.New(os.Stdout)

  fs := http.FileServer(http.Dir("build"))
  http.Handle("/", fs)
  http.HandleFunc("/room", r.ServeHTTP)

  go r.run()

  //Start server
  host := os.Getenv("HOST")
  port := os.Getenv("PORT")

  if host == "" {
    host = "localhost"
  }

  if port == "" {
    port = "3001"
  }

  uri := fmt.Sprintf("%s:%s", host, port)

  fmt.Println("starting server on ", uri)
  if err := http.ListenAndServe(uri, nil); err != nil {
    log.Fatal("ListenAndServe:", err)
  }
}
