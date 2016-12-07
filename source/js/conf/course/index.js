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
        });

        pagEl.addClass('has-build');
    };

    //课程类型切换
    var jTab = $('#jCourseType');
    var tab = new Tab(jTab);
    var type;
    var type1 = $('#jType1');
    var type2 = $('#jType2');
    var subNav = $('#jSubNav');
    tab.on('change', function(el) {
        type = el.body.attr('data-id');
        switch (type){
            case '1':
                type1.hide();
                type2.hide();
                subNav.hide();
                if(!jPagination0.hasClass('has-build')){
                    jPagination1.hide();
                    jPagination2.hide();
                    renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/tab0.json',{'info':'系列课'},'tab0','jTab0',jPagination0);
                }else {
                    jPagination0.show();
                    jPagination1.hide();
                    jPagination2.hide();
                }
                break;
            case '2':
                type1.show();
                type2.show();
                subNav.show();
                if(!jPagination1.hasClass('has-build')){
                    jPagination0.hide();
                    jPagination2.hide();
                    renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/tab1.json',{'info':'点播课'},'tab1','jTab1',jPagination1);
                }else {
                    jPagination0.hide();
                    jPagination1.show();
                    jPagination2.hide();
                }
                break;
            case '3':
                type1.show();
                type2.show();
                subNav.hide();
                if(!jPagination2.hasClass('has-build')){
                    jPagination0.hide();
                    jPagination1.hide();
                    renderList($PAGE_DATA['baseStaticUrl']+'source/api/course/tab2.json',{'info':'直播课'},'tab2','jTab2',jPagination2);
                }else {
                    jPagination0.hide();
                    jPagination1.hide();
                    jPagination2.show();
                }
                break;
        }
    });
    tab.setCurrent();

    $('#jCourseType').on('click','.jNav li',function(){
        $(this).addClass("current").siblings().removeClass("current");
    });
});
