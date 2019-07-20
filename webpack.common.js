const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
// server worker用来保存缓存
// const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.tsx'
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      },
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
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      //   use: [
      //     'url-loader?limit=100000'
      //   ]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'none'
    }),
    new ManifestPlugin(),
    new DashboardPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    // new GenerateSW()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
      // minChunks: 2
    },
    runtimeChunk: true,
  },
  externals: {
    // 'react': 'React', // Case matters here 
    // 'react-dom': 'ReactDOM', // Case matters here 
    // 'react-router-dom': 'ReactRouterDOM',
    'amap-js-sdk': 'AMap'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      "api": path.resolve(__dirname, "src/api"),
      "components": path.resolve(__dirname, "src/components"),
      "interface": path.resolve(__dirname, "src/redux/interface"),
      "rootstate": path.resolve(__dirname, "src/state"),
    }
  },
}