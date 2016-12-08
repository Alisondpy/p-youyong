define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var form = require('lib/core/1.0.0/utils/form');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var lazy;
    var jHotTrain = $("#jHotTrain");
    var HOT=require('module/hot-activity/1.0.0/hot-activity');
    io.get("/p-youyong/source/api/sub/sub.json",function(res){
            var html = template('test', res.data);
            document.getElementById('content').innerHTML = html;
        },
        function(){
        }
    );


    //图片懒加载
    lazy = new Lazyload(jHotTrain.find('.jImg'), {
        mouseWheel: true,
        effect: 'fadeIn',
        snap: true
    });

});

