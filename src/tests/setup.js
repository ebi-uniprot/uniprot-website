const path = require('path');
const { promisify } = require('util');

const webpack = require('webpack');
const puppeteer = require('puppeteer');
const express = require('express');
const getPort = require('get-port');

const webpackConfig = require('../webpack.config');

const webpackAsync = promisify(webpack);

module.exports = async () => {
  global.__CODE_DIR__ = path.join(__dirname, '.tmp');

  // generate code through webpack
  const config = webpackConfig({ TEST: true }, { mode: 'production' });
  config.output.path = global.__CODE_DIR__;
  const stats = await webpackAsync(config);

  // startup static web server
  const app = express();
  app.use(express.static(global.__CODE_DIR__));

  const port = await getPort({ port: getPort.makeRange(8000, 8999) });
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
