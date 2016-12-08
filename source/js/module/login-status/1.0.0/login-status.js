define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var io = require('lib/core/1.0.0/io/request');
    var build = require('lib/core/1.0.0/dom/build');

    function LoginStatus(options) {
        var _this = this;
        var defaults = {
            selector: '#jLoginStatus',
            ajax: {
                type: 'get', //'get'|'post'|'jsonp'
                url: ($PAGE_DATA && $PAGE_DATA['getUserInfo']) || '', // required 获取用户登录信息
                data: null //获取用户登录信息接口参数
            },
            userCenterUrl: ($PAGE_DATA && $PAGE_DATA['userCenterUrl']) || 'javascript:;', //用户中心url
            loginOutUrl: ($PAGE_DATA && $PAGE_DATA['loginOutUrl']) || 'javascript:;', //登出url
            //下拉菜单配置
            menuList: [{
                title: '编辑资料',
                url: ($PAGE_DATA && $PAGE_DATA['editUserInfoUrl']) || 'javascript:;'
            }, {
                title: '学习中心',
                url: ($PAGE_DATA && $PAGE_DATA['learningCenterUrl']) || 'javascript:;'
            }]
        };
        _this.options = $.extend(true, {}, defaults, options);
        if (!_this.options.ajax.url) {
            throw new Error('the param [options.ajax.url] is required.');
        }
        _this.el = $(_this.options.selector);
        _this._init();
    };

    LoginStatus.prototype._init = function() {
        var _this = this,
            options = _this.options,
            ajax = options.ajax;
        io[ajax.type](ajax.url, ajax.data, function(data) {
            _this.el.html(_this._getLoginedHtml(data.data));
            _this._initEvent();
        }, function(data) {
            //获取登录信息失败
        })
    };

    LoginStatus.prototype._initEvent = function() {
        var _this = this,
            isMoveing = false,
            builder = build.build(_this.el[0], false),
            userName = builder.get('userName'),
            tipsMenu = builder.get('tipsMenu');
        userName.on('mouseenter', function() {
            isMoveing = true;
            tipsMenu.stop().fadeIn(500, function() {
                tipsMenu.addClass('active');
            });
        });
        userName.on('mouseleave', function() {
            isMoveing = false;
            setTimeout(function() {
                if (!isMoveing) {
                    tipsMenu.stop().fadeOut(500, function() {
                        tipsMenu.removeClass('active');
                    });
                }
            }, 200);
        });
        tipsMenu.on('mouseenter', function() {
            isMoveing = true;
        });
        tipsMenu.on('mouseleave', function() {
            isMoveing = false;
            tipsMenu.removeClass('active');
        });
    };

    LoginStatus.prototype._getLoginedHtml = function(data) {
        var _this = this,
            options = _this.options,
            menuList = options.menuList;
        var str = '';
        str += '<ul class="logined clearfix" node-type="logined">';
        str += '    <li class="item">';
        str += '        <span>您好，</span>';
        str += '    </li>';
        str += '    <li class="item tips-menu-box">';
        str += '        <a href="' + options.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + data.nick + '</a>';
        str += '        <div class="tips-menu" node-type="tipsMenu">';
        str += '            <div class="arrow"><i></i><b></b></div>';
        str += '            <ul class="tips-menu-list">';
        for (var i = 0, len = menuList.length; i < len; i++) {
            str += '            <li class="tips-menu-item"><a href="' + menuList[i].url + '">' + menuList[i].title + '</a></li>';
        }
        str += '            </ul>';
        str += '        </div>';
        str += '    </li>';
        str += '    <li class="item">';
        str += '        <a href="' + options.loginOutUrl + '" class="btn">退出</a>';
        str += '    </li>';
        str += '</ul>';
        return str;
    }
    module.exports = LoginStatus;
});
