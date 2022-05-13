import { useTheme } from "@emotion/react"
import React, { useCallback } from "react"
import { FC } from "react"
import { RVSSettings } from "../../../constants/RVSSettings"
import { enhance } from "../../../utilities/essentials"
import { EditorRootPureProps } from "../../EditorRoot"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SettingsPanelImpureProps = Pick<
  EditorRootPureProps,
  `RVSSettings` | `setRVSSettings`
>

export const SettingsPanelImpure: FC<SettingsPanelImpureProps> =
  enhance<SettingsPanelImpureProps>(({ RVSSettings, setRVSSettings }) => {
    const onToggleOneOfRVSSettings = useCallback(
      (key: keyof RVSSettings) => {
        return () =>
          setRVSSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
          }))
      },
      [setRVSSettings]
    )

    const onToggleBrPred = useCallback(
      onToggleOneOfRVSSettings(`is_br_pred_on`),
      [onToggleOneOfRVSSettings]
    )
    const onToggleDataFwd = useCallback(
      onToggleOneOfRVSSettings(`is_data_fwd_on`),
      [onToggleOneOfRVSSettings]
    )
    const onToggleDebug = useCallback(onToggleOneOfRVSSettings(`is_debug_on`), [
      onToggleOneOfRVSSettings,
    ])

    return (
      <SettingsPanelPure
        {...{
          ...RVSSettings,
          onToggleDebug,
          onToggleDataFwd,
          onToggleBrPred,
        }}
      />
    )
  })()

// eslint-disable-next-line @typescript-eslint/ban-types
export type SettingsPanelPureProps = RVSSettings & {
  onToggleDebug: VoidFunction
  onToggleDataFwd: VoidFunction
  onToggleBrPred: VoidFunction
}

export const SettingsPanelPure: FC<SettingsPanelPureProps> =
  enhance<SettingsPanelPureProps>(
    ({
      is_br_pred_on,
      is_debug_on,
      is_data_fwd_on,
      onToggleBrPred,
      onToggleDataFwd,
      onToggleDebug,
    }) => {
      const theme = useTheme()
      return (
        <article>
          <div
            css={{
              padding: `0.5rem`,
              margin: `0.5rem`,
              border: `1px solid ${theme.buttonBorder}`,
            }}
          >
            <input
              css={{
                cursor: `pointer`,
              }}
              type="checkbox"
              name="Enable debug mode"
              onChange={onToggleDebug}
              checked={Boolean(is_debug_on)}
            />
            <label
              css={{
                cursor: `pointer`,
              }}
              onClick={onToggleDebug}
              htmlFor="scales"
            >
              Enable debug mode
            </label>
            <p
              css={{
                margin: 0,
                padding: 0,
                fontSize: `0.8rem`,
              }}
            >{`Gives more detailed output in 'Latest Execution Output'. Equivalent to -DDEBUG flag in Kite.`}</p>
          </div>
          <div
            css={{
              padding: `0.5rem`,
              margin: `0.5rem`,
              border: `1px solid ${theme.buttonBorder}`,
            }}
          >
            <input
              css={{
                cursor: `pointer`,
              }}
              type="checkbox"
              name="Enable data forwarding"
              checked={Boolean(is_data_fwd_on)}
              onChange={onToggleDataFwd}
            />
            <label
              css={{
                cursor: `pointer`,
              }}
              onClick={onToggleDataFwd}
              htmlFor="Enable data forwarding"
            >
              Enable data forwarding
            </label>
            <p
              css={{
                margin: 0,
                padding: 0,
                fontSize: `0.8rem`,
              }}
            >
              You will see improved performance if this is enabled. Equivalent
              to -DDATA_FWD flag in Kite. {` `}
              <a
                css={{
                  color: theme.linkText,
                  fontSize: `0.8rem`,
                }}
                href="https://en.wikipedia.org/wiki/Operand_forwarding"
                target="_blank"
                rel="noreferrer"
              >
                What is data forwarding?
              </a>
            </p>
          </div>
          <div
            css={{
              padding: `0.5rem`,
              margin: `0.5rem`,
              border: `1px solid ${theme.buttonBorder}`,
            }}
          >
            <input
              css={{
                cursor: `pointer`,
              }}
              type="checkbox"
              name="Enable branch prediction"
              checked={Boolean(is_br_pred_on)}
              onChange={onToggleBrPred}
            />
            <label
              css={{
                cursor: `pointer`,
              }}
              onClick={onToggleBrPred}
              htmlFor="Enable branch prediction"
            >
              Enable branch prediction
            </label>
            <p
              css={{
                margin: 0,
                padding: 0,
                fontSize: `0.8rem`,
              }}
            >
              You will see improved performance if this is enabled. Equivalent
              to -DBR_PRED flag in Kite. {` `}
              <a
                css={{
                  color: theme.linkText,
                  fontSize: `0.8rem`,
                }}
                href="https://en.wikipedia.org/wiki/Branch_predictor"
                target="_blank"
                rel="noreferrer"
              >
                What is branch prediction?
              </a>
            </p>
          </div>
          <div
            css={{
              padding: `0.5rem`,
              margin: `0.5rem`,
            }}
          >
            <p
              css={{
                fontSize: `0.8rem`,
                textAlign: `right`,
              }}
            >
              RISC-V Web Simulator is based on Kite version 1.8.
            </p>
          </div>
        </article>
      )
    }
  )()
