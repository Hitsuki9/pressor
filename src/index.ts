import file2DataURL from './file2DataURL';
import dataURL2Image from './dataURL2Image';
import image2Canvas from './image2Canvas';
import canvas2DataURL from './canvas2DataURL';
import dataURL2File from './dataURL2File';

async function compress(file: File, limit = 500, accuracy = 0.8) {
  const { type, name, size, lastModified } = file;
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
  let preScale = 1;
  let scale = 0.5;
  let quality = 0.92;

  let canvas = image2Canvas(img, scale);
  let newDataURL = canvas2DataURL(canvas, type, quality);
  let estimatedSize = newDataURL.length * proportion;

  let i = 0; // 连续提升 scale 的次数，超过阈值说明品质过低
  while (estimatedSize > target.max || estimatedSize < target.min) {
    console.log(estimatedSize);
    if (estimatedSize > target.max) {
      i = 0;
      [scale, preScale] = [scale - Math.abs(preScale - scale) / 2, scale];
    } else {
      // 连续提升 3 次至 0.9 以上
      if (i++ >= 3 && scale > 0.9) {
        if (quality !== 1) {
          i = 0;

          preScale = 1;
          scale = 0.5;
          quality = 1;
        } else break;
      } else {
        [scale, preScale] = [scale + Math.abs(preScale - scale) / 2, scale];
      }
    }
    if (scale === preScale) break; // TODO
    console.log('scale', scale);

    canvas = image2Canvas(img, scale);
    newDataURL = canvas2DataURL(canvas, type, quality);
    estimatedSize = newDataURL.length * proportion;
  }

  console.log(estimatedSize);
  return dataURL2File(newDataURL, name, type, lastModified);
}

export {
  compress,
  file2DataURL,
  dataURL2Image,
  image2Canvas,
  canvas2DataURL,
  dataURL2File
};
