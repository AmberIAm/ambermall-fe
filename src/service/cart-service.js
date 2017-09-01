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
    },
	// 获取购物车列表
    getCartList: function (resolve, reject) {
        _common.request({
            url: _common.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    // 选择购物车商品
    selectProduct: function(productId, resolve, reject){
        _common.request({
            url: _common.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 取消选择购物车商品
    unselectProduct: function(productId, resolve, reject){
        _common.request({
            url: _common.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 选择全部购物车商品
    selectAllProduct: function(resolve, reject){
        _common.request({
            url: _common.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消选中全部购物车商品
    unselectAllProduct: function(resolve, reject){
        _common.request({
            url: _common.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 更新购物车商品数量
    updateProduct: function(productInfo, resolve, reject){
        _common.request({
            url: _common.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除指定商品
    deleteProduct: function(productIds, resolve, reject){
        _common.request({
            url: _common.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    }
};
module.exports = _cart;