import {
  setNormal,
  saveDevice,
  getDevice,
  getDeviceInit,
  changeDeviceSensor,
  deleteDeviceFromCard,
} from "./device"
import {
  addDevice,
  saveDevicesList,
  deleteDevice,
  saveToken,
  saveUserID,
} from "./user"

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
type GetAllAction<T> = {
  [P in keyof T]: ReturnType<T[P]>
}[keyof T]

//user相关的action
export const userAction = {
  addDevice,
  saveDevicesList,
  deleteDevice,
  saveToken,
  saveUserID,
}
export type userActionType = GetAllAction<typeof userAction>

//device相关的action
export const deviceAction = {
  getDevice,
  getDeviceInit,
  changeDeviceSensor,
  setNormal,
  saveDevice,
  deleteDeviceFromCard,
}
export type deviceActionType = GetAllAction<typeof deviceAction>

//所有action
export type AllAction = deviceActionType | userActionType
