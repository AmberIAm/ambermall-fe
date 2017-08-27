var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path              = require('path');
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
	return {
		template: './src/view/' + name + '.html',
 		filename: 'view/' + name + '.html',
          title: title,
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
     	'login': ['./src/page/login/index.js'],
          'result': ['./src/page/result/index.js']
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
     		},
               {
                    test: /\.string$/, 
                    loader: 'html-loader'
               }
     	]
     },
     // 配置别名
     resolve : {
     	alias : {
               node_modules : path.resolve(__dirname, './node_modules'),
     		util : path.resolve(__dirname, './src/util'),
     		page : path.resolve(__dirname, './src/page'),
     		service : path.resolve(__dirname, './src/service'),
     		image : path.resolve(__dirname, './src/image')
     	}
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
     	new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
     	new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
          new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
     ]
 };
module.exports = config;