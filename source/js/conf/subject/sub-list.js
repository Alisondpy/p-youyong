define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var hot = require('module/hot-activity/1.0.0/hot-activity');
    var Pager = require('plugins/pager/1.0.0/pager');
    var lazy;
    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');
    new hot('jHotActive',{
        url:"/p-youyong/source/api/sub/hot-activity.json",
        temId:'hot',
        formatNum:true
});

    $(".nav-area").on("click","a",function(){
        $(this).addClass("active").siblings().removeClass("active");
        console.log($(this).text());
    })
var pager = new Pager(jPagination,{
    url:"/p-youyong/source/api/sub/sub.json",
    data:{
        class : '1245'//传递给后台的数据
    },
    alias: {
        currentPage: 'currentPage',
        pageSize: 'pageSize'
    },
    options: {
        currentPage: 1, // start with 1
        pageSize: 10
    }
});
    var loading = null;
    pager.on("ajaxStart",function(){
        loading = Box.loading('正在加载。。。',{
            modal:false
        });
    });
    pager.on('ajaxSuccess',function(res,callback){
        var html = template('test', res.data);
        console.log(res.data);
        document.getElementById('jContainer').innerHTML = html;
        //图片懒加载
        lazy = new Lazyload($('.jImg'), {
            mouseWheel: true,
            effect: 'fadeIn',
            snap: true
        })
    });
    pager.on('ajaxError',function(res,callback){

    });
    pager.on('change', function(pageNum, e) {
        console.log('pageNum', pageNum, e);
        $('#jCurrentPage').html(pageNum)
    });


});