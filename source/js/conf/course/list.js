
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Login = require('module/login-status/1.0.0/login');
    var FixBar = require('module/fix-bar/1.0.0/fix-bar');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    //var fixBar = new FixBar();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    //判断用户是否登陆
    var userLogin = Login.isLogin();
    var io = require('lib/core/1.0.0/io/request');
    //弹出层
    var box = require('lib/ui/box/1.0.1/crossbox');

    $('.stageShow li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
});
