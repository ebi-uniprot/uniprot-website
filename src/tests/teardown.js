const rimraf = require('rimraf');
const { promisify } = require('util');

const rimrafAsync = promisify(rimraf);

module.exports = async () => {
  // close browser instance
  await global.__BROWSER__.close();

  // close web server
  global.__SERVER__.close();

  // cleanup webpack output
  await rimrafAsync(global.__CODE_DIR__);
};
