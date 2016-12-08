define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    /*顶部搜索、登录状态、底部、右侧在线客服 start*/
    var TopSearch = require('module/top-search/1.0.0/top-search');
    var LoginStatus = require('module/login-status/1.0.0/login-status');
    var Footer = require('module/footer/1.0.0/footer');
    var loginStatus = new LoginStatus();
    var footer = new Footer();
    /*顶部搜索、登录状态、底部、右侧在线客服 end*/

    var box = require('lib/ui/box/1.0.1/box');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var Uploader = require('lib/plugins/uploader/1.0.1/uploader');
    var btn = $('.btn');
     var jImgList = $('#jImgList');
     //图片上传插件
    jImgList.on('click', function() {
        var uploader = new Uploader({
            tabs: [{
                type: 'local',
                options: {
                    uploadLimit: 1,
                    fileObjName:'file_data',
                    swf:$PAGE_DATA['swfUrl'],//swf的路径
                    uploader: $PAGE_DATA['uploadImgUrl'],//后台存放图片的地址
                    formData:$PAGE_DATA['uploadData']
                }
            }],
            limit: 1, //上传限制，当是0的时候就代表无限制多选
            selected: [] //选种的图片
        });
    });
    var Tab = require('lib/ui/tab/1.0.0/tab');
    var jIfmTab = $('#jIfmTab');
    var ifmTab = new Tab(jIfmTab);

    ifmTab.setCurrent();




});



