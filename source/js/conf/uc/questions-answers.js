/**
 * Created by temulun on 2016/12/04 14:18.
 */
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var io = require('lib/core/1.0.0/io/request');
    var template = require("template");
    var Pagination = require('lib/ui/pagination/1.0.1/pagination');
    var Pager = require('plugins/pager/1.0.0/pager');
    var lazy;
    lazy = new Lazyload($('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

    $('.jTitle').on('click', function () {
        var $this = $(this);
        var target = $(e.target);
        if(target.is('.jMore')&&target.text()=='查看全部') {
            target.text('收起');
            $this.addClass('mark');
        } else if(target.text()=='收起'){
            target.text('查看全部');
            $this.removeClass('mark');
        }
    })

    //查看全部评论
    function insertItems(url, data, tmpEl, htmEl) {
        io.get(url, { "data": data }, function(res) {
            var data = res.data;
            if (!$.isEmptyObject(data) && data.list.length > 0) {
                var html = template(tmpEl, data);
                document.getElementById(htmEl).innerHTML += html;
            } else if (res.error < 0) {
                box.warn('有问题')
            } else {
                document.getElementById(htmEl).innerHTML = '<div class="ui-empty-list"><div class="isema isema-box"></div><div class="txt">暂时没有相关内容</div></div>';
            }

            //图片懒加载
            lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            });
        }, function(error) {
            document.getElementById(htmEl).innerHTML = '<div style="color: #000;">请求超时请重试！<a href="">刷新</a></div>';
        });
    }

    // insertPerson($PAGE_DATA['questions'], '个人信息', 'jP', 'jMain');
    function insertPerson(url, data, tmpEl, htmEl) {
        io.get(url, { "data": data }, function(res) {
            var data = res.data;
            if (!$.isEmptyObject(data) ) {
                var html = template(tmpEl, data);
                document.getElementById(htmEl).innerHTML += html;
            } else if (res.error < 0) {
                box.warn('有问题');
            } else {
                document.getElementById(htmEl).innerHTML = '<div class="ui-empty-list"><div class="isema isema-box"></div><div class="txt">暂时没有相关内容</div></div>';
            }
            lazy = new Lazyload($('.jImg'), {
                mouseWheel: true,
                effect: 'fadeIn',
                snap: true
            });
            
            //发表评论
            $('#jBtnPublish').on('click', function() {
                box.ok('评论成功');
            });
            //发布新问题
            $('#jBtnNewQuestions').on('click', function() {
                box.ok('new questions publish success');
            });
            //回复评论
            $('#jReplyList').on('click', function(e) {
                    if ($(e.target).is('.jItemsReply')) {
                        box.ok($(e.target).text())
                    }
                })
                //赞和回复
            $('.jClkRefavour').on('click', function(e) {
                    if ($(e.target).is('.jClkFavour')) {
                        $(e.target).addClass('favour');
                    } else if ($(e.target).is('.jClkResponse')) {
                        box.ok('实现什么效果？')
                    }
                })
                //点击查看全部评论
            $('#jMoreComment').on('click', function() {
                $(this).hide();
                insertItems($PAGE_DATA['questions'], '查看全部', 'jReply', 'jReplyList');
            });
        }, function(error) {
            document.getElementById(htmEl).innerHTML = '<div style="color: #000;">请求超时请重试！<a href="">刷新</a></div>';
        });
    }
    

    var jContainer = $('#jContainer');
    var jPagination = $('.jPagination');

    var pager = new Pager(jPagination, {
        url: $PAGE_DATA['questions'],
        data:{
            class : 'djune'
        },
        alias: {
            currentPage: 'currentPage',
            pageSize: 'pageSize'
        },
        options: {
            currentPage: 2, // start with 1
            pageSize: 20
        }
    });
    var loading = null;

    pager.on('ajaxStart', function() {
        loading = Box.loading('正在加载...', {
            modal: false
        });
    });

    pager.on('ajaxSuccess', function(data, callback) {
        console.log(data, callback);
        // jContainer.html(template(data.data.resultList));
        callback && callback(data.data.records);
        loading && loading.hide();
    });

    pager.on('ajaxError', function(data) {
        jContainer.html('网络错误，请重试！');
        loading && loading.hide();
    });

    pager.on('change', function(pageNum, e) {
        console.log('pageNum', pageNum, e);
        $('#jCurrentPage').html(pageNum)
    });

    function template(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<div>' + data[i] + '</div>';
        }
        if(str == ''){
            str = '<div>数据为空</div>'
        }
        return str;
    }

})
