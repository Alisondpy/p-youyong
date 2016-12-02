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

    //课程类型切换
    $('#jCourseType').on('click','.nav li',function(){
        $(this).addClass("current").siblings().removeClass("current");
    });
    $('#jCourseType').on('click','#jType0 li',function(){
        var type = $(this).find('a').attr('data-type');
        if(type === '1'){
            $('#jType1').show();
            $('#jType2').hide();
            $('#jSubNav').show();
            $('#jTab0').hide();
            $('#jTab1').show();
            $('#jTab2').hide();
            $('#jType0Title').hide();
        }else if(type === '2'){
            $('#jType1').show();
            $('#jType2').show();
            $('#jSubNav').hide();
            $('#jTab0').hide();
            $('#jTab1').hide();
            $('#jTab2').show();
            $('#jType0Title').hide();
        }else {
            $('#jType1').hide();
            $('#jType2').hide();
            $('#jSubNav').hide();
            $('#jTab0').show();
            $('#jTab1').hide();
            $('#jTab2').hide();
            $('#jType0Title').show();
        }
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
