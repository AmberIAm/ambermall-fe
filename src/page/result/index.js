'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _common = require('util/common.js');

$(function(){
	var type = _common.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	if(type === 'payment') {
		var orderNumber = _common.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number'),
			newHref = $orderNumber.attr('href') + orderNumber;
        $orderNumber.attr('href', newHref);
	}
	// 显示对应的提示元素
	$element.show();
});