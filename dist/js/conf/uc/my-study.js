define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    require('./common');
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');
    var template = require('template');
    
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);

    var tabsCallback = {};
    var lazy;
    //tab body data-id="1"
    tabsCallback.callback1 = function(body) {
        var isDeleting = false;
        if (!tabsCallback.callback1.isInited) {
            tabsCallback.callback1.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                data: {
                    // class: 'djune'
                }
            });
            var loading = null;
            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                if (data && data.data && data.data.resultList && data.data.resultList.length > 0) {
                    if(isDeleting){
                        data.data.deletingClass = 'deleting';
                        data.data.deletingTxt = '完成';
                    }else{
                        data.data.deletingClass = ''
                        data.data.deletingTxt = '管理'
                    }
                    jContainer.html(template('jModule', data.data));
                    lazy = new Lazyload(jContainer.find('.jImg'), {
                        loadingClass: 'img-error',
                        mouseWheel: true,
                        effect: 'fadeIn',
                        snap: true
                    });
                    InitEvent.init(body,pager);
                    callback && callback(data.data.records);
                } else {
                    jContainer.html(template('tEmpty'));
                    callback && callback(0);
                }
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                box.warn(data.msg||'网络错误，请重试！');
                loading && loading.hide();
            });
        }

        var InitEvent = {
            init:function (body,pager) {
                if (!InitEvent.inited) {
                    InitEvent.inited = true;
                    body.on('click', '.jBtnManage',function () {
                        var jItems = body.find('.jItem');
                        var _this = $(this);
                        if(isDeleting){
                            isDeleting = false;
                            _this.removeClass('deleting').html('管理');
                            jItems.removeClass('deleting');
                        }else{
                            isDeleting = true;
                            _this.addClass('deleting').html('完成');
                            jItems.addClass('deleting');
                        }
                    })
                    body.on('click', '.jControl .jDel', function () {
                        var delId = $(this).attr('data-id');
                        box.confirm('确定删除吗？', function(){
                            io.get($PAGE_DATA['delInfo'], {'id':delId} , function (res) {
                                isDeleting = true;
                                box.ok('删除成功!');
                                pager.pagination.selectPage(pager.pagination.get('currentPage'));
                            }, function (res) {
                                box.error(res.msg || '网络错误,请重试');
                            }, this)
                        }, function(){
                            // box.tips('已取消')
                        })
                    })
                    body.on('click', '.jControl .jLoad', function(){
                        var curId = $(this).attr('data-id');
                           window.location.href = $PAGE_DATA['getUrl']+curId+'&type=0';
                    })
               }
            }
        }
    }

    ifmTab.on('change', function(el) {
        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });

    ifmTab.setCurrent();
});



