
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('./common');

    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');
    var Pager = require('plugins/pager/1.0.0/pager');
    var template = require('template');
    var lazy;
    

    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);

    var tabsCallback = {};

    var isDeleting1 = false;
    var isDeleting2 = false;
    var loadTest = $PAGE_DATA['loadTest'];
    var analysisUrl = $PAGE_DATA['analysisUrl'];

    


    //tab body data-id="1"
    tabsCallback.callback1 = function(body) {
        isDeleting1 = false;
        if (!tabsCallback.callback1.isInited) {
            tabsCallback.callback1.isInited = true;
            var builder = build.build(body, false);
            var jPagination = builder.get('jPagination');
            var jContainer = builder.get('jContainer');
            var pager = new Pager(jPagination, {
                url: $PAGE_DATA['loadTest'],
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
                    $.each(data.data.resultList, function(i, n) {
                    // console.log(data.data.resultList);
                    $.each(n, function(j, m) {
                        if (j == "intervalExamMinute" || j == "intervalExamEndMinute") {
                            n[j] = TimeConver(n[j]);
                        }
                    })
                })
                    jContainer.html(template('jTestModule', data.data));
                                    //图片懒加载
                    lazy = new Lazyload(jContainer.find('.jImg'), {
                        loadingClass: 'img-error',
                        mouseWheel: true,
                        effect: 'fadeIn',
                        snap: true
                    });
                    callback && callback(data.data.records);
                } else {
                    jContainer.html(template('tEmpty'));
                    callback && callback(0);
                }
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                box.error(data.msg || '网络错误，请重试！');
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
                url: $PAGE_DATA['examnotes'],
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
                    // var jExamManage = jContainer.find(".jBtn");
                    if(isDeleting2){
                        data.data.deletingClass = 'deleting';
                        data.data.deletingTxt = '完成';
                    }else{
                        data.data.deletingClass = ''
                        data.data.deletingTxt = '管理'
                    }
                    $.each(data.data.resultList, function(i, n) {
                    $.each(n, function(j, m) {
                        // console.log(j, m);
                        if (j == "intervalExamMinute" || j == "intervalExamEndMinute") {
                            n[j] = TimeConver(n[j]);
                        }
                    })
                })
                    jContainer.html(template('jModuleTest2', data.data));
                     lazy = new Lazyload(jContainer.find('.jImg'), {
                        mouseWheel: true,
                        effect: 'fadeIn',
                        snap: true
                    });
                    InitEvent2.init(body,pager);
                    callback && callback(data.data.records);
                } else {
                    jContainer.html(template('tEmpty'));
                    callback && callback(0);
                }
                loading && loading.hide();
            });

            pager.on('ajaxError', function(data) {
                box.error(data.msg ||'网络错误，请重试！');
                loading && loading.hide();
            });
            pager.on('change', function(pageNum, e) {
                $('#jCurrentPage').html(pageNum)
            });

        }

    }

        var InitEvent2 = {
        init: function(body, pager) {
            if (!InitEvent2.inited) {
                InitEvent2.inited = true;
                body.on('click', '.jBtn', function() {
                    var _this = $(this);
                    if (isDeleting2) {
                        isDeleting2 = false;
                        _this.removeClass('deleting').html('管理');
                        body.find('.jExamList').removeClass('deleting');
                    } else {
                        isDeleting2 = true;
                        _this.addClass('deleting').html('完成');
                        body.find('.jExamList').addClass('deleting');
                    }
                });

                body.on('click', '.jBtnDel', function() {
                    var _this = $(this);
                    var id = _this.attr("data-id");
                    var status = $(".ifm-tab-item.active").attr("data-value");
                    io.get($PAGE_DATA['dellist'], { "id": id }, function(res) {
                            isDeleting2 = true;
                            box.confirm("确认删除？", function(data) {
                                if (data == true) {
                                    box.ok("删除成功");
                                    pager.pagination.selectPage(pager.pagination.get('currentPage'));
                                }
                            });
                        },
                        function(res) {
                            box.error(res.msg || '网络失败，请重试');
                        }, this)
                })

                body.on("click", ".jViewPage", function() {
                    var _this = $(this);
                    var examId = _this.parents(".jExamList").attr("data-value");
                    io.get(analysisUrl, { "examId": examId }, function(resData) {
                        box.loadUrl(resData.msg, {
                            title: '答卷详情',
                            autoRelease: false,
                            modal: true ,//是否有遮罩层
                            className: 'ui-test-box',
                            fixed: true,
                            width: $(window).width() *.8,
                            height: $(window).height() *.8
                        });
                    }, function(resData) {
                        box.error(resData.msg || '网络失败，请重试');
                    })
                })
            }
        }
    };

        //时间转换方法
        var TimeConver = function(data) {
            var minutes = parseInt(data / 1000 / 60);
            var str;
            var ss = parseInt(minutes % 60) > 0 ? (parseInt(minutes % 60)) + '分' : ''; //分钟
            var aa = parseInt(minutes / 60); //总共小时数
            var hh = aa % 24 > 0 ? (aa % 24 + '时') : ''; //小时
            var dd = parseInt(aa / 24) > 0 ? (parseInt(aa / 24) + '天') : ""; //总共天数
            if(parseInt(aa / 24) > 365){
                str = 0;
            }else{
                str = dd + hh + ss;
            }
            return str;
        }





    ifmTab.on('change', function(el) {
        var id = el.body.attr('data-id');
        tabsCallback['callback' + id] && tabsCallback['callback' + id](el.body);
    });

    ifmTab.setCurrent();

});





