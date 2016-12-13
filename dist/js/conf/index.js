/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/* Swiper 2.7.0 - Copyright 2010-2014, Vladimir Kharlampidi */

/*! layer-v3.0.1 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, i) {
    "use strict";
    function n(e) {
        return "object" == typeof e && null !== e;
    }
    function o() {}
    function r(e, t) {
        for (var i = e.length, n = -1; ++n < i; ) t(e[n], n);
    }
    function a(e, t) {
        for (var i in e) p.call(e, i) && t(e[i], i, e);
    }
    function s(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? r(e, t) : a(e, t);
    }
    function l(e, t) {
        for (var i = -1, n = e.length, o = Array(n); ++i < n; ) o[i] = t(e[i], i, e);
        return o;
    }
    function u(e, t) {
        var i = [];
        s(e, function(e, n, o) {
            i.push(t(e, n, o));
        });
        return i;
    }
    function c(e, t) {
        if (!t || !n(t)) return e;
        for (var i = v(t), o = i.length; o--; ) e[i[o]] = t[i[o]];
        return e;
    }
    function d(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, i = {}, n = e.split("&"), o = -1, r = n.length; ++o < r; ) {
            t = n[o].split("=");
            i[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return i;
    }
    var f = new Function("return this")(), p = Object.prototype.hasOwnProperty, h = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, m = function() {
        var e = (+new Date()).toString(36), t = -1;
        return function(i) {
            return (i || "") + e + ++t;
        };
    }(), v = Object.keys || function(e) {
        var t = [];
        a(e, function(e, i) {
            t.push(i);
        });
        return t;
    }, g = "function" == typeof Object.create ? function(e, t) {
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
        return function(t, i) {
            t.__super__ = i.prototype;
            e.prototype = i.prototype;
            t.prototype = new e(t);
        };
    }(), y = f.console || (f.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(e) {
        y[e] || (y[e] = o);
    });
    t.extend = function(e, t) {
        for (var i = [].slice.call(arguments, 1), n = i.length, o = -1; ++o < n; ) c(e, i[o]);
        return e;
    };
    t.inherits = function(e, t, i) {
        g(e, t);
        i && c(e.prototype, i);
    };
    t.impls = function(e, i) {
        i = "function" == typeof i ? i.prototype : i;
        t.mix(e.prototype, i);
        return e;
    };
    t.parseQuery = d;
    t.parseParams = d;
    t.each = s;
    t.map = function(e, t) {
        var i = h(e) ? l : u;
        return i(e, t);
    };
    t.filter = function(e, t) {
        var i, n, o = h(e) ? (i = r, n = function(e, t) {
            o.push(t);
        }, []) : (i = a, n = function(e, t) {
            o[e] = t;
        }, {});
        i(e, function(e, i) {
            t(e, i) && n(i, e);
        });
        return o;
    };
    t.mix = function w(e, t, i, n, o) {
        for (var r in t) t.hasOwnProperty(r) && (t[r] && e[r] && i && "object" == typeof t[r] ? w(e[r], t[r], i, n, o) : (void 0 === e[r] || n) && (o && !o(e[r], t[r]) || (e[r] = t[r])));
        return e;
    };
    t.guid = m;
    t.setImmediate = function() {
        var e = f.document, t = f.postMessage, i = f.setImmediate;
        return i ? i : "onreadystatechange" in e.createElement("script") ? function(t) {
            function i() {
                n.onreadystatechange = null;
                n.parentNode.removeChild(n);
                t();
            }
            var n = e.createElement("script");
            n.onreadystatechange = i;
            e.documentElement.appendChild(n);
        } : t ? function(e) {
            function i(t) {
                if (t.data === n) {
                    f.removeEventListener("message", i, !0);
                    e();
                }
            }
            var n = m();
            f.addEventListener("message", i, !0);
            t(n, "*");
        } : function(e) {
            f.setTimeout(e, 0);
        };
    }();
    t.noop = o;
    t.throttle = function(e, t) {
        t = t ? t : 150;
        if (t === -1) return function() {
            e.apply(this, arguments);
        };
        var i;
        return function() {
            var n = +new Date();
            if (!i || n - i > t) {
                i = n;
                e.apply(this, arguments);
            }
        };
    };
    t.debounce = function(e, t, i, n) {
        var o;
        return function() {
            var r = n || this, a = arguments, s = function() {
                o = null;
                i || e.apply(r, a);
            }, l = i && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            l && e.apply(r, a);
        };
    };
    t.deprecate = function(e, t) {
        function i() {
            n || (n = !0);
            return e.apply(this, arguments);
        }
        if (f.noDeprecation === !0) return e;
        var n = !1;
        return i;
    };
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(e) {
    "use strict";
    var t = e("jquery"), i = t(window), n = t(document), o = "createTouch" in document, r = document.documentElement, a = !("minWidth" in r.style), s = !a && "onlosecapture" in r, l = "setCapture" in r, u = t.noop, c = {
        start: o ? "touchstart" : "mousedown",
        over: o ? "touchmove" : "mousemove",
        end: o ? "touchend" : "mouseup"
    }, d = o ? function(e) {
        e.touches || (e = e.originalEvent.touches.item(0));
        return e;
    } : function(e) {
        return e;
    }, f = function() {
        this.start = t.proxy(this.start, this);
        this.over = t.proxy(this.over, this);
        this.end = t.proxy(this.end, this);
        this.onstart = this.onover = this.onend = u;
    };
    f.types = c;
    f.prototype = {
        start: function(e) {
            e = this.startFix(e);
            n.on(c.over, this.over).on(c.end, this.end);
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
            n.off(c.over, this.over).off(c.end, this.end);
            this.onend(e);
            return !1;
        },
        startFix: function(e) {
            e = d(e);
            this.target = t(e.target);
            this.selectstart = function() {
                return !1;
            };
            n.on("selectstart", this.selectstart).on("dblclick", this.end);
            s ? this.target.on("losecapture", this.end) : i.on("blur", this.end);
            l && this.target[0].setCapture();
            return e;
        },
        overFix: function(e) {
            e = d(e);
            return e;
        },
        endFix: function(e) {
            e = d(e);
            n.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : i.off("blur", this.end);
            l && this.target[0].releaseCapture();
            return e;
        }
    };
    f.create = function(e, o, r) {
        r = t.extend({
            hook: null,
            onstart: u,
            onover: u,
            onend: u
        }, r);
        var a, s, l, c, d = t(e), p = r.hook ? t(r.hook) : d, h = new f(), m = f.types.start, v = e.className.replace(/^\s|\s.*/g, "") + "-drag-start", g = {
            off: function() {
                p.off(m, h.start);
            }
        };
        h.onstart = function(t) {
            var o = "fixed" === d.css("position"), u = n.scrollLeft(), f = n.scrollTop(), p = d.width(), h = d.height();
            a = 0;
            s = 0;
            l = o ? i.width() - p + a : n.width() - p;
            c = o ? i.height() - h + s : n.height() - h;
            var m = d.offset(), g = this.startLeft = o ? m.left - u : m.left, y = this.startTop = o ? m.top - f : m.top;
            this.clientX = t.clientX;
            this.clientY = t.clientY;
            d.addClass(v);
            r.onstart.call(e, t, g, y);
        };
        h.onover = function(t) {
            var i = t.clientX - this.clientX + this.startLeft, n = t.clientY - this.clientY + this.startTop, o = d[0].style;
            i = Math.max(a, Math.min(l, i));
            n = Math.max(s, Math.min(c, n));
            o.left = i + "px";
            o.top = n + "px";
            r.onover.call(e, t, i, n);
        };
        h.onend = function(t) {
            var i = d.position(), n = i.left, o = i.top;
            d.removeClass(v);
            r.onend.call(e, t, n, o);
        };
        h.off = function() {
            p.off(m, h.start);
        };
        o ? h.start(o) : p.on(m, h.start);
        return g;
    };
    return f;
});

!function(e, t) {
    if ("function" == typeof define && define.amd) define("lib/core/1.0.0/event/emitter", t); else if ("undefined" != typeof module) t(require, module.exports, module); else {
        var i = {
            exports: {}
        };
        t(null, i.exports, i);
        e.EventEmitter = i.exports;
    }
}(this, function(e, t, i) {
    "use strict";
    function n() {}
    function o(e, t, i, n) {
        var o = !0;
        if (t) for (var r, a, s, l = -1, u = {
            type: e,
            timeStamp: c()
        }; r = t[++l]; ) {
            a = r[m];
            s = r[v] || n;
            try {
                o = r[g] === h ? a.call(s, u, i) !== !1 && o : a.apply(s, i) !== !1 && o;
            } catch (d) {
                setTimeout(function() {
                    console.error(d);
                }, 1);
            }
        }
        return o;
    }
    function r(e) {
        var t, i = f(this);
        if (i) {
            t = i[e];
            return t.length;
        }
        return 0;
    }
    function a(e) {
        return "[object Function]" === Object.prototype.toString.call(e);
    }
    function s(e, t) {
        for (var i in e) e.hasOwnProperty(i) && t(e[i], i);
    }
    function l(e, t) {
        e.forEach ? e.forEach(t) : function(e) {
            for (var i = -1, n = e.length; ++i < n; ) t(e[i], i);
        }(e);
    }
    var u = /\s+/, c = Date.now || function() {
        return +new Date();
    }, d = function() {
        return c() * Math.random() & 65535;
    }(), f = function() {
        var e, t, i;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, i) {
            var n = e.get(t);
            return null === i ? void 0 !== n && e["delete"](t) : !n && i ? (e.set(t, n = {}), 
            n) : n;
        }) : (t = c(), i = "__$widΦ" + t.toString(36), e = {}, function(n, o) {
            if (!n || "object" != typeof n) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === o ? n[i] && (delete e[n[i]], delete n[i]) : (r = n[i] || o && (r = ++t, 
            e[r] = {}, n[i] = r), r && e[r]);
        });
    }(), p = 1, h = 2, m = 0, v = 1, g = 2, y = function(e, t, i) {
        var n = [];
        n[m] = e;
        n[v] = t;
        n[g] = i;
        return n;
    }, w = n.prototype;
    w.addListener = function(e, t, i, n) {
        var o, r, a, s = p;
        if (t && "object" == typeof t) {
            i = t;
            t = i.handleEvent;
            s = h;
        }
        if (!t) return this;
        o = f(this, 1);
        e = e.split(u);
        for (;r = e.shift(); ) {
            a = !n && o[r] || (o[r] = []);
            a.push(y(t, i, s));
        }
        return this;
    };
    w.on = w.addListener;
    w.once = function(e, t, i) {
        var n = !1, o = function() {
            this.removeListener(e, o);
            if (!n) {
                n = !0;
                t.apply(i || this, arguments);
            }
        };
        o.guid = t.guid || (t.guid = d++);
        return this.on(e, o);
    };
    w.removeListener = function(e, t, i) {
        var n, o, r, a, l, c;
        if (t && "object" == typeof t) {
            i = t;
            t = i.handleEvent;
        }
        if (!(n = f(this))) return this;
        if (!(e || t || i)) {
            s(n, function(e, t) {
                delete n[t];
            });
            f(this, null);
            return this;
        }
        e = e ? e.split(u) : b(n);
        for (;o = e.shift(); ) {
            r = n[o];
            if (r) if (t || i) for (a = r.length; --a >= 0; ) {
                l = r[a];
                c = l[m];
                t && c !== t && (void 0 === c.guid || c.guid !== t.guid) || i && l[v] !== i || r.splice(a, 1);
            } else delete n[o];
        }
        return this;
    };
    w.un = w.removeListener;
    w.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    w.emit = function(e) {
        var t, i, n, r, a, s, l = [], c = !0;
        if (!(t = f(this))) return this;
        e = e.split(u);
        for (a = 1, s = arguments.length; a < s; a++) l[a - 1] = arguments[a];
        for (;i = e.shift(); ) {
            (n = t.all) && (n = n.slice());
            (r = t[i]) && (r = r.slice());
            "all" !== i && (c = o(i, r, l, this) && c);
            c = o(i, n, [ i ].concat(l), this) && c;
        }
        return c;
    };
    n.applyTo = function(e) {
        function t(t, n) {
            e[t] = function() {
                var o = i[t].apply(n || e, Array.prototype.slice.call(arguments));
                return o === n ? this : o;
            };
        }
        var i = w, n = b(i);
        a(e) ? l(n, function(t) {
            e.prototype[t] = i[t];
        }) : l(n, function(e) {
            t(e);
        });
    };
    n.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : r.call(e, t);
    };
    w.listenerCount = r;
    var b = Object.keys || function(e) {
        var t = [];
        s(e, function(e, i) {
            t.push(i);
        });
        return t;
    };
    i.exports = n;
});

define("lib/core/1.0.0/dom/delegator", [ "require", "exports", "module", "jquery", "../event/emitter" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i, n, r, a = t.currentTarget, s = o(a), l = (t.handleObj || 0).origType || t.type;
        if (!t.isPropagationStopped()) {
            if (!s.attr("disabled") && (i = s.attr("action-type"))) {
                n = s.attr("action-data");
                t.action = i;
                t.data = n;
                r = e.e.emit(l + u + i, t, a);
                t.actionValue = r;
                if (r === !1) {
                    t.preventDefault();
                    t.stopPropagation();
                }
            }
            e.opts.onDelegate(t);
            return r;
        }
    }
    var o = e("jquery"), r = e("../event/emitter"), a = /\S+/g, s = -1, l = (+new Date()).toString(36), u = "/", c = function() {
        return l + ++s;
    }, d = function(e, t) {
        var i = e.guid || (e.guid = c()), n = function(i, n) {
            return e.call(t || n, i);
        };
        n.guid = i;
        return n;
    }, f = function() {}, p = function(e, t) {
        return "function" == typeof e ? e : t;
    }, h = function(e, t) {
        t = t || {};
        "string" == typeof e && (e = o(e)[0]);
        var i = {}, s = {}, l = new r(), c = t.context, h = {
            o: i,
            opts: t,
            e: l
        }, m = function(e) {
            return n(h, e);
        };
        t.onDelegate = p(t.onDelegate, f);
        i.on = function(t, i, n) {
            if ("function" == typeof i) {
                n = i;
                i = t;
                t = "click";
            }
            if ("function" != typeof n) throw Error("The delegate handler should be a valid function");
            i = (i || "").match(a) || [];
            for (var r = i.length; r--; ) {
                if (!s[t]) {
                    s[t] = 1;
                    o(e).on(t, "[action-type]", m);
                }
                l.on(t + u + i[r], d(n, c));
            }
            return this;
        };
        i.un = function(t, i, n) {
            if ("function" == typeof i || !i) {
                n = i;
                i = t;
                t = "click";
            }
            i = (i || "").match(a) || [];
            var r, s = i.length;
            for (o(e); s--; ) {
                r = t + u + i[s];
                l.un(r, n);
            }
            return this;
        };
        i.fire = function(t, i) {
            if (!i) {
                i = t;
                t = "click";
            }
            var n = o('[action-type="' + i + '"]', e)[0] || document, r = new o.Event(t);
            r.currentTarget = r.target = n;
            l.emit(t + u + i, r, n);
        };
        i.destroy = function() {
            var n = o(e);
            o.each(s, function(e, t) {
                delete s[e];
                n.off(e, "[action-type]", m);
            });
            l.un();
            for (var r in i) delete i[r];
            l = void 0;
            t = void 0;
            s = n = e = void 0;
            m = null;
        };
        return i;
    };
    i.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(e, t, i) {
    "use strict";
    function n(e) {
        return u("<" + e + "/>")[0];
    }
    function o(e, t, i) {
        e.insertRule ? e.insertRule(t + " {" + i + "}", 0) : e.addRule(t, i, 1);
    }
    function r() {
        var e, t, i, n, o, a = "";
        e = document.body || document.documentElement;
        i = e.style;
        n = "Transition";
        o = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        t = 0;
        for (;t < o.length; ) {
            if (void 0 !== i[o[t] + n]) {
                a = o[t];
                break;
            }
            t++;
        }
        r = function() {
            return a;
        };
        return a;
    }
    function a() {
        var e = r();
        return e ? "-v-".replace("v", e.toLowerCase()) : "";
    }
    function s(e) {
        return "number" == typeof e ? e : {
            fast: 200,
            normal: 500,
            slow: 1e3
        }[e] || 500;
    }
    function l(e, t, i, n, o) {
        var r, a, l = u(e), c = arguments, o = "boolean" == typeof c[c.length - 1] && c[c.length - 1], h = !1, m = function() {
            v();
        }, v = function(e) {
            h || g(!0);
        }, g = function(e) {
            if (!h) {
                h = !0;
                v = d;
                l.off(y, m);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                l.removeClass(a);
                e && n();
                l = null;
            }
        };
        if ("function" == typeof i) {
            n = i;
            i = void 0;
        }
        n = n || d;
        if (p) {
            i = i || "normal";
            t = t || "shake";
            a = [ "ui-animated", "ui-speed-" + i, "ui-ani-" + t ].join(" ");
            l.on(y, m);
            r = setTimeout(m, s(i) + 100);
            o === !0 ? f(function() {
                l.addClass(a);
            }) : l.addClass(a);
        } else f(function() {
            n && n();
        });
        return {
            stop: function() {
                g.apply(null, arguments);
                return this;
            }
        };
    }
    var u = e("jquery"), c = e("./util"), d = (c.each, c.noop), f = c.setImmediate, p = a(), h = /\-v\-/g, m = document.getElementsByTagName("head")[0].appendChild(n("style")), v = m.sheet || m.styleSheet, g = {
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
    }[p];
    c.each(g, function(e, t) {
        e && o(v, t, e.replace(h, p));
    });
    t.effect = l;
    t.getVendorPrefix = r;
});

define("lib/ui/box/1.0.1/popup", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/utils/css", "../../../core/1.0.0/event/emitter" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
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
        t._ = e = b(i, e);
        e.fixed = !!e.fixed && A();
        var r = o('<div class="' + m + '" id="' + (e.id || w()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(e.html), a = o("<div />");
        t._popup = r;
        t._mask = t._shadow = a;
        t.node = r[0];
        t.mask = a[0];
        t.on("render", function(e) {
            var i, o = e.className, a = t._mask, s = e.zIndex;
            r.html() || r.html(e.html);
            o && r.addClass(o);
            r.css("position", e.fixed ? "fixed" : "absolute");
            s && r.css("zIndex", s);
            if (e.modal) {
                r.addClass(m + "-modal");
                i = {
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    userSelect: "none",
                    zIndex: s || n.zIndex,
                    backgroundColor: "#000",
                    opacity: .3
                };
                A() || b(i, {
                    position: "absolute",
                    width: c.width() + "px",
                    height: d.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", T(t.focus, t));
                t._shadow = a.clone(!0);
                a.css(i).addClass(m + "-mask");
            }
        });
        t.on("beforeShow", function(e) {
            var i = t.anchor, n = t._dirClass;
            if (!i && n) {
                r.removeClass(n);
                delete t._dirClass;
            }
        });
        t.on("show", function(e) {
            t.resize();
            if (e.modal) {
                t._mask.insertBefore(r).css("display", "block");
                t._shadow.insertAfter(r);
            }
            e.autofocus && t.focus();
        });
        t.on("hide", function(e) {
            t._mask.remove();
            t._shadow.remove();
            t.blur();
        });
        t.once("destroy", function() {
            r.off();
            r = null;
            t._mask.off();
            t._shadow.off();
        });
        if (!h) {
            var s = T(t.resize, t);
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
    var o = e("jquery"), r = e("../../../core/1.0.0/utils/util"), a = e("../../../core/1.0.0/utils/css"), s = e("../../../core/1.0.0/event/emitter"), l = window, u = l.document, c = o(l), d = o(u), f = u.documentElement, p = /\S+/g, h = !("minWidth" in f.style), m = "ui-layer", v = l.Math, g = v.max, y = v.ceil, w = r.guid, b = r.extend, x = r.each, T = function(e, t) {
        return e.bind ? e.bind(t) : function() {
            return e.apply(t, arguments);
        };
    }, S = r.setImmediate, C = function(e) {
        return l.parseInt(e, 10) || 0;
    }, k = function(e) {
        return e && 1 === e.nodeType;
    }, A = function() {
        return A._ || (A._ = function() {
            var e = u.createElement("div"), t = e.cloneNode(!1), i = !1, n = u.body || function() {
                i = !0;
                return f.appendChild(u.createElement("body"));
            }();
            e.style.cssText = "position:fixed;top:42px";
            n.appendChild(e);
            n.appendChild(t);
            var o = e.offsetTop !== t.offsetTop;
            n.removeChild(e);
            n.removeChild(t);
            i && f.removeChild(n);
            e = t = null;
            return o;
        }());
    }, L = function() {
        return {
            x: d.scrollLeft(),
            y: d.scrollTop()
        };
    }, E = function(e) {
        return {
            w: e.width(),
            h: e.height()
        };
    }, _ = function() {
        return E(c);
    }, M = function(e) {
        var t = k(e), i = t ? o(e).offset() : {
            left: e.pageX,
            top: e.pageY
        };
        e = t ? e : e.target;
        var n = e.ownerDocument;
        if (n === l.document) return i;
        var r = n.defaultView || n.parentWindow, a = r.frameElement, s = L(), u = o(a).offset();
        return {
            left: i.left + u.left - s.x,
            top: i.top + u.top - s.y
        };
    }, I = function(e, t) {
        if (e.length) {
            var i = C(e.css(t)) || e[0]["offset" + t.charAt(0).toUpperCase() + t.slice(1)], n = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            x(n[t], function(t, n) {
                i += C(e.css("margin-" + t), 10) || 0;
            });
            return i;
        }
        return 0;
    }, P = function(e) {
        return I(e, "width");
    }, z = function(e) {
        return I(e, "height");
    }, j = function() {
        try {
            var e = u.activeElement, t = e.contentDocument;
            return t && t.activeElement || e;
        } catch (i) {}
    }, D = function(e) {
        e = e || "";
        var t = {
            auto: !0
        }, i = e.slice(-1);
        if ("!" === i) {
            t.auto = !1;
            e = e.slice(0, -1);
        }
        for (var n, e = e.length <= 2 ? e.split("") : e.replace(/^\s+|\s+$/g, "").split(" ").slice(0, 2), o = {}, r = {
            t: "t",
            b: "t",
            l: "l",
            r: "l"
        }, a = -1, s = e.length; ++a < s; ) {
            n = e[a].charAt(0);
            if (!n || o[r[n]]) e.splice(a, 1); else {
                e[a] = n;
                o[r[n]] = 1;
            }
        }
        2 === e.length && e[0] === e[1] && e.pop();
        t.align = e;
        return t;
    };
    r.inherits(n, s, {
        open: !1,
        destroyed: !0,
        node: null,
        mask: null,
        emit: function(e) {
            for (var t = (e || "").match(p) || [], i = t.length; i--; ) {
                var o = this["on" + t[i]], r = Array.prototype.slice.call(arguments, 1);
                "function" == typeof o && o.apply(this, r);
            }
            n.__super__.emit.apply(this, arguments);
        },
        $: function(e, t) {
            var i = this._nodes || (this._nodes = {}), n = i[e];
            if (!n || t && 0 === n.length) {
                n = this._popup.find('[node-type="' + e + '"]');
                t && n.length > 0 && (i[e] = n);
            }
            return !t || n.length ? n : null;
        },
        show: function(e, t) {
            var i, n = this, o = n._, r = e, s = null, l = n._anim;
            l && l.stop(!0);
            if (n.destroyed || o.showing || n.open) return n;
            t = b({}, n._, t);
            if (void 0 !== r) {
                i = typeof r;
                "boolean" === i ? t.modal = r : r && "object" === i && (k(r) || k(r.target) ? s = r : b(t, r));
            }
            var u = n._popup, c = t.showWithAni, d = function() {
                delete o.showing;
                n.emit("shown");
            };
            if (!n._ready) {
                n.emit("render", t);
                n._ready = !0;
            }
            n.open = !0;
            n.anchor = s;
            n._activeElement = j();
            n.emit("beforeShow", t);
            u.appendTo(t.appendTo).css("display", "block");
            n.emit("show", t);
            o.showing = !0;
            if (c && "none" !== c) {
                var f = c.split(":");
                n._anim = a.effect(n.node, f[0], f[1], d);
            } else d();
            return n;
        },
        hide: function(e) {
            var t, i = this, n = i._, o = i.node, r = n.hideWithAni, s = i._anim;
            s && s.stop(!0);
            if (i.destroyed || n.hidding || !i.open) return i;
            i.emit("beforeHide");
            n.hidding = !0;
            t = function() {
                if (n.hidding === !0) {
                    o.parentNode.removeChild(o);
                    i._popup.hide();
                    delete n.hidding;
                    i.open = !1;
                    i.emit("hidden");
                    (e || n.autoRelease) && i.destroy();
                }
            };
            if (r && "none" !== r) {
                var l = r.split(":");
                i._anim = a.effect(o, l[0], l[1], t);
                i.emit("hide");
            } else {
                i.emit("hide");
                S(t);
            }
            return i;
        },
        destroy: function() {
            var e = this;
            if (e.destroyed) return e;
            e.emit("beforeremove");
            n.current === e && (n.current = null);
            e._popup.off().remove();
            e._mask.off().remove();
            e._shadow.off().remove();
            e.emit("destroy");
            e.removeAllListeners();
            x(e, function(t, i) {
                delete e[i];
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
            var t = this._, i = this.node, r = this._popup, a = n.current, s = t.zIndex;
            a && a !== this && a.blur(!1);
            if (!o.contains(i, j())) {
                var l = r.find("[autofocus]")[0];
                !t.focusing && l ? t.focusing = !0 : l = i;
                this._focus(l);
            }
            if (void 0 === s) {
                s = t.zIndex = n.zIndex++;
                r.css("zIndex", s);
                r.addClass(m + "-focus");
            }
            n.current = this;
            this.emit("focus");
            return this;
        },
        blur: function() {
            var e = this._, t = arguments[0], i = this._activeElement;
            if (!i) return this;
            t !== !1 && this._focus(i);
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
            var e = this._popup, t = this._.fixed, i = L(), n = _(), o = E(e), r = t ? 0 : i.x, a = t ? 0 : i.y, s = (n.w - o.w) / 2 + r, l = .382 * (n.h - o.h) + a;
            e.css({
                left: g(C(s), r),
                top: g(C(l), a)
            });
            return this;
        },
        alignTo: function(e, t) {
            var i = this, n = i._, r = i._popup, a = e.parentNode && o(e);
            if (!a) return i;
            var s = a.offset();
            if (s.left * s.top < 0) return i.center();
            t = t || n.align;
            var l = D(t), u = l.align, c = !l.auto;
            u && u.length || (u = [ "b" ]);
            var d = i._dirClass;
            d && r.removeClass(d);
            var f = n.fixed, p = _(), h = L(), v = P(r), g = z(r), w = M(e), b = P(a), T = z(a), S = w.left, k = w.top, A = f ? S - h.x : S, E = f ? k - h.y : k, I = f ? 0 : h.x, j = f ? 0 : h.y, W = I + p.w - v, N = j + p.h - g, F = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, O = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, R = {}, q = [ {
                t: E - g,
                b: E + T,
                l: A - v,
                r: A + b
            }, {
                t: E,
                b: E - g + T,
                l: A,
                r: A - v + b
            } ], H = {
                l: A + y((b - v) / 2),
                t: E + y((T - g) / 2)
            }, B = {
                left: [ I, W ],
                top: [ j, N ]
            };
            c || x(u, function(e, t) {
                q[t][e] > B[O[e]][1] && (e = u[t] = F[e]);
                q[t][e] < B[O[e]][0] && (u[t] = F[e]);
            });
            var G = u[0];
            if (!u[1]) {
                u[1] = "left" === O[G] ? "t" : "l";
                q[1][u[1]] = H[u[1]];
            }
            q[0][G] = q[0][G] + 10 * ("tl".indexOf(G) !== -1 ? -1 : 1);
            R[O[u[0]]] = C(q[0][u[0]]);
            R[O[u[1]]] = C(q[1][u[1]]);
            var V = m + "-" + G;
            r.css(R).addClass(V);
            i._dirClass = V;
            var $ = i.$("arrow", 1), X = i.$("inner", 1);
            if (!$) {
                if (!X) return i;
                $ = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(X);
            }
            var Y, U, Q = "top" !== O[G], K = [ "v", "h" ][1 ^ Q], Z = P($), J = z($), ee = {}, te = Q ? "left" : "top";
            switch (K) {
              case "h":
                Y = y(S + (b - Z) / 2);
                ee.left = Y;
                break;

              case "v":
                U = y(k + (T - J) / 2);
                ee.top = U;
            }
            $.offset(ee).css(te, "");
            return i;
        }
    });
    n.zIndex = 1024;
    n.current = null;
    i.exports = n;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(e, t, i) {
    "use strict";
    var n = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("../../../core/1.0.0/dom/delegator"), a = e("./popup"), s = o.extend, l = o.guid, u = o.each, c = window.document, d = {
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
    }, f = {}, p = function(e) {
        var t = e || (e = {}), i = e.id || e.id || l(), o = p.get(i) || this;
        "string" != typeof e && 1 !== e.nodeType || (e = {
            content: e
        });
        e = s({}, d, e);
        e.original = t;
        var r, a = e.button || (e.button = []);
        if (!n.isArray(r = a)) {
            r = [];
            a && "object" == typeof a && u(a, function(e, t) {
                e.id = t;
                r.push(e);
            });
            a = e.button = r;
        }
        if (a.length > 0) {
            var c = !1;
            u(a, function(t, i) {
                var n = t.id || l();
                t.autofocus && (c = !0);
                e[n] && s(t, e[n]);
                t.index = i;
            });
            c || (a[a.length - 1].autofocus = !0);
        }
        o.emit("init", e);
        o.initialized ? o.options(e).focus() : o.init(e);
        f[i] = o;
        return o;
    };
    o.inherits(p, a, {
        init: function(e) {
            var t = this;
            a.call(t, e);
            var i = function(e) {
                var i = e.actionValue === !1 || e.isDefaultPrevented();
                i || t.hide();
            };
            t._delegator = new r(t.node, {
                context: t,
                onDelegate: i
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
            u([ "title", "content", "width", "height", "action", "button" ], function(i, n) {
                n = e[i];
                null != n && "function" == typeof t[i] && t[i](n);
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
            t.clickBlankToHide && n(e.mask).on("onmousedown" in c ? "mousedown" : "click", function() {
                e.hide();
                return !1;
            });
            var i = function(t) {
                var i = t.target, n = i.nodeName, o = /^input|textarea$/i, r = a.current === e, s = t.keyCode;
                !r || o.test(n) && "button" !== i.type || 27 === s && e.hide();
            };
            n(c).on("keydown", i);
            e.on("destroy", function() {
                n(c).off("keydown", i);
            });
        },
        delegate: function(e, t, i) {
            var n = this._delegator;
            n.on.apply(n, arguments);
            return this;
        },
        undelegate: function(e, t, i) {
            var n = this._delegator;
            n.un.apply(n, arguments);
            return this;
        },
        content: function(e) {
            var t = this.$("content");
            if (e && e.nodeType) {
                n.contains(c, e) && this.on("beforeremove", function() {
                    n("body").append(e.hide());
                });
                e = n(e);
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
            var t = this, i = t._, n = "", o = 0, r = i.buttonClass;
            if ("string" == typeof e) {
                n = e;
                o++;
            } else u(e, function(e, a) {
                var s = e.id, l = e.fn || e.callback, u = e.display !== !1, c = e.className || r, d = [ c ];
                e.autofocus && d.push(i.buttonClassLight);
                "function" == typeof l && t.delegate(s, l);
                u && o++;
                n += '<button type="button" action-type="' + s + '"' + (u ? "" : ' style="display:none"') + (' class="' + d.join(" ") + '"') + (e.disabled ? " disabled" : "") + ">" + (e.text || e.value) + "</button>";
            });
            t.$("button").html(n);
            t.$("footer")[o ? "show" : "hide"]();
            t.resize();
            return t;
        },
        action: function(e) {
            var t = this;
            u(e, function(e, i) {
                t.delegate(i, e);
            });
            return t;
        }
    });
    p.getCurrent = function() {
        return a.current;
    };
    p.get = function(e) {
        return void 0 === e ? f : f[e];
    };
    p.config = function(e) {
        e && s(d, e);
    };
    i.exports = p;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(e, t, i) {
    "use strict";
    var n = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("./drag"), a = e("./dialog"), s = o.each, l = o.extend, u = window.clearTimeout, c = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var e = n('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + c + '"</i>').appendTo("body");
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
    }, p = o.guid("__x") + "$", h = function(e) {
        return p + e;
    }, m = function(e, t) {
        var i, n = t.xtype, o = n && f(n) || t.iconHTML;
        if (o) {
            i = e ? '<div node-type="text" class="x-text">' + e + "</div>" : "";
            e = [ '<div class="ui-box-x-wrap">', o, i, "</div>" ].join("");
        }
        return e;
    }, v = function(e) {
        var t = e.contentWindow;
        if (t) try {
            return t.document;
        } catch (i) {
            return 0;
        }
    }, g = function(e) {
        var t;
        e.once("init", function(i) {
            var n = {};
            s([ "title", "width", "height", "button" ], function(e) {
                n[e] = i[e];
                delete i[e];
            });
            e.once("load", function() {
                var i = e._;
                s(n, function(n, o) {
                    if (n) if ("title" === o) {
                        if ("auto" === n) try {
                            n = t.contentWindow.document.title || "";
                        } catch (r) {
                            n = "";
                        }
                        n && e.title(n);
                    } else "function" == typeof e[o] ? e[o](n) : i[o] = n;
                });
            });
        }).once("render", function() {
            var i = e._;
            setTimeout(function() {
                t = y(e, i.url);
                e.iframeNode = t;
            }, 30);
            var o = i.original;
            if (!(o instanceof Object)) for (var r = function() {
                e.hide().destroy();
            }, a = 0; a < frames.length; a++) try {
                if (o instanceof frames[a].Object) {
                    n(frames[a]).one("unload", r);
                    break;
                }
            } catch (s) {}
        }).once("beforeremove", function() {
            n(t).attr("src", "about:blank").remove();
        }, !1);
    }, y = function(e, t) {
        var i = e._, o = e.$("content"), r = o.find("iframe"), a = r && r[0], s = function(t) {
            e._freeze(!0);
            if (t) {
                i.width || e.width(t.width);
                i.height || e.height(t.height);
            }
            e.emit("load");
            e._freeze(!1).resize();
            s = null;
            r.removeAttr("style");
            r = a = null;
        }, l = function(t) {
            i.showing ? e.once("shown", t) : t();
        };
        if (!r.length) {
            var u = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), c = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (u ? ' allowtransparency="true"' : "") + ' scrolling="' + i.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + t + '"></iframe>';
            r = n(c.replace(/{id}/g, i.id)).appendTo(o);
            a = r[0];
            i.autoSize ? r.one("load", function() {
                var e, t, i, o = v(a), u = o && n(o);
                if (u) {
                    e = u.width();
                    r.width(e);
                    t = u.height();
                    i = {
                        width: e,
                        height: t
                    };
                }
                l(function() {
                    s(i);
                });
            }) : l(function() {
                s();
            });
        }
        return a;
    }, w = function(e) {
        var t = this;
        e = l({}, e);
        var i = e.button || (e.button = []);
        s([ "cancel", "ok" ], function(t, n) {
            var o = e[t];
            if (o && "object" == typeof o) {
                o.id = t;
                i.push(o);
                delete e[t];
            }
        });
        var o = e.xtype;
        if (o) {
            e.id = e.id || h(o);
            e.content = m(e.content, e);
            "none" !== o && (e.className = (e.className || "") + " ui-box-x-" + o);
        } else {
            var u = e.url;
            if (u) {
                var c = e.close !== !1;
                e = l({
                    modal: !0,
                    close: !1,
                    autoRelease: !0,
                    autoSize: !0,
                    scrolling: "auto"
                }, e);
                var d = n(m("Loading...", {
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
                g(t);
            }
        }
        t = a.call(t, e) || t;
        t._ready || t.once("render", function() {
            var i = t.$("title");
            if (i.length && e.drag !== !1) {
                i.css("cursor", "move");
                r.create(t.node, null, {
                    hook: i,
                    onstart: function() {
                        t.anchor || t.focus();
                    }
                });
            }
        });
        return t;
    }, b = "__showDelay", x = "__hideTimer";
    o.inherits(w, a, {
        show: function(e, t) {
            var i = this, n = i._, r = [].slice.call(arguments), t = l({}, n, t), a = t.duration || 0, s = t.delay || 0, c = function() {
                o.each([ b, x ], function(e, t) {
                    t = n[e];
                    delete n[e];
                    t && u(t);
                });
            }, d = function() {
                if (a > 0) {
                    n[x] = setTimeout(function() {
                        c();
                        i.hide();
                    }, a);
                    i.once("hide", c);
                }
                w.__super__.show.apply(i, r);
            };
            c();
            s > 0 ? n[b] = setTimeout(d, s) : d();
            return i;
        },
        hide: function() {
            var e = this, t = e._;
            t && o.each([ b, x ], function(e, i) {
                i = t[e];
                delete t[e];
                i && u(i);
            });
            w.__super__.hide.apply(e, arguments);
            return e;
        }
    });
    w.config = a.config;
    w.get = function(e) {
        if (e) {
            var t, i, n = a.get();
            if (e && (t = e.frameElement)) for (var o in n) if (n.hasOwnProperty(o)) {
                i = n[o];
                if (i.iframeNode === t) return i;
            }
            return n[e];
        }
    };
    i.exports = w;
});

define("lib/ui/box/1.0.1/box", [ "require", "exports", "module", "./messagebox", "../../../core/1.0.0/utils/util" ], function(e, t, i) {
    "use strict";
    var n = e("./messagebox"), o = e("../../../core/1.0.0/utils/util"), r = function() {}, a = o.mix, s = function(e, t) {
        var i = function(e, t) {
            return void 0 !== t && null !== t && "" !== t && !("number" == typeof t && isNaN(t));
        };
        return function(e, t) {
            return a(e, t, !0, !0, i);
        };
    }(), l = function(e) {
        return !!(e && e.nodeType && e.tagName);
    }, u = o.guid, c = function() {
        return u("__0x$");
    }, d = function(e) {
        var t, i = e[1] || {};
        t = e[0];
        t && ("string" == typeof t ? i.html = t : "object" == typeof t && (i = t));
        var n = i.skin;
        if (n) {
            i.className = n;
            delete i.skin;
        }
        return i;
    }, f = function(e, t) {
        var t = d([ e, t ]);
        return new n(t);
    }, p = function(e, t, i) {
        if ("object" == typeof e) {
            i = t;
            t = e;
            e = "";
        } else if (l(t)) {
            i = t;
            t = {};
        } else "number" == typeof t && (t = {
            duration: t
        });
        t = t || {};
        var n = f(s({
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
        return t.hide ? n : n.show(i);
    }, h = {
        create: f,
        loadUrl: function(e, t) {
            t = t || {};
            t.url = e;
            var i = f(t);
            return i.show();
        },
        loading: function(e, t) {
            t = t || {};
            var i = f(s({
                autofocus: !0,
                autoRelease: !0,
                id: c(),
                modal: !0,
                close: !1,
                xtype: "loading",
                content: e || ""
            }, t));
            return t.hide ? i : i.show();
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
        confirm: function(e, t, i, n) {
            var o;
            if (!n && i && "object" == typeof i) {
                l(i) ? n = i : o = i;
                i = t;
            }
            if ("function" != typeof t) {
                o = t;
                t = r;
            }
            "function" != typeof i && (i = t);
            var a = function(e) {
                e ? t(e) : i(e);
            };
            o && (n = n || o.sender);
            var u = f(s({
                xtype: "confirm",
                autofocus: !0,
                id: c(),
                modal: !n,
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
            }, o));
            return u.show(n);
        },
        bubble: p
    };
    h.tips = h.bubble;
    o.each([ "ok", "info", "warn", "error" ], function(e, t) {
        h[e] = function(t, i, n) {
            var o = {
                xtype: e
            };
            if (i && i.nodeType) {
                n = i;
                i = void 0;
            } else "number" == typeof i ? o.duration = i : o = s(o, i);
            return p(t, o, n);
        };
    });
    h.get = n.get;
    h.config = n.config;
    i.exports = h;
});

define("lib/gallery/utils/1.0.0/image", [ "require", "exports", "module" ], function(e, t, i) {
    "use strict";
    function n(e, t, i) {
        var n, o, r = 0, a = e.length - 1;
        if (t >= e[a]) return a;
        if (t <= e[r]) return r;
        for (;r <= a; ) {
            n = (r + a) / 2 | 0;
            o = e[n];
            if (o < t) r = n + 1; else {
                if (!(o > t)) return n;
                a = n - 1;
            }
        }
        if (r > a) {
            o = r;
            r = a;
            a = o;
        }
        var s = (e[a] + e[r]) / 2, l = (s - t) / (s - e[r]);
        Math.abs(l);
        return l > 0 && (i || l > .5) ? r : a;
    }
    function o(e, t) {
        var i = n(f, e, t), o = f[i];
        return d[o];
    }
    function r(e, t, i) {
        if (!t) throw "The original dpr not defined.";
        var n = p.exec(e) || [], r = n[1], a = "." + n[2], s = n[3], u = s && c[s];
        void 0 === i && (i = l);
        if (!u || t === i) return e;
        s = o(Math.ceil(u / t * i), i > 1) || s;
        return r + a + "!" + s;
    }
    function a(e, t) {
        if (!c[t]) return e;
        var i = p.exec(e) || [], n = i[3];
        return n ? n !== t ? e.replace("!" + n, "!" + t) : e : e + "!" + t;
    }
    function s(e) {
        var t, i, n;
        (t = h.exec(e)) && (n = (i = t[3]) && (n = c[i]) ? {
            width: n,
            height: n
        } : {
            width: +t[1],
            height: +t[2]
        });
        return n;
    }
    var l = window.devicePixelRatio || 1, u = function(e, t) {
        for (var i in e) e.hasOwnProperty(i) && t(e[i], i);
    }, c = (Object.keys || function(e) {
        var t = [];
        for (var i in e) e.hasOwnProperty(i) && t.push(i);
        return t;
    }, {
        s1: 70,
        s2: 100,
        m1: 200,
        m2: 300,
        l1: 400,
        l2: 600,
        l5: 750,
        l3: 800,
        l4: 1e3,
        dk1: 500,
        sp1: 640
    }), d = {}, f = [];
    u(c, function(e, t) {
        f.push(+e);
        d[e] = t;
    });
    f.sort(function(e, t) {
        return e > t;
    });
    var p = /(.*?)\.(\w+)!(\w+?)$/, h = /_(\d+)x(\d+)\.[\w]+(?:!(\w+?)|\?.*)*$/;
    t.getImageType = o;
    t.rebuildImageURL = r;
    t.getImageURL = a;
    t.parseSize = s;
    t.load = function(e, t, i, n) {
        var o;
        if (!e) return i && i();
        if ("string" == typeof e) o = new Image(); else {
            o = e;
            e = o.getAttibute("data-url") || o.getAttibute("data-src");
        }
        var r = function() {
            o.onload = o.onerror = o = null;
            r = null;
        };
        i && (o.onerror = function() {
            i(o);
            r();
        });
        t && (o.onload = function() {
            t(o);
            r();
        });
        o.src = e;
    };
});

define("lib/ui/slider/1.0.0/slider", [ "require", "exports", "module", "jquery", "../../../gallery/utils/1.0.0/image" ], function(e, t, i) {
    "use strict";
    var n = e("jquery"), o = e("../../../gallery/utils/1.0.0/image");
    n.fn.slider = function(e) {
        function t(e) {
            function t() {
                c.eq(p).addClass("hover").siblings("a").removeClass("hover");
                var e = u.eq(p), t = u.eq(f), i = e.attr(h);
                e.show();
                i && o.load(i, function() {
                    e.css({
                        "background-image": "url(" + i + ")"
                    });
                    e.removeAttr(h);
                });
                f != p && t.stop().animate({
                    opacity: 0,
                    "z-index": 1
                }, 1e3);
                e.stop().animate({
                    opacity: 1,
                    "z-index": 9
                }, 1e3);
                f = p;
            }
            function i() {
                if (r.duration > 0) {
                    e.mouseenter(function() {
                        d = !0;
                    });
                    e.mouseleave(function() {
                        d = !1;
                    });
                    setInterval(function() {
                        d || a(!0);
                    }, r.duration);
                }
            }
            function a(e) {
                if (e) {
                    p++;
                    p >= m && (p = 0);
                } else {
                    p--;
                    p < 0 && (p = m - 1);
                }
                t();
            }
            function s(e) {
                var t = n('<a class="arrow-l jImgLeft" href="javascript:;"><em></em><i class="icon iconfont"></i></a><a class="arrow-r jImgRight" href="javascript:;"><em></em><i class="icon iconfont"></i></a>').appendTo(e), i = t.filter(".jImgLeft").hide(), o = t.filter(".jImgRight").hide();
                i.on("click", function() {
                    a(!1);
                });
                o.on("click", function() {
                    a(!0);
                });
                e.mouseenter(function() {
                    i.show();
                    o.show();
                });
                e.mouseleave(function() {
                    i.hide();
                    o.hide();
                });
            }
            function l() {
                e.find(".slider-list").css({
                    background: "none"
                });
            }
            var u = e.find(".slider-list li");
            if (!u || 0 != u.length) {
                var c = e.find(".slider-num a"), d = !1, f = 0, p = 0, h = r.attr, m = c.length;
                m < 2 && c.hide();
                c.mouseenter(function() {
                    p = n(this).index();
                    t();
                });
                r.addBtn && s(e);
                t();
                l();
                i();
            }
        }
        var i = {
            attr: "data-img",
            duration: 5e3,
            addBtn: !1,
            callback: function() {}
        }, r = n.extend({}, i, e || {});
        n(this).each(function() {
            var e = n(this);
            t(e);
        });
    };
});

!function(e, t, i) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], i) : e[t] = i(e.jQuery || e.Zepto);
}(this, "Lazyload", function(e, t) {
    "use strict";
    if (!e) throw "Error: jquery api not implements.";
    var i = e.each, n = function(e, t) {
        if (e instanceof Array && e.filter) return e.filter(t);
        for (var i = [], n = -1, o = e.length; ++n < o; ) t(e[n], n) && i.push(e[n]);
        return i;
    }, o = function(e, t, i, n) {
        var o;
        return function() {
            var r = n || this, a = arguments, s = function() {
                o = null;
                i || e.apply(r, a);
            }, l = i && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            l && e.apply(r, a);
        };
    }, r = function(t, i) {
        t = t || {};
        var n = e(t), o = Array.prototype.slice;
        i = i || t.name;
        e.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(e, r) {
            t[e] = function(t) {
                var a = o.call(arguments, 0), s = a[1];
                i && !~t.indexOf(".") && (a[0] = t + "." + i);
                "function" == typeof s && ("on" === e || "once" === e ? a[1] = s.__ || (s.__ = function(e) {
                    e.preventDefault();
                    return s.apply(this, o.call(arguments, 1));
                }) : "un" === e && (a[1] = s.__));
                return n[r].apply(n, a);
            };
        });
        return t;
    }, a = window, s = e(a), l = a.Image, u = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", d = 0, f = 1, p = 2, h = function(e) {
        return e[c] === t;
    }, m = function() {
        var e = {}, t = function(t, i) {
            "function" == typeof i && (e[t] = i);
        }, i = function(t) {
            return e[t];
        };
        return {
            define: t,
            get: i
        };
    }();
    m.define("image", function(i, n, o, r) {
        if (n) {
            var a = new l(), s = function() {
                a.onload = a.onerror = null;
                a = n = i = r = s = t;
            };
            a.onload = function() {
                var t = e(i), a = o.effect;
                "function" != typeof t[a] && (a = "show");
                t.hide();
                "IMG" === i.nodeName.toUpperCase() ? t.attr("src", n) : t.css("background-image", 'url("' + n + '")');
                t[a](o.effectSpeed);
                r(null, "load");
                s();
            };
            a.onerror = function(e) {
                r(e);
                s();
            };
            a.src = n;
        } else r("error");
    });
    m.define("html", function(e, t, i, n) {
        n();
    });
    var v = function(t, l) {
        l = l || {};
        t = e(t);
        var v = this, x = {
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
        r(v);
        var T = l.type || x.type, S = m.get(T);
        if ("function" != typeof S) throw "Error, cannot found the specific type loader (type: `" + T + "`)";
        "html" === T && (x.placeholder = "");
        l && e.extend(x, l);
        var C = x.container, k = x.event, A = 0 === k.indexOf("scroll"), L = C && C !== a ? e(C) : s, E = function(t) {
            var n = v._list;
            if (n.length > 0) {
                var o = 0;
                i(n.slice(0), function(t, i) {
                    var n = e(i);
                    if (!x.skipInvisible || n.is(":visible")) if (w(i, x) || b(i, x)) ; else if (g(i, x) || y(i, x)) {
                        if (++o > x.failureLimit) return !1;
                    } else {
                        n.trigger("appear");
                        o = 0;
                    }
                });
            } else v.reset();
        }, _ = function() {
            v._list = n(v._list, function(e) {
                return !e[c];
            });
        }, M = function() {
            var t = this, i = e(t), n = i.attr("data-" + x.dataAttribute), o = x.sourceMaker, r = x.appear, a = x.loadingClass, s = t[c];
            if (s === d) {
                t[c] = f;
                a && i.addClass(a);
                o && (n = o(n, t));
                r && r.apply(v, [ t, n ]);
                S.call(v, t, n, x, function(e, o) {
                    if (!v._destroyed) {
                        a && i.removeClass(a);
                        if (e) setTimeout(function() {
                            t[c] = d;
                            v.emit("lazyItemError", t, n, e);
                            t = null;
                        }, 300); else {
                            t[c] = p;
                            _();
                            v.emit("lazyItemReady", t, n, o);
                            var r = x.load;
                            r && r.apply(v, [ t, n, o ]);
                            t = null;
                        }
                        i = null;
                    }
                });
            } else if (s === p) {
                _();
                v.emit("lazyItemReady", t, n);
            }
        }, I = function() {
            this[c] || e(this).trigger("appear");
        }, P = function(t) {
            var i = e(t);
            t[c] = d;
            var n = x.placeholder;
            if (n) if (i.is("img")) {
                var o = i.attr("src");
                o || i.attr("src", n);
            } else "image" === v._.type || i.children()[0] || i.html(n);
            i.on("appear", M);
            A || i.on(k, I);
            v._list.push(t);
        }, z = function(e) {
            e = n(e || [], h);
            if (e.length) {
                i(e, function(e, t) {
                    P(t);
                });
                v._inited || j(v);
            }
        }, j = function(t) {
            if (!t._inited) {
                var n = o(E, 30);
                t._inited = !0;
                A && L.on(k, n);
                s.on("resize", n);
                if (u) {
                    var r = function(n) {
                        n.originalEvent && n.originalEvent.persisted && i(t._list, function(t, i) {
                            e(i).trigger("appear");
                        });
                    };
                    s.on("pageshow", r);
                    t.once("reset", function() {
                        s.off("pageshow", r);
                    });
                }
                t.once("reset", function() {
                    i(t._list, function(e, t) {
                        D(t);
                    });
                    A && L.off(k, n);
                    s.off("resize", n);
                });
                e(document).ready(E);
            }
        }, D = function(t) {
            var i = e(t);
            i.off("appear", M);
            A || i.off(k, I);
        };
        v.on("lazyItemReady", function(e) {
            D(e);
        });
        v.once("destroy", function() {
            z = null;
            E = null;
            _ = null;
            M = null;
            I = null;
        });
        v._ = x;
        v._list = [];
        v.add = function(t) {
            var i = e(t);
            i.length > 0 && z(i);
        };
        v.update = E;
        z(t);
    };
    v.prototype = {
        constructor: v,
        update: function() {},
        peek: function() {
            var e = this._list, i = e.length;
            return i > 0 ? e[0] : t;
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
    v.define = function(e, t) {
        return m.define(e, t);
    };
    var g = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().top + e(o).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return n <= e(t).offset().top - i.threshold;
    }, y = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().left + e(o).width() : s.width() + s.scrollLeft();
        return n <= e(t).offset().left - i.threshold;
    }, w = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().top : s.scrollTop();
        return n >= e(t).offset().top + i.threshold + e(t).height();
    }, b = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().left : s.scrollLeft();
        return n >= e(t).offset().left + i.threshold + e(t).width();
    }, x = function(e, t) {
        return !(y(e, t) || b(e, t) || g(e, t) || w(e, t));
    };
    v.belowthefold = g;
    v.rightoffold = y;
    v.abovethetop = w;
    v.leftofbegin = b;
    v.inviewport = x;
    return v;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(e, t, i) {
    "use strict";
    var n = e("jquery"), o = e("../utils/util"), r = e("../event/emitter"), a = o.setImmediate, s = o.noop, l = o.extend, u = n.trim, c = n.parseJSON, d = function(e, t, i) {
        return function(n, o) {
            try {
                return e.apply(t, arguments);
            } catch (r) {
                i && i(r, n, o);
            }
        };
    }, f = function(e) {
        return t.emit.apply(t, arguments);
    };
    r.applyTo(t);
    var p = function() {
        var e = 5, t = 0, i = [], o = function() {
            a(function() {
                --t;
                r();
            });
        }, r = function() {
            if (i.length > 0 && t < e) {
                var r = i.shift(), a = r[0], s = r[1];
                ++t;
                a.always(o);
                n.ajax(s);
            }
        };
        return function(e, t) {
            i.push([ e, t ]);
            r();
        };
    }(), h = function(e) {
        r.applyTo(this);
        var t = {
            url: "",
            type: "GET",
            data: {},
            dataType: "json",
            timeout: 3e4,
            cache: !1
        };
        e = l(t, e);
        delete e.error;
        delete e.success;
        this._opts = e;
    };
    l(h.prototype, {
        send: function() {
            var e = this, t = this._opts, i = l({}, t), n = "jsonp" === i.dataType;
            n && (i.crossDomain = !0);
            i.complete = function(i, o) {
                var r, a = +i.status, s = i.responseJSON, l = {
                    error: "1",
                    msg: "Request error (status: " + (o || a) + ")"
                }, d = 200 === a || "success" === o;
                if (!n && !s) {
                    s = u(i.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = c(s);
                    } catch (f) {}
                }
                d || (s = s || l);
                r = {
                    data: s,
                    xhr: i,
                    origin: t,
                    status: a || o
                };
                d ? e.emit("response", null, r) : e.emit("error", s, r);
                e.emit("end", r);
                e.destroy();
            };
            p(e, i);
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
        t = t && n(t);
        if (t) {
            var i = "disabled";
            t.addClass(i).prop("disabled", !0);
            e.once("end", function() {
                t.removeClass(i).prop("disabled", !1);
                t = null;
            });
        }
    });
    t.ajax = function(e, t, i) {
        if ("object" == typeof e) {
            i = t;
            t = e;
            e = void 0;
        }
        t = t || {};
        e && (t.url = e);
        var o = new h(t), r = function(e, i) {
            var n = e.stack && e.stack.split("\n").slice(0, 2).join("\n") || e, o = {
                stack: n,
                origin: t,
                response: i
            };
            f("error", o, i);
            a(function() {
                console.log("%c " + n, "color:#ae0000");
            }, 1);
        }, l = d(t.error || s, null, r), u = d(t.success || s, null, r);
        if (f("request", o, i) !== !1) {
            if (i && (i = n(i))) {
                var c, p, m = "data-async-lock";
                if (1 === +i.attr(m)) return;
                if (p = i.attr("data-async-text")) {
                    c = i.html();
                    i.html(p);
                }
                i.attr(m, 1);
                o.once("response error", function() {
                    if (i) {
                        i.attr(m, 0);
                        p && i.html(c);
                        i = null;
                    }
                });
            }
            o.on("error", function(e, t) {
                var i = {
                    code: e.error,
                    message: e.msg,
                    status: t.status,
                    origin: t.origin,
                    response: t.data
                };
                f("error", i, t) !== !1 && l(e);
            });
            o.on("response", function(e, t) {
                t = t.data;
                f("response", t) !== !1 && (e ? l(e) : t && 0 === +(t.error || 0) ? u(t) : l(t));
            });
            return o.send();
        }
    };
    n.each([ "get", "post", "jsonp" ], function(e, i) {
        t[i] = function(e, n, o, r, a) {
            if ("function" == typeof n) {
                a = a || r;
                r = o;
                o = n;
                n = void 0;
            }
            if (r && "function" != typeof r) {
                a = r;
                r = void 0;
            }
            var s = {
                data: n,
                success: o,
                error: r || o
            };
            "string" == typeof e ? s.url = e : l(s, e);
            var u = i;
            if ("jsonp" === i) {
                u = "get";
                s.dataType = "jsonp";
            }
            s.type = u;
            return t.ajax(s, a);
        };
    });
});

var Swiper = function(e, t) {
    "use strict";
    function i(e, t) {
        return document.querySelectorAll ? (t || document).querySelectorAll(e) : jQuery(e, t);
    }
    function n(e) {
        return "[object Array]" === Object.prototype.toString.apply(e);
    }
    function o() {
        var e = I - j;
        t.freeMode && (e = I - j);
        t.slidesPerView > E.slides.length && !t.centeredSlides && (e = 0);
        e < 0 && (e = 0);
        return e;
    }
    function r() {
        function e(e) {
            var i = new Image();
            i.onload = function() {
                if ("undefined" != typeof E && null !== E) {
                    void 0 !== E.imagesLoaded && E.imagesLoaded++;
                    if (E.imagesLoaded === E.imagesToLoad.length) {
                        E.reInit();
                        t.onImagesReady && E.fireCallback(t.onImagesReady, E);
                    }
                }
            };
            i.src = e;
        }
        var n = E.h.addEventListener, o = "wrapper" === t.eventTarget ? E.wrapper : E.container;
        if (E.browser.ie10 || E.browser.ie11) {
            n(o, E.touchEvents.touchStart, m);
            n(document, E.touchEvents.touchMove, v);
            n(document, E.touchEvents.touchEnd, g);
        } else {
            if (E.support.touch) {
                n(o, "touchstart", m);
                n(o, "touchmove", v);
                n(o, "touchend", g);
            }
            if (t.simulateTouch) {
                n(o, "mousedown", m);
                n(document, "mousemove", v);
                n(document, "mouseup", g);
            }
        }
        t.autoResize && n(window, "resize", E.resizeFix);
        a();
        E._wheelEvent = !1;
        if (t.mousewheelControl) {
            void 0 !== document.onmousewheel && (E._wheelEvent = "mousewheel");
            if (!E._wheelEvent) try {
                new WheelEvent("wheel");
                E._wheelEvent = "wheel";
            } catch (r) {}
            E._wheelEvent || (E._wheelEvent = "DOMMouseScroll");
            E._wheelEvent && n(E.container, E._wheelEvent, u);
        }
        t.keyboardControl && n(document, "keydown", l);
        if (t.updateOnImagesReady) {
            E.imagesToLoad = i("img", E.container);
            for (var s = 0; s < E.imagesToLoad.length; s++) e(E.imagesToLoad[s].getAttribute("src"));
        }
    }
    function a() {
        var e, n = E.h.addEventListener;
        if (t.preventLinks) {
            var o = i("a", E.container);
            for (e = 0; e < o.length; e++) n(o[e], "click", p);
        }
        if (t.releaseFormElements) {
            var r = i("input, textarea, select", E.container);
            for (e = 0; e < r.length; e++) n(r[e], E.touchEvents.touchStart, h, !0);
        }
        if (t.onSlideClick) for (e = 0; e < E.slides.length; e++) n(E.slides[e], "click", c);
        if (t.onSlideTouch) for (e = 0; e < E.slides.length; e++) n(E.slides[e], E.touchEvents.touchStart, d);
    }
    function s() {
        var e, n = E.h.removeEventListener;
        if (t.onSlideClick) for (e = 0; e < E.slides.length; e++) n(E.slides[e], "click", c);
        if (t.onSlideTouch) for (e = 0; e < E.slides.length; e++) n(E.slides[e], E.touchEvents.touchStart, d);
        if (t.releaseFormElements) {
            var o = i("input, textarea, select", E.container);
            for (e = 0; e < o.length; e++) n(o[e], E.touchEvents.touchStart, h, !0);
        }
        if (t.preventLinks) {
            var r = i("a", E.container);
            for (e = 0; e < r.length; e++) n(r[e], "click", p);
        }
    }
    function l(e) {
        var t = e.keyCode || e.charCode;
        if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey)) {
            if (37 === t || 39 === t || 38 === t || 40 === t) {
                for (var i = !1, n = E.h.getOffset(E.container), o = E.h.windowScroll().left, r = E.h.windowScroll().top, a = E.h.windowWidth(), s = E.h.windowHeight(), l = [ [ n.left, n.top ], [ n.left + E.width, n.top ], [ n.left, n.top + E.height ], [ n.left + E.width, n.top + E.height ] ], u = 0; u < l.length; u++) {
                    var c = l[u];
                    c[0] >= o && c[0] <= o + a && c[1] >= r && c[1] <= r + s && (i = !0);
                }
                if (!i) return;
            }
            if (F) {
                37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
                39 === t && E.swipeNext();
                37 === t && E.swipePrev();
            } else {
                38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
                40 === t && E.swipeNext();
                38 === t && E.swipePrev();
            }
        }
    }
    function u(e) {
        var i = E._wheelEvent, n = 0;
        if (e.detail) n = -e.detail; else if ("mousewheel" === i) if (t.mousewheelControlForceToAxis) if (F) {
            if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
            n = e.wheelDeltaX;
        } else {
            if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
            n = e.wheelDeltaY;
        } else n = e.wheelDelta; else if ("DOMMouseScroll" === i) n = -e.detail; else if ("wheel" === i) if (t.mousewheelControlForceToAxis) if (F) {
            if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
            n = -e.deltaX;
        } else {
            if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
            n = -e.deltaY;
        } else n = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
        if (t.freeMode) {
            var r = E.getWrapperTranslate() + n;
            r > 0 && (r = 0);
            r < -o() && (r = -o());
            E.setWrapperTransition(0);
            E.setWrapperTranslate(r);
            E.updateActiveSlide(r);
            if (0 === r || r === -o()) return;
        } else {
            new Date().getTime() - $ > 60 && (n < 0 ? E.swipeNext() : E.swipePrev());
            $ = new Date().getTime();
        }
        t.autoplay && E.stopAutoplay(!0);
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
        return !1;
    }
    function c(e) {
        if (E.allowSlideClick) {
            f(e);
            E.fireCallback(t.onSlideClick, E, e);
        }
    }
    function d(e) {
        f(e);
        E.fireCallback(t.onSlideTouch, E, e);
    }
    function f(e) {
        if (e.currentTarget) E.clickedSlide = e.currentTarget; else {
            var i = e.srcElement;
            do {
                if (i.className.indexOf(t.slideClass) > -1) break;
                i = i.parentNode;
            } while (i);
            E.clickedSlide = i;
        }
        E.clickedSlideIndex = E.slides.indexOf(E.clickedSlide);
        E.clickedSlideLoopIndex = E.clickedSlideIndex - (E.loopedSlides || 0);
    }
    function p(e) {
        if (!E.allowLinks) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            t.preventLinksPropagation && "stopPropagation" in e && e.stopPropagation();
            return !1;
        }
    }
    function h(e) {
        e.stopPropagation ? e.stopPropagation() : e.returnValue = !1;
        return !1;
    }
    function m(e) {
        t.preventLinks && (E.allowLinks = !0);
        if (E.isTouched || t.onlyExternal) return !1;
        var i = e.target || e.srcElement;
        document.activeElement && document.activeElement !== i && document.activeElement.blur();
        var n = "input select textarea".split(" ");
        if (t.noSwiping && i && y(i)) return !1;
        Z = !1;
        E.isTouched = !0;
        K = "touchstart" === e.type;
        if (!K && "which" in e && 3 === e.which) return !1;
        if (!K || 1 === e.targetTouches.length) {
            E.callPlugins("onTouchStartBegin");
            !K && !E.isAndroid && n.indexOf(i.tagName.toLowerCase()) < 0 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
            var o = K ? e.targetTouches[0].pageX : e.pageX || e.clientX, r = K ? e.targetTouches[0].pageY : e.pageY || e.clientY;
            E.touches.startX = E.touches.currentX = o;
            E.touches.startY = E.touches.currentY = r;
            E.touches.start = E.touches.current = F ? o : r;
            E.setWrapperTransition(0);
            E.positions.start = E.positions.current = E.getWrapperTranslate();
            E.setWrapperTranslate(E.positions.start);
            E.times.start = new Date().getTime();
            z = void 0;
            t.moveStartThreshold > 0 && (Y = !1);
            t.onTouchStart && E.fireCallback(t.onTouchStart, E, e);
            E.callPlugins("onTouchStartEnd");
        }
    }
    function v(e) {
        if (E.isTouched && !t.onlyExternal && (!K || "mousemove" !== e.type)) {
            var i = K ? e.targetTouches[0].pageX : e.pageX || e.clientX, n = K ? e.targetTouches[0].pageY : e.pageY || e.clientY;
            "undefined" == typeof z && F && (z = !!(z || Math.abs(n - E.touches.startY) > Math.abs(i - E.touches.startX)));
            "undefined" != typeof z || F || (z = !!(z || Math.abs(n - E.touches.startY) < Math.abs(i - E.touches.startX)));
            if (z) E.isTouched = !1; else {
                if (F) {
                    if (!t.swipeToNext && i < E.touches.startX || !t.swipeToPrev && i > E.touches.startX) return;
                } else if (!t.swipeToNext && n < E.touches.startY || !t.swipeToPrev && n > E.touches.startY) return;
                if (e.assignedToSwiper) E.isTouched = !1; else {
                    e.assignedToSwiper = !0;
                    t.preventLinks && (E.allowLinks = !1);
                    t.onSlideClick && (E.allowSlideClick = !1);
                    t.autoplay && E.stopAutoplay(!0);
                    if (!K || 1 === e.touches.length) {
                        if (!E.isMoved) {
                            E.callPlugins("onTouchMoveStart");
                            if (t.loop) {
                                E.fixLoop();
                                E.positions.start = E.getWrapperTranslate();
                            }
                            t.onTouchMoveStart && E.fireCallback(t.onTouchMoveStart, E);
                        }
                        E.isMoved = !0;
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                        E.touches.current = F ? i : n;
                        E.positions.current = (E.touches.current - E.touches.start) * t.touchRatio + E.positions.start;
                        E.positions.current > 0 && t.onResistanceBefore && E.fireCallback(t.onResistanceBefore, E, E.positions.current);
                        E.positions.current < -o() && t.onResistanceAfter && E.fireCallback(t.onResistanceAfter, E, Math.abs(E.positions.current + o()));
                        if (t.resistance && "100%" !== t.resistance) {
                            var r;
                            if (E.positions.current > 0) {
                                r = 1 - E.positions.current / j / 2;
                                r < .5 ? E.positions.current = j / 2 : E.positions.current = E.positions.current * r;
                            }
                            if (E.positions.current < -o()) {
                                var a = (E.touches.current - E.touches.start) * t.touchRatio + (o() + E.positions.start);
                                r = (j + a) / j;
                                var s = E.positions.current - a * (1 - r) / 2, l = -o() - j / 2;
                                s < l || r <= 0 ? E.positions.current = l : E.positions.current = s;
                            }
                        }
                        if (t.resistance && "100%" === t.resistance) {
                            E.positions.current > 0 && (!t.freeMode || t.freeModeFluid) && (E.positions.current = 0);
                            E.positions.current < -o() && (!t.freeMode || t.freeModeFluid) && (E.positions.current = -o());
                        }
                        if (!t.followFinger) return;
                        if (t.moveStartThreshold) if (Math.abs(E.touches.current - E.touches.start) > t.moveStartThreshold || Y) {
                            if (!Y) {
                                Y = !0;
                                E.touches.start = E.touches.current;
                                return;
                            }
                            E.setWrapperTranslate(E.positions.current);
                        } else E.positions.current = E.positions.start; else E.setWrapperTranslate(E.positions.current);
                        (t.freeMode || t.watchActiveIndex) && E.updateActiveSlide(E.positions.current);
                        if (t.grabCursor) {
                            E.container.style.cursor = "move";
                            E.container.style.cursor = "grabbing";
                            E.container.style.cursor = "-moz-grabbin";
                            E.container.style.cursor = "-webkit-grabbing";
                        }
                        U || (U = E.touches.current);
                        Q || (Q = new Date().getTime());
                        E.velocity = (E.touches.current - U) / (new Date().getTime() - Q) / 2;
                        Math.abs(E.touches.current - U) < 2 && (E.velocity = 0);
                        U = E.touches.current;
                        Q = new Date().getTime();
                        E.callPlugins("onTouchMoveEnd");
                        t.onTouchMove && E.fireCallback(t.onTouchMove, E, e);
                        return !1;
                    }
                }
            }
        }
    }
    function g(e) {
        z && E.swipeReset();
        if (!t.onlyExternal && E.isTouched) {
            E.isTouched = !1;
            if (t.grabCursor) {
                E.container.style.cursor = "move";
                E.container.style.cursor = "grab";
                E.container.style.cursor = "-moz-grab";
                E.container.style.cursor = "-webkit-grab";
            }
            E.positions.current || 0 === E.positions.current || (E.positions.current = E.positions.start);
            t.followFinger && E.setWrapperTranslate(E.positions.current);
            E.times.end = new Date().getTime();
            E.touches.diff = E.touches.current - E.touches.start;
            E.touches.abs = Math.abs(E.touches.diff);
            E.positions.diff = E.positions.current - E.positions.start;
            E.positions.abs = Math.abs(E.positions.diff);
            var i = E.positions.diff, n = E.positions.abs, r = E.times.end - E.times.start;
            if (n < 5 && r < 300 && E.allowLinks === !1) {
                t.freeMode || 0 === n || E.swipeReset();
                t.preventLinks && (E.allowLinks = !0);
                t.onSlideClick && (E.allowSlideClick = !0);
            }
            setTimeout(function() {
                if ("undefined" != typeof E && null !== E) {
                    t.preventLinks && (E.allowLinks = !0);
                    t.onSlideClick && (E.allowSlideClick = !0);
                }
            }, 100);
            var a = o();
            if (E.isMoved || !t.freeMode) if (!E.isMoved || E.positions.current > 0 || E.positions.current < -a) {
                E.swipeReset();
                t.onTouchEnd && E.fireCallback(t.onTouchEnd, E, e);
                E.callPlugins("onTouchEnd");
            } else {
                E.isMoved = !1;
                if (t.freeMode) {
                    if (t.freeModeFluid) {
                        var s, l = 1e3 * t.momentumRatio, u = E.velocity * l, c = E.positions.current + u, d = !1, f = 20 * Math.abs(E.velocity) * t.momentumBounceRatio;
                        if (c < -a) if (t.momentumBounce && E.support.transitions) {
                            c + a < -f && (c = -a - f);
                            s = -a;
                            d = !0;
                            Z = !0;
                        } else c = -a;
                        if (c > 0) if (t.momentumBounce && E.support.transitions) {
                            c > f && (c = f);
                            s = 0;
                            d = !0;
                            Z = !0;
                        } else c = 0;
                        0 !== E.velocity && (l = Math.abs((c - E.positions.current) / E.velocity));
                        E.setWrapperTranslate(c);
                        E.setWrapperTransition(l);
                        t.momentumBounce && d && E.wrapperTransitionEnd(function() {
                            if (Z) {
                                t.onMomentumBounce && E.fireCallback(t.onMomentumBounce, E);
                                E.callPlugins("onMomentumBounce");
                                E.setWrapperTranslate(s);
                                E.setWrapperTransition(300);
                            }
                        });
                        E.updateActiveSlide(c);
                    }
                    (!t.freeModeFluid || r >= 300) && E.updateActiveSlide(E.positions.current);
                    t.onTouchEnd && E.fireCallback(t.onTouchEnd, E, e);
                    E.callPlugins("onTouchEnd");
                } else {
                    P = i < 0 ? "toNext" : "toPrev";
                    "toNext" === P && r <= 300 && (n < 30 || !t.shortSwipes ? E.swipeReset() : E.swipeNext(!0));
                    "toPrev" === P && r <= 300 && (n < 30 || !t.shortSwipes ? E.swipeReset() : E.swipePrev(!0));
                    var p = 0;
                    if ("auto" === t.slidesPerView) {
                        for (var h, m = Math.abs(E.getWrapperTranslate()), v = 0, g = 0; g < E.slides.length; g++) {
                            h = F ? E.slides[g].getWidth(!0, t.roundLengths) : E.slides[g].getHeight(!0, t.roundLengths);
                            v += h;
                            if (v > m) {
                                p = h;
                                break;
                            }
                        }
                        p > j && (p = j);
                    } else p = M * t.slidesPerView;
                    "toNext" === P && r > 300 && (n >= p * t.longSwipesRatio ? E.swipeNext(!0) : E.swipeReset());
                    "toPrev" === P && r > 300 && (n >= p * t.longSwipesRatio ? E.swipePrev(!0) : E.swipeReset());
                    t.onTouchEnd && E.fireCallback(t.onTouchEnd, E, e);
                    E.callPlugins("onTouchEnd");
                }
            } else {
                E.isMoved = !1;
                t.onTouchEnd && E.fireCallback(t.onTouchEnd, E, e);
                E.callPlugins("onTouchEnd");
            }
        }
    }
    function y(e) {
        var i = !1;
        do {
            e.className.indexOf(t.noSwipingClass) > -1 && (i = !0);
            e = e.parentElement;
        } while (!i && e.parentElement && e.className.indexOf(t.wrapperClass) === -1);
        !i && e.className.indexOf(t.wrapperClass) > -1 && e.className.indexOf(t.noSwipingClass) > -1 && (i = !0);
        return i;
    }
    function w(e, t) {
        var i, n = document.createElement("div");
        n.innerHTML = t;
        i = n.firstChild;
        i.className += " " + e;
        return i.outerHTML;
    }
    function b(e, i, n) {
        function o() {
            var r = +new Date(), d = r - a;
            s += l * d / (1e3 / 60);
            c = "toNext" === u ? s > e : s < e;
            if (c) {
                E.setWrapperTranslate(Math.ceil(s));
                E._DOMAnimating = !0;
                window.setTimeout(function() {
                    o();
                }, 1e3 / 60);
            } else {
                t.onSlideChangeEnd && ("to" === i ? n.runCallbacks === !0 && E.fireCallback(t.onSlideChangeEnd, E, u) : E.fireCallback(t.onSlideChangeEnd, E, u));
                E.setWrapperTranslate(e);
                E._DOMAnimating = !1;
            }
        }
        var r = "to" === i && n.speed >= 0 ? n.speed : t.speed, a = +new Date();
        if (E.support.transitions || !t.DOMAnimation) {
            E.setWrapperTranslate(e);
            E.setWrapperTransition(r);
        } else {
            var s = E.getWrapperTranslate(), l = Math.ceil((e - s) / r * (1e3 / 60)), u = s > e ? "toNext" : "toPrev", c = "toNext" === u ? s > e : s < e;
            if (E._DOMAnimating) return;
            o();
        }
        E.updateActiveSlide(e);
        t.onSlideNext && "next" === i && E.fireCallback(t.onSlideNext, E, e);
        t.onSlidePrev && "prev" === i && E.fireCallback(t.onSlidePrev, E, e);
        t.onSlideReset && "reset" === i && E.fireCallback(t.onSlideReset, E, e);
        ("next" === i || "prev" === i || "to" === i && n.runCallbacks === !0) && x(i);
    }
    function x(e) {
        E.callPlugins("onSlideChangeStart");
        if (t.onSlideChangeStart) if (t.queueStartCallbacks && E.support.transitions) {
            if (E._queueStartCallbacks) return;
            E._queueStartCallbacks = !0;
            E.fireCallback(t.onSlideChangeStart, E, e);
            E.wrapperTransitionEnd(function() {
                E._queueStartCallbacks = !1;
            });
        } else E.fireCallback(t.onSlideChangeStart, E, e);
        if (t.onSlideChangeEnd) if (E.support.transitions) if (t.queueEndCallbacks) {
            if (E._queueEndCallbacks) return;
            E._queueEndCallbacks = !0;
            E.wrapperTransitionEnd(function(i) {
                E.fireCallback(t.onSlideChangeEnd, i, e);
            });
        } else E.wrapperTransitionEnd(function(i) {
            E.fireCallback(t.onSlideChangeEnd, i, e);
        }); else t.DOMAnimation || setTimeout(function() {
            E.fireCallback(t.onSlideChangeEnd, E, e);
        }, 10);
    }
    function T() {
        var e = E.paginationButtons;
        if (e) for (var t = 0; t < e.length; t++) E.h.removeEventListener(e[t], "click", C);
    }
    function S() {
        var e = E.paginationButtons;
        if (e) for (var t = 0; t < e.length; t++) E.h.addEventListener(e[t], "click", C);
    }
    function C(e) {
        for (var i, n = e.target || e.srcElement, o = E.paginationButtons, r = 0; r < o.length; r++) n === o[r] && (i = r);
        t.autoplay && E.stopAutoplay(!0);
        E.swipeTo(i);
    }
    function k() {
        J = setTimeout(function() {
            if (t.loop) {
                E.fixLoop();
                E.swipeNext(!0);
            } else if (!E.swipeNext(!0)) if (t.autoplayStopOnLast) {
                clearTimeout(J);
                J = void 0;
            } else E.swipeTo(0);
            E.wrapperTransitionEnd(function() {
                "undefined" != typeof J && k();
            });
        }, t.autoplay);
    }
    function A() {
        E.calcSlides();
        t.loader.slides.length > 0 && 0 === E.slides.length && E.loadSlides();
        t.loop && E.createLoop();
        E.init();
        r();
        t.pagination && E.createPagination(!0);
        t.loop || t.initialSlide > 0 ? E.swipeTo(t.initialSlide, 0, !1) : E.updateActiveSlide(0);
        t.autoplay && E.startAutoplay();
        E.centerIndex = E.activeIndex;
        t.onSwiperCreated && E.fireCallback(t.onSwiperCreated, E);
        E.callPlugins("onSwiperCreated");
    }
    if (!document.body.outerHTML && document.body.__defineGetter__ && HTMLElement) {
        var L = HTMLElement.prototype;
        L.__defineGetter__ && L.__defineGetter__("outerHTML", function() {
            return new XMLSerializer().serializeToString(this);
        });
    }
    window.getComputedStyle || (window.getComputedStyle = function(e, t) {
        this.el = e;
        this.getPropertyValue = function(t) {
            var i = /(\-([a-z]){1})/g;
            "float" === t && (t = "styleFloat");
            i.test(t) && (t = t.replace(i, function() {
                return arguments[2].toUpperCase();
            }));
            return e.currentStyle[t] ? e.currentStyle[t] : null;
        };
        return this;
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        for (var i = t || 0, n = this.length; i < n; i++) if (this[i] === e) return i;
        return -1;
    });
    if ((document.querySelectorAll || window.jQuery) && "undefined" != typeof e && (e.nodeType || 0 !== i(e).length)) {
        var E = this;
        E.touches = {
            start: 0,
            startX: 0,
            startY: 0,
            current: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
            abs: 0
        };
        E.positions = {
            start: 0,
            abs: 0,
            diff: 0,
            current: 0
        };
        E.times = {
            start: 0,
            end: 0
        };
        E.id = new Date().getTime();
        E.container = e.nodeType ? e : i(e)[0];
        E.isTouched = !1;
        E.isMoved = !1;
        E.activeIndex = 0;
        E.centerIndex = 0;
        E.activeLoaderIndex = 0;
        E.activeLoopIndex = 0;
        E.previousIndex = null;
        E.velocity = 0;
        E.snapGrid = [];
        E.slidesGrid = [];
        E.imagesToLoad = [];
        E.imagesLoaded = 0;
        E.wrapperLeft = 0;
        E.wrapperRight = 0;
        E.wrapperTop = 0;
        E.wrapperBottom = 0;
        E.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") >= 0;
        var _, M, I, P, z, j, D = {
            eventTarget: "wrapper",
            mode: "horizontal",
            touchRatio: 1,
            speed: 300,
            freeMode: !1,
            freeModeFluid: !1,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerViewFit: !0,
            simulateTouch: !0,
            followFinger: !0,
            shortSwipes: !0,
            longSwipesRatio: .5,
            moveStartThreshold: !1,
            onlyExternal: !1,
            createPagination: !0,
            pagination: !1,
            paginationElement: "span",
            paginationClickable: !1,
            paginationAsRange: !0,
            resistance: !0,
            scrollContainer: !1,
            preventLinks: !0,
            preventLinksPropagation: !1,
            noSwiping: !1,
            noSwipingClass: "swiper-no-swiping",
            initialSlide: 0,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelControlForceToAxis: !1,
            useCSS3Transforms: !0,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            loop: !1,
            loopAdditionalSlides: 0,
            roundLengths: !1,
            calculateHeight: !1,
            cssWidthAndHeight: !1,
            updateOnImagesReady: !0,
            releaseFormElements: !0,
            watchActiveIndex: !1,
            visibilityFullFit: !1,
            offsetPxBefore: 0,
            offsetPxAfter: 0,
            offsetSlidesBefore: 0,
            offsetSlidesAfter: 0,
            centeredSlides: !1,
            queueStartCallbacks: !1,
            queueEndCallbacks: !1,
            autoResize: !0,
            resizeReInit: !1,
            DOMAnimation: !0,
            loader: {
                slides: [],
                slidesHTMLType: "inner",
                surroundGroups: 1,
                logic: "reload",
                loadAllSlides: !1
            },
            swipeToPrev: !0,
            swipeToNext: !0,
            slideElement: "div",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            wrapperClass: "swiper-wrapper",
            paginationElementClass: "swiper-pagination-switch",
            paginationActiveClass: "swiper-active-switch",
            paginationVisibleClass: "swiper-visible-switch"
        };
        t = t || {};
        for (var W in D) if (W in t && "object" == typeof t[W]) for (var N in D[W]) N in t[W] || (t[W][N] = D[W][N]); else W in t || (t[W] = D[W]);
        E.params = t;
        if (t.scrollContainer) {
            t.freeMode = !0;
            t.freeModeFluid = !0;
        }
        t.loop && (t.resistance = "100%");
        var F = "horizontal" === t.mode, O = [ "mousedown", "mousemove", "mouseup" ];
        E.browser.ie10 && (O = [ "MSPointerDown", "MSPointerMove", "MSPointerUp" ]);
        E.browser.ie11 && (O = [ "pointerdown", "pointermove", "pointerup" ]);
        E.touchEvents = {
            touchStart: E.support.touch || !t.simulateTouch ? "touchstart" : O[0],
            touchMove: E.support.touch || !t.simulateTouch ? "touchmove" : O[1],
            touchEnd: E.support.touch || !t.simulateTouch ? "touchend" : O[2]
        };
        for (var R = E.container.childNodes.length - 1; R >= 0; R--) if (E.container.childNodes[R].className) for (var q = E.container.childNodes[R].className.split(/\s+/), H = 0; H < q.length; H++) q[H] === t.wrapperClass && (_ = E.container.childNodes[R]);
        E.wrapper = _;
        E._extendSwiperSlide = function(e) {
            e.append = function() {
                if (t.loop) e.insertAfter(E.slides.length - E.loopedSlides); else {
                    E.wrapper.appendChild(e);
                    E.reInit();
                }
                return e;
            };
            e.prepend = function() {
                if (t.loop) {
                    E.wrapper.insertBefore(e, E.slides[E.loopedSlides]);
                    E.removeLoopedSlides();
                    E.calcSlides();
                    E.createLoop();
                } else E.wrapper.insertBefore(e, E.wrapper.firstChild);
                E.reInit();
                return e;
            };
            e.insertAfter = function(i) {
                if ("undefined" == typeof i) return !1;
                var n;
                if (t.loop) {
                    n = E.slides[i + 1 + E.loopedSlides];
                    n ? E.wrapper.insertBefore(e, n) : E.wrapper.appendChild(e);
                    E.removeLoopedSlides();
                    E.calcSlides();
                    E.createLoop();
                } else {
                    n = E.slides[i + 1];
                    E.wrapper.insertBefore(e, n);
                }
                E.reInit();
                return e;
            };
            e.clone = function() {
                return E._extendSwiperSlide(e.cloneNode(!0));
            };
            e.remove = function() {
                E.wrapper.removeChild(e);
                E.reInit();
            };
            e.html = function(t) {
                if ("undefined" == typeof t) return e.innerHTML;
                e.innerHTML = t;
                return e;
            };
            e.index = function() {
                for (var t, i = E.slides.length - 1; i >= 0; i--) e === E.slides[i] && (t = i);
                return t;
            };
            e.isActive = function() {
                return e.index() === E.activeIndex;
            };
            e.swiperSlideDataStorage || (e.swiperSlideDataStorage = {});
            e.getData = function(t) {
                return e.swiperSlideDataStorage[t];
            };
            e.setData = function(t, i) {
                e.swiperSlideDataStorage[t] = i;
                return e;
            };
            e.data = function(t, i) {
                if ("undefined" == typeof i) return e.getAttribute("data-" + t);
                e.setAttribute("data-" + t, i);
                return e;
            };
            e.getWidth = function(t, i) {
                return E.h.getWidth(e, t, i);
            };
            e.getHeight = function(t, i) {
                return E.h.getHeight(e, t, i);
            };
            e.getOffset = function() {
                return E.h.getOffset(e);
            };
            return e;
        };
        E.calcSlides = function(e) {
            var i = !!E.slides && E.slides.length;
            E.slides = [];
            E.displaySlides = [];
            for (var n = 0; n < E.wrapper.childNodes.length; n++) if (E.wrapper.childNodes[n].className) for (var o = E.wrapper.childNodes[n].className, r = o.split(/\s+/), l = 0; l < r.length; l++) r[l] === t.slideClass && E.slides.push(E.wrapper.childNodes[n]);
            for (n = E.slides.length - 1; n >= 0; n--) E._extendSwiperSlide(E.slides[n]);
            if (i !== !1 && (i !== E.slides.length || e)) {
                s();
                a();
                E.updateActiveSlide();
                E.params.pagination && E.createPagination();
                E.callPlugins("numberOfSlidesChanged");
            }
        };
        E.createSlide = function(e, i, n) {
            i = i || E.params.slideClass;
            n = n || t.slideElement;
            var o = document.createElement(n);
            o.innerHTML = e || "";
            o.className = i;
            return E._extendSwiperSlide(o);
        };
        E.appendSlide = function(e, t, i) {
            if (e) return e.nodeType ? E._extendSwiperSlide(e).append() : E.createSlide(e, t, i).append();
        };
        E.prependSlide = function(e, t, i) {
            if (e) return e.nodeType ? E._extendSwiperSlide(e).prepend() : E.createSlide(e, t, i).prepend();
        };
        E.insertSlideAfter = function(e, t, i, n) {
            return "undefined" != typeof e && (t.nodeType ? E._extendSwiperSlide(t).insertAfter(e) : E.createSlide(t, i, n).insertAfter(e));
        };
        E.removeSlide = function(e) {
            if (E.slides[e]) {
                if (t.loop) {
                    if (!E.slides[e + E.loopedSlides]) return !1;
                    E.slides[e + E.loopedSlides].remove();
                    E.removeLoopedSlides();
                    E.calcSlides();
                    E.createLoop();
                } else E.slides[e].remove();
                return !0;
            }
            return !1;
        };
        E.removeLastSlide = function() {
            if (E.slides.length > 0) {
                if (t.loop) {
                    E.slides[E.slides.length - 1 - E.loopedSlides].remove();
                    E.removeLoopedSlides();
                    E.calcSlides();
                    E.createLoop();
                } else E.slides[E.slides.length - 1].remove();
                return !0;
            }
            return !1;
        };
        E.removeAllSlides = function() {
            for (var e = E.slides.length - 1; e >= 0; e--) E.slides[e].remove();
        };
        E.getSlide = function(e) {
            return E.slides[e];
        };
        E.getLastSlide = function() {
            return E.slides[E.slides.length - 1];
        };
        E.getFirstSlide = function() {
            return E.slides[0];
        };
        E.activeSlide = function() {
            return E.slides[E.activeIndex];
        };
        E.fireCallback = function() {
            var e = arguments[0];
            if ("[object Array]" === Object.prototype.toString.call(e)) for (var i = 0; i < e.length; i++) "function" == typeof e[i] && e[i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]); else "[object String]" === Object.prototype.toString.call(e) ? t["on" + e] && E.fireCallback(t["on" + e], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) : e(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        E.addCallback = function(e, t) {
            var i, o = this;
            if (!o.params["on" + e]) {
                this.params["on" + e] = [];
                return this.params["on" + e].push(t);
            }
            if (n(this.params["on" + e])) return this.params["on" + e].push(t);
            if ("function" == typeof this.params["on" + e]) {
                i = this.params["on" + e];
                this.params["on" + e] = [];
                this.params["on" + e].push(i);
                return this.params["on" + e].push(t);
            }
        };
        E.removeCallbacks = function(e) {
            E.params["on" + e] && (E.params["on" + e] = null);
        };
        var B = [];
        for (var G in E.plugins) if (t[G]) {
            var V = E.plugins[G](E, t[G]);
            V && B.push(V);
        }
        E.callPlugins = function(e, t) {
            t || (t = {});
            for (var i = 0; i < B.length; i++) e in B[i] && B[i][e](t);
        };
        !E.browser.ie10 && !E.browser.ie11 || t.onlyExternal || E.wrapper.classList.add("swiper-wp8-" + (F ? "horizontal" : "vertical"));
        t.freeMode && (E.container.className += " swiper-free-mode");
        E.initialized = !1;
        E.init = function(e, i) {
            var n = E.h.getWidth(E.container, !1, t.roundLengths), o = E.h.getHeight(E.container, !1, t.roundLengths);
            if (n !== E.width || o !== E.height || e) {
                E.width = n;
                E.height = o;
                var r, a, s, l, u, c, d;
                j = F ? n : o;
                var f = E.wrapper;
                e && E.calcSlides(i);
                if ("auto" === t.slidesPerView) {
                    var p = 0, h = 0;
                    if (t.slidesOffset > 0) {
                        f.style.paddingLeft = "";
                        f.style.paddingRight = "";
                        f.style.paddingTop = "";
                        f.style.paddingBottom = "";
                    }
                    f.style.width = "";
                    f.style.height = "";
                    t.offsetPxBefore > 0 && (F ? E.wrapperLeft = t.offsetPxBefore : E.wrapperTop = t.offsetPxBefore);
                    t.offsetPxAfter > 0 && (F ? E.wrapperRight = t.offsetPxAfter : E.wrapperBottom = t.offsetPxAfter);
                    if (t.centeredSlides) if (F) {
                        E.wrapperLeft = (j - this.slides[0].getWidth(!0, t.roundLengths)) / 2;
                        E.wrapperRight = (j - E.slides[E.slides.length - 1].getWidth(!0, t.roundLengths)) / 2;
                    } else {
                        E.wrapperTop = (j - E.slides[0].getHeight(!0, t.roundLengths)) / 2;
                        E.wrapperBottom = (j - E.slides[E.slides.length - 1].getHeight(!0, t.roundLengths)) / 2;
                    }
                    if (F) {
                        E.wrapperLeft >= 0 && (f.style.paddingLeft = E.wrapperLeft + "px");
                        E.wrapperRight >= 0 && (f.style.paddingRight = E.wrapperRight + "px");
                    } else {
                        E.wrapperTop >= 0 && (f.style.paddingTop = E.wrapperTop + "px");
                        E.wrapperBottom >= 0 && (f.style.paddingBottom = E.wrapperBottom + "px");
                    }
                    c = 0;
                    var m = 0;
                    E.snapGrid = [];
                    E.slidesGrid = [];
                    s = 0;
                    for (d = 0; d < E.slides.length; d++) {
                        r = E.slides[d].getWidth(!0, t.roundLengths);
                        a = E.slides[d].getHeight(!0, t.roundLengths);
                        t.calculateHeight && (s = Math.max(s, a));
                        var v = F ? r : a;
                        if (t.centeredSlides) {
                            var g = d === E.slides.length - 1 ? 0 : E.slides[d + 1].getWidth(!0, t.roundLengths), y = d === E.slides.length - 1 ? 0 : E.slides[d + 1].getHeight(!0, t.roundLengths), w = F ? g : y;
                            if (v > j) {
                                if (t.slidesPerViewFit) {
                                    E.snapGrid.push(c + E.wrapperLeft);
                                    E.snapGrid.push(c + v - j + E.wrapperLeft);
                                } else for (var b = 0; b <= Math.floor(v / (j + E.wrapperLeft)); b++) 0 === b ? E.snapGrid.push(c + E.wrapperLeft) : E.snapGrid.push(c + E.wrapperLeft + j * b);
                                E.slidesGrid.push(c + E.wrapperLeft);
                            } else {
                                E.snapGrid.push(m);
                                E.slidesGrid.push(m);
                            }
                            m += v / 2 + w / 2;
                        } else {
                            if (v > j) if (t.slidesPerViewFit) {
                                E.snapGrid.push(c);
                                E.snapGrid.push(c + v - j);
                            } else if (0 !== j) for (var x = 0; x <= Math.floor(v / j); x++) E.snapGrid.push(c + j * x); else E.snapGrid.push(c); else E.snapGrid.push(c);
                            E.slidesGrid.push(c);
                        }
                        c += v;
                        p += r;
                        h += a;
                    }
                    t.calculateHeight && (E.height = s);
                    if (F) {
                        I = p + E.wrapperRight + E.wrapperLeft;
                        f.style.width = p + "px";
                        f.style.height = E.height + "px";
                    } else {
                        I = h + E.wrapperTop + E.wrapperBottom;
                        f.style.width = E.width + "px";
                        f.style.height = h + "px";
                    }
                } else if (t.scrollContainer) {
                    f.style.width = "";
                    f.style.height = "";
                    l = E.slides[0].getWidth(!0, t.roundLengths);
                    u = E.slides[0].getHeight(!0, t.roundLengths);
                    I = F ? l : u;
                    f.style.width = l + "px";
                    f.style.height = u + "px";
                    M = F ? l : u;
                } else {
                    if (t.calculateHeight) {
                        s = 0;
                        u = 0;
                        F || (E.container.style.height = "");
                        f.style.height = "";
                        for (d = 0; d < E.slides.length; d++) {
                            E.slides[d].style.height = "";
                            s = Math.max(E.slides[d].getHeight(!0), s);
                            F || (u += E.slides[d].getHeight(!0));
                        }
                        a = s;
                        E.height = a;
                        if (F) u = a; else {
                            j = a;
                            E.container.style.height = j + "px";
                        }
                    } else {
                        a = F ? E.height : E.height / t.slidesPerView;
                        t.roundLengths && (a = Math.ceil(a));
                        u = F ? E.height : E.slides.length * a;
                    }
                    r = F ? E.width / t.slidesPerView : E.width;
                    t.roundLengths && (r = Math.ceil(r));
                    l = F ? E.slides.length * r : E.width;
                    M = F ? r : a;
                    t.offsetSlidesBefore > 0 && (F ? E.wrapperLeft = M * t.offsetSlidesBefore : E.wrapperTop = M * t.offsetSlidesBefore);
                    t.offsetSlidesAfter > 0 && (F ? E.wrapperRight = M * t.offsetSlidesAfter : E.wrapperBottom = M * t.offsetSlidesAfter);
                    t.offsetPxBefore > 0 && (F ? E.wrapperLeft = t.offsetPxBefore : E.wrapperTop = t.offsetPxBefore);
                    t.offsetPxAfter > 0 && (F ? E.wrapperRight = t.offsetPxAfter : E.wrapperBottom = t.offsetPxAfter);
                    if (t.centeredSlides) if (F) {
                        E.wrapperLeft = (j - M) / 2;
                        E.wrapperRight = (j - M) / 2;
                    } else {
                        E.wrapperTop = (j - M) / 2;
                        E.wrapperBottom = (j - M) / 2;
                    }
                    if (F) {
                        E.wrapperLeft > 0 && (f.style.paddingLeft = E.wrapperLeft + "px");
                        E.wrapperRight > 0 && (f.style.paddingRight = E.wrapperRight + "px");
                    } else {
                        E.wrapperTop > 0 && (f.style.paddingTop = E.wrapperTop + "px");
                        E.wrapperBottom > 0 && (f.style.paddingBottom = E.wrapperBottom + "px");
                    }
                    I = F ? l + E.wrapperRight + E.wrapperLeft : u + E.wrapperTop + E.wrapperBottom;
                    parseFloat(l) > 0 && (!t.cssWidthAndHeight || "height" === t.cssWidthAndHeight) && (f.style.width = l + "px");
                    parseFloat(u) > 0 && (!t.cssWidthAndHeight || "width" === t.cssWidthAndHeight) && (f.style.height = u + "px");
                    c = 0;
                    E.snapGrid = [];
                    E.slidesGrid = [];
                    for (d = 0; d < E.slides.length; d++) {
                        E.snapGrid.push(c);
                        E.slidesGrid.push(c);
                        c += M;
                        parseFloat(r) > 0 && (!t.cssWidthAndHeight || "height" === t.cssWidthAndHeight) && (E.slides[d].style.width = r + "px");
                        parseFloat(a) > 0 && (!t.cssWidthAndHeight || "width" === t.cssWidthAndHeight) && (E.slides[d].style.height = a + "px");
                    }
                }
                if (E.initialized) {
                    E.callPlugins("onInit");
                    t.onInit && E.fireCallback(t.onInit, E);
                } else {
                    E.callPlugins("onFirstInit");
                    t.onFirstInit && E.fireCallback(t.onFirstInit, E);
                }
                E.initialized = !0;
            }
        };
        E.reInit = function(e) {
            E.init(!0, e);
        };
        E.resizeFix = function(e) {
            E.callPlugins("beforeResizeFix");
            E.init(t.resizeReInit || e);
            if (t.freeMode) {
                if (E.getWrapperTranslate() < -o()) {
                    E.setWrapperTransition(0);
                    E.setWrapperTranslate(-o());
                }
            } else {
                E.swipeTo(t.loop ? E.activeLoopIndex : E.activeIndex, 0, !1);
                if (t.autoplay) if (E.support.transitions && "undefined" != typeof J) {
                    if ("undefined" != typeof J) {
                        clearTimeout(J);
                        J = void 0;
                        E.startAutoplay();
                    }
                } else if ("undefined" != typeof ee) {
                    clearInterval(ee);
                    ee = void 0;
                    E.startAutoplay();
                }
            }
            E.callPlugins("afterResizeFix");
        };
        E.destroy = function() {
            var e = E.h.removeEventListener, i = "wrapper" === t.eventTarget ? E.wrapper : E.container;
            if (E.browser.ie10 || E.browser.ie11) {
                e(i, E.touchEvents.touchStart, m);
                e(document, E.touchEvents.touchMove, v);
                e(document, E.touchEvents.touchEnd, g);
            } else {
                if (E.support.touch) {
                    e(i, "touchstart", m);
                    e(i, "touchmove", v);
                    e(i, "touchend", g);
                }
                if (t.simulateTouch) {
                    e(i, "mousedown", m);
                    e(document, "mousemove", v);
                    e(document, "mouseup", g);
                }
            }
            t.autoResize && e(window, "resize", E.resizeFix);
            s();
            t.paginationClickable && T();
            t.mousewheelControl && E._wheelEvent && e(E.container, E._wheelEvent, u);
            t.keyboardControl && e(document, "keydown", l);
            t.autoplay && E.stopAutoplay();
            E.callPlugins("onDestroy");
            E = null;
        };
        E.disableKeyboardControl = function() {
            t.keyboardControl = !1;
            E.h.removeEventListener(document, "keydown", l);
        };
        E.enableKeyboardControl = function() {
            t.keyboardControl = !0;
            E.h.addEventListener(document, "keydown", l);
        };
        var $ = new Date().getTime();
        E.disableMousewheelControl = function() {
            if (!E._wheelEvent) return !1;
            t.mousewheelControl = !1;
            E.h.removeEventListener(E.container, E._wheelEvent, u);
            return !0;
        };
        E.enableMousewheelControl = function() {
            if (!E._wheelEvent) return !1;
            t.mousewheelControl = !0;
            E.h.addEventListener(E.container, E._wheelEvent, u);
            return !0;
        };
        if (t.grabCursor) {
            var X = E.container.style;
            X.cursor = "move";
            X.cursor = "grab";
            X.cursor = "-moz-grab";
            X.cursor = "-webkit-grab";
        }
        E.allowSlideClick = !0;
        E.allowLinks = !0;
        var Y, U, Q, K = !1, Z = !0;
        E.swipeNext = function(e) {
            !e && t.loop && E.fixLoop();
            !e && t.autoplay && E.stopAutoplay(!0);
            E.callPlugins("onSwipeNext");
            var i = E.getWrapperTranslate(), n = i;
            if ("auto" === t.slidesPerView) {
                for (var r = 0; r < E.snapGrid.length; r++) if (-i >= E.snapGrid[r] && -i < E.snapGrid[r + 1]) {
                    n = -E.snapGrid[r + 1];
                    break;
                }
            } else {
                var a = M * t.slidesPerGroup;
                n = -(Math.floor(Math.abs(i) / Math.floor(a)) * a + a);
            }
            n < -o() && (n = -o());
            if (n === i) return !1;
            b(n, "next");
            return !0;
        };
        E.swipePrev = function(e) {
            !e && t.loop && E.fixLoop();
            !e && t.autoplay && E.stopAutoplay(!0);
            E.callPlugins("onSwipePrev");
            var i, n = Math.ceil(E.getWrapperTranslate());
            if ("auto" === t.slidesPerView) {
                i = 0;
                for (var o = 1; o < E.snapGrid.length; o++) {
                    if (-n === E.snapGrid[o]) {
                        i = -E.snapGrid[o - 1];
                        break;
                    }
                    if (-n > E.snapGrid[o] && -n < E.snapGrid[o + 1]) {
                        i = -E.snapGrid[o];
                        break;
                    }
                }
            } else {
                var r = M * t.slidesPerGroup;
                i = -(Math.ceil(-n / r) - 1) * r;
            }
            i > 0 && (i = 0);
            if (i === n) return !1;
            b(i, "prev");
            return !0;
        };
        E.swipeReset = function() {
            E.callPlugins("onSwipeReset");
            var e, i = E.getWrapperTranslate(), n = M * t.slidesPerGroup;
            -o();
            if ("auto" === t.slidesPerView) {
                e = 0;
                for (var r = 0; r < E.snapGrid.length; r++) {
                    if (-i === E.snapGrid[r]) return;
                    if (-i >= E.snapGrid[r] && -i < E.snapGrid[r + 1]) {
                        e = E.positions.diff > 0 ? -E.snapGrid[r + 1] : -E.snapGrid[r];
                        break;
                    }
                }
                -i >= E.snapGrid[E.snapGrid.length - 1] && (e = -E.snapGrid[E.snapGrid.length - 1]);
                i <= -o() && (e = -o());
            } else {
                e = i < 0 ? Math.round(i / n) * n : 0;
                i <= -o() && (e = -o());
            }
            t.scrollContainer && (e = i < 0 ? i : 0);
            e < -o() && (e = -o());
            t.scrollContainer && j > M && (e = 0);
            if (e === i) return !1;
            b(e, "reset");
            return !0;
        };
        E.swipeTo = function(e, i, n) {
            e = parseInt(e, 10);
            E.callPlugins("onSwipeTo", {
                index: e,
                speed: i
            });
            t.loop && (e += E.loopedSlides);
            var r = E.getWrapperTranslate();
            if (!(e > E.slides.length - 1 || e < 0)) {
                var a;
                a = "auto" === t.slidesPerView ? -E.slidesGrid[e] : -e * M;
                a < -o() && (a = -o());
                if (a === r) return !1;
                n = n !== !1;
                b(a, "to", {
                    index: e,
                    speed: i,
                    runCallbacks: n
                });
                return !0;
            }
        };
        E._queueStartCallbacks = !1;
        E._queueEndCallbacks = !1;
        E.updateActiveSlide = function(e) {
            if (E.initialized && 0 !== E.slides.length) {
                E.previousIndex = E.activeIndex;
                "undefined" == typeof e && (e = E.getWrapperTranslate());
                e > 0 && (e = 0);
                var i;
                if ("auto" === t.slidesPerView) {
                    E.activeIndex = E.slidesGrid.indexOf(-e);
                    if (E.activeIndex < 0) {
                        for (i = 0; i < E.slidesGrid.length - 1 && !(-e > E.slidesGrid[i] && -e < E.slidesGrid[i + 1]); i++) ;
                        var n = Math.abs(E.slidesGrid[i] + e), o = Math.abs(E.slidesGrid[i + 1] + e);
                        n <= o ? E.activeIndex = i : E.activeIndex = i + 1;
                    }
                } else E.activeIndex = Math[t.visibilityFullFit ? "ceil" : "round"](-e / M);
                E.activeIndex === E.slides.length && (E.activeIndex = E.slides.length - 1);
                E.activeIndex < 0 && (E.activeIndex = 0);
                if (E.slides[E.activeIndex]) {
                    E.calcVisibleSlides(e);
                    if (E.support.classList) {
                        var r;
                        for (i = 0; i < E.slides.length; i++) {
                            r = E.slides[i];
                            r.classList.remove(t.slideActiveClass);
                            E.visibleSlides.indexOf(r) >= 0 ? r.classList.add(t.slideVisibleClass) : r.classList.remove(t.slideVisibleClass);
                        }
                        E.slides[E.activeIndex].classList.add(t.slideActiveClass);
                    } else {
                        var a = new RegExp("\\s*" + t.slideActiveClass), s = new RegExp("\\s*" + t.slideVisibleClass);
                        for (i = 0; i < E.slides.length; i++) {
                            E.slides[i].className = E.slides[i].className.replace(a, "").replace(s, "");
                            E.visibleSlides.indexOf(E.slides[i]) >= 0 && (E.slides[i].className += " " + t.slideVisibleClass);
                        }
                        E.slides[E.activeIndex].className += " " + t.slideActiveClass;
                    }
                    if (t.loop) {
                        var l = E.loopedSlides;
                        E.activeLoopIndex = E.activeIndex - l;
                        E.activeLoopIndex >= E.slides.length - 2 * l && (E.activeLoopIndex = E.slides.length - 2 * l - E.activeLoopIndex);
                        E.activeLoopIndex < 0 && (E.activeLoopIndex = E.slides.length - 2 * l + E.activeLoopIndex);
                        E.activeLoopIndex < 0 && (E.activeLoopIndex = 0);
                    } else E.activeLoopIndex = E.activeIndex;
                    t.pagination && E.updatePagination(e);
                }
            }
        };
        E.createPagination = function(e) {
            t.paginationClickable && E.paginationButtons && T();
            E.paginationContainer = t.pagination.nodeType ? t.pagination : i(t.pagination)[0];
            if (t.createPagination) {
                var n = "", o = E.slides.length, r = o;
                t.loop && (r -= 2 * E.loopedSlides);
                for (var a = 0; a < r; a++) n += "<" + t.paginationElement + ' class="' + t.paginationElementClass + '"></' + t.paginationElement + ">";
                E.paginationContainer.innerHTML = n;
            }
            E.paginationButtons = i("." + t.paginationElementClass, E.paginationContainer);
            e || E.updatePagination();
            E.callPlugins("onCreatePagination");
            t.paginationClickable && S();
        };
        E.updatePagination = function(e) {
            if (t.pagination && !(E.slides.length < 1)) {
                var n = i("." + t.paginationActiveClass, E.paginationContainer);
                if (n) {
                    var o = E.paginationButtons;
                    if (0 !== o.length) {
                        for (var r = 0; r < o.length; r++) o[r].className = t.paginationElementClass;
                        var a = t.loop ? E.loopedSlides : 0;
                        if (t.paginationAsRange) {
                            E.visibleSlides || E.calcVisibleSlides(e);
                            var s, l = [];
                            for (s = 0; s < E.visibleSlides.length; s++) {
                                var u = E.slides.indexOf(E.visibleSlides[s]) - a;
                                t.loop && u < 0 && (u = E.slides.length - 2 * E.loopedSlides + u);
                                if (t.loop && u >= E.slides.length - 2 * E.loopedSlides) {
                                    u = E.slides.length - 2 * E.loopedSlides - u;
                                    u = Math.abs(u);
                                }
                                l.push(u);
                            }
                            for (s = 0; s < l.length; s++) o[l[s]] && (o[l[s]].className += " " + t.paginationVisibleClass);
                            t.loop ? void 0 !== o[E.activeLoopIndex] && (o[E.activeLoopIndex].className += " " + t.paginationActiveClass) : o[E.activeIndex].className += " " + t.paginationActiveClass;
                        } else t.loop ? o[E.activeLoopIndex] && (o[E.activeLoopIndex].className += " " + t.paginationActiveClass + " " + t.paginationVisibleClass) : o[E.activeIndex].className += " " + t.paginationActiveClass + " " + t.paginationVisibleClass;
                    }
                }
            }
        };
        E.calcVisibleSlides = function(e) {
            var i = [], n = 0, o = 0, r = 0;
            F && E.wrapperLeft > 0 && (e += E.wrapperLeft);
            !F && E.wrapperTop > 0 && (e += E.wrapperTop);
            for (var a = 0; a < E.slides.length; a++) {
                n += o;
                o = "auto" === t.slidesPerView ? F ? E.h.getWidth(E.slides[a], !0, t.roundLengths) : E.h.getHeight(E.slides[a], !0, t.roundLengths) : M;
                r = n + o;
                var s = !1;
                if (t.visibilityFullFit) {
                    n >= -e && r <= -e + j && (s = !0);
                    n <= -e && r >= -e + j && (s = !0);
                } else {
                    r > -e && r <= -e + j && (s = !0);
                    n >= -e && n < -e + j && (s = !0);
                    n < -e && r > -e + j && (s = !0);
                }
                s && i.push(E.slides[a]);
            }
            0 === i.length && (i = [ E.slides[E.activeIndex] ]);
            E.visibleSlides = i;
        };
        var J, ee;
        E.startAutoplay = function() {
            if (E.support.transitions) {
                if ("undefined" != typeof J) return !1;
                if (!t.autoplay) return;
                E.callPlugins("onAutoplayStart");
                t.onAutoplayStart && E.fireCallback(t.onAutoplayStart, E);
                k();
            } else {
                if ("undefined" != typeof ee) return !1;
                if (!t.autoplay) return;
                E.callPlugins("onAutoplayStart");
                t.onAutoplayStart && E.fireCallback(t.onAutoplayStart, E);
                ee = setInterval(function() {
                    if (t.loop) {
                        E.fixLoop();
                        E.swipeNext(!0);
                    } else if (!E.swipeNext(!0)) if (t.autoplayStopOnLast) {
                        clearInterval(ee);
                        ee = void 0;
                    } else E.swipeTo(0);
                }, t.autoplay);
            }
        };
        E.stopAutoplay = function(e) {
            if (E.support.transitions) {
                if (!J) return;
                J && clearTimeout(J);
                J = void 0;
                e && !t.autoplayDisableOnInteraction && E.wrapperTransitionEnd(function() {
                    k();
                });
                E.callPlugins("onAutoplayStop");
                t.onAutoplayStop && E.fireCallback(t.onAutoplayStop, E);
            } else {
                ee && clearInterval(ee);
                ee = void 0;
                E.callPlugins("onAutoplayStop");
                t.onAutoplayStop && E.fireCallback(t.onAutoplayStop, E);
            }
        };
        E.loopCreated = !1;
        E.removeLoopedSlides = function() {
            if (E.loopCreated) for (var e = 0; e < E.slides.length; e++) E.slides[e].getData("looped") === !0 && E.wrapper.removeChild(E.slides[e]);
        };
        E.createLoop = function() {
            if (0 !== E.slides.length) {
                "auto" === t.slidesPerView ? E.loopedSlides = t.loopedSlides || 1 : E.loopedSlides = t.slidesPerView + t.loopAdditionalSlides;
                E.loopedSlides > E.slides.length && (E.loopedSlides = E.slides.length);
                var e, i = "", n = "", o = "", r = E.slides.length, a = Math.floor(E.loopedSlides / r), s = E.loopedSlides % r;
                for (e = 0; e < a * r; e++) {
                    var l = e;
                    if (e >= r) {
                        var u = Math.floor(e / r);
                        l = e - r * u;
                    }
                    o += E.slides[l].outerHTML;
                }
                for (e = 0; e < s; e++) n += w(t.slideDuplicateClass, E.slides[e].outerHTML);
                for (e = r - s; e < r; e++) i += w(t.slideDuplicateClass, E.slides[e].outerHTML);
                var c = i + o + _.innerHTML + o + n;
                _.innerHTML = c;
                E.loopCreated = !0;
                E.calcSlides();
                for (e = 0; e < E.slides.length; e++) (e < E.loopedSlides || e >= E.slides.length - E.loopedSlides) && E.slides[e].setData("looped", !0);
                E.callPlugins("onCreateLoop");
            }
        };
        E.fixLoop = function() {
            var e;
            if (E.activeIndex < E.loopedSlides) {
                e = E.slides.length - 3 * E.loopedSlides + E.activeIndex;
                E.swipeTo(e, 0, !1);
            } else if ("auto" === t.slidesPerView && E.activeIndex >= 2 * E.loopedSlides || E.activeIndex > E.slides.length - 2 * t.slidesPerView) {
                e = -E.slides.length + E.activeIndex + E.loopedSlides;
                E.swipeTo(e, 0, !1);
            }
        };
        E.loadSlides = function() {
            var e = "";
            E.activeLoaderIndex = 0;
            for (var i = t.loader.slides, n = t.loader.loadAllSlides ? i.length : t.slidesPerView * (1 + t.loader.surroundGroups), o = 0; o < n; o++) e += "outer" === t.loader.slidesHTMLType ? i[o] : "<" + t.slideElement + ' class="' + t.slideClass + '" data-swiperindex="' + o + '">' + i[o] + "</" + t.slideElement + ">";
            E.wrapper.innerHTML = e;
            E.calcSlides(!0);
            t.loader.loadAllSlides || E.wrapperTransitionEnd(E.reloadSlides, !0);
        };
        E.reloadSlides = function() {
            var e = t.loader.slides, i = parseInt(E.activeSlide().data("swiperindex"), 10);
            if (!(i < 0 || i > e.length - 1)) {
                E.activeLoaderIndex = i;
                var n = Math.max(0, i - t.slidesPerView * t.loader.surroundGroups), o = Math.min(i + t.slidesPerView * (1 + t.loader.surroundGroups) - 1, e.length - 1);
                if (i > 0) {
                    var r = -M * (i - n);
                    E.setWrapperTranslate(r);
                    E.setWrapperTransition(0);
                }
                var a;
                if ("reload" === t.loader.logic) {
                    E.wrapper.innerHTML = "";
                    var s = "";
                    for (a = n; a <= o; a++) s += "outer" === t.loader.slidesHTMLType ? e[a] : "<" + t.slideElement + ' class="' + t.slideClass + '" data-swiperindex="' + a + '">' + e[a] + "</" + t.slideElement + ">";
                    E.wrapper.innerHTML = s;
                } else {
                    var l = 1e3, u = 0;
                    for (a = 0; a < E.slides.length; a++) {
                        var c = E.slides[a].data("swiperindex");
                        if (c < n || c > o) E.wrapper.removeChild(E.slides[a]); else {
                            l = Math.min(c, l);
                            u = Math.max(c, u);
                        }
                    }
                    for (a = n; a <= o; a++) {
                        var d;
                        if (a < l) {
                            d = document.createElement(t.slideElement);
                            d.className = t.slideClass;
                            d.setAttribute("data-swiperindex", a);
                            d.innerHTML = e[a];
                            E.wrapper.insertBefore(d, E.wrapper.firstChild);
                        }
                        if (a > u) {
                            d = document.createElement(t.slideElement);
                            d.className = t.slideClass;
                            d.setAttribute("data-swiperindex", a);
                            d.innerHTML = e[a];
                            E.wrapper.appendChild(d);
                        }
                    }
                }
                E.reInit(!0);
            }
        };
        A();
    }
};

Swiper.prototype = {
    plugins: {},
    wrapperTransitionEnd: function(e, t) {
        "use strict";
        function i(s) {
            if (s.target === r) {
                e(o);
                o.params.queueEndCallbacks && (o._queueEndCallbacks = !1);
                if (!t) for (n = 0; n < a.length; n++) o.h.removeEventListener(r, a[n], i);
            }
        }
        var n, o = this, r = o.wrapper, a = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ];
        if (e) for (n = 0; n < a.length; n++) o.h.addEventListener(r, a[n], i);
    },
    getWrapperTranslate: function(e) {
        "use strict";
        var t, i, n, o, r = this.wrapper;
        "undefined" == typeof e && (e = "horizontal" === this.params.mode ? "x" : "y");
        if (this.support.transforms && this.params.useCSS3Transforms) {
            n = window.getComputedStyle(r, null);
            if (window.WebKitCSSMatrix) o = new WebKitCSSMatrix("none" === n.webkitTransform ? "" : n.webkitTransform); else {
                o = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                t = o.toString().split(",");
            }
            "x" === e && (i = window.WebKitCSSMatrix ? o.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4]));
            "y" === e && (i = window.WebKitCSSMatrix ? o.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5]));
        } else {
            "x" === e && (i = parseFloat(r.style.left, 10) || 0);
            "y" === e && (i = parseFloat(r.style.top, 10) || 0);
        }
        return i || 0;
    },
    setWrapperTranslate: function(e, t, i) {
        "use strict";
        var n, o = this.wrapper.style, r = {
            x: 0,
            y: 0,
            z: 0
        };
        if (3 === arguments.length) {
            r.x = e;
            r.y = t;
            r.z = i;
        } else {
            "undefined" == typeof t && (t = "horizontal" === this.params.mode ? "x" : "y");
            r[t] = e;
        }
        if (this.support.transforms && this.params.useCSS3Transforms) {
            n = this.support.transforms3d ? "translate3d(" + r.x + "px, " + r.y + "px, " + r.z + "px)" : "translate(" + r.x + "px, " + r.y + "px)";
            o.webkitTransform = o.MsTransform = o.msTransform = o.MozTransform = o.OTransform = o.transform = n;
        } else {
            o.left = r.x + "px";
            o.top = r.y + "px";
        }
        this.callPlugins("onSetWrapperTransform", r);
        this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, r);
    },
    setWrapperTransition: function(e) {
        "use strict";
        var t = this.wrapper.style;
        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e / 1e3 + "s";
        this.callPlugins("onSetWrapperTransition", {
            duration: e
        });
        this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, e);
    },
    h: {
        getWidth: function(e, t, i) {
            "use strict";
            var n = window.getComputedStyle(e, null).getPropertyValue("width"), o = parseFloat(n);
            (isNaN(o) || n.indexOf("%") > 0 || o < 0) && (o = e.offsetWidth - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right")));
            t && (o += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right")));
            return i ? Math.ceil(o) : o;
        },
        getHeight: function(e, t, i) {
            "use strict";
            if (t) return e.offsetHeight;
            var n = window.getComputedStyle(e, null).getPropertyValue("height"), o = parseFloat(n);
            (isNaN(o) || n.indexOf("%") > 0 || o < 0) && (o = e.offsetHeight - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom")));
            t && (o += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom")));
            return i ? Math.ceil(o) : o;
        },
        getOffset: function(e) {
            "use strict";
            var t = e.getBoundingClientRect(), i = document.body, n = e.clientTop || i.clientTop || 0, o = e.clientLeft || i.clientLeft || 0, r = window.pageYOffset || e.scrollTop, a = window.pageXOffset || e.scrollLeft;
            if (document.documentElement && !window.pageYOffset) {
                r = document.documentElement.scrollTop;
                a = document.documentElement.scrollLeft;
            }
            return {
                top: t.top + r - n,
                left: t.left + a - o
            };
        },
        windowWidth: function() {
            "use strict";
            return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : void 0;
        },
        windowHeight: function() {
            "use strict";
            return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : void 0;
        },
        windowScroll: function() {
            "use strict";
            return "undefined" != typeof pageYOffset ? {
                left: window.pageXOffset,
                top: window.pageYOffset
            } : document.documentElement ? {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            } : void 0;
        },
        addEventListener: function(e, t, i, n) {
            "use strict";
            "undefined" == typeof n && (n = !1);
            e.addEventListener ? e.addEventListener(t, i, n) : e.attachEvent && e.attachEvent("on" + t, i);
        },
        removeEventListener: function(e, t, i, n) {
            "use strict";
            "undefined" == typeof n && (n = !1);
            e.removeEventListener ? e.removeEventListener(t, i, n) : e.detachEvent && e.detachEvent("on" + t, i);
        }
    },
    setTransform: function(e, t) {
        "use strict";
        var i = e.style;
        i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = t;
    },
    setTranslate: function(e, t) {
        "use strict";
        var i = e.style, n = {
            x: t.x || 0,
            y: t.y || 0,
            z: t.z || 0
        }, o = this.support.transforms3d ? "translate3d(" + n.x + "px," + n.y + "px," + n.z + "px)" : "translate(" + n.x + "px," + n.y + "px)";
        i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = o;
        if (!this.support.transforms) {
            i.left = n.x + "px";
            i.top = n.y + "px";
        }
    },
    setTransition: function(e, t) {
        "use strict";
        var i = e.style;
        i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = t + "ms";
    },
    support: {
        touch: window.Modernizr && Modernizr.touch === !0 || function() {
            "use strict";
            return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        }(),
        transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
            "use strict";
            var e = document.createElement("div").style;
            return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
        }(),
        transforms: window.Modernizr && Modernizr.csstransforms === !0 || function() {
            "use strict";
            var e = document.createElement("div").style;
            return "transform" in e || "WebkitTransform" in e || "MozTransform" in e || "msTransform" in e || "MsTransform" in e || "OTransform" in e;
        }(),
        transitions: window.Modernizr && Modernizr.csstransitions === !0 || function() {
            "use strict";
            var e = document.createElement("div").style;
            return "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "MsTransition" in e || "OTransition" in e;
        }(),
        classList: function() {
            "use strict";
            var e = document.createElement("div");
            return "classList" in e;
        }()
    },
    browser: {
        ie8: function() {
            "use strict";
            var e = -1;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                var t = navigator.userAgent, i = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
                null !== i.exec(t) && (e = parseFloat(RegExp.$1));
            }
            return e !== -1 && e < 9;
        }(),
        ie10: window.navigator.msPointerEnabled,
        ie11: window.navigator.pointerEnabled
    }
};

(window.jQuery || window.Zepto) && !function(e) {
    "use strict";
    e.fn.swiper = function(t) {
        var i;
        this.each(function(n) {
            var o = e(this);
            if (!o.data("swiper")) {
                var r = new Swiper(o[0], t);
                n || (i = r);
                o.data("swiper", r);
            }
        });
        return i;
    };
}(window.jQuery || window.Zepto);

"undefined" != typeof module && (module.exports = Swiper);

"function" == typeof define && define.amd && define("lib/plugins/swiper/2.7.0/swiper", [], function() {
    "use strict";
    return Swiper;
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(e, t, i) {
    "use strict";
    function n(e) {
        return e.replace(s, "ms-").replace(l, u);
    }
    function o(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : c.test(e) ? a.parseJSON(e) : e);
        } catch (t) {}
    }
    function r(e, t, i) {
        var n;
        if (void 0 === i && 1 === e.nodeType) {
            n = "data-" + t.replace(d, "-$&").toLowerCase();
            i = e.getAttribute(n);
            "string" != typeof i && (i = void 0);
        }
        return i;
    }
    var a = (window.document, e("jquery")), s = /^-ms-/, l = /-([\da-z])/gi, u = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, d = /[A-Z]/g, f = function(e, t, i) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, s, l, u;
        if (1 === arguments.length) {
            if (l = e.dataset) {
                u = {};
                for (s in l) l.hasOwnProperty(s) && (u[s] = o(l[s]));
                return u;
            }
            l = e.attributes;
            a = l.length;
            u = {};
            for (;a--; ) if (l[a]) {
                s = l[a].name;
                if (0 === s.indexOf("data-")) {
                    s = n(s.slice(5));
                    u[s] = o(r(e, s));
                }
            }
            return u;
        }
    };
    i.exports = f;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, i) {
    "use strict";
    function n(e, t, i, n) {
        n ? e[t] || (e[t] = i) : e[t] ? e[t] = e[t].add(i) : e[t] = r(i);
    }
    var o = window.document, r = e("jquery"), a = function(e, t, i) {
        var a, s, l, u, c, d = function(e) {
            if (i) for (var o in i) l[o] = r(i[o].toString(), e); else {
                l = {};
                u = r("[node-type]", e);
                for (var a, s = -1, c = u.length; ++s < c; ) {
                    a = u[s];
                    o = a.getAttribute("node-type");
                    n(l, o, a, t);
                }
            }
        }, f = function(e) {
            var i, o = l[e];
            if (!o || 0 === o.length) {
                i = r('[node-type="' + e + '"]', a);
                i.length && n(l, e, i, t);
                o = l[e];
            }
            return o;
        };
        void 0 === t && (t = !0);
        a = e;
        if ("string" == typeof e && "<" === e.charAt(0)) {
            a = o.createElement("div");
            a.innerHTML = e;
            s = o.createDocumentFragment();
            for (;c = a.firsChild; ) s.appendChild(c);
        } else {
            a = r(e);
            s = a[0];
        }
        d(a);
        return {
            get: f,
            box: s,
            list: l
        };
    };
    t.build = a, t.parse = function(e, t, i) {
        "object" == typeof e && e.length > 0 && (e = e[0]);
        if (!e || 1 !== e.nodeType) throw TypeError("parse error, not a valid html element");
        if ("boolean" == typeof i) {
            t = i;
            i = null;
        }
        return a(e, t, i).list;
    };
    t.dataset = e("./dataset");
});

define("lib/ui/tab/1.0.0/tab", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = this, n = {
            event: "click"
        };
        i.el = o(e);
        i.options = o.extend(!0, {}, n, t);
        var r = s.build(e, !1);
        i.hd = r.get("hd");
        i.bd = r.get("bd");
        i.hdItems = r.get("hdItem");
        i.containers = r.get("container");
        i._initEvent();
        i._init();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/utils/util"), s = e("lib/core/1.0.0/dom/build");
    a.inherits(n, r);
    n.prototype._initEvent = function() {
        var e = this;
        e.hdItems.on(e.options.event, function(t) {
            t.preventDefault();
            var i = o(this);
            i.hasClass("current") || e.setCurrent(i.attr("data-target"));
        });
    };
    n.prototype._init = function() {};
    n.prototype.setCurrent = function(e) {
        var t = this;
        if (void 0 === e) {
            var i = t.hd.find(".current");
            0 == i.length && (i = this.hdItems.eq(0));
            e = i.attr("data-target");
        }
        t.hdItems.removeClass("current");
        var n = t.hd.find("[data-target=" + e + "]");
        n.addClass("current");
        t.containers.removeClass("current");
        var o = t.bd.find("[data-id=" + e + "]");
        o.addClass("current");
        t.emit("change", {
            hd: n,
            body: o
        });
    };
    i.exports = n;
});

!function(e, t) {
    "use strict";
    var i, n, o = e.layui && layui.define, r = {
        getPath: function() {
            var e = document.scripts, t = e[e.length - 1], i = t.src;
            if (!t.getAttribute("merge")) return i.substring(0, i.lastIndexOf("/") + 1);
        }(),
        config: {},
        end: {},
        minIndex: 0,
        minLeft: [],
        btn: [ "&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;" ],
        type: [ "dialog", "page", "iframe", "loading", "tips" ]
    }, a = {
        v: "3.0.1",
        ie: function() {
            var t = navigator.userAgent.toLowerCase();
            return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11");
        }(),
        index: e.layer && e.layer.v ? 1e5 : 0,
        path: r.getPath,
        config: function(e, t) {
            return e = e || {}, a.cache = r.config = i.extend({}, r.config, e), a.path = r.config.path || a.path, 
            "string" == typeof e.extend && (e.extend = [ e.extend ]), r.config.path && a.ready(), 
            e.extend ? (o ? layui.addcss("modules/layer/" + e.extend) : a.link("skin/" + e.extend), 
            this) : this;
        },
        link: function(t, n, o) {
            if (a.path) {
                var r = i("head")[0], s = document.createElement("link");
                "string" == typeof n && (o = n);
                var l = (o || t).replace(/\.|\//g, ""), u = "layuicss-" + l, c = 0;
                s.rel = "stylesheet", s.href = a.path + t, s.id = u, i("#" + u)[0] || r.appendChild(s), 
                "function" == typeof n && !function d() {
                    return ++c > 80 ? e.console && console.error("layer.css: Invalid") : void (1989 === parseInt(i("#" + u).css("width")) ? n() : setTimeout(d, 100));
                }();
            }
        },
        ready: function(e) {
            var t = "skinlayercss", i = "1110";
            return o ? layui.addcss("modules/layer/default/layer.css?v=" + a.v + i, e, t) : a.link("skin/default/layer.css?v=" + a.v + i, e, t), 
            this;
        },
        alert: function(e, t, n) {
            var o = "function" == typeof t;
            return o && (n = t), a.open(i.extend({
                content: e,
                yes: n
            }, o ? {} : t));
        },
        confirm: function(e, t, n, o) {
            var s = "function" == typeof t;
            return s && (o = n, n = t), a.open(i.extend({
                content: e,
                btn: r.btn,
                yes: n,
                btn2: o
            }, s ? {} : t));
        },
        msg: function(e, n, o) {
            var s = "function" == typeof n, u = r.config.skin, c = (u ? u + " " + u + "-msg" : "") || "layui-layer-msg", d = l.anim.length - 1;
            return s && (o = n), a.open(i.extend({
                content: e,
                time: 3e3,
                shade: !1,
                skin: c,
                title: !1,
                closeBtn: !1,
                btn: !1,
                resize: !1,
                end: o
            }, s && !r.config.skin ? {
                skin: c + " layui-layer-hui",
                anim: d
            } : function() {
                return n = n || {}, (n.icon === -1 || n.icon === t && !r.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")), 
                n;
            }()));
        },
        load: function(e, t) {
            return a.open(i.extend({
                type: 3,
                icon: e || 0,
                resize: !1,
                shade: .01
            }, t));
        },
        tips: function(e, t, n) {
            return a.open(i.extend({
                type: 4,
                content: [ e, t ],
                closeBtn: !1,
                time: 3e3,
                shade: !1,
                resize: !1,
                fixed: !1,
                maxWidth: 210
            }, n));
        }
    }, s = function(e) {
        var t = this;
        t.index = ++a.index, t.config = i.extend({}, t.config, r.config, e), document.body ? t.creat() : setTimeout(function() {
            t.creat();
        }, 50);
    };
    s.pt = s.prototype;
    var l = [ "layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close" ];
    l.anim = [ "layer-anim", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06" ], 
    s.pt.config = {
        type: 0,
        shade: .3,
        fixed: !0,
        move: l[1],
        title: "&#x4FE1;&#x606F;",
        offset: "auto",
        area: "auto",
        closeBtn: 1,
        time: 0,
        zIndex: 19891014,
        maxWidth: 360,
        anim: 0,
        icon: -1,
        moveType: 1,
        resize: !0,
        scrollbar: !0,
        tips: 2
    }, s.pt.vessel = function(e, t) {
        var n = this, o = n.index, a = n.config, s = a.zIndex + o, u = "object" == typeof a.title, c = a.maxmin && (1 === a.type || 2 === a.type), d = a.title ? '<div class="layui-layer-title" style="' + (u ? a.title[1] : "") + '">' + (u ? a.title[0] : a.title) + "</div>" : "";
        return a.zIndex = s, t([ a.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + o + '" times="' + o + '" style="' + ("z-index:" + (s - 1) + "; background-color:" + (a.shade[1] || "#000") + "; opacity:" + (a.shade[0] || a.shade) + "; filter:alpha(opacity=" + (100 * a.shade[0] || 100 * a.shade) + ");") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + r.type[a.type]) + (0 != a.type && 2 != a.type || a.shade ? "" : " layui-layer-border") + " " + (a.skin || "") + '" id="' + l[0] + o + '" type="' + r.type[a.type] + '" times="' + o + '" showtime="' + a.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + a.area[0] + ";height:" + a.area[1] + (a.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != a.type ? "" : d) + '<div id="' + (a.id || "") + '" class="layui-layer-content' + (0 == a.type && a.icon !== -1 ? " layui-layer-padding" : "") + (3 == a.type ? " layui-layer-loading" + a.icon : "") + '">' + (0 == a.type && a.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>' : "") + (1 == a.type && e ? "" : a.content || "") + '</div><span class="layui-layer-setwin">' + function() {
            var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
            return a.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (a.title ? a.closeBtn : 4 == a.type ? "1" : "2") + '" href="javascript:;"></a>'), 
            e;
        }() + "</span>" + (a.btn ? function() {
            var e = "";
            "string" == typeof a.btn && (a.btn = [ a.btn ]);
            for (var t = 0, i = a.btn.length; t < i; t++) e += '<a class="' + l[6] + t + '">' + a.btn[t] + "</a>";
            return '<div class="' + l[6] + " layui-layer-btn-" + (a.btnAlign || "") + '">' + e + "</div>";
        }() : "") + (a.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>" ], d, i('<div class="layui-layer-move"></div>')), 
        n;
    }, s.pt.creat = function() {
        var e = this, t = e.config, o = e.index, s = t.content, u = "object" == typeof s, c = i("body");
        if (!i("#" + t.id)[0]) {
            switch ("string" == typeof t.area && (t.area = "auto" === t.area ? [ "", "" ] : [ t.area, "" ]), 
            t.shift && (t.anim = t.shift), 6 == a.ie && (t.fixed = !1), t.type) {
              case 0:
                t.btn = "btn" in t ? t.btn : r.btn[0], a.closeAll("dialog");
                break;

              case 2:
                var s = t.content = u ? t.content : [ t.content || "http://layer.layui.com", "auto" ];
                t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + o + '" name="' + l[4] + o + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
                break;

              case 3:
                delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, a.closeAll("loading");
                break;

              case 4:
                u || (t.content = [ t.content, "body" ]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', 
                delete t.title, t.tips = "object" == typeof t.tips ? t.tips : [ t.tips, !0 ], t.tipsMore || a.closeAll("tips");
            }
            e.vessel(u, function(n, a, d) {
                c.append(n[0]), u ? function() {
                    2 == t.type || 4 == t.type ? function() {
                        i("body").append(n[1]);
                    }() : function() {
                        s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), 
                        i("#" + l[0] + o).find("." + l[5]).before(a));
                    }();
                }() : c.append(n[1]), i(".layui-layer-move")[0] || c.append(r.moveElem = d), e.layero = i("#" + l[0] + o), 
                t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", o);
            }).auto(o), 2 == t.type && 6 == a.ie && e.layero.find("iframe").attr("src", s[0]), 
            4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function() {
                e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(o), 
                4 == t.type && e.tips();
            }), t.time <= 0 || setTimeout(function() {
                a.close(e.index);
            }, t.time), e.move().callback(), l.anim[t.anim] && e.layero.addClass(l.anim[t.anim]).data("anim", !0);
        }
    }, s.pt.auto = function(e) {
        function t(e) {
            e = s.find(e), e.height(u[1] - c - d - 2 * (0 | parseFloat(e.css("padding"))));
        }
        var o = this, r = o.config, s = i("#" + l[0] + e);
        "" === r.area[0] && r.maxWidth > 0 && (a.ie && a.ie < 8 && r.btn && s.width(s.innerWidth()), 
        s.outerWidth() > r.maxWidth && s.width(r.maxWidth));
        var u = [ s.innerWidth(), s.innerHeight() ], c = s.find(l[1]).outerHeight() || 0, d = s.find("." + l[6]).outerHeight() || 0;
        switch (r.type) {
          case 2:
            t("iframe");
            break;

          default:
            "" === r.area[1] ? r.fixed && u[1] >= n.height() && (u[1] = n.height(), t("." + l[5])) : t("." + l[5]);
        }
        return o;
    }, s.pt.offset = function() {
        var e = this, t = e.config, i = e.layero, o = [ i.outerWidth(), i.outerHeight() ], r = "object" == typeof t.offset;
        e.offsetTop = (n.height() - o[1]) / 2, e.offsetLeft = (n.width() - o[0]) / 2, r ? (e.offsetTop = t.offset[0], 
        e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - o[0] : "b" === t.offset ? e.offsetTop = n.height() - o[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, 
        e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - o[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, 
        e.offsetLeft = n.width() - o[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - o[1], 
        e.offsetLeft = n.width() - o[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), 
        e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), 
        e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()), i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), 
        e.offsetLeft = i.css("left")), i.css({
            top: e.offsetTop,
            left: e.offsetLeft
        });
    }, s.pt.tips = function() {
        var e = this, t = e.config, o = e.layero, r = [ o.outerWidth(), o.outerHeight() ], a = i(t.follow);
        a[0] || (a = i("body"));
        var s = {
            width: a.outerWidth(),
            height: a.outerHeight(),
            top: a.offset().top,
            left: a.offset().left
        }, u = o.find(".layui-layer-TipsG"), c = t.tips[0];
        t.tips[1] || u.remove(), s.autoLeft = function() {
            s.left + r[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - r[0], u.css({
                right: 12,
                left: "auto"
            })) : s.tipLeft = s.left;
        }, s.where = [ function() {
            s.autoLeft(), s.tipTop = s.top - r[1] - 10, u.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1]);
        }, function() {
            s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, u.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1]);
        }, function() {
            s.autoLeft(), s.tipTop = s.top + s.height + 10, u.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1]);
        }, function() {
            s.tipLeft = s.left - r[0] - 10, s.tipTop = s.top, u.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1]);
        } ], s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + r[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + r[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + r[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && r[0] + 16 - s.left > 0 && s.where[1](), 
        o.find("." + l[5]).css({
            "background-color": t.tips[1],
            "padding-right": t.closeBtn ? "30px" : ""
        }), o.css({
            left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
            top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
        });
    }, s.pt.move = function() {
        var e = this, t = e.config, o = i(document), s = e.layero, l = s.find(t.move), u = s.find(".layui-layer-resize"), c = {};
        return t.move && l.css("cursor", "move"), l.on("mousedown", function(e) {
            e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [ e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top")) ], 
            r.moveElem.css("cursor", "move").show());
        }), u.on("mousedown", function(e) {
            e.preventDefault(), c.resizeStart = !0, c.offset = [ e.clientX, e.clientY ], c.area = [ s.outerWidth(), s.outerHeight() ], 
            r.moveElem.css("cursor", "se-resize").show();
        }), o.on("mousemove", function(i) {
            if (c.moveStart) {
                var o = i.clientX - c.offset[0], r = i.clientY - c.offset[1], l = "fixed" === s.css("position");
                if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), 
                !t.moveOut) {
                    var u = n.width() - s.outerWidth() + c.stX, d = n.height() - s.outerHeight() + c.stY;
                    o < c.stX && (o = c.stX), o > u && (o = u), r < c.stY && (r = c.stY), r > d && (r = d);
                }
                s.css({
                    left: o,
                    top: r
                });
            }
            if (t.resize && c.resizeStart) {
                var o = i.clientX - c.offset[0], r = i.clientY - c.offset[1];
                i.preventDefault(), a.style(e.index, {
                    width: c.area[0] + o,
                    height: c.area[1] + r
                }), c.isResize = !0;
            }
        }).on("mouseup", function(e) {
            c.moveStart && (delete c.moveStart, r.moveElem.hide(), t.moveEnd && t.moveEnd()), 
            c.resizeStart && (delete c.resizeStart, r.moveElem.hide());
        }), e;
    }, s.pt.callback = function() {
        function e() {
            var e = o.cancel && o.cancel(t.index, n);
            e === !1 || a.close(t.index);
        }
        var t = this, n = t.layero, o = t.config;
        t.openLayer(), o.success && (2 == o.type ? n.find("iframe").on("load", function() {
            o.success(n, t.index);
        }) : o.success(n, t.index)), 6 == a.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function() {
            var e = i(this).index();
            if (0 === e) o.yes ? o.yes(t.index, n) : o.btn1 ? o.btn1(t.index, n) : a.close(t.index); else {
                var r = o["btn" + (e + 1)] && o["btn" + (e + 1)](t.index, n);
                r === !1 || a.close(t.index);
            }
        }), n.find("." + l[7]).on("click", e), o.shadeClose && i("#layui-layer-shade" + t.index).on("click", function() {
            a.close(t.index);
        }), n.find(".layui-layer-min").on("click", function() {
            var e = o.min && o.min(n);
            e === !1 || a.min(t.index, o);
        }), n.find(".layui-layer-max").on("click", function() {
            i(this).hasClass("layui-layer-maxmin") ? (a.restore(t.index), o.restore && o.restore(n)) : (a.full(t.index, o), 
            setTimeout(function() {
                o.full && o.full(n);
            }, 100));
        }), o.end && (r.end[t.index] = o.end);
    }, r.reselect = function() {
        i.each(i("select"), function(e, t) {
            var n = i(this);
            n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), 
            n = null;
        });
    }, s.pt.IE6 = function(e) {
        i("select").each(function(e, t) {
            var n = i(this);
            n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
                layer: "1"
            }).hide(), n = null;
        });
    }, s.pt.openLayer = function() {
        var e = this;
        a.zIndex = e.config.zIndex, a.setTop = function(e) {
            var t = function() {
                a.zIndex++, e.css("z-index", a.zIndex + 1);
            };
            return a.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), a.zIndex;
        };
    }, r.record = function(e) {
        var t = [ e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left")) ];
        e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
            area: t
        });
    }, r.rescollbar = function(e) {
        l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), 
        l.html.removeAttr("layer-full"));
    }, e.layer = a, a.getChildFrame = function(e, t) {
        return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e);
    }, a.getFrameIndex = function(e) {
        return i("#" + e).parents("." + l[4]).attr("times");
    }, a.iframeAuto = function(e) {
        if (e) {
            var t = a.getChildFrame("html", e).outerHeight(), n = i("#" + l[0] + e), o = n.find(l[1]).outerHeight() || 0, r = n.find("." + l[6]).outerHeight() || 0;
            n.css({
                height: t + o + r
            }), n.find("iframe").css({
                height: t
            });
        }
    }, a.iframeSrc = function(e, t) {
        i("#" + l[0] + e).find("iframe").attr("src", t);
    }, a.style = function(e, t, n) {
        var o = i("#" + l[0] + e), a = o.find(".layui-layer-content"), s = o.attr("type"), u = o.find(l[1]).outerHeight() || 0, c = o.find("." + l[6]).outerHeight() || 0;
        o.attr("minLeft");
        s !== r.type[3] && s !== r.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), 
        parseFloat(t.height) - u - c <= 64 && (t.height = 64 + u + c)), o.css(t), c = o.find("." + l[6]).outerHeight(), 
        s === r.type[2] ? o.find("iframe").css({
            height: parseFloat(t.height) - u - c
        }) : a.css({
            height: parseFloat(t.height) - u - c - parseFloat(a.css("padding-top")) - parseFloat(a.css("padding-bottom"))
        }));
    }, a.min = function(e, t) {
        var o = i("#" + l[0] + e), s = o.find(l[1]).outerHeight() || 0, u = o.attr("minLeft") || 181 * r.minIndex + "px", c = o.css("position");
        r.record(o), r.minLeft[0] && (u = r.minLeft[0], r.minLeft.shift()), o.attr("position", c), 
        a.style(e, {
            width: 180,
            height: s,
            left: u,
            top: n.height() - s,
            position: "fixed",
            overflow: "hidden"
        }, !0), o.find(".layui-layer-min").hide(), "page" === o.attr("type") && o.find(l[4]).hide(), 
        r.rescollbar(e), o.attr("minLeft") || r.minIndex++, o.attr("minLeft", u);
    }, a.restore = function(e) {
        var t = i("#" + l[0] + e), n = t.attr("area").split(",");
        t.attr("type");
        a.style(e, {
            width: parseFloat(n[0]),
            height: parseFloat(n[1]),
            top: parseFloat(n[2]),
            left: parseFloat(n[3]),
            position: t.attr("position"),
            overflow: "visible"
        }, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), 
        "page" === t.attr("type") && t.find(l[4]).show(), r.rescollbar(e);
    }, a.full = function(e) {
        var t, o = i("#" + l[0] + e);
        r.record(o), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), 
        clearTimeout(t), t = setTimeout(function() {
            var t = "fixed" === o.css("position");
            a.style(e, {
                top: t ? 0 : n.scrollTop(),
                left: t ? 0 : n.scrollLeft(),
                width: n.width(),
                height: n.height()
            }, !0), o.find(".layui-layer-min").hide();
        }, 100);
    }, a.title = function(e, t) {
        var n = i("#" + l[0] + (t || a.index)).find(l[1]);
        n.html(e);
    }, a.close = function(e) {
        var t = i("#" + l[0] + e), n = t.attr("type"), o = "layer-anim-close";
        if (t[0]) {
            var s = "layui-layer-wrap", u = function() {
                if (n === r.type[1] && "object" === t.attr("conType")) {
                    t.children(":not(." + l[5] + ")").remove();
                    for (var o = t.find("." + s), a = 0; a < 2; a++) o.unwrap();
                    o.css("display", o.data("display")).removeClass(s);
                } else {
                    if (n === r.type[2]) try {
                        var u = i("#" + l[4] + e)[0];
                        u.contentWindow.document.write(""), u.contentWindow.close(), t.find("." + l[5])[0].removeChild(u);
                    } catch (c) {}
                    t[0].innerHTML = "", t.remove();
                }
                "function" == typeof r.end[e] && r.end[e](), delete r.end[e];
            };
            t.data("anim") && t.addClass(o), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 
            6 == a.ie && r.reselect(), r.rescollbar(e), t.attr("minLeft") && (r.minIndex--, 
            r.minLeft.push(t.attr("minLeft"))), setTimeout(function() {
                u();
            }, a.ie && a.ie < 10 || !t.data("anim") ? 0 : 200);
        }
    }, a.closeAll = function(e) {
        i.each(i("." + l[0]), function() {
            var t = i(this), n = e ? t.attr("type") === e : 1;
            n && a.close(t.attr("times")), n = null;
        });
    };
    var u = a.cache || {}, c = function(e) {
        return u.skin ? " " + u.skin + " " + u.skin + "-" + e : "";
    };
    a.prompt = function(e, t) {
        var o = "";
        if (e = e || {}, "function" == typeof e && (t = e), e.area) {
            var r = e.area;
            o = 'style="width: ' + r[0] + "; height: " + r[1] + ';"', delete e.area;
        }
        var s, l = 2 == e.formType ? '<textarea class="layui-layer-input"' + o + ">" + (e.value || "") + "</textarea>" : function() {
            return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">';
        }();
        return a.open(i.extend({
            type: 1,
            btn: [ "&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;" ],
            content: l,
            skin: "layui-layer-prompt" + c("prompt"),
            maxWidth: n.width(),
            success: function(e) {
                s = e.find(".layui-layer-input"), s.focus();
            },
            resize: !1,
            yes: function(i) {
                var n = s.val();
                "" === n ? s.focus() : n.length > (e.maxlength || 500) ? a.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
                    tips: 1
                }) : t && t(n, i, s);
            }
        }, e));
    }, a.tab = function(e) {
        e = e || {};
        var t = e.tab || {};
        return a.open(i.extend({
            type: 1,
            skin: "layui-layer-tab" + c("tab"),
            resize: !1,
            title: function() {
                var e = t.length, i = 1, n = "";
                if (e > 0) for (n = '<span class="layui-layer-tabnow">' + t[0].title + "</span>"; i < e; i++) n += "<span>" + t[i].title + "</span>";
                return n;
            }(),
            content: '<ul class="layui-layer-tabmain">' + function() {
                var e = t.length, i = 1, n = "";
                if (e > 0) for (n = '<li class="layui-layer-tabli xubox_tab_layer">' + (t[0].content || "no content") + "</li>"; i < e; i++) n += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
                return n;
            }() + "</ul>",
            success: function(t) {
                var n = t.find(".layui-layer-title").children(), o = t.find(".layui-layer-tabmain").children();
                n.on("mousedown", function(t) {
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                    var n = i(this), r = n.index();
                    n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"), o.eq(r).show().siblings().hide(), 
                    "function" == typeof e.change && e.change(r);
                });
            }
        }, e));
    }, a.photos = function(t, n, o) {
        function r(e, t, i) {
            var n = new Image();
            return n.src = e, n.complete ? t(n) : (n.onload = function() {
                n.onload = null, t(n);
            }, void (n.onerror = function(e) {
                n.onerror = null, i(e);
            }));
        }
        var s = {};
        if (t = t || {}, t.photos) {
            var l = t.photos.constructor === Object, u = l ? t.photos : {}, d = u.data || [], f = u.start || 0;
            if (s.imgIndex = (0 | f) + 1, t.img = t.img || "img", l) {
                if (0 === d.length) return a.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;");
            } else {
                var p = i(t.photos), h = function() {
                    d = [], p.find(t.img).each(function(e) {
                        var t = i(this);
                        t.attr("layer-index", e), d.push({
                            alt: t.attr("alt"),
                            pid: t.attr("layer-pid"),
                            src: t.attr("layer-src") || t.attr("src"),
                            thumb: t.attr("src")
                        });
                    });
                };
                if (h(), 0 === d.length) return;
                if (n || p.on("click", t.img, function() {
                    var e = i(this), n = e.attr("layer-index");
                    a.photos(i.extend(t, {
                        photos: {
                            start: n,
                            data: d,
                            tab: t.tab
                        },
                        full: t.full
                    }), !0), h();
                }), !n) return;
            }
            s.imgprev = function(e) {
                s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = d.length), s.tabimg(e);
            }, s.imgnext = function(e, t) {
                s.imgIndex++, s.imgIndex > d.length && (s.imgIndex = 1, t) || s.tabimg(e);
            }, s.keyup = function(e) {
                if (!s.end) {
                    var t = e.keyCode;
                    e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && a.close(s.index);
                }
            }, s.tabimg = function(e) {
                d.length <= 1 || (u.start = s.imgIndex - 1, a.close(s.index), a.photos(t, !0, e));
            }, s.event = function() {
                s.bigimg.hover(function() {
                    s.imgsee.show();
                }, function() {
                    s.imgsee.hide();
                }), s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
                    e.preventDefault(), s.imgprev();
                }), s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
                    e.preventDefault(), s.imgnext();
                }), i(document).on("keyup", s.keyup);
            }, s.loadi = a.load(1, {
                shade: !("shade" in t) && .9,
                scrollbar: !1
            }), r(d[f].src, function(n) {
                a.close(s.loadi), s.index = a.open(i.extend({
                    type: 1,
                    area: function() {
                        var o = [ n.width, n.height ], r = [ i(e).width() - 100, i(e).height() - 100 ];
                        if (!t.full && (o[0] > r[0] || o[1] > r[1])) {
                            var a = [ o[0] / r[0], o[1] / r[1] ];
                            a[0] > a[1] ? (o[0] = o[0] / a[0], o[1] = o[1] / a[0]) : a[0] < a[1] && (o[0] = o[0] / a[1], 
                            o[1] = o[1] / a[1]);
                        }
                        return [ o[0] + "px", o[1] + "px" ];
                    }(),
                    title: !1,
                    shade: .9,
                    shadeClose: !0,
                    closeBtn: !1,
                    move: ".layui-layer-phimg img",
                    moveType: 1,
                    scrollbar: !1,
                    moveOut: !0,
                    anim: 5 * Math.random() | 0,
                    skin: "layui-layer-photos" + c("photos"),
                    content: '<div class="layui-layer-phimg"><img src="' + d[f].src + '" alt="' + (d[f].alt || "") + '" layer-pid="' + d[f].pid + '"><div class="layui-layer-imgsee">' + (d.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (o ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (d[f].alt || "") + "</a><em>" + s.imgIndex + "/" + d.length + "</em></span></div></div></div>",
                    success: function(e, i) {
                        s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), 
                        s.event(e), t.tab && t.tab(d[f], e);
                    },
                    end: function() {
                        s.end = !0, i(document).off("keyup", s.keyup);
                    }
                }, t));
            }, function() {
                a.close(s.loadi), a.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                    time: 3e4,
                    btn: [ "&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;" ],
                    yes: function() {
                        d.length > 1 && s.imgnext(!0, !0);
                    }
                });
            });
        }
    }, r.run = function(t) {
        i = t, n = i(e), l.html = i("html"), a.open = function(e) {
            var t = new s(e);
            return t.index;
        };
    }, e.layui && layui.define ? (a.ready(), layui.define("jquery", function(t) {
        a.path = layui.cache.dir, r.run(layui.jquery), e.layer = a, t("layer", a);
    })) : "function" == typeof define ? define("plugins/layer/layer", [ "jquery" ], function() {
        return r.run(e.jQuery), a;
    }) : function() {
        r.run(e.jQuery), a.ready();
    }();
}(window);

define("module/top-search/1.0.0/top-search", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
            activeClass: "focus",
            selector: "#jTopSearch",
            url: $PAGE_DATA && $PAGE_DATA.topSearchUrl || "",
            data: {},
            alias: "name"
        };
        t.options = o.extend(!0, {}, i, e);
        if ("" == t.options.url) throw new Error("the params options.url is required");
        t.el = o(t.options.selector);
        var n = r.build(t.el[0], !1);
        t.ipt = n.get("ipt");
        t.btn = n.get("btn");
        t.lbl = n.get("lbl");
        t._init();
        t._initEvent();
    }
    var o = e("jquery"), r = (e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build"));
    n.prototype._initEvent = function() {
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
    n.prototype._init = function() {
        var e = this, t = o.trim(e.ipt.val()), i = e.ipt.attr("data-id");
        t.length > 0 && e.focus();
        i && (e.options.alias = i);
        e.options.data && (e.options.data[e.options.alias] = o.trim(e.ipt.val()));
    };
    n.prototype.focus = function() {
        var e = this;
        e.el.addClass(e.options.activeClass);
    };
    n.prototype.blur = function() {
        var e = this;
        e.el.removeClass(e.options.activeClass);
    };
    n.prototype.getValue = function() {
        var e = this;
        return o.trim(e.ipt.val());
    };
    n.prototype.search = function() {
        var e = this;
        e.options.data[e.options.alias] = e.getValue();
        window.location.href = e.options.url + "?" + e._getUrlString();
    };
    n.prototype._getUrlString = function() {
        var e = this, t = "", i = 0;
        for (var n in e.options.data) {
            t += 0 == i ? n + "=" + encodeURIComponent(e.options.data[n]) : "&" + n + "=" + encodeURIComponent(e.options.data[n]);
            i++;
        }
        return t;
    };
    i.exports = n;
});

define("lib/core/1.0.0/io/cookie", [ "require", "exports", "module" ], function(e, t, i) {
    "use strict";
    var n = window.document, o = function(e) {
        if ("string" != typeof e) throw "trim need a string as parameter";
        for (var t = e.length, i = 0, n = t - 1, o = /(\u3000|\s|\t|\u00A0)/; i < t && o.test(e.charAt(i)); ) ++i;
        for (;n >= 0 && o.test(e.charAt(n)); ) --n;
        return e.substring(i, n + 1);
    }, r = function(e) {
        var t = {};
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t;
    }, a = function(e, t, i) {
        i = i || {};
        if (void 0 !== t) {
            i = r(i);
            if (null === t) {
                t = "";
                i.expires = -1;
            }
            if ("number" == typeof i.expires) {
                var a = i.expires, s = i.expires = new Date();
                s.setTime(s.getTime() + 864e5 * a);
            }
            var l = function(e) {
                try {
                    return i.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return n.cookie = [ l(e), "=", l(t), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, u = n.cookie, c = function(e) {
            return i.raw ? e : decodeURIComponent(e);
        }, d = u ? u.split("; ") : [], f = -1, p = d.length, h = e.length + 1; ++f < p; ) {
            u = o(d[f]);
            if (u.substring(0, h) === e + "=") {
                t = c(u.substring(h));
                break;
            }
        }
        return t;
    };
    a.set = function(e, t, i) {
        return a(e, t, i);
    };
    a.get = function(e) {
        return a(e);
    };
    i.exports = a;
});

define("module/login-status/1.0.0/login", [ "require", "exports", "module", "lib/core/1.0.0/io/cookie" ], function(e, t, i) {
    "use strict";
    var n = e("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", s = $PAGE_DATA && $PAGE_DATA[o] || null;
    t.getNick = function() {
        return s;
    };
    t.isLogin = function() {
        return !!n(r);
    };
    t.login = function(e) {
        if (a) {
            e = e ? "?returnUrl=" + decodeURIComponent(e) : "";
            window.location.href = a + e;
        }
    };
});

define("module/login-status/1.0.0/login-status", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build", "./login" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
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
        t.options = o.extend(!0, {}, i, e);
        t.el = o(t.options.selector);
        t._init();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/dom/build"), a = e("./login");
    n.prototype._init = function() {
        var e = this;
        if (a.isLogin()) {
            var t = a.getNick();
            e.el.html(e._getLoginedHtml(t));
            e._initEvent();
        }
    };
    n.prototype._initEvent = function() {
        var e = this, t = !1, i = r.build(e.el[0], !1), n = i.get("userName"), o = i.get("tipsMenu");
        n.on("mouseenter", function() {
            t = !0;
            o.stop().fadeIn(500, function() {
                o.addClass("active");
            });
        });
        n.on("mouseleave", function() {
            t = !1;
            setTimeout(function() {
                t || o.stop().fadeOut(500, function() {
                    o.removeClass("active");
                });
            }, 200);
        });
        o.on("mouseenter", function() {
            t = !0;
        });
        o.on("mouseleave", function() {
            t = !1;
            o.removeClass("active");
        });
    };
    n.prototype._getLoginedHtml = function(e) {
        var t = this, i = t.options, n = i.menuList, o = "";
        o += '<ul class="logined clearfix" node-type="logined">';
        o += '    <li class="item">';
        o += "        <span>您好，</span>";
        o += "    </li>";
        o += '    <li class="item tips-menu-box">';
        o += '        <a href="' + i.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + e + "</a>";
        o += '        <div class="tips-menu" node-type="tipsMenu">';
        o += '            <div class="arrow"><i></i><b></b></div>';
        o += '            <ul class="tips-menu-list">';
        for (var r = 0, a = n.length; r < a; r++) o += '            <li class="tips-menu-item"><a href="' + n[r].url + '">' + n[r].title + "</a></li>";
        o += "            </ul>";
        o += "        </div>";
        o += "    </li>";
        o += '    <li class="item">';
        o += '        <a href="' + i.loginOutUrl + '" class="btn">退出</a>';
        o += "    </li>";
        o += "</ul>";
        return o;
    };
    i.exports = n;
});

define("module/fix-bar/1.0.0/fix-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
            onlineServiceUrl: ""
        };
        t.options = o.extend(!0, {}, i, e);
        t._init();
        t._initEvent();
    }
    var o = e("jquery");
    e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build");
    n.prototype._init = function() {
        var e = this;
        e.el = o(e._getTemplete());
        o(document.body).append(e.el);
        e.height = e.el.height();
        e.resize();
    };
    n.prototype._initEvent = function() {
        var e = this;
        o(window).on("resize", function() {
            e.resize();
        });
    };
    n.prototype.resize = function() {
        var e = this, t = o(window).height(), i = (t - e.height) / 2;
        if (i >= 0) {
            e.el.css({
                top: i
            });
            e.el.addClass("active");
        } else e.el.removeClass("active");
    };
    n.prototype._getTemplete = function() {
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
    i.exports = n;
});

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
            selector: "#jFooter"
        };
        t.options = o.extend(!0, {}, i, e);
        t.el = o(t.options.selector);
        if (0 == t.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        t._init();
    }
    var o = e("jquery"), r = e("lib/plugins/lazyload/1.9.3/lazyload"), a = e("lib/core/1.0.0/dom/build");
    n.prototype._init = function() {
        var e = this, t = a.build(e.el[0], !1), i = t.get("footerImg");
        new r(i);
    };
    i.exports = n;
});

define("conf/index", [ "require", "exports", "module", "jquery", "lib/ui/box/1.0.1/box", "lib/ui/slider/1.0.0/slider", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/io/request", "lib/plugins/swiper/2.7.0/swiper", "lib/ui/tab/1.0.0/tab", "plugins/layer/layer", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer" ], function(e, t, i) {
    "use strict";
    function n(e) {
        s.get($PAGE_DATA.loadPicture, {
            pid: e
        }, function(e) {
            if (e.error < 0) r.error(e.msg); else try {
                var t = e.data, i = t[0].imageName, n = t[0].imageId, a = [];
                o.each(t, function(e, t) {
                    a[e] = {
                        alt: t.imageName,
                        pid: t.imageId,
                        src: t.imageUrl,
                        thumb: ""
                    };
                });
                var s = {
                    title: i,
                    id: n,
                    start: 0,
                    status: 1,
                    data: a
                };
                layer.photos({
                    photos: s,
                    anim: 5
                });
            } catch (l) {
                r.error("暂无数据");
            }
        }, function(e) {
            r.error("网络错误");
        }, this);
    }
    var o = e("jquery"), r = e("lib/ui/box/1.0.1/box");
    e("lib/ui/slider/1.0.0/slider");
    var a = e("lib/plugins/lazyload/1.9.3/lazyload"), s = e("lib/core/1.0.0/io/request"), l = e("lib/plugins/swiper/2.7.0/swiper"), u = e("lib/ui/tab/1.0.0/tab");
    e("plugins/layer/layer");
    var c = e("module/top-search/1.0.0/top-search"), d = e("module/login-status/1.0.0/login-status"), f = e("module/fix-bar/1.0.0/fix-bar"), p = e("module/footer/1.0.0/footer");
    new c(), new d(), new f(), new p();
    o("#jSlider").slider();
    var h = new a(o(".jImg"), {
        mouseWheel: !0,
        effect: "fadeIn",
        snap: !0
    }), m = new l("#jSwiper", {
        slidesPerView: 3
    });
    o("#jRight").on("click", function() {
        m.swipeNext();
    });
    o("#jLeft").on("click", function() {
        m.swipePrev();
    });
    var v = o("#jTab"), g = new u(v);
    g.on("change", function(e) {
        var t = e.hd.attr("data-target");
        h.update();
        if ("2" == t) {
            var i = new l("#jSubSwiper", {
                slidesPerView: 4
            });
            o("#jSubSwiper").on("click", "#jSubRight", function() {
                i.swipeNext();
            });
            o("#jSubSwiper").on("click", "#jSubLeft", function() {
                i.swipePrev();
            });
        }
    });
    o(".jAlum").on("click", function() {
        var e = o(this).attr("data-id");
        n(e);
    });
});