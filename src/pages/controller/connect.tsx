import {
  DevicesInterface,
  sensorType,
} from "rootstate/interface/devices.interface"
import { connect } from "react-redux"
import { Controller } from "./controller"
import {
  deleteDevice,
  setSensorNormal,
  saveDeviceInformation,
} from "rootstate/action/device"
import { AppStateInterface } from "rootstate/reducers"
import { ThunkDispatch } from "redux-thunk"
import { AllAction } from "rootstate/action"

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateInterface, null, AllAction>
) => {
  return {
    saveDevicesInformation: (data: DevicesInterface) =>
      dispatch(saveDeviceInformation(data)),
    setDeviceSensorStatuToNormal: (id: string, sensor: sensorType) =>
      dispatch(setSensorNormal(id, sensor)),
    deleteDevice: (id: string) => dispatch(deleteDevice(id)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Controller)
