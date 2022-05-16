import React, { Suspense, useCallback } from "react"
import { FC } from "react"
import { enhance } from "../../utilities/essentials"
import { EditorFallback } from "./fallback"
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react"
import { ExecutionOutputImpure } from "../ExecutionOutput"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { EditorRootPureProps } from "../EditorRoot"
import { RunButtonImpure } from "../RunButton"
import { useStateWithMemoizedCallback } from "../../hooks/useStateWithMemoizedCallback"
import { EditorHeaderPure } from "./localFragments/EditorHeader"
import { ErrorBoundary } from "../Util/WithErrorBoundary"
import { WHFullLoadingAnimation } from "../Util/WHFullLoadingAnimation"
import { RVSConstants } from "../../constants"
import { copyToClipboard2 } from "../../utilities/clipboard"
import { SharePanelImpure } from "./localFragments/SharePanel"

const SettingsPanelImpure = React.lazy(() =>
  import(`./localFragments/SettingsPanel`).then(({ SettingsPanelImpure }) => ({
    default: SettingsPanelImpure,
  }))
)

const ExamplesPanelImpure = React.lazy(() =>
  import(`./localFragments/ExamplesPanel`).then(({ ExamplesPanelImpure }) => ({
    default: ExamplesPanelImpure,
  }))
)

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
    const [tabIndex, onSelectTabIndex] = useStateWithMemoizedCallback(0)
    const onClickLoadExample = useCallback(
      (example: keyof typeof RVSConstants[`examples`]) => () => {
        setRegisterState(RVSConstants.examples[example].reg_state)
        setCodeState(RVSConstants.examples[example].program_code)
        setMemoryState(RVSConstants.examples[example].memory_state)
        onSelectTabIndex(0)
      },
      [setRegisterState, setCodeState, setMemoryState, onSelectTabIndex]
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
          onClickLoadExample,
          executionOutput,
          setExecutionOutput,
          tabIndex,
          onSelectTabIndex,
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
  onClickLoadExample: (
    example: keyof typeof RVSConstants[`examples`]
  ) => () => void
  tabIndex: number
  onSelectTabIndex: React.Dispatch<React.SetStateAction<number>>
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
    RVSSettings,
    setRVSSettings,
    onClickLoadExample,
    onSelectTabIndex,
    tabIndex,
    isEditorStateNewlySaved,
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
            RVSSettings,
          }}
        />
        <EditorHeaderPure
          {...{
            isEditorStateNewlySaved,
          }}
        />
        <div
          css={{
            display: `flex`,
            width: `100%`,
            height: `calc(100% - 2rem)`,
            background: theme.background,
            [`@media (max-width: 710px)`]: {
              flexDirection: `column`,
            },
          }}
        >
          <section
            css={{
              display: `flex`,
              width: `55%`,
              height: `100%`,
              background: theme.background,
              [`@media (max-width: 710px)`]: {
                width: `100%`,
                height: `65%`,
              },
            }}
          >
            <Tabs selectedIndex={tabIndex} onSelect={onSelectTabIndex}>
              <TabList>
                <Tab>Code</Tab>
                <Tab>Memory</Tab>
                <Tab>Register</Tab>
                <Tab>Settings</Tab>
                <Tab>Examples</Tab>
                {/* <Tab>Share</Tab> */}
              </TabList>
              <TabPanel>
                <textarea
                  value={codeState}
                  onChange={onCodeStateChange}
                  spellCheck={false}
                  css={{
                    overflowY: `scroll`,
                    // give some space below with +1rem more
                    height: `calc(100% - 1.5rem)`,
                    padding: `0.5rem`,
                    width: `calc(100% - 0.5rem)`,
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
                    // give some space below with +1rem more
                    height: `calc(100% - 1.5rem)`,
                    padding: `0.5rem`,
                    width: `calc(100% - 0.5rem)`,
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
                    // give some space below with +1rem more
                    height: `calc(100% - 1.5rem)`,
                    padding: `0.5rem`,
                    width: `calc(100% - 0.5rem)`,
                    background: theme.background,
                    color: theme.text,
                  }}
                ></textarea>
              </TabPanel>
              <TabPanel>
                <ErrorBoundary
                  Fallback={
                    <div
                      css={{
                        color: `red`,
                      }}
                    >
                      Settings failed to load.
                    </div>
                  }
                >
                  <Suspense fallback={<WHFullLoadingAnimation />}>
                    <SettingsPanelImpure
                      {...{
                        RVSSettings,
                        setRVSSettings,
                      }}
                    />
                  </Suspense>
                </ErrorBoundary>
              </TabPanel>
              <TabPanel>
                <ErrorBoundary
                  Fallback={
                    <div
                      css={{
                        color: `red`,
                      }}
                    >
                      Examples failed to load.
                    </div>
                  }
                >
                  <Suspense fallback={<WHFullLoadingAnimation />}>
                    <ExamplesPanelImpure
                      {...{
                        onClickLoadExample,
                      }}
                    />
                  </Suspense>
                </ErrorBoundary>
              </TabPanel>
              {/* <TabPanel>
                <ErrorBoundary
                  Fallback={
                    <div
                      css={{
                        color: `red`,
                      }}
                    >
                      Share panel failed to load.
                    </div>
                  }
                >
                  <Suspense fallback={<WHFullLoadingAnimation />}>
                    <SharePanelImpure
                      {...{
                        memoryState,
                        codeState,
                        registerState,
                      }}
                    />
                  </Suspense>
                </ErrorBoundary>
              </TabPanel> */}
            </Tabs>
          </section>
          <section
            css={{
              display: `flex`,
              width: `45%`,
              height: `calc(100% - 2rem)`,
              background: theme.background,
              borderLeft: `1px solid ${theme.buttonBorder}`,
              [`@media (max-width: 710px)`]: {
                position: `absolute`,
                bottom: 0,
                left: 0,
                width: `100%`,
                height: `30%`,
                borderLeft: `none`,
                paddingTop: `0.5rem`,
                borderTop: `1px solid ${theme.buttonBorder}`,
              },
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
