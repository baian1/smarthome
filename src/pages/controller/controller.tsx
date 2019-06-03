import Navbar from "../../components/Navbar";
import React, { Props } from "react";
import { History, Location } from "history";
import { withRoot } from "../../components/root/root";

import './controller.less'
import { DevicesInterface, sensorType } from "../../redux/interface/devices.interface";
import { Part, Data } from "./controllerpart";
import Alert from '../../components/alert';
import WhiteSpace from 'antd-mobile/lib/white-space'
import { Reset, switchOnOff } from "../../api/mqtt/send";
import { load, getPosition } from '../../api/map'
import Loading from "../../components/Loading/Loading";

interface P extends Props<{}> {
  history: History;
  location: Location<DevicesInterface>;
  saveDevicesInformation(data: DevicesInterface): Promise<boolean>;
  setDeviceSensorStatuToNormal(id: string, sensor: sensorType): Promise<boolean>;
  deleteDevice(id: string): Promise<boolean>;
}

interface S extends DevicesInterface {
  loading: boolean;
}

const prefix = 'controller' as const;

class Controllor extends React.Component<P, S>{
  public constructor(props: P) {
    super(props);
    this.state = {
      ...JSON.parse(JSON.stringify(this.props.location.state)),
      loading: false
    };
  }

  public componentDidMount() {
    load();
  }

  public handleGoBack = (): void => {
    this.props.history.goBack();
  }

  public handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value,
    })
  }

  public handleDangerToNormal = async (sensor: sensorType) => {
    let res = await this.props.setDeviceSensorStatuToNormal(this.state.deviceID, sensor);
    if (res === true) {
      this.setState((preState: Readonly<S>) => {
        let newState = preState;
        newState.data[sensor].status = 'normal';
        return newState;
      })
    }

  }

  public handleChangeSensorSwitch = (sensor: sensorType) => {
    this.setState((preState: Readonly<S>) => {
      let newState = preState;
      newState.data[sensor]["on/off"] = preState.data[sensor]["on/off"] === 'on' ? 'off' : 'on';
      return newState;
    })
  }

  public handleChangeAutoAlarm = () => {
    this.setState((preState: S) => {
      let newState = preState;
      newState.autoOnOff["on/off"] = preState.autoOnOff["on/off"] === "on" ? 'off' : 'on';
      return newState;
    })
  }

  public handleSaveInformation = async () => {
    let data: any = {
      _id: this.state.deviceID,
      name: this.state.name,
      data: this.state.data,
      autoOnOff: this.state.autoOnOff,
    }
    let res = await this.props.saveDevicesInformation(data);
    if (res === true) {
      switchOnOff(this.state.deviceID, "Infrared Sensor", this.state.data["Infrared Sensor"]["on/off"]);
      switchOnOff(this.state.deviceID, "Shock Sensor", this.state.data["Shock Sensor"]["on/off"]);
      this.props.history.push('/devicelist');
    } else {
      alert('保存出错');
    }
  }

  public handleDeleteDevice = async () => {
    let res = await this.props.deleteDevice(this.state.deviceID);
    if (res === true) {
      this.props.history.push('/devicelist');
      Reset(this.state.deviceID);
    } else {
      alert('删除出错');
    }
  }

  public handleSaveAddress = async () => {
    this.setState({
      loading: true,
    })
    let address = await getPosition();
    if (address.address !== undefined) {
      this.setState((preState: S) => {
        let newState = preState;
        newState.autoOnOff.address = { ...newState.autoOnOff.address, ...address };
        return newState;
      });
      alert("定位成功");
    } else {
      alert("定位失败");
    }
    this.setState({
      loading: false,
    })
  }

  public render(): JSX.Element {
    const SensorToNormalPart: Data[] = [
      {
        title: "震动",
        buttonContent: '清除',
        disabled: this.state.data["Shock Sensor"]["on/off"] === "off" || this.state.data["Shock Sensor"].status === 'normal',
        handle: this.handleDangerToNormal.bind(null, "Shock Sensor")
      },
      {
        title: "红外",
        buttonContent: '清除',
        disabled: this.state.data["Infrared Sensor"]["on/off"] === 'off' || this.state.data["Infrared Sensor"].status === 'normal',
        handle: this.handleDangerToNormal.bind(null, "Infrared Sensor")
      },
    ];
    const SensorSwitchPart: Data[] = [
      {
        title: "震动",
        handle: this.handleChangeSensorSwitch.bind(null, "Shock Sensor"),
        check: this.state.data["Shock Sensor"]["on/off"] === "on"
      }, {
        title: "红外",
        handle: this.handleChangeSensorSwitch.bind(null, "Infrared Sensor"),
        check: this.state.data["Infrared Sensor"]["on/off"] === "on"
      }
    ];

    const addressPart: Data[] = [{
      title: '设置新地址',
      handle: this.handleSaveAddress,
      buttonContent: '定位',
    }, {
      title: '自动控制警报',
      mode: 'switch',
      check: this.state.autoOnOff["on/off"] === 'on',
      handle: this.handleChangeAutoAlarm,
    }]

    const address = this.state.autoOnOff.address === null ? '' : this.state.autoOnOff.address.address;

    return (
      <>
        <Navbar title='设备控制' onLeftClick={this.handleGoBack} onrightClick={this.handleSaveInformation} rightContent="保存" />
        <div className={`${prefix}-wrap`}>
          <div className={`${prefix}-name`}>
            <div className={`${prefix}-name-notsharik`}>地点:</div>
            <input type="text" className={`${prefix}-input`} value={this.state.name} onChange={this.handleNameChange} />
          </div>
          <div className={`${prefix}-name`}>
            <div className={`${prefix}-name-notsharik`}>地址:</div>
            <div className={`${prefix}-input`} ><div className={`${prefix}-text`}>{address}</div></div>
          </div>
        </div>
        <Part title="清除警报" data={SensorToNormalPart} mode="button" />
        <Part title="警报器开关" data={SensorSwitchPart} mode='switch' />
        <Part title="地址控制" data={addressPart} />
        <WhiteSpace size="lg" />
        <button className={`${prefix}-deleteButton`} onClick={() => {
          Alert('Delete', '确定要删除设备吗?', [
            { text: 'Cancel' },
            { text: 'Ok', onPress: this.handleDeleteDevice },
          ])
        }}>删除设备</button>
        <div className={`${prefix}-foot`}></div>
        <Loading animating={this.state.loading} />
      </>
    )
  }
}

const ControllerRoot = withRoot(Controllor, 'start');
export { ControllerRoot as Controller };