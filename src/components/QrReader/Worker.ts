import jsQR from 'jsqr'

interface QREvent extends MessageEvent {
  data: {
    image: Uint8ClampedArray;
    width: number;
    height: number;
  };
}

// Worker.ts
const ctx: Worker = self as any;

ctx.addEventListener('message', function (e: QREvent) {
  let data = jsQR(e.data.image, e.data.width, e.data.height)
  if (data !== null) {
    ctx.postMessage(data.data)
  }
})