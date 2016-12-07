define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var build = require('lib/core/1.0.0/dom/build');
    var EventEmitter = require('lib/core/1.0.0/event/emitter');
    var Util = require('lib/core/1.0.0/utils/util');

    function SearchBar(selector, options) {
        var _this = this;
        var defaults = {
            activeClass: 'focus'
        };
        _this.options = $.extend(true, {}, defaults, options);
        if (selector === undefined) {
            throw new Error('the params [selector] is required');
        }
        _this.el = $(selector);
        var builder = build.build(_this.el, false);
        _this.ipt = builder.get('ipt');
        _this.btn = builder.get('btn');
        _this.lbl = builder.get('lbl');
        _this._init();
        _this._initEvent();
    };

    //继承自定义事件
    Util.inherits(SearchBar, EventEmitter);

    SearchBar.prototype._initEvent = function() {
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

    SearchBar.prototype._init = function() {
        var _this = this;
        var val = $.trim(_this.ipt.val());
        var iptId = _this.ipt.attr('data-id');
        if (val.length > 0) {
            _this.focus();
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
        var val = _this.getValue();
        if (val.length > 0) {
            _this.emit('search', val);
        }
    }

    module.exports = SearchBar;
});
