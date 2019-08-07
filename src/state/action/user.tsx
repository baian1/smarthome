import { ThunkAction } from "redux-thunk"
import { httpUser } from "api/http"
import { AppStateInterface } from "../reducers"
import { AllAction } from "../action"

//不需要进行网络请求的动作
export const addDevice = (deviceID: string) =>
  ({
    type: "ADD_DEVICE",
    deviceID: deviceID,
  } as const)

export const deleteDevice = (deviceID: string) =>
  ({
    type: "DELETE_DEVICE",
    deviceID: deviceID,
  } as const)

export const saveUserID = (userID: string) =>
  ({
    type: "SAVE_USERID",
    userID,
  } as const)

export const saveToken = (token: string) =>
  ({
    type: "SAVE_TOKEN",
    token,
  } as const)

export const saveDevicesList = (devicesList: string[]) =>
  ({
    type: "SAVE_DEVICESLIST",
    devicesList,
  } as const)

//async dispatch
export const login = (
  userID: string,
  passWord: string
): ThunkAction<Promise<boolean>, AppStateInterface, null, AllAction> => {
  return async (dispatch): Promise<boolean> => {
    let token = await httpUser.login(userID, passWord)
    if (typeof token === "string") {
      dispatch(saveUserID("mike"))
      dispatch(saveToken(token))
      return true
    }
    return false
  }
}

export const getUserDeviceList = (): ThunkAction<
  Promise<string[]>,
  AppStateInterface,
  null,
  AllAction
> => {
  return async (dispatch): Promise<string[]> => {
    let devicesList = await httpUser.getDevices()
    if (typeof devicesList !== "boolean") {
      dispatch(saveDevicesList(devicesList))
      return devicesList
    }
    return []
  }
}

export const addUserDevice = (
  user: string,
  device: string
): ThunkAction<Promise<boolean>, AppStateInterface, null, AllAction> => {
  return async (dispatch): Promise<boolean> => {
    let res = await httpUser.ApiAddDevice(user, device)
    if (res === true) {
      dispatch(addDevice(device))
      return true
    } else {
      return false
    }
  }
}
// function exampleAPI() {
//   return Promise.resolve('Async Chat Bot')
// }

// const thunkSendMessage = (
//   message: string
// ): ThunkAction<void, AppStateInterface, null, Action<string>> => async dispatch => {
//   const asyncResp = await exampleAPI()
//   dispatch(
//     sendMessage({
//       message,
//       user: asyncResp,
//       timestamp: new Date().getTime()
//     })
//   )
// }
