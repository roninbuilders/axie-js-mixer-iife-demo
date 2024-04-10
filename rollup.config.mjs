import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

export default {
  input: 'mixer.js',
  output: {
    file: 'dist/mixer.min.js',
    format: 'iife', // "iife" format is suitable for browser
    name: 'AxieMixer',
    exports: 'default' // directly export the default export
  },
  plugins: [
    resolve({ preferBuiltins: true }), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    json(), // so Rollup can import JSON files
    copy({
      targets: [
        { src: 'node_modules/@axieinfinity/mixer/dist/data/*.json', dest: 'dist/data' },
        { src: 'index.html', dest: 'dist' }
      ]
    }),
    terser() // minify the output
  ]
};