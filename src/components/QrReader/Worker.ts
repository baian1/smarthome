import jsQR from "jsqr"

interface QREvent extends MessageEvent {
  data: {
    image: Uint8ClampedArray
    width: number
    height: number
  }
}

declare var self: Worker
// Worker.ts

self.addEventListener("message", function(e: QREvent) {
  let data = jsQR(e.data.image, e.data.width, e.data.height)
  if (data !== null) {
    self.postMessage(data.data)
  }
})
