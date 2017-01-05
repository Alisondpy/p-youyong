define(function(require, exports, module) {
    'use strict';
    var cookie = require('lib/core/1.0.0/io/cookie');
    //用户nick存储表示，这个版本后台暂时支持
    var NICK_NAME = '_nick';
    //登陆标示
    var UI = '_ui_';

    var LOGIN_URL = ($PAGE_DATA && $PAGE_DATA['LOGIN_URL']) || '';
    var nick = ($PAGE_DATA && $PAGE_DATA[NICK_NAME]) || null;

    //获取用户昵称
    exports.getNick = function() {
        return nick;
    }

    //判断用户是否登陆
    exports.isLogin = function() {
        return cookie(UI) ? true : false;
    }

    //从哪里来到哪里去
    exports.login = function(returnUrl) {
        if (LOGIN_URL) {
            if (returnUrl) {
                returnUrl = '?returnUrl=' + encodeURIComponent(returnUrl);
            } else {
                returnUrl = '';
            }
            window.location.href = LOGIN_URL + returnUrl;
        }
    }
});