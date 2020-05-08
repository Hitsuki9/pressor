export default function canvas2DataURL(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
) {
  return canvas.toDataURL(type, quality);
}
