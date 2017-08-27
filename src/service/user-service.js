/*
* @Author: Administrator
* @Date:   2017-08-27 15:11:20
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-27 15:19:55
*/
'use strict';
var _common = require('util/common.js');
var _user = {
	// 检查登录状态
	checkLogin: function(resolve, reject){
		_common.request({
			url: _common.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	// 登出
	logout: function(resolve, reject){
		_common.request({
			url: _common.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		});
	}
}
module.exports = _user;