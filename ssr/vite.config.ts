/* eslint-disable import/no-extraneous-dependencies */
import { reactRouter } from '@react-router/dev/vite';
import svg from 'rollup-plugin-svg-import';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    commonjs(),
    // import SVGs as react (if using `?react` at the end)
    svgr(),
    // import SVGs as raw string of their content
    svg({ stringify: true }),
  ],
  ssr: {
    noExternal: ['franklin-sites'],
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
});
