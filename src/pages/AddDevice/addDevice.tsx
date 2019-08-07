import React, { useContext, useCallback } from "react"
import { __RouterContext } from "react-router"
import QrReader from "components/QrReader"
import { History } from "history"

function useHistory() {
  const contextValue = useContext(__RouterContext)
  const { history } = contextValue
  return history
}

interface P {
  userID: string
  addUserDevice: (user: string, device: string) => Promise<boolean>
}

let wait = false

function AddDevice(props: P) {
  const history: History = useHistory()

  const onSuccess = async (device: string) => {
    if (wait === true) {
      return
    }
    wait = true
    let res = await props.addUserDevice(props.userID, device)
    if (res === false) {
      alert("二维码错误")
    } else {
      history.replace("/devicelist")
    }
    wait = false
  }

  const onFail = useCallback(() => {
    alert("设备缺少相机")
    history.replace("/devicelist")
  }, [])

  return <QrReader onSuccess={onSuccess} onFail={onFail} />
}

export { AddDevice }
