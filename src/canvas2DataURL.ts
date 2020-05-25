import { assert } from './utils';

export default function canvas2DataURL(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number | string
) {
  assert(
    canvas instanceof HTMLCanvasElement,
    '"canvas2DataURL" should get a "canvas" parameter which is a HTMLCanvasElement instance.'
  );

  quality = quality === void 0 ? quality : Number.parseFloat(quality as string);
  if (quality !== void 0) {
    assert(
      !Number.isNaN(quality),
      '"canvas2DataURL" should get a optional "quality" parameter which is a number.'
    );
    quality = quality > 1 ? 1 : quality < 0.1 ? 0.1 : quality;
  }

  type = String(type);

  return canvas.toDataURL(type, quality);
}
