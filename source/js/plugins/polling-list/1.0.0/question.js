define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var PollingList = require('./polling-list');
    var IO = require('lib/core/1.0.0/io/request');
    var EventEmitter = require('lib/core/1.0.0/event/emitter');
    var Util = require('lib/core/1.0.0/utils/util');

    function Question(el, options) {
        var _this = this;
        _this.el = $(el);
        if (_this.el.length == 0) {
            throw new Error('the param [el] is required.');
        }
        var defaults = {
            //轮询ajax
            pollingAjax: {
                url: null,
                type: 'get', //'get'|'post'|'json'
                data: null
            },
            //分页ajax
            pagerAjax: {
                url: null,
                type: 'get', //'get'|'post'|'json'
                data: null
            }
        }
        _this.options = $.extend(true, {}, defaults, options);
        _this._isPulling = false;
        _this._init();
        _this._initEvent();
        _this.max = 0;
    }

    //继承自定义事件
    Util.inherits(Question, EventEmitter);

    Question.prototype._init = function() {
        var _this = this;
        _this.pollingList = new PollingList(_this.el, {
            ajax: _this.options.pollingAjax,
            data : {
                max : _this.max
            }
        });
    }

    Question.prototype._initEvent = function() {
        var _this = this,
            options = _this.options,
            pagerAjax = _this.options.pagerAjax;
        //数据获取成功
        _this.pollingList.on('error', function(data) {});
        //数据获取失败
        _this.pollingList.on('success', function(data) {
            //如果刷新成功，并且有更新，直接用html替换
            // if (data && data.list && data.list.length > 0) {
            _this.pollingList.html(_this.template(data));
            // }
            _this.scrollTo(0);
        });
        //鼠标移进容器就暂停刷新
        _this.el.on('mouseenter', function() {
            _this.stop();
        });
        //鼠标移进容器就立马刷新
        _this.el.on('mouseleave', function() {
            _this.start();
        });
        //上拉刷新事件
        _this.pollingList.on('pullup', function(e) {
            if (!_this._isPulling) {
                _this._isPulling = true;
                IO[pagerAjax.type](pagerAjax.url, pagerAjax.data, function(data) {
                    _this._isPulling = false;
                    _this.pollingList.append(_this.template(data));
                }, function(data) {
                    _this._isPulling = false;
                });
            }
        });
        _this.el.on('click','')
    }

    //开始拉新
    Question.prototype.start = function() {
        var _this = this;
        _this.pollingList.start();
    }

    //停止拉新
    Question.prototype.stop = function() {
        var _this = this;
        _this.pollingList.stop();
    }

    //清屏
    Question.prototype.clear = function() {
        var _this = this;
        _this.pollingList.container.html('');
    }

    //销毁
    Question.prototype.destroy = function() {
        var _this = this;
    }

    //跳转位置
    Question.prototype.scrollTo = function(top) {
        var _this = this;
        _this.pollingList.scrollTo(top);
    }

    var count = 1;
    Question.prototype.template = function(data) {
        var str = '';
        for (var i = count; i < count + 10; i++) {
            str += '<div class="item">' + i + '</div>';
        }
        count = count + 10;
        return str;
    }

    module.exports = Question;
});
