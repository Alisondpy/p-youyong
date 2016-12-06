define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var io = require('lib/core/1.0.0/io/request');

    function TopSearch(selector, options) {
        var _this = this;
        var defaults = {
            url: '',
            data: null
        };
        _this.el = $(selector);
        _this.options = $.extend(true, {}, defaults, options);
        _this._init();
    };
    TopSearch.prototype._init = function() {
        var _this = this;
    };
    module.exports = TopSearch;
});
