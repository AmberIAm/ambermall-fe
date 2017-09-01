/*
* @Author: Administrator
* @Date:   2017-08-27 15:03:08
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-27 15:44:15
*/
'use strict';
require('./index.css');
var _common = require('util/common.js');
// 通用页面头部
var header = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		var keyword = _common.getUrlParam('keyword');
		// 如果keyword存在，则回填输入框
		if(keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function(){
		var _this = this;
		// 点击搜索按钮之后，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	// 搜索的提交
	searchSubmit: function(){
		var keyword =  $.trim($('#search-input').val());
		// 如果提交的时候有keyword, 就正常提交到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		// 如果keyword为空，直接返回首页
		else {
			_common.goHome();
		}
	}
};

header.init();