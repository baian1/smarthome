import MQTT from "paho-mqtt";
import { store } from "../../APP";
import { deviceAction } from "rootstate/action";
import { sensorType } from "rootstate/interface/devices.interface";

// Create a client instance
export let client: MQTT.Client | null = null;

function sub(client: MQTT.Client, devicesList: string[]) {
  devicesList.forEach((item) => {
    client.subscribe(`devices/${item}/#`);
  })
}

// called when the client connects
function onConnect(client: MQTT.Client, devicesList: string[]) {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onmqttConnect");
  client.subscribe("World");
  sub(client, devicesList);
  let message;
  message = new MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

function onFailure() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onFailure");
  // Alert.alert('连接服务器失败');
}

// called when the client loses its connection
function onConnectionLost(responseObject: MQTT.MQTTError) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  if(client!==null){
    client.connect();
  }
}

// called when a message arrives
function onMessageArrived(message: MQTT.Message) {
  console.log("onMessageArrived:" + message.payloadString);
  const topic = message.destinationName.split('/');
  let deviceID;
  let sensor: sensorType;
  switch (topic.length) {
    case 3:
      deviceID = topic[1];
      sensor = topic[2].replace(/_/g, ' ') as sensorType;
      store.dispatch(deviceAction.changeDeviceSensor(deviceID, sensor, JSON.parse(message.payloadString)))
      break;
    default:
      break;
  }
}

const createMQTTClient = async (devicesList: string[], userID: string) => {
  client = new MQTT.Client("fogmonth.xyz", 443, '/mqttwss', userID);

  const option = {
    timeout: 10,
    onSuccess: onConnect.bind(null, client, devicesList),
    onFailure: onFailure,
    reconnect: true,
    useSSL: true,
  }

  if (client.isConnected()) {
    return client;
  }

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect(option);

  return client;
}

export const startMQTT = () => {
  if (client === null) {
    const devicesList = store.getState().user.devices;
    const user = store.getState().user.id;
    createMQTTClient(devicesList, user);
  } else {
    console.log("Mqtt is exists")
  }
}

export const disconnectMQTT = () => {
  if (client !== null) {
    client.disconnect();
    client = null;
  }
}