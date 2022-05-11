import { useTheme } from "@emotion/react"
import React, { useEffect } from "react"
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
  enhance<ExecutionOutputImpureProps>(({ ...rest }) => {
    return (
      <ExecutionOutputPure
        {...{
          ...rest,
        }}
      />
    )
  })(ExecutionOutputFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExecutionOutputPureProps = {
  executionOutput: string | null
}

export const ExecutionOutputPure: FC<ExecutionOutputPureProps> =
  enhance<ExecutionOutputPureProps>(({ executionOutput }) => {
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
                overflowY: `scroll`,
                height: `100%`,
                width: `100%`,
                background: theme.background,
                color: theme.text,
                fontSize: `0.85rem`,
                whiteSpace: `pre-wrap`,
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
