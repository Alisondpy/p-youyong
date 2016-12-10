define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    //左侧菜单栏
    var LeftMenu = require('module/uc/left-menu/left-menu');
    var searchBar = new LeftMenu();

    var template = require("template");
    var io = require('lib/core/1.0.0/io/request');
    var Box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Pager = require('plugins/pager/1.0.0/pager');
    var navigation = require('module/navigation-bar/1.0.0/navigation-bar');
    var lazy;
    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');

    //考试接口
    var loadTest = $PAGE_DATA['loadTest'];


    var jTestModule = $("#jTestModule"); /*模板*/
    var pager;
    var isDeleting = false;
    var renderList = function (url, data) {
        isDeleting = false;
        if (pager) {
            pager.destroy();
        }
        pager = new Pager(jPagination, {
            url: url,
            data: data
        });

        var loading = null;
        pager.on("ajaxStart", function () {
            loading = Box.loading('正在加载。。。', {
                modal: false
            });
        });
        pager.on('ajaxSuccess', function (res, callback) {
            if (res && res.data && res.data.resultList && res.data.resultList.length > 0) {
                var jExamManage = jContainer.find(".jExamManage");
                if (isDeleting) {
                    res.data.deletingClass = 'deleting';
                    res.data.deletingTxt = '完成';
                } else {
                    res.data.deletingClass = '';
                    res.data.deletingTxt = '管理';
                }
                //转换时间
                $.each(res.data.resultList,function(i,n){
                    $.each(n,function(j,m){
                        if (j == "intervalExamMinute" || j == "intervalExamEndMinute"){
                            n[j] =  TimeConver(n[j]);
                        }
                    })
                })
                var strHtml = template('jTestModule', res.data);
                jContainer.html(strHtml);
                //图片懒加载
                lazy = new Lazyload(jContainer.find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(res.data.records);//渲染分页数据
            } else {
                jContainer.html(template('tEmpty'))
                callback && callback(1);//渲染分页数据
            }
            loading && loading.hide();
        });
        pager.on('ajaxError', function (res, callback) {
        });
        pager.on('change', function (pageNum, e) {
        });
    }

    renderList(loadTest, {"status": 0});
    var nav = new navigation('#jTestStatus', {
        currentClass: 'active',//当前样式
        navSelector: ['#jTestStatus'],//导航栏dom选择器
        navItemSlect: 'li' //导航栏标签
    });
    nav.on('change', function (callbackData) {
        renderList(loadTest, callbackData);
    })

    var InitEvent = {
        init: function (elem, pager) {
            if (!InitEvent.inited) {
                InitEvent.inited = true;
                elem.on('click', '.jBtn', function () {
                    var _this = $(this);
                    if (isDeleting) {
                        isDeleting = false;
                        _this.removeClass('deleting').html('管理');
                        elem.find('.jExamList').removeClass('deleting');
                    } else {
                        isDeleting = true;
                        _this.addClass('deleting').html('完成');
                        elem.find('.jExamList').addClass('deleting');
                    }
                });

                elem.on('click', '.jBtnDel', function () {
                    var _this = $(this);
                    var id = _this.attr("data-id");
                    var status = $(".ifm-tab-item.active").attr("data-value");
                    io.get(loadTest, {"id": id}, function (res) {
                            isDeleting = true;
                            Box.confirm("确认删除？",function(data){
                                if(data == true){
                                    Box.ok("删除成功");
                                    pager.pagination.selectPage(pager.pagination.get('currentPage'));
                                }
                            });
                        },
                        function (res) {
                            Box.error(res.msg || '网络失败，请重试');
                        }, this)
                })
            }
        }
    };

    //时间转换方法
    var TimeConver = function(minutes){
        var str;
        var ss = minutes%60>0?minutes%60+'分':'';//分钟
        var aa = parseInt(minutes/60);//总共小时数
        var hh = aa%24>0? aa%24+'时':'';//小时
        var dd = parseInt(aa/24)>0?parseInt(aa/24)+'天':"";//总共天数

       str = dd+hh+ss
        return str;
    }

    InitEvent.init(jContainer, pager);
});