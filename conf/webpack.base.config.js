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
    rules: [{
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:5]',
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }, 
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      }, 
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }, 
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      }
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
