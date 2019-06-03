export type sensorType = 'Infrared Sensor' | 'Shock Sensor' | 'Smoke Sensor';

export interface SmokeSensorInterface {
  "status": "normal" | "danger";
  "on/off": "on" | "off";
  'concentration': number;
}

export interface InfraredSensorInterface {
  "status": "normal" | "danger";
  "on/off": "on" | "off";
}

export interface ShockSensorInterface {
  "status": "normal" | "danger";
  "on/off": "on" | "off";
}

export interface TemperatureAndHumiditySensor {
  "Temperature": number;
  "Humidity": number;
}

export interface SensorInterface {
  "Infrared Sensor": InfraredSensorInterface;
  "Temperature and Humidity Sensor": TemperatureAndHumiditySensor;
  "Shock Sensor": ShockSensorInterface;
  "Smoke Sensor": SmokeSensorInterface;
}

export interface Location {
  latitude?: number; // 经度
  longitude?: number; // 纬度
  address?: string; // 详细地址
  country?: string; // 国家
  province?: string; // 省份
  city?: string; // 城市
  cityCode?: string; // 城市编码
  district?: string; // 区
  street?: string; // 街道
  streetNumber?: string; // 门牌号
}

export interface DevicesInterface {
  "deviceID": string;
  "name": string;
  "data": SensorInterface;
  "autoOnOff": {
    address: Location;
    "on/off": "on" | "off";
  };
}