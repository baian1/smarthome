import React, { useMemo, useState } from "react"
import { Data } from "../BasePart"
import { BasePart } from "../BasePart"
import Loading from "components/Loading/Loading"
import { AutoOnOff } from "interface/devices.interface"

interface P {
  geography: AutoOnOff
  geographyHandle: {
    changeAddress: () => Promise<boolean>
    changeAutoAlarm: () => void
  }
}

const AddressPart: React.SFC<P> = ({ geography, geographyHandle }: P) => {
  const [loading, setLoading] = useState(false)

  const selfGeographyHandle = useMemo(() => {
    const handleGetAndSaveAddress = async () => {
      setLoading(loading => !loading)
      await geographyHandle.changeAddress()
      setLoading(loading => !loading)
    }
    const handleChangeAutoAlarm = geographyHandle.changeAutoAlarm
    return {
      changeAddress: handleGetAndSaveAddress,
      changeAutoAlarm: handleChangeAutoAlarm,
    }
  }, [setLoading, geographyHandle])

  const data: Data[] = useMemo(
    () => [
      {
        title: "设置新地址",
        handle: selfGeographyHandle.changeAddress,
        buttonContent: "定位",
      },
      {
        title: "自动控制警报",
        mode: "switch",
        check: geography["on/off"] === "on",
        handle: selfGeographyHandle.changeAutoAlarm,
      },
    ],
    [geography, selfGeographyHandle]
  )

  return (
    <>
      <BasePart title="警报器开关" data={data} mode="button" />
      <Loading animating={loading} />
    </>
  )
}

export { AddressPart }
