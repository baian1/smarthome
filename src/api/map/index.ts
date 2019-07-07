import AMap from 'amap-js-sdk';
import { AddressLocation } from '../../redux/interface/devices.interface';

let geolocation: AMap.Geolocation;
let mapObj: AMap.Map | undefined;

export async function load() {
  function loadMap() {
    if (mapObj !== undefined) {
      return;
    }
    mapObj = new AMap.Map('iCenter');
    mapObj.plugin('AMap.Geolocation', function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      (mapObj as AMap.Map).addControl(geolocation);
    });
  }
  // var url = 'https://webapi.amap.com/maps?v=1.4.14&key=b15278a411c3c418799315efe939b534';
  // var jsapi = document.createElement('script');
  // jsapi.charset = 'utf-8';
  // jsapi.src = url;
  // jsapi.addEventListener("load", loadMap);
  // document.head.appendChild(jsapi);
  loadMap();
}

export async function getPosition(): Promise<AddressLocation> {
  if (geolocation !== undefined) {
    try {
      let res: AMap.GeolocationResult;
      res = await new Promise((resolve, reject) => {
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            resolve(result);
          } else {
            reject('获取信息失败');
          }
        });
      });

      let address = await fetch(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${res.position.toString()}&key=b15278a411c3c418799315efe939b534&radius=1000`, {
        method: "GET",
      }).then((value) => {
        return value.json();
      }).then((value) => {
        let data = {
          longitude: res.position.getLng(),
          altitude: res.position.getLat(),
          address: value.regeocode.formatted_address,
        }
        return data;
      })

      console.log(address);
      return address;
    } catch (e) {
      console.log(e);
      return {};
    }

  } else {
    alert('等待加载组件');
    return {};
  }
}
