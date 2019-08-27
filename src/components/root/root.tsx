import React from "react"
import "./root.less"

type mode = "center" | "start"

export function withRoot<P = {}>(
  WrappedComponent: React.ComponentType<P>,
  mode: mode = "center"
): (props: P) => JSX.Element {
  const prefix = "root"

  return function wrapRoot(props: P): JSX.Element {
    return (
      <div className={`${prefix}-wrap ${prefix}-${mode}`}>
        <WrappedComponent {...props} />
      </div>
    )
  }
}
