/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */

/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */

/*! see also <https://gist.github.com/allex/7bc1c13c92b644815de129e97568677b> */

require.config({
    baseUrl: "//s1.zhongzhihui.com/p-youyong/dist/js/",
    paths: {
        lib: "//s1.zhongzhihui.com/lib",
        template: "lib/template/3.0/template-simple",
        css: "lib/require/2.1/plugins/css/css",
        text: "lib/require/2.1/plugins/text/text",
        jquery: "lib/jquery/1.11.1/jquery"
    },
    shim: {}
});

!Function.prototype.bind;

define("app", function() {});

!function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = e.length, n = re.type(e);
        return "function" !== n && !re.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e));
    }
    function i(e, t, n) {
        if (re.isFunction(t)) return re.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n;
        });
        if (t.nodeType) return re.grep(e, function(e) {
            return e === t !== n;
        });
        if ("string" == typeof t) {
            if (de.test(t)) return re.filter(t, e, n);
            t = re.filter(t, e);
        }
        return re.grep(e, function(e) {
            return re.inArray(e, t) >= 0 !== n;
        });
    }
    function r(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e;
    }
    function o(e) {
        var t = xe[e] = {};
        re.each(e.match(be) || [], function(e, n) {
            t[n] = !0;
        });
        return t;
    }
    function a() {
        if (he.addEventListener) {
            he.removeEventListener("DOMContentLoaded", s, !1);
            e.removeEventListener("load", s, !1);
        } else {
            he.detachEvent("onreadystatechange", s);
            e.detachEvent("onload", s);
        }
    }
    function s() {
        if (he.addEventListener || "load" === event.type || "complete" === he.readyState) {
            a();
            re.ready();
        }
    }
    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(Ee, "-$1").toLowerCase();
            n = e.getAttribute(i);
            if ("string" == typeof n) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Ne.test(n) ? re.parseJSON(n) : n);
                } catch (r) {}
                re.data(e, t, n);
            } else n = void 0;
        }
        return n;
    }
    function u(e) {
        var t;
        for (t in e) if (("data" !== t || !re.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0;
    }
    function c(e, t, n, i) {
        if (re.acceptData(e)) {
            var r, o, a = re.expando, s = e.nodeType, l = s ? re.cache : e, u = s ? e[a] : e[a] && a;
            if (u && l[u] && (i || l[u].data) || void 0 !== n || "string" != typeof t) {
                u || (u = s ? e[a] = J.pop() || re.guid++ : a);
                l[u] || (l[u] = s ? {} : {
                    toJSON: re.noop
                });
                "object" != typeof t && "function" != typeof t || (i ? l[u] = re.extend(l[u], t) : l[u].data = re.extend(l[u].data, t));
                o = l[u];
                if (!i) {
                    o.data || (o.data = {});
                    o = o.data;
                }
                void 0 !== n && (o[re.camelCase(t)] = n);
                if ("string" == typeof t) {
                    r = o[t];
                    null == r && (r = o[re.camelCase(t)]);
                } else r = o;
                return r;
            }
        }
    }
    function f(e, t, n) {
        if (re.acceptData(e)) {
            var i, r, o = e.nodeType, a = o ? re.cache : e, s = o ? e[re.expando] : re.expando;
            if (a[s]) {
                if (t) {
                    i = n ? a[s] : a[s].data;
                    if (i) {
                        if (re.isArray(t)) t = t.concat(re.map(t, re.camelCase)); else if (t in i) t = [ t ]; else {
                            t = re.camelCase(t);
                            t = t in i ? [ t ] : t.split(" ");
                        }
                        r = t.length;
                        for (;r--; ) delete i[t[r]];
                        if (n ? !u(i) : !re.isEmptyObject(i)) return;
                    }
                }
                if (!n) {
                    delete a[s].data;
                    if (!u(a[s])) return;
                }
                o ? re.cleanData([ e ], !0) : ne.deleteExpando || a != a.window ? delete a[s] : a[s] = null;
            }
        }
    }
    function d() {
        return !0;
    }
    function p() {
        return !1;
    }
    function h() {
        try {
            return he.activeElement;
        } catch (e) {}
    }
    function m(e) {
        var t = Fe.split("|"), n = e.createDocumentFragment();
        if (n.createElement) for (;t.length; ) n.createElement(t.pop());
        return n;
    }
    function g(e, t) {
        var n, i, r = 0, o = typeof e.getElementsByTagName !== Ce ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Ce ? e.querySelectorAll(t || "*") : void 0;
        if (!o) for (o = [], n = e.childNodes || e; null != (i = n[r]); r++) !t || re.nodeName(i, t) ? o.push(i) : re.merge(o, g(i, t));
        return void 0 === t || t && re.nodeName(e, t) ? re.merge([ e ], o) : o;
    }
    function y(e) {
        De.test(e.type) && (e.defaultChecked = e.checked);
    }
    function v(e, t) {
        return re.nodeName(e, "table") && re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function b(e) {
        e.type = (null !== re.find.attr(e, "type")) + "/" + e.type;
        return e;
    }
    function x(e) {
        var t = Ve.exec(e.type);
        t ? e.type = t[1] : e.removeAttribute("type");
        return e;
    }
    function w(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++) re._data(n, "globalEval", !t || re._data(t[i], "globalEval"));
    }
    function T(e, t) {
        if (1 === t.nodeType && re.hasData(e)) {
            var n, i, r, o = re._data(e), a = re._data(t, o), s = o.events;
            if (s) {
                delete a.handle;
                a.events = {};
                for (n in s) for (i = 0, r = s[n].length; i < r; i++) re.event.add(t, n, s[n][i]);
            }
            a.data && (a.data = re.extend({}, a.data));
        }
    }
    function C(e, t) {
        var n, i, r;
        if (1 === t.nodeType) {
            n = t.nodeName.toLowerCase();
            if (!ne.noCloneEvent && t[re.expando]) {
                r = re._data(t);
                for (i in r.events) re.removeEvent(t, i, r.handle);
                t.removeAttribute(re.expando);
            }
            if ("script" === n && t.text !== e.text) {
                b(t).text = e.text;
                x(t);
            } else if ("object" === n) {
                t.parentNode && (t.outerHTML = e.outerHTML);
                ne.html5Clone && e.innerHTML && !re.trim(t.innerHTML) && (t.innerHTML = e.innerHTML);
            } else if ("input" === n && De.test(e.type)) {
                t.defaultChecked = t.checked = e.checked;
                t.value !== e.value && (t.value = e.value);
            } else "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
        }
    }
    function N(t, n) {
        var i, r = re(n.createElement(t)).appendTo(n.body), o = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(r[0])) ? i.display : re.css(r[0], "display");
        r.detach();
        return o;
    }
    function E(e) {
        var t = he, n = Ze[e];
        if (!n) {
            n = N(e, t);
            if ("none" === n || !n) {
                Ke = (Ke || re("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement);
                t = (Ke[0].contentWindow || Ke[0].contentDocument).document;
                t.write();
                t.close();
                n = N(e, t);
                Ke.detach();
            }
            Ze[e] = n;
        }
        return n;
    }
    function k(e, t) {
        return {
            get: function() {
                var n = e();
                if (null != n) {
                    if (!n) return (this.get = t).apply(this, arguments);
                    delete this.get;
                }
            }
        };
    }
    function S(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = dt.length; r--; ) {
            t = dt[r] + n;
            if (t in e) return t;
        }
        return i;
    }
    function A(e, t) {
        for (var n, i, r, o = [], a = 0, s = e.length; a < s; a++) {
            i = e[a];
            if (i.style) {
                o[a] = re._data(i, "olddisplay");
                n = i.style.display;
                if (t) {
                    o[a] || "none" !== n || (i.style.display = "");
                    "" === i.style.display && Ae(i) && (o[a] = re._data(i, "olddisplay", E(i.nodeName)));
                } else {
                    r = Ae(i);
                    (n && "none" !== n || !r) && re._data(i, "olddisplay", r ? n : re.css(i, "display"));
                }
            }
        }
        for (a = 0; a < s; a++) {
            i = e[a];
            i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
        }
        return e;
    }
    function j(e, t, n) {
        var i = lt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
    }
    function D(e, t, n, i, r) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) {
            "margin" === n && (a += re.css(e, n + Se[o], !0, r));
            if (i) {
                "content" === n && (a -= re.css(e, "padding" + Se[o], !0, r));
                "margin" !== n && (a -= re.css(e, "border" + Se[o] + "Width", !0, r));
            } else {
                a += re.css(e, "padding" + Se[o], !0, r);
                "padding" !== n && (a += re.css(e, "border" + Se[o] + "Width", !0, r));
            }
        }
        return a;
    }
    function L(e, t, n) {
        var i = !0, r = "width" === t ? e.offsetWidth : e.offsetHeight, o = et(e), a = ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, o);
        if (r <= 0 || null == r) {
            r = tt(e, t, o);
            (r < 0 || null == r) && (r = e.style[t]);
            if (it.test(r)) return r;
            i = a && (ne.boxSizingReliable() || r === e.style[t]);
            r = parseFloat(r) || 0;
        }
        return r + D(e, t, n || (a ? "border" : "content"), i, o) + "px";
    }
    function H(e, t, n, i, r) {
        return new H.prototype.init(e, t, n, i, r);
    }
    function q() {
        setTimeout(function() {
            pt = void 0;
        });
        return pt = re.now();
    }
    function _(e, t) {
        var n, i = {
            height: e
        }, r = 0;
        t = t ? 1 : 0;
        for (;r < 4; r += 2 - t) {
            n = Se[r];
            i["margin" + n] = i["padding" + n] = e;
        }
        t && (i.opacity = i.width = e);
        return i;
    }
    function M(e, t, n) {
        for (var i, r = (bt[t] || []).concat(bt["*"]), o = 0, a = r.length; o < a; o++) if (i = r[o].call(n, t, e)) return i;
    }
    function F(e, t, n) {
        var i, r, o, a, s, l, u, c, f = this, d = {}, p = e.style, h = e.nodeType && Ae(e), m = re._data(e, "fxshow");
        if (!n.queue) {
            s = re._queueHooks(e, "fx");
            if (null == s.unqueued) {
                s.unqueued = 0;
                l = s.empty.fire;
                s.empty.fire = function() {
                    s.unqueued || l();
                };
            }
            s.unqueued++;
            f.always(function() {
                f.always(function() {
                    s.unqueued--;
                    re.queue(e, "fx").length || s.empty.fire();
                });
            });
        }
        if (1 === e.nodeType && ("height" in t || "width" in t)) {
            n.overflow = [ p.overflow, p.overflowX, p.overflowY ];
            u = re.css(e, "display");
            c = "none" === u ? re._data(e, "olddisplay") || E(e.nodeName) : u;
            "inline" === c && "none" === re.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== E(e.nodeName) ? p.zoom = 1 : p.display = "inline-block");
        }
        if (n.overflow) {
            p.overflow = "hidden";
            ne.shrinkWrapBlocks() || f.always(function() {
                p.overflow = n.overflow[0];
                p.overflowX = n.overflow[1];
                p.overflowY = n.overflow[2];
            });
        }
        for (i in t) {
            r = t[i];
            if (mt.exec(r)) {
                delete t[i];
                o = o || "toggle" === r;
                if (r === (h ? "hide" : "show")) {
                    if ("show" !== r || !m || void 0 === m[i]) continue;
                    h = !0;
                }
                d[i] = m && m[i] || re.style(e, i);
            } else u = void 0;
        }
        if (re.isEmptyObject(d)) "inline" === ("none" === u ? E(e.nodeName) : u) && (p.display = u); else {
            m ? "hidden" in m && (h = m.hidden) : m = re._data(e, "fxshow", {});
            o && (m.hidden = !h);
            h ? re(e).show() : f.done(function() {
                re(e).hide();
            });
            f.done(function() {
                var t;
                re._removeData(e, "fxshow");
                for (t in d) re.style(e, t, d[t]);
            });
            for (i in d) {
                a = M(h ? m[i] : 0, i, f);
                if (!(i in m)) {
                    m[i] = a.start;
                    if (h) {
                        a.end = a.start;
                        a.start = "width" === i || "height" === i ? 1 : 0;
                    }
                }
            }
        }
    }
    function O(e, t) {
        var n, i, r, o, a;
        for (n in e) {
            i = re.camelCase(n);
            r = t[i];
            o = e[n];
            if (re.isArray(o)) {
                r = o[1];
                o = e[n] = o[0];
            }
            if (n !== i) {
                e[i] = o;
                delete e[n];
            }
            a = re.cssHooks[i];
            if (a && "expand" in a) {
                o = a.expand(o);
                delete e[i];
                for (n in o) if (!(n in e)) {
                    e[n] = o[n];
                    t[n] = r;
                }
            } else t[i] = r;
        }
    }
    function B(e, t, n) {
        var i, r, o = 0, a = vt.length, s = re.Deferred().always(function() {
            delete l.elem;
        }), l = function() {
            if (r) return !1;
            for (var t = pt || q(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, a = 0, l = u.tweens.length; a < l; a++) u.tweens[a].run(o);
            s.notifyWith(e, [ u, o, n ]);
            if (o < 1 && l) return n;
            s.resolveWith(e, [ u ]);
            return !1;
        }, u = s.promise({
            elem: e,
            props: re.extend({}, t),
            opts: re.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: pt || q(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var i = re.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                u.tweens.push(i);
                return i;
            },
            stop: function(t) {
                var n = 0, i = t ? u.tweens.length : 0;
                if (r) return this;
                r = !0;
                for (;n < i; n++) u.tweens[n].run(1);
                t ? s.resolveWith(e, [ u, t ]) : s.rejectWith(e, [ u, t ]);
                return this;
            }
        }), c = u.props;
        O(c, u.opts.specialEasing);
        for (;o < a; o++) {
            i = vt[o].call(u, e, c, u.opts);
            if (i) return i;
        }
        re.map(c, M, u);
        re.isFunction(u.opts.start) && u.opts.start.call(e, u);
        re.fx.timer(re.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        }));
        return u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always);
    }
    function P(e) {
        return function(t, n) {
            if ("string" != typeof t) {
                n = t;
                t = "*";
            }
            var i, r = 0, o = t.toLowerCase().match(be) || [];
            if (re.isFunction(n)) for (;i = o[r++]; ) if ("+" === i.charAt(0)) {
                i = i.slice(1) || "*";
                (e[i] = e[i] || []).unshift(n);
            } else (e[i] = e[i] || []).push(n);
        };
    }
    function R(e, t, n, i) {
        function r(s) {
            var l;
            o[s] = !0;
            re.each(e[s] || [], function(e, s) {
                var u = s(t, n, i);
                if ("string" == typeof u && !a && !o[u]) {
                    t.dataTypes.unshift(u);
                    r(u);
                    return !1;
                }
                if (a) return !(l = u);
            });
            return l;
        }
        var o = {}, a = e === zt;
        return r(t.dataTypes[0]) || !o["*"] && r("*");
    }
    function W(e, t) {
        var n, i, r = re.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
        n && re.extend(!0, e, n);
        return e;
    }
    function $(e, t, n) {
        for (var i, r, o, a, s = e.contents, l = e.dataTypes; "*" === l[0]; ) {
            l.shift();
            void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        }
        if (r) for (a in s) if (s[a] && s[a].test(r)) {
            l.unshift(a);
            break;
        }
        if (l[0] in n) o = l[0]; else {
            for (a in n) {
                if (!l[0] || e.converters[a + " " + l[0]]) {
                    o = a;
                    break;
                }
                i || (i = a);
            }
            o = o || i;
        }
        if (o) {
            o !== l[0] && l.unshift(o);
            return n[o];
        }
    }
    function z(e, t, n, i) {
        var r, o, a, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
        o = c.shift();
        for (;o; ) {
            e.responseFields[o] && (n[e.responseFields[o]] = t);
            !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType));
            l = o;
            o = c.shift();
            if (o) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
                a = u[l + " " + o] || u["* " + o];
                if (!a) for (r in u) {
                    s = r.split(" ");
                    if (s[1] === o) {
                        a = u[l + " " + s[0]] || u["* " + s[0]];
                        if (a) {
                            if (a === !0) a = u[r]; else if (u[r] !== !0) {
                                o = s[0];
                                c.unshift(s[1]);
                            }
                            break;
                        }
                    }
                }
                if (a !== !0) if (a && e["throws"]) t = a(t); else try {
                    t = a(t);
                } catch (f) {
                    return {
                        state: "parsererror",
                        error: a ? f : "No conversion from " + l + " to " + o
                    };
                }
            }
        }
        return {
            state: "success",
            data: t
        };
    }
    function I(e, t, n, i) {
        var r;
        if (re.isArray(t)) re.each(t, function(t, r) {
            n || Vt.test(e) ? i(e, r) : I(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i);
        }); else if (n || "object" !== re.type(t)) i(e, t); else for (r in t) I(e + "[" + r + "]", t[r], n, i);
    }
    function X() {
        try {
            return new e.XMLHttpRequest();
        } catch (t) {}
    }
    function U() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP");
        } catch (t) {}
    }
    function V(e) {
        return re.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow);
    }
    var J = [], Y = J.slice, G = J.concat, Q = J.push, K = J.indexOf, Z = {}, ee = Z.toString, te = Z.hasOwnProperty, ne = {}, ie = "1.11.1", re = function(e, t) {
        return new re.fn.init(e, t);
    }, oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ae = /^-ms-/, se = /-([\da-z])/gi, le = function(e, t) {
        return t.toUpperCase();
    };
    re.fn = re.prototype = {
        jquery: ie,
        constructor: re,
        selector: "",
        length: 0,
        toArray: function() {
            return Y.call(this);
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : Y.call(this);
        },
        pushStack: function(e) {
            var t = re.merge(this.constructor(), e);
            t.prevObject = this;
            t.context = this.context;
            return t;
        },
        each: function(e, t) {
            return re.each(this, e, t);
        },
        map: function(e) {
            return this.pushStack(re.map(this, function(t, n) {
                return e.call(t, n, t);
            }));
        },
        slice: function() {
            return this.pushStack(Y.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length, n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [ this[n] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: Q,
        sort: J.sort,
        splice: J.splice
    };
    re.extend = re.fn.extend = function() {
        var e, t, n, i, r, o, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
        if ("boolean" == typeof a) {
            u = a;
            a = arguments[s] || {};
            s++;
        }
        "object" == typeof a || re.isFunction(a) || (a = {});
        if (s === l) {
            a = this;
            s--;
        }
        for (;s < l; s++) if (null != (r = arguments[s])) for (i in r) {
            e = a[i];
            n = r[i];
            if (a !== n) if (u && n && (re.isPlainObject(n) || (t = re.isArray(n)))) {
                if (t) {
                    t = !1;
                    o = e && re.isArray(e) ? e : [];
                } else o = e && re.isPlainObject(e) ? e : {};
                a[i] = re.extend(u, o, n);
            } else void 0 !== n && (a[i] = n);
        }
        return a;
    };
    re.extend({
        expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === re.type(e);
        },
        isArray: Array.isArray || function(e) {
            return "array" === re.type(e);
        },
        isWindow: function(e) {
            return null != e && e == e.window;
        },
        isNumeric: function(e) {
            return !re.isArray(e) && e - parseFloat(e) >= 0;
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== re.type(e) || e.nodeType || re.isWindow(e)) return !1;
            try {
                if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (n) {
                return !1;
            }
            if (ne.ownLast) for (t in e) return te.call(e, t);
            for (t in e) ;
            return void 0 === t || te.call(e, t);
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object" : typeof e;
        },
        globalEval: function(t) {
            t && re.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t);
            })(t);
        },
        camelCase: function(e) {
            return e.replace(ae, "ms-").replace(se, le);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t, i) {
            var r, o = 0, a = e.length, s = n(e);
            if (i) if (s) for (;o < a; o++) {
                r = t.apply(e[o], i);
                if (r === !1) break;
            } else for (o in e) {
                r = t.apply(e[o], i);
                if (r === !1) break;
            } else if (s) for (;o < a; o++) {
                r = t.call(e[o], o, e[o]);
                if (r === !1) break;
            } else for (o in e) {
                r = t.call(e[o], o, e[o]);
                if (r === !1) break;
            }
            return e;
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(oe, "");
        },
        makeArray: function(e, t) {
            var i = t || [];
            null != e && (n(Object(e)) ? re.merge(i, "string" == typeof e ? [ e ] : e) : Q.call(i, e));
            return i;
        },
        inArray: function(e, t, n) {
            var i;
            if (t) {
                if (K) return K.call(t, e, n);
                i = t.length;
                n = n ? n < 0 ? Math.max(0, i + n) : n : 0;
                for (;n < i; n++) if (n in t && t[n] === e) return n;
            }
            return -1;
        },
        merge: function(e, t) {
            for (var n = +t.length, i = 0, r = e.length; i < n; ) e[r++] = t[i++];
            if (n !== n) for (;void 0 !== t[i]; ) e[r++] = t[i++];
            e.length = r;
            return e;
        },
        grep: function(e, t, n) {
            for (var i, r = [], o = 0, a = e.length, s = !n; o < a; o++) {
                i = !t(e[o], o);
                i !== s && r.push(e[o]);
            }
            return r;
        },
        map: function(e, t, i) {
            var r, o = 0, a = e.length, s = n(e), l = [];
            if (s) for (;o < a; o++) {
                r = t(e[o], o, i);
                null != r && l.push(r);
            } else for (o in e) {
                r = t(e[o], o, i);
                null != r && l.push(r);
            }
            return G.apply([], l);
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, r;
            if ("string" == typeof t) {
                r = e[t];
                t = e;
                e = r;
            }
            if (re.isFunction(e)) {
                n = Y.call(arguments, 2);
                i = function() {
                    return e.apply(t || this, n.concat(Y.call(arguments)));
                };
                i.guid = e.guid = e.guid || re.guid++;
                return i;
            }
        },
        now: function() {
            return +new Date();
        },
        support: ne
    });
    re.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        Z["[object " + t + "]"] = t.toLowerCase();
    });
    var ue = function(e) {
        function t(e, t, n, i) {
            var r, o, a, s, l, u, f, p, h, m;
            (t ? t.ownerDocument || t : R) !== H && L(t);
            t = t || H;
            n = n || [];
            if (!e || "string" != typeof e) return n;
            if (1 !== (s = t.nodeType) && 9 !== s) return [];
            if (_ && !i) {
                if (r = ve.exec(e)) if (a = r[1]) {
                    if (9 === s) {
                        o = t.getElementById(a);
                        if (!o || !o.parentNode) return n;
                        if (o.id === a) {
                            n.push(o);
                            return n;
                        }
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && B(t, o) && o.id === a) {
                        n.push(o);
                        return n;
                    }
                } else {
                    if (r[2]) {
                        Z.apply(n, t.getElementsByTagName(e));
                        return n;
                    }
                    if ((a = r[3]) && w.getElementsByClassName && t.getElementsByClassName) {
                        Z.apply(n, t.getElementsByClassName(a));
                        return n;
                    }
                }
                if (w.qsa && (!M || !M.test(e))) {
                    p = f = P;
                    h = t;
                    m = 9 === s && e;
                    if (1 === s && "object" !== t.nodeName.toLowerCase()) {
                        u = E(e);
                        (f = t.getAttribute("id")) ? p = f.replace(xe, "\\$&") : t.setAttribute("id", p);
                        p = "[id='" + p + "'] ";
                        l = u.length;
                        for (;l--; ) u[l] = p + d(u[l]);
                        h = be.test(e) && c(t.parentNode) || t;
                        m = u.join(",");
                    }
                    if (m) try {
                        Z.apply(n, h.querySelectorAll(m));
                        return n;
                    } catch (g) {} finally {
                        f || t.removeAttribute("id");
                    }
                }
            }
            return S(e.replace(le, "$1"), t, n, i);
        }
        function n() {
            function e(n, i) {
                t.push(n + " ") > T.cacheLength && delete e[t.shift()];
                return e[n + " "] = i;
            }
            var t = [];
            return e;
        }
        function i(e) {
            e[P] = !0;
            return e;
        }
        function r(e) {
            var t = H.createElement("div");
            try {
                return !!e(t);
            } catch (n) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null;
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), i = e.length; i--; ) T.attrHandle[n[i]] = t;
        }
        function a(e, t) {
            var n = t && e, i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || J) - (~e.sourceIndex || J);
            if (i) return i;
            if (n) for (;n = n.nextSibling; ) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e;
            };
        }
        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
            };
        }
        function u(e) {
            return i(function(t) {
                t = +t;
                return i(function(n, i) {
                    for (var r, o = e([], n.length, t), a = o.length; a--; ) n[r = o[a]] && (n[r] = !(i[r] = n[r]));
                });
            });
        }
        function c(e) {
            return e && typeof e.getElementsByTagName !== V && e;
        }
        function f() {}
        function d(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i;
        }
        function p(e, t, n) {
            var i = t.dir, r = n && "parentNode" === i, o = $++;
            return t.first ? function(t, n, o) {
                for (;t = t[i]; ) if (1 === t.nodeType || r) return e(t, n, o);
            } : function(t, n, a) {
                var s, l, u = [ W, o ];
                if (a) {
                    for (;t = t[i]; ) if ((1 === t.nodeType || r) && e(t, n, a)) return !0;
                } else for (;t = t[i]; ) if (1 === t.nodeType || r) {
                    l = t[P] || (t[P] = {});
                    if ((s = l[i]) && s[0] === W && s[1] === o) return u[2] = s[2];
                    l[i] = u;
                    if (u[2] = e(t, n, a)) return !0;
                }
            };
        }
        function h(e) {
            return e.length > 1 ? function(t, n, i) {
                for (var r = e.length; r--; ) if (!e[r](t, n, i)) return !1;
                return !0;
            } : e[0];
        }
        function m(e, n, i) {
            for (var r = 0, o = n.length; r < o; r++) t(e, n[r], i);
            return i;
        }
        function g(e, t, n, i, r) {
            for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++) if ((o = e[s]) && (!n || n(o, i, r))) {
                a.push(o);
                u && t.push(s);
            }
            return a;
        }
        function y(e, t, n, r, o, a) {
            r && !r[P] && (r = y(r));
            o && !o[P] && (o = y(o, a));
            return i(function(i, a, s, l) {
                var u, c, f, d = [], p = [], h = a.length, y = i || m(t || "*", s.nodeType ? [ s ] : s, []), v = !e || !i && t ? y : g(y, d, e, s, l), b = n ? o || (i ? e : h || r) ? [] : a : v;
                n && n(v, b, s, l);
                if (r) {
                    u = g(b, p);
                    r(u, [], s, l);
                    c = u.length;
                    for (;c--; ) (f = u[c]) && (b[p[c]] = !(v[p[c]] = f));
                }
                if (i) {
                    if (o || e) {
                        if (o) {
                            u = [];
                            c = b.length;
                            for (;c--; ) (f = b[c]) && u.push(v[c] = f);
                            o(null, b = [], u, l);
                        }
                        c = b.length;
                        for (;c--; ) (f = b[c]) && (u = o ? te.call(i, f) : d[c]) > -1 && (i[u] = !(a[u] = f));
                    }
                } else {
                    b = g(b === a ? b.splice(h, b.length) : b);
                    o ? o(null, a, b, l) : Z.apply(a, b);
                }
            });
        }
        function v(e) {
            for (var t, n, i, r = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = p(function(e) {
                return e === t;
            }, a, !0), u = p(function(e) {
                return te.call(t, e) > -1;
            }, a, !0), c = [ function(e, n, i) {
                return !o && (i || n !== A) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
            } ]; s < r; s++) if (n = T.relative[e[s].type]) c = [ p(h(c), n) ]; else {
                n = T.filter[e[s].type].apply(null, e[s].matches);
                if (n[P]) {
                    i = ++s;
                    for (;i < r && !T.relative[e[i].type]; i++) ;
                    return y(s > 1 && h(c), s > 1 && d(e.slice(0, s - 1).concat({
                        value: " " === e[s - 2].type ? "*" : ""
                    })).replace(le, "$1"), n, s < i && v(e.slice(s, i)), i < r && v(e = e.slice(i)), i < r && d(e));
                }
                c.push(n);
            }
            return h(c);
        }
        function b(e, n) {
            var r = n.length > 0, o = e.length > 0, a = function(i, a, s, l, u) {
                var c, f, d, p = 0, h = "0", m = i && [], y = [], v = A, b = i || o && T.find.TAG("*", u), x = W += null == v ? 1 : Math.random() || .1, w = b.length;
                u && (A = a !== H && a);
                for (;h !== w && null != (c = b[h]); h++) {
                    if (o && c) {
                        f = 0;
                        for (;d = e[f++]; ) if (d(c, a, s)) {
                            l.push(c);
                            break;
                        }
                        u && (W = x);
                    }
                    if (r) {
                        (c = !d && c) && p--;
                        i && m.push(c);
                    }
                }
                p += h;
                if (r && h !== p) {
                    f = 0;
                    for (;d = n[f++]; ) d(m, y, a, s);
                    if (i) {
                        if (p > 0) for (;h--; ) m[h] || y[h] || (y[h] = Q.call(l));
                        y = g(y);
                    }
                    Z.apply(l, y);
                    u && !i && y.length > 0 && p + n.length > 1 && t.uniqueSort(l);
                }
                if (u) {
                    W = x;
                    A = v;
                }
                return m;
            };
            return r ? i(a) : a;
        }
        var x, w, T, C, N, E, k, S, A, j, D, L, H, q, _, M, F, O, B, P = "sizzle" + -new Date(), R = e.document, W = 0, $ = 0, z = n(), I = n(), X = n(), U = function(e, t) {
            e === t && (D = !0);
            return 0;
        }, V = "undefined", J = 1 << 31, Y = {}.hasOwnProperty, G = [], Q = G.pop, K = G.push, Z = G.push, ee = G.slice, te = G.indexOf || function(e) {
            for (var t = 0, n = this.length; t < n; t++) if (this[t] === e) return t;
            return -1;
        }, ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ie = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", oe = re.replace("w", "w#"), ae = "\\[" + ie + "*(" + re + ")(?:" + ie + "*([*^$|!~]?=)" + ie + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + ie + "*\\]", se = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)", le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"), ue = new RegExp("^" + ie + "*," + ie + "*"), ce = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"), fe = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"), de = new RegExp(se), pe = new RegExp("^" + oe + "$"), he = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + ae),
            PSEUDO: new RegExp("^" + se),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ne + ")$", "i"),
            needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
        }, me = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ye = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, be = /[+~]/, xe = /'|\\/g, we = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"), Te = function(e, t, n) {
            var i = "0x" + t - 65536;
            return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
        };
        try {
            Z.apply(G = ee.call(R.childNodes), R.childNodes);
            G[R.childNodes.length].nodeType;
        } catch (Ce) {
            Z = {
                apply: G.length ? function(e, t) {
                    K.apply(e, ee.call(t));
                } : function(e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++]; ) ;
                    e.length = n - 1;
                }
            };
        }
        w = t.support = {};
        N = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName;
        };
        L = t.setDocument = function(e) {
            var t, n = e ? e.ownerDocument || e : R, i = n.defaultView;
            if (n === H || 9 !== n.nodeType || !n.documentElement) return H;
            H = n;
            q = n.documentElement;
            _ = !N(n);
            i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
                L();
            }, !1) : i.attachEvent && i.attachEvent("onunload", function() {
                L();
            }));
            w.attributes = r(function(e) {
                e.className = "i";
                return !e.getAttribute("className");
            });
            w.getElementsByTagName = r(function(e) {
                e.appendChild(n.createComment(""));
                return !e.getElementsByTagName("*").length;
            });
            w.getElementsByClassName = ye.test(n.getElementsByClassName) && r(function(e) {
                e.innerHTML = "<div class='a'></div><div class='a i'></div>";
                e.firstChild.className = "i";
                return 2 === e.getElementsByClassName("i").length;
            });
            w.getById = r(function(e) {
                q.appendChild(e).id = P;
                return !n.getElementsByName || !n.getElementsByName(P).length;
            });
            if (w.getById) {
                T.find.ID = function(e, t) {
                    if (typeof t.getElementById !== V && _) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [ n ] : [];
                    }
                };
                T.filter.ID = function(e) {
                    var t = e.replace(we, Te);
                    return function(e) {
                        return e.getAttribute("id") === t;
                    };
                };
            } else {
                delete T.find.ID;
                T.filter.ID = function(e) {
                    var t = e.replace(we, Te);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
                        return n && n.value === t;
                    };
                };
            }
            T.find.TAG = w.getElementsByTagName ? function(e, t) {
                if (typeof t.getElementsByTagName !== V) return t.getElementsByTagName(e);
            } : function(e, t) {
                var n, i = [], r = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (;n = o[r++]; ) 1 === n.nodeType && i.push(n);
                    return i;
                }
                return o;
            };
            T.find.CLASS = w.getElementsByClassName && function(e, t) {
                if (typeof t.getElementsByClassName !== V && _) return t.getElementsByClassName(e);
            };
            F = [];
            M = [];
            if (w.qsa = ye.test(n.querySelectorAll)) {
                r(function(e) {
                    e.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                    e.querySelectorAll("[msallowclip^='']").length && M.push("[*^$]=" + ie + "*(?:''|\"\")");
                    e.querySelectorAll("[selected]").length || M.push("\\[" + ie + "*(?:value|" + ne + ")");
                    e.querySelectorAll(":checked").length || M.push(":checked");
                });
                r(function(e) {
                    var t = n.createElement("input");
                    t.setAttribute("type", "hidden");
                    e.appendChild(t).setAttribute("name", "D");
                    e.querySelectorAll("[name=d]").length && M.push("name" + ie + "*[*^$|!~]?=");
                    e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled");
                    e.querySelectorAll("*,:x");
                    M.push(",.*:");
                });
            }
            (w.matchesSelector = ye.test(O = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && r(function(e) {
                w.disconnectedMatch = O.call(e, "div");
                O.call(e, "[s!='']:x");
                F.push("!=", se);
            });
            M = M.length && new RegExp(M.join("|"));
            F = F.length && new RegExp(F.join("|"));
            t = ye.test(q.compareDocumentPosition);
            B = t || ye.test(q.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
            } : function(e, t) {
                if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                return !1;
            };
            U = t ? function(e, t) {
                if (e === t) {
                    D = !0;
                    return 0;
                }
                var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                if (i) return i;
                i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1;
                return 1 & i || !w.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === R && B(R, e) ? -1 : t === n || t.ownerDocument === R && B(R, t) ? 1 : j ? te.call(j, e) - te.call(j, t) : 0 : 4 & i ? -1 : 1;
            } : function(e, t) {
                if (e === t) {
                    D = !0;
                    return 0;
                }
                var i, r = 0, o = e.parentNode, s = t.parentNode, l = [ e ], u = [ t ];
                if (!o || !s) return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : j ? te.call(j, e) - te.call(j, t) : 0;
                if (o === s) return a(e, t);
                i = e;
                for (;i = i.parentNode; ) l.unshift(i);
                i = t;
                for (;i = i.parentNode; ) u.unshift(i);
                for (;l[r] === u[r]; ) r++;
                return r ? a(l[r], u[r]) : l[r] === R ? -1 : u[r] === R ? 1 : 0;
            };
            return n;
        };
        t.matches = function(e, n) {
            return t(e, null, null, n);
        };
        t.matchesSelector = function(e, n) {
            (e.ownerDocument || e) !== H && L(e);
            n = n.replace(fe, "='$1']");
            if (w.matchesSelector && _ && (!F || !F.test(n)) && (!M || !M.test(n))) try {
                var i = O.call(e, n);
                if (i || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
            } catch (r) {}
            return t(n, H, null, [ e ]).length > 0;
        };
        t.contains = function(e, t) {
            (e.ownerDocument || e) !== H && L(e);
            return B(e, t);
        };
        t.attr = function(e, t) {
            (e.ownerDocument || e) !== H && L(e);
            var n = T.attrHandle[t.toLowerCase()], i = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !_) : void 0;
            return void 0 !== i ? i : w.attributes || !_ ? e.getAttribute && e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
        };
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        };
        t.uniqueSort = function(e) {
            var t, n = [], i = 0, r = 0;
            D = !w.detectDuplicates;
            j = !w.sortStable && e.slice(0);
            e.sort(U);
            if (D) {
                for (;t = e[r++]; ) t === e[r] && (i = n.push(r));
                for (;i--; ) e.splice(n[i], 1);
            }
            j = null;
            return e;
        };
        C = t.getText = function(e) {
            var t, n = "", i = 0, r = e.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e);
                } else if (3 === r || 4 === r) return e.nodeValue;
            } else for (;t = e[i++]; ) n += C(t);
            return n;
        };
        T = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: he,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    e[1] = e[1].replace(we, Te);
                    e[3] = (e[3] || e[4] || e[5] || "").replace(we, Te);
                    "~=" === e[2] && (e[3] = " " + e[3] + " ");
                    return e.slice(0, 4);
                },
                CHILD: function(e) {
                    e[1] = e[1].toLowerCase();
                    if ("nth" === e[1].slice(0, 3)) {
                        e[3] || t.error(e[0]);
                        e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]));
                        e[5] = +(e[7] + e[8] || "odd" === e[3]);
                    } else e[3] && t.error(e[0]);
                    return e;
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    if (he.CHILD.test(e[0])) return null;
                    if (e[3]) e[2] = e[4] || e[5] || ""; else if (n && de.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length)) {
                        e[0] = e[0].slice(0, t);
                        e[2] = n.slice(0, t);
                    }
                    return e.slice(0, 3);
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, Te).toLowerCase();
                    return "*" === e ? function() {
                        return !0;
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = z[e + " "];
                    return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && z(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(e, n, i) {
                    return function(r) {
                        var o = t.attr(r, e);
                        if (null == o) return "!=" === n;
                        if (!n) return !0;
                        o += "";
                        return "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-");
                    };
                },
                CHILD: function(e, t, n, i, r) {
                    var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === i && 0 === r ? function(e) {
                        return !!e.parentNode;
                    } : function(t, n, l) {
                        var u, c, f, d, p, h, m = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !l && !s;
                        if (g) {
                            if (o) {
                                for (;m; ) {
                                    f = t;
                                    for (;f = f[m]; ) if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                                    h = m = "only" === e && !h && "nextSibling";
                                }
                                return !0;
                            }
                            h = [ a ? g.firstChild : g.lastChild ];
                            if (a && v) {
                                c = g[P] || (g[P] = {});
                                u = c[e] || [];
                                p = u[0] === W && u[1];
                                d = u[0] === W && u[2];
                                f = p && g.childNodes[p];
                                for (;f = ++p && f && f[m] || (d = p = 0) || h.pop(); ) if (1 === f.nodeType && ++d && f === t) {
                                    c[e] = [ W, p, d ];
                                    break;
                                }
                            } else if (v && (u = (t[P] || (t[P] = {}))[e]) && u[0] === W) d = u[1]; else for (;f = ++p && f && f[m] || (d = p = 0) || h.pop(); ) if ((s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) && ++d) {
                                v && ((f[P] || (f[P] = {}))[e] = [ W, d ]);
                                if (f === t) break;
                            }
                            d -= r;
                            return d === i || d % i === 0 && d / i >= 0;
                        }
                    };
                },
                PSEUDO: function(e, n) {
                    var r, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    if (o[P]) return o(n);
                    if (o.length > 1) {
                        r = [ e, e, "", n ];
                        return T.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                            for (var i, r = o(e, n), a = r.length; a--; ) {
                                i = te.call(e, r[a]);
                                e[i] = !(t[i] = r[a]);
                            }
                        }) : function(e) {
                            return o(e, 0, r);
                        };
                    }
                    return o;
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [], n = [], r = k(e.replace(le, "$1"));
                    return r[P] ? i(function(e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--; ) (o = a[s]) && (e[s] = !(t[s] = o));
                    }) : function(e, i, o) {
                        t[0] = e;
                        r(t, null, o, n);
                        return !n.pop();
                    };
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0;
                    };
                }),
                contains: i(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1;
                    };
                }),
                lang: i(function(e) {
                    pe.test(e || "") || t.error("unsupported lang: " + e);
                    e = e.replace(we, Te).toLowerCase();
                    return function(t) {
                        var n;
                        do if (n = _ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                            n = n.toLowerCase();
                            return n === e || 0 === n.indexOf(e + "-");
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                    };
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                },
                root: function(e) {
                    return e === q;
                },
                focus: function(e) {
                    return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return e.disabled === !1;
                },
                disabled: function(e) {
                    return e.disabled === !0;
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected;
                },
                selected: function(e) {
                    e.parentNode && e.parentNode.selectedIndex;
                    return e.selected === !0;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(e) {
                    return !T.pseudos.empty(e);
                },
                header: function(e) {
                    return ge.test(e.nodeName);
                },
                input: function(e) {
                    return me.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: u(function() {
                    return [ 0 ];
                }),
                last: u(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: u(function(e, t, n) {
                    return [ n < 0 ? n + t : n ];
                }),
                even: u(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e;
                }),
                odd: u(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e;
                }),
                lt: u(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; --i >= 0; ) e.push(i);
                    return e;
                }),
                gt: u(function(e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                    return e;
                })
            }
        };
        T.pseudos.nth = T.pseudos.eq;
        for (x in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) T.pseudos[x] = s(x);
        for (x in {
            submit: !0,
            reset: !0
        }) T.pseudos[x] = l(x);
        f.prototype = T.filters = T.pseudos;
        T.setFilters = new f();
        E = t.tokenize = function(e, n) {
            var i, r, o, a, s, l, u, c = I[e + " "];
            if (c) return n ? 0 : c.slice(0);
            s = e;
            l = [];
            u = T.preFilter;
            for (;s; ) {
                if (!i || (r = ue.exec(s))) {
                    r && (s = s.slice(r[0].length) || s);
                    l.push(o = []);
                }
                i = !1;
                if (r = ce.exec(s)) {
                    i = r.shift();
                    o.push({
                        value: i,
                        type: r[0].replace(le, " ")
                    });
                    s = s.slice(i.length);
                }
                for (a in T.filter) if ((r = he[a].exec(s)) && (!u[a] || (r = u[a](r)))) {
                    i = r.shift();
                    o.push({
                        value: i,
                        type: a,
                        matches: r
                    });
                    s = s.slice(i.length);
                }
                if (!i) break;
            }
            return n ? s.length : s ? t.error(e) : I(e, l).slice(0);
        };
        k = t.compile = function(e, t) {
            var n, i = [], r = [], o = X[e + " "];
            if (!o) {
                t || (t = E(e));
                n = t.length;
                for (;n--; ) {
                    o = v(t[n]);
                    o[P] ? i.push(o) : r.push(o);
                }
                o = X(e, b(r, i));
                o.selector = e;
            }
            return o;
        };
        S = t.select = function(e, t, n, i) {
            var r, o, a, s, l, u = "function" == typeof e && e, f = !i && E(e = u.selector || e);
            n = n || [];
            if (1 === f.length) {
                o = f[0] = f[0].slice(0);
                if (o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && _ && T.relative[o[1].type]) {
                    t = (T.find.ID(a.matches[0].replace(we, Te), t) || [])[0];
                    if (!t) return n;
                    u && (t = t.parentNode);
                    e = e.slice(o.shift().value.length);
                }
                r = he.needsContext.test(e) ? 0 : o.length;
                for (;r--; ) {
                    a = o[r];
                    if (T.relative[s = a.type]) break;
                    if ((l = T.find[s]) && (i = l(a.matches[0].replace(we, Te), be.test(o[0].type) && c(t.parentNode) || t))) {
                        o.splice(r, 1);
                        e = i.length && d(o);
                        if (!e) {
                            Z.apply(n, i);
                            return n;
                        }
                        break;
                    }
                }
            }
            (u || k(e, f))(i, t, !_, n, be.test(e) && c(t.parentNode) || t);
            return n;
        };
        w.sortStable = P.split("").sort(U).join("") === P;
        w.detectDuplicates = !!D;
        L();
        w.sortDetached = r(function(e) {
            return 1 & e.compareDocumentPosition(H.createElement("div"));
        });
        r(function(e) {
            e.innerHTML = "<a href='#'></a>";
            return "#" === e.firstChild.getAttribute("href");
        }) || o("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        });
        w.attributes && r(function(e) {
            e.innerHTML = "<input/>";
            e.firstChild.setAttribute("value", "");
            return "" === e.firstChild.getAttribute("value");
        }) || o("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        });
        r(function(e) {
            return null == e.getAttribute("disabled");
        }) || o(ne, function(e, t, n) {
            var i;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
        });
        return t;
    }(e);
    re.find = ue;
    re.expr = ue.selectors;
    re.expr[":"] = re.expr.pseudos;
    re.unique = ue.uniqueSort;
    re.text = ue.getText;
    re.isXMLDoc = ue.isXML;
    re.contains = ue.contains;
    var ce = re.expr.match.needsContext, fe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, de = /^.[^:#\[\.,]*$/;
    re.filter = function(e, t, n) {
        var i = t[0];
        n && (e = ":not(" + e + ")");
        return 1 === t.length && 1 === i.nodeType ? re.find.matchesSelector(i, e) ? [ i ] : [] : re.find.matches(e, re.grep(t, function(e) {
            return 1 === e.nodeType;
        }));
    };
    re.fn.extend({
        find: function(e) {
            var t, n = [], i = this, r = i.length;
            if ("string" != typeof e) return this.pushStack(re(e).filter(function() {
                for (t = 0; t < r; t++) if (re.contains(i[t], this)) return !0;
            }));
            for (t = 0; t < r; t++) re.find(e, i[t], n);
            n = this.pushStack(r > 1 ? re.unique(n) : n);
            n.selector = this.selector ? this.selector + " " + e : e;
            return n;
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0));
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && ce.test(e) ? re(e) : e || [], !1).length;
        }
    });
    var pe, he = e.document, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ge = re.fn.init = function(e, t) {
        var n, i;
        if (!e) return this;
        if ("string" == typeof e) {
            n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [ null, e, null ] : me.exec(e);
            if (!n || !n[1] && t) return !t || t.jquery ? (t || pe).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                t = t instanceof re ? t[0] : t;
                re.merge(this, re.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : he, !0));
                if (fe.test(n[1]) && re.isPlainObject(t)) for (n in t) re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this;
            }
            i = he.getElementById(n[2]);
            if (i && i.parentNode) {
                if (i.id !== n[2]) return pe.find(e);
                this.length = 1;
                this[0] = i;
            }
            this.context = he;
            this.selector = e;
            return this;
        }
        if (e.nodeType) {
            this.context = this[0] = e;
            this.length = 1;
            return this;
        }
        if (re.isFunction(e)) return "undefined" != typeof pe.ready ? pe.ready(e) : e(re);
        if (void 0 !== e.selector) {
            this.selector = e.selector;
            this.context = e.context;
        }
        return re.makeArray(e, this);
    };
    ge.prototype = re.fn;
    pe = re(he);
    var ye = /^(?:parents|prev(?:Until|All))/, ve = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    re.extend({
        dir: function(e, t, n) {
            for (var i = [], r = e[t]; r && 9 !== r.nodeType && (void 0 === n || 1 !== r.nodeType || !re(r).is(n)); ) {
                1 === r.nodeType && i.push(r);
                r = r[t];
            }
            return i;
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n;
        }
    });
    re.fn.extend({
        has: function(e) {
            var t, n = re(e, this), i = n.length;
            return this.filter(function() {
                for (t = 0; t < i; t++) if (re.contains(this, n[t])) return !0;
            });
        },
        closest: function(e, t) {
            for (var n, i = 0, r = this.length, o = [], a = ce.test(e) || "string" != typeof e ? re(e, t || this.context) : 0; i < r; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && re.find.matchesSelector(n, e))) {
                o.push(n);
                break;
            }
            return this.pushStack(o.length > 1 ? re.unique(o) : o);
        },
        index: function(e) {
            return e ? "string" == typeof e ? re.inArray(this[0], re(e)) : re.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            return this.pushStack(re.unique(re.merge(this.get(), re(e, t))));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    });
    re.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return re.dir(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return re.dir(e, "parentNode", n);
        },
        next: function(e) {
            return r(e, "nextSibling");
        },
        prev: function(e) {
            return r(e, "previousSibling");
        },
        nextAll: function(e) {
            return re.dir(e, "nextSibling");
        },
        prevAll: function(e) {
            return re.dir(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return re.dir(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return re.dir(e, "previousSibling", n);
        },
        siblings: function(e) {
            return re.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return re.sibling(e.firstChild);
        },
        contents: function(e) {
            return re.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : re.merge([], e.childNodes);
        }
    }, function(e, t) {
        re.fn[e] = function(n, i) {
            var r = re.map(this, t, n);
            "Until" !== e.slice(-5) && (i = n);
            i && "string" == typeof i && (r = re.filter(i, r));
            if (this.length > 1) {
                ve[e] || (r = re.unique(r));
                ye.test(e) && (r = r.reverse());
            }
            return this.pushStack(r);
        };
    });
    var be = /\S+/g, xe = {};
    re.Callbacks = function(e) {
        e = "string" == typeof e ? xe[e] || o(e) : re.extend({}, e);
        var t, n, i, r, a, s, l = [], u = !e.once && [], c = function(o) {
            n = e.memory && o;
            i = !0;
            a = s || 0;
            s = 0;
            r = l.length;
            t = !0;
            for (;l && a < r; a++) if (l[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break;
            }
            t = !1;
            l && (u ? u.length && c(u.shift()) : n ? l = [] : f.disable());
        }, f = {
            add: function() {
                if (l) {
                    var i = l.length;
                    !function o(t) {
                        re.each(t, function(t, n) {
                            var i = re.type(n);
                            "function" === i ? e.unique && f.has(n) || l.push(n) : n && n.length && "string" !== i && o(n);
                        });
                    }(arguments);
                    if (t) r = l.length; else if (n) {
                        s = i;
                        c(n);
                    }
                }
                return this;
            },
            remove: function() {
                l && re.each(arguments, function(e, n) {
                    for (var i; (i = re.inArray(n, l, i)) > -1; ) {
                        l.splice(i, 1);
                        if (t) {
                            i <= r && r--;
                            i <= a && a--;
                        }
                    }
                });
                return this;
            },
            has: function(e) {
                return e ? re.inArray(e, l) > -1 : !(!l || !l.length);
            },
            empty: function() {
                l = [];
                r = 0;
                return this;
            },
            disable: function() {
                l = u = n = void 0;
                return this;
            },
            disabled: function() {
                return !l;
            },
            lock: function() {
                u = void 0;
                n || f.disable();
                return this;
            },
            locked: function() {
                return !u;
            },
            fireWith: function(e, n) {
                if (l && (!i || u)) {
                    n = n || [];
                    n = [ e, n.slice ? n.slice() : n ];
                    t ? u.push(n) : c(n);
                }
                return this;
            },
            fire: function() {
                f.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!i;
            }
        };
        return f;
    };
    re.extend({
        Deferred: function(e) {
            var t = [ [ "resolve", "done", re.Callbacks("once memory"), "resolved" ], [ "reject", "fail", re.Callbacks("once memory"), "rejected" ], [ "notify", "progress", re.Callbacks("memory") ] ], n = "pending", i = {
                state: function() {
                    return n;
                },
                always: function() {
                    r.done(arguments).fail(arguments);
                    return this;
                },
                then: function() {
                    var e = arguments;
                    return re.Deferred(function(n) {
                        re.each(t, function(t, o) {
                            var a = re.isFunction(e[t]) && e[t];
                            r[o[1]](function() {
                                var e = a && a.apply(this, arguments);
                                e && re.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [ e ] : arguments);
                            });
                        });
                        e = null;
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? re.extend(e, i) : i;
                }
            }, r = {};
            i.pipe = i.then;
            re.each(t, function(e, o) {
                var a = o[2], s = o[3];
                i[o[1]] = a.add;
                s && a.add(function() {
                    n = s;
                }, t[1 ^ e][2].disable, t[2][2].lock);
                r[o[0]] = function() {
                    r[o[0] + "With"](this === r ? i : this, arguments);
                    return this;
                };
                r[o[0] + "With"] = a.fireWith;
            });
            i.promise(r);
            e && e.call(r, r);
            return r;
        },
        when: function(e) {
            var t, n, i, r = 0, o = Y.call(arguments), a = o.length, s = 1 !== a || e && re.isFunction(e.promise) ? a : 0, l = 1 === s ? e : re.Deferred(), u = function(e, n, i) {
                return function(r) {
                    n[e] = this;
                    i[e] = arguments.length > 1 ? Y.call(arguments) : r;
                    i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i);
                };
            };
            if (a > 1) {
                t = new Array(a);
                n = new Array(a);
                i = new Array(a);
                for (;r < a; r++) o[r] && re.isFunction(o[r].promise) ? o[r].promise().done(u(r, i, o)).fail(l.reject).progress(u(r, n, t)) : --s;
            }
            s || l.resolveWith(i, o);
            return l.promise();
        }
    });
    var we;
    re.fn.ready = function(e) {
        re.ready.promise().done(e);
        return this;
    };
    re.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? re.readyWait++ : re.ready(!0);
        },
        ready: function(e) {
            if (e === !0 ? !--re.readyWait : !re.isReady) {
                if (!he.body) return setTimeout(re.ready);
                re.isReady = !0;
                if (!(e !== !0 && --re.readyWait > 0)) {
                    we.resolveWith(he, [ re ]);
                    if (re.fn.triggerHandler) {
                        re(he).triggerHandler("ready");
                        re(he).off("ready");
                    }
                }
            }
        }
    });
    re.ready.promise = function(t) {
        if (!we) {
            we = re.Deferred();
            if ("complete" === he.readyState) setTimeout(re.ready); else if (he.addEventListener) {
                he.addEventListener("DOMContentLoaded", s, !1);
                e.addEventListener("load", s, !1);
            } else {
                he.attachEvent("onreadystatechange", s);
                e.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == e.frameElement && he.documentElement;
                } catch (i) {}
                n && n.doScroll && !function r() {
                    if (!re.isReady) {
                        try {
                            n.doScroll("left");
                        } catch (e) {
                            return setTimeout(r, 50);
                        }
                        a();
                        re.ready();
                    }
                }();
            }
        }
        return we.promise(t);
    };
    var Te, Ce = "undefined";
    for (Te in re(ne)) break;
    ne.ownLast = "0" !== Te;
    ne.inlineBlockNeedsLayout = !1;
    re(function() {
        var e, t, n, i;
        n = he.getElementsByTagName("body")[0];
        if (n && n.style) {
            t = he.createElement("div");
            i = he.createElement("div");
            i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            n.appendChild(i).appendChild(t);
            if (typeof t.style.zoom !== Ce) {
                t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
                ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth;
                e && (n.style.zoom = 1);
            }
            n.removeChild(i);
        }
    });
    !function() {
        var e = he.createElement("div");
        if (null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete e.test;
            } catch (t) {
                ne.deleteExpando = !1;
            }
        }
        e = null;
    }();
    re.acceptData = function(e) {
        var t = re.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t);
    };
    var Ne = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Ee = /([A-Z])/g;
    re.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            e = e.nodeType ? re.cache[e[re.expando]] : e[re.expando];
            return !!e && !u(e);
        },
        data: function(e, t, n) {
            return c(e, t, n);
        },
        removeData: function(e, t) {
            return f(e, t);
        },
        _data: function(e, t, n) {
            return c(e, t, n, !0);
        },
        _removeData: function(e, t) {
            return f(e, t, !0);
        }
    });
    re.fn.extend({
        data: function(e, t) {
            var n, i, r, o = this[0], a = o && o.attributes;
            if (void 0 === e) {
                if (this.length) {
                    r = re.data(o);
                    if (1 === o.nodeType && !re._data(o, "parsedAttrs")) {
                        n = a.length;
                        for (;n--; ) if (a[n]) {
                            i = a[n].name;
                            if (0 === i.indexOf("data-")) {
                                i = re.camelCase(i.slice(5));
                                l(o, i, r[i]);
                            }
                        }
                        re._data(o, "parsedAttrs", !0);
                    }
                }
                return r;
            }
            return "object" == typeof e ? this.each(function() {
                re.data(this, e);
            }) : arguments.length > 1 ? this.each(function() {
                re.data(this, e, t);
            }) : o ? l(o, e, re.data(o, e)) : void 0;
        },
        removeData: function(e) {
            return this.each(function() {
                re.removeData(this, e);
            });
        }
    });
    re.extend({
        queue: function(e, t, n) {
            var i;
            if (e) {
                t = (t || "fx") + "queue";
                i = re._data(e, t);
                n && (!i || re.isArray(n) ? i = re._data(e, t, re.makeArray(n)) : i.push(n));
                return i || [];
            }
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = re.queue(e, t), i = n.length, r = n.shift(), o = re._queueHooks(e, t), a = function() {
                re.dequeue(e, t);
            };
            if ("inprogress" === r) {
                r = n.shift();
                i--;
            }
            if (r) {
                "fx" === t && n.unshift("inprogress");
                delete o.stop;
                r.call(e, a, o);
            }
            !i && o && o.empty.fire();
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return re._data(e, n) || re._data(e, n, {
                empty: re.Callbacks("once memory").add(function() {
                    re._removeData(e, t + "queue");
                    re._removeData(e, n);
                })
            });
        }
    });
    re.fn.extend({
        queue: function(e, t) {
            var n = 2;
            if ("string" != typeof e) {
                t = e;
                e = "fx";
                n--;
            }
            return arguments.length < n ? re.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = re.queue(this, e, t);
                re._queueHooks(this, e);
                "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                re.dequeue(this, e);
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, t) {
            var n, i = 1, r = re.Deferred(), o = this, a = this.length, s = function() {
                --i || r.resolveWith(o, [ o ]);
            };
            if ("string" != typeof e) {
                t = e;
                e = void 0;
            }
            e = e || "fx";
            for (;a--; ) {
                n = re._data(o[a], e + "queueHooks");
                if (n && n.empty) {
                    i++;
                    n.empty.add(s);
                }
            }
            s();
            return r.promise(t);
        }
    });
    var ke = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Se = [ "Top", "Right", "Bottom", "Left" ], Ae = function(e, t) {
        e = t || e;
        return "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e);
    }, je = re.access = function(e, t, n, i, r, o, a) {
        var s = 0, l = e.length, u = null == n;
        if ("object" === re.type(n)) {
            r = !0;
            for (s in n) re.access(e, t, s, n[s], !0, o, a);
        } else if (void 0 !== i) {
            r = !0;
            re.isFunction(i) || (a = !0);
            if (u) if (a) {
                t.call(e, i);
                t = null;
            } else {
                u = t;
                t = function(e, t, n) {
                    return u.call(re(e), n);
                };
            }
            if (t) for (;s < l; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
        }
        return r ? e : u ? t.call(e) : l ? t(e[0], n) : o;
    }, De = /^(?:checkbox|radio)$/i;
    !function() {
        var e = he.createElement("input"), t = he.createElement("div"), n = he.createDocumentFragment();
        t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        ne.leadingWhitespace = 3 === t.firstChild.nodeType;
        ne.tbody = !t.getElementsByTagName("tbody").length;
        ne.htmlSerialize = !!t.getElementsByTagName("link").length;
        ne.html5Clone = "<:nav></:nav>" !== he.createElement("nav").cloneNode(!0).outerHTML;
        e.type = "checkbox";
        e.checked = !0;
        n.appendChild(e);
        ne.appendChecked = e.checked;
        t.innerHTML = "<textarea>x</textarea>";
        ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
        n.appendChild(t);
        t.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked;
        ne.noCloneEvent = !0;
        if (t.attachEvent) {
            t.attachEvent("onclick", function() {
                ne.noCloneEvent = !1;
            });
            t.cloneNode(!0).click();
        }
        if (null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test;
            } catch (i) {
                ne.deleteExpando = !1;
            }
        }
    }();
    !function() {
        var t, n, i = he.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        }) {
            n = "on" + t;
            if (!(ne[t + "Bubbles"] = n in e)) {
                i.setAttribute(n, "t");
                ne[t + "Bubbles"] = i.attributes[n].expando === !1;
            }
        }
        i = null;
    }();
    var Le = /^(?:input|select|textarea)$/i, He = /^key/, qe = /^(?:mouse|pointer|contextmenu)|click/, _e = /^(?:focusinfocus|focusoutblur)$/, Me = /^([^.]*)(?:\.(.+)|)$/;
    re.event = {
        global: {},
        add: function(e, t, n, i, r) {
            var o, a, s, l, u, c, f, d, p, h, m, g = re._data(e);
            if (g) {
                if (n.handler) {
                    l = n;
                    n = l.handler;
                    r = l.selector;
                }
                n.guid || (n.guid = re.guid++);
                (a = g.events) || (a = g.events = {});
                if (!(c = g.handle)) {
                    c = g.handle = function(e) {
                        return typeof re === Ce || e && re.event.triggered === e.type ? void 0 : re.event.dispatch.apply(c.elem, arguments);
                    };
                    c.elem = e;
                }
                t = (t || "").match(be) || [ "" ];
                s = t.length;
                for (;s--; ) {
                    o = Me.exec(t[s]) || [];
                    p = m = o[1];
                    h = (o[2] || "").split(".").sort();
                    if (p) {
                        u = re.event.special[p] || {};
                        p = (r ? u.delegateType : u.bindType) || p;
                        u = re.event.special[p] || {};
                        f = re.extend({
                            type: p,
                            origType: m,
                            data: i,
                            handler: n,
                            guid: n.guid,
                            selector: r,
                            needsContext: r && re.expr.match.needsContext.test(r),
                            namespace: h.join(".")
                        }, l);
                        if (!(d = a[p])) {
                            d = a[p] = [];
                            d.delegateCount = 0;
                            u.setup && u.setup.call(e, i, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c));
                        }
                        if (u.add) {
                            u.add.call(e, f);
                            f.handler.guid || (f.handler.guid = n.guid);
                        }
                        r ? d.splice(d.delegateCount++, 0, f) : d.push(f);
                        re.event.global[p] = !0;
                    }
                }
                e = null;
            }
        },
        remove: function(e, t, n, i, r) {
            var o, a, s, l, u, c, f, d, p, h, m, g = re.hasData(e) && re._data(e);
            if (g && (c = g.events)) {
                t = (t || "").match(be) || [ "" ];
                u = t.length;
                for (;u--; ) {
                    s = Me.exec(t[u]) || [];
                    p = m = s[1];
                    h = (s[2] || "").split(".").sort();
                    if (p) {
                        f = re.event.special[p] || {};
                        p = (i ? f.delegateType : f.bindType) || p;
                        d = c[p] || [];
                        s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        l = o = d.length;
                        for (;o--; ) {
                            a = d[o];
                            if ((r || m === a.origType) && (!n || n.guid === a.guid) && (!s || s.test(a.namespace)) && (!i || i === a.selector || "**" === i && a.selector)) {
                                d.splice(o, 1);
                                a.selector && d.delegateCount--;
                                f.remove && f.remove.call(e, a);
                            }
                        }
                        if (l && !d.length) {
                            f.teardown && f.teardown.call(e, h, g.handle) !== !1 || re.removeEvent(e, p, g.handle);
                            delete c[p];
                        }
                    } else for (p in c) re.event.remove(e, p + t[u], n, i, !0);
                }
                if (re.isEmptyObject(c)) {
                    delete g.handle;
                    re._removeData(e, "events");
                }
            }
        },
        trigger: function(t, n, i, r) {
            var o, a, s, l, u, c, f, d = [ i || he ], p = te.call(t, "type") ? t.type : t, h = te.call(t, "namespace") ? t.namespace.split(".") : [];
            s = c = i = i || he;
            if (3 !== i.nodeType && 8 !== i.nodeType && !_e.test(p + re.event.triggered)) {
                if (p.indexOf(".") >= 0) {
                    h = p.split(".");
                    p = h.shift();
                    h.sort();
                }
                a = p.indexOf(":") < 0 && "on" + p;
                t = t[re.expando] ? t : new re.Event(p, "object" == typeof t && t);
                t.isTrigger = r ? 2 : 3;
                t.namespace = h.join(".");
                t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                t.result = void 0;
                t.target || (t.target = i);
                n = null == n ? [ t ] : re.makeArray(n, [ t ]);
                u = re.event.special[p] || {};
                if (r || !u.trigger || u.trigger.apply(i, n) !== !1) {
                    if (!r && !u.noBubble && !re.isWindow(i)) {
                        l = u.delegateType || p;
                        _e.test(l + p) || (s = s.parentNode);
                        for (;s; s = s.parentNode) {
                            d.push(s);
                            c = s;
                        }
                        c === (i.ownerDocument || he) && d.push(c.defaultView || c.parentWindow || e);
                    }
                    f = 0;
                    for (;(s = d[f++]) && !t.isPropagationStopped(); ) {
                        t.type = f > 1 ? l : u.bindType || p;
                        o = (re._data(s, "events") || {})[t.type] && re._data(s, "handle");
                        o && o.apply(s, n);
                        o = a && s[a];
                        if (o && o.apply && re.acceptData(s)) {
                            t.result = o.apply(s, n);
                            t.result === !1 && t.preventDefault();
                        }
                    }
                    t.type = p;
                    if (!r && !t.isDefaultPrevented() && (!u._default || u._default.apply(d.pop(), n) === !1) && re.acceptData(i) && a && i[p] && !re.isWindow(i)) {
                        c = i[a];
                        c && (i[a] = null);
                        re.event.triggered = p;
                        try {
                            i[p]();
                        } catch (m) {}
                        re.event.triggered = void 0;
                        c && (i[a] = c);
                    }
                    return t.result;
                }
            }
        },
        dispatch: function(e) {
            e = re.event.fix(e);
            var t, n, i, r, o, a = [], s = Y.call(arguments), l = (re._data(this, "events") || {})[e.type] || [], u = re.event.special[e.type] || {};
            s[0] = e;
            e.delegateTarget = this;
            if (!u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                a = re.event.handlers.call(this, e, l);
                t = 0;
                for (;(r = a[t++]) && !e.isPropagationStopped(); ) {
                    e.currentTarget = r.elem;
                    o = 0;
                    for (;(i = r.handlers[o++]) && !e.isImmediatePropagationStopped(); ) if (!e.namespace_re || e.namespace_re.test(i.namespace)) {
                        e.handleObj = i;
                        e.data = i.data;
                        n = ((re.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s);
                        if (void 0 !== n && (e.result = n) === !1) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                }
                u.postDispatch && u.postDispatch.call(this, e);
                return e.result;
            }
        },
        handlers: function(e, t) {
            var n, i, r, o, a = [], s = t.delegateCount, l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type)) for (;l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                r = [];
                for (o = 0; o < s; o++) {
                    i = t[o];
                    n = i.selector + " ";
                    void 0 === r[n] && (r[n] = i.needsContext ? re(n, this).index(l) >= 0 : re.find(n, this, null, [ l ]).length);
                    r[n] && r.push(i);
                }
                r.length && a.push({
                    elem: l,
                    handlers: r
                });
            }
            s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            });
            return a;
        },
        fix: function(e) {
            if (e[re.expando]) return e;
            var t, n, i, r = e.type, o = e, a = this.fixHooks[r];
            a || (this.fixHooks[r] = a = qe.test(r) ? this.mouseHooks : He.test(r) ? this.keyHooks : {});
            i = a.props ? this.props.concat(a.props) : this.props;
            e = new re.Event(o);
            t = i.length;
            for (;t--; ) {
                n = i[t];
                e[n] = o[n];
            }
            e.target || (e.target = o.srcElement || he);
            3 === e.target.nodeType && (e.target = e.target.parentNode);
            e.metaKey = !!e.metaKey;
            return a.filter ? a.filter(e, o) : e;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode);
                return e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, r, o = t.button, a = t.fromElement;
                if (null == e.pageX && null != t.clientX) {
                    i = e.target.ownerDocument || he;
                    r = i.documentElement;
                    n = i.body;
                    e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0);
                    e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0);
                }
                !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a);
                e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0);
                return e;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== h() && this.focus) try {
                        this.focus();
                        return !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === h() && this.blur) {
                        this.blur();
                        return !1;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (re.nodeName(this, "input") && "checkbox" === this.type && this.click) {
                        this.click();
                        return !1;
                    }
                },
                _default: function(e) {
                    return re.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                }
            }
        },
        simulate: function(e, t, n, i) {
            var r = re.extend(new re.Event(), n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            i ? re.event.trigger(r, null, t) : re.event.dispatch.call(t, r);
            r.isDefaultPrevented() && n.preventDefault();
        }
    };
    re.removeEvent = he.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1);
    } : function(e, t, n) {
        var i = "on" + t;
        if (e.detachEvent) {
            typeof e[i] === Ce && (e[i] = null);
            e.detachEvent(i, n);
        }
    };
    re.Event = function(e, t) {
        if (!(this instanceof re.Event)) return new re.Event(e, t);
        if (e && e.type) {
            this.originalEvent = e;
            this.type = e.type;
            this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? d : p;
        } else this.type = e;
        t && re.extend(this, t);
        this.timeStamp = e && e.timeStamp || re.now();
        this[re.expando] = !0;
    };
    re.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = d;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = d;
            if (e) {
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble = !0;
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = d;
            e && e.stopImmediatePropagation && e.stopImmediatePropagation();
            this.stopPropagation();
        }
    };
    re.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        re.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this, r = e.relatedTarget, o = e.handleObj;
                if (!r || r !== i && !re.contains(i, r)) {
                    e.type = o.origType;
                    n = o.handler.apply(this, arguments);
                    e.type = t;
                }
                return n;
            }
        };
    });
    ne.submitBubbles || (re.event.special.submit = {
        setup: function() {
            if (re.nodeName(this, "form")) return !1;
            re.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target, n = re.nodeName(t, "input") || re.nodeName(t, "button") ? t.form : void 0;
                if (n && !re._data(n, "submitBubbles")) {
                    re.event.add(n, "submit._submit", function(e) {
                        e._submit_bubble = !0;
                    });
                    re._data(n, "submitBubbles", !0);
                }
            });
        },
        postDispatch: function(e) {
            if (e._submit_bubble) {
                delete e._submit_bubble;
                this.parentNode && !e.isTrigger && re.event.simulate("submit", this.parentNode, e, !0);
            }
        },
        teardown: function() {
            if (re.nodeName(this, "form")) return !1;
            re.event.remove(this, "._submit");
        }
    });
    ne.changeBubbles || (re.event.special.change = {
        setup: function() {
            if (Le.test(this.nodeName)) {
                if ("checkbox" === this.type || "radio" === this.type) {
                    re.event.add(this, "propertychange._change", function(e) {
                        "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
                    });
                    re.event.add(this, "click._change", function(e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1);
                        re.event.simulate("change", this, e, !0);
                    });
                }
                return !1;
            }
            re.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                if (Le.test(t.nodeName) && !re._data(t, "changeBubbles")) {
                    re.event.add(t, "change._change", function(e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || re.event.simulate("change", this.parentNode, e, !0);
                    });
                    re._data(t, "changeBubbles", !0);
                }
            });
        },
        handle: function(e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments);
        },
        teardown: function() {
            re.event.remove(this, "._change");
            return !Le.test(this.nodeName);
        }
    });
    ne.focusinBubbles || re.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            re.event.simulate(t, e.target, re.event.fix(e), !0);
        };
        re.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this, r = re._data(i, t);
                r || i.addEventListener(e, n, !0);
                re._data(i, t, (r || 0) + 1);
            },
            teardown: function() {
                var i = this.ownerDocument || this, r = re._data(i, t) - 1;
                if (r) re._data(i, t, r); else {
                    i.removeEventListener(e, n, !0);
                    re._removeData(i, t);
                }
            }
        };
    });
    re.fn.extend({
        on: function(e, t, n, i, r) {
            var o, a;
            if ("object" == typeof e) {
                if ("string" != typeof t) {
                    n = n || t;
                    t = void 0;
                }
                for (o in e) this.on(o, t, n, e[o], r);
                return this;
            }
            if (null == n && null == i) {
                i = t;
                n = t = void 0;
            } else if (null == i) if ("string" == typeof t) {
                i = n;
                n = void 0;
            } else {
                i = n;
                n = t;
                t = void 0;
            }
            if (i === !1) i = p; else if (!i) return this;
            if (1 === r) {
                a = i;
                i = function(e) {
                    re().off(e);
                    return a.apply(this, arguments);
                };
                i.guid = a.guid || (a.guid = re.guid++);
            }
            return this.each(function() {
                re.event.add(this, e, i, n, t);
            });
        },
        one: function(e, t, n, i) {
            return this.on(e, t, n, i, 1);
        },
        off: function(e, t, n) {
            var i, r;
            if (e && e.preventDefault && e.handleObj) {
                i = e.handleObj;
                re(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                return this;
            }
            if ("object" == typeof e) {
                for (r in e) this.off(r, t, e[r]);
                return this;
            }
            if (t === !1 || "function" == typeof t) {
                n = t;
                t = void 0;
            }
            n === !1 && (n = p);
            return this.each(function() {
                re.event.remove(this, e, n, t);
            });
        },
        trigger: function(e, t) {
            return this.each(function() {
                re.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return re.event.trigger(e, t, n, !0);
        }
    });
    var Fe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Oe = / jQuery\d+="(?:null|\d+)"/g, Be = new RegExp("<(?:" + Fe + ")[\\s/>]", "i"), Pe = /^\s+/, Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, We = /<([\w:]+)/, $e = /<tbody/i, ze = /<|&#?\w+;/, Ie = /<(?:script|style|link)/i, Xe = /checked\s*(?:[^=]|=\s*.checked.)/i, Ue = /^$|\/(?:java|ecma)script/i, Ve = /^true\/(.*)/, Je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ye = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: ne.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, Ge = m(he), Qe = Ge.appendChild(he.createElement("div"));
    Ye.optgroup = Ye.option;
    Ye.tbody = Ye.tfoot = Ye.colgroup = Ye.caption = Ye.thead;
    Ye.th = Ye.td;
    re.extend({
        clone: function(e, t, n) {
            var i, r, o, a, s, l = re.contains(e.ownerDocument, e);
            if (ne.html5Clone || re.isXMLDoc(e) || !Be.test("<" + e.nodeName + ">")) o = e.cloneNode(!0); else {
                Qe.innerHTML = e.outerHTML;
                Qe.removeChild(o = Qe.firstChild);
            }
            if (!(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || re.isXMLDoc(e))) {
                i = g(o);
                s = g(e);
                for (a = 0; null != (r = s[a]); ++a) i[a] && C(r, i[a]);
            }
            if (t) if (n) {
                s = s || g(e);
                i = i || g(o);
                for (a = 0; null != (r = s[a]); a++) T(r, i[a]);
            } else T(e, o);
            i = g(o, "script");
            i.length > 0 && w(i, !l && g(e, "script"));
            i = s = r = null;
            return o;
        },
        buildFragment: function(e, t, n, i) {
            for (var r, o, a, s, l, u, c, f = e.length, d = m(t), p = [], h = 0; h < f; h++) {
                o = e[h];
                if (o || 0 === o) if ("object" === re.type(o)) re.merge(p, o.nodeType ? [ o ] : o); else if (ze.test(o)) {
                    s = s || d.appendChild(t.createElement("div"));
                    l = (We.exec(o) || [ "", "" ])[1].toLowerCase();
                    c = Ye[l] || Ye._default;
                    s.innerHTML = c[1] + o.replace(Re, "<$1></$2>") + c[2];
                    r = c[0];
                    for (;r--; ) s = s.lastChild;
                    !ne.leadingWhitespace && Pe.test(o) && p.push(t.createTextNode(Pe.exec(o)[0]));
                    if (!ne.tbody) {
                        o = "table" !== l || $e.test(o) ? "<table>" !== c[1] || $e.test(o) ? 0 : s : s.firstChild;
                        r = o && o.childNodes.length;
                        for (;r--; ) re.nodeName(u = o.childNodes[r], "tbody") && !u.childNodes.length && o.removeChild(u);
                    }
                    re.merge(p, s.childNodes);
                    s.textContent = "";
                    for (;s.firstChild; ) s.removeChild(s.firstChild);
                    s = d.lastChild;
                } else p.push(t.createTextNode(o));
            }
            s && d.removeChild(s);
            ne.appendChecked || re.grep(g(p, "input"), y);
            h = 0;
            for (;o = p[h++]; ) if (!i || re.inArray(o, i) === -1) {
                a = re.contains(o.ownerDocument, o);
                s = g(d.appendChild(o), "script");
                a && w(s);
                if (n) {
                    r = 0;
                    for (;o = s[r++]; ) Ue.test(o.type || "") && n.push(o);
                }
            }
            s = null;
            return d;
        },
        cleanData: function(e, t) {
            for (var n, i, r, o, a = 0, s = re.expando, l = re.cache, u = ne.deleteExpando, c = re.event.special; null != (n = e[a]); a++) if (t || re.acceptData(n)) {
                r = n[s];
                o = r && l[r];
                if (o) {
                    if (o.events) for (i in o.events) c[i] ? re.event.remove(n, i) : re.removeEvent(n, i, o.handle);
                    if (l[r]) {
                        delete l[r];
                        u ? delete n[s] : typeof n.removeAttribute !== Ce ? n.removeAttribute(s) : n[s] = null;
                        J.push(r);
                    }
                }
            }
        }
    });
    re.fn.extend({
        text: function(e) {
            return je(this, function(e) {
                return void 0 === e ? re.text(this) : this.empty().append((this[0] && this[0].ownerDocument || he).createTextNode(e));
            }, null, e, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.appendChild(e);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        remove: function(e, t) {
            for (var n, i = e ? re.filter(e, this) : this, r = 0; null != (n = i[r]); r++) {
                t || 1 !== n.nodeType || re.cleanData(g(n));
                if (n.parentNode) {
                    t && re.contains(n.ownerDocument, n) && w(g(n, "script"));
                    n.parentNode.removeChild(n);
                }
            }
            return this;
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                1 === e.nodeType && re.cleanData(g(e, !1));
                for (;e.firstChild; ) e.removeChild(e.firstChild);
                e.options && re.nodeName(e, "select") && (e.options.length = 0);
            }
            return this;
        },
        clone: function(e, t) {
            e = null != e && e;
            t = null == t ? e : t;
            return this.map(function() {
                return re.clone(this, e, t);
            });
        },
        html: function(e) {
            return je(this, function(e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Oe, "") : void 0;
                if ("string" == typeof e && !Ie.test(e) && (ne.htmlSerialize || !Be.test(e)) && (ne.leadingWhitespace || !Pe.test(e)) && !Ye[(We.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                    e = e.replace(Re, "<$1></$2>");
                    try {
                        for (;n < i; n++) {
                            t = this[n] || {};
                            if (1 === t.nodeType) {
                                re.cleanData(g(t, !1));
                                t.innerHTML = e;
                            }
                        }
                        t = 0;
                    } catch (r) {}
                }
                t && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var e = arguments[0];
            this.domManip(arguments, function(t) {
                e = this.parentNode;
                re.cleanData(g(this));
                e && e.replaceChild(t, this);
            });
            return e && (e.length || e.nodeType) ? this : this.remove();
        },
        detach: function(e) {
            return this.remove(e, !0);
        },
        domManip: function(e, t) {
            e = G.apply([], e);
            var n, i, r, o, a, s, l = 0, u = this.length, c = this, f = u - 1, d = e[0], p = re.isFunction(d);
            if (p || u > 1 && "string" == typeof d && !ne.checkClone && Xe.test(d)) return this.each(function(n) {
                var i = c.eq(n);
                p && (e[0] = d.call(this, n, i.html()));
                i.domManip(e, t);
            });
            if (u) {
                s = re.buildFragment(e, this[0].ownerDocument, !1, this);
                n = s.firstChild;
                1 === s.childNodes.length && (s = n);
                if (n) {
                    o = re.map(g(s, "script"), b);
                    r = o.length;
                    for (;l < u; l++) {
                        i = s;
                        if (l !== f) {
                            i = re.clone(i, !0, !0);
                            r && re.merge(o, g(i, "script"));
                        }
                        t.call(this[l], i, l);
                    }
                    if (r) {
                        a = o[o.length - 1].ownerDocument;
                        re.map(o, x);
                        for (l = 0; l < r; l++) {
                            i = o[l];
                            Ue.test(i.type || "") && !re._data(i, "globalEval") && re.contains(a, i) && (i.src ? re._evalUrl && re._evalUrl(i.src) : re.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Je, "")));
                        }
                    }
                    s = n = null;
                }
            }
            return this;
        }
    });
    re.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        re.fn[e] = function(e) {
            for (var n, i = 0, r = [], o = re(e), a = o.length - 1; i <= a; i++) {
                n = i === a ? this : this.clone(!0);
                re(o[i])[t](n);
                Q.apply(r, n.get());
            }
            return this.pushStack(r);
        };
    });
    var Ke, Ze = {};
    !function() {
        var e;
        ne.shrinkWrapBlocks = function() {
            if (null != e) return e;
            e = !1;
            var t, n, i;
            n = he.getElementsByTagName("body")[0];
            if (n && n.style) {
                t = he.createElement("div");
                i = he.createElement("div");
                i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                n.appendChild(i).appendChild(t);
                if (typeof t.style.zoom !== Ce) {
                    t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1";
                    t.appendChild(he.createElement("div")).style.width = "5px";
                    e = 3 !== t.offsetWidth;
                }
                n.removeChild(i);
                return e;
            }
        };
    }();
    var et, tt, nt = /^margin/, it = new RegExp("^(" + ke + ")(?!px)[a-z%]+$", "i"), rt = /^(top|right|bottom|left)$/;
    if (e.getComputedStyle) {
        et = function(e) {
            return e.ownerDocument.defaultView.getComputedStyle(e, null);
        };
        tt = function(e, t, n) {
            var i, r, o, a, s = e.style;
            n = n || et(e);
            a = n ? n.getPropertyValue(t) || n[t] : void 0;
            if (n) {
                "" !== a || re.contains(e.ownerDocument, e) || (a = re.style(e, t));
                if (it.test(a) && nt.test(t)) {
                    i = s.width;
                    r = s.minWidth;
                    o = s.maxWidth;
                    s.minWidth = s.maxWidth = s.width = a;
                    a = n.width;
                    s.width = i;
                    s.minWidth = r;
                    s.maxWidth = o;
                }
            }
            return void 0 === a ? a : a + "";
        };
    } else if (he.documentElement.currentStyle) {
        et = function(e) {
            return e.currentStyle;
        };
        tt = function(e, t, n) {
            var i, r, o, a, s = e.style;
            n = n || et(e);
            a = n ? n[t] : void 0;
            null == a && s && s[t] && (a = s[t]);
            if (it.test(a) && !rt.test(t)) {
                i = s.left;
                r = e.runtimeStyle;
                o = r && r.left;
                o && (r.left = e.currentStyle.left);
                s.left = "fontSize" === t ? "1em" : a;
                a = s.pixelLeft + "px";
                s.left = i;
                o && (r.left = o);
            }
            return void 0 === a ? a : a + "" || "auto";
        };
    }
    !function() {
        function t() {
            var t, n, i, r;
            n = he.getElementsByTagName("body")[0];
            if (n && n.style) {
                t = he.createElement("div");
                i = he.createElement("div");
                i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
                n.appendChild(i).appendChild(t);
                t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
                o = a = !1;
                l = !0;
                if (e.getComputedStyle) {
                    o = "1%" !== (e.getComputedStyle(t, null) || {}).top;
                    a = "4px" === (e.getComputedStyle(t, null) || {
                        width: "4px"
                    }).width;
                    r = t.appendChild(he.createElement("div"));
                    r.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    r.style.marginRight = r.style.width = "0";
                    t.style.width = "1px";
                    l = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight);
                }
                t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                r = t.getElementsByTagName("td");
                r[0].style.cssText = "margin:0;border:0;padding:0;display:none";
                s = 0 === r[0].offsetHeight;
                if (s) {
                    r[0].style.display = "";
                    r[1].style.display = "none";
                    s = 0 === r[0].offsetHeight;
                }
                n.removeChild(i);
            }
        }
        var n, i, r, o, a, s, l;
        n = he.createElement("div");
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        r = n.getElementsByTagName("a")[0];
        i = r && r.style;
        if (i) {
            i.cssText = "float:left;opacity:.5";
            ne.opacity = "0.5" === i.opacity;
            ne.cssFloat = !!i.cssFloat;
            n.style.backgroundClip = "content-box";
            n.cloneNode(!0).style.backgroundClip = "";
            ne.clearCloneStyle = "content-box" === n.style.backgroundClip;
            ne.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing;
            re.extend(ne, {
                reliableHiddenOffsets: function() {
                    null == s && t();
                    return s;
                },
                boxSizingReliable: function() {
                    null == a && t();
                    return a;
                },
                pixelPosition: function() {
                    null == o && t();
                    return o;
                },
                reliableMarginRight: function() {
                    null == l && t();
                    return l;
                }
            });
        }
    }();
    re.swap = function(e, t, n, i) {
        var r, o, a = {};
        for (o in t) {
            a[o] = e.style[o];
            e.style[o] = t[o];
        }
        r = n.apply(e, i || []);
        for (o in t) e.style[o] = a[o];
        return r;
    };
    var ot = /alpha\([^)]*\)/i, at = /opacity\s*=\s*([^)]*)/, st = /^(none|table(?!-c[ea]).+)/, lt = new RegExp("^(" + ke + ")(.*)$", "i"), ut = new RegExp("^([+-])=(" + ke + ")", "i"), ct = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, ft = {
        letterSpacing: "0",
        fontWeight: "400"
    }, dt = [ "Webkit", "O", "Moz", "ms" ];
    re.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = tt(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ne.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, o, a, s = re.camelCase(t), l = e.style;
                t = re.cssProps[s] || (re.cssProps[s] = S(l, s));
                a = re.cssHooks[t] || re.cssHooks[s];
                if (void 0 === n) return a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : l[t];
                o = typeof n;
                if ("string" === o && (r = ut.exec(n))) {
                    n = (r[1] + 1) * r[2] + parseFloat(re.css(e, t));
                    o = "number";
                }
                if (null != n && n === n) {
                    "number" !== o || re.cssNumber[s] || (n += "px");
                    ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit");
                    if (!(a && "set" in a && void 0 === (n = a.set(e, n, i)))) try {
                        l[t] = n;
                    } catch (u) {}
                }
            }
        },
        css: function(e, t, n, i) {
            var r, o, a, s = re.camelCase(t);
            t = re.cssProps[s] || (re.cssProps[s] = S(e.style, s));
            a = re.cssHooks[t] || re.cssHooks[s];
            a && "get" in a && (o = a.get(e, !0, n));
            void 0 === o && (o = tt(e, t, i));
            "normal" === o && t in ft && (o = ft[t]);
            if ("" === n || n) {
                r = parseFloat(o);
                return n === !0 || re.isNumeric(r) ? r || 0 : o;
            }
            return o;
        }
    });
    re.each([ "height", "width" ], function(e, t) {
        re.cssHooks[t] = {
            get: function(e, n, i) {
                if (n) return st.test(re.css(e, "display")) && 0 === e.offsetWidth ? re.swap(e, ct, function() {
                    return L(e, t, i);
                }) : L(e, t, i);
            },
            set: function(e, n, i) {
                var r = i && et(e);
                return j(e, n, i ? D(e, t, i, ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, r), r) : 0);
            }
        };
    });
    ne.opacity || (re.cssHooks.opacity = {
        get: function(e, t) {
            return at.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
        },
        set: function(e, t) {
            var n = e.style, i = e.currentStyle, r = re.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = i && i.filter || n.filter || "";
            n.zoom = 1;
            if ((t >= 1 || "" === t) && "" === re.trim(o.replace(ot, "")) && n.removeAttribute) {
                n.removeAttribute("filter");
                if ("" === t || i && !i.filter) return;
            }
            n.filter = ot.test(o) ? o.replace(ot, r) : o + " " + r;
        }
    });
    re.cssHooks.marginRight = k(ne.reliableMarginRight, function(e, t) {
        if (t) return re.swap(e, {
            display: "inline-block"
        }, tt, [ e, "marginRight" ]);
    });
    re.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        re.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [ n ]; i < 4; i++) r[e + Se[i] + t] = o[i] || o[i - 2] || o[0];
                return r;
            }
        };
        nt.test(e) || (re.cssHooks[e + t].set = j);
    });
    re.fn.extend({
        css: function(e, t) {
            return je(this, function(e, t, n) {
                var i, r, o = {}, a = 0;
                if (re.isArray(t)) {
                    i = et(e);
                    r = t.length;
                    for (;a < r; a++) o[t[a]] = re.css(e, t[a], !1, i);
                    return o;
                }
                return void 0 !== n ? re.style(e, t, n) : re.css(e, t);
            }, e, t, arguments.length > 1);
        },
        show: function() {
            return A(this, !0);
        },
        hide: function() {
            return A(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Ae(this) ? re(this).show() : re(this).hide();
            });
        }
    });
    re.Tween = H;
    H.prototype = {
        constructor: H,
        init: function(e, t, n, i, r, o) {
            this.elem = e;
            this.prop = n;
            this.easing = r || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = i;
            this.unit = o || (re.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = H.propHooks[this.prop];
            return e && e.get ? e.get(this) : H.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = H.propHooks[this.prop];
            this.options.duration ? this.pos = t = re.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e;
            this.now = (this.end - this.start) * t + this.start;
            this.options.step && this.options.step.call(this.elem, this.now, this);
            n && n.set ? n.set(this) : H.propHooks._default.set(this);
            return this;
        }
    };
    H.prototype.init.prototype = H.prototype;
    H.propHooks = {
        _default: {
            get: function(e) {
                var t;
                if (null != e.elem[e.prop] && (!e.elem.style || null == e.elem.style[e.prop])) return e.elem[e.prop];
                t = re.css(e.elem, e.prop, "");
                return t && "auto" !== t ? t : 0;
            },
            set: function(e) {
                re.fx.step[e.prop] ? re.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[re.cssProps[e.prop]] || re.cssHooks[e.prop]) ? re.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    };
    H.propHooks.scrollTop = H.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    };
    re.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }
    };
    re.fx = H.prototype.init;
    re.fx.step = {};
    var pt, ht, mt = /^(?:toggle|show|hide)$/, gt = new RegExp("^(?:([+-])=|)(" + ke + ")([a-z%]*)$", "i"), yt = /queueHooks$/, vt = [ F ], bt = {
        "*": [ function(e, t) {
            var n = this.createTween(e, t), i = n.cur(), r = gt.exec(t), o = r && r[3] || (re.cssNumber[e] ? "" : "px"), a = (re.cssNumber[e] || "px" !== o && +i) && gt.exec(re.css(n.elem, e)), s = 1, l = 20;
            if (a && a[3] !== o) {
                o = o || a[3];
                r = r || [];
                a = +i || 1;
                do {
                    s = s || ".5";
                    a /= s;
                    re.style(n.elem, e, a + o);
                } while (s !== (s = n.cur() / i) && 1 !== s && --l);
            }
            if (r) {
                a = n.start = +a || +i || 0;
                n.unit = o;
                n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2];
            }
            return n;
        } ]
    };
    re.Animation = re.extend(B, {
        tweener: function(e, t) {
            if (re.isFunction(e)) {
                t = e;
                e = [ "*" ];
            } else e = e.split(" ");
            for (var n, i = 0, r = e.length; i < r; i++) {
                n = e[i];
                bt[n] = bt[n] || [];
                bt[n].unshift(t);
            }
        },
        prefilter: function(e, t) {
            t ? vt.unshift(e) : vt.push(e);
        }
    });
    re.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? re.extend({}, e) : {
            complete: n || !n && t || re.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !re.isFunction(t) && t
        };
        i.duration = re.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in re.fx.speeds ? re.fx.speeds[i.duration] : re.fx.speeds._default;
        null != i.queue && i.queue !== !0 || (i.queue = "fx");
        i.old = i.complete;
        i.complete = function() {
            re.isFunction(i.old) && i.old.call(this);
            i.queue && re.dequeue(this, i.queue);
        };
        return i;
    };
    re.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(Ae).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i);
        },
        animate: function(e, t, n, i) {
            var r = re.isEmptyObject(e), o = re.speed(t, n, i), a = function() {
                var t = B(this, re.extend({}, e), o);
                (r || re._data(this, "finish")) && t.stop(!0);
            };
            a.finish = a;
            return r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a);
        },
        stop: function(e, t, n) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop;
                t(n);
            };
            if ("string" != typeof e) {
                n = t;
                t = e;
                e = void 0;
            }
            t && e !== !1 && this.queue(e || "fx", []);
            return this.each(function() {
                var t = !0, r = null != e && e + "queueHooks", o = re.timers, a = re._data(this);
                if (r) a[r] && a[r].stop && i(a[r]); else for (r in a) a[r] && a[r].stop && yt.test(r) && i(a[r]);
                for (r = o.length; r--; ) if (o[r].elem === this && (null == e || o[r].queue === e)) {
                    o[r].anim.stop(n);
                    t = !1;
                    o.splice(r, 1);
                }
                !t && n || re.dequeue(this, e);
            });
        },
        finish: function(e) {
            e !== !1 && (e = e || "fx");
            return this.each(function() {
                var t, n = re._data(this), i = n[e + "queue"], r = n[e + "queueHooks"], o = re.timers, a = i ? i.length : 0;
                n.finish = !0;
                re.queue(this, e, []);
                r && r.stop && r.stop.call(this, !0);
                for (t = o.length; t--; ) if (o[t].elem === this && o[t].queue === e) {
                    o[t].anim.stop(!0);
                    o.splice(t, 1);
                }
                for (t = 0; t < a; t++) i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish;
            });
        }
    });
    re.each([ "toggle", "show", "hide" ], function(e, t) {
        var n = re.fn[t];
        re.fn[t] = function(e, i, r) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(_(t, !0), e, i, r);
        };
    });
    re.each({
        slideDown: _("show"),
        slideUp: _("hide"),
        slideToggle: _("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        re.fn[e] = function(e, n, i) {
            return this.animate(t, e, n, i);
        };
    });
    re.timers = [];
    re.fx.tick = function() {
        var e, t = re.timers, n = 0;
        pt = re.now();
        for (;n < t.length; n++) {
            e = t[n];
            e() || t[n] !== e || t.splice(n--, 1);
        }
        t.length || re.fx.stop();
        pt = void 0;
    };
    re.fx.timer = function(e) {
        re.timers.push(e);
        e() ? re.fx.start() : re.timers.pop();
    };
    re.fx.interval = 13;
    re.fx.start = function() {
        ht || (ht = setInterval(re.fx.tick, re.fx.interval));
    };
    re.fx.stop = function() {
        clearInterval(ht);
        ht = null;
    };
    re.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    re.fn.delay = function(e, t) {
        e = re.fx ? re.fx.speeds[e] || e : e;
        t = t || "fx";
        return this.queue(t, function(t, n) {
            var i = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(i);
            };
        });
    };
    !function() {
        var e, t, n, i, r;
        t = he.createElement("div");
        t.setAttribute("className", "t");
        t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        i = t.getElementsByTagName("a")[0];
        n = he.createElement("select");
        r = n.appendChild(he.createElement("option"));
        e = t.getElementsByTagName("input")[0];
        i.style.cssText = "top:1px";
        ne.getSetAttribute = "t" !== t.className;
        ne.style = /top/.test(i.getAttribute("style"));
        ne.hrefNormalized = "/a" === i.getAttribute("href");
        ne.checkOn = !!e.value;
        ne.optSelected = r.selected;
        ne.enctype = !!he.createElement("form").enctype;
        n.disabled = !0;
        ne.optDisabled = !r.disabled;
        e = he.createElement("input");
        e.setAttribute("value", "");
        ne.input = "" === e.getAttribute("value");
        e.value = "t";
        e.setAttribute("type", "radio");
        ne.radioValue = "t" === e.value;
    }();
    var xt = /\r/g;
    re.fn.extend({
        val: function(e) {
            var t, n, i, r = this[0];
            if (arguments.length) {
                i = re.isFunction(e);
                return this.each(function(n) {
                    var r;
                    if (1 === this.nodeType) {
                        r = i ? e.call(this, n, re(this).val()) : e;
                        null == r ? r = "" : "number" == typeof r ? r += "" : re.isArray(r) && (r = re.map(r, function(e) {
                            return null == e ? "" : e + "";
                        }));
                        t = re.valHooks[this.type] || re.valHooks[this.nodeName.toLowerCase()];
                        t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r);
                    }
                });
            }
            if (r) {
                t = re.valHooks[r.type] || re.valHooks[r.nodeName.toLowerCase()];
                if (t && "get" in t && void 0 !== (n = t.get(r, "value"))) return n;
                n = r.value;
                return "string" == typeof n ? n.replace(xt, "") : null == n ? "" : n;
            }
        }
    });
    re.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = re.find.attr(e, "value");
                    return null != t ? t : re.trim(re.text(e));
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || r < 0, a = o ? null : [], s = o ? r + 1 : i.length, l = r < 0 ? s : o ? r : 0; l < s; l++) {
                        n = i[l];
                        if ((n.selected || l === r) && (ne.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !re.nodeName(n.parentNode, "optgroup"))) {
                            t = re(n).val();
                            if (o) return t;
                            a.push(t);
                        }
                    }
                    return a;
                },
                set: function(e, t) {
                    for (var n, i, r = e.options, o = re.makeArray(t), a = r.length; a--; ) {
                        i = r[a];
                        if (re.inArray(re.valHooks.option.get(i), o) >= 0) try {
                            i.selected = n = !0;
                        } catch (s) {
                            i.scrollHeight;
                        } else i.selected = !1;
                    }
                    n || (e.selectedIndex = -1);
                    return r;
                }
            }
        }
    });
    re.each([ "radio", "checkbox" ], function() {
        re.valHooks[this] = {
            set: function(e, t) {
                if (re.isArray(t)) return e.checked = re.inArray(re(e).val(), t) >= 0;
            }
        };
        ne.checkOn || (re.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var wt, Tt, Ct = re.expr.attrHandle, Nt = /^(?:checked|selected)$/i, Et = ne.getSetAttribute, kt = ne.input;
    re.fn.extend({
        attr: function(e, t) {
            return je(this, re.attr, e, t, arguments.length > 1);
        },
        removeAttr: function(e) {
            return this.each(function() {
                re.removeAttr(this, e);
            });
        }
    });
    re.extend({
        attr: function(e, t, n) {
            var i, r, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) {
                if (typeof e.getAttribute === Ce) return re.prop(e, t, n);
                if (1 !== o || !re.isXMLDoc(e)) {
                    t = t.toLowerCase();
                    i = re.attrHooks[t] || (re.expr.match.bool.test(t) ? Tt : wt);
                }
                if (void 0 === n) {
                    if (i && "get" in i && null !== (r = i.get(e, t))) return r;
                    r = re.find.attr(e, t);
                    return null == r ? void 0 : r;
                }
                if (null !== n) {
                    if (i && "set" in i && void 0 !== (r = i.set(e, n, t))) return r;
                    e.setAttribute(t, n + "");
                    return n;
                }
                re.removeAttr(e, t);
            }
        },
        removeAttr: function(e, t) {
            var n, i, r = 0, o = t && t.match(be);
            if (o && 1 === e.nodeType) for (;n = o[r++]; ) {
                i = re.propFix[n] || n;
                re.expr.match.bool.test(n) ? kt && Et || !Nt.test(n) ? e[i] = !1 : e[re.camelCase("default-" + n)] = e[i] = !1 : re.attr(e, n, "");
                e.removeAttribute(Et ? n : i);
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ne.radioValue && "radio" === t && re.nodeName(e, "input")) {
                        var n = e.value;
                        e.setAttribute("type", t);
                        n && (e.value = n);
                        return t;
                    }
                }
            }
        }
    });
    Tt = {
        set: function(e, t, n) {
            t === !1 ? re.removeAttr(e, n) : kt && Et || !Nt.test(n) ? e.setAttribute(!Et && re.propFix[n] || n, n) : e[re.camelCase("default-" + n)] = e[n] = !0;
            return n;
        }
    };
    re.each(re.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = Ct[t] || re.find.attr;
        Ct[t] = kt && Et || !Nt.test(t) ? function(e, t, i) {
            var r, o;
            if (!i) {
                o = Ct[t];
                Ct[t] = r;
                r = null != n(e, t, i) ? t.toLowerCase() : null;
                Ct[t] = o;
            }
            return r;
        } : function(e, t, n) {
            if (!n) return e[re.camelCase("default-" + t)] ? t.toLowerCase() : null;
        };
    });
    kt && Et || (re.attrHooks.value = {
        set: function(e, t, n) {
            if (!re.nodeName(e, "input")) return wt && wt.set(e, t, n);
            e.defaultValue = t;
        }
    });
    if (!Et) {
        wt = {
            set: function(e, t, n) {
                var i = e.getAttributeNode(n);
                i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n));
                i.value = t += "";
                if ("value" === n || t === e.getAttribute(n)) return t;
            }
        };
        Ct.id = Ct.name = Ct.coords = function(e, t, n) {
            var i;
            if (!n) return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null;
        };
        re.valHooks.button = {
            get: function(e, t) {
                var n = e.getAttributeNode(t);
                if (n && n.specified) return n.value;
            },
            set: wt.set
        };
        re.attrHooks.contenteditable = {
            set: function(e, t, n) {
                wt.set(e, "" !== t && t, n);
            }
        };
        re.each([ "width", "height" ], function(e, t) {
            re.attrHooks[t] = {
                set: function(e, n) {
                    if ("" === n) {
                        e.setAttribute(t, "auto");
                        return n;
                    }
                }
            };
        });
    }
    ne.style || (re.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0;
        },
        set: function(e, t) {
            return e.style.cssText = t + "";
        }
    });
    var St = /^(?:input|select|textarea|button|object)$/i, At = /^(?:a|area)$/i;
    re.fn.extend({
        prop: function(e, t) {
            return je(this, re.prop, e, t, arguments.length > 1);
        },
        removeProp: function(e) {
            e = re.propFix[e] || e;
            return this.each(function() {
                try {
                    this[e] = void 0;
                    delete this[e];
                } catch (t) {}
            });
        }
    });
    re.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var i, r, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) {
                o = 1 !== a || !re.isXMLDoc(e);
                if (o) {
                    t = re.propFix[t] || t;
                    r = re.propHooks[t];
                }
                return void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = re.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : St.test(e.nodeName) || At.test(e.nodeName) && e.href ? 0 : -1;
                }
            }
        }
    });
    ne.hrefNormalized || re.each([ "href", "src" ], function(e, t) {
        re.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4);
            }
        };
    });
    ne.optSelected || (re.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            if (t) {
                t.selectedIndex;
                t.parentNode && t.parentNode.selectedIndex;
            }
            return null;
        }
    });
    re.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        re.propFix[this.toLowerCase()] = this;
    });
    ne.enctype || (re.propFix.enctype = "encoding");
    var jt = /[\t\r\n\f]/g;
    re.fn.extend({
        addClass: function(e) {
            var t, n, i, r, o, a, s = 0, l = this.length, u = "string" == typeof e && e;
            if (re.isFunction(e)) return this.each(function(t) {
                re(this).addClass(e.call(this, t, this.className));
            });
            if (u) {
                t = (e || "").match(be) || [];
                for (;s < l; s++) {
                    n = this[s];
                    i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(jt, " ") : " ");
                    if (i) {
                        o = 0;
                        for (;r = t[o++]; ) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        a = re.trim(i);
                        n.className !== a && (n.className = a);
                    }
                }
            }
            return this;
        },
        removeClass: function(e) {
            var t, n, i, r, o, a, s = 0, l = this.length, u = 0 === arguments.length || "string" == typeof e && e;
            if (re.isFunction(e)) return this.each(function(t) {
                re(this).removeClass(e.call(this, t, this.className));
            });
            if (u) {
                t = (e || "").match(be) || [];
                for (;s < l; s++) {
                    n = this[s];
                    i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(jt, " ") : "");
                    if (i) {
                        o = 0;
                        for (;r = t[o++]; ) for (;i.indexOf(" " + r + " ") >= 0; ) i = i.replace(" " + r + " ", " ");
                        a = e ? re.trim(i) : "";
                        n.className !== a && (n.className = a);
                    }
                }
            }
            return this;
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : re.isFunction(e) ? this.each(function(n) {
                re(this).toggleClass(e.call(this, n, this.className, t), t);
            }) : this.each(function() {
                if ("string" === n) for (var t, i = 0, r = re(this), o = e.match(be) || []; t = o[i++]; ) r.hasClass(t) ? r.removeClass(t) : r.addClass(t); else if (n === Ce || "boolean" === n) {
                    this.className && re._data(this, "__className__", this.className);
                    this.className = this.className || e === !1 ? "" : re._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, i = this.length; n < i; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(jt, " ").indexOf(t) >= 0) return !0;
            return !1;
        }
    });
    re.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        re.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
    });
    re.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i);
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        }
    });
    var Dt = re.now(), Lt = /\?/, Ht = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    re.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, i = null, r = re.trim(t + "");
        return r && !re.trim(r.replace(Ht, function(e, t, r, o) {
            n && t && (i = 0);
            if (0 === i) return e;
            n = r || t;
            i += !o - !r;
            return "";
        })) ? Function("return " + r)() : re.error("Invalid JSON: " + t);
    };
    re.parseXML = function(t) {
        var n, i;
        if (!t || "string" != typeof t) return null;
        try {
            if (e.DOMParser) {
                i = new DOMParser();
                n = i.parseFromString(t, "text/xml");
            } else {
                n = new ActiveXObject("Microsoft.XMLDOM");
                n.async = "false";
                n.loadXML(t);
            }
        } catch (r) {
            n = void 0;
        }
        n && n.documentElement && !n.getElementsByTagName("parsererror").length || re.error("Invalid XML: " + t);
        return n;
    };
    var qt, _t, Mt = /#.*$/, Ft = /([?&])_=[^&]*/, Ot = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Bt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Pt = /^(?:GET|HEAD)$/, Rt = /^\/\//, Wt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, $t = {}, zt = {}, It = "*/".concat("*");
    try {
        _t = location.href;
    } catch (Xt) {
        _t = he.createElement("a");
        _t.href = "";
        _t = _t.href;
    }
    qt = Wt.exec(_t.toLowerCase()) || [];
    re.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: _t,
            type: "GET",
            isLocal: Bt.test(qt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": It,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": re.parseJSON,
                "text xml": re.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? W(W(e, re.ajaxSettings), t) : W(re.ajaxSettings, e);
        },
        ajaxPrefilter: P($t),
        ajaxTransport: P(zt),
        ajax: function(e, t) {
            function n(e, t, n, i) {
                var r, c, y, v, x, T = t;
                if (2 !== b) {
                    b = 2;
                    s && clearTimeout(s);
                    u = void 0;
                    a = i || "";
                    w.readyState = e > 0 ? 4 : 0;
                    r = e >= 200 && e < 300 || 304 === e;
                    n && (v = $(f, w, n));
                    v = z(f, v, w, r);
                    if (r) {
                        if (f.ifModified) {
                            x = w.getResponseHeader("Last-Modified");
                            x && (re.lastModified[o] = x);
                            x = w.getResponseHeader("etag");
                            x && (re.etag[o] = x);
                        }
                        if (204 === e || "HEAD" === f.type) T = "nocontent"; else if (304 === e) T = "notmodified"; else {
                            T = v.state;
                            c = v.data;
                            y = v.error;
                            r = !y;
                        }
                    } else {
                        y = T;
                        if (e || !T) {
                            T = "error";
                            e < 0 && (e = 0);
                        }
                    }
                    w.status = e;
                    w.statusText = (t || T) + "";
                    r ? h.resolveWith(d, [ c, T, w ]) : h.rejectWith(d, [ w, T, y ]);
                    w.statusCode(g);
                    g = void 0;
                    l && p.trigger(r ? "ajaxSuccess" : "ajaxError", [ w, f, r ? c : y ]);
                    m.fireWith(d, [ w, T ]);
                    if (l) {
                        p.trigger("ajaxComplete", [ w, f ]);
                        --re.active || re.event.trigger("ajaxStop");
                    }
                }
            }
            if ("object" == typeof e) {
                t = e;
                e = void 0;
            }
            t = t || {};
            var i, r, o, a, s, l, u, c, f = re.ajaxSetup({}, t), d = f.context || f, p = f.context && (d.nodeType || d.jquery) ? re(d) : re.event, h = re.Deferred(), m = re.Callbacks("once memory"), g = f.statusCode || {}, y = {}, v = {}, b = 0, x = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === b) {
                        if (!c) {
                            c = {};
                            for (;t = Ot.exec(a); ) c[t[1].toLowerCase()] = t[2];
                        }
                        t = c[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return 2 === b ? a : null;
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    if (!b) {
                        e = v[n] = v[n] || e;
                        y[e] = t;
                    }
                    return this;
                },
                overrideMimeType: function(e) {
                    b || (f.mimeType = e);
                    return this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (b < 2) for (t in e) g[t] = [ g[t], e[t] ]; else w.always(e[w.status]);
                    return this;
                },
                abort: function(e) {
                    var t = e || x;
                    u && u.abort(t);
                    n(0, t);
                    return this;
                }
            };
            h.promise(w).complete = m.add;
            w.success = w.done;
            w.error = w.fail;
            f.url = ((e || f.url || _t) + "").replace(Mt, "").replace(Rt, qt[1] + "//");
            f.type = t.method || t.type || f.method || f.type;
            f.dataTypes = re.trim(f.dataType || "*").toLowerCase().match(be) || [ "" ];
            if (null == f.crossDomain) {
                i = Wt.exec(f.url.toLowerCase());
                f.crossDomain = !(!i || i[1] === qt[1] && i[2] === qt[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (qt[3] || ("http:" === qt[1] ? "80" : "443")));
            }
            f.data && f.processData && "string" != typeof f.data && (f.data = re.param(f.data, f.traditional));
            R($t, f, t, w);
            if (2 === b) return w;
            l = f.global;
            l && 0 === re.active++ && re.event.trigger("ajaxStart");
            f.type = f.type.toUpperCase();
            f.hasContent = !Pt.test(f.type);
            o = f.url;
            if (!f.hasContent) {
                if (f.data) {
                    o = f.url += (Lt.test(o) ? "&" : "?") + f.data;
                    delete f.data;
                }
                f.cache === !1 && (f.url = Ft.test(o) ? o.replace(Ft, "$1_=" + Dt++) : o + (Lt.test(o) ? "&" : "?") + "_=" + Dt++);
            }
            if (f.ifModified) {
                re.lastModified[o] && w.setRequestHeader("If-Modified-Since", re.lastModified[o]);
                re.etag[o] && w.setRequestHeader("If-None-Match", re.etag[o]);
            }
            (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType);
            w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + It + "; q=0.01" : "") : f.accepts["*"]);
            for (r in f.headers) w.setRequestHeader(r, f.headers[r]);
            if (f.beforeSend && (f.beforeSend.call(d, w, f) === !1 || 2 === b)) return w.abort();
            x = "abort";
            for (r in {
                success: 1,
                error: 1,
                complete: 1
            }) w[r](f[r]);
            u = R(zt, f, t, w);
            if (u) {
                w.readyState = 1;
                l && p.trigger("ajaxSend", [ w, f ]);
                f.async && f.timeout > 0 && (s = setTimeout(function() {
                    w.abort("timeout");
                }, f.timeout));
                try {
                    b = 1;
                    u.send(y, n);
                } catch (T) {
                    if (!(b < 2)) throw T;
                    n(-1, T);
                }
            } else n(-1, "No Transport");
            return w;
        },
        getJSON: function(e, t, n) {
            return re.get(e, t, n, "json");
        },
        getScript: function(e, t) {
            return re.get(e, void 0, t, "script");
        }
    });
    re.each([ "get", "post" ], function(e, t) {
        re[t] = function(e, n, i, r) {
            if (re.isFunction(n)) {
                r = r || i;
                i = n;
                n = void 0;
            }
            return re.ajax({
                url: e,
                type: t,
                dataType: r,
                data: n,
                success: i
            });
        };
    });
    re.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        re.fn[t] = function(e) {
            return this.on(t, e);
        };
    });
    re._evalUrl = function(e) {
        return re.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    };
    re.fn.extend({
        wrapAll: function(e) {
            if (re.isFunction(e)) return this.each(function(t) {
                re(this).wrapAll(e.call(this, t));
            });
            if (this[0]) {
                var t = re(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]);
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; ) e = e.firstChild;
                    return e;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(e) {
            return re.isFunction(e) ? this.each(function(t) {
                re(this).wrapInner(e.call(this, t));
            }) : this.each(function() {
                var t = re(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function(e) {
            var t = re.isFunction(e);
            return this.each(function(n) {
                re(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                re.nodeName(this, "body") || re(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    re.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || re.css(e, "display"));
    };
    re.expr.filters.visible = function(e) {
        return !re.expr.filters.hidden(e);
    };
    var Ut = /%20/g, Vt = /\[\]$/, Jt = /\r?\n/g, Yt = /^(?:submit|button|image|reset|file)$/i, Gt = /^(?:input|select|textarea|keygen)/i;
    re.param = function(e, t) {
        var n, i = [], r = function(e, t) {
            t = re.isFunction(t) ? t() : null == t ? "" : t;
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        };
        void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional);
        if (re.isArray(e) || e.jquery && !re.isPlainObject(e)) re.each(e, function() {
            r(this.name, this.value);
        }); else for (n in e) I(n, e[n], t, r);
        return i.join("&").replace(Ut, "+");
    };
    re.fn.extend({
        serialize: function() {
            return re.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = re.prop(this, "elements");
                return e ? re.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !re(this).is(":disabled") && Gt.test(this.nodeName) && !Yt.test(e) && (this.checked || !De.test(e));
            }).map(function(e, t) {
                var n = re(this).val();
                return null == n ? null : re.isArray(n) ? re.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Jt, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(Jt, "\r\n")
                };
            }).get();
        }
    });
    re.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || U();
    } : X;
    var Qt = 0, Kt = {}, Zt = re.ajaxSettings.xhr();
    e.ActiveXObject && re(e).on("unload", function() {
        for (var e in Kt) Kt[e](void 0, !0);
    });
    ne.cors = !!Zt && "withCredentials" in Zt;
    Zt = ne.ajax = !!Zt;
    Zt && re.ajaxTransport(function(e) {
        if (!e.crossDomain || ne.cors) {
            var t;
            return {
                send: function(n, i) {
                    var r, o = e.xhr(), a = ++Qt;
                    o.open(e.type, e.url, e.async, e.username, e.password);
                    if (e.xhrFields) for (r in e.xhrFields) o[r] = e.xhrFields[r];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType);
                    e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (r in n) void 0 !== n[r] && o.setRequestHeader(r, n[r] + "");
                    o.send(e.hasContent && e.data || null);
                    t = function(n, r) {
                        var s, l, u;
                        if (t && (r || 4 === o.readyState)) {
                            delete Kt[a];
                            t = void 0;
                            o.onreadystatechange = re.noop;
                            if (r) 4 !== o.readyState && o.abort(); else {
                                u = {};
                                s = o.status;
                                "string" == typeof o.responseText && (u.text = o.responseText);
                                try {
                                    l = o.statusText;
                                } catch (c) {
                                    l = "";
                                }
                                s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404;
                            }
                        }
                        u && i(s, l, u, o.getAllResponseHeaders());
                    };
                    e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = Kt[a] = t : t();
                },
                abort: function() {
                    t && t(void 0, !0);
                }
            };
        }
    });
    re.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                re.globalEval(e);
                return e;
            }
        }
    });
    re.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1);
        if (e.crossDomain) {
            e.type = "GET";
            e.global = !1;
        }
    });
    re.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = he.head || re("head")[0] || he.documentElement;
            return {
                send: function(i, r) {
                    t = he.createElement("script");
                    t.async = !0;
                    e.scriptCharset && (t.charset = e.scriptCharset);
                    t.src = e.url;
                    t.onload = t.onreadystatechange = function(e, n) {
                        if (n || !t.readyState || /loaded|complete/.test(t.readyState)) {
                            t.onload = t.onreadystatechange = null;
                            t.parentNode && t.parentNode.removeChild(t);
                            t = null;
                            n || r(200, "success");
                        }
                    };
                    n.insertBefore(t, n.firstChild);
                },
                abort: function() {
                    t && t.onload(void 0, !0);
                }
            };
        }
    });
    var en = [], tn = /(=)\?(?=&|$)|\?\?/;
    re.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = en.pop() || re.expando + "_" + Dt++;
            this[e] = !0;
            return e;
        }
    });
    re.ajaxPrefilter("json jsonp", function(t, n, i) {
        var r, o, a, s = t.jsonp !== !1 && (tn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) {
            r = t.jsonpCallback = re.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback;
            s ? t[s] = t[s].replace(tn, "$1" + r) : t.jsonp !== !1 && (t.url += (Lt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r);
            t.converters["script json"] = function() {
                a || re.error(r + " was not called");
                return a[0];
            };
            t.dataTypes[0] = "json";
            o = e[r];
            e[r] = function() {
                a = arguments;
            };
            i.always(function() {
                e[r] = o;
                if (t[r]) {
                    t.jsonpCallback = n.jsonpCallback;
                    en.push(r);
                }
                a && re.isFunction(o) && o(a[0]);
                a = o = void 0;
            });
            return "script";
        }
    });
    re.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        if ("boolean" == typeof t) {
            n = t;
            t = !1;
        }
        t = t || he;
        var i = fe.exec(e), r = !n && [];
        if (i) return [ t.createElement(i[1]) ];
        i = re.buildFragment([ e ], t, r);
        r && r.length && re(r).remove();
        return re.merge([], i.childNodes);
    };
    var nn = re.fn.load;
    re.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var i, r, o, a = this, s = e.indexOf(" ");
        if (s >= 0) {
            i = re.trim(e.slice(s, e.length));
            e = e.slice(0, s);
        }
        if (re.isFunction(t)) {
            n = t;
            t = void 0;
        } else t && "object" == typeof t && (o = "POST");
        a.length > 0 && re.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: t
        }).done(function(e) {
            r = arguments;
            a.html(i ? re("<div>").append(re.parseHTML(e)).find(i) : e);
        }).complete(n && function(e, t) {
            a.each(n, r || [ e.responseText, t, e ]);
        });
        return this;
    };
    re.expr.filters.animated = function(e) {
        return re.grep(re.timers, function(t) {
            return e === t.elem;
        }).length;
    };
    var rn = e.document.documentElement;
    re.offset = {
        setOffset: function(e, t, n) {
            var i, r, o, a, s, l, u, c = re.css(e, "position"), f = re(e), d = {};
            "static" === c && (e.style.position = "relative");
            s = f.offset();
            o = re.css(e, "top");
            l = re.css(e, "left");
            u = ("absolute" === c || "fixed" === c) && re.inArray("auto", [ o, l ]) > -1;
            if (u) {
                i = f.position();
                a = i.top;
                r = i.left;
            } else {
                a = parseFloat(o) || 0;
                r = parseFloat(l) || 0;
            }
            re.isFunction(t) && (t = t.call(e, n, s));
            null != t.top && (d.top = t.top - s.top + a);
            null != t.left && (d.left = t.left - s.left + r);
            "using" in t ? t.using.call(e, d) : f.css(d);
        }
    };
    re.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                re.offset.setOffset(this, e, t);
            });
            var t, n, i = {
                top: 0,
                left: 0
            }, r = this[0], o = r && r.ownerDocument;
            if (o) {
                t = o.documentElement;
                if (!re.contains(t, r)) return i;
                typeof r.getBoundingClientRect !== Ce && (i = r.getBoundingClientRect());
                n = V(o);
                return {
                    top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                };
            }
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, i = this[0];
                if ("fixed" === re.css(i, "position")) t = i.getBoundingClientRect(); else {
                    e = this.offsetParent();
                    t = this.offset();
                    re.nodeName(e[0], "html") || (n = e.offset());
                    n.top += re.css(e[0], "borderTopWidth", !0);
                    n.left += re.css(e[0], "borderLeftWidth", !0);
                }
                return {
                    top: t.top - n.top - re.css(i, "marginTop", !0),
                    left: t.left - n.left - re.css(i, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || rn; e && !re.nodeName(e, "html") && "static" === re.css(e, "position"); ) e = e.offsetParent;
                return e || rn;
            });
        }
    });
    re.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        re.fn[e] = function(i) {
            return je(this, function(e, i, r) {
                var o = V(e);
                if (void 0 === r) return o ? t in o ? o[t] : o.document.documentElement[i] : e[i];
                o ? o.scrollTo(n ? re(o).scrollLeft() : r, n ? r : re(o).scrollTop()) : e[i] = r;
            }, e, i, arguments.length, null);
        };
    });
    re.each([ "top", "left" ], function(e, t) {
        re.cssHooks[t] = k(ne.pixelPosition, function(e, n) {
            if (n) {
                n = tt(e, t);
                return it.test(n) ? re(e).position()[t] + "px" : n;
            }
        });
    });
    re.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        re.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, i) {
            re.fn[i] = function(i, r) {
                var o = arguments.length && (n || "boolean" != typeof i), a = n || (i === !0 || r === !0 ? "margin" : "border");
                return je(this, function(t, n, i) {
                    var r;
                    if (re.isWindow(t)) return t.document.documentElement["client" + e];
                    if (9 === t.nodeType) {
                        r = t.documentElement;
                        return Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e]);
                    }
                    return void 0 === i ? re.css(t, n, a) : re.style(t, n, i, a);
                }, t, o ? i : void 0, o, null);
            };
        });
    });
    re.fn.size = function() {
        return this.length;
    };
    re.fn.andSelf = re.fn.addBack;
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return re;
    });
    var on = e.jQuery, an = e.$;
    re.noConflict = function(t) {
        e.$ === re && (e.$ = an);
        t && e.jQuery === re && (e.jQuery = on);
        return re;
    };
    typeof t === Ce && (e.jQuery = e.$ = re);
    return re;
});

!function(e, t, n) {
    function i() {
        r && (e[n](i), t.fx.tick());
    }
    var r;
    e[n] && (t.fx.timer = function(e) {
        e() && t.timers.push(e) && !r && (r = !0, i());
    }, t.fx.stop = function() {
        r = !1;
    });
}(window, jQuery, "requestAnimationFrame");require.config({urlArgs : "c7d4556f92"});