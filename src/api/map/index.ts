import { AddressLocation } from "rootstate/interface/devices.interface"
import AMap from "amap-js-sdk"
import { loadAMap, isLoadAMap } from "./loadAmap"
import { convertGPStoAMap } from "./util"

let geolocation: AMap.Geolocation
let mapObj: AMap.Map

export async function load() {
  if (mapObj !== undefined || isLoadAMap.status === true) {
    return
  }

  let AMap = await loadAMap()
  if (AMap === null) {
    return
  } else {
    mapObj = new AMap.Map("iCenter")
    mapObj.plugin("AMap.Geolocation", function() {
      if (AMap === null) {
        return
      }
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 2000, //超过3秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      ;(mapObj as AMap.Map).addControl(geolocation)
    })
  }
}

export async function getPosition() {
  let resInformation: AddressLocation | null = null
  if (geolocation !== undefined) {
    try {
      let res: AMap.GeolocationResult
      res = await new Promise((resolve, reject) => {
        geolocation.getCurrentPosition((status, result) => {
          if (status === "complete") {
            console.log(result)
            resolve(result)
          } else {
            if (result.message === "Geolocation permission denied.") {
              reject("没有定位权限")
            }
            reject("定位失败")
          }
        })
      })

      let lnglats: {
        lng: number
        lat: number
      } | null
      if (!res.isConverted) {
        lnglats = await convertGPStoAMap(
          res.position.getLng(),
          res.position.getLat()
        )
      } else {
        lnglats = {
          lng: res.position.getLng(),
          lat: res.position.getLat(),
        }
      }

      if (lnglats !== null) {
        let lng = lnglats.lng
        let lat = lnglats.lat
        let address = await fetch(
          `https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${lng},${lat}&key=b15278a411c3c418799315efe939b534&radius=30`,
          {
            method: "GET",
          }
        )
          .then(value => {
            return value.json()
          })
          .then(value => {
            let data = {
              longitude: lng,
              latitude: lat,
              address: value.regeocode.formatted_address,
            }
            return data
          })

        resInformation = address
      } else {
        throw new Error("坐标转换失败")
      }
    } catch (e) {
      console.log(e)
    }
  } else {
    alert("等待加载组件")
  }
  return resInformation
}
