module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0
  }
};
