import React, { RefObject, useEffect } from 'react'
import './qrReader.less'

interface P {
  box: number;
}

const prefix = 'qrReader'
let canvas: RefObject<HTMLCanvasElement> = React.createRef()

function QrReaderCover({ box }: P) {
  let height = window.innerHeight
  let width = window.innerWidth

  //创建canvas蒙版
  useEffect(() => {
    if (canvas.current === null) {
      return
    }
    canvas.current.setAttribute('height', `${height}`)
    canvas.current.setAttribute('width', `${width}`)
    let ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D

    ctx.fillStyle = "rgba(0,0,0,0.4)"

    //透明色蒙版
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()

    //绘制四个L型
    let lineLength = box / 5
    let distanceBetweenLinesAndBox = 7
    ctx.lineWidth = 5
    ctx.translate(width / 2, height / 2)
    ctx.lineCap = "round"
    ctx.strokeStyle = "rgba(23, 342, 34, 1)"
    function drawL(angle: number) {
      ctx.save()
      ctx.rotate(angle / 360 * 2 * Math.PI)
      ctx.beginPath()
      ctx.moveTo(box / 2 + distanceBetweenLinesAndBox, box / 2 + distanceBetweenLinesAndBox - lineLength)
      ctx.lineTo(box / 2 + distanceBetweenLinesAndBox, box / 2 + distanceBetweenLinesAndBox)
      ctx.lineTo(box / 2 + distanceBetweenLinesAndBox - lineLength, box / 2 + distanceBetweenLinesAndBox)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }
    drawL(0)
    drawL(90)
    drawL(180)
    drawL(270)

    //设置中心为透明色
    let data = new ImageData(box, box)
    ctx.putImageData(data, (width - box) / 2, (height - box) / 2)
  })

  return (
    <>
      <canvas ref={canvas} className={`${prefix}-cover`} />
    </>
  )
}

export { QrReaderCover }