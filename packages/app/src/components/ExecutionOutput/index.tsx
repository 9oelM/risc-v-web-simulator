import { useTheme } from "@emotion/react"
import React, { useEffect, useRef, useState } from "react"
import { FC } from "react"
import { enhance } from "../../utilities/essentials"
import { ExecutionOutputFallback } from "./fallback"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

// import fibWasmPromise from "@risc-v-web-simulator/ExecutionOutput-wasm"

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExecutionOutputImpureProps = {
  executionOutput: string | null
}

export const ExecutionOutputImpure: FC<ExecutionOutputImpureProps> =
  enhance<ExecutionOutputImpureProps>(({ executionOutput }) => {
    const [animate, setAnimate] = useState(false)
    const isFirstMount = useRef(true)
    const timeout = useRef<null | number>(null)
    useEffect(() => {
      if (isFirstMount.current) {
        isFirstMount.current = false
        return
      }
      if (timeout.current) window.clearTimeout(timeout.current)
      setAnimate((prev) => !prev)
      timeout.current = window.setTimeout(() => {
        setAnimate(false)
      }, 1_000)
    }, [executionOutput])

    return (
      <ExecutionOutputPure
        {...{
          executionOutput,
          animate,
        }}
      />
    )
  })(ExecutionOutputFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExecutionOutputPureProps = {
  executionOutput: string | null
  animate: boolean
}

export const ExecutionOutputPure: FC<ExecutionOutputPureProps> =
  enhance<ExecutionOutputPureProps>(({ executionOutput, animate }) => {
    const theme = useTheme()

    return (
      <section
        css={{
          padding: `0 0 0 0.5rem`,
          width: `100%`,
          height: `100%`,
        }}
      >
        <Tabs>
          <TabList>
            <Tab>Latest execution output</Tab>
          </TabList>
          <TabPanel>
            <pre
              css={{
                border: animate
                  ? `2px solid rgb(61, 225, 61)`
                  : `2px solid ${theme.background}`,
                background: theme.background,
                borderRadius: `0.3rem`,
                padding: `0.5rem`,
                overflowY: `scroll`,
                height: `calc(100% - 0.5rem)`,
                // counterbalances padding from <section> and <pre>
                width: `calc(100% - 1.5rem)`,
                // background: theme.background,
                color: theme.text,
                fontSize: `0.85rem`,
                whiteSpace: `pre-wrap`,
                transition: animate ? `none` : `all 1.5s ease-out`,
              }}
            >
              {executionOutput ??
                `Execution output will appear here once you run the code.`}
            </pre>
          </TabPanel>
        </Tabs>
      </section>
    )
  })(ExecutionOutputFallback)
