/**
 * @file location-select.js
 * @synopsis  四级地址选择
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2015-12-15
 */

define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var cookie = require('lib/core/1.0.0/io/cookie');
    var Emitter = require('lib/core/1.0.0/event/emitter');
    var io = require('lib/core/1.0.0/io/request');
    //mod for location select
    var config = require('./js/config');
    var Com = require('./js/common');
    var Select = require('./js/select');
    var Box = require('./js/box/box');

    function LocationSelect(selector, opt) {
        var self = this;
        this.opt = {};
        this.selector = selector;
        $.extend(this.opt, config, opt);
        // this.init();
    }
    LocationSelect.prototype = {
        init: function() {
            var self = this;
            if (typeof self.selector != 'string') {
                throw 'lack of selector';
                return false;
            }
            self.o = $(self.selector);
            self._create();
            self.com = new Com(self.selector, self.opt);
            self.com.getDefaultAddr(function(dAddr) {
                self.select = new Select(self.selector, self.opt);
                self.box = new Box(self.selector, self.opt);
                self.select.on('click', function() {
                    self.box.show();
                });
                self.box.on('lastChange', function(defaultAddr) {
                    self.com.setCache(defaultAddr);
                    self.select.setTextBox();
                    self.com.setAddrCookie();
                    self.emit('lastChange', defaultAddr);
                });
                self.box.on('loaded', function($ctn) {
                    self.emit('loaded', $ctn);
                });
                self.box.init();
                self.com.setCache(dAddr);
                self.select.init();
                self.opt.isShowCtn && self.box.show();
                self.emit('afterGetDefaultAddr');
            });
        },
        destroy: function() {
            this.select.destroy();
            this.box.destroy();
            this.com.destroy();
            this.select = null;
            this.box = null;
            this.com = null;
            this.o.html('');
        },
        show: function() {
            this.box.show();
        },
        getCacheData: function(addr) {
            return this.com.getCacheData(addr);
        },
        setAddr: function(ls) {
            var addr = '';
            var self = this;
            if (typeof ls == 'string') {
                addr = ls;
            } else if (ls && typeof ls == 'object') {
                addr = ls.getCacheData('full');
            } else {
                return false;
            }
            self.com.setCache(addr);
            self.select.setTextBox();
        },
        _create: function() {
            if ($(this.selector).find('.jLocationSelect').length != 0) {
                return false;
            }
            var self = this;
            var ar = [];
            ar.push('   <div class="ui-location-select jLocationSelect">',
                '<div class="jCacheData cache-data" data-addr-mainland="" data-addr-id="" data-addr-text="" data-addr-full=""></div>',
                '<div class="jSelect"></div>',
                '<div class="jBox"></div>',
                '</div>');
            self.o.append(ar.join(''));
        }
    };

    Emitter.applyTo(LocationSelect);
    module.exports = LocationSelect;
});
