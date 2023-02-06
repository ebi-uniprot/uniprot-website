/* eslint-env node */
/* eslint-disable no-param-reassign, import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');

const name = 'LegacyModuleSplitPlugin';

class LegacyModuleSplitPlugin {
  #options;

  #code;

  #styles;

  constructor() {
    this.#code = [];
    this.#styles = [];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('LegacyModuleSplitPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        { name },
        this.beforeAssetTagGeneration.bind(this)
      );
    });
  }

  beforeAssetTagGeneration(data, callback) {
    this.#code = [...this.#code, ...data.assets.js];
    this.#styles = [...this.#styles, ...data.assets.css];
    data.assets.modernScripts = Array.from(
      new Set(this.#code.filter((path) => path.includes('modern.')))
    );
    data.assets.legacyScripts = Array.from(
      new Set(this.#code.filter((path) => path.includes('legacy.')))
    );
    data.assets.styles = Array.from(new Set(this.#styles));
    callback(null, data);
  }
}

module.exports = LegacyModuleSplitPlugin;
