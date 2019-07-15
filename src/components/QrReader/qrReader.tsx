import React, { RefObject, useEffect } from "react"
import './qrReader.less'
import { QrReaderCover } from "./qrReaderCover";
import { getMediaStream } from "./media";
import Worker from "worker-loader!./Worker";

interface P {
  onSuccess: Function;
  onFail?: Function;
}

let video: RefObject<HTMLVideoElement> = React.createRef()

let box = 180

const prefix = 'qrReader'

function QrReader(props: P) {
  let height = window.innerHeight
  let width = window.innerWidth

  const worker = new Worker()
  worker.addEventListener("message", (e) => {
    if (e.data !== null) {
      console.log(e.data)
      props.onSuccess(e.data)
    }
  })

  function getImage() {
    if (video.current === null) {
      return
    }
    let canvas = document.createElement("canvas")
    canvas.setAttribute('height', String(200))
    canvas.setAttribute('width', String(200))
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    let vidH = video.current.videoHeight
    let vidW = video.current.videoWidth
    let wid = box / width
    let hei = box / height
    ctx.drawImage(video.current, vidW * (1 - wid) / 2, vidH * (1 - hei) / 2, vidW * wid, vidH * hei, 0, 0, 200, 200);
    // (video.current.parentNode as  Node&ParentNode).insertBefore(canvas,video.current)

    let data = ctx.getImageData(0, 0, 200, 200).data
    if (worker === undefined) {
      return
    }
    worker.postMessage({
      image: data,
      width: 200,
      height: 200,
    })
    console.log('fafaf')
  }

  useEffect(() => {
    let mediaStream: MediaStream | null
    async function init() {
      mediaStream = await getMediaStream()
      if (mediaStream === null) {
        console.warn("缺少相机")
        if (props.onFail) {
          props.onFail()
        }
        return
      }

      if (video.current !== null) {
        let thisVideo = video.current
        thisVideo.srcObject = mediaStream
        thisVideo.addEventListener("canplay", () => {
          thisVideo.play()
          console.log('start')
        })
      }
    }
    init()

    return () => {
      if (mediaStream !== null) {
        mediaStream.getTracks().forEach((item) => {
          if (mediaStream !== null) {
            item.stop()
            mediaStream.removeTrack(item)
          }
        })
      }
    }
  })

  useEffect(()=>{
    let timer=setInterval(getImage, 500)
    return ()=>{
      clearInterval(timer)
    }
  })

  return (
    <div className={`${prefix}-backgroud`}>
      <video ref={video} style={{ width, height }} className={`${prefix}-video`} />
      <QrReaderCover box={box} />

      {/* <div style={{ position: "absolute", top: '50%', left: '50%' }}>
        <button onClick={beginVideo} style={{ zIndex: 10 }}>start</button>
        <button onClick={() => { track.stop() }} style={{ zIndex: 10 }}>stop</button>
        <button onClick={getImage}>get</button>
      </div> */}

    </div>
  )
}

export { QrReader }