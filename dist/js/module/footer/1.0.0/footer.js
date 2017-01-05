define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Lazyload = require('lib/plugins/lazyload/1.9.3/lazyload');
    var build = require('lib/core/1.0.0/dom/build');

    function Footer(options) {
        var _this = this;
        var defautls = {
            selector: '#jFooter'
        };
        _this.options = $.extend(true, {}, defautls, options);
        _this.el = $(_this.options.selector);
        if (_this.el.length == 0) {
            throw new Error('the params [optins.selector] is required or the [el] is not exist.');
        }
        _this._init();
    }

    Footer.prototype._init = function() {
        var _this = this,
            builder = build.build(_this.el[0], false),
            footerImg = builder.get('footerImg');
        var lazyload = new Lazyload(footerImg, {
            loadingClass: 'img-error',
        });
    }

    module.exports = Footer;
});
