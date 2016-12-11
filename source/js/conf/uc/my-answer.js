define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('./common');

    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');



    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);

    var tabsCallback = {};

    var isDeleting1 = false;
    var isDeleting2 = false;

    var InitEvent1 = {
        init:function (body,pager) {
            if (!InitEvent1.inited) {
                InitEvent1.inited = true;
                body.on('click', '.jBtnManage',function () {
                    var jItems = body.find('.jItem');
                    var _this = $(this);
                    if(!isDeleting1){
                        isDeleting1 = true;
                        _this.addClass('deleting').html('完成');
                        jItems.addClass('deleting');
                    }else{
                        isDeleting1 = false;
                        _this.removeClass('deleting').html('管理');
                        jItems.removeClass('deleting');
                    }
                })
                body.on('click', '.jDel', function () {
                    var delId = $(this).attr('data-id');
                    box.confirm('是否删除',function(data) {
                        if(data==true) {
                            InitEvent1.postparams($PAGE_DATA['noteDel'], { 'id': delId }, '删除成功！', pager);
                        }
                    }, function() {

                    });
                })
           }
        },
        postparams: function(url, data, tips, pager) {
            io.get(url, data, function(res) {
                pager.pagination.selectPage(pager.pagination.get('currentPage'));
                box.ok(tips)
            }, function(res) {
                box.error(res.msg || '网络错误,请重试');
            }, this)
        }
    }

    var InitEvent2 = {
        init:function (body,pager) {
            if (!InitEvent2.inited) {
                InitEvent2.inited = true;
                body.on('click', '.jBtnManage',function () {
                    var jItems = body.find('.jItem');
                    var _this = $(this);
                    if(!isDeleting2){
                        isDeleting2 = true;
                        _this.addClass('deleting').html('完成');
                        jItems.addClass('deleting');
                    }else{
                        isDeleting2 = false;
                        _this.removeClass('deleting').html('管理');
                        jItems.removeClass('deleting');
                    }
                })
                body.on('click', '.jDel', function () {
                    var delId = $(this).attr('data-id');
                    box.confirm('是否删除',function() {
                        InitEvent2.postparams($PAGE_DATA['noteDel'], { 'id': delId }, '删除成功！', pager)
                    }, function() {

                    });
                    
                })
           }
        },
        postparams: function(url, data, tips, pager) {
            io.get(url, data, function(res) {
                pager.pagination.selectPage(pager.pagination.get('currentPage'));
                box.ok(tips)
            }, function(res) {
                box.error(res.msg || '网络错误,请重试');
            }, this)
        }
    }
    


    //tab body data-id="1"
    tabsCallback.callback1 = function(body) {
        isDeleting1 = false;
        if (!tabsCallback.callback1.isInited) {
            tabsCallback.callback1.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');

            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {}
            });

            var loading = null;

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                if (data && data.data && data.data.resultList && data.data.resultList.length > 0) {
                    if(isDeleting1){
                        data.data.deletingClass = 'deleting';
                        data.data.deletingTxt = '完成';
                    }else{
                        data.data.deletingClass = '';
                        data.data.deletingTxt = '管理';
                    }
                    jContainer.html(template('tModule1', data.data));
                    InitEvent1.init(body,pager);
                    callback && callback(data.data.records);
                } else {
                    jContainer.html(template('tEmpty'));
                    callback && callback(1);
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


    //tab body data-id="2"
    tabsCallback.callback2 = function(body) {
        isDeleting2 = false;
        if (!tabsCallback.callback2.isInited) {
            tabsCallback.callback2.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {}
            });

            var loading = null;

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });
            pager.on('ajaxSuccess', function(data, callback) {
                if (data && data.data && data.data.resultList && data.data.resultList.length > 0) {
                    if(isDeleting2){
                        data.data.deletingClass = 'deleting';
                        data.data.deletingTxt = '完成';
                    }else{
                        data.data.deletingClass = ''
                        data.data.deletingTxt = '管理'
                    }
                    jContainer.html(template('tModule2', data.data));
                    InitEvent2.init(body,pager);
                    callback && callback(data.data.records);
                } else {
                    jContainer.html(template('tEmpty'));
                    callback && callback(1);
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



    ifmTab.on('change', function(el) {
        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });

    ifmTab.setCurrent();

});





