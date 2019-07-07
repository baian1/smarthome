import React, { Props, RefObject } from "react";
import "./card.less"
import anime from "animejs";
import { DevicesInterface, SensorInterface } from "redux/interface/devices.interface";

interface P extends Props<{}> {
  device: DevicesInterface;
  handleOnClick?: (device: DevicesInterface) => void;
}

const prefix = 'card';
const contentCenter = `${prefix}-content-center`;

type allSensor = keyof SensorInterface;

class Card extends React.PureComponent<P> {
  protected card: RefObject<HTMLDivElement>;

  public constructor(props: P) {
    super(props);
    this.card = React.createRef();
  }

  public handleAction = (): void => {
    anime({
      targets: this.card.current,
      scale: 2,
      opacity: {
        value: 0,
        easing: 'linear'
      },
      duration: 800,
    }).finished.then((): void => {
      if (this.props.handleOnClick) {
        this.props.handleOnClick(this.props.device);
      }
    })
  }

  public render(): JSX.Element {
    const {
      name,
      deviceID,
      data,
    } = this.props.device;

    return (
      <div ref={this.card} className={`${prefix}-wrap`} onClick={this.handleAction}>
        <div className={`${prefix}-left`}>
          <div className={`${prefix}-left-up ${contentCenter}`}>{name ? name : deviceID}</div>
          <div className={`${prefix}-left-down ${contentCenter}`}>
            <div>湿度:{data["Temperature and Humidity Sensor"].Humidity}</div>
            <br />
            <div>温度:{data["Temperature and Humidity Sensor"].Temperature}</div>
          </div>
        </div>
        <div className={`${prefix}-right`}>
          <div className={`${prefix}-right-up ${contentCenter}`}>
            <div>震动:{data["Shock Sensor"]["on/off"] === "on" ? data["Shock Sensor"].status === 'danger' ? '危险' : '正常' : '关闭'}</div>
            <br />
            <div>红外:{data["Infrared Sensor"]["on/off"] === "on" ? data['Infrared Sensor'].status === 'danger' ? '危险' : '正常' : "关闭"}</div>
          </div>
          <div className={`${prefix}-right-down ${contentCenter}`}>
            <div>烟雾浓度:{data["Smoke Sensor"]["on/off"] === 'on' ? data["Smoke Sensor"].concentration : "关闭"}</div>
            <br />
            <div>状态:{data["Smoke Sensor"].status}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;