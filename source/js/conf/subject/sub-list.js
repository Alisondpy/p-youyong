define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Hot = require('module/hot-activity/1.0.0/hot-activity');
    var Pager = require('plugins/pager/1.0.0/pager');
    var lazy;
    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');
    new Hot('jHotActive',{
        url:"/p-youyong/source/api/sub/hot-activity.json",
        temId:'hot',
        formatNum:true
});

    //"/source/api/sub/sub.json"
    var pager;
    var rendList = function(url,data){
        if(typeof pager !== 'undefined'){
            pager.destroy();
        }
            pager = new Pager(jPagination,{
            url:$PAGE_DATA['baseStaticUrl'] + url,
            data:data,
            alias: {
                currentPage: 'currentPage',
                pageSize: 'pageSize'
            },
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
            var strHtml = template('test', res.data);
            jContainer.html(strHtml);
            //图片懒加载
            lazy = new Lazyload(jContainer.find('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            })
            callback && callback(res.data.records);//渲染分页数据
        });

        pager.on('ajaxError',function(res,callback){

        });
        //切换页数回调函数
        pager.on('change', function(pageNum, e) {
            console.log(e);
        });
    }
    rendList("/source/api/sub/sub.json");
    $(".nav-area").on("click","a",function(){
        $(this).addClass("active").siblings().removeClass("active");
        console.log($(this).text());
        rendList("/source/api/sub/index.json")
    })
});