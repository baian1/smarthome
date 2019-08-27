import React, { Props, useEffect, useCallback, useMemo } from "react"
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

const DeviceList: React.SFC<P> = ({
  history,
  devices: Alldevices,
  ...props
}: P) => {
  useEffect(() => {
    async function init() {
      if (Alldevices.length === 0) {
        await props.getDevicesList()
        let res = await props.initDevice()
        if (res === false) {
          history.push("/login")
        }
      }
      startMQTT()
    }
    init()
    // return () => {
    //   disconnectMQTT();
    // };
  }, [Alldevices.length, history, props])

  const handleGoController = useCallback(
    (device: DevicesInterface) => {
      history.push("/controller", {
        ...JSON.parse(JSON.stringify(device)),
      })
    },
    [history]
  )

  const cardList = useMemo(() => {
    if (Alldevices.length === 0) {
      return []
    } else {
      console.log(Alldevices)
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
  }, [Alldevices, handleGoController])

  return (
    <>
      <Navbar
        title="设备管理"
        rightContent={"添加设备"}
        onrightClick={() => {
          history.push("/addDevice")
        }}
      />
      {cardList}
    </>
  )
}

export default DeviceList
