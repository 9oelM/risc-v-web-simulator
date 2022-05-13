import React, { FC, PropsWithChildren } from "react"
import { css, Global, ThemeProvider } from "@emotion/react"

const themeDark = {
  text: `#fff`,
  linkText: `rgb(61, 225, 61)`,
  background: `#121212`,
  buttonText: `#fff`,
  buttonTextHover: `#000`,
  buttonBorder: `#fff`,
  buttonBg: `rgba(255, 255, 255, 0`,
  buttonBgHover: `rgba(255, 255, 255, 1`,
}

// function createEmotionTheme<T>(theme: T): T {
//   return theme
// }

// eslint-disable-next-line @typescript-eslint/ban-types
export const RiscVWebSimulatorThemeProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={themeDark}>
      <Global
        // we are not using normalize.css cuz I'm lazy, so list down some
        // default styles here
        styles={css`
          html,
          body,
          #root,
          #outermost {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            // https://developer.chrome.com/blog/overscroll-behavior/
            overscroll-behavior-y: none;
            background: #121212;
            overflow: hidden;
          }
          * {
            font-family: "Roboto Mono";
            outline-style: none;
            box-shadow: none;
            border-color: transparent;
          }
          textarea {
            margin: 0;
            padding: 0;
            outline-style: none;
            box-shadow: none;
            border-color: transparent;
          }
          input:focus,
          select:focus,
          textarea:focus,
          button:focus {
            outline: none;
          }
          [contenteditable="true"]:focus {
            outline: none;
          }
          // a:visited {
          //   color: inherit;
          // }
        `}
      />
      {children}
    </ThemeProvider>
  )
}
