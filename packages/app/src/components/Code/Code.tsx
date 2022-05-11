// import React, { useState } from "react"

// import "./styles.css"
// // @ts-ignore
// import Editor from "react-simple-code-editor"
// // @ts-ignore
// import { highlight, languages } from "prismjs/components/prism-core"
// import "prismjs/components/prism-clike"
// import "prismjs/components/prism-javascript"
// import "prismjs/themes/prism.css"

// const code = `function add(a, b) {
//   return a + b;
// }

// const a = 123;
// `

// const hightlightWithLineNumbers: (input: any, language: any) => any = (
//   input,
//   language
// ) =>
//   highlight(input, language)
//     .split(`\n`)
//     .map(
//       (line: string, i: number) =>
//         `<span class='editorLineNumber'>${i + 1}</span>${line}`
//     )
//     .join(`\n`)

// export function Code({
//   setCode,
//   code,
// }: {
//   setCode: (code: string) => void
//   code: string
// }) {
//   return (
//     // @ts-ignore
//     <Editor
//       value={code}
//       onValueChange={(code: string) => setCode(code)}
//       highlight={(code: string) =>
//         hightlightWithLineNumbers(code, languages.js)
//       }
//       padding={10}
//       textareaId="codeArea"
//       className="editor"
//       style={{
//         fontFamily: `"Fira code", "Fira Mono", monospace`,
//         fontSize: 18,
//         outline: 0,
//       }}
//     />
//   )
// }
