define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var io = require('lib/core/1.0.0/io/request');
    var Util = require('lib/core/1.0.0/utils/util');
    var EventEmitter = require('lib/core/1.0.0/event/emitter');
    var build = require('lib/core/1.0.0/dom/build');

    function LoginStatus(options) {
        var _this = this;
        var defaults = {
            url: '',
            data: null
        };
        _this.el = $(selector);
        _this.options = $.extend(true, {}, defaults, options);
        _this._init();
    };
    LoginStatus.prototype._init = function() {
        var _this = this;
    };
    module.exports = LoginStatus;
});
