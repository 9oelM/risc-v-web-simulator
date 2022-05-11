import React from "react"
import { FC } from "react"

export const ExecutionOutputFallback: FC = () => (
  <div>
    <p
      style={{
        color: `red`,
      }}
    >
      Oops. Something went wrong. Please try again.
    </p>
  </div>
)
