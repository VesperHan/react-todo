
var path=require('path');
var webpack = require('webpack');
var ExtractTextPlugins = require('extract-text-webpack-plugin'); //样式抽取
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板生成器

module.exports = {
	entry: './src/index.js',
	output   : {
		//publicPath: 'http://localhost:8089/',
		filename: 'index.js'
	},
	module   : {
		loaders: [
			{
				test   : /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel?' + JSON.stringify({presets: ['react', 'es2015']})]
			},
			{
				test  : /\.less$/,
				loader:'style!css!less'
			}
		]
	},
	plugins  : [
		new ExtractTextPlugins('index.css', {
			allChunks: true
		}),

		new HtmlWebpackPlugin({
	        filename: 'index.html', //生成的html存放路径，相对于path
	        template: './src/index.html', //html模板路径
	        //favicon: './src/favicon.ico',
	        inject: true //允许插件修改哪些内容，包括head与body
	    })
	],
	resolve  : {
		extension: ['', '.js', '.es6']
	},
	devServer: {
		host: 'localhost',
        port: 3000, 
        inline: true,
        hot: true
        /*
		 proxy: [{
		 //path: '/admin/!*',
		 // target: 'http://127.0.0.1:8080' //开发1
		 }]*/
	}
};
