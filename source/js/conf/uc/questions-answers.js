/**
 * Created by temulun on 2016/12/04 14:18.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Login = require('module/login-status/1.0.0/login');
    var FixBar = require('module/fix-bar/1.0.0/fix-bar');
    var Footer = require('module/footer/1.0.0/footer');
    var topSearch = new TopSearch();
    var loginStatus = new LoginStatus();
    var fixBar = new FixBar();
    var footer = new Footer();
    //分享
    var Share = require('plugins/share/1.0.0/share');
    var share = new Share('#jShare');
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/
    var box = require('lib/ui/box/1.0.1/crossbox');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Pager = require('plugins/pager/1.0.0/pager');
    var Login = require('module/login-status/1.0.0/login');
    var io = require('lib/core/1.0.0/io/request');
    var template = require("template");
    var lazy;
    var jIfmTab = $('#jMain');
    var isEdit = false;
    var pager;
    var jContainer = $('#jContainer');
    var jPagination = $('#jPagination');

    lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    //============== 获取后台数据
    var isMyQuestion =  $PAGE_DATA['isMyQuestion'];//是否是自己的问题 1是|0否
    var hasAnswer = $PAGE_DATA['hasAnswer'];//是否有最佳答案 1是|0否
    //============== 获取后台数据

    //============== 是否显示采纳按钮
    function isShow(isMyQuestion,hasAnswer){
        if(isMyQuestion == '0' && hasAnswer == '0'){//不是自己的问题，没有最佳答案
            $('.jRebest').each(function(i){
                $(this).hide();
            });
        }else if(isMyQuestion == '0' && hasAnswer == '1'){//不是自己的问题，有最佳答案
            $('.jRebest').each(function(i){
                if(i != 0){
                    $(this).hide();
                }
            });
        }else if(isMyQuestion == '1' && hasAnswer == '0'){//是自己的问题，没有最佳答案

        }else {//是自己的问题，有最佳答案
            $('.jRebest').each(function(i){
                if(i != 0){
                    $(this).hide();
                }
            });
        }
    }
    //============== 是否显示采纳按钮

    /* 渲染分页列表 */
    function renderList(url, data, tmpEl, htmEl, pagEl) {
        if (typeof pager !== 'undefined') {
            pager.destroy();
        }
        pager = new Pager(pagEl, {
            url: url,
            data: data
        });

        var loading = null;

        pager.on('ajaxStart', function() {
            loading = box.loading('正在加载...', {
                modal: false
            });
        });
        pager.on('ajaxSuccess', function(res, callback) {
            if (!$.isEmptyObject(res.data) && res.data && res.data.resultList && res.data.resultList.length > 0) {
                var html = template(tmpEl, res.data);
                document.getElementById(htmEl).innerHTML = html;

                isShow(isMyQuestion,hasAnswer);
                //图片懒加载
                lazy = new Lazyload($("#" + htmEl).find('.jImg'), {
                    mouseWheel: true,
                    effect: 'fadeIn',
                    snap: true
                });
                callback && callback(res.data.records);
            } else {
                var html = template('tEmpty', 1);
                document.getElementById(htmEl).innerHTML = html;
                pagEl.hide();
            }
            loading && loading.hide();
        });

        pager.on('ajaxError', function(data) {
            document.getElementById(htmEl).innerHTML = "<div class='ui-error'>请求超时请重试！<a href=''>刷新</a></div>";
            loading && loading.hide();
        });

        pager.on('change', function(pageNum, e) {});
    };

    var questionId

    function init() {
        questionId = jContainer.attr('data-id');
        renderList($PAGE_DATA['pagerAnswers'], { 'questionId': questionId }, 'jPage', 'jContainer', jPagination);
    }
    init();

    /*评论交互*/
    //评论字数限制
    var main = $('#jMain');
    var publish = $('.jPublish');
    var arrow = $('.jArrow');
    var txtNum = $('.jTxtNum');
    var txt = $('.jTxt');
    main.on('input propertychange', '.jTxt', function() {
        var txtLen = txt.val().length;
        if (txtLen > 300) {
            $(this).addClass('text-error');
            publish.addClass('publish-error');
            arrow.addClass('arrow-error');
            txtNum.css({ 'color': 'red' });
        } else {
            $(this).removeClass('text-error');
            publish.removeClass('publish-error');
            arrow.removeClass('arrow-error');
            txtNum.css({ 'color': '#666' });
        }
        txtNum.children('i').text(txtLen);
    });

    //发表评论
    main.on('click', '.jPublish', function() {
        if (Login.isLogin()) {
            var content = txt.val();
            if (content == '') {
                box.error('请输入发表内容');
            }else {
                if(!$(this).hasClass('publish-error')){
                    io.get($PAGE_DATA['submitAnswer'],{'questionId':questionId,'answerId':0,'content':content},function(res){
                        box.ok('发表成功');
                        txt.val('');
                        txtNum.children('i').text('0');
                        pager.pagination.selectPage(pager.pagination.get('currentPage'));
                    },function(res){
                        box.error(res.msg || '网络错误,请重试');
                    });
                }
            }
        } else {
            Login.login(window.location.href);
        }
    });

    //评论focus效果
    main.on('focus', '.jTxt', function() {
        $('.jArrow').addClass('arrow-focus');
        $(this).addClass('text-focus').attr('placeholder', '');
        $(this).css('color', '#333');
    }).on('blur', '.jTxt', function() {
        if ($(this).val() === '') {
            $(this).removeClass('text-focus').attr('placeholder', '看点糟点，不吐不快！别憋着，马上大声说出来吧！');
            $('.jArrow').removeClass('arrow-focus');
            $(this).css('color', '#ccc');
        }
    });


    /*点赞交互*/
    //点赞和采集的接口处理
    function clickInterface(url, data, msg) {
        io.get(url, data, function(res) {
            box.ok(msg + '成功');
            pager.pagination.selectPage(pager.pagination.get('currentPage'));
        }, function(res) {
            box.error(res.msg || '网络错误,请重试');
        });
    };

    //点赞
    main.on('click', '#jLike', function() {
        if (Login.isLogin()) {
            var dataType = $(this).attr('data-dataType');
            var type = $(this).attr('data-type');
            var id = $(this).attr('data-id');
            var data;
            if ($(this).hasClass("activeLike")) {
                data = {
                    "dataType": dataType,
                    "type": type,
                    "id": id
                }
                clickInterface($PAGE_DATA['commentClickUrl'], data, '取消点赞');
            } else {
                data = {
                    "dataType": dataType,
                    "type": type,
                    "id": id
                }
                clickInterface($PAGE_DATA['commentClickUrl'], data, '点赞');
            }
        } else {
            Login.login(window.location.href);
        }
    });

    //采纳为最佳答案
    main.on('click', '.jRebest', function() {
        if (Login.isLogin()) {
            if(!$(this).hasClass('isBest')){
                var answerId = $(this).attr('data-id');
                var data = {
                    "questionId": questionId,
                    "answerId": answerId
                }
                clickInterface($PAGE_DATA['adoptAnswerUrl'], data, '采纳');
            }
        } else {
            Login.login(window.location.href);
        }
    });

    /*提问弹窗*/
    $('#jModRight').on('click', '#jBtnNewQuestions', function() {
        if (Login.isLogin()) {
            box.loadUrl($PAGE_DATA['toQuestionPage'] + "?id=" + $PAGE_DATA['courseId'], {
                title: '提问页面',
                autoRelease: true,
                modal: false
            });
        } else {
            Login.login(window.location.href);
        }
    });
});
