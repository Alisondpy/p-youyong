define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var lazy;
    var jHotTrain = $("#jHotTrain");
    //图片懒加载
    lazy = new Lazyload(jHotTrain.find('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var FixBar = require('module/fix-bar/1.0.0/fix-bar');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var fixBar = new FixBar();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    //分享
    var Share = require('plugins/share/1.0.0/share');
    var share = new Share('#jShare');

    $('#jPraise').click(function(e){
        
    });
});
