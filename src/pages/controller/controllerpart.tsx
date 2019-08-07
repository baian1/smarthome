import React, { Props, useCallback, useMemo } from "react"
import "./controllerpart.less"
import Switch from "antd-mobile/lib/switch"
import "antd-mobile/lib/switch/style/index.less"
import anime from "animejs"

interface P extends Props<{}> {
  title: string
  mode?: "button" | "switch"
  data: Data[]
}

export interface Data {
  title: string
  handle: () => void
  disabled?: boolean
  mode?: "button" | "switch"
  check?: boolean
  buttonContent?: string
}

const prefix = "controllerpart"

function Part({ title, data, mode = "button" }: P) {
  const handleOnClick = useCallback((handle: () => void) => {
    let buttontimer: boolean
    buttontimer = false
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (buttontimer === true) {
        return
      }
      ;(async () => {
        handle()
      })()
      buttontimer = true
      let elemet: HTMLButtonElement = event.target as HTMLButtonElement
      anime({
        targets: event.target,
        keyframes: [
          { "background-color": "rgba(59, 82, 82, 0.9)" },
          { "background-color": "rgba(109, 109, 204,0.534)" },
        ],
        duration: 1000,
        easing: "easeOutElastic(1, .8)",
      }).finished.then(() => {
        elemet.removeAttribute("style")
        buttontimer = false
      })
    }
  }, [])

  const list = useMemo(() => {
    console.log("render")
    return data.map((value: Data, index: number) => {
      let mergemode = value.mode ? value.mode : mode
      let key = index
      switch (mergemode) {
        case "button":
          return (
            <div key={key} className={`${prefix}-li`}>
              {value.title}
              <button
                className={`${prefix}-button`}
                disabled={value.disabled}
                onClick={handleOnClick(value.handle)}>
                {value.buttonContent}
              </button>
            </div>
          )
        case "switch":
          if (value === null) {
            return new Error("switch缺少check")
          }
          return (
            <div key={key} className={`${prefix}-li`}>
              {value.title}
              <Switch checked={value.check} onClick={value.handle} />
            </div>
          )
        default:
          return null
      }
    })
  }, [data])

  return (
    <div className={`${prefix}-wrap`}>
      <div className={`${prefix}-title`}>{title}</div>
      {list}
    </div>
  )
}
const PurePart = React.memo(Part)
export { PurePart as Part }
