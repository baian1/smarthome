export function convertGPStoAMap(Lng: number, Lat: number) {
  return fetch(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${Lng},${Lat}&coordsys=gps&key=b15278a411c3c418799315efe939b534`)
    .then((res) => res.json())
    .then((res) => {
      let regEx = /(?<Lng>[0-9.]*),(?<Lat>[0-9.]*)/g
      let regExRes = regEx.exec(res.locations)
      if (regExRes !== null && regExRes.groups !== undefined) {
        let res = {
          lng: Number(regExRes.groups.Lng),
          lat: Number(regExRes.groups.Lat)
        }
        return res
      } else {
        return null
      }
    })
    .catch((e) => {
      console.log(e)
      return null
    })
}