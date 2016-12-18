define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var io = require('lib/core/1.0.0/io/request');
    var cookie = require("lib/core/1.0.0/io/cookie");
    var Login = require('module/login-status/1.0.0/login');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var box = require('lib/ui/box/1.0.1/crossbox');
    //赞效果
    var Praise = require('module/praise/1.0.0/praise');
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

    //点赞接口处理
    function clickInterface(url, data, msg) {
        io.get(url, data, function(res) {
            //box.ok(msg + '成功');
        }, function(res) {
            box.error(res.msg || '网络错误,请重试');
        });
    };
    $('#jNewsPraise').click(function(e){
        var praise = new Praise(this);
        if (!Login.isLogin()) {
            var numBox = $(this).find('span');
            var number = parseInt(numBox.text());
            var dataType = $(this).attr('data-dataType');
            var type = $(this).attr('data-type');
            var id = $(this).attr('data-id');
            var data;
            if ($(this).hasClass("praised")) {
                data = {
                    "dataType": dataType,
                    "type": type,
                    "id": id
                }
                clickInterface($PAGE_DATA['commentClickUrl'], data, '取消点赞');
                $(this).removeClass("praised");
                numBox.text(number-1);
                praise.delete();
            } else {
                data = {
                    "dataType": dataType,
                    "type": type,
                    "id": id
                }
                clickInterface($PAGE_DATA['commentClickUrl'], data, '点赞');
                $(this).addClass("praised");
                numBox.text(number+1);
                praise.add();
            }
        } else {
            Login.login(window.location.href);
        }
    });
});
