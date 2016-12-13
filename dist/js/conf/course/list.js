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
    function s(t, e) {
        for (var n in t) p.call(t, n) && e(t[n], n, t);
    }
    function u(t, e) {
        if (t && t.forEach) return t.forEach(e);
        h(t) ? r(t, e) : s(t, e);
    }
    function a(t, e) {
        for (var n = -1, i = t.length, o = Array(i); ++n < i; ) o[n] = e(t[n], n, t);
        return o;
    }
    function c(t, e) {
        var n = [];
        u(t, function(t, i, o) {
            n.push(e(t, i, o));
        });
        return n;
    }
    function l(t, e) {
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
        s(t, function(t, n) {
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
        for (var n = [].slice.call(arguments, 1), i = n.length, o = -1; ++o < i; ) l(t, n[o]);
        return t;
    };
    e.inherits = function(t, e, n) {
        y(t, e);
        n && l(t.prototype, n);
    };
    e.impls = function(t, n) {
        n = "function" == typeof n ? n.prototype : n;
        e.mix(t.prototype, n);
        return t;
    };
    e.parseQuery = f;
    e.parseParams = f;
    e.each = u;
    e.map = function(t, e) {
        var n = h(t) ? a : c;
        return n(t, e);
    };
    e.filter = function(t, e) {
        var n, i, o = h(t) ? (n = r, i = function(t, e) {
            o.push(e);
        }, []) : (n = s, i = function(t, e) {
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
            var r = i || this, s = arguments, u = function() {
                o = null;
                n || t.apply(r, s);
            }, a = n && !o;
            clearTimeout(o);
            o = setTimeout(u, e);
            a && t.apply(r, s);
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

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return t.replace(u, "ms-").replace(a, c);
    }
    function o(t) {
        try {
            return "true" === t || "false" !== t && ("null" === t ? null : +t + "" === t ? +t : l.test(t) ? s.parseJSON(t) : t);
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
    var s = (window.document, t("jquery")), u = /^-ms-/, a = /-([\da-z])/gi, c = function(t, e) {
        return e.toUpperCase();
    }, l = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, d = function(t, e, n) {
        if (!t || 1 !== t.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var s, u, a, c;
        if (1 === arguments.length) {
            if (a = t.dataset) {
                c = {};
                for (u in a) a.hasOwnProperty(u) && (c[u] = o(a[u]));
                return c;
            }
            a = t.attributes;
            s = a.length;
            c = {};
            for (;s--; ) if (a[s]) {
                u = a[s].name;
                if (0 === u.indexOf("data-")) {
                    u = i(u.slice(5));
                    c[u] = o(r(t, u));
                }
            }
            return c;
        }
    };
    n.exports = d;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(t, e, n) {
    "use strict";
    function i(t, e, n, i) {
        i ? t[e] || (t[e] = n) : t[e] ? t[e] = t[e].add(n) : t[e] = r(n);
    }
    var o = window.document, r = t("jquery"), s = function(t, e, n) {
        var s, u, a, c, l, f = function(t) {
            if (n) for (var o in n) a[o] = r(n[o].toString(), t); else {
                a = {};
                c = r("[node-type]", t);
                for (var s, u = -1, l = c.length; ++u < l; ) {
                    s = c[u];
                    o = s.getAttribute("node-type");
                    i(a, o, s, e);
                }
            }
        }, d = function(t) {
            var n, o = a[t];
            if (!o || 0 === o.length) {
                n = r('[node-type="' + t + '"]', s);
                n.length && i(a, t, n, e);
                o = a[t];
            }
            return o;
        };
        void 0 === e && (e = !0);
        s = t;
        if ("string" == typeof t && "<" === t.charAt(0)) {
            s = o.createElement("div");
            s.innerHTML = t;
            u = o.createDocumentFragment();
            for (;l = s.firsChild; ) u.appendChild(l);
        } else {
            s = r(t);
            u = s[0];
        }
        f(s);
        return {
            get: d,
            box: u,
            list: a
        };
    };
    e.build = s, e.parse = function(t, e, n) {
        "object" == typeof t && t.length > 0 && (t = t[0]);
        if (!t || 1 !== t.nodeType) throw TypeError("parse error, not a valid html element");
        if ("boolean" == typeof n) {
            e = n;
            n = null;
        }
        return s(t, e, n).list;
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
    }, s = function(t, e, n) {
        n = n || {};
        if (void 0 !== e) {
            n = r(n);
            if (null === e) {
                e = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var s = n.expires, u = n.expires = new Date();
                u.setTime(u.getTime() + 864e5 * s);
            }
            var a = function(t) {
                try {
                    return n.raw ? t : encodeURIComponent(t);
                } catch (e) {}
                return t;
            };
            return i.cookie = [ a(t), "=", a(e), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var e = null, c = i.cookie, l = function(t) {
            return n.raw ? t : decodeURIComponent(t);
        }, f = c ? c.split("; ") : [], d = -1, p = f.length, h = t.length + 1; ++d < p; ) {
            c = o(f[d]);
            if (c.substring(0, h) === t + "=") {
                e = l(c.substring(h));
                break;
            }
        }
        return e;
    };
    s.set = function(t, e, n) {
        return s(t, e, n);
    };
    s.get = function(t) {
        return s(t);
    };
    n.exports = s;
});

define("module/login-status/1.0.0/login", [ "require", "exports", "module", "lib/core/1.0.0/io/cookie" ], function(t, e, n) {
    "use strict";
    var i = t("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", s = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", u = $PAGE_DATA && $PAGE_DATA[o] || null;
    e.getNick = function() {
        return u;
    };
    e.isLogin = function() {
        return !!i(r);
    };
    e.login = function(t) {
        if (s) {
            t = t ? "?returnUrl=" + decodeURIComponent(t) : "";
            window.location.href = s + t;
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
    var o = t("jquery"), r = t("lib/core/1.0.0/dom/build"), s = t("./login");
    i.prototype._init = function() {
        var t = this;
        if (s.isLogin()) {
            var e = s.getNick();
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
        for (var r = 0, s = i.length; r < s; r++) o += '            <li class="tips-menu-item"><a href="' + i[r].url + '">' + i[r].title + "</a></li>";
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
            var r = i || this, s = arguments, u = function() {
                o = null;
                n || t.apply(r, s);
            }, a = n && !o;
            clearTimeout(o);
            o = setTimeout(u, e);
            a && t.apply(r, s);
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
                var s = o.call(arguments, 0), u = s[1];
                n && !~e.indexOf(".") && (s[0] = e + "." + n);
                "function" == typeof u && ("on" === t || "once" === t ? s[1] = u.__ || (u.__ = function(t) {
                    t.preventDefault();
                    return u.apply(this, o.call(arguments, 1));
                }) : "un" === t && (s[1] = u.__));
                return i[r].apply(i, s);
            };
        });
        return e;
    }, s = window, u = t(s), a = s.Image, c = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), l = "__lazy_status__", f = 0, d = 1, p = 2, h = function(t) {
        return t[l] === e;
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
            var s = new a(), u = function() {
                s.onload = s.onerror = null;
                s = i = n = r = u = e;
            };
            s.onload = function() {
                var e = t(n), s = o.effect;
                "function" != typeof e[s] && (s = "show");
                e.hide();
                "IMG" === n.nodeName.toUpperCase() ? e.attr("src", i) : e.css("background-image", 'url("' + i + '")');
                e[s](o.effectSpeed);
                r(null, "load");
                u();
            };
            s.onerror = function(t) {
                r(t);
                u();
            };
            s.src = i;
        } else r("error");
    });
    v.define("html", function(t, e, n, i) {
        i();
    });
    var m = function(e, a) {
        a = a || {};
        e = t(e);
        var m = this, w = {
            type: "image",
            threshold: 50,
            failureLimit: 0,
            event: "scroll",
            effect: "show",
            container: s,
            dataAttribute: "src",
            sourceMaker: null,
            skipInvisible: !0,
            appear: null,
            load: null,
            loadingClass: "",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        r(m);
        var _ = a.type || w.type, A = v.get(_);
        if ("function" != typeof A) throw "Error, cannot found the specific type loader (type: `" + _ + "`)";
        "html" === _ && (w.placeholder = "");
        a && t.extend(w, a);
        var C = w.container, T = w.event, k = 0 === T.indexOf("scroll"), j = C && C !== s ? t(C) : u, E = function(e) {
            var i = m._list;
            if (i.length > 0) {
                var o = 0;
                n(i.slice(0), function(e, n) {
                    var i = t(n);
                    if (!w.skipInvisible || i.is(":visible")) if (b(n, w) || x(n, w)) ; else if (y(n, w) || g(n, w)) {
                        if (++o > w.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        o = 0;
                    }
                });
            } else m.reset();
        }, z = function() {
            m._list = i(m._list, function(t) {
                return !t[l];
            });
        }, q = function() {
            var e = this, n = t(e), i = n.attr("data-" + w.dataAttribute), o = w.sourceMaker, r = w.appear, s = w.loadingClass, u = e[l];
            if (u === f) {
                e[l] = d;
                s && n.addClass(s);
                o && (i = o(i, e));
                r && r.apply(m, [ e, i ]);
                A.call(m, e, i, w, function(t, o) {
                    if (!m._destroyed) {
                        s && n.removeClass(s);
                        if (t) setTimeout(function() {
                            e[l] = f;
                            m.emit("lazyItemError", e, i, t);
                            e = null;
                        }, 300); else {
                            e[l] = p;
                            z();
                            m.emit("lazyItemReady", e, i, o);
                            var r = w.load;
                            r && r.apply(m, [ e, i, o ]);
                            e = null;
                        }
                        n = null;
                    }
                });
            } else if (u === p) {
                z();
                m.emit("lazyItemReady", e, i);
            }
        }, I = function() {
            this[l] || t(this).trigger("appear");
        }, L = function(e) {
            var n = t(e);
            e[l] = f;
            var i = w.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === m._.type || n.children()[0] || n.html(i);
            n.on("appear", q);
            k || n.on(T, I);
            m._list.push(e);
        }, N = function(t) {
            t = i(t || [], h);
            if (t.length) {
                n(t, function(t, e) {
                    L(e);
                });
                m._inited || $(m);
            }
        }, $ = function(e) {
            if (!e._inited) {
                var i = o(E, 30);
                e._inited = !0;
                k && j.on(T, i);
                u.on("resize", i);
                if (c) {
                    var r = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(e._list, function(e, n) {
                            t(n).trigger("appear");
                        });
                    };
                    u.on("pageshow", r);
                    e.once("reset", function() {
                        u.off("pageshow", r);
                    });
                }
                e.once("reset", function() {
                    n(e._list, function(t, e) {
                        D(e);
                    });
                    k && j.off(T, i);
                    u.off("resize", i);
                });
                t(document).ready(E);
            }
        }, D = function(e) {
            var n = t(e);
            n.off("appear", q);
            k || n.off(T, I);
        };
        m.on("lazyItemReady", function(t) {
            D(t);
        });
        m.once("destroy", function() {
            N = null;
            E = null;
            z = null;
            q = null;
            I = null;
        });
        m._ = w;
        m._list = [];
        m.add = function(e) {
            var n = t(e);
            n.length > 0 && N(n);
        };
        m.update = E;
        N(e);
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
        i = o && o !== s ? t(o).offset().top + t(o).height() : (s.innerHeight ? s.innerHeight : u.height()) + u.scrollTop();
        return i <= t(e).offset().top - n.threshold;
    }, g = function(e, n) {
        var i, o = n.container;
        i = o && o !== s ? t(o).offset().left + t(o).width() : u.width() + u.scrollLeft();
        return i <= t(e).offset().left - n.threshold;
    }, b = function(e, n) {
        var i, o = n.container;
        i = o && o !== s ? t(o).offset().top : u.scrollTop();
        return i >= t(e).offset().top + n.threshold + t(e).height();
    }, x = function(e, n) {
        var i, o = n.container;
        i = o && o !== s ? t(o).offset().left : u.scrollLeft();
        return i >= t(e).offset().left + n.threshold + t(e).width();
    }, w = function(t, e) {
        return !(g(t, e) || x(t, e) || y(t, e) || b(t, e));
    };
    m.belowthefold = y;
    m.rightoffold = g;
    m.abovethetop = b;
    m.leftofbegin = x;
    m.inviewport = w;
    return m;
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
    var o = t("jquery"), r = t("lib/plugins/lazyload/1.9.3/lazyload"), s = t("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var t = this, e = s.build(t.el[0], !1), n = e.get("footerImg");
        new r(n);
    };
    n.exports = i;
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
        if (e) for (var r, s, u, a = -1, c = {
            type: t,
            timeStamp: l()
        }; r = e[++a]; ) {
            s = r[v];
            u = r[m] || i;
            try {
                o = r[y] === h ? s.call(u, c, n) !== !1 && o : s.apply(u, n) !== !1 && o;
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
    function s(t) {
        return "[object Function]" === Object.prototype.toString.call(t);
    }
    function u(t, e) {
        for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
    }
    function a(t, e) {
        t.forEach ? t.forEach(e) : function(t) {
            for (var n = -1, i = t.length; ++n < i; ) e(t[n], n);
        }(t);
    }
    var c = /\s+/, l = Date.now || function() {
        return +new Date();
    }, f = function() {
        return l() * Math.random() & 65535;
    }(), d = function() {
        var t, e, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (t = new WeakMap(), 
        function(e, n) {
            var i = t.get(e);
            return null === n ? void 0 !== i && t["delete"](e) : !i && n ? (t.set(e, i = {}), 
            i) : i;
        }) : (e = l(), n = "__$widΦ" + e.toString(36), t = {}, function(i, o) {
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
        var o, r, s, u = p;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
            u = h;
        }
        if (!e) return this;
        o = d(this, 1);
        t = t.split(c);
        for (;r = t.shift(); ) {
            s = !i && o[r] || (o[r] = []);
            s.push(g(e, n, u));
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
        var i, o, r, s, a, l;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
        }
        if (!(i = d(this))) return this;
        if (!(t || e || n)) {
            u(i, function(t, e) {
                delete i[e];
            });
            d(this, null);
            return this;
        }
        t = t ? t.split(c) : x(i);
        for (;o = t.shift(); ) {
            r = i[o];
            if (r) if (e || n) for (s = r.length; --s >= 0; ) {
                a = r[s];
                l = a[v];
                e && l !== e && (void 0 === l.guid || l.guid !== e.guid) || n && a[m] !== n || r.splice(s, 1);
            } else delete i[o];
        }
        return this;
    };
    b.un = b.removeListener;
    b.removeAllListeners = function(t) {
        return this.removeListener(t);
    };
    b.emit = function(t) {
        var e, n, i, r, s, u, a = [], l = !0;
        if (!(e = d(this))) return this;
        t = t.split(c);
        for (s = 1, u = arguments.length; s < u; s++) a[s - 1] = arguments[s];
        for (;n = t.shift(); ) {
            (i = e.all) && (i = i.slice());
            (r = e[n]) && (r = r.slice());
            "all" !== n && (l = o(n, r, a, this) && l);
            l = o(n, i, [ n ].concat(a), this) && l;
        }
        return l;
    };
    i.applyTo = function(t) {
        function e(e, i) {
            t[e] = function() {
                var o = n[e].apply(i || t, Array.prototype.slice.call(arguments));
                return o === i ? this : o;
            };
        }
        var n = b, i = x(n);
        s(t) ? a(i, function(e) {
            t.prototype[e] = n[e];
        }) : a(i, function(t) {
            e(t);
        });
    };
    i.listenerCount = function(t, e) {
        return "function" == typeof t.listenerCount ? t.listenerCount(e) : r.call(t, e);
    };
    b.listenerCount = r;
    var x = Object.keys || function(t) {
        var e = [];
        u(t, function(t, n) {
            e.push(n);
        });
        return e;
    };
    n.exports = i;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../utils/util"), r = t("../event/emitter"), s = o.setImmediate, u = o.noop, a = o.extend, c = i.trim, l = i.parseJSON, f = function(t, e, n) {
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
            s(function() {
                --e;
                r();
            });
        }, r = function() {
            if (n.length > 0 && e < t) {
                var r = n.shift(), s = r[0], u = r[1];
                ++e;
                s.always(o);
                i.ajax(u);
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
        t = a(e, t);
        delete t.error;
        delete t.success;
        this._opts = t;
    };
    a(h.prototype, {
        send: function() {
            var t = this, e = this._opts, n = a({}, e), i = "jsonp" === n.dataType;
            i && (n.crossDomain = !0);
            n.complete = function(n, o) {
                var r, s = +n.status, u = n.responseJSON, a = {
                    error: "1",
                    msg: "Request error (status: " + (o || s) + ")"
                }, f = 200 === s || "success" === o;
                if (!i && !u) {
                    u = c(n.responseText);
                    if (u && "<" !== u.charAt(0)) try {
                        u = l(u);
                    } catch (d) {}
                }
                f || (u = u || a);
                r = {
                    data: u,
                    xhr: n,
                    origin: e,
                    status: s || o
                };
                f ? t.emit("response", null, r) : t.emit("error", u, r);
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
            s(function() {
                console.log("%c " + i, "color:#ae0000");
            }, 1);
        }, a = f(e.error || u, null, r), c = f(e.success || u, null, r);
        if (d("request", o, n) !== !1) {
            if (n && (n = i(n))) {
                var l, p, v = "data-async-lock";
                if (1 === +n.attr(v)) return;
                if (p = n.attr("data-async-text")) {
                    l = n.html();
                    n.html(p);
                }
                n.attr(v, 1);
                o.once("response error", function() {
                    if (n) {
                        n.attr(v, 0);
                        p && n.html(l);
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
                d("error", n, e) !== !1 && a(t);
            });
            o.on("response", function(t, e) {
                e = e.data;
                d("response", e) !== !1 && (t ? a(t) : e && 0 === +(e.error || 0) ? c(e) : a(e));
            });
            return o.send();
        }
    };
    i.each([ "get", "post", "jsonp" ], function(t, n) {
        e[n] = function(t, i, o, r, s) {
            if ("function" == typeof i) {
                s = s || r;
                r = o;
                o = i;
                i = void 0;
            }
            if (r && "function" != typeof r) {
                s = r;
                r = void 0;
            }
            var u = {
                data: i,
                success: o,
                error: r || o
            };
            "string" == typeof t ? u.url = t : a(u, t);
            var c = n;
            if ("jsonp" === n) {
                c = "get";
                u.dataType = "jsonp";
            }
            u.type = c;
            return e.ajax(u, s);
        };
    });
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(t) {
    "use strict";
    var e = t("jquery"), n = e(window), i = e(document), o = "createTouch" in document, r = document.documentElement, s = !("minWidth" in r.style), u = !s && "onlosecapture" in r, a = "setCapture" in r, c = e.noop, l = {
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
        this.onstart = this.onover = this.onend = c;
    };
    d.types = l;
    d.prototype = {
        start: function(t) {
            t = this.startFix(t);
            i.on(l.over, this.over).on(l.end, this.end);
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
            i.off(l.over, this.over).off(l.end, this.end);
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
            u ? this.target.on("losecapture", this.end) : n.on("blur", this.end);
            a && this.target[0].setCapture();
            return t;
        },
        overFix: function(t) {
            t = f(t);
            return t;
        },
        endFix: function(t) {
            t = f(t);
            i.off("selectstart", this.selectstart).off("dblclick", this.end);
            u ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            a && this.target[0].releaseCapture();
            return t;
        }
    };
    d.create = function(t, o, r) {
        r = e.extend({
            hook: null,
            onstart: c,
            onover: c,
            onend: c
        }, r);
        var s, u, a, l, f = e(t), p = r.hook ? e(r.hook) : f, h = new d(), v = d.types.start, m = t.className.replace(/^\s|\s.*/g, "") + "-drag-start", y = {
            off: function() {
                p.off(v, h.start);
            }
        };
        h.onstart = function(e) {
            var o = "fixed" === f.css("position"), c = i.scrollLeft(), d = i.scrollTop(), p = f.width(), h = f.height();
            s = 0;
            u = 0;
            a = o ? n.width() - p + s : i.width() - p;
            l = o ? n.height() - h + u : i.height() - h;
            var v = f.offset(), y = this.startLeft = o ? v.left - c : v.left, g = this.startTop = o ? v.top - d : v.top;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            f.addClass(m);
            r.onstart.call(t, e, y, g);
        };
        h.onover = function(e) {
            var n = e.clientX - this.clientX + this.startLeft, i = e.clientY - this.clientY + this.startTop, o = f[0].style;
            n = Math.max(s, Math.min(a, n));
            i = Math.max(u, Math.min(l, i));
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

define("lib/core/1.0.0/dom/delegator", [ "require", "exports", "module", "jquery", "../event/emitter" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n, i, r, s = e.currentTarget, u = o(s), a = (e.handleObj || 0).origType || e.type;
        if (!e.isPropagationStopped()) {
            if (!u.attr("disabled") && (n = u.attr("action-type"))) {
                i = u.attr("action-data");
                e.action = n;
                e.data = i;
                r = t.e.emit(a + c + n, e, s);
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
    var o = t("jquery"), r = t("../event/emitter"), s = /\S+/g, u = -1, a = (+new Date()).toString(36), c = "/", l = function() {
        return a + ++u;
    }, f = function(t, e) {
        var n = t.guid || (t.guid = l()), i = function(n, i) {
            return t.call(e || i, n);
        };
        i.guid = n;
        return i;
    }, d = function() {}, p = function(t, e) {
        return "function" == typeof t ? t : e;
    }, h = function(t, e) {
        e = e || {};
        "string" == typeof t && (t = o(t)[0]);
        var n = {}, u = {}, a = new r(), l = e.context, h = {
            o: n,
            opts: e,
            e: a
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
            n = (n || "").match(s) || [];
            for (var r = n.length; r--; ) {
                if (!u[e]) {
                    u[e] = 1;
                    o(t).on(e, "[action-type]", v);
                }
                a.on(e + c + n[r], f(i, l));
            }
            return this;
        };
        n.un = function(e, n, i) {
            if ("function" == typeof n || !n) {
                i = n;
                n = e;
                e = "click";
            }
            n = (n || "").match(s) || [];
            var r, u = n.length;
            for (o(t); u--; ) {
                r = e + c + n[u];
                a.un(r, i);
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
            a.emit(e + c + n, r, i);
        };
        n.destroy = function() {
            var i = o(t);
            o.each(u, function(t, e) {
                delete u[t];
                i.off(t, "[action-type]", v);
            });
            a.un();
            for (var r in n) delete n[r];
            a = void 0;
            e = void 0;
            u = i = t = void 0;
            v = null;
        };
        return n;
    };
    n.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return c("<" + t + "/>")[0];
    }
    function o(t, e, n) {
        t.insertRule ? t.insertRule(e + " {" + n + "}", 0) : t.addRule(e, n, 1);
    }
    function r() {
        var t, e, n, i, o, s = "";
        t = document.body || document.documentElement;
        n = t.style;
        i = "Transition";
        o = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        e = 0;
        for (;e < o.length; ) {
            if (void 0 !== n[o[e] + i]) {
                s = o[e];
                break;
            }
            e++;
        }
        r = function() {
            return s;
        };
        return s;
    }
    function s() {
        var t = r();
        return t ? "-v-".replace("v", t.toLowerCase()) : "";
    }
    function u(t) {
        return "number" == typeof t ? t : {
            fast: 200,
            normal: 500,
            slow: 1e3
        }[t] || 500;
    }
    function a(t, e, n, i, o) {
        var r, s, a = c(t), l = arguments, o = "boolean" == typeof l[l.length - 1] && l[l.length - 1], h = !1, v = function() {
            m();
        }, m = function(t) {
            h || y(!0);
        }, y = function(t) {
            if (!h) {
                h = !0;
                m = f;
                a.off(g, v);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                a.removeClass(s);
                t && i();
                a = null;
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
            s = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + e ].join(" ");
            a.on(g, v);
            r = setTimeout(v, u(n) + 100);
            o === !0 ? d(function() {
                a.addClass(s);
            }) : a.addClass(s);
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
    var c = t("jquery"), l = t("./util"), f = (l.each, l.noop), d = l.setImmediate, p = s(), h = /\-v\-/g, v = document.getElementsByTagName("head")[0].appendChild(i("style")), m = v.sheet || v.styleSheet, y = {
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
    l.each(y, function(t, e) {
        t && o(m, e, t.replace(h, p));
    });
    e.effect = a;
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
        t.fixed = !!t.fixed && k();
        var r = o('<div class="' + v + '" id="' + (t.id || b()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(t.html), s = o("<div />");
        e._popup = r;
        e._mask = e._shadow = s;
        e.node = r[0];
        e.mask = s[0];
        e.on("render", function(t) {
            var n, o = t.className, s = e._mask, u = t.zIndex;
            r.html() || r.html(t.html);
            o && r.addClass(o);
            r.css("position", t.fixed ? "fixed" : "absolute");
            u && r.css("zIndex", u);
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
                    zIndex: u || i.zIndex,
                    backgroundColor: "#000",
                    opacity: .3
                };
                k() || x(n, {
                    position: "absolute",
                    width: l.width() + "px",
                    height: f.height() + "px"
                });
                s.attr("tabIndex", 0).on("focus", _(e.focus, e));
                e._shadow = s.clone(!0);
                s.css(n).addClass(v + "-mask");
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
            var u = _(e.resize, e);
            e.on("render", function() {
                l.on("resize", u);
            });
            e.on("destroy", function() {
                l.off("resize", u);
            });
        }
        e.destroyed = !1;
        e.initialized = !0;
    }
    var o = t("jquery"), r = t("../../../core/1.0.0/utils/util"), s = t("../../../core/1.0.0/utils/css"), u = t("../../../core/1.0.0/event/emitter"), a = window, c = a.document, l = o(a), f = o(c), d = c.documentElement, p = /\S+/g, h = !("minWidth" in d.style), v = "ui-layer", m = a.Math, y = m.max, g = m.ceil, b = r.guid, x = r.extend, w = r.each, _ = function(t, e) {
        return t.bind ? t.bind(e) : function() {
            return t.apply(e, arguments);
        };
    }, A = r.setImmediate, C = function(t) {
        return a.parseInt(t, 10) || 0;
    }, T = function(t) {
        return t && 1 === t.nodeType;
    }, k = function() {
        return k._ || (k._ = function() {
            var t = c.createElement("div"), e = t.cloneNode(!1), n = !1, i = c.body || function() {
                n = !0;
                return d.appendChild(c.createElement("body"));
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
    }, E = function(t) {
        return {
            w: t.width(),
            h: t.height()
        };
    }, z = function() {
        return E(l);
    }, q = function(t) {
        var e = T(t), n = e ? o(t).offset() : {
            left: t.pageX,
            top: t.pageY
        };
        t = e ? t : t.target;
        var i = t.ownerDocument;
        if (i === a.document) return n;
        var r = i.defaultView || i.parentWindow, s = r.frameElement, u = j(), c = o(s).offset();
        return {
            left: n.left + c.left - u.x,
            top: n.top + c.top - u.y
        };
    }, I = function(t, e) {
        if (t.length) {
            var n = C(t.css(e)) || t[0]["offset" + e.charAt(0).toUpperCase() + e.slice(1)], i = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            w(i[e], function(e, i) {
                n += C(t.css("margin-" + e), 10) || 0;
            });
            return n;
        }
        return 0;
    }, L = function(t) {
        return I(t, "width");
    }, N = function(t) {
        return I(t, "height");
    }, $ = function() {
        try {
            var t = c.activeElement, e = t.contentDocument;
            return e && e.activeElement || t;
        } catch (n) {}
    }, D = function(t) {
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
        }, s = -1, u = t.length; ++s < u; ) {
            i = t[s].charAt(0);
            if (!i || o[r[i]]) t.splice(s, 1); else {
                t[s] = i;
                o[r[i]] = 1;
            }
        }
        2 === t.length && t[0] === t[1] && t.pop();
        e.align = t;
        return e;
    };
    r.inherits(i, u, {
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
            var n, i = this, o = i._, r = t, u = null, a = i._anim;
            a && a.stop(!0);
            if (i.destroyed || o.showing || i.open) return i;
            e = x({}, i._, e);
            if (void 0 !== r) {
                n = typeof r;
                "boolean" === n ? e.modal = r : r && "object" === n && (T(r) || T(r.target) ? u = r : x(e, r));
            }
            var c = i._popup, l = e.showWithAni, f = function() {
                delete o.showing;
                i.emit("shown");
            };
            if (!i._ready) {
                i.emit("render", e);
                i._ready = !0;
            }
            i.open = !0;
            i.anchor = u;
            i._activeElement = $();
            i.emit("beforeShow", e);
            c.appendTo(e.appendTo).css("display", "block");
            i.emit("show", e);
            o.showing = !0;
            if (l && "none" !== l) {
                var d = l.split(":");
                i._anim = s.effect(i.node, d[0], d[1], f);
            } else f();
            return i;
        },
        hide: function(t) {
            var e, n = this, i = n._, o = n.node, r = i.hideWithAni, u = n._anim;
            u && u.stop(!0);
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
                var a = r.split(":");
                n._anim = s.effect(o, a[0], a[1], e);
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
            var e = this._, n = this.node, r = this._popup, s = i.current, u = e.zIndex;
            s && s !== this && s.blur(!1);
            if (!o.contains(n, $())) {
                var a = r.find("[autofocus]")[0];
                !e.focusing && a ? e.focusing = !0 : a = n;
                this._focus(a);
            }
            if (void 0 === u) {
                u = e.zIndex = i.zIndex++;
                r.css("zIndex", u);
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
            var t = this._popup, e = this._.fixed, n = j(), i = z(), o = E(t), r = e ? 0 : n.x, s = e ? 0 : n.y, u = (i.w - o.w) / 2 + r, a = .382 * (i.h - o.h) + s;
            t.css({
                left: y(C(u), r),
                top: y(C(a), s)
            });
            return this;
        },
        alignTo: function(t, e) {
            var n = this, i = n._, r = n._popup, s = t.parentNode && o(t);
            if (!s) return n;
            var u = s.offset();
            if (u.left * u.top < 0) return n.center();
            e = e || i.align;
            var a = D(e), c = a.align, l = !a.auto;
            c && c.length || (c = [ "b" ]);
            var f = n._dirClass;
            f && r.removeClass(f);
            var d = i.fixed, p = z(), h = j(), m = L(r), y = N(r), b = q(t), x = L(s), _ = N(s), A = b.left, T = b.top, k = d ? A - h.x : A, E = d ? T - h.y : T, I = d ? 0 : h.x, $ = d ? 0 : h.y, U = I + p.w - m, O = $ + p.h - y, S = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, P = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, R = {}, M = [ {
                t: E - y,
                b: E + _,
                l: k - m,
                r: k + x
            }, {
                t: E,
                b: E - y + _,
                l: k,
                r: k - m + x
            } ], G = {
                l: k + g((x - m) / 2),
                t: E + g((_ - y) / 2)
            }, W = {
                left: [ I, U ],
                top: [ $, O ]
            };
            l || w(c, function(t, e) {
                M[e][t] > W[P[t]][1] && (t = c[e] = S[t]);
                M[e][t] < W[P[t]][0] && (c[e] = S[t]);
            });
            var F = c[0];
            if (!c[1]) {
                c[1] = "left" === P[F] ? "t" : "l";
                M[1][c[1]] = G[c[1]];
            }
            M[0][F] = M[0][F] + 10 * ("tl".indexOf(F) !== -1 ? -1 : 1);
            R[P[c[0]]] = C(M[0][c[0]]);
            R[P[c[1]]] = C(M[1][c[1]]);
            var B = v + "-" + F;
            r.css(R).addClass(B);
            n._dirClass = B;
            var H = n.$("arrow", 1), V = n.$("inner", 1);
            if (!H) {
                if (!V) return n;
                H = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(V);
            }
            var Y, Q, X = "top" !== P[F], J = [ "v", "h" ][1 ^ X], Z = L(H), K = N(H), tt = {}, et = X ? "left" : "top";
            switch (J) {
              case "h":
                Y = g(A + (x - Z) / 2);
                tt.left = Y;
                break;

              case "v":
                Q = g(T + (_ - K) / 2);
                tt.top = Q;
            }
            H.offset(tt).css(et, "");
            return n;
        }
    });
    i.zIndex = 1024;
    i.current = null;
    n.exports = i;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../../../core/1.0.0/utils/util"), r = t("../../../core/1.0.0/dom/delegator"), s = t("./popup"), u = o.extend, a = o.guid, c = o.each, l = window.document, f = {
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
        var e = t || (t = {}), n = t.id || t.id || a(), o = p.get(n) || this;
        "string" != typeof t && 1 !== t.nodeType || (t = {
            content: t
        });
        t = u({}, f, t);
        t.original = e;
        var r, s = t.button || (t.button = []);
        if (!i.isArray(r = s)) {
            r = [];
            s && "object" == typeof s && c(s, function(t, e) {
                t.id = e;
                r.push(t);
            });
            s = t.button = r;
        }
        if (s.length > 0) {
            var l = !1;
            c(s, function(e, n) {
                var i = e.id || a();
                e.autofocus && (l = !0);
                t[i] && u(e, t[i]);
                e.index = n;
            });
            l || (s[s.length - 1].autofocus = !0);
        }
        o.emit("init", t);
        o.initialized ? o.options(t).focus() : o.init(t);
        d[n] = o;
        return o;
    };
    o.inherits(p, s, {
        init: function(t) {
            var e = this;
            s.call(e, t);
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
            var e = this, t = u(e._, t);
            e._freeze(!0);
            c([ "title", "content", "width", "height", "action", "button" ], function(n, i) {
                i = t[n];
                null != i && "function" == typeof e[n] && e[n](i);
            });
            e._freeze(!1).resize();
            t.zIndex && (s.zIndex = t.zIndex);
            return e;
        },
        initComponents: function() {
            var t = this, e = t._;
            t.$("header").hide();
            t.$("footer").hide();
            t.options();
            e.close || t.$("close").css("display", "none");
            e.clickBlankToHide && i(t.mask).on("onmousedown" in l ? "mousedown" : "click", function() {
                t.hide();
                return !1;
            });
            var n = function(e) {
                var n = e.target, i = n.nodeName, o = /^input|textarea$/i, r = s.current === t, u = e.keyCode;
                !r || o.test(i) && "button" !== n.type || 27 === u && t.hide();
            };
            i(l).on("keydown", n);
            t.on("destroy", function() {
                i(l).off("keydown", n);
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
                i.contains(l, t) && this.on("beforeremove", function() {
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
            } else c(t, function(t, s) {
                var u = t.id, a = t.fn || t.callback, c = t.display !== !1, l = t.className || r, f = [ l ];
                t.autofocus && f.push(n.buttonClassLight);
                "function" == typeof a && e.delegate(u, a);
                c && o++;
                i += '<button type="button" action-type="' + u + '"' + (c ? "" : ' style="display:none"') + (' class="' + f.join(" ") + '"') + (t.disabled ? " disabled" : "") + ">" + (t.text || t.value) + "</button>";
            });
            e.$("button").html(i);
            e.$("footer")[o ? "show" : "hide"]();
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
    p.getCurrent = function() {
        return s.current;
    };
    p.get = function(t) {
        return void 0 === t ? d : d[t];
    };
    p.config = function(t) {
        t && u(f, t);
    };
    n.exports = p;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../../../core/1.0.0/utils/util"), r = t("./drag"), s = t("./dialog"), u = o.each, a = o.extend, c = window.clearTimeout, l = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var t = i('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + l + '"</i>').appendTo("body");
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
        loading: '<img src="' + l + '" />'
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
            u([ "title", "width", "height", "button" ], function(t) {
                i[t] = n[t];
                delete n[t];
            });
            t.once("load", function() {
                var n = t._;
                u(i, function(i, o) {
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
            }, s = 0; s < frames.length; s++) try {
                if (o instanceof frames[s].Object) {
                    i(frames[s]).one("unload", r);
                    break;
                }
            } catch (u) {}
        }).once("beforeremove", function() {
            i(e).attr("src", "about:blank").remove();
        }, !1);
    }, g = function(t, e) {
        var n = t._, o = t.$("content"), r = o.find("iframe"), s = r && r[0], u = function(e) {
            t._freeze(!0);
            if (e) {
                n.width || t.width(e.width);
                n.height || t.height(e.height);
            }
            t.emit("load");
            t._freeze(!1).resize();
            u = null;
            r.removeAttr("style");
            r = s = null;
        }, a = function(e) {
            n.showing ? t.once("shown", e) : e();
        };
        if (!r.length) {
            var c = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), l = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (c ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + e + '"></iframe>';
            r = i(l.replace(/{id}/g, n.id)).appendTo(o);
            s = r[0];
            n.autoSize ? r.one("load", function() {
                var t, e, n, o = m(s), c = o && i(o);
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
                    u(n);
                });
            }) : a(function() {
                u();
            });
        }
        return s;
    }, b = function(t) {
        var e = this;
        t = a({}, t);
        var n = t.button || (t.button = []);
        u([ "cancel", "ok" ], function(e, i) {
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
            var c = t.url;
            if (c) {
                var l = t.close !== !1;
                t = a({
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
                    l && e.$("close").show();
                });
                e.on("hidden", function() {
                    e.destroy();
                });
                y(e);
            }
        }
        e = s.call(e, t) || e;
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
    o.inherits(b, s, {
        show: function(t, e) {
            var n = this, i = n._, r = [].slice.call(arguments), e = a({}, i, e), s = e.duration || 0, u = e.delay || 0, l = function() {
                o.each([ x, w ], function(t, e) {
                    e = i[t];
                    delete i[t];
                    e && c(e);
                });
            }, f = function() {
                if (s > 0) {
                    i[w] = setTimeout(function() {
                        l();
                        n.hide();
                    }, s);
                    n.once("hide", l);
                }
                b.__super__.show.apply(n, r);
            };
            l();
            u > 0 ? i[x] = setTimeout(f, u) : f();
            return n;
        },
        hide: function() {
            var t = this, e = t._;
            e && o.each([ x, w ], function(t, n) {
                n = e[t];
                delete e[t];
                n && c(n);
            });
            b.__super__.hide.apply(t, arguments);
            return t;
        }
    });
    b.config = s.config;
    b.get = function(t) {
        if (t) {
            var e, n, i = s.get();
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
    var i = t("./messagebox"), o = t("../../../core/1.0.0/utils/util"), r = function() {}, s = o.mix, u = function(t, e) {
        var n = function(t, e) {
            return void 0 !== e && null !== e && "" !== e && !("number" == typeof e && isNaN(e));
        };
        return function(t, e) {
            return s(t, e, !0, !0, n);
        };
    }(), a = function(t) {
        return !!(t && t.nodeType && t.tagName);
    }, c = o.guid, l = function() {
        return c("__0x$");
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
        } else if (a(e)) {
            n = e;
            e = {};
        } else "number" == typeof e && (e = {
            duration: e
        });
        e = e || {};
        var i = d(u({
            id: l(),
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
            var n = d(u({
                autofocus: !0,
                autoRelease: !0,
                id: l(),
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
            e = u({
                title: "提示",
                xtype: "info",
                className: "ui-box-alert",
                autofocus: !0,
                id: l(),
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
                a(n) ? i = n : o = n;
                n = e;
            }
            if ("function" != typeof e) {
                o = e;
                e = r;
            }
            "function" != typeof n && (n = e);
            var s = function(t) {
                t ? e(t) : n(t);
            };
            o && (i = i || o.sender);
            var c = d(u({
                xtype: "confirm",
                autofocus: !0,
                id: l(),
                modal: !i,
                autoRelease: !0,
                content: "<div>" + t + "</div>",
                close: !1,
                ok: {
                    text: "确定",
                    fn: function() {
                        s(!0);
                    }
                },
                cancel: {
                    text: "取消",
                    fn: function() {
                        s(!1);
                    }
                }
            }, o));
            return c.show(i);
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
            } else "number" == typeof n ? o.duration = n : o = u(o, n);
            return p(e, o, i);
        };
    });
    h.get = i.get;
    h.config = i.config;
    n.exports = h;
});

define("lib/ui/box/1.0.1/crossbox", [ "require", "exports", "module", "./box" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
    }
    function o(t) {
        d.push(t);
    }
    function r(t) {
        for (var e = -1, n = d.length; ++e < n; ) d[e](t);
    }
    function s(t) {
        f ? t(u || c) : o(t);
    }
    var u, a = window, c = i({}, t("./box")), l = window.top, f = !1, d = [];
    if (a !== l) try {
        l.require([ "lib/ui/box/1.0.1/crossbox" ], function(t) {
            i(n.exports, t);
            f = !0;
            u = t;
            r(t);
        });
    } catch (p) {
        setTimeout(function() {
            console.warn("Initialize crossbox failed, use inner box instead.");
        }, 1);
    } else {
        f = !0;
        u = c;
    }
    e = n.exports = c;
    e.ready = s;
});

define("conf/course/list", [ "require", "exports", "module", "jquery", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/login-status/1.0.0/login", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer", "lib/core/1.0.0/io/request", "lib/ui/box/1.0.1/crossbox" ], function(t, e, n) {
    "use strict";
    var i = (t("jquery"), t("module/top-search/1.0.0/top-search")), o = t("module/login-status/1.0.0/login-status"), r = t("module/login-status/1.0.0/login"), s = t("module/fix-bar/1.0.0/fix-bar"), u = t("module/footer/1.0.0/footer");
    new i(), new o(), new s(), new u(), r.isLogin(), t("lib/core/1.0.0/io/request"), 
    t("lib/ui/box/1.0.1/crossbox");
});