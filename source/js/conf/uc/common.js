define(function(require, exports, module) {
    'use strict';
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    //左侧菜单
    var LeftMenu = require('module/uc/left-menu/left-menu');
    var searchBar = new LeftMenu();
});



