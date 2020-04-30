export default function dataURL2File(
  dataURL: string,
  name: string,
  type: string,
  lastModified: number
) {
  const bstr = atob(dataURL.split(',')[1]);
  const len = bstr.length;
  const ui8a = new Uint8Array(len);
  for (let i = 0; i < len; i++) ui8a[i] = bstr.charCodeAt(i);
  return new File([ui8a], name, {
    type,
    lastModified
  });
}
