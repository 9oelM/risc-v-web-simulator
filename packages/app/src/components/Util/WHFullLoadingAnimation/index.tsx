import React from "react"
import { LoadingAnimationIcon } from "../LoadingAnimationIcon"

export const WHFullLoadingAnimation = () => {
  return (
    <div
      css={{
        width: `100%`,
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
      }}
    >
      <LoadingAnimationIcon />
      <p>Loading</p>
    </div>
  )
}
