define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('./common');

    var box = require('lib/ui/box/1.0.1/box');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var template = require('template');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);
    var pager;
    var tabsCallback = {};
    //tab body data-id="1" 已结业班级
    tabsCallback.callback1 = function(body) {
        if (!tabsCallback.callback1.isInited) {
            tabsCallback.callback1.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {           
                url: $PAGE_DATA['getPager'],
                data: {
                    type: 1
                }
            });

            var loading = null;

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });
            pager.on('ajaxSuccess', function(data, callback) {
                // console.log(data.data, callback);
                if(data && data.data && data.data.resultList && data.data.resultList.length >0) {
                    jContainer.html(template('tClass1', data.data));
                    callback && callback(data.data.records);
                }else{
                    jContainer.html(template('tEmpty'));
                }      
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                jContainer.html('网络错误，请重试！');
                loading && loading.hide();
            });

            pager.on('change', function(pageNum, e) {
                $('#jCurrentPage').html(pageNum)
            });
        }
    }

    //tab body data-id="2" 已结业班级
    tabsCallback.callback2 = function(body) {
        if (!tabsCallback.callback2.isInited) {
            tabsCallback.callback2.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {
                    type:2 
                }
            });

            var loading = null;

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                // console.log(data.data, callback);
                if(data && data.data && data.data.resultList && data.data.resultList.length >0) {
                    jContainer.html(template('tClass2', data.data));
                    callback && callback(data.data.records);
                }else{
                    jContainer.html(template('tEmpty'));
                }      
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                jContainer.html('网络错误，请重试！');
                loading && loading.hide();
            });

            pager.on('change', function(pageNum, e) {
                // console.log('pageNum', pageNum, e);
                $('#jCurrentPage').html(pageNum)
            });
        }
    }
    

    ifmTab.on('change', function(el) {
        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });

    ifmTab.setCurrent();


});



