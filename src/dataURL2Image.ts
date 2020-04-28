export default function dataURL2Image(dataURL: string) {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataURL;
  });
}
