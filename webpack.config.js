const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].build.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['awesome-typescript-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    port: 8080,
    proxy: {
      "/api": {
        target: 'http://123.207.96.7:3000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      },
    },
  },
  externals: {
    'react': 'React', // Case matters here 
    'react-dom': 'ReactDOM', // Case matters here 
    'react-router-dom': 'ReactRouterDOM',
    'amap-js-sdk': 'AMap'
  },
}