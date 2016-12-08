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
    var navigation = require('module/navigation-bar/1.0.0/navigation-bar');
    var jPagination = $('#jPagination');

    /*
     * 渲染分页列表
     * */
    var lazy,pager;
    function renderList(url,data,tmpEl,htmEl,pagEl){
        if(typeof pager !== 'undefined'){
            pager.destroy();
        }
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

    renderList($PAGE_DATA['pagerTeacher'],{'info':'系列课'},'lists','jLists',jPagination);

    var nav = new navigation('#jCourseNav',{
        currentClass:'current',//当前样式
        navSelector:['#jNavType']//导航栏dom选择器
    });
    nav.on('change',function(data){
        renderList($PAGE_DATA['pagerTeacher'],{'data':data},'lists','jLists',jPagination);
    });
});
