import ts from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

function onwarn(warning, warn) {
  if (warning.code === 'CIRCULAR_DEPENDENCY') {
    return;
  }
  warn(warning.message);
}

const configList = [
  {
    input: 'example/main.ts',
    onwarn,
    output: {
      file: 'example/main.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [json(), ts({ useTsconfigDeclarationDir: true }), terser()]
  },
  {
    input: 'src/gamma.ts',
    onwarn,
    output: {
      file: 'dist/gamma.js',
      format: 'umd',
      name: 'gamma'
    },
    plugins: [resolve(), ts({ useTsconfigDeclarationDir: true })]
  },
  {
    input: 'src/gamma.ts',
    onwarn,
    output: {
      file: 'dist/gamma.min.js',
      format: 'umd',
      name: 'gamma'
    },
    plugins: [resolve(), ts({ useTsconfigDeclarationDir: true }), terser()]
  }
];
export default function() {
  return process.env.TARGET === 'example' ? configList[0] : configList.slice(1);
}
