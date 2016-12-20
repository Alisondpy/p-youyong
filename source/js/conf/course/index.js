/**
 * Created by wangLiang on 2016/11/30 0030.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/crossbox');
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
                document.getElementById(htmEl).innerHTML = html;
                //图片懒加载
                lazy = new Lazyload($("#"+htmEl).find('.jImg'), {
                    loadingClass : 'img-error',
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(res.data.records);
                //pagEl.show();
            }else {
                var html = template('tEmpty',1);
                document.getElementById(htmEl).innerHTML = html;
                pagEl.hide();
            }
            loading && loading.hide();
        });

        pager.on('ajaxError', function(data) {
            document.getElementById(htmEl).innerHTML = "<div class='ui-error'>请求超时请重试！<a href=''>刷新</a></div>";
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
    var jClassNav1 = $('#jClassNav1');
    var jClassNav2 = $('#jClassNav2');
    var jStatusNav2 = $('#jStatusNav2');
    tab.on('change', function(el) {
        type = el.body.attr('data-id');
        switch (type){
            case '1':
                jNavType.removeClass('ui-nav-border');
                jNavClassify.hide().removeClass('ui-nav-border');
                jNavStatus.hide().removeClass('ui-nav-border');
                jNavSubClassify.hide();
                jClassNav1.hide();
                jClassNav2.hide();
                jStatusNav2.hide();
                break;
            case '2':
                jNavType.addClass('ui-nav-border');
                jNavClassify.show().removeClass('ui-nav-border');
                jNavStatus.hide();
                jNavSubClassify.show();
                jClassNav1.show();
                jClassNav2.hide();
                jStatusNav2.hide();
                break;
            case '3':
                jNavType.addClass('ui-nav-border');
                jNavClassify.show().addClass('ui-nav-border');
                jNavStatus.show();
                jNavSubClassify.hide();
                jClassNav1.hide();
                jClassNav2.show();
                jStatusNav2.show();
                break;
        }
    });
    tab.setCurrent();

    function init(data){
        var type = jNavType.find('.current').attr('data-target');
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
    }

   var nav = new navigation('#jCourseNav',{
       currentClass:'current',//当前样式
       navSelector:['#jNavType','#jClassNav1','#jClassNav2','#jStatusNav2','#jNavSubClassify']//导航栏dom选择器
    });
    var initData = nav.get();
    init(initData);
    nav.on('change',function(data){
        init(data);
    });

    var jTab2 = $('#jTab2');
    jTab2.on('click','.jLive',function(){
        var newTab=window.open('about:blank');
        var _this = $(this);
        var id = _this.attr('data-id');
        io.get($PAGE_DATA['LiveShowUrl'],{courseId:id},function(res){
            if(res && res.data){
                //box.loadUrl(res.data.liveshowUrl,{
                //    title:'直播',
                //    className:'ui-test-box',
                //    fixed:true,
                //    width:$(window).width(),
                //    height:$(window).height()
                //});
                if(res.data.liveshowUrl != ''){
                    newTab.location.href = res.data.liveshowUrl;
                }else {
                    newTab.close();
                }
            }else {
                newTab.close();
                box.error('服务器错误,请重试');
            }
        },function(res){
            newTab.close();
            box.error(res.msg || '网络错误,请重试');
        })
    });
});
