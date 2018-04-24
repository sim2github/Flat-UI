import webpack from 'webpack';
import Config from 'webpack-config';
import pkg from '../package.json';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

// Build comment
const signature = ` Flat UI Free v${pkg.version} (${pkg.homepage})
Copyright 2013-${(new Date()).getFullYear()} ${pkg.author}
Last Edited:  ${new Date()}`;

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: signature,
      test: [/\.js$/, /\.css$/],
    }),
  ]
});
