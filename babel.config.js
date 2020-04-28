module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-typescript'];

  return { presets };
};
