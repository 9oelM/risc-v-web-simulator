import React, { useEffect, useState } from "react"
import { FC } from "react"
import { enhance } from "../../utilities/essentials"
import { ExampleFallback } from "./fallback"
import fibWasmPromise from "@emscripten-cplusplus-webpack-example/example-wasm"

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExampleImpureProps = {}

export const ExampleImpure: FC<ExampleImpureProps> =
  enhance<ExampleImpureProps>(() => {
    const [fibResult, setFibResult] = useState<null | number>(null)

    useEffect(() => {
      async function loadAndRunFibWasm() {
        const fibWasm = await fibWasmPromise
        setFibResult(fibWasm._fib(20))
      }
      loadAndRunFibWasm()
    }, [])

    return (
      <ExamplePure
        {...{
          fibResult,
        }}
      />
    )
  })(ExampleFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExamplePureProps = {
  fibResult: number | null
}

export const ExamplePure: FC<ExamplePureProps> = enhance<ExamplePureProps>(
  ({ fibResult }) => (
    <div>
      <h1>
        Step-by-step guide on compiling C++ codes with Emscripten into wasm and
        using it with Webpack + Typescript + React setup
      </h1>
      <h2>
        Instructions at{` `}
        <a href="https://github.com/9oelM/emscripten-cplusplus-webpack-example">
          https://github.com/9oelM/emscripten-cplusplus-webpack-example
        </a>
      </h2>
      {(() => {
        switch (fibResult) {
          case null: {
            return <p>fib(20): loading</p>
          }
          default: {
            return <p>fib(20): {fibResult}. it works!!</p>
          }
        }
      })()}
    </div>
  )
)(ExampleFallback)
