/*
* @Author: Administrator
* @Date:   2017-08-25 21:33:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-25 21:50:03
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _common = require('util/common.js');
// 表单的错误提示
var formError = {
    show: function (errMsg) {
       $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};
// page 逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function () {
            _this.submit();
        });
        // 如果按下回车，也会提交
        $('.user-content').keyup(function (e) {
            // 回车键的keyCode是13
            if(e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        },
        // 表单验证结果
        validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.login(formData, function (res) {
                window.location.href = _common.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            });
        }
        // 验证失败
        else {
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_common.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_common.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});