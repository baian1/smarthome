import Navbar from "components/Navbar"
import React, { Props, useState, useCallback, useReducer, useMemo } from "react"
import { History, Location } from "history"
import { withRoot } from "components/root/root"
import {
  DevicesInterface,
  sensorType,
} from "rootstate/interface/devices.interface"
import Alert from "components/alert"
import { Reset, switchOnOff } from "api/mqtt/send"
import { SensorToNormalPart } from "./part/parts/SensorToNormalPart"
import { SensorSwitchPart } from "./part/parts/SensorSwitchPart"
import { AddressPart } from "./part/parts/AddressPart"

import "./controller.less"
import { useSensor, useGeography } from "./hooks"

interface P extends Props<{}> {
  history: History
  location: Location<DevicesInterface>
  saveDevicesInformation(data: DevicesInterface): Promise<boolean>
  setDeviceSensorStatuToNormal(id: string, sensor: sensorType): Promise<boolean>
  deleteDevice(id: string): Promise<boolean>
}

const prefix = "controller" as const

function Controllor({
  location: { state },
  history,
  setDeviceSensorStatuToNormal,
  deleteDevice,
  saveDevicesInformation,
}: P) {
  const [houseName, sethouseName] = useState(state.name)

  const handleGoBack = useCallback(() => {
    history.goBack()
  }, [history])

  //传感器相关
  const setSensorStatuToNormal = useMemo(() => {
    return async (
      deviceID: string,
      sensor: "Infrared Sensor" | "Shock Sensor"
    ) => {
      return setDeviceSensorStatuToNormal(deviceID, sensor)
    }
  }, [setDeviceSensorStatuToNormal])
  const [sensorData, sensorHandle] = useSensor(
    state.deviceID,
    state.data,
    setSensorStatuToNormal
  )

  //地理位置相关
  const [geography, geographyHandle] = useGeography(state.autoOnOff)

  //保存所有信息
  const handleSaveInformation = useCallback(async () => {
    let data: DevicesInterface = {
      deviceID: state.deviceID,
      name: houseName,
      data: sensorData,
      autoOnOff: geography,
    }
    let res = await saveDevicesInformation(data)
    if (res === true) {
      //history.push("/devicelist")
      history.goBack()
      switchOnOff(
        state.deviceID,
        "Infrared Sensor",
        sensorData["Infrared Sensor"]["on/off"]
      )
      switchOnOff(
        state.deviceID,
        "Shock Sensor",
        sensorData["Shock Sensor"]["on/off"]
      )
    } else {
      alert("保存出错")
    }
  }, [
    geography,
    history,
    houseName,
    saveDevicesInformation,
    sensorData,
    state.deviceID,
  ])

  //删除设备
  const handleDeleteDevice = useCallback(async () => {
    async function goDevicelist() {
      let res = await deleteDevice(state.deviceID)
      if (res === true) {
        history.push("/devicelist")
        Reset(state.deviceID)
      } else {
        alert("删除出错")
      }
    }
    goDevicelist()
  }, [deleteDevice, history, state.deviceID])

  const address = geography.address === null ? "" : geography.address.address

  return (
    <>
      <Navbar
        title="设备控制"
        onLeftClick={handleGoBack}
        onrightClick={handleSaveInformation}
        rightContent="保存"
      />
      <div className={`${prefix}-wrap`}>
        <div className={`${prefix}-name`}>
          <div className={`${prefix}-name-notsharik`}>地点:</div>
          <input
            type="text"
            className={`${prefix}-input`}
            value={houseName}
            onChange={e => sethouseName(e.target.value)}
          />
        </div>
        <div className={`${prefix}-name`}>
          <div className={`${prefix}-name-notsharik`}>地址:</div>
          <div className={`${prefix}-input`}>
            <div className={`${prefix}-text`}>{address}</div>
          </div>
        </div>
      </div>
      <SensorToNormalPart sensorData={sensorData} sensorHandle={sensorHandle} />
      <SensorSwitchPart sensorData={sensorData} sensorHandle={sensorHandle} />
      <AddressPart geography={geography} geographyHandle={geographyHandle} />
      <button
        className={`${prefix}-deleteButton`}
        onClick={() => {
          Alert("Delete", "确定要删除设备吗?", [
            { text: "Cancel" },
            { text: "Ok", onPress: handleDeleteDevice },
          ])
        }}>
        删除设备
      </button>
      <div className={`${prefix}-foot`}></div>
    </>
  )
}

const ControllerRoot = withRoot(Controllor, "start")
export { ControllerRoot as Controller }
