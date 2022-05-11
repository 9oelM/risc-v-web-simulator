import { KiteWasm } from "@risc-v-web-simulator/kite"
import React, { useCallback, useEffect } from "react"
import { FC } from "react"
import { enhance } from "../../utilities/essentials"
import { EditorFallback } from "./fallback"
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react"
import { ExecutionOutputImpure } from "../ExecutionOutput"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import {
  memory_state,
  program_code,
  reg_state,
} from "../../constants/constants"
import { EditorRootPureProps } from "../EditorRoot"
import { RunButtonImpure } from "../RunButton"
import { useStateWithMemoizedCallback } from "../../hooks/useMemoizedCbState"
import { EditorHeaderPure } from "./localFragments/EditorHeader"

// eslint-disable-next-line @typescript-eslint/ban-types
export type EditorImpureProps = Omit<EditorRootPureProps, `wasmRequestStatus`>

export const EditorImpure: FC<EditorImpureProps> = enhance<EditorImpureProps>(
  ({ setRegisterState, setCodeState, setMemoryState, ...rest }) => {
    const onRegisterStateChange: React.ChangeEventHandler<HTMLTextAreaElement> =
      useCallback(
        ({ target }) => {
          setRegisterState(target.value)
        },
        [setRegisterState]
      )
    const onCodeStateChange: React.ChangeEventHandler<HTMLTextAreaElement> =
      useCallback(
        ({ target }) => {
          setCodeState(target.value)
        },
        [setRegisterState]
      )
    const onMemoryStateChange: React.ChangeEventHandler<HTMLTextAreaElement> =
      useCallback(
        ({ target }) => {
          setMemoryState(target.value)
        },
        [setRegisterState]
      )
    const [executionOutput, setExecutionOutput] = useStateWithMemoizedCallback<
      null | string
    >(null)

    return (
      <EditorPure
        {...{
          ...rest,
          onCodeStateChange,
          onMemoryStateChange,
          onRegisterStateChange,
          executionOutput,
          setExecutionOutput,
        }}
      />
    )
  }
)(EditorFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type EditorPureProps = Omit<
  EditorImpureProps,
  `setMemoryState` | `setCodeState` | `setRegisterState`
> & {
  onCodeStateChange: React.ChangeEventHandler<HTMLTextAreaElement>
  onMemoryStateChange: React.ChangeEventHandler<HTMLTextAreaElement>
  onRegisterStateChange: React.ChangeEventHandler<HTMLTextAreaElement>
  executionOutput: string | null
  setExecutionOutput: React.Dispatch<React.SetStateAction<string | null>>
}

export const EditorPure: FC<EditorPureProps> = enhance<EditorPureProps>(
  ({
    codeState,
    registerState,
    memoryState,
    onCodeStateChange,
    onMemoryStateChange,
    onRegisterStateChange,
    kiteWasmRequestResult,
    executionOutput,
    setExecutionOutput,
  }) => {
    const theme = useTheme()
    return (
      <main
        css={{
          display: `flex`,
          flexDirection: `column`,
          width: `100%`,
          height: `100%`,
          background: theme.background,
        }}
      >
        <RunButtonImpure
          {...{
            codeState,
            registerState,
            memoryState,
            setExecutionOutput,
            kiteWasmRequestResult,
          }}
        />
        <EditorHeaderPure />
        <div
          css={{
            display: `flex`,
            width: `100%`,
            height: `calc(100% - 2rem)`,
            background: theme.background,
          }}
        >
          <section
            css={{
              display: `flex`,
              width: `60%`,
              height: `100%`,
              background: theme.background,
            }}
          >
            <Tabs>
              <TabList>
                <Tab>Code</Tab>
                <Tab>Memory</Tab>
                <Tab>Register</Tab>
              </TabList>
              <TabPanel>
                <textarea
                  value={codeState}
                  onChange={onCodeStateChange}
                  spellCheck={false}
                  css={{
                    overflowY: `scroll`,
                    height: `100%`,
                    width: `100%`,
                    background: theme.background,
                    color: theme.text,
                  }}
                ></textarea>
              </TabPanel>
              <TabPanel>
                <textarea
                  value={memoryState}
                  onChange={onMemoryStateChange}
                  spellCheck={false}
                  css={{
                    overflowY: `scroll`,
                    height: `100%`,
                    width: `100%`,
                    background: theme.background,
                    color: theme.text,
                  }}
                ></textarea>
              </TabPanel>
              <TabPanel>
                <textarea
                  value={registerState}
                  onChange={onRegisterStateChange}
                  spellCheck={false}
                  css={{
                    overflowY: `scroll`,
                    height: `100%`,
                    width: `100%`,
                    background: theme.background,
                    color: theme.text,
                  }}
                >
                  {reg_state}
                </textarea>
              </TabPanel>
            </Tabs>
          </section>
          <section
            css={{
              display: `flex`,
              width: `40%`,
              height: `calc(100% - 2rem)`,
              background: theme.background,
              borderLeft: `1px solid ${theme.buttonBorder}`,
            }}
          >
            <ExecutionOutputImpure
              {...{
                executionOutput,
              }}
            />
          </section>
        </div>
      </main>
    )
  }
)(EditorFallback)
