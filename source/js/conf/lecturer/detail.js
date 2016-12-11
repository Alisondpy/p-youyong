define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    require('plugins/validator/1.0.0/validator');
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');
    var template = require('template');
    var form = require('lib/core/1.0.0/utils/form');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var FixBar = require('module/fix-bar/1.0.0/fix-bar');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var fixBar = new FixBar();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/
    var jTinfo = $('.jTinfo');
    var tab1 = $('.jTab-l');
    var tab2 = $('.jTab-r');
    var jLi = $('.jLi');
    var bg= $('.jBg');
    var mask = $('.jMod-mask');

    var jTab = $('#jTab');
    var tab = new Tab(jTab);
    var pager;


    var tabsCallback = {};

    //tab body data-id="2"
    tabsCallback.callback2 = function(body) {
        if (!tabsCallback.callback2.isInited) {
            tabsCallback.callback2.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['coursePager'],
                data: {
                  teacherId:$PAGE_DATA['teacherid'] 
                },
                options: {
                    currentPage: 1, // start with 1
                    pageSize: 12
                }
            });

            var loading = null;

            pager.on('ajaxStart', function() {
                loading = box.loading('正在加载...', {
                    modal: false
                });
            });

            pager.on('ajaxSuccess', function(data, callback) {
                if(data && data.data && data.data.records>0){
                    callback && callback(data.data.records);
                    jContainer.html(template('tList',data.data));
                    //图片懒加载
                    var lazy = new Lazyload(jContainer.find('.jImg'), {
                        mouseWheel: true,
                        effect: 'fadeIn',
                        snap: true
                    });
                }else{
                    jContainer.html(template('tFempty'));
                }              
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                box.error(data.msg||'网络错误，请重试！');
                loading && loading.hide();
            });

            pager.on('change', function(pageNum, e) {
                // console.log('pageNum', pageNum, e);
                $('#jCurrentPage').html(pageNum)
            });
        }
    }

    //tab body data-id="1"
    tabsCallback.callback1 = function(){};

    tab.on('change',function(el){      

        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });

    tab.setCurrent();

    //图片懒加载
    var lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

});
