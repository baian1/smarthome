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

const SensorToNormalPart: React.SFC<P> = ({ sensorData, sensorHandle }: P) => {
  const data: Data[] = useMemo(
    () => [
      {
        title: "震动",
        buttonContent: "清除",
        disabled:
          sensorData["Shock Sensor"]["on/off"] === "off" ||
          sensorData["Shock Sensor"].status === "normal",
        handle: () => {
          sensorHandle.setDangerToNormal("Shock Sensor")
        },
      },
      {
        title: "红外",
        buttonContent: "清除",
        disabled:
          sensorData["Infrared Sensor"]["on/off"] === "off" ||
          sensorData["Infrared Sensor"].status === "normal",
        handle: () => {
          sensorHandle.setDangerToNormal("Infrared Sensor")
        },
      },
    ],
    [sensorData, sensorHandle]
  )

  return <BasePart title="清除警报" data={data} mode="button" />
}

export { SensorToNormalPart }
