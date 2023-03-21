import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { env } from 'process';

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'main.js',
    exports: 'default',
  },
  external: ['obsidian', 'fs', 'os', 'path'],
  plugins: [
    nodeResolve({
      browser: true,
      extensions: ['.ts', '.tsx'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
      preventAssignment: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
    }),
  ],
};
