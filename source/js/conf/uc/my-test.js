define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Pager = require('plugins/pager/1.0.0/pager');
    var navigation = require('module/navigation-bar/1.0.0/navigation-bar');
    var lazy;
    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');
    //var loadActivity = $PAGE_DATA['loadActivity'];
    var loadTest = $PAGE_DATA['loadTest'];
    var jTestModule=$("#jTestModule");/*模板*/

    var pager;
    var renderList = function(url,data){
        if(pager){
            pager.destroy();
        }

        pager = new Pager(jPagination,{
            url:url,
            data:data
        });

        var loading = null;
        pager.on("ajaxStart",function(){
            loading = Box.loading('正在加载。。。',{
                modal:false
            });
        });

        pager.on('ajaxSuccess', function(res, callback) {
            if(res && res.data &&  res.data.resultList && res.data.resultList.length > 0){
                var strHtml = template('jTestModule', res.data);
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
        });
        pager.on('ajaxError',function(res,callback){
        });
        pager.on('change', function(pageNum, e) {
        });
    }
    renderList(loadTest,{"type":0});
    var nav = new navigation('#jTestStatus',{
        currentClass:'active',//当前样式
        navSelector:['#jTestStatus'],//导航栏dom选择器
        navItemSlect:'li' //导航栏标签
    });
    nav.on('change',function(callbackData){
        console.log(callbackData);
        renderList(loadTest,callbackData);
    })

});