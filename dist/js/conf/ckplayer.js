define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Player = require('plugins/ckplayer/6.7.0/player');

    var player = new Player('#jVideo', {
        swfPlayer: $PAGE_DATA['ckplayer'],
        flash: {
            f: $PAGE_DATA['m3u8'], //必填 请别跨域 要播放文件的路径
            a: $PAGE_DATA['play'] //必填 请别跨域 如果要调用m3u8格式的文件，必须要用到的播放插件【调用时的参数，只有当s>0的时候有效】
        }
    });

    //监听当前播放器进度
    player.on('time', function(seconds) {
        console.log(seconds);
    });

    //实时监测
    $(".start").on("click", function() {
        player.play();
    });
    $(".pause").on("click", function() {
        player.pause();
    });
    $(".next").on("click", function() {
        player.go1('http://n03.wbc.zhongzhihui.com/data/client/courseware/50286/2015/7/2015-07-17/ba150a05e1abf0b12e0fa70bf324c48e/t/playlist.m3u8');
        player.play();
    });
    $(".time").on("click", function() {
        player.time(); //当前时间
    });
    $(".continue").on("click", function() {
        player.jump(1000); //当前时间
    });

    $(".resize").on("click", function() {
        // video.resize(160,90);
        player.width(1600);
        player.height(900);
    });
});
