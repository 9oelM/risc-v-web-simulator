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
import { escape } from "lodash"

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

function useSaveStateToLocalStorage({
  RVSSettings,
  editor_states: { program_code, reg_state, memory_state },
}: LocalStorgeState): boolean {
  const firstCbTimeout = useRef<null | number>(null)
  const secondCbTimeout = useRef<null | number>(null)
  const DEBOUNCE_SECS = 5_000
  const NEWLY_SAVED_DURATION_SECS = 5_000
  const [isEditorStateNewlySaved, setNewlySaved] = useState(
    Number.MIN_SAFE_INTEGER
  )

  useEffect(() => {
    if (firstCbTimeout.current) window.clearTimeout(firstCbTimeout.current)
    if (secondCbTimeout.current) window.clearTimeout(secondCbTimeout.current)
    firstCbTimeout.current = window.setTimeout(() => {
      LocalStorageManager.saveStateToLocalStorage({
        RVSSettings,
        editor_states: {
          program_code,
          reg_state,
          memory_state,
        },
      })
      setNewlySaved((prev) => prev + 1)
      secondCbTimeout.current = window.setTimeout(() => {
        setNewlySaved((prev) => prev + 1)
      }, NEWLY_SAVED_DURATION_SECS)
    }, DEBOUNCE_SECS)
  }, [RVSSettings, program_code, reg_state, memory_state, setNewlySaved])

  return isEditorStateNewlySaved % 2 === 0
}

function checkAndUseStateFromURLSearchParams({
  setRegisterState,
  setMemoryState,
  setCodeState,
}: {
  setRegisterState: React.Dispatch<React.SetStateAction<string>>
  setMemoryState: React.Dispatch<React.SetStateAction<string>>
  setCodeState: React.Dispatch<React.SetStateAction<string>>
}): boolean {
  const urlParams = new URLSearchParams(window.location.search)
  const memory_state = urlParams.get(`m`)
  const program_code = urlParams.get(`c`)
  const reg_state = urlParams.get(`r`)
  const is_share = urlParams.get(`s`)
  const fromBase64 = (s: string | null) =>
    window.decodeURIComponent(window.escape(window.atob(s ?? ``)))

  let isUsingURLSearchParams = false
  if ((reg_state || program_code || memory_state) && is_share) {
    setRegisterState(fromBase64(reg_state))
    setCodeState(fromBase64(program_code))
    setMemoryState(fromBase64(memory_state))
    isUsingURLSearchParams = true
  }

  // remove URL search params in case user refreshes again later
  window.history.pushState({}, document.title, window.location.pathname)

  return isUsingURLSearchParams
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
    if (isFirstMount.current) {
      const isUsingURLSearchParams = checkAndUseStateFromURLSearchParams({
        setCodeState,
        setMemoryState,
        setRegisterState,
      })
      isFirstMount.current = false

      if (isUsingURLSearchParams) return
    } else return
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
    const isEditorStateNewlySaved = useSaveStateToLocalStorage({
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
          isEditorStateNewlySaved,
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
  isEditorStateNewlySaved: boolean
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
