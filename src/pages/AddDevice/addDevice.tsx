import React, { RefObject } from "react"
import { getMaxVideoResolutionToAdaptationScreen } from "./until"
import './addDevice.less'
import jsQR from "jsqr"

interface ULongRange {
  max: number;
  min: number;
}

let video: RefObject<HTMLVideoElement> = React.createRef()
let canvas: RefObject<HTMLCanvasElement> = React.createRef()

let track: MediaStreamTrack

const prefix = 'addDevice'

function AddDevice() {

  let height = window.innerHeight
  let width = window.innerWidth

  var constraints = {
    audio: false,
    video: {
      facingMode: { exact: "environment" } //"user"
    }
  };
  function begin() {
    if (video.current === null) {
      return
    }
    let nowVideo = video.current

    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (mediaStream) {
        track = mediaStream.getVideoTracks()[0]
        getMaxVideoResolutionToAdaptationScreen(track, { height, width })

        nowVideo.srcObject = mediaStream;
        nowVideo.onloadedmetadata = function () {
          nowVideo.play();
        };

      })
      .catch(function (err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
  }

  function getImage() {
    if (canvas.current === null || video.current === null) {
      return
    }
    canvas.current.setAttribute('height', `${height}`)
    canvas.current.setAttribute('width', `${width}`)
    let context: CanvasRenderingContext2D = canvas.current.getContext("2d") as CanvasRenderingContext2D
    context.drawImage(video.current, 0, 0,video.current.videoWidth,video.current.videoHeight,0,0,width,height)
    let data = canvas.current.toDataURL()
    console.log(data)
    // img.current.setAttribute('src', data)
  }

  return (
    <div>
      <video ref={video} style={{ width, height }} className={`${prefix}-video`} />
      <div className={`${prefix}-cover`}/>
      <canvas ref={canvas} />

      <div style={{ position: "absolute", top: '50%', left: '50%' }}>
        <button onClick={begin} style={{ zIndex: 10 }}>start</button>
        <button onClick={() => { track.stop() }} style={{ zIndex: 10 }}>stop</button>
        <button onClick={getImage}>get</button>
      </div>

    </div>
  )

}

export { AddDevice }