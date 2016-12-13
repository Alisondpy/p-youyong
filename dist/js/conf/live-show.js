/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*! layer-v3.0.1 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return "object" == typeof e && null !== e;
    }
    function o() {}
    function r(e, t) {
        for (var n = e.length, i = -1; ++i < n; ) t(e[i], i);
    }
    function a(e, t) {
        for (var n in e) p.call(e, n) && t(e[n], n, e);
    }
    function s(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? r(e, t) : a(e, t);
    }
    function l(e, t) {
        for (var n = -1, i = e.length, o = Array(i); ++n < i; ) o[n] = t(e[n], n, e);
        return o;
    }
    function u(e, t) {
        var n = [];
        s(e, function(e, i, o) {
            n.push(t(e, i, o));
        });
        return n;
    }
    function f(e, t) {
        if (!t || !i(t)) return e;
        for (var n = m(t), o = n.length; o--; ) e[n[o]] = t[n[o]];
        return e;
    }
    function c(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = {}, i = e.split("&"), o = -1, r = i.length; ++o < r; ) {
            t = i[o].split("=");
            n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return n;
    }
    var d = new Function("return this")(), p = Object.prototype.hasOwnProperty, h = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, y = function() {
        var e = (+new Date()).toString(36), t = -1;
        return function(n) {
            return (n || "") + e + ++t;
        };
    }(), m = Object.keys || function(e) {
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
    }(), g = d.console || (d.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(e) {
        g[e] || (g[e] = o);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), i = n.length, o = -1; ++o < i; ) f(e, n[o]);
        return e;
    };
    t.inherits = function(e, t, n) {
        v(e, t);
        n && f(e.prototype, n);
    };
    t.impls = function(e, n) {
        n = "function" == typeof n ? n.prototype : n;
        t.mix(e.prototype, n);
        return e;
    };
    t.parseQuery = c;
    t.parseParams = c;
    t.each = s;
    t.map = function(e, t) {
        var n = h(e) ? l : u;
        return n(e, t);
    };
    t.filter = function(e, t) {
        var n, i, o = h(e) ? (n = r, i = function(e, t) {
            o.push(t);
        }, []) : (n = a, i = function(e, t) {
            o[e] = t;
        }, {});
        n(e, function(e, n) {
            t(e, n) && i(n, e);
        });
        return o;
    };
    t.mix = function x(e, t, n, i, o) {
        for (var r in t) t.hasOwnProperty(r) && (t[r] && e[r] && n && "object" == typeof t[r] ? x(e[r], t[r], n, i, o) : (void 0 === e[r] || i) && (o && !o(e[r], t[r]) || (e[r] = t[r])));
        return e;
    };
    t.guid = y;
    t.setImmediate = function() {
        var e = d.document, t = d.postMessage, n = d.setImmediate;
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
                    d.removeEventListener("message", n, !0);
                    e();
                }
            }
            var i = y();
            d.addEventListener("message", n, !0);
            t(i, "*");
        } : function(e) {
            d.setTimeout(e, 0);
        };
    }();
    t.noop = o;
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
        var o;
        return function() {
            var r = i || this, a = arguments, s = function() {
                o = null;
                n || e.apply(r, a);
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            l && e.apply(r, a);
        };
    };
    t.deprecate = function(e, t) {
        function n() {
            i || (i = !0);
            return e.apply(this, arguments);
        }
        if (d.noDeprecation === !0) return e;
        var i = !1;
        return n;
    };
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(e) {
    "use strict";
    var t = e("jquery"), n = t(window), i = t(document), o = "createTouch" in document, r = document.documentElement, a = !("minWidth" in r.style), s = !a && "onlosecapture" in r, l = "setCapture" in r, u = t.noop, f = {
        start: o ? "touchstart" : "mousedown",
        over: o ? "touchmove" : "mousemove",
        end: o ? "touchend" : "mouseup"
    }, c = o ? function(e) {
        e.touches || (e = e.originalEvent.touches.item(0));
        return e;
    } : function(e) {
        return e;
    }, d = function() {
        this.start = t.proxy(this.start, this);
        this.over = t.proxy(this.over, this);
        this.end = t.proxy(this.end, this);
        this.onstart = this.onover = this.onend = u;
    };
    d.types = f;
    d.prototype = {
        start: function(e) {
            e = this.startFix(e);
            i.on(f.over, this.over).on(f.end, this.end);
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
            i.off(f.over, this.over).off(f.end, this.end);
            this.onend(e);
            return !1;
        },
        startFix: function(e) {
            e = c(e);
            this.target = t(e.target);
            this.selectstart = function() {
                return !1;
            };
            i.on("selectstart", this.selectstart).on("dblclick", this.end);
            s ? this.target.on("losecapture", this.end) : n.on("blur", this.end);
            l && this.target[0].setCapture();
            return e;
        },
        overFix: function(e) {
            e = c(e);
            return e;
        },
        endFix: function(e) {
            e = c(e);
            i.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            l && this.target[0].releaseCapture();
            return e;
        }
    };
    d.create = function(e, o, r) {
        r = t.extend({
            hook: null,
            onstart: u,
            onover: u,
            onend: u
        }, r);
        var a, s, l, f, c = t(e), p = r.hook ? t(r.hook) : c, h = new d(), y = d.types.start, m = e.className.replace(/^\s|\s.*/g, "") + "-drag-start", v = {
            off: function() {
                p.off(y, h.start);
            }
        };
        h.onstart = function(t) {
            var o = "fixed" === c.css("position"), u = i.scrollLeft(), d = i.scrollTop(), p = c.width(), h = c.height();
            a = 0;
            s = 0;
            l = o ? n.width() - p + a : i.width() - p;
            f = o ? n.height() - h + s : i.height() - h;
            var y = c.offset(), v = this.startLeft = o ? y.left - u : y.left, g = this.startTop = o ? y.top - d : y.top;
            this.clientX = t.clientX;
            this.clientY = t.clientY;
            c.addClass(m);
            r.onstart.call(e, t, v, g);
        };
        h.onover = function(t) {
            var n = t.clientX - this.clientX + this.startLeft, i = t.clientY - this.clientY + this.startTop, o = c[0].style;
            n = Math.max(a, Math.min(l, n));
            i = Math.max(s, Math.min(f, i));
            o.left = n + "px";
            o.top = i + "px";
            r.onover.call(e, t, n, i);
        };
        h.onend = function(t) {
            var n = c.position(), i = n.left, o = n.top;
            c.removeClass(m);
            r.onend.call(e, t, i, o);
        };
        h.off = function() {
            p.off(y, h.start);
        };
        o ? h.start(o) : p.on(y, h.start);
        return v;
    };
    return d;
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
    function o(e, t, n, i) {
        var o = !0;
        if (t) for (var r, a, s, l = -1, u = {
            type: e,
            timeStamp: f()
        }; r = t[++l]; ) {
            a = r[y];
            s = r[m] || i;
            try {
                o = r[v] === h ? a.call(s, u, n) !== !1 && o : a.apply(s, n) !== !1 && o;
            } catch (c) {
                setTimeout(function() {
                    console.error(c);
                }, 1);
            }
        }
        return o;
    }
    function r(e) {
        var t, n = d(this);
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
    function l(e, t) {
        e.forEach ? e.forEach(t) : function(e) {
            for (var n = -1, i = e.length; ++n < i; ) t(e[n], n);
        }(e);
    }
    var u = /\s+/, f = Date.now || function() {
        return +new Date();
    }, c = function() {
        return f() * Math.random() & 65535;
    }(), d = function() {
        var e, t, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, n) {
            var i = e.get(t);
            return null === n ? void 0 !== i && e["delete"](t) : !i && n ? (e.set(t, i = {}), 
            i) : i;
        }) : (t = f(), n = "__$widΦ" + t.toString(36), e = {}, function(i, o) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === o ? i[n] && (delete e[i[n]], delete i[n]) : (r = i[n] || o && (r = ++t, 
            e[r] = {}, i[n] = r), r && e[r]);
        });
    }(), p = 1, h = 2, y = 0, m = 1, v = 2, g = function(e, t, n) {
        var i = [];
        i[y] = e;
        i[m] = t;
        i[v] = n;
        return i;
    }, x = i.prototype;
    x.addListener = function(e, t, n, i) {
        var o, r, a, s = p;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
            s = h;
        }
        if (!t) return this;
        o = d(this, 1);
        e = e.split(u);
        for (;r = e.shift(); ) {
            a = !i && o[r] || (o[r] = []);
            a.push(g(t, n, s));
        }
        return this;
    };
    x.on = x.addListener;
    x.once = function(e, t, n) {
        var i = !1, o = function() {
            this.removeListener(e, o);
            if (!i) {
                i = !0;
                t.apply(n || this, arguments);
            }
        };
        o.guid = t.guid || (t.guid = c++);
        return this.on(e, o);
    };
    x.removeListener = function(e, t, n) {
        var i, o, r, a, l, f;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
        }
        if (!(i = d(this))) return this;
        if (!(e || t || n)) {
            s(i, function(e, t) {
                delete i[t];
            });
            d(this, null);
            return this;
        }
        e = e ? e.split(u) : b(i);
        for (;o = e.shift(); ) {
            r = i[o];
            if (r) if (t || n) for (a = r.length; --a >= 0; ) {
                l = r[a];
                f = l[y];
                t && f !== t && (void 0 === f.guid || f.guid !== t.guid) || n && l[m] !== n || r.splice(a, 1);
            } else delete i[o];
        }
        return this;
    };
    x.un = x.removeListener;
    x.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    x.emit = function(e) {
        var t, n, i, r, a, s, l = [], f = !0;
        if (!(t = d(this))) return this;
        e = e.split(u);
        for (a = 1, s = arguments.length; a < s; a++) l[a - 1] = arguments[a];
        for (;n = e.shift(); ) {
            (i = t.all) && (i = i.slice());
            (r = t[n]) && (r = r.slice());
            "all" !== n && (f = o(n, r, l, this) && f);
            f = o(n, i, [ n ].concat(l), this) && f;
        }
        return f;
    };
    i.applyTo = function(e) {
        function t(t, i) {
            e[t] = function() {
                var o = n[t].apply(i || e, Array.prototype.slice.call(arguments));
                return o === i ? this : o;
            };
        }
        var n = x, i = b(n);
        a(e) ? l(i, function(t) {
            e.prototype[t] = n[t];
        }) : l(i, function(e) {
            t(e);
        });
    };
    i.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : r.call(e, t);
    };
    x.listenerCount = r;
    var b = Object.keys || function(e) {
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
        var n, i, r, a = t.currentTarget, s = o(a), l = (t.handleObj || 0).origType || t.type;
        if (!t.isPropagationStopped()) {
            if (!s.attr("disabled") && (n = s.attr("action-type"))) {
                i = s.attr("action-data");
                t.action = n;
                t.data = i;
                r = e.e.emit(l + u + n, t, a);
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
    var o = e("jquery"), r = e("../event/emitter"), a = /\S+/g, s = -1, l = (+new Date()).toString(36), u = "/", f = function() {
        return l + ++s;
    }, c = function(e, t) {
        var n = e.guid || (e.guid = f()), i = function(n, i) {
            return e.call(t || i, n);
        };
        i.guid = n;
        return i;
    }, d = function() {}, p = function(e, t) {
        return "function" == typeof e ? e : t;
    }, h = function(e, t) {
        t = t || {};
        "string" == typeof e && (e = o(e)[0]);
        var n = {}, s = {}, l = new r(), f = t.context, h = {
            o: n,
            opts: t,
            e: l
        }, y = function(e) {
            return i(h, e);
        };
        t.onDelegate = p(t.onDelegate, d);
        n.on = function(t, n, i) {
            if ("function" == typeof n) {
                i = n;
                n = t;
                t = "click";
            }
            if ("function" != typeof i) throw Error("The delegate handler should be a valid function");
            n = (n || "").match(a) || [];
            for (var r = n.length; r--; ) {
                if (!s[t]) {
                    s[t] = 1;
                    o(e).on(t, "[action-type]", y);
                }
                l.on(t + u + n[r], c(i, f));
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
            var r, s = n.length;
            for (o(e); s--; ) {
                r = t + u + n[s];
                l.un(r, i);
            }
            return this;
        };
        n.fire = function(t, n) {
            if (!n) {
                n = t;
                t = "click";
            }
            var i = o('[action-type="' + n + '"]', e)[0] || document, r = new o.Event(t);
            r.currentTarget = r.target = i;
            l.emit(t + u + n, r, i);
        };
        n.destroy = function() {
            var i = o(e);
            o.each(s, function(e, t) {
                delete s[e];
                i.off(e, "[action-type]", y);
            });
            l.un();
            for (var r in n) delete n[r];
            l = void 0;
            t = void 0;
            s = i = e = void 0;
            y = null;
        };
        return n;
    };
    n.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return u("<" + e + "/>")[0];
    }
    function o(e, t, n) {
        e.insertRule ? e.insertRule(t + " {" + n + "}", 0) : e.addRule(t, n, 1);
    }
    function r() {
        var e, t, n, i, o, a = "";
        e = document.body || document.documentElement;
        n = e.style;
        i = "Transition";
        o = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        t = 0;
        for (;t < o.length; ) {
            if (void 0 !== n[o[t] + i]) {
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
    function l(e, t, n, i, o) {
        var r, a, l = u(e), f = arguments, o = "boolean" == typeof f[f.length - 1] && f[f.length - 1], h = !1, y = function() {
            m();
        }, m = function(e) {
            h || v(!0);
        }, v = function(e) {
            if (!h) {
                h = !0;
                m = c;
                l.off(g, y);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                l.removeClass(a);
                e && i();
                l = null;
            }
        };
        if ("function" == typeof n) {
            i = n;
            n = void 0;
        }
        i = i || c;
        if (p) {
            n = n || "normal";
            t = t || "shake";
            a = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + t ].join(" ");
            l.on(g, y);
            r = setTimeout(y, s(n) + 100);
            o === !0 ? d(function() {
                l.addClass(a);
            }) : l.addClass(a);
        } else d(function() {
            i && i();
        });
        return {
            stop: function() {
                v.apply(null, arguments);
                return this;
            }
        };
    }
    var u = e("jquery"), f = e("./util"), c = (f.each, f.noop), d = f.setImmediate, p = a(), h = /\-v\-/g, y = document.getElementsByTagName("head")[0].appendChild(i("style")), m = y.sheet || y.styleSheet, v = {
        ".ui-animated": "-v-animation-fill-mode: both;",
        ".ui-animated.ui-speed-normal": "-v-animation-duration: 0.5s;",
        ".ui-animated.ui-speed-fast": "-v-animation-duration: 0.2s;",
        ".ui-animated.ui-speed-slow": "-v-animation-duration: 1s;"
    }, g = {
        "-webkit-": "webkitAnimationEnd",
        "-moz-": "animationend",
        "-o-": "OAnimationEnd",
        "-ms-": "msAnimationEnd",
        "": "animationend"
    }[p];
    f.each(v, function(e, t) {
        e && o(m, t, e.replace(h, p));
    });
    t.effect = l;
    t.getVendorPrefix = r;
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
        t._ = e = b(n, e);
        e.fixed = !!e.fixed && C();
        var r = o('<div class="' + y + '" id="' + (e.id || x()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(e.html), a = o("<div />");
        t._popup = r;
        t._mask = t._shadow = a;
        t.node = r[0];
        t.mask = a[0];
        t.on("render", function(e) {
            var n, o = e.className, a = t._mask, s = e.zIndex;
            r.html() || r.html(e.html);
            o && r.addClass(o);
            r.css("position", e.fixed ? "fixed" : "absolute");
            s && r.css("zIndex", s);
            if (e.modal) {
                r.addClass(y + "-modal");
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
                C() || b(n, {
                    position: "absolute",
                    width: f.width() + "px",
                    height: c.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", _(t.focus, t));
                t._shadow = a.clone(!0);
                a.css(n).addClass(y + "-mask");
            }
        });
        t.on("beforeShow", function(e) {
            var n = t.anchor, i = t._dirClass;
            if (!n && i) {
                r.removeClass(i);
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
            var s = _(t.resize, t);
            t.on("render", function() {
                f.on("resize", s);
            });
            t.on("destroy", function() {
                f.off("resize", s);
            });
        }
        t.destroyed = !1;
        t.initialized = !0;
    }
    var o = e("jquery"), r = e("../../../core/1.0.0/utils/util"), a = e("../../../core/1.0.0/utils/css"), s = e("../../../core/1.0.0/event/emitter"), l = window, u = l.document, f = o(l), c = o(u), d = u.documentElement, p = /\S+/g, h = !("minWidth" in d.style), y = "ui-layer", m = l.Math, v = m.max, g = m.ceil, x = r.guid, b = r.extend, w = r.each, _ = function(e, t) {
        return e.bind ? e.bind(t) : function() {
            return e.apply(t, arguments);
        };
    }, T = r.setImmediate, k = function(e) {
        return l.parseInt(e, 10) || 0;
    }, A = function(e) {
        return e && 1 === e.nodeType;
    }, C = function() {
        return C._ || (C._ = function() {
            var e = u.createElement("div"), t = e.cloneNode(!1), n = !1, i = u.body || function() {
                n = !0;
                return d.appendChild(u.createElement("body"));
            }();
            e.style.cssText = "position:fixed;top:42px";
            i.appendChild(e);
            i.appendChild(t);
            var o = e.offsetTop !== t.offsetTop;
            i.removeChild(e);
            i.removeChild(t);
            n && d.removeChild(i);
            e = t = null;
            return o;
        }());
    }, z = function() {
        return {
            x: c.scrollLeft(),
            y: c.scrollTop()
        };
    }, j = function(e) {
        return {
            w: e.width(),
            h: e.height()
        };
    }, L = function() {
        return j(f);
    }, E = function(e) {
        var t = A(e), n = t ? o(e).offset() : {
            left: e.pageX,
            top: e.pageY
        };
        e = t ? e : e.target;
        var i = e.ownerDocument;
        if (i === l.document) return n;
        var r = i.defaultView || i.parentWindow, a = r.frameElement, s = z(), u = o(a).offset();
        return {
            left: n.left + u.left - s.x,
            top: n.top + u.top - s.y
        };
    }, I = function(e, t) {
        if (e.length) {
            var n = k(e.css(t)) || e[0]["offset" + t.charAt(0).toUpperCase() + t.slice(1)], i = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            w(i[t], function(t, i) {
                n += k(e.css("margin-" + t), 10) || 0;
            });
            return n;
        }
        return 0;
    }, F = function(e) {
        return I(e, "width");
    }, q = function(e) {
        return I(e, "height");
    }, D = function() {
        try {
            var e = u.activeElement, t = e.contentDocument;
            return t && t.activeElement || e;
        } catch (n) {}
    }, N = function(e) {
        e = e || "";
        var t = {
            auto: !0
        }, n = e.slice(-1);
        if ("!" === n) {
            t.auto = !1;
            e = e.slice(0, -1);
        }
        for (var i, e = e.length <= 2 ? e.split("") : e.replace(/^\s+|\s+$/g, "").split(" ").slice(0, 2), o = {}, r = {
            t: "t",
            b: "t",
            l: "l",
            r: "l"
        }, a = -1, s = e.length; ++a < s; ) {
            i = e[a].charAt(0);
            if (!i || o[r[i]]) e.splice(a, 1); else {
                e[a] = i;
                o[r[i]] = 1;
            }
        }
        2 === e.length && e[0] === e[1] && e.pop();
        t.align = e;
        return t;
    };
    r.inherits(i, s, {
        open: !1,
        destroyed: !0,
        node: null,
        mask: null,
        emit: function(e) {
            for (var t = (e || "").match(p) || [], n = t.length; n--; ) {
                var o = this["on" + t[n]], r = Array.prototype.slice.call(arguments, 1);
                "function" == typeof o && o.apply(this, r);
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
            var n, i = this, o = i._, r = e, s = null, l = i._anim;
            l && l.stop(!0);
            if (i.destroyed || o.showing || i.open) return i;
            t = b({}, i._, t);
            if (void 0 !== r) {
                n = typeof r;
                "boolean" === n ? t.modal = r : r && "object" === n && (A(r) || A(r.target) ? s = r : b(t, r));
            }
            var u = i._popup, f = t.showWithAni, c = function() {
                delete o.showing;
                i.emit("shown");
            };
            if (!i._ready) {
                i.emit("render", t);
                i._ready = !0;
            }
            i.open = !0;
            i.anchor = s;
            i._activeElement = D();
            i.emit("beforeShow", t);
            u.appendTo(t.appendTo).css("display", "block");
            i.emit("show", t);
            o.showing = !0;
            if (f && "none" !== f) {
                var d = f.split(":");
                i._anim = a.effect(i.node, d[0], d[1], c);
            } else c();
            return i;
        },
        hide: function(e) {
            var t, n = this, i = n._, o = n.node, r = i.hideWithAni, s = n._anim;
            s && s.stop(!0);
            if (n.destroyed || i.hidding || !n.open) return n;
            n.emit("beforeHide");
            i.hidding = !0;
            t = function() {
                if (i.hidding === !0) {
                    o.parentNode.removeChild(o);
                    n._popup.hide();
                    delete i.hidding;
                    n.open = !1;
                    n.emit("hidden");
                    (e || i.autoRelease) && n.destroy();
                }
            };
            if (r && "none" !== r) {
                var l = r.split(":");
                n._anim = a.effect(o, l[0], l[1], t);
                n.emit("hide");
            } else {
                n.emit("hide");
                T(t);
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
            var t = this._, n = this.node, r = this._popup, a = i.current, s = t.zIndex;
            a && a !== this && a.blur(!1);
            if (!o.contains(n, D())) {
                var l = r.find("[autofocus]")[0];
                !t.focusing && l ? t.focusing = !0 : l = n;
                this._focus(l);
            }
            if (void 0 === s) {
                s = t.zIndex = i.zIndex++;
                r.css("zIndex", s);
                r.addClass(y + "-focus");
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
            this._popup.removeClass(y + "-focus");
            this.emit("blur");
            return this;
        },
        _focus: function(e) {
            if (e && this._.autofocus && !/^iframe$/i.test(e.nodeName)) try {
                e.focus();
            } catch (t) {}
        },
        center: function() {
            var e = this._popup, t = this._.fixed, n = z(), i = L(), o = j(e), r = t ? 0 : n.x, a = t ? 0 : n.y, s = (i.w - o.w) / 2 + r, l = .382 * (i.h - o.h) + a;
            e.css({
                left: v(k(s), r),
                top: v(k(l), a)
            });
            return this;
        },
        alignTo: function(e, t) {
            var n = this, i = n._, r = n._popup, a = e.parentNode && o(e);
            if (!a) return n;
            var s = a.offset();
            if (s.left * s.top < 0) return n.center();
            t = t || i.align;
            var l = N(t), u = l.align, f = !l.auto;
            u && u.length || (u = [ "b" ]);
            var c = n._dirClass;
            c && r.removeClass(c);
            var d = i.fixed, p = L(), h = z(), m = F(r), v = q(r), x = E(e), b = F(a), _ = q(a), T = x.left, A = x.top, C = d ? T - h.x : T, j = d ? A - h.y : A, I = d ? 0 : h.x, D = d ? 0 : h.y, S = I + p.w - m, W = D + p.h - v, B = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, O = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, $ = {}, H = [ {
                t: j - v,
                b: j + _,
                l: C - m,
                r: C + b
            }, {
                t: j,
                b: j - v + _,
                l: C,
                r: C - m + b
            } ], R = {
                l: C + g((b - m) / 2),
                t: j + g((_ - v) / 2)
            }, M = {
                left: [ I, S ],
                top: [ D, W ]
            };
            f || w(u, function(e, t) {
                H[t][e] > M[O[e]][1] && (e = u[t] = B[e]);
                H[t][e] < M[O[e]][0] && (u[t] = B[e]);
            });
            var P = u[0];
            if (!u[1]) {
                u[1] = "left" === O[P] ? "t" : "l";
                H[1][u[1]] = R[u[1]];
            }
            H[0][P] = H[0][P] + 10 * ("tl".indexOf(P) !== -1 ? -1 : 1);
            $[O[u[0]]] = k(H[0][u[0]]);
            $[O[u[1]]] = k(H[1][u[1]]);
            var X = y + "-" + P;
            r.css($).addClass(X);
            n._dirClass = X;
            var Y = n.$("arrow", 1), U = n.$("inner", 1);
            if (!Y) {
                if (!U) return n;
                Y = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(U);
            }
            var Q, V, G = "top" !== O[P], J = [ "v", "h" ][1 ^ G], Z = F(Y), K = q(Y), ee = {}, te = G ? "left" : "top";
            switch (J) {
              case "h":
                Q = g(T + (b - Z) / 2);
                ee.left = Q;
                break;

              case "v":
                V = g(A + (_ - K) / 2);
                ee.top = V;
            }
            Y.offset(ee).css(te, "");
            return n;
        }
    });
    i.zIndex = 1024;
    i.current = null;
    n.exports = i;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("../../../core/1.0.0/dom/delegator"), a = e("./popup"), s = o.extend, l = o.guid, u = o.each, f = window.document, c = {
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
    }, d = {}, p = function(e) {
        var t = e || (e = {}), n = e.id || e.id || l(), o = p.get(n) || this;
        "string" != typeof e && 1 !== e.nodeType || (e = {
            content: e
        });
        e = s({}, c, e);
        e.original = t;
        var r, a = e.button || (e.button = []);
        if (!i.isArray(r = a)) {
            r = [];
            a && "object" == typeof a && u(a, function(e, t) {
                e.id = t;
                r.push(e);
            });
            a = e.button = r;
        }
        if (a.length > 0) {
            var f = !1;
            u(a, function(t, n) {
                var i = t.id || l();
                t.autofocus && (f = !0);
                e[i] && s(t, e[i]);
                t.index = n;
            });
            f || (a[a.length - 1].autofocus = !0);
        }
        o.emit("init", e);
        o.initialized ? o.options(e).focus() : o.init(e);
        d[n] = o;
        return o;
    };
    o.inherits(p, a, {
        init: function(e) {
            var t = this;
            a.call(t, e);
            var n = function(e) {
                var n = e.actionValue === !1 || e.isDefaultPrevented();
                n || t.hide();
            };
            t._delegator = new r(t.node, {
                context: t,
                onDelegate: n
            });
            t.delegate("close", function(e) {
                t.hide();
            }).once("render", function() {
                t.initComponents();
            }).on("destroy", function() {
                delete d[e.id];
                t._delegator.destroy();
            });
        },
        options: function(e) {
            var t = this, e = s(t._, e);
            t._freeze(!0);
            u([ "title", "content", "width", "height", "action", "button" ], function(n, i) {
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
            t.clickBlankToHide && i(e.mask).on("onmousedown" in f ? "mousedown" : "click", function() {
                e.hide();
                return !1;
            });
            var n = function(t) {
                var n = t.target, i = n.nodeName, o = /^input|textarea$/i, r = a.current === e, s = t.keyCode;
                !r || o.test(i) && "button" !== n.type || 27 === s && e.hide();
            };
            i(f).on("keydown", n);
            e.on("destroy", function() {
                i(f).off("keydown", n);
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
                i.contains(f, e) && this.on("beforeremove", function() {
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
            var t = this, n = t._, i = "", o = 0, r = n.buttonClass;
            if ("string" == typeof e) {
                i = e;
                o++;
            } else u(e, function(e, a) {
                var s = e.id, l = e.fn || e.callback, u = e.display !== !1, f = e.className || r, c = [ f ];
                e.autofocus && c.push(n.buttonClassLight);
                "function" == typeof l && t.delegate(s, l);
                u && o++;
                i += '<button type="button" action-type="' + s + '"' + (u ? "" : ' style="display:none"') + (' class="' + c.join(" ") + '"') + (e.disabled ? " disabled" : "") + ">" + (e.text || e.value) + "</button>";
            });
            t.$("button").html(i);
            t.$("footer")[o ? "show" : "hide"]();
            t.resize();
            return t;
        },
        action: function(e) {
            var t = this;
            u(e, function(e, n) {
                t.delegate(n, e);
            });
            return t;
        }
    });
    p.getCurrent = function() {
        return a.current;
    };
    p.get = function(e) {
        return void 0 === e ? d : d[e];
    };
    p.config = function(e) {
        e && s(c, e);
    };
    n.exports = p;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("./drag"), a = e("./dialog"), s = o.each, l = o.extend, u = window.clearTimeout, f = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var e = i('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + f + '"</i>').appendTo("body");
        setTimeout(function() {
            e.remove();
            e = null;
        }, 50);
    }();
    var c = {
        info: "&#x69;",
        warn: "&#x21;",
        confirm: "&#x3f;",
        ok: "&#x2714;",
        error: "&#x2718;",
        loading: '<img src="' + f + '" />'
    }, d = function(e) {
        var t = c[e];
        return t ? '<i node-type="icon" class="x-icon ui-box-iconf">' + t + "</i>" : "";
    }, p = o.guid("__x") + "$", h = function(e) {
        return p + e;
    }, y = function(e, t) {
        var n, i = t.xtype, o = i && d(i) || t.iconHTML;
        if (o) {
            n = e ? '<div node-type="text" class="x-text">' + e + "</div>" : "";
            e = [ '<div class="ui-box-x-wrap">', o, n, "</div>" ].join("");
        }
        return e;
    }, m = function(e) {
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
                s(i, function(i, o) {
                    if (i) if ("title" === o) {
                        if ("auto" === i) try {
                            i = t.contentWindow.document.title || "";
                        } catch (r) {
                            i = "";
                        }
                        i && e.title(i);
                    } else "function" == typeof e[o] ? e[o](i) : n[o] = i;
                });
            });
        }).once("render", function() {
            var n = e._;
            setTimeout(function() {
                t = g(e, n.url);
                e.iframeNode = t;
            }, 30);
            var o = n.original;
            if (!(o instanceof Object)) for (var r = function() {
                e.hide().destroy();
            }, a = 0; a < frames.length; a++) try {
                if (o instanceof frames[a].Object) {
                    i(frames[a]).one("unload", r);
                    break;
                }
            } catch (s) {}
        }).once("beforeremove", function() {
            i(t).attr("src", "about:blank").remove();
        }, !1);
    }, g = function(e, t) {
        var n = e._, o = e.$("content"), r = o.find("iframe"), a = r && r[0], s = function(t) {
            e._freeze(!0);
            if (t) {
                n.width || e.width(t.width);
                n.height || e.height(t.height);
            }
            e.emit("load");
            e._freeze(!1).resize();
            s = null;
            r.removeAttr("style");
            r = a = null;
        }, l = function(t) {
            n.showing ? e.once("shown", t) : t();
        };
        if (!r.length) {
            var u = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), f = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (u ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + t + '"></iframe>';
            r = i(f.replace(/{id}/g, n.id)).appendTo(o);
            a = r[0];
            n.autoSize ? r.one("load", function() {
                var e, t, n, o = m(a), u = o && i(o);
                if (u) {
                    e = u.width();
                    r.width(e);
                    t = u.height();
                    n = {
                        width: e,
                        height: t
                    };
                }
                l(function() {
                    s(n);
                });
            }) : l(function() {
                s();
            });
        }
        return a;
    }, x = function(e) {
        var t = this;
        e = l({}, e);
        var n = e.button || (e.button = []);
        s([ "cancel", "ok" ], function(t, i) {
            var o = e[t];
            if (o && "object" == typeof o) {
                o.id = t;
                n.push(o);
                delete e[t];
            }
        });
        var o = e.xtype;
        if (o) {
            e.id = e.id || h(o);
            e.content = y(e.content, e);
            "none" !== o && (e.className = (e.className || "") + " ui-box-x-" + o);
        } else {
            var u = e.url;
            if (u) {
                var f = e.close !== !1;
                e = l({
                    modal: !0,
                    close: !1,
                    autoRelease: !0,
                    autoSize: !0,
                    scrolling: "auto"
                }, e);
                var c = i(y("Loading...", {
                    xtype: "loading"
                })).addClass("ui-box-x-loading");
                e.content = c;
                e.className = (e.className || "") + " ui-box-iframe";
                t.once("load", function() {
                    c.remove();
                    c = null;
                    f && t.$("close").show();
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
                r.create(t.node, null, {
                    hook: n,
                    onstart: function() {
                        t.anchor || t.focus();
                    }
                });
            }
        });
        return t;
    }, b = "__showDelay", w = "__hideTimer";
    o.inherits(x, a, {
        show: function(e, t) {
            var n = this, i = n._, r = [].slice.call(arguments), t = l({}, i, t), a = t.duration || 0, s = t.delay || 0, f = function() {
                o.each([ b, w ], function(e, t) {
                    t = i[e];
                    delete i[e];
                    t && u(t);
                });
            }, c = function() {
                if (a > 0) {
                    i[w] = setTimeout(function() {
                        f();
                        n.hide();
                    }, a);
                    n.once("hide", f);
                }
                x.__super__.show.apply(n, r);
            };
            f();
            s > 0 ? i[b] = setTimeout(c, s) : c();
            return n;
        },
        hide: function() {
            var e = this, t = e._;
            t && o.each([ b, w ], function(e, n) {
                n = t[e];
                delete t[e];
                n && u(n);
            });
            x.__super__.hide.apply(e, arguments);
            return e;
        }
    });
    x.config = a.config;
    x.get = function(e) {
        if (e) {
            var t, n, i = a.get();
            if (e && (t = e.frameElement)) for (var o in i) if (i.hasOwnProperty(o)) {
                n = i[o];
                if (n.iframeNode === t) return n;
            }
            return i[e];
        }
    };
    n.exports = x;
});

define("lib/ui/box/1.0.1/box", [ "require", "exports", "module", "./messagebox", "../../../core/1.0.0/utils/util" ], function(e, t, n) {
    "use strict";
    var i = e("./messagebox"), o = e("../../../core/1.0.0/utils/util"), r = function() {}, a = o.mix, s = function(e, t) {
        var n = function(e, t) {
            return void 0 !== t && null !== t && "" !== t && !("number" == typeof t && isNaN(t));
        };
        return function(e, t) {
            return a(e, t, !0, !0, n);
        };
    }(), l = function(e) {
        return !!(e && e.nodeType && e.tagName);
    }, u = o.guid, f = function() {
        return u("__0x$");
    }, c = function(e) {
        var t, n = e[1] || {};
        t = e[0];
        t && ("string" == typeof t ? n.html = t : "object" == typeof t && (n = t));
        var i = n.skin;
        if (i) {
            n.className = i;
            delete n.skin;
        }
        return n;
    }, d = function(e, t) {
        var t = c([ e, t ]);
        return new i(t);
    }, p = function(e, t, n) {
        if ("object" == typeof e) {
            n = t;
            t = e;
            e = "";
        } else if (l(t)) {
            n = t;
            t = {};
        } else "number" == typeof t && (t = {
            duration: t
        });
        t = t || {};
        var i = d(s({
            id: f(),
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
    }, h = {
        create: d,
        loadUrl: function(e, t) {
            t = t || {};
            t.url = e;
            var n = d(t);
            return n.show();
        },
        loading: function(e, t) {
            t = t || {};
            var n = d(s({
                autofocus: !0,
                autoRelease: !0,
                id: f(),
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
                id: f(),
                modal: !0,
                autoRelease: !0,
                content: "<div>" + e + "</div>",
                ok: {
                    text: "确定",
                    fn: function() {}
                }
            }, t);
            return d(t).show();
        },
        confirm: function(e, t, n, i) {
            var o;
            if (!i && n && "object" == typeof n) {
                l(n) ? i = n : o = n;
                n = t;
            }
            if ("function" != typeof t) {
                o = t;
                t = r;
            }
            "function" != typeof n && (n = t);
            var a = function(e) {
                e ? t(e) : n(e);
            };
            o && (i = i || o.sender);
            var u = d(s({
                xtype: "confirm",
                autofocus: !0,
                id: f(),
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
            }, o));
            return u.show(i);
        },
        bubble: p
    };
    h.tips = h.bubble;
    o.each([ "ok", "info", "warn", "error" ], function(e, t) {
        h[e] = function(t, n, i) {
            var o = {
                xtype: e
            };
            if (n && n.nodeType) {
                i = n;
                n = void 0;
            } else "number" == typeof n ? o.duration = n : o = s(o, n);
            return p(t, o, i);
        };
    });
    h.get = i.get;
    h.config = i.config;
    n.exports = h;
});

!function(e, t, n) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], n) : e[t] = n(e.jQuery || e.Zepto);
}(this, "Lazyload", function(e, t) {
    "use strict";
    if (!e) throw "Error: jquery api not implements.";
    var n = e.each, i = function(e, t) {
        if (e instanceof Array && e.filter) return e.filter(t);
        for (var n = [], i = -1, o = e.length; ++i < o; ) t(e[i], i) && n.push(e[i]);
        return n;
    }, o = function(e, t, n, i) {
        var o;
        return function() {
            var r = i || this, a = arguments, s = function() {
                o = null;
                n || e.apply(r, a);
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            l && e.apply(r, a);
        };
    }, r = function(t, n) {
        t = t || {};
        var i = e(t), o = Array.prototype.slice;
        n = n || t.name;
        e.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(e, r) {
            t[e] = function(t) {
                var a = o.call(arguments, 0), s = a[1];
                n && !~t.indexOf(".") && (a[0] = t + "." + n);
                "function" == typeof s && ("on" === e || "once" === e ? a[1] = s.__ || (s.__ = function(e) {
                    e.preventDefault();
                    return s.apply(this, o.call(arguments, 1));
                }) : "un" === e && (a[1] = s.__));
                return i[r].apply(i, a);
            };
        });
        return t;
    }, a = window, s = e(a), l = a.Image, u = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), f = "__lazy_status__", c = 0, d = 1, p = 2, h = function(e) {
        return e[f] === t;
    }, y = function() {
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
    y.define("image", function(n, i, o, r) {
        if (i) {
            var a = new l(), s = function() {
                a.onload = a.onerror = null;
                a = i = n = r = s = t;
            };
            a.onload = function() {
                var t = e(n), a = o.effect;
                "function" != typeof t[a] && (a = "show");
                t.hide();
                "IMG" === n.nodeName.toUpperCase() ? t.attr("src", i) : t.css("background-image", 'url("' + i + '")');
                t[a](o.effectSpeed);
                r(null, "load");
                s();
            };
            a.onerror = function(e) {
                r(e);
                s();
            };
            a.src = i;
        } else r("error");
    });
    y.define("html", function(e, t, n, i) {
        i();
    });
    var m = function(t, l) {
        l = l || {};
        t = e(t);
        var m = this, w = {
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
        r(m);
        var _ = l.type || w.type, T = y.get(_);
        if ("function" != typeof T) throw "Error, cannot found the specific type loader (type: `" + _ + "`)";
        "html" === _ && (w.placeholder = "");
        l && e.extend(w, l);
        var k = w.container, A = w.event, C = 0 === A.indexOf("scroll"), z = k && k !== a ? e(k) : s, j = function(t) {
            var i = m._list;
            if (i.length > 0) {
                var o = 0;
                n(i.slice(0), function(t, n) {
                    var i = e(n);
                    if (!w.skipInvisible || i.is(":visible")) if (x(n, w) || b(n, w)) ; else if (v(n, w) || g(n, w)) {
                        if (++o > w.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        o = 0;
                    }
                });
            } else m.reset();
        }, L = function() {
            m._list = i(m._list, function(e) {
                return !e[f];
            });
        }, E = function() {
            var t = this, n = e(t), i = n.attr("data-" + w.dataAttribute), o = w.sourceMaker, r = w.appear, a = w.loadingClass, s = t[f];
            if (s === c) {
                t[f] = d;
                a && n.addClass(a);
                o && (i = o(i, t));
                r && r.apply(m, [ t, i ]);
                T.call(m, t, i, w, function(e, o) {
                    if (!m._destroyed) {
                        a && n.removeClass(a);
                        if (e) setTimeout(function() {
                            t[f] = c;
                            m.emit("lazyItemError", t, i, e);
                            t = null;
                        }, 300); else {
                            t[f] = p;
                            L();
                            m.emit("lazyItemReady", t, i, o);
                            var r = w.load;
                            r && r.apply(m, [ t, i, o ]);
                            t = null;
                        }
                        n = null;
                    }
                });
            } else if (s === p) {
                L();
                m.emit("lazyItemReady", t, i);
            }
        }, I = function() {
            this[f] || e(this).trigger("appear");
        }, F = function(t) {
            var n = e(t);
            t[f] = c;
            var i = w.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === m._.type || n.children()[0] || n.html(i);
            n.on("appear", E);
            C || n.on(A, I);
            m._list.push(t);
        }, q = function(e) {
            e = i(e || [], h);
            if (e.length) {
                n(e, function(e, t) {
                    F(t);
                });
                m._inited || D(m);
            }
        }, D = function(t) {
            if (!t._inited) {
                var i = o(j, 30);
                t._inited = !0;
                C && z.on(A, i);
                s.on("resize", i);
                if (u) {
                    var r = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(t._list, function(t, n) {
                            e(n).trigger("appear");
                        });
                    };
                    s.on("pageshow", r);
                    t.once("reset", function() {
                        s.off("pageshow", r);
                    });
                }
                t.once("reset", function() {
                    n(t._list, function(e, t) {
                        N(t);
                    });
                    C && z.off(A, i);
                    s.off("resize", i);
                });
                e(document).ready(j);
            }
        }, N = function(t) {
            var n = e(t);
            n.off("appear", E);
            C || n.off(A, I);
        };
        m.on("lazyItemReady", function(e) {
            N(e);
        });
        m.once("destroy", function() {
            q = null;
            j = null;
            L = null;
            E = null;
            I = null;
        });
        m._ = w;
        m._list = [];
        m.add = function(t) {
            var n = e(t);
            n.length > 0 && q(n);
        };
        m.update = j;
        q(t);
    };
    m.prototype = {
        constructor: m,
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
    m.define = function(e, t) {
        return y.define(e, t);
    };
    var v = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top + e(o).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return i <= e(t).offset().top - n.threshold;
    }, g = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left + e(o).width() : s.width() + s.scrollLeft();
        return i <= e(t).offset().left - n.threshold;
    }, x = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top : s.scrollTop();
        return i >= e(t).offset().top + n.threshold + e(t).height();
    }, b = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left : s.scrollLeft();
        return i >= e(t).offset().left + n.threshold + e(t).width();
    }, w = function(e, t) {
        return !(g(e, t) || b(e, t) || v(e, t) || x(e, t));
    };
    m.belowthefold = v;
    m.rightoffold = g;
    m.abovethetop = x;
    m.leftofbegin = b;
    m.inviewport = w;
    return m;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../utils/util"), r = e("../event/emitter"), a = o.setImmediate, s = o.noop, l = o.extend, u = i.trim, f = i.parseJSON, c = function(e, t, n) {
        return function(i, o) {
            try {
                return e.apply(t, arguments);
            } catch (r) {
                n && n(r, i, o);
            }
        };
    }, d = function(e) {
        return t.emit.apply(t, arguments);
    };
    r.applyTo(t);
    var p = function() {
        var e = 5, t = 0, n = [], o = function() {
            a(function() {
                --t;
                r();
            });
        }, r = function() {
            if (n.length > 0 && t < e) {
                var r = n.shift(), a = r[0], s = r[1];
                ++t;
                a.always(o);
                i.ajax(s);
            }
        };
        return function(e, t) {
            n.push([ e, t ]);
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
            var e = this, t = this._opts, n = l({}, t), i = "jsonp" === n.dataType;
            i && (n.crossDomain = !0);
            n.complete = function(n, o) {
                var r, a = +n.status, s = n.responseJSON, l = {
                    error: "1",
                    msg: "Request error (status: " + (o || a) + ")"
                }, c = 200 === a || "success" === o;
                if (!i && !s) {
                    s = u(n.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = f(s);
                    } catch (d) {}
                }
                c || (s = s || l);
                r = {
                    data: s,
                    xhr: n,
                    origin: t,
                    status: a || o
                };
                c ? e.emit("response", null, r) : e.emit("error", s, r);
                e.emit("end", r);
                e.destroy();
            };
            p(e, n);
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
        var o = new h(t), r = function(e, n) {
            var i = e.stack && e.stack.split("\n").slice(0, 2).join("\n") || e, o = {
                stack: i,
                origin: t,
                response: n
            };
            d("error", o, n);
            a(function() {
                console.log("%c " + i, "color:#ae0000");
            }, 1);
        }, l = c(t.error || s, null, r), u = c(t.success || s, null, r);
        if (d("request", o, n) !== !1) {
            if (n && (n = i(n))) {
                var f, p, y = "data-async-lock";
                if (1 === +n.attr(y)) return;
                if (p = n.attr("data-async-text")) {
                    f = n.html();
                    n.html(p);
                }
                n.attr(y, 1);
                o.once("response error", function() {
                    if (n) {
                        n.attr(y, 0);
                        p && n.html(f);
                        n = null;
                    }
                });
            }
            o.on("error", function(e, t) {
                var n = {
                    code: e.error,
                    message: e.msg,
                    status: t.status,
                    origin: t.origin,
                    response: t.data
                };
                d("error", n, t) !== !1 && l(e);
            });
            o.on("response", function(e, t) {
                t = t.data;
                d("response", t) !== !1 && (e ? l(e) : t && 0 === +(t.error || 0) ? u(t) : l(t));
            });
            return o.send();
        }
    };
    i.each([ "get", "post", "jsonp" ], function(e, n) {
        t[n] = function(e, i, o, r, a) {
            if ("function" == typeof i) {
                a = a || r;
                r = o;
                o = i;
                i = void 0;
            }
            if (r && "function" != typeof r) {
                a = r;
                r = void 0;
            }
            var s = {
                data: i,
                success: o,
                error: r || o
            };
            "string" == typeof e ? s.url = e : l(s, e);
            var u = n;
            if ("jsonp" === n) {
                u = "get";
                s.dataType = "jsonp";
            }
            s.type = u;
            return t.ajax(s, a);
        };
    });
});

!function(e, t) {
    "use strict";
    var n, i, o = e.layui && layui.define, r = {
        getPath: function() {
            var e = document.scripts, t = e[e.length - 1], n = t.src;
            if (!t.getAttribute("merge")) return n.substring(0, n.lastIndexOf("/") + 1);
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
            return e = e || {}, a.cache = r.config = n.extend({}, r.config, e), a.path = r.config.path || a.path, 
            "string" == typeof e.extend && (e.extend = [ e.extend ]), r.config.path && a.ready(), 
            e.extend ? (o ? layui.addcss("modules/layer/" + e.extend) : a.link("skin/" + e.extend), 
            this) : this;
        },
        link: function(t, i, o) {
            if (a.path) {
                var r = n("head")[0], s = document.createElement("link");
                "string" == typeof i && (o = i);
                var l = (o || t).replace(/\.|\//g, ""), u = "layuicss-" + l, f = 0;
                s.rel = "stylesheet", s.href = a.path + t, s.id = u, n("#" + u)[0] || r.appendChild(s), 
                "function" == typeof i && !function c() {
                    return ++f > 80 ? e.console && console.error("layer.css: Invalid") : void (1989 === parseInt(n("#" + u).css("width")) ? i() : setTimeout(c, 100));
                }();
            }
        },
        ready: function(e) {
            var t = "skinlayercss", n = "1110";
            return o ? layui.addcss("modules/layer/default/layer.css?v=" + a.v + n, e, t) : a.link("skin/default/layer.css?v=" + a.v + n, e, t), 
            this;
        },
        alert: function(e, t, i) {
            var o = "function" == typeof t;
            return o && (i = t), a.open(n.extend({
                content: e,
                yes: i
            }, o ? {} : t));
        },
        confirm: function(e, t, i, o) {
            var s = "function" == typeof t;
            return s && (o = i, i = t), a.open(n.extend({
                content: e,
                btn: r.btn,
                yes: i,
                btn2: o
            }, s ? {} : t));
        },
        msg: function(e, i, o) {
            var s = "function" == typeof i, u = r.config.skin, f = (u ? u + " " + u + "-msg" : "") || "layui-layer-msg", c = l.anim.length - 1;
            return s && (o = i), a.open(n.extend({
                content: e,
                time: 3e3,
                shade: !1,
                skin: f,
                title: !1,
                closeBtn: !1,
                btn: !1,
                resize: !1,
                end: o
            }, s && !r.config.skin ? {
                skin: f + " layui-layer-hui",
                anim: c
            } : function() {
                return i = i || {}, (i.icon === -1 || i.icon === t && !r.config.skin) && (i.skin = f + " " + (i.skin || "layui-layer-hui")), 
                i;
            }()));
        },
        load: function(e, t) {
            return a.open(n.extend({
                type: 3,
                icon: e || 0,
                resize: !1,
                shade: .01
            }, t));
        },
        tips: function(e, t, i) {
            return a.open(n.extend({
                type: 4,
                content: [ e, t ],
                closeBtn: !1,
                time: 3e3,
                shade: !1,
                resize: !1,
                fixed: !1,
                maxWidth: 210
            }, i));
        }
    }, s = function(e) {
        var t = this;
        t.index = ++a.index, t.config = n.extend({}, t.config, r.config, e), document.body ? t.creat() : setTimeout(function() {
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
        var i = this, o = i.index, a = i.config, s = a.zIndex + o, u = "object" == typeof a.title, f = a.maxmin && (1 === a.type || 2 === a.type), c = a.title ? '<div class="layui-layer-title" style="' + (u ? a.title[1] : "") + '">' + (u ? a.title[0] : a.title) + "</div>" : "";
        return a.zIndex = s, t([ a.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + o + '" times="' + o + '" style="' + ("z-index:" + (s - 1) + "; background-color:" + (a.shade[1] || "#000") + "; opacity:" + (a.shade[0] || a.shade) + "; filter:alpha(opacity=" + (100 * a.shade[0] || 100 * a.shade) + ");") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + r.type[a.type]) + (0 != a.type && 2 != a.type || a.shade ? "" : " layui-layer-border") + " " + (a.skin || "") + '" id="' + l[0] + o + '" type="' + r.type[a.type] + '" times="' + o + '" showtime="' + a.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + a.area[0] + ";height:" + a.area[1] + (a.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != a.type ? "" : c) + '<div id="' + (a.id || "") + '" class="layui-layer-content' + (0 == a.type && a.icon !== -1 ? " layui-layer-padding" : "") + (3 == a.type ? " layui-layer-loading" + a.icon : "") + '">' + (0 == a.type && a.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>' : "") + (1 == a.type && e ? "" : a.content || "") + '</div><span class="layui-layer-setwin">' + function() {
            var e = f ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
            return a.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (a.title ? a.closeBtn : 4 == a.type ? "1" : "2") + '" href="javascript:;"></a>'), 
            e;
        }() + "</span>" + (a.btn ? function() {
            var e = "";
            "string" == typeof a.btn && (a.btn = [ a.btn ]);
            for (var t = 0, n = a.btn.length; t < n; t++) e += '<a class="' + l[6] + t + '">' + a.btn[t] + "</a>";
            return '<div class="' + l[6] + " layui-layer-btn-" + (a.btnAlign || "") + '">' + e + "</div>";
        }() : "") + (a.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>" ], c, n('<div class="layui-layer-move"></div>')), 
        i;
    }, s.pt.creat = function() {
        var e = this, t = e.config, o = e.index, s = t.content, u = "object" == typeof s, f = n("body");
        if (!n("#" + t.id)[0]) {
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
            e.vessel(u, function(i, a, c) {
                f.append(i[0]), u ? function() {
                    2 == t.type || 4 == t.type ? function() {
                        n("body").append(i[1]);
                    }() : function() {
                        s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(i[1]), 
                        n("#" + l[0] + o).find("." + l[5]).before(a));
                    }();
                }() : f.append(i[1]), n(".layui-layer-move")[0] || f.append(r.moveElem = c), e.layero = n("#" + l[0] + o), 
                t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", o);
            }).auto(o), 2 == t.type && 6 == a.ie && e.layero.find("iframe").attr("src", s[0]), 
            4 == t.type ? e.tips() : e.offset(), t.fixed && i.on("resize", function() {
                e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(o), 
                4 == t.type && e.tips();
            }), t.time <= 0 || setTimeout(function() {
                a.close(e.index);
            }, t.time), e.move().callback(), l.anim[t.anim] && e.layero.addClass(l.anim[t.anim]).data("anim", !0);
        }
    }, s.pt.auto = function(e) {
        function t(e) {
            e = s.find(e), e.height(u[1] - f - c - 2 * (0 | parseFloat(e.css("padding"))));
        }
        var o = this, r = o.config, s = n("#" + l[0] + e);
        "" === r.area[0] && r.maxWidth > 0 && (a.ie && a.ie < 8 && r.btn && s.width(s.innerWidth()), 
        s.outerWidth() > r.maxWidth && s.width(r.maxWidth));
        var u = [ s.innerWidth(), s.innerHeight() ], f = s.find(l[1]).outerHeight() || 0, c = s.find("." + l[6]).outerHeight() || 0;
        switch (r.type) {
          case 2:
            t("iframe");
            break;

          default:
            "" === r.area[1] ? r.fixed && u[1] >= i.height() && (u[1] = i.height(), t("." + l[5])) : t("." + l[5]);
        }
        return o;
    }, s.pt.offset = function() {
        var e = this, t = e.config, n = e.layero, o = [ n.outerWidth(), n.outerHeight() ], r = "object" == typeof t.offset;
        e.offsetTop = (i.height() - o[1]) / 2, e.offsetLeft = (i.width() - o[0]) / 2, r ? (e.offsetTop = t.offset[0], 
        e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = i.width() - o[0] : "b" === t.offset ? e.offsetTop = i.height() - o[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, 
        e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = i.height() - o[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, 
        e.offsetLeft = i.width() - o[0]) : "rb" === t.offset ? (e.offsetTop = i.height() - o[1], 
        e.offsetLeft = i.width() - o[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? i.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), 
        e.offsetLeft = /%$/.test(e.offsetLeft) ? i.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), 
        e.offsetTop += i.scrollTop(), e.offsetLeft += i.scrollLeft()), n.attr("minLeft") && (e.offsetTop = i.height() - (n.find(l[1]).outerHeight() || 0), 
        e.offsetLeft = n.css("left")), n.css({
            top: e.offsetTop,
            left: e.offsetLeft
        });
    }, s.pt.tips = function() {
        var e = this, t = e.config, o = e.layero, r = [ o.outerWidth(), o.outerHeight() ], a = n(t.follow);
        a[0] || (a = n("body"));
        var s = {
            width: a.outerWidth(),
            height: a.outerHeight(),
            top: a.offset().top,
            left: a.offset().left
        }, u = o.find(".layui-layer-TipsG"), f = t.tips[0];
        t.tips[1] || u.remove(), s.autoLeft = function() {
            s.left + r[0] - i.width() > 0 ? (s.tipLeft = s.left + s.width - r[0], u.css({
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
        } ], s.where[f - 1](), 1 === f ? s.top - (i.scrollTop() + r[1] + 16) < 0 && s.where[2]() : 2 === f ? i.width() - (s.left + s.width + r[0] + 16) > 0 || s.where[3]() : 3 === f ? s.top - i.scrollTop() + s.height + r[1] + 16 - i.height() > 0 && s.where[0]() : 4 === f && r[0] + 16 - s.left > 0 && s.where[1](), 
        o.find("." + l[5]).css({
            "background-color": t.tips[1],
            "padding-right": t.closeBtn ? "30px" : ""
        }), o.css({
            left: s.tipLeft - (t.fixed ? i.scrollLeft() : 0),
            top: s.tipTop - (t.fixed ? i.scrollTop() : 0)
        });
    }, s.pt.move = function() {
        var e = this, t = e.config, o = n(document), s = e.layero, l = s.find(t.move), u = s.find(".layui-layer-resize"), f = {};
        return t.move && l.css("cursor", "move"), l.on("mousedown", function(e) {
            e.preventDefault(), t.move && (f.moveStart = !0, f.offset = [ e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top")) ], 
            r.moveElem.css("cursor", "move").show());
        }), u.on("mousedown", function(e) {
            e.preventDefault(), f.resizeStart = !0, f.offset = [ e.clientX, e.clientY ], f.area = [ s.outerWidth(), s.outerHeight() ], 
            r.moveElem.css("cursor", "se-resize").show();
        }), o.on("mousemove", function(n) {
            if (f.moveStart) {
                var o = n.clientX - f.offset[0], r = n.clientY - f.offset[1], l = "fixed" === s.css("position");
                if (n.preventDefault(), f.stX = l ? 0 : i.scrollLeft(), f.stY = l ? 0 : i.scrollTop(), 
                !t.moveOut) {
                    var u = i.width() - s.outerWidth() + f.stX, c = i.height() - s.outerHeight() + f.stY;
                    o < f.stX && (o = f.stX), o > u && (o = u), r < f.stY && (r = f.stY), r > c && (r = c);
                }
                s.css({
                    left: o,
                    top: r
                });
            }
            if (t.resize && f.resizeStart) {
                var o = n.clientX - f.offset[0], r = n.clientY - f.offset[1];
                n.preventDefault(), a.style(e.index, {
                    width: f.area[0] + o,
                    height: f.area[1] + r
                }), f.isResize = !0;
            }
        }).on("mouseup", function(e) {
            f.moveStart && (delete f.moveStart, r.moveElem.hide(), t.moveEnd && t.moveEnd()), 
            f.resizeStart && (delete f.resizeStart, r.moveElem.hide());
        }), e;
    }, s.pt.callback = function() {
        function e() {
            var e = o.cancel && o.cancel(t.index, i);
            e === !1 || a.close(t.index);
        }
        var t = this, i = t.layero, o = t.config;
        t.openLayer(), o.success && (2 == o.type ? i.find("iframe").on("load", function() {
            o.success(i, t.index);
        }) : o.success(i, t.index)), 6 == a.ie && t.IE6(i), i.find("." + l[6]).children("a").on("click", function() {
            var e = n(this).index();
            if (0 === e) o.yes ? o.yes(t.index, i) : o.btn1 ? o.btn1(t.index, i) : a.close(t.index); else {
                var r = o["btn" + (e + 1)] && o["btn" + (e + 1)](t.index, i);
                r === !1 || a.close(t.index);
            }
        }), i.find("." + l[7]).on("click", e), o.shadeClose && n("#layui-layer-shade" + t.index).on("click", function() {
            a.close(t.index);
        }), i.find(".layui-layer-min").on("click", function() {
            var e = o.min && o.min(i);
            e === !1 || a.min(t.index, o);
        }), i.find(".layui-layer-max").on("click", function() {
            n(this).hasClass("layui-layer-maxmin") ? (a.restore(t.index), o.restore && o.restore(i)) : (a.full(t.index, o), 
            setTimeout(function() {
                o.full && o.full(i);
            }, 100));
        }), o.end && (r.end[t.index] = o.end);
    }, r.reselect = function() {
        n.each(n("select"), function(e, t) {
            var i = n(this);
            i.parents("." + l[0])[0] || 1 == i.attr("layer") && n("." + l[0]).length < 1 && i.removeAttr("layer").show(), 
            i = null;
        });
    }, s.pt.IE6 = function(e) {
        n("select").each(function(e, t) {
            var i = n(this);
            i.parents("." + l[0])[0] || "none" === i.css("display") || i.attr({
                layer: "1"
            }).hide(), i = null;
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
        return t = t || n("." + l[4]).attr("times"), n("#" + l[0] + t).find("iframe").contents().find(e);
    }, a.getFrameIndex = function(e) {
        return n("#" + e).parents("." + l[4]).attr("times");
    }, a.iframeAuto = function(e) {
        if (e) {
            var t = a.getChildFrame("html", e).outerHeight(), i = n("#" + l[0] + e), o = i.find(l[1]).outerHeight() || 0, r = i.find("." + l[6]).outerHeight() || 0;
            i.css({
                height: t + o + r
            }), i.find("iframe").css({
                height: t
            });
        }
    }, a.iframeSrc = function(e, t) {
        n("#" + l[0] + e).find("iframe").attr("src", t);
    }, a.style = function(e, t, i) {
        var o = n("#" + l[0] + e), a = o.find(".layui-layer-content"), s = o.attr("type"), u = o.find(l[1]).outerHeight() || 0, f = o.find("." + l[6]).outerHeight() || 0;
        o.attr("minLeft");
        s !== r.type[3] && s !== r.type[4] && (i || (parseFloat(t.width) <= 260 && (t.width = 260), 
        parseFloat(t.height) - u - f <= 64 && (t.height = 64 + u + f)), o.css(t), f = o.find("." + l[6]).outerHeight(), 
        s === r.type[2] ? o.find("iframe").css({
            height: parseFloat(t.height) - u - f
        }) : a.css({
            height: parseFloat(t.height) - u - f - parseFloat(a.css("padding-top")) - parseFloat(a.css("padding-bottom"))
        }));
    }, a.min = function(e, t) {
        var o = n("#" + l[0] + e), s = o.find(l[1]).outerHeight() || 0, u = o.attr("minLeft") || 181 * r.minIndex + "px", f = o.css("position");
        r.record(o), r.minLeft[0] && (u = r.minLeft[0], r.minLeft.shift()), o.attr("position", f), 
        a.style(e, {
            width: 180,
            height: s,
            left: u,
            top: i.height() - s,
            position: "fixed",
            overflow: "hidden"
        }, !0), o.find(".layui-layer-min").hide(), "page" === o.attr("type") && o.find(l[4]).hide(), 
        r.rescollbar(e), o.attr("minLeft") || r.minIndex++, o.attr("minLeft", u);
    }, a.restore = function(e) {
        var t = n("#" + l[0] + e), i = t.attr("area").split(",");
        t.attr("type");
        a.style(e, {
            width: parseFloat(i[0]),
            height: parseFloat(i[1]),
            top: parseFloat(i[2]),
            left: parseFloat(i[3]),
            position: t.attr("position"),
            overflow: "visible"
        }, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), 
        "page" === t.attr("type") && t.find(l[4]).show(), r.rescollbar(e);
    }, a.full = function(e) {
        var t, o = n("#" + l[0] + e);
        r.record(o), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), 
        clearTimeout(t), t = setTimeout(function() {
            var t = "fixed" === o.css("position");
            a.style(e, {
                top: t ? 0 : i.scrollTop(),
                left: t ? 0 : i.scrollLeft(),
                width: i.width(),
                height: i.height()
            }, !0), o.find(".layui-layer-min").hide();
        }, 100);
    }, a.title = function(e, t) {
        var i = n("#" + l[0] + (t || a.index)).find(l[1]);
        i.html(e);
    }, a.close = function(e) {
        var t = n("#" + l[0] + e), i = t.attr("type"), o = "layer-anim-close";
        if (t[0]) {
            var s = "layui-layer-wrap", u = function() {
                if (i === r.type[1] && "object" === t.attr("conType")) {
                    t.children(":not(." + l[5] + ")").remove();
                    for (var o = t.find("." + s), a = 0; a < 2; a++) o.unwrap();
                    o.css("display", o.data("display")).removeClass(s);
                } else {
                    if (i === r.type[2]) try {
                        var u = n("#" + l[4] + e)[0];
                        u.contentWindow.document.write(""), u.contentWindow.close(), t.find("." + l[5])[0].removeChild(u);
                    } catch (f) {}
                    t[0].innerHTML = "", t.remove();
                }
                "function" == typeof r.end[e] && r.end[e](), delete r.end[e];
            };
            t.data("anim") && t.addClass(o), n("#layui-layer-moves, #layui-layer-shade" + e).remove(), 
            6 == a.ie && r.reselect(), r.rescollbar(e), t.attr("minLeft") && (r.minIndex--, 
            r.minLeft.push(t.attr("minLeft"))), setTimeout(function() {
                u();
            }, a.ie && a.ie < 10 || !t.data("anim") ? 0 : 200);
        }
    }, a.closeAll = function(e) {
        n.each(n("." + l[0]), function() {
            var t = n(this), i = e ? t.attr("type") === e : 1;
            i && a.close(t.attr("times")), i = null;
        });
    };
    var u = a.cache || {}, f = function(e) {
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
        return a.open(n.extend({
            type: 1,
            btn: [ "&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;" ],
            content: l,
            skin: "layui-layer-prompt" + f("prompt"),
            maxWidth: i.width(),
            success: function(e) {
                s = e.find(".layui-layer-input"), s.focus();
            },
            resize: !1,
            yes: function(n) {
                var i = s.val();
                "" === i ? s.focus() : i.length > (e.maxlength || 500) ? a.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
                    tips: 1
                }) : t && t(i, n, s);
            }
        }, e));
    }, a.tab = function(e) {
        e = e || {};
        var t = e.tab || {};
        return a.open(n.extend({
            type: 1,
            skin: "layui-layer-tab" + f("tab"),
            resize: !1,
            title: function() {
                var e = t.length, n = 1, i = "";
                if (e > 0) for (i = '<span class="layui-layer-tabnow">' + t[0].title + "</span>"; n < e; n++) i += "<span>" + t[n].title + "</span>";
                return i;
            }(),
            content: '<ul class="layui-layer-tabmain">' + function() {
                var e = t.length, n = 1, i = "";
                if (e > 0) for (i = '<li class="layui-layer-tabli xubox_tab_layer">' + (t[0].content || "no content") + "</li>"; n < e; n++) i += '<li class="layui-layer-tabli">' + (t[n].content || "no  content") + "</li>";
                return i;
            }() + "</ul>",
            success: function(t) {
                var i = t.find(".layui-layer-title").children(), o = t.find(".layui-layer-tabmain").children();
                i.on("mousedown", function(t) {
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                    var i = n(this), r = i.index();
                    i.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"), o.eq(r).show().siblings().hide(), 
                    "function" == typeof e.change && e.change(r);
                });
            }
        }, e));
    }, a.photos = function(t, i, o) {
        function r(e, t, n) {
            var i = new Image();
            return i.src = e, i.complete ? t(i) : (i.onload = function() {
                i.onload = null, t(i);
            }, void (i.onerror = function(e) {
                i.onerror = null, n(e);
            }));
        }
        var s = {};
        if (t = t || {}, t.photos) {
            var l = t.photos.constructor === Object, u = l ? t.photos : {}, c = u.data || [], d = u.start || 0;
            if (s.imgIndex = (0 | d) + 1, t.img = t.img || "img", l) {
                if (0 === c.length) return a.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;");
            } else {
                var p = n(t.photos), h = function() {
                    c = [], p.find(t.img).each(function(e) {
                        var t = n(this);
                        t.attr("layer-index", e), c.push({
                            alt: t.attr("alt"),
                            pid: t.attr("layer-pid"),
                            src: t.attr("layer-src") || t.attr("src"),
                            thumb: t.attr("src")
                        });
                    });
                };
                if (h(), 0 === c.length) return;
                if (i || p.on("click", t.img, function() {
                    var e = n(this), i = e.attr("layer-index");
                    a.photos(n.extend(t, {
                        photos: {
                            start: i,
                            data: c,
                            tab: t.tab
                        },
                        full: t.full
                    }), !0), h();
                }), !i) return;
            }
            s.imgprev = function(e) {
                s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = c.length), s.tabimg(e);
            }, s.imgnext = function(e, t) {
                s.imgIndex++, s.imgIndex > c.length && (s.imgIndex = 1, t) || s.tabimg(e);
            }, s.keyup = function(e) {
                if (!s.end) {
                    var t = e.keyCode;
                    e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && a.close(s.index);
                }
            }, s.tabimg = function(e) {
                c.length <= 1 || (u.start = s.imgIndex - 1, a.close(s.index), a.photos(t, !0, e));
            }, s.event = function() {
                s.bigimg.hover(function() {
                    s.imgsee.show();
                }, function() {
                    s.imgsee.hide();
                }), s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
                    e.preventDefault(), s.imgprev();
                }), s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
                    e.preventDefault(), s.imgnext();
                }), n(document).on("keyup", s.keyup);
            }, s.loadi = a.load(1, {
                shade: !("shade" in t) && .9,
                scrollbar: !1
            }), r(c[d].src, function(i) {
                a.close(s.loadi), s.index = a.open(n.extend({
                    type: 1,
                    area: function() {
                        var o = [ i.width, i.height ], r = [ n(e).width() - 100, n(e).height() - 100 ];
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
                    skin: "layui-layer-photos" + f("photos"),
                    content: '<div class="layui-layer-phimg"><img src="' + c[d].src + '" alt="' + (c[d].alt || "") + '" layer-pid="' + c[d].pid + '"><div class="layui-layer-imgsee">' + (c.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (o ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (c[d].alt || "") + "</a><em>" + s.imgIndex + "/" + c.length + "</em></span></div></div></div>",
                    success: function(e, n) {
                        s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), 
                        s.event(e), t.tab && t.tab(c[d], e);
                    },
                    end: function() {
                        s.end = !0, n(document).off("keyup", s.keyup);
                    }
                }, t));
            }, function() {
                a.close(s.loadi), a.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                    time: 3e4,
                    btn: [ "&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;" ],
                    yes: function() {
                        c.length > 1 && s.imgnext(!0, !0);
                    }
                });
            });
        }
    }, r.run = function(t) {
        n = t, i = n(e), l.html = n("html"), a.open = function(e) {
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

define("conf/live-show", [ "require", "exports", "module", "jquery", "lib/ui/box/1.0.1/box", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/io/request", "plugins/layer/layer" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("lib/ui/box/1.0.1/box"), r = (e("lib/plugins/lazyload/1.9.3/lazyload"), 
    e("lib/core/1.0.0/io/request"));
    e("plugins/layer/layer");
    var a = i("#jFrame"), s = a.attr("data-id");
    r.get($PAGE_DATA.LiveShowUrl, {
        courseId: s
    }, function(e) {
        e && e.data && e.data.liveshowUrl ? layer.open({
            type: 2,
            title: "直播",
            shadeClose: !0,
            shade: !1,
            maxmin: !0,
            area: [ "100%", "100%" ],
            content: e.data.liveshowUrl
        }) : o.error("服务器错误,请重试");
    }, function(e) {
        o.error(e.msg || "网络错误,请重试");
    });
});