import React from "react"
import { load, getPosition } from "api/map"
import {
  SensorInterface,
  AutoOnOff,
  AddressLocation as Address,
} from "interface/devices.interface"

//传感器hook
type sensorAction =
  | {
      type: "SET_DANGER_TO_NORMAL"
      sensor: "Infrared Sensor" | "Shock Sensor"
    }
  | {
      type: "CHANGE_SENSOR_SWITCH"
      sensor: "Infrared Sensor" | "Shock Sensor"
    }
function sensorReducer(state: SensorInterface, action: sensorAction) {
  switch (action.type) {
    case "SET_DANGER_TO_NORMAL":
      state[action.sensor].status = "normal"
      state[action.sensor] = { ...state[action.sensor] }
      return { ...state }
    case "CHANGE_SENSOR_SWITCH":
      state[action.sensor]["on/off"] =
        state[action.sensor]["on/off"] === "on" ? "off" : "on"
      state[action.sensor] = { ...state[action.sensor] }
      return { ...state }
    default:
      throw new Error("sensorReducer error")
  }
}

export function useSensor(
  deviceID: string,
  data: SensorInterface,
  handle: (
    deviceID: string,
    sensor: "Infrared Sensor" | "Shock Sensor"
  ) => Promise<boolean>
) {
  const [sensorData, sensorDispatch] = React.useReducer(sensorReducer, data)
  const sensorHandle = React.useMemo(() => {
    const handleDangerToNormal = async (
      sensor: "Infrared Sensor" | "Shock Sensor"
    ) => {
      let res = await handle(deviceID, sensor)
      if (res === true) {
        sensorDispatch({
          type: "SET_DANGER_TO_NORMAL",
          sensor,
        })
      }
    }
    const handleChangeSensorSwitch = (
      sensor: "Infrared Sensor" | "Shock Sensor"
    ) => {
      sensorDispatch({
        type: "CHANGE_SENSOR_SWITCH",
        sensor,
      })
    }
    return {
      setDangerToNormal: handleDangerToNormal,
      ChangeSensorSwitch: handleChangeSensorSwitch,
    }
  }, [deviceID, handle])

  return [sensorData, sensorHandle] as const
}

//地理位置信息hook
export type geographyAction =
  | {
      type: "CHANGE_AUTO_ALARM_STATUS"
    }
  | {
      type: "CHANGE_ADDRESS"
      address: Address
    }
function geographyReducer(state: AutoOnOff, action: geographyAction) {
  switch (action.type) {
    case "CHANGE_AUTO_ALARM_STATUS":
      state["on/off"] = state["on/off"] === "on" ? "off" : "on"
      return { ...state }
    case "CHANGE_ADDRESS":
      state.address = action.address
      return { ...state }
    default:
      throw new Error("geographyReducer error")
  }
}

export function useGeography(autoOnOff: AutoOnOff) {
  //加载阿里的定位包
  React.useEffect(() => {
    load()
  }, [])

  const [geography, geographyDispatch] = React.useReducer(
    geographyReducer,
    autoOnOff
  )
  const geographyHandle = React.useMemo(() => {
    const handleGetAndSaveAddress = async () => {
      let address = await getPosition()
      if (address !== null) {
        geographyDispatch({
          type: "CHANGE_ADDRESS",
          address,
        })
        alert("定位成功")
        return true
      } else {
        alert("定位失败")
        return false
      }
    }
    const handleChangeAutoAlarm = () => {
      geographyDispatch({
        type: "CHANGE_AUTO_ALARM_STATUS",
      })
    }
    return {
      changeAddress: handleGetAndSaveAddress,
      changeAutoAlarm: handleChangeAutoAlarm,
    }
  }, [geographyDispatch])

  return [geography, geographyHandle] as const
}
