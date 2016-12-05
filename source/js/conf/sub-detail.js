
define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var form = require('lib/core/1.0.0/utils/form');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var hot=require('module/hot-activity');
    new hot('jHotActive',{
        url:"/p-youyong/source/api/sub/hot-activity.json",
        temId:'hot',
        formatNum:true

    });

});