/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return "object" == typeof t && null !== t;
    }
    function r() {}
    function o(t, e) {
        for (var n = t.length, i = -1; ++i < n; ) e(t[i], i);
    }
    function a(t, e) {
        for (var n in t) d.call(t, n) && e(t[n], n, t);
    }
    function l(t, e) {
        if (t && t.forEach) return t.forEach(e);
        h(t) ? o(t, e) : a(t, e);
    }
    function s(t, e) {
        for (var n = -1, i = t.length, r = Array(i); ++n < i; ) r[n] = e(t[n], n, t);
        return r;
    }
    function u(t, e) {
        var n = [];
        l(t, function(t, i, r) {
            n.push(e(t, i, r));
        });
        return n;
    }
    function c(t, e) {
        if (!e || !i(e)) return t;
        for (var n = m(e), r = n.length; r--; ) t[n[r]] = e[n[r]];
        return t;
    }
    function f(t) {
        "?" === t.charAt(0) && (t = t.substr(1));
        for (var e, n = {}, i = t.split("&"), r = -1, o = i.length; ++r < o; ) {
            e = i[r].split("=");
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
        a(t, function(t, n) {
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
    o([ "log", "error", "trace", "warn", "info" ], function(t) {
        y[t] || (y[t] = r);
    });
    e.extend = function(t, e) {
        for (var n = [].slice.call(arguments, 1), i = n.length, r = -1; ++r < i; ) c(t, n[r]);
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
    e.each = l;
    e.map = function(t, e) {
        var n = h(t) ? s : u;
        return n(t, e);
    };
    e.filter = function(t, e) {
        var n, i, r = h(t) ? (n = o, i = function(t, e) {
            r.push(e);
        }, []) : (n = a, i = function(t, e) {
            r[t] = e;
        }, {});
        n(t, function(t, n) {
            e(t, n) && i(n, t);
        });
        return r;
    };
    e.mix = function b(t, e, n, i, r) {
        for (var o in e) e.hasOwnProperty(o) && (e[o] && t[o] && n && "object" == typeof e[o] ? b(t[o], e[o], n, i, r) : (void 0 === t[o] || i) && (r && !r(t[o], e[o]) || (t[o] = e[o])));
        return t;
    };
    e.guid = v;
    e.setImmediate = function() {
        var t = p.document, e = p.postMessage, n = p.setImmediate;
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
                    p.removeEventListener("message", n, !0);
                    t();
                }
            }
            var i = v();
            p.addEventListener("message", n, !0);
            e(i, "*");
        } : function(t) {
            p.setTimeout(t, 0);
        };
    }();
    e.noop = r;
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
        var r;
        return function() {
            var o = i || this, a = arguments, l = function() {
                r = null;
                n || t.apply(o, a);
            }, s = n && !r;
            clearTimeout(r);
            r = setTimeout(l, e);
            s && t.apply(o, a);
        };
    };
    e.deprecate = function(t, e) {
        function n() {
            i || (i = !0);
            return t.apply(this, arguments);
        }
        if (p.noDeprecation === !0) return t;
        var i = !1;
        return n;
    };
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return t.replace(l, "ms-").replace(s, u);
    }
    function r(t) {
        try {
            return "true" === t || "false" !== t && ("null" === t ? null : +t + "" === t ? +t : c.test(t) ? a.parseJSON(t) : t);
        } catch (e) {}
    }
    function o(t, e, n) {
        var i;
        if (void 0 === n && 1 === t.nodeType) {
            i = "data-" + e.replace(f, "-$&").toLowerCase();
            n = t.getAttribute(i);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var a = (window.document, t("jquery")), l = /^-ms-/, s = /-([\da-z])/gi, u = function(t, e) {
        return e.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, p = function(t, e, n) {
        if (!t || 1 !== t.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, l, s, u;
        if (1 === arguments.length) {
            if (s = t.dataset) {
                u = {};
                for (l in s) s.hasOwnProperty(l) && (u[l] = r(s[l]));
                return u;
            }
            s = t.attributes;
            a = s.length;
            u = {};
            for (;a--; ) if (s[a]) {
                l = s[a].name;
                if (0 === l.indexOf("data-")) {
                    l = i(l.slice(5));
                    u[l] = r(o(t, l));
                }
            }
            return u;
        }
    };
    n.exports = p;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(t, e, n) {
    "use strict";
    function i(t, e, n, i) {
        i ? t[e] || (t[e] = n) : t[e] ? t[e] = t[e].add(n) : t[e] = o(n);
    }
    var r = window.document, o = t("jquery"), a = function(t, e, n) {
        var a, l, s, u, c, f = function(t) {
            if (n) for (var r in n) s[r] = o(n[r].toString(), t); else {
                s = {};
                u = o("[node-type]", t);
                for (var a, l = -1, c = u.length; ++l < c; ) {
                    a = u[l];
                    r = a.getAttribute("node-type");
                    i(s, r, a, e);
                }
            }
        }, p = function(t) {
            var n, r = s[t];
            if (!r || 0 === r.length) {
                n = o('[node-type="' + t + '"]', a);
                n.length && i(s, t, n, e);
                r = s[t];
            }
            return r;
        };
        void 0 === e && (e = !0);
        a = t;
        if ("string" == typeof t && "<" === t.charAt(0)) {
            a = r.createElement("div");
            a.innerHTML = t;
            l = r.createDocumentFragment();
            for (;c = a.firsChild; ) l.appendChild(c);
        } else {
            a = o(t);
            l = a[0];
        }
        f(a);
        return {
            get: p,
            box: l,
            list: s
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
        e.options = r.extend(!0, {}, n, t);
        if ("" == e.options.url) throw new Error("the params options.url is required");
        e.el = r(e.options.selector);
        var i = o.build(e.el[0], !1);
        e.ipt = i.get("ipt");
        e.btn = i.get("btn");
        e.lbl = i.get("lbl");
        e._init();
        e._initEvent();
    }
    var r = t("jquery"), o = (t("lib/core/1.0.0/utils/util"), t("lib/core/1.0.0/dom/build"));
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
        var t = this, e = r.trim(t.ipt.val()), n = t.ipt.attr("data-id");
        e.length > 0 && t.focus();
        n && (t.options.alias = n);
        t.options.data && (t.options.data[t.options.alias] = r.trim(t.ipt.val()));
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
        return r.trim(t.ipt.val());
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
    var i = window.document, r = function(t) {
        if ("string" != typeof t) throw "trim need a string as parameter";
        for (var e = t.length, n = 0, i = e - 1, r = /(\u3000|\s|\t|\u00A0)/; n < e && r.test(t.charAt(n)); ) ++n;
        for (;i >= 0 && r.test(t.charAt(i)); ) --i;
        return t.substring(n, i + 1);
    }, o = function(t) {
        var e = {};
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
    }, a = function(t, e, n) {
        n = n || {};
        if (void 0 !== e) {
            n = o(n);
            if (null === e) {
                e = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var a = n.expires, l = n.expires = new Date();
                l.setTime(l.getTime() + 864e5 * a);
            }
            var s = function(t) {
                try {
                    return n.raw ? t : encodeURIComponent(t);
                } catch (e) {}
                return t;
            };
            return i.cookie = [ s(t), "=", s(e), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var e = null, u = i.cookie, c = function(t) {
            return n.raw ? t : decodeURIComponent(t);
        }, f = u ? u.split("; ") : [], p = -1, d = f.length, h = t.length + 1; ++p < d; ) {
            u = r(f[p]);
            if (u.substring(0, h) === t + "=") {
                e = c(u.substring(h));
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
    var i = t("lib/core/1.0.0/io/cookie"), r = "_nick", o = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", l = $PAGE_DATA && $PAGE_DATA[r] || null;
    e.getNick = function() {
        return l;
    };
    e.isLogin = function() {
        return !!i(o);
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
        e.options = r.extend(!0, {}, n, t);
        e.el = r(e.options.selector);
        e._init();
    }
    var r = t("jquery"), o = t("lib/core/1.0.0/dom/build"), a = t("./login");
    i.prototype._init = function() {
        var t = this;
        if (a.isLogin()) {
            var e = a.getNick();
            t.el.html(t._getLoginedHtml(e));
            t._initEvent();
        }
    };
    i.prototype._initEvent = function() {
        var t = this, e = !1, n = o.build(t.el[0], !1), i = n.get("userName"), r = n.get("tipsMenu");
        i.on("mouseenter", function() {
            e = !0;
            r.stop().fadeIn(500, function() {
                r.addClass("active");
            });
        });
        i.on("mouseleave", function() {
            e = !1;
            setTimeout(function() {
                e || r.stop().fadeOut(500, function() {
                    r.removeClass("active");
                });
            }, 200);
        });
        r.on("mouseenter", function() {
            e = !0;
        });
        r.on("mouseleave", function() {
            e = !1;
            r.removeClass("active");
        });
    };
    i.prototype._getLoginedHtml = function(t) {
        var e = this, n = e.options, i = n.menuList, r = "";
        r += '<ul class="logined clearfix" node-type="logined">';
        r += '    <li class="item">';
        r += "        <span>您好，</span>";
        r += "    </li>";
        r += '    <li class="item tips-menu-box">';
        r += '        <a href="' + n.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + t + "</a>";
        r += '        <div class="tips-menu" node-type="tipsMenu">';
        r += '            <div class="arrow"><i></i><b></b></div>';
        r += '            <ul class="tips-menu-list">';
        for (var o = 0, a = i.length; o < a; o++) r += '            <li class="tips-menu-item"><a href="' + i[o].url + '">' + i[o].title + "</a></li>";
        r += "            </ul>";
        r += "        </div>";
        r += "    </li>";
        r += '    <li class="item">';
        r += '        <a href="' + n.loginOutUrl + '" class="btn">退出</a>';
        r += "    </li>";
        r += "</ul>";
        return r;
    };
    n.exports = i;
});

define("module/fix-bar/1.0.0/fix-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function i(t) {
        var e = this, n = {
            onlineServiceUrl: ""
        };
        e.options = r.extend(!0, {}, n, t);
        e._init();
        e._initEvent();
    }
    var r = t("jquery");
    t("lib/core/1.0.0/utils/util"), t("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var t = this;
        t.el = r(t._getTemplete());
        r(document.body).append(t.el);
        t.height = t.el.height();
        t.resize();
    };
    i.prototype._initEvent = function() {
        var t = this;
        r(window).on("resize", function() {
            t.resize();
        });
    };
    i.prototype.resize = function() {
        var t = this, e = r(window).height(), n = (e - t.height) / 2;
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
        for (var n = [], i = -1, r = t.length; ++i < r; ) e(t[i], i) && n.push(t[i]);
        return n;
    }, r = function(t, e, n, i) {
        var r;
        return function() {
            var o = i || this, a = arguments, l = function() {
                r = null;
                n || t.apply(o, a);
            }, s = n && !r;
            clearTimeout(r);
            r = setTimeout(l, e);
            s && t.apply(o, a);
        };
    }, o = function(e, n) {
        e = e || {};
        var i = t(e), r = Array.prototype.slice;
        n = n || e.name;
        t.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(t, o) {
            e[t] = function(e) {
                var a = r.call(arguments, 0), l = a[1];
                n && !~e.indexOf(".") && (a[0] = e + "." + n);
                "function" == typeof l && ("on" === t || "once" === t ? a[1] = l.__ || (l.__ = function(t) {
                    t.preventDefault();
                    return l.apply(this, r.call(arguments, 1));
                }) : "un" === t && (a[1] = l.__));
                return i[o].apply(i, a);
            };
        });
        return e;
    }, a = window, l = t(a), s = a.Image, u = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, p = 1, d = 2, h = function(t) {
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
    v.define("image", function(n, i, r, o) {
        if (i) {
            var a = new s(), l = function() {
                a.onload = a.onerror = null;
                a = i = n = o = l = e;
            };
            a.onload = function() {
                var e = t(n), a = r.effect;
                "function" != typeof e[a] && (a = "show");
                e.hide();
                "IMG" === n.nodeName.toUpperCase() ? e.attr("src", i) : e.css("background-image", 'url("' + i + '")');
                e[a](r.effectSpeed);
                o(null, "load");
                l();
            };
            a.onerror = function(t) {
                o(t);
                l();
            };
            a.src = i;
        } else o("error");
    });
    v.define("html", function(t, e, n, i) {
        i();
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
            container: a,
            dataAttribute: "src",
            sourceMaker: null,
            skipInvisible: !0,
            appear: null,
            load: null,
            loadingClass: "",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        o(m);
        var x = s.type || _.type, w = v.get(x);
        if ("function" != typeof w) throw "Error, cannot found the specific type loader (type: `" + x + "`)";
        "html" === x && (_.placeholder = "");
        s && t.extend(_, s);
        var j = _.container, $ = _.event, E = 0 === $.indexOf("scroll"), T = j && j !== a ? t(j) : l, q = function(e) {
            var i = m._list;
            if (i.length > 0) {
                var r = 0;
                n(i.slice(0), function(e, n) {
                    var i = t(n);
                    if (!_.skipInvisible || i.is(":visible")) if (b(n, _) || A(n, _)) ; else if (g(n, _) || y(n, _)) {
                        if (++r > _.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        r = 0;
                    }
                });
            } else m.reset();
        }, L = function() {
            m._list = i(m._list, function(t) {
                return !t[c];
            });
        }, C = function() {
            var e = this, n = t(e), i = n.attr("data-" + _.dataAttribute), r = _.sourceMaker, o = _.appear, a = _.loadingClass, l = e[c];
            if (l === f) {
                e[c] = p;
                a && n.addClass(a);
                r && (i = r(i, e));
                o && o.apply(m, [ e, i ]);
                w.call(m, e, i, _, function(t, r) {
                    if (!m._destroyed) {
                        a && n.removeClass(a);
                        if (t) setTimeout(function() {
                            e[c] = f;
                            m.emit("lazyItemError", e, i, t);
                            e = null;
                        }, 300); else {
                            e[c] = d;
                            L();
                            m.emit("lazyItemReady", e, i, r);
                            var o = _.load;
                            o && o.apply(m, [ e, i, r ]);
                            e = null;
                        }
                        n = null;
                    }
                });
            } else if (l === d) {
                L();
                m.emit("lazyItemReady", e, i);
            }
        }, k = function() {
            this[c] || t(this).trigger("appear");
        }, U = function(e) {
            var n = t(e);
            e[c] = f;
            var i = _.placeholder;
            if (i) if (n.is("img")) {
                var r = n.attr("src");
                r || n.attr("src", i);
            } else "image" === m._.type || n.children()[0] || n.html(i);
            n.on("appear", C);
            E || n.on($, k);
            m._list.push(e);
        }, D = function(t) {
            t = i(t || [], h);
            if (t.length) {
                n(t, function(t, e) {
                    U(e);
                });
                m._inited || S(m);
            }
        }, S = function(e) {
            if (!e._inited) {
                var i = r(q, 30);
                e._inited = !0;
                E && T.on($, i);
                l.on("resize", i);
                if (u) {
                    var o = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(e._list, function(e, n) {
                            t(n).trigger("appear");
                        });
                    };
                    l.on("pageshow", o);
                    e.once("reset", function() {
                        l.off("pageshow", o);
                    });
                }
                e.once("reset", function() {
                    n(e._list, function(t, e) {
                        P(e);
                    });
                    E && T.off($, i);
                    l.off("resize", i);
                });
                t(document).ready(q);
            }
        }, P = function(e) {
            var n = t(e);
            n.off("appear", C);
            E || n.off($, k);
        };
        m.on("lazyItemReady", function(t) {
            P(t);
        });
        m.once("destroy", function() {
            D = null;
            q = null;
            L = null;
            C = null;
            k = null;
        });
        m._ = _;
        m._list = [];
        m.add = function(e) {
            var n = t(e);
            n.length > 0 && D(n);
        };
        m.update = q;
        D(e);
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
        var i, r = n.container;
        i = r && r !== a ? t(r).offset().top + t(r).height() : (a.innerHeight ? a.innerHeight : l.height()) + l.scrollTop();
        return i <= t(e).offset().top - n.threshold;
    }, y = function(e, n) {
        var i, r = n.container;
        i = r && r !== a ? t(r).offset().left + t(r).width() : l.width() + l.scrollLeft();
        return i <= t(e).offset().left - n.threshold;
    }, b = function(e, n) {
        var i, r = n.container;
        i = r && r !== a ? t(r).offset().top : l.scrollTop();
        return i >= t(e).offset().top + n.threshold + t(e).height();
    }, A = function(e, n) {
        var i, r = n.container;
        i = r && r !== a ? t(r).offset().left : l.scrollLeft();
        return i >= t(e).offset().left + n.threshold + t(e).width();
    }, _ = function(t, e) {
        return !(y(t, e) || A(t, e) || g(t, e) || b(t, e));
    };
    m.belowthefold = g;
    m.rightoffold = y;
    m.abovethetop = b;
    m.leftofbegin = A;
    m.inviewport = _;
    return m;
});

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function i(t) {
        var e = this, n = {
            selector: "#jFooter"
        };
        e.options = r.extend(!0, {}, n, t);
        e.el = r(e.options.selector);
        if (0 == e.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        e._init();
    }
    var r = t("jquery"), o = t("lib/plugins/lazyload/1.9.3/lazyload"), a = t("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var t = this, e = a.build(t.el[0], !1), n = e.get("footerImg");
        new o(n);
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
    function r(t, e, n, i) {
        var r = !0;
        if (e) for (var o, a, l, s = -1, u = {
            type: t,
            timeStamp: c()
        }; o = e[++s]; ) {
            a = o[v];
            l = o[m] || i;
            try {
                r = o[g] === h ? a.call(l, u, n) !== !1 && r : a.apply(l, n) !== !1 && r;
            } catch (f) {
                setTimeout(function() {
                    console.error(f);
                }, 1);
            }
        }
        return r;
    }
    function o(t) {
        var e, n = p(this);
        if (n) {
            e = n[t];
            return e.length;
        }
        return 0;
    }
    function a(t) {
        return "[object Function]" === Object.prototype.toString.call(t);
    }
    function l(t, e) {
        for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
    }
    function s(t, e) {
        t.forEach ? t.forEach(e) : function(t) {
            for (var n = -1, i = t.length; ++n < i; ) e(t[n], n);
        }(t);
    }
    var u = /\s+/, c = Date.now || function() {
        return +new Date();
    }, f = function() {
        return c() * Math.random() & 65535;
    }(), p = function() {
        var t, e, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (t = new WeakMap(), 
        function(e, n) {
            var i = t.get(e);
            return null === n ? void 0 !== i && t["delete"](e) : !i && n ? (t.set(e, i = {}), 
            i) : i;
        }) : (e = c(), n = "__$widΦ" + e.toString(36), t = {}, function(i, r) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var o;
            return null === r ? i[n] && (delete t[i[n]], delete i[n]) : (o = i[n] || r && (o = ++e, 
            t[o] = {}, i[n] = o), o && t[o]);
        });
    }(), d = 1, h = 2, v = 0, m = 1, g = 2, y = function(t, e, n) {
        var i = [];
        i[v] = t;
        i[m] = e;
        i[g] = n;
        return i;
    }, b = i.prototype;
    b.addListener = function(t, e, n, i) {
        var r, o, a, l = d;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
            l = h;
        }
        if (!e) return this;
        r = p(this, 1);
        t = t.split(u);
        for (;o = t.shift(); ) {
            a = !i && r[o] || (r[o] = []);
            a.push(y(e, n, l));
        }
        return this;
    };
    b.on = b.addListener;
    b.once = function(t, e, n) {
        var i = !1, r = function() {
            this.removeListener(t, r);
            if (!i) {
                i = !0;
                e.apply(n || this, arguments);
            }
        };
        r.guid = e.guid || (e.guid = f++);
        return this.on(t, r);
    };
    b.removeListener = function(t, e, n) {
        var i, r, o, a, s, c;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
        }
        if (!(i = p(this))) return this;
        if (!(t || e || n)) {
            l(i, function(t, e) {
                delete i[e];
            });
            p(this, null);
            return this;
        }
        t = t ? t.split(u) : A(i);
        for (;r = t.shift(); ) {
            o = i[r];
            if (o) if (e || n) for (a = o.length; --a >= 0; ) {
                s = o[a];
                c = s[v];
                e && c !== e && (void 0 === c.guid || c.guid !== e.guid) || n && s[m] !== n || o.splice(a, 1);
            } else delete i[r];
        }
        return this;
    };
    b.un = b.removeListener;
    b.removeAllListeners = function(t) {
        return this.removeListener(t);
    };
    b.emit = function(t) {
        var e, n, i, o, a, l, s = [], c = !0;
        if (!(e = p(this))) return this;
        t = t.split(u);
        for (a = 1, l = arguments.length; a < l; a++) s[a - 1] = arguments[a];
        for (;n = t.shift(); ) {
            (i = e.all) && (i = i.slice());
            (o = e[n]) && (o = o.slice());
            "all" !== n && (c = r(n, o, s, this) && c);
            c = r(n, i, [ n ].concat(s), this) && c;
        }
        return c;
    };
    i.applyTo = function(t) {
        function e(e, i) {
            t[e] = function() {
                var r = n[e].apply(i || t, Array.prototype.slice.call(arguments));
                return r === i ? this : r;
            };
        }
        var n = b, i = A(n);
        a(t) ? s(i, function(e) {
            t.prototype[e] = n[e];
        }) : s(i, function(t) {
            e(t);
        });
    };
    i.listenerCount = function(t, e) {
        return "function" == typeof t.listenerCount ? t.listenerCount(e) : o.call(t, e);
    };
    b.listenerCount = o;
    var A = Object.keys || function(t) {
        var e = [];
        l(t, function(t, n) {
            e.push(n);
        });
        return e;
    };
    n.exports = i;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), r = t("../utils/util"), o = t("../event/emitter"), a = r.setImmediate, l = r.noop, s = r.extend, u = i.trim, c = i.parseJSON, f = function(t, e, n) {
        return function(i, r) {
            try {
                return t.apply(e, arguments);
            } catch (o) {
                n && n(o, i, r);
            }
        };
    }, p = function(t) {
        return e.emit.apply(e, arguments);
    };
    o.applyTo(e);
    var d = function() {
        var t = 5, e = 0, n = [], r = function() {
            a(function() {
                --e;
                o();
            });
        }, o = function() {
            if (n.length > 0 && e < t) {
                var o = n.shift(), a = o[0], l = o[1];
                ++e;
                a.always(r);
                i.ajax(l);
            }
        };
        return function(t, e) {
            n.push([ t, e ]);
            o();
        };
    }(), h = function(t) {
        o.applyTo(this);
        var e = {
            url: "",
            type: "GET",
            data: {},
            dataType: "json",
            timeout: 3e4,
            cache: !1
        };
        t = s(e, t);
        delete t.error;
        delete t.success;
        this._opts = t;
    };
    s(h.prototype, {
        send: function() {
            var t = this, e = this._opts, n = s({}, e), i = "jsonp" === n.dataType;
            i && (n.crossDomain = !0);
            n.complete = function(n, r) {
                var o, a = +n.status, l = n.responseJSON, s = {
                    error: "1",
                    msg: "Request error (status: " + (r || a) + ")"
                }, f = 200 === a || "success" === r;
                if (!i && !l) {
                    l = u(n.responseText);
                    if (l && "<" !== l.charAt(0)) try {
                        l = c(l);
                    } catch (p) {}
                }
                f || (l = l || s);
                o = {
                    data: l,
                    xhr: n,
                    origin: e,
                    status: a || r
                };
                f ? t.emit("response", null, o) : t.emit("error", l, o);
                t.emit("end", o);
                t.destroy();
            };
            d(t, n);
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
        var r = new h(e), o = function(t, n) {
            var i = t.stack && t.stack.split("\n").slice(0, 2).join("\n") || t, r = {
                stack: i,
                origin: e,
                response: n
            };
            p("error", r, n);
            a(function() {
                console.log("%c " + i, "color:#ae0000");
            }, 1);
        }, s = f(e.error || l, null, o), u = f(e.success || l, null, o);
        if (p("request", r, n) !== !1) {
            if (n && (n = i(n))) {
                var c, d, v = "data-async-lock";
                if (1 === +n.attr(v)) return;
                if (d = n.attr("data-async-text")) {
                    c = n.html();
                    n.html(d);
                }
                n.attr(v, 1);
                r.once("response error", function() {
                    if (n) {
                        n.attr(v, 0);
                        d && n.html(c);
                        n = null;
                    }
                });
            }
            r.on("error", function(t, e) {
                var n = {
                    code: t.error,
                    message: t.msg,
                    status: e.status,
                    origin: e.origin,
                    response: e.data
                };
                p("error", n, e) !== !1 && s(t);
            });
            r.on("response", function(t, e) {
                e = e.data;
                p("response", e) !== !1 && (t ? s(t) : e && 0 === +(e.error || 0) ? u(e) : s(e));
            });
            return r.send();
        }
    };
    i.each([ "get", "post", "jsonp" ], function(t, n) {
        e[n] = function(t, i, r, o, a) {
            if ("function" == typeof i) {
                a = a || o;
                o = r;
                r = i;
                i = void 0;
            }
            if (o && "function" != typeof o) {
                a = o;
                o = void 0;
            }
            var l = {
                data: i,
                success: r,
                error: o || r
            };
            "string" == typeof t ? l.url = t : s(l, t);
            var u = n;
            if ("jsonp" === n) {
                u = "get";
                l.dataType = "jsonp";
            }
            l.type = u;
            return e.ajax(l, a);
        };
    });
});

define("plugins/polling-list/1.0.0/polling", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this, i = {
            ajax: {
                type: "get",
                data: null
            },
            time: 1e3
        };
        n.options = r.extend(!0, {}, i, e);
        n.options.ajax.url = t;
        n._isLoading = !1;
    }
    var r = t("jquery"), o = t("lib/core/1.0.0/io/request"), a = t("lib/core/1.0.0/event/emitter"), l = t("lib/core/1.0.0/utils/util");
    l.inherits(i, a);
    i.prototype.start = function() {
        var t = this, e = t.options, n = t.options.ajax;
        t._isLoading = !1;
        t._interval || (t._interval = setInterval(function() {
            if (!t._isLoading) {
                t._isLoading = !0;
                o[n.type](n.url, n.data, function(e) {
                    t._isLoading = !1;
                    t.emit("success", e);
                }, function(e) {
                    t._isLoading = !1;
                    t.emit("error", e);
                });
            }
        }, e.time));
    };
    i.prototype.stop = function() {
        var t = this;
        t.options, t.options.ajax;
        t._isLoading = !0;
    };
    i.prototype.setData = function(t) {
        var e = this;
        e.options.ajax.data = r.extend({}, e.options.ajax.data, t);
    };
    n.exports = i;
});

define("plugins/polling-list/1.0.0/polling-list", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "./polling" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this;
        n.el = r(t);
        if (0 == n.el.length) throw new Error("the param [el] is required.");
        n.container = r('<div node-type="container"></div>');
        n.el.html(n.container);
        var i = {
            ajax: {
                url: null,
                type: "get",
                data: null
            }
        };
        n.options = r.extend(!0, {}, i, e);
        n._init();
        n._initEvent();
    }
    var r = t("jquery"), o = (t("lib/core/1.0.0/io/request"), t("lib/core/1.0.0/event/emitter")), a = t("lib/core/1.0.0/utils/util"), l = t("./polling");
    a.inherits(i, o);
    i.prototype._init = function() {
        var t = this;
        t.polling = new l(t.options.ajax.url, {
            ajax: t.options.ajax
        });
    };
    i.prototype._initEvent = function() {
        var t = this;
        t.polling.on("error", function(e) {
            t.emit("error", e, t.container);
        });
        t.polling.on("success", function(e) {
            t.emit("success", e, t.container);
        });
        t.el.on("scroll", function(e) {
            t.el.scrollTop() + t.el.height() >= t.container.height() && t.emit("pullup");
        });
    };
    i.prototype.setData = function(t) {
        var e = this;
        e.polling.setData(t);
    };
    i.prototype.destroy = function() {
    };
    i.prototype.html = function(t) {
        var e = this;
        e.container.html(t);
    };
    i.prototype.prepend = function(t) {
        var e = this;
        e.container.prepend(t);
    };
    i.prototype.append = function(t) {
        var e = this;
        e.container.append(t);
    };
    i.prototype.start = function() {
        var t = this;
        t.polling.start();
    };
    i.prototype.stop = function() {
        var t = this;
        t.polling.stop();
    };
    i.prototype.clear = function() {
        var t = this;
        t.container.html("");
    };
    i.prototype.scrollTo = function(t) {
        var e = this;
        e.el.stop().animate({
            scrollTop: t || 0
        });
    };
    n.exports = i;
});

!function() {
    function t(t) {
        return t.replace(b, "").replace(A, ",").replace(_, "").replace(x, "").replace(w, "").split(j);
    }
    function e(t) {
        return "'" + t.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
    }
    function n(n, i) {
        function r(t) {
            return p += t.split(/\n/).length - 1, c && (t = t.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), 
            t && (t = y[1] + e(t) + y[2] + "\n"), t;
        }
        function o(e) {
            var n = p;
            if (u ? e = u(e, i) : a && (e = e.replace(/\n/g, function() {
                return p++, "$line=" + p + ";";
            })), 0 === e.indexOf("=")) {
                var r = f && !/^=[=#]/.test(e);
                if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), r) {
                    var o = e.replace(/\s*\([^\)]+\)/, "");
                    d[o] || /^(include|print)$/.test(o) || (e = "$escape(" + e + ")");
                } else e = "$string(" + e + ")";
                e = y[1] + e + y[2];
            }
            return a && (e = "$line=" + n + ";" + e), g(t(e), function(t) {
                if (t && !v[t]) {
                    var e;
                    e = "print" === t ? A : "include" === t ? _ : d[t] ? "$utils." + t : h[t] ? "$helpers." + t : "$data." + t, 
                    x += t + "=" + e + ",", v[t] = !0;
                }
            }), e + "\n";
        }
        var a = i.debug, l = i.openTag, s = i.closeTag, u = i.parser, c = i.compress, f = i.escape, p = 1, v = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, m = "".trim, y = m ? [ "$out='';", "$out+=", ";", "$out" ] : [ "$out=[];", "$out.push(", ");", "$out.join('')" ], b = m ? "$out+=text;return $out;" : "$out.push(text);", A = "function(){var text=''.concat.apply('',arguments);" + b + "}", _ = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + b + "}", x = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0," : ""), w = y[0], j = "return new String(" + y[3] + ");";
        g(n.split(l), function(t) {
            t = t.split(s);
            var e = t[0], n = t[1];
            1 === t.length ? w += r(e) : (w += o(e), n && (w += r(n)));
        });
        var $ = x + w + j;
        a && ($ = "try{" + $ + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + e(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var E = new Function("$data", "$filename", $);
            return E.prototype = d, E;
        } catch (T) {
            throw T.temp = "function anonymous($data,$filename) {" + $ + "}", T;
        }
    }
    var i = function(t, e) {
        return "string" == typeof e ? m(e, {
            filename: t
        }) : a(t, e);
    };
    i.version = "3.0.0", i.config = function(t, e) {
        r[t] = e;
    };
    var r = i.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, o = i.cache = {};
    i.render = function(t, e) {
        return m(t, e);
    };
    var a = i.renderFile = function(t, e) {
        var n = i.get(t) || v({
            filename: t,
            name: "Render Error",
            message: "Template not found"
        });
        return e ? n(e) : n;
    };
    i.get = function(t) {
        var e;
        if (o[t]) e = o[t]; else if ("object" == typeof document) {
            var n = document.getElementById(t);
            if (n) {
                var i = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
                e = m(i, {
                    filename: t
                });
            }
        }
        return e;
    };
    var l = function(t, e) {
        return "string" != typeof t && (e = typeof t, "number" === e ? t += "" : t = "function" === e ? l(t.call(t)) : ""), 
        t;
    }, s = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, u = function(t) {
        return s[t];
    }, c = function(t) {
        return l(t).replace(/&(?![\w#]+;)|[<>"']/g, u);
    }, f = Array.isArray || function(t) {
        return "[object Array]" === {}.toString.call(t);
    }, p = function(t, e) {
        var n, i;
        if (f(t)) for (n = 0, i = t.length; i > n; n++) e.call(t, t[n], n, t); else for (n in t) e.call(t, t[n], n);
    }, d = i.utils = {
        $helpers: {},
        $include: a,
        $string: l,
        $escape: c,
        $each: p
    };
    i.helper = function(t, e) {
        h[t] = e;
    };
    var h = i.helpers = d.$helpers;
    i.onerror = function(t) {
        var e = "Template Error\n\n";
        for (var n in t) e += "<" + n + ">\n" + t[n] + "\n\n";
        "object" == typeof console && console.error(e);
    };
    var v = function(t) {
        return i.onerror(t), function() {
            return "{Template Error}";
        };
    }, m = i.compile = function(t, e) {
        function i(n) {
            try {
                return new s(n, l) + "";
            } catch (i) {
                return e.debug ? v(i)() : (e.debug = !0, m(t, e)(n));
            }
        }
        e = e || {};
        for (var a in r) void 0 === e[a] && (e[a] = r[a]);
        var l = e.filename;
        try {
            var s = n(t, e);
        } catch (u) {
            return u.filename = l || "anonymous", u.name = "Syntax Error", v(u);
        }
        return i.prototype = s.prototype, i.toString = function() {
            return s.toString();
        }, l && e.cache && (o[l] = i), i;
    }, g = d.$each, y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", b = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, A = /[^\w$]+/g, _ = new RegExp([ "\\b" + y.replace(/,/g, "\\b|\\b") + "\\b" ].join("|"), "g"), x = /^\d[^,]*|,\d[^,]*/g, w = /^,+|,+$/g, j = /^$|,+/;
    r.openTag = "{{", r.closeTag = "}}";
    var $ = function(t, e) {
        var n = e.split(":"), i = n.shift(), r = n.join(":") || "";
        return r && (r = ", " + r), "$helpers." + i + "(" + t + r + ")";
    };
    r.parser = function(t) {
        t = t.replace(/^\s/, "");
        var e = t.split(" "), n = e.shift(), r = e.join(" ");
        switch (n) {
          case "if":
            t = "if(" + r + "){";
            break;

          case "else":
            e = "if" === e.shift() ? " if(" + e.join(" ") + ")" : "", t = "}else" + e + "{";
            break;

          case "/if":
            t = "}";
            break;

          case "each":
            var o = e[0] || "$data", a = e[1] || "as", l = e[2] || "$value", s = e[3] || "$index", u = l + "," + s;
            "as" !== a && (o = "[]"), t = "$each(" + o + ",function(" + u + "){";
            break;

          case "/each":
            t = "});";
            break;

          case "echo":
            t = "print(" + r + ");";
            break;

          case "print":
          case "include":
            t = n + "(" + e.join(",") + ");";
            break;

          default:
            if (/^\s*\|\s*[\w\$]/.test(r)) {
                var c = !0;
                0 === t.indexOf("#") && (t = t.substr(1), c = !1);
                for (var f = 0, p = t.split("|"), d = p.length, h = p[f++]; d > f; f++) h = $(h, p[f]);
                t = (c ? "=" : "=#") + h;
            } else t = i.helpers[n] ? "=#" + n + "(" + e.join(",") + ");" : "=" + t;
        }
        return t;
    }, "function" == typeof define ? define("template", [], function() {
        return i;
    }) : "undefined" != typeof exports ? module.exports = i : this.template = i;
}();

define("module/monitor/1.0.0/question", [ "require", "exports", "module", "jquery", "./../../../plugins/polling-list/1.0.0/polling-list", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "template" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this;
        n.el = r(t);
        if (0 == n.el.length) throw new Error("the param [el] is required.");
        var i = {
            pollingAjax: {
                url: null,
                type: "get",
                data: null
            },
            pagerAjax: {
                url: null,
                type: "get",
                data: null
            }
        };
        n.options = r.extend(!0, {}, i, e);
        n._isPulling = !1;
        n._init();
        n._initEvent();
        n.max = 0;
    }
    var r = t("jquery"), o = t("./../../../plugins/polling-list/1.0.0/polling-list"), a = t("lib/core/1.0.0/io/request"), l = t("lib/core/1.0.0/event/emitter"), s = t("lib/core/1.0.0/utils/util"), u = t("template");
    s.inherits(i, l);
    i.prototype._init = function() {
        var t = this;
        t.pollingList = new o(t.el, {
            ajax: t.options.pollingAjax,
            data: {
                id: t.max
            }
        });
        t._loadingHtml();
    };
    i.prototype._initEvent = function() {
        var t = this, e = (t.options, t.options.pagerAjax);
        t.pollingList.on("error", function(t) {});
        t.pollingList.on("success", function(e) {
            if (e && e.data && e.data.resultList && e.data.resultList.length > 0) {
                t.pollingList.html(t.template(e.data));
                t.pollingList.setData({
                    id: e.data.resultList[0].id
                });
            }
            t.scrollTo(0);
        });
        t.el.on("mouseenter", function() {
            t.stop();
        });
        t.el.on("mouseleave", function() {
            t.start();
        });
        t.pollingList.on("pullup", function(n) {
            if (!t._isPulling) {
                t._isPulling = !0;
                a[e.type](e.url, e.data, function(e) {
                    t._isPulling = !1;
                    t.pollingList.append(t.template(e.data));
                }, function(e) {
                    t._isPulling = !1;
                });
            }
        });
    };
    i.prototype._loadingHtml = function() {
        var t = this, e = "";
        e += '<div class="ui-loading-list">';
        e += '<div class="img-loading"></div>';
        e += '\t<div class="txt">';
        e += "\t正在卖力加载，请稍后";
        e += "  </div>";
        e += "</div>";
        t.pollingList.html(e);
    };
    i.prototype.start = function() {
        var t = this;
        t.pollingList.start();
    };
    i.prototype.stop = function() {
        var t = this;
        t.pollingList.stop();
    };
    i.prototype.clear = function() {
        var t = this;
        t.pollingList.container.html("");
    };
    i.prototype.destroy = function() {
    };
    i.prototype.scrollTo = function(t) {
        var e = this;
        e.pollingList.scrollTo(t);
    };
    i.prototype.template = function(t) {
        return u("tQuestion", t);
    };
    n.exports = i;
});

define("conf/polling-list", [ "require", "exports", "module", "jquery", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer", "module/monitor/1.0.0/question" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), r = t("module/top-search/1.0.0/top-search"), o = t("module/login-status/1.0.0/login-status"), a = t("module/fix-bar/1.0.0/fix-bar"), l = t("module/footer/1.0.0/footer"), s = (new r(), 
    new o(), new a(), new l(), t("module/monitor/1.0.0/question")), u = new s("#jPollingList1", {
        pollingAjax: {
            url: $PAGE_DATA.baseStaticUrl + "/source/api/demo/demo.json"
        },
        pagerAjax: {
            url: $PAGE_DATA.baseStaticUrl + "/source/api/demo/demo.json"
        }
    }), c = i("#jAddRecord1"), f = i("#jAddRecord2"), p = i("#jStart1"), d = i("#jStop1"), h = i("#jClear1"), v = 0;
    c.on("click", function() {
        u.prepend('<div class="item">我是追加内容</div>');
    });
    p.on("click", function() {
        u.start();
    });
    d.on("click", function() {
        u.stop();
    });
    h.on("click", function() {
        u.clear();
    });
    f.on("click", function() {
        pollingList2.add('<div class="item">' + v++ + "</div>");
        pollingList2.scrollTo(0);
    });
});