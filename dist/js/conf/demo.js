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

    //自定义滚动条皮肤
    require('plugins/scroller/1.0.0/jquery.mCustomScrollbar');
    require('plugins/scroller/1.0.0/jquery.mousewheel');
    $("#jScroller").mCustomScrollbar({
        // axis: 'y',
        // // alwaysShowScrollbar:2,
        // autoHideScrollbar:false,
        // autoExpandScrollbar:true,
        // mouseWheel: {
        //     preventDefault: true
        // },
        // // scrollButtons: {
        // //     enable: true
        // // },
        theme: "minimal-dark" //参考皮肤http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/scrollbar_themes_demo.html
    });

    //分享
    // var Share = require('plugins/share/1.0.0/share');
    // var share = new Share('#jShare');

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
        loadingClass: 'img-error',
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

    box.tips('ddd', {
        xtype: 'ok',
        duration: 0
    });
    var clickHandles = {

        loadUrl: function() {
            // async request with loading bar
            box.loadUrl('/m-service-market/source/api/demo/publish-require.json', {
                data: { t: +new Date },
                content: '加载中',
                success: function(res) {
                    console.log(res);
                    alert(JSON.stringify(res));
                }
            });
        },

        loading: function() {
            // async request with loading bar
            var _box = box.loading('加载中,3秒后关闭');
            setTimeout(function() { _box.hide(); }, 3000);
        },

        tips: function() {
            box.tips('ok! it\'s a tips', null, 1000);
        },

        alert: function() {
            box.alert('ok! it\'s a tips');
        },

        confirm: function() {
            box.confirm('Are you sure?',
                function() {
                    box.tips('ok');
                },
                function() {
                    alert('cancel');
                }, this
            );
        },

        bubble: function() {
            box.bubble('我是气泡，可以任意调整方向', { align: 't' }, this);
        },

        warn: function() {
            box.warn('Opps!');
        },

        sendPost: function() {
            // console.log(this);
            io.get('/m-service-market/source/api/demo/demo.json', { 'foo': 'foo text' }, function(res) {
                console.log(res.msg + ' ( code: ' + res.error + ')');
            }, this);
            // io.get('/m-service-market/source/api/demo/publish-require.json', { 'foo': 'foo text' }, function(res) {
            //     alert(res.msg + ' (code: ' + res.error + ')');
            // }, this);
        }
    };

    $('#jBox .btn').each(function() {
        var _this = $(this),
            type = _this.attr('data-type'),
            handle = clickHandles[type];
        if (handle) {
            _this.on('click', handle);
        }
    });
});
