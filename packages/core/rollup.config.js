import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import pkg from './package.json';

const options = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      name: pkg.name,
      sourcemap: true,
      assetFileNames({ name }) {
        return name?.replace(/^src\//, '') ?? '';
      },
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      name: pkg.name,
      sourcemap: true,
      assetFileNames({ name }) {
        return name?.replace(/^src\//, '') ?? '';
      },
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    vanillaExtractPlugin()
  ]
};

export default options;
