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
    var Hot = require('module/hot-activity/1.0.0/hot-activity');

    var jPagination = $('#jPagination');

    /*
    * 渲染侧边栏
    * */
    //new Hot('jHotNews',{
    //    url:$PAGE_DATA['baseStaticUrl']+"source/api/news/hot-news.json",
    //    temId:'jNews'
    //});
    //
    //new Hot('jHotCourse',{
    //    url:$PAGE_DATA['baseStaticUrl']+"source/api/news/hot-news.json",
    //    temId:'jCourse'
    //});
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
            if(!$.isEmptyObject(res.data) && res.data.resultList.length > 0){
                var html = template(tmpEl,res.data);
                document.getElementById(htmEl).innerHTML = html;
            }else {
                document.getElementById(htmEl).innerHTML = '<div class="ui-empty-list">'+
                    '<div class="iyoyo iyoyo-box"></div>'+
                    '<div class="txt">暂无数据</div>'+
                    '</div>';
                pager.destroy();
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
    };

    renderList($PAGE_DATA['loadNews'],{'type':'0'},'jWrap','jWrapBox',jPagination);

    //tab页切换
    $('.mod-wrap .mod-sub-nav a').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        var id = $(this).attr('data-value');
        renderList($PAGE_DATA['loadNews'],{'type':id},'jWrap','jWrapBox',jPagination);
    });

});
