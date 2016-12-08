define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var build = require('lib/core/1.0.0/dom/build');

    function LeftMenu(options) {
        var _this = this;
        var defaults = {
            selector: '#jLeftMenu',
            activeClass: 'focus'
        };
        _this.options = $.extend(true, {}, defaults, options);
        _this.el = $(_this.options.selector);
        var builder = build.build(_this.el, false);
        _this.itemLevel1s = builder.get('itemLevel1');
        _this._initEvent();
    };

    LeftMenu.prototype._initEvent = function() {
        var _this = this;
        _this.itemLevel1s.on('click', function(e) {
            var itemLevel1 = $(this);
            e.preventDefault();
            var builder = build.build(itemLevel1, false);
            var menuLevel2 = builder.get('menuLevel2');
            if (menuLevel2) {
                if (itemLevel1.hasClass('active')) {
                    menuLevel2.slideUp(function() {
                        itemLevel1.removeClass('active');
                    });
                } else {
                    menuLevel2.slideDown(function() {
                        itemLevel1.addClass('active');
                    });
                }
            } else {
                var txtLevel1 = builder.get('txtLevel1');
                window.location.href = txtLevel1.attr('href');
            }
        });
    }
    module.exports = LeftMenu;
});
