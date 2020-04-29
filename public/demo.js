const $input = document.querySelector('input');

$input.addEventListener('change', async ({ target }) => {
  const file = Array.from(target.files)[0];
  target.value = '';

  console.time('compress');
  const newFile = await Pressor.compress(file);
  console.timeEnd('compress');
  console.log(newFile);

  const dataURL = await Pressor.file2DataURL(newFile);
  const img = await Pressor.dataURL2Image(dataURL);
  document.body.append(img);
});
