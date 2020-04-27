const ManifestPlugin = require('webpack-manifest-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const SUB_APP_NAME = require('./package').name;

const BASE_URL = process.env.REACT_APP_BASE_URL;
const VERSION = process.env.SUB_APP_VERSION || 'test';
const SUB_APP_TITLE = '程序员老黄历';

module.exports = (defaultConfig) => {
  const config = { ...defaultConfig };

  config.output.publicPath = `./`

  config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
  };


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
          files: files.map(i=>i.path)
        };
      }
    }),
    new DefinePlugin({
      'process.env.SUB_APP_NAME': `"${SUB_APP_NAME}"`
    })
  );
  return config;
};
