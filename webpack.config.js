const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['ts-loader']
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
      template: './index.html',
      chunksSortMode: 'none'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2
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
      }
    },
  },
  externals: {
    // 'react': 'React', // Case matters here 
    // 'react-dom': 'ReactDOM', // Case matters here 
    // 'react-router-dom': 'ReactRouterDOM',
    'amap-js-sdk': 'AMap'
  },
}