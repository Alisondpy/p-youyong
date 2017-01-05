define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Util = require('lib/core/1.0.0/utils/util');
    var build = require('lib/core/1.0.0/dom/build');

    function FixBar(options) {
        var _this = this;
        var defaults = {
            onlineServiceUrl: ($PAGE_DATA && $PAGE_DATA['onlineServiceUrl']) || ''
        };
        _this.options = $.extend(true, {}, defaults, options);
        _this._init();
        _this._initEvent();
    };

    FixBar.prototype._init = function() {
        var _this = this;
        _this.el = $(_this._getTemplete());
        $(document.body).append(_this.el);
        _this.height = _this.el.height();
        _this.resize();
    };

    FixBar.prototype._initEvent = function() {
        var _this = this;
        $(window).on('resize', function() {
            _this.resize();
        });
    };

    FixBar.prototype.resize = function() {
        var _this = this;
        var winHeight = $(window).height();
        var top = (winHeight - _this.height) / 2;
        if (top >= 0) {
            _this.el.css({
                top: top
            });
            _this.el.addClass('active');
        } else {
            _this.el.removeClass('active');
        }
    }

    FixBar.prototype._getTemplete = function() {
        var _this = this;
        var str = '';
        str += '<div class="ui-fix-bar">';
        str += '    <ul class="list clearfix" node-type="list">';
        if (_this.options.onlineServiceUrl) {
            str += '        <li class="jItem item item-service" node-id="service">';
            str += '            <a target="_blank" href="' + _this.options.onlineServiceUrl + '">';
            str += '                <i class="iyoyo iyoyo-service"></i>';
            str += '                <span>在线客服</span>';
            str += '            </a>';
            str += '        </li>';
        }
        str += '    </ul>';
        str += '</div>';
        return str;
    }

    module.exports = FixBar;
});
