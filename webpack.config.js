var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path              = require('path');
var getHtmlConfig = function(name){
	return {
		template: './src/view/' + name + '.html',
 		filename: 'view/' + name + '.html',
 		inject: true,
 		hash: true,
 		chunks: ['common', name]
	}
}
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
     externals: {
     	'jquery': 'window.jQuery'
     },
     module: {
     	loaders: [
     		{
     			test: /\.css$/, 
     			loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
     		},
     		{
     			test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
     			loader: 'url-loader?limit=100&name=resource/[name].[ext]'
     		}
     	]
     },
     plugins: [
     	new webpack.optimize.CommonsChunkPlugin({
     		name    : 'common',
     		filename: 'js/base.js'
     	}),
     	new ExtractTextPlugin('css/[name].css'),
     	new HtmlWebpackPlugin(getHtmlConfig('index')),
     	new HtmlWebpackPlugin(getHtmlConfig('login')),
     ]
 };
module.exports = config;