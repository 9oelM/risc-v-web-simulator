import { program_code, reg_state, memory_state } from "./editorDefaultState"
import { matrixCalculationExample } from "./exampleEditorStates"
import { defaultRVSSettings } from "./RVSSettings"

/**
 * Just naming it as RVS because
 * 'Constants' alone is just too general and
 * may not give enough hint when a developer
 * looks at the name in autocompletion
 */
export const RVSConstants = {
  defaultRVSSettings,
  examples: {
    matrixCalculationExample,
    defaultExample: {
      program_code,
      reg_state,
      memory_state,
    },
  },
}
