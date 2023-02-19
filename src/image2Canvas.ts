let canvas: HTMLCanvasElement | undefined;
let ctx: CanvasRenderingContext2D | null;

const DEFAULT_SCALE = 1;

export default function image2Canvas(
  img: HTMLImageElement,
  scale = DEFAULT_SCALE
) {
  scale = Number.isNaN(scale) ? DEFAULT_SCALE : scale;
  scale = Math.max(0, scale);
  if (canvas === void 0) {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
  }
  let { height, width } = img;
  canvas.height = height *= scale;
  canvas.width = width *= scale;
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
  }
  return canvas;
}
