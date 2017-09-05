const webpack = require('webpack')
const path = require('path')
const QiniuPlugin = require('qiniu-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const qntoken = require('XXXXXX')

const isProduction = (process.env.NODE_ENV || 'development') === 'production'
module.exports = {
  entry: ['./index.js'],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.gif', '.png', '.jpeg', ',svg']
  },
  output: {
    filename: isProduction ? 'bundle-[hash].js' : 'bundle.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: isProduction ? `${qntoken.cdnBase}webapp/biaoqing/` : '/biaoqing'
  },
  plugins: getPlugins(),
  module: {
    rules: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        }]
      })
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: isProduction ? '[name]-[hash].[ext]' : '[name].[ext]',
            publicPath: isProduction ? `${qntoken.cdnBase}webapp/biaoqing/` : '/biaoqing/'
          }
        }
      ].concat(isProduction ? {
        loader: 'image-webpack-loader',
        options: {
          optipng: {
            optimizationLevel: 7
          },
          gifsicle: {
            interlaced: false
          },
          pngquant: {
            quality: '65-90',
            speed: 4
          },
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          svgo: {
            plugins: [
              { removeViewBox: false },
              { removeEmptyAttrs: false }
            ]
          }
        }
      } : [])
    }]
  }
}

function getPlugins () {
  return [].concat([
    new HtmlWebpackPlugin({
      filename: '../views/index.hbs',
      template: './tpl/index.hbs', // html模板路径,模板路径是支持传参调用loader的,
      inject: true, // 打包之后的js插入的位置，true/'head'/'body'/false,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new ExtractTextPlugin('main.css')
  ], isProduction ? [
    // 生产环境所需要的plugin
    // 上传到七牛
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new QiniuPlugin({
      ACCESS_KEY: qntoken.accessKey,
      SECRET_KEY: qntoken.secretKey,
      bucket: qntoken.bucket,
      path: `webapp/biaoqing/`,
      // 支持上传的文件
      include: [
        /\.js$/,
        /\.css$/,
        /\.(gif|png|jpe?g|svg)$/
      ]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ] : [
    // 开发环境所需要的plugin
    new webpack.SourceMapDevToolPlugin({
      include: /\.js(x)?$/,
      filename: '[name].js.map'
    })
  ])
}
