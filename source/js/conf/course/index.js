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
    var Pager = require('plugins/pager/1.0.0/pager');
    var Tab = require('lib/ui/tab/1.0.0/tab');

    var lazy,pager;
    var jPagination0 = $('#jPagination0');
    var jPagination1 = $('#jPagination1');
    var jPagination2 = $('#jPagination2');

    /*
    * 渲染分页列表
    * */
    function renderList(url,data,tmpEl,htmEl,pagEl){
        pager = new Pager(pagEl, {
            url:url,
            data:data,
            alias: {
                currentPage: 'currentPage',
                pageSize: 'pageSize'
            },
            options: {
                currentPage: 1, // start with 1
                pageSize: 8
            }
        });

        var loading = null;

        pager.on('ajaxStart', function() {
            loading = Box.loading('正在加载...', {
                modal: false
            });
        });

        pager.on('ajaxSuccess', function(res, callback) {
            console.log({"后台返回的数据":res},"回调函数："+callback);
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
            callback && callback(res.data.records);
            loading && loading.hide();
        });

        pager.on('ajaxError', function(data) {
            document.getElementById(htmEl).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
            loading && loading.hide();
        });

        pager.on('change', function(pageNum, e) {
            console.log('pageNum', pageNum, e);
        });

        console.log(pager.el.hasClass('current'));
    };

    renderList('/p-youyong/source/api/course/tab0.json',{'info':'系列课'},'tab0','jTab0',jPagination0);

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
            renderList('/p-youyong/source/api/course/tab1.json',{'info':'点播课'},'tab1','jTab1',jPagination1);
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
            renderList('/p-youyong/source/api/course/tab2.json',{'info':'直播课'},'tab2','jTab2',jPagination2);
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
        }
    });
});
