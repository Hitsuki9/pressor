import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { name, expose } from './package.json';

export default {
  input: path.join(__dirname, 'src/index.ts'),
  output: {
    name: expose,
    file: path.join(__dirname, `dist/${name}.js`),
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
