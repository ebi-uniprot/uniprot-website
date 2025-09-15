/* eslint-disable import/no-extraneous-dependencies */
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), commonjs(), svgr()],
  ssr: {
    noExternal: ['franklin-sites'],
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
});
