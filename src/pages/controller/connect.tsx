import { DevicesInterface, sensorType } from "../../redux/interface/devices.interface";
import { connect } from 'react-redux';
import { Controller } from './controller'
import { deleteDevice, setSensorNormal, saveDeviceInformation } from "../../redux/action/device";
import { AppStateInterface } from "../../redux/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllAction } from "../../redux/action";


export const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateInterface,null,AllAction>) => {
  return {
    saveDevicesInformation: (data: DevicesInterface) => dispatch(saveDeviceInformation(data)),
    setDeviceSensorStatuToNormal: (id: string, sensor: sensorType) => dispatch(setSensorNormal(id, sensor)),
    deleteDevice: (id: string) => dispatch(deleteDevice(id)),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Controller)