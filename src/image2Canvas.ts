let canvas: HTMLCanvasElement | undefined;
let ctx: CanvasRenderingContext2D | null;

export default function image2Canvas(img: HTMLImageElement, scale: number) {
  if (canvas === void 0) {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
  }
  let { height, width } = img;
  height *= scale;
  width *= scale;
  canvas.height = height;
  canvas.width = width;
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
  }
  return canvas;
}
