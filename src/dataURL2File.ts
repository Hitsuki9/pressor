import { assert } from './utils';

export default function dataURL2File(
  dataURL: string,
  name: string,
  type?: string,
  lastModified?: number | string
) {
  dataURL = String(dataURL);
  name = String(name);

  type = type === void 0 ? type : String(type);
  lastModified =
    lastModified === void 0
      ? lastModified
      : Number.parseInt(lastModified as string);

  if (lastModified !== void 0) {
    assert(
      !Number.isNaN(lastModified),
      '"dataURL2File" should get a optional "lastModified" parameter which is a number.'
    );
  }

  const bstr = atob(dataURL.split(',')[1]);
  const len = bstr.length;
  const ui8a = new Uint8Array(len);
  for (let i = 0; i < len; i++) ui8a[i] = bstr.charCodeAt(i);
  return new File([ui8a], name, {
    type,
    lastModified
  });
}
