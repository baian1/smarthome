import { DevicesInterface } from "interface/devices.interface";
import { deviceActionType } from "../action";

// const deviceinit: DevicesInterface = {
//   "deviceID": "3c:71:bf:29:a2:5b",
//   "name": "家",
//   "autoOnOff": {
//     "on/off": "off",
//     "address":
//       { "streetNumber": "", "street": "117县道", "district": "灵川县", "cityCode": "0773", "country": "中国", "address": "广西壮族自治区桂林市灵川县117县道靠近桂林电子科技大学花江校区", "longitude": 110.409453, "city": "桂林市", "province": "广西壮族自治区", "latitude": 25.311339, }
//   },
//   "data": { "Infrared Sensor": { "on/off": "off", "status": "normal" }, "Shock Sensor": { "on/off": "on", "status": "danger" }, "Smoke Sensor": { "on/off": "on", "status": "normal", "concentration": 1986 }, "Temperature and Humidity Sensor": { "Temperature": 28.8, "Humidity": 74 } },
// }

const devices = (state: DevicesInterface[] = [], action: deviceActionType): DevicesInterface[] => {
  let deleteindex = -1;

  switch (action.type) {
    case 'SAVE_DEVICE_INFORMATION':
      return state.map((item): DevicesInterface => {
        if (action.device !== undefined && item.deviceID === action.device.deviceID) {
          return action.device
        }
        return item;
      });
    case "INIT_DEVICESLIST":
      if (action.devicesList === undefined) {
        return [];
      }
      return action.devicesList;
    case 'SET_NORMAL':
      return state.map((item): DevicesInterface => {
        if (item.deviceID === action.id) {
          item.data[action.sensor].status = 'normal';
        }
        return item;
      });
    case 'CHANGE_DEVICE_SENSOR':
      return state.map((item): DevicesInterface => {
        if (item.deviceID === action.id) {
          switch (action.sensor) {
            case 'Infrared Sensor':
            case 'Shock Sensor':
              item.data[action.sensor] = { ...item.data[action.sensor], ...action.param };
              break;
            case 'Smoke Sensor':
              item.data[action.sensor] = { ...item.data[action.sensor], ...action.param };
              break;
            default:
          }
        }
        return item;
      });
    case 'DELET_DEVICE_FROM_CARD':
      state.some((item, index): boolean => {
        if (item.deviceID !== action.id) {
          return false;
        } else {
          deleteindex = index;
          return true;
        }
      })
      if (deleteindex !== -1) {
        state.splice(deleteindex, 1);
      }
      return [...state];

    default:
      return state;
  }
}


export { devices };