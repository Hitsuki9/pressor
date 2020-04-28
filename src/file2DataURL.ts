export default function file2DataURL(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => resolve(target!.result as string);
    reader.readAsDataURL(file);
  });
}
