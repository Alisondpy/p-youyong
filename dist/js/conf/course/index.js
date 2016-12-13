/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

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
    function u(e, t) {
        for (var n = -1, i = e.length, o = Array(i); ++n < i; ) o[n] = t(e[n], n, e);
        return o;
    }
    function l(e, t) {
        var n = [];
        s(e, function(e, i, o) {
            n.push(t(e, i, o));
        });
        return n;
    }
    function c(e, t) {
        if (!t || !i(t)) return e;
        for (var n = g(t), o = n.length; o--; ) e[n[o]] = t[n[o]];
        return e;
    }
    function f(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = {}, i = e.split("&"), o = -1, r = i.length; ++o < r; ) {
            t = i[o].split("=");
            n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return n;
    }
    var d = new Function("return this")(), p = Object.prototype.hasOwnProperty, h = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, v = function() {
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
    }, m = "function" == typeof Object.create ? function(e, t) {
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
    }(), y = d.console || (d.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(e) {
        y[e] || (y[e] = o);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), i = n.length, o = -1; ++o < i; ) c(e, n[o]);
        return e;
    };
    t.inherits = function(e, t, n) {
        m(e, t);
        n && c(e.prototype, n);
    };
    t.impls = function(e, n) {
        n = "function" == typeof n ? n.prototype : n;
        t.mix(e.prototype, n);
        return e;
    };
    t.parseQuery = f;
    t.parseParams = f;
    t.each = s;
    t.map = function(e, t) {
        var n = h(e) ? u : l;
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
    t.mix = function b(e, t, n, i, o) {
        for (var r in t) t.hasOwnProperty(r) && (t[r] && e[r] && n && "object" == typeof t[r] ? b(e[r], t[r], n, i, o) : (void 0 === e[r] || i) && (o && !o(e[r], t[r]) || (e[r] = t[r])));
        return e;
    };
    t.guid = v;
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
            var i = v();
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
            }, u = n && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            u && e.apply(r, a);
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
    var t = e("jquery"), n = t(window), i = t(document), o = "createTouch" in document, r = document.documentElement, a = !("minWidth" in r.style), s = !a && "onlosecapture" in r, u = "setCapture" in r, l = t.noop, c = {
        start: o ? "touchstart" : "mousedown",
        over: o ? "touchmove" : "mousemove",
        end: o ? "touchend" : "mouseup"
    }, f = o ? function(e) {
        e.touches || (e = e.originalEvent.touches.item(0));
        return e;
    } : function(e) {
        return e;
    }, d = function() {
        this.start = t.proxy(this.start, this);
        this.over = t.proxy(this.over, this);
        this.end = t.proxy(this.end, this);
        this.onstart = this.onover = this.onend = l;
    };
    d.types = c;
    d.prototype = {
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
            e = f(e);
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
            e = f(e);
            return e;
        },
        endFix: function(e) {
            e = f(e);
            i.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            u && this.target[0].releaseCapture();
            return e;
        }
    };
    d.create = function(e, o, r) {
        r = t.extend({
            hook: null,
            onstart: l,
            onover: l,
            onend: l
        }, r);
        var a, s, u, c, f = t(e), p = r.hook ? t(r.hook) : f, h = new d(), v = d.types.start, g = e.className.replace(/^\s|\s.*/g, "") + "-drag-start", m = {
            off: function() {
                p.off(v, h.start);
            }
        };
        h.onstart = function(t) {
            var o = "fixed" === f.css("position"), l = i.scrollLeft(), d = i.scrollTop(), p = f.width(), h = f.height();
            a = 0;
            s = 0;
            u = o ? n.width() - p + a : i.width() - p;
            c = o ? n.height() - h + s : i.height() - h;
            var v = f.offset(), m = this.startLeft = o ? v.left - l : v.left, y = this.startTop = o ? v.top - d : v.top;
            this.clientX = t.clientX;
            this.clientY = t.clientY;
            f.addClass(g);
            r.onstart.call(e, t, m, y);
        };
        h.onover = function(t) {
            var n = t.clientX - this.clientX + this.startLeft, i = t.clientY - this.clientY + this.startTop, o = f[0].style;
            n = Math.max(a, Math.min(u, n));
            i = Math.max(s, Math.min(c, i));
            o.left = n + "px";
            o.top = i + "px";
            r.onover.call(e, t, n, i);
        };
        h.onend = function(t) {
            var n = f.position(), i = n.left, o = n.top;
            f.removeClass(g);
            r.onend.call(e, t, i, o);
        };
        h.off = function() {
            p.off(v, h.start);
        };
        o ? h.start(o) : p.on(v, h.start);
        return m;
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
        if (t) for (var r, a, s, u = -1, l = {
            type: e,
            timeStamp: c()
        }; r = t[++u]; ) {
            a = r[v];
            s = r[g] || i;
            try {
                o = r[m] === h ? a.call(s, l, n) !== !1 && o : a.apply(s, n) !== !1 && o;
            } catch (f) {
                setTimeout(function() {
                    console.error(f);
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
    function u(e, t) {
        e.forEach ? e.forEach(t) : function(e) {
            for (var n = -1, i = e.length; ++n < i; ) t(e[n], n);
        }(e);
    }
    var l = /\s+/, c = Date.now || function() {
        return +new Date();
    }, f = function() {
        return c() * Math.random() & 65535;
    }(), d = function() {
        var e, t, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, n) {
            var i = e.get(t);
            return null === n ? void 0 !== i && e["delete"](t) : !i && n ? (e.set(t, i = {}), 
            i) : i;
        }) : (t = c(), n = "__$widΦ" + t.toString(36), e = {}, function(i, o) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === o ? i[n] && (delete e[i[n]], delete i[n]) : (r = i[n] || o && (r = ++t, 
            e[r] = {}, i[n] = r), r && e[r]);
        });
    }(), p = 1, h = 2, v = 0, g = 1, m = 2, y = function(e, t, n) {
        var i = [];
        i[v] = e;
        i[g] = t;
        i[m] = n;
        return i;
    }, b = i.prototype;
    b.addListener = function(e, t, n, i) {
        var o, r, a, s = p;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
            s = h;
        }
        if (!t) return this;
        o = d(this, 1);
        e = e.split(l);
        for (;r = e.shift(); ) {
            a = !i && o[r] || (o[r] = []);
            a.push(y(t, n, s));
        }
        return this;
    };
    b.on = b.addListener;
    b.once = function(e, t, n) {
        var i = !1, o = function() {
            this.removeListener(e, o);
            if (!i) {
                i = !0;
                t.apply(n || this, arguments);
            }
        };
        o.guid = t.guid || (t.guid = f++);
        return this.on(e, o);
    };
    b.removeListener = function(e, t, n) {
        var i, o, r, a, u, c;
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
        e = e ? e.split(l) : x(i);
        for (;o = e.shift(); ) {
            r = i[o];
            if (r) if (t || n) for (a = r.length; --a >= 0; ) {
                u = r[a];
                c = u[v];
                t && c !== t && (void 0 === c.guid || c.guid !== t.guid) || n && u[g] !== n || r.splice(a, 1);
            } else delete i[o];
        }
        return this;
    };
    b.un = b.removeListener;
    b.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    b.emit = function(e) {
        var t, n, i, r, a, s, u = [], c = !0;
        if (!(t = d(this))) return this;
        e = e.split(l);
        for (a = 1, s = arguments.length; a < s; a++) u[a - 1] = arguments[a];
        for (;n = e.shift(); ) {
            (i = t.all) && (i = i.slice());
            (r = t[n]) && (r = r.slice());
            "all" !== n && (c = o(n, r, u, this) && c);
            c = o(n, i, [ n ].concat(u), this) && c;
        }
        return c;
    };
    i.applyTo = function(e) {
        function t(t, i) {
            e[t] = function() {
                var o = n[t].apply(i || e, Array.prototype.slice.call(arguments));
                return o === i ? this : o;
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
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : r.call(e, t);
    };
    b.listenerCount = r;
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
        var n, i, r, a = t.currentTarget, s = o(a), u = (t.handleObj || 0).origType || t.type;
        if (!t.isPropagationStopped()) {
            if (!s.attr("disabled") && (n = s.attr("action-type"))) {
                i = s.attr("action-data");
                t.action = n;
                t.data = i;
                r = e.e.emit(u + l + n, t, a);
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
    var o = e("jquery"), r = e("../event/emitter"), a = /\S+/g, s = -1, u = (+new Date()).toString(36), l = "/", c = function() {
        return u + ++s;
    }, f = function(e, t) {
        var n = e.guid || (e.guid = c()), i = function(n, i) {
            return e.call(t || i, n);
        };
        i.guid = n;
        return i;
    }, d = function() {}, p = function(e, t) {
        return "function" == typeof e ? e : t;
    }, h = function(e, t) {
        t = t || {};
        "string" == typeof e && (e = o(e)[0]);
        var n = {}, s = {}, u = new r(), c = t.context, h = {
            o: n,
            opts: t,
            e: u
        }, v = function(e) {
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
                    o(e).on(t, "[action-type]", v);
                }
                u.on(t + l + n[r], f(i, c));
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
                r = t + l + n[s];
                u.un(r, i);
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
            u.emit(t + l + n, r, i);
        };
        n.destroy = function() {
            var i = o(e);
            o.each(s, function(e, t) {
                delete s[e];
                i.off(e, "[action-type]", v);
            });
            u.un();
            for (var r in n) delete n[r];
            u = void 0;
            t = void 0;
            s = i = e = void 0;
            v = null;
        };
        return n;
    };
    n.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return l("<" + e + "/>")[0];
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
    function u(e, t, n, i, o) {
        var r, a, u = l(e), c = arguments, o = "boolean" == typeof c[c.length - 1] && c[c.length - 1], h = !1, v = function() {
            g();
        }, g = function(e) {
            h || m(!0);
        }, m = function(e) {
            if (!h) {
                h = !0;
                g = f;
                u.off(y, v);
                if (r) {
                    clearTimeout(r);
                    r = null;
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
        i = i || f;
        if (p) {
            n = n || "normal";
            t = t || "shake";
            a = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + t ].join(" ");
            u.on(y, v);
            r = setTimeout(v, s(n) + 100);
            o === !0 ? d(function() {
                u.addClass(a);
            }) : u.addClass(a);
        } else d(function() {
            i && i();
        });
        return {
            stop: function() {
                m.apply(null, arguments);
                return this;
            }
        };
    }
    var l = e("jquery"), c = e("./util"), f = (c.each, c.noop), d = c.setImmediate, p = a(), h = /\-v\-/g, v = document.getElementsByTagName("head")[0].appendChild(i("style")), g = v.sheet || v.styleSheet, m = {
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
    c.each(m, function(e, t) {
        e && o(g, t, e.replace(h, p));
    });
    t.effect = u;
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
        t._ = e = x(n, e);
        e.fixed = !!e.fixed && j();
        var r = o('<div class="' + v + '" id="' + (e.id || b()) + '" />').css({
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
                j() || x(n, {
                    position: "absolute",
                    width: c.width() + "px",
                    height: f.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", _(t.focus, t));
                t._shadow = a.clone(!0);
                a.css(n).addClass(v + "-mask");
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
                c.on("resize", s);
            });
            t.on("destroy", function() {
                c.off("resize", s);
            });
        }
        t.destroyed = !1;
        t.initialized = !0;
    }
    var o = e("jquery"), r = e("../../../core/1.0.0/utils/util"), a = e("../../../core/1.0.0/utils/css"), s = e("../../../core/1.0.0/event/emitter"), u = window, l = u.document, c = o(u), f = o(l), d = l.documentElement, p = /\S+/g, h = !("minWidth" in d.style), v = "ui-layer", g = u.Math, m = g.max, y = g.ceil, b = r.guid, x = r.extend, w = r.each, _ = function(e, t) {
        return e.bind ? e.bind(t) : function() {
            return e.apply(t, arguments);
        };
    }, C = r.setImmediate, A = function(e) {
        return u.parseInt(e, 10) || 0;
    }, T = function(e) {
        return e && 1 === e.nodeType;
    }, j = function() {
        return j._ || (j._ = function() {
            var e = l.createElement("div"), t = e.cloneNode(!1), n = !1, i = l.body || function() {
                n = !0;
                return d.appendChild(l.createElement("body"));
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
    }, k = function() {
        return {
            x: f.scrollLeft(),
            y: f.scrollTop()
        };
    }, $ = function(e) {
        return {
            w: e.width(),
            h: e.height()
        };
    }, E = function() {
        return $(c);
    }, P = function(e) {
        var t = T(e), n = t ? o(e).offset() : {
            left: e.pageX,
            top: e.pageY
        };
        e = t ? e : e.target;
        var i = e.ownerDocument;
        if (i === u.document) return n;
        var r = i.defaultView || i.parentWindow, a = r.frameElement, s = k(), l = o(a).offset();
        return {
            left: n.left + l.left - s.x,
            top: n.top + l.top - s.y
        };
    }, I = function(e, t) {
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
    }, z = function(e) {
        return I(e, "width");
    }, q = function(e) {
        return I(e, "height");
    }, S = function() {
        try {
            var e = l.activeElement, t = e.contentDocument;
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
            var n, i = this, o = i._, r = e, s = null, u = i._anim;
            u && u.stop(!0);
            if (i.destroyed || o.showing || i.open) return i;
            t = x({}, i._, t);
            if (void 0 !== r) {
                n = typeof r;
                "boolean" === n ? t.modal = r : r && "object" === n && (T(r) || T(r.target) ? s = r : x(t, r));
            }
            var l = i._popup, c = t.showWithAni, f = function() {
                delete o.showing;
                i.emit("shown");
            };
            if (!i._ready) {
                i.emit("render", t);
                i._ready = !0;
            }
            i.open = !0;
            i.anchor = s;
            i._activeElement = S();
            i.emit("beforeShow", t);
            l.appendTo(t.appendTo).css("display", "block");
            i.emit("show", t);
            o.showing = !0;
            if (c && "none" !== c) {
                var d = c.split(":");
                i._anim = a.effect(i.node, d[0], d[1], f);
            } else f();
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
                var u = r.split(":");
                n._anim = a.effect(o, u[0], u[1], t);
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
            var t = this._, n = this.node, r = this._popup, a = i.current, s = t.zIndex;
            a && a !== this && a.blur(!1);
            if (!o.contains(n, S())) {
                var u = r.find("[autofocus]")[0];
                !t.focusing && u ? t.focusing = !0 : u = n;
                this._focus(u);
            }
            if (void 0 === s) {
                s = t.zIndex = i.zIndex++;
                r.css("zIndex", s);
                r.addClass(v + "-focus");
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
            this._popup.removeClass(v + "-focus");
            this.emit("blur");
            return this;
        },
        _focus: function(e) {
            if (e && this._.autofocus && !/^iframe$/i.test(e.nodeName)) try {
                e.focus();
            } catch (t) {}
        },
        center: function() {
            var e = this._popup, t = this._.fixed, n = k(), i = E(), o = $(e), r = t ? 0 : n.x, a = t ? 0 : n.y, s = (i.w - o.w) / 2 + r, u = .382 * (i.h - o.h) + a;
            e.css({
                left: m(A(s), r),
                top: m(A(u), a)
            });
            return this;
        },
        alignTo: function(e, t) {
            var n = this, i = n._, r = n._popup, a = e.parentNode && o(e);
            if (!a) return n;
            var s = a.offset();
            if (s.left * s.top < 0) return n.center();
            t = t || i.align;
            var u = N(t), l = u.align, c = !u.auto;
            l && l.length || (l = [ "b" ]);
            var f = n._dirClass;
            f && r.removeClass(f);
            var d = i.fixed, p = E(), h = k(), g = z(r), m = q(r), b = P(e), x = z(a), _ = q(a), C = b.left, T = b.top, j = d ? C - h.x : C, $ = d ? T - h.y : T, I = d ? 0 : h.x, S = d ? 0 : h.y, D = I + p.w - g, L = S + p.h - m, M = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, O = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, U = {}, R = [ {
                t: $ - m,
                b: $ + _,
                l: j - g,
                r: j + x
            }, {
                t: $,
                b: $ - m + _,
                l: j,
                r: j - g + x
            } ], W = {
                l: j + y((x - g) / 2),
                t: $ + y((_ - m) / 2)
            }, G = {
                left: [ I, D ],
                top: [ S, L ]
            };
            c || w(l, function(e, t) {
                R[t][e] > G[O[e]][1] && (e = l[t] = M[e]);
                R[t][e] < G[O[e]][0] && (l[t] = M[e]);
            });
            var B = l[0];
            if (!l[1]) {
                l[1] = "left" === O[B] ? "t" : "l";
                R[1][l[1]] = W[l[1]];
            }
            R[0][B] = R[0][B] + 10 * ("tl".indexOf(B) !== -1 ? -1 : 1);
            U[O[l[0]]] = A(R[0][l[0]]);
            U[O[l[1]]] = A(R[1][l[1]]);
            var F = v + "-" + B;
            r.css(U).addClass(F);
            n._dirClass = F;
            var H = n.$("arrow", 1), V = n.$("inner", 1);
            if (!H) {
                if (!V) return n;
                H = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(V);
            }
            var Q, Y, X = "top" !== O[B], J = [ "v", "h" ][1 ^ X], Z = z(H), K = q(H), ee = {}, te = X ? "left" : "top";
            switch (J) {
              case "h":
                Q = y(C + (x - Z) / 2);
                ee.left = Q;
                break;

              case "v":
                Y = y(T + (_ - K) / 2);
                ee.top = Y;
            }
            H.offset(ee).css(te, "");
            return n;
        }
    });
    i.zIndex = 1024;
    i.current = null;
    n.exports = i;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("../../../core/1.0.0/dom/delegator"), a = e("./popup"), s = o.extend, u = o.guid, l = o.each, c = window.document, f = {
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
        var t = e || (e = {}), n = e.id || e.id || u(), o = p.get(n) || this;
        "string" != typeof e && 1 !== e.nodeType || (e = {
            content: e
        });
        e = s({}, f, e);
        e.original = t;
        var r, a = e.button || (e.button = []);
        if (!i.isArray(r = a)) {
            r = [];
            a && "object" == typeof a && l(a, function(e, t) {
                e.id = t;
                r.push(e);
            });
            a = e.button = r;
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
                var n = t.target, i = n.nodeName, o = /^input|textarea$/i, r = a.current === e, s = t.keyCode;
                !r || o.test(i) && "button" !== n.type || 27 === s && e.hide();
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
            var t = this, n = t._, i = "", o = 0, r = n.buttonClass;
            if ("string" == typeof e) {
                i = e;
                o++;
            } else l(e, function(e, a) {
                var s = e.id, u = e.fn || e.callback, l = e.display !== !1, c = e.className || r, f = [ c ];
                e.autofocus && f.push(n.buttonClassLight);
                "function" == typeof u && t.delegate(s, u);
                l && o++;
                i += '<button type="button" action-type="' + s + '"' + (l ? "" : ' style="display:none"') + (' class="' + f.join(" ") + '"') + (e.disabled ? " disabled" : "") + ">" + (e.text || e.value) + "</button>";
            });
            t.$("button").html(i);
            t.$("footer")[o ? "show" : "hide"]();
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
    p.getCurrent = function() {
        return a.current;
    };
    p.get = function(e) {
        return void 0 === e ? d : d[e];
    };
    p.config = function(e) {
        e && s(f, e);
    };
    n.exports = p;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("./drag"), a = e("./dialog"), s = o.each, u = o.extend, l = window.clearTimeout, c = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var e = i('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + c + '"</i>').appendTo("body");
        setTimeout(function() {
            e.remove();
            e = null;
        }, 50);
    }();
    var f = {
        info: "&#x69;",
        warn: "&#x21;",
        confirm: "&#x3f;",
        ok: "&#x2714;",
        error: "&#x2718;",
        loading: '<img src="' + c + '" />'
    }, d = function(e) {
        var t = f[e];
        return t ? '<i node-type="icon" class="x-icon ui-box-iconf">' + t + "</i>" : "";
    }, p = o.guid("__x") + "$", h = function(e) {
        return p + e;
    }, v = function(e, t) {
        var n, i = t.xtype, o = i && d(i) || t.iconHTML;
        if (o) {
            n = e ? '<div node-type="text" class="x-text">' + e + "</div>" : "";
            e = [ '<div class="ui-box-x-wrap">', o, n, "</div>" ].join("");
        }
        return e;
    }, g = function(e) {
        var t = e.contentWindow;
        if (t) try {
            return t.document;
        } catch (n) {
            return 0;
        }
    }, m = function(e) {
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
                t = y(e, n.url);
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
    }, y = function(e, t) {
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
        }, u = function(t) {
            n.showing ? e.once("shown", t) : t();
        };
        if (!r.length) {
            var l = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), c = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (l ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + t + '"></iframe>';
            r = i(c.replace(/{id}/g, n.id)).appendTo(o);
            a = r[0];
            n.autoSize ? r.one("load", function() {
                var e, t, n, o = g(a), l = o && i(o);
                if (l) {
                    e = l.width();
                    r.width(e);
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
            e.content = v(e.content, e);
            "none" !== o && (e.className = (e.className || "") + " ui-box-x-" + o);
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
                var f = i(v("Loading...", {
                    xtype: "loading"
                })).addClass("ui-box-x-loading");
                e.content = f;
                e.className = (e.className || "") + " ui-box-iframe";
                t.once("load", function() {
                    f.remove();
                    f = null;
                    c && t.$("close").show();
                });
                t.on("hidden", function() {
                    t.destroy();
                });
                m(t);
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
    }, x = "__showDelay", w = "__hideTimer";
    o.inherits(b, a, {
        show: function(e, t) {
            var n = this, i = n._, r = [].slice.call(arguments), t = u({}, i, t), a = t.duration || 0, s = t.delay || 0, c = function() {
                o.each([ x, w ], function(e, t) {
                    t = i[e];
                    delete i[e];
                    t && l(t);
                });
            }, f = function() {
                if (a > 0) {
                    i[w] = setTimeout(function() {
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
            var e = this, t = e._;
            t && o.each([ x, w ], function(e, n) {
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
            if (e && (t = e.frameElement)) for (var o in i) if (i.hasOwnProperty(o)) {
                n = i[o];
                if (n.iframeNode === t) return n;
            }
            return i[e];
        }
    };
    n.exports = b;
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
    }(), u = function(e) {
        return !!(e && e.nodeType && e.tagName);
    }, l = o.guid, c = function() {
        return l("__0x$");
    }, f = function(e) {
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
        var t = f([ e, t ]);
        return new i(t);
    }, p = function(e, t, n) {
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
        var i = d(s({
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
            return d(t).show();
        },
        confirm: function(e, t, n, i) {
            var o;
            if (!i && n && "object" == typeof n) {
                u(n) ? i = n : o = n;
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
            var l = d(s({
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
            }, o));
            return l.show(i);
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
            }, u = n && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            u && e.apply(r, a);
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
    }, a = window, s = e(a), u = a.Image, l = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, d = 1, p = 2, h = function(e) {
        return e[c] === t;
    }, v = function() {
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
    v.define("image", function(n, i, o, r) {
        if (i) {
            var a = new u(), s = function() {
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
    v.define("html", function(e, t, n, i) {
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
        r(g);
        var _ = u.type || w.type, C = v.get(_);
        if ("function" != typeof C) throw "Error, cannot found the specific type loader (type: `" + _ + "`)";
        "html" === _ && (w.placeholder = "");
        u && e.extend(w, u);
        var A = w.container, T = w.event, j = 0 === T.indexOf("scroll"), k = A && A !== a ? e(A) : s, $ = function(t) {
            var i = g._list;
            if (i.length > 0) {
                var o = 0;
                n(i.slice(0), function(t, n) {
                    var i = e(n);
                    if (!w.skipInvisible || i.is(":visible")) if (b(n, w) || x(n, w)) ; else if (m(n, w) || y(n, w)) {
                        if (++o > w.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        o = 0;
                    }
                });
            } else g.reset();
        }, E = function() {
            g._list = i(g._list, function(e) {
                return !e[c];
            });
        }, P = function() {
            var t = this, n = e(t), i = n.attr("data-" + w.dataAttribute), o = w.sourceMaker, r = w.appear, a = w.loadingClass, s = t[c];
            if (s === f) {
                t[c] = d;
                a && n.addClass(a);
                o && (i = o(i, t));
                r && r.apply(g, [ t, i ]);
                C.call(g, t, i, w, function(e, o) {
                    if (!g._destroyed) {
                        a && n.removeClass(a);
                        if (e) setTimeout(function() {
                            t[c] = f;
                            g.emit("lazyItemError", t, i, e);
                            t = null;
                        }, 300); else {
                            t[c] = p;
                            E();
                            g.emit("lazyItemReady", t, i, o);
                            var r = w.load;
                            r && r.apply(g, [ t, i, o ]);
                            t = null;
                        }
                        n = null;
                    }
                });
            } else if (s === p) {
                E();
                g.emit("lazyItemReady", t, i);
            }
        }, I = function() {
            this[c] || e(this).trigger("appear");
        }, z = function(t) {
            var n = e(t);
            t[c] = f;
            var i = w.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === g._.type || n.children()[0] || n.html(i);
            n.on("appear", P);
            j || n.on(T, I);
            g._list.push(t);
        }, q = function(e) {
            e = i(e || [], h);
            if (e.length) {
                n(e, function(e, t) {
                    z(t);
                });
                g._inited || S(g);
            }
        }, S = function(t) {
            if (!t._inited) {
                var i = o($, 30);
                t._inited = !0;
                j && k.on(T, i);
                s.on("resize", i);
                if (l) {
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
                    j && k.off(T, i);
                    s.off("resize", i);
                });
                e(document).ready($);
            }
        }, N = function(t) {
            var n = e(t);
            n.off("appear", P);
            j || n.off(T, I);
        };
        g.on("lazyItemReady", function(e) {
            N(e);
        });
        g.once("destroy", function() {
            q = null;
            $ = null;
            E = null;
            P = null;
            I = null;
        });
        g._ = w;
        g._list = [];
        g.add = function(t) {
            var n = e(t);
            n.length > 0 && q(n);
        };
        g.update = $;
        q(t);
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
        return v.define(e, t);
    };
    var m = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top + e(o).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return i <= e(t).offset().top - n.threshold;
    }, y = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left + e(o).width() : s.width() + s.scrollLeft();
        return i <= e(t).offset().left - n.threshold;
    }, b = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top : s.scrollTop();
        return i >= e(t).offset().top + n.threshold + e(t).height();
    }, x = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left : s.scrollLeft();
        return i >= e(t).offset().left + n.threshold + e(t).width();
    }, w = function(e, t) {
        return !(y(e, t) || x(e, t) || m(e, t) || b(e, t));
    };
    g.belowthefold = m;
    g.rightoffold = y;
    g.abovethetop = b;
    g.leftofbegin = x;
    g.inviewport = w;
    return g;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../utils/util"), r = e("../event/emitter"), a = o.setImmediate, s = o.noop, u = o.extend, l = i.trim, c = i.parseJSON, f = function(e, t, n) {
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
        e = u(t, e);
        delete e.error;
        delete e.success;
        this._opts = e;
    };
    u(h.prototype, {
        send: function() {
            var e = this, t = this._opts, n = u({}, t), i = "jsonp" === n.dataType;
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
                    origin: t,
                    status: a || o
                };
                f ? e.emit("response", null, r) : e.emit("error", s, r);
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
        }, u = f(t.error || s, null, r), l = f(t.success || s, null, r);
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
            o.on("error", function(e, t) {
                var n = {
                    code: e.error,
                    message: e.msg,
                    status: t.status,
                    origin: t.origin,
                    response: t.data
                };
                d("error", n, t) !== !1 && u(e);
            });
            o.on("response", function(e, t) {
                t = t.data;
                d("response", t) !== !1 && (e ? u(e) : t && 0 === +(t.error || 0) ? l(t) : u(t));
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

!function() {
    function e(e) {
        return e.replace(b, "").replace(x, ",").replace(w, "").replace(_, "").replace(C, "").split(A);
    }
    function t(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
    }
    function n(n, i) {
        function o(e) {
            return d += e.split(/\n/).length - 1, c && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), 
            e && (e = y[1] + t(e) + y[2] + "\n"), e;
        }
        function r(t) {
            var n = d;
            if (l ? t = l(t, i) : a && (t = t.replace(/\n/g, function() {
                return d++, "$line=" + d + ";";
            })), 0 === t.indexOf("=")) {
                var o = f && !/^=[=#]/.test(t);
                if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""), o) {
                    var r = t.replace(/\s*\([^\)]+\)/, "");
                    p[r] || /^(include|print)$/.test(r) || (t = "$escape(" + t + ")");
                } else t = "$string(" + t + ")";
                t = y[1] + t + y[2];
            }
            return a && (t = "$line=" + n + ";" + t), m(e(t), function(e) {
                if (e && !v[e]) {
                    var t;
                    t = "print" === e ? x : "include" === e ? w : p[e] ? "$utils." + e : h[e] ? "$helpers." + e : "$data." + e, 
                    _ += e + "=" + t + ",", v[e] = !0;
                }
            }), t + "\n";
        }
        var a = i.debug, s = i.openTag, u = i.closeTag, l = i.parser, c = i.compress, f = i.escape, d = 1, v = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, g = "".trim, y = g ? [ "$out='';", "$out+=", ";", "$out" ] : [ "$out=[];", "$out.push(", ");", "$out.join('')" ], b = g ? "$out+=text;return $out;" : "$out.push(text);", x = "function(){var text=''.concat.apply('',arguments);" + b + "}", w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + b + "}", _ = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0," : ""), C = y[0], A = "return new String(" + y[3] + ");";
        m(n.split(s), function(e) {
            e = e.split(u);
            var t = e[0], n = e[1];
            1 === e.length ? C += o(t) : (C += r(t), n && (C += o(n)));
        });
        var T = _ + C + A;
        a && (T = "try{" + T + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var j = new Function("$data", "$filename", T);
            return j.prototype = p, j;
        } catch (k) {
            throw k.temp = "function anonymous($data,$filename) {" + T + "}", k;
        }
    }
    var i = function(e, t) {
        return "string" == typeof t ? g(t, {
            filename: e
        }) : a(e, t);
    };
    i.version = "3.0.0", i.config = function(e, t) {
        o[e] = t;
    };
    var o = i.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, r = i.cache = {};
    i.render = function(e, t) {
        return g(e, t);
    };
    var a = i.renderFile = function(e, t) {
        var n = i.get(e) || v({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? n(t) : n;
    };
    i.get = function(e) {
        var t;
        if (r[e]) t = r[e]; else if ("object" == typeof document) {
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
    }, f = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, d = function(e, t) {
        var n, i;
        if (f(e)) for (n = 0, i = e.length; i > n; n++) t.call(e, e[n], n, e); else for (n in e) t.call(e, e[n], n);
    }, p = i.utils = {
        $helpers: {},
        $include: a,
        $string: s,
        $escape: c,
        $each: d
    };
    i.helper = function(e, t) {
        h[e] = t;
    };
    var h = i.helpers = p.$helpers;
    i.onerror = function(e) {
        var t = "Template Error\n\n";
        for (var n in e) t += "<" + n + ">\n" + e[n] + "\n\n";
        "object" == typeof console && console.error(t);
    };
    var v = function(e) {
        return i.onerror(e), function() {
            return "{Template Error}";
        };
    }, g = i.compile = function(e, t) {
        function i(n) {
            try {
                return new u(n, s) + "";
            } catch (i) {
                return t.debug ? v(i)() : (t.debug = !0, g(e, t)(n));
            }
        }
        t = t || {};
        for (var a in o) void 0 === t[a] && (t[a] = o[a]);
        var s = t.filename;
        try {
            var u = n(e, t);
        } catch (l) {
            return l.filename = s || "anonymous", l.name = "Syntax Error", v(l);
        }
        return i.prototype = u.prototype, i.toString = function() {
            return u.toString();
        }, s && t.cache && (r[s] = i), i;
    }, m = p.$each, y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", b = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, x = /[^\w$]+/g, w = new RegExp([ "\\b" + y.replace(/,/g, "\\b|\\b") + "\\b" ].join("|"), "g"), _ = /^\d[^,]*|,\d[^,]*/g, C = /^,+|,+$/g, A = /^$|,+/;
    o.openTag = "{{", o.closeTag = "}}";
    var T = function(e, t) {
        var n = t.split(":"), i = n.shift(), o = n.join(":") || "";
        return o && (o = ", " + o), "$helpers." + i + "(" + e + o + ")";
    };
    o.parser = function(e) {
        e = e.replace(/^\s/, "");
        var t = e.split(" "), n = t.shift(), o = t.join(" ");
        switch (n) {
          case "if":
            e = "if(" + o + "){";
            break;

          case "else":
            t = "if" === t.shift() ? " if(" + t.join(" ") + ")" : "", e = "}else" + t + "{";
            break;

          case "/if":
            e = "}";
            break;

          case "each":
            var r = t[0] || "$data", a = t[1] || "as", s = t[2] || "$value", u = t[3] || "$index", l = s + "," + u;
            "as" !== a && (r = "[]"), e = "$each(" + r + ",function(" + l + "){";
            break;

          case "/each":
            e = "});";
            break;

          case "echo":
            e = "print(" + o + ");";
            break;

          case "print":
          case "include":
            e = n + "(" + t.join(",") + ");";
            break;

          default:
            if (/^\s*\|\s*[\w\$]/.test(o)) {
                var c = !0;
                0 === e.indexOf("#") && (e = e.substr(1), c = !1);
                for (var f = 0, d = e.split("|"), p = d.length, h = d[f++]; p > f; f++) h = T(h, d[f]);
                e = (c ? "=" : "=#") + h;
            } else e = i.helpers[n] ? "=#" + n + "(" + t.join(",") + ");" : "=" + e;
        }
        return e;
    }, "function" == typeof define ? define("template", [], function() {
        return i;
    }) : "undefined" != typeof exports ? module.exports = i : this.template = i;
}();

!function(e, t) {
    "function" == typeof define && define.amd ? define("lib/ui/pagination/1.0.1/pagination", [ "jquery" ], t) : e.returnExports = t(jQuery);
}(this, function(e) {
    "use strict";
    var t = "pagination", n = function(n, i) {
        var o = e(n);
        if (o.data(t)) throw "Please destroy the old pagination instance first.";
        this.pager = o;
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
            }, n || {}), o = this, r = o.pager;
            e.each(i, function(e, t) {
                var n = i[t];
                "function" == typeof n && (i[t] = function() {
                    return n.apply(o, arguments);
                });
            });
            i.pageCount = i.pageCount ? i.pageCount : Math.ceil(i.totalCount / i.pageSize) ? Math.ceil(i.totalCount / i.pageSize) : 1;
            i.currentPage = i.currentPage - 1;
            i.halfDisplayed = i.displayedPages / 2;
            r.addClass([ i.className, "ui-pager" ].join(" ")).data(t, i);
            o._draw();
            o._initEvents();
            i.onInit();
        },
        _initEvents: function() {
            var n = this, i = n.pager, o = n.data(), r = function() {
                var e, t, n = i.find(".page-no");
                if (n.length) {
                    e = n.val();
                    t = parseInt(e, 10);
                    if (!e || isNaN(t)) {
                        n.val(o.currentPage + 1);
                        return !1;
                    }
                    return t;
                }
                return !1;
            }, a = function(e) {
                if (!o.disabled) {
                    var t = r();
                    t > 0 && t <= o.pageCount && t - 1 !== o.currentPage && n._selectPage(t - 1, e);
                }
            };
            i.on("click", ".page-link", function(t) {
                t.preventDefault();
                var i = +e(this).data("page-index");
                isNaN(i) || n._selectPage(i, t);
            });
            o.displayInfo && i.on("click", ".page-no", function(e) {
                this.select();
            }).on("keydown", ".page-no", function(e) {
                13 === e.keyCode && a();
            }).on("click", ".page-info .ui-button", function(e) {
                e.preventDefault();
                a();
            });
            i.one("pagination.destroy", function() {
                i.undelegate(".page-link", "click").undelegate(".page-no", "click keydown").undelegate(".page-info .ui-button", "click").removeData(t);
                o = null;
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
            var o = this._wraper(!0);
            t.disabled && o.addClass("disabled");
            t.prevText && this._appendItem(t.currentPage - 1, {
                text: t.prevText,
                classes: "prev"
            });
            if (n.start > 0 && t.edges > 0) {
                var r = Math.min(t.edges, n.start);
                for (e = 0; e < r; e++) this._appendItem(e);
                t.edges < n.start && n.start - t.edges != 1 ? o.append('<li class="disabled"><span class="ellipse">' + t.ellipseText + "</span></li>") : n.start - t.edges == 1 && this._appendItem(t.edges);
            }
            for (e = n.start; e < n.end; e++) this._appendItem(e);
            if (n.end < t.pageCount && t.edges > 0) {
                t.pageCount - t.edges > n.end && t.pageCount - t.edges - n.end != 1 ? o.append('<li class="disabled"><span class="ellipse">' + t.ellipseText + "</span></li>") : t.pageCount - t.edges - n.end == 1 && this._appendItem(n.end++);
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
            var i, o, r = this, a = (r.pager, r.data()), s = e("<li></li>"), u = r._wraper();
            t = t < 0 ? 0 : t < a.pageCount ? t : a.pageCount - 1;
            i = {
                text: t + 1,
                classes: ""
            };
            a.labelMap.length && a.labelMap[t] && (i.text = a.labelMap[t]);
            i = e.extend(i, n || {});
            if (t === a.currentPage || a.disabled) {
                a.disabled ? s.addClass("disabled") : s.addClass("active");
                o = e('<span class="current">' + i.text + "</span>");
            } else o = e('<a href="' + a.hrefTextPrefix + (t + 1) + a.hrefTextSuffix + '" data-page-index="' + t + '" class="page-link">' + i.text + "</a>");
            i.classes && o.addClass(i.classes);
            s.append(o);
            u.append(s);
        },
        _selectPage: function(e, t) {
            var n = this, i = n.data(), o = function(e, t) {
                i.currentPage = e;
                i.selectOnClick && n._draw();
                i.onPage(e + 1, t);
            };
            if ("function" == typeof i.async) {
                var r = i.async({
                    pageSize: i.pageSize,
                    currentPage: e + 1
                });
                if (r && r.then) {
                    if (i.lock) return n;
                    i.lock = 1;
                    return r.then(function(i) {
                        var r = (i || 0).totalCount;
                        void 0 !== r && n.setTotalCount(r, !0);
                        o(e, t);
                        return n;
                    }).always(function() {
                        i.lock = 0;
                        i = void 0;
                        o = void 0;
                    });
                }
                throw "Error: Please make sure that the `async` returns is a Deferred's promise";
            }
            o(e);
            return n;
        },
        _renderPI: function() {
            var t, n = this, i = (n.pager, n.data()), o = i.currentPage + 1, r = i.pageCount, a = e('<li class="page-info"></li>'), s = n._wraper();
            o = o < 1 ? 1 : Math.min(o, r);
            t = "共" + i.pageCount + '页，跳转到第<input type="text" class="page-no" autocomplete="off" value="' + o + '">页<a class="ui-button" href="javascript:;">跳转</a>';
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
        n.options = o.extend(!0, {}, i, t);
        n._init();
    }
    var o = e("jquery"), r = e("lib/ui/pagination/1.0.1/pagination"), a = e("lib/core/1.0.0/io/request"), s = e("lib/core/1.0.0/event/emitter"), u = e("lib/core/1.0.0/utils/util");
    u.inherits(i, s);
    i.prototype._init = function() {
        var e = this, t = e.options;
        t.url && (t.options.async = function(n) {
            var i = {};
            i[t.alias.currentPage] = n.currentPage;
            i[t.alias.pageSize] = n.pageSize;
            e.emit("ajaxStart");
            var r = o.Deferred();
            a[t.ajaxType](t.url, o.extend({}, i, t.data), function(t) {
                e.emit("ajaxSuccess", t, function(t) {
                    if (t > 1) {
                        e.pagination.setTotalCount(t);
                        e.pagination.show();
                    } else {
                        e.pagination.setTotalCount(1);
                        e.pagination.hide();
                    }
                });
                r.resolve(t);
            }, function(t) {
                e.pagination.hide();
                e.emit("ajaxError", t);
                r.reject(t);
            });
            return r.promise();
        });
        t.options.onPage = function(t, n) {
            e.emit("change", t, n);
        };
        e.el.hide();
        e.pagination = new r(e.el, t.options);
        e.pagination.selectPage(t.options.currentPage);
        e.el.show();
    };
    i.prototype.destroy = function() {
        var e = this;
        e.pagination.destroy();
    };
    n.exports = i;
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return e.replace(s, "ms-").replace(u, l);
    }
    function o(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : c.test(e) ? a.parseJSON(e) : e);
        } catch (t) {}
    }
    function r(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType) {
            i = "data-" + t.replace(f, "-$&").toLowerCase();
            n = e.getAttribute(i);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var a = (window.document, e("jquery")), s = /^-ms-/, u = /-([\da-z])/gi, l = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, d = function(e, t, n) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, s, u, l;
        if (1 === arguments.length) {
            if (u = e.dataset) {
                l = {};
                for (s in u) u.hasOwnProperty(s) && (l[s] = o(u[s]));
                return l;
            }
            u = e.attributes;
            a = u.length;
            l = {};
            for (;a--; ) if (u[a]) {
                s = u[a].name;
                if (0 === s.indexOf("data-")) {
                    s = i(s.slice(5));
                    l[s] = o(r(e, s));
                }
            }
            return l;
        }
    };
    n.exports = d;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, n) {
    "use strict";
    function i(e, t, n, i) {
        i ? e[t] || (e[t] = n) : e[t] ? e[t] = e[t].add(n) : e[t] = r(n);
    }
    var o = window.document, r = e("jquery"), a = function(e, t, n) {
        var a, s, u, l, c, f = function(e) {
            if (n) for (var o in n) u[o] = r(n[o].toString(), e); else {
                u = {};
                l = r("[node-type]", e);
                for (var a, s = -1, c = l.length; ++s < c; ) {
                    a = l[s];
                    o = a.getAttribute("node-type");
                    i(u, o, a, t);
                }
            }
        }, d = function(e) {
            var n, o = u[e];
            if (!o || 0 === o.length) {
                n = r('[node-type="' + e + '"]', a);
                n.length && i(u, e, n, t);
                o = u[e];
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
        f(a);
        return {
            get: d,
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
        n.el = o(e);
        n.options = o.extend(!0, {}, i, t);
        var r = s.build(e, !1);
        n.hd = r.get("hd");
        n.bd = r.get("bd");
        n.hdItems = r.get("hdItem");
        n.containers = r.get("container");
        n._initEvent();
        n._init();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/utils/util"), s = e("lib/core/1.0.0/dom/build");
    a.inherits(i, r);
    i.prototype._initEvent = function() {
        var e = this;
        e.hdItems.on(e.options.event, function(t) {
            t.preventDefault();
            var n = o(this);
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
        var o = t.bd.find("[data-id=" + e + "]");
        o.addClass("current");
        t.emit("change", {
            hd: i,
            body: o
        });
    };
    n.exports = i;
});

define("module/navigation-bar/1.0.0/navigation-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(e, t, n) {
    "use strict";
    function i(e, t) {
        var n = this, i = {
            currentClass: "",
            navSelector: [],
            navItemSlect: "li"
        };
        n.el = o(e);
        n.options = o.extend(!0, {}, i, t);
        n._initEvent();
        n._init();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/utils/util");
    a.inherits(i, r);
    i.prototype._init = function() {};
    i.prototype._initEvent = function() {
        var e = this;
        e.el.on("click", e.options.navItemSlect, function() {
            var t = o(this);
            t.hasClass(e.options.currentClass) || t.addClass(e.options.currentClass).siblings().removeClass(e.options.currentClass);
            e.emit("change", e._get());
        });
    };
    i.prototype._get = function() {
        var e = this, t = {};
        o.each(e.options.navSelector, function(n, i) {
            if (!o(i).is(":hidden")) {
                var r = o(i).attr("name"), a = o(i).find("." + e.options.currentClass).attr("data-value");
                t[r] = a;
            }
        });
        return t;
    };
    i.prototype.get = function() {
        var e, t = this, n = t._get();
        t.el.attr("data-name") && (e = t.el.attr("data-name"));
        e && (n.name = e);
        return n;
    };
    n.exports = i;
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
        t.options = o.extend(!0, {}, n, e);
        if ("" == t.options.url) throw new Error("the params options.url is required");
        t.el = o(t.options.selector);
        var i = r.build(t.el[0], !1);
        t.ipt = i.get("ipt");
        t.btn = i.get("btn");
        t.lbl = i.get("lbl");
        t._init();
        t._initEvent();
    }
    var o = e("jquery"), r = (e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build"));
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
        var e = this, t = o.trim(e.ipt.val()), n = e.ipt.attr("data-id");
        t.length > 0 && e.focus();
        n && (e.options.alias = n);
        e.options.data && (e.options.data[e.options.alias] = o.trim(e.ipt.val()));
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
        return o.trim(e.ipt.val());
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
    var i = window.document, o = function(e) {
        if ("string" != typeof e) throw "trim need a string as parameter";
        for (var t = e.length, n = 0, i = t - 1, o = /(\u3000|\s|\t|\u00A0)/; n < t && o.test(e.charAt(n)); ) ++n;
        for (;i >= 0 && o.test(e.charAt(i)); ) --i;
        return e.substring(n, i + 1);
    }, r = function(e) {
        var t = {};
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }, a = function(e, t, n) {
        n = n || {};
        if (void 0 !== t) {
            n = r(n);
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
        }, f = l ? l.split("; ") : [], d = -1, p = f.length, h = e.length + 1; ++d < p; ) {
            l = o(f[d]);
            if (l.substring(0, h) === e + "=") {
                t = c(l.substring(h));
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
    var i = e("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", s = $PAGE_DATA && $PAGE_DATA[o] || null;
    t.getNick = function() {
        return s;
    };
    t.isLogin = function() {
        return !!i(r);
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
        t.options = o.extend(!0, {}, n, e);
        t.el = o(t.options.selector);
        t._init();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/dom/build"), a = e("./login");
    i.prototype._init = function() {
        var e = this;
        if (a.isLogin()) {
            var t = a.getNick();
            e.el.html(e._getLoginedHtml(t));
            e._initEvent();
        }
    };
    i.prototype._initEvent = function() {
        var e = this, t = !1, n = r.build(e.el[0], !1), i = n.get("userName"), o = n.get("tipsMenu");
        i.on("mouseenter", function() {
            t = !0;
            o.stop().fadeIn(500, function() {
                o.addClass("active");
            });
        });
        i.on("mouseleave", function() {
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
    i.prototype._getLoginedHtml = function(e) {
        var t = this, n = t.options, i = n.menuList, o = "";
        o += '<ul class="logined clearfix" node-type="logined">';
        o += '    <li class="item">';
        o += "        <span>您好，</span>";
        o += "    </li>";
        o += '    <li class="item tips-menu-box">';
        o += '        <a href="' + n.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + e + "</a>";
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

define("module/fix-bar/1.0.0/fix-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            onlineServiceUrl: ""
        };
        t.options = o.extend(!0, {}, n, e);
        t._init();
        t._initEvent();
    }
    var o = e("jquery");
    e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var e = this;
        e.el = o(e._getTemplete());
        o(document.body).append(e.el);
        e.height = e.el.height();
        e.resize();
    };
    i.prototype._initEvent = function() {
        var e = this;
        o(window).on("resize", function() {
            e.resize();
        });
    };
    i.prototype.resize = function() {
        var e = this, t = o(window).height(), n = (t - e.height) / 2;
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
        t.options = o.extend(!0, {}, n, e);
        t.el = o(t.options.selector);
        if (0 == t.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        t._init();
    }
    var o = e("jquery"), r = e("lib/plugins/lazyload/1.9.3/lazyload"), a = e("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var e = this, t = a.build(e.el[0], !1), n = t.get("footerImg");
        new r(n);
    };
    n.exports = i;
});

define("conf/course/index", [ "require", "exports", "module", "jquery", "lib/ui/box/1.0.1/box", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/io/request", "template", "plugins/pager/1.0.0/pager", "lib/ui/tab/1.0.0/tab", "module/navigation-bar/1.0.0/navigation-bar", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer" ], function(e, t, n) {
    "use strict";
    function i(e, t, n, i, o) {
        a && a.destroy();
        a = new d(o, {
            url: e,
            data: t
        });
        var s = null;
        a.on("ajaxStart", function() {
            s = l.loading("正在加载...", {
                modal: !1
            });
        });
        a.on("ajaxSuccess", function(e, t) {
            if (e && e.data && e.data.resultList && e.data.resultList.length > 0) {
                var a = f(n, e.data);
                document.getElementById(i).innerHTML = a;
                r = new c(u("#" + i).find(".jImg"), {
                    mouseWheel: !0,
                    effect: "fadeIn",
                    snap: !0
                });
                t && t(e.data.records);
            } else {
                var a = f("tEmpty", 1);
                document.getElementById(i).innerHTML = a;
                o.hide();
            }
            s && s.hide();
        });
        a.on("ajaxError", function(e) {
            document.getElementById(i).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
            s && s.hide();
        });
        a.on("change", function(e, t) {});
    }
    function o(e) {
        var t = _.find(".current").attr("data-target");
        switch (t) {
          case "1":
            i($PAGE_DATA.courseIndex, e, "tab0", "jTab0", b);
            break;

          case "2":
            i($PAGE_DATA.courseIndex, e, "tab1", "jTab1", b);
            break;

          case "3":
            i($PAGE_DATA.courseIndex, e, "tab2", "jTab2", b);
        }
    }
    var r, a, s, u = e("jquery"), l = e("lib/ui/box/1.0.1/box"), c = e("lib/plugins/lazyload/1.9.3/lazyload"), f = (e("lib/core/1.0.0/io/request"), 
    e("template")), d = e("plugins/pager/1.0.0/pager"), p = e("lib/ui/tab/1.0.0/tab"), h = e("module/navigation-bar/1.0.0/navigation-bar"), v = e("module/top-search/1.0.0/top-search"), g = e("module/login-status/1.0.0/login-status"), m = e("module/fix-bar/1.0.0/fix-bar"), y = e("module/footer/1.0.0/footer"), b = (new v(), 
    new g(), new m(), new y(), u("#jPagination")), x = u("#jCourseType"), w = new p(x), _ = u("#jNavType"), C = u("#jNavClassify"), A = u("#jNavStatus"), T = u("#jNavSubClassify"), j = u("#jClassNav1"), k = u("#jClassNav2"), $ = u("#jStatusNav2");
    w.on("change", function(e) {
        s = e.body.attr("data-id");
        switch (s) {
          case "1":
            _.removeClass("ui-nav-border");
            C.hide().removeClass("ui-nav-border");
            A.hide().removeClass("ui-nav-border");
            T.hide();
            j.hide();
            k.hide();
            $.hide();
            break;

          case "2":
            _.addClass("ui-nav-border");
            C.show().removeClass("ui-nav-border");
            A.hide();
            T.show();
            j.show();
            k.hide();
            $.hide();
            break;

          case "3":
            _.addClass("ui-nav-border");
            C.show().addClass("ui-nav-border");
            A.show();
            T.hide();
            j.hide();
            k.show();
            $.show();
        }
    });
    w.setCurrent();
    var E = new h("#jCourseNav", {
        currentClass: "current",
        navSelector: [ "#jNavType", "#jClassNav1", "#jClassNav2", "#jStatusNav2", "#jNavSubClassify" ]
    }), P = E.get();
    o(P);
    E.on("change", function(e) {
        o(e);
    });
});