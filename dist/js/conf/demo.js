/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return "object" == typeof t && null !== t;
    }
    function o() {}
    function r(t, e) {
        for (var n = t.length, i = -1; ++i < n; ) e(t[i], i);
    }
    function a(t, e) {
        for (var n in t) p.call(t, n) && e(t[n], n, t);
    }
    function s(t, e) {
        if (t && t.forEach) return t.forEach(e);
        h(t) ? r(t, e) : a(t, e);
    }
    function u(t, e) {
        for (var n = -1, i = t.length, o = Array(i); ++n < i; ) o[n] = e(t[n], n, t);
        return o;
    }
    function l(t, e) {
        var n = [];
        s(t, function(t, i, o) {
            n.push(e(t, i, o));
        });
        return n;
    }
    function c(t, e) {
        if (!e || !i(e)) return t;
        for (var n = m(e), o = n.length; o--; ) t[n[o]] = e[n[o]];
        return t;
    }
    function f(t) {
        "?" === t.charAt(0) && (t = t.substr(1));
        for (var e, n = {}, i = t.split("&"), o = -1, r = i.length; ++o < r; ) {
            e = i[o].split("=");
            n[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
        }
        return n;
    }
    var d = new Function("return this")(), p = Object.prototype.hasOwnProperty, h = Array.isArray || function(t) {
        return t && t instanceof Array;
    }, v = function() {
        var t = (+new Date()).toString(36), e = -1;
        return function(n) {
            return (n || "") + t + ++e;
        };
    }(), m = Object.keys || function(t) {
        var e = [];
        a(t, function(t, n) {
            e.push(n);
        });
        return e;
    }, y = "function" == typeof Object.create ? function(t, e) {
        t.__super__ = e.prototype;
        t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        });
    } : function() {
        function t(t) {
            this.constructor = t;
        }
        return function(e, n) {
            e.__super__ = n.prototype;
            t.prototype = n.prototype;
            e.prototype = new t(e);
        };
    }(), g = d.console || (d.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(t) {
        g[t] || (g[t] = o);
    });
    e.extend = function(t, e) {
        for (var n = [].slice.call(arguments, 1), i = n.length, o = -1; ++o < i; ) c(t, n[o]);
        return t;
    };
    e.inherits = function(t, e, n) {
        y(t, e);
        n && c(t.prototype, n);
    };
    e.impls = function(t, n) {
        n = "function" == typeof n ? n.prototype : n;
        e.mix(t.prototype, n);
        return t;
    };
    e.parseQuery = f;
    e.parseParams = f;
    e.each = s;
    e.map = function(t, e) {
        var n = h(t) ? u : l;
        return n(t, e);
    };
    e.filter = function(t, e) {
        var n, i, o = h(t) ? (n = r, i = function(t, e) {
            o.push(e);
        }, []) : (n = a, i = function(t, e) {
            o[t] = e;
        }, {});
        n(t, function(t, n) {
            e(t, n) && i(n, t);
        });
        return o;
    };
    e.mix = function b(t, e, n, i, o) {
        for (var r in e) e.hasOwnProperty(r) && (e[r] && t[r] && n && "object" == typeof e[r] ? b(t[r], e[r], n, i, o) : (void 0 === t[r] || i) && (o && !o(t[r], e[r]) || (t[r] = e[r])));
        return t;
    };
    e.guid = v;
    e.setImmediate = function() {
        var t = d.document, e = d.postMessage, n = d.setImmediate;
        return n ? n : "onreadystatechange" in t.createElement("script") ? function(e) {
            function n() {
                i.onreadystatechange = null;
                i.parentNode.removeChild(i);
                e();
            }
            var i = t.createElement("script");
            i.onreadystatechange = n;
            t.documentElement.appendChild(i);
        } : e ? function(t) {
            function n(e) {
                if (e.data === i) {
                    d.removeEventListener("message", n, !0);
                    t();
                }
            }
            var i = v();
            d.addEventListener("message", n, !0);
            e(i, "*");
        } : function(t) {
            d.setTimeout(t, 0);
        };
    }();
    e.noop = o;
    e.throttle = function(t, e) {
        e = e ? e : 150;
        if (e === -1) return function() {
            t.apply(this, arguments);
        };
        var n;
        return function() {
            var i = +new Date();
            if (!n || i - n > e) {
                n = i;
                t.apply(this, arguments);
            }
        };
    };
    e.debounce = function(t, e, n, i) {
        var o;
        return function() {
            var r = i || this, a = arguments, s = function() {
                o = null;
                n || t.apply(r, a);
            }, u = n && !o;
            clearTimeout(o);
            o = setTimeout(s, e);
            u && t.apply(r, a);
        };
    };
    e.deprecate = function(t, e) {
        function n() {
            i || (i = !0);
            return t.apply(this, arguments);
        }
        if (d.noDeprecation === !0) return t;
        var i = !1;
        return n;
    };
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(t) {
    "use strict";
    var e = t("jquery"), n = e(window), i = e(document), o = "createTouch" in document, r = document.documentElement, a = !("minWidth" in r.style), s = !a && "onlosecapture" in r, u = "setCapture" in r, l = e.noop, c = {
        start: o ? "touchstart" : "mousedown",
        over: o ? "touchmove" : "mousemove",
        end: o ? "touchend" : "mouseup"
    }, f = o ? function(t) {
        t.touches || (t = t.originalEvent.touches.item(0));
        return t;
    } : function(t) {
        return t;
    }, d = function() {
        this.start = e.proxy(this.start, this);
        this.over = e.proxy(this.over, this);
        this.end = e.proxy(this.end, this);
        this.onstart = this.onover = this.onend = l;
    };
    d.types = c;
    d.prototype = {
        start: function(t) {
            t = this.startFix(t);
            i.on(c.over, this.over).on(c.end, this.end);
            this.onstart(t);
            return !1;
        },
        over: function(t) {
            t = this.overFix(t);
            this.onover(t);
            return !1;
        },
        end: function(t) {
            t = this.endFix(t);
            i.off(c.over, this.over).off(c.end, this.end);
            this.onend(t);
            return !1;
        },
        startFix: function(t) {
            t = f(t);
            this.target = e(t.target);
            this.selectstart = function() {
                return !1;
            };
            i.on("selectstart", this.selectstart).on("dblclick", this.end);
            s ? this.target.on("losecapture", this.end) : n.on("blur", this.end);
            u && this.target[0].setCapture();
            return t;
        },
        overFix: function(t) {
            t = f(t);
            return t;
        },
        endFix: function(t) {
            t = f(t);
            i.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            u && this.target[0].releaseCapture();
            return t;
        }
    };
    d.create = function(t, o, r) {
        r = e.extend({
            hook: null,
            onstart: l,
            onover: l,
            onend: l
        }, r);
        var a, s, u, c, f = e(t), p = r.hook ? e(r.hook) : f, h = new d(), v = d.types.start, m = t.className.replace(/^\s|\s.*/g, "") + "-drag-start", y = {
            off: function() {
                p.off(v, h.start);
            }
        };
        h.onstart = function(e) {
            var o = "fixed" === f.css("position"), l = i.scrollLeft(), d = i.scrollTop(), p = f.width(), h = f.height();
            a = 0;
            s = 0;
            u = o ? n.width() - p + a : i.width() - p;
            c = o ? n.height() - h + s : i.height() - h;
            var v = f.offset(), y = this.startLeft = o ? v.left - l : v.left, g = this.startTop = o ? v.top - d : v.top;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            f.addClass(m);
            r.onstart.call(t, e, y, g);
        };
        h.onover = function(e) {
            var n = e.clientX - this.clientX + this.startLeft, i = e.clientY - this.clientY + this.startTop, o = f[0].style;
            n = Math.max(a, Math.min(u, n));
            i = Math.max(s, Math.min(c, i));
            o.left = n + "px";
            o.top = i + "px";
            r.onover.call(t, e, n, i);
        };
        h.onend = function(e) {
            var n = f.position(), i = n.left, o = n.top;
            f.removeClass(m);
            r.onend.call(t, e, i, o);
        };
        h.off = function() {
            p.off(v, h.start);
        };
        o ? h.start(o) : p.on(v, h.start);
        return y;
    };
    return d;
});

!function(t, e) {
    if ("function" == typeof define && define.amd) define("lib/core/1.0.0/event/emitter", e); else if ("undefined" != typeof module) e(require, module.exports, module); else {
        var n = {
            exports: {}
        };
        e(null, n.exports, n);
        t.EventEmitter = n.exports;
    }
}(this, function(t, e, n) {
    "use strict";
    function i() {}
    function o(t, e, n, i) {
        var o = !0;
        if (e) for (var r, a, s, u = -1, l = {
            type: t,
            timeStamp: c()
        }; r = e[++u]; ) {
            a = r[v];
            s = r[m] || i;
            try {
                o = r[y] === h ? a.call(s, l, n) !== !1 && o : a.apply(s, n) !== !1 && o;
            } catch (f) {
                setTimeout(function() {
                    console.error(f);
                }, 1);
            }
        }
        return o;
    }
    function r(t) {
        var e, n = d(this);
        if (n) {
            e = n[t];
            return e.length;
        }
        return 0;
    }
    function a(t) {
        return "[object Function]" === Object.prototype.toString.call(t);
    }
    function s(t, e) {
        for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
    }
    function u(t, e) {
        t.forEach ? t.forEach(e) : function(t) {
            for (var n = -1, i = t.length; ++n < i; ) e(t[n], n);
        }(t);
    }
    var l = /\s+/, c = Date.now || function() {
        return +new Date();
    }, f = function() {
        return c() * Math.random() & 65535;
    }(), d = function() {
        var t, e, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (t = new WeakMap(), 
        function(e, n) {
            var i = t.get(e);
            return null === n ? void 0 !== i && t["delete"](e) : !i && n ? (t.set(e, i = {}), 
            i) : i;
        }) : (e = c(), n = "__$widΦ" + e.toString(36), t = {}, function(i, o) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === o ? i[n] && (delete t[i[n]], delete i[n]) : (r = i[n] || o && (r = ++e, 
            t[r] = {}, i[n] = r), r && t[r]);
        });
    }(), p = 1, h = 2, v = 0, m = 1, y = 2, g = function(t, e, n) {
        var i = [];
        i[v] = t;
        i[m] = e;
        i[y] = n;
        return i;
    }, b = i.prototype;
    b.addListener = function(t, e, n, i) {
        var o, r, a, s = p;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
            s = h;
        }
        if (!e) return this;
        o = d(this, 1);
        t = t.split(l);
        for (;r = t.shift(); ) {
            a = !i && o[r] || (o[r] = []);
            a.push(g(e, n, s));
        }
        return this;
    };
    b.on = b.addListener;
    b.once = function(t, e, n) {
        var i = !1, o = function() {
            this.removeListener(t, o);
            if (!i) {
                i = !0;
                e.apply(n || this, arguments);
            }
        };
        o.guid = e.guid || (e.guid = f++);
        return this.on(t, o);
    };
    b.removeListener = function(t, e, n) {
        var i, o, r, a, u, c;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
        }
        if (!(i = d(this))) return this;
        if (!(t || e || n)) {
            s(i, function(t, e) {
                delete i[e];
            });
            d(this, null);
            return this;
        }
        t = t ? t.split(l) : x(i);
        for (;o = t.shift(); ) {
            r = i[o];
            if (r) if (e || n) for (a = r.length; --a >= 0; ) {
                u = r[a];
                c = u[v];
                e && c !== e && (void 0 === c.guid || c.guid !== e.guid) || n && u[m] !== n || r.splice(a, 1);
            } else delete i[o];
        }
        return this;
    };
    b.un = b.removeListener;
    b.removeAllListeners = function(t) {
        return this.removeListener(t);
    };
    b.emit = function(t) {
        var e, n, i, r, a, s, u = [], c = !0;
        if (!(e = d(this))) return this;
        t = t.split(l);
        for (a = 1, s = arguments.length; a < s; a++) u[a - 1] = arguments[a];
        for (;n = t.shift(); ) {
            (i = e.all) && (i = i.slice());
            (r = e[n]) && (r = r.slice());
            "all" !== n && (c = o(n, r, u, this) && c);
            c = o(n, i, [ n ].concat(u), this) && c;
        }
        return c;
    };
    i.applyTo = function(t) {
        function e(e, i) {
            t[e] = function() {
                var o = n[e].apply(i || t, Array.prototype.slice.call(arguments));
                return o === i ? this : o;
            };
        }
        var n = b, i = x(n);
        a(t) ? u(i, function(e) {
            t.prototype[e] = n[e];
        }) : u(i, function(t) {
            e(t);
        });
    };
    i.listenerCount = function(t, e) {
        return "function" == typeof t.listenerCount ? t.listenerCount(e) : r.call(t, e);
    };
    b.listenerCount = r;
    var x = Object.keys || function(t) {
        var e = [];
        s(t, function(t, n) {
            e.push(n);
        });
        return e;
    };
    n.exports = i;
});

define("lib/core/1.0.0/dom/delegator", [ "require", "exports", "module", "jquery", "../event/emitter" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n, i, r, a = e.currentTarget, s = o(a), u = (e.handleObj || 0).origType || e.type;
        if (!e.isPropagationStopped()) {
            if (!s.attr("disabled") && (n = s.attr("action-type"))) {
                i = s.attr("action-data");
                e.action = n;
                e.data = i;
                r = t.e.emit(u + l + n, e, a);
                e.actionValue = r;
                if (r === !1) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
            t.opts.onDelegate(e);
            return r;
        }
    }
    var o = t("jquery"), r = t("../event/emitter"), a = /\S+/g, s = -1, u = (+new Date()).toString(36), l = "/", c = function() {
        return u + ++s;
    }, f = function(t, e) {
        var n = t.guid || (t.guid = c()), i = function(n, i) {
            return t.call(e || i, n);
        };
        i.guid = n;
        return i;
    }, d = function() {}, p = function(t, e) {
        return "function" == typeof t ? t : e;
    }, h = function(t, e) {
        e = e || {};
        "string" == typeof t && (t = o(t)[0]);
        var n = {}, s = {}, u = new r(), c = e.context, h = {
            o: n,
            opts: e,
            e: u
        }, v = function(t) {
            return i(h, t);
        };
        e.onDelegate = p(e.onDelegate, d);
        n.on = function(e, n, i) {
            if ("function" == typeof n) {
                i = n;
                n = e;
                e = "click";
            }
            if ("function" != typeof i) throw Error("The delegate handler should be a valid function");
            n = (n || "").match(a) || [];
            for (var r = n.length; r--; ) {
                if (!s[e]) {
                    s[e] = 1;
                    o(t).on(e, "[action-type]", v);
                }
                u.on(e + l + n[r], f(i, c));
            }
            return this;
        };
        n.un = function(e, n, i) {
            if ("function" == typeof n || !n) {
                i = n;
                n = e;
                e = "click";
            }
            n = (n || "").match(a) || [];
            var r, s = n.length;
            for (o(t); s--; ) {
                r = e + l + n[s];
                u.un(r, i);
            }
            return this;
        };
        n.fire = function(e, n) {
            if (!n) {
                n = e;
                e = "click";
            }
            var i = o('[action-type="' + n + '"]', t)[0] || document, r = new o.Event(e);
            r.currentTarget = r.target = i;
            u.emit(e + l + n, r, i);
        };
        n.destroy = function() {
            var i = o(t);
            o.each(s, function(t, e) {
                delete s[t];
                i.off(t, "[action-type]", v);
            });
            u.un();
            for (var r in n) delete n[r];
            u = void 0;
            e = void 0;
            s = i = t = void 0;
            v = null;
        };
        return n;
    };
    n.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return l("<" + t + "/>")[0];
    }
    function o(t, e, n) {
        t.insertRule ? t.insertRule(e + " {" + n + "}", 0) : t.addRule(e, n, 1);
    }
    function r() {
        var t, e, n, i, o, a = "";
        t = document.body || document.documentElement;
        n = t.style;
        i = "Transition";
        o = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        e = 0;
        for (;e < o.length; ) {
            if (void 0 !== n[o[e] + i]) {
                a = o[e];
                break;
            }
            e++;
        }
        r = function() {
            return a;
        };
        return a;
    }
    function a() {
        var t = r();
        return t ? "-v-".replace("v", t.toLowerCase()) : "";
    }
    function s(t) {
        return "number" == typeof t ? t : {
            fast: 200,
            normal: 500,
            slow: 1e3
        }[t] || 500;
    }
    function u(t, e, n, i, o) {
        var r, a, u = l(t), c = arguments, o = "boolean" == typeof c[c.length - 1] && c[c.length - 1], h = !1, v = function() {
            m();
        }, m = function(t) {
            h || y(!0);
        }, y = function(t) {
            if (!h) {
                h = !0;
                m = f;
                u.off(g, v);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                u.removeClass(a);
                t && i();
                u = null;
            }
        };
        if ("function" == typeof n) {
            i = n;
            n = void 0;
        }
        i = i || f;
        if (p) {
            n = n || "normal";
            e = e || "shake";
            a = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + e ].join(" ");
            u.on(g, v);
            r = setTimeout(v, s(n) + 100);
            o === !0 ? d(function() {
                u.addClass(a);
            }) : u.addClass(a);
        } else d(function() {
            i && i();
        });
        return {
            stop: function() {
                y.apply(null, arguments);
                return this;
            }
        };
    }
    var l = t("jquery"), c = t("./util"), f = (c.each, c.noop), d = c.setImmediate, p = a(), h = /\-v\-/g, v = document.getElementsByTagName("head")[0].appendChild(i("style")), m = v.sheet || v.styleSheet, y = {
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
    c.each(y, function(t, e) {
        t && o(m, e, t.replace(h, p));
    });
    e.effect = u;
    e.getVendorPrefix = r;
});

define("lib/ui/box/1.0.1/popup", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/utils/css", "../../../core/1.0.0/event/emitter" ], function(t, e, n) {
    "use strict";
    function i(t) {
        var e = this, n = {
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
        e._ = t = x(n, t);
        t.fixed = !!t.fixed && C();
        var r = o('<div class="' + v + '" id="' + (t.id || b()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(t.html), a = o("<div />");
        e._popup = r;
        e._mask = e._shadow = a;
        e.node = r[0];
        e.mask = a[0];
        e.on("render", function(t) {
            var n, o = t.className, a = e._mask, s = t.zIndex;
            r.html() || r.html(t.html);
            o && r.addClass(o);
            r.css("position", t.fixed ? "fixed" : "absolute");
            s && r.css("zIndex", s);
            if (t.modal) {
                r.addClass(v + "-modal");
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
                C() || x(n, {
                    position: "absolute",
                    width: c.width() + "px",
                    height: f.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", w(e.focus, e));
                e._shadow = a.clone(!0);
                a.css(n).addClass(v + "-mask");
            }
        });
        e.on("beforeShow", function(t) {
            var n = e.anchor, i = e._dirClass;
            if (!n && i) {
                r.removeClass(i);
                delete e._dirClass;
            }
        });
        e.on("show", function(t) {
            e.resize();
            if (t.modal) {
                e._mask.insertBefore(r).css("display", "block");
                e._shadow.insertAfter(r);
            }
            t.autofocus && e.focus();
        });
        e.on("hide", function(t) {
            e._mask.remove();
            e._shadow.remove();
            e.blur();
        });
        e.once("destroy", function() {
            r.off();
            r = null;
            e._mask.off();
            e._shadow.off();
        });
        if (!h) {
            var s = w(e.resize, e);
            e.on("render", function() {
                c.on("resize", s);
            });
            e.on("destroy", function() {
                c.off("resize", s);
            });
        }
        e.destroyed = !1;
        e.initialized = !0;
    }
    var o = t("jquery"), r = t("../../../core/1.0.0/utils/util"), a = t("../../../core/1.0.0/utils/css"), s = t("../../../core/1.0.0/event/emitter"), u = window, l = u.document, c = o(u), f = o(l), d = l.documentElement, p = /\S+/g, h = !("minWidth" in d.style), v = "ui-layer", m = u.Math, y = m.max, g = m.ceil, b = r.guid, x = r.extend, _ = r.each, w = function(t, e) {
        return t.bind ? t.bind(e) : function() {
            return t.apply(e, arguments);
        };
    }, A = r.setImmediate, k = function(t) {
        return u.parseInt(t, 10) || 0;
    }, T = function(t) {
        return t && 1 === t.nodeType;
    }, C = function() {
        return C._ || (C._ = function() {
            var t = l.createElement("div"), e = t.cloneNode(!1), n = !1, i = l.body || function() {
                n = !0;
                return d.appendChild(l.createElement("body"));
            }();
            t.style.cssText = "position:fixed;top:42px";
            i.appendChild(t);
            i.appendChild(e);
            var o = t.offsetTop !== e.offsetTop;
            i.removeChild(t);
            i.removeChild(e);
            n && d.removeChild(i);
            t = e = null;
            return o;
        }());
    }, j = function() {
        return {
            x: f.scrollLeft(),
            y: f.scrollTop()
        };
    }, z = function(t) {
        return {
            w: t.width(),
            h: t.height()
        };
    }, E = function() {
        return z(c);
    }, I = function(t) {
        var e = T(t), n = e ? o(t).offset() : {
            left: t.pageX,
            top: t.pageY
        };
        t = e ? t : t.target;
        var i = t.ownerDocument;
        if (i === u.document) return n;
        var r = i.defaultView || i.parentWindow, a = r.frameElement, s = j(), l = o(a).offset();
        return {
            left: n.left + l.left - s.x,
            top: n.top + l.top - s.y
        };
    }, q = function(t, e) {
        if (t.length) {
            var n = k(t.css(e)) || t[0]["offset" + e.charAt(0).toUpperCase() + e.slice(1)], i = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            _(i[e], function(e, i) {
                n += k(t.css("margin-" + e), 10) || 0;
            });
            return n;
        }
        return 0;
    }, D = function(t) {
        return q(t, "width");
    }, L = function(t) {
        return q(t, "height");
    }, N = function() {
        try {
            var t = l.activeElement, e = t.contentDocument;
            return e && e.activeElement || t;
        } catch (n) {}
    }, O = function(t) {
        t = t || "";
        var e = {
            auto: !0
        }, n = t.slice(-1);
        if ("!" === n) {
            e.auto = !1;
            t = t.slice(0, -1);
        }
        for (var i, t = t.length <= 2 ? t.split("") : t.replace(/^\s+|\s+$/g, "").split(" ").slice(0, 2), o = {}, r = {
            t: "t",
            b: "t",
            l: "l",
            r: "l"
        }, a = -1, s = t.length; ++a < s; ) {
            i = t[a].charAt(0);
            if (!i || o[r[i]]) t.splice(a, 1); else {
                t[a] = i;
                o[r[i]] = 1;
            }
        }
        2 === t.length && t[0] === t[1] && t.pop();
        e.align = t;
        return e;
    };
    r.inherits(i, s, {
        open: !1,
        destroyed: !0,
        node: null,
        mask: null,
        emit: function(t) {
            for (var e = (t || "").match(p) || [], n = e.length; n--; ) {
                var o = this["on" + e[n]], r = Array.prototype.slice.call(arguments, 1);
                "function" == typeof o && o.apply(this, r);
            }
            i.__super__.emit.apply(this, arguments);
        },
        $: function(t, e) {
            var n = this._nodes || (this._nodes = {}), i = n[t];
            if (!i || e && 0 === i.length) {
                i = this._popup.find('[node-type="' + t + '"]');
                e && i.length > 0 && (n[t] = i);
            }
            return !e || i.length ? i : null;
        },
        show: function(t, e) {
            var n, i = this, o = i._, r = t, s = null, u = i._anim;
            u && u.stop(!0);
            if (i.destroyed || o.showing || i.open) return i;
            e = x({}, i._, e);
            if (void 0 !== r) {
                n = typeof r;
                "boolean" === n ? e.modal = r : r && "object" === n && (T(r) || T(r.target) ? s = r : x(e, r));
            }
            var l = i._popup, c = e.showWithAni, f = function() {
                delete o.showing;
                i.emit("shown");
            };
            if (!i._ready) {
                i.emit("render", e);
                i._ready = !0;
            }
            i.open = !0;
            i.anchor = s;
            i._activeElement = N();
            i.emit("beforeShow", e);
            l.appendTo(e.appendTo).css("display", "block");
            i.emit("show", e);
            o.showing = !0;
            if (c && "none" !== c) {
                var d = c.split(":");
                i._anim = a.effect(i.node, d[0], d[1], f);
            } else f();
            return i;
        },
        hide: function(t) {
            var e, n = this, i = n._, o = n.node, r = i.hideWithAni, s = n._anim;
            s && s.stop(!0);
            if (n.destroyed || i.hidding || !n.open) return n;
            n.emit("beforeHide");
            i.hidding = !0;
            e = function() {
                if (i.hidding === !0) {
                    o.parentNode.removeChild(o);
                    n._popup.hide();
                    delete i.hidding;
                    n.open = !1;
                    n.emit("hidden");
                    (t || i.autoRelease) && n.destroy();
                }
            };
            if (r && "none" !== r) {
                var u = r.split(":");
                n._anim = a.effect(o, u[0], u[1], e);
                n.emit("hide");
            } else {
                n.emit("hide");
                A(e);
            }
            return n;
        },
        destroy: function() {
            var t = this;
            if (t.destroyed) return t;
            t.emit("beforeremove");
            i.current === t && (i.current = null);
            t._popup.off().remove();
            t._mask.off().remove();
            t._shadow.off().remove();
            t.emit("destroy");
            t.removeAllListeners();
            _(t, function(e, n) {
                delete t[n];
            });
            t._ = {};
            t.destroyed = !0;
            return t;
        },
        resize: function() {
            var t = this._;
            if (this.open && this._ready && !t.showing && !this._freezing) {
                var e = this.anchor;
                e ? this.alignTo(e) : this.center();
                this.emit("resize");
            }
            return this;
        },
        _freeze: function(t) {
            this._freezing = !!t;
            return this;
        },
        focus: function(t) {
            var e = this._, n = this.node, r = this._popup, a = i.current, s = e.zIndex;
            a && a !== this && a.blur(!1);
            if (!o.contains(n, N())) {
                var u = r.find("[autofocus]")[0];
                !e.focusing && u ? e.focusing = !0 : u = n;
                this._focus(u);
            }
            if (void 0 === s) {
                s = e.zIndex = i.zIndex++;
                r.css("zIndex", s);
                r.addClass(v + "-focus");
            }
            i.current = this;
            this.emit("focus");
            return this;
        },
        blur: function() {
            var t = this._, e = arguments[0], n = this._activeElement;
            if (!n) return this;
            e !== !1 && this._focus(n);
            delete t.focusing;
            delete this._activeElement;
            this._popup.removeClass(v + "-focus");
            this.emit("blur");
            return this;
        },
        _focus: function(t) {
            if (t && this._.autofocus && !/^iframe$/i.test(t.nodeName)) try {
                t.focus();
            } catch (e) {}
        },
        center: function() {
            var t = this._popup, e = this._.fixed, n = j(), i = E(), o = z(t), r = e ? 0 : n.x, a = e ? 0 : n.y, s = (i.w - o.w) / 2 + r, u = .382 * (i.h - o.h) + a;
            t.css({
                left: y(k(s), r),
                top: y(k(u), a)
            });
            return this;
        },
        alignTo: function(t, e) {
            var n = this, i = n._, r = n._popup, a = t.parentNode && o(t);
            if (!a) return n;
            var s = a.offset();
            if (s.left * s.top < 0) return n.center();
            e = e || i.align;
            var u = O(e), l = u.align, c = !u.auto;
            l && l.length || (l = [ "b" ]);
            var f = n._dirClass;
            f && r.removeClass(f);
            var d = i.fixed, p = E(), h = j(), m = D(r), y = L(r), b = I(t), x = D(a), w = L(a), A = b.left, T = b.top, C = d ? A - h.x : A, z = d ? T - h.y : T, q = d ? 0 : h.x, N = d ? 0 : h.y, S = q + p.w - m, U = N + p.h - y, $ = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, P = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, M = {}, R = [ {
                t: z - y,
                b: z + w,
                l: C - m,
                r: C + x
            }, {
                t: z,
                b: z - y + w,
                l: C,
                r: C - m + x
            } ], W = {
                l: C + g((x - m) / 2),
                t: z + g((w - y) / 2)
            }, G = {
                left: [ q, S ],
                top: [ N, U ]
            };
            c || _(l, function(t, e) {
                R[e][t] > G[P[t]][1] && (t = l[e] = $[t]);
                R[e][t] < G[P[t]][0] && (l[e] = $[t]);
            });
            var F = l[0];
            if (!l[1]) {
                l[1] = "left" === P[F] ? "t" : "l";
                R[1][l[1]] = W[l[1]];
            }
            R[0][F] = R[0][F] + 10 * ("tl".indexOf(F) !== -1 ? -1 : 1);
            M[P[l[0]]] = k(R[0][l[0]]);
            M[P[l[1]]] = k(R[1][l[1]]);
            var H = v + "-" + F;
            r.css(M).addClass(H);
            n._dirClass = H;
            var B = n.$("arrow", 1), X = n.$("inner", 1);
            if (!B) {
                if (!X) return n;
                B = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(X);
            }
            var Y, V, Q = "top" !== P[F], J = [ "v", "h" ][1 ^ Q], Z = D(B), K = L(B), tt = {}, et = Q ? "left" : "top";
            switch (J) {
              case "h":
                Y = g(A + (x - Z) / 2);
                tt.left = Y;
                break;

              case "v":
                V = g(T + (w - K) / 2);
                tt.top = V;
            }
            B.offset(tt).css(et, "");
            return n;
        }
    });
    i.zIndex = 1024;
    i.current = null;
    n.exports = i;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../../../core/1.0.0/utils/util"), r = t("../../../core/1.0.0/dom/delegator"), a = t("./popup"), s = o.extend, u = o.guid, l = o.each, c = window.document, f = {
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
    }, d = {}, p = function(t) {
        var e = t || (t = {}), n = t.id || t.id || u(), o = p.get(n) || this;
        "string" != typeof t && 1 !== t.nodeType || (t = {
            content: t
        });
        t = s({}, f, t);
        t.original = e;
        var r, a = t.button || (t.button = []);
        if (!i.isArray(r = a)) {
            r = [];
            a && "object" == typeof a && l(a, function(t, e) {
                t.id = e;
                r.push(t);
            });
            a = t.button = r;
        }
        if (a.length > 0) {
            var c = !1;
            l(a, function(e, n) {
                var i = e.id || u();
                e.autofocus && (c = !0);
                t[i] && s(e, t[i]);
                e.index = n;
            });
            c || (a[a.length - 1].autofocus = !0);
        }
        o.emit("init", t);
        o.initialized ? o.options(t).focus() : o.init(t);
        d[n] = o;
        return o;
    };
    o.inherits(p, a, {
        init: function(t) {
            var e = this;
            a.call(e, t);
            var n = function(t) {
                var n = t.actionValue === !1 || t.isDefaultPrevented();
                n || e.hide();
            };
            e._delegator = new r(e.node, {
                context: e,
                onDelegate: n
            });
            e.delegate("close", function(t) {
                e.hide();
            }).once("render", function() {
                e.initComponents();
            }).on("destroy", function() {
                delete d[t.id];
                e._delegator.destroy();
            });
        },
        options: function(t) {
            var e = this, t = s(e._, t);
            e._freeze(!0);
            l([ "title", "content", "width", "height", "action", "button" ], function(n, i) {
                i = t[n];
                null != i && "function" == typeof e[n] && e[n](i);
            });
            e._freeze(!1).resize();
            t.zIndex && (a.zIndex = t.zIndex);
            return e;
        },
        initComponents: function() {
            var t = this, e = t._;
            t.$("header").hide();
            t.$("footer").hide();
            t.options();
            e.close || t.$("close").css("display", "none");
            e.clickBlankToHide && i(t.mask).on("onmousedown" in c ? "mousedown" : "click", function() {
                t.hide();
                return !1;
            });
            var n = function(e) {
                var n = e.target, i = n.nodeName, o = /^input|textarea$/i, r = a.current === t, s = e.keyCode;
                !r || o.test(i) && "button" !== n.type || 27 === s && t.hide();
            };
            i(c).on("keydown", n);
            t.on("destroy", function() {
                i(c).off("keydown", n);
            });
        },
        delegate: function(t, e, n) {
            var i = this._delegator;
            i.on.apply(i, arguments);
            return this;
        },
        undelegate: function(t, e, n) {
            var i = this._delegator;
            i.un.apply(i, arguments);
            return this;
        },
        content: function(t) {
            var e = this.$("content");
            if (t && t.nodeType) {
                i.contains(c, t) && this.on("beforeremove", function() {
                    i("body").append(t.hide());
                });
                t = i(t);
                e.empty().append(t.show());
            } else e.html(t);
            return this.resize();
        },
        title: function(t) {
            this.$("title").html(t);
            this.$("header")[t ? "show" : "hide"]();
            return this;
        },
        width: function(t) {
            if ("" !== t) {
                this.$("content").css("width", t);
                this.resize();
            }
            return this;
        },
        height: function(t) {
            if ("" !== t) {
                this.$("content").css("height", t);
                this.resize();
            }
            return this;
        },
        button: function(t) {
            t = t || [];
            var e = this, n = e._, i = "", o = 0, r = n.buttonClass;
            if ("string" == typeof t) {
                i = t;
                o++;
            } else l(t, function(t, a) {
                var s = t.id, u = t.fn || t.callback, l = t.display !== !1, c = t.className || r, f = [ c ];
                t.autofocus && f.push(n.buttonClassLight);
                "function" == typeof u && e.delegate(s, u);
                l && o++;
                i += '<button type="button" action-type="' + s + '"' + (l ? "" : ' style="display:none"') + (' class="' + f.join(" ") + '"') + (t.disabled ? " disabled" : "") + ">" + (t.text || t.value) + "</button>";
            });
            e.$("button").html(i);
            e.$("footer")[o ? "show" : "hide"]();
            e.resize();
            return e;
        },
        action: function(t) {
            var e = this;
            l(t, function(t, n) {
                e.delegate(n, t);
            });
            return e;
        }
    });
    p.getCurrent = function() {
        return a.current;
    };
    p.get = function(t) {
        return void 0 === t ? d : d[t];
    };
    p.config = function(t) {
        t && s(f, t);
    };
    n.exports = p;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../../../core/1.0.0/utils/util"), r = t("./drag"), a = t("./dialog"), s = o.each, u = o.extend, l = window.clearTimeout, c = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var t = i('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + c + '"</i>').appendTo("body");
        setTimeout(function() {
            t.remove();
            t = null;
        }, 50);
    }();
    var f = {
        info: "&#x69;",
        warn: "&#x21;",
        confirm: "&#x3f;",
        ok: "&#x2714;",
        error: "&#x2718;",
        loading: '<img src="' + c + '" />'
    }, d = function(t) {
        var e = f[t];
        return e ? '<i node-type="icon" class="x-icon ui-box-iconf">' + e + "</i>" : "";
    }, p = o.guid("__x") + "$", h = function(t) {
        return p + t;
    }, v = function(t, e) {
        var n, i = e.xtype, o = i && d(i) || e.iconHTML;
        if (o) {
            n = t ? '<div node-type="text" class="x-text">' + t + "</div>" : "";
            t = [ '<div class="ui-box-x-wrap">', o, n, "</div>" ].join("");
        }
        return t;
    }, m = function(t) {
        var e = t.contentWindow;
        if (e) try {
            return e.document;
        } catch (n) {
            return 0;
        }
    }, y = function(t) {
        var e;
        t.once("init", function(n) {
            var i = {};
            s([ "title", "width", "height", "button" ], function(t) {
                i[t] = n[t];
                delete n[t];
            });
            t.once("load", function() {
                var n = t._;
                s(i, function(i, o) {
                    if (i) if ("title" === o) {
                        if ("auto" === i) try {
                            i = e.contentWindow.document.title || "";
                        } catch (r) {
                            i = "";
                        }
                        i && t.title(i);
                    } else "function" == typeof t[o] ? t[o](i) : n[o] = i;
                });
            });
        }).once("render", function() {
            var n = t._;
            setTimeout(function() {
                e = g(t, n.url);
                t.iframeNode = e;
            }, 30);
            var o = n.original;
            if (!(o instanceof Object)) for (var r = function() {
                t.hide().destroy();
            }, a = 0; a < frames.length; a++) try {
                if (o instanceof frames[a].Object) {
                    i(frames[a]).one("unload", r);
                    break;
                }
            } catch (s) {}
        }).once("beforeremove", function() {
            i(e).attr("src", "about:blank").remove();
        }, !1);
    }, g = function(t, e) {
        var n = t._, o = t.$("content"), r = o.find("iframe"), a = r && r[0], s = function(e) {
            t._freeze(!0);
            if (e) {
                n.width || t.width(e.width);
                n.height || t.height(e.height);
            }
            t.emit("load");
            t._freeze(!1).resize();
            s = null;
            r.removeAttr("style");
            r = a = null;
        }, u = function(e) {
            n.showing ? t.once("shown", e) : e();
        };
        if (!r.length) {
            var l = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), c = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (l ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + e + '"></iframe>';
            r = i(c.replace(/{id}/g, n.id)).appendTo(o);
            a = r[0];
            n.autoSize ? r.one("load", function() {
                var t, e, n, o = m(a), l = o && i(o);
                if (l) {
                    t = l.width();
                    r.width(t);
                    e = l.height();
                    n = {
                        width: t,
                        height: e
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
    }, b = function(t) {
        var e = this;
        t = u({}, t);
        var n = t.button || (t.button = []);
        s([ "cancel", "ok" ], function(e, i) {
            var o = t[e];
            if (o && "object" == typeof o) {
                o.id = e;
                n.push(o);
                delete t[e];
            }
        });
        var o = t.xtype;
        if (o) {
            t.id = t.id || h(o);
            t.content = v(t.content, t);
            "none" !== o && (t.className = (t.className || "") + " ui-box-x-" + o);
        } else {
            var l = t.url;
            if (l) {
                var c = t.close !== !1;
                t = u({
                    modal: !0,
                    close: !1,
                    autoRelease: !0,
                    autoSize: !0,
                    scrolling: "auto"
                }, t);
                var f = i(v("Loading...", {
                    xtype: "loading"
                })).addClass("ui-box-x-loading");
                t.content = f;
                t.className = (t.className || "") + " ui-box-iframe";
                e.once("load", function() {
                    f.remove();
                    f = null;
                    c && e.$("close").show();
                });
                e.on("hidden", function() {
                    e.destroy();
                });
                y(e);
            }
        }
        e = a.call(e, t) || e;
        e._ready || e.once("render", function() {
            var n = e.$("title");
            if (n.length && t.drag !== !1) {
                n.css("cursor", "move");
                r.create(e.node, null, {
                    hook: n,
                    onstart: function() {
                        e.anchor || e.focus();
                    }
                });
            }
        });
        return e;
    }, x = "__showDelay", _ = "__hideTimer";
    o.inherits(b, a, {
        show: function(t, e) {
            var n = this, i = n._, r = [].slice.call(arguments), e = u({}, i, e), a = e.duration || 0, s = e.delay || 0, c = function() {
                o.each([ x, _ ], function(t, e) {
                    e = i[t];
                    delete i[t];
                    e && l(e);
                });
            }, f = function() {
                if (a > 0) {
                    i[_] = setTimeout(function() {
                        c();
                        n.hide();
                    }, a);
                    n.once("hide", c);
                }
                b.__super__.show.apply(n, r);
            };
            c();
            s > 0 ? i[x] = setTimeout(f, s) : f();
            return n;
        },
        hide: function() {
            var t = this, e = t._;
            e && o.each([ x, _ ], function(t, n) {
                n = e[t];
                delete e[t];
                n && l(n);
            });
            b.__super__.hide.apply(t, arguments);
            return t;
        }
    });
    b.config = a.config;
    b.get = function(t) {
        if (t) {
            var e, n, i = a.get();
            if (t && (e = t.frameElement)) for (var o in i) if (i.hasOwnProperty(o)) {
                n = i[o];
                if (n.iframeNode === e) return n;
            }
            return i[t];
        }
    };
    n.exports = b;
});

define("lib/ui/box/1.0.1/box", [ "require", "exports", "module", "./messagebox", "../../../core/1.0.0/utils/util" ], function(t, e, n) {
    "use strict";
    var i = t("./messagebox"), o = t("../../../core/1.0.0/utils/util"), r = function() {}, a = o.mix, s = function(t, e) {
        var n = function(t, e) {
            return void 0 !== e && null !== e && "" !== e && !("number" == typeof e && isNaN(e));
        };
        return function(t, e) {
            return a(t, e, !0, !0, n);
        };
    }(), u = function(t) {
        return !!(t && t.nodeType && t.tagName);
    }, l = o.guid, c = function() {
        return l("__0x$");
    }, f = function(t) {
        var e, n = t[1] || {};
        e = t[0];
        e && ("string" == typeof e ? n.html = e : "object" == typeof e && (n = e));
        var i = n.skin;
        if (i) {
            n.className = i;
            delete n.skin;
        }
        return n;
    }, d = function(t, e) {
        var e = f([ t, e ]);
        return new i(e);
    }, p = function(t, e, n) {
        if ("object" == typeof t) {
            n = e;
            e = t;
            t = "";
        } else if (u(e)) {
            n = e;
            e = {};
        } else "number" == typeof e && (e = {
            duration: e
        });
        e = e || {};
        var i = d(s({
            id: c(),
            content: t,
            className: "ui-bubble",
            autofocus: !1,
            autoRelease: !0,
            close: !1,
            xtype: "none",
            align: "top",
            duration: 2e3,
            hideWithAni: "fadeOut",
            showWithAni: "fadeInUp"
        }, e));
        return e.hide ? i : i.show(n);
    }, h = {
        create: d,
        loadUrl: function(t, e) {
            e = e || {};
            e.url = t;
            var n = d(e);
            return n.show();
        },
        loading: function(t, e) {
            e = e || {};
            var n = d(s({
                autofocus: !0,
                autoRelease: !0,
                id: c(),
                modal: !0,
                close: !1,
                xtype: "loading",
                content: t || ""
            }, e));
            return e.hide ? n : n.show();
        },
        alert: function(t, e) {
            "function" == typeof e && (e = {
                ok: {
                    fn: e
                }
            });
            e = s({
                title: "提示",
                xtype: "info",
                className: "ui-box-alert",
                autofocus: !0,
                id: c(),
                modal: !0,
                autoRelease: !0,
                content: "<div>" + t + "</div>",
                ok: {
                    text: "确定",
                    fn: function() {}
                }
            }, e);
            return d(e).show();
        },
        confirm: function(t, e, n, i) {
            var o;
            if (!i && n && "object" == typeof n) {
                u(n) ? i = n : o = n;
                n = e;
            }
            if ("function" != typeof e) {
                o = e;
                e = r;
            }
            "function" != typeof n && (n = e);
            var a = function(t) {
                t ? e(t) : n(t);
            };
            o && (i = i || o.sender);
            var l = d(s({
                xtype: "confirm",
                autofocus: !0,
                id: c(),
                modal: !i,
                autoRelease: !0,
                content: "<div>" + t + "</div>",
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
            return l.show(i);
        },
        bubble: p
    };
    h.tips = h.bubble;
    o.each([ "ok", "info", "warn", "error" ], function(t, e) {
        h[t] = function(e, n, i) {
            var o = {
                xtype: t
            };
            if (n && n.nodeType) {
                i = n;
                n = void 0;
            } else "number" == typeof n ? o.duration = n : o = s(o, n);
            return p(e, o, i);
        };
    });
    h.get = i.get;
    h.config = i.config;
    n.exports = h;
});

define("lib/ui/slider/3.0.4/slider", [ "jquery" ], function(t) {
    "use strict";
    return function(t, e, n, i) {
        function o() {
            if (o.result !== i) return o.result;
            var t, e, r, a, s, u = !1;
            t = n.body || n.documentElement;
            r = t.style;
            a = "Transition";
            s = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
            e = 0;
            for (;e < s.length; ) {
                if (r[s[e] + a] !== i) {
                    u = s[e];
                    break;
                }
                e++;
            }
            return o.result = u;
        }
        function r(t) {
            var e = n.body || n.documentElement;
            if (t in e.style) return t;
            var i = t.charAt(0).toUpperCase() + t.substr(1);
            return o() + i;
        }
        function a(e, n) {
            this.element = t(e);
            this.options = t.extend(!0, {}, s, n);
            this.data = t.data(this);
            this._defaults = s;
            this._control = null;
            this._slides = [];
            this.init();
        }
        "function" != typeof t.data && (t.data = function(e, n, i) {
            return t(e).data(n, i);
        });
        var s, u = e.setTimeout, l = e.clearTimeout, c = "undefined" != typeof TouchEvent, f = r("transition"), d = (r("transform"), 
        r("perspective")), p = function(t, e, n, i) {
            var o;
            return function() {
                var r = i || this, a = arguments, s = function() {
                    o = null;
                    n || t.apply(r, a);
                }, c = n && !o;
                l(o);
                o = u(s, e);
                c && t.apply(r, a);
            };
        }, h = function() {
            var e = /[-_]\D/g, n = function(t) {
                return t.charAt(1).toUpperCase();
            }, o = function(t) {
                return t.replace(e, n);
            }, a = {
                duration: 1,
                delay: 1,
                timingFunction: 1
            }, s = {
                transform: d ? function(t) {
                    if ("string" == typeof t) return t;
                    t.x = t.x || 0;
                    t.y = t.y || 0;
                    t.z = t.z || 0;
                    return "translate3d(" + t.x + "px, " + t.y + "px, " + t.z + "px)";
                } : function(t) {
                    if ("string" == typeof t) return t;
                    t.x = t.x || 0;
                    t.y = t.y || 0;
                    return "translate(" + t.x + "px, " + t.y + "px)";
                }
            };
            return function(e, n, u, l) {
                e = t(e);
                l = l === i || l;
                if ("boolean" == typeof u) {
                    l = u;
                    u = null;
                }
                var c = e[0].style, f = [], d = {}, p = function(t) {
                    t = o(t);
                    a[t] && (t = "transition" + t.charAt(0).toUpperCase() + t.substr(1));
                    return r(t);
                }, h = function(t, e) {
                    s[t] && (e = s[t](e));
                    t = p(t);
                    c[t] = e;
                    f.push(t);
                };
                if (u || l) {
                    var v = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";
                    e.on(v, function g(t) {
                        e.off(v, g);
                        var n = f.length;
                        u && u(t);
                        if (l) for (;n--; ) c[f[n]] = "";
                    });
                }
                for (var m in n) if (n.hasOwnProperty(m)) {
                    d[m] = 1;
                    h(m, n[m]);
                }
                var y = "timing-function";
                d.duration && !d[y] && h(y, "ease-in-out");
            };
        }(), v = function(e, n) {
            e = e || {};
            var i = t(e), o = Array.prototype.slice;
            n = n || e.name;
            t.each({
                on: "on",
                un: "off",
                once: "one",
                emit: "trigger"
            }, function(t, r) {
                e[t] = function(e) {
                    var a = o.call(arguments, 0), s = a[1];
                    n && !~e.indexOf(".") && (a[0] = e + "." + n);
                    "function" == typeof s && ("on" === t ? a[1] = s.__ || (s.__ = function(t) {
                        return s.apply(this, o.call(arguments, 1));
                    }) : "un" === t && (a[1] = s.__));
                    return i[r].apply(i, a);
                };
            });
            return e;
        }, m = "slider";
        s = {
            width: 940,
            height: 528,
            autoScale: !1,
            start: 0,
            cls: {
                item: "ui-slider-slide",
                active: "ui-slider-i-on"
            },
            lazyLoad: {
                enable: !0,
                attr: "data-src",
                loadingClass: "ui-slider-img-loading"
            },
            navigation: {
                arrows: !0,
                toggleOnHover: !1,
                effect: "slide",
                nextArrow: '<a href="#" class="ui-slider-navigation ui-slider-next" title="Next">Next</a>',
                prevArrow: '<a href="#" class="ui-slider-navigation ui-slider-prev" title="Previous">Previous</a>'
            },
            pagination: {
                active: !0,
                effect: "slide"
            },
            play: {
                active: !1,
                effect: "slide",
                interval: 5e3,
                auto: !1,
                swap: !0,
                pauseOnHover: !0,
                restartDelay: 2500
            },
            effect: {
                slide: {
                    speed: 500
                },
                fade: {
                    speed: 300,
                    crossfade: !0
                }
            },
            callback: {
                loaded: function() {},
                start: function() {},
                complete: function() {}
            }
        };
        t.extend(a.prototype, {
            init: function() {
                var n, i, o, r, a, s, u = this, l = u.element, f = u.options, d = u.data;
                d.animating = !1;
                d.total = s = l.children().not(".ui-slider-navigation", l).length;
                d.current = f.start;
                c && (f.effect.slide.speed = f.effect.slide.speed / 2);
                v(u, "slide");
                l.css({
                    overflow: "hidden"
                }).addClass("ui-slider");
                l.children().not(".ui-slider-navigation", l).wrapAll('<div class="ui-slider-container">', l).parent().css({
                    overflow: "hidden",
                    position: "relative"
                });
                t(".ui-slider-container", l).wrapInner('<div class="ui-slider-control">', l);
                var h = u._control = t(".ui-slider-control", l), m = u._slides = h.children();
                h.css({
                    position: "relative",
                    left: 0
                });
                m.addClass(f.cls.item).css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 0,
                    display: "none",
                    webkitBackfaceVisibility: "hidden"
                }).each(function(e, n) {
                    t(n).attr("data-slide-idx", e);
                });
                l.show();
                u.update();
                f.lazyLoad.enable && u.lazyLoad().on("slide", function(t, e) {
                    u.lazyLoad();
                });
                if (c) {
                    u._setuptouch();
                    h.on("touchstart", function(t) {
                        u._touchstart(t);
                    }).on("touchmove", function(t) {
                        u._touchmove(t);
                    }).on("touchend", function(t) {
                        u._touchend(t);
                    });
                }
                var y = f.navigation;
                if (y.arrows) {
                    n = l.find(".ui-slider-prev");
                    i = l.find(".ui-slider-next");
                    n.length || (n = t(y.prevArrow).appendTo(l));
                    i.length || (i = t(y.nextArrow).appendTo(l));
                }
                n.click(function(t) {
                    t.preventDefault();
                    u.prev();
                });
                i.click(function(t) {
                    t.preventDefault();
                    u.next();
                });
                if (y.toggleOnHover) {
                    var g = i.show().width(), b = n.show().width(), x = function(t, e) {
                        var o = +!!t, r = {
                            right: -1 * !o * g,
                            opacity: o
                        }, a = {
                            left: -1 * !o * b,
                            opacity: o
                        };
                        if (e) {
                            i.animate(r, 200);
                            n.animate(a, 200);
                        } else {
                            i.css(r);
                            n.css(a);
                        }
                    };
                    x(!1);
                    l.on("mouseenter", function(t) {
                        x(!0, !0);
                    }).on("mouseleave", function(t) {
                        x(!1, !0);
                    });
                }
                if (f.play.active) {
                    r = t('<a href="#" class="ui-slider-navigation ui-slider-play" title="Play">Play</a>').appendTo(l);
                    a = t('<a href="#" class="ui-slider-navigation ui-slider-stop" title="Stop" style="display:' + (f.play.swap ? "none" : "") + '">Stop</a>').appendTo(l);
                    r.click(function(t) {
                        t.preventDefault();
                        u.play(!0);
                    });
                    a.click(function(t) {
                        t.preventDefault();
                        u.stop(!0);
                    });
                }
                if (s > 1 && f.pagination.active) {
                    o = t('<ul class="ui-slider-pagination" />').appendTo(l).on("click", "[data-slide-idx]", function(e) {
                        e.preventDefault();
                        u.go(+t(e.currentTarget).attr("data-slide-idx"));
                    });
                    for (var _ = -1; ++_ < s; ) t('<li class="ui-slider-pagination-item"><a href="#" data-slide-idx="' + _ + '">' + (_ + 1) + "</a></li>").appendTo(o);
                }
                var w = p(function() {
                    if (d.animating) return w();
                    u.update();
                }, 100);
                t(e).on("resize", w);
                u.once("destroy", function() {
                    t(e).off("resize", w);
                });
                u._setActive();
                var A = f.play.auto;
                A && u.play();
                u.on("slide", function(t, e) {
                    var n = t.next;
                    f.callback.complete(n, m[n]);
                    A && u.play();
                });
                f.callback.loaded(f.start);
            },
            lazyLoad: function() {
                function e(e) {
                    var i = t(e).find("[" + r + "]").get();
                    i.unshift(e);
                    t(i).each(function(e, n) {
                        var i = n.tagName.toLowerCase(), o = t(n), s = o.attr(r), u = new Image();
                        if (s && n.src !== s) {
                            u.onload = function() {
                                u = u.onload = null;
                                o.animate({
                                    opacity: 0
                                }, 100, function() {
                                    "img" === i ? o.attr("src", s) : o.css("background-image", "url(" + s + ")");
                                    o.animate({
                                        opacity: 1
                                    }, 200, function() {
                                        o.removeAttr(r).removeClass(a);
                                    });
                                });
                            };
                            u.src = s;
                        }
                    });
                    n.emit("loadSlide", e);
                }
                var n = this, i = n.options.lazyLoad, o = n._slides, r = i.attr || "data-src", a = i.loadingClass;
                t.each(n._cursor(), function(t, n) {
                    e(o[n]);
                });
                return n;
            },
            _setActive: function(e) {
                var n, i;
                n = this.element;
                i = e > -1 ? e : this.data.current;
                t(".active", n).removeClass("active");
                t(t(".ui-slider-pagination li", n)[i]).find("a").addClass("active");
            },
            update: function() {
                var e, n, i = this.element, o = this.options, r = this.data.current, a = this._control;
                if (!this.data.animating) {
                    this._slides.each(function(e, n) {
                        e === r ? t(n).css({
                            display: "block",
                            zIndex: 1
                        }).addClass(o.cls.active) : t(n).css({
                            display: "none",
                            left: 0,
                            zIndex: 0
                        });
                    });
                    e = i.width() || o.width;
                    n = i.height() || o.height;
                    o.autoScale && (n = o.height / o.width * e);
                    o.width = e;
                    o.height = n;
                    a.css({
                        width: e + "px",
                        height: n + "px",
                        lineHeight: n + "px"
                    });
                    t(".ui-slider-container", i).css({
                        width: e + "px",
                        height: n + "px"
                    });
                    return this;
                }
            },
            next: function(t) {
                this.data.direction = "next";
                return this._transition(t);
            },
            prev: function(t) {
                this.data.direction = "prev";
                return this._transition(t);
            },
            _transition: function(t, e, n) {
                if (!this.data.animating) {
                    this.stop();
                    if ("number" != typeof t) {
                        n = e;
                        e = t;
                        t = -1;
                    }
                    if ("function" == typeof e) {
                        n = e;
                        e = "";
                    }
                    e = e || this.options.navigation.effect;
                    "fade" === e ? this._fade(t, n) : this._slide(t, n);
                }
                return this;
            },
            go: function(t) {
                var e = this.data.total;
                t > e - 1 ? t = e - 1 : t < 0 && (t = 0);
                return this._transition(t);
            },
            _cursor: function(t) {
                var e = this.data, n = t || e.current, i = e.total, o = i - 1, r = n + 1, a = n - 1;
                a < 0 && (a = o);
                r > o && (r = 0);
                return {
                    current: n,
                    prev: a,
                    next: r
                };
            },
            _setuptouch: function() {
                var e = this.options.width, n = this._slides, i = this._cursor(), o = i.prev, r = i.next;
                if (r !== o) {
                    t(n[r]).css({
                        display: "block",
                        left: e
                    });
                    t(n[o]).css({
                        display: "block",
                        left: -1 * e
                    });
                } else t(n[r]).css({
                    display: "block"
                });
            },
            _touchstart: function(t) {
                this.stop();
                var e, n, i, o = this.data;
                e = (t.originalEvent || t).touches[0];
                this._setuptouch();
                n = e.pageX;
                i = e.pageY;
                e = o.touches = {
                    startX: n,
                    startY: i,
                    scroll: null,
                    time: +new Date()
                };
                e.start = e.current = n;
                t.stopPropagation();
            },
            _touchend: function(t) {
                var e, n, i, o, r = this, a = r.options, s = r.data, u = this._control, l = s.touches, c = a.width;
                t.stopPropagation();
                if (!l.scroll) {
                    e = +new Date() - l.time;
                    n = l.current - l.start;
                    i = Math.abs(n);
                    if (s.total > 1 && (i > .4 * c || i > .1 * c && e < 300)) {
                        o = n < 0 ? "next" : "prev";
                        s.direction = o;
                        r._slide();
                    } else h(u, {
                        transform: {
                            x: 0,
                            y: 0
                        },
                        duration: .85 * a.effect.slide.speed + "ms"
                    });
                }
            },
            _touchmove: function(t) {
                var e = this.data, n = !0, i = (t.originalEvent || t).touches[0], o = e.touches, r = i.pageX, a = i.pageY, s = o.scroll;
                null === s && n && (s = !!(s || Math.abs(a - o.startY) > Math.abs(r - o.startX)));
                null !== s || n || (s = !!(s || Math.abs(a - o.startY) < Math.abs(r - o.startX)));
                t.stopPropagation();
                o.current = r;
                o.scroll = s;
                if (!e.animating && !s) {
                    t.preventDefault();
                    h(this._control, {
                        "timing-function": "linear",
                        transform: {
                            x: r - o.startX,
                            y: 0
                        }
                    }, !1);
                }
            },
            play: function(e) {
                var n = this, i = n.options, o = n.data, r = n.element, a = i.play.interval;
                if (o.total > 1 && !o.playInterval) {
                    if (e) {
                        o.direction = "next";
                        n._transition();
                    }
                    o.playInterval = u(function s() {
                        o.direction = "next";
                        o.playInterval = null;
                        n._transition(function() {
                            o.stoped || (o.playInterval = u(s, a));
                        });
                    }, a);
                    if (i.play.pauseOnHover) {
                        if (o._restartTimer) {
                            l(o._restartTimer);
                            o._restartTimer = null;
                        }
                        t(".ui-slider-container", r).off().on("mouseenter", function(t) {
                            o.stoped && !o._restartTimer || n.stop();
                        }).on("mouseleave", function(e) {
                            if (!t.contains(n.element[0], e.toElement)) {
                                var r, a = i.play.restartDelay;
                                if (a) {
                                    (r = o._restartTimer) && l(r);
                                    o._restartTimer = u(function() {
                                        n.play(!0);
                                    }, a);
                                } else n.play();
                            }
                        });
                    }
                    o.stoped = !1;
                    t(".ui-slider-play", r).addClass("ui-slider-playing");
                    if (i.play.swap) {
                        t(".ui-slider-play", r).hide();
                        t(".ui-slider-stop", r).show();
                    }
                }
                return n;
            },
            stop: function(e) {
                var n = this.element, i = this.data;
                if (i._restartTimer) {
                    l(i._restartTimer);
                    i._restartTimer = null;
                }
                if (i.playInterval) {
                    l(i.playInterval);
                    i.playInterval = null;
                }
                i.stoped = !0;
                t(".ui-slider-play", n).removeClass("ui-slider-playing");
                if (this.options.play.swap) {
                    t(".ui-slider-stop", n).hide();
                    t(".ui-slider-play", n).show();
                }
                return this;
            },
            _slide: function(e, n) {
                var i, o, r, a, s = this, u = s.data, l = s.options, d = (s.element, s._control), p = s._slides, v = l.callback;
                if ("function" == typeof e) {
                    n = e;
                    e = -1;
                }
                if (!u.animating && e !== u.current) {
                    u.animating = !0;
                    i = u.current;
                    if ("number" == typeof e && e > -1) {
                        a = e > i ? 1 : -1;
                        r = e;
                    } else {
                        a = "next" === u.direction ? 1 : -1;
                        r = i + a;
                    }
                    o = l.width * (-1 * a);
                    r === -1 && (r = u.total - 1);
                    r === u.total && (r = 0);
                    this._setActive(r);
                    e > -1 && p.each(function(e, n) {
                        e !== i && t(n).css({
                            display: "none",
                            left: 0,
                            zIndex: 0
                        });
                    });
                    t(p[r]).css({
                        display: "block",
                        left: a * l.width,
                        zIndex: 1
                    });
                    v.start(r, p[r]);
                    var m = function() {
                        var e = l.cls.active;
                        t(p[r]).css({
                            left: 0
                        }).addClass(e);
                        t(p[i]).css({
                            display: "none",
                            left: 0,
                            zIndex: 0
                        }).removeClass(e);
                        u.stoped = !1;
                        u.current = r;
                        u.animating = !1;
                        n && n();
                        s.emit("slide", [ s._cursor(), p[r] ]);
                    }, y = l.effect.slide.speed;
                    f ? h(d, {
                        transform: {
                            x: o,
                            y: 0
                        },
                        duration: y + "ms"
                    }, function(e) {
                        p.each(function(e, n) {
                            e !== r && t(n).css({
                                display: "none",
                                left: 0,
                                zIndex: 0
                            });
                        });
                        m();
                        c && s._setuptouch();
                    }) : d.stop().animate({
                        left: o
                    }, y, function() {
                        d.css({
                            left: 0
                        });
                        m();
                    });
                }
            },
            _fade: function(e, n) {
                var i, o, r, a = this, s = a.options, u = a.data, l = a._slides, c = s.callback;
                if (!u.animating && e !== u.current) {
                    u.animating = !0;
                    i = u.current;
                    if ("number" == typeof e && e > -1) {
                        r = e > i ? 1 : -1;
                        o = e;
                    } else {
                        r = "next" === u.direction ? 1 : -1;
                        o = i + r;
                    }
                    o === -1 && (o = u.total - 1);
                    o === u.total && (o = 0);
                    this._setActive(o);
                    t(l[o]).css({
                        display: "none",
                        left: 0,
                        zIndex: 1
                    });
                    c.start(o, l[o]);
                    var f = function() {
                        var e = s.cls.active;
                        t(l[o]).addClass(e);
                        t(l[i]).removeClass(e);
                        u.stoped = !1;
                        u.current = o;
                        u.animating = !1;
                        n && n();
                        a.emit("slide", [ a._cursor(), l[o] ]);
                    }, d = s.effect.fade.speed;
                    if (s.effect.fade.crossfade) {
                        t(l[i]).stop().fadeOut(d);
                        t(l[o]).stop().fadeIn(d, function() {
                            t(l[o]).css({
                                zIndex: 0
                            });
                            f();
                        });
                    } else t(l[i]).stop().fadeOut(d, function() {
                        t(l[o]).stop().fadeIn(d, function() {
                            t(l[o]).css({
                                zIndex: 1
                            });
                        });
                        f();
                    });
                }
            },
            destroy: function() {
                var e = this.element;
                t(".ui-slider-container", e).off();
                this.stop(!0);
                this._control.off();
                this.emit("destroy");
            }
        });
        t.fn[m] = function(e) {
            return this.each(function() {
                if (!t.data(this, "plugin_" + m)) return t.data(this, "plugin_" + m, new a(this, e));
            });
        };
        return a;
    }(t, window, document);
});

!function(t, e, n) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], n) : t[e] = n(t.jQuery || t.Zepto);
}(this, "Lazyload", function(t, e) {
    "use strict";
    if (!t) throw "Error: jquery api not implements.";
    var n = t.each, i = function(t, e) {
        if (t instanceof Array && t.filter) return t.filter(e);
        for (var n = [], i = -1, o = t.length; ++i < o; ) e(t[i], i) && n.push(t[i]);
        return n;
    }, o = function(t, e, n, i) {
        var o;
        return function() {
            var r = i || this, a = arguments, s = function() {
                o = null;
                n || t.apply(r, a);
            }, u = n && !o;
            clearTimeout(o);
            o = setTimeout(s, e);
            u && t.apply(r, a);
        };
    }, r = function(e, n) {
        e = e || {};
        var i = t(e), o = Array.prototype.slice;
        n = n || e.name;
        t.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(t, r) {
            e[t] = function(e) {
                var a = o.call(arguments, 0), s = a[1];
                n && !~e.indexOf(".") && (a[0] = e + "." + n);
                "function" == typeof s && ("on" === t || "once" === t ? a[1] = s.__ || (s.__ = function(t) {
                    t.preventDefault();
                    return s.apply(this, o.call(arguments, 1));
                }) : "un" === t && (a[1] = s.__));
                return i[r].apply(i, a);
            };
        });
        return e;
    }, a = window, s = t(a), u = a.Image, l = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, d = 1, p = 2, h = function(t) {
        return t[c] === e;
    }, v = function() {
        var t = {}, e = function(e, n) {
            "function" == typeof n && (t[e] = n);
        }, n = function(e) {
            return t[e];
        };
        return {
            define: e,
            get: n
        };
    }();
    v.define("image", function(n, i, o, r) {
        if (i) {
            var a = new u(), s = function() {
                a.onload = a.onerror = null;
                a = i = n = r = s = e;
            };
            a.onload = function() {
                var e = t(n), a = o.effect;
                "function" != typeof e[a] && (a = "show");
                e.hide();
                "IMG" === n.nodeName.toUpperCase() ? e.attr("src", i) : e.css("background-image", 'url("' + i + '")');
                e[a](o.effectSpeed);
                r(null, "load");
                s();
            };
            a.onerror = function(t) {
                r(t);
                s();
            };
            a.src = i;
        } else r("error");
    });
    v.define("html", function(t, e, n, i) {
        i();
    });
    var m = function(e, u) {
        u = u || {};
        e = t(e);
        var m = this, _ = {
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
        var w = u.type || _.type, A = v.get(w);
        if ("function" != typeof A) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (_.placeholder = "");
        u && t.extend(_, u);
        var k = _.container, T = _.event, C = 0 === T.indexOf("scroll"), j = k && k !== a ? t(k) : s, z = function(e) {
            var i = m._list;
            if (i.length > 0) {
                var o = 0;
                n(i.slice(0), function(e, n) {
                    var i = t(n);
                    if (!_.skipInvisible || i.is(":visible")) if (b(n, _) || x(n, _)) ; else if (y(n, _) || g(n, _)) {
                        if (++o > _.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        o = 0;
                    }
                });
            } else m.reset();
        }, E = function() {
            m._list = i(m._list, function(t) {
                return !t[c];
            });
        }, I = function() {
            var e = this, n = t(e), i = n.attr("data-" + _.dataAttribute), o = _.sourceMaker, r = _.appear, a = _.loadingClass, s = e[c];
            if (s === f) {
                e[c] = d;
                a && n.addClass(a);
                o && (i = o(i, e));
                r && r.apply(m, [ e, i ]);
                A.call(m, e, i, _, function(t, o) {
                    if (!m._destroyed) {
                        a && n.removeClass(a);
                        if (t) setTimeout(function() {
                            e[c] = f;
                            m.emit("lazyItemError", e, i, t);
                            e = null;
                        }, 300); else {
                            e[c] = p;
                            E();
                            m.emit("lazyItemReady", e, i, o);
                            var r = _.load;
                            r && r.apply(m, [ e, i, o ]);
                            e = null;
                        }
                        n = null;
                    }
                });
            } else if (s === p) {
                E();
                m.emit("lazyItemReady", e, i);
            }
        }, q = function() {
            this[c] || t(this).trigger("appear");
        }, D = function(e) {
            var n = t(e);
            e[c] = f;
            var i = _.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === m._.type || n.children()[0] || n.html(i);
            n.on("appear", I);
            C || n.on(T, q);
            m._list.push(e);
        }, L = function(t) {
            t = i(t || [], h);
            if (t.length) {
                n(t, function(t, e) {
                    D(e);
                });
                m._inited || N(m);
            }
        }, N = function(e) {
            if (!e._inited) {
                var i = o(z, 30);
                e._inited = !0;
                C && j.on(T, i);
                s.on("resize", i);
                if (l) {
                    var r = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(e._list, function(e, n) {
                            t(n).trigger("appear");
                        });
                    };
                    s.on("pageshow", r);
                    e.once("reset", function() {
                        s.off("pageshow", r);
                    });
                }
                e.once("reset", function() {
                    n(e._list, function(t, e) {
                        O(e);
                    });
                    C && j.off(T, i);
                    s.off("resize", i);
                });
                t(document).ready(z);
            }
        }, O = function(e) {
            var n = t(e);
            n.off("appear", I);
            C || n.off(T, q);
        };
        m.on("lazyItemReady", function(t) {
            O(t);
        });
        m.once("destroy", function() {
            L = null;
            z = null;
            E = null;
            I = null;
            q = null;
        });
        m._ = _;
        m._list = [];
        m.add = function(e) {
            var n = t(e);
            n.length > 0 && L(n);
        };
        m.update = z;
        L(e);
    };
    m.prototype = {
        constructor: m,
        update: function() {},
        peek: function() {
            var t = this._list, n = t.length;
            return n > 0 ? t[0] : e;
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
    m.define = function(t, e) {
        return v.define(t, e);
    };
    var y = function(e, n) {
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().top + t(o).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return i <= t(e).offset().top - n.threshold;
    }, g = function(e, n) {
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().left + t(o).width() : s.width() + s.scrollLeft();
        return i <= t(e).offset().left - n.threshold;
    }, b = function(e, n) {
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().top : s.scrollTop();
        return i >= t(e).offset().top + n.threshold + t(e).height();
    }, x = function(e, n) {
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().left : s.scrollLeft();
        return i >= t(e).offset().left + n.threshold + t(e).width();
    }, _ = function(t, e) {
        return !(g(t, e) || x(t, e) || y(t, e) || b(t, e));
    };
    m.belowthefold = y;
    m.rightoffold = g;
    m.abovethetop = b;
    m.leftofbegin = x;
    m.inviewport = _;
    return m;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../utils/util"), r = t("../event/emitter"), a = o.setImmediate, s = o.noop, u = o.extend, l = i.trim, c = i.parseJSON, f = function(t, e, n) {
        return function(i, o) {
            try {
                return t.apply(e, arguments);
            } catch (r) {
                n && n(r, i, o);
            }
        };
    }, d = function(t) {
        return e.emit.apply(e, arguments);
    };
    r.applyTo(e);
    var p = function() {
        var t = 5, e = 0, n = [], o = function() {
            a(function() {
                --e;
                r();
            });
        }, r = function() {
            if (n.length > 0 && e < t) {
                var r = n.shift(), a = r[0], s = r[1];
                ++e;
                a.always(o);
                i.ajax(s);
            }
        };
        return function(t, e) {
            n.push([ t, e ]);
            r();
        };
    }(), h = function(t) {
        r.applyTo(this);
        var e = {
            url: "",
            type: "GET",
            data: {},
            dataType: "json",
            timeout: 3e4,
            cache: !1
        };
        t = u(e, t);
        delete t.error;
        delete t.success;
        this._opts = t;
    };
    u(h.prototype, {
        send: function() {
            var t = this, e = this._opts, n = u({}, e), i = "jsonp" === n.dataType;
            i && (n.crossDomain = !0);
            n.complete = function(n, o) {
                var r, a = +n.status, s = n.responseJSON, u = {
                    error: "1",
                    msg: "Request error (status: " + (o || a) + ")"
                }, f = 200 === a || "success" === o;
                if (!i && !s) {
                    s = l(n.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = c(s);
                    } catch (d) {}
                }
                f || (s = s || u);
                r = {
                    data: s,
                    xhr: n,
                    origin: e,
                    status: a || o
                };
                f ? t.emit("response", null, r) : t.emit("error", s, r);
                t.emit("end", r);
                t.destroy();
            };
            p(t, n);
            return t;
        },
        always: function(t) {
            "function" == typeof t && this.on("end", t);
            return this;
        },
        destroy: function() {
            this.un();
            this._opts = null;
        }
    });
    e.on("request", function(t, e) {
        e = e && i(e);
        if (e) {
            var n = "disabled";
            e.addClass(n).prop("disabled", !0);
            t.once("end", function() {
                e.removeClass(n).prop("disabled", !1);
                e = null;
            });
        }
    });
    e.ajax = function(t, e, n) {
        if ("object" == typeof t) {
            n = e;
            e = t;
            t = void 0;
        }
        e = e || {};
        t && (e.url = t);
        var o = new h(e), r = function(t, n) {
            var i = t.stack && t.stack.split("\n").slice(0, 2).join("\n") || t, o = {
                stack: i,
                origin: e,
                response: n
            };
            d("error", o, n);
            a(function() {
                console.log("%c " + i, "color:#ae0000");
            }, 1);
        }, u = f(e.error || s, null, r), l = f(e.success || s, null, r);
        if (d("request", o, n) !== !1) {
            if (n && (n = i(n))) {
                var c, p, v = "data-async-lock";
                if (1 === +n.attr(v)) return;
                if (p = n.attr("data-async-text")) {
                    c = n.html();
                    n.html(p);
                }
                n.attr(v, 1);
                o.once("response error", function() {
                    if (n) {
                        n.attr(v, 0);
                        p && n.html(c);
                        n = null;
                    }
                });
            }
            o.on("error", function(t, e) {
                var n = {
                    code: t.error,
                    message: t.msg,
                    status: e.status,
                    origin: e.origin,
                    response: e.data
                };
                d("error", n, e) !== !1 && u(t);
            });
            o.on("response", function(t, e) {
                e = e.data;
                d("response", e) !== !1 && (t ? u(t) : e && 0 === +(e.error || 0) ? l(e) : u(e));
            });
            return o.send();
        }
    };
    i.each([ "get", "post", "jsonp" ], function(t, n) {
        e[n] = function(t, i, o, r, a) {
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
            "string" == typeof t ? s.url = t : u(s, t);
            var l = n;
            if ("jsonp" === n) {
                l = "get";
                s.dataType = "jsonp";
            }
            s.type = l;
            return e.ajax(s, a);
        };
    });
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return t.replace(s, "ms-").replace(u, l);
    }
    function o(t) {
        try {
            return "true" === t || "false" !== t && ("null" === t ? null : +t + "" === t ? +t : c.test(t) ? a.parseJSON(t) : t);
        } catch (e) {}
    }
    function r(t, e, n) {
        var i;
        if (void 0 === n && 1 === t.nodeType) {
            i = "data-" + e.replace(f, "-$&").toLowerCase();
            n = t.getAttribute(i);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var a = (window.document, t("jquery")), s = /^-ms-/, u = /-([\da-z])/gi, l = function(t, e) {
        return e.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, d = function(t, e, n) {
        if (!t || 1 !== t.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, s, u, l;
        if (1 === arguments.length) {
            if (u = t.dataset) {
                l = {};
                for (s in u) u.hasOwnProperty(s) && (l[s] = o(u[s]));
                return l;
            }
            u = t.attributes;
            a = u.length;
            l = {};
            for (;a--; ) if (u[a]) {
                s = u[a].name;
                if (0 === s.indexOf("data-")) {
                    s = i(s.slice(5));
                    l[s] = o(r(t, s));
                }
            }
            return l;
        }
    };
    n.exports = d;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(t, e, n) {
    "use strict";
    function i(t, e, n, i) {
        i ? t[e] || (t[e] = n) : t[e] ? t[e] = t[e].add(n) : t[e] = r(n);
    }
    var o = window.document, r = t("jquery"), a = function(t, e, n) {
        var a, s, u, l, c, f = function(t) {
            if (n) for (var o in n) u[o] = r(n[o].toString(), t); else {
                u = {};
                l = r("[node-type]", t);
                for (var a, s = -1, c = l.length; ++s < c; ) {
                    a = l[s];
                    o = a.getAttribute("node-type");
                    i(u, o, a, e);
                }
            }
        }, d = function(t) {
            var n, o = u[t];
            if (!o || 0 === o.length) {
                n = r('[node-type="' + t + '"]', a);
                n.length && i(u, t, n, e);
                o = u[t];
            }
            return o;
        };
        void 0 === e && (e = !0);
        a = t;
        if ("string" == typeof t && "<" === t.charAt(0)) {
            a = o.createElement("div");
            a.innerHTML = t;
            s = o.createDocumentFragment();
            for (;c = a.firsChild; ) s.appendChild(c);
        } else {
            a = r(t);
            s = a[0];
        }
        f(a);
        return {
            get: d,
            box: s,
            list: u
        };
    };
    e.build = a, e.parse = function(t, e, n) {
        "object" == typeof t && t.length > 0 && (t = t[0]);
        if (!t || 1 !== t.nodeType) throw TypeError("parse error, not a valid html element");
        if ("boolean" == typeof n) {
            e = n;
            n = null;
        }
        return a(t, e, n).list;
    };
    e.dataset = t("./dataset");
});

define("module/top-search/1.0.0/top-search", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function i(t) {
        var e = this, n = {
            activeClass: "focus",
            selector: "#jTopSearch",
            url: $PAGE_DATA && $PAGE_DATA.topSearchUrl || "",
            data: {},
            alias: "name"
        };
        e.options = o.extend(!0, {}, n, t);
        if ("" == e.options.url) throw new Error("the params options.url is required");
        e.el = o(e.options.selector);
        var i = r.build(e.el[0], !1);
        e.ipt = i.get("ipt");
        e.btn = i.get("btn");
        e.lbl = i.get("lbl");
        e._init();
        e._initEvent();
    }
    var o = t("jquery"), r = (t("lib/core/1.0.0/utils/util"), t("lib/core/1.0.0/dom/build"));
    i.prototype._initEvent = function() {
        var t = this;
        t.ipt.on("focus", function() {
            t.focus();
        });
        t.ipt.on("blur", function() {
            0 == t.getValue().length && t.blur();
        });
        t.ipt.on("keydown", function(e) {
            13 === e.keyCode && t.search();
        });
        t.btn.on("click", function() {
            t.search();
        });
    };
    i.prototype._init = function() {
        var t = this, e = o.trim(t.ipt.val()), n = t.ipt.attr("data-id");
        e.length > 0 && t.focus();
        n && (t.options.alias = n);
        t.options.data && (t.options.data[t.options.alias] = o.trim(t.ipt.val()));
    };
    i.prototype.focus = function() {
        var t = this;
        t.el.addClass(t.options.activeClass);
    };
    i.prototype.blur = function() {
        var t = this;
        t.el.removeClass(t.options.activeClass);
    };
    i.prototype.getValue = function() {
        var t = this;
        return o.trim(t.ipt.val());
    };
    i.prototype.search = function() {
        var t = this;
        t.options.data[t.options.alias] = t.getValue();
        window.location.href = t.options.url + "?" + t._getUrlString();
    };
    i.prototype._getUrlString = function() {
        var t = this, e = "", n = 0;
        for (var i in t.options.data) {
            e += 0 == n ? i + "=" + encodeURIComponent(t.options.data[i]) : "&" + i + "=" + encodeURIComponent(t.options.data[i]);
            n++;
        }
        return e;
    };
    n.exports = i;
});

define("lib/core/1.0.0/io/cookie", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    var i = window.document, o = function(t) {
        if ("string" != typeof t) throw "trim need a string as parameter";
        for (var e = t.length, n = 0, i = e - 1, o = /(\u3000|\s|\t|\u00A0)/; n < e && o.test(t.charAt(n)); ) ++n;
        for (;i >= 0 && o.test(t.charAt(i)); ) --i;
        return t.substring(n, i + 1);
    }, r = function(t) {
        var e = {};
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
    }, a = function(t, e, n) {
        n = n || {};
        if (void 0 !== e) {
            n = r(n);
            if (null === e) {
                e = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var a = n.expires, s = n.expires = new Date();
                s.setTime(s.getTime() + 864e5 * a);
            }
            var u = function(t) {
                try {
                    return n.raw ? t : encodeURIComponent(t);
                } catch (e) {}
                return t;
            };
            return i.cookie = [ u(t), "=", u(e), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var e = null, l = i.cookie, c = function(t) {
            return n.raw ? t : decodeURIComponent(t);
        }, f = l ? l.split("; ") : [], d = -1, p = f.length, h = t.length + 1; ++d < p; ) {
            l = o(f[d]);
            if (l.substring(0, h) === t + "=") {
                e = c(l.substring(h));
                break;
            }
        }
        return e;
    };
    a.set = function(t, e, n) {
        return a(t, e, n);
    };
    a.get = function(t) {
        return a(t);
    };
    n.exports = a;
});

define("module/login-status/1.0.0/login", [ "require", "exports", "module", "lib/core/1.0.0/io/cookie" ], function(t, e, n) {
    "use strict";
    var i = t("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", s = $PAGE_DATA && $PAGE_DATA[o] || null;
    e.getNick = function() {
        return s;
    };
    e.isLogin = function() {
        return !!i(r);
    };
    e.login = function(t) {
        if (a) {
            t = t ? "?returnUrl=" + decodeURIComponent(t) : "";
            window.location.href = a + t;
        }
    };
});

define("module/login-status/1.0.0/login-status", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build", "./login" ], function(t, e, n) {
    "use strict";
    function i(t) {
        var e = this, n = {
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
        e.options = o.extend(!0, {}, n, t);
        e.el = o(e.options.selector);
        e._init();
    }
    var o = t("jquery"), r = t("lib/core/1.0.0/dom/build"), a = t("./login");
    i.prototype._init = function() {
        var t = this;
        if (a.isLogin()) {
            var e = a.getNick();
            t.el.html(t._getLoginedHtml(e));
            t._initEvent();
        }
    };
    i.prototype._initEvent = function() {
        var t = this, e = !1, n = r.build(t.el[0], !1), i = n.get("userName"), o = n.get("tipsMenu");
        i.on("mouseenter", function() {
            e = !0;
            o.stop().fadeIn(500, function() {
                o.addClass("active");
            });
        });
        i.on("mouseleave", function() {
            e = !1;
            setTimeout(function() {
                e || o.stop().fadeOut(500, function() {
                    o.removeClass("active");
                });
            }, 200);
        });
        o.on("mouseenter", function() {
            e = !0;
        });
        o.on("mouseleave", function() {
            e = !1;
            o.removeClass("active");
        });
    };
    i.prototype._getLoginedHtml = function(t) {
        var e = this, n = e.options, i = n.menuList, o = "";
        o += '<ul class="logined clearfix" node-type="logined">';
        o += '    <li class="item">';
        o += "        <span>您好，</span>";
        o += "    </li>";
        o += '    <li class="item tips-menu-box">';
        o += '        <a href="' + n.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + t + "</a>";
        o += '        <div class="tips-menu" node-type="tipsMenu">';
        o += '            <div class="arrow"><i></i><b></b></div>';
        o += '            <ul class="tips-menu-list">';
        for (var r = 0, a = i.length; r < a; r++) o += '            <li class="tips-menu-item"><a href="' + i[r].url + '">' + i[r].title + "</a></li>";
        o += "            </ul>";
        o += "        </div>";
        o += "    </li>";
        o += '    <li class="item">';
        o += '        <a href="' + n.loginOutUrl + '" class="btn">退出</a>';
        o += "    </li>";
        o += "</ul>";
        return o;
    };
    n.exports = i;
});

define("module/fix-bar/1.0.0/fix-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function i(t) {
        var e = this, n = {
            onlineServiceUrl: ""
        };
        e.options = o.extend(!0, {}, n, t);
        e._init();
        e._initEvent();
    }
    var o = t("jquery");
    t("lib/core/1.0.0/utils/util"), t("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var t = this;
        t.el = o(t._getTemplete());
        o(document.body).append(t.el);
        t.height = t.el.height();
        t.resize();
    };
    i.prototype._initEvent = function() {
        var t = this;
        o(window).on("resize", function() {
            t.resize();
        });
    };
    i.prototype.resize = function() {
        var t = this, e = o(window).height(), n = (e - t.height) / 2;
        if (n >= 0) {
            t.el.css({
                top: n
            });
            t.el.addClass("active");
        } else t.el.removeClass("active");
    };
    i.prototype._getTemplete = function() {
        var t = this, e = "";
        e += '<div class="ui-fix-bar">';
        e += '    <ul class="list clearfix" node-type="list">';
        e += '        <li class="jItem item item-service" node-id="service">';
        e += '            <a href="' + t.options.onlineServiceUrl + '">';
        e += '                <i class="iyoyo iyoyo-service"></i>';
        e += "                <span>在线客服</span>";
        e += "            </a>";
        e += "        </li>";
        e += "    </ul>";
        e += "</div>";
        return e;
    };
    n.exports = i;
});

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function i(t) {
        var e = this, n = {
            selector: "#jFooter"
        };
        e.options = o.extend(!0, {}, n, t);
        e.el = o(e.options.selector);
        if (0 == e.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        e._init();
    }
    var o = t("jquery"), r = t("lib/plugins/lazyload/1.9.3/lazyload"), a = t("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var t = this, e = a.build(t.el[0], !1), n = e.get("footerImg");
        new r(n);
    };
    n.exports = i;
});

define("conf/demo", [ "require", "exports", "module", "jquery", "lib/ui/box/1.0.1/box", "lib/ui/slider/3.0.4/slider", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/io/request", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("lib/ui/box/1.0.1/box"), r = t("lib/ui/slider/3.0.4/slider"), a = t("lib/plugins/lazyload/1.9.3/lazyload"), s = t("lib/core/1.0.0/io/request"), u = t("module/top-search/1.0.0/top-search"), l = t("module/login-status/1.0.0/login-status"), c = t("module/fix-bar/1.0.0/fix-bar"), f = t("module/footer/1.0.0/footer");
    new u(), new l(), new c(), new f(), new r("#jSlider", {
        lazyLoad: {
            loadingClass: "img-error"
        },
        play: {
            auto: !0,
            interval: 4e3,
            swap: !0,
            pauseOnHover: !0,
            restartDelay: 2500
        },
        callback: {
            start: function(t) {},
            loaded: function() {}
        }
    }), new a(i("#jImgList .jImg"), {
        mouseWheel: !0,
        effect: "fadeIn",
        snap: !0
    });
    i("#jFixNav").find(".more").click(function() {
        i("#jFixNav").hasClass("ui-fix-nav-show") ? i("#jFixNav").removeClass("ui-fix-nav-show") : i("#jFixNav").addClass("ui-fix-nav-show");
    });
    o.tips("ddd", {
        xtype: "ok",
        duration: 0
    });
    var d = {
        loadUrl: function() {
            o.loadUrl("/m-service-market/source/api/demo/publish-require.json", {
                data: {
                    t: +new Date()
                },
                content: "加载中",
                success: function(t) {
                    console.log(t);
                    alert(JSON.stringify(t));
                }
            });
        },
        loading: function() {
            var t = o.loading("加载中,3秒后关闭");
            setTimeout(function() {
                t.hide();
            }, 3e3);
        },
        tips: function() {
            o.tips("ok! it's a tips", null, 1e3);
        },
        alert: function() {
            o.alert("ok! it's a tips");
        },
        confirm: function() {
            o.confirm("Are you sure?", function() {
                o.tips("ok");
            }, function() {
                alert("cancel");
            }, this);
        },
        bubble: function() {
            o.bubble("我是气泡，可以任意调整方向", {
                align: "t"
            }, this);
        },
        warn: function() {
            o.warn("Opps!");
        },
        sendPost: function() {
            s.jsonp("/m-service-market/source/api/demo/publish-require.json", {
                foo: "foo text"
            }, function(t) {
                alert(t.msg + " (code: " + t.error + ")");
            }, this);
        }
    };
    i("#jBox .btn").each(function() {
        var t = i(this), e = t.attr("data-type"), n = d[e];
        n && t.on("click", n);
    });
});