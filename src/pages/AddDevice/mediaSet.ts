interface ScreenSize {
  height: number;
  width: number;
}

interface ULongRange {
  max?: number;
  min?: number;
}

export async function getMaxVideoResolutionToAdaptationScreen(track: MediaStreamTrack, screen: ScreenSize): Promise<void> {
  if (track.kind !== "video") {
    throw new Error(`媒体类型必须是video,你输入了错误的类型${track.kind}`)
  }
  let range = track.getCapabilities()

  let maxCameraResolution = {
    width: (range.width as ULongRange).max as number,
    height: (range.height as ULongRange).max as number
  }

  //相机分辨率长宽是手机横着的时候的长宽,为了方便计算,我们对其进行交换
  let width = maxCameraResolution.height
  let height = maxCameraResolution.width

  //适应屏幕,砍一部分 分辨率
  //根据长宽比选择砍哪部分
  if (screen.height / screen.width > height / width) {
    //砍宽度分辨率
    width = height / (screen.height / screen.width)
  } else {
    //砍高度分辨率
    height = (screen.height / screen.width) * width
  }
  maxCameraResolution.height = width
  maxCameraResolution.width = height

  let oldConstraints = track.getConstraints()
  track.applyConstraints({ ...oldConstraints, ...maxCameraResolution })

}