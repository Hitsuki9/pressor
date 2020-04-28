const $input = document.querySelector('input');
const $img = document.querySelector('img');
$input.addEventListener('change', async ({ target }) => {
  const file = Array.from(target.files)[0];
  target.value = '';
  
  console.time('compress');
  const newFile = await pressor.compress(file);
  console.timeEnd('compress');
  console.log(newFile);

  const dataURL = await pressor.file2DataURL(newFile);
  const img = await pressor.dataURL2Image(dataURL);
  document.body.append(img);
});