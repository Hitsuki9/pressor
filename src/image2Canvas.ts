import { assert } from './utils';

let canvas: HTMLCanvasElement | undefined;
let ctx: CanvasRenderingContext2D | null;

export default function image2Canvas(
  img: HTMLImageElement,
  scale: number | string = 1
) {
  scale = Number.parseFloat(scale as string);
  assert(
    img instanceof HTMLImageElement,
    '"image2Canvas" should get a "img" parameter which is a HTMLImageElement instance.'
  );
  assert(
    !Number.isNaN(scale),
    '"image2Canvas" should get a "scale" parameter which is a number.'
  );

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
