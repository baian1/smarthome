import MQTT from "paho-mqtt";
import { client } from './index';
import { sensorType } from "rootstate/interface/devices.interface";

export function switchOnOff(deviceID: string, sensor: sensorType, onoff: 'on' | 'off') {
  if (client === null) {
    return;
  }

  const message = new MQTT.Message(onoff.toLocaleUpperCase());
  message.destinationName = `devices/${deviceID}/ONOFF/${sensor}`;
  message.qos = 1;
  client.send(message);
  // setTimeout(() => { if (client !== null) { client.send(message) } }, 1000);
}

export function Reset(deviceID: string) {
  if (client === null) {
    return;
  }

  const message = new MQTT.Message('1');
  message.destinationName = `devices/${deviceID}/RESET`;
  client.send(message);
}