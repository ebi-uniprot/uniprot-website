import path from 'path';
import { promisify } from 'util';
import { URL } from 'url';

import webpack from 'webpack';
import puppeteer from 'puppeteer';
import express from 'express';
import getPort, { portNumbers } from 'get-port';

import webpackConfig from '../../webpack.config.js';

const webpackAsync = promisify(webpack);

const __dirname = new URL('.', import.meta.url).pathname;

export default async () => {
  global.__CODE_DIR__ = path.join(__dirname, '.tmp');

  // generate code through webpack
  const config = webpackConfig({ TEST: true }, { mode: 'production' });
  config.output.path = global.__CODE_DIR__;
  const stats = await webpackAsync(config);

  // startup static web server
  const app = express();
  app.use(express.static(global.__CODE_DIR__));

  const port = await getPort({ port: portNumbers(8000, 8999) });
  global.__SERVER__ = app.listen(port);

  global.__APP_URL__ = `http://localhost:${port}/`;

  // startup browser instance
  global.__BROWSER__ = await puppeteer.launch({
    defaultViewport: {
      width: 1040,
      height: 890,
    },
    headless: true, // make browser invisible
    args: ['--no-sandbox'], // https://github.com/puppeteer/puppeteer/issues/3698
    slowMo: 0, // slows down actions the browser take (to see what happens)
  });
};
