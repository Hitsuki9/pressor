import { assert } from './utils';

export default function file2DataURL(file: File) {
  assert(
    file instanceof File,
    '"file2DataURL" should be called with a File instance.'
  );

  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => resolve(target!.result as string);
    reader.readAsDataURL(file);
  });
}
