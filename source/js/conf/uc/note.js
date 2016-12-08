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
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');
    var template = require("template");
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
    var isEdit = false;
    //tab body data-id="1"
    tabsCallback.callback1 = function(body) {
        if (!tabsCallback.callback1.isInited) {
            tabsCallback.callback1.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['getPager'],
                /*data: {
                    // class: 'djune'
                },*/
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
                //console.log(data, callback);
                jContainer.html(template('jNote', data.data));
                callback && callback(data.data.records);
                loading && loading.hide();
                $('.jEdit').on('click', function (e) {
                    var $this = $(this);
                    var target = $(e.target);
                    //文本输入编辑
                    if(target.is('.jEditTxt')&&!isEdit) {
                    	$this.find('.jHide').hide().siblings('.jSave').show();
                    	$this.find('.jEditDetails').removeAttr('readonly').addClass('edittxt');
                    	isEdit = true;
                    //保存编辑内容
                    } else if(target.is('.jSave')) {
                    	$this.find('.jSave').hide().siblings('.jHide').show();
                    	$this.find('.jEditDetails').attr('readonly', true).removeClass('edittxt');
                    	isEdit = false;
                    //删除笔记
                    } else if(target.is('.jDel')) {
                    	$this.fadeOut();
                    	// $this.remove();
                    	isEdit = false;
                    } else if(target.is('.jHref')&&isEdit) {
                    	$this.on('click', function (e) {
                    		e.preventDefault();
                    		//return false;
                    	})
                    }
                })
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

});
