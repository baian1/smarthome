import React, { Props } from "react";
import withRoot from "components/root";
import Navbar from "components/Navbar";
import Card from "components/Card";
import { DevicesInterface, sensorType, SmokeInfraredShockSensorInterface } from "rootstate/interface/devices.interface";
import { History } from "history";
import { startMQTT } from "api/mqtt";

interface P extends Props<{}> {
  history: History;
  userID: string;
  devicesList: string[];
  devices: DevicesInterface[];
  getDevicesList: () => Promise<string[]>;
  initDevice: () => Promise<boolean>;
  changeDeviceSensor: (devicesID: string, sensor: sensorType, param: SmokeInfraredShockSensorInterface) => void;
}

class DeviceList extends React.Component<P>{
  public constructor(props: P) {
    super(props);
  }

  public async componentDidMount() {
    await this.props.getDevicesList();
    let res = await this.props.initDevice();
    if (res === false) {
      this.props.history.push('/login')
    }
    startMQTT();
  }

  // public async componentWillUnmount() {
  //   disconnectMQTT();
  // }

  public handleGoController = (device: DevicesInterface) => {
    this.props.history.push('/controller', {
      ...device
    })
  }

  public render(): JSX.Element {

    let cardList: JSX.Element[] = [];
    if (this.props.devices.length === 0) {
      cardList = [];
    } else {
      cardList = this.props.devices.map((item) => {
        return <Card device={item} key={item.deviceID} handleOnClick={this.handleGoController} />
      });
    }

    return (
      <>
        <Navbar title="设备管理" />
        {cardList}
      </>
    )
  }
}

export default withRoot(DeviceList, 'start');