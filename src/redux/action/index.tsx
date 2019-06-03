import { setNormal, saveDevice, getDevice, getDeviceInit, changeDeviceSensor, deleteDeviceFromCard, deleteDevice as deleteDeviceById, saveDeviceInformation, setSensorNormal } from './device';
import { addDevice, saveDevicesList, deleteDevice, saveToken, saveUserID } from './user';

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export const userAction = { addDevice, saveDevicesList, deleteDevice };
export type userActionType = ReturnType<typeof userAction.addDevice>
| ReturnType<typeof userAction.saveDevicesList>
| ReturnType<typeof userAction.deleteDevice>
| ReturnType<typeof saveToken>
| ReturnType<typeof saveUserID>

export const deviceAction = { getDevice, getDeviceInit, changeDeviceSensor, deleteDeviceById, saveDeviceInformation, setSensorNormal };
export type deviceActionType = ReturnType<typeof setNormal>
| ReturnType<typeof saveDevice>
| ReturnType<typeof getDevice>
| ReturnType<typeof getDeviceInit>
| ReturnType<typeof changeDeviceSensor>
| ReturnType<typeof deleteDeviceFromCard>