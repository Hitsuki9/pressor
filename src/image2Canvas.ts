export default function image2Canvas(img: HTMLImageElement, scale: number) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let { height, width } = img;
  height *= scale;
  width *= scale;
  canvas.height = height;
  canvas.width = width;
  ctx!.drawImage(img, 0, 0, width, height);
  return canvas;
}
