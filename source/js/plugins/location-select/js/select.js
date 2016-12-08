/**
 * @file select.js
 * @synopsis  四级地址下拉
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2016-01-11
 */

define(function(require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Com = require('./common');
    var Emitter = require('lib/core/1.0.0/event/emitter');

    function Select(selector, opt) {
        this.opt = {};
        this.selector = selector;
        $.extend(this.opt, opt || {});
        this.com = (new Com(selector, this.opt));
    }
    Select.prototype = {
        init: function() {
            var self = this;
            self._create();
            self.setTextBox();
            self._events();
        },
        destroy: function() {
            this.com.o.find('jSelect').html('');
            this.offEvents();
        },
        show: function() {
            this.emit('click');
        },
        _events: function() {
            var self = this;
            self.com.o.on('click.select', '.jText', function() {
                self.show();
            })
        },
        offEvents: function() {
            this.com.o.off('click.select');
            return this;
        },
        setTextBox: function() {
            var txt = this.com.getCacheData('text');
            var titleStr = '';
            if (txt && txt.indexOf(',') > -1) {
                titleStr = txt.replace(/[,]/g, '--');
                txt = $(txt.split(',')).map(function(i, v) {
                    return '<i>' + v + '</i>';
                }).get().join('');
            } else {
                txt = '请选择';
                titleStr = '请选择';
            }
            this.com.o.find('.jTextCtn').html(txt).attr({
                'title': titleStr
            });
        },
        _create: function() {
            var self = this;
            var ar = [
                '<div class="text jText">', '<div class="text-div jTextCtn" title=""></div><b></b></div>'
            ];
            var $select = self.com.o.find('.jSelect');
            var isEmpty = ($.trim($select.html().length) == 0);
            isEmpty && $select.html(ar.join(''));
        }
    };
    Emitter.applyTo(Select);
    module.exports = Select;
});
