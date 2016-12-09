define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

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
    call();
    //tab body data-id="1" 在读班级加载与事件
    function call(data) { 
        var jContainer = $('#jContainer');
        var jPagination = $('#jPagination');
        if(typeof pager != 'undefined'){
            pager.destroy();
        }

        pager = new Pager(jPagination, {
            url: $PAGE_DATA['getPager'],
            data: data,
            alias: {
                currentPage: 'currentPage',
                pageSize: 'pageSize'
            },
            options: {
                currentPage: 3, // start with 1
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
            if (data.error < 0) {
                box.error(data.msg);
            } else {
                try {
                    data = data.data;
                    jContainer.html(template('jClass1', data));
                    $('#jBtn').on('click', function (e) {
                        var target = $(e.target);
                        var $this = $(this);
                        if(target.is('.jStart')) {
                            call(data);
                        }
                    })
                } catch (e) {
                    box.error('暂无数据');
                }
            }
            callback && callback(data.data.records);
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
                // console.log(data.data, callback);
                jContainer.html(template('jClass2', data.data));
                callback && callback(data.data.records);
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



