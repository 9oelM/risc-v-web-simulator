import { useTheme } from "@emotion/react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FC } from "react"
import { copyToClipboard2 } from "../../../utilities/clipboard"
import { enhance } from "../../../utilities/essentials"
// import fibWasmPromise from "@risc-v-web-simulator/SharePanel-wasm"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SharePanelImpureProps = {
  memoryState: string
  codeState: string
  registerState: string
}

export const SharePanelImpure: FC<SharePanelImpureProps> =
  enhance<SharePanelImpureProps>(
    ({ memoryState, codeState, registerState }) => {
      const [isCopyButtonJustClicked, setCopyButtonJustClicked] =
        useState(false)
      const timeout = useRef<null | number>(null)

      const onClickCopyButton = useCallback(() => {
        if (timeout.current) window.clearTimeout(timeout.current)

        const toBase64 = (s: string) =>
          window.btoa(window.unescape(encodeURIComponent(s)))
        const isLocal = window.location.host === `localhost:8080`
        const toBeCopiedUrl = `${
          isLocal
            ? `http://localhost:8080/`
            : `https://9oelm.github.io/risc-v-web-simulator/`
        }?s=t&c=${toBase64(codeState)}&m=${toBase64(memoryState)}&r=${toBase64(
          registerState
        )}`
        copyToClipboard2(toBeCopiedUrl)
        setCopyButtonJustClicked(true)
        timeout.current = window.setTimeout(() => {
          setCopyButtonJustClicked(false)
        }, 10_000)
      }, [memoryState, codeState, registerState])

      return (
        <SharePanelPure
          {...{
            onClickCopyButton,
            isCopyButtonJustClicked,
          }}
        />
      )
    }
  )()

// eslint-disable-next-line @typescript-eslint/ban-types
export type SharePanelPureProps = {
  onClickCopyButton: VoidFunction
  isCopyButtonJustClicked: boolean
}

export const SharePanelPure: FC<SharePanelPureProps> =
  enhance<SharePanelPureProps>(
    ({ onClickCopyButton, isCopyButtonJustClicked }) => {
      const theme = useTheme()

      return (
        <section
          css={{
            width: `100%`,
            height: `100%`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <button
            css={{
              borderRadius: `0.5rem`,
              padding: `1rem`,
              width: `20rem`,
              height: `15rem`,
              background: theme.buttonBg,
              cursor: `pointer`,
              border: `1px solid ${theme.buttonBorder}`,
              color: theme.background,
              "&:hover": {
                background: theme.buttonBgHover,
              },
            }}
            onClick={onClickCopyButton}
          >
            {isCopyButtonJustClicked ? (
              <p>Link copied to your clipboard</p>
            ) : (
              <>
                Click here to share link to
                <span
                  css={{
                    display: `block`,
                  }}
                >
                  your code, memory and register states with others
                </span>
                <p
                  css={{
                    color: theme.background,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  (If your code is really long,
                  <span
                    css={{
                      display: `block`,
                    }}
                  >
                    it might not work or not everything may get shared)
                  </span>
                </p>
              </>
            )}
          </button>
        </section>
      )
    }
  )()
