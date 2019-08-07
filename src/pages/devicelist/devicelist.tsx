import React, { Props, useEffect, useCallback, useMemo } from "react"
import withRoot from "components/root"
import Navbar from "components/Navbar"
import Card from "components/Card"
import {
  DevicesInterface,
  sensorType,
  SmokeInfraredShockSensorInterface,
} from "rootstate/interface/devices.interface"
import { History } from "history"
import { startMQTT } from "api/mqtt"

interface P extends Props<{}> {
  history: History
  devices: DevicesInterface[]
  getDevicesList: () => Promise<string[]>
  initDevice: () => Promise<boolean>
  changeDeviceSensor: (
    devicesID: string,
    sensor: sensorType,
    param: SmokeInfraredShockSensorInterface
  ) => void
}

function DeviceList({ history, devices: Alldevices, ...props }: P) {
  useEffect(() => {
    async function init() {
      await props.getDevicesList()
      let res = await props.initDevice()
      if (res === false) {
        history.push("/login")
      }
      startMQTT()
    }
    init()
    // return () => {
    //   disconnectMQTT();
    // };
  }, [Alldevices.length])

  const handleGoController = useCallback(
    (device: DevicesInterface) => {
      history.push("/controller", {
        ...device,
      })
    },
    [history]
  )

  const cardList = useMemo(() => {
    if (Alldevices.length === 0) {
      return []
    } else {
      return Alldevices.map(item => {
        return (
          <Card
            device={item}
            key={item.deviceID}
            handleOnClick={handleGoController}
          />
        )
      })
    }
  }, [Alldevices])

  return (
    <>
      <Navbar
        title="设备管理"
        rightContent={"添加设备"}
        onrightClick={() => {
          history.replace("/addDevice")
        }}
      />
      {cardList}
    </>
  )
}

export default withRoot(DeviceList, "start")
