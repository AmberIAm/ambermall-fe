'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _common = require('util/common.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        listParam: {
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadCart();
    },
    bindEvent: function () {
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function () {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
    },
    // 加载购物车信息
    loadCart: function () {
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // loading
        // $pageWrap.html('<div class="loading"></div>');
    },
    // 数据匹配
    filter: function (data) {
    }
};
$(function () {
    page.init();
});
