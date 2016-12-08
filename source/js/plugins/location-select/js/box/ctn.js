/**
 * @file ctn.js
 * @synopsis  ctn
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2016-01-13
 */

define(function(require, exports, module) {
    'use strict';
    var Com = require('../common');
    var Emitter = require('lib/core/1.0.0/event/emitter');

    function Ctn(selector, opt) {
        this.opt = {};
        this.selector = selector;
        $.extend(this.opt, opt);
        this.com = new Com(selector, this.opt);
    }
    Ctn.prototype = {
        init: function() {
            var self = this;
            self._create();
            self._t = self.com.o.find('.tab .jTabItem');
            self._c = self.com.o.find('.mc'); //ctn
            self._events();
            //
            var textAr = self.com.getCacheData('text');
            if (!textAr || textAr.indexOf(',') < 0) {
                self.loadCtn(0, 0, undefined, function($ctn) {
                    self.emit('loaded', $ctn);
                });
            } else {
                var $t = self._t.filter('.hover');
                var index = $t.attr('data-index');
                var parentId = $t.attr('data-parent-id');
                var id = $t.attr('data-id');
                if (parentId != undefined) {
                    self.loadCtn(index, parentId, id, function($ctn) {
                        self.emit('loaded', $ctn);
                    });
                }
            }
        },
        _showItem: function(index) {
            var self = this;
            self._c.hide();
            self._c.eq(index).show();
        },
        loadCtn: function(index, parentId, id, callback) {
            var self = this;
            if (self._isEmptyOrNew(index)) {
                self._addContent(index, parentId, function() {
                    self._resetLi(index, id);
                });
            } else {
                self._resetLi(index, id);
            }
            self._showItem(index);
            var $ctn = self._c.eq(index);
            callback && callback($ctn);
        },
        _resetLi: function(index, id) {
            var self = this;
            if (id != undefined) {
                var $parent = self._c.eq(index);
                var $this = $parent.find('[data-id=' + id + ']');
                self._tab($parent, $this);
            }
        },
        _tab: function($parent, $this) {
            $parent.find('.jMcLi').removeClass('hover');
            $this.addClass('hover');
        },
        _create: function() {
            var self = this;
            var d = self.opt.degree;
            var ar = [];
            for (var n = 0; n < d; n++) {
                ar.push('<div class="mc" data-index="' + n + '"  style="display:' + (n == 0 ? 'block' : 'none') + '">',
                    '<div class="load-txt-box jLoadBox"></div>',
                    '<ul class="area-list">',
                    '</ul>',
                    '</div>');
            }
            var $ctn = self.com.o.find('.jCtns');
            var isEmpty = ($.trim($ctn.html()).length == 0);
            isEmpty && $ctn.html(ar.join(''));
        },
        _isEmptyOrNew: function(index) {
            var self = this;
            var isEmpty = $.trim(self._c.eq(index).find('.area-list').html()).length == 0;
            var isNew = (self._c.eq(index).attr('data-parent-id') != self._t.eq(index).attr('data-parent-id'));
            return isEmpty || isNew;
        },
        _addContent: function(index, id, callback) {
            var self = this;
            self.com.ajax(self.opt.url, {
                    pregionid: id
                },
                function(data) {
                    if (data != '' && data != null && data['data'][index]) {
                        var _id = data['data'][index][id];
                        // 载入数据
                        self._c.eq(index).attr('data-parent-id', id).find('.area-list').html(self._addStr(_id, index))
                        self._hideLoadBox();
                    }
                    // 回调
                    callback && callback(data);
                })
        },
        _hideLoadBox: function() {
            this.com.o.find('.jLoadBox').filter(function() {
                return $(this).parent('.mc').find('.area-list li').length != 0;
            }).hide();
        },
        _addStr: function(data, index) {
            var self = this;
            var str = '';
            //获取当前选中的id
            var selectedId = self._t.eq(index).attr('data-id');
            //索引
            var _i = 0;
            $.each(data, function(k, v) {
                if (v) {
                    str += '<li data-id="' + k + '" data-li-index="' + _i + '" class="jMcLi ' + (k == selectedId ? 'hover' : '') + '" title="' + v + '"><a href="javascript:;" class="limit">' + v + '</a></li>';
                }
                _i++;
            });
            return str;
        },
        _events: function() {
            var self = this;
            self.com.o.on('click.ctn', '.jMcLi', function() {
                self._showCtn($(this));
            })
        },
        _showCtn: function($this) {
            var self = this;
            var $parent = $this.closest('.mc');
            var index = Number($parent.attr('data-index'));
            var text = $this.text();
            var id = $this.attr('data-id');
            var $t = self._t.eq(index);
            self._hideOtherTab(index);
            self._tab($parent, $this);
            if (index + 1 < self.opt.degree) {
                self._addContent(index + 1, id, function(data) {
                    if (data['data'][index + 1]) {
                        self.emit('click', (index + 1));
                        self._showItem(index + 1);
                        $t.find('.jTabTxt').text(text);
                        $t.attr('data-id', id);
                    } else {
                        self._lastChange($t, text, id);
                    }
                });
            } else {
                self._lastChange($t, text, id);
            }
        },
        _lastChange: function($t, text, id) {
            var self = this;
            $t.find('.jTabTxt').text(text);
            $t.attr('data-id', id);
            self.emit('lastChange');
        },
        _hideOtherTab: function(index) {
            var self = this;
            self._t.filter(function() {
                var _index = $(this).attr('data-index');
                var flag = _index > index;
                if (flag) {
                    $(this).find('.jTabTxt').text(self.opt.labelTxt[_index]);
                    self._c.eq(_index).hide().find('.jLoadBox').show();
                }
                return flag;
            }).hide();
        },
        destroy: function() {
           this._c && this._c.remove();
            this.offEvents();
        },
        offEvents: function() {
            this.com.o.off('click.ctn');
        }
    };
    Emitter.applyTo(Ctn);
    module.exports = Ctn;
});
