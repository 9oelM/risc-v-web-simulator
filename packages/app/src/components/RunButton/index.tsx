import { useTheme } from "@emotion/react"
import React, { useCallback, useEffect } from "react"
import { FC } from "react"
import { serializeError } from "serialize-error"
import { enhance } from "../../utilities/essentials"
import { EditorPureProps } from "../Editor"
import { RunButtonFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type RunButtonImpureProps = Pick<
  EditorPureProps,
  | `codeState`
  | `registerState`
  | `memoryState`
  | `kiteWasmRequestResult`
  | `setExecutionOutput`
  | `RVSSettings`
>

export const RunButtonImpure: FC<RunButtonImpureProps> =
  enhance<RunButtonImpureProps>(
    ({
      codeState,
      registerState,
      memoryState,
      kiteWasmRequestResult,
      setExecutionOutput,
      RVSSettings,
    }) => {
      const isKiteWasmAvailable =
        kiteWasmRequestResult.current !== null &&
        !(kiteWasmRequestResult.current instanceof Error)
      const onRunKiteWasm = useCallback(() => {
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
          _malloc,
          setValue,
        } = kiteWasmRequestResult.current
        const { is_debug_on, is_data_fwd_on, is_br_pred_on } = RVSSettings

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
        console.log(`is_debug_on ${is_debug_on}`)
        const isDebugOnInt8Ptr = _malloc(1)
        const isDataFwdOnInt8Ptr = _malloc(1)
        const isBrPredOnInt8Ptr = _malloc(1)
        setValue(isDebugOnInt8Ptr, is_debug_on, `i8`)
        setValue(isDataFwdOnInt8Ptr, is_data_fwd_on, `i8`)
        setValue(isBrPredOnInt8Ptr, is_br_pred_on, `i8`)
        const latestRunTime = `Latest execution time: ${new Date().toLocaleString()}`
        let executionOutputCharPtr: ReturnType<typeof _run_kite_once> | null =
          null
        let errorPtr: number | null = null
        try {
          executionOutputCharPtr = _run_kite_once(
            codeCharPtr,
            memoryCharPtr,
            registerCharPtr,
            isDebugOnInt8Ptr,
            isDataFwdOnInt8Ptr,
            isBrPredOnInt8Ptr
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
          ;[
            codeCharPtr,
            memoryCharPtr,
            registerCharPtr,
            isDebugOnInt8Ptr,
            isDataFwdOnInt8Ptr,
            isBrPredOnInt8Ptr,
          ].forEach(_free)
          ;[executionOutputCharPtr, errorPtr].forEach((ptr) => {
            if (ptr) _free(ptr)
          })
        }
      }, [codeState, registerState, memoryState, RVSSettings])

      useEffect(() => {
        document.addEventListener(`keypress`, (e) => {
          console.log(e)
          if (e.code !== `KeyR` || !e.altKey || !e.ctrlKey) return
          onRunKiteWasm()
        })
      }, [onRunKiteWasm])

      return (
        <RunButtonPure
          {...{
            onClickRunButton: onRunKiteWasm,
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
  enhance<RunButtonPureProps>(({ onClickRunButton, isKiteWasmAvailable }) => {
    const theme = useTheme()

    return (
      <button
        // className="react-tabs__tab react-tabs__tab--disabled run-button"
        css={{
          display: `inline-block`,
          borderBottom: `none`,
          bottom: `-1px`,
          position: `absolute`,
          listStyle: `none`,
          padding: `6px 12px`,
          cursor: `pointer`,
          right: 0,
          top: 0,
          height: 35,
          background: theme.linkText,
          color: theme.text,
          borderRadius: `5px 5px 0 0`,
          border: `1px solid ${theme.buttonBorder}`,
          marginLeft: `auto`,
          transition: `all 0.3s ease-out`,
          "&:hover": {
            background: `rgb(107, 233, 107)`,
          },
        }}
        onClick={onClickRunButton}
      >
        {isKiteWasmAvailable ? `Run (Ctrl + Alt + R)` : `Wait..`}
      </button>
    )
  })(RunButtonFallback)
