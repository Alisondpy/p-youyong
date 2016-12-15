define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var form = require('lib/core/1.0.0/utils/form');
    var template = require("template");
    var io = require('lib/core/1.0.0/io/request');
    var box = require('lib/ui/box/1.0.1/crossbox');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Login = require('module/login-status/1.0.0/login');
    var FixBar = require('module/fix-bar/1.0.0/fix-bar');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var fixBar = new FixBar();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/
    var  liveUrl = $PAGE_DATA['liveUrl'];
    //判断用户是否登录
    var userLogin = Login.isLogin();
    $("#jReport").on("click", function (){
        if(userLogin){
            box.loadUrl($PAGE_DATA['applyUrl'], {
                title: '报名详情',
                autoRelease: false,
                modal: true //是否有遮罩层
            });
        }else{
            Login.login();
        }
    });

    $("#jCheckIn").on("click", function () {
        io.get($PAGE_DATA['checkIn'], function (res) {
                box.ok("签到成功");
                setTimeout(function(){
                    window.location.reload();
                },3000)
            },
            function (res) {
                box.error(res.msg || '网络异常，请重试');
            }
        )
    });

    //直播跳转

    $("#jLive").on("click", function () {
        if(userLogin){
            io.get(liveUrl, function (res) {
                    window.location.href = res.data.liveshowUrl;


                },
                function (res) {
                    
                    box.error(res.msg || '网络异常，请重试');
                }
            )
        }else{
            Login.login();
        }
    });
});