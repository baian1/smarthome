import { newFetch as fetch } from "./newFetch"
import { BASE_URL } from "./config"
import { DevicesInterface } from "rootstate/interface/devices.interface"
import { store } from "../../APP"

export async function getDeviceFromList() {
  let devicesList = store.getState().user.devices
  if (devicesList.length === 0) {
    return []
  } //如果列表是空直接返回;
  try {
    const response = await fetch(
      `${BASE_URL}/device/DeviceList?id=${JSON.stringify(devicesList)}`
    )
    if (response.status === 401) {
      throw new Error("登入超时，请重新登入")
    }
    if (response.status !== 200) {
      throw new Error("获取数据错误")
    }
    let change: DevicesInterface[] = []
    await response.json().then(res => {
      res.data.forEach((item: any) => {
        change.push({
          deviceID: item["_id"],
          name: item.name,
          autoOnOff: item.autoOnOff,
          data: item.data,
        })
      })
    })

    return change
  } catch (e) {
    alert(e.message)
    if (e.message === "登入超时，请重新登入") {
      return null
    }
    return []
  }
}

export async function saveDevice(param: DevicesInterface) {
  try {
    const response = await fetch(`${BASE_URL}/device/saveOne`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
    if (response.status !== 200) {
      throw new Error("保存数据错误")
    }
    alert("保存成功")
    return true
  } catch (e) {
    // alert(e);
    return false
  }
}

export async function setSensorNormal(deviceID: string, sensor: string) {
  const body = {
    _id: deviceID,
    data: {
      [sensor]: {
        status: "normal",
      },
    },
  }
  try {
    const response = await fetch(`${BASE_URL}/device/SensorNormal`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (response.status === 401) {
      throw new Error("认证超时")
    } else if (response.status !== 200) {
      throw new Error("清除出错")
    }
    alert("清除成功")
    return true
  } catch (err) {
    alert(err)
    return false
  }
}
