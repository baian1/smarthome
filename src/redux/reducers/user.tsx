import { userActionType } from "../action";
import { UserInterface } from "../interface/user.interface";

const userInit = {
  id: 'sad',
  token: 'sad',
  devices: ["3c:71:bf:29:a2:5b"],
}

const user = (state: UserInterface = userInit, action: userActionType): UserInterface => {
  switch (action.type) {
    case "ADD_DEVICE":
      if (action.deviceID) {
        state.devices.push(action.deviceID);
      }
      return { ...state };
    case "DELETE_DEVICE":
      if (action.deviceID) {
        if (state.devices !== undefined) {
          let index = state.devices.indexOf(action.deviceID);
          if (index !== -1) {
            state.devices = state.devices.splice(index, 1);
          }
        }
      }
      return { ...state };
    case "SAVE_USERID":
      if (action.userID) {
        state.id = action.userID;
      }
      return { ...state };
    case "SAVE_TOKEN":
      if (action.token) {
        state.token = action.token;
      }
      return { ...state };
    case "SAVE_DEVICESLIST":
      if (action.devicesList) {
        state.devices = action.devicesList;
      }
      return { ...state };
    default:
      return state;
  }
}

export { user };