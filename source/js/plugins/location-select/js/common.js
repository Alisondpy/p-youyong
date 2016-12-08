/**
 * @file common.js
 * @synopsis  四级地址公用方法
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2016-01-11
 */

define(function(require, exports, module) {
    'use strict';
    var io = require('lib/core/1.0.0/io/request');
    var cookie = require('lib/core/1.0.0/io/cookie');

    function Com(selector, opt) {
        this.opt = {};
        this.o = $(selector);
        $.extend(this.opt, opt || {});
    }
    Com.prototype = {
        ajax: function(url, data, successFun, errorFun) {
            var self = this;
            var opt = {
                url: url,
                data: $.extend({
                    platform: 'js'
                }, data, self.opt.ajaxData),
                success: function(data) {
                    successFun && successFun(data);
                },
                error: function(data) {
                    errorFun && errorFun(data);
                }
            }
            io.jsonp(opt);
        },
        setAddrCookie: function() {
            var self = this;
            if (self.opt.isSetAddrCookie) {
                self.ajax(self.opt.setCookieUrl, {
                    action: 'set_def_area',
                    area: self.getCacheData('full')
                });
            }
        },
        getDefaultAddr: function(callback) {
            var self = this;
            if (!self.opt.isGetDefaultAddr) {
                callback && callback();
                return;
            }
            var defaultAddr = self.o.attr('data-location-select');
            if (defaultAddr && defaultAddr != '') {
                callback && callback(defaultAddr);
            } else if (cookie('_address')) {
                callback && callback(cookie('_address'));
            } else if (self.opt.defaultUrl != '') {
                self.ajax(self.opt.defaultUrl, {
                        action: 'get_def_area'
                    },
                    function(data) {
                        callback && callback(data);
                    }, function() {
                        callback && callback(defaultAddr);
                    });
            } else {
                callback && callback(defaultAddr);
            }
        },
        setCache: function(defaultAddr) {
            var self = this;
            var ar = [];
            var textAr = [];
            var idAr = [];
            var $cache = self.o.find('.jCacheData');
            var firstText = 'mainland:';
            var threeArr = [];
            var threeVal = '';
            if (defaultAddr && defaultAddr.indexOf(':') > -1) {
                ar = defaultAddr.split(':');
                if (ar[0] && ar[0].indexOf('_') > -1) {
                    textAr = ar[0].split('_');
                }
                if (ar[1] && ar[1].indexOf('_') > -1) {
                    idAr = ar[1].split('_');
                }
                if (textAr.length > self.opt.degree) {
                    textAr.length = self.opt.degree;
                }
                if (idAr.length > self.opt.degree) {
                    idAr.length = self.opt.degree;
                }
                if (textAr.length > 2) {
                    $.each(textAr, function(i, v) {
                        if (i < 3) {
                            threeArr.push(v);
                        }
                    });
                    threeVal = firstText + threeArr.join('/') + ':' + idAr[2];
                }
                $cache.attr({
                    'data-addr-mainland': firstText + textAr.join('/') + ':' + idAr[idAr.length - 1],
                    'data-addr-id': idAr.join(','),
                    'data-addr-text': textAr.join(','),
                    'data-addr-three': threeVal,
                    'data-addr-full': textAr.join('_') + ':' + idAr.join('_')
                });
				self.o.attr('data-degree', textAr.length);
            }
        },
        destroy: function() {
            // this = null;
        },
        getCacheData: function(addr) {
            var $cache = this.o.find('.jCacheData');
            return $cache ? $cache.attr('data-addr-' + addr) : '';
        }
    }
    module.exports = Com;
});
