define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var form = require('lib/core/1.0.0/utils/form');
    var template=require("template");
    var data={
        list:[
            {imgSrc:"aaa.jpg",subTitle:"好好学习，天天向上",subTime:"2016-11-24 ～2016-11-28",subLocal:"杭州滨江海创基地北一楼"},
            {imgSrc:"aaa.jpg",subTitle:"人民币中间价8年来首次跌破6.9 这五类人最受伤！人民币中间价8年来首次跌破6.9 这五类人最受伤！",subTime:"2016-11-24 ～2016-11-28",subLocal:"杭州滨江海创基地福慕科技"},
            {imgSrc:"aaa.jpg",subTitle:"人民币中间价8年来首次跌破6.9 这五类人最受伤！",subTime:"2016-11-24 ～2016-11-28",subLocal:"杭州滨江贝壳社"},
            {imgSrc:"aaa.jpg",subTitle:" 这五类人最受伤",subTime:"2016-11-24 ～2016-11-28",subLocal:"杭州吴山广场"},
            {imgSrc:"aaa.jpg",subTitle:"寻找下一个创业奇点—海量免费媒体资源等你拿！",subTime:"2016-11-24 ～2016-11-28",subLocal:"杭州滨江海创基地北侧门"},
            {imgSrc:"aaa.jpg",subTitle:"好好学习，天天向上",subTime:"2016-11-24 ～2016-11-28",subLocal:"海创基地北一楼"}
        ]
    }
    var html = template('test', data);
    document.getElementById('content').innerHTML = html;

});