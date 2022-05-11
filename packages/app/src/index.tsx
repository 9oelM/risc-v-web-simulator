import React from "react"
import { createRoot } from "react-dom/client"
import { EditorRootImpure } from "./components/EditorRoot"
import "@fontsource/roboto-mono"
import "./react-tabs-custom.css"
import { RiscVWebSimulatorThemeProvider } from "./theme"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById(`root`)!)
root.render(
  <RiscVWebSimulatorThemeProvider>
    <EditorRootImpure />
  </RiscVWebSimulatorThemeProvider>
)
