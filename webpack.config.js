const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development'
const isPro = nodeEnv === 'production'

console.log("当前运行环境：", isPro ? 'production' : 'development')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js'
	},
	// BASE_URL是全局的api接口访问地址
	plugins : [
        new ExtractTextPlugin({ filename: 'css/index.css', disable: false, allChunks: true }),
        new HtmlWebpackPlugin({
            filename: 'index.html', //生成的html存放路径，相对于path
            template: './src/index.html', //html模板路径
            //favicon: './src/favicon.ico',
            inject: true //允许插件修改哪些内容，包括head与body
        })
    ],
	// alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
	resolve: {
		extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.join(__dirname, './src')
		],
		alias: {
			"actions": path.resolve(__dirname, "src/actions"),
			"components": path.resolve(__dirname, "src/components"),
			"containers": path.resolve(__dirname, "src/containers"),
			"reducers": path.resolve(__dirname, "src/reducers"),
			"utils": path.resolve(__dirname, "src/utils")
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: 'babel-loader'
		}, {
			test: /\.(less|css)$/,
			use: isPro ? ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ["css-loader", "less-loader"]
			}) : ["style-loader", "css-loader", "less-loader"]
		}, {
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
		}]
	},
	devServer: {
		contentBase: [
			path.join(__dirname, 'src/')
		],
		host: 'localhost',
		port: 3000, // 默认3000
		inline: true, // 可以监控js变化
		hot: false, // 热启动
		compress: true,
		watchContentBase: false,
		proxy: { //webpack-dev-server 代理请求 api
			'/apis': {
				target: 'http://www.kunyujie.com',
				pathRewrite: {
					'^/apis': '/'
				},
				changeOrigin: true
			}
		}
	}
};
