define(function(require, exports, module) {
    'use strict';
    var cookie = require('lib/core/1.0.0/io/cookie');
    //用户nick存储表示
    var NICK_NAME = '_nick';

    //获取用户昵称
    exports.getNick = function() {
        return cookie(NICK_NAME);
    }

    //判断用户是否登陆
    exports.isLogin = function() {
        return cookie(NICK_NAME) ? true : false;
    }
});
