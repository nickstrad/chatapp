package trace

import (
  "fmt"
  "io"
)

type Tracer interface {
  Trace(...interface{})
}


type tracer struct {
  out io.Writer
}

func (t *tracer) Trace(a ...interface{}) {
  //Place formatted string into tracer
  fmt.Fprint(t.out, a...)

  //Print tracer output into stdlog
  fmt.Fprintln(t.out)
}

func New(w io.Writer) Tracer {
  return &tracer{ out: w }
}

