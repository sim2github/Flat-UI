import path from 'path';
import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';


export default new Config().merge({
  entry: path.join(__dirname, '/../src/index.js'),
  output: {
    path: path.join(__dirname, '/../public'),
  },
  module: {
    loaders: [
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[hash:base64:5]",
            minimize: (process.env.NODE_ENV === 'production'),
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              precss,
              autoprefixer,
            ],
          }
        },
        {
          loader: 'sass-loader'
        },
      ]
    },
    {
      test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=100000'
    },
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/../src/template.html'),
      inject: "body"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ]
});
