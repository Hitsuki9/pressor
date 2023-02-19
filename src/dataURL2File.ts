export default function dataURL2File(
  dataURL: string,
  name: string,
  type?: string,
  lastModified?: number
) {
  lastModified = Number.isNaN(lastModified) ? void 0 : lastModified;
  const decodedData = window.atob(dataURL.split(',')[1]);
  const len = decodedData.length;
  const ui8a = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    ui8a[i] = decodedData.charCodeAt(i);
  }
  console.log(ui8a);
  return new File([ui8a], name, {
    type,
    lastModified
  });
}
