import { assert } from './utils';

export default function file2DataURL(file: File) {
  assert(
    file instanceof File,
    '"file2DataURL" should get a "file" parameter which is a File instance.'
  );

  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => resolve(target!.result as string);
    reader.readAsDataURL(file);
  });
}
