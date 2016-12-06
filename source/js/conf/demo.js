define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');

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


    // var layer = require('plugins/layer/3.0/layer');

    //tab层
    // layer.tab({
    //     area: ['600px', '300px'],
    //     tab: [{
    //         title: 'TAB1',
    //         content: '内容1'
    //     }, {
    //         title: 'TAB2',
    //         content: '内容2'
    //     }, {
    //         title: 'TAB3',
    //         content: '内容3'
    //     }]
    // });


    //slider
    var slider = new Slider('#jSlider', {
        lazyLoad: {
            loadingClass: 'img-error'
        },
        play: {
            auto: true,
            interval: 4000,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500
        },
        callback: {
            start: function(index) {},
            loaded: function() {}
        }
    });

    //image-lazyload
    var lazy = new Lazyload($('#jImgList .jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    $('#jFixNav').find('.more').click(function() {
        if ($('#jFixNav').hasClass('ui-fix-nav-show')) {
            $('#jFixNav').removeClass('ui-fix-nav-show');
        } else {
            $('#jFixNav').addClass('ui-fix-nav-show');
        }
    });
});
