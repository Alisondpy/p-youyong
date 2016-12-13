/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    function o(t) {
        return "object" == typeof t && null !== t;
    }
    function i() {}
    function r(t, e) {
        for (var n = t.length, o = -1; ++o < n; ) e(t[o], o);
    }
    function u(t, e) {
        for (var n in t) h.call(t, n) && e(t[n], n, t);
    }
    function s(t, e) {
        if (t && t.forEach) return t.forEach(e);
        p(t) ? r(t, e) : u(t, e);
    }
    function a(t, e) {
        for (var n = -1, o = t.length, i = Array(o); ++n < o; ) i[n] = e(t[n], n, t);
        return i;
    }
    function c(t, e) {
        var n = [];
        s(t, function(t, o, i) {
            n.push(e(t, o, i));
        });
        return n;
    }
    function f(t, e) {
        if (!e || !o(e)) return t;
        for (var n = m(e), i = n.length; i--; ) t[n[i]] = e[n[i]];
        return t;
    }
    function l(t) {
        "?" === t.charAt(0) && (t = t.substr(1));
        for (var e, n = {}, o = t.split("&"), i = -1, r = o.length; ++i < r; ) {
            e = o[i].split("=");
            n[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
        }
        return n;
    }
    var d = new Function("return this")(), h = Object.prototype.hasOwnProperty, p = Array.isArray || function(t) {
        return t && t instanceof Array;
    }, v = function() {
        var t = (+new Date()).toString(36), e = -1;
        return function(n) {
            return (n || "") + t + ++e;
        };
    }(), m = Object.keys || function(t) {
        var e = [];
        u(t, function(t, n) {
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
        g[t] || (g[t] = i);
    });
    e.extend = function(t, e) {
        for (var n = [].slice.call(arguments, 1), o = n.length, i = -1; ++i < o; ) f(t, n[i]);
        return t;
    };
    e.inherits = function(t, e, n) {
        y(t, e);
        n && f(t.prototype, n);
    };
    e.impls = function(t, n) {
        n = "function" == typeof n ? n.prototype : n;
        e.mix(t.prototype, n);
        return t;
    };
    e.parseQuery = l;
    e.parseParams = l;
    e.each = s;
    e.map = function(t, e) {
        var n = p(t) ? a : c;
        return n(t, e);
    };
    e.filter = function(t, e) {
        var n, o, i = p(t) ? (n = r, o = function(t, e) {
            i.push(e);
        }, []) : (n = u, o = function(t, e) {
            i[t] = e;
        }, {});
        n(t, function(t, n) {
            e(t, n) && o(n, t);
        });
        return i;
    };
    e.mix = function b(t, e, n, o, i) {
        for (var r in e) e.hasOwnProperty(r) && (e[r] && t[r] && n && "object" == typeof e[r] ? b(t[r], e[r], n, o, i) : (void 0 === t[r] || o) && (i && !i(t[r], e[r]) || (t[r] = e[r])));
        return t;
    };
    e.guid = v;
    e.setImmediate = function() {
        var t = d.document, e = d.postMessage, n = d.setImmediate;
        return n ? n : "onreadystatechange" in t.createElement("script") ? function(e) {
            function n() {
                o.onreadystatechange = null;
                o.parentNode.removeChild(o);
                e();
            }
            var o = t.createElement("script");
            o.onreadystatechange = n;
            t.documentElement.appendChild(o);
        } : e ? function(t) {
            function n(e) {
                if (e.data === o) {
                    d.removeEventListener("message", n, !0);
                    t();
                }
            }
            var o = v();
            d.addEventListener("message", n, !0);
            e(o, "*");
        } : function(t) {
            d.setTimeout(t, 0);
        };
    }();
    e.noop = i;
    e.throttle = function(t, e) {
        e = e ? e : 150;
        if (e === -1) return function() {
            t.apply(this, arguments);
        };
        var n;
        return function() {
            var o = +new Date();
            if (!n || o - n > e) {
                n = o;
                t.apply(this, arguments);
            }
        };
    };
    e.debounce = function(t, e, n, o) {
        var i;
        return function() {
            var r = o || this, u = arguments, s = function() {
                i = null;
                n || t.apply(r, u);
            }, a = n && !i;
            clearTimeout(i);
            i = setTimeout(s, e);
            a && t.apply(r, u);
        };
    };
    e.deprecate = function(t, e) {
        function n() {
            o || (o = !0);
            return t.apply(this, arguments);
        }
        if (d.noDeprecation === !0) return t;
        var o = !1;
        return n;
    };
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(t) {
    "use strict";
    var e = t("jquery"), n = e(window), o = e(document), i = "createTouch" in document, r = document.documentElement, u = !("minWidth" in r.style), s = !u && "onlosecapture" in r, a = "setCapture" in r, c = e.noop, f = {
        start: i ? "touchstart" : "mousedown",
        over: i ? "touchmove" : "mousemove",
        end: i ? "touchend" : "mouseup"
    }, l = i ? function(t) {
        t.touches || (t = t.originalEvent.touches.item(0));
        return t;
    } : function(t) {
        return t;
    }, d = function() {
        this.start = e.proxy(this.start, this);
        this.over = e.proxy(this.over, this);
        this.end = e.proxy(this.end, this);
        this.onstart = this.onover = this.onend = c;
    };
    d.types = f;
    d.prototype = {
        start: function(t) {
            t = this.startFix(t);
            o.on(f.over, this.over).on(f.end, this.end);
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
            o.off(f.over, this.over).off(f.end, this.end);
            this.onend(t);
            return !1;
        },
        startFix: function(t) {
            t = l(t);
            this.target = e(t.target);
            this.selectstart = function() {
                return !1;
            };
            o.on("selectstart", this.selectstart).on("dblclick", this.end);
            s ? this.target.on("losecapture", this.end) : n.on("blur", this.end);
            a && this.target[0].setCapture();
            return t;
        },
        overFix: function(t) {
            t = l(t);
            return t;
        },
        endFix: function(t) {
            t = l(t);
            o.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            a && this.target[0].releaseCapture();
            return t;
        }
    };
    d.create = function(t, i, r) {
        r = e.extend({
            hook: null,
            onstart: c,
            onover: c,
            onend: c
        }, r);
        var u, s, a, f, l = e(t), h = r.hook ? e(r.hook) : l, p = new d(), v = d.types.start, m = t.className.replace(/^\s|\s.*/g, "") + "-drag-start", y = {
            off: function() {
                h.off(v, p.start);
            }
        };
        p.onstart = function(e) {
            var i = "fixed" === l.css("position"), c = o.scrollLeft(), d = o.scrollTop(), h = l.width(), p = l.height();
            u = 0;
            s = 0;
            a = i ? n.width() - h + u : o.width() - h;
            f = i ? n.height() - p + s : o.height() - p;
            var v = l.offset(), y = this.startLeft = i ? v.left - c : v.left, g = this.startTop = i ? v.top - d : v.top;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            l.addClass(m);
            r.onstart.call(t, e, y, g);
        };
        p.onover = function(e) {
            var n = e.clientX - this.clientX + this.startLeft, o = e.clientY - this.clientY + this.startTop, i = l[0].style;
            n = Math.max(u, Math.min(a, n));
            o = Math.max(s, Math.min(f, o));
            i.left = n + "px";
            i.top = o + "px";
            r.onover.call(t, e, n, o);
        };
        p.onend = function(e) {
            var n = l.position(), o = n.left, i = n.top;
            l.removeClass(m);
            r.onend.call(t, e, o, i);
        };
        p.off = function() {
            h.off(v, p.start);
        };
        i ? p.start(i) : h.on(v, p.start);
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
    function o() {}
    function i(t, e, n, o) {
        var i = !0;
        if (e) for (var r, u, s, a = -1, c = {
            type: t,
            timeStamp: f()
        }; r = e[++a]; ) {
            u = r[v];
            s = r[m] || o;
            try {
                i = r[y] === p ? u.call(s, c, n) !== !1 && i : u.apply(s, n) !== !1 && i;
            } catch (l) {
                setTimeout(function() {
                    console.error(l);
                }, 1);
            }
        }
        return i;
    }
    function r(t) {
        var e, n = d(this);
        if (n) {
            e = n[t];
            return e.length;
        }
        return 0;
    }
    function u(t) {
        return "[object Function]" === Object.prototype.toString.call(t);
    }
    function s(t, e) {
        for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
    }
    function a(t, e) {
        t.forEach ? t.forEach(e) : function(t) {
            for (var n = -1, o = t.length; ++n < o; ) e(t[n], n);
        }(t);
    }
    var c = /\s+/, f = Date.now || function() {
        return +new Date();
    }, l = function() {
        return f() * Math.random() & 65535;
    }(), d = function() {
        var t, e, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (t = new WeakMap(), 
        function(e, n) {
            var o = t.get(e);
            return null === n ? void 0 !== o && t["delete"](e) : !o && n ? (t.set(e, o = {}), 
            o) : o;
        }) : (e = f(), n = "__$widΦ" + e.toString(36), t = {}, function(o, i) {
            if (!o || "object" != typeof o) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === i ? o[n] && (delete t[o[n]], delete o[n]) : (r = o[n] || i && (r = ++e, 
            t[r] = {}, o[n] = r), r && t[r]);
        });
    }(), h = 1, p = 2, v = 0, m = 1, y = 2, g = function(t, e, n) {
        var o = [];
        o[v] = t;
        o[m] = e;
        o[y] = n;
        return o;
    }, b = o.prototype;
    b.addListener = function(t, e, n, o) {
        var i, r, u, s = h;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
            s = p;
        }
        if (!e) return this;
        i = d(this, 1);
        t = t.split(c);
        for (;r = t.shift(); ) {
            u = !o && i[r] || (i[r] = []);
            u.push(g(e, n, s));
        }
        return this;
    };
    b.on = b.addListener;
    b.once = function(t, e, n) {
        var o = !1, i = function() {
            this.removeListener(t, i);
            if (!o) {
                o = !0;
                e.apply(n || this, arguments);
            }
        };
        i.guid = e.guid || (e.guid = l++);
        return this.on(t, i);
    };
    b.removeListener = function(t, e, n) {
        var o, i, r, u, a, f;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
        }
        if (!(o = d(this))) return this;
        if (!(t || e || n)) {
            s(o, function(t, e) {
                delete o[e];
            });
            d(this, null);
            return this;
        }
        t = t ? t.split(c) : x(o);
        for (;i = t.shift(); ) {
            r = o[i];
            if (r) if (e || n) for (u = r.length; --u >= 0; ) {
                a = r[u];
                f = a[v];
                e && f !== e && (void 0 === f.guid || f.guid !== e.guid) || n && a[m] !== n || r.splice(u, 1);
            } else delete o[i];
        }
        return this;
    };
    b.un = b.removeListener;
    b.removeAllListeners = function(t) {
        return this.removeListener(t);
    };
    b.emit = function(t) {
        var e, n, o, r, u, s, a = [], f = !0;
        if (!(e = d(this))) return this;
        t = t.split(c);
        for (u = 1, s = arguments.length; u < s; u++) a[u - 1] = arguments[u];
        for (;n = t.shift(); ) {
            (o = e.all) && (o = o.slice());
            (r = e[n]) && (r = r.slice());
            "all" !== n && (f = i(n, r, a, this) && f);
            f = i(n, o, [ n ].concat(a), this) && f;
        }
        return f;
    };
    o.applyTo = function(t) {
        function e(e, o) {
            t[e] = function() {
                var i = n[e].apply(o || t, Array.prototype.slice.call(arguments));
                return i === o ? this : i;
            };
        }
        var n = b, o = x(n);
        u(t) ? a(o, function(e) {
            t.prototype[e] = n[e];
        }) : a(o, function(t) {
            e(t);
        });
    };
    o.listenerCount = function(t, e) {
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
    n.exports = o;
});

define("lib/core/1.0.0/dom/delegator", [ "require", "exports", "module", "jquery", "../event/emitter" ], function(t, e, n) {
    "use strict";
    function o(t, e) {
        var n, o, r, u = e.currentTarget, s = i(u), a = (e.handleObj || 0).origType || e.type;
        if (!e.isPropagationStopped()) {
            if (!s.attr("disabled") && (n = s.attr("action-type"))) {
                o = s.attr("action-data");
                e.action = n;
                e.data = o;
                r = t.e.emit(a + c + n, e, u);
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
    var i = t("jquery"), r = t("../event/emitter"), u = /\S+/g, s = -1, a = (+new Date()).toString(36), c = "/", f = function() {
        return a + ++s;
    }, l = function(t, e) {
        var n = t.guid || (t.guid = f()), o = function(n, o) {
            return t.call(e || o, n);
        };
        o.guid = n;
        return o;
    }, d = function() {}, h = function(t, e) {
        return "function" == typeof t ? t : e;
    }, p = function(t, e) {
        e = e || {};
        "string" == typeof t && (t = i(t)[0]);
        var n = {}, s = {}, a = new r(), f = e.context, p = {
            o: n,
            opts: e,
            e: a
        }, v = function(t) {
            return o(p, t);
        };
        e.onDelegate = h(e.onDelegate, d);
        n.on = function(e, n, o) {
            if ("function" == typeof n) {
                o = n;
                n = e;
                e = "click";
            }
            if ("function" != typeof o) throw Error("The delegate handler should be a valid function");
            n = (n || "").match(u) || [];
            for (var r = n.length; r--; ) {
                if (!s[e]) {
                    s[e] = 1;
                    i(t).on(e, "[action-type]", v);
                }
                a.on(e + c + n[r], l(o, f));
            }
            return this;
        };
        n.un = function(e, n, o) {
            if ("function" == typeof n || !n) {
                o = n;
                n = e;
                e = "click";
            }
            n = (n || "").match(u) || [];
            var r, s = n.length;
            for (i(t); s--; ) {
                r = e + c + n[s];
                a.un(r, o);
            }
            return this;
        };
        n.fire = function(e, n) {
            if (!n) {
                n = e;
                e = "click";
            }
            var o = i('[action-type="' + n + '"]', t)[0] || document, r = new i.Event(e);
            r.currentTarget = r.target = o;
            a.emit(e + c + n, r, o);
        };
        n.destroy = function() {
            var o = i(t);
            i.each(s, function(t, e) {
                delete s[t];
                o.off(t, "[action-type]", v);
            });
            a.un();
            for (var r in n) delete n[r];
            a = void 0;
            e = void 0;
            s = o = t = void 0;
            v = null;
        };
        return n;
    };
    n.exports = p;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(t, e, n) {
    "use strict";
    function o(t) {
        return c("<" + t + "/>")[0];
    }
    function i(t, e, n) {
        t.insertRule ? t.insertRule(e + " {" + n + "}", 0) : t.addRule(e, n, 1);
    }
    function r() {
        var t, e, n, o, i, u = "";
        t = document.body || document.documentElement;
        n = t.style;
        o = "Transition";
        i = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        e = 0;
        for (;e < i.length; ) {
            if (void 0 !== n[i[e] + o]) {
                u = i[e];
                break;
            }
            e++;
        }
        r = function() {
            return u;
        };
        return u;
    }
    function u() {
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
    function a(t, e, n, o, i) {
        var r, u, a = c(t), f = arguments, i = "boolean" == typeof f[f.length - 1] && f[f.length - 1], p = !1, v = function() {
            m();
        }, m = function(t) {
            p || y(!0);
        }, y = function(t) {
            if (!p) {
                p = !0;
                m = l;
                a.off(g, v);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                a.removeClass(u);
                t && o();
                a = null;
            }
        };
        if ("function" == typeof n) {
            o = n;
            n = void 0;
        }
        o = o || l;
        if (h) {
            n = n || "normal";
            e = e || "shake";
            u = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + e ].join(" ");
            a.on(g, v);
            r = setTimeout(v, s(n) + 100);
            i === !0 ? d(function() {
                a.addClass(u);
            }) : a.addClass(u);
        } else d(function() {
            o && o();
        });
        return {
            stop: function() {
                y.apply(null, arguments);
                return this;
            }
        };
    }
    var c = t("jquery"), f = t("./util"), l = (f.each, f.noop), d = f.setImmediate, h = u(), p = /\-v\-/g, v = document.getElementsByTagName("head")[0].appendChild(o("style")), m = v.sheet || v.styleSheet, y = {
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
    }[h];
    f.each(y, function(t, e) {
        t && i(m, e, t.replace(p, h));
    });
    e.effect = a;
    e.getVendorPrefix = r;
});

define("lib/ui/box/1.0.1/popup", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/utils/css", "../../../core/1.0.0/event/emitter" ], function(t, e, n) {
    "use strict";
    function o(t) {
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
        t.fixed = !!t.fixed && z();
        var r = i('<div class="' + v + '" id="' + (t.id || b()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(t.html), u = i("<div />");
        e._popup = r;
        e._mask = e._shadow = u;
        e.node = r[0];
        e.mask = u[0];
        e.on("render", function(t) {
            var n, i = t.className, u = e._mask, s = t.zIndex;
            r.html() || r.html(t.html);
            i && r.addClass(i);
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
                    zIndex: s || o.zIndex,
                    backgroundColor: "#000",
                    opacity: .3
                };
                z() || x(n, {
                    position: "absolute",
                    width: f.width() + "px",
                    height: l.height() + "px"
                });
                u.attr("tabIndex", 0).on("focus", _(e.focus, e));
                e._shadow = u.clone(!0);
                u.css(n).addClass(v + "-mask");
            }
        });
        e.on("beforeShow", function(t) {
            var n = e.anchor, o = e._dirClass;
            if (!n && o) {
                r.removeClass(o);
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
        if (!p) {
            var s = _(e.resize, e);
            e.on("render", function() {
                f.on("resize", s);
            });
            e.on("destroy", function() {
                f.off("resize", s);
            });
        }
        e.destroyed = !1;
        e.initialized = !0;
    }
    var i = t("jquery"), r = t("../../../core/1.0.0/utils/util"), u = t("../../../core/1.0.0/utils/css"), s = t("../../../core/1.0.0/event/emitter"), a = window, c = a.document, f = i(a), l = i(c), d = c.documentElement, h = /\S+/g, p = !("minWidth" in d.style), v = "ui-layer", m = a.Math, y = m.max, g = m.ceil, b = r.guid, x = r.extend, w = r.each, _ = function(t, e) {
        return t.bind ? t.bind(e) : function() {
            return t.apply(e, arguments);
        };
    }, k = r.setImmediate, C = function(t) {
        return a.parseInt(t, 10) || 0;
    }, T = function(t) {
        return t && 1 === t.nodeType;
    }, z = function() {
        return z._ || (z._ = function() {
            var t = c.createElement("div"), e = t.cloneNode(!1), n = !1, o = c.body || function() {
                n = !0;
                return d.appendChild(c.createElement("body"));
            }();
            t.style.cssText = "position:fixed;top:42px";
            o.appendChild(t);
            o.appendChild(e);
            var i = t.offsetTop !== e.offsetTop;
            o.removeChild(t);
            o.removeChild(e);
            n && d.removeChild(o);
            t = e = null;
            return i;
        }());
    }, j = function() {
        return {
            x: l.scrollLeft(),
            y: l.scrollTop()
        };
    }, E = function(t) {
        return {
            w: t.width(),
            h: t.height()
        };
    }, q = function() {
        return E(f);
    }, I = function(t) {
        var e = T(t), n = e ? i(t).offset() : {
            left: t.pageX,
            top: t.pageY
        };
        t = e ? t : t.target;
        var o = t.ownerDocument;
        if (o === a.document) return n;
        var r = o.defaultView || o.parentWindow, u = r.frameElement, s = j(), c = i(u).offset();
        return {
            left: n.left + c.left - s.x,
            top: n.top + c.top - s.y
        };
    }, A = function(t, e) {
        if (t.length) {
            var n = C(t.css(e)) || t[0]["offset" + e.charAt(0).toUpperCase() + e.slice(1)], o = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            w(o[e], function(e, o) {
                n += C(t.css("margin-" + e), 10) || 0;
            });
            return n;
        }
        return 0;
    }, N = function(t) {
        return A(t, "width");
    }, $ = function(t) {
        return A(t, "height");
    }, L = function() {
        try {
            var t = c.activeElement, e = t.contentDocument;
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
        for (var o, t = t.length <= 2 ? t.split("") : t.replace(/^\s+|\s+$/g, "").split(" ").slice(0, 2), i = {}, r = {
            t: "t",
            b: "t",
            l: "l",
            r: "l"
        }, u = -1, s = t.length; ++u < s; ) {
            o = t[u].charAt(0);
            if (!o || i[r[o]]) t.splice(u, 1); else {
                t[u] = o;
                i[r[o]] = 1;
            }
        }
        2 === t.length && t[0] === t[1] && t.pop();
        e.align = t;
        return e;
    };
    r.inherits(o, s, {
        open: !1,
        destroyed: !0,
        node: null,
        mask: null,
        emit: function(t) {
            for (var e = (t || "").match(h) || [], n = e.length; n--; ) {
                var i = this["on" + e[n]], r = Array.prototype.slice.call(arguments, 1);
                "function" == typeof i && i.apply(this, r);
            }
            o.__super__.emit.apply(this, arguments);
        },
        $: function(t, e) {
            var n = this._nodes || (this._nodes = {}), o = n[t];
            if (!o || e && 0 === o.length) {
                o = this._popup.find('[node-type="' + t + '"]');
                e && o.length > 0 && (n[t] = o);
            }
            return !e || o.length ? o : null;
        },
        show: function(t, e) {
            var n, o = this, i = o._, r = t, s = null, a = o._anim;
            a && a.stop(!0);
            if (o.destroyed || i.showing || o.open) return o;
            e = x({}, o._, e);
            if (void 0 !== r) {
                n = typeof r;
                "boolean" === n ? e.modal = r : r && "object" === n && (T(r) || T(r.target) ? s = r : x(e, r));
            }
            var c = o._popup, f = e.showWithAni, l = function() {
                delete i.showing;
                o.emit("shown");
            };
            if (!o._ready) {
                o.emit("render", e);
                o._ready = !0;
            }
            o.open = !0;
            o.anchor = s;
            o._activeElement = L();
            o.emit("beforeShow", e);
            c.appendTo(e.appendTo).css("display", "block");
            o.emit("show", e);
            i.showing = !0;
            if (f && "none" !== f) {
                var d = f.split(":");
                o._anim = u.effect(o.node, d[0], d[1], l);
            } else l();
            return o;
        },
        hide: function(t) {
            var e, n = this, o = n._, i = n.node, r = o.hideWithAni, s = n._anim;
            s && s.stop(!0);
            if (n.destroyed || o.hidding || !n.open) return n;
            n.emit("beforeHide");
            o.hidding = !0;
            e = function() {
                if (o.hidding === !0) {
                    i.parentNode.removeChild(i);
                    n._popup.hide();
                    delete o.hidding;
                    n.open = !1;
                    n.emit("hidden");
                    (t || o.autoRelease) && n.destroy();
                }
            };
            if (r && "none" !== r) {
                var a = r.split(":");
                n._anim = u.effect(i, a[0], a[1], e);
                n.emit("hide");
            } else {
                n.emit("hide");
                k(e);
            }
            return n;
        },
        destroy: function() {
            var t = this;
            if (t.destroyed) return t;
            t.emit("beforeremove");
            o.current === t && (o.current = null);
            t._popup.off().remove();
            t._mask.off().remove();
            t._shadow.off().remove();
            t.emit("destroy");
            t.removeAllListeners();
            w(t, function(e, n) {
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
            var e = this._, n = this.node, r = this._popup, u = o.current, s = e.zIndex;
            u && u !== this && u.blur(!1);
            if (!i.contains(n, L())) {
                var a = r.find("[autofocus]")[0];
                !e.focusing && a ? e.focusing = !0 : a = n;
                this._focus(a);
            }
            if (void 0 === s) {
                s = e.zIndex = o.zIndex++;
                r.css("zIndex", s);
                r.addClass(v + "-focus");
            }
            o.current = this;
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
            var t = this._popup, e = this._.fixed, n = j(), o = q(), i = E(t), r = e ? 0 : n.x, u = e ? 0 : n.y, s = (o.w - i.w) / 2 + r, a = .382 * (o.h - i.h) + u;
            t.css({
                left: y(C(s), r),
                top: y(C(a), u)
            });
            return this;
        },
        alignTo: function(t, e) {
            var n = this, o = n._, r = n._popup, u = t.parentNode && i(t);
            if (!u) return n;
            var s = u.offset();
            if (s.left * s.top < 0) return n.center();
            e = e || o.align;
            var a = O(e), c = a.align, f = !a.auto;
            c && c.length || (c = [ "b" ]);
            var l = n._dirClass;
            l && r.removeClass(l);
            var d = o.fixed, h = q(), p = j(), m = N(r), y = $(r), b = I(t), x = N(u), _ = $(u), k = b.left, T = b.top, z = d ? k - p.x : k, E = d ? T - p.y : T, A = d ? 0 : p.x, L = d ? 0 : p.y, D = A + h.w - m, W = L + h.h - y, S = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, M = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, R = {}, P = [ {
                t: E - y,
                b: E + _,
                l: z - m,
                r: z + x
            }, {
                t: E,
                b: E - y + _,
                l: z,
                r: z - m + x
            } ], F = {
                l: z + g((x - m) / 2),
                t: E + g((_ - y) / 2)
            }, B = {
                left: [ A, D ],
                top: [ L, W ]
            };
            f || w(c, function(t, e) {
                P[e][t] > B[M[t]][1] && (t = c[e] = S[t]);
                P[e][t] < B[M[t]][0] && (c[e] = S[t]);
            });
            var H = c[0];
            if (!c[1]) {
                c[1] = "left" === M[H] ? "t" : "l";
                P[1][c[1]] = F[c[1]];
            }
            P[0][H] = P[0][H] + 10 * ("tl".indexOf(H) !== -1 ? -1 : 1);
            R[M[c[0]]] = C(P[0][c[0]]);
            R[M[c[1]]] = C(P[1][c[1]]);
            var U = v + "-" + H;
            r.css(R).addClass(U);
            n._dirClass = U;
            var X = n.$("arrow", 1), Y = n.$("inner", 1);
            if (!X) {
                if (!Y) return n;
                X = i('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(Y);
            }
            var V, K, Q = "top" !== M[H], G = [ "v", "h" ][1 ^ Q], J = N(X), Z = $(X), tt = {}, et = Q ? "left" : "top";
            switch (G) {
              case "h":
                V = g(k + (x - J) / 2);
                tt.left = V;
                break;

              case "v":
                K = g(T + (_ - Z) / 2);
                tt.top = K;
            }
            X.offset(tt).css(et, "");
            return n;
        }
    });
    o.zIndex = 1024;
    o.current = null;
    n.exports = o;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(t, e, n) {
    "use strict";
    var o = t("jquery"), i = t("../../../core/1.0.0/utils/util"), r = t("../../../core/1.0.0/dom/delegator"), u = t("./popup"), s = i.extend, a = i.guid, c = i.each, f = window.document, l = {
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
    }, d = {}, h = function(t) {
        var e = t || (t = {}), n = t.id || t.id || a(), i = h.get(n) || this;
        "string" != typeof t && 1 !== t.nodeType || (t = {
            content: t
        });
        t = s({}, l, t);
        t.original = e;
        var r, u = t.button || (t.button = []);
        if (!o.isArray(r = u)) {
            r = [];
            u && "object" == typeof u && c(u, function(t, e) {
                t.id = e;
                r.push(t);
            });
            u = t.button = r;
        }
        if (u.length > 0) {
            var f = !1;
            c(u, function(e, n) {
                var o = e.id || a();
                e.autofocus && (f = !0);
                t[o] && s(e, t[o]);
                e.index = n;
            });
            f || (u[u.length - 1].autofocus = !0);
        }
        i.emit("init", t);
        i.initialized ? i.options(t).focus() : i.init(t);
        d[n] = i;
        return i;
    };
    i.inherits(h, u, {
        init: function(t) {
            var e = this;
            u.call(e, t);
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
            c([ "title", "content", "width", "height", "action", "button" ], function(n, o) {
                o = t[n];
                null != o && "function" == typeof e[n] && e[n](o);
            });
            e._freeze(!1).resize();
            t.zIndex && (u.zIndex = t.zIndex);
            return e;
        },
        initComponents: function() {
            var t = this, e = t._;
            t.$("header").hide();
            t.$("footer").hide();
            t.options();
            e.close || t.$("close").css("display", "none");
            e.clickBlankToHide && o(t.mask).on("onmousedown" in f ? "mousedown" : "click", function() {
                t.hide();
                return !1;
            });
            var n = function(e) {
                var n = e.target, o = n.nodeName, i = /^input|textarea$/i, r = u.current === t, s = e.keyCode;
                !r || i.test(o) && "button" !== n.type || 27 === s && t.hide();
            };
            o(f).on("keydown", n);
            t.on("destroy", function() {
                o(f).off("keydown", n);
            });
        },
        delegate: function(t, e, n) {
            var o = this._delegator;
            o.on.apply(o, arguments);
            return this;
        },
        undelegate: function(t, e, n) {
            var o = this._delegator;
            o.un.apply(o, arguments);
            return this;
        },
        content: function(t) {
            var e = this.$("content");
            if (t && t.nodeType) {
                o.contains(f, t) && this.on("beforeremove", function() {
                    o("body").append(t.hide());
                });
                t = o(t);
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
            var e = this, n = e._, o = "", i = 0, r = n.buttonClass;
            if ("string" == typeof t) {
                o = t;
                i++;
            } else c(t, function(t, u) {
                var s = t.id, a = t.fn || t.callback, c = t.display !== !1, f = t.className || r, l = [ f ];
                t.autofocus && l.push(n.buttonClassLight);
                "function" == typeof a && e.delegate(s, a);
                c && i++;
                o += '<button type="button" action-type="' + s + '"' + (c ? "" : ' style="display:none"') + (' class="' + l.join(" ") + '"') + (t.disabled ? " disabled" : "") + ">" + (t.text || t.value) + "</button>";
            });
            e.$("button").html(o);
            e.$("footer")[i ? "show" : "hide"]();
            e.resize();
            return e;
        },
        action: function(t) {
            var e = this;
            c(t, function(t, n) {
                e.delegate(n, t);
            });
            return e;
        }
    });
    h.getCurrent = function() {
        return u.current;
    };
    h.get = function(t) {
        return void 0 === t ? d : d[t];
    };
    h.config = function(t) {
        t && s(l, t);
    };
    n.exports = h;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(t, e, n) {
    "use strict";
    var o = t("jquery"), i = t("../../../core/1.0.0/utils/util"), r = t("./drag"), u = t("./dialog"), s = i.each, a = i.extend, c = window.clearTimeout, f = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var t = o('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + f + '"</i>').appendTo("body");
        setTimeout(function() {
            t.remove();
            t = null;
        }, 50);
    }();
    var l = {
        info: "&#x69;",
        warn: "&#x21;",
        confirm: "&#x3f;",
        ok: "&#x2714;",
        error: "&#x2718;",
        loading: '<img src="' + f + '" />'
    }, d = function(t) {
        var e = l[t];
        return e ? '<i node-type="icon" class="x-icon ui-box-iconf">' + e + "</i>" : "";
    }, h = i.guid("__x") + "$", p = function(t) {
        return h + t;
    }, v = function(t, e) {
        var n, o = e.xtype, i = o && d(o) || e.iconHTML;
        if (i) {
            n = t ? '<div node-type="text" class="x-text">' + t + "</div>" : "";
            t = [ '<div class="ui-box-x-wrap">', i, n, "</div>" ].join("");
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
            var o = {};
            s([ "title", "width", "height", "button" ], function(t) {
                o[t] = n[t];
                delete n[t];
            });
            t.once("load", function() {
                var n = t._;
                s(o, function(o, i) {
                    if (o) if ("title" === i) {
                        if ("auto" === o) try {
                            o = e.contentWindow.document.title || "";
                        } catch (r) {
                            o = "";
                        }
                        o && t.title(o);
                    } else "function" == typeof t[i] ? t[i](o) : n[i] = o;
                });
            });
        }).once("render", function() {
            var n = t._;
            setTimeout(function() {
                e = g(t, n.url);
                t.iframeNode = e;
            }, 30);
            var i = n.original;
            if (!(i instanceof Object)) for (var r = function() {
                t.hide().destroy();
            }, u = 0; u < frames.length; u++) try {
                if (i instanceof frames[u].Object) {
                    o(frames[u]).one("unload", r);
                    break;
                }
            } catch (s) {}
        }).once("beforeremove", function() {
            o(e).attr("src", "about:blank").remove();
        }, !1);
    }, g = function(t, e) {
        var n = t._, i = t.$("content"), r = i.find("iframe"), u = r && r[0], s = function(e) {
            t._freeze(!0);
            if (e) {
                n.width || t.width(e.width);
                n.height || t.height(e.height);
            }
            t.emit("load");
            t._freeze(!1).resize();
            s = null;
            r.removeAttr("style");
            r = u = null;
        }, a = function(e) {
            n.showing ? t.once("shown", e) : e();
        };
        if (!r.length) {
            var c = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), f = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (c ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + e + '"></iframe>';
            r = o(f.replace(/{id}/g, n.id)).appendTo(i);
            u = r[0];
            n.autoSize ? r.one("load", function() {
                var t, e, n, i = m(u), c = i && o(i);
                if (c) {
                    t = c.width();
                    r.width(t);
                    e = c.height();
                    n = {
                        width: t,
                        height: e
                    };
                }
                a(function() {
                    s(n);
                });
            }) : a(function() {
                s();
            });
        }
        return u;
    }, b = function(t) {
        var e = this;
        t = a({}, t);
        var n = t.button || (t.button = []);
        s([ "cancel", "ok" ], function(e, o) {
            var i = t[e];
            if (i && "object" == typeof i) {
                i.id = e;
                n.push(i);
                delete t[e];
            }
        });
        var i = t.xtype;
        if (i) {
            t.id = t.id || p(i);
            t.content = v(t.content, t);
            "none" !== i && (t.className = (t.className || "") + " ui-box-x-" + i);
        } else {
            var c = t.url;
            if (c) {
                var f = t.close !== !1;
                t = a({
                    modal: !0,
                    close: !1,
                    autoRelease: !0,
                    autoSize: !0,
                    scrolling: "auto"
                }, t);
                var l = o(v("Loading...", {
                    xtype: "loading"
                })).addClass("ui-box-x-loading");
                t.content = l;
                t.className = (t.className || "") + " ui-box-iframe";
                e.once("load", function() {
                    l.remove();
                    l = null;
                    f && e.$("close").show();
                });
                e.on("hidden", function() {
                    e.destroy();
                });
                y(e);
            }
        }
        e = u.call(e, t) || e;
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
    }, x = "__showDelay", w = "__hideTimer";
    i.inherits(b, u, {
        show: function(t, e) {
            var n = this, o = n._, r = [].slice.call(arguments), e = a({}, o, e), u = e.duration || 0, s = e.delay || 0, f = function() {
                i.each([ x, w ], function(t, e) {
                    e = o[t];
                    delete o[t];
                    e && c(e);
                });
            }, l = function() {
                if (u > 0) {
                    o[w] = setTimeout(function() {
                        f();
                        n.hide();
                    }, u);
                    n.once("hide", f);
                }
                b.__super__.show.apply(n, r);
            };
            f();
            s > 0 ? o[x] = setTimeout(l, s) : l();
            return n;
        },
        hide: function() {
            var t = this, e = t._;
            e && i.each([ x, w ], function(t, n) {
                n = e[t];
                delete e[t];
                n && c(n);
            });
            b.__super__.hide.apply(t, arguments);
            return t;
        }
    });
    b.config = u.config;
    b.get = function(t) {
        if (t) {
            var e, n, o = u.get();
            if (t && (e = t.frameElement)) for (var i in o) if (o.hasOwnProperty(i)) {
                n = o[i];
                if (n.iframeNode === e) return n;
            }
            return o[t];
        }
    };
    n.exports = b;
});

define("lib/ui/box/1.0.1/box", [ "require", "exports", "module", "./messagebox", "../../../core/1.0.0/utils/util" ], function(t, e, n) {
    "use strict";
    var o = t("./messagebox"), i = t("../../../core/1.0.0/utils/util"), r = function() {}, u = i.mix, s = function(t, e) {
        var n = function(t, e) {
            return void 0 !== e && null !== e && "" !== e && !("number" == typeof e && isNaN(e));
        };
        return function(t, e) {
            return u(t, e, !0, !0, n);
        };
    }(), a = function(t) {
        return !!(t && t.nodeType && t.tagName);
    }, c = i.guid, f = function() {
        return c("__0x$");
    }, l = function(t) {
        var e, n = t[1] || {};
        e = t[0];
        e && ("string" == typeof e ? n.html = e : "object" == typeof e && (n = e));
        var o = n.skin;
        if (o) {
            n.className = o;
            delete n.skin;
        }
        return n;
    }, d = function(t, e) {
        var e = l([ t, e ]);
        return new o(e);
    }, h = function(t, e, n) {
        if ("object" == typeof t) {
            n = e;
            e = t;
            t = "";
        } else if (a(e)) {
            n = e;
            e = {};
        } else "number" == typeof e && (e = {
            duration: e
        });
        e = e || {};
        var o = d(s({
            id: f(),
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
        return e.hide ? o : o.show(n);
    }, p = {
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
                id: f(),
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
                id: f(),
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
        confirm: function(t, e, n, o) {
            var i;
            if (!o && n && "object" == typeof n) {
                a(n) ? o = n : i = n;
                n = e;
            }
            if ("function" != typeof e) {
                i = e;
                e = r;
            }
            "function" != typeof n && (n = e);
            var u = function(t) {
                t ? e(t) : n(t);
            };
            i && (o = o || i.sender);
            var c = d(s({
                xtype: "confirm",
                autofocus: !0,
                id: f(),
                modal: !o,
                autoRelease: !0,
                content: "<div>" + t + "</div>",
                close: !1,
                ok: {
                    text: "确定",
                    fn: function() {
                        u(!0);
                    }
                },
                cancel: {
                    text: "取消",
                    fn: function() {
                        u(!1);
                    }
                }
            }, i));
            return c.show(o);
        },
        bubble: h
    };
    p.tips = p.bubble;
    i.each([ "ok", "info", "warn", "error" ], function(t, e) {
        p[t] = function(e, n, o) {
            var i = {
                xtype: t
            };
            if (n && n.nodeType) {
                o = n;
                n = void 0;
            } else "number" == typeof n ? i.duration = n : i = s(i, n);
            return h(e, i, o);
        };
    });
    p.get = o.get;
    p.config = o.config;
    n.exports = p;
});

define("lib/ui/box/1.0.1/crossbox", [ "require", "exports", "module", "./box" ], function(t, e, n) {
    "use strict";
    function o(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }
    function i(t) {
        d.push(t);
    }
    function r(t) {
        for (var e = -1, n = d.length; ++e < n; ) d[e](t);
    }
    function u(t) {
        l ? t(s || c) : i(t);
    }
    var s, a = window, c = o({}, t("./box")), f = window.top, l = !1, d = [];
    if (a !== f) try {
        f.require([ "lib/ui/box/1.0.1/crossbox" ], function(t) {
            o(n.exports, t);
            l = !0;
            s = t;
            r(t);
        });
    } catch (h) {
        setTimeout(function() {
            console.warn("Initialize crossbox failed, use inner box instead.");
        }, 1);
    } else {
        l = !0;
        s = c;
    }
    e = n.exports = c;
    e.ready = u;
});

define("conf/register-pop", [ "require", "exports", "module", "jquery", "lib/ui/box/1.0.1/crossbox" ], function(t, e, n) {
    "use strict";
    var o = t("jquery"), i = t("lib/ui/box/1.0.1/crossbox");
    o(".jCloseBtn").click(function() {
        var t = i.get(window);
        t.hide();
    });
});