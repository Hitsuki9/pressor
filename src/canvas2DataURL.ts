export default function canvas2DataURL(
  canvas: HTMLCanvasElement,
  type: string
) {
  return canvas.toDataURL(type);
}
