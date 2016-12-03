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

    //tab页切换
    $('.mod-wrap .mod-sub-nav a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('.mod-sub-wrap').hide();
        $('.jWrap'+$(this).attr('data-value')+'').show();
    });

    //评论字数限制
    $('.jTxt').keyup(function(){
        var txtLen = $('.jTxt').val().length;
        if(txtLen > 300){
            $(this).addClass('text-error');
            $('.jPublish').addClass('publish-error');
            $('.jArrow').addClass('arrow-error');
            $('.jTxtNum').css({'color':'red'});
        }else {
            $(this).removeClass('text-error');
            $('.jPublish').removeClass('publish-error');
            $('.jArrow').removeClass('arrow-error');
            $('.jTxtNum').css({'color':'#666'});
        }
        $('.jTxtNum').children('i').text(txtLen);
    });

    //评论focus效果
    $('.jTxt').focus(function(){
        $('.jArrow').addClass('arrow-focus');
        $(this).addClass('text-focus').attr('placeholder','');
    }).blur(function(){
        if($(this).val() === ''){
            $(this).removeClass('text-focus').attr('placeholder','看点糟点，不吐不快！别憋着，马上大声说出来吧！');
            $('.jArrow').removeClass('arrow-focus');
        }
    });

    //点赞
    $('.mod-item .like').click(function(){
        if($(this).hasClass("activeLike")){
            $(this).removeClass('activeLike');
        }else {
            $(this).addClass('activeLike');
        }
    });

    //采集
    $('.mod-item .pick').click(function(){
        if($(this).hasClass("picked")){
            $(this).find('i').text('采集');
            $(this).removeClass('picked');
        }else {
            $(this).find('i').text('已采集');
            $(this).addClass('picked');
        }
    });

    //最新
    $('.jWrap3 .bar-left').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    //只看我的
    $('.jWrap3 .bar-right').click(function(){
        if($(this).text() === '只看我的'){
            $(this).text('取消只看我的');
        }else {
            $(this).text('只看我的');
        }
    });

    //查看全文
    $('.jViewAll').click(function(){
        if($(this).text() !== "收起"){
            $(this).parent().parent().siblings('.jWrap3P').css({"overflow":"visible","display":"block"});
            $(this).html('<i class="view-up"></i>收起');
        }else {
            $(this).parent().parent().siblings('.jWrap3P').css({"overflow":"hidden","display":"-webkit-box"});
            $(this).html('<i class="view-down"></i>查看全文');
        }
    });

});
