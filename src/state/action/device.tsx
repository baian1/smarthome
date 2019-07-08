import { DevicesInterface, sensorType, SmokeInfraredShockSensorInterface } from "rootstate/interface/devices.interface";
import { ThunkAction } from "redux-thunk";
import { AppStateInterface } from "../reducers";
import { Action } from "redux";
import { httpDevice, httpUser } from "api/http";
import { userAction } from "../action";

//不需要进行网络请求的动作
export const setNormal = (devicesID: string, sensor: sensorType) => {
  return {
    type: 'SET_NORMAL',
    id: devicesID,
    sensor: sensor
  } as const;
}

export const getDevice = (devicesID: string) => ({
  type: 'GET_DEVICE_INFORMATION',
  id: devicesID,
} as const)

export const changeDeviceSensor = (devicesID: string, sensor: sensorType, param: SmokeInfraredShockSensorInterface) => ({
  type: 'CHANGE_DEVICE_SENSOR',
  id: devicesID,
  sensor,
  param,
} as const)

export const saveDevice = (devicesID: string, param: DevicesInterface) => ({
  type: 'SAVE_DEVICE_INFORMATION',
  devicesID,
  device: param
} as const)

export const getDeviceInit = (devicesList: DevicesInterface[]) => ({
  type: 'INIT_DEVICESLIST',
  devicesList,
} as const);

export const deleteDeviceFromCard = (deviceID: string) => ({
  type: 'DELET_DEVICE_FROM_CARD',
  id: deviceID,
} as const);


//async dispatch
export const initDevicelist = (): ThunkAction<Promise<boolean>, AppStateInterface, null, Action<string>> => {
  return async (dispatch): Promise<boolean> => {
    let devicesList = await httpDevice.getDeviceFromList();
    if (devicesList === null) {
      return false
    }
    dispatch(getDeviceInit(devicesList));
    return true
  }
}

export const deleteDevice = (deviceID: string): ThunkAction<Promise<boolean>, AppStateInterface, null, Action<string>> => {
  return async (dispatch): Promise<boolean> => {
    let res = await httpUser.deleteDevice(deviceID);
    if (res === true) {
      dispatch(userAction.deleteDevice(deviceID));
      dispatch(deleteDeviceFromCard(deviceID));
      return true;
    }
    return false;
  }
}

export const saveDeviceInformation = (param: DevicesInterface): ThunkAction<Promise<boolean>, AppStateInterface, null, Action<string>> => {
  return async (dispatch): Promise<boolean> => {
    let res = await httpDevice.saveDevice(param);
    if (res === true) {
      dispatch(saveDevice(param.deviceID, param));
      return true;
    }
    return false;
  }
}

export const setSensorNormal = (devicesID: string, sensor: sensorType): ThunkAction<Promise<boolean>, AppStateInterface, null, Action<string>> => {
  return async (dispatch): Promise<boolean> => {
    let res = await httpDevice.setSensorNormal(devicesID, sensor);
    if (res === true) {
      dispatch(setNormal(devicesID, sensor));
      return true;
    }
    return false;
  }
}