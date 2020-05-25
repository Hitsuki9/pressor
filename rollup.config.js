import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { name, expose } from './package.json';

const isProd = process.env.NODE_ENV === 'production';

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
    }),
    ...(isProd ? [terser()] : [])
  ]
};
