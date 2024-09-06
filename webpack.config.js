/* eslint-disable @typescript-eslint/no-require-imports, global-require, consistent-return */
const path = require('path');
const fs = require('fs');

const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const childProcess = require('child_process');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// custom plugins
const LegacyModuleSplitPlugin = require('./webpack-plugins/legacy-module-split-plugin');

// some plugins are conditionally-loaded as they are also conditionally used.

const legacyModuleSplitPlugin = new LegacyModuleSplitPlugin();

const getConfigFor = ({
  isModern,
  isDev,
  isUx,
  isLiveReload,
  isTest,
  hasStats,
  gitCommitHash,
  gitCommitState,
  gitBranch,
  publicPath,
  apiPrefix,
}) => {
  const bundleName = isModern ? 'modern' : 'legacy';

  const config = {
    name: bundleName,
    context: __dirname,
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath,
      filename: `${bundleName}.app.[chunkhash:6].js`,
      chunkFilename: `${bundleName}.[name].[chunkhash:6].js`,
      assetModuleFilename: '[name].[contenthash:6][ext]',
    },
    devtool: (() => {
      // no sourcemap for tests
      if (isTest) {
        return;
      }
      // live reload, slowest first build, fast rebuild, full original source
      if (isLiveReload) {
        return 'eval-cheap-module-source-map';
      }
      // else, prod, slow everything, but original source
      return 'source-map';
    })(),
    resolve: {
      extensions: ['.tsx', '.jsx', '.js', '.ts'],
      // most of it is to avoid duplication of packages in the codebase
      // NOTE: (there has to be a better way than doing that manually!!!)
      alias: {
        // make all dependencies using react and related use our versions
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'react-router-dom': path.resolve('./node_modules/react-router-dom'),
        // other packages
        classnames: path.resolve('./node_modules/classnames'),
        // go package uses a slightly earlier version of axios, link it to ours
        axios: path.resolve('./node_modules/axios'),
        // replace all usage of specific lodash submodules (from dependencies)
        // with their corresponding ES modules from lodash-es (less duplication)
        // (just looked at node_modules to see what packages were used, but
        // didn't distinguish between used by devDeps or not)
        'lodash._reinterpolate': path.resolve(
          './node_modules/lodash-es/_reInterpolate'
        ),
        'lodash.camelcase': path.resolve('./node_modules/lodash-es/camelCase'),
        'lodash.clonedeep': path.resolve('./node_modules/lodash-es/cloneDeep'),
        'lodash.forin': path.resolve('./node_modules/lodash-es/forIn'),
        'lodash.get': path.resolve('./node_modules/lodash-es/get'),
        'lodash.isempty': path.resolve('./node_modules/lodash-es/isEmpty'),
        'lodash.isplainobject': path.resolve(
          './node_modules/lodash-es/isPlainObject'
        ),
        'lodash.memoize': path.resolve('./node_modules/lodash-es/memoize'),
        'lodash.pickby': path.resolve('./node_modules/lodash-es/pickBy'),
        'lodash.set': path.resolve('./node_modules/lodash-es/set'),
        'lodash.sortby': path.resolve('./node_modules/lodash-es/sortBy'),
        'lodash.template': path.resolve('./node_modules/lodash-es/template'),
        'lodash.templatesettings': path.resolve(
          './node_modules/lodash-es/templateSettings'
        ),
        'lodash.unset': path.resolve('./node_modules/lodash-es/unset'),
      },
      symlinks: false,
    },
    // MODULE
    module: {
      rules: [
        // JavaScript and Typescript files
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude:
            /node_modules\/((?!@nightingale-elements\/nightingale-msa|protvista-uniprot|p-map|aggregate-error|molstar).*)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: '3', proposals: true },
                    targets:
                      isModern && !isTest
                        ? {
                            esmodules: true,
                          }
                        : {
                            esmodules: false,
                            browsers:
                              'defaults, Firefox >= 35, Chrome >= 40, Edge >= 12, Safari >= 9, cover 95% in CN, not dead',
                          },
                  },
                ],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        },
        // Stylesheets
        {
          test: /\.(css|sass|scss)$/,
          sideEffects: true,
          include: [
            path.resolve(__dirname, 'src'),
            // We use realpathSync otherwise doesn't work with symlinks
            fs.realpathSync(`${__dirname}/node_modules/franklin-sites`),
            fs.realpathSync(`${__dirname}/node_modules/molstar/build`),
            fs.realpathSync(
              `${__dirname}/node_modules/tippy.js/dist/tippy.css`
            ),
            fs.realpathSync(`${__dirname}/node_modules/lite-youtube-embed`),
            fs.realpathSync(
              `${__dirname}/node_modules/complexviewer/src/css/xinet.css`
            ),
          ],
          use: [
            {
              loader: isLiveReload
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            {
              // translates CSS into something importable into the code
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  auto: true, // only for files containing ".module." in name
                  namedExport: false,
                  exportLocalsConvention: 'asIs',
                  // class name to hash, but also keep name for debug in dev
                  localIdentName: `${
                    isDev ? '[local]🐛' : ''
                  }[contenthash:base64:5]`,
                },
              },
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
              options: {
                sassOptions: {
                  // This should be the default, but putting it here avoids
                  // issues when importing from linked packages
                  includePaths: ['node_modules'],
                },
              },
            },
          ],
        },
        // SVGs in app and in franklin that need to inherit colour
        {
          test: /\.svg$/i,
          include: [
            path.resolve(__dirname, 'src'),
            fs.realpathSync(`${__dirname}/node_modules/franklin-sites`),
            fs.realpathSync(`${__dirname}/node_modules/complexviewer`),
          ],
          exclude: [/\.img\.svg$/],
          issuer: /\.(t|j)sx?$/,
          loader: '@svgr/webpack',
        },
        // SVGs from nightingale and protvista packages
        {
          test: /\.svg$/,
          include: [
            fs.realpathSync(`${__dirname}/node_modules/protvista-datatable`),
            fs.realpathSync(`${__dirname}/node_modules/protvista-uniprot`),
          ],
          loader: 'svg-inline-loader',
        },
        // SVGs from franklin for use in "url()"
        {
          test: /\.svg$/,
          include: [
            fs.realpathSync(`${__dirname}/node_modules/franklin-sites`),
          ],
          type: 'asset/resource',
        },
        // All kinds of images, including SVGs without styling needs
        {
          test: /\.(jpe?g|png|gif|ico|img\.svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    // END MODULE
    stats: {
      children: false,
      assetsSort: '!size',
    },
    // PLUGINS
    plugins: [
      !isLiveReload &&
        isModern &&
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          failOnError: true,
        }),
      !isLiveReload &&
        isModern &&
        // Copy static (or near-static) files
        new CopyPlugin({
          patterns: [
            {
              from: 'static',
              transform: (input, absoluteFilename) => {
                // For the "robots.txt" file
                if (absoluteFilename.includes('robots.txt')) {
                  return (
                    input +
                    // Block everything if in dev mode, link to sitemap if not
                    (isDev
                      ? '\nDisallow: /'
                      : '\nSitemap: https://www.uniprot.org/sitemap-index.xml\nSitemap: https://www.uniprot.org/data-sitemap-index.xml.gz')
                  );
                }
                return input;
              },
            },
          ],
        }),
      new HtmlWebPackPlugin({
        template: `${__dirname}/index.ejs`,
        filename: 'index.html',
        inject: isLiveReload,
        templateParameters: (_compilation, assets, _assetTags, options) => ({
          isDev,
          isUx,
          isLiveReload,
          options,
          assets,
        }),
      }),
      legacyModuleSplitPlugin,
      new DefinePlugin({
        MODERN_BUNDLE: JSON.stringify(isModern),
        BASE_URL: JSON.stringify(publicPath),
        API_PREFIX: JSON.stringify(apiPrefix),
        LIVE_RELOAD: JSON.stringify(isLiveReload),
        GIT_COMMIT_HASH: JSON.stringify(gitCommitHash),
        GIT_COMMIT_STATE: JSON.stringify(gitCommitState),
        GIT_BRANCH: JSON.stringify(gitBranch),
      }),
      !isLiveReload &&
        isModern &&
        new (require('workbox-webpack-plugin').InjectManifest)({
          swSrc: `${__dirname}/src/service-worker/service-worker.ts`,
          // TODO: remove limit when we manage to reduce size of entrypoint
          // For now, 3MB in production (molstar chunk is 2.2M!), 16M in dev
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 3 * (isDev ? 4 : 1),
          exclude: [
            // exclude fonts from precaching because one specific browser will
            // never need all fonts formats at the same time, will cache later
            // whichever is actually used.
            /fonts/,
            // Exclude sourcemaps too.
            /\.map$/,
            // Exclude chunks marked as "nocache" (big and/or not used much)
            /\.noprecache/,
            // Exclude LICENSE file
            /LICENSE\.txt$/,
            // Exclude images for PWA and other PWA-related stuff
            /^mstile-/,
            /^android-chrome-/,
            /^favicon/,
            /^apple-touch-icon/,
            /manifest.json$/,
            /browserconfig.xml$/,
            // Exclude robots.txt
            /robots.txt$/,
          ],
        }),
      hasStats &&
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'disabled',
          generateStatsFile: true,
          statsOptions: { source: false },
          statsFilename: `${bundleName}.stats.json`,
        }),
      !isLiveReload &&
        new MiniCssExtractPlugin({
          filename: `styles.[contenthash:6].css`,
          chunkFilename: `styles.[contenthash:6].css`,
          ignoreOrder: true,
        }),
    ].filter(Boolean),
    // END PLUGINS
    optimization: {
      runtimeChunk: isLiveReload ? 'single' : true,
      // when updating webpack check this URL to adapt the different default
      // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          geneontology: {
            // list the package to extract into its own bundle, plus all its
            // dependencies used *only* by it (use `yarn why <dependency>` to find)
            test: /[\\/]node_modules[\\/](@geneontology|amigo2-instance-data|react-icons|react-popper|react-transition-group|popper\.js|underscore|bbop-core)[\\/]/,
            name: 'geneontology',
            chunks: 'all',
          },
          sibSubcell: {
            test: /[\\/]node_modules[\\/]@swissprot[\\/]swissbiopics-visualizer[\\/]/,
            name: 'sib-subcell',
            chunks: 'all',
          },
          sentry: {
            test: /[\\/]node_modules[\\/]@sentry[\\/]/,
            name: 'sentry',
            chunks: 'all',
          },
          'sanitize-html': {
            test: /[\\/]node_modules[\\/](sanitize-html|entities|htmlparser2|domhandler|domutils|dom-serializer|domelementtype)[\\/]/,
            name: 'sanitize-html',
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
          },
          nightingale: {
            test: /[\\/]node_modules[\\/](protvista-|nightingale-)/,
            name: 'nightingale',
            chunks: 'all',
          },
          molstar: {
            test: /[\\/]node_modules[\\/]molstar[\\/]/,
            name: 'molstar.noprecache',
            chunks: 'all',
          },
          // Commented, let webpack do it's optimisation/chunking job
          // defaultVendors: {
          //   test: /[\\/]node_modules[\\/]/,
          //   name: 'default-vendors',
          //   priority: -10,
          // },
          // default: {
          //   minChunks: 2,
          //   priority: -20,
          //   reuseExistingChunk: true,
          // },
        },
      },
    },
  };

  return config;
};

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isLiveReload = !!env.WEBPACK_SERVE;
  const isTest = env.TEST;
  const gitCommitHash = childProcess
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim();
  const gitCommitState = childProcess
    .execSync('git status --porcelain')
    .toString()
    .trim();
  const gitBranch = (
    env.GIT_BRANCH ||
    childProcess.execSync('git symbolic-ref --short HEAD').toString()
  ).trim();
  const isUx = gitBranch === 'ux';
  let publicPath = '/';
  if (env.PUBLIC_PATH) {
    // if we have an array, it means we've probably overriden env in the CLI
    // from a predefined env in a yarn/npm script
    if (Array.isArray(env.PUBLIC_PATH)) {
      // so we take the last one
      publicPath = env.PUBLIC_PATH[env.PUBLIC_PATH.length - 1];
    } else {
      publicPath = env.PUBLIC_PATH;
    }
  }

  let apiPrefix;
  if (env.API_PREFIX) {
    // if we have an array, it means we've probably overriden env in the CLI
    // from a predefined env in a yarn/npm script
    if (Array.isArray(env.API_PREFIX)) {
      // so we take the last one
      apiPrefix = env.API_PREFIX[env.API_PREFIX.length - 1];
    } else {
      apiPrefix = env.API_PREFIX;
    }
  } else {
    throw new Error('API_PREFIX must be set');
  }

  const modernConfig = getConfigFor({
    isModern: true,
    isDev,
    isUx,
    isLiveReload,
    isTest,
    hasStats: !!env.STATS,
    gitCommitHash,
    gitCommitState,
    gitBranch,
    publicPath,
    apiPrefix,
  });

  if (isLiveReload) {
    modernConfig.devServer = {
      compress: true,
      host: 'localhost',
      historyApiFallback: true,
      devMiddleware: {
        stats: 'errors-only',
      },
      open: {
        // use a browser specified in the user's environment, otherwise use default
        app: process.env.BROWSER,
      },
    };
  }

  if (!isDev) {
    const legacyConfig = getConfigFor({
      isModern: false,
      isDev,
      isUx,
      isLiveReload,
      isTest,
      hasStats: !!env.STATS,
      gitCommitHash,
      gitCommitState,
      gitBranch,
      publicPath,
      apiPrefix,
    });

    return [legacyConfig, modernConfig];
  }

  return modernConfig;
};
