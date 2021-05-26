const path = require('path');
const fs = require('fs');

const { DefinePlugin } = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jsonImporter = require('node-sass-json-importer');
const childProcess = require('child_process');
// some plugins are conditionally-loaded as they are also conditionally used.

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isLiveReload = !!env.WEBPACK_SERVE;
  const isTest = env.TEST;
  const gitCommitHash = childProcess
    .execSync('git rev-parse --short HEAD')
    .toString();
  const gitCommitState = childProcess
    .execSync('git status --porcelain')
    .toString();

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

  const config = {
    context: __dirname,
    entry: [path.resolve(__dirname, 'src/index.tsx')],
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath,
      filename: 'app.[contenthash:6].js',
      chunkFilename: '[name].[contenthash:6].js',
      clean: true,
    },
    devtool: (() => {
      // no sourcemap for tests
      if (isTest) return;
      // live reload, slowest first build, fast rebuild, full original source
      if (isLiveReload) return 'eval-source-map';
      // dev, slow everything, but original source
      if (isDev) return 'source-map';
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
        redux: path.resolve('./node_modules/redux'),
        // other packages
        classnames: path.resolve('./node_modules/classnames'),
        // go package uses a slightly earlier version of axios, link it to ours
        axios: path.resolve('./node_modules/axios'),
        // point directly to the ES6 module entry point, to be processed by us
        'franklin-sites': fs.realpathSync(
          `${__dirname}/node_modules/franklin-sites/src/components/index.ts`
        ),
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
      fallback: {
        // Needed for 'react-msa-viewer'
        assert: false,
      },
    },
    // MODULE
    module: {
      rules: [
        // JavaScript and Typescript files
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude:
            /node_modules\/((?!protvista-msa|react-msa-viewer|franklin-sites|protvista-uniprot|p-map|aggregate-error).*)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        /**
         * Worker required for msa-react-viewer. Gustavo looking at
         * making dependency optional
         * */
        {
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader',
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
            fs.realpathSync(`${__dirname}/node_modules/rheostat`),
            fs.realpathSync(`${__dirname}/node_modules/litemol/dist/css`),
            fs.realpathSync(
              `${__dirname}/node_modules/@geneontology/ribbon/es`
            ),
            fs.realpathSync(
              `${__dirname}/node_modules/interaction-viewer/styles`
            ),
            fs.realpathSync(
              `${__dirname}/node_modules/tippy.js/dist/tippy.css`
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
                modules: {
                  auto: true, // only for files containing ".module." in name
                  // class name to hash, but also keep name in development
                  localIdentName: `${
                    isDev ? '[local]#' : ''
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
                  importer: jsonImporter({ convertCase: true }),
                },
              },
            },
          ],
        },
        // SVGs in stylesheets
        {
          test: /\.svg$/i,
          issuer: /\.(css|scss)?$/,
          loader: 'svg-url-loader',
        },
        // rest of SVGs
        {
          test: /\.svg$/i,
          include: [
            path.resolve(__dirname, 'src'),
            fs.realpathSync(`${__dirname}/node_modules/franklin-sites`),
          ],
          issuer: /\.(t|j)sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
            },
          ],
        },
        // Fonts
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          // NOTE: watch out, this *only* includes litemol, if we need to load
          // NOTE: fonts from somewhere else we'll have to add it here.
          include: [
            fs.realpathSync(`${__dirname}/node_modules/litemol/dist/fonts`),
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash:6].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
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
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[contenthash:6].[ext]',
              },
            },
          ],
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
      new HtmlWebPackPlugin({
        template: `${__dirname}/index.html`,
        filename: 'index.html',
      }),
      !isDev &&
        new HtmlWebPackPlugin({
          template: `${__dirname}/404.html`,
          filename: '404.html',
        }),
      new DefinePlugin({
        BASE_URL: JSON.stringify(publicPath),
        LIVE_RELOAD: JSON.stringify(isLiveReload),
        GIT_COMMIT_HASH: JSON.stringify(gitCommitHash),
        GIT_COMMIT_STATE: JSON.stringify(gitCommitState),
      }),
      !isLiveReload &&
        new (require('workbox-webpack-plugin').InjectManifest)({
          swSrc: `${__dirname}/src/service-worker/service-worker.ts`,
          // TODO: remove limit when we manage to reduce size of entrypoint
          // For now, 2MB in production (Litemol chunk is 1.3M!), 10M in dev
          maximumFileSizeToCacheInBytes: 1024 * 1024 * 2 * (isDev ? 5 : 1),
          // exclude fonts from precaching because one specific browser will
          // never need all fonts formats at the same time, will cache later
          // whichever is actually used. Exclude sourcemaps too.
          exclude: [/fonts/, /\.map$/],
        }),
      !isLiveReload &&
        !isTest &&
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'disabled',
          generateStatsFile: true,
          statsOptions: { source: false },
        }),
      !isLiveReload &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash:6].css',
          chunkFilename: '[name].[contenthash:6].css',
        }),
    ].filter(Boolean),
    // END PLUGINS
    optimization: {
      runtimeChunk: true,
      // when updating webpack check this URL to adapt the different default
      // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
      splitChunks: {
        chunks: 'async',
        minSize: 30 * 1024,
        maxSize: 255 * 1024,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          sentry: {
            test: /[\\/]node_modules[\\/]@sentry[\\/]/,
            name: 'sentry',
            chunks: 'all',
          },
          geneontology: {
            // list the package to extract into its own bundle, plus all its
            // dependencies used *only* by it (use `yarn why <dependency>` to find)
            test: /[\\/]node_modules[\\/]@geneontology|amigo2-instance-data|react-icons|react-popper|react-transition-group|popper\.js|underscore|bbop-core[\\/]/,
            name: 'geneontology',
            chunks: 'all',
          },
          sibSubcell: {
            test: /[\\/]node_modules[\\/]@swissprot\/swissbiopics-visualizer|tippy\.js[\\/]/,
            name: 'sib-subcell',
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
          },
          litemol: {
            test: /[\\/]node_modules[\\/](litemol)[\\/]/,
            name: 'litemol',
            chunks: 'all',
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'default-vendors',
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  };

  if (isLiveReload) {
    config.devServer = {
      compress: true,
      host: 'localhost',
      historyApiFallback: true,
      open: {
        // use a browser specified in the user's environment, otherwise use default
        app: process.env.BROWSER,
      },
    };
  }

  return config;
};
