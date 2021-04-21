const sass = require('sass');
const jsonImporter = require('node-sass-json-importer');

// Custom renderer for the typescript-plugin-css-modules plugin in order to
// plug in the jsonImporter and not fail when a stylesheet needs colours.json
module.exports = (css, { logger }) => {
  try {
    return sass.renderSync({
      data: css,
      includePaths: ['node_modules'],
      importer: jsonImporter({ convertCase: true }),
    }).css;
  } catch (error) {
    logger.error(error);
  }
};
