/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');

    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });


    //点播课和直播课效果
    $('.jList').mouseenter(function(){
        var titleLen = $(this).find('.jTitle').text().length;
        if(titleLen > 13){
            $(this).find('.jModLabel').stop(true,false).slideUp();
        }
    }).mouseleave(function(){
        var titleLen = $(this).find('.jTitle').text().length;
        if(titleLen > 13){
            $(this).find('.jModLabel').stop(true,false).slideDown();
        }
    });
});
