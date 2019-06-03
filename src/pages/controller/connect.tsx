import { deviceAction } from "../../redux/action";
import { DevicesInterface, sensorType } from "../../redux/interface/devices.interface";
import { connect } from 'react-redux';
import { Controller } from './controller'


export const mapDispatchToProps = (dispatch: Function) => {
  return {
    saveDevicesInformation: (data: DevicesInterface): Promise<boolean> => dispatch(deviceAction.saveDeviceInformation(data)),
    setDeviceSensorStatuToNormal: (id: string, sensor: sensorType): Promise<boolean> => dispatch(deviceAction.setSensorNormal(id, sensor)),
    deleteDevice: (id: string): Promise<boolean> => dispatch(deviceAction.deleteDeviceById(id)),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Controller)