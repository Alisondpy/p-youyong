/**
 * @file tabs.js
 * @synopsis  tabs for location select
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2016-01-13
 */

define(function(require, exports, module) {
    'use strict';
    var Com = require('../common');
    var Emitter = require('lib/core/1.0.0/event/emitter');

    function Tabs(selector, opt) {
        this.opt = {};
        this.selector = selector;
        $.extend(this.opt, opt);
        this.com = new Com(selector, this.opt);
    }
    Tabs.prototype = {
        init: function() {
            var self = this;
            self._create();
            self._events();
            self._t = self.com.o.find('.tab .jTabItem');
            self._loadTab();
        },
        _create: function() {
            var self = this;
            var d = self.opt.degree;
            var ar = [];
            ar.push('<div class="mt">',
                '<div class="tab">',
                '<ul>');
            for (var m = 0; m < d; m++) {
                ar.push('<li data-index="' + m + '" class="jTabItem ' + (m == 0 ? 'hover' : '') + '" style="display:' + (m == 0 ? 'block' : 'none') + ';">',
                    '<span class="jTabTxt limit">' + self.opt.labelTxt[m] + '</span>',
                    '<i></i>',
                    '</li>');
            }
            ar.push('</ul>',
                '</div>',
                '</div>');
            var $tabs = self.com.o.find('.jTabs');
            var isEmpty = ($.trim($tabs.html()) == 0);
            isEmpty && $tabs.html(ar.join(''));
        },
        getAddrData: function() {
            var txtAr = [];
            var idAr = [];
            this._t.each(function() {
                txtAr.push($(this).find('.jTabTxt').text());
                idAr.push($(this).attr('data-id'));
            });
            var defaultAddr = txtAr.join('_') + ':' + idAr.join('_');
            this.com.o.attr('data-location-select', defaultAddr);
            return defaultAddr;
        },
        _loadTab: function() {
            var self = this;
            var textAr = self.com.getCacheData('text');
            var idAr = self.com.getCacheData('id');
            if ((textAr && textAr.indexOf(',') > -1) && (idAr && idAr.indexOf(',') > -1)) {
                textAr = textAr.split(',');
                idAr = idAr.split(',');
                var maxIndex = textAr.length - 1;
                $.each(idAr, function(i, v) {
                    var $t = self._t.eq(i);
                    $t.attr('data-id', v).find('.jTabTxt').text(textAr[i]).end().show();
                    $t.attr('data-parent-id', (i == 0 ? 0 : self._t.eq(i - 1).attr('data-id')));
                });
                var selectedIndex = self.opt.selectedIndex;
                self.tab(selectedIndex > maxIndex ? maxIndex : selectedIndex);
            }
        },
		tab: function(index) {
			var self = this;
			var $t = self._t.eq(index);
			// 显示对应tab
			$t.siblings().removeClass('hover');
			$t.show().addClass('hover');
			$t.attr('data-parent-id', (index == 0 ? 0 : self._t.eq(index - 1).attr('data-id')));
		},
        _events: function() {
            var self = this;
            self.com.o.on('click.tabs', '.jTabItem', function() {
                var index = $(this).attr('data-index');
                var parentId = $(this).attr('data-parent-id');
                var id = $(this).attr('data-id');
                self.tab(index);
                self.emit('click', index, parentId, id);
            })
        },
        destroy: function() {
            this.com.o.find('.jTabs').html('');
            this.offEvents();
        },
        offEvents: function() {
            this.com.o.off('click.tabs');
        }
    }
    Emitter.applyTo(Tabs);
    module.exports = Tabs;
});
