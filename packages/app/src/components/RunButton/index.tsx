import React, { useCallback } from "react"
import { FC } from "react"
import { serializeError } from "serialize-error"
import { enhance } from "../../utilities/essentials"
import { EditorPureProps } from "../Editor"
import { RunButtonFallback } from "./fallback"
// import fibWasmPromise from "@risc-v-web-simulator/RunButton-wasm"

// eslint-disable-next-line @typescript-eslint/ban-types
export type RunButtonImpureProps = Pick<
  EditorPureProps,
  | `codeState`
  | `registerState`
  | `memoryState`
  | `kiteWasmRequestResult`
  | `setExecutionOutput`
>

export const RunButtonImpure: FC<RunButtonImpureProps> =
  enhance<RunButtonImpureProps>(
    ({
      codeState,
      registerState,
      memoryState,
      kiteWasmRequestResult,
      setExecutionOutput,
    }) => {
      const isKiteWasmAvailable =
        kiteWasmRequestResult.current !== null &&
        !(kiteWasmRequestResult.current instanceof Error)
      const onClickRunButton = useCallback(() => {
        if (!kiteWasmRequestResult.current) return
        if (kiteWasmRequestResult.current instanceof Error) return
        console.log(kiteWasmRequestResult.current)

        const {
          _run_kite_once,
          allocate,
          ALLOC_NORMAL,
          intArrayFromString,
          _free,
          UTF8ToString,
          _get_exception_message,
        } = kiteWasmRequestResult.current

        const codeCharPtr = allocate(
          intArrayFromString(codeState),
          `i8`,
          ALLOC_NORMAL
        )
        const memoryCharPtr = allocate(
          intArrayFromString(memoryState),
          `i8`,
          ALLOC_NORMAL
        )
        const registerCharPtr = allocate(
          intArrayFromString(registerState),
          `i8`,
          ALLOC_NORMAL
        )
        const latestRunTime = `Latest execution time: ${new Date().toLocaleString()}`
        let executionOutputCharPtr: ReturnType<typeof _run_kite_once> | null =
          null
        let errorPtr: number | null = null
        try {
          executionOutputCharPtr = _run_kite_once(
            codeCharPtr,
            memoryCharPtr,
            registerCharPtr
          )
          console.log(executionOutputCharPtr)

          const executionOutputInJSString = UTF8ToString(executionOutputCharPtr)
          setExecutionOutput(`${latestRunTime}\n${executionOutputInJSString}`)
        } catch (e: any) {
          errorPtr = e as number
          executionOutputCharPtr = _get_exception_message(errorPtr)
          setExecutionOutput(
            `${latestRunTime}\n${UTF8ToString(executionOutputCharPtr)}`
          )
        } finally {
          ;[codeCharPtr, memoryCharPtr, registerCharPtr].forEach(_free)
          if (executionOutputCharPtr) _free(executionOutputCharPtr)
          if (errorPtr) _free(errorPtr)
        }
      }, [codeState, registerState, memoryState])

      return (
        <RunButtonPure
          {...{
            onClickRunButton,
            isKiteWasmAvailable,
          }}
        />
      )
    }
  )(RunButtonFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type RunButtonPureProps = {
  onClickRunButton: React.MouseEventHandler<HTMLButtonElement>
  isKiteWasmAvailable: boolean
}

export const RunButtonPure: FC<RunButtonPureProps> =
  enhance<RunButtonPureProps>(({ onClickRunButton, isKiteWasmAvailable }) => (
    <button
      className="react-tabs__tab react-tabs__tab--disabled run-button"
      onClick={onClickRunButton}
    >
      {isKiteWasmAvailable ? `Run` : `Loading`}
    </button>
  ))(RunButtonFallback)
