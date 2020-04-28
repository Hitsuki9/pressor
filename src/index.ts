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
  let canvas = image2Canvas(img, scale);
  let newDataURL = canvas2DataURL(canvas, type);
  let estimatedSize = newDataURL.length * proportion;

  let i = 0;
  while (estimatedSize > target.max || estimatedSize < target.min) {
    // 平均循环 56 次后 scale 无法更加精确了
    if (i++ === 56) break;
    console.log(estimatedSize);
    if (estimatedSize > target.max) {
      [scale, preScale] = [scale - Math.abs(preScale - scale) / 2, scale];
    } else {
      [scale, preScale] = [scale + Math.abs(preScale - scale) / 2, scale];
    }
    console.log('scale', scale);
    canvas = image2Canvas(img, scale);
    newDataURL = canvas2DataURL(canvas, type);
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
