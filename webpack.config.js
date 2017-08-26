var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path              = require('path');
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
		template: './src/view/' + name + '.html',
 		filename: 'view/' + name + '.html',
 		inject: true,
 		hash: true,
 		chunks: ['common', name]
	}
}
// webpack配置
var config = {
     entry: {
     	'common': ['./src/page/common/index.js', 'webpack-dev-server/client?http://localhost:8088/'],
     	'index': ['./src/page/index/index.js'],
     	'login': ['./src/page/login/index.js']
     },
     output: {
         path    : path.resolve(__dirname, 'dist'),
         publicPath : '/dist',
         filename: 'js/[name].js'
     },
     // 引进jquery
     externals: {
     	'jquery': 'window.jQuery'
     },
     module: {
     	loaders: [
     		{
     			// 解析css
     			test: /\.css$/, 
     			loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
     		},
     		{
     			// 解析图片和icon-font
     			test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
     			loader: 'url-loader?limit=100&name=resource/[name].[ext]'
     		}
     	]
     },
     plugins: [
     	// 独立通用模块至base.js
     	new webpack.optimize.CommonsChunkPlugin({
     		name    : 'common',
     		filename: 'js/base.js'
     	}),
     	// css单独打包
     	new ExtractTextPlugin('css/[name].css'),
     	// html模板的处理
     	new HtmlWebpackPlugin(getHtmlConfig('index')),
     	new HtmlWebpackPlugin(getHtmlConfig('login')),
     ]
 };
module.exports = config;