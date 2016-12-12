define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Pager = require('plugins/pager/1.0.0/pager');
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
    var lazy;
    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');
    var loadActivity = $PAGE_DATA['loadActivity'];
    //热门活动列表
   /* new Hot('jHotActive',{
        url:"/p-youyong/source/api/sub/hot-activity.json",
        temId:'hot',
        formatNum:true
});*/

    var pager;
    var renderList = function(url,data){
        if(typeof pager !== 'undefined'){
            pager.destroy();
        }
        pager = new Pager(jPagination,{
            url:url,
            data:data,
            options: {
                currentPage: 1, // start with 1
                pageSize:10
            }
        });

        var loading = null;
        pager.on("ajaxStart",function(){
            loading = Box.loading('正在加载。。。',{
                modal:false
            });
        });

        pager.on('ajaxSuccess', function(res, callback) {
            if(res && res.data &&  res.data.resultList && res.data.resultList.length > 0){
                var strHtml = template('test', res.data);
                jContainer.html(strHtml);
                //图片懒加载
                lazy = new Lazyload(jContainer.find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                })
                callback && callback(res.data.records);//渲染分页数据
            }else {
                jContainer.html(template('tEmpty'))
                callback && callback(1);//渲染分页数据
            }
            loading && loading.hide();
        });
        pager.on('ajaxError', function(data) {
            Box.error(data.msg || '网络错误，请重试！');
            loading && loading.hide();
        });

        pager.on('change', function(pageNum, e) {
            $('#jCurrentPage').html(pageNum)
        });

    }
    renderList(loadActivity,{"type":0,"timeType":0});
    var nav = new navigation('#jActivity',{
        currentClass:'active',//当前样式
        navSelector:['#jActClassify','#jActTime'],//导航栏dom选择器
        navItemSlect:'a' //导航栏标签
    });
    nav.on('change',function(callbackData){
        renderList(loadActivity,callbackData);
    })

});