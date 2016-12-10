/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var template=require("template");
    var Pager = require('plugins/pager/1.0.0/pager');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var navigation = require('module/navigation-bar/1.0.0/navigation-bar');

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

    var jPagination = $('#jPagination');
    /*
    * 渲染分页列表
    * */
    var lazy,pager;
    function renderList(url,data,tmpEl,htmEl,pagEl){
        if(pager){
            pager.destroy();
        }
        pager = new Pager(pagEl, {
            url:url,
            data:data
        });

        var loading = null;

        pager.on('ajaxStart', function() {
            loading = Box.loading('正在加载...', {
                modal: false
            });
        });

        pager.on('ajaxSuccess', function(res, callback) {
            if(res && res.data && res.data.resultList && res.data.resultList.length > 0){
                var html = template(tmpEl,res.data);
                console.log(tmpEl,htmEl,pagEl);
                document.getElementById(htmEl).innerHTML = html;
                //图片懒加载
                lazy = new Lazyload($("#"+htmEl).find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(res.data.records);
            }else {
                var html = template('tEmpty',1);
                document.getElementById(htmEl).innerHTML = html;
                pagEl.hide();
            }
            loading && loading.hide();
        });

        pager.on('ajaxError', function(data) {
            document.getElementById(htmEl).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
            loading && loading.hide();
        });

        pager.on('change', function(pageNum, e) {});
    };


    //课程类型切换
    var jTab = $('#jCourseType');
    var tab = new Tab(jTab);
    var type;
    var jNavType = $('#jNavType');
    var jNavClassify = $('#jNavClassify');
    var jNavStatus = $('#jNavStatus');
    var jNavSubClassify = $('#jNavSubClassify');
    tab.on('change', function(el) {
        type = el.body.attr('data-id');
        switch (type){
            case '1':
                jNavType.removeClass('ui-nav-border');
                jNavClassify.hide().removeClass('ui-nav-border');
                jNavStatus.hide().removeClass('ui-nav-border');
                jNavSubClassify.hide();
                break;
            case '2':
                jNavType.addClass('ui-nav-border');
                jNavClassify.show().addClass('ui-nav-border');
                jNavStatus.show();
                jNavSubClassify.show();
                break;
            case '3':
                jNavType.addClass('ui-nav-border');
                jNavClassify.show().addClass('ui-nav-border');
                jNavStatus.show();
                jNavSubClassify.hide();
                break;
        }
    });
    tab.setCurrent();

    function init(){
        var data = {};
        var jNavType = $('#jNavType');
        var name = jNavType.attr('name');
        var val = jNavType.find('.current').attr('data-value');
        data[name] = val;
        renderList($PAGE_DATA['courseIndex'],data,'tab0','jTab0',jPagination);
    }
    init();

   var nav = new navigation('#jCourseNav',{
       currentClass:'current',//当前样式
       navSelector:['#jNavType','#jNavClassify','#jNavStatus','#jNavSubClassify']//导航栏dom选择器
    });
    var jNavType = $('#jNavType');
    nav.on('change',function(data){
        var type = jNavType.find('.current').attr('data-target');
        console.log(type);
        switch (type){
            case '1':
                renderList($PAGE_DATA['courseIndex'],data,'tab0','jTab0',jPagination);
                break;
            case '2':
                renderList($PAGE_DATA['courseIndex'],data,'tab1','jTab1',jPagination);
                break;
            case '3':
                renderList($PAGE_DATA['courseIndex'],data,'tab2','jTab2',jPagination);
                break;
        }
    });
});
