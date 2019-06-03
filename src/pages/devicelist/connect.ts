import { AppStateInterface } from "../../redux/reducers";
import { deviceAction } from "../../redux/action";
import { DevicesInterface, sensorType } from "../../redux/interface/devices.interface";
import { connect } from 'react-redux';
import DevicesList from './devicelist'
import { getUserDeviceList } from "../../redux/action/user";
import { initDevicelist } from "../../redux/action/device";


const mapStateToProps = (state: AppStateInterface) => {
  return {
    userID: state.user.id ? state.user.id : '',
    devicesList: state.user.devices,
    devices: state.devices,
  }
}

export const mapDispatchToProps = (dispatch: Function) => {
  return {
    saveDevicesList: (): Promise<string[]> => dispatch(getUserDeviceList()),
    initDevice: (): Promise<void> => dispatch(initDevicelist()),
    changeDeviceSensor: (devicesID: string, sensor: sensorType, param: {}): void => dispatch(deviceAction.changeDeviceSensor(devicesID, sensor, param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevicesList)