/*! Based on work by Simon Willison: http://gist.github.com/292562 */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    function r(t) {
        return "object" == typeof t && null !== t;
    }
    function o() {}
    function i(t, e) {
        for (var n = t.length, r = -1; ++r < n; ) e(t[r], r);
    }
    function u(t, e) {
        for (var n in t) d.call(t, n) && e(t[n], n, t);
    }
    function a(t, e) {
        if (t && t.forEach) return t.forEach(e);
        h(t) ? i(t, e) : u(t, e);
    }
    function s(t, e) {
        for (var n = -1, r = t.length, o = Array(r); ++n < r; ) o[n] = e(t[n], n, t);
        return o;
    }
    function l(t, e) {
        var n = [];
        a(t, function(t, r, o) {
            n.push(e(t, r, o));
        });
        return n;
    }
    function c(t, e) {
        if (!e || !r(e)) return t;
        for (var n = m(e), o = n.length; o--; ) t[n[o]] = e[n[o]];
        return t;
    }
    function f(t) {
        "?" === t.charAt(0) && (t = t.substr(1));
        for (var e, n = {}, r = t.split("&"), o = -1, i = r.length; ++o < i; ) {
            e = r[o].split("=");
            n[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
        }
        return n;
    }
    var p = new Function("return this")(), d = Object.prototype.hasOwnProperty, h = Array.isArray || function(t) {
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
    }, g = "function" == typeof Object.create ? function(t, e) {
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
    }(), y = p.console || (p.console = {});
    i([ "log", "error", "trace", "warn", "info" ], function(t) {
        y[t] || (y[t] = o);
    });
    e.extend = function(t, e) {
        for (var n = [].slice.call(arguments, 1), r = n.length, o = -1; ++o < r; ) c(t, n[o]);
        return t;
    };
    e.inherits = function(t, e, n) {
        g(t, e);
        n && c(t.prototype, n);
    };
    e.impls = function(t, n) {
        n = "function" == typeof n ? n.prototype : n;
        e.mix(t.prototype, n);
        return t;
    };
    e.parseQuery = f;
    e.parseParams = f;
    e.each = a;
    e.map = function(t, e) {
        var n = h(t) ? s : l;
        return n(t, e);
    };
    e.filter = function(t, e) {
        var n, r, o = h(t) ? (n = i, r = function(t, e) {
            o.push(e);
        }, []) : (n = u, r = function(t, e) {
            o[t] = e;
        }, {});
        n(t, function(t, n) {
            e(t, n) && r(n, t);
        });
        return o;
    };
    e.mix = function A(t, e, n, r, o) {
        for (var i in e) e.hasOwnProperty(i) && (e[i] && t[i] && n && "object" == typeof e[i] ? A(t[i], e[i], n, r, o) : (void 0 === t[i] || r) && (o && !o(t[i], e[i]) || (t[i] = e[i])));
        return t;
    };
    e.guid = v;
    e.setImmediate = function() {
        var t = p.document, e = p.postMessage, n = p.setImmediate;
        return n ? n : "onreadystatechange" in t.createElement("script") ? function(e) {
            function n() {
                r.onreadystatechange = null;
                r.parentNode.removeChild(r);
                e();
            }
            var r = t.createElement("script");
            r.onreadystatechange = n;
            t.documentElement.appendChild(r);
        } : e ? function(t) {
            function n(e) {
                if (e.data === r) {
                    p.removeEventListener("message", n, !0);
                    t();
                }
            }
            var r = v();
            p.addEventListener("message", n, !0);
            e(r, "*");
        } : function(t) {
            p.setTimeout(t, 0);
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
            var r = +new Date();
            if (!n || r - n > e) {
                n = r;
                t.apply(this, arguments);
            }
        };
    };
    e.debounce = function(t, e, n, r) {
        var o;
        return function() {
            var i = r || this, u = arguments, a = function() {
                o = null;
                n || t.apply(i, u);
            }, s = n && !o;
            clearTimeout(o);
            o = setTimeout(a, e);
            s && t.apply(i, u);
        };
    };
    e.deprecate = function(t, e) {
        function n() {
            r || (r = !0);
            return t.apply(this, arguments);
        }
        if (p.noDeprecation === !0) return t;
        var r = !1;
        return n;
    };
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(t, e, n) {
    "use strict";
    function r(t) {
        return t.replace(a, "ms-").replace(s, l);
    }
    function o(t) {
        try {
            return "true" === t || "false" !== t && ("null" === t ? null : +t + "" === t ? +t : c.test(t) ? u.parseJSON(t) : t);
        } catch (e) {}
    }
    function i(t, e, n) {
        var r;
        if (void 0 === n && 1 === t.nodeType) {
            r = "data-" + e.replace(f, "-$&").toLowerCase();
            n = t.getAttribute(r);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var u = (window.document, t("jquery")), a = /^-ms-/, s = /-([\da-z])/gi, l = function(t, e) {
        return e.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, p = function(t, e, n) {
        if (!t || 1 !== t.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var u, a, s, l;
        if (1 === arguments.length) {
            if (s = t.dataset) {
                l = {};
                for (a in s) s.hasOwnProperty(a) && (l[a] = o(s[a]));
                return l;
            }
            s = t.attributes;
            u = s.length;
            l = {};
            for (;u--; ) if (s[u]) {
                a = s[u].name;
                if (0 === a.indexOf("data-")) {
                    a = r(a.slice(5));
                    l[a] = o(i(t, a));
                }
            }
            return l;
        }
    };
    n.exports = p;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(t, e, n) {
    "use strict";
    function r(t, e, n, r) {
        r ? t[e] || (t[e] = n) : t[e] ? t[e] = t[e].add(n) : t[e] = i(n);
    }
    var o = window.document, i = t("jquery"), u = function(t, e, n) {
        var u, a, s, l, c, f = function(t) {
            if (n) for (var o in n) s[o] = i(n[o].toString(), t); else {
                s = {};
                l = i("[node-type]", t);
                for (var u, a = -1, c = l.length; ++a < c; ) {
                    u = l[a];
                    o = u.getAttribute("node-type");
                    r(s, o, u, e);
                }
            }
        }, p = function(t) {
            var n, o = s[t];
            if (!o || 0 === o.length) {
                n = i('[node-type="' + t + '"]', u);
                n.length && r(s, t, n, e);
                o = s[t];
            }
            return o;
        };
        void 0 === e && (e = !0);
        u = t;
        if ("string" == typeof t && "<" === t.charAt(0)) {
            u = o.createElement("div");
            u.innerHTML = t;
            a = o.createDocumentFragment();
            for (;c = u.firsChild; ) a.appendChild(c);
        } else {
            u = i(t);
            a = u[0];
        }
        f(u);
        return {
            get: p,
            box: a,
            list: s
        };
    };
    e.build = u, e.parse = function(t, e, n) {
        "object" == typeof t && t.length > 0 && (t = t[0]);
        if (!t || 1 !== t.nodeType) throw TypeError("parse error, not a valid html element");
        if ("boolean" == typeof n) {
            e = n;
            n = null;
        }
        return u(t, e, n).list;
    };
    e.dataset = t("./dataset");
});

define("module/top-search/1.0.0/top-search", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function r(t) {
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
        var r = i.build(e.el[0], !1);
        e.ipt = r.get("ipt");
        e.btn = r.get("btn");
        e.lbl = r.get("lbl");
        e._init();
        e._initEvent();
    }
    var o = t("jquery"), i = (t("lib/core/1.0.0/utils/util"), t("lib/core/1.0.0/dom/build"));
    r.prototype._initEvent = function() {
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
    r.prototype._init = function() {
        var t = this, e = o.trim(t.ipt.val()), n = t.ipt.attr("data-id");
        e.length > 0 && t.focus();
        n && (t.options.alias = n);
        t.options.data && (t.options.data[t.options.alias] = o.trim(t.ipt.val()));
    };
    r.prototype.focus = function() {
        var t = this;
        t.el.addClass(t.options.activeClass);
    };
    r.prototype.blur = function() {
        var t = this;
        t.el.removeClass(t.options.activeClass);
    };
    r.prototype.getValue = function() {
        var t = this;
        return o.trim(t.ipt.val());
    };
    r.prototype.search = function() {
        var t = this;
        t.options.data[t.options.alias] = t.getValue();
        window.location.href = t.options.url + "?" + t._getUrlString();
    };
    r.prototype._getUrlString = function() {
        var t = this, e = "", n = 0;
        for (var r in t.options.data) {
            e += 0 == n ? r + "=" + encodeURIComponent(t.options.data[r]) : "&" + r + "=" + encodeURIComponent(t.options.data[r]);
            n++;
        }
        return e;
    };
    n.exports = r;
});

define("lib/core/1.0.0/io/cookie", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    var r = window.document, o = function(t) {
        if ("string" != typeof t) throw "trim need a string as parameter";
        for (var e = t.length, n = 0, r = e - 1, o = /(\u3000|\s|\t|\u00A0)/; n < e && o.test(t.charAt(n)); ) ++n;
        for (;r >= 0 && o.test(t.charAt(r)); ) --r;
        return t.substring(n, r + 1);
    }, i = function(t) {
        var e = {};
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
    }, u = function(t, e, n) {
        n = n || {};
        if (void 0 !== e) {
            n = i(n);
            if (null === e) {
                e = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var u = n.expires, a = n.expires = new Date();
                a.setTime(a.getTime() + 864e5 * u);
            }
            var s = function(t) {
                try {
                    return n.raw ? t : encodeURIComponent(t);
                } catch (e) {}
                return t;
            };
            return r.cookie = [ s(t), "=", s(e), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var e = null, l = r.cookie, c = function(t) {
            return n.raw ? t : decodeURIComponent(t);
        }, f = l ? l.split("; ") : [], p = -1, d = f.length, h = t.length + 1; ++p < d; ) {
            l = o(f[p]);
            if (l.substring(0, h) === t + "=") {
                e = c(l.substring(h));
                break;
            }
        }
        return e;
    };
    u.set = function(t, e, n) {
        return u(t, e, n);
    };
    u.get = function(t) {
        return u(t);
    };
    n.exports = u;
});

define("module/login-status/1.0.0/login", [ "require", "exports", "module", "lib/core/1.0.0/io/cookie" ], function(t, e, n) {
    "use strict";
    var r = t("lib/core/1.0.0/io/cookie"), o = "_nick", i = "_ui_", u = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", a = $PAGE_DATA && $PAGE_DATA[o] || null;
    e.getNick = function() {
        return a;
    };
    e.isLogin = function() {
        return !!r(i);
    };
    e.login = function(t) {
        if (u) {
            t = t ? "?returnUrl=" + decodeURIComponent(t) : "";
            window.location.href = u + t;
        }
    };
});

define("module/login-status/1.0.0/login-status", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build", "./login" ], function(t, e, n) {
    "use strict";
    function r(t) {
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
    var o = t("jquery"), i = t("lib/core/1.0.0/dom/build"), u = t("./login");
    r.prototype._init = function() {
        var t = this;
        if (u.isLogin()) {
            var e = u.getNick();
            t.el.html(t._getLoginedHtml(e));
            t._initEvent();
        }
    };
    r.prototype._initEvent = function() {
        var t = this, e = !1, n = i.build(t.el[0], !1), r = n.get("userName"), o = n.get("tipsMenu");
        r.on("mouseenter", function() {
            e = !0;
            o.stop().fadeIn(500, function() {
                o.addClass("active");
            });
        });
        r.on("mouseleave", function() {
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
    r.prototype._getLoginedHtml = function(t) {
        var e = this, n = e.options, r = n.menuList, o = "";
        o += '<ul class="logined clearfix" node-type="logined">';
        o += '    <li class="item">';
        o += "        <span>您好，</span>";
        o += "    </li>";
        o += '    <li class="item tips-menu-box">';
        o += '        <a href="' + n.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + t + "</a>";
        o += '        <div class="tips-menu" node-type="tipsMenu">';
        o += '            <div class="arrow"><i></i><b></b></div>';
        o += '            <ul class="tips-menu-list">';
        for (var i = 0, u = r.length; i < u; i++) o += '            <li class="tips-menu-item"><a href="' + r[i].url + '">' + r[i].title + "</a></li>";
        o += "            </ul>";
        o += "        </div>";
        o += "    </li>";
        o += '    <li class="item">';
        o += '        <a href="' + n.loginOutUrl + '" class="btn">退出</a>';
        o += "    </li>";
        o += "</ul>";
        return o;
    };
    n.exports = r;
});

!function(t, e, n) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], n) : t[e] = n(t.jQuery || t.Zepto);
}(this, "Lazyload", function(t, e) {
    "use strict";
    if (!t) throw "Error: jquery api not implements.";
    var n = t.each, r = function(t, e) {
        if (t instanceof Array && t.filter) return t.filter(e);
        for (var n = [], r = -1, o = t.length; ++r < o; ) e(t[r], r) && n.push(t[r]);
        return n;
    }, o = function(t, e, n, r) {
        var o;
        return function() {
            var i = r || this, u = arguments, a = function() {
                o = null;
                n || t.apply(i, u);
            }, s = n && !o;
            clearTimeout(o);
            o = setTimeout(a, e);
            s && t.apply(i, u);
        };
    }, i = function(e, n) {
        e = e || {};
        var r = t(e), o = Array.prototype.slice;
        n = n || e.name;
        t.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(t, i) {
            e[t] = function(e) {
                var u = o.call(arguments, 0), a = u[1];
                n && !~e.indexOf(".") && (u[0] = e + "." + n);
                "function" == typeof a && ("on" === t || "once" === t ? u[1] = a.__ || (a.__ = function(t) {
                    t.preventDefault();
                    return a.apply(this, o.call(arguments, 1));
                }) : "un" === t && (u[1] = a.__));
                return r[i].apply(r, u);
            };
        });
        return e;
    }, u = window, a = t(u), s = u.Image, l = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, p = 1, d = 2, h = function(t) {
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
    v.define("image", function(n, r, o, i) {
        if (r) {
            var u = new s(), a = function() {
                u.onload = u.onerror = null;
                u = r = n = i = a = e;
            };
            u.onload = function() {
                var e = t(n), u = o.effect;
                "function" != typeof e[u] && (u = "show");
                e.hide();
                "IMG" === n.nodeName.toUpperCase() ? e.attr("src", r) : e.css("background-image", 'url("' + r + '")');
                e[u](o.effectSpeed);
                i(null, "load");
                a();
            };
            u.onerror = function(t) {
                i(t);
                a();
            };
            u.src = r;
        } else i("error");
    });
    v.define("html", function(t, e, n, r) {
        r();
    });
    var m = function(e, s) {
        s = s || {};
        e = t(e);
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
        i(m);
        var w = s.type || _.type, E = v.get(w);
        if ("function" != typeof E) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (_.placeholder = "");
        s && t.extend(_, s);
        var x = _.container, C = _.event, T = 0 === C.indexOf("scroll"), j = x && x !== u ? t(x) : a, U = function(e) {
            var r = m._list;
            if (r.length > 0) {
                var o = 0;
                n(r.slice(0), function(e, n) {
                    var r = t(n);
                    if (!_.skipInvisible || r.is(":visible")) if (A(n, _) || b(n, _)) ; else if (g(n, _) || y(n, _)) {
                        if (++o > _.failureLimit) return !1;
                    } else {
                        r.trigger("appear");
                        o = 0;
                    }
                });
            } else m.reset();
        }, q = function() {
            m._list = r(m._list, function(t) {
                return !t[c];
            });
        }, D = function() {
            var e = this, n = t(e), r = n.attr("data-" + _.dataAttribute), o = _.sourceMaker, i = _.appear, u = _.loadingClass, a = e[c];
            if (a === f) {
                e[c] = p;
                u && n.addClass(u);
                o && (r = o(r, e));
                i && i.apply(m, [ e, r ]);
                E.call(m, e, r, _, function(t, o) {
                    if (!m._destroyed) {
                        u && n.removeClass(u);
                        if (t) setTimeout(function() {
                            e[c] = f;
                            m.emit("lazyItemError", e, r, t);
                            e = null;
                        }, 300); else {
                            e[c] = d;
                            q();
                            m.emit("lazyItemReady", e, r, o);
                            var i = _.load;
                            i && i.apply(m, [ e, r, o ]);
                            e = null;
                        }
                        n = null;
                    }
                });
            } else if (a === d) {
                q();
                m.emit("lazyItemReady", e, r);
            }
        }, I = function() {
            this[c] || t(this).trigger("appear");
        }, P = function(e) {
            var n = t(e);
            e[c] = f;
            var r = _.placeholder;
            if (r) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", r);
            } else "image" === m._.type || n.children()[0] || n.html(r);
            n.on("appear", D);
            T || n.on(C, I);
            m._list.push(e);
        }, k = function(t) {
            t = r(t || [], h);
            if (t.length) {
                n(t, function(t, e) {
                    P(e);
                });
                m._inited || L(m);
            }
        }, L = function(e) {
            if (!e._inited) {
                var r = o(U, 30);
                e._inited = !0;
                T && j.on(C, r);
                a.on("resize", r);
                if (l) {
                    var i = function(r) {
                        r.originalEvent && r.originalEvent.persisted && n(e._list, function(e, n) {
                            t(n).trigger("appear");
                        });
                    };
                    a.on("pageshow", i);
                    e.once("reset", function() {
                        a.off("pageshow", i);
                    });
                }
                e.once("reset", function() {
                    n(e._list, function(t, e) {
                        O(e);
                    });
                    T && j.off(C, r);
                    a.off("resize", r);
                });
                t(document).ready(U);
            }
        }, O = function(e) {
            var n = t(e);
            n.off("appear", D);
            T || n.off(C, I);
        };
        m.on("lazyItemReady", function(t) {
            O(t);
        });
        m.once("destroy", function() {
            k = null;
            U = null;
            q = null;
            D = null;
            I = null;
        });
        m._ = _;
        m._list = [];
        m.add = function(e) {
            var n = t(e);
            n.length > 0 && k(n);
        };
        m.update = U;
        k(e);
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
    var g = function(e, n) {
        var r, o = n.container;
        r = o && o !== u ? t(o).offset().top + t(o).height() : (u.innerHeight ? u.innerHeight : a.height()) + a.scrollTop();
        return r <= t(e).offset().top - n.threshold;
    }, y = function(e, n) {
        var r, o = n.container;
        r = o && o !== u ? t(o).offset().left + t(o).width() : a.width() + a.scrollLeft();
        return r <= t(e).offset().left - n.threshold;
    }, A = function(e, n) {
        var r, o = n.container;
        r = o && o !== u ? t(o).offset().top : a.scrollTop();
        return r >= t(e).offset().top + n.threshold + t(e).height();
    }, b = function(e, n) {
        var r, o = n.container;
        r = o && o !== u ? t(o).offset().left : a.scrollLeft();
        return r >= t(e).offset().left + n.threshold + t(e).width();
    }, _ = function(t, e) {
        return !(y(t, e) || b(t, e) || g(t, e) || A(t, e));
    };
    m.belowthefold = g;
    m.rightoffold = y;
    m.abovethetop = A;
    m.leftofbegin = b;
    m.inviewport = _;
    return m;
});

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function r(t) {
        var e = this, n = {
            selector: "#jFooter"
        };
        e.options = o.extend(!0, {}, n, t);
        e.el = o(e.options.selector);
        if (0 == e.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        e._init();
    }
    var o = t("jquery"), i = t("lib/plugins/lazyload/1.9.3/lazyload"), u = t("lib/core/1.0.0/dom/build");
    r.prototype._init = function() {
        var t = this, e = u.build(t.el[0], !1), n = e.get("footerImg");
        new i(n);
    };
    n.exports = r;
});

define("conf/404", [ "require", "exports", "module", "jquery", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/footer/1.0.0/footer" ], function(t, e, n) {
    "use strict";
    var r = (t("jquery"), t("module/top-search/1.0.0/top-search")), o = t("module/login-status/1.0.0/login-status"), i = t("module/footer/1.0.0/footer");
    new r(), new o(), new i();
});