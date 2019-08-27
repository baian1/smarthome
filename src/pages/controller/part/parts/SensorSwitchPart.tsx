import React, { useMemo } from "react"
import { Data } from "../BasePart"
import { SensorInterface } from "interface/devices.interface"
import { BasePart } from "../BasePart"

interface P {
  sensorData: SensorInterface
  sensorHandle: {
    setDangerToNormal: (
      sensor: "Infrared Sensor" | "Shock Sensor"
    ) => Promise<void>
    ChangeSensorSwitch: (sensor: "Infrared Sensor" | "Shock Sensor") => void
  }
}

const SensorSwitchPart: React.SFC<P> = ({ sensorData, sensorHandle }: P) => {
  const data: Data[] = useMemo(
    () => [
      {
        title: "震动",
        handle: () => {
          sensorHandle.ChangeSensorSwitch("Shock Sensor")
        },
        check: sensorData["Shock Sensor"]["on/off"] === "on",
      },
      {
        title: "红外",
        handle: () => {
          sensorHandle.ChangeSensorSwitch("Infrared Sensor")
        },
        check: sensorData["Infrared Sensor"]["on/off"] === "on",
      },
    ],
    [sensorData, sensorHandle]
  )

  return <BasePart title="警报器开关" data={data} mode="switch" />
}

export { SensorSwitchPart }
