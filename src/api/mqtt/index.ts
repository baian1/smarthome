import MQTT from "paho-mqtt"
import { store } from "../../APP"
import { deviceAction } from "rootstate/action"
import { sensorType } from "rootstate/interface/devices.interface"

// Create a client instance
export let client: MQTT.Client | null = null
let subTopicDeviceID: string[] = []

async function sub(client: MQTT.Client, devicesList: string[]) {
  if (client.isConnected() === false) {
    console.log("wait conncet")
    setTimeout(() => {
      sub(client, devicesList)
    }, 1000)
    return
  }

  let update = false

  for (let i = 0; i < devicesList.length; i++) {
    let item = devicesList[i]
    if (subTopicDeviceID.indexOf(item) === -1) {
      update = true
      subTopicDeviceID.push(item)
      client.subscribe(`devices/${item}/#`)
    }
  }

  if (update === true) {
    console.log("update")
  } else {
    console.log("is old")
  }
}

// called when the client connects
function onConnect(client: MQTT.Client, devicesList: string[]) {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onmqttConnect")
  client.subscribe("World")
  sub(client, devicesList)
  let message
  message = new MQTT.Message("Hello")
  message.destinationName = "World"
  client.send(message)
}

function onFailure() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onFailure")
  // Alert.alert('连接服务器失败');
}

// called when the client loses its connection
function onConnectionLost(responseObject: MQTT.MQTTError) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage)
  }
  if (client !== null) {
    client.connect()
  }
}

// called when a message arrives
function onMessageArrived(message: MQTT.Message) {
  console.log("onMessageArrived:" + message.payloadString)
  const topic = message.destinationName.split("/")
  let deviceID
  let sensor: sensorType
  switch (topic.length) {
    case 3:
      deviceID = topic[1]
      sensor = topic[2].replace(/_/g, " ") as sensorType
      store.dispatch(
        deviceAction.changeDeviceSensor(
          deviceID,
          sensor,
          JSON.parse(message.payloadString)
        )
      )
      break
    default:
      break
  }
}

const createMQTTClient = async (devicesList: string[], userID: string) => {
  client = new MQTT.Client("smarthome.fogmonth.xyz", 443, "/mqttwss", userID)

  const option = {
    timeout: 10,
    onSuccess: onConnect.bind(null, client, devicesList),
    onFailure: onFailure,
    reconnect: true,
    useSSL: true,
  }

  if (client.isConnected()) {
    return client
  }

  // set callback handlers
  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived

  // connect the client
  client.connect(option)

  return client
}

export const startMQTT = () => {
  if (client === null) {
    const devicesList = store.getState().user.devices
    const user = store.getState().user.id
    console.log("Creat Mqtt Client")
    createMQTTClient(devicesList, user)
  } else {
    console.log("Mqtt is exists")
    console.log("sub updating")
    sub(client, store.getState().user.devices)
  }
}

export const disconnectMQTT = () => {
  if (client !== null) {
    client.disconnect()
    client = null
  }
}
