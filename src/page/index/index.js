'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _common = require('util/common.js');
var templateBanner = require('./banner.string');

$(function() {
    // 渲染banner的html
    var bannerHtml = _common.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
