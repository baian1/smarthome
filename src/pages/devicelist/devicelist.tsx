import React, { Props } from "react";
import withRoot from "../../components/root";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import { DevicesInterface, sensorType } from "../../redux/interface/devices.interface";
import { History } from "history";
import { startMQTT } from "../../api/mqtt";

interface P extends Props<{}> {
  history: History;
  userID: string;
  devicesList: string[];
  devices: DevicesInterface[];
  saveDevicesList: () => Promise<string[]>;
  initDevice: () => Promise<void>;
  changeDeviceSensor: (devicesID: string, sensor: sensorType, param: {}) => void;
}

class DeviceList extends React.Component<P>{
  public constructor(props: P) {
    super(props);
  }

  public async componentDidMount() {
    await this.props.saveDevicesList();
    await this.props.initDevice();
    startMQTT();
  }

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