import Navbar from "../../components/Navbar";
import React, { Props, useState, useEffect, useCallback, useReducer, useMemo } from "react";
import { History, Location } from "history";
import { withRoot } from "../../components/root/root";

import './controller.less'
import { AutoOnOff, AddressLocation as Address, DevicesInterface, sensorType, SensorInterface } from "../../redux/interface/devices.interface";
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

type sensorAction = {
  type: 'SET_DANGER_TO_NORMAL';
  sensor: 'Infrared Sensor' | 'Shock Sensor';
} | {
  type: 'CHANGE_SENSOR_SWITCH';
  sensor: 'Infrared Sensor' | 'Shock Sensor';
}
function sensorReducer(state: SensorInterface, action: sensorAction) {
  switch (action.type) {
    case 'SET_DANGER_TO_NORMAL':
      state[action.sensor].status = 'normal'
      state[action.sensor] = { ...state[action.sensor] }
      return { ...state }
    case 'CHANGE_SENSOR_SWITCH':
      state[action.sensor]["on/off"] = state[action.sensor]["on/off"] === 'on' ? 'off' : 'on'
      state[action.sensor] = { ...state[action.sensor] }
      return { ...state }
    default:
      throw new Error('sensorReducer error')
  }
}

type geographyAction = {
  type: "CHANGE_AUTO_ALARM_STATUS";
} | {
  type: "CHANGE_ADDRESS";
  address: Address;
}
function geographyReducer(state: AutoOnOff, action: geographyAction) {
  switch (action.type) {
    case "CHANGE_AUTO_ALARM_STATUS":
      state["on/off"] = state["on/off"] === 'on' ? 'off' : 'on'
      return state
    case "CHANGE_ADDRESS":
      state.address = action.address
      return state
    default:
      throw new Error('geographyReducer error')
  }
}

function Controllor({ "location": { state }, history, setDeviceSensorStatuToNormal, deleteDevice, saveDevicesInformation }: P) {
  const [loading, setLoading] = useState(false)
  const [houseName, sethouseName] = useState(state.name)

  //加载阿里的定位包
  useEffect(() => {
    load()
  }, [])

  const handleGoBack = useCallback(
    () => {
      history.goBack()
    },
    [history]
  )

  //传感器相关信息
  const [sensorData, sensorDispatch] = useReducer(sensorReducer, state.data)
  const sensorHandle = useMemo(() => {
    const handleDangerToNormal = async (sensor: "Infrared Sensor" | "Shock Sensor") => {
      let res = await setDeviceSensorStatuToNormal(state.deviceID, sensor);
      if (res === true) {
        sensorDispatch({
          type: 'SET_DANGER_TO_NORMAL',
          sensor
        })
      }
    }
    const handleChangeSensorSwitch = (sensor: "Infrared Sensor" | "Shock Sensor") => {
      sensorDispatch({
        type: 'CHANGE_SENSOR_SWITCH',
        sensor
      })
    }
    return {
      setDangerToNormal: handleDangerToNormal,
      ChangeSensorSwitch: handleChangeSensorSwitch
    }
  }, [sensorDispatch])


  //地理位置相关信息
  const [geography, geographyDispatch] = useReducer(geographyReducer, state.autoOnOff)
  const geographyHandle = useMemo(() => {
    const handleGetAndSaveAddress = async () => {
      setLoading((loading) => !loading)
      let address = await getPosition();
      if (address.address !== undefined) {
        geographyDispatch({
          type: 'CHANGE_ADDRESS',
          address
        })
        alert("定位成功");
      } else {
        alert("定位失败");
      }
      setLoading((loading) => !loading)
    }
    const handleChangeAutoAlarm = () => {
      geographyDispatch({
        type: 'CHANGE_AUTO_ALARM_STATUS'
      })
    }
    return {
      changeAddress: handleGetAndSaveAddress,
      changeAutoAlarm: handleChangeAutoAlarm,
    }
  }, [setLoading, geographyDispatch])

  //保存所有信息
  const handleSaveInformation = useCallback(async () => {
    let data: any = {
      _id: state.deviceID,
      name: name,
      data: sensorData,
      autoOnOff: geography,
    }
    let res = await saveDevicesInformation(data);
    history.push('/devicelist');
    if (res === true) {
      switchOnOff(state.deviceID, "Infrared Sensor", sensorData["Infrared Sensor"]["on/off"]);
      switchOnOff(state.deviceID, "Shock Sensor", sensorData["Shock Sensor"]["on/off"]);
    } else {
      alert('保存出错');
    }
  }, [])
  //删除设备
  const handleDeleteDevice = useCallback(async () => {
    let res = await deleteDevice(state.deviceID);
    if (res === true) {
      history.push('/devicelist');
      Reset(state.deviceID);
    } else {
      alert('删除出错');
    }
  }, [state.deviceID])

  //三个模块SensorToNormalPart，SensorSwitchPart
  const sensorToNormalPart: Data[] = useMemo(() => [
    {
      title: "震动",
      buttonContent: '清除',
      disabled: sensorData["Shock Sensor"]["on/off"] === "off" || sensorData["Shock Sensor"].status === 'normal',
      handle: () => { sensorHandle.setDangerToNormal('Shock Sensor') }
    },
    {
      title: "红外",
      buttonContent: '清除',
      disabled: sensorData["Infrared Sensor"]["on/off"] === 'off' || sensorData["Infrared Sensor"].status === 'normal',
      handle: () => { sensorHandle.setDangerToNormal('Infrared Sensor') }
    },
  ], [sensorData["Shock Sensor"].status, sensorData["Infrared Sensor"].status])


  const sensorSwitchPart: Data[] = useMemo(() => [
    {
      title: "震动",
      handle: () => { sensorHandle.ChangeSensorSwitch('Shock Sensor') },
      check: sensorData["Shock Sensor"]["on/off"] === "on"
    }, {
      title: "红外",
      handle: () => { sensorHandle.ChangeSensorSwitch('Infrared Sensor') },
      check: sensorData["Infrared Sensor"]["on/off"] === "on"
    }
  ], [sensorData["Shock Sensor"]["on/off"], sensorData["Infrared Sensor"]["on/off"]])

  const addressPart: Data[] = useMemo(() => [{
    title: '设置新地址',
    handle: geographyHandle.changeAddress,
    buttonContent: '定位',
  }, {
    title: '自动控制警报',
    mode: 'switch',
    check: geography["on/off"] === 'on',
    handle: geographyHandle.changeAutoAlarm,
  }], [geography["on/off"], geography.address])

  const address = geography.address === null ? '' : geography.address.address;

  return (
    <>
      <Navbar title='设备控制' onLeftClick={handleGoBack} onrightClick={handleSaveInformation} rightContent="保存" />
      <div className={`${prefix}-wrap`}>
        <div className={`${prefix}-name`}>
          <div className={`${prefix}-name-notsharik`}>地点:</div>
          <input type="text" className={`${prefix}-input`} value={houseName} onChange={(e) => sethouseName(e.target.value)} />
        </div>
        <div className={`${prefix}-name`}>
          <div className={`${prefix}-name-notsharik`}>地址:</div>
          <div className={`${prefix}-input`} ><div className={`${prefix}-text`}>{address}</div></div>
        </div>
      </div>
      <Part title="清除警报" data={sensorToNormalPart} mode="button" />
      <Part title="警报器开关" data={sensorSwitchPart} mode='switch' />
      <Part title="地址控制" data={addressPart} />
      <WhiteSpace size="lg" />
      <button className={`${prefix}-deleteButton`} onClick={() => {
        Alert('Delete', '确定要删除设备吗?', [
          { text: 'Cancel' },
          { text: 'Ok', onPress: handleDeleteDevice },
        ])
      }}>删除设备</button>
      <div className={`${prefix}-foot`}></div>
      <Loading animating={loading} />
    </>
  )
}


const ControllerRoot = withRoot(Controllor, 'start');
export { ControllerRoot as Controller };