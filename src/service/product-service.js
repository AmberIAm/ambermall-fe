/*
* @Author: Administrator
* @Date:   2017-08-27 15:11:20
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-27 15:19:55
*/
'use strict';
var _common = require('util/common.js');
var _product = {
    // 获取商品列表
    getProductList: function(listParam, resolve, reject){
        _common.request({
            url: _common.getServerUrl('/product/list.do'),
			data: listParam,
            success: resolve,
            error: reject
        });
    },
    getProductDetail: function(productId, resolve, reject){
        _common.request({
            url: _common.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
};
module.exports = _product;