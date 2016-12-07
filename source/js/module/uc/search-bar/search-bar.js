define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Util = require('lib/core/1.0.0/utils/util');
    var build = require('lib/core/1.0.0/dom/build');

    function SearchBar(selector, options) {
        var _this = this;
        var defaults = {
            activeClass: 'focus'
        };
        _this.options = $.extend(true, {}, defaults, options);
        if (_this.options.url == '') {
            throw new Error('the params options.url is required');
        }
        _this.el = $(selector);
        var builder = build.build(_this.el[0], false);
        _this.ipt = builder.get('ipt');
        _this.btn = builder.get('btn');
        _this.lbl = builder.get('lbl');
        _this._init();
        _this._initEvent();
    };

    SearchBar.prototype._initEvent = function() {
        var _this = this;
        _this.ipt.on('focus', function() {
            _this.focus();
        });
        _this.ipt.on('blur', function() {
            _this.blur();
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

    SearchBar.prototype._init = function() {
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

    SearchBar.prototype.focus = function() {
        var _this = this;
        _this.el.addClass(_this.options.activeClass);
    }

    SearchBar.prototype.blur = function() {
        var _this = this;
        _this.el.removeClass(_this.options.activeClass);
    }

    SearchBar.prototype.getValue = function() {
        var _this = this;
        return $.trim(_this.ipt.val());
    }

    SearchBar.prototype.search = function() {
        var _this = this;
        _this.options.data[_this.options.alias] = _this.getValue();
        window.location.href = _this.options.url + '?' + _this._getUrlString();
    }


    module.exports = SearchBar;
});
