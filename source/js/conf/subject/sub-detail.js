
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var form = require('lib/core/1.0.0/utils/form');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var box = require('lib/ui/box/1.0.1/crossbox');
    $("#jReport").on("click",function(){
        box.loadUrl($PAGE_DATA['applyUrl'], {
            title: '报名详情',
            autoRelease: false,
            modal: true //是否有遮罩层
        });
    })
});