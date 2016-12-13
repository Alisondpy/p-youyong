/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    function r(e) {
        return "object" == typeof e && null !== e;
    }
    function i() {}
    function o(e, t) {
        for (var n = e.length, r = -1; ++r < n; ) t(e[r], r);
    }
    function u(e, t) {
        for (var n in e) d.call(e, n) && t(e[n], n, e);
    }
    function s(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? o(e, t) : u(e, t);
    }
    function a(e, t) {
        for (var n = -1, r = e.length, i = Array(r); ++n < r; ) i[n] = t(e[n], n, e);
        return i;
    }
    function l(e, t) {
        var n = [];
        s(e, function(e, r, i) {
            n.push(t(e, r, i));
        });
        return n;
    }
    function c(e, t) {
        if (!t || !r(t)) return e;
        for (var n = m(t), i = n.length; i--; ) e[n[i]] = t[n[i]];
        return e;
    }
    function f(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = {}, r = e.split("&"), i = -1, o = r.length; ++i < o; ) {
            t = r[i].split("=");
            n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return n;
    }
    var p = new Function("return this")(), d = Object.prototype.hasOwnProperty, h = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, v = function() {
        var e = (+new Date()).toString(36), t = -1;
        return function(n) {
            return (n || "") + e + ++t;
        };
    }(), m = Object.keys || function(e) {
        var t = [];
        u(e, function(e, n) {
            t.push(n);
        });
        return t;
    }, y = "function" == typeof Object.create ? function(e, t) {
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
    }(), g = p.console || (p.console = {});
    o([ "log", "error", "trace", "warn", "info" ], function(e) {
        g[e] || (g[e] = i);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), r = n.length, i = -1; ++i < r; ) c(e, n[i]);
        return e;
    };
    t.inherits = function(e, t, n) {
        y(e, t);
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
        var n = h(e) ? a : l;
        return n(e, t);
    };
    t.filter = function(e, t) {
        var n, r, i = h(e) ? (n = o, r = function(e, t) {
            i.push(t);
        }, []) : (n = u, r = function(e, t) {
            i[e] = t;
        }, {});
        n(e, function(e, n) {
            t(e, n) && r(n, e);
        });
        return i;
    };
    t.mix = function A(e, t, n, r, i) {
        for (var o in t) t.hasOwnProperty(o) && (t[o] && e[o] && n && "object" == typeof t[o] ? A(e[o], t[o], n, r, i) : (void 0 === e[o] || r) && (i && !i(e[o], t[o]) || (e[o] = t[o])));
        return e;
    };
    t.guid = v;
    t.setImmediate = function() {
        var e = p.document, t = p.postMessage, n = p.setImmediate;
        return n ? n : "onreadystatechange" in e.createElement("script") ? function(t) {
            function n() {
                r.onreadystatechange = null;
                r.parentNode.removeChild(r);
                t();
            }
            var r = e.createElement("script");
            r.onreadystatechange = n;
            e.documentElement.appendChild(r);
        } : t ? function(e) {
            function n(t) {
                if (t.data === r) {
                    p.removeEventListener("message", n, !0);
                    e();
                }
            }
            var r = v();
            p.addEventListener("message", n, !0);
            t(r, "*");
        } : function(e) {
            p.setTimeout(e, 0);
        };
    }();
    t.noop = i;
    t.throttle = function(e, t) {
        t = t ? t : 150;
        if (t === -1) return function() {
            e.apply(this, arguments);
        };
        var n;
        return function() {
            var r = +new Date();
            if (!n || r - n > t) {
                n = r;
                e.apply(this, arguments);
            }
        };
    };
    t.debounce = function(e, t, n, r) {
        var i;
        return function() {
            var o = r || this, u = arguments, s = function() {
                i = null;
                n || e.apply(o, u);
            }, a = n && !i;
            clearTimeout(i);
            i = setTimeout(s, t);
            a && e.apply(o, u);
        };
    };
    t.deprecate = function(e, t) {
        function n() {
            r || (r = !0);
            return e.apply(this, arguments);
        }
        if (p.noDeprecation === !0) return e;
        var r = !1;
        return n;
    };
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
    function r() {}
    function i(e, t, n, r) {
        var i = !0;
        if (t) for (var o, u, s, a = -1, l = {
            type: e,
            timeStamp: c()
        }; o = t[++a]; ) {
            u = o[v];
            s = o[m] || r;
            try {
                i = o[y] === h ? u.call(s, l, n) !== !1 && i : u.apply(s, n) !== !1 && i;
            } catch (f) {
                setTimeout(function() {
                    console.error(f);
                }, 1);
            }
        }
        return i;
    }
    function o(e) {
        var t, n = p(this);
        if (n) {
            t = n[e];
            return t.length;
        }
        return 0;
    }
    function u(e) {
        return "[object Function]" === Object.prototype.toString.call(e);
    }
    function s(e, t) {
        for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
    }
    function a(e, t) {
        e.forEach ? e.forEach(t) : function(e) {
            for (var n = -1, r = e.length; ++n < r; ) t(e[n], n);
        }(e);
    }
    var l = /\s+/, c = Date.now || function() {
        return +new Date();
    }, f = function() {
        return c() * Math.random() & 65535;
    }(), p = function() {
        var e, t, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, n) {
            var r = e.get(t);
            return null === n ? void 0 !== r && e["delete"](t) : !r && n ? (e.set(t, r = {}), 
            r) : r;
        }) : (t = c(), n = "__$widΦ" + t.toString(36), e = {}, function(r, i) {
            if (!r || "object" != typeof r) throw TypeError("Invalid value used as weak map key");
            var o;
            return null === i ? r[n] && (delete e[r[n]], delete r[n]) : (o = r[n] || i && (o = ++t, 
            e[o] = {}, r[n] = o), o && e[o]);
        });
    }(), d = 1, h = 2, v = 0, m = 1, y = 2, g = function(e, t, n) {
        var r = [];
        r[v] = e;
        r[m] = t;
        r[y] = n;
        return r;
    }, A = r.prototype;
    A.addListener = function(e, t, n, r) {
        var i, o, u, s = d;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
            s = h;
        }
        if (!t) return this;
        i = p(this, 1);
        e = e.split(l);
        for (;o = e.shift(); ) {
            u = !r && i[o] || (i[o] = []);
            u.push(g(t, n, s));
        }
        return this;
    };
    A.on = A.addListener;
    A.once = function(e, t, n) {
        var r = !1, i = function() {
            this.removeListener(e, i);
            if (!r) {
                r = !0;
                t.apply(n || this, arguments);
            }
        };
        i.guid = t.guid || (t.guid = f++);
        return this.on(e, i);
    };
    A.removeListener = function(e, t, n) {
        var r, i, o, u, a, c;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
        }
        if (!(r = p(this))) return this;
        if (!(e || t || n)) {
            s(r, function(e, t) {
                delete r[t];
            });
            p(this, null);
            return this;
        }
        e = e ? e.split(l) : b(r);
        for (;i = e.shift(); ) {
            o = r[i];
            if (o) if (t || n) for (u = o.length; --u >= 0; ) {
                a = o[u];
                c = a[v];
                t && c !== t && (void 0 === c.guid || c.guid !== t.guid) || n && a[m] !== n || o.splice(u, 1);
            } else delete r[i];
        }
        return this;
    };
    A.un = A.removeListener;
    A.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    A.emit = function(e) {
        var t, n, r, o, u, s, a = [], c = !0;
        if (!(t = p(this))) return this;
        e = e.split(l);
        for (u = 1, s = arguments.length; u < s; u++) a[u - 1] = arguments[u];
        for (;n = e.shift(); ) {
            (r = t.all) && (r = r.slice());
            (o = t[n]) && (o = o.slice());
            "all" !== n && (c = i(n, o, a, this) && c);
            c = i(n, r, [ n ].concat(a), this) && c;
        }
        return c;
    };
    r.applyTo = function(e) {
        function t(t, r) {
            e[t] = function() {
                var i = n[t].apply(r || e, Array.prototype.slice.call(arguments));
                return i === r ? this : i;
            };
        }
        var n = A, r = b(n);
        u(e) ? a(r, function(t) {
            e.prototype[t] = n[t];
        }) : a(r, function(e) {
            t(e);
        });
    };
    r.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : o.call(e, t);
    };
    A.listenerCount = o;
    var b = Object.keys || function(e) {
        var t = [];
        s(e, function(e, n) {
            t.push(n);
        });
        return t;
    };
    n.exports = r;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(e, t, n) {
    "use strict";
    var r = e("jquery"), i = e("../utils/util"), o = e("../event/emitter"), u = i.setImmediate, s = i.noop, a = i.extend, l = r.trim, c = r.parseJSON, f = function(e, t, n) {
        return function(r, i) {
            try {
                return e.apply(t, arguments);
            } catch (o) {
                n && n(o, r, i);
            }
        };
    }, p = function(e) {
        return t.emit.apply(t, arguments);
    };
    o.applyTo(t);
    var d = function() {
        var e = 5, t = 0, n = [], i = function() {
            u(function() {
                --t;
                o();
            });
        }, o = function() {
            if (n.length > 0 && t < e) {
                var o = n.shift(), u = o[0], s = o[1];
                ++t;
                u.always(i);
                r.ajax(s);
            }
        };
        return function(e, t) {
            n.push([ e, t ]);
            o();
        };
    }(), h = function(e) {
        o.applyTo(this);
        var t = {
            url: "",
            type: "GET",
            data: {},
            dataType: "json",
            timeout: 3e4,
            cache: !1
        };
        e = a(t, e);
        delete e.error;
        delete e.success;
        this._opts = e;
    };
    a(h.prototype, {
        send: function() {
            var e = this, t = this._opts, n = a({}, t), r = "jsonp" === n.dataType;
            r && (n.crossDomain = !0);
            n.complete = function(n, i) {
                var o, u = +n.status, s = n.responseJSON, a = {
                    error: "1",
                    msg: "Request error (status: " + (i || u) + ")"
                }, f = 200 === u || "success" === i;
                if (!r && !s) {
                    s = l(n.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = c(s);
                    } catch (p) {}
                }
                f || (s = s || a);
                o = {
                    data: s,
                    xhr: n,
                    origin: t,
                    status: u || i
                };
                f ? e.emit("response", null, o) : e.emit("error", s, o);
                e.emit("end", o);
                e.destroy();
            };
            d(e, n);
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
        t = t && r(t);
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
        var i = new h(t), o = function(e, n) {
            var r = e.stack && e.stack.split("\n").slice(0, 2).join("\n") || e, i = {
                stack: r,
                origin: t,
                response: n
            };
            p("error", i, n);
            u(function() {
                console.log("%c " + r, "color:#ae0000");
            }, 1);
        }, a = f(t.error || s, null, o), l = f(t.success || s, null, o);
        if (p("request", i, n) !== !1) {
            if (n && (n = r(n))) {
                var c, d, v = "data-async-lock";
                if (1 === +n.attr(v)) return;
                if (d = n.attr("data-async-text")) {
                    c = n.html();
                    n.html(d);
                }
                n.attr(v, 1);
                i.once("response error", function() {
                    if (n) {
                        n.attr(v, 0);
                        d && n.html(c);
                        n = null;
                    }
                });
            }
            i.on("error", function(e, t) {
                var n = {
                    code: e.error,
                    message: e.msg,
                    status: t.status,
                    origin: t.origin,
                    response: t.data
                };
                p("error", n, t) !== !1 && a(e);
            });
            i.on("response", function(e, t) {
                t = t.data;
                p("response", t) !== !1 && (e ? a(e) : t && 0 === +(t.error || 0) ? l(t) : a(t));
            });
            return i.send();
        }
    };
    r.each([ "get", "post", "jsonp" ], function(e, n) {
        t[n] = function(e, r, i, o, u) {
            if ("function" == typeof r) {
                u = u || o;
                o = i;
                i = r;
                r = void 0;
            }
            if (o && "function" != typeof o) {
                u = o;
                o = void 0;
            }
            var s = {
                data: r,
                success: i,
                error: o || i
            };
            "string" == typeof e ? s.url = e : a(s, e);
            var l = n;
            if ("jsonp" === n) {
                l = "get";
                s.dataType = "jsonp";
            }
            s.type = l;
            return t.ajax(s, u);
        };
    });
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(e, t, n) {
    "use strict";
    function r(e) {
        return e.replace(s, "ms-").replace(a, l);
    }
    function i(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : c.test(e) ? u.parseJSON(e) : e);
        } catch (t) {}
    }
    function o(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType) {
            r = "data-" + t.replace(f, "-$&").toLowerCase();
            n = e.getAttribute(r);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var u = (window.document, e("jquery")), s = /^-ms-/, a = /-([\da-z])/gi, l = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, p = function(e, t, n) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var u, s, a, l;
        if (1 === arguments.length) {
            if (a = e.dataset) {
                l = {};
                for (s in a) a.hasOwnProperty(s) && (l[s] = i(a[s]));
                return l;
            }
            a = e.attributes;
            u = a.length;
            l = {};
            for (;u--; ) if (a[u]) {
                s = a[u].name;
                if (0 === s.indexOf("data-")) {
                    s = r(s.slice(5));
                    l[s] = i(o(e, s));
                }
            }
            return l;
        }
    };
    n.exports = p;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, n) {
    "use strict";
    function r(e, t, n, r) {
        r ? e[t] || (e[t] = n) : e[t] ? e[t] = e[t].add(n) : e[t] = o(n);
    }
    var i = window.document, o = e("jquery"), u = function(e, t, n) {
        var u, s, a, l, c, f = function(e) {
            if (n) for (var i in n) a[i] = o(n[i].toString(), e); else {
                a = {};
                l = o("[node-type]", e);
                for (var u, s = -1, c = l.length; ++s < c; ) {
                    u = l[s];
                    i = u.getAttribute("node-type");
                    r(a, i, u, t);
                }
            }
        }, p = function(e) {
            var n, i = a[e];
            if (!i || 0 === i.length) {
                n = o('[node-type="' + e + '"]', u);
                n.length && r(a, e, n, t);
                i = a[e];
            }
            return i;
        };
        void 0 === t && (t = !0);
        u = e;
        if ("string" == typeof e && "<" === e.charAt(0)) {
            u = i.createElement("div");
            u.innerHTML = e;
            s = i.createDocumentFragment();
            for (;c = u.firsChild; ) s.appendChild(c);
        } else {
            u = o(e);
            s = u[0];
        }
        f(u);
        return {
            get: p,
            box: s,
            list: a
        };
    };
    t.build = u, t.parse = function(e, t, n) {
        "object" == typeof e && e.length > 0 && (e = e[0]);
        if (!e || 1 !== e.nodeType) throw TypeError("parse error, not a valid html element");
        if ("boolean" == typeof n) {
            t = n;
            n = null;
        }
        return u(e, t, n).list;
    };
    t.dataset = e("./dataset");
});

define("module/top-search/1.0.0/top-search", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function r(e) {
        var t = this, n = {
            activeClass: "focus",
            selector: "#jTopSearch",
            url: $PAGE_DATA && $PAGE_DATA.topSearchUrl || "",
            data: {},
            alias: "name"
        };
        t.options = i.extend(!0, {}, n, e);
        if ("" == t.options.url) throw new Error("the params options.url is required");
        t.el = i(t.options.selector);
        var r = o.build(t.el[0], !1);
        t.ipt = r.get("ipt");
        t.btn = r.get("btn");
        t.lbl = r.get("lbl");
        t._init();
        t._initEvent();
    }
    var i = e("jquery"), o = (e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build"));
    r.prototype._initEvent = function() {
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
    r.prototype._init = function() {
        var e = this, t = i.trim(e.ipt.val()), n = e.ipt.attr("data-id");
        t.length > 0 && e.focus();
        n && (e.options.alias = n);
        e.options.data && (e.options.data[e.options.alias] = i.trim(e.ipt.val()));
    };
    r.prototype.focus = function() {
        var e = this;
        e.el.addClass(e.options.activeClass);
    };
    r.prototype.blur = function() {
        var e = this;
        e.el.removeClass(e.options.activeClass);
    };
    r.prototype.getValue = function() {
        var e = this;
        return i.trim(e.ipt.val());
    };
    r.prototype.search = function() {
        var e = this;
        e.options.data[e.options.alias] = e.getValue();
        window.location.href = e.options.url + "?" + e._getUrlString();
    };
    r.prototype._getUrlString = function() {
        var e = this, t = "", n = 0;
        for (var r in e.options.data) {
            t += 0 == n ? r + "=" + encodeURIComponent(e.options.data[r]) : "&" + r + "=" + encodeURIComponent(e.options.data[r]);
            n++;
        }
        return t;
    };
    n.exports = r;
});

define("lib/core/1.0.0/io/cookie", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    var r = window.document, i = function(e) {
        if ("string" != typeof e) throw "trim need a string as parameter";
        for (var t = e.length, n = 0, r = t - 1, i = /(\u3000|\s|\t|\u00A0)/; n < t && i.test(e.charAt(n)); ) ++n;
        for (;r >= 0 && i.test(e.charAt(r)); ) --r;
        return e.substring(n, r + 1);
    }, o = function(e) {
        var t = {};
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }, u = function(e, t, n) {
        n = n || {};
        if (void 0 !== t) {
            n = o(n);
            if (null === t) {
                t = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var u = n.expires, s = n.expires = new Date();
                s.setTime(s.getTime() + 864e5 * u);
            }
            var a = function(e) {
                try {
                    return n.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return r.cookie = [ a(e), "=", a(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, l = r.cookie, c = function(e) {
            return n.raw ? e : decodeURIComponent(e);
        }, f = l ? l.split("; ") : [], p = -1, d = f.length, h = e.length + 1; ++p < d; ) {
            l = i(f[p]);
            if (l.substring(0, h) === e + "=") {
                t = c(l.substring(h));
                break;
            }
        }
        return t;
    };
    u.set = function(e, t, n) {
        return u(e, t, n);
    };
    u.get = function(e) {
        return u(e);
    };
    n.exports = u;
});

define("module/login-status/1.0.0/login", [ "require", "exports", "module", "lib/core/1.0.0/io/cookie" ], function(e, t, n) {
    "use strict";
    var r = e("lib/core/1.0.0/io/cookie"), i = "_nick", o = "_ui_", u = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", s = $PAGE_DATA && $PAGE_DATA[i] || null;
    t.getNick = function() {
        return s;
    };
    t.isLogin = function() {
        return !!r(o);
    };
    t.login = function(e) {
        if (u) {
            e = e ? "?returnUrl=" + decodeURIComponent(e) : "";
            window.location.href = u + e;
        }
    };
});

define("module/login-status/1.0.0/login-status", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build", "./login" ], function(e, t, n) {
    "use strict";
    function r(e) {
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
        t.options = i.extend(!0, {}, n, e);
        t.el = i(t.options.selector);
        t._init();
    }
    var i = e("jquery"), o = e("lib/core/1.0.0/dom/build"), u = e("./login");
    r.prototype._init = function() {
        var e = this;
        if (u.isLogin()) {
            var t = u.getNick();
            e.el.html(e._getLoginedHtml(t));
            e._initEvent();
        }
    };
    r.prototype._initEvent = function() {
        var e = this, t = !1, n = o.build(e.el[0], !1), r = n.get("userName"), i = n.get("tipsMenu");
        r.on("mouseenter", function() {
            t = !0;
            i.stop().fadeIn(500, function() {
                i.addClass("active");
            });
        });
        r.on("mouseleave", function() {
            t = !1;
            setTimeout(function() {
                t || i.stop().fadeOut(500, function() {
                    i.removeClass("active");
                });
            }, 200);
        });
        i.on("mouseenter", function() {
            t = !0;
        });
        i.on("mouseleave", function() {
            t = !1;
            i.removeClass("active");
        });
    };
    r.prototype._getLoginedHtml = function(e) {
        var t = this, n = t.options, r = n.menuList, i = "";
        i += '<ul class="logined clearfix" node-type="logined">';
        i += '    <li class="item">';
        i += "        <span>您好，</span>";
        i += "    </li>";
        i += '    <li class="item tips-menu-box">';
        i += '        <a href="' + n.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + e + "</a>";
        i += '        <div class="tips-menu" node-type="tipsMenu">';
        i += '            <div class="arrow"><i></i><b></b></div>';
        i += '            <ul class="tips-menu-list">';
        for (var o = 0, u = r.length; o < u; o++) i += '            <li class="tips-menu-item"><a href="' + r[o].url + '">' + r[o].title + "</a></li>";
        i += "            </ul>";
        i += "        </div>";
        i += "    </li>";
        i += '    <li class="item">';
        i += '        <a href="' + n.loginOutUrl + '" class="btn">退出</a>';
        i += "    </li>";
        i += "</ul>";
        return i;
    };
    n.exports = r;
});

define("module/fix-bar/1.0.0/fix-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function r(e) {
        var t = this, n = {
            onlineServiceUrl: ""
        };
        t.options = i.extend(!0, {}, n, e);
        t._init();
        t._initEvent();
    }
    var i = e("jquery");
    e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build");
    r.prototype._init = function() {
        var e = this;
        e.el = i(e._getTemplete());
        i(document.body).append(e.el);
        e.height = e.el.height();
        e.resize();
    };
    r.prototype._initEvent = function() {
        var e = this;
        i(window).on("resize", function() {
            e.resize();
        });
    };
    r.prototype.resize = function() {
        var e = this, t = i(window).height(), n = (t - e.height) / 2;
        if (n >= 0) {
            e.el.css({
                top: n
            });
            e.el.addClass("active");
        } else e.el.removeClass("active");
    };
    r.prototype._getTemplete = function() {
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
    n.exports = r;
});

!function(e, t, n) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], n) : e[t] = n(e.jQuery || e.Zepto);
}(this, "Lazyload", function(e, t) {
    "use strict";
    if (!e) throw "Error: jquery api not implements.";
    var n = e.each, r = function(e, t) {
        if (e instanceof Array && e.filter) return e.filter(t);
        for (var n = [], r = -1, i = e.length; ++r < i; ) t(e[r], r) && n.push(e[r]);
        return n;
    }, i = function(e, t, n, r) {
        var i;
        return function() {
            var o = r || this, u = arguments, s = function() {
                i = null;
                n || e.apply(o, u);
            }, a = n && !i;
            clearTimeout(i);
            i = setTimeout(s, t);
            a && e.apply(o, u);
        };
    }, o = function(t, n) {
        t = t || {};
        var r = e(t), i = Array.prototype.slice;
        n = n || t.name;
        e.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(e, o) {
            t[e] = function(t) {
                var u = i.call(arguments, 0), s = u[1];
                n && !~t.indexOf(".") && (u[0] = t + "." + n);
                "function" == typeof s && ("on" === e || "once" === e ? u[1] = s.__ || (s.__ = function(e) {
                    e.preventDefault();
                    return s.apply(this, i.call(arguments, 1));
                }) : "un" === e && (u[1] = s.__));
                return r[o].apply(r, u);
            };
        });
        return t;
    }, u = window, s = e(u), a = u.Image, l = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, p = 1, d = 2, h = function(e) {
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
    v.define("image", function(n, r, i, o) {
        if (r) {
            var u = new a(), s = function() {
                u.onload = u.onerror = null;
                u = r = n = o = s = t;
            };
            u.onload = function() {
                var t = e(n), u = i.effect;
                "function" != typeof t[u] && (u = "show");
                t.hide();
                "IMG" === n.nodeName.toUpperCase() ? t.attr("src", r) : t.css("background-image", 'url("' + r + '")');
                t[u](i.effectSpeed);
                o(null, "load");
                s();
            };
            u.onerror = function(e) {
                o(e);
                s();
            };
            u.src = r;
        } else o("error");
    });
    v.define("html", function(e, t, n, r) {
        r();
    });
    var m = function(t, a) {
        a = a || {};
        t = e(t);
        var m = this, _ = {
            type: "image",
            threshold: 50,
            failureLimit: 0,
            event: "scroll",
            effect: "show",
            container: u,
            dataAttribute: "src",
            sourceMaker: null,
            skipInvisible: !0,
            appear: null,
            load: null,
            loadingClass: "",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        o(m);
        var w = a.type || _.type, x = v.get(w);
        if ("function" != typeof x) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (_.placeholder = "");
        a && e.extend(_, a);
        var j = _.container, E = _.event, T = 0 === E.indexOf("scroll"), C = j && j !== u ? e(j) : s, q = function(t) {
            var r = m._list;
            if (r.length > 0) {
                var i = 0;
                n(r.slice(0), function(t, n) {
                    var r = e(n);
                    if (!_.skipInvisible || r.is(":visible")) if (A(n, _) || b(n, _)) ; else if (y(n, _) || g(n, _)) {
                        if (++i > _.failureLimit) return !1;
                    } else {
                        r.trigger("appear");
                        i = 0;
                    }
                });
            } else m.reset();
        }, U = function() {
            m._list = r(m._list, function(e) {
                return !e[c];
            });
        }, k = function() {
            var t = this, n = e(t), r = n.attr("data-" + _.dataAttribute), i = _.sourceMaker, o = _.appear, u = _.loadingClass, s = t[c];
            if (s === f) {
                t[c] = p;
                u && n.addClass(u);
                i && (r = i(r, t));
                o && o.apply(m, [ t, r ]);
                x.call(m, t, r, _, function(e, i) {
                    if (!m._destroyed) {
                        u && n.removeClass(u);
                        if (e) setTimeout(function() {
                            t[c] = f;
                            m.emit("lazyItemError", t, r, e);
                            t = null;
                        }, 300); else {
                            t[c] = d;
                            U();
                            m.emit("lazyItemReady", t, r, i);
                            var o = _.load;
                            o && o.apply(m, [ t, r, i ]);
                            t = null;
                        }
                        n = null;
                    }
                });
            } else if (s === d) {
                U();
                m.emit("lazyItemReady", t, r);
            }
        }, D = function() {
            this[c] || e(this).trigger("appear");
        }, L = function(t) {
            var n = e(t);
            t[c] = f;
            var r = _.placeholder;
            if (r) if (n.is("img")) {
                var i = n.attr("src");
                i || n.attr("src", r);
            } else "image" === m._.type || n.children()[0] || n.html(r);
            n.on("appear", k);
            T || n.on(E, D);
            m._list.push(t);
        }, I = function(e) {
            e = r(e || [], h);
            if (e.length) {
                n(e, function(e, t) {
                    L(t);
                });
                m._inited || O(m);
            }
        }, O = function(t) {
            if (!t._inited) {
                var r = i(q, 30);
                t._inited = !0;
                T && C.on(E, r);
                s.on("resize", r);
                if (l) {
                    var o = function(r) {
                        r.originalEvent && r.originalEvent.persisted && n(t._list, function(t, n) {
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
                        P(t);
                    });
                    T && C.off(E, r);
                    s.off("resize", r);
                });
                e(document).ready(q);
            }
        }, P = function(t) {
            var n = e(t);
            n.off("appear", k);
            T || n.off(E, D);
        };
        m.on("lazyItemReady", function(e) {
            P(e);
        });
        m.once("destroy", function() {
            I = null;
            q = null;
            U = null;
            k = null;
            D = null;
        });
        m._ = _;
        m._list = [];
        m.add = function(t) {
            var n = e(t);
            n.length > 0 && I(n);
        };
        m.update = q;
        I(t);
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
        return v.define(e, t);
    };
    var y = function(t, n) {
        var r, i = n.container;
        r = i && i !== u ? e(i).offset().top + e(i).height() : (u.innerHeight ? u.innerHeight : s.height()) + s.scrollTop();
        return r <= e(t).offset().top - n.threshold;
    }, g = function(t, n) {
        var r, i = n.container;
        r = i && i !== u ? e(i).offset().left + e(i).width() : s.width() + s.scrollLeft();
        return r <= e(t).offset().left - n.threshold;
    }, A = function(t, n) {
        var r, i = n.container;
        r = i && i !== u ? e(i).offset().top : s.scrollTop();
        return r >= e(t).offset().top + n.threshold + e(t).height();
    }, b = function(t, n) {
        var r, i = n.container;
        r = i && i !== u ? e(i).offset().left : s.scrollLeft();
        return r >= e(t).offset().left + n.threshold + e(t).width();
    }, _ = function(e, t) {
        return !(g(e, t) || b(e, t) || y(e, t) || A(e, t));
    };
    m.belowthefold = y;
    m.rightoffold = g;
    m.abovethetop = A;
    m.leftofbegin = b;
    m.inviewport = _;
    return m;
});

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function r(e) {
        var t = this, n = {
            selector: "#jFooter"
        };
        t.options = i.extend(!0, {}, n, e);
        t.el = i(t.options.selector);
        if (0 == t.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        t._init();
    }
    var i = e("jquery"), o = e("lib/plugins/lazyload/1.9.3/lazyload"), u = e("lib/core/1.0.0/dom/build");
    r.prototype._init = function() {
        var e = this, t = u.build(e.el[0], !1), n = t.get("footerImg");
        new o(n);
    };
    n.exports = r;
});

define("conf/hp/hp-index", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/io/request", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer" ], function(e, t, n) {
    "use strict";
    var r = (e("jquery"), e("lib/core/1.0.0/io/request"), e("module/top-search/1.0.0/top-search")), i = e("module/login-status/1.0.0/login-status"), o = e("module/fix-bar/1.0.0/fix-bar"), u = e("module/footer/1.0.0/footer");
    new r(), new i(), new o(), new u();
});