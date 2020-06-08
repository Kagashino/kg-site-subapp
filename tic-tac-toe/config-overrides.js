const ManifestPlugin = require('webpack-manifest-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const SUB_APP_NAME = require('./package').name;

const BASE_URL = process.env.REACT_APP_BASE_URL;
const VERSION = process.env.SUB_APP_VERSION || 'test';
const SUB_APP_TITLE = '井字棋';

module.exports = (defaultConfig) => {
  const config = { ...defaultConfig };

  if (VERSION !== 'test') {
    config.externals = {
      react: 'React',
      'react-dom': 'ReactDOM'
    };
  }

  config.output.publicPath = './';

  config.plugins.push(
    new ManifestPlugin({
      fileName: 'subapp-manifest.json',
      filter: ({ path })=>/\.(js|css)$/.test(path),
      generate: (seed, files) => {
        return {
          name: SUB_APP_NAME.replace(/^kg-site-/, ''),
          title: SUB_APP_TITLE,
          version: VERSION,
          baseUrl: BASE_URL,
          files: files.map(i=>i.path.replace(/^\.\//, '/'))
        };
      }
    }),
    new DefinePlugin({
      'process.env.SUB_APP_NAME': `"${SUB_APP_NAME}"`
    })
  );
  return config;
};
