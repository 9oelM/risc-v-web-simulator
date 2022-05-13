import { RVSConstants } from "../constants"

const LOCALSTORAGE_RVS_KEY = `__RVS_KEY`

export type LocalStorgeState = {
  RVSSettings: typeof RVSConstants[`defaultRVSSettings`]
  editor_states: typeof RVSConstants[`examples`][`defaultExample`]
}
/**
 * I was too lazy to integrate the app with redux
 * which can easily be integrated with redux-persist,
 * so I am just writing this to restore state
 * from localstorage by myself
 */
export class LocalStorageManager {
  static restoreStateFromLocalStorage(): null | LocalStorgeState {
    const maybeRestoredState = localStorage.getItem(LOCALSTORAGE_RVS_KEY)

    try {
      if (!maybeRestoredState) return null

      const restoredState = JSON.parse(maybeRestoredState)
      return restoredState
    } catch {
      return null
    }
  }
  static saveStateToLocalStorage(nextState: LocalStorgeState) {
    try {
      localStorage.setItem(LOCALSTORAGE_RVS_KEY, JSON.stringify(nextState))
    } catch {
      localStorage.setItem(LOCALSTORAGE_RVS_KEY, ``)
    }
  }
}
