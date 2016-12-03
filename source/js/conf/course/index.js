/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var template=require("template");
    var lazy;

    function getLists(url,data,tmpEl,htmEl){
        io.get(url,{"data":data},function(res){
            if(!$.isEmptyObject(res.data) && res.data.list.length > 0){
                var html = template(tmpEl,res.data);
                document.getElementById(htmEl).innerHTML = html;
            }else {
                document.getElementById(htmEl).innerHTML = "<div style='color: #000;'>暂无数据</div>";
            }

            //图片懒加载
            lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            });
        },function(res){
            document.getElementById(htmEl).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
        });
    }

    getLists('/p-youyong/source/api/course/tab0.json','系列课','tab0','jTab0');

    //课程类型切换
    $('#jCourseType').on('click','.nav li',function(){
        $(this).addClass("current").siblings().removeClass("current");
    });
    $('#jCourseType').on('click','#jType0 li',function(){
        var type = $(this).find('a').attr('data-type');
        if(type === '1'){
            $('#jType1').show();
            $('#jType2').show();
            $('#jSubNav').show();
            $('#jTab0').hide();
            $('#jTab1').show();
            $('#jTab2').hide();
            $('#jType0Title').hide();
            if(!$('#jType0').hasClass('ui-nav-border')){
                $('#jType0').addClass('ui-nav-border');
            }
            if(!$('#jType1').hasClass('ui-nav-border')){
                $('#jType1').addClass('ui-nav-border');
            }
            $('#jType2').removeClass('ui-nav-border');
            getLists('/p-youyong/source/api/course/tab1.json','点播课','tab1','jTab1');
        }else if(type === '2'){
            $('#jType1').show();
            $('#jType2').show();
            $('#jSubNav').hide();
            $('#jTab0').hide();
            $('#jTab1').hide();
            $('#jTab2').show();
            $('#jType0Title').hide();
            if(!$('#jType0').hasClass('ui-nav-border')){
                $('#jType0').addClass('ui-nav-border');
            }
            if(!$('#jType1').hasClass('ui-nav-border')){
                $('#jType1').addClass('ui-nav-border');
            }
            $('#jTab2').removeClass('ui-nav-border');
            getLists('/p-youyong/source/api/course/tab2.json','直播课','tab2','jTab2');
        }else {
            $('#jType1').hide();
            $('#jType2').hide();
            $('#jSubNav').hide();
            $('#jTab0').show();
            $('#jTab1').hide();
            $('#jTab2').hide();
            $('#jType0Title').show();
            $('#jType0').removeClass('ui-nav-border');
            $('#jType1').removeClass('ui-nav-border');
            $('#jType2').removeClass('ui-nav-border');
            getLists('/p-youyong/source/api/course/tab0.json','系列课','tab0','jTab0');
        }
        lazy.update();
    });
    //点播课和直播课效果
    $('.jLists').on('mouseenter','.jList',function(){
        var titleLen = $(this).find('.jTitle').text().length;
        if(titleLen > 13){
            $(this).find('.jModLabel').stop(true,false).slideUp();
        }
    }).on('mouseleave','.jList',function(){
        var titleLen = $(this).find('.jTitle').text().length;
        if(titleLen > 13){
            $(this).find('.jModLabel').stop(true,false).slideDown();
        }
    });
});
