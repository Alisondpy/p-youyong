/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Slider = require('lib/ui/slider/3.0.4/slider');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var swiper = require('lib/plugins/swiper/3.1.2/swiper');
    require('plugins/layer/layer');

    //轮播图
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
        navigation: {
            arrows: true,
            toggleOnHover: false,
            effect: 'slide',
            nextArrow: '',
            prevArrow: ''
        },
        callback: {
            start: function(index) {},
            loaded: function() {}
        }
    });

    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    //师资团队滚动
    var teacherSwiper = new swiper('.swiper-container',{
        // 如果需要前进后退按钮
        nextButton: '.arrow-right',
        prevButton: '.arrow-left',
        slidesPerView: 3
    });

    //教学环境合作企业tab切换
    $('.jTitle').on('click',function(){
        var val = $(this).attr('data-value');
        $(this).addClass('title-active').siblings().removeClass('title-active');
        if(val === '0'){
            $('.jTab1').hide();
            $('.jTab0').show();
        }else {
            $('.jTab0').hide();
            $('.jTab1').show();
        }
    });

    //弹出相框
    $('.jAlum').on('click',function(){
        io.get('test/photos.json?v='+new Date, function(json){
            layer.photos({
                photos: json //格式见API文档手册页
                ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
            });
        });
    });
});
