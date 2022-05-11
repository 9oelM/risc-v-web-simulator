import { Dispatch, SetStateAction, useCallback, useState } from "react"

export function useStateWithMemoizedCallback<S>(
  initialValue: S
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialValue)
  return [
    state,
    useCallback(
      (...params: Parameters<typeof setState>) => setState(...params),
      []
    ),
  ]
}
