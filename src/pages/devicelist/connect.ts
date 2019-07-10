import { AppStateInterface } from "rootstate/reducers";
import { deviceAction, AllAction } from "rootstate/action";
import { sensorType, SmokeInfraredShockSensorInterface } from "rootstate/interface/devices.interface";
import { connect } from 'react-redux';
import DevicesList from './devicelist'
import { initDevicelist } from "rootstate/action/device";
import { getUserDeviceList } from "rootstate/action/user";
import { ThunkDispatch } from "redux-thunk";


const mapStateToProps = (state: AppStateInterface) => {
  return {
    devices: state.devices,
  }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppStateInterface,null,AllAction>) => {
  return {
    getDevicesList: (): Promise<string[]> => dispatch(getUserDeviceList()),
    initDevice: (): Promise<boolean> => dispatch(initDevicelist()),
    changeDeviceSensor: (devicesID: string, sensor: sensorType, param: SmokeInfraredShockSensorInterface) => dispatch(deviceAction.changeDeviceSensor(devicesID, sensor, param)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevicesList)