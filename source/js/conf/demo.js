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


    var LocationSelect = require('plugins/location-select/location-select');

    var locationSelect = new LocationSelect('#jAddrDiv', {
        // url: urlPrefix['www'] + '/api/getRegion/jsonp/', //获取地址url
        // defaultUrl: urlPrefix['www'] + '/api/getUserRegion', //获取默认地址url
        // setCookieUrl: urlPrefix['www'] + '/api/setUserRegion', //设置cookie
        degree: 4,
        labelTxt: ['选择省', '选择市', '选择区', '选择街道'],
        selectedIndex: 3, //选中的索引
        isShowCtn: false, //界面初始化时，是否打开box面板
        isShowClose: true, //是否显示关闭按钮
        isGetDefaultAddr: true, //是否获取默认地址,指接口获取的值或者cookie的值
        isSetAddrCookie: false, //是否调用后端存储cookie的url
        ajaxData: {} //外部ajax参数
    });
    locationSelect.on('loaded', function() {
        // _self._saveVal();
        // loaded && loaded();
    });
    locationSelect.on('lastChange', function() {
        $('#jLinkInfo').hide();
        $('#jLinkInfoThree').hide();
        console.log(this);
        // _self._saveVal();
        // lastChangeCallBack && lastChangeCallBack();
    });
    locationSelect.init();
    // locationSelect.show();

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
