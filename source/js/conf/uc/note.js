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
    var Pager = require('plugins/pager/1.0.0/pager');
    var template = require("template");

    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);
    var isEdit = false;
    var pager;

    var jContainer = $('#jContainer');
    var jPagination = $('#jPagination');

    var tabsCallback = {};
    tabsCallback.callback1 = function(body) {
        if (!tabsCallback.callback1.inited) {
            tabsCallback.callback1.inited = true;

            pager = new Pager(jPagination, {
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
                    InitEvent.init(body);
                    callback && callback(data.data.records);
                } else {
                    jContainer.html(template('tEmpty'));
                    callback && callback(1);
                }
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                box.error('网络错误，请重试！');
                loading && loading.hide();
            });

        }
        var InitEvent = {
            init: function(body) {
                if (!InitEvent.inited) {
                    InitEvent.inited = true;
                    
                    body.find('.jEdit').on('click', function(e) {
                        var $this = $(this);
                        var target = $(e.target);
                        var id = $this.attr('data-id');
                        var context = $this.find('.jEditDetails').val();
                        //文本输入编辑
                        if (target.is('.jEditTxt') && !isEdit) {
                            $this.find('.jHide').hide().siblings('.jSave').show();
                            $this.find('.jEditDetails').removeAttr('readonly').addClass('edittxt');
                            isEdit = true;
                            //保存编辑内容
                        } else if (target.is('.jSave')) {
                            $this.find('.jSave').hide().siblings('.jHide').show();
                            $this.find('.jEditDetails').attr('readonly', true).removeClass('edittxt');
                            postparams($PAGE_DATA['noteInfo'], {'id':id , 'context':context}, '保存成功！') 
                            isEdit = false;
                            //删除笔记
                        } else if (target.is('.jDel') && !isEdit) {
                            postparams($PAGE_DATA['noteInfo'], {'id':id}, '删除成功！')
                            alert($this.siblings())
                            $this.remove()
                            isEdit = false;
                            //点击跳转页面
                        } else if (target.is('.jEditDetails') && !isEdit) {
                            //window.location.href = 'uc-note.html';
                        }
                    });
                }
            }
        }
    }
    function postparams(url, data, tips) {
        io.get(url, data , function (res) {
            box.ok(tips)
        }, function (res) {
            box.error(res.msg || '网络错误,请重试');
        }, this)
    }
    ifmTab.on('change', function(el) {
        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });

    ifmTab.setCurrent();

});
