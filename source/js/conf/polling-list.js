define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');

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

    var Question = require('plugins/polling-list/1.0.0/question');
    var question = new Question('#jPollingList1', {
        pollingAjax: {
            url: $PAGE_DATA['baseStaticUrl'] + '/source/api/demo/demo.json'
        },
        pagerAjax: {
            url: $PAGE_DATA['baseStaticUrl'] + '/source/api/demo/demo.json'
        }
    });

    var jAddRecord1 = $('#jAddRecord1');
    var jAddRecord2 = $('#jAddRecord2');
    var jStart1 = $('#jStart1');
    var jStop1 = $('#jStop1');
    var jClear1 = $('#jClear1');

    //==================
    var count1 = 0;
    jAddRecord1.on('click', function() {
        question.prepend('<div class="item">我是追加内容</div>');
    });

    jStart1.on('click', function() {
        question.start();
    });

    jStop1.on('click', function() {
        question.stop();
    });

    jClear1.on('click', function() {
        question.clear();
    });


    //=====================
    jAddRecord2.on('click', function() {
        pollingList2.add('<div class="item">' + (count1++) + '</div>');
        pollingList2.scrollTo(0);
    });


    function template() {
        var str = '';
        for (var i = count1; i < count1 + 10; i++) {
            str += '<div class="item">' + i + '</div>';
        }
        count1 = count1 + 10;
        return str;
    }


});
