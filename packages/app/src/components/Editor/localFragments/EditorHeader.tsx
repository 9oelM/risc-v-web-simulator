import { useTheme } from "@emotion/react"
import React from "react"

export const EditorHeaderPure = () => {
  const theme = useTheme()

  return (
    <header
      css={{
        height: `2rem`,
        width: `100%`,
        background: theme.background,
        color: theme.text,
        whiteSpace: `nowrap`,
        overflow: `hidden`,
        textOverflow: `ellipsis`,
        // display: `flex`,
        // alignItems: `center`,
      }}
    >
      <h1
        css={{
          // color: theme.text,
          fontSize: `0.8rem`,
          padding: 0,
          margin: 0,
          display: `inline`,
        }}
      >
        <a
          css={{
            color: theme.linkText,
          }}
          target="_blank"
          href="https://github.com/9oelM/risc-v-web-simulator"
          rel="noreferrer"
        >
          RISC-V Web simulator
        </a>
        {` `}/
      </h1>
      <p
        css={{
          color: theme.text,
          fontSize: `0.8rem`,
          padding: 0,
          margin: 0,
          display: `inline`,
        }}
      >
        {` `}Creator:{` `}
        <a
          css={{
            color: theme.linkText,
          }}
          target="_blank"
          href="https://github.com/9oelM"
          rel="noreferrer"
        >
          @9oelM
        </a>
        {` `}/{` `}
        Credits:{` `}
        <a
          css={{
            color: theme.linkText,
          }}
          target="_blank"
          href="https://github.com/yonsei-icsl/kite"
          rel="noreferrer"
        >
          Kite
        </a>
        {` `}
        by{` `}
        <a
          css={{
            color: theme.linkText,
          }}
          target="_blank"
          href="https://github.com/wjhsong"
          rel="noreferrer"
        >
          @wjhsong
        </a>
        {` `}/{` `}
        <a
          css={{
            color: theme.linkText,
            fontSize: `0.8rem`,
            padding: 0,
            margin: 0,
            display: `inline`,
          }}
          target="_blank"
          href="https://github.com/9oelM/risc-v-web-simulator"
          rel="noreferrer"
        >
          This project
        </a>
        {` `}
        runs on{` `}
        <a
          css={{
            color: theme.linkText,
            fontSize: `0.8rem`,
            padding: 0,
            margin: 0,
            display: `inline`,
          }}
          target="_blank"
          href="https://webassembly.org"
          rel="noreferrer"
        >
          WebAssembly
        </a>
        !
        <a
          css={{
            fontSize: `0.8rem`,
            top: `6px`,
            left: `5px`,
            position: `relative`,
          }}
          href="#"
        >
          <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io%2Frisc-v-web-simulator%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" />
        </a>
      </p>
    </header>
  )
}
