import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: path.join(__dirname, 'src/index.ts'),
  output: {
    name: 'pressor',
    file: path.join(__dirname, 'dist/pressor.js'),
    format: 'umd'
  },
  plugins: [
    babel({
      extensions: ['.ts', '.js']
    }),
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts']
    })
  ]
};
