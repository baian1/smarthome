import React, { Props } from "react";
import './controllerpart.less';
import Switch from 'antd-mobile/lib/switch';
import 'antd-mobile/lib/switch/style/index.less';
import anime from "animejs";

interface P extends Props<{}> {
  title: string;
  mode?: 'button' | 'switch';
  data: Data[];
}

export interface Data {
  title: string;
  handle: () => void;
  disabled?: boolean;
  mode?: 'button' | 'switch';
  check?: boolean;
  buttonContent?: string;
}

const prefix = "controllerpart";

class Part extends React.PureComponent<P> {
  private static defaultProps = {
    mode: 'button'
  };

  public constructor(props: P) {
    super(props);
  }

  public handleOnClick = (handle: () => void = () => { }) => {
    let buttontimer: boolean;
    buttontimer = false;
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (buttontimer === true) {
        return;
      }
      handle();
      buttontimer = true;
      let elemet: HTMLButtonElement = event.target as HTMLButtonElement;
      anime({
        targets: event.target,
        keyframes: [
          { "background-color": "rgba(59, 82, 82, 0.9)" },
          { "background-color": "rgba(109, 109, 204,0.534)" },
        ],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)',
      }).finished.then(() => {
        elemet.removeAttribute('style');
        buttontimer = false;
      }
      )
    }
  }

  public handlSwitch = (handle: () => void = () => { }) => {
    return () => {
      handle();
    }
  }

  public render(): JSX.Element {
    const list = this.props.data.map((value: Data, index: number) => {
      let mode = value.mode ? value.mode : this.props.mode;
      let key = index;
      switch (mode) {
        case "button":
          return (<div key={key} className={`${prefix}-li`}>{value.title}<button className={`${prefix}-button`} disabled={value.disabled} onClick={this.handleOnClick(value.handle)}>{value.buttonContent}</button></div>);
        case "switch":
          if (value === null) {
            return new Error('switch缺少check')
          }
          return (<div key={key} className={`${prefix}-li`}>{value.title}<Switch checked={value.check} key={key} onClick={this.handlSwitch(value.handle)} /></div>);
        default:
          return null;
      }
    })

    return (
      <div className={`${prefix}-wrap`}>
        <div className={`${prefix}-title`}>{this.props.title}</div>
        {list}
      </div>
    )
  }
}

export { Part };