define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Util = require('lib/core/1.0.0/utils/util');
    var build = require('lib/core/1.0.0/dom/build');

    function TopSearch(options) {
        var _this = this;
        var defaults = {
            activeClass: 'focus',
            selector: '#jTopSearch', //容器选择器
            url: ($PAGE_DATA && $PAGE_DATA['topSearchUrl']) || '', //要跳转的url
            data: {}, //跳转url需要额外参数
            alias: 'key' //搜索关键词默认参数,如果input data-id 优先级更高
        };
        _this.options = $.extend(true, {}, defaults, options);
        if (_this.options.url == '') {
            throw new Error('the params options.url is required');
        }
        _this.el = $(_this.options.selector);
        var builder = build.build(_this.el[0], false);
        _this.ipt = builder.get('ipt');
        _this.btn = builder.get('btn');
        _this.lbl = builder.get('lbl');
        _this._init();
        _this._initEvent();
    };

    TopSearch.prototype._initEvent = function() {
        var _this = this;
        _this.ipt.on('focus', function() {
            _this.focus();
        });
        _this.ipt.on('blur', function() {
            if (_this.getValue().length == 0) {
                _this.blur();
            }
        });
        //回车事件
        _this.ipt.on('keydown', function(e) {
            if (e.keyCode === 13) {
                _this.search();
            }
        });
        //搜索按钮事件
        _this.btn.on('click', function() {
            _this.search();
        });
    }

    TopSearch.prototype._init = function() {
        var _this = this;
        var val = $.trim(_this.ipt.val());
        var iptId = _this.ipt.attr('data-id');
        if (val.length > 0) {
            _this.focus();
        }
        if (iptId) {
            _this.options.alias = iptId;
        }
        if (_this.options.data) {
            _this.options.data[_this.options.alias] = $.trim(_this.ipt.val());
        }
    }

    TopSearch.prototype.focus = function() {
        var _this = this;
        _this.el.addClass(_this.options.activeClass);
    }

    TopSearch.prototype.blur = function() {
        var _this = this;
        _this.el.removeClass(_this.options.activeClass);
    }

    TopSearch.prototype.getValue = function() {
        var _this = this;
        return $.trim(_this.ipt.val());
    }

    TopSearch.prototype.search = function() {
        var _this = this;
        _this.options.data[_this.options.alias] = _this.getValue();
        window.location.href = _this.options.url + '?' + _this._getUrlString();
    }

    //生成url字符串
    TopSearch.prototype._getUrlString = function() {
        var _this = this,
            str = '',
            len = 0;
        for (var i in _this.options.data) {
            if (len == 0) {
                str += i + '=' + encodeURIComponent(_this.options.data[i]);
            } else {
                str += '&' + i + '=' + encodeURIComponent(_this.options.data[i]);
            }
            len++;
        }
        return str;
    }

    module.exports = TopSearch;
});
