import path from 'path';
import webpack from 'webpack';
import Config from 'webpack-config';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default new Config().extend('conf/webpack.base.config.js').merge({
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\/src/,
      sourceMap:true,
    }),
		new BrowserSyncPlugin({
			server: {
				baseDir: ['public']
			},
			port: 3000,
			host: 'localhost',
			open: false
		}),
  ],
});
