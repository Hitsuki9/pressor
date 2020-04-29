import file2DataURL from './file2DataURL';
import dataURL2Image from './dataURL2Image';
import image2Canvas from './image2Canvas';
import canvas2DataURL from './canvas2DataURL';
import dataURL2File from './dataURL2File';
import { assert } from './utils';

async function compress(file: File, limit = 500, accuracy = 1) {
  assert(limit >= 0.1, 'The "limit" parameter cannot below 0.1.');

  const { type, name, size, lastModified } = file;
  console.log('origin', size);
  const target = {
    max: limit * 1024,
    min: limit * accuracy * 1024
  };
  if (size < target.max) return file;

  const dataURL = await file2DataURL(file);
  const img = await dataURL2Image(dataURL);

  // 图片大小与 dataURL.length 的比例约为 0.75
  // 直接使用次比例估算结果
  const proportion = 0.75;
  let quality = 0.92;
  let preScale = 1;
  let scale = 0.5;
  let lastClosestDataURL: string | undefined;

  let canvas = image2Canvas(img, scale);
  let newDataURL = canvas2DataURL(canvas, type, quality);
  let estimatedSize = newDataURL.length * proportion;
  lastClosestDataURL =
    estimatedSize < target.max ? newDataURL : lastClosestDataURL;

  console.log('scale', scale);
  console.log(estimatedSize);

  let i = 0; // 连续提升 scale
  let flag = false; // 降低过 scale 的标记
  while (estimatedSize > target.max || estimatedSize < target.min) {
    if (estimatedSize > target.max) {
      i = 0;
      flag = true;
      [scale, preScale] = [scale - Math.abs(preScale - scale) / 2, scale];
    } else {
      // 连续提升 3 次至 0.9 以上且从没有降低过
      if (i++ >= 3 && scale > 0.9 && !flag) {
        if (quality === 1) break;

        i = 0;
        flag = false;
        quality = 1;
        preScale = 1;
        scale = 0.5;
      } else {
        [scale, preScale] = [scale + Math.abs(preScale - scale) / 2, scale];
      }
    }
    if (scale === preScale) break;
    image2Canvas(img, scale);
    newDataURL = canvas2DataURL(canvas, type, quality);
    if (lastClosestDataURL && newDataURL.length === lastClosestDataURL.length)
      break;
    estimatedSize = newDataURL.length * proportion;

    console.log('scale', scale);
    console.log(estimatedSize);

    lastClosestDataURL =
      estimatedSize < target.max ? newDataURL : lastClosestDataURL;
  }

  console.log('end', estimatedSize);
  assert(lastClosestDataURL, 'Cannot compress to the target size.');
  return dataURL2File(lastClosestDataURL as string, name, type, lastModified);
}

export {
  compress,
  file2DataURL,
  dataURL2Image,
  image2Canvas,
  canvas2DataURL,
  dataURL2File
};
