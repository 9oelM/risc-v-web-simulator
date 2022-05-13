import KiteWasmPromise, { KiteWasm } from "@risc-v-web-simulator/kite"
import React, {
  MutableRefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react"
import { FC } from "react"
import { enhance, tcAsync } from "../../utilities/essentials"
import { EditorRootFallback } from "./fallback"
import { serializeError } from "serialize-error"
import { useTheme } from "@emotion/react"
import {
  memory_state,
  program_code,
  reg_state,
} from "../../constants/editorDefaultState"
import { useStateWithMemoizedCallback } from "../../hooks/useStateWithMemoizedCallback"
import { LoadingAnimationIcon } from "../Util/LoadingAnimationIcon"
import { RVSConstants } from "../../constants"
import { RVSSettings } from "../../constants/RVSSettings"
import { ErrorBoundary } from "../Util/WithErrorBoundary"
import { WHFullLoadingAnimation } from "../Util/WHFullLoadingAnimation"
import {
  LocalStorageManager,
  LocalStorgeState,
} from "../../utilities/localStorage"

const EditorImpure = React.lazy(() =>
  import(`../Editor`).then(({ EditorImpure }) => ({
    default: EditorImpure,
  }))
)

enum WasmRequestStatus {
  LOADING = `LOADING`,
  ERROR = `ERROR`,
  SUCCESS = `SUCCESS`,
}

/**
 * I was too lazy to integrate the app with redux
 * which can easily be integrated with redux-persist,
 * so I am just writing this function to restore state
 * from localstorage by myself
 */
function useSaveStateToLocalStorage({
  RVSSettings,
  editor_states: { program_code, reg_state, memory_state },
}: LocalStorgeState) {
  const timeout = useRef<null | number>(null)
  const DEBOUNCE_SECS = 1_000
  useEffect(() => {
    if (timeout.current) window.clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      LocalStorageManager.saveStateToLocalStorage({
        RVSSettings,
        editor_states: {
          program_code,
          reg_state,
          memory_state,
        },
      })
    }, DEBOUNCE_SECS)
  }, [RVSSettings, program_code, reg_state, memory_state])
}

function useRestoreStateFromLocalStorage({
  setRegisterState,
  setMemoryState,
  setCodeState,
  setRVSSettings,
}: {
  setRegisterState: React.Dispatch<React.SetStateAction<string>>
  setMemoryState: React.Dispatch<React.SetStateAction<string>>
  setCodeState: React.Dispatch<React.SetStateAction<string>>
  setRVSSettings: React.Dispatch<React.SetStateAction<RVSSettings>>
}) {
  const isFirstMount = useRef(true)
  useEffect(() => {
    if (isFirstMount.current) isFirstMount.current = false
    else return
    const maybeRestoredState =
      LocalStorageManager.restoreStateFromLocalStorage()
    console.log(maybeRestoredState)
    if (!maybeRestoredState) return

    setMemoryState(maybeRestoredState.editor_states.memory_state)
    setCodeState(maybeRestoredState.editor_states.program_code)
    setRegisterState(maybeRestoredState.editor_states.reg_state)
    setRVSSettings(maybeRestoredState.RVSSettings)
  }, [setRegisterState, setMemoryState, setCodeState, setRVSSettings])
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type EditorRootImpureProps = {}

export const EditorRootImpure: FC<EditorRootImpureProps> =
  enhance<EditorRootImpureProps>(() => {
    const kiteWasmRequestResult = useRef<null | KiteWasm | Error>(null)
    const [wasmRequestStatus, setWasmRequestStatus] = useState(
      WasmRequestStatus.LOADING
    )
    const [codeState, setCodeState] = useStateWithMemoizedCallback(
      RVSConstants.examples.defaultExample.program_code
    )
    const [memoryState, setMemoryState] = useStateWithMemoizedCallback(
      RVSConstants.examples.defaultExample.memory_state
    )
    const [registerState, setRegisterState] = useStateWithMemoizedCallback(
      RVSConstants.examples.defaultExample.reg_state
    )
    const [RVSSettings, setRVSSettings] = useStateWithMemoizedCallback(
      RVSConstants.defaultRVSSettings
    )
    useSaveStateToLocalStorage({
      RVSSettings,
      editor_states: {
        program_code: codeState,
        reg_state: registerState,
        memory_state: memoryState,
      },
    })
    useRestoreStateFromLocalStorage({
      setCodeState,
      setMemoryState,
      setRegisterState,
      setRVSSettings,
    })

    useEffect(() => {
      async function loadKiteWasm() {
        const [err, wasm] = await tcAsync(KiteWasmPromise)
        if (!err && wasm) {
          kiteWasmRequestResult.current = wasm
          setWasmRequestStatus(WasmRequestStatus.SUCCESS)
        } else if (err) {
          kiteWasmRequestResult.current = err
          setWasmRequestStatus(WasmRequestStatus.ERROR)
        }
      }
      loadKiteWasm()
    }, [])

    return (
      <EditorRootPure
        {...{
          kiteWasmRequestResult,
          wasmRequestStatus,
          registerState,
          setRegisterState,
          memoryState,
          setMemoryState,
          codeState,
          setCodeState,
          RVSSettings,
          setRVSSettings,
        }}
      />
    )
  })(EditorRootFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type EditorRootPureProps = {
  wasmRequestStatus: WasmRequestStatus
  registerState: string
  memoryState: string
  codeState: string
  setRegisterState: React.Dispatch<React.SetStateAction<string>>
  setMemoryState: React.Dispatch<React.SetStateAction<string>>
  setCodeState: React.Dispatch<React.SetStateAction<string>>
  setRVSSettings: React.Dispatch<React.SetStateAction<RVSSettings>>
  RVSSettings: RVSSettings
} & {
  kiteWasmRequestResult: React.MutableRefObject<Error | KiteWasm | null>
}

export const EditorRootPure: FC<EditorRootPureProps> =
  enhance<EditorRootPureProps>(
    ({ wasmRequestStatus, kiteWasmRequestResult, ...rest }) => {
      const theme = useTheme()
      return (
        <div id="outermost">
          {(() => {
            switch (wasmRequestStatus) {
              case WasmRequestStatus.LOADING:
                return (
                  <>
                    <main
                      css={{
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        color: theme.text,
                        width: `100%`,
                        height: `100%`,
                        background: theme.background,
                      }}
                    >
                      <div css={{ height: `2rem` }} />
                      <LoadingAnimationIcon />
                      <p
                        css={{
                          paddingTop: `0.5rem`,
                        }}
                      >
                        Loading
                      </p>
                      <p
                        css={{
                          paddingTop: `0.5rem`,
                          fontSize: `0.8rem`,
                          textAlign: `center`,
                        }}
                      >
                        Maybe visit{` `}
                        <a
                          css={{
                            color: theme.linkText,
                            padding: 0,
                            margin: 0,
                            display: `inline`,
                          }}
                          target="_blank"
                          href="https://github.com/9oelM/risc-v-web-simulator"
                          rel="noreferrer"
                        >
                          the project page on Github
                        </a>
                        {` `}
                        while waiting?
                      </p>
                    </main>
                  </>
                )
              case WasmRequestStatus.SUCCESS:
                return (
                  <ErrorBoundary
                    Fallback={
                      <div
                        css={{
                          color: `red`,
                        }}
                      >
                        Editor failed to load.
                      </div>
                    }
                  >
                    <Suspense fallback={<WHFullLoadingAnimation />}>
                      <EditorImpure
                        {...{
                          // by this time, kiteWasmRequestResult MUST be this type
                          kiteWasmRequestResult:
                            kiteWasmRequestResult as MutableRefObject<KiteWasm>,
                          ...rest,
                        }}
                      />
                    </Suspense>
                  </ErrorBoundary>
                )
              case WasmRequestStatus.ERROR:
                return (
                  <>
                    <p>
                      Something went wrong while loading the WebAssembly module.
                    </p>
                    <p>
                      Error details:{` `}
                      {JSON.stringify(
                        serializeError(kiteWasmRequestResult.current)
                      )}
                    </p>
                  </>
                )
            }
          })()}
        </div>
      )
    }
  )(EditorRootFallback)
