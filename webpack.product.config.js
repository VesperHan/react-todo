var path=require('path');
var webpack = require('webpack');
var WebpackStripLoader = require('strip-loader');
var ExtractTextPlugins = require('extract-text-webpack-plugin'); //样式抽取
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname,'dist'),
    publicPath: "",
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?' + JSON.stringify({presets: ['react', 'es2015']})]
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugins.extract(['css','less'])
      },
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: WebpackStripLoader.loader('console.log')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugins('index.css', {
        allChunks: true
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html', //生成的html存放路径，相对于path
        template: './src/index.html', //html模板路径
        //favicon: './src/favicon.ico',
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: false, //是否添加hash值
        minify: { //压缩HTML文件
            removeComments: true,//移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    extension: ['', '.js', '.es6']
  }
};
