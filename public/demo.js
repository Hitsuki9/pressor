const $input = document.querySelector('input');
const { compress, file2DataURL, dataURL2Image } = Pressor;

$input.addEventListener('change', async ({ target }) => {
  const file = Array.from(target.files)[0];
  target.value = '';

  console.time('compress');
  const newFile = await compress(file);
  console.timeEnd('compress');
  console.log(newFile);

  const dataURL = await file2DataURL(newFile);
  const img = await dataURL2Image(dataURL);
  document.body.append(img);
});
