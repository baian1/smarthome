import AMap from "amap-js-sdk";

export let isLoadAMap = {
  status: false
};

function loadingJS(url: string, onload: Function, error?: Function) {
  let script = document.createElement("script")
  script.addEventListener("load", () => {
    onload(window.AMap)
    isLoadAMap.status = true
  })
  script.addEventListener("error", (e) => {
    if (error) {
      error(e)
    } else {
      throw e
    }
  })
  script.src = url

  document.body.appendChild(script)
}

export async function loadAMap(): Promise<null | typeof AMap> {
  try {
    if (Object.keys(AMap).length !== 0) {
      return AMap
    }
    let resulte: any
    resulte = await new Promise((resolve) => {
      const onload = (value: any) => {
        resolve(value)
      }
      loadingJS("https://webapi.amap.com/maps?v=1.4.14&key=b15278a411c3c418799315efe939b534", onload)
    })
    return resulte
  }
  catch (e) {
    console.error(e)
    return null
  }
}