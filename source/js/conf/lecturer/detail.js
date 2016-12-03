/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    // var validate = require('lib/plugins/validation/1.15.1/jquery-validate');
    // var message = require('lib/plugins/validation/1.15.1/localization/messages_zh');
    var jTinfo = $('.jTinfo');
    var tab1 = $('.jTab-l');
    var tab2 = $('.jTab-r');
    var jLi = $('.jLi');
    var mask = $('.mod-mask');
    
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

    //讲师介绍和主讲课程的tab切换
    tab1.on('click',function(){
        jTinfo.addClass('active').css('display','block').siblings('.jLi').removeClass('active').css('display','none');
    });

    tab2.on('click',function(){
        jLi.addClass('active').css('display','block').siblings('.jTinfo').removeClass('active').css('display','none');
    });

    //关于遮罩层的操作
    $('.invite-btn').on('click',function(){
        mask.css('display','block');
    });

    $('#btn').on('click',function(){
        io.post();
    });

    // function cvalidate(){
    //     $('#cvalidate').validate({
    //         rules:{
    //             cname:{
    //                 required: true,
    //                 minlength:1
    //             }
    //             ctel:{
    //                 required:true;
    //             }
    //         }
    //     })
    // }

});
