/*! Based on work by Simon Willison: http://gist.github.com/292562 */

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
            var r = i || this, a = arguments, u = function() {
                o = null;
                n || e.apply(r, a);
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(u, t);
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
                var a = o.call(arguments, 0), u = a[1];
                n && !~t.indexOf(".") && (a[0] = t + "." + n);
                "function" == typeof u && ("on" === e || "once" === e ? a[1] = u.__ || (u.__ = function(e) {
                    e.preventDefault();
                    return u.apply(this, o.call(arguments, 1));
                }) : "un" === e && (a[1] = u.__));
                return i[r].apply(i, a);
            };
        });
        return t;
    }, a = window, u = e(a), l = a.Image, s = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, p = 1, d = 2, h = function(e) {
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
            var a = new l(), u = function() {
                a.onload = a.onerror = null;
                a = i = n = r = u = t;
            };
            a.onload = function() {
                var t = e(n), a = o.effect;
                "function" != typeof t[a] && (a = "show");
                t.hide();
                "IMG" === n.nodeName.toUpperCase() ? t.attr("src", i) : t.css("background-image", 'url("' + i + '")');
                t[a](o.effectSpeed);
                r(null, "load");
                u();
            };
            a.onerror = function(e) {
                r(e);
                u();
            };
            a.src = i;
        } else r("error");
    });
    v.define("html", function(e, t, n, i) {
        i();
    });
    var m = function(t, l) {
        l = l || {};
        t = e(t);
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
        var w = l.type || _.type, x = v.get(w);
        if ("function" != typeof x) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (_.placeholder = "");
        l && e.extend(_, l);
        var E = _.container, C = _.event, T = 0 === C.indexOf("scroll"), j = E && E !== a ? e(E) : u, U = function(t) {
            var i = m._list;
            if (i.length > 0) {
                var o = 0;
                n(i.slice(0), function(t, n) {
                    var i = e(n);
                    if (!_.skipInvisible || i.is(":visible")) if (A(n, _) || b(n, _)) ; else if (g(n, _) || y(n, _)) {
                        if (++o > _.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        o = 0;
                    }
                });
            } else m.reset();
        }, q = function() {
            m._list = i(m._list, function(e) {
                return !e[c];
            });
        }, I = function() {
            var t = this, n = e(t), i = n.attr("data-" + _.dataAttribute), o = _.sourceMaker, r = _.appear, a = _.loadingClass, u = t[c];
            if (u === f) {
                t[c] = p;
                a && n.addClass(a);
                o && (i = o(i, t));
                r && r.apply(m, [ t, i ]);
                x.call(m, t, i, _, function(e, o) {
                    if (!m._destroyed) {
                        a && n.removeClass(a);
                        if (e) setTimeout(function() {
                            t[c] = f;
                            m.emit("lazyItemError", t, i, e);
                            t = null;
                        }, 300); else {
                            t[c] = d;
                            q();
                            m.emit("lazyItemReady", t, i, o);
                            var r = _.load;
                            r && r.apply(m, [ t, i, o ]);
                            t = null;
                        }
                        n = null;
                    }
                });
            } else if (u === d) {
                q();
                m.emit("lazyItemReady", t, i);
            }
        }, z = function() {
            this[c] || e(this).trigger("appear");
        }, D = function(t) {
            var n = e(t);
            t[c] = f;
            var i = _.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === m._.type || n.children()[0] || n.html(i);
            n.on("appear", I);
            T || n.on(C, z);
            m._list.push(t);
        }, P = function(e) {
            e = i(e || [], h);
            if (e.length) {
                n(e, function(e, t) {
                    D(t);
                });
                m._inited || k(m);
            }
        }, k = function(t) {
            if (!t._inited) {
                var i = o(U, 30);
                t._inited = !0;
                T && j.on(C, i);
                u.on("resize", i);
                if (s) {
                    var r = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(t._list, function(t, n) {
                            e(n).trigger("appear");
                        });
                    };
                    u.on("pageshow", r);
                    t.once("reset", function() {
                        u.off("pageshow", r);
                    });
                }
                t.once("reset", function() {
                    n(t._list, function(e, t) {
                        L(t);
                    });
                    T && j.off(C, i);
                    u.off("resize", i);
                });
                e(document).ready(U);
            }
        }, L = function(t) {
            var n = e(t);
            n.off("appear", I);
            T || n.off(C, z);
        };
        m.on("lazyItemReady", function(e) {
            L(e);
        });
        m.once("destroy", function() {
            P = null;
            U = null;
            q = null;
            I = null;
            z = null;
        });
        m._ = _;
        m._list = [];
        m.add = function(t) {
            var n = e(t);
            n.length > 0 && P(n);
        };
        m.update = U;
        P(t);
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
    var g = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top + e(o).height() : (a.innerHeight ? a.innerHeight : u.height()) + u.scrollTop();
        return i <= e(t).offset().top - n.threshold;
    }, y = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left + e(o).width() : u.width() + u.scrollLeft();
        return i <= e(t).offset().left - n.threshold;
    }, A = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top : u.scrollTop();
        return i >= e(t).offset().top + n.threshold + e(t).height();
    }, b = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left : u.scrollLeft();
        return i >= e(t).offset().left + n.threshold + e(t).width();
    }, _ = function(e, t) {
        return !(y(e, t) || b(e, t) || g(e, t) || A(e, t));
    };
    m.belowthefold = g;
    m.rightoffold = y;
    m.abovethetop = A;
    m.leftofbegin = b;
    m.inviewport = _;
    return m;
});

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
        for (var n in e) d.call(e, n) && t(e[n], n, e);
    }
    function u(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? r(e, t) : a(e, t);
    }
    function l(e, t) {
        for (var n = -1, i = e.length, o = Array(i); ++n < i; ) o[n] = t(e[n], n, e);
        return o;
    }
    function s(e, t) {
        var n = [];
        u(e, function(e, i, o) {
            n.push(t(e, i, o));
        });
        return n;
    }
    function c(e, t) {
        if (!t || !i(t)) return e;
        for (var n = m(t), o = n.length; o--; ) e[n[o]] = t[n[o]];
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
    var p = new Function("return this")(), d = Object.prototype.hasOwnProperty, h = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, v = function() {
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
        return function(t, n) {
            t.__super__ = n.prototype;
            e.prototype = n.prototype;
            t.prototype = new e(t);
        };
    }(), y = p.console || (p.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(e) {
        y[e] || (y[e] = o);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), i = n.length, o = -1; ++o < i; ) c(e, n[o]);
        return e;
    };
    t.inherits = function(e, t, n) {
        g(e, t);
        n && c(e.prototype, n);
    };
    t.impls = function(e, n) {
        n = "function" == typeof n ? n.prototype : n;
        t.mix(e.prototype, n);
        return e;
    };
    t.parseQuery = f;
    t.parseParams = f;
    t.each = u;
    t.map = function(e, t) {
        var n = h(e) ? l : s;
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
    t.mix = function A(e, t, n, i, o) {
        for (var r in t) t.hasOwnProperty(r) && (t[r] && e[r] && n && "object" == typeof t[r] ? A(e[r], t[r], n, i, o) : (void 0 === e[r] || i) && (o && !o(e[r], t[r]) || (e[r] = t[r])));
        return e;
    };
    t.guid = v;
    t.setImmediate = function() {
        var e = p.document, t = p.postMessage, n = p.setImmediate;
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
                    p.removeEventListener("message", n, !0);
                    e();
                }
            }
            var i = v();
            p.addEventListener("message", n, !0);
            t(i, "*");
        } : function(e) {
            p.setTimeout(e, 0);
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
            var r = i || this, a = arguments, u = function() {
                o = null;
                n || e.apply(r, a);
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(u, t);
            l && e.apply(r, a);
        };
    };
    t.deprecate = function(e, t) {
        function n() {
            i || (i = !0);
            return e.apply(this, arguments);
        }
        if (p.noDeprecation === !0) return e;
        var i = !1;
        return n;
    };
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return e.replace(u, "ms-").replace(l, s);
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
    var a = (window.document, e("jquery")), u = /^-ms-/, l = /-([\da-z])/gi, s = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, p = function(e, t, n) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, u, l, s;
        if (1 === arguments.length) {
            if (l = e.dataset) {
                s = {};
                for (u in l) l.hasOwnProperty(u) && (s[u] = o(l[u]));
                return s;
            }
            l = e.attributes;
            a = l.length;
            s = {};
            for (;a--; ) if (l[a]) {
                u = l[a].name;
                if (0 === u.indexOf("data-")) {
                    u = i(u.slice(5));
                    s[u] = o(r(e, u));
                }
            }
            return s;
        }
    };
    n.exports = p;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, n) {
    "use strict";
    function i(e, t, n, i) {
        i ? e[t] || (e[t] = n) : e[t] ? e[t] = e[t].add(n) : e[t] = r(n);
    }
    var o = window.document, r = e("jquery"), a = function(e, t, n) {
        var a, u, l, s, c, f = function(e) {
            if (n) for (var o in n) l[o] = r(n[o].toString(), e); else {
                l = {};
                s = r("[node-type]", e);
                for (var a, u = -1, c = s.length; ++u < c; ) {
                    a = s[u];
                    o = a.getAttribute("node-type");
                    i(l, o, a, t);
                }
            }
        }, p = function(e) {
            var n, o = l[e];
            if (!o || 0 === o.length) {
                n = r('[node-type="' + e + '"]', a);
                n.length && i(l, e, n, t);
                o = l[e];
            }
            return o;
        };
        void 0 === t && (t = !0);
        a = e;
        if ("string" == typeof e && "<" === e.charAt(0)) {
            a = o.createElement("div");
            a.innerHTML = e;
            u = o.createDocumentFragment();
            for (;c = a.firsChild; ) u.appendChild(c);
        } else {
            a = r(e);
            u = a[0];
        }
        f(a);
        return {
            get: p,
            box: u,
            list: l
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
                var a = n.expires, u = n.expires = new Date();
                u.setTime(u.getTime() + 864e5 * a);
            }
            var l = function(e) {
                try {
                    return n.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return i.cookie = [ l(e), "=", l(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, s = i.cookie, c = function(e) {
            return n.raw ? e : decodeURIComponent(e);
        }, f = s ? s.split("; ") : [], p = -1, d = f.length, h = e.length + 1; ++p < d; ) {
            s = o(f[p]);
            if (s.substring(0, h) === e + "=") {
                t = c(s.substring(h));
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
    var i = e("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", u = $PAGE_DATA && $PAGE_DATA[o] || null;
    t.getNick = function() {
        return u;
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

define("conf/news/news-detail", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer" ], function(e, t, n) {
    "use strict";
    var i, o = e("jquery"), r = e("lib/plugins/lazyload/1.9.3/lazyload"), a = o("#jHotTrain");
    i = new r(a.find(".jImg"), {
        mouseWheel: !0,
        effect: "fadeIn",
        snap: !0
    });
    var u = e("module/top-search/1.0.0/top-search"), l = e("module/login-status/1.0.0/login-status"), s = e("module/fix-bar/1.0.0/fix-bar"), c = e("module/footer/1.0.0/footer");
    new u(), new l(), new s(), new c();
});