define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var form = require('lib/core/1.0.0/utils/form');
    var template=require("template");
    var io = require('lib/core/1.0.0/io/request');
    var HOT=require('module/hot-activity');
    io.get("/p-youyong/source/api/sub/sub.json",function(res){
            var html = template('test', res.data);
            document.getElementById('content').innerHTML = html;
        },
        function(){
        }
    )
    new HOT('jHotNews',{
        url:"/p-youyong/source/api/news/hot-news.json",
        temId:'hot',
        formatNum:false
    });
    new HOT('jHotTrain',{
        url:"/p-youyong/source/api/news/hot-train-course.json",
        temId:'hotCourse',
        formatNum:false
    });
});

