/*! Based on work by Simon Willison: http://gist.github.com/292562 */

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return "object" == typeof e && null !== e;
    }
    function o() {}
    function r(e, t) {
        for (var n = e.length, i = -1; ++i < n; ) t(e[i], i);
    }
    function u(e, t) {
        for (var n in e) d.call(e, n) && t(e[n], n, e);
    }
    function a(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? r(e, t) : u(e, t);
    }
    function s(e, t) {
        for (var n = -1, i = e.length, o = Array(i); ++n < i; ) o[n] = t(e[n], n, e);
        return o;
    }
    function l(e, t) {
        var n = [];
        a(e, function(e, i, o) {
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
    t.each = a;
    t.map = function(e, t) {
        var n = h(e) ? s : l;
        return n(e, t);
    };
    t.filter = function(e, t) {
        var n, i, o = h(e) ? (n = r, i = function(e, t) {
            o.push(t);
        }, []) : (n = u, i = function(e, t) {
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
            var r = i || this, u = arguments, a = function() {
                o = null;
                n || e.apply(r, u);
            }, s = n && !o;
            clearTimeout(o);
            o = setTimeout(a, t);
            s && e.apply(r, u);
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
        return e.replace(a, "ms-").replace(s, l);
    }
    function o(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : c.test(e) ? u.parseJSON(e) : e);
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
    var u = (window.document, e("jquery")), a = /^-ms-/, s = /-([\da-z])/gi, l = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, p = function(e, t, n) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var u, a, s, l;
        if (1 === arguments.length) {
            if (s = e.dataset) {
                l = {};
                for (a in s) s.hasOwnProperty(a) && (l[a] = o(s[a]));
                return l;
            }
            s = e.attributes;
            u = s.length;
            l = {};
            for (;u--; ) if (s[u]) {
                a = s[u].name;
                if (0 === a.indexOf("data-")) {
                    a = i(a.slice(5));
                    l[a] = o(r(e, a));
                }
            }
            return l;
        }
    };
    n.exports = p;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, n) {
    "use strict";
    function i(e, t, n, i) {
        i ? e[t] || (e[t] = n) : e[t] ? e[t] = e[t].add(n) : e[t] = r(n);
    }
    var o = window.document, r = e("jquery"), u = function(e, t, n) {
        var u, a, s, l, c, f = function(e) {
            if (n) for (var o in n) s[o] = r(n[o].toString(), e); else {
                s = {};
                l = r("[node-type]", e);
                for (var u, a = -1, c = l.length; ++a < c; ) {
                    u = l[a];
                    o = u.getAttribute("node-type");
                    i(s, o, u, t);
                }
            }
        }, p = function(e) {
            var n, o = s[e];
            if (!o || 0 === o.length) {
                n = r('[node-type="' + e + '"]', u);
                n.length && i(s, e, n, t);
                o = s[e];
            }
            return o;
        };
        void 0 === t && (t = !0);
        u = e;
        if ("string" == typeof e && "<" === e.charAt(0)) {
            u = o.createElement("div");
            u.innerHTML = e;
            a = o.createDocumentFragment();
            for (;c = u.firsChild; ) a.appendChild(c);
        } else {
            u = r(e);
            a = u[0];
        }
        f(u);
        return {
            get: p,
            box: a,
            list: s
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
            var s = function(e) {
                try {
                    return n.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return i.cookie = [ s(e), "=", s(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, l = i.cookie, c = function(e) {
            return n.raw ? e : decodeURIComponent(e);
        }, f = l ? l.split("; ") : [], p = -1, d = f.length, h = e.length + 1; ++p < d; ) {
            l = o(f[p]);
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
    var i = e("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", u = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", a = $PAGE_DATA && $PAGE_DATA[o] || null;
    t.getNick = function() {
        return a;
    };
    t.isLogin = function() {
        return !!i(r);
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
    var o = e("jquery"), r = e("lib/core/1.0.0/dom/build"), u = e("./login");
    i.prototype._init = function() {
        var e = this;
        if (u.isLogin()) {
            var t = u.getNick();
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
        for (var r = 0, u = i.length; r < u; r++) o += '            <li class="tips-menu-item"><a href="' + i[r].url + '">' + i[r].title + "</a></li>";
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
            var r = i || this, u = arguments, a = function() {
                o = null;
                n || e.apply(r, u);
            }, s = n && !o;
            clearTimeout(o);
            o = setTimeout(a, t);
            s && e.apply(r, u);
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
                var u = o.call(arguments, 0), a = u[1];
                n && !~t.indexOf(".") && (u[0] = t + "." + n);
                "function" == typeof a && ("on" === e || "once" === e ? u[1] = a.__ || (a.__ = function(e) {
                    e.preventDefault();
                    return a.apply(this, o.call(arguments, 1));
                }) : "un" === e && (u[1] = a.__));
                return i[r].apply(i, u);
            };
        });
        return t;
    }, u = window, a = e(u), s = u.Image, l = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, p = 1, d = 2, h = function(e) {
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
            var u = new s(), a = function() {
                u.onload = u.onerror = null;
                u = i = n = r = a = t;
            };
            u.onload = function() {
                var t = e(n), u = o.effect;
                "function" != typeof t[u] && (u = "show");
                t.hide();
                "IMG" === n.nodeName.toUpperCase() ? t.attr("src", i) : t.css("background-image", 'url("' + i + '")');
                t[u](o.effectSpeed);
                r(null, "load");
                a();
            };
            u.onerror = function(e) {
                r(e);
                a();
            };
            u.src = i;
        } else r("error");
    });
    v.define("html", function(e, t, n, i) {
        i();
    });
    var m = function(t, s) {
        s = s || {};
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
        var w = s.type || _.type, x = v.get(w);
        if ("function" != typeof x) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (_.placeholder = "");
        s && e.extend(_, s);
        var E = _.container, C = _.event, T = 0 === C.indexOf("scroll"), j = E && E !== u ? e(E) : a, U = function(t) {
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
        }, D = function() {
            var t = this, n = e(t), i = n.attr("data-" + _.dataAttribute), o = _.sourceMaker, r = _.appear, u = _.loadingClass, a = t[c];
            if (a === f) {
                t[c] = p;
                u && n.addClass(u);
                o && (i = o(i, t));
                r && r.apply(m, [ t, i ]);
                x.call(m, t, i, _, function(e, o) {
                    if (!m._destroyed) {
                        u && n.removeClass(u);
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
            } else if (a === d) {
                q();
                m.emit("lazyItemReady", t, i);
            }
        }, I = function() {
            this[c] || e(this).trigger("appear");
        }, P = function(t) {
            var n = e(t);
            t[c] = f;
            var i = _.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === m._.type || n.children()[0] || n.html(i);
            n.on("appear", D);
            T || n.on(C, I);
            m._list.push(t);
        }, k = function(e) {
            e = i(e || [], h);
            if (e.length) {
                n(e, function(e, t) {
                    P(t);
                });
                m._inited || z(m);
            }
        }, z = function(t) {
            if (!t._inited) {
                var i = o(U, 30);
                t._inited = !0;
                T && j.on(C, i);
                a.on("resize", i);
                if (l) {
                    var r = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(t._list, function(t, n) {
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
                        L(t);
                    });
                    T && j.off(C, i);
                    a.off("resize", i);
                });
                e(document).ready(U);
            }
        }, L = function(t) {
            var n = e(t);
            n.off("appear", D);
            T || n.off(C, I);
        };
        m.on("lazyItemReady", function(e) {
            L(e);
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
        m.add = function(t) {
            var n = e(t);
            n.length > 0 && k(n);
        };
        m.update = U;
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
        var i, o = n.container;
        i = o && o !== u ? e(o).offset().top + e(o).height() : (u.innerHeight ? u.innerHeight : a.height()) + a.scrollTop();
        return i <= e(t).offset().top - n.threshold;
    }, y = function(t, n) {
        var i, o = n.container;
        i = o && o !== u ? e(o).offset().left + e(o).width() : a.width() + a.scrollLeft();
        return i <= e(t).offset().left - n.threshold;
    }, A = function(t, n) {
        var i, o = n.container;
        i = o && o !== u ? e(o).offset().top : a.scrollTop();
        return i >= e(t).offset().top + n.threshold + e(t).height();
    }, b = function(t, n) {
        var i, o = n.container;
        i = o && o !== u ? e(o).offset().left : a.scrollLeft();
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
    var o = e("jquery"), r = e("lib/plugins/lazyload/1.9.3/lazyload"), u = e("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var e = this, t = u.build(e.el[0], !1), n = t.get("footerImg");
        new r(n);
    };
    n.exports = i;
});

define("conf/course/list", [ "require", "exports", "module", "jquery", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer" ], function(e, t, n) {
    "use strict";
    var i = (e("jquery"), e("module/top-search/1.0.0/top-search")), o = e("module/login-status/1.0.0/login-status"), r = e("module/fix-bar/1.0.0/fix-bar"), u = e("module/footer/1.0.0/footer");
    new i(), new o(), new r(), new u();
});