import { useTheme } from "@emotion/react"
import React, { useCallback } from "react"
import { FC } from "react"
import { EditorPureProps } from ".."
import { enhance } from "../../../utilities/essentials"

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExamplesPanelImpureProps = Pick<
  EditorPureProps,
  `onClickLoadExample`
>

export const ExamplesPanelImpure: FC<ExamplesPanelImpureProps> =
  enhance<ExamplesPanelImpureProps>(({ onClickLoadExample }) => {
    const onClickLoadMatrixExample = useCallback(
      onClickLoadExample(`matrixCalculationExample`),
      [onClickLoadExample]
    )
    const onClickLoadDefaultExample = useCallback(
      onClickLoadExample(`defaultExample`),
      [onClickLoadExample]
    )

    return (
      <ExamplesPanelPure
        {...{
          onClickLoadMatrixExample,
          onClickLoadDefaultExample,
        }}
      />
    )
  })()

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExamplesPanelPureProps = {
  onClickLoadMatrixExample: VoidFunction
  onClickLoadDefaultExample: VoidFunction
}

export const ExamplesPanelPure: FC<ExamplesPanelPureProps> =
  enhance<ExamplesPanelPureProps>(
    ({ onClickLoadMatrixExample, onClickLoadDefaultExample }) => {
      const theme = useTheme()
      return (
        <section
          css={{
            background: theme.background,
            color: theme.text,
            padding: `0rem 0.5rem`,
          }}
        >
          <p
            css={{
              color: theme.warnText,
              textDecoration: `underline`,
              fontSize: `1rem`,
            }}
          >
            Loading an example will overwrite existing code, memory, register
            states!
          </p>
          <article>
            <button
              css={{
                borderRadius: `0.5rem`,
                padding: `0.5rem`,
                border: `1px solid ${theme.buttonBorder}`,
                background: theme.buttonBg,
                color: theme.buttonText,
                cursor: `pointer`,
                fontSize: `0.8rem`,
                "&:hover": {
                  background: theme.buttonBgHover,
                },
              }}
              onClick={onClickLoadMatrixExample}
            >
              Load
            </button>
            <p
              css={{
                display: `inline`,
                fontSize: `0.8rem`,
              }}
            >
              {` `} Matrix addition & multiplication (C = C + A * B) example
            </p>
          </article>
          <article>
            <button
              css={{
                marginTop: `0.5rem`,
                borderRadius: `0.5rem`,
                padding: `0.5rem`,
                border: `1px solid ${theme.buttonBorder}`,
                background: theme.buttonBg,
                color: theme.buttonText,
                cursor: `pointer`,
                fontSize: `0.8rem`,
                "&:hover": {
                  background: theme.buttonBgHover,
                },
              }}
              onClick={onClickLoadDefaultExample}
            >
              Load
            </button>
            <p
              css={{
                display: `inline`,
                fontSize: `0.8rem`,
              }}
            >
              {` `} {`Default (Euclidean algorithm for GCD) example`}
            </p>
          </article>
        </section>
      )
    }
  )()
