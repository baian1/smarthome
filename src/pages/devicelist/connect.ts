import { AppStateInterface } from "redux/reducers";
import { deviceAction, AllAction } from "redux/action";
import { sensorType, SmokeInfraredShockSensorInterface } from "redux/interface/devices.interface";
import { connect } from 'react-redux';
import DevicesList from './devicelist'
import { initDevicelist } from "redux/action/device";
import { getUserDeviceList } from "redux/action/user";
import { ThunkDispatch } from "redux-thunk";


const mapStateToProps = (state: AppStateInterface) => {
  return {
    userID: state.user.id ? state.user.id : '',
    devicesList: state.user.devices,
    devices: state.devices,
  }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateInterface,null,AllAction>) => {
  return {
    saveDevicesList: (): Promise<string[]> => dispatch(getUserDeviceList()),
    initDevice: (): Promise<void> => dispatch(initDevicelist()),
    changeDeviceSensor: (devicesID: string, sensor: sensorType, param: SmokeInfraredShockSensorInterface) => dispatch(deviceAction.changeDeviceSensor(devicesID, sensor, param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevicesList)