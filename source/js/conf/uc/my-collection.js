define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('./common');

    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');
    //搜索工具栏
    var SearchBar = require('module/uc/search-bar/search-bar');
    var searchBar = new SearchBar('#jUcSearchBar');
    searchBar.on('search', function(val) {
        console.log('你可以根据这个返回值来做业务:', val);
    });

    
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);

    var tabsCallback = {};

    //tab body data-id="1"
    tabsCallback.callback1 = function(body) {
        if (!tabsCallback.callback1.isInited) {
            tabsCallback.callback1.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            jContainer.on('click','.jBtn',function(){
                console.log(0);
            });
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {
                    // class: 'djune'
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

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                console.log(data.data, callback);
                jContainer.html(template('jModule', data.data));
                        //image-lazyload
                var lazy = new Lazyload($('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(data.data.records);
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                jContainer.html('网络错误，请重试！');
                loading && loading.hide();
            });

            pager.on('change', function(pageNum, e) {
                console.log('pageNum', pageNum, e);
                $('#jCurrentPage').html(pageNum)
            });
        }
    }

    //tab body data-id="2"
    tabsCallback.callback2 = function(body) {
        if (!tabsCallback.callback2.isInited) {
            tabsCallback.callback2.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            jContainer.on('click','.jBtn',function(){
                console.log(0);
            });
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {
                    // class: 'djune'
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

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                console.log(data.data, callback);
                jContainer.html(template('jModule2', data.data));
                        //image-lazyload
                var lazy = new Lazyload($('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(data.data.records);
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                jContainer.html('网络错误，请重试！');
                loading && loading.hide();
            });

            pager.on('change', function(pageNum, e) {
                console.log('pageNum', pageNum, e);
                $('#jCurrentPage').html(pageNum)
            });
        }
    }
    
        //tab body data-id="3"
    tabsCallback.callback3 = function(body) {
        if (!tabsCallback.callback3.isInited) {
            tabsCallback.callback3.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            jContainer.on('click','.jBtn',function(){
                console.log(0);
            });
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {
                    // class: 'djune'
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

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                console.log(data.data, callback);
                jContainer.html(template('jModule3', data.data));
                        //image-lazyload
                var lazy = new Lazyload($('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(data.data.records);
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                jContainer.html('网络错误，请重试！');
                loading && loading.hide();
            });

            pager.on('change', function(pageNum, e) {
                console.log('pageNum', pageNum, e);
                $('#jCurrentPage').html(pageNum)
            });
        }
    }



    ifmTab.on('change', function(el) {
        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });

    ifmTab.setCurrent();

    // 公共模板
    function template(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<div>' + data[i] + '</div>';
        }
        if (str == '') {
            str = '<div>数据为空</div>'
        }
        return str;
    }



});



