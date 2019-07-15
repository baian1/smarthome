import React, { useContext } from "react"
import { __RouterContext } from "react-router"
import { QrReader } from "components/QrReader/qrReader";
import { History } from "history";

function useHistory() {
  const contextValue = useContext(__RouterContext)
  const { history } = contextValue
  return history
}

interface P {
  userID: string;
  addUserDevice: (user: string, device: string) => Promise<boolean>;
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
      alert('二维码错误')
    } else {
      history.replace('/devicelist')
    }
    wait = false
  }

  return (
    <QrReader onSuccess={onSuccess} />
  )
}

export { AddDevice }