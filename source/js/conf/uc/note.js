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
        if (!tabsCallback.callback1.isInited) {
            tabsCallback.callback1.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['noteInfo'],
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
                    jContainer.html(template('tNote', data.data));
                    InitEvent.init(body, pager);
                    callback && callback(data.data.records);
                } else {
                    jContainer.html(template('tEmpty'));
                    callback && callback(1);
                }
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                box.warn(data.mst||'网络错误，请重试！');
                loading && loading.hide();
            });
        }

        var InitEvent = {
            init: function(body, pager) {
                if (!InitEvent.inited) {
                    InitEvent.inited = true;
                    body.on('click', '.jEdit .jEditTxt', function() {
                        var _this = $(this);
                        _this.parents('.jEdit').siblings('.jEditDetails').removeAttr('readonly').addClass('edittxt');
                        _this.parents('.jEdit').siblings('.jEditDetails').removeAttr('unselectable');
                        _this.parents('.jEdit').find('.jHide').hide().siblings('.jSave').show();

                    })
                    body.on('click', '.jEdit .jSave', function() {
                        var _this = $(this);
                        var context = _this.parents('.jEdit').siblings('.jEditDetails').val();
                        var id = _this.parents('.jEdit').attr('data-id');
                        _this.parents('.jEdit').find('.jHide').show().siblings('.jSave').hide();
                        _this.parents('.jEdit').siblings('.jEditDetails').attr('readonly', true).removeClass('edittxt');
                        _this.parents('.jEdit').siblings('.jEditDetails').attr('unselectable', 'on');
                        InitEvent.postparams($PAGE_DATA['noteSave'], { 'id': id, 'context': context }, '保存成功！');

                    })
                    body.on('click', '.jEdit .jDel', function() {
                        var _this = $(this);
                        var id = _this.parents('.jEdit').attr('data-id');
                        box.confirm('确定删除吗？', function() {
                            InitEvent.postparams($PAGE_DATA['noteDel'], { 'id': id }, '删除成功！', pager)
                        }, function() {})

                    })
                }
            },
            postparams: function(url, data, tips, pager) {
                io.get(url, data, function(res) {
                    box.ok(tips)
                    pager.pagination.selectPage(pager.pagination.get('currentPage'));
                }, function(res) {
                    box.error(res.msg || '网络错误,请重试');
                }, this)
            }
        }
    }
    ifmTab.on('change', function(el) {
        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });


    ifmTab.setCurrent();

});
