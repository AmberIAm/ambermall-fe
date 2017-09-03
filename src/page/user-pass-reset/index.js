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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onload();
        this.bindEvent();
    },
    onload: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        // 输入用户名后下一步按钮的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            // 用户名存在
            if(username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else {
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题答案的按钮点击
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            // 存在密码提示问题的答案
            if(answer) {
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else {
                formError.show('请输入密码提示问题的答案');
            }
        });
        // 输入新密码后的按钮点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            // 密码不为空
            if(password && password.length >= 6) {
                // 检查密码提示问题答案
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else {
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    // 加载输入用户名的一步
    loadStepUsername: function () {
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion: function () {
        // 清除错误提示
        formError.hide();
        // 容器的切换
        $('.step-username').hide()
            .sibling('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载输入新密码的一步
    loadStepPassword: function () {
        // 清除错误提示
        formError.hide();
        // 容器的切换
        $('.step-question').hide()
            .sibling('.step-password').show();
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