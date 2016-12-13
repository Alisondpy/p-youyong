/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*!
 * jQuery Validation Plugin v1.15.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */

// Copyright (c) 2010-2013 Diego Perini, MIT licensed

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return "object" == typeof e && null !== e;
    }
    function r() {}
    function o(e, t) {
        for (var n = e.length, i = -1; ++i < n; ) t(e[i], i);
    }
    function a(e, t) {
        for (var n in e) h.call(e, n) && t(e[n], n, e);
    }
    function s(e, t) {
        if (e && e.forEach) return e.forEach(t);
        p(e) ? o(e, t) : a(e, t);
    }
    function u(e, t) {
        for (var n = -1, i = e.length, r = Array(i); ++n < i; ) r[n] = t(e[n], n, e);
        return r;
    }
    function l(e, t) {
        var n = [];
        s(e, function(e, i, r) {
            n.push(t(e, i, r));
        });
        return n;
    }
    function c(e, t) {
        if (!t || !i(t)) return e;
        for (var n = g(t), r = n.length; r--; ) e[n[r]] = t[n[r]];
        return e;
    }
    function d(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = {}, i = e.split("&"), r = -1, o = i.length; ++r < o; ) {
            t = i[r].split("=");
            n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return n;
    }
    var f = new Function("return this")(), h = Object.prototype.hasOwnProperty, p = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, m = function() {
        var e = (+new Date()).toString(36), t = -1;
        return function(n) {
            return (n || "") + e + ++t;
        };
    }(), g = Object.keys || function(e) {
        var t = [];
        a(e, function(e, n) {
            t.push(n);
        });
        return t;
    }, v = "function" == typeof Object.create ? function(e, t) {
        e.__super__ = t.prototype;
        e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        });
    } : function() {
        function e(e) {
            this.constructor = e;
        }
        return function(t, n) {
            t.__super__ = n.prototype;
            e.prototype = n.prototype;
            t.prototype = new e(t);
        };
    }(), y = f.console || (f.console = {});
    o([ "log", "error", "trace", "warn", "info" ], function(e) {
        y[e] || (y[e] = r);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), i = n.length, r = -1; ++r < i; ) c(e, n[r]);
        return e;
    };
    t.inherits = function(e, t, n) {
        v(e, t);
        n && c(e.prototype, n);
    };
    t.impls = function(e, n) {
        n = "function" == typeof n ? n.prototype : n;
        t.mix(e.prototype, n);
        return e;
    };
    t.parseQuery = d;
    t.parseParams = d;
    t.each = s;
    t.map = function(e, t) {
        var n = p(e) ? u : l;
        return n(e, t);
    };
    t.filter = function(e, t) {
        var n, i, r = p(e) ? (n = o, i = function(e, t) {
            r.push(t);
        }, []) : (n = a, i = function(e, t) {
            r[e] = t;
        }, {});
        n(e, function(e, n) {
            t(e, n) && i(n, e);
        });
        return r;
    };
    t.mix = function b(e, t, n, i, r) {
        for (var o in t) t.hasOwnProperty(o) && (t[o] && e[o] && n && "object" == typeof t[o] ? b(e[o], t[o], n, i, r) : (void 0 === e[o] || i) && (r && !r(e[o], t[o]) || (e[o] = t[o])));
        return e;
    };
    t.guid = m;
    t.setImmediate = function() {
        var e = f.document, t = f.postMessage, n = f.setImmediate;
        return n ? n : "onreadystatechange" in e.createElement("script") ? function(t) {
            function n() {
                i.onreadystatechange = null;
                i.parentNode.removeChild(i);
                t();
            }
            var i = e.createElement("script");
            i.onreadystatechange = n;
            e.documentElement.appendChild(i);
        } : t ? function(e) {
            function n(t) {
                if (t.data === i) {
                    f.removeEventListener("message", n, !0);
                    e();
                }
            }
            var i = m();
            f.addEventListener("message", n, !0);
            t(i, "*");
        } : function(e) {
            f.setTimeout(e, 0);
        };
    }();
    t.noop = r;
    t.throttle = function(e, t) {
        t = t ? t : 150;
        if (t === -1) return function() {
            e.apply(this, arguments);
        };
        var n;
        return function() {
            var i = +new Date();
            if (!n || i - n > t) {
                n = i;
                e.apply(this, arguments);
            }
        };
    };
    t.debounce = function(e, t, n, i) {
        var r;
        return function() {
            var o = i || this, a = arguments, s = function() {
                r = null;
                n || e.apply(o, a);
            }, u = n && !r;
            clearTimeout(r);
            r = setTimeout(s, t);
            u && e.apply(o, a);
        };
    };
    t.deprecate = function(e, t) {
        function n() {
            i || (i = !0);
            return e.apply(this, arguments);
        }
        if (f.noDeprecation === !0) return e;
        var i = !1;
        return n;
    };
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(e) {
    "use strict";
    var t = e("jquery"), n = t(window), i = t(document), r = "createTouch" in document, o = document.documentElement, a = !("minWidth" in o.style), s = !a && "onlosecapture" in o, u = "setCapture" in o, l = t.noop, c = {
        start: r ? "touchstart" : "mousedown",
        over: r ? "touchmove" : "mousemove",
        end: r ? "touchend" : "mouseup"
    }, d = r ? function(e) {
        e.touches || (e = e.originalEvent.touches.item(0));
        return e;
    } : function(e) {
        return e;
    }, f = function() {
        this.start = t.proxy(this.start, this);
        this.over = t.proxy(this.over, this);
        this.end = t.proxy(this.end, this);
        this.onstart = this.onover = this.onend = l;
    };
    f.types = c;
    f.prototype = {
        start: function(e) {
            e = this.startFix(e);
            i.on(c.over, this.over).on(c.end, this.end);
            this.onstart(e);
            return !1;
        },
        over: function(e) {
            e = this.overFix(e);
            this.onover(e);
            return !1;
        },
        end: function(e) {
            e = this.endFix(e);
            i.off(c.over, this.over).off(c.end, this.end);
            this.onend(e);
            return !1;
        },
        startFix: function(e) {
            e = d(e);
            this.target = t(e.target);
            this.selectstart = function() {
                return !1;
            };
            i.on("selectstart", this.selectstart).on("dblclick", this.end);
            s ? this.target.on("losecapture", this.end) : n.on("blur", this.end);
            u && this.target[0].setCapture();
            return e;
        },
        overFix: function(e) {
            e = d(e);
            return e;
        },
        endFix: function(e) {
            e = d(e);
            i.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            u && this.target[0].releaseCapture();
            return e;
        }
    };
    f.create = function(e, r, o) {
        o = t.extend({
            hook: null,
            onstart: l,
            onover: l,
            onend: l
        }, o);
        var a, s, u, c, d = t(e), h = o.hook ? t(o.hook) : d, p = new f(), m = f.types.start, g = e.className.replace(/^\s|\s.*/g, "") + "-drag-start", v = {
            off: function() {
                h.off(m, p.start);
            }
        };
        p.onstart = function(t) {
            var r = "fixed" === d.css("position"), l = i.scrollLeft(), f = i.scrollTop(), h = d.width(), p = d.height();
            a = 0;
            s = 0;
            u = r ? n.width() - h + a : i.width() - h;
            c = r ? n.height() - p + s : i.height() - p;
            var m = d.offset(), v = this.startLeft = r ? m.left - l : m.left, y = this.startTop = r ? m.top - f : m.top;
            this.clientX = t.clientX;
            this.clientY = t.clientY;
            d.addClass(g);
            o.onstart.call(e, t, v, y);
        };
        p.onover = function(t) {
            var n = t.clientX - this.clientX + this.startLeft, i = t.clientY - this.clientY + this.startTop, r = d[0].style;
            n = Math.max(a, Math.min(u, n));
            i = Math.max(s, Math.min(c, i));
            r.left = n + "px";
            r.top = i + "px";
            o.onover.call(e, t, n, i);
        };
        p.onend = function(t) {
            var n = d.position(), i = n.left, r = n.top;
            d.removeClass(g);
            o.onend.call(e, t, i, r);
        };
        p.off = function() {
            h.off(m, p.start);
        };
        r ? p.start(r) : h.on(m, p.start);
        return v;
    };
    return f;
});

!function(e, t) {
    if ("function" == typeof define && define.amd) define("lib/core/1.0.0/event/emitter", t); else if ("undefined" != typeof module) t(require, module.exports, module); else {
        var n = {
            exports: {}
        };
        t(null, n.exports, n);
        e.EventEmitter = n.exports;
    }
}(this, function(e, t, n) {
    "use strict";
    function i() {}
    function r(e, t, n, i) {
        var r = !0;
        if (t) for (var o, a, s, u = -1, l = {
            type: e,
            timeStamp: c()
        }; o = t[++u]; ) {
            a = o[m];
            s = o[g] || i;
            try {
                r = o[v] === p ? a.call(s, l, n) !== !1 && r : a.apply(s, n) !== !1 && r;
            } catch (d) {
                setTimeout(function() {
                    console.error(d);
                }, 1);
            }
        }
        return r;
    }
    function o(e) {
        var t, n = f(this);
        if (n) {
            t = n[e];
            return t.length;
        }
        return 0;
    }
    function a(e) {
        return "[object Function]" === Object.prototype.toString.call(e);
    }
    function s(e, t) {
        for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
    }
    function u(e, t) {
        e.forEach ? e.forEach(t) : function(e) {
            for (var n = -1, i = e.length; ++n < i; ) t(e[n], n);
        }(e);
    }
    var l = /\s+/, c = Date.now || function() {
        return +new Date();
    }, d = function() {
        return c() * Math.random() & 65535;
    }(), f = function() {
        var e, t, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, n) {
            var i = e.get(t);
            return null === n ? void 0 !== i && e["delete"](t) : !i && n ? (e.set(t, i = {}), 
            i) : i;
        }) : (t = c(), n = "__$widΦ" + t.toString(36), e = {}, function(i, r) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var o;
            return null === r ? i[n] && (delete e[i[n]], delete i[n]) : (o = i[n] || r && (o = ++t, 
            e[o] = {}, i[n] = o), o && e[o]);
        });
    }(), h = 1, p = 2, m = 0, g = 1, v = 2, y = function(e, t, n) {
        var i = [];
        i[m] = e;
        i[g] = t;
        i[v] = n;
        return i;
    }, b = i.prototype;
    b.addListener = function(e, t, n, i) {
        var r, o, a, s = h;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
            s = p;
        }
        if (!t) return this;
        r = f(this, 1);
        e = e.split(l);
        for (;o = e.shift(); ) {
            a = !i && r[o] || (r[o] = []);
            a.push(y(t, n, s));
        }
        return this;
    };
    b.on = b.addListener;
    b.once = function(e, t, n) {
        var i = !1, r = function() {
            this.removeListener(e, r);
            if (!i) {
                i = !0;
                t.apply(n || this, arguments);
            }
        };
        r.guid = t.guid || (t.guid = d++);
        return this.on(e, r);
    };
    b.removeListener = function(e, t, n) {
        var i, r, o, a, u, c;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
        }
        if (!(i = f(this))) return this;
        if (!(e || t || n)) {
            s(i, function(e, t) {
                delete i[t];
            });
            f(this, null);
            return this;
        }
        e = e ? e.split(l) : x(i);
        for (;r = e.shift(); ) {
            o = i[r];
            if (o) if (t || n) for (a = o.length; --a >= 0; ) {
                u = o[a];
                c = u[m];
                t && c !== t && (void 0 === c.guid || c.guid !== t.guid) || n && u[g] !== n || o.splice(a, 1);
            } else delete i[r];
        }
        return this;
    };
    b.un = b.removeListener;
    b.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    b.emit = function(e) {
        var t, n, i, o, a, s, u = [], c = !0;
        if (!(t = f(this))) return this;
        e = e.split(l);
        for (a = 1, s = arguments.length; a < s; a++) u[a - 1] = arguments[a];
        for (;n = e.shift(); ) {
            (i = t.all) && (i = i.slice());
            (o = t[n]) && (o = o.slice());
            "all" !== n && (c = r(n, o, u, this) && c);
            c = r(n, i, [ n ].concat(u), this) && c;
        }
        return c;
    };
    i.applyTo = function(e) {
        function t(t, i) {
            e[t] = function() {
                var r = n[t].apply(i || e, Array.prototype.slice.call(arguments));
                return r === i ? this : r;
            };
        }
        var n = b, i = x(n);
        a(e) ? u(i, function(t) {
            e.prototype[t] = n[t];
        }) : u(i, function(e) {
            t(e);
        });
    };
    i.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : o.call(e, t);
    };
    b.listenerCount = o;
    var x = Object.keys || function(e) {
        var t = [];
        s(e, function(e, n) {
            t.push(n);
        });
        return t;
    };
    n.exports = i;
});

define("lib/core/1.0.0/dom/delegator", [ "require", "exports", "module", "jquery", "../event/emitter" ], function(e, t, n) {
    "use strict";
    function i(e, t) {
        var n, i, o, a = t.currentTarget, s = r(a), u = (t.handleObj || 0).origType || t.type;
        if (!t.isPropagationStopped()) {
            if (!s.attr("disabled") && (n = s.attr("action-type"))) {
                i = s.attr("action-data");
                t.action = n;
                t.data = i;
                o = e.e.emit(u + l + n, t, a);
                t.actionValue = o;
                if (o === !1) {
                    t.preventDefault();
                    t.stopPropagation();
                }
            }
            e.opts.onDelegate(t);
            return o;
        }
    }
    var r = e("jquery"), o = e("../event/emitter"), a = /\S+/g, s = -1, u = (+new Date()).toString(36), l = "/", c = function() {
        return u + ++s;
    }, d = function(e, t) {
        var n = e.guid || (e.guid = c()), i = function(n, i) {
            return e.call(t || i, n);
        };
        i.guid = n;
        return i;
    }, f = function() {}, h = function(e, t) {
        return "function" == typeof e ? e : t;
    }, p = function(e, t) {
        t = t || {};
        "string" == typeof e && (e = r(e)[0]);
        var n = {}, s = {}, u = new o(), c = t.context, p = {
            o: n,
            opts: t,
            e: u
        }, m = function(e) {
            return i(p, e);
        };
        t.onDelegate = h(t.onDelegate, f);
        n.on = function(t, n, i) {
            if ("function" == typeof n) {
                i = n;
                n = t;
                t = "click";
            }
            if ("function" != typeof i) throw Error("The delegate handler should be a valid function");
            n = (n || "").match(a) || [];
            for (var o = n.length; o--; ) {
                if (!s[t]) {
                    s[t] = 1;
                    r(e).on(t, "[action-type]", m);
                }
                u.on(t + l + n[o], d(i, c));
            }
            return this;
        };
        n.un = function(t, n, i) {
            if ("function" == typeof n || !n) {
                i = n;
                n = t;
                t = "click";
            }
            n = (n || "").match(a) || [];
            var o, s = n.length;
            for (r(e); s--; ) {
                o = t + l + n[s];
                u.un(o, i);
            }
            return this;
        };
        n.fire = function(t, n) {
            if (!n) {
                n = t;
                t = "click";
            }
            var i = r('[action-type="' + n + '"]', e)[0] || document, o = new r.Event(t);
            o.currentTarget = o.target = i;
            u.emit(t + l + n, o, i);
        };
        n.destroy = function() {
            var i = r(e);
            r.each(s, function(e, t) {
                delete s[e];
                i.off(e, "[action-type]", m);
            });
            u.un();
            for (var o in n) delete n[o];
            u = void 0;
            t = void 0;
            s = i = e = void 0;
            m = null;
        };
        return n;
    };
    n.exports = p;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return l("<" + e + "/>")[0];
    }
    function r(e, t, n) {
        e.insertRule ? e.insertRule(t + " {" + n + "}", 0) : e.addRule(t, n, 1);
    }
    function o() {
        var e, t, n, i, r, a = "";
        e = document.body || document.documentElement;
        n = e.style;
        i = "Transition";
        r = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        t = 0;
        for (;t < r.length; ) {
            if (void 0 !== n[r[t] + i]) {
                a = r[t];
                break;
            }
            t++;
        }
        o = function() {
            return a;
        };
        return a;
    }
    function a() {
        var e = o();
        return e ? "-v-".replace("v", e.toLowerCase()) : "";
    }
    function s(e) {
        return "number" == typeof e ? e : {
            fast: 200,
            normal: 500,
            slow: 1e3
        }[e] || 500;
    }
    function u(e, t, n, i, r) {
        var o, a, u = l(e), c = arguments, r = "boolean" == typeof c[c.length - 1] && c[c.length - 1], p = !1, m = function() {
            g();
        }, g = function(e) {
            p || v(!0);
        }, v = function(e) {
            if (!p) {
                p = !0;
                g = d;
                u.off(y, m);
                if (o) {
                    clearTimeout(o);
                    o = null;
                }
                u.removeClass(a);
                e && i();
                u = null;
            }
        };
        if ("function" == typeof n) {
            i = n;
            n = void 0;
        }
        i = i || d;
        if (h) {
            n = n || "normal";
            t = t || "shake";
            a = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + t ].join(" ");
            u.on(y, m);
            o = setTimeout(m, s(n) + 100);
            r === !0 ? f(function() {
                u.addClass(a);
            }) : u.addClass(a);
        } else f(function() {
            i && i();
        });
        return {
            stop: function() {
                v.apply(null, arguments);
                return this;
            }
        };
    }
    var l = e("jquery"), c = e("./util"), d = (c.each, c.noop), f = c.setImmediate, h = a(), p = /\-v\-/g, m = document.getElementsByTagName("head")[0].appendChild(i("style")), g = m.sheet || m.styleSheet, v = {
        ".ui-animated": "-v-animation-fill-mode: both;",
        ".ui-animated.ui-speed-normal": "-v-animation-duration: 0.5s;",
        ".ui-animated.ui-speed-fast": "-v-animation-duration: 0.2s;",
        ".ui-animated.ui-speed-slow": "-v-animation-duration: 1s;"
    }, y = {
        "-webkit-": "webkitAnimationEnd",
        "-moz-": "animationend",
        "-o-": "OAnimationEnd",
        "-ms-": "msAnimationEnd",
        "": "animationend"
    }[h];
    c.each(v, function(e, t) {
        e && r(g, t, e.replace(p, h));
    });
    t.effect = u;
    t.getVendorPrefix = o;
});

define("lib/ui/box/1.0.1/popup", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/utils/css", "../../../core/1.0.0/event/emitter" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            autofocus: !0,
            fixed: !1,
            align: "bl",
            className: "",
            clickBlankToHide: !1,
            appendTo: "body",
            autoRelease: !1,
            html: "",
            modal: !1,
            showWithAni: "bounceIn:fast",
            hideWithAni: "bounceOut:fast"
        };
        t._ = e = x(n, e);
        e.fixed = !!e.fixed && T();
        var o = r('<div class="' + m + '" id="' + (e.id || b()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(e.html), a = r("<div />");
        t._popup = o;
        t._mask = t._shadow = a;
        t.node = o[0];
        t.mask = a[0];
        t.on("render", function(e) {
            var n, r = e.className, a = t._mask, s = e.zIndex;
            o.html() || o.html(e.html);
            r && o.addClass(r);
            o.css("position", e.fixed ? "fixed" : "absolute");
            s && o.css("zIndex", s);
            if (e.modal) {
                o.addClass(m + "-modal");
                n = {
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    userSelect: "none",
                    zIndex: s || i.zIndex,
                    backgroundColor: "#000",
                    opacity: .3
                };
                T() || x(n, {
                    position: "absolute",
                    width: c.width() + "px",
                    height: d.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", _(t.focus, t));
                t._shadow = a.clone(!0);
                a.css(n).addClass(m + "-mask");
            }
        });
        t.on("beforeShow", function(e) {
            var n = t.anchor, i = t._dirClass;
            if (!n && i) {
                o.removeClass(i);
                delete t._dirClass;
            }
        });
        t.on("show", function(e) {
            t.resize();
            if (e.modal) {
                t._mask.insertBefore(o).css("display", "block");
                t._shadow.insertAfter(o);
            }
            e.autofocus && t.focus();
        });
        t.on("hide", function(e) {
            t._mask.remove();
            t._shadow.remove();
            t.blur();
        });
        t.once("destroy", function() {
            o.off();
            o = null;
            t._mask.off();
            t._shadow.off();
        });
        if (!p) {
            var s = _(t.resize, t);
            t.on("render", function() {
                c.on("resize", s);
            });
            t.on("destroy", function() {
                c.off("resize", s);
            });
        }
        t.destroyed = !1;
        t.initialized = !0;
    }
    var r = e("jquery"), o = e("../../../core/1.0.0/utils/util"), a = e("../../../core/1.0.0/utils/css"), s = e("../../../core/1.0.0/event/emitter"), u = window, l = u.document, c = r(u), d = r(l), f = l.documentElement, h = /\S+/g, p = !("minWidth" in f.style), m = "ui-layer", g = u.Math, v = g.max, y = g.ceil, b = o.guid, x = o.extend, w = o.each, _ = function(e, t) {
        return e.bind ? e.bind(t) : function() {
            return e.apply(t, arguments);
        };
    }, C = o.setImmediate, A = function(e) {
        return u.parseInt(e, 10) || 0;
    }, k = function(e) {
        return e && 1 === e.nodeType;
    }, T = function() {
        return T._ || (T._ = function() {
            var e = l.createElement("div"), t = e.cloneNode(!1), n = !1, i = l.body || function() {
                n = !0;
                return f.appendChild(l.createElement("body"));
            }();
            e.style.cssText = "position:fixed;top:42px";
            i.appendChild(e);
            i.appendChild(t);
            var r = e.offsetTop !== t.offsetTop;
            i.removeChild(e);
            i.removeChild(t);
            n && f.removeChild(i);
            e = t = null;
            return r;
        }());
    }, j = function() {
        return {
            x: d.scrollLeft(),
            y: d.scrollTop()
        };
    }, E = function(e) {
        return {
            w: e.width(),
            h: e.height()
        };
    }, q = function() {
        return E(c);
    }, $ = function(e) {
        var t = k(e), n = t ? r(e).offset() : {
            left: e.pageX,
            top: e.pageY
        };
        e = t ? e : e.target;
        var i = e.ownerDocument;
        if (i === u.document) return n;
        var o = i.defaultView || i.parentWindow, a = o.frameElement, s = j(), l = r(a).offset();
        return {
            left: n.left + l.left - s.x,
            top: n.top + l.top - s.y
        };
    }, z = function(e, t) {
        if (e.length) {
            var n = A(e.css(t)) || e[0]["offset" + t.charAt(0).toUpperCase() + t.slice(1)], i = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            w(i[t], function(t, i) {
                n += A(e.css("margin-" + t), 10) || 0;
            });
            return n;
        }
        return 0;
    }, P = function(e) {
        return z(e, "width");
    }, S = function(e) {
        return z(e, "height");
    }, I = function() {
        try {
            var e = l.activeElement, t = e.contentDocument;
            return t && t.activeElement || e;
        } catch (n) {}
    }, L = function(e) {
        e = e || "";
        var t = {
            auto: !0
        }, n = e.slice(-1);
        if ("!" === n) {
            t.auto = !1;
            e = e.slice(0, -1);
        }
        for (var i, e = e.length <= 2 ? e.split("") : e.replace(/^\s+|\s+$/g, "").split(" ").slice(0, 2), r = {}, o = {
            t: "t",
            b: "t",
            l: "l",
            r: "l"
        }, a = -1, s = e.length; ++a < s; ) {
            i = e[a].charAt(0);
            if (!i || r[o[i]]) e.splice(a, 1); else {
                e[a] = i;
                r[o[i]] = 1;
            }
        }
        2 === e.length && e[0] === e[1] && e.pop();
        t.align = e;
        return t;
    };
    o.inherits(i, s, {
        open: !1,
        destroyed: !0,
        node: null,
        mask: null,
        emit: function(e) {
            for (var t = (e || "").match(h) || [], n = t.length; n--; ) {
                var r = this["on" + t[n]], o = Array.prototype.slice.call(arguments, 1);
                "function" == typeof r && r.apply(this, o);
            }
            i.__super__.emit.apply(this, arguments);
        },
        $: function(e, t) {
            var n = this._nodes || (this._nodes = {}), i = n[e];
            if (!i || t && 0 === i.length) {
                i = this._popup.find('[node-type="' + e + '"]');
                t && i.length > 0 && (n[e] = i);
            }
            return !t || i.length ? i : null;
        },
        show: function(e, t) {
            var n, i = this, r = i._, o = e, s = null, u = i._anim;
            u && u.stop(!0);
            if (i.destroyed || r.showing || i.open) return i;
            t = x({}, i._, t);
            if (void 0 !== o) {
                n = typeof o;
                "boolean" === n ? t.modal = o : o && "object" === n && (k(o) || k(o.target) ? s = o : x(t, o));
            }
            var l = i._popup, c = t.showWithAni, d = function() {
                delete r.showing;
                i.emit("shown");
            };
            if (!i._ready) {
                i.emit("render", t);
                i._ready = !0;
            }
            i.open = !0;
            i.anchor = s;
            i._activeElement = I();
            i.emit("beforeShow", t);
            l.appendTo(t.appendTo).css("display", "block");
            i.emit("show", t);
            r.showing = !0;
            if (c && "none" !== c) {
                var f = c.split(":");
                i._anim = a.effect(i.node, f[0], f[1], d);
            } else d();
            return i;
        },
        hide: function(e) {
            var t, n = this, i = n._, r = n.node, o = i.hideWithAni, s = n._anim;
            s && s.stop(!0);
            if (n.destroyed || i.hidding || !n.open) return n;
            n.emit("beforeHide");
            i.hidding = !0;
            t = function() {
                if (i.hidding === !0) {
                    r.parentNode.removeChild(r);
                    n._popup.hide();
                    delete i.hidding;
                    n.open = !1;
                    n.emit("hidden");
                    (e || i.autoRelease) && n.destroy();
                }
            };
            if (o && "none" !== o) {
                var u = o.split(":");
                n._anim = a.effect(r, u[0], u[1], t);
                n.emit("hide");
            } else {
                n.emit("hide");
                C(t);
            }
            return n;
        },
        destroy: function() {
            var e = this;
            if (e.destroyed) return e;
            e.emit("beforeremove");
            i.current === e && (i.current = null);
            e._popup.off().remove();
            e._mask.off().remove();
            e._shadow.off().remove();
            e.emit("destroy");
            e.removeAllListeners();
            w(e, function(t, n) {
                delete e[n];
            });
            e._ = {};
            e.destroyed = !0;
            return e;
        },
        resize: function() {
            var e = this._;
            if (this.open && this._ready && !e.showing && !this._freezing) {
                var t = this.anchor;
                t ? this.alignTo(t) : this.center();
                this.emit("resize");
            }
            return this;
        },
        _freeze: function(e) {
            this._freezing = !!e;
            return this;
        },
        focus: function(e) {
            var t = this._, n = this.node, o = this._popup, a = i.current, s = t.zIndex;
            a && a !== this && a.blur(!1);
            if (!r.contains(n, I())) {
                var u = o.find("[autofocus]")[0];
                !t.focusing && u ? t.focusing = !0 : u = n;
                this._focus(u);
            }
            if (void 0 === s) {
                s = t.zIndex = i.zIndex++;
                o.css("zIndex", s);
                o.addClass(m + "-focus");
            }
            i.current = this;
            this.emit("focus");
            return this;
        },
        blur: function() {
            var e = this._, t = arguments[0], n = this._activeElement;
            if (!n) return this;
            t !== !1 && this._focus(n);
            delete e.focusing;
            delete this._activeElement;
            this._popup.removeClass(m + "-focus");
            this.emit("blur");
            return this;
        },
        _focus: function(e) {
            if (e && this._.autofocus && !/^iframe$/i.test(e.nodeName)) try {
                e.focus();
            } catch (t) {}
        },
        center: function() {
            var e = this._popup, t = this._.fixed, n = j(), i = q(), r = E(e), o = t ? 0 : n.x, a = t ? 0 : n.y, s = (i.w - r.w) / 2 + o, u = .382 * (i.h - r.h) + a;
            e.css({
                left: v(A(s), o),
                top: v(A(u), a)
            });
            return this;
        },
        alignTo: function(e, t) {
            var n = this, i = n._, o = n._popup, a = e.parentNode && r(e);
            if (!a) return n;
            var s = a.offset();
            if (s.left * s.top < 0) return n.center();
            t = t || i.align;
            var u = L(t), l = u.align, c = !u.auto;
            l && l.length || (l = [ "b" ]);
            var d = n._dirClass;
            d && o.removeClass(d);
            var f = i.fixed, h = q(), p = j(), g = P(o), v = S(o), b = $(e), x = P(a), _ = S(a), C = b.left, k = b.top, T = f ? C - p.x : C, E = f ? k - p.y : k, z = f ? 0 : p.x, I = f ? 0 : p.y, N = z + h.w - g, R = I + h.h - v, M = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, D = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, F = {}, O = [ {
                t: E - v,
                b: E + _,
                l: T - g,
                r: T + x
            }, {
                t: E,
                b: E - v + _,
                l: T,
                r: T - g + x
            } ], U = {
                l: T + y((x - g) / 2),
                t: E + y((_ - v) / 2)
            }, H = {
                left: [ z, N ],
                top: [ I, R ]
            };
            c || w(l, function(e, t) {
                O[t][e] > H[D[e]][1] && (e = l[t] = M[e]);
                O[t][e] < H[D[e]][0] && (l[t] = M[e]);
            });
            var B = l[0];
            if (!l[1]) {
                l[1] = "left" === D[B] ? "t" : "l";
                O[1][l[1]] = U[l[1]];
            }
            O[0][B] = O[0][B] + 10 * ("tl".indexOf(B) !== -1 ? -1 : 1);
            F[D[l[0]]] = A(O[0][l[0]]);
            F[D[l[1]]] = A(O[1][l[1]]);
            var W = m + "-" + B;
            o.css(F).addClass(W);
            n._dirClass = W;
            var G = n.$("arrow", 1), V = n.$("inner", 1);
            if (!G) {
                if (!V) return n;
                G = r('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(V);
            }
            var Z, Q, Y = "top" !== D[B], X = [ "v", "h" ][1 ^ Y], J = P(G), K = S(G), ee = {}, te = Y ? "left" : "top";
            switch (X) {
              case "h":
                Z = y(C + (x - J) / 2);
                ee.left = Z;
                break;

              case "v":
                Q = y(k + (_ - K) / 2);
                ee.top = Q;
            }
            G.offset(ee).css(te, "");
            return n;
        }
    });
    i.zIndex = 1024;
    i.current = null;
    n.exports = i;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), r = e("../../../core/1.0.0/utils/util"), o = e("../../../core/1.0.0/dom/delegator"), a = e("./popup"), s = r.extend, u = r.guid, l = r.each, c = window.document, d = {
        zIndex: 1024,
        title: "",
        close: !0,
        clickBlankToHide: !1,
        content: '<span class="ui-box-loading">Loading..</span>',
        className: "",
        width: "",
        height: "",
        button: null,
        buttonClass: "ui-box-btn",
        buttonClassLight: "autofocus",
        html: '<div node-type="inner" class="ui-box"><a node-type="close" action-type="close" class="ui-box-iconf ui-box-close">x</a><div node-type="header" class="ui-box-hd"><div node-type="title" class="ui-box-title"></div></div><div node-type="body" class="ui-box-bd"><div node-type="content" class="ui-box-content"></div></div><div node-type="footer" class="ui-box-ft"><div node-type="button" class="ui-box-func"></div></div></div>'
    }, f = {}, h = function(e) {
        var t = e || (e = {}), n = e.id || e.id || u(), r = h.get(n) || this;
        "string" != typeof e && 1 !== e.nodeType || (e = {
            content: e
        });
        e = s({}, d, e);
        e.original = t;
        var o, a = e.button || (e.button = []);
        if (!i.isArray(o = a)) {
            o = [];
            a && "object" == typeof a && l(a, function(e, t) {
                e.id = t;
                o.push(e);
            });
            a = e.button = o;
        }
        if (a.length > 0) {
            var c = !1;
            l(a, function(t, n) {
                var i = t.id || u();
                t.autofocus && (c = !0);
                e[i] && s(t, e[i]);
                t.index = n;
            });
            c || (a[a.length - 1].autofocus = !0);
        }
        r.emit("init", e);
        r.initialized ? r.options(e).focus() : r.init(e);
        f[n] = r;
        return r;
    };
    r.inherits(h, a, {
        init: function(e) {
            var t = this;
            a.call(t, e);
            var n = function(e) {
                var n = e.actionValue === !1 || e.isDefaultPrevented();
                n || t.hide();
            };
            t._delegator = new o(t.node, {
                context: t,
                onDelegate: n
            });
            t.delegate("close", function(e) {
                t.hide();
            }).once("render", function() {
                t.initComponents();
            }).on("destroy", function() {
                delete f[e.id];
                t._delegator.destroy();
            });
        },
        options: function(e) {
            var t = this, e = s(t._, e);
            t._freeze(!0);
            l([ "title", "content", "width", "height", "action", "button" ], function(n, i) {
                i = e[n];
                null != i && "function" == typeof t[n] && t[n](i);
            });
            t._freeze(!1).resize();
            e.zIndex && (a.zIndex = e.zIndex);
            return t;
        },
        initComponents: function() {
            var e = this, t = e._;
            e.$("header").hide();
            e.$("footer").hide();
            e.options();
            t.close || e.$("close").css("display", "none");
            t.clickBlankToHide && i(e.mask).on("onmousedown" in c ? "mousedown" : "click", function() {
                e.hide();
                return !1;
            });
            var n = function(t) {
                var n = t.target, i = n.nodeName, r = /^input|textarea$/i, o = a.current === e, s = t.keyCode;
                !o || r.test(i) && "button" !== n.type || 27 === s && e.hide();
            };
            i(c).on("keydown", n);
            e.on("destroy", function() {
                i(c).off("keydown", n);
            });
        },
        delegate: function(e, t, n) {
            var i = this._delegator;
            i.on.apply(i, arguments);
            return this;
        },
        undelegate: function(e, t, n) {
            var i = this._delegator;
            i.un.apply(i, arguments);
            return this;
        },
        content: function(e) {
            var t = this.$("content");
            if (e && e.nodeType) {
                i.contains(c, e) && this.on("beforeremove", function() {
                    i("body").append(e.hide());
                });
                e = i(e);
                t.empty().append(e.show());
            } else t.html(e);
            return this.resize();
        },
        title: function(e) {
            this.$("title").html(e);
            this.$("header")[e ? "show" : "hide"]();
            return this;
        },
        width: function(e) {
            if ("" !== e) {
                this.$("content").css("width", e);
                this.resize();
            }
            return this;
        },
        height: function(e) {
            if ("" !== e) {
                this.$("content").css("height", e);
                this.resize();
            }
            return this;
        },
        button: function(e) {
            e = e || [];
            var t = this, n = t._, i = "", r = 0, o = n.buttonClass;
            if ("string" == typeof e) {
                i = e;
                r++;
            } else l(e, function(e, a) {
                var s = e.id, u = e.fn || e.callback, l = e.display !== !1, c = e.className || o, d = [ c ];
                e.autofocus && d.push(n.buttonClassLight);
                "function" == typeof u && t.delegate(s, u);
                l && r++;
                i += '<button type="button" action-type="' + s + '"' + (l ? "" : ' style="display:none"') + (' class="' + d.join(" ") + '"') + (e.disabled ? " disabled" : "") + ">" + (e.text || e.value) + "</button>";
            });
            t.$("button").html(i);
            t.$("footer")[r ? "show" : "hide"]();
            t.resize();
            return t;
        },
        action: function(e) {
            var t = this;
            l(e, function(e, n) {
                t.delegate(n, e);
            });
            return t;
        }
    });
    h.getCurrent = function() {
        return a.current;
    };
    h.get = function(e) {
        return void 0 === e ? f : f[e];
    };
    h.config = function(e) {
        e && s(d, e);
    };
    n.exports = h;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), r = e("../../../core/1.0.0/utils/util"), o = e("./drag"), a = e("./dialog"), s = r.each, u = r.extend, l = window.clearTimeout, c = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var e = i('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + c + '"</i>').appendTo("body");
        setTimeout(function() {
            e.remove();
            e = null;
        }, 50);
    }();
    var d = {
        info: "&#x69;",
        warn: "&#x21;",
        confirm: "&#x3f;",
        ok: "&#x2714;",
        error: "&#x2718;",
        loading: '<img src="' + c + '" />'
    }, f = function(e) {
        var t = d[e];
        return t ? '<i node-type="icon" class="x-icon ui-box-iconf">' + t + "</i>" : "";
    }, h = r.guid("__x") + "$", p = function(e) {
        return h + e;
    }, m = function(e, t) {
        var n, i = t.xtype, r = i && f(i) || t.iconHTML;
        if (r) {
            n = e ? '<div node-type="text" class="x-text">' + e + "</div>" : "";
            e = [ '<div class="ui-box-x-wrap">', r, n, "</div>" ].join("");
        }
        return e;
    }, g = function(e) {
        var t = e.contentWindow;
        if (t) try {
            return t.document;
        } catch (n) {
            return 0;
        }
    }, v = function(e) {
        var t;
        e.once("init", function(n) {
            var i = {};
            s([ "title", "width", "height", "button" ], function(e) {
                i[e] = n[e];
                delete n[e];
            });
            e.once("load", function() {
                var n = e._;
                s(i, function(i, r) {
                    if (i) if ("title" === r) {
                        if ("auto" === i) try {
                            i = t.contentWindow.document.title || "";
                        } catch (o) {
                            i = "";
                        }
                        i && e.title(i);
                    } else "function" == typeof e[r] ? e[r](i) : n[r] = i;
                });
            });
        }).once("render", function() {
            var n = e._;
            setTimeout(function() {
                t = y(e, n.url);
                e.iframeNode = t;
            }, 30);
            var r = n.original;
            if (!(r instanceof Object)) for (var o = function() {
                e.hide().destroy();
            }, a = 0; a < frames.length; a++) try {
                if (r instanceof frames[a].Object) {
                    i(frames[a]).one("unload", o);
                    break;
                }
            } catch (s) {}
        }).once("beforeremove", function() {
            i(t).attr("src", "about:blank").remove();
        }, !1);
    }, y = function(e, t) {
        var n = e._, r = e.$("content"), o = r.find("iframe"), a = o && o[0], s = function(t) {
            e._freeze(!0);
            if (t) {
                n.width || e.width(t.width);
                n.height || e.height(t.height);
            }
            e.emit("load");
            e._freeze(!1).resize();
            s = null;
            o.removeAttr("style");
            o = a = null;
        }, u = function(t) {
            n.showing ? e.once("shown", t) : t();
        };
        if (!o.length) {
            var l = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), c = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (l ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + t + '"></iframe>';
            o = i(c.replace(/{id}/g, n.id)).appendTo(r);
            a = o[0];
            n.autoSize ? o.one("load", function() {
                var e, t, n, r = g(a), l = r && i(r);
                if (l) {
                    e = l.width();
                    o.width(e);
                    t = l.height();
                    n = {
                        width: e,
                        height: t
                    };
                }
                u(function() {
                    s(n);
                });
            }) : u(function() {
                s();
            });
        }
        return a;
    }, b = function(e) {
        var t = this;
        e = u({}, e);
        var n = e.button || (e.button = []);
        s([ "cancel", "ok" ], function(t, i) {
            var r = e[t];
            if (r && "object" == typeof r) {
                r.id = t;
                n.push(r);
                delete e[t];
            }
        });
        var r = e.xtype;
        if (r) {
            e.id = e.id || p(r);
            e.content = m(e.content, e);
            "none" !== r && (e.className = (e.className || "") + " ui-box-x-" + r);
        } else {
            var l = e.url;
            if (l) {
                var c = e.close !== !1;
                e = u({
                    modal: !0,
                    close: !1,
                    autoRelease: !0,
                    autoSize: !0,
                    scrolling: "auto"
                }, e);
                var d = i(m("Loading...", {
                    xtype: "loading"
                })).addClass("ui-box-x-loading");
                e.content = d;
                e.className = (e.className || "") + " ui-box-iframe";
                t.once("load", function() {
                    d.remove();
                    d = null;
                    c && t.$("close").show();
                });
                t.on("hidden", function() {
                    t.destroy();
                });
                v(t);
            }
        }
        t = a.call(t, e) || t;
        t._ready || t.once("render", function() {
            var n = t.$("title");
            if (n.length && e.drag !== !1) {
                n.css("cursor", "move");
                o.create(t.node, null, {
                    hook: n,
                    onstart: function() {
                        t.anchor || t.focus();
                    }
                });
            }
        });
        return t;
    }, x = "__showDelay", w = "__hideTimer";
    r.inherits(b, a, {
        show: function(e, t) {
            var n = this, i = n._, o = [].slice.call(arguments), t = u({}, i, t), a = t.duration || 0, s = t.delay || 0, c = function() {
                r.each([ x, w ], function(e, t) {
                    t = i[e];
                    delete i[e];
                    t && l(t);
                });
            }, d = function() {
                if (a > 0) {
                    i[w] = setTimeout(function() {
                        c();
                        n.hide();
                    }, a);
                    n.once("hide", c);
                }
                b.__super__.show.apply(n, o);
            };
            c();
            s > 0 ? i[x] = setTimeout(d, s) : d();
            return n;
        },
        hide: function() {
            var e = this, t = e._;
            t && r.each([ x, w ], function(e, n) {
                n = t[e];
                delete t[e];
                n && l(n);
            });
            b.__super__.hide.apply(e, arguments);
            return e;
        }
    });
    b.config = a.config;
    b.get = function(e) {
        if (e) {
            var t, n, i = a.get();
            if (e && (t = e.frameElement)) for (var r in i) if (i.hasOwnProperty(r)) {
                n = i[r];
                if (n.iframeNode === t) return n;
            }
            return i[e];
        }
    };
    n.exports = b;
});

define("lib/ui/box/1.0.1/box", [ "require", "exports", "module", "./messagebox", "../../../core/1.0.0/utils/util" ], function(e, t, n) {
    "use strict";
    var i = e("./messagebox"), r = e("../../../core/1.0.0/utils/util"), o = function() {}, a = r.mix, s = function(e, t) {
        var n = function(e, t) {
            return void 0 !== t && null !== t && "" !== t && !("number" == typeof t && isNaN(t));
        };
        return function(e, t) {
            return a(e, t, !0, !0, n);
        };
    }(), u = function(e) {
        return !!(e && e.nodeType && e.tagName);
    }, l = r.guid, c = function() {
        return l("__0x$");
    }, d = function(e) {
        var t, n = e[1] || {};
        t = e[0];
        t && ("string" == typeof t ? n.html = t : "object" == typeof t && (n = t));
        var i = n.skin;
        if (i) {
            n.className = i;
            delete n.skin;
        }
        return n;
    }, f = function(e, t) {
        var t = d([ e, t ]);
        return new i(t);
    }, h = function(e, t, n) {
        if ("object" == typeof e) {
            n = t;
            t = e;
            e = "";
        } else if (u(t)) {
            n = t;
            t = {};
        } else "number" == typeof t && (t = {
            duration: t
        });
        t = t || {};
        var i = f(s({
            id: c(),
            content: e,
            className: "ui-bubble",
            autofocus: !1,
            autoRelease: !0,
            close: !1,
            xtype: "none",
            align: "top",
            duration: 2e3,
            hideWithAni: "fadeOut",
            showWithAni: "fadeInUp"
        }, t));
        return t.hide ? i : i.show(n);
    }, p = {
        create: f,
        loadUrl: function(e, t) {
            t = t || {};
            t.url = e;
            var n = f(t);
            return n.show();
        },
        loading: function(e, t) {
            t = t || {};
            var n = f(s({
                autofocus: !0,
                autoRelease: !0,
                id: c(),
                modal: !0,
                close: !1,
                xtype: "loading",
                content: e || ""
            }, t));
            return t.hide ? n : n.show();
        },
        alert: function(e, t) {
            "function" == typeof t && (t = {
                ok: {
                    fn: t
                }
            });
            t = s({
                title: "提示",
                xtype: "info",
                className: "ui-box-alert",
                autofocus: !0,
                id: c(),
                modal: !0,
                autoRelease: !0,
                content: "<div>" + e + "</div>",
                ok: {
                    text: "确定",
                    fn: function() {}
                }
            }, t);
            return f(t).show();
        },
        confirm: function(e, t, n, i) {
            var r;
            if (!i && n && "object" == typeof n) {
                u(n) ? i = n : r = n;
                n = t;
            }
            if ("function" != typeof t) {
                r = t;
                t = o;
            }
            "function" != typeof n && (n = t);
            var a = function(e) {
                e ? t(e) : n(e);
            };
            r && (i = i || r.sender);
            var l = f(s({
                xtype: "confirm",
                autofocus: !0,
                id: c(),
                modal: !i,
                autoRelease: !0,
                content: "<div>" + e + "</div>",
                close: !1,
                ok: {
                    text: "确定",
                    fn: function() {
                        a(!0);
                    }
                },
                cancel: {
                    text: "取消",
                    fn: function() {
                        a(!1);
                    }
                }
            }, r));
            return l.show(i);
        },
        bubble: h
    };
    p.tips = p.bubble;
    r.each([ "ok", "info", "warn", "error" ], function(e, t) {
        p[e] = function(t, n, i) {
            var r = {
                xtype: e
            };
            if (n && n.nodeType) {
                i = n;
                n = void 0;
            } else "number" == typeof n ? r.duration = n : r = s(r, n);
            return h(t, r, i);
        };
    });
    p.get = i.get;
    p.config = i.config;
    n.exports = p;
});

!function(e, t, n) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], n) : e[t] = n(e.jQuery || e.Zepto);
}(this, "Lazyload", function(e, t) {
    "use strict";
    if (!e) throw "Error: jquery api not implements.";
    var n = e.each, i = function(e, t) {
        if (e instanceof Array && e.filter) return e.filter(t);
        for (var n = [], i = -1, r = e.length; ++i < r; ) t(e[i], i) && n.push(e[i]);
        return n;
    }, r = function(e, t, n, i) {
        var r;
        return function() {
            var o = i || this, a = arguments, s = function() {
                r = null;
                n || e.apply(o, a);
            }, u = n && !r;
            clearTimeout(r);
            r = setTimeout(s, t);
            u && e.apply(o, a);
        };
    }, o = function(t, n) {
        t = t || {};
        var i = e(t), r = Array.prototype.slice;
        n = n || t.name;
        e.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(e, o) {
            t[e] = function(t) {
                var a = r.call(arguments, 0), s = a[1];
                n && !~t.indexOf(".") && (a[0] = t + "." + n);
                "function" == typeof s && ("on" === e || "once" === e ? a[1] = s.__ || (s.__ = function(e) {
                    e.preventDefault();
                    return s.apply(this, r.call(arguments, 1));
                }) : "un" === e && (a[1] = s.__));
                return i[o].apply(i, a);
            };
        });
        return t;
    }, a = window, s = e(a), u = a.Image, l = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", d = 0, f = 1, h = 2, p = function(e) {
        return e[c] === t;
    }, m = function() {
        var e = {}, t = function(t, n) {
            "function" == typeof n && (e[t] = n);
        }, n = function(t) {
            return e[t];
        };
        return {
            define: t,
            get: n
        };
    }();
    m.define("image", function(n, i, r, o) {
        if (i) {
            var a = new u(), s = function() {
                a.onload = a.onerror = null;
                a = i = n = o = s = t;
            };
            a.onload = function() {
                var t = e(n), a = r.effect;
                "function" != typeof t[a] && (a = "show");
                t.hide();
                "IMG" === n.nodeName.toUpperCase() ? t.attr("src", i) : t.css("background-image", 'url("' + i + '")');
                t[a](r.effectSpeed);
                o(null, "load");
                s();
            };
            a.onerror = function(e) {
                o(e);
                s();
            };
            a.src = i;
        } else o("error");
    });
    m.define("html", function(e, t, n, i) {
        i();
    });
    var g = function(t, u) {
        u = u || {};
        t = e(t);
        var g = this, w = {
            type: "image",
            threshold: 50,
            failureLimit: 0,
            event: "scroll",
            effect: "show",
            container: a,
            dataAttribute: "src",
            sourceMaker: null,
            skipInvisible: !0,
            appear: null,
            load: null,
            loadingClass: "",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        o(g);
        var _ = u.type || w.type, C = m.get(_);
        if ("function" != typeof C) throw "Error, cannot found the specific type loader (type: `" + _ + "`)";
        "html" === _ && (w.placeholder = "");
        u && e.extend(w, u);
        var A = w.container, k = w.event, T = 0 === k.indexOf("scroll"), j = A && A !== a ? e(A) : s, E = function(t) {
            var i = g._list;
            if (i.length > 0) {
                var r = 0;
                n(i.slice(0), function(t, n) {
                    var i = e(n);
                    if (!w.skipInvisible || i.is(":visible")) if (b(n, w) || x(n, w)) ; else if (v(n, w) || y(n, w)) {
                        if (++r > w.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        r = 0;
                    }
                });
            } else g.reset();
        }, q = function() {
            g._list = i(g._list, function(e) {
                return !e[c];
            });
        }, $ = function() {
            var t = this, n = e(t), i = n.attr("data-" + w.dataAttribute), r = w.sourceMaker, o = w.appear, a = w.loadingClass, s = t[c];
            if (s === d) {
                t[c] = f;
                a && n.addClass(a);
                r && (i = r(i, t));
                o && o.apply(g, [ t, i ]);
                C.call(g, t, i, w, function(e, r) {
                    if (!g._destroyed) {
                        a && n.removeClass(a);
                        if (e) setTimeout(function() {
                            t[c] = d;
                            g.emit("lazyItemError", t, i, e);
                            t = null;
                        }, 300); else {
                            t[c] = h;
                            q();
                            g.emit("lazyItemReady", t, i, r);
                            var o = w.load;
                            o && o.apply(g, [ t, i, r ]);
                            t = null;
                        }
                        n = null;
                    }
                });
            } else if (s === h) {
                q();
                g.emit("lazyItemReady", t, i);
            }
        }, z = function() {
            this[c] || e(this).trigger("appear");
        }, P = function(t) {
            var n = e(t);
            t[c] = d;
            var i = w.placeholder;
            if (i) if (n.is("img")) {
                var r = n.attr("src");
                r || n.attr("src", i);
            } else "image" === g._.type || n.children()[0] || n.html(i);
            n.on("appear", $);
            T || n.on(k, z);
            g._list.push(t);
        }, S = function(e) {
            e = i(e || [], p);
            if (e.length) {
                n(e, function(e, t) {
                    P(t);
                });
                g._inited || I(g);
            }
        }, I = function(t) {
            if (!t._inited) {
                var i = r(E, 30);
                t._inited = !0;
                T && j.on(k, i);
                s.on("resize", i);
                if (l) {
                    var o = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(t._list, function(t, n) {
                            e(n).trigger("appear");
                        });
                    };
                    s.on("pageshow", o);
                    t.once("reset", function() {
                        s.off("pageshow", o);
                    });
                }
                t.once("reset", function() {
                    n(t._list, function(e, t) {
                        L(t);
                    });
                    T && j.off(k, i);
                    s.off("resize", i);
                });
                e(document).ready(E);
            }
        }, L = function(t) {
            var n = e(t);
            n.off("appear", $);
            T || n.off(k, z);
        };
        g.on("lazyItemReady", function(e) {
            L(e);
        });
        g.once("destroy", function() {
            S = null;
            E = null;
            q = null;
            $ = null;
            z = null;
        });
        g._ = w;
        g._list = [];
        g.add = function(t) {
            var n = e(t);
            n.length > 0 && S(n);
        };
        g.update = E;
        S(t);
    };
    g.prototype = {
        constructor: g,
        update: function() {},
        peek: function() {
            var e = this._list, n = e.length;
            return n > 0 ? e[0] : t;
        },
        reset: function() {
            if (!this._inited) return this;
            this._inited = !1;
            this.emit("reset");
            this._list.length = 0;
            return this;
        },
        destroy: function() {
            if (!this._destroyed) {
                this._destroyed = !0;
                this.reset().emit("destroy");
                this.un();
                this._ = null;
            }
        }
    };
    g.define = function(e, t) {
        return m.define(e, t);
    };
    var v = function(t, n) {
        var i, r = n.container;
        i = r && r !== a ? e(r).offset().top + e(r).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return i <= e(t).offset().top - n.threshold;
    }, y = function(t, n) {
        var i, r = n.container;
        i = r && r !== a ? e(r).offset().left + e(r).width() : s.width() + s.scrollLeft();
        return i <= e(t).offset().left - n.threshold;
    }, b = function(t, n) {
        var i, r = n.container;
        i = r && r !== a ? e(r).offset().top : s.scrollTop();
        return i >= e(t).offset().top + n.threshold + e(t).height();
    }, x = function(t, n) {
        var i, r = n.container;
        i = r && r !== a ? e(r).offset().left : s.scrollLeft();
        return i >= e(t).offset().left + n.threshold + e(t).width();
    }, w = function(e, t) {
        return !(y(e, t) || x(e, t) || v(e, t) || b(e, t));
    };
    g.belowthefold = v;
    g.rightoffold = y;
    g.abovethetop = b;
    g.leftofbegin = x;
    g.inviewport = w;
    return g;
});

!function(e) {
    "function" == typeof define && define.amd ? define("lib/plugins/validation/1.15.1/jquery-validate", [ "jquery" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery);
}(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (this.length) {
                var n = e.data(this[0], "validator");
                if (n) return n;
                this.attr("novalidate", "novalidate");
                n = new e.validator(t, this[0]);
                e.data(this[0], "validator", n);
                if (n.settings.onsubmit) {
                    this.on("click.validate", ":submit", function(t) {
                        n.settings.submitHandler && (n.submitButton = t.target);
                        e(this).hasClass("cancel") && (n.cancelSubmit = !0);
                        void 0 !== e(this).attr("formnovalidate") && (n.cancelSubmit = !0);
                    });
                    this.on("submit.validate", function(t) {
                        function i() {
                            var i, r;
                            if (n.settings.submitHandler) {
                                n.submitButton && (i = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm));
                                r = n.settings.submitHandler.call(n, n.currentForm, t);
                                n.submitButton && i.remove();
                                return void 0 !== r && r;
                            }
                            return !0;
                        }
                        n.settings.debug && t.preventDefault();
                        if (n.cancelSubmit) {
                            n.cancelSubmit = !1;
                            return i();
                        }
                        if (n.form()) {
                            if (n.pendingRequest) {
                                n.formSubmitted = !0;
                                return !1;
                            }
                            return i();
                        }
                        n.focusInvalid();
                        return !1;
                    });
                }
                return n;
            }
            t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
        },
        valid: function() {
            var t, n, i;
            if (e(this[0]).is("form")) t = this.validate().form(); else {
                i = [];
                t = !0;
                n = e(this[0].form).validate();
                this.each(function() {
                    t = n.element(this) && t;
                    t || (i = i.concat(n.errorList));
                });
                n.errorList = i;
            }
            return t;
        },
        rules: function(t, n) {
            var i, r, o, a, s, u, l = this[0];
            if (null != l && null != l.form) {
                if (t) {
                    i = e.data(l.form, "validator").settings;
                    r = i.rules;
                    o = e.validator.staticRules(l);
                    switch (t) {
                      case "add":
                        e.extend(o, e.validator.normalizeRule(n));
                        delete o.messages;
                        r[l.name] = o;
                        n.messages && (i.messages[l.name] = e.extend(i.messages[l.name], n.messages));
                        break;

                      case "remove":
                        if (!n) {
                            delete r[l.name];
                            return o;
                        }
                        u = {};
                        e.each(n.split(/\s/), function(t, n) {
                            u[n] = o[n];
                            delete o[n];
                            "required" === n && e(l).removeAttr("aria-required");
                        });
                        return u;
                    }
                }
                a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(l), e.validator.attributeRules(l), e.validator.dataRules(l), e.validator.staticRules(l)), l);
                if (a.required) {
                    s = a.required;
                    delete a.required;
                    a = e.extend({
                        required: s
                    }, a);
                    e(l).attr("aria-required", "true");
                }
                if (a.remote) {
                    s = a.remote;
                    delete a.remote;
                    a = e.extend(a, {
                        remote: s
                    });
                }
                return a;
            }
        }
    });
    e.extend(e.expr[":"], {
        blank: function(t) {
            return !e.trim("" + e(t).val());
        },
        filled: function(t) {
            var n = e(t).val();
            return null !== n && !!e.trim("" + n);
        },
        unchecked: function(t) {
            return !e(t).prop("checked");
        }
    });
    e.validator = function(t, n) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t);
        this.currentForm = n;
        this.init();
    };
    e.validator.format = function(t, n) {
        if (1 === arguments.length) return function() {
            var n = e.makeArray(arguments);
            n.unshift(t);
            return e.validator.format.apply(this, n);
        };
        if (void 0 === n) return t;
        arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1));
        n.constructor !== Array && (n = [ n ]);
        e.each(n, function(e, n) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                return n;
            });
        });
        return t;
    };
    e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e;
                if (this.settings.focusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass);
                    this.hideThese(this.errorsFor(e));
                }
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e);
            },
            onkeyup: function(t, n) {
                var i = [ 16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225 ];
                9 === n.which && "" === this.elementValue(t) || e.inArray(n.keyCode, i) !== -1 || (t.name in this.submitted || t.name in this.invalid) && this.element(t);
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode);
            },
            highlight: function(t, n, i) {
                "radio" === t.type ? this.findByName(t.name).addClass(n).removeClass(i) : e(t).addClass(n).removeClass(i);
            },
            unhighlight: function(t, n, i) {
                "radio" === t.type ? this.findByName(t.name).removeClass(n).addClass(i) : e(t).removeClass(n).addClass(i);
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t);
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function t(t) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]);
                    var n = e.data(this.form, "validator"), i = "on" + t.type.replace(/^validate/, ""), r = n.settings;
                    r[i] && !e(this).is(r.ignore) && r[i].call(n, this, t);
                }
                this.labelContainer = e(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm);
                this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var n, i = this.groups = {};
                e.each(this.settings.groups, function(t, n) {
                    "string" == typeof n && (n = n.split(/\s/));
                    e.each(n, function(e, n) {
                        i[n] = t;
                    });
                });
                n = this.settings.rules;
                e.each(n, function(t, i) {
                    n[t] = e.validator.normalizeRule(i);
                });
                e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t);
                this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },
            form: function() {
                this.checkForm();
                e.extend(this.submitted, this.errorMap);
                this.invalid = e.extend({}, this.errorMap);
                this.valid() || e(this.currentForm).triggerHandler("invalid-form", [ this ]);
                this.showErrors();
                return this.valid();
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid();
            },
            element: function(t) {
                var n, i, r = this.clean(t), o = this.validationTargetFor(r), a = this, s = !0;
                if (void 0 === o) delete this.invalid[r.name]; else {
                    this.prepareElement(o);
                    this.currentElements = e(o);
                    i = this.groups[o.name];
                    i && e.each(this.groups, function(e, t) {
                        if (t === i && e !== o.name) {
                            r = a.validationTargetFor(a.clean(a.findByName(e)));
                            if (r && r.name in a.invalid) {
                                a.currentElements.push(r);
                                s = a.check(r) && s;
                            }
                        }
                    });
                    n = this.check(o) !== !1;
                    s = s && n;
                    n ? this.invalid[o.name] = !1 : this.invalid[o.name] = !0;
                    this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers));
                    this.showErrors();
                    e(t).attr("aria-invalid", !n);
                }
                return s;
            },
            showErrors: function(t) {
                if (t) {
                    var n = this;
                    e.extend(this.errorMap, t);
                    this.errorList = e.map(this.errorMap, function(e, t) {
                        return {
                            message: e,
                            element: n.findByName(t)[0]
                        };
                    });
                    this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t);
                    });
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm();
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t);
            },
            resetElements: function(e) {
                var t;
                if (this.settings.unhighlight) for (t = 0; e[t]; t++) {
                    this.settings.unhighlight.call(this, e[t], this.settings.errorClass, "");
                    this.findByName(e[t].name).removeClass(this.settings.validClass);
                } else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },
            objectLength: function(e) {
                var t, n = 0;
                for (t in e) e[t] && n++;
                return n;
            },
            hideErrors: function() {
                this.hideThese(this.toHide);
            },
            hideThese: function(e) {
                e.not(this.containers).text("");
                this.addWrapper(e).hide();
            },
            valid: function() {
                return 0 === this.size();
            },
            size: function() {
                return this.errorList.length;
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function(e) {
                    return e.element.name === t.name;
                }).length && t;
            },
            elements: function() {
                var t = this, n = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var i = this.name || e(this).attr("name");
                    !i && t.settings.debug && window.console && console.error("%o has no name assigned", this);
                    this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]);
                    if (i in n || !t.objectLength(e(this).rules())) return !1;
                    n[i] = !0;
                    return !0;
                });
            },
            clean: function(t) {
                return e(t)[0];
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext);
            },
            resetInternals: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = e([]);
                this.toHide = e([]);
            },
            reset: function() {
                this.resetInternals();
                this.currentElements = e([]);
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function(e) {
                this.reset();
                this.toHide = this.errorsFor(e);
            },
            elementValue: function(t) {
                var n, i, r = e(t), o = t.type;
                if ("radio" === o || "checkbox" === o) return this.findByName(t.name).filter(":checked").val();
                if ("number" === o && "undefined" != typeof t.validity) return t.validity.badInput ? "NaN" : r.val();
                n = t.hasAttribute("contenteditable") ? r.text() : r.val();
                if ("file" === o) {
                    if ("C:\\fakepath\\" === n.substr(0, 12)) return n.substr(12);
                    i = n.lastIndexOf("/");
                    if (i >= 0) return n.substr(i + 1);
                    i = n.lastIndexOf("\\");
                    return i >= 0 ? n.substr(i + 1) : n;
                }
                return "string" == typeof n ? n.replace(/\r/g, "") : n;
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var n, i, r, o = e(t).rules(), a = e.map(o, function(e, t) {
                    return t;
                }).length, s = !1, u = this.elementValue(t);
                if ("function" == typeof o.normalizer) {
                    u = o.normalizer.call(t, u);
                    if ("string" != typeof u) throw new TypeError("The normalizer should return a string value.");
                    delete o.normalizer;
                }
                for (i in o) {
                    r = {
                        method: i,
                        parameters: o[i]
                    };
                    try {
                        n = e.validator.methods[i].call(this, u, t, r.parameters);
                        if ("dependency-mismatch" === n && 1 === a) {
                            s = !0;
                            continue;
                        }
                        s = !1;
                        if ("pending" === n) {
                            this.toHide = this.toHide.not(this.errorsFor(t));
                            return;
                        }
                        if (!n) {
                            this.formatAndAdd(t, r);
                            return !1;
                        }
                    } catch (l) {
                        this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", l);
                        l instanceof TypeError && (l.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.");
                        throw l;
                    }
                }
                if (!s) {
                    this.objectLength(o) && this.successList.push(t);
                    return !0;
                }
            },
            customDataMessage: function(t, n) {
                return e(t).data("msg" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()) || e(t).data("msg");
            },
            customMessage: function(e, t) {
                var n = this.settings.messages[e];
                return n && (n.constructor === String ? n : n[t]);
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++) if (void 0 !== arguments[e]) return arguments[e];
            },
            defaultMessage: function(t, n) {
                "string" == typeof n && (n = {
                    method: n
                });
                var i = this.findDefined(this.customMessage(t.name, n.method), this.customDataMessage(t, n.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[n.method], "<strong>Warning: No message defined for " + t.name + "</strong>"), r = /\$?\{(\d+)\}/g;
                "function" == typeof i ? i = i.call(this, n.parameters, t) : r.test(i) && (i = e.validator.format(i.replace(r, "{$1}"), n.parameters));
                return i;
            },
            formatAndAdd: function(e, t) {
                var n = this.defaultMessage(e, t);
                this.errorList.push({
                    message: n,
                    element: e,
                    method: t.method
                });
                this.errorMap[e.name] = n;
                this.submitted[e.name] = n;
            },
            addWrapper: function(e) {
                this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper)));
                return e;
            },
            defaultShowErrors: function() {
                var e, t, n;
                for (e = 0; this.errorList[e]; e++) {
                    n = this.errorList[e];
                    this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(n.element, n.message);
                }
                this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                if (this.settings.success) for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight) for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element;
                });
            },
            showLabel: function(t, n) {
                var i, r, o, a, s = this.errorsFor(t), u = this.idOrName(t), l = e(t).attr("aria-describedby");
                if (s.length) {
                    s.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    s.html(n);
                } else {
                    s = e("<" + this.settings.errorElement + ">").attr("id", u + "-error").addClass(this.settings.errorClass).html(n || "");
                    i = s;
                    this.settings.wrapper && (i = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent());
                    this.labelContainer.length ? this.labelContainer.append(i) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, i, e(t)) : i.insertAfter(t);
                    if (s.is("label")) s.attr("for", u); else if (0 === s.parents("label[for='" + this.escapeCssMeta(u) + "']").length) {
                        o = s.attr("id");
                        l ? l.match(new RegExp("\\b" + this.escapeCssMeta(o) + "\\b")) || (l += " " + o) : l = o;
                        e(t).attr("aria-describedby", l);
                        r = this.groups[t.name];
                        if (r) {
                            a = this;
                            e.each(a.groups, function(t, n) {
                                n === r && e("[name='" + a.escapeCssMeta(t) + "']", a.currentForm).attr("aria-describedby", s.attr("id"));
                            });
                        }
                    }
                }
                if (!n && this.settings.success) {
                    s.text("");
                    "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, t);
                }
                this.toShow = this.toShow.add(s);
            },
            errorsFor: function(t) {
                var n = this.escapeCssMeta(this.idOrName(t)), i = e(t).attr("aria-describedby"), r = "label[for='" + n + "'], label[for='" + n + "'] *";
                i && (r = r + ", #" + this.escapeCssMeta(i).replace(/\s+/g, ", #"));
                return this.errors().filter(r);
            },
            escapeCssMeta: function(e) {
                return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1");
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name);
            },
            validationTargetFor: function(t) {
                this.checkable(t) && (t = this.findByName(t.name));
                return e(t).not(this.settings.ignore)[0];
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type);
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']");
            },
            getLength: function(t, n) {
                switch (n.nodeName.toLowerCase()) {
                  case "select":
                    return e("option:selected", n).length;

                  case "input":
                    if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length;
                }
                return t.length;
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t);
            },
            dependTypes: {
                "boolean": function(e) {
                    return e;
                },
                string: function(t, n) {
                    return !!e(t, n.form).length;
                },
                "function": function(e, t) {
                    return e(t);
                }
            },
            optional: function(t) {
                var n = this.elementValue(t);
                return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch";
            },
            startRequest: function(t) {
                if (!this.pending[t.name]) {
                    this.pendingRequest++;
                    e(t).addClass(this.settings.pendingClass);
                    this.pending[t.name] = !0;
                }
            },
            stopRequest: function(t, n) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                e(t).removeClass(this.settings.pendingClass);
                if (n && 0 === this.pendingRequest && this.formSubmitted && this.form()) {
                    e(this.currentForm).submit();
                    this.formSubmitted = !1;
                } else if (!n && 0 === this.pendingRequest && this.formSubmitted) {
                    e(this.currentForm).triggerHandler("invalid-form", [ this ]);
                    this.formSubmitted = !1;
                }
            },
            previousValue: function(t, n) {
                n = "string" == typeof n && n || "remote";
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: n
                    })
                });
            },
            destroy: function() {
                this.resetForm();
                e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur");
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, n) {
            t.constructor === String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t);
        },
        classRules: function(t) {
            var n = {}, i = e(t).attr("class");
            i && e.each(i.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this]);
            });
            return n;
        },
        normalizeAttributeRule: function(e, t, n, i) {
            if (/min|max|step/.test(n) && (null === t || /number|range|text/.test(t))) {
                i = Number(i);
                isNaN(i) && (i = void 0);
            }
            i || 0 === i ? e[n] = i : t === n && "range" !== t && (e[n] = !0);
        },
        attributeRules: function(t) {
            var n, i, r = {}, o = e(t), a = t.getAttribute("type");
            for (n in e.validator.methods) {
                if ("required" === n) {
                    i = t.getAttribute(n);
                    "" === i && (i = !0);
                    i = !!i;
                } else i = o.attr(n);
                this.normalizeAttributeRule(r, a, n, i);
            }
            r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength;
            return r;
        },
        dataRules: function(t) {
            var n, i, r = {}, o = e(t), a = t.getAttribute("type");
            for (n in e.validator.methods) {
                i = o.data("rule" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase());
                this.normalizeAttributeRule(r, a, n, i);
            }
            return r;
        },
        staticRules: function(t) {
            var n = {}, i = e.data(t.form, "validator");
            i.settings.rules && (n = e.validator.normalizeRule(i.settings.rules[t.name]) || {});
            return n;
        },
        normalizeRules: function(t, n) {
            e.each(t, function(i, r) {
                if (r !== !1) {
                    if (r.param || r.depends) {
                        var o = !0;
                        switch (typeof r.depends) {
                          case "string":
                            o = !!e(r.depends, n.form).length;
                            break;

                          case "function":
                            o = r.depends.call(n, n);
                        }
                        if (o) t[i] = void 0 === r.param || r.param; else {
                            e.data(n.form, "validator").resetElements(e(n));
                            delete t[i];
                        }
                    }
                } else delete t[i];
            });
            e.each(t, function(i, r) {
                t[i] = e.isFunction(r) && "normalizer" !== i ? r(n) : r;
            });
            e.each([ "minlength", "maxlength" ], function() {
                t[this] && (t[this] = Number(t[this]));
            });
            e.each([ "rangelength", "range" ], function() {
                var n;
                if (t[this]) if (e.isArray(t[this])) t[this] = [ Number(t[this][0]), Number(t[this][1]) ]; else if ("string" == typeof t[this]) {
                    n = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                    t[this] = [ Number(n[0]), Number(n[1]) ];
                }
            });
            if (e.validator.autoCreateRanges) {
                if (null != t.min && null != t.max) {
                    t.range = [ t.min, t.max ];
                    delete t.min;
                    delete t.max;
                }
                if (null != t.minlength && null != t.maxlength) {
                    t.rangelength = [ t.minlength, t.maxlength ];
                    delete t.minlength;
                    delete t.maxlength;
                }
            }
            return t;
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var n = {};
                e.each(t.split(/\s/), function() {
                    n[this] = !0;
                });
                t = n;
            }
            return t;
        },
        addMethod: function(t, n, i) {
            e.validator.methods[t] = n;
            e.validator.messages[t] = void 0 !== i ? i : e.validator.messages[t];
            n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t));
        },
        methods: {
            required: function(t, n, i) {
                if (!this.depend(i, n)) return "dependency-mismatch";
                if ("select" === n.nodeName.toLowerCase()) {
                    var r = e(n).val();
                    return r && r.length > 0;
                }
                return this.checkable(n) ? this.getLength(t, n) > 0 : t.length > 0;
            },
            email: function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e);
            },
            url: function(e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e);
            },
            date: function(e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString());
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e);
            },
            number: function(e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e);
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e);
            },
            minlength: function(t, n, i) {
                var r = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || r >= i;
            },
            maxlength: function(t, n, i) {
                var r = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || r <= i;
            },
            rangelength: function(t, n, i) {
                var r = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || r >= i[0] && r <= i[1];
            },
            min: function(e, t, n) {
                return this.optional(t) || e >= n;
            },
            max: function(e, t, n) {
                return this.optional(t) || e <= n;
            },
            range: function(e, t, n) {
                return this.optional(t) || e >= n[0] && e <= n[1];
            },
            step: function(t, n, i) {
                var r, o = e(n).attr("type"), a = "Step attribute on input type " + o + " is not supported.", s = [ "text", "number", "range" ], u = new RegExp("\\b" + o + "\\b"), l = o && !u.test(s.join()), c = function(e) {
                    var t = ("" + e).match(/(?:\.(\d+))?$/);
                    return t && t[1] ? t[1].length : 0;
                }, d = function(e) {
                    return Math.round(e * Math.pow(10, r));
                }, f = !0;
                if (l) throw new Error(a);
                r = c(i);
                (c(t) > r || d(t) % d(i) !== 0) && (f = !1);
                return this.optional(n) || f;
            },
            equalTo: function(t, n, i) {
                var r = e(i);
                this.settings.onfocusout && r.not(".validate-equalTo-blur").length && r.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    e(n).valid();
                });
                return t === r.val();
            },
            remote: function(t, n, i, r) {
                if (this.optional(n)) return "dependency-mismatch";
                r = "string" == typeof r && r || "remote";
                var o, a, s, u = this.previousValue(n, r);
                this.settings.messages[n.name] || (this.settings.messages[n.name] = {});
                u.originalMessage = u.originalMessage || this.settings.messages[n.name][r];
                this.settings.messages[n.name][r] = u.message;
                i = "string" == typeof i && {
                    url: i
                } || i;
                s = e.param(e.extend({
                    data: t
                }, i.data));
                if (u.old === s) return u.valid;
                u.old = s;
                o = this;
                this.startRequest(n);
                a = {};
                a[n.name] = t;
                e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + n.name,
                    dataType: "json",
                    data: a,
                    context: o.currentForm,
                    success: function(e) {
                        var i, a, s, l = e === !0 || "true" === e;
                        o.settings.messages[n.name][r] = u.originalMessage;
                        if (l) {
                            s = o.formSubmitted;
                            o.resetInternals();
                            o.toHide = o.errorsFor(n);
                            o.formSubmitted = s;
                            o.successList.push(n);
                            o.invalid[n.name] = !1;
                            o.showErrors();
                        } else {
                            i = {};
                            a = e || o.defaultMessage(n, {
                                method: r,
                                parameters: t
                            });
                            i[n.name] = u.message = a;
                            o.invalid[n.name] = !0;
                            o.showErrors(i);
                        }
                        u.valid = l;
                        o.stopRequest(n, l);
                    }
                }, i));
                return "pending";
            }
        }
    });
    var t, n = {};
    if (e.ajaxPrefilter) e.ajaxPrefilter(function(e, t, i) {
        var r = e.port;
        if ("abort" === e.mode) {
            n[r] && n[r].abort();
            n[r] = i;
        }
    }); else {
        t = e.ajax;
        e.ajax = function(i) {
            var r = ("mode" in i ? i : e.ajaxSettings).mode, o = ("port" in i ? i : e.ajaxSettings).port;
            if ("abort" === r) {
                n[o] && n[o].abort();
                n[o] = t.apply(this, arguments);
                return n[o];
            }
            return t.apply(this, arguments);
        };
    }
});

!function(e) {
    "function" == typeof define && define.amd ? define("lib/plugins/validation/1.15.1/localization/messages_zh", [ "jquery", "../jquery-validate" ], e) : e(jQuery);
}(function(e) {
    e.extend(e.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: e.validator.format("最多可以输入 {0} 个字符"),
        minlength: e.validator.format("最少要输入 {0} 个字符"),
        rangelength: e.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: e.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: e.validator.format("请输入不大于 {0} 的数值"),
        min: e.validator.format("请输入不小于 {0} 的数值")
    });
});

define("plugins/validator/1.0.0/validator", [ "require", "exports", "module", "jquery", "lib/plugins/validation/1.15.1/jquery-validate", "lib/plugins/validation/1.15.1/localization/messages_zh" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = !0, n = {
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            21: 1,
            22: 1,
            23: 1,
            31: 1,
            32: 1,
            33: 1,
            34: 1,
            35: 1,
            36: 1,
            37: 1,
            41: 1,
            42: 1,
            43: 1,
            44: 1,
            45: 1,
            46: 1,
            50: 1,
            51: 1,
            52: 1,
            53: 1,
            54: 1,
            61: 1,
            62: 1,
            63: 1,
            64: 1,
            65: 1,
            71: 1,
            81: 1,
            82: 1,
            91: 1
        };
        if (e && /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e)) if (n[e.substr(0, 2)]) {
            if (18 == e.length) {
                e = e.split("");
                for (var i = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], r = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ], o = 0, a = 0, s = 0, u = 0; u < 17; u++) {
                    a = e[u];
                    s = i[u];
                    o += a * s;
                }
                r[o % 11];
                r[o % 11] != e[17] && (t = !1);
            }
        } else t = !1; else t = !1;
        return t;
    }
    var r = e("jquery");
    e("lib/plugins/validation/1.15.1/jquery-validate");
    e("lib/plugins/validation/1.15.1/localization/messages_zh");
    var o = /^(\d{3,4}-?)?\d{7,9}$/, a = /^0?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/, s = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, u = /^\d{5,20}$/, l = [ {
        name: "email",
        text: "请正确填写您的邮箱地址",
        func: function(e, t) {
            return this.optional(t) || s.test(e);
        }
    }, {
        name: "mobile",
        text: "请正确填写您的手机号码",
        func: function(e, t) {
            return this.optional(t) || a.test(e);
        }
    }, {
        name: "phone",
        text: "请正确输入您的电话号码",
        func: function(e, t) {
            return this.optional(t) || o.test(e) || a.test(e);
        }
    }, {
        name: "isIdCardNo",
        text: "请正确输入您的身份证号码",
        func: function(e, t) {
            return this.optional(t) || i(e);
        }
    }, {
        name: "isNoneMalformed",
        text: "请不要输入特殊字符",
        func: function(e, t) {
            return this.optional(t) || !/[\[\]`~!@#$^&*()=|{}'":;,.<>\/?！￥…（）—|【】‘；：“”。，、？%+ 　\\]/.test(e);
        }
    }, {
        name: "isFinanceBankCardno",
        text: "银行卡号格式不正确，请重新输入(不包含空格或者-等连接符号)",
        func: function(e, t) {
            return this.optional(t) || u.test(e);
        }
    }, {
        name: "realname",
        text: "姓名需2-10个汉字之间",
        func: function(e, t) {
            return this.optional(t) || /([\u4e00-\u9fa5]{2,4})/.test(e);
        }
    }, {
        name: "qq",
        text: "请输入5-11位QQ号码",
        func: function(e, t) {
            return this.optional(t) || /^\d{5,11}$/.test(e);
        }
    }, {
        name: "wechat",
        text: "请输入6-20个字母,数字,— ,_以字母开头",
        func: function(e, t) {
            return this.optional(t) || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(e);
        }
    }, {
        name: "password",
        text: "请输入6-16位密码，区分大小写，不能使用空格！",
        func: function(e, t) {
            return this.optional(t) || /^[\S]{6,16}$/.test(e);
        }
    } ];
    r.each(l, function(e, t) {
        r.validator.addMethod(t.name, t.func, t.text);
    });
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return e.replace(s, "ms-").replace(u, l);
    }
    function r(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : c.test(e) ? a.parseJSON(e) : e);
        } catch (t) {}
    }
    function o(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType) {
            i = "data-" + t.replace(d, "-$&").toLowerCase();
            n = e.getAttribute(i);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var a = (window.document, e("jquery")), s = /^-ms-/, u = /-([\da-z])/gi, l = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, d = /[A-Z]/g, f = function(e, t, n) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, s, u, l;
        if (1 === arguments.length) {
            if (u = e.dataset) {
                l = {};
                for (s in u) u.hasOwnProperty(s) && (l[s] = r(u[s]));
                return l;
            }
            u = e.attributes;
            a = u.length;
            l = {};
            for (;a--; ) if (u[a]) {
                s = u[a].name;
                if (0 === s.indexOf("data-")) {
                    s = i(s.slice(5));
                    l[s] = r(o(e, s));
                }
            }
            return l;
        }
    };
    n.exports = f;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, n) {
    "use strict";
    function i(e, t, n, i) {
        i ? e[t] || (e[t] = n) : e[t] ? e[t] = e[t].add(n) : e[t] = o(n);
    }
    var r = window.document, o = e("jquery"), a = function(e, t, n) {
        var a, s, u, l, c, d = function(e) {
            if (n) for (var r in n) u[r] = o(n[r].toString(), e); else {
                u = {};
                l = o("[node-type]", e);
                for (var a, s = -1, c = l.length; ++s < c; ) {
                    a = l[s];
                    r = a.getAttribute("node-type");
                    i(u, r, a, t);
                }
            }
        }, f = function(e) {
            var n, r = u[e];
            if (!r || 0 === r.length) {
                n = o('[node-type="' + e + '"]', a);
                n.length && i(u, e, n, t);
                r = u[e];
            }
            return r;
        };
        void 0 === t && (t = !0);
        a = e;
        if ("string" == typeof e && "<" === e.charAt(0)) {
            a = r.createElement("div");
            a.innerHTML = e;
            s = r.createDocumentFragment();
            for (;c = a.firsChild; ) s.appendChild(c);
        } else {
            a = o(e);
            s = a[0];
        }
        d(a);
        return {
            get: f,
            box: s,
            list: u
        };
    };
    t.build = a, t.parse = function(e, t, n) {
        "object" == typeof e && e.length > 0 && (e = e[0]);
        if (!e || 1 !== e.nodeType) throw TypeError("parse error, not a valid html element");
        if ("boolean" == typeof n) {
            t = n;
            n = null;
        }
        return a(e, t, n).list;
    };
    t.dataset = e("./dataset");
});

define("lib/ui/tab/1.0.0/tab", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e, t) {
        var n = this, i = {
            event: "click"
        };
        n.el = r(e);
        n.options = r.extend(!0, {}, i, t);
        var o = s.build(e, !1);
        n.hd = o.get("hd");
        n.bd = o.get("bd");
        n.hdItems = o.get("hdItem");
        n.containers = o.get("container");
        n._initEvent();
        n._init();
    }
    var r = e("jquery"), o = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/utils/util"), s = e("lib/core/1.0.0/dom/build");
    a.inherits(i, o);
    i.prototype._initEvent = function() {
        var e = this;
        e.hdItems.on(e.options.event, function(t) {
            t.preventDefault();
            var n = r(this);
            n.hasClass("current") || e.setCurrent(n.attr("data-target"));
        });
    };
    i.prototype._init = function() {};
    i.prototype.setCurrent = function(e) {
        var t = this;
        if (void 0 === e) {
            var n = t.hd.find(".current");
            0 == n.length && (n = this.hdItems.eq(0));
            e = n.attr("data-target");
        }
        t.hdItems.removeClass("current");
        var i = t.hd.find("[data-target=" + e + "]");
        i.addClass("current");
        t.containers.removeClass("current");
        var r = t.bd.find("[data-id=" + e + "]");
        r.addClass("current");
        t.emit("change", {
            hd: i,
            body: r
        });
    };
    n.exports = i;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), r = e("../utils/util"), o = e("../event/emitter"), a = r.setImmediate, s = r.noop, u = r.extend, l = i.trim, c = i.parseJSON, d = function(e, t, n) {
        return function(i, r) {
            try {
                return e.apply(t, arguments);
            } catch (o) {
                n && n(o, i, r);
            }
        };
    }, f = function(e) {
        return t.emit.apply(t, arguments);
    };
    o.applyTo(t);
    var h = function() {
        var e = 5, t = 0, n = [], r = function() {
            a(function() {
                --t;
                o();
            });
        }, o = function() {
            if (n.length > 0 && t < e) {
                var o = n.shift(), a = o[0], s = o[1];
                ++t;
                a.always(r);
                i.ajax(s);
            }
        };
        return function(e, t) {
            n.push([ e, t ]);
            o();
        };
    }(), p = function(e) {
        o.applyTo(this);
        var t = {
            url: "",
            type: "GET",
            data: {},
            dataType: "json",
            timeout: 3e4,
            cache: !1
        };
        e = u(t, e);
        delete e.error;
        delete e.success;
        this._opts = e;
    };
    u(p.prototype, {
        send: function() {
            var e = this, t = this._opts, n = u({}, t), i = "jsonp" === n.dataType;
            i && (n.crossDomain = !0);
            n.complete = function(n, r) {
                var o, a = +n.status, s = n.responseJSON, u = {
                    error: "1",
                    msg: "Request error (status: " + (r || a) + ")"
                }, d = 200 === a || "success" === r;
                if (!i && !s) {
                    s = l(n.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = c(s);
                    } catch (f) {}
                }
                d || (s = s || u);
                o = {
                    data: s,
                    xhr: n,
                    origin: t,
                    status: a || r
                };
                d ? e.emit("response", null, o) : e.emit("error", s, o);
                e.emit("end", o);
                e.destroy();
            };
            h(e, n);
            return e;
        },
        always: function(e) {
            "function" == typeof e && this.on("end", e);
            return this;
        },
        destroy: function() {
            this.un();
            this._opts = null;
        }
    });
    t.on("request", function(e, t) {
        t = t && i(t);
        if (t) {
            var n = "disabled";
            t.addClass(n).prop("disabled", !0);
            e.once("end", function() {
                t.removeClass(n).prop("disabled", !1);
                t = null;
            });
        }
    });
    t.ajax = function(e, t, n) {
        if ("object" == typeof e) {
            n = t;
            t = e;
            e = void 0;
        }
        t = t || {};
        e && (t.url = e);
        var r = new p(t), o = function(e, n) {
            var i = e.stack && e.stack.split("\n").slice(0, 2).join("\n") || e, r = {
                stack: i,
                origin: t,
                response: n
            };
            f("error", r, n);
            a(function() {
                console.log("%c " + i, "color:#ae0000");
            }, 1);
        }, u = d(t.error || s, null, o), l = d(t.success || s, null, o);
        if (f("request", r, n) !== !1) {
            if (n && (n = i(n))) {
                var c, h, m = "data-async-lock";
                if (1 === +n.attr(m)) return;
                if (h = n.attr("data-async-text")) {
                    c = n.html();
                    n.html(h);
                }
                n.attr(m, 1);
                r.once("response error", function() {
                    if (n) {
                        n.attr(m, 0);
                        h && n.html(c);
                        n = null;
                    }
                });
            }
            r.on("error", function(e, t) {
                var n = {
                    code: e.error,
                    message: e.msg,
                    status: t.status,
                    origin: t.origin,
                    response: t.data
                };
                f("error", n, t) !== !1 && u(e);
            });
            r.on("response", function(e, t) {
                t = t.data;
                f("response", t) !== !1 && (e ? u(e) : t && 0 === +(t.error || 0) ? l(t) : u(t));
            });
            return r.send();
        }
    };
    i.each([ "get", "post", "jsonp" ], function(e, n) {
        t[n] = function(e, i, r, o, a) {
            if ("function" == typeof i) {
                a = a || o;
                o = r;
                r = i;
                i = void 0;
            }
            if (o && "function" != typeof o) {
                a = o;
                o = void 0;
            }
            var s = {
                data: i,
                success: r,
                error: o || r
            };
            "string" == typeof e ? s.url = e : u(s, e);
            var l = n;
            if ("jsonp" === n) {
                l = "get";
                s.dataType = "jsonp";
            }
            s.type = l;
            return t.ajax(s, a);
        };
    });
});

!function(e, t) {
    "function" == typeof define && define.amd ? define("lib/ui/pagination/1.0.1/pagination", [ "jquery" ], t) : e.returnExports = t(jQuery);
}(this, function(e) {
    "use strict";
    var t = "pagination", n = function(n, i) {
        var r = e(n);
        if (r.data(t)) throw "Please destroy the old pagination instance first.";
        this.pager = r;
        this.init(i);
    };
    n.prototype = {
        constructor: n,
        init: function(n) {
            var i = e.extend({
                totalCount: 1,
                pageSize: 1,
                pageCount: 0,
                displayedPages: 3,
                edges: 2,
                currentPage: 1,
                hrefTextPrefix: "#p-",
                hrefTextSuffix: "",
                prevText: "上一页",
                nextText: "下一页",
                ellipseText: "&hellip;",
                className: "",
                labelMap: [],
                displayInfo: !1,
                selectOnClick: !0,
                async: !1,
                onPage: function(e, t) {},
                onInit: function() {}
            }, n || {}), r = this, o = r.pager;
            e.each(i, function(e, t) {
                var n = i[t];
                "function" == typeof n && (i[t] = function() {
                    return n.apply(r, arguments);
                });
            });
            i.pageCount = i.pageCount ? i.pageCount : Math.ceil(i.totalCount / i.pageSize) ? Math.ceil(i.totalCount / i.pageSize) : 1;
            i.currentPage = i.currentPage - 1;
            i.halfDisplayed = i.displayedPages / 2;
            o.addClass([ i.className, "ui-pager" ].join(" ")).data(t, i);
            r._draw();
            r._initEvents();
            i.onInit();
        },
        _initEvents: function() {
            var n = this, i = n.pager, r = n.data(), o = function() {
                var e, t, n = i.find(".page-no");
                if (n.length) {
                    e = n.val();
                    t = parseInt(e, 10);
                    if (!e || isNaN(t)) {
                        n.val(r.currentPage + 1);
                        return !1;
                    }
                    return t;
                }
                return !1;
            }, a = function(e) {
                if (!r.disabled) {
                    var t = o();
                    t > 0 && t <= r.pageCount && t - 1 !== r.currentPage && n._selectPage(t - 1, e);
                }
            };
            i.on("click", ".page-link", function(t) {
                t.preventDefault();
                var i = +e(this).data("page-index");
                isNaN(i) || n._selectPage(i, t);
            });
            r.displayInfo && i.on("click", ".page-no", function(e) {
                this.select();
            }).on("keydown", ".page-no", function(e) {
                13 === e.keyCode && a();
            }).on("click", ".page-info .ui-button", function(e) {
                e.preventDefault();
                a();
            });
            i.one("pagination.destroy", function() {
                i.undelegate(".page-link", "click").undelegate(".page-no", "click keydown").undelegate(".page-info .ui-button", "click").removeData(t);
                r = null;
                i = null;
                n.pager = null;
            });
        },
        data: function(e, n) {
            var i = this.pager.data(t);
            return e ? void 0 === n ? i[e] : i[e] = n : i;
        },
        get: function(e) {
            var t = e ? this.data(e) : null;
            return e && "currentPage" === e ? t + 1 : t;
        },
        getCurrentPage: function() {
            return this.data().currentPage + 1;
        },
        selectPage: function(e) {
            return this._selectPage(e - 1);
        },
        prevPage: function() {
            var e = this.data();
            e.currentPage > 0 && this._selectPage(e.currentPage - 1);
            return this;
        },
        nextPage: function() {
            var e = this.data();
            e.currentPage < e.pageCount - 1 && this._selectPage(e.currentPage + 1);
            return this;
        },
        destroy: function() {
            this.pager.empty().trigger("pagination.destroy");
        },
        drawPage: function(e) {
            var t = this.data();
            t.currentPage = e - 1;
            this._draw();
            return this;
        },
        redraw: function() {
            this._draw();
        },
        disable: function() {
            var e = this.data();
            e.disabled = !0;
            this._draw();
            return this;
        },
        enable: function() {
            var e = this.data();
            e.disabled = !1;
            this._draw();
            return this;
        },
        show: function() {
            var e = this, t = e.pager;
            t.show();
        },
        hide: function() {
            var e = this, t = e.pager;
            t.hide();
        },
        setTotalCount: function(e, t) {
            var n = this.data();
            n.totalCount = e;
            n.pageCount = this._getPages(n);
            t || this._draw();
        },
        setPageSize: function(e) {
            var t = this.data();
            t.pageSize = e;
            t.pageCount = this._getPages(t);
            this._selectPage(0);
            return this;
        },
        _wraper: function(t) {
            var n = this.pager, i = "UL" === n[0].tagName.toUpperCase() ? n : n.find("ul");
            return !i.length && t ? e("<ul></ul>").appendTo(n) : i;
        },
        _draw: function() {
            var e, t = this.data(), n = this._getInterval(t), i = this.pager;
            i.empty();
            var r = this._wraper(!0);
            t.disabled && r.addClass("disabled");
            t.prevText && this._appendItem(t.currentPage - 1, {
                text: t.prevText,
                classes: "prev"
            });
            if (n.start > 0 && t.edges > 0) {
                var o = Math.min(t.edges, n.start);
                for (e = 0; e < o; e++) this._appendItem(e);
                t.edges < n.start && n.start - t.edges != 1 ? r.append('<li class="disabled"><span class="ellipse">' + t.ellipseText + "</span></li>") : n.start - t.edges == 1 && this._appendItem(t.edges);
            }
            for (e = n.start; e < n.end; e++) this._appendItem(e);
            if (n.end < t.pageCount && t.edges > 0) {
                t.pageCount - t.edges > n.end && t.pageCount - t.edges - n.end != 1 ? r.append('<li class="disabled"><span class="ellipse">' + t.ellipseText + "</span></li>") : t.pageCount - t.edges - n.end == 1 && this._appendItem(n.end++);
                var a = Math.max(t.pageCount - t.edges, n.end);
                for (e = a; e < t.pageCount; e++) this._appendItem(e);
            }
            t.nextText && this._appendItem(t.currentPage + 1, {
                text: t.nextText,
                classes: "next"
            });
            t.displayInfo && this._renderPI();
        },
        _getPages: function(e) {
            var t = Math.ceil(e.totalCount / e.pageSize);
            return t || 1;
        },
        _getInterval: function(e) {
            return {
                start: Math.ceil(e.currentPage > e.halfDisplayed ? Math.max(Math.min(e.currentPage - e.halfDisplayed, e.pageCount - e.displayedPages), 0) : 0),
                end: Math.ceil(e.currentPage > e.halfDisplayed ? Math.min(e.currentPage + e.halfDisplayed, e.pageCount) : Math.min(e.displayedPages, e.pageCount))
            };
        },
        _appendItem: function(t, n) {
            var i, r, o = this, a = (o.pager, o.data()), s = e("<li></li>"), u = o._wraper();
            t = t < 0 ? 0 : t < a.pageCount ? t : a.pageCount - 1;
            i = {
                text: t + 1,
                classes: ""
            };
            a.labelMap.length && a.labelMap[t] && (i.text = a.labelMap[t]);
            i = e.extend(i, n || {});
            if (t === a.currentPage || a.disabled) {
                a.disabled ? s.addClass("disabled") : s.addClass("active");
                r = e('<span class="current">' + i.text + "</span>");
            } else r = e('<a href="' + a.hrefTextPrefix + (t + 1) + a.hrefTextSuffix + '" data-page-index="' + t + '" class="page-link">' + i.text + "</a>");
            i.classes && r.addClass(i.classes);
            s.append(r);
            u.append(s);
        },
        _selectPage: function(e, t) {
            var n = this, i = n.data(), r = function(e, t) {
                i.currentPage = e;
                i.selectOnClick && n._draw();
                i.onPage(e + 1, t);
            };
            if ("function" == typeof i.async) {
                var o = i.async({
                    pageSize: i.pageSize,
                    currentPage: e + 1
                });
                if (o && o.then) {
                    if (i.lock) return n;
                    i.lock = 1;
                    return o.then(function(i) {
                        var o = (i || 0).totalCount;
                        void 0 !== o && n.setTotalCount(o, !0);
                        r(e, t);
                        return n;
                    }).always(function() {
                        i.lock = 0;
                        i = void 0;
                        r = void 0;
                    });
                }
                throw "Error: Please make sure that the `async` returns is a Deferred's promise";
            }
            r(e);
            return n;
        },
        _renderPI: function() {
            var t, n = this, i = (n.pager, n.data()), r = i.currentPage + 1, o = i.pageCount, a = e('<li class="page-info"></li>'), s = n._wraper();
            r = r < 1 ? 1 : Math.min(r, o);
            t = "共" + i.pageCount + '页，跳转到第<input type="text" class="page-no" autocomplete="off" value="' + r + '">页<a class="ui-button" href="javascript:;">跳转</a>';
            i.disabled && a.addClass("disabled");
            a.html(t);
            s.append(a);
        }
    };
    return n;
});

define("plugins/pager/1.0.0/pager", [ "require", "exports", "module", "jquery", "lib/ui/pagination/1.0.1/pagination", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(e, t, n) {
    "use strict";
    function i(e, t) {
        var n = this;
        if (void 0 === e) throw new Error("the param [el] is required.");
        n.el = e;
        var i = {
            url: null,
            data: null,
            ajaxType: "get",
            alias: {
                currentPage: "pageNo",
                pageSize: "pageSize"
            },
            options: {
                totalCount: 1,
                pageSize: 20,
                currentPage: 1,
                hrefTextPrefix: "#p-",
                hrefTextSuffix: "",
                prevText: "上一页",
                nextText: "下一页",
                ellipseText: "&hellip;",
                className: "",
                labelMap: [],
                displayInfo: !0,
                selectOnClick: !0,
                async: !1,
                onPage: function(e, t) {},
                onInit: function() {}
            }
        };
        n.options = r.extend(!0, {}, i, t);
        n._init();
    }
    var r = e("jquery"), o = e("lib/ui/pagination/1.0.1/pagination"), a = e("lib/core/1.0.0/io/request"), s = e("lib/core/1.0.0/event/emitter"), u = e("lib/core/1.0.0/utils/util");
    u.inherits(i, s);
    i.prototype._init = function() {
        var e = this, t = e.options;
        t.url && (t.options.async = function(n) {
            var i = {};
            i[t.alias.currentPage] = n.currentPage;
            i[t.alias.pageSize] = n.pageSize;
            e.emit("ajaxStart");
            var o = r.Deferred();
            a[t.ajaxType](t.url, r.extend({}, i, t.data), function(t) {
                e.emit("ajaxSuccess", t, function(t) {
                    if (t > 0) {
                        e.pagination.setTotalCount(t);
                        e.pagination.show();
                    } else {
                        e.pagination.setTotalCount(1);
                        e.pagination.hide();
                    }
                });
                o.resolve(t);
            }, function(t) {
                e.pagination.hide();
                e.emit("ajaxError", t);
                o.reject(t);
            });
            return o.promise();
        });
        t.options.onPage = function(t, n) {
            e.emit("change", t, n);
        };
        e.el.hide();
        e.pagination = new o(e.el, t.options);
        e.pagination.selectPage(t.options.currentPage);
        e.el.show();
    };
    i.prototype.destroy = function() {
        var e = this;
        e.pagination.destroy();
    };
    n.exports = i;
});

!function() {
    function e(e) {
        return e.replace(b, "").replace(x, ",").replace(w, "").replace(_, "").replace(C, "").split(A);
    }
    function t(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
    }
    function n(n, i) {
        function r(e) {
            return f += e.split(/\n/).length - 1, c && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), 
            e && (e = y[1] + t(e) + y[2] + "\n"), e;
        }
        function o(t) {
            var n = f;
            if (l ? t = l(t, i) : a && (t = t.replace(/\n/g, function() {
                return f++, "$line=" + f + ";";
            })), 0 === t.indexOf("=")) {
                var r = d && !/^=[=#]/.test(t);
                if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""), r) {
                    var o = t.replace(/\s*\([^\)]+\)/, "");
                    h[o] || /^(include|print)$/.test(o) || (t = "$escape(" + t + ")");
                } else t = "$string(" + t + ")";
                t = y[1] + t + y[2];
            }
            return a && (t = "$line=" + n + ";" + t), v(e(t), function(e) {
                if (e && !m[e]) {
                    var t;
                    t = "print" === e ? x : "include" === e ? w : h[e] ? "$utils." + e : p[e] ? "$helpers." + e : "$data." + e, 
                    _ += e + "=" + t + ",", m[e] = !0;
                }
            }), t + "\n";
        }
        var a = i.debug, s = i.openTag, u = i.closeTag, l = i.parser, c = i.compress, d = i.escape, f = 1, m = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, g = "".trim, y = g ? [ "$out='';", "$out+=", ";", "$out" ] : [ "$out=[];", "$out.push(", ");", "$out.join('')" ], b = g ? "$out+=text;return $out;" : "$out.push(text);", x = "function(){var text=''.concat.apply('',arguments);" + b + "}", w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + b + "}", _ = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0," : ""), C = y[0], A = "return new String(" + y[3] + ");";
        v(n.split(s), function(e) {
            e = e.split(u);
            var t = e[0], n = e[1];
            1 === e.length ? C += r(t) : (C += o(t), n && (C += r(n)));
        });
        var k = _ + C + A;
        a && (k = "try{" + k + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var T = new Function("$data", "$filename", k);
            return T.prototype = h, T;
        } catch (j) {
            throw j.temp = "function anonymous($data,$filename) {" + k + "}", j;
        }
    }
    var i = function(e, t) {
        return "string" == typeof t ? g(t, {
            filename: e
        }) : a(e, t);
    };
    i.version = "3.0.0", i.config = function(e, t) {
        r[e] = t;
    };
    var r = i.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, o = i.cache = {};
    i.render = function(e, t) {
        return g(e, t);
    };
    var a = i.renderFile = function(e, t) {
        var n = i.get(e) || m({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? n(t) : n;
    };
    i.get = function(e) {
        var t;
        if (o[e]) t = o[e]; else if ("object" == typeof document) {
            var n = document.getElementById(e);
            if (n) {
                var i = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
                t = g(i, {
                    filename: e
                });
            }
        }
        return t;
    };
    var s = function(e, t) {
        return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? s(e.call(e)) : ""), 
        e;
    }, u = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, l = function(e) {
        return u[e];
    }, c = function(e) {
        return s(e).replace(/&(?![\w#]+;)|[<>"']/g, l);
    }, d = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, f = function(e, t) {
        var n, i;
        if (d(e)) for (n = 0, i = e.length; i > n; n++) t.call(e, e[n], n, e); else for (n in e) t.call(e, e[n], n);
    }, h = i.utils = {
        $helpers: {},
        $include: a,
        $string: s,
        $escape: c,
        $each: f
    };
    i.helper = function(e, t) {
        p[e] = t;
    };
    var p = i.helpers = h.$helpers;
    i.onerror = function(e) {
        var t = "Template Error\n\n";
        for (var n in e) t += "<" + n + ">\n" + e[n] + "\n\n";
        "object" == typeof console && console.error(t);
    };
    var m = function(e) {
        return i.onerror(e), function() {
            return "{Template Error}";
        };
    }, g = i.compile = function(e, t) {
        function i(n) {
            try {
                return new u(n, s) + "";
            } catch (i) {
                return t.debug ? m(i)() : (t.debug = !0, g(e, t)(n));
            }
        }
        t = t || {};
        for (var a in r) void 0 === t[a] && (t[a] = r[a]);
        var s = t.filename;
        try {
            var u = n(e, t);
        } catch (l) {
            return l.filename = s || "anonymous", l.name = "Syntax Error", m(l);
        }
        return i.prototype = u.prototype, i.toString = function() {
            return u.toString();
        }, s && t.cache && (o[s] = i), i;
    }, v = h.$each, y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", b = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, x = /[^\w$]+/g, w = new RegExp([ "\\b" + y.replace(/,/g, "\\b|\\b") + "\\b" ].join("|"), "g"), _ = /^\d[^,]*|,\d[^,]*/g, C = /^,+|,+$/g, A = /^$|,+/;
    r.openTag = "{{", r.closeTag = "}}";
    var k = function(e, t) {
        var n = t.split(":"), i = n.shift(), r = n.join(":") || "";
        return r && (r = ", " + r), "$helpers." + i + "(" + e + r + ")";
    };
    r.parser = function(e) {
        e = e.replace(/^\s/, "");
        var t = e.split(" "), n = t.shift(), r = t.join(" ");
        switch (n) {
          case "if":
            e = "if(" + r + "){";
            break;

          case "else":
            t = "if" === t.shift() ? " if(" + t.join(" ") + ")" : "", e = "}else" + t + "{";
            break;

          case "/if":
            e = "}";
            break;

          case "each":
            var o = t[0] || "$data", a = t[1] || "as", s = t[2] || "$value", u = t[3] || "$index", l = s + "," + u;
            "as" !== a && (o = "[]"), e = "$each(" + o + ",function(" + l + "){";
            break;

          case "/each":
            e = "});";
            break;

          case "echo":
            e = "print(" + r + ");";
            break;

          case "print":
          case "include":
            e = n + "(" + t.join(",") + ");";
            break;

          default:
            if (/^\s*\|\s*[\w\$]/.test(r)) {
                var c = !0;
                0 === e.indexOf("#") && (e = e.substr(1), c = !1);
                for (var d = 0, f = e.split("|"), h = f.length, p = f[d++]; h > d; d++) p = k(p, f[d]);
                e = (c ? "=" : "=#") + p;
            } else e = i.helpers[n] ? "=#" + n + "(" + t.join(",") + ");" : "=" + e;
        }
        return e;
    }, "function" == typeof define ? define("template", [], function() {
        return i;
    }) : "undefined" != typeof exports ? module.exports = i : this.template = i;
}();

define("lib/core/1.0.0/utils/form", [ "require", "exports", "module", "jquery" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return l.createElement(e);
    }
    function r(e) {
        return "number" == typeof e || "string" == typeof e && isNaN(parseFloat(e));
    }
    function o(e, t) {
        var n = typeof e;
        switch (n) {
          case "number":
            return isFinite(e);

          case "null":
          case "undefined":
            return !1;

          default:
            return n && (!t || "" !== e);
        }
    }
    function a(e) {
        var t = a.d || (a.d = i("i"));
        t.innerHTML = e;
        return t.innerText || t.textContent;
    }
    function s(e) {
        for (var t, n = e.length; n--; ) {
            t = e[n];
            o(t) || e.splice(n, 1);
        }
        return e;
    }
    var u = e("jquery"), l = window.document, c = u.trim, d = "placeholder" in i("input"), f = "[]", h = /INPUT|TEXTAREA|SELECT/, p = function(e, t, n) {
        u(e).find("[name]").each(function(e, i) {
            var r = u(i).attr("name"), s = t[r];
            if (r.indexOf("[") > -1) {
                var l = r.replace(/\]/g, "").split("["), e = 0, c = null;
                s = t;
                for (;c = l[e++]; ) {
                    if (!s[c]) {
                        s = void 0;
                        break;
                    }
                    s = s[c];
                }
            }
            if (!o(s)) {
                if (n !== !0) return;
                s = "";
            }
            "string" == typeof s && s.indexOf("&") > -1 && (s = a(s));
            s = String(s);
            if ("radio" === i.type) i.checked = i.value === s; else if ("checkbox" === i.type) i.checked = s; else if (d) i.value = s; else {
                var f = u(i);
                i.value !== s && "" !== s && f.data("changed", !0);
                "" === s ? f.data("changed", !1).val(f.attr("placeholder")) : i.value = s;
            }
        });
    }, m = function(e, t) {
        var n = {}, i = !1, o = u(e).get(), a = o[0];
        if (!a) return n;
        "FORM" === a.nodeName && (o = a.elements);
        if ("boolean" == typeof t) {
            i = t;
            t = {};
        } else {
            t = t || {};
            i = t.convert;
            i = void 0 !== i && i;
        }
        t.semantic && (o = a.getElementsByTagName("*"));
        if (!o.length) return n;
        u.each(o, function(e, o) {
            var a = o.type && o.type.toLowerCase();
            if ("submit" !== a && o.name && !o.disabled) {
                var l = u(o), d = o.name, p = h.test(o.tagName) ? l.val() : l.attr("value") || "";
                if ("radio" !== o.type || o.checked) {
                    "checkbox" === o.type && (p = o.checked);
                    l.data("changed") !== !0 && p === l.attr("placeholder") && (p = "");
                    if (i) {
                        if (r(p)) {
                            var m = parseFloat(p), g = m + "";
                            p.indexOf(".") > 0 && (g = m.toFixed(p.split(".")[1].length));
                            g === p && (p = m);
                        } else "true" === p ? p = !0 : "false" === p && (p = !1);
                        "" === p && (p = void 0);
                    }
                    "string" != typeof p || t.raw || (p = c(p));
                    for (var v, y = n, b = t.nameSep || f, x = s(d.split(b)), w = d.indexOf("[]") === d.length - 2, e = -1, _ = x.length - 1; ++e < _; ) {
                        y[x[e]] || (y[x[e]] = {});
                        y = y[x[e]];
                    }
                    v = x[x.length - 1];
                    if (w || y[v]) {
                        y[v] instanceof Array || (y[v] = void 0 === y[v] ? [] : [ y[v] ]);
                        y[v].push(p);
                    } else y[v] || (y[v] = p);
                }
            }
        });
        return n;
    };
    t.serializeForm = m;
    t.setFormData = p;
});

define("module/top-search/1.0.0/top-search", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            activeClass: "focus",
            selector: "#jTopSearch",
            url: $PAGE_DATA && $PAGE_DATA.topSearchUrl || "",
            data: {},
            alias: "name"
        };
        t.options = r.extend(!0, {}, n, e);
        if ("" == t.options.url) throw new Error("the params options.url is required");
        t.el = r(t.options.selector);
        var i = o.build(t.el[0], !1);
        t.ipt = i.get("ipt");
        t.btn = i.get("btn");
        t.lbl = i.get("lbl");
        t._init();
        t._initEvent();
    }
    var r = e("jquery"), o = (e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build"));
    i.prototype._initEvent = function() {
        var e = this;
        e.ipt.on("focus", function() {
            e.focus();
        });
        e.ipt.on("blur", function() {
            0 == e.getValue().length && e.blur();
        });
        e.ipt.on("keydown", function(t) {
            13 === t.keyCode && e.search();
        });
        e.btn.on("click", function() {
            e.search();
        });
    };
    i.prototype._init = function() {
        var e = this, t = r.trim(e.ipt.val()), n = e.ipt.attr("data-id");
        t.length > 0 && e.focus();
        n && (e.options.alias = n);
        e.options.data && (e.options.data[e.options.alias] = r.trim(e.ipt.val()));
    };
    i.prototype.focus = function() {
        var e = this;
        e.el.addClass(e.options.activeClass);
    };
    i.prototype.blur = function() {
        var e = this;
        e.el.removeClass(e.options.activeClass);
    };
    i.prototype.getValue = function() {
        var e = this;
        return r.trim(e.ipt.val());
    };
    i.prototype.search = function() {
        var e = this;
        e.options.data[e.options.alias] = e.getValue();
        window.location.href = e.options.url + "?" + e._getUrlString();
    };
    i.prototype._getUrlString = function() {
        var e = this, t = "", n = 0;
        for (var i in e.options.data) {
            t += 0 == n ? i + "=" + encodeURIComponent(e.options.data[i]) : "&" + i + "=" + encodeURIComponent(e.options.data[i]);
            n++;
        }
        return t;
    };
    n.exports = i;
});

define("lib/core/1.0.0/io/cookie", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    var i = window.document, r = function(e) {
        if ("string" != typeof e) throw "trim need a string as parameter";
        for (var t = e.length, n = 0, i = t - 1, r = /(\u3000|\s|\t|\u00A0)/; n < t && r.test(e.charAt(n)); ) ++n;
        for (;i >= 0 && r.test(e.charAt(i)); ) --i;
        return e.substring(n, i + 1);
    }, o = function(e) {
        var t = {};
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }, a = function(e, t, n) {
        n = n || {};
        if (void 0 !== t) {
            n = o(n);
            if (null === t) {
                t = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var a = n.expires, s = n.expires = new Date();
                s.setTime(s.getTime() + 864e5 * a);
            }
            var u = function(e) {
                try {
                    return n.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return i.cookie = [ u(e), "=", u(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, l = i.cookie, c = function(e) {
            return n.raw ? e : decodeURIComponent(e);
        }, d = l ? l.split("; ") : [], f = -1, h = d.length, p = e.length + 1; ++f < h; ) {
            l = r(d[f]);
            if (l.substring(0, p) === e + "=") {
                t = c(l.substring(p));
                break;
            }
        }
        return t;
    };
    a.set = function(e, t, n) {
        return a(e, t, n);
    };
    a.get = function(e) {
        return a(e);
    };
    n.exports = a;
});

define("module/login-status/1.0.0/login", [ "require", "exports", "module", "lib/core/1.0.0/io/cookie" ], function(e, t, n) {
    "use strict";
    var i = e("lib/core/1.0.0/io/cookie"), r = "_nick", o = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", s = $PAGE_DATA && $PAGE_DATA[r] || null;
    t.getNick = function() {
        return s;
    };
    t.isLogin = function() {
        return !!i(o);
    };
    t.login = function(e) {
        if (a) {
            e = e ? "?returnUrl=" + decodeURIComponent(e) : "";
            window.location.href = a + e;
        }
    };
});

define("module/login-status/1.0.0/login-status", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build", "./login" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            selector: "#jLoginStatus",
            userCenterUrl: $PAGE_DATA && $PAGE_DATA.userCenterUrl || "javascript:;",
            loginOutUrl: $PAGE_DATA && $PAGE_DATA.loginOutUrl || "javascript:;",
            menuList: [ {
                title: "编辑资料",
                url: $PAGE_DATA && $PAGE_DATA.editUserInfoUrl || "javascript:;"
            }, {
                title: "学习中心",
                url: $PAGE_DATA && $PAGE_DATA.learningCenterUrl || "javascript:;"
            } ]
        };
        t.options = r.extend(!0, {}, n, e);
        t.el = r(t.options.selector);
        t._init();
    }
    var r = e("jquery"), o = e("lib/core/1.0.0/dom/build"), a = e("./login");
    i.prototype._init = function() {
        var e = this;
        if (a.isLogin()) {
            var t = a.getNick();
            e.el.html(e._getLoginedHtml(t));
            e._initEvent();
        }
    };
    i.prototype._initEvent = function() {
        var e = this, t = !1, n = o.build(e.el[0], !1), i = n.get("userName"), r = n.get("tipsMenu");
        i.on("mouseenter", function() {
            t = !0;
            r.stop().fadeIn(500, function() {
                r.addClass("active");
            });
        });
        i.on("mouseleave", function() {
            t = !1;
            setTimeout(function() {
                t || r.stop().fadeOut(500, function() {
                    r.removeClass("active");
                });
            }, 200);
        });
        r.on("mouseenter", function() {
            t = !0;
        });
        r.on("mouseleave", function() {
            t = !1;
            r.removeClass("active");
        });
    };
    i.prototype._getLoginedHtml = function(e) {
        var t = this, n = t.options, i = n.menuList, r = "";
        r += '<ul class="logined clearfix" node-type="logined">';
        r += '    <li class="item">';
        r += "        <span>您好，</span>";
        r += "    </li>";
        r += '    <li class="item tips-menu-box">';
        r += '        <a href="' + n.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + e + "</a>";
        r += '        <div class="tips-menu" node-type="tipsMenu">';
        r += '            <div class="arrow"><i></i><b></b></div>';
        r += '            <ul class="tips-menu-list">';
        for (var o = 0, a = i.length; o < a; o++) r += '            <li class="tips-menu-item"><a href="' + i[o].url + '">' + i[o].title + "</a></li>";
        r += "            </ul>";
        r += "        </div>";
        r += "    </li>";
        r += '    <li class="item">';
        r += '        <a href="' + n.loginOutUrl + '" class="btn">退出</a>';
        r += "    </li>";
        r += "</ul>";
        return r;
    };
    n.exports = i;
});

define("module/fix-bar/1.0.0/fix-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            onlineServiceUrl: ""
        };
        t.options = r.extend(!0, {}, n, e);
        t._init();
        t._initEvent();
    }
    var r = e("jquery");
    e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var e = this;
        e.el = r(e._getTemplete());
        r(document.body).append(e.el);
        e.height = e.el.height();
        e.resize();
    };
    i.prototype._initEvent = function() {
        var e = this;
        r(window).on("resize", function() {
            e.resize();
        });
    };
    i.prototype.resize = function() {
        var e = this, t = r(window).height(), n = (t - e.height) / 2;
        if (n >= 0) {
            e.el.css({
                top: n
            });
            e.el.addClass("active");
        } else e.el.removeClass("active");
    };
    i.prototype._getTemplete = function() {
        var e = this, t = "";
        t += '<div class="ui-fix-bar">';
        t += '    <ul class="list clearfix" node-type="list">';
        t += '        <li class="jItem item item-service" node-id="service">';
        t += '            <a href="' + e.options.onlineServiceUrl + '">';
        t += '                <i class="iyoyo iyoyo-service"></i>';
        t += "                <span>在线客服</span>";
        t += "            </a>";
        t += "        </li>";
        t += "    </ul>";
        t += "</div>";
        return t;
    };
    n.exports = i;
});

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            selector: "#jFooter"
        };
        t.options = r.extend(!0, {}, n, e);
        t.el = r(t.options.selector);
        if (0 == t.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        t._init();
    }
    var r = e("jquery"), o = e("lib/plugins/lazyload/1.9.3/lazyload"), a = e("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var e = this, t = a.build(e.el[0], !1), n = t.get("footerImg");
        new o(n);
    };
    n.exports = i;
});

define("conf/lecturer/detail", [ "require", "exports", "module", "jquery", "lib/ui/box/1.0.1/box", "lib/plugins/lazyload/1.9.3/lazyload", "plugins/validator/1.0.0/validator", "lib/ui/tab/1.0.0/tab", "lib/core/1.0.0/io/request", "lib/core/1.0.0/dom/build", "plugins/pager/1.0.0/pager", "template", "lib/core/1.0.0/utils/form", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), r = e("lib/ui/box/1.0.1/box"), o = e("lib/plugins/lazyload/1.9.3/lazyload");
    e("plugins/validator/1.0.0/validator");
    var a = e("lib/ui/tab/1.0.0/tab"), s = (e("lib/core/1.0.0/io/request"), e("lib/core/1.0.0/dom/build")), u = e("plugins/pager/1.0.0/pager"), l = e("template"), c = (e("lib/core/1.0.0/utils/form"), 
    e("module/top-search/1.0.0/top-search")), d = e("module/login-status/1.0.0/login-status"), f = e("module/fix-bar/1.0.0/fix-bar"), h = e("module/footer/1.0.0/footer"), p = (new c(), 
    new d(), new f(), new h(), i(".jTinfo"), i(".jTab-l"), i(".jTab-r"), i(".jLi"), 
    i(".jBg"), i(".jMod-mask"), i("#jTab")), m = new a(p), g = {};
    g.callback2 = function(e) {
        if (!g.callback2.isInited) {
            g.callback2.isInited = !0;
            var t = s.build(e, !1), n = t.get("jPagination"), a = t.get("jContainer"), c = new u(n, {
                url: $PAGE_DATA.coursePager,
                data: {
                    teacherId: $PAGE_DATA.teacherid
                },
                options: {
                    currentPage: 1,
                    pageSize: 12
                }
            }), d = null;
            c.on("ajaxStart", function() {
                d = r.loading("正在加载...", {
                    modal: !1
                });
            });
            c.on("ajaxSuccess", function(e, t) {
                if (e && e.data && e.data.records > 0) {
                    t && t(e.data.records);
                    a.html(l("tList", e.data));
                    new o(a.find(".jImg"), {
                        mouseWheel: !0,
                        effect: "fadeIn",
                        snap: !0
                    });
                } else a.html(l("tFempty"));
                d && d.hide();
            });
            c.on("ajaxError", function(e) {
                r.error(e.msg || "网络错误，请重试！");
                d && d.hide();
            });
            c.on("change", function(e, t) {
                i("#jCurrentPage").html(e);
            });
        }
    };
    g.callback1 = function() {};
    m.on("change", function(e) {
        var t = e.body.attr("data-id");
        g["callback" + t] && g["callback" + t](e.body);
    });
    m.setCurrent();
    new o(i(".jImg"), {
        mouseWheel: !0,
        effect: "fadeIn",
        snap: !0
    });
});