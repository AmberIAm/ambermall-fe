/*
* @Author: Administrator
* @Date:   2017-08-27 15:21:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-27 15:23:18
*/
/*
* @Author: Administrator
* @Date:   2017-08-27 15:11:20
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-27 15:19:55
*/
'use strict';
var _common = require('util/common.js');
var _cart = {
	// 获取购物车数量
	getCartCount: function(resolve, reject){
		_common.request({
			url: _common.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		});
	},
	// 添加到购物车
    addToCart: function(productInfo, resolve, reject){
        _common.request({
            url: _common.getServerUrl('/cart/add.do'),
			data: productInfo,
            success: resolve,
            error: reject
        });
    }
};
module.exports = _cart;