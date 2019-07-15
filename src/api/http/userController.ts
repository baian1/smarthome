import { User } from '../localStorage';
import { newFetch } from './newFetch';
import { BASE_URL } from './config';

async function addDevice(body: string) {
  try {
    const response: Response = await newFetch(`${BASE_URL}/user/addDeviceID`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}


export const ApiAddDevice = async (userID: string, deviceID: string) => {
  const body = JSON.stringify({
    user: userID,
    devices: [deviceID]
  });
  let status = false;
  let time = 0;
  while (!status) {
    await new Promise(async (resolve) => {
      status = await addDevice(body);
      resolve();
    })
    time++;
    if (time > 10) {
      alert("连接失败");
      break;
    }
  }
  if (status) {
    let deviceIDList = await User.get('devices');
    deviceIDList.push(deviceID);
    User.save('devices', deviceIDList);
    return true;
  } else {
    return false;
  }
}

export async function deleteDevice(deviceID: string | string[]) {
  const userID = await User.get('id');
  const body = {
    user: userID,
    devices: typeof deviceID === 'string' ? [deviceID] : deviceID,
  }
  try {
    const response: Response = await newFetch(`${BASE_URL}/user/DeviceID`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      console.log('删除成功');
      return true;
    } else {
      throw new Error("删除失败");
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
}

export async function getDevices(): Promise<boolean | string[]> {
  const userID = await User.get('id');
  try {
    const response = await newFetch(`${BASE_URL}/user/getDevicesList?userID=${userID}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": 'application/json',
      }
    });
    console.log(response);
    if (response.status === 200) {
      return response.json().then((res) => {
        User.save("devices", res.data.devices);
        return res.data.devices;
      })
    } else if (response.status === 401) {
      return false;
    }
    User.save("devices", []);
    return false;
  } catch (err) {
    alert("网络连接错误");
    return false;
  }
}

export async function login(userID: string, password: string): Promise<string | boolean> {
  let body = {
    user: userID,
    password: password
  }
  try {
    const response: Response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });//登入请求
    console.log(response);
    if (response.status === 200) {
      return response.json().then((res) => {
        User.save('token', res.data.token);
        User.save('id', userID);
        return res.data.token;
      });
    } else if (response.status === 401) {
      throw new Error('账号密码错误');
    } else if (response.status !== 200) {
      throw new Error("服务器错误");
    }
    return true;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return false;
  }

}

export async function checkToken() {
  try {
    const res = await newFetch(`${BASE_URL}/device/checkToken`, {
      method: "GET",

    });
    console.log(res);
    if (res.status === 200) {
      return true;
    } else {
      // Alert.alert("登入超时");
      return false;
    }
  } catch (error) {
    console.log(error);
    alert("服务器出错");
    return false;
  }
}