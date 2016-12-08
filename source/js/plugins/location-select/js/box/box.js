/**
 * @file box.js
 * @synopsis  box
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2016-01-12
 */

define(function(require, exports, module) {
    'use strict';
    var Com = require('../common');
    var Emitter = require('lib/core/1.0.0/event/emitter');
    /* mod */
    var Tabs = require('./tabs');
    var Ctn = require('./ctn');

    function Box(selector, opt) {
        var self = this;
        this.opt = {};
        this.selector = selector;
        $.extend(this.opt, opt);
        this.com = (new Com(selector, this.opt));
        this.tabs = new Tabs(selector, this.opt);
        this.ctn = new Ctn(selector, this.opt);
        this.tabs.on('click', function(index, parentId, id) {
            self.ctn.loadCtn(index, parentId, id);
        });
        this.ctn.on('click', function(index) {
            self.tabs.tab(index);
        })
        this.ctn.on('lastChange', function() {
            self.hide();
            self.emit('lastChange', self.tabs.getAddrData());
        });
        this.ctn.on('loaded', function($ctn) {
            self.emit('loaded', $ctn);
        });
        // this.init();
    }
    Box.prototype = {
        init: function() {},
        show: function() {
            var self = this;
            self.offEvents();
            self.create();
            self.tabs.init();
            self.ctn.init();
            self.com.o.find('.jLocationSelect').addClass('ui-location-select-hover');
            self.events();
        },
        hide: function() {
            var self = this;
            self.com.o.find('.jLocationSelect').removeClass('ui-location-select-hover');
            self.offEvents();
        },
        events: function() {
            var self = this;
            self.com.o.on('click.box', '.jClose', function() {
                self.hide();
            });
            setTimeout(function() {
                $(document).on('click.' + self.selector, function(e) {
                    var $target = $(e.target);
                    if ($target.closest(self.selector).length == 0) {
                        self.hide();
                    }
                });
            }, 0)
        },
        offEvents: function() {
            var self = this;
            self.com.o.off('click.box');
            $(document).off('click.' + self.selector);
            self.tabs && self.tabs.offEvents();
            self.ctn && self.ctn.offEvents();
            return this;
        },
        destroy: function() {
            this.tabs.destroy();
            this.ctn.destroy();
            this.tabs = null;
            this.ctn = null;
            this.com.o.find('.jBox').html('');
            this.offEvents();
        },
        create: function() {
            var self = this;
            var ar = [
                '<div class="content jCtn">',
                '<div class="jTabs"></div>',
                '<div class="jCtns"></div>',
                '<span class="clr jClose" style="display:' + (self.opt.isShowClose ? 'block' : 'none') + ';"></span>',
                '</div>'
            ];
            var $box = self.com.o.find('.jBox');
            var isEmpty = ($.trim($box.html().length) == 0);
            isEmpty && $box.html(ar.join(''));
        }
    }
    Emitter.applyTo(Box);
    module.exports = Box;
});
