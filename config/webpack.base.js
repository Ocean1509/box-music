const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[hash].js',
    chunkFilename: 'vendor.[chunkhash].js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
        }, {
          loader: 'iview-loader',
          options: {
            prefix: false
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/iview')],
        use: [
          process.env.NODE_ENV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(
      ['dist'], {
        root: path.resolve(__dirname, '../'),
        verbose: true,
        dry: false
      }
    ),
    new HtmlWebpackPlugin({
      title: 'test',
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    })
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'src': path.resolve(__dirname, '../src'),
      vue: 'vue/dist/vue.js',
      'iview': path.resolve(__dirname, '../node_modules/iview')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "../node_modules"),
          name: "vendor",
        },
      },
    },
  },
  mode: 'production',
}