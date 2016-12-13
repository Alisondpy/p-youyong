/*! Based on work by Simon Willison: http://gist.github.com/292562 */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    function o(e) {
        return "object" == typeof e && null !== e;
    }
    function i() {}
    function r(e, t) {
        for (var n = e.length, o = -1; ++o < n; ) t(e[o], o);
    }
    function u(e, t) {
        for (var n in e) d.call(e, n) && t(e[n], n, e);
    }
    function a(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? r(e, t) : u(e, t);
    }
    function l(e, t) {
        for (var n = -1, o = e.length, i = Array(o); ++n < o; ) i[n] = t(e[n], n, e);
        return i;
    }
    function s(e, t) {
        var n = [];
        a(e, function(e, o, i) {
            n.push(t(e, o, i));
        });
        return n;
    }
    function c(e, t) {
        if (!t || !o(t)) return e;
        for (var n = m(t), i = n.length; i--; ) e[n[i]] = t[n[i]];
        return e;
    }
    function f(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = {}, o = e.split("&"), i = -1, r = o.length; ++i < r; ) {
            t = o[i].split("=");
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
        y[e] || (y[e] = i);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), o = n.length, i = -1; ++i < o; ) c(e, n[i]);
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
    t.each = a;
    t.map = function(e, t) {
        var n = h(e) ? l : s;
        return n(e, t);
    };
    t.filter = function(e, t) {
        var n, o, i = h(e) ? (n = r, o = function(e, t) {
            i.push(t);
        }, []) : (n = u, o = function(e, t) {
            i[e] = t;
        }, {});
        n(e, function(e, n) {
            t(e, n) && o(n, e);
        });
        return i;
    };
    t.mix = function A(e, t, n, o, i) {
        for (var r in t) t.hasOwnProperty(r) && (t[r] && e[r] && n && "object" == typeof t[r] ? A(e[r], t[r], n, o, i) : (void 0 === e[r] || o) && (i && !i(e[r], t[r]) || (e[r] = t[r])));
        return e;
    };
    t.guid = v;
    t.setImmediate = function() {
        var e = p.document, t = p.postMessage, n = p.setImmediate;
        return n ? n : "onreadystatechange" in e.createElement("script") ? function(t) {
            function n() {
                o.onreadystatechange = null;
                o.parentNode.removeChild(o);
                t();
            }
            var o = e.createElement("script");
            o.onreadystatechange = n;
            e.documentElement.appendChild(o);
        } : t ? function(e) {
            function n(t) {
                if (t.data === o) {
                    p.removeEventListener("message", n, !0);
                    e();
                }
            }
            var o = v();
            p.addEventListener("message", n, !0);
            t(o, "*");
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
            var o = +new Date();
            if (!n || o - n > t) {
                n = o;
                e.apply(this, arguments);
            }
        };
    };
    t.debounce = function(e, t, n, o) {
        var i;
        return function() {
            var r = o || this, u = arguments, a = function() {
                i = null;
                n || e.apply(r, u);
            }, l = n && !i;
            clearTimeout(i);
            i = setTimeout(a, t);
            l && e.apply(r, u);
        };
    };
    t.deprecate = function(e, t) {
        function n() {
            o || (o = !0);
            return e.apply(this, arguments);
        }
        if (p.noDeprecation === !0) return e;
        var o = !1;
        return n;
    };
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(e, t, n) {
    "use strict";
    function o(e) {
        return e.replace(a, "ms-").replace(l, s);
    }
    function i(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : c.test(e) ? u.parseJSON(e) : e);
        } catch (t) {}
    }
    function r(e, t, n) {
        var o;
        if (void 0 === n && 1 === e.nodeType) {
            o = "data-" + t.replace(f, "-$&").toLowerCase();
            n = e.getAttribute(o);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var u = (window.document, e("jquery")), a = /^-ms-/, l = /-([\da-z])/gi, s = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, p = function(e, t, n) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var u, a, l, s;
        if (1 === arguments.length) {
            if (l = e.dataset) {
                s = {};
                for (a in l) l.hasOwnProperty(a) && (s[a] = i(l[a]));
                return s;
            }
            l = e.attributes;
            u = l.length;
            s = {};
            for (;u--; ) if (l[u]) {
                a = l[u].name;
                if (0 === a.indexOf("data-")) {
                    a = o(a.slice(5));
                    s[a] = i(r(e, a));
                }
            }
            return s;
        }
    };
    n.exports = p;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, n) {
    "use strict";
    function o(e, t, n, o) {
        o ? e[t] || (e[t] = n) : e[t] ? e[t] = e[t].add(n) : e[t] = r(n);
    }
    var i = window.document, r = e("jquery"), u = function(e, t, n) {
        var u, a, l, s, c, f = function(e) {
            if (n) for (var i in n) l[i] = r(n[i].toString(), e); else {
                l = {};
                s = r("[node-type]", e);
                for (var u, a = -1, c = s.length; ++a < c; ) {
                    u = s[a];
                    i = u.getAttribute("node-type");
                    o(l, i, u, t);
                }
            }
        }, p = function(e) {
            var n, i = l[e];
            if (!i || 0 === i.length) {
                n = r('[node-type="' + e + '"]', u);
                n.length && o(l, e, n, t);
                i = l[e];
            }
            return i;
        };
        void 0 === t && (t = !0);
        u = e;
        if ("string" == typeof e && "<" === e.charAt(0)) {
            u = i.createElement("div");
            u.innerHTML = e;
            a = i.createDocumentFragment();
            for (;c = u.firsChild; ) a.appendChild(c);
        } else {
            u = r(e);
            a = u[0];
        }
        f(u);
        return {
            get: p,
            box: a,
            list: l
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
    function o(e) {
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
        var o = r.build(t.el[0], !1);
        t.ipt = o.get("ipt");
        t.btn = o.get("btn");
        t.lbl = o.get("lbl");
        t._init();
        t._initEvent();
    }
    var i = e("jquery"), r = (e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build"));
    o.prototype._initEvent = function() {
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
    o.prototype._init = function() {
        var e = this, t = i.trim(e.ipt.val()), n = e.ipt.attr("data-id");
        t.length > 0 && e.focus();
        n && (e.options.alias = n);
        e.options.data && (e.options.data[e.options.alias] = i.trim(e.ipt.val()));
    };
    o.prototype.focus = function() {
        var e = this;
        e.el.addClass(e.options.activeClass);
    };
    o.prototype.blur = function() {
        var e = this;
        e.el.removeClass(e.options.activeClass);
    };
    o.prototype.getValue = function() {
        var e = this;
        return i.trim(e.ipt.val());
    };
    o.prototype.search = function() {
        var e = this;
        e.options.data[e.options.alias] = e.getValue();
        window.location.href = e.options.url + "?" + e._getUrlString();
    };
    o.prototype._getUrlString = function() {
        var e = this, t = "", n = 0;
        for (var o in e.options.data) {
            t += 0 == n ? o + "=" + encodeURIComponent(e.options.data[o]) : "&" + o + "=" + encodeURIComponent(e.options.data[o]);
            n++;
        }
        return t;
    };
    n.exports = o;
});

define("lib/core/1.0.0/io/cookie", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    var o = window.document, i = function(e) {
        if ("string" != typeof e) throw "trim need a string as parameter";
        for (var t = e.length, n = 0, o = t - 1, i = /(\u3000|\s|\t|\u00A0)/; n < t && i.test(e.charAt(n)); ) ++n;
        for (;o >= 0 && i.test(e.charAt(o)); ) --o;
        return e.substring(n, o + 1);
    }, r = function(e) {
        var t = {};
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }, u = function(e, t, n) {
        n = n || {};
        if (void 0 !== t) {
            n = r(n);
            if (null === t) {
                t = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var u = n.expires, a = n.expires = new Date();
                a.setTime(a.getTime() + 864e5 * u);
            }
            var l = function(e) {
                try {
                    return n.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return o.cookie = [ l(e), "=", l(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, s = o.cookie, c = function(e) {
            return n.raw ? e : decodeURIComponent(e);
        }, f = s ? s.split("; ") : [], p = -1, d = f.length, h = e.length + 1; ++p < d; ) {
            s = i(f[p]);
            if (s.substring(0, h) === e + "=") {
                t = c(s.substring(h));
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
    var o = e("lib/core/1.0.0/io/cookie"), i = "_nick", r = "_ui_", u = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", a = $PAGE_DATA && $PAGE_DATA[i] || null;
    t.getNick = function() {
        return a;
    };
    t.isLogin = function() {
        return !!o(r);
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
    function o(e) {
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
    var i = e("jquery"), r = e("lib/core/1.0.0/dom/build"), u = e("./login");
    o.prototype._init = function() {
        var e = this;
        if (u.isLogin()) {
            var t = u.getNick();
            e.el.html(e._getLoginedHtml(t));
            e._initEvent();
        }
    };
    o.prototype._initEvent = function() {
        var e = this, t = !1, n = r.build(e.el[0], !1), o = n.get("userName"), i = n.get("tipsMenu");
        o.on("mouseenter", function() {
            t = !0;
            i.stop().fadeIn(500, function() {
                i.addClass("active");
            });
        });
        o.on("mouseleave", function() {
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
    o.prototype._getLoginedHtml = function(e) {
        var t = this, n = t.options, o = n.menuList, i = "";
        i += '<ul class="logined clearfix" node-type="logined">';
        i += '    <li class="item">';
        i += "        <span>您好，</span>";
        i += "    </li>";
        i += '    <li class="item tips-menu-box">';
        i += '        <a href="' + n.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + e + "</a>";
        i += '        <div class="tips-menu" node-type="tipsMenu">';
        i += '            <div class="arrow"><i></i><b></b></div>';
        i += '            <ul class="tips-menu-list">';
        for (var r = 0, u = o.length; r < u; r++) i += '            <li class="tips-menu-item"><a href="' + o[r].url + '">' + o[r].title + "</a></li>";
        i += "            </ul>";
        i += "        </div>";
        i += "    </li>";
        i += '    <li class="item">';
        i += '        <a href="' + n.loginOutUrl + '" class="btn">退出</a>';
        i += "    </li>";
        i += "</ul>";
        return i;
    };
    n.exports = o;
});

!function(e, t, n) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], n) : e[t] = n(e.jQuery || e.Zepto);
}(this, "Lazyload", function(e, t) {
    "use strict";
    if (!e) throw "Error: jquery api not implements.";
    var n = e.each, o = function(e, t) {
        if (e instanceof Array && e.filter) return e.filter(t);
        for (var n = [], o = -1, i = e.length; ++o < i; ) t(e[o], o) && n.push(e[o]);
        return n;
    }, i = function(e, t, n, o) {
        var i;
        return function() {
            var r = o || this, u = arguments, a = function() {
                i = null;
                n || e.apply(r, u);
            }, l = n && !i;
            clearTimeout(i);
            i = setTimeout(a, t);
            l && e.apply(r, u);
        };
    }, r = function(t, n) {
        t = t || {};
        var o = e(t), i = Array.prototype.slice;
        n = n || t.name;
        e.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(e, r) {
            t[e] = function(t) {
                var u = i.call(arguments, 0), a = u[1];
                n && !~t.indexOf(".") && (u[0] = t + "." + n);
                "function" == typeof a && ("on" === e || "once" === e ? u[1] = a.__ || (a.__ = function(e) {
                    e.preventDefault();
                    return a.apply(this, i.call(arguments, 1));
                }) : "un" === e && (u[1] = a.__));
                return o[r].apply(o, u);
            };
        });
        return t;
    }, u = window, a = e(u), l = u.Image, s = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, p = 1, d = 2, h = function(e) {
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
    v.define("image", function(n, o, i, r) {
        if (o) {
            var u = new l(), a = function() {
                u.onload = u.onerror = null;
                u = o = n = r = a = t;
            };
            u.onload = function() {
                var t = e(n), u = i.effect;
                "function" != typeof t[u] && (u = "show");
                t.hide();
                "IMG" === n.nodeName.toUpperCase() ? t.attr("src", o) : t.css("background-image", 'url("' + o + '")');
                t[u](i.effectSpeed);
                r(null, "load");
                a();
            };
            u.onerror = function(e) {
                r(e);
                a();
            };
            u.src = o;
        } else r("error");
    });
    v.define("html", function(e, t, n, o) {
        o();
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
            container: u,
            dataAttribute: "src",
            sourceMaker: null,
            skipInvisible: !0,
            appear: null,
            load: null,
            loadingClass: "",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        r(m);
        var w = l.type || _.type, C = v.get(w);
        if ("function" != typeof C) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (_.placeholder = "");
        l && e.extend(_, l);
        var x = _.container, E = _.event, j = 0 === E.indexOf("scroll"), T = x && x !== u ? e(x) : a, L = function(t) {
            var o = m._list;
            if (o.length > 0) {
                var i = 0;
                n(o.slice(0), function(t, n) {
                    var o = e(n);
                    if (!_.skipInvisible || o.is(":visible")) if (A(n, _) || b(n, _)) ; else if (g(n, _) || y(n, _)) {
                        if (++i > _.failureLimit) return !1;
                    } else {
                        o.trigger("appear");
                        i = 0;
                    }
                });
            } else m.reset();
        }, U = function() {
            m._list = o(m._list, function(e) {
                return !e[c];
            });
        }, q = function() {
            var t = this, n = e(t), o = n.attr("data-" + _.dataAttribute), i = _.sourceMaker, r = _.appear, u = _.loadingClass, a = t[c];
            if (a === f) {
                t[c] = p;
                u && n.addClass(u);
                i && (o = i(o, t));
                r && r.apply(m, [ t, o ]);
                C.call(m, t, o, _, function(e, i) {
                    if (!m._destroyed) {
                        u && n.removeClass(u);
                        if (e) setTimeout(function() {
                            t[c] = f;
                            m.emit("lazyItemError", t, o, e);
                            t = null;
                        }, 300); else {
                            t[c] = d;
                            U();
                            m.emit("lazyItemReady", t, o, i);
                            var r = _.load;
                            r && r.apply(m, [ t, o, i ]);
                            t = null;
                        }
                        n = null;
                    }
                });
            } else if (a === d) {
                U();
                m.emit("lazyItemReady", t, o);
            }
        }, D = function() {
            this[c] || e(this).trigger("appear");
        }, I = function(t) {
            var n = e(t);
            t[c] = f;
            var o = _.placeholder;
            if (o) if (n.is("img")) {
                var i = n.attr("src");
                i || n.attr("src", o);
            } else "image" === m._.type || n.children()[0] || n.html(o);
            n.on("appear", q);
            j || n.on(E, D);
            m._list.push(t);
        }, k = function(e) {
            e = o(e || [], h);
            if (e.length) {
                n(e, function(e, t) {
                    I(t);
                });
                m._inited || P(m);
            }
        }, P = function(t) {
            if (!t._inited) {
                var o = i(L, 30);
                t._inited = !0;
                j && T.on(E, o);
                a.on("resize", o);
                if (s) {
                    var r = function(o) {
                        o.originalEvent && o.originalEvent.persisted && n(t._list, function(t, n) {
                            e(n).trigger("appear");
                        });
                    };
                    a.on("pageshow", r);
                    t.once("reset", function() {
                        a.off("pageshow", r);
                    });
                }
                t.once("reset", function() {
                    n(t._list, function(e, t) {
                        O(t);
                    });
                    j && T.off(E, o);
                    a.off("resize", o);
                });
                e(document).ready(L);
            }
        }, O = function(t) {
            var n = e(t);
            n.off("appear", q);
            j || n.off(E, D);
        };
        m.on("lazyItemReady", function(e) {
            O(e);
        });
        m.once("destroy", function() {
            k = null;
            L = null;
            U = null;
            q = null;
            D = null;
        });
        m._ = _;
        m._list = [];
        m.add = function(t) {
            var n = e(t);
            n.length > 0 && k(n);
        };
        m.update = L;
        k(t);
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
        var o, i = n.container;
        o = i && i !== u ? e(i).offset().top + e(i).height() : (u.innerHeight ? u.innerHeight : a.height()) + a.scrollTop();
        return o <= e(t).offset().top - n.threshold;
    }, y = function(t, n) {
        var o, i = n.container;
        o = i && i !== u ? e(i).offset().left + e(i).width() : a.width() + a.scrollLeft();
        return o <= e(t).offset().left - n.threshold;
    }, A = function(t, n) {
        var o, i = n.container;
        o = i && i !== u ? e(i).offset().top : a.scrollTop();
        return o >= e(t).offset().top + n.threshold + e(t).height();
    }, b = function(t, n) {
        var o, i = n.container;
        o = i && i !== u ? e(i).offset().left : a.scrollLeft();
        return o >= e(t).offset().left + n.threshold + e(t).width();
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

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function o(e) {
        var t = this, n = {
            selector: "#jFooter"
        };
        t.options = i.extend(!0, {}, n, e);
        t.el = i(t.options.selector);
        if (0 == t.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        t._init();
    }
    var i = e("jquery"), r = e("lib/plugins/lazyload/1.9.3/lazyload"), u = e("lib/core/1.0.0/dom/build");
    o.prototype._init = function() {
        var e = this, t = u.build(e.el[0], !1), n = t.get("footerImg");
        new r(n);
    };
    n.exports = o;
});

define("module/uc/left-menu/left-menu", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function o(e) {
        var t = this, n = {
            selector: "#jLeftMenu",
            activeClass: "focus"
        };
        t.options = i.extend(!0, {}, n, e);
        t.el = i(t.options.selector);
        var o = r.build(t.el, !1);
        t.itemLevel1s = o.get("itemLevel1");
        t.txtLevel1s = o.get("txtLevel1");
        t.menuLevel2s = o.get("menuLevel2");
        t._init();
        t._initEvent();
    }
    var i = e("jquery"), r = e("lib/core/1.0.0/dom/build");
    o.prototype._initEvent = function() {
        var e = this;
        e.txtLevel1s.on("click", function(t) {
            t.preventDefault();
            var n = i(this), o = n.parent(), u = r.build(o, !1), a = u.get("menuLevel2");
            if (a) if (o.hasClass("active")) a.slideUp(function() {
                o.removeClass("active");
            }); else {
                e.menuLevel2s.slideUp();
                a.slideDown(function() {
                    e.itemLevel1s.removeClass("active");
                    o.addClass("active");
                });
            } else window.location.href = n.attr("href");
        });
    };
    o.prototype._init = function() {
        var e = this;
        e.el.find(".jItemLevel2").each(function() {
            var e = i(this);
            e.hasClass("active") && e.parent().parent(".jItemLevel1").addClass("active");
        });
    };
    n.exports = o;
});

define("conf/uc/common", [ "require", "exports", "module", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/footer/1.0.0/footer", "module/uc/left-menu/left-menu" ], function(e, t, n) {
    "use strict";
    var o = e("module/top-search/1.0.0/top-search"), i = e("module/login-status/1.0.0/login-status"), r = e("module/footer/1.0.0/footer"), u = (new o(), 
    new i(), new r(), e("module/uc/left-menu/left-menu"));
    new u();
});