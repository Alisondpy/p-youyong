/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*!
SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

/*!
SWFUpload: http://www.swfupload.org, http://swfupload.googlecode.com

mmSWFUpload 1.0: Flash upload dialog - http://profandesign.se/swfupload/,  http://www.vinterwebb.se/

SWFUpload is (c) 2006-2007 Lars Huring, Olov Nilzén and Mammon Media and is released under the MIT License:
http://www.opensource.org/licenses/mit-license.php

SWFUpload 2 is (c) 2007-2008 Jake Roberts and is released under the MIT License:
http://www.opensource.org/licenses/mit-license.php

----------

Last modified by Allex Wang <alllex.wxn@gmail.com> (2016/07)

- UMD modularlify
- Fix swfupload #.destroy() performance issues and call eval indirectly

----------

GistID:
GistURL:
*/

/*
Uploadify v3.2.1
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
Last modified by Allex Wang (allex.wxn@gmail.com)
*/

/*!
 * jQuery Validation Plugin v1.15.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */

// Copyright (c) 2010-2013 Diego Perini, MIT licensed

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
        for (var n in e) f.call(e, n) && t(e[n], n, e);
    }
    function s(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? r(e, t) : a(e, t);
    }
    function l(e, t) {
        for (var n = -1, i = e.length, o = Array(i); ++n < i; ) o[n] = t(e[n], n, e);
        return o;
    }
    function u(e, t) {
        var n = [];
        s(e, function(e, i, o) {
            n.push(t(e, i, o));
        });
        return n;
    }
    function d(e, t) {
        if (!t || !i(t)) return e;
        for (var n = g(t), o = n.length; o--; ) e[n[o]] = t[n[o]];
        return e;
    }
    function c(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = {}, i = e.split("&"), o = -1, r = i.length; ++o < r; ) {
            t = i[o].split("=");
            n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return n;
    }
    var p = new Function("return this")(), f = Object.prototype.hasOwnProperty, h = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, m = function() {
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
    }, v = "function" == typeof Object.create ? function(e, t) {
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
    }(), b = p.console || (p.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(e) {
        b[e] || (b[e] = o);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), i = n.length, o = -1; ++o < i; ) d(e, n[o]);
        return e;
    };
    t.inherits = function(e, t, n) {
        v(e, t);
        n && d(e.prototype, n);
    };
    t.impls = function(e, n) {
        n = "function" == typeof n ? n.prototype : n;
        t.mix(e.prototype, n);
        return e;
    };
    t.parseQuery = c;
    t.parseParams = c;
    t.each = s;
    t.map = function(e, t) {
        var n = h(e) ? l : u;
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
    t.mix = function y(e, t, n, i, o) {
        for (var r in t) t.hasOwnProperty(r) && (t[r] && e[r] && n && "object" == typeof t[r] ? y(e[r], t[r], n, i, o) : (void 0 === e[r] || i) && (o && !o(e[r], t[r]) || (e[r] = t[r])));
        return e;
    };
    t.guid = m;
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
            var i = m();
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
            var r = i || this, a = arguments, s = function() {
                o = null;
                n || e.apply(r, a);
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
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
        return e.replace(s, "ms-").replace(l, u);
    }
    function o(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : d.test(e) ? a.parseJSON(e) : e);
        } catch (t) {}
    }
    function r(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType) {
            i = "data-" + t.replace(c, "-$&").toLowerCase();
            n = e.getAttribute(i);
            "string" != typeof n && (n = void 0);
        }
        return n;
    }
    var a = (window.document, e("jquery")), s = /^-ms-/, l = /-([\da-z])/gi, u = function(e, t) {
        return t.toUpperCase();
    }, d = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, c = /[A-Z]/g, p = function(e, t, n) {
        if (!e || 1 !== e.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, s, l, u;
        if (1 === arguments.length) {
            if (l = e.dataset) {
                u = {};
                for (s in l) l.hasOwnProperty(s) && (u[s] = o(l[s]));
                return u;
            }
            l = e.attributes;
            a = l.length;
            u = {};
            for (;a--; ) if (l[a]) {
                s = l[a].name;
                if (0 === s.indexOf("data-")) {
                    s = i(s.slice(5));
                    u[s] = o(r(e, s));
                }
            }
            return u;
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
        var a, s, l, u, d, c = function(e) {
            if (n) for (var o in n) l[o] = r(n[o].toString(), e); else {
                l = {};
                u = r("[node-type]", e);
                for (var a, s = -1, d = u.length; ++s < d; ) {
                    a = u[s];
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
            s = o.createDocumentFragment();
            for (;d = a.firsChild; ) s.appendChild(d);
        } else {
            a = r(e);
            s = a[0];
        }
        c(a);
        return {
            get: p,
            box: s,
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
                var a = n.expires, s = n.expires = new Date();
                s.setTime(s.getTime() + 864e5 * a);
            }
            var l = function(e) {
                try {
                    return n.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return i.cookie = [ l(e), "=", l(t), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, u = i.cookie, d = function(e) {
            return n.raw ? e : decodeURIComponent(e);
        }, c = u ? u.split("; ") : [], p = -1, f = c.length, h = e.length + 1; ++p < f; ) {
            u = o(c[p]);
            if (u.substring(0, h) === e + "=") {
                t = d(u.substring(h));
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
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
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
    }, a = window, s = e(a), l = a.Image, u = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), d = "__lazy_status__", c = 0, p = 1, f = 2, h = function(e) {
        return e[d] === t;
    }, m = function() {
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
    m.define("image", function(n, i, o, r) {
        if (i) {
            var a = new l(), s = function() {
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
    m.define("html", function(e, t, n, i) {
        i();
    });
    var g = function(t, l) {
        l = l || {};
        t = e(t);
        var g = this, x = {
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
        var w = l.type || x.type, E = m.get(w);
        if ("function" != typeof E) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (x.placeholder = "");
        l && e.extend(x, l);
        var C = x.container, S = x.event, q = 0 === S.indexOf("scroll"), A = C && C !== a ? e(C) : s, T = function(t) {
            var i = g._list;
            if (i.length > 0) {
                var o = 0;
                n(i.slice(0), function(t, n) {
                    var i = e(n);
                    if (!x.skipInvisible || i.is(":visible")) if (y(n, x) || _(n, x)) ; else if (v(n, x) || b(n, x)) {
                        if (++o > x.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        o = 0;
                    }
                });
            } else g.reset();
        }, D = function() {
            g._list = i(g._list, function(e) {
                return !e[d];
            });
        }, k = function() {
            var t = this, n = e(t), i = n.attr("data-" + x.dataAttribute), o = x.sourceMaker, r = x.appear, a = x.loadingClass, s = t[d];
            if (s === c) {
                t[d] = p;
                a && n.addClass(a);
                o && (i = o(i, t));
                r && r.apply(g, [ t, i ]);
                E.call(g, t, i, x, function(e, o) {
                    if (!g._destroyed) {
                        a && n.removeClass(a);
                        if (e) setTimeout(function() {
                            t[d] = c;
                            g.emit("lazyItemError", t, i, e);
                            t = null;
                        }, 300); else {
                            t[d] = f;
                            D();
                            g.emit("lazyItemReady", t, i, o);
                            var r = x.load;
                            r && r.apply(g, [ t, i, o ]);
                            t = null;
                        }
                        n = null;
                    }
                });
            } else if (s === f) {
                D();
                g.emit("lazyItemReady", t, i);
            }
        }, I = function() {
            this[d] || e(this).trigger("appear");
        }, L = function(t) {
            var n = e(t);
            t[d] = c;
            var i = x.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === g._.type || n.children()[0] || n.html(i);
            n.on("appear", k);
            q || n.on(S, I);
            g._list.push(t);
        }, R = function(e) {
            e = i(e || [], h);
            if (e.length) {
                n(e, function(e, t) {
                    L(t);
                });
                g._inited || U(g);
            }
        }, U = function(t) {
            if (!t._inited) {
                var i = o(T, 30);
                t._inited = !0;
                q && A.on(S, i);
                s.on("resize", i);
                if (u) {
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
                        F(t);
                    });
                    q && A.off(S, i);
                    s.off("resize", i);
                });
                e(document).ready(T);
            }
        }, F = function(t) {
            var n = e(t);
            n.off("appear", k);
            q || n.off(S, I);
        };
        g.on("lazyItemReady", function(e) {
            F(e);
        });
        g.once("destroy", function() {
            R = null;
            T = null;
            D = null;
            k = null;
            I = null;
        });
        g._ = x;
        g._list = [];
        g.add = function(t) {
            var n = e(t);
            n.length > 0 && R(n);
        };
        g.update = T;
        R(t);
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
        return m.define(e, t);
    };
    var v = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top + e(o).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return i <= e(t).offset().top - n.threshold;
    }, b = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left + e(o).width() : s.width() + s.scrollLeft();
        return i <= e(t).offset().left - n.threshold;
    }, y = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().top : s.scrollTop();
        return i >= e(t).offset().top + n.threshold + e(t).height();
    }, _ = function(t, n) {
        var i, o = n.container;
        i = o && o !== a ? e(o).offset().left : s.scrollLeft();
        return i >= e(t).offset().left + n.threshold + e(t).width();
    }, x = function(e, t) {
        return !(b(e, t) || _(e, t) || v(e, t) || y(e, t));
    };
    g.belowthefold = v;
    g.rightoffold = b;
    g.abovethetop = y;
    g.leftofbegin = _;
    g.inviewport = x;
    return g;
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

define("module/uc/left-menu/left-menu", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            selector: "#jLeftMenu",
            activeClass: "focus"
        };
        t.options = o.extend(!0, {}, n, e);
        t.el = o(t.options.selector);
        var i = r.build(t.el, !1);
        t.itemLevel1s = i.get("itemLevel1");
        t.txtLevel1s = i.get("txtLevel1");
        t.menuLevel2s = i.get("menuLevel2");
        t._init();
        t._initEvent();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/dom/build");
    i.prototype._initEvent = function() {
        var e = this;
        e.txtLevel1s.on("click", function(t) {
            t.preventDefault();
            var n = o(this), i = n.parent(), a = r.build(i, !1), s = a.get("menuLevel2");
            if (s) if (i.hasClass("active")) s.slideUp(function() {
                i.removeClass("active");
            }); else {
                e.menuLevel2s.slideUp();
                s.slideDown(function() {
                    e.itemLevel1s.removeClass("active");
                    i.addClass("active");
                });
            } else window.location.href = n.attr("href");
        });
    };
    i.prototype._init = function() {
        var e = this;
        e.el.find(".jItemLevel2").each(function() {
            var e = o(this);
            e.hasClass("active") && e.parent().parent(".jItemLevel1").addClass("active");
        });
    };
    n.exports = i;
});

define("conf/uc/common", [ "require", "exports", "module", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/footer/1.0.0/footer", "module/uc/left-menu/left-menu" ], function(e, t, n) {
    "use strict";
    var i = e("module/top-search/1.0.0/top-search"), o = e("module/login-status/1.0.0/login-status"), r = e("module/footer/1.0.0/footer"), a = (new i(), 
    new o(), new r(), e("module/uc/left-menu/left-menu"));
    new a();
});

define("lib/core/1.0.0/utils/form", [ "require", "exports", "module", "jquery" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return u.createElement(e);
    }
    function o(e) {
        return "number" == typeof e || "string" == typeof e && isNaN(parseFloat(e));
    }
    function r(e, t) {
        var n = typeof e;
        switch (n) {
          case "number":
            return isFinite(e);

          case "null":
          case "undefined":
            return !1;

          default:
            return n && (!t || "" !== e);
        }
    }
    function a(e) {
        var t = a.d || (a.d = i("i"));
        t.innerHTML = e;
        return t.innerText || t.textContent;
    }
    function s(e) {
        for (var t, n = e.length; n--; ) {
            t = e[n];
            r(t) || e.splice(n, 1);
        }
        return e;
    }
    var l = e("jquery"), u = window.document, d = l.trim, c = "placeholder" in i("input"), p = "[]", f = /INPUT|TEXTAREA|SELECT/, h = function(e, t, n) {
        l(e).find("[name]").each(function(e, i) {
            var o = l(i).attr("name"), s = t[o];
            if (o.indexOf("[") > -1) {
                var u = o.replace(/\]/g, "").split("["), e = 0, d = null;
                s = t;
                for (;d = u[e++]; ) {
                    if (!s[d]) {
                        s = void 0;
                        break;
                    }
                    s = s[d];
                }
            }
            if (!r(s)) {
                if (n !== !0) return;
                s = "";
            }
            "string" == typeof s && s.indexOf("&") > -1 && (s = a(s));
            s = String(s);
            if ("radio" === i.type) i.checked = i.value === s; else if ("checkbox" === i.type) i.checked = s; else if (c) i.value = s; else {
                var p = l(i);
                i.value !== s && "" !== s && p.data("changed", !0);
                "" === s ? p.data("changed", !1).val(p.attr("placeholder")) : i.value = s;
            }
        });
    }, m = function(e, t) {
        var n = {}, i = !1, r = l(e).get(), a = r[0];
        if (!a) return n;
        "FORM" === a.nodeName && (r = a.elements);
        if ("boolean" == typeof t) {
            i = t;
            t = {};
        } else {
            t = t || {};
            i = t.convert;
            i = void 0 !== i && i;
        }
        t.semantic && (r = a.getElementsByTagName("*"));
        if (!r.length) return n;
        l.each(r, function(e, r) {
            var a = r.type && r.type.toLowerCase();
            if ("submit" !== a && r.name && !r.disabled) {
                var u = l(r), c = r.name, h = f.test(r.tagName) ? u.val() : u.attr("value") || "";
                if ("radio" !== r.type || r.checked) {
                    "checkbox" === r.type && (h = r.checked);
                    u.data("changed") !== !0 && h === u.attr("placeholder") && (h = "");
                    if (i) {
                        if (o(h)) {
                            var m = parseFloat(h), g = m + "";
                            h.indexOf(".") > 0 && (g = m.toFixed(h.split(".")[1].length));
                            g === h && (h = m);
                        } else "true" === h ? h = !0 : "false" === h && (h = !1);
                        "" === h && (h = void 0);
                    }
                    "string" != typeof h || t.raw || (h = d(h));
                    for (var v, b = n, y = t.nameSep || p, _ = s(c.split(y)), x = c.indexOf("[]") === c.length - 2, e = -1, w = _.length - 1; ++e < w; ) {
                        b[_[e]] || (b[_[e]] = {});
                        b = b[_[e]];
                    }
                    v = _[_.length - 1];
                    if (x || b[v]) {
                        b[v] instanceof Array || (b[v] = void 0 === b[v] ? [] : [ b[v] ]);
                        b[v].push(h);
                    } else b[v] || (b[v] = h);
                }
            }
        });
        return n;
    };
    t.serializeForm = m;
    t.setFormData = h;
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(e) {
    "use strict";
    var t = e("jquery"), n = t(window), i = t(document), o = "createTouch" in document, r = document.documentElement, a = !("minWidth" in r.style), s = !a && "onlosecapture" in r, l = "setCapture" in r, u = t.noop, d = {
        start: o ? "touchstart" : "mousedown",
        over: o ? "touchmove" : "mousemove",
        end: o ? "touchend" : "mouseup"
    }, c = o ? function(e) {
        e.touches || (e = e.originalEvent.touches.item(0));
        return e;
    } : function(e) {
        return e;
    }, p = function() {
        this.start = t.proxy(this.start, this);
        this.over = t.proxy(this.over, this);
        this.end = t.proxy(this.end, this);
        this.onstart = this.onover = this.onend = u;
    };
    p.types = d;
    p.prototype = {
        start: function(e) {
            e = this.startFix(e);
            i.on(d.over, this.over).on(d.end, this.end);
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
            i.off(d.over, this.over).off(d.end, this.end);
            this.onend(e);
            return !1;
        },
        startFix: function(e) {
            e = c(e);
            this.target = t(e.target);
            this.selectstart = function() {
                return !1;
            };
            i.on("selectstart", this.selectstart).on("dblclick", this.end);
            s ? this.target.on("losecapture", this.end) : n.on("blur", this.end);
            l && this.target[0].setCapture();
            return e;
        },
        overFix: function(e) {
            e = c(e);
            return e;
        },
        endFix: function(e) {
            e = c(e);
            i.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            l && this.target[0].releaseCapture();
            return e;
        }
    };
    p.create = function(e, o, r) {
        r = t.extend({
            hook: null,
            onstart: u,
            onover: u,
            onend: u
        }, r);
        var a, s, l, d, c = t(e), f = r.hook ? t(r.hook) : c, h = new p(), m = p.types.start, g = e.className.replace(/^\s|\s.*/g, "") + "-drag-start", v = {
            off: function() {
                f.off(m, h.start);
            }
        };
        h.onstart = function(t) {
            var o = "fixed" === c.css("position"), u = i.scrollLeft(), p = i.scrollTop(), f = c.width(), h = c.height();
            a = 0;
            s = 0;
            l = o ? n.width() - f + a : i.width() - f;
            d = o ? n.height() - h + s : i.height() - h;
            var m = c.offset(), v = this.startLeft = o ? m.left - u : m.left, b = this.startTop = o ? m.top - p : m.top;
            this.clientX = t.clientX;
            this.clientY = t.clientY;
            c.addClass(g);
            r.onstart.call(e, t, v, b);
        };
        h.onover = function(t) {
            var n = t.clientX - this.clientX + this.startLeft, i = t.clientY - this.clientY + this.startTop, o = c[0].style;
            n = Math.max(a, Math.min(l, n));
            i = Math.max(s, Math.min(d, i));
            o.left = n + "px";
            o.top = i + "px";
            r.onover.call(e, t, n, i);
        };
        h.onend = function(t) {
            var n = c.position(), i = n.left, o = n.top;
            c.removeClass(g);
            r.onend.call(e, t, i, o);
        };
        h.off = function() {
            f.off(m, h.start);
        };
        o ? h.start(o) : f.on(m, h.start);
        return v;
    };
    return p;
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
        if (t) for (var r, a, s, l = -1, u = {
            type: e,
            timeStamp: d()
        }; r = t[++l]; ) {
            a = r[m];
            s = r[g] || i;
            try {
                o = r[v] === h ? a.call(s, u, n) !== !1 && o : a.apply(s, n) !== !1 && o;
            } catch (c) {
                setTimeout(function() {
                    console.error(c);
                }, 1);
            }
        }
        return o;
    }
    function r(e) {
        var t, n = p(this);
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
    function l(e, t) {
        e.forEach ? e.forEach(t) : function(e) {
            for (var n = -1, i = e.length; ++n < i; ) t(e[n], n);
        }(e);
    }
    var u = /\s+/, d = Date.now || function() {
        return +new Date();
    }, c = function() {
        return d() * Math.random() & 65535;
    }(), p = function() {
        var e, t, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, n) {
            var i = e.get(t);
            return null === n ? void 0 !== i && e["delete"](t) : !i && n ? (e.set(t, i = {}), 
            i) : i;
        }) : (t = d(), n = "__$widΦ" + t.toString(36), e = {}, function(i, o) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === o ? i[n] && (delete e[i[n]], delete i[n]) : (r = i[n] || o && (r = ++t, 
            e[r] = {}, i[n] = r), r && e[r]);
        });
    }(), f = 1, h = 2, m = 0, g = 1, v = 2, b = function(e, t, n) {
        var i = [];
        i[m] = e;
        i[g] = t;
        i[v] = n;
        return i;
    }, y = i.prototype;
    y.addListener = function(e, t, n, i) {
        var o, r, a, s = f;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
            s = h;
        }
        if (!t) return this;
        o = p(this, 1);
        e = e.split(u);
        for (;r = e.shift(); ) {
            a = !i && o[r] || (o[r] = []);
            a.push(b(t, n, s));
        }
        return this;
    };
    y.on = y.addListener;
    y.once = function(e, t, n) {
        var i = !1, o = function() {
            this.removeListener(e, o);
            if (!i) {
                i = !0;
                t.apply(n || this, arguments);
            }
        };
        o.guid = t.guid || (t.guid = c++);
        return this.on(e, o);
    };
    y.removeListener = function(e, t, n) {
        var i, o, r, a, l, d;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
        }
        if (!(i = p(this))) return this;
        if (!(e || t || n)) {
            s(i, function(e, t) {
                delete i[t];
            });
            p(this, null);
            return this;
        }
        e = e ? e.split(u) : _(i);
        for (;o = e.shift(); ) {
            r = i[o];
            if (r) if (t || n) for (a = r.length; --a >= 0; ) {
                l = r[a];
                d = l[m];
                t && d !== t && (void 0 === d.guid || d.guid !== t.guid) || n && l[g] !== n || r.splice(a, 1);
            } else delete i[o];
        }
        return this;
    };
    y.un = y.removeListener;
    y.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    y.emit = function(e) {
        var t, n, i, r, a, s, l = [], d = !0;
        if (!(t = p(this))) return this;
        e = e.split(u);
        for (a = 1, s = arguments.length; a < s; a++) l[a - 1] = arguments[a];
        for (;n = e.shift(); ) {
            (i = t.all) && (i = i.slice());
            (r = t[n]) && (r = r.slice());
            "all" !== n && (d = o(n, r, l, this) && d);
            d = o(n, i, [ n ].concat(l), this) && d;
        }
        return d;
    };
    i.applyTo = function(e) {
        function t(t, i) {
            e[t] = function() {
                var o = n[t].apply(i || e, Array.prototype.slice.call(arguments));
                return o === i ? this : o;
            };
        }
        var n = y, i = _(n);
        a(e) ? l(i, function(t) {
            e.prototype[t] = n[t];
        }) : l(i, function(e) {
            t(e);
        });
    };
    i.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : r.call(e, t);
    };
    y.listenerCount = r;
    var _ = Object.keys || function(e) {
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
        var n, i, r, a = t.currentTarget, s = o(a), l = (t.handleObj || 0).origType || t.type;
        if (!t.isPropagationStopped()) {
            if (!s.attr("disabled") && (n = s.attr("action-type"))) {
                i = s.attr("action-data");
                t.action = n;
                t.data = i;
                r = e.e.emit(l + u + n, t, a);
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
    var o = e("jquery"), r = e("../event/emitter"), a = /\S+/g, s = -1, l = (+new Date()).toString(36), u = "/", d = function() {
        return l + ++s;
    }, c = function(e, t) {
        var n = e.guid || (e.guid = d()), i = function(n, i) {
            return e.call(t || i, n);
        };
        i.guid = n;
        return i;
    }, p = function() {}, f = function(e, t) {
        return "function" == typeof e ? e : t;
    }, h = function(e, t) {
        t = t || {};
        "string" == typeof e && (e = o(e)[0]);
        var n = {}, s = {}, l = new r(), d = t.context, h = {
            o: n,
            opts: t,
            e: l
        }, m = function(e) {
            return i(h, e);
        };
        t.onDelegate = f(t.onDelegate, p);
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
                    o(e).on(t, "[action-type]", m);
                }
                l.on(t + u + n[r], c(i, d));
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
                r = t + u + n[s];
                l.un(r, i);
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
            l.emit(t + u + n, r, i);
        };
        n.destroy = function() {
            var i = o(e);
            o.each(s, function(e, t) {
                delete s[e];
                i.off(e, "[action-type]", m);
            });
            l.un();
            for (var r in n) delete n[r];
            l = void 0;
            t = void 0;
            s = i = e = void 0;
            m = null;
        };
        return n;
    };
    n.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return u("<" + e + "/>")[0];
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
    function l(e, t, n, i, o) {
        var r, a, l = u(e), d = arguments, o = "boolean" == typeof d[d.length - 1] && d[d.length - 1], h = !1, m = function() {
            g();
        }, g = function(e) {
            h || v(!0);
        }, v = function(e) {
            if (!h) {
                h = !0;
                g = c;
                l.off(b, m);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                l.removeClass(a);
                e && i();
                l = null;
            }
        };
        if ("function" == typeof n) {
            i = n;
            n = void 0;
        }
        i = i || c;
        if (f) {
            n = n || "normal";
            t = t || "shake";
            a = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + t ].join(" ");
            l.on(b, m);
            r = setTimeout(m, s(n) + 100);
            o === !0 ? p(function() {
                l.addClass(a);
            }) : l.addClass(a);
        } else p(function() {
            i && i();
        });
        return {
            stop: function() {
                v.apply(null, arguments);
                return this;
            }
        };
    }
    var u = e("jquery"), d = e("./util"), c = (d.each, d.noop), p = d.setImmediate, f = a(), h = /\-v\-/g, m = document.getElementsByTagName("head")[0].appendChild(i("style")), g = m.sheet || m.styleSheet, v = {
        ".ui-animated": "-v-animation-fill-mode: both;",
        ".ui-animated.ui-speed-normal": "-v-animation-duration: 0.5s;",
        ".ui-animated.ui-speed-fast": "-v-animation-duration: 0.2s;",
        ".ui-animated.ui-speed-slow": "-v-animation-duration: 1s;"
    }, b = {
        "-webkit-": "webkitAnimationEnd",
        "-moz-": "animationend",
        "-o-": "OAnimationEnd",
        "-ms-": "msAnimationEnd",
        "": "animationend"
    }[f];
    d.each(v, function(e, t) {
        e && o(g, t, e.replace(h, f));
    });
    t.effect = l;
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
        t._ = e = _(n, e);
        e.fixed = !!e.fixed && q();
        var r = o('<div class="' + m + '" id="' + (e.id || y()) + '" />').css({
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
                r.addClass(m + "-modal");
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
                q() || _(n, {
                    position: "absolute",
                    width: d.width() + "px",
                    height: c.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", w(t.focus, t));
                t._shadow = a.clone(!0);
                a.css(n).addClass(m + "-mask");
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
            var s = w(t.resize, t);
            t.on("render", function() {
                d.on("resize", s);
            });
            t.on("destroy", function() {
                d.off("resize", s);
            });
        }
        t.destroyed = !1;
        t.initialized = !0;
    }
    var o = e("jquery"), r = e("../../../core/1.0.0/utils/util"), a = e("../../../core/1.0.0/utils/css"), s = e("../../../core/1.0.0/event/emitter"), l = window, u = l.document, d = o(l), c = o(u), p = u.documentElement, f = /\S+/g, h = !("minWidth" in p.style), m = "ui-layer", g = l.Math, v = g.max, b = g.ceil, y = r.guid, _ = r.extend, x = r.each, w = function(e, t) {
        return e.bind ? e.bind(t) : function() {
            return e.apply(t, arguments);
        };
    }, E = r.setImmediate, C = function(e) {
        return l.parseInt(e, 10) || 0;
    }, S = function(e) {
        return e && 1 === e.nodeType;
    }, q = function() {
        return q._ || (q._ = function() {
            var e = u.createElement("div"), t = e.cloneNode(!1), n = !1, i = u.body || function() {
                n = !0;
                return p.appendChild(u.createElement("body"));
            }();
            e.style.cssText = "position:fixed;top:42px";
            i.appendChild(e);
            i.appendChild(t);
            var o = e.offsetTop !== t.offsetTop;
            i.removeChild(e);
            i.removeChild(t);
            n && p.removeChild(i);
            e = t = null;
            return o;
        }());
    }, A = function() {
        return {
            x: c.scrollLeft(),
            y: c.scrollTop()
        };
    }, T = function(e) {
        return {
            w: e.width(),
            h: e.height()
        };
    }, D = function() {
        return T(d);
    }, k = function(e) {
        var t = S(e), n = t ? o(e).offset() : {
            left: e.pageX,
            top: e.pageY
        };
        e = t ? e : e.target;
        var i = e.ownerDocument;
        if (i === l.document) return n;
        var r = i.defaultView || i.parentWindow, a = r.frameElement, s = A(), u = o(a).offset();
        return {
            left: n.left + u.left - s.x,
            top: n.top + u.top - s.y
        };
    }, I = function(e, t) {
        if (e.length) {
            var n = C(e.css(t)) || e[0]["offset" + t.charAt(0).toUpperCase() + t.slice(1)], i = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            x(i[t], function(t, i) {
                n += C(e.css("margin-" + t), 10) || 0;
            });
            return n;
        }
        return 0;
    }, L = function(e) {
        return I(e, "width");
    }, R = function(e) {
        return I(e, "height");
    }, U = function() {
        try {
            var e = u.activeElement, t = e.contentDocument;
            return t && t.activeElement || e;
        } catch (n) {}
    }, F = function(e) {
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
            for (var t = (e || "").match(f) || [], n = t.length; n--; ) {
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
            var n, i = this, o = i._, r = e, s = null, l = i._anim;
            l && l.stop(!0);
            if (i.destroyed || o.showing || i.open) return i;
            t = _({}, i._, t);
            if (void 0 !== r) {
                n = typeof r;
                "boolean" === n ? t.modal = r : r && "object" === n && (S(r) || S(r.target) ? s = r : _(t, r));
            }
            var u = i._popup, d = t.showWithAni, c = function() {
                delete o.showing;
                i.emit("shown");
            };
            if (!i._ready) {
                i.emit("render", t);
                i._ready = !0;
            }
            i.open = !0;
            i.anchor = s;
            i._activeElement = U();
            i.emit("beforeShow", t);
            u.appendTo(t.appendTo).css("display", "block");
            i.emit("show", t);
            o.showing = !0;
            if (d && "none" !== d) {
                var p = d.split(":");
                i._anim = a.effect(i.node, p[0], p[1], c);
            } else c();
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
                var l = r.split(":");
                n._anim = a.effect(o, l[0], l[1], t);
                n.emit("hide");
            } else {
                n.emit("hide");
                E(t);
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
            x(e, function(t, n) {
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
            if (!o.contains(n, U())) {
                var l = r.find("[autofocus]")[0];
                !t.focusing && l ? t.focusing = !0 : l = n;
                this._focus(l);
            }
            if (void 0 === s) {
                s = t.zIndex = i.zIndex++;
                r.css("zIndex", s);
                r.addClass(m + "-focus");
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
            this._popup.removeClass(m + "-focus");
            this.emit("blur");
            return this;
        },
        _focus: function(e) {
            if (e && this._.autofocus && !/^iframe$/i.test(e.nodeName)) try {
                e.focus();
            } catch (t) {}
        },
        center: function() {
            var e = this._popup, t = this._.fixed, n = A(), i = D(), o = T(e), r = t ? 0 : n.x, a = t ? 0 : n.y, s = (i.w - o.w) / 2 + r, l = .382 * (i.h - o.h) + a;
            e.css({
                left: v(C(s), r),
                top: v(C(l), a)
            });
            return this;
        },
        alignTo: function(e, t) {
            var n = this, i = n._, r = n._popup, a = e.parentNode && o(e);
            if (!a) return n;
            var s = a.offset();
            if (s.left * s.top < 0) return n.center();
            t = t || i.align;
            var l = F(t), u = l.align, d = !l.auto;
            u && u.length || (u = [ "b" ]);
            var c = n._dirClass;
            c && r.removeClass(c);
            var p = i.fixed, f = D(), h = A(), g = L(r), v = R(r), y = k(e), _ = L(a), w = R(a), E = y.left, S = y.top, q = p ? E - h.x : E, T = p ? S - h.y : S, I = p ? 0 : h.x, U = p ? 0 : h.y, O = I + f.w - g, N = U + f.h - v, j = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, P = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, z = {}, M = [ {
                t: T - v,
                b: T + w,
                l: q - g,
                r: q + _
            }, {
                t: T,
                b: T - v + w,
                l: q,
                r: q - g + _
            } ], B = {
                l: q + b((_ - g) / 2),
                t: T + b((w - v) / 2)
            }, $ = {
                left: [ I, O ],
                top: [ U, N ]
            };
            d || x(u, function(e, t) {
                M[t][e] > $[P[e]][1] && (e = u[t] = j[e]);
                M[t][e] < $[P[e]][0] && (u[t] = j[e]);
            });
            var Q = u[0];
            if (!u[1]) {
                u[1] = "left" === P[Q] ? "t" : "l";
                M[1][u[1]] = B[u[1]];
            }
            M[0][Q] = M[0][Q] + 10 * ("tl".indexOf(Q) !== -1 ? -1 : 1);
            z[P[u[0]]] = C(M[0][u[0]]);
            z[P[u[1]]] = C(M[1][u[1]]);
            var W = m + "-" + Q;
            r.css(z).addClass(W);
            n._dirClass = W;
            var H = n.$("arrow", 1), G = n.$("inner", 1);
            if (!H) {
                if (!G) return n;
                H = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(G);
            }
            var V, X, Z = "top" !== P[Q], Y = [ "v", "h" ][1 ^ Z], J = L(H), K = R(H), ee = {}, te = Z ? "left" : "top";
            switch (Y) {
              case "h":
                V = b(E + (_ - J) / 2);
                ee.left = V;
                break;

              case "v":
                X = b(S + (w - K) / 2);
                ee.top = X;
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
    var i = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("../../../core/1.0.0/dom/delegator"), a = e("./popup"), s = o.extend, l = o.guid, u = o.each, d = window.document, c = {
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
    }, p = {}, f = function(e) {
        var t = e || (e = {}), n = e.id || e.id || l(), o = f.get(n) || this;
        "string" != typeof e && 1 !== e.nodeType || (e = {
            content: e
        });
        e = s({}, c, e);
        e.original = t;
        var r, a = e.button || (e.button = []);
        if (!i.isArray(r = a)) {
            r = [];
            a && "object" == typeof a && u(a, function(e, t) {
                e.id = t;
                r.push(e);
            });
            a = e.button = r;
        }
        if (a.length > 0) {
            var d = !1;
            u(a, function(t, n) {
                var i = t.id || l();
                t.autofocus && (d = !0);
                e[i] && s(t, e[i]);
                t.index = n;
            });
            d || (a[a.length - 1].autofocus = !0);
        }
        o.emit("init", e);
        o.initialized ? o.options(e).focus() : o.init(e);
        p[n] = o;
        return o;
    };
    o.inherits(f, a, {
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
                delete p[e.id];
                t._delegator.destroy();
            });
        },
        options: function(e) {
            var t = this, e = s(t._, e);
            t._freeze(!0);
            u([ "title", "content", "width", "height", "action", "button" ], function(n, i) {
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
            t.clickBlankToHide && i(e.mask).on("onmousedown" in d ? "mousedown" : "click", function() {
                e.hide();
                return !1;
            });
            var n = function(t) {
                var n = t.target, i = n.nodeName, o = /^input|textarea$/i, r = a.current === e, s = t.keyCode;
                !r || o.test(i) && "button" !== n.type || 27 === s && e.hide();
            };
            i(d).on("keydown", n);
            e.on("destroy", function() {
                i(d).off("keydown", n);
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
                i.contains(d, e) && this.on("beforeremove", function() {
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
            } else u(e, function(e, a) {
                var s = e.id, l = e.fn || e.callback, u = e.display !== !1, d = e.className || r, c = [ d ];
                e.autofocus && c.push(n.buttonClassLight);
                "function" == typeof l && t.delegate(s, l);
                u && o++;
                i += '<button type="button" action-type="' + s + '"' + (u ? "" : ' style="display:none"') + (' class="' + c.join(" ") + '"') + (e.disabled ? " disabled" : "") + ">" + (e.text || e.value) + "</button>";
            });
            t.$("button").html(i);
            t.$("footer")[o ? "show" : "hide"]();
            t.resize();
            return t;
        },
        action: function(e) {
            var t = this;
            u(e, function(e, n) {
                t.delegate(n, e);
            });
            return t;
        }
    });
    f.getCurrent = function() {
        return a.current;
    };
    f.get = function(e) {
        return void 0 === e ? p : p[e];
    };
    f.config = function(e) {
        e && s(c, e);
    };
    n.exports = f;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("./drag"), a = e("./dialog"), s = o.each, l = o.extend, u = window.clearTimeout, d = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var e = i('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + d + '"</i>').appendTo("body");
        setTimeout(function() {
            e.remove();
            e = null;
        }, 50);
    }();
    var c = {
        info: "&#x69;",
        warn: "&#x21;",
        confirm: "&#x3f;",
        ok: "&#x2714;",
        error: "&#x2718;",
        loading: '<img src="' + d + '" />'
    }, p = function(e) {
        var t = c[e];
        return t ? '<i node-type="icon" class="x-icon ui-box-iconf">' + t + "</i>" : "";
    }, f = o.guid("__x") + "$", h = function(e) {
        return f + e;
    }, m = function(e, t) {
        var n, i = t.xtype, o = i && p(i) || t.iconHTML;
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
    }, v = function(e) {
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
                t = b(e, n.url);
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
    }, b = function(e, t) {
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
        }, l = function(t) {
            n.showing ? e.once("shown", t) : t();
        };
        if (!r.length) {
            var u = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), d = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (u ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + t + '"></iframe>';
            r = i(d.replace(/{id}/g, n.id)).appendTo(o);
            a = r[0];
            n.autoSize ? r.one("load", function() {
                var e, t, n, o = g(a), u = o && i(o);
                if (u) {
                    e = u.width();
                    r.width(e);
                    t = u.height();
                    n = {
                        width: e,
                        height: t
                    };
                }
                l(function() {
                    s(n);
                });
            }) : l(function() {
                s();
            });
        }
        return a;
    }, y = function(e) {
        var t = this;
        e = l({}, e);
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
            e.content = m(e.content, e);
            "none" !== o && (e.className = (e.className || "") + " ui-box-x-" + o);
        } else {
            var u = e.url;
            if (u) {
                var d = e.close !== !1;
                e = l({
                    modal: !0,
                    close: !1,
                    autoRelease: !0,
                    autoSize: !0,
                    scrolling: "auto"
                }, e);
                var c = i(m("Loading...", {
                    xtype: "loading"
                })).addClass("ui-box-x-loading");
                e.content = c;
                e.className = (e.className || "") + " ui-box-iframe";
                t.once("load", function() {
                    c.remove();
                    c = null;
                    d && t.$("close").show();
                });
                t.on("hidden", function() {
                    t.destroy();
                });
                v(t);
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
    }, _ = "__showDelay", x = "__hideTimer";
    o.inherits(y, a, {
        show: function(e, t) {
            var n = this, i = n._, r = [].slice.call(arguments), t = l({}, i, t), a = t.duration || 0, s = t.delay || 0, d = function() {
                o.each([ _, x ], function(e, t) {
                    t = i[e];
                    delete i[e];
                    t && u(t);
                });
            }, c = function() {
                if (a > 0) {
                    i[x] = setTimeout(function() {
                        d();
                        n.hide();
                    }, a);
                    n.once("hide", d);
                }
                y.__super__.show.apply(n, r);
            };
            d();
            s > 0 ? i[_] = setTimeout(c, s) : c();
            return n;
        },
        hide: function() {
            var e = this, t = e._;
            t && o.each([ _, x ], function(e, n) {
                n = t[e];
                delete t[e];
                n && u(n);
            });
            y.__super__.hide.apply(e, arguments);
            return e;
        }
    });
    y.config = a.config;
    y.get = function(e) {
        if (e) {
            var t, n, i = a.get();
            if (e && (t = e.frameElement)) for (var o in i) if (i.hasOwnProperty(o)) {
                n = i[o];
                if (n.iframeNode === t) return n;
            }
            return i[e];
        }
    };
    n.exports = y;
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
    }(), l = function(e) {
        return !!(e && e.nodeType && e.tagName);
    }, u = o.guid, d = function() {
        return u("__0x$");
    }, c = function(e) {
        var t, n = e[1] || {};
        t = e[0];
        t && ("string" == typeof t ? n.html = t : "object" == typeof t && (n = t));
        var i = n.skin;
        if (i) {
            n.className = i;
            delete n.skin;
        }
        return n;
    }, p = function(e, t) {
        var t = c([ e, t ]);
        return new i(t);
    }, f = function(e, t, n) {
        if ("object" == typeof e) {
            n = t;
            t = e;
            e = "";
        } else if (l(t)) {
            n = t;
            t = {};
        } else "number" == typeof t && (t = {
            duration: t
        });
        t = t || {};
        var i = p(s({
            id: d(),
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
        create: p,
        loadUrl: function(e, t) {
            t = t || {};
            t.url = e;
            var n = p(t);
            return n.show();
        },
        loading: function(e, t) {
            t = t || {};
            var n = p(s({
                autofocus: !0,
                autoRelease: !0,
                id: d(),
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
                id: d(),
                modal: !0,
                autoRelease: !0,
                content: "<div>" + e + "</div>",
                ok: {
                    text: "确定",
                    fn: function() {}
                }
            }, t);
            return p(t).show();
        },
        confirm: function(e, t, n, i) {
            var o;
            if (!i && n && "object" == typeof n) {
                l(n) ? i = n : o = n;
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
            var u = p(s({
                xtype: "confirm",
                autofocus: !0,
                id: d(),
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
            return u.show(i);
        },
        bubble: f
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
            return f(t, o, i);
        };
    });
    h.get = i.get;
    h.config = i.config;
    n.exports = h;
});

define("css", [ "module" ], function(e) {
    "use strict";
    function t(e) {
        var t, n, i, o = !1, r = e.lastIndexOf("."), a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
        if (r !== -1 && (!a || r > 1)) {
            t = e.substring(0, r);
            n = e.substring(r + 1);
        } else t = e;
        i = n || t;
        r = i.indexOf("!");
        if (r !== -1) {
            o = "strip" === i.substring(r + 1);
            i = i.substring(0, r);
            n ? n = i : t = i;
        }
        return {
            name: t,
            ext: n,
            strip: o
        };
    }
    function n(e) {
        return e.replace(/(["'\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029");
    }
    function i(e) {
        return e;
    }
    var o, r, a, s = e.config && e.config() || {}, l = "undefined" != typeof location && location.href, u = "function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));return s}", d = "define('__writecss', function(){return " + u + "});", c = {}, p = [], f = !0, h = function() {};
    o = {
        finishLoad: function(e, t, n) {
            s.isBuild && (c[e] = t);
            n(t);
        },
        load: function(e, n, i, r) {
            a = a || r;
            if (r && r.isBuild && !r.inlineText) i(); else {
                s.isBuild = r && r.isBuild;
                var l = t(e), u = l.name + (l.ext ? "." + l.ext : ""), d = n.toUrl(u);
                0 !== d.indexOf("empty:") ? o.get(d, function(t) {
                    o.finishLoad(e, t, i);
                }, function(e) {
                    i.error && i.error(e);
                }) : i();
            }
        },
        write: function(e, t, o, r) {
            r = r || a;
            var s, l = c[t];
            if (l) {
                p.push(l);
                if (r.buildCSS !== !1) {
                    if (r.writeCSSModule && l) {
                        if (f) {
                            f = !1;
                            o(d);
                        }
                        s = 'define(["__writecss"],function(out){return out("' + n(i(l)) + '");})';
                    } else s = "define(function(){})";
                    o.asModule(e + "!" + t, s);
                }
            }
        },
        writeFile: function(e, n, i, r, a) {
            var s = t(n), l = s.ext ? "." + s.ext : "", u = s.name + l, d = i.toUrl(s.name + l) + ".js";
            o.load(u, i, function(t) {
                var n = function(e) {
                    return r(d, e);
                };
                n.asModule = function(e, t) {
                    return r.asModule(e, d, t);
                };
                o.write(e, u, n, a);
            }, a);
        },
        onLayerEnd: function(e, t) {
            var o, r = a;
            if (r.buildCSS !== !1 && !r.writeCSSModule) {
                o = r.IESelectorLimit ? p : [ p.join("") ];
                for (var s = 0; s < o.length; s++) o[s] && e("(" + u + "('" + n(i(o[s])) + "'));\n");
            }
            p = [];
            f = !0;
        }
    };
    if (l) {
        var m = window.document, g = m.getElementsByTagName("head")[0], v = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0, b = !1, y = !0;
        v[1] || v[7] ? b = parseInt(v[1]) < 6 || parseInt(v[7]) <= 9 : v[2] || v[8] ? y = !1 : v[4] && (b = parseInt(v[4]) < 18);
        var _, x, w, E = 0, C = [], S = function() {
            x = m.createElement("style");
            g.appendChild(x);
            w = x.styleSheet || x.sheet;
        }, q = function(e) {
            w.addImport(e);
            x.onload = function() {
                A();
            };
            E++;
            if (31 == E) {
                S();
                E = 0;
            }
        }, A = function() {
            _();
            var e = C.shift();
            if (e) {
                _ = e[1];
                q(e[0]);
            } else _ = null;
        }, T = function(e, t) {
            w && w.addImport || S();
            if (w && w.addImport) if (_) C.push([ e, t ]); else {
                q(e);
                _ = t;
            } else {
                x.textContent = '@import "' + e + '";';
                var n = setInterval(function() {
                    try {
                        x.sheet.cssRules;
                        clearInterval(n);
                        t();
                    } catch (e) {}
                }, 10);
            }
        }, D = function(e, t) {
            var n = m.createElement("link");
            n.type = "text/css";
            n.rel = "stylesheet";
            if (y) n.onload = function() {
                n.onload = function() {};
                setTimeout(t, 7);
            }; else var i = setInterval(function() {
                for (var e = 0, o = m.styleSheets; e < o.length; e++) {
                    var r = m.styleSheets[e];
                    if (r.href == n.href) {
                        clearInterval(i);
                        return t();
                    }
                }
            }, 10);
            n.href = e;
            g.appendChild(n);
        };
        o.get = function(e, t, n) {
            (b ? T : D)(e, t);
        };
    }
    if ("node" === s.env || !s.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"]) {
        r = require.nodeRequire("fs");
        h = function(e, t) {
            r.writeFileSync(e, t, "utf8");
        };
        o.get = function(e, t, n) {
            try {
                var i = r.readFileSync(e, "utf8");
                "\ufeff" === i[0] && (i = i.substring(1));
                t(i);
            } catch (o) {
                n && n(o);
            }
        };
    } else if ("rhino" === s.env || !s.env && "undefined" != typeof Packages && "undefined" != typeof java) throw new Error("Not implement yet.");
    return o;
});

define("css!lib/plugins/uploader/1.0.1/css/uploader.css", [], function() {});

!function e(t, e, n) {
    if ("function" == typeof define && define.amd) define("lib/plugins/swfobject/2.3/swfobject", n); else if ("undefined" != typeof module) n(require, module.exports, module); else {
        var i = {
            exports: {}
        };
        n(null, i.exports, i), t[e] = i.exports;
    }
}(this, "swfobject", function(e, t, n) {
    var i = function() {
        function e() {
            if (!H && document.getElementsByTagName("body")[0]) {
                try {
                    var e, t = b("span");
                    t.style.display = "none";
                    e = P.getElementsByTagName("body")[0].appendChild(t);
                    e.parentNode.removeChild(e);
                    e = null;
                    t = null;
                } catch (n) {
                    return;
                }
                H = !0;
                for (var i = B.length, o = 0; o < i; o++) B[o]();
            }
        }
        function t(e) {
            H ? e() : B[B.length] = e;
        }
        function n(e) {
            if (typeof j.addEventListener != I) j.addEventListener("load", e, !1); else if (typeof P.addEventListener != I) P.addEventListener("load", e, !1); else if (typeof j.attachEvent != I) _(j, "onload", e); else if ("function" == typeof j.onload) {
                var t = j.onload;
                j.onload = function() {
                    t();
                    e();
                };
            } else j.onload = e;
        }
        function o() {
            var e = P.getElementsByTagName("body")[0], t = b(L);
            t.setAttribute("style", "visibility: hidden;");
            t.setAttribute("type", F);
            var n = e.appendChild(t);
            if (n) {
                var i = 0;
                !function o() {
                    if (typeof n.GetVariable != I) try {
                        var a = n.GetVariable("$version");
                        if (a) {
                            a = a.split(" ")[1].split(",");
                            Z.pv = [ y(a[0]), y(a[1]), y(a[2]) ];
                        }
                    } catch (s) {
                        Z.pv = [ 8, 0, 0 ];
                    } else if (i < 10) {
                        i++;
                        setTimeout(o, 10);
                        return;
                    }
                    e.removeChild(t);
                    n = null;
                    r();
                }();
            } else r();
        }
        function r() {
            var e = $.length;
            if (e > 0) for (var t = 0; t < e; t++) {
                var n = $[t].id, i = $[t].callbackFn, o = {
                    success: !1,
                    id: n
                };
                if (Z.pv[0] > 0) {
                    var r = v(n);
                    if (r) if (!x($[t].swfVersion) || Z.wk && Z.wk < 312) if ($[t].expressInstall && s()) {
                        var d = {};
                        d.data = $[t].expressInstall;
                        d.width = r.getAttribute("width") || "0";
                        d.height = r.getAttribute("height") || "0";
                        r.getAttribute("class") && (d.styleclass = r.getAttribute("class"));
                        r.getAttribute("align") && (d.align = r.getAttribute("align"));
                        for (var c = {}, p = r.getElementsByTagName("param"), f = p.length, h = 0; h < f; h++) "movie" != p[h].getAttribute("name").toLowerCase() && (c[p[h].getAttribute("name")] = p[h].getAttribute("value"));
                        l(d, c, n, i);
                    } else {
                        u(r);
                        i && i(o);
                    } else {
                        E(n, !0);
                        if (i) {
                            o.success = !0;
                            o.ref = a(n);
                            o.id = n;
                            i(o);
                        }
                    }
                } else {
                    E(n, !0);
                    if (i) {
                        var m = a(n);
                        if (m && typeof m.SetVariable != I) {
                            o.success = !0;
                            o.ref = m;
                            o.id = m.id;
                        }
                        i(o);
                    }
                }
            }
        }
        function a(e) {
            var t = null, n = v(e);
            n && "OBJECT" === n.nodeName.toUpperCase() && (t = typeof n.SetVariable !== I ? n : n.getElementsByTagName(L)[0] || n);
            return t;
        }
        function s() {
            return !G && x("6.0.65") && (Z.win || Z.mac) && !(Z.wk && Z.wk < 312);
        }
        function l(e, t, n, i) {
            var o = v(n);
            n = g(n);
            G = !0;
            A = i || null;
            T = {
                success: !1,
                id: n
            };
            if (o) {
                if ("OBJECT" == o.nodeName.toUpperCase()) {
                    S = d(o);
                    q = null;
                } else {
                    S = o;
                    q = n;
                }
                e.id = O;
                (typeof e.width == I || !/%$/.test(e.width) && y(e.width) < 310) && (e.width = "310");
                (typeof e.height == I || !/%$/.test(e.height) && y(e.height) < 137) && (e.height = "137");
                var r = Z.ie ? "ActiveX" : "PlugIn", a = "MMredirectURL=" + encodeURIComponent(j.location.toString().replace(/&/g, "%26")) + "&MMplayerType=" + r + "&MMdoctitle=" + encodeURIComponent(P.title.slice(0, 47) + " - Flash Player Installation");
                typeof t.flashvars != I ? t.flashvars += "&" + a : t.flashvars = a;
                if (Z.ie && 4 != o.readyState) {
                    var s = b("div");
                    n += "SWFObjectNew";
                    s.setAttribute("id", n);
                    o.parentNode.insertBefore(s, o);
                    o.style.display = "none";
                    h(o);
                }
                p(e, t, n);
            }
        }
        function u(e) {
            if (Z.ie && 4 != e.readyState) {
                e.style.display = "none";
                var t = b("div");
                e.parentNode.insertBefore(t, e);
                t.parentNode.replaceChild(d(e), t);
                h(e);
            } else e.parentNode.replaceChild(d(e), e);
        }
        function d(e) {
            var t = b("div");
            if (Z.win && Z.ie) t.innerHTML = e.innerHTML; else {
                var n = e.getElementsByTagName(L)[0];
                if (n) {
                    var i = n.childNodes;
                    if (i) for (var o = i.length, r = 0; r < o; r++) 1 == i[r].nodeType && "PARAM" == i[r].nodeName || 8 == i[r].nodeType || t.appendChild(i[r].cloneNode(!0));
                }
            }
            return t;
        }
        function c(e, t) {
            var n = b("div");
            n.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + e + "'>" + t + "</object>";
            return n.firstChild;
        }
        function p(e, t, n) {
            var i, o = v(n);
            n = g(n);
            if (Z.wk && Z.wk < 312) return i;
            if (o) {
                var r, a, s, l = b(Z.ie ? "div" : L);
                typeof e.id == I && (e.id = n);
                for (s in t) t.hasOwnProperty(s) && "movie" !== s.toLowerCase() && f(l, s, t[s]);
                Z.ie && (l = c(e.data, l.innerHTML));
                for (r in e) if (e.hasOwnProperty(r)) {
                    a = r.toLowerCase();
                    "styleclass" === a ? l.setAttribute("class", e[r]) : "classid" !== a && "data" !== a && l.setAttribute(r, e[r]);
                }
                if (Z.ie) Q[Q.length] = e.id; else {
                    l.setAttribute("type", F);
                    l.setAttribute("data", e.data);
                }
                o.parentNode.replaceChild(l, o);
                i = l;
            }
            return i;
        }
        function f(e, t, n) {
            var i = b("param");
            i.setAttribute("name", t);
            i.setAttribute("value", n);
            e.appendChild(i);
        }
        function h(e) {
            var t = v(e);
            if (t && "OBJECT" == t.nodeName.toUpperCase()) if (Z.ie) {
                t.style.display = "none";
                !function n() {
                    if (4 == t.readyState) {
                        for (var e in t) "function" == typeof t[e] && (t[e] = null);
                        t.parentNode.removeChild(t);
                    } else setTimeout(n, 10);
                }();
            } else t.parentNode.removeChild(t);
        }
        function m(e) {
            return e && e.nodeType && 1 === e.nodeType;
        }
        function g(e) {
            return m(e) ? e.id : e;
        }
        function v(e) {
            if (m(e)) return e;
            var t = null;
            try {
                t = P.getElementById(e);
            } catch (n) {}
            return t;
        }
        function b(e) {
            return P.createElement(e);
        }
        function y(e) {
            return parseInt(e, 10);
        }
        function _(e, t, n) {
            e.attachEvent(t, n);
            W[W.length] = [ e, t, n ];
        }
        function x(e) {
            e += "";
            var t = Z.pv, n = e.split(".");
            n[0] = y(n[0]);
            n[1] = y(n[1]) || 0;
            n[2] = y(n[2]) || 0;
            return t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2];
        }
        function w(e, t, n, i) {
            var o = P.getElementsByTagName("head")[0];
            if (o) {
                var r = "string" == typeof n ? n : "screen";
                if (i) {
                    D = null;
                    k = null;
                }
                if (!D || k != r) {
                    var a = b("style");
                    a.setAttribute("type", "text/css");
                    a.setAttribute("media", r);
                    D = o.appendChild(a);
                    Z.ie && typeof P.styleSheets != I && P.styleSheets.length > 0 && (D = P.styleSheets[P.styleSheets.length - 1]);
                    k = r;
                }
                D && (typeof D.addRule != I ? D.addRule(e, t) : typeof P.createTextNode != I && D.appendChild(P.createTextNode(e + " {" + t + "}")));
            }
        }
        function E(e, t) {
            if (V) {
                var n = t ? "visible" : "hidden", i = v(e);
                H && i ? i.style.visibility = n : "string" == typeof e && w("#" + e, "visibility:" + n);
            }
        }
        function C(e) {
            var t = /[\\\"<>\.;]/, n = null != t.exec(e);
            return n && typeof encodeURIComponent != I ? encodeURIComponent(e) : e;
        }
        var S, q, A, T, D, k, I = "undefined", L = "object", R = "Shockwave Flash", U = "ShockwaveFlash.ShockwaveFlash", F = "application/x-shockwave-flash", O = "SWFObjectExprInst", N = "onreadystatechange", j = window, P = document, z = navigator, M = !1, B = [], $ = [], Q = [], W = [], H = !1, G = !1, V = !0, X = !1, Z = function() {
            var e = typeof P.getElementById != I && typeof P.getElementsByTagName != I && typeof P.createElement != I, t = z.userAgent.toLowerCase(), n = z.platform.toLowerCase(), i = n ? /win/.test(n) : /win/.test(t), o = n ? /mac/.test(n) : /mac/.test(t), r = !!/webkit/.test(t) && parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")), a = "Microsoft Internet Explorer" === z.appName, s = [ 0, 0, 0 ], l = null;
            if (typeof z.plugins != I && typeof z.plugins[R] == L) {
                l = z.plugins[R].description;
                if (l && typeof z.mimeTypes != I && z.mimeTypes[F] && z.mimeTypes[F].enabledPlugin) {
                    M = !0;
                    a = !1;
                    l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    s[0] = y(l.replace(/^(.*)\..*$/, "$1"));
                    s[1] = y(l.replace(/^.*\.(.*)\s.*$/, "$1"));
                    s[2] = /[a-zA-Z]/.test(l) ? y(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
                }
            } else if (typeof j.ActiveXObject != I) try {
                var u = new ActiveXObject(U);
                if (u) {
                    l = u.GetVariable("$version");
                    if (l) {
                        a = !0;
                        l = l.split(" ")[1].split(",");
                        s = [ y(l[0]), y(l[1]), y(l[2]) ];
                    }
                }
            } catch (d) {}
            return {
                w3: e,
                pv: s,
                wk: r,
                ie: a,
                win: i,
                mac: o
            };
        }();
        (function() {
            if (Z.w3) {
                (typeof P.readyState != I && ("complete" === P.readyState || "interactive" === P.readyState) || typeof P.readyState == I && (P.getElementsByTagName("body")[0] || P.body)) && e();
                if (!H) {
                    typeof P.addEventListener != I && P.addEventListener("DOMContentLoaded", e, !1);
                    if (Z.ie) {
                        P.attachEvent(N, function t() {
                            if ("complete" == P.readyState) {
                                P.detachEvent(N, t);
                                e();
                            }
                        });
                        j == top && !function n() {
                            if (!H) {
                                try {
                                    P.documentElement.doScroll("left");
                                } catch (t) {
                                    setTimeout(n, 0);
                                    return;
                                }
                                e();
                            }
                        }();
                    }
                    Z.wk && !function i() {
                        H || (/loaded|complete/.test(P.readyState) ? e() : setTimeout(i, 0));
                    }();
                }
            }
        })();
        B[0] = function() {
            M ? o() : r();
        };
        (function() {
            Z.ie && window.attachEvent("onunload", function() {
                for (var e = W.length, t = 0; t < e; t++) W[t][0].detachEvent(W[t][1], W[t][2]);
                for (var n = Q.length, o = 0; o < n; o++) h(Q[o]);
                for (var r in Z) Z[r] = null;
                Z = null;
                for (var a in i) i[a] = null;
                i = null;
            });
        })();
        return {
            registerObject: function(e, t, n, i) {
                if (Z.w3 && e && t) {
                    var o = {};
                    o.id = e;
                    o.swfVersion = t;
                    o.expressInstall = n;
                    o.callbackFn = i;
                    $[$.length] = o;
                    E(e, !1);
                } else i && i({
                    success: !1,
                    id: e
                });
            },
            getObjectById: function(e) {
                if (Z.w3) return a(e);
            },
            embedSWF: function(e, n, i, o, r, a, u, d, c, f) {
                var h = g(n), m = {
                    success: !1,
                    id: h
                };
                if (Z.w3 && !(Z.wk && Z.wk < 312) && e && n && i && o && r) {
                    E(h, !1);
                    t(function() {
                        i += "";
                        o += "";
                        var t = {};
                        if (c && typeof c === L) for (var g in c) t[g] = c[g];
                        t.data = e;
                        t.width = i;
                        t.height = o;
                        var v = {};
                        if (d && typeof d === L) for (var b in d) v[b] = d[b];
                        if (u && typeof u === L) for (var y in u) if (u.hasOwnProperty(y)) {
                            var _ = X ? encodeURIComponent(y) : y, w = X ? encodeURIComponent(u[y]) : u[y];
                            typeof v.flashvars != I ? v.flashvars += "&" + _ + "=" + w : v.flashvars = _ + "=" + w;
                        }
                        if (x(r)) {
                            var C = p(t, v, n);
                            t.id == h && E(h, !0);
                            m.success = !0;
                            m.ref = C;
                            m.id = C.id;
                        } else {
                            if (a && s()) {
                                t.data = a;
                                l(t, v, n, f);
                                return;
                            }
                            E(h, !0);
                        }
                        f && f(m);
                    });
                } else f && f(m);
            },
            switchOffAutoHideShow: function() {
                V = !1;
            },
            enableUriEncoding: function(e) {
                X = typeof e === I || e;
            },
            ua: Z,
            getFlashPlayerVersion: function() {
                return {
                    major: Z.pv[0],
                    minor: Z.pv[1],
                    release: Z.pv[2]
                };
            },
            hasFlashPlayerVersion: x,
            createSWF: function(e, t, n) {
                return Z.w3 ? p(e, t, n) : void 0;
            },
            showExpressInstall: function(e, t, n, i) {
                Z.w3 && s() && l(e, t, n, i);
            },
            removeSWF: function(e) {
                Z.w3 && h(e);
            },
            createCSS: function(e, t, n, i) {
                Z.w3 && w(e, t, n, i);
            },
            addDomLoadEvent: t,
            addLoadEvent: n,
            getQueryParamValue: function(e) {
                var t = P.location.search || P.location.hash;
                if (t) {
                    /\?/.test(t) && (t = t.split("?")[1]);
                    if (null == e) return C(t);
                    for (var n = t.split("&"), i = 0; i < n.length; i++) if (n[i].substring(0, n[i].indexOf("=")) == e) return C(n[i].substring(n[i].indexOf("=") + 1));
                }
                return "";
            },
            expressInstallCallback: function() {
                if (G) {
                    var e = v(O);
                    if (e && S) {
                        e.parentNode.replaceChild(S, e);
                        if (q) {
                            E(q, !0);
                            Z.ie && (S.style.display = "block");
                        }
                        A && A(T);
                    }
                    G = !1;
                }
            },
            version: "2.3"
        };
    }();
    n.exports = i;
});

!function t(e, t, n) {
    if ("function" == typeof define && define.amd) define("lib/plugins/swfupload/2.2/swfupload", n); else if ("undefined" != typeof module) n(require, module.exports, module); else {
        var i = {
            exports: {}
        };
        n(null, i.exports, i), e[t] = i.exports;
    }
}(this, "SWFUpload", function(e, t, n) {
    var i = window.SWFUpload || function(e) {
        this.initSWFUpload(e);
    };
    !function(e, t, n) {
        e.SWFUpload = n;
        n.prototype.initSWFUpload = function(e) {
            try {
                this.customSettings = {}, this.settings = e, this.eventQueue = [], this.movieName = "SWFUpload_" + n.movieCount++, 
                this.movieElement = null, n.instances[this.movieName] = this, this.initSettings(), 
                this.loadFlash(), this.displayDebugInfo();
            } catch (t) {
                throw delete n.instances[this.movieName], t;
            }
        }, n.instances = {}, n.movieCount = 0, n.version = "2.2.0 2009-03-25", n.QUEUE_ERROR = {
            QUEUE_LIMIT_EXCEEDED: -100,
            FILE_EXCEEDS_SIZE_LIMIT: -110,
            ZERO_BYTE_FILE: -120,
            INVALID_FILETYPE: -130
        }, n.UPLOAD_ERROR = {
            HTTP_ERROR: -200,
            MISSING_UPLOAD_URL: -210,
            IO_ERROR: -220,
            SECURITY_ERROR: -230,
            UPLOAD_LIMIT_EXCEEDED: -240,
            UPLOAD_FAILED: -250,
            SPECIFIED_FILE_ID_NOT_FOUND: -260,
            FILE_VALIDATION_FAILED: -270,
            FILE_CANCELLED: -280,
            UPLOAD_STOPPED: -290
        }, n.FILE_STATUS = {
            QUEUED: -1,
            IN_PROGRESS: -2,
            ERROR: -3,
            COMPLETE: -4,
            CANCELLED: -5
        }, n.BUTTON_ACTION = {
            SELECT_FILE: -100,
            SELECT_FILES: -110,
            START_UPLOAD: -120
        }, n.CURSOR = {
            ARROW: -1,
            HAND: -2
        }, n.WINDOW_MODE = {
            WINDOW: "window",
            TRANSPARENT: "transparent",
            OPAQUE: "opaque"
        }, n.completeURL = function(t) {
            if (!t) return "";
            if ("string" != typeof t || t.match(/^https?:\/\//i) || t.match(/^\//)) return t;
            var n = e.location.pathname.lastIndexOf("/");
            return path = 0 >= n ? "/" : e.location.pathname.substr(0, n) + "/", path + t;
        }, n.prototype.initSettings = function() {
            this.ensureDefault = function(e, t) {
                this.settings[e] = void 0 == this.settings[e] ? t : this.settings[e];
            }, this.ensureDefault("upload_url", ""), this.ensureDefault("preserve_relative_urls", !1), 
            this.ensureDefault("file_post_name", "Filedata"), this.ensureDefault("post_params", {}), 
            this.ensureDefault("use_query_string", !1), this.ensureDefault("requeue_on_error", !1), 
            this.ensureDefault("http_success", []), this.ensureDefault("assume_success_timeout", 0), 
            this.ensureDefault("file_types", "*.*"), this.ensureDefault("file_types_description", "All Files"), 
            this.ensureDefault("file_size_limit", 0), this.ensureDefault("file_upload_limit", 0), 
            this.ensureDefault("file_queue_limit", 0), this.ensureDefault("flash_url", "swfupload.swf"), 
            this.ensureDefault("prevent_swf_caching", !0), this.ensureDefault("button_image_url", ""), 
            this.ensureDefault("button_width", 1), this.ensureDefault("button_height", 1), this.ensureDefault("button_text", ""), 
            this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;"), this.ensureDefault("button_text_top_padding", 0), 
            this.ensureDefault("button_text_left_padding", 0), this.ensureDefault("button_action", n.BUTTON_ACTION.SELECT_FILES), 
            this.ensureDefault("button_disabled", !1), this.ensureDefault("button_placeholder_id", ""), 
            this.ensureDefault("button_placeholder", null), this.ensureDefault("button_cursor", n.CURSOR.ARROW), 
            this.ensureDefault("button_window_mode", n.WINDOW_MODE.WINDOW), this.ensureDefault("debug", !1), 
            this.settings.debug_enabled = this.settings.debug, this.settings.return_upload_start_handler = this.returnUploadStart, 
            this.ensureDefault("swfupload_loaded_handler", null), this.ensureDefault("file_dialog_start_handler", null), 
            this.ensureDefault("file_queued_handler", null), this.ensureDefault("file_queue_error_handler", null), 
            this.ensureDefault("file_dialog_complete_handler", null), this.ensureDefault("upload_start_handler", null), 
            this.ensureDefault("upload_progress_handler", null), this.ensureDefault("upload_error_handler", null), 
            this.ensureDefault("upload_success_handler", null), this.ensureDefault("upload_complete_handler", null), 
            this.ensureDefault("debug_handler", this.debugMessage), this.ensureDefault("custom_settings", {}), 
            this.customSettings = this.settings.custom_settings, this.settings.prevent_swf_caching && (this.settings.flash_url = this.settings.flash_url + (0 > this.settings.flash_url.indexOf("?") ? "?" : "&") + "ts=" + +new Date()), 
            this.settings.preserve_relative_urls || (this.settings.upload_url = n.completeURL(this.settings.upload_url), 
            this.settings.button_image_url = this.settings.button_image_url ? n.completeURL(this.settings.button_image_url) : this.settings.button_image_url), 
            delete this.ensureDefault;
        }, n.prototype.loadFlash = function() {
            var n, i;
            if (null !== t.getElementById(this.movieName)) throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
            if (n = t.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder, 
            void 0 == n) throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
            i = t.createElement("div"), i.innerHTML = this.getFlashHTML(), n.parentNode.replaceChild(i.firstChild, n), 
            void 0 == e[this.movieName] && (e[this.movieName] = this.getMovieElement());
        }, n.prototype.getFlashHTML = function() {
            return [ '<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload"><param name="wmode" value="', this.settings.button_window_mode, '" /><param name="movie" value="', this.settings.flash_url, '" /><param name="quality" value="high" /><param name="menu" value="false" /><param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>" ].join("");
        }, n.prototype.getFlashVars = function() {
            var e = this.buildParamString(), t = this.settings.http_success.join(",");
            return [ "movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(t), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(e), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor) ].join("");
        }, n.prototype.getMovieElement = function() {
            if (void 0 == this.movieElement && (this.movieElement = t.getElementById(this.movieName)), 
            null === this.movieElement) throw "Could not find Flash element";
            return this.movieElement;
        }, n.prototype.buildParamString = function() {
            var e = this.settings.post_params, t = [];
            if ("object" == typeof e) for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n.toString()) + "=" + encodeURIComponent(e[n].toString()));
            return t.join("&amp;");
        }, n.prototype.destroy = function() {
            try {
                try {
                    this.cancelUpload(null, !1);
                } catch (t) {}
                var i = null;
                if ((i = this.getMovieElement()) && "unknown" == typeof i.CallFunction) {
                    for (var t in i) try {
                        "function" == typeof i[t] && (i[t] = null);
                    } catch (o) {}
                    try {
                        i.parentNode.removeChild(i);
                    } catch (r) {}
                }
                return e[this.movieName] = null, delete e[this.movieName], n.instances[this.movieName] = null, 
                delete n.instances[this.movieName], this.movieName = this.eventQueue = this.customSettings = this.settings = this.movieElement = null, 
                !0;
            } catch (a) {
                return !1;
            }
        }, n.prototype.displayDebugInfo = function() {
            this.debug([ "---SWFUpload Instance Info---\nVersion: ", n.version, "\nMovie Name: ", this.movieName, "\nSettings:\n    upload_url:               ", this.settings.upload_url, "\n    flash_url:                ", this.settings.flash_url, "\n use_query_string:         ", this.settings.use_query_string.toString(), "\n   requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n   http_success:             ", this.settings.http_success.join(", "), "\n   assume_success_timeout:   ", this.settings.assume_success_timeout, "\n    file_post_name:           ", this.settings.file_post_name, "\n    post_params:              ", this.settings.post_params.toString(), "\n    file_types:               ", this.settings.file_types, "\n    file_types_description:   ", this.settings.file_types_description, "\n    file_size_limit:          ", this.settings.file_size_limit, "\n   file_upload_limit:        ", this.settings.file_upload_limit, "\n file_queue_limit:         ", this.settings.file_queue_limit, "\n  debug:                    ", this.settings.debug.toString(), "\n  prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n    button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n  button_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n    button_image_url:         ", this.settings.button_image_url.toString(), "\n   button_width:             ", this.settings.button_width.toString(), "\n   button_height:            ", this.settings.button_height.toString(), "\n  button_text:              ", this.settings.button_text.toString(), "\n    button_text_style:        ", this.settings.button_text_style.toString(), "\n  button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n    button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n   button_action:            ", this.settings.button_action.toString(), "\n  button_disabled:          ", this.settings.button_disabled.toString(), "\n    custom_settings:          ", this.settings.custom_settings.toString(), "\nEvent Handlers:\n   swfupload_loaded_handler assigned:  ", ("function" == typeof this.settings.swfupload_loaded_handler).toString(), "\n    file_dialog_start_handler assigned: ", ("function" == typeof this.settings.file_dialog_start_handler).toString(), "\n   file_queued_handler assigned:       ", ("function" == typeof this.settings.file_queued_handler).toString(), "\n file_queue_error_handler assigned:  ", ("function" == typeof this.settings.file_queue_error_handler).toString(), "\n    upload_start_handler assigned:      ", ("function" == typeof this.settings.upload_start_handler).toString(), "\n    upload_progress_handler assigned:   ", ("function" == typeof this.settings.upload_progress_handler).toString(), "\n upload_error_handler assigned:      ", ("function" == typeof this.settings.upload_error_handler).toString(), "\n    upload_success_handler assigned:    ", ("function" == typeof this.settings.upload_success_handler).toString(), "\n  upload_complete_handler assigned:   ", ("function" == typeof this.settings.upload_complete_handler).toString(), "\n debug_handler assigned:             ", ("function" == typeof this.settings.debug_handler).toString(), "\n" ].join(""));
        }, n.prototype.addSetting = function(e, t, n) {
            return void 0 == t ? this.settings[e] = n : this.settings[e] = t;
        }, n.prototype.getSetting = function(e) {
            return void 0 != this.settings[e] ? this.settings[e] : "";
        }, n.prototype.callFlash = function(e, t) {
            t = t || [];
            var n, i, o = this.getMovieElement();
            try {
                i = o.CallFunction('<invoke name="' + e + '" returntype="javascript">' + __flash__argumentsToXML(t, 0) + "</invoke>"), 
                n = (0, eval)(i);
            } catch (r) {
                throw "Call to " + e + " failed";
            }
            return void 0 != n && "object" == typeof n.post && (n = this.unescapeFilePostParams(n)), 
            n;
        }, n.prototype.selectFile = function() {
            this.callFlash("SelectFile");
        }, n.prototype.selectFiles = function() {
            this.callFlash("SelectFiles");
        }, n.prototype.startUpload = function(e) {
            this.callFlash("StartUpload", [ e ]);
        }, n.prototype.cancelUpload = function(e, t) {
            !1 !== t && (t = !0), this.callFlash("CancelUpload", [ e, t ]);
        }, n.prototype.stopUpload = function() {
            this.callFlash("StopUpload");
        }, n.prototype.getStats = function() {
            return this.callFlash("GetStats");
        }, n.prototype.setStats = function(e) {
            this.callFlash("SetStats", [ e ]);
        }, n.prototype.getFile = function(e) {
            return "number" == typeof e ? this.callFlash("GetFileByIndex", [ e ]) : this.callFlash("GetFile", [ e ]);
        }, n.prototype.addFileParam = function(e, t, n) {
            return this.callFlash("AddFileParam", [ e, t, n ]);
        }, n.prototype.removeFileParam = function(e, t) {
            this.callFlash("RemoveFileParam", [ e, t ]);
        }, n.prototype.setUploadURL = function(e) {
            this.settings.upload_url = e.toString(), this.callFlash("SetUploadURL", [ e ]);
        }, n.prototype.setPostParams = function(e) {
            this.settings.post_params = e, this.callFlash("SetPostParams", [ e ]);
        }, n.prototype.addPostParam = function(e, t) {
            this.settings.post_params[e] = t, this.callFlash("SetPostParams", [ this.settings.post_params ]);
        }, n.prototype.removePostParam = function(e) {
            delete this.settings.post_params[e], this.callFlash("SetPostParams", [ this.settings.post_params ]);
        }, n.prototype.setFileTypes = function(e, t) {
            this.settings.file_types = e, this.settings.file_types_description = t, this.callFlash("SetFileTypes", [ e, t ]);
        }, n.prototype.setFileSizeLimit = function(e) {
            this.settings.file_size_limit = e, this.callFlash("SetFileSizeLimit", [ e ]);
        }, n.prototype.setFileUploadLimit = function(e) {
            this.settings.file_upload_limit = e, this.callFlash("SetFileUploadLimit", [ e ]);
        }, n.prototype.setFileQueueLimit = function(e) {
            this.settings.file_queue_limit = e, this.callFlash("SetFileQueueLimit", [ e ]);
        }, n.prototype.setFilePostName = function(e) {
            this.settings.file_post_name = e, this.callFlash("SetFilePostName", [ e ]);
        }, n.prototype.setUseQueryString = function(e) {
            this.settings.use_query_string = e, this.callFlash("SetUseQueryString", [ e ]);
        }, n.prototype.setRequeueOnError = function(e) {
            this.settings.requeue_on_error = e, this.callFlash("SetRequeueOnError", [ e ]);
        }, n.prototype.setHTTPSuccess = function(e) {
            "string" == typeof e && (e = e.replace(" ", "").split(",")), this.settings.http_success = e, 
            this.callFlash("SetHTTPSuccess", [ e ]);
        }, n.prototype.setAssumeSuccessTimeout = function(e) {
            this.settings.assume_success_timeout = e, this.callFlash("SetAssumeSuccessTimeout", [ e ]);
        }, n.prototype.setDebugEnabled = function(e) {
            this.settings.debug_enabled = e, this.callFlash("SetDebugEnabled", [ e ]);
        }, n.prototype.setButtonImageURL = function(e) {
            void 0 == e && (e = ""), this.settings.button_image_url = e, this.callFlash("SetButtonImageURL", [ e ]);
        }, n.prototype.setButtonDimensions = function(e, t) {
            this.settings.button_width = e, this.settings.button_height = t;
            var n = this.getMovieElement();
            void 0 != n && (n.style.width = e + "px", n.style.height = t + "px"), this.callFlash("SetButtonDimensions", [ e, t ]);
        }, n.prototype.setButtonText = function(e) {
            this.settings.button_text = e, this.callFlash("SetButtonText", [ e ]);
        }, n.prototype.setButtonTextPadding = function(e, t) {
            this.settings.button_text_top_padding = t, this.settings.button_text_left_padding = e, 
            this.callFlash("SetButtonTextPadding", [ e, t ]);
        }, n.prototype.setButtonTextStyle = function(e) {
            this.settings.button_text_style = e, this.callFlash("SetButtonTextStyle", [ e ]);
        }, n.prototype.setButtonDisabled = function(e) {
            this.settings.button_disabled = e, this.callFlash("SetButtonDisabled", [ e ]);
        }, n.prototype.setButtonAction = function(e) {
            this.settings.button_action = e, this.callFlash("SetButtonAction", [ e ]);
        }, n.prototype.setButtonCursor = function(e) {
            this.settings.button_cursor = e, this.callFlash("SetButtonCursor", [ e ]);
        }, n.prototype.queueEvent = function(e, t) {
            void 0 == t ? t = [] : t instanceof Array || (t = [ t ]);
            var n = this;
            if ("function" == typeof this.settings[e]) this.eventQueue.push(function() {
                this.settings[e].apply(this, t);
            }), setTimeout(function() {
                n.executeNextEvent();
            }, 0); else if (null !== this.settings[e]) throw "Event handler " + e + " is unknown or is not a function";
        }, n.prototype.executeNextEvent = function() {
            var e = this.eventQueue ? this.eventQueue.shift() : null;
            "function" == typeof e && e.apply(this);
        }, n.prototype.unescapeFilePostParams = function(e) {
            var t, n = /[$]([0-9a-f]{4})/i, i = {};
            if (void 0 != e) {
                for (var o in e.post) if (e.post.hasOwnProperty(o)) {
                    t = o;
                    for (var r; null !== (r = n.exec(t)); ) t = t.replace(r[0], String.fromCharCode(parseInt("0x" + r[1], 16)));
                    i[t] = e.post[o];
                }
                e.post = i;
            }
            return e;
        }, n.prototype.testExternalInterface = function() {
            try {
                return this.callFlash("TestExternalInterface");
            } catch (e) {
                return !1;
            }
        }, n.prototype.flashReady = function() {
            var e = this.getMovieElement();
            e ? (this.cleanUp(e), this.queueEvent("swfupload_loaded_handler")) : this.debug("Flash called back ready but the flash movie can't be found.");
        }, n.prototype.cleanUp = function(t) {
            try {
                if (this.movieElement && "unknown" == typeof t.CallFunction) {
                    this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
                    for (var n in t) try {
                        "function" == typeof t[n] && (t[n] = null);
                    } catch (i) {}
                }
            } catch (o) {}
            e.__flash__removeCallback = function(e, t) {
                try {
                    e && (e[t] = null);
                } catch (n) {}
            };
        }, n.prototype.fileDialogStart = function() {
            this.queueEvent("file_dialog_start_handler");
        }, n.prototype.fileQueued = function(e) {
            e = this.unescapeFilePostParams(e), this.queueEvent("file_queued_handler", e);
        }, n.prototype.fileQueueError = function(e, t, n) {
            e = this.unescapeFilePostParams(e), this.queueEvent("file_queue_error_handler", [ e, t, n ]);
        }, n.prototype.fileDialogComplete = function(e, t, n) {
            this.queueEvent("file_dialog_complete_handler", [ e, t, n ]);
        }, n.prototype.uploadStart = function(e) {
            e = this.unescapeFilePostParams(e), this.queueEvent("return_upload_start_handler", e);
        }, n.prototype.returnUploadStart = function(e) {
            var t;
            if ("function" == typeof this.settings.upload_start_handler) e = this.unescapeFilePostParams(e), 
            t = this.settings.upload_start_handler.call(this, e); else if (void 0 != this.settings.upload_start_handler) throw "upload_start_handler must be a function";
            void 0 === t && (t = !0), this.callFlash("ReturnUploadStart", [ !!t ]);
        }, n.prototype.uploadProgress = function(e, t, n) {
            e = this.unescapeFilePostParams(e), this.queueEvent("upload_progress_handler", [ e, t, n ]);
        }, n.prototype.uploadError = function(e, t, n) {
            e = this.unescapeFilePostParams(e), this.queueEvent("upload_error_handler", [ e, t, n ]);
        }, n.prototype.uploadSuccess = function(e, t, n) {
            e = this.unescapeFilePostParams(e), this.queueEvent("upload_success_handler", [ e, t, n ]);
        }, n.prototype.uploadComplete = function(e) {
            e = this.unescapeFilePostParams(e), this.queueEvent("upload_complete_handler", e);
        }, n.prototype.debug = function(e) {
            this.queueEvent("debug_handler", e);
        }, n.prototype.debugMessage = function(e) {
            if (this.settings.debug) {
                var t = [];
                if ("object" == typeof e && "string" == typeof e.name && "string" == typeof e.message) {
                    for (var i in e) e.hasOwnProperty(i) && t.push(i + ": " + e[i]);
                    e = t.join("\n") || "", t = e.split("\n"), e = "EXCEPTION: " + t.join("\nEXCEPTION: ");
                }
                n.Console.writeLine(e);
            }
        }, n.Console = {}, n.Console.writeLine = function(e) {
            var n, i;
            try {
                n = t.getElementById("SWFUpload_Console"), n || (i = t.createElement("form"), t.getElementsByTagName("body")[0].appendChild(i), 
                n = t.createElement("textarea"), n.id = "SWFUpload_Console", n.style.fontFamily = "monospace", 
                n.setAttribute("wrap", "off"), n.wrap = "off", n.style.overflow = "auto", n.style.width = "700px", 
                n.style.height = "350px", n.style.margin = "5px", i.appendChild(n)), n.value += e + "\n", 
                n.scrollTop = n.scrollHeight - n.clientHeight;
            } catch (o) {
                alert("Exception: " + o.name + " Message: " + o.message);
            }
        };
    }(window, document, i);
    n.exports = i;
});

define("lib/plugins/uploadify/3.2.2/uploadify", [ "require", "exports", "module", "jquery", "../../swfobject/2.3/swfobject", "../../swfupload/2.2/swfupload" ], function(e, t, n) {
    "use strict";
    function i(e, t) {
        var n = -1, i = e.length;
        if (e.forEach) e.forEach(t); else if (i) for (;++n < i; ) t(e[n], n); else for (n in e) e.hasOwnProperty(n) && t(e[n], n);
    }
    function o(e) {
        var t = {
            width: e.offsetWidth,
            height: e.offsetHeight
        }, n = {
            width: [ "left", "right" ],
            height: [ "top", "bottom" ]
        }, o = u(e);
        i(t, function(e, r) {
            i(n[r], function(t, n) {
                e -= parseInt(o.css("border-" + t + "-width"), 10) || 0;
            });
            t[r] = e;
        });
        return t;
    }
    function r(e) {
        return e = e || "", e + (++h).toString(32);
    }
    function a(e, t) {
        e = e || {};
        var n = u(e), i = Array.prototype.slice;
        return t = t || e.name, u.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(o, r) {
            e[o] = function(e) {
                var a = i.call(arguments, 0), s = a[1];
                return t && !~e.indexOf(".") && (a[0] = e + "." + t), "function" == typeof s && ("on" === o || "once" === o ? a[1] = s.__ || (s.__ = function(e) {
                    return e.preventDefault(), s.apply(this, i.call(arguments, 1));
                }) : "un" === o && (a[1] = s.__)), n[r].apply(n, a);
            };
        }), e;
    }
    function s(e) {
        return e.replace(/\b[a-z]/g, function(e) {
            return e.toUpperCase();
        });
    }
    function l(e, t, n) {
        var i = this, o = u.extend({}, t), l = u(e);
        if (!l[0]) throw Error("Initialize flash upload error, invalid holder node.");
        o.uploader = o.endpoint || o.uploader;
        o.id || (o.id = r("__file__"));
        a(i);
        var d = [ "cancel", "clearQueue", "destroy", "dialogClose", "dialogOpen", "disable", "enable", "initError", "fallback", "queueComplete", "selectError", "select", "SWFReady", "uploadComplete", "uploadError", "uploadSuccess", "uploadProgress", "uploadStart" ];
        u.each(d, function(e, n, r) {
            r = "on" + s(n);
            o[r] = function() {
                i.handleEvent(n, Array.prototype.slice.call(arguments));
            };
            t[r] && i.on(n, t[r]);
        });
        o.showPreview && i.on("uploadSuccess", function(e, t, n) {
            i.showPreview((t.data || 0).url);
        });
        i.once("destroy", function() {
            i.un();
            l.off();
            l = null;
        });
        i.$holder = l;
        i.swfupload = null;
        setTimeout(function() {
            i.init(o, n);
            var e = i.swfupload = l.data("uploadify");
            e || i.emit("initError", Error("Flash upload installation failed."));
        }, 1);
    }
    var u = e("jquery"), d = e("../../swfobject/2.3/swfobject"), c = e("../../swfupload/2.2/swfupload"), p = {
        init: function(e, t) {
            return this.each(function(n, i) {
                var r = u(i), a = r.clone(), s = u.extend({
                    id: r.attr("id"),
                    swf: "uploadify.swf",
                    uploader: "uploadify.php",
                    auto: !0,
                    buttonClass: "",
                    buttonCursor: "hand",
                    buttonImage: null,
                    buttonText: "SELECT FILES",
                    checkExisting: !1,
                    debug: !1,
                    fileObjName: "Filedata",
                    fileSizeLimit: 0,
                    fileTypeDesc: "All Files",
                    fileTypeExts: "*.*",
                    height: 30,
                    itemTemplate: !1,
                    method: "post",
                    multi: !0,
                    formData: {},
                    preventCaching: !0,
                    progressData: "percentage",
                    queueID: !1,
                    queueSizeLimit: 999,
                    removeCompleted: !0,
                    removeTimeout: 3,
                    requeueErrors: !1,
                    successTimeout: 30,
                    uploadLimit: 0,
                    width: 120,
                    overrideEvents: []
                }, e), p = {
                    assume_success_timeout: s.successTimeout,
                    button_placeholder_id: s.id,
                    button_width: s.width,
                    button_height: s.height,
                    button_text: null,
                    button_text_style: null,
                    button_text_top_padding: 0,
                    button_text_left_padding: 0,
                    button_action: s.multi ? c.BUTTON_ACTION.SELECT_FILES : c.BUTTON_ACTION.SELECT_FILE,
                    button_disabled: !1,
                    button_cursor: "arrow" == s.buttonCursor ? c.CURSOR.ARROW : c.CURSOR.HAND,
                    button_window_mode: c.WINDOW_MODE.TRANSPARENT,
                    debug: s.debug,
                    requeue_on_error: s.requeueErrors,
                    file_post_name: s.fileObjName,
                    file_size_limit: s.fileSizeLimit,
                    file_types: s.fileTypeExts,
                    file_types_description: s.fileTypeDesc,
                    file_queue_limit: s.queueSizeLimit,
                    file_upload_limit: s.uploadLimit,
                    flash_url: s.swf,
                    prevent_swf_caching: s.preventCaching,
                    post_params: s.formData,
                    upload_url: s.uploader,
                    use_query_string: "get" == s.method,
                    file_dialog_complete_handler: f.onDialogClose,
                    file_dialog_start_handler: f.onDialogOpen,
                    file_queued_handler: f.onSelect,
                    file_queue_error_handler: f.onSelectError,
                    swfupload_loaded_handler: s.onSWFReady,
                    upload_complete_handler: f.onUploadComplete,
                    upload_error_handler: f.onUploadError,
                    upload_progress_handler: f.onUploadProgress,
                    upload_start_handler: f.onUploadStart,
                    upload_success_handler: f.onUploadSuccess
                };
                t && (p = u.extend(p, t));
                p = u.extend(p, s);
                var h = d.getFlashPlayerVersion(), m = h.major >= 9;
                if (m) {
                    var g = s.id;
                    if (!u("#uploadify-css")[0]) {
                        var v = ".uploadify-button-wrapper{position:absolute;top:0;left:0;}";
                        u("head").append('<style type="text/css" id="uploadify-css">' + (s.css || v) + (s.cssAddon || "") + "</style>");
                    }
                    "static" === r.css("position") && r.css("position", "relative");
                    var b = o(i), y = r, _ = u('<div class="uploadify-button-wrapper"><div id="' + g + '"></div></div>').appendTo(r);
                    _.css(b);
                    var x = new c(u.extend(p, {
                        button_width: b.width,
                        button_height: b.height
                    }));
                    r.data("uploadify", x);
                    _.attr("id", g).data("uploadify", x).delegate(".cancel a", "click", function(e) {
                        var t = u(e.target).data("file-id");
                        t && l.call(g, "cancel", t);
                    });
                    if (!s.queueID) {
                        var w = u("<div />", {
                            id: s.id + "-queue",
                            "class": "uploadify-queue"
                        });
                        _.after(w);
                        x.settings.queueID = s.id + "-queue";
                        x.settings.defaultQueue = !0;
                    }
                    x.queueData = {
                        files: {},
                        filesSelected: 0,
                        filesQueued: 0,
                        filesReplaced: 0,
                        filesCancelled: 0,
                        filesErrored: 0,
                        uploadsSuccessful: 0,
                        uploadsErrored: 0,
                        averageSpeed: 0,
                        queueLength: 0,
                        queueSize: 0,
                        uploadSize: 0,
                        queueBytesUploaded: 0,
                        uploadQueue: [],
                        errorMsg: "Some files were not added to the queue:"
                    };
                    x.original = a;
                    x.wrapper = _;
                    x.button = y;
                    x.queue = w;
                    s.onInit && s.onInit.call(r, x);
                } else s.onFallback && s.onFallback.call(r);
            });
        },
        cancel: function(e, t) {
            var n = arguments;
            this.each(function() {
                var e = u(this), t = e.data("uploadify"), i = t.settings, o = -1;
                if (n[0]) if ("*" == n[0]) {
                    var r = t.queueData.queueLength;
                    u("#" + i.queueID).find(".uploadify-queue-item").each(function() {
                        o++;
                        n[1] === !0 ? t.cancelUpload(u(this).attr("id"), !1) : t.cancelUpload(u(this).attr("id"));
                        u(this).find(".data").removeClass("data").html(" - Cancelled");
                        u(this).find(".uploadify-progress-bar").remove();
                        u(this).delay(1e3 + 100 * o).fadeOut(500, function() {
                            u(this).remove();
                        });
                    });
                    t.queueData.queueSize = 0;
                    t.queueData.queueLength = 0;
                    i.onClearQueue && i.onClearQueue.call(e, r);
                } else for (var a = 0; a < n.length; a++) {
                    t.cancelUpload(n[a]);
                    u("#" + n[a]).find(".data").removeClass("data").html(" - Cancelled");
                    u("#" + n[a]).find(".uploadify-progress-bar").remove();
                    u("#" + n[a]).delay(1e3 + 100 * a).fadeOut(500, function() {
                        u(this).remove();
                    });
                } else {
                    var s = u("#" + i.queueID).find(".uploadify-queue-item").get(0);
                    $item = u(s);
                    t.cancelUpload($item.attr("id"));
                    $item.find(".data").removeClass("data").html(" - Cancelled");
                    $item.find(".uploadify-progress-bar").remove();
                    $item.delay(1e3).fadeOut(500, function() {
                        u(this).remove();
                    });
                }
            });
        },
        destroy: function() {
            this.each(function() {
                var e = u(this), t = e.data("uploadify"), n = t.settings;
                t.destroy();
                n.defaultQueue && u("#" + n.queueID).remove();
                u("#" + n.id).replaceWith(t.original);
                n.onDestroy && n.onDestroy.call(this);
                t = null;
            });
        },
        disable: function(e) {
            this.each(function() {
                var t = u(this), n = t.data("uploadify"), i = n.settings;
                if (e) {
                    n.button.addClass("disabled");
                    i.onDisable && i.onDisable.call(this);
                } else {
                    n.button.removeClass("disabled");
                    i.onEnable && i.onEnable.call(this);
                }
                n.setButtonDisabled(e);
            });
        },
        settings: function(e, t, n) {
            var i = arguments, o = t;
            this.each(function() {
                var r = u(this), a = r.data("uploadify"), s = a.settings;
                if ("object" == typeof i[0]) for (var l in t) setData(l, t[l]);
                if (1 === i.length) o = s[e]; else {
                    switch (e) {
                      case "uploader":
                        a.setUploadURL(t);
                        break;

                      case "formData":
                        n || (t = u.extend(s.formData, t));
                        a.setPostParams(s.formData);
                        break;

                      case "method":
                        "get" == t ? a.setUseQueryString(!0) : a.setUseQueryString(!1);
                        break;

                      case "fileObjName":
                        a.setFilePostName(t);
                        break;

                      case "fileTypeExts":
                        a.setFileTypes(t, s.fileTypeDesc);
                        break;

                      case "fileTypeDesc":
                        a.setFileTypes(s.fileTypeExts, t);
                        break;

                      case "fileSizeLimit":
                        a.setFileSizeLimit(t);
                        break;

                      case "uploadLimit":
                        a.setFileUploadLimit(t);
                        break;

                      case "queueSizeLimit":
                        a.setFileQueueLimit(t);
                        break;

                      case "buttonImage":
                        a.button.css("background-image", settingValue);
                        break;

                      case "buttonCursor":
                        "arrow" == t ? a.setButtonCursor(c.CURSOR.ARROW) : a.setButtonCursor(c.CURSOR.HAND);
                        break;

                      case "buttonText":
                        u("#" + s.id + "-button").find(".uploadify-button-text").html(t);
                        break;

                      case "width":
                        a.setButtonDimensions(t, s.height);
                        break;

                      case "height":
                        a.setButtonDimensions(s.width, t);
                        break;

                      case "multi":
                        t ? a.setButtonAction(c.BUTTON_ACTION.SELECT_FILES) : a.setButtonAction(c.BUTTON_ACTION.SELECT_FILE);
                    }
                    s[e] = t;
                }
            });
            if (1 === i.length) return o;
        },
        stop: function() {
            this.each(function() {
                var e = u(this), t = e.data("uploadify");
                t.queueData.averageSpeed = 0;
                t.queueData.uploadSize = 0;
                t.queueData.bytesUploaded = 0;
                t.queueData.uploadQueue = [];
                t.stopUpload();
            });
        },
        upload: function() {
            var e = arguments;
            this.each(function() {
                var t = u(this), n = t.data("uploadify");
                n.queueData.averageSpeed = 0;
                n.queueData.uploadSize = 0;
                n.queueData.bytesUploaded = 0;
                n.queueData.uploadQueue = [];
                if (e[0]) if ("*" == e[0]) {
                    n.queueData.uploadSize = n.queueData.queueSize;
                    n.queueData.uploadQueue.push("*");
                    n.startUpload();
                } else {
                    for (var i = 0; i < e.length; i++) {
                        n.queueData.uploadSize += n.queueData.files[e[i]].size;
                        n.queueData.uploadQueue.push(e[i]);
                    }
                    n.startUpload(n.queueData.uploadQueue.shift());
                } else n.startUpload();
            });
        }
    }, f = {
        onDialogOpen: function() {
            var e = this.settings;
            this.queueData.errorMsg = "Some files were not added to the queue:";
            this.queueData.filesReplaced = 0;
            this.queueData.filesCancelled = 0;
            e.onDialogOpen && e.onDialogOpen.call(this);
        },
        onDialogClose: function(e, t, n) {
            var i = this.settings;
            this.queueData.filesErrored = e - t;
            this.queueData.filesSelected = e;
            this.queueData.filesQueued = t - this.queueData.filesCancelled;
            this.queueData.queueLength = n;
            u.inArray("onDialogClose", i.overrideEvents) < 0 && this.queueData.filesErrored > 0 && alert(this.queueData.errorMsg);
            i.onDialogClose && i.onDialogClose.call(this, this.queueData);
            i.auto && l.call(i.id, "upload", "*");
        },
        onSelect: function(e) {
            var t = this.settings, n = {};
            for (var i in this.queueData.files) {
                n = this.queueData.files[i];
                if (1 != n.uploaded && n.name == e.name) {
                    var o = confirm('The file named "' + e.name + '" is already in the queue.\nDo you want to replace the existing item in the queue?');
                    if (!o) {
                        this.cancelUpload(e.id);
                        this.queueData.filesCancelled++;
                        return !1;
                    }
                    u("#" + n.id).remove();
                    this.cancelUpload(n.id);
                    this.queueData.filesReplaced++;
                }
            }
            var r = Math.round(e.size / 1024), a = "KB";
            if (r > 1e3) {
                r = Math.round(r / 1e3);
                a = "MB";
            }
            var s = r.toString().split(".");
            r = s[0];
            s.length > 1 && (r += "." + s[1].substr(0, 2));
            r += a;
            var l = e.name;
            l.length > 25 && (l = l.substr(0, 25) + "...");
            var d = {
                fileID: e.id,
                instanceID: t.id,
                fileName: l,
                fileSize: r
            }, c = t.itemTemplate;
            0 == c && (c = [ '<div id="${fileID}" class="uploadify-queue-item">', '<div class="cancel">', '<a href="javascript:;" data-file-id="${fileID}">X</a>', "</div>", '<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>', '<div class="uploadify-progress">', '<div class="uploadify-progress-bar"><!--Progress Bar--></div>', "</div>", "</div>" ].join(""));
            if (c && u.inArray("onSelect", t.overrideEvents) < 0) {
                c = c.replace(/\$\{([^}]+)\}/g, function(e, t) {
                    return d[t] || e;
                });
                u("#" + t.queueID).append(c);
            }
            this.queueData.queueSize += e.size;
            this.queueData.files[e.id] = e;
            t.onSelect && t.onSelect.apply(this, arguments);
        },
        onSelectError: function(e, t, n) {
            var i = this.settings;
            if (u.inArray("onSelectError", i.overrideEvents) < 0) switch (t) {
              case c.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                i.queueSizeLimit > n ? this.queueData.errorMsg += "\nThe number of files selected exceeds the remaining upload limit (" + n + ")." : this.queueData.errorMsg += "\nThe number of files selected exceeds the queue size limit (" + i.queueSizeLimit + ").";
                break;

              case c.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                this.queueData.errorMsg += '\nThe file "' + e.name + '" exceeds the size limit (' + i.fileSizeLimit + ").";
                break;

              case c.QUEUE_ERROR.ZERO_BYTE_FILE:
                this.queueData.errorMsg += '\nThe file "' + e.name + '" is empty.';
                break;

              case c.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                this.queueData.errorMsg += '\nThe file "' + e.name + '" is not an accepted file type (' + i.fileTypeDesc + ").";
            }
            t != c.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED && delete this.queueData.files[e.id];
            i.onSelectError && i.onSelectError.apply(this, arguments);
        },
        onQueueComplete: function() {
            this.settings.onQueueComplete && this.settings.onQueueComplete.call(this, this.settings.queueData);
        },
        onUploadComplete: function(e) {
            var t = this.settings, n = this, i = this.getStats();
            this.queueData.queueLength = i.files_queued;
            if ("*" == this.queueData.uploadQueue[0]) if (this.queueData.queueLength > 0) this.startUpload(); else {
                this.queueData.uploadQueue = [];
                t.onQueueComplete && t.onQueueComplete.call(this, this.queueData);
            } else if (this.queueData.uploadQueue.length > 0) this.startUpload(this.queueData.uploadQueue.shift()); else {
                this.queueData.uploadQueue = [];
                t.onQueueComplete && t.onQueueComplete.call(this, this.queueData);
            }
            if (u.inArray("onUploadComplete", t.overrideEvents) < 0) if (t.removeCompleted) switch (e.filestatus) {
              case c.FILE_STATUS.COMPLETE:
                setTimeout(function() {
                    if (u("#" + e.id)) {
                        n.queueData.queueSize -= e.size;
                        n.queueData.queueLength -= 1;
                        delete n.queueData.files[e.id];
                        u("#" + e.id).fadeOut(500, function() {
                            u(this).remove();
                        });
                    }
                }, 1e3 * t.removeTimeout);
                break;

              case c.FILE_STATUS.ERROR:
                t.requeueErrors || setTimeout(function() {
                    if (u("#" + e.id)) {
                        n.queueData.queueSize -= e.size;
                        n.queueData.queueLength -= 1;
                        delete n.queueData.files[e.id];
                        u("#" + e.id).fadeOut(500, function() {
                            u(this).remove();
                        });
                    }
                }, 1e3 * t.removeTimeout);
            } else e.uploaded = !0;
            t.onUploadComplete && t.onUploadComplete.call(this, e);
        },
        onUploadError: function(e, t, n) {
            var i = this.settings, o = "Error";
            switch (t) {
              case c.UPLOAD_ERROR.HTTP_ERROR:
                o = "HTTP Error (" + n + ")";
                break;

              case c.UPLOAD_ERROR.MISSING_UPLOAD_URL:
                o = "Missing Upload URL";
                break;

              case c.UPLOAD_ERROR.IO_ERROR:
                o = "IO Error";
                break;

              case c.UPLOAD_ERROR.SECURITY_ERROR:
                o = "Security Error";
                break;

              case c.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                alert("The upload limit has been reached (" + n + ").");
                o = "Exceeds Upload Limit";
                break;

              case c.UPLOAD_ERROR.UPLOAD_FAILED:
                o = "Failed";
                break;

              case c.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
                break;

              case c.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                o = "Validation Error";
                break;

              case c.UPLOAD_ERROR.FILE_CANCELLED:
                o = "Cancelled";
                this.queueData.queueSize -= e.size;
                this.queueData.queueLength -= 1;
                (e.status == c.FILE_STATUS.IN_PROGRESS || u.inArray(e.id, this.queueData.uploadQueue) >= 0) && (this.queueData.uploadSize -= e.size);
                i.onCancel && i.onCancel.call(this, e);
                delete this.queueData.files[e.id];
                break;

              case c.UPLOAD_ERROR.UPLOAD_STOPPED:
                o = "Stopped";
            }
            if (u.inArray("onUploadError", i.overrideEvents) < 0) {
                t != c.UPLOAD_ERROR.FILE_CANCELLED && t != c.UPLOAD_ERROR.UPLOAD_STOPPED && u("#" + e.id).addClass("uploadify-error");
                u("#" + e.id).find(".uploadify-progress-bar").css("width", "1px");
                t != c.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND && e.status != c.FILE_STATUS.COMPLETE && u("#" + e.id).find(".data").html(" - " + o);
            }
            var r = this.getStats();
            this.queueData.uploadsErrored = r.upload_errors;
            i.onUploadError && i.onUploadError.call(this, e, t, n, o);
        },
        onUploadProgress: function(e, t, n) {
            var i = this.settings, o = new Date(), r = o.getTime(), a = r - this.timer;
            a > 500 && (this.timer = r);
            var s = t - this.bytesLoaded;
            this.bytesLoaded = t;
            var l = this.queueData.queueBytesUploaded + t, d = Math.round(t / n * 100), c = "KB/s", p = 0, f = s / 1024 / (a / 1e3);
            f = Math.floor(10 * f) / 10;
            this.queueData.averageSpeed > 0 ? this.queueData.averageSpeed = Math.floor((this.queueData.averageSpeed + f) / 2) : this.queueData.averageSpeed = Math.floor(f);
            if (f > 1e3) {
                p = .001 * f;
                this.queueData.averageSpeed = Math.floor(p);
                c = "MB/s";
            }
            if (u.inArray("onUploadProgress", i.overrideEvents) < 0) {
                "percentage" == i.progressData ? u("#" + e.id).find(".data").html(" - " + d + "%") : "speed" == i.progressData && a > 500 && u("#" + e.id).find(".data").html(" - " + this.queueData.averageSpeed + c);
                u("#" + e.id).find(".uploadify-progress-bar").css("width", d + "%");
            }
            i.onUploadProgress && i.onUploadProgress.call(this, e, t, n, l, this.queueData.uploadSize);
        },
        onUploadStart: function(e) {
            var t = this.settings, n = new Date();
            this.timer = n.getTime();
            this.bytesLoaded = 0;
            0 == this.queueData.uploadQueue.length && (this.queueData.uploadSize = e.size);
            t.checkExisting && u.ajax({
                type: "POST",
                async: !1,
                url: t.checkExisting,
                data: {
                    filename: e.name
                },
                success: function(t) {
                    if (1 == t) {
                        var n = confirm('A file with the name "' + e.name + '" already exists on the server.\nWould you like to replace the existing file?');
                        if (!n) {
                            this.cancelUpload(e.id);
                            u("#" + e.id).remove();
                            this.queueData.uploadQueue.length > 0 && this.queueData.queueLength > 0 && ("*" == this.queueData.uploadQueue[0] ? this.startUpload() : this.startUpload(this.queueData.uploadQueue.shift()));
                        }
                    }
                }
            });
            t.onUploadStart && t.onUploadStart.call(this, e);
        },
        onUploadSuccess: function(e, t, n) {
            var i = this.settings, o = this.getStats();
            this.queueData.uploadsSuccessful = o.successful_uploads;
            this.queueData.queueBytesUploaded += e.size;
            u.inArray("onUploadSuccess", i.overrideEvents) < 0 && u("#" + e.id).find(".data").html(" - Complete");
            try {
                t = t.replace(/\/\*[\s\S]*?\*\//g, "");
                t = u.parseJSON(t);
            } catch (r) {}
            i.onUploadSuccess && i.onUploadSuccess.call(this, e, t, n);
        }
    }, h = 65536 * (1 + Math.random()) | 0;
    u.extend(l.prototype, p, {
        constructor: l,
        each: function(e) {
            this.$holder.each(e);
        },
        handleEvent: function(e, t) {
            var n = this;
            switch (e) {
              case "uploadSuccess":
                var i = t[0], o = t[1], r = +o.error, a = isNaN(r) || r;
                if (a) {
                    t[2] = !1;
                    e = "uploadError";
                    n.cancel(i.id);
                }
                break;

              case "uploadError":
                t = [ t[0], {
                    error: t[1],
                    messageg: t[2],
                    data: t[3]
                } ];
            }
            n.emit(e, t);
        }
    });
    l.call = function(e, t) {
        "string" == typeof e && (e = u("#" + e));
        if (e[0] && p[t]) return p[t].apply(e, Array.prototype.slice.call(arguments, 2));
        throw Error("The method " + t + " does not exist in `uploadify`");
    };
    t = n.exports = l;
    t.uploadify = function(e, t) {
        var n = u(e), i = n.data("uploader");
        return i || (i = new l(e, t, arguments[2]), n.data("uploader", i), i);
    };
});

define("lib/plugins/uploader/1.0.1/tabs/widget", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/dom/build", "lib/core/1.0.0/utils/util" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            type: "null",
            title: "null"
        };
        t._options = e = o.extend({}, n, e);
        t.container = o(t._makeContainer());
        t.container.hide();
        t.title = o(t._makeTitle());
        t._nodes = a.parse(t.container, !1);
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/dom/build"), s = e("lib/core/1.0.0/utils/util");
    s.inherits(i, r);
    i.prototype.$ = function(e, t) {
        var n = this._nodes || (this._nodes = {}), i = n[e];
        if (!i || t && 0 === i.length) {
            i = this.el.find('[node-type="' + e + '"]');
            t && i.length > 0 && (n[e] = i);
        }
        return !t || i.length ? i : null;
    };
    i.prototype._init = function() {
        var e = this;
        e._onEvent();
    };
    i.prototype.activate = function() {
        var e = this;
        if (!e._initialized) {
            e._init();
            e._initialized = !0;
        }
        e.container.show();
        e.title.addClass("activate");
        e.emit("activate");
    };
    i.prototype.deactivate = function() {
        var e = this;
        e.container.hide();
        e.title.removeClass("activate");
    };
    i.prototype._makeContainer = function() {
        var e = "";
        return e;
    };
    i.prototype._onEvent = function() {
    };
    i.prototype._offEvent = function() {
    };
    i.prototype.destroy = function() {
        var e = this;
        e._offEvent();
        e.container.remove();
        e.title.remove();
    };
    i.prototype._makeTitle = function() {
        var e = this;
        return '<li data-tab-type="' + e._options.type + '"><a href="javascript:;">' + e._options.title + "</a></li>";
    };
    n.exports = i;
});

define("lib/plugins/uploader/1.0.1/tabs/local/item", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this;
        t._options = e = o.extend({}, l, e);
        t.el = o(t._make());
        t.file = t._options;
        t._nodes = s.parse(t.el, !1);
        t._onEvent();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/utils/util"), s = e("lib/core/1.0.0/dom/build"), l = {};
    a.inherits(i, r);
    i.prototype.$ = function(e, t) {
        var n = this._nodes || (this._nodes = {}), i = n[e];
        if (!i || t && 0 === i.length) {
            i = this.el.find('[node-type="' + e + '"]');
            t && i.length > 0 && (n[e] = i);
        }
        return !t || i.length ? i : null;
    };
    i.prototype._onEvent = function() {
        var e = this;
        e._nodes.click.on("click", function() {
            e.emit("del");
        });
    };
    i.prototype._offEvent = function() {
        var e = this;
        e._nodes.click.off("click");
    };
    i.prototype.destroy = function() {
        var e = this;
        e._offEvent();
        e.el.remove();
    };
    i.prototype.progress = function(e, t) {
        var n = this, i = e / t * 100;
        n._nodes["progress-line"].css({
            width: i + "%"
        });
        return this;
    };
    i.prototype._make = function() {
        var e = this, t = "";
        t += '<li data-file-id="' + e._options.id + '">';
        t += '    <div class="img-name">' + e._options.name + "</div>";
        t += '    <div class="progress-box"><div class="progress-line" node-type="progress-line"></div></div>';
        t += '    <a class="img-cancel" href="javascript:;" node-type="click">x</a>';
        t += "</li>";
        return t;
    };
    n.exports = i;
});

define("lib/plugins/uploader/1.0.1/tabs/local/local", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/ui/box/1.0.1/box", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build", "lib/plugins/uploadify/3.2.2/uploadify", "../widget", "./item" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            type: "local",
            title: "本地上传",
            fileTypeExts: "*.png;*.jpg;*.gif;*.bmp",
            fileTypeDesc: "图片文件，支持:.png,.jpg,.gif,.bmp",
            fileSizeLimit: "2048KB",
            formData: {},
            swf: "http://s1.zhongzhihui.com/lib/plugins/uploader/1.0.1/uploadify.swf",
            uploader: "/api/upload.php",
            buttonText: "本地上传",
            buttonClass: "",
            height: 54,
            width: "auto",
            debug: !1,
            itemTemplate: null,
            showPreview: !1,
            overrideEvents: [ "onSelect" ],
            onSelect: function(e) {
                t.uploading(!0);
                var n = new u(e);
                t.add(n);
            },
            onUploadProgress: function(e, n, i) {
                t.updateCount();
                var o = t.getItem(e);
                o && o.progress(n, i);
            },
            onUploadSuccess: function(e, n, i) {
                var o = t.getItem(e);
                if (o) {
                    t.emit("add", n.data.url);
                    t.remove(o);
                }
            },
            onQueueComplete: function() {
                t.uploading(!1);
            },
            onFallback: function() {
                r.error("sorry,flash不兼容！");
            }
        };
        t._options = e = o.extend({}, n, e);
        t._items = [];
        l.apply(t, [ t._options ]);
    }
    var o = e("jquery"), r = (e("lib/core/1.0.0/event/emitter"), e("lib/ui/box/1.0.1/box")), a = e("lib/core/1.0.0/utils/util"), s = (e("lib/core/1.0.0/dom/build"), 
    e("lib/plugins/uploadify/3.2.2/uploadify")), l = e("../widget"), u = e("./item");
    a.inherits(i, l);
    i.prototype._init = function() {
        var e = this;
        e.uploader = s.uploadify(e._nodes["btn-upload"][0], e._options);
        e._onEvent();
    };
    i.prototype.add = function(e) {
        var t = this;
        t._items;
        if (!t._isExistItem(e)) {
            t._nodes["img-list"].append(e.el);
            t._items.push(e);
            t._nodes["img-list"].stop().animate({
                scrollTop: t._items.length / 4 * 87
            }, 1e3);
            e.on("del", function() {
                t.remove(e);
            });
        }
    };
    i.prototype._isExistItem = function(e) {
        for (var t = this, n = t._items, i = 0, o = n.length; i < o; i++) if (n[i] === e) return !0;
        return !1;
    };
    i.prototype.getItem = function(e) {
        for (var t = this, n = 0; n < t._items.length; n++) if (e.id === t._items[n].file.id) return t._items[n];
        return null;
    };
    i.prototype.remove = function(e) {
        for (var t = this, n = 0; n < t._items.length; n++) if (e === this._items[n]) {
            t.uploader.cancel(e._options.id);
            e.destroy();
            this._items.splice(n, 1);
            break;
        }
        return this;
    };
    i.prototype.uploading = function(e) {
        var t = this;
        e ? t.container.addClass("local-container-uploading") : t.container.removeClass("local-container-uploading");
    };
    i.prototype._onEvent = function() {
        var e = this;
        e._nodes.cancel.on("click", function() {
            for (var t = 0; t < e._items.length; t++) e.remove(e._items[t]);
            e.uploading(!1);
        });
    };
    i.prototype._offEvent = function() {
        var e = this;
        e._nodes.cancel.off("click");
    };
    i.prototype.updateCount = function() {
        var e = this;
        e._nodes.count.html(e._items.length);
    };
    i.prototype._makeContainer = function() {
        var e = this, t = "";
        t += '<div class="local-container">';
        t += '    <div class="local-init" node-type="local-init">';
        t += '        <div class="local-tips" node-type="local-tips">按住Ctrl可多选图片</div>';
        t += '        <div class="btn btn-primary btn-lg ' + e._options.buttonClass + '"><button node-type="btn-upload"><span class="glyphicon glyphicon-upload"></span>选择上传</button></div>';
        t += "    </div>";
        t += '    <div class="local-uploading" node-type="local-uploading">';
        t += '        <div class="local-op clearfix">';
        t += '            <a class="btn btn-primary btn-xs" node-type="cancel" href="javascript:;"><span class="glyphicon glyphicon-remove"></span>取消上传</a><div><b node-type="count">0</b>张图片等待上传</div>';
        t += "        </div>";
        t += '        <ul class="img-list clearfix" node-type="img-list">';
        t += "        </ul>";
        t += "    </div>";
        t += "</div>";
        return t;
    };
    n.exports = i;
});

define("lib/plugins/uploader/1.0.1/tabs/network/network", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/ui/box/1.0.1/box", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build", "../widget" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            type: "network",
            title: "网络图片",
            pattern: /^((https?|ftp|rmtp|mms):)?\/\//
        };
        t._options = e = o.extend({}, n, e);
        s.apply(t, [ t._options ]);
    }
    var o = e("jquery"), r = (e("lib/core/1.0.0/event/emitter"), e("lib/ui/box/1.0.1/box")), a = e("lib/core/1.0.0/utils/util"), s = (e("lib/core/1.0.0/dom/build"), 
    e("../widget"));
    a.inherits(i, s);
    i.prototype._init = function() {
        var e = this;
        e._onEvent();
    };
    i.prototype._makeContainer = function() {
        var e = "";
        e += '<div class="network-container">';
        e += '    <div class="network-main">';
        e += '        <div class="network-tips">网络图片：</div>';
        e += '        <div class="network-input">';
        e += '            <input node-type="ipt-url" type="input" placeholder="请输入图片地址"> <a href="javascript:;" node-type="add">添加</a>';
        e += "        </div>";
        e += "    </div>";
        e += "</div>";
        return e;
    };
    i.prototype._onEvent = function() {
        var e = this;
        e._nodes.add.on("click", function() {
            var t = e._nodes["ipt-url"].val();
            e._options.pattern.test(t) ? e.emit("add", t) : r.error("网络图片的URL不符合要求，换一个试试！", e._nodes["ipt-url"][0]);
        });
    };
    i.prototype._offEvent = function() {
        var e = this;
        e._nodes.add.off("click");
    };
    n.exports = i;
});

define("lib/plugins/uploader/1.0.1/tabs/album/album", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build", "../widget" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            type: "album",
            title: "相册选择"
        };
        t._options = e = o.extend({}, n, e);
        a.apply(t, [ t._options ]);
    }
    var o = e("jquery"), r = (e("lib/core/1.0.0/event/emitter"), e("lib/core/1.0.0/utils/util")), a = (e("lib/core/1.0.0/dom/build"), 
    e("../widget"));
    r.inherits(i, a);
    i.prototype._init = function() {
        return this;
    };
    i.prototype.add = function(e) {};
    i.prototype._onEvent = function() {
    };
    i.prototype._offEvent = function() {
    };
    i.prototype._makeContainer = function() {
        var e = "";
        e += '<div class="album-container">';
        e += '    <div class="empty">暂未开放此功能,敬请期待！</div>';
        e += '    <ul node-type="img-list" class="img-list clearfix">';
        e += "    </ul>";
        e += "</div>";
        return e;
    };
    n.exports = i;
});

define("lib/plugins/uploader/1.0.1/selected/item", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/ui/box/1.0.1/box", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, n) {
    "use strict";
    function i(e, t) {
        if (!e) throw new Error("the param [url] is required.");
        var n = this;
        n._options = t = o.extend({}, l, t);
        n.url = e;
        n.el = o(n._make());
        n._nodes = s.parse(n.el, !1);
        n._initEvent();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = (e("lib/ui/box/1.0.1/box"), 
    e("lib/core/1.0.0/utils/util")), s = e("lib/core/1.0.0/dom/build"), l = {};
    a.inherits(i, r);
    i.prototype.$ = function(e, t) {
        var n = this._nodes || (this._nodes = {}), i = n[e];
        if (!i || t && 0 === i.length) {
            i = this.el.find('[node-type="' + e + '"]');
            t && i.length > 0 && (n[e] = i);
        }
        return !t || i.length ? i : null;
    };
    i.prototype._initEvent = function(e) {
        void 0 === e && (e = !0);
        var t = this;
        t.el.off("click");
        t._nodes.del.off("click");
        if (e) {
            t.el.on("click", function() {
                t.activate();
            });
            t._nodes.del.on("click", function() {
                t.destroy();
                t.emit("del");
            });
        }
    };
    i.prototype.activate = function() {
        var e = this;
        e.el.addClass("activate");
        e.emit("activate");
    };
    i.prototype.deactivate = function() {
        var e = this;
        e.el.removeClass("activate");
        e.emit("deactivate");
    };
    i.prototype._make = function() {
        var e = this, t = "";
        t += "<li>";
        t += '    <img src="' + e.url + '">';
        t += '    <div class="selected-images-op">';
        t += '        <a href="javascript:;" node-type="del" title="删除">删除</a>';
        t += "    </div>";
        t += '    <div class="selected-images-mask"></div>';
        t += "</li>";
        return t;
    };
    i.prototype.destroy = function() {
        var e = this;
        e._initEvent(!1);
        e.el.remove();
    };
    n.exports = i;
});

define("lib/plugins/uploader/1.0.1/selected/selected", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/ui/box/1.0.1/box", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build", "./item" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this;
        t._options = e = o.extend({}, d, e);
        var n = t._options.selected.length;
        if (0 != t._options.limit && n > t._options.limit) throw new Error("the selected count exceed the limit.");
        t.el = o(t._make());
        t._nodes = l.parse(t.el, !1);
        t._items = [];
        t._activeItem = null;
        for (var i = 0; i < n; i++) {
            var r = new u(t._options.selected[i]);
            t.add(r);
        }
        t._onEvent();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/ui/box/1.0.1/box"), s = e("lib/core/1.0.0/utils/util"), l = e("lib/core/1.0.0/dom/build"), u = e("./item"), d = {
        limit: 0,
        selected: []
    };
    s.inherits(i, r);
    i.prototype.$ = function(e, t) {
        var n = this._nodes || (this._nodes = {}), i = n[e];
        if (!i || t && 0 === i.length) {
            i = this.el.find('[node-type="' + e + '"]');
            t && i.length > 0 && (n[e] = i);
        }
        return !t || i.length ? i : null;
    };
    i.prototype.updateSelectedTips = function() {
        var e = this;
        e._nodes["selected-count"].html(e._items.length);
        e._options.limit > 0 && e._nodes.limit.html("/" + e._options.limit);
    };
    i.prototype._onEvent = function() {
        var e = this;
        e._nodes.del.on("click", function() {
            e._activeItem.destroy();
            e.remove(e._activeItem);
        });
        e._nodes.moveup.on("click", function() {
            e._order(e._activeItem, "moveup");
        });
        e._nodes.movedown.on("click", function() {
            e._order(e._activeItem, "movedown");
        });
    };
    i.prototype._offEvent = function() {
        var e = this;
        e._nodes.del.off("click");
        e._nodes.moveup.off("click");
        e._nodes.movedown.off("click");
    };
    i.prototype._order = function(e, t) {
        var n, i = this, o = i._items;
        if (!e) return this;
        for (var r = 0, a = o.length; r < a; r++) if (e === o[r]) {
            n = o[r];
            if ("moveup" === t) {
                if (r > 0) {
                    o[r] = o[r - 1];
                    o[r - 1] = n;
                    o[r - 1].el.insertBefore(o[r].el);
                    break;
                }
            } else if (r < a - 1) {
                o[r] = o[r + 1];
                o[r + 1] = n;
                o[r].el.insertBefore(o[r + 1].el);
                break;
            }
        }
        return this;
    };
    i.prototype.add = function(e) {
        if (void 0 === e) throw new Error("the param [item] is require.");
        var t = this, n = t._items;
        if (0 != t._options.limit && n.length >= t._options.limit) a.error("超过最大数量（" + t._options.limit + "）限制"); else {
            "string" == typeof e && (e = new u(e));
            if (!t._isExistItem(e)) {
                t._nodes["selected-images"].append(e.el);
                t._items.push(e);
                t._nodes["selected-images"].stop().animate({
                    scrollTop: 87 * t._items.length
                }, 1e3);
                e.on("del", function() {
                    t.remove(this);
                });
                e.on("activate", function() {
                    for (var e = 0, n = t._items.length; e < n; e++) this === t._items[e] ? t._activeItem = this : t._items[e].deactivate();
                });
                t.updateSelectedTips();
            }
        }
    };
    i.prototype._isExistItem = function(e) {
        for (var t = this, n = t._items, i = 0, o = n.length; i < o; i++) if (n[i] === e) return !0;
        return !1;
    };
    i.prototype.remove = function(e) {
        for (var t = this, n = 0; n < t._items.length; n++) if (e === this._items[n]) {
            this._items.splice(n, 1);
            t.updateSelectedTips();
            t.emit("del");
            break;
        }
        return this;
    };
    i.prototype.getUrls = function() {
        for (var e = this, t = [], n = e._items, i = 0, o = n.length; i < o; i++) t.push(n[i].url);
        return t;
    };
    i.prototype._make = function() {
        var e = "";
        e += "<div>";
        e += '    <div class="selected-tips">';
        e += '        已选择图片(<span node-type="selected-count">0</span><span node-type="limit"></span>)';
        e += "    </div>";
        e += '    <div class="selected-op">';
        e += '        <a href="javascript:;" node-type="moveup">上移</a>';
        e += '        <a href="javascript:;" node-type="movedown">下移</a>';
        e += '        <a href="javascript:;" node-type="del">删除</a>';
        e += "    </div>";
        e += '    <ul class="selected-images" node-type="selected-images">';
        e += "    </ul>";
        e += "</div>";
        return e;
    };
    n.exports = i;
});

define("lib/plugins/uploader/1.0.1/uploader", [ "require", "exports", "module", "css!./css/uploader.css", "jquery", "lib/core/1.0.0/event/emitter", "lib/ui/box/1.0.1/box", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build", "./tabs/local/local", "./tabs/network/network", "./tabs/album/album", "./selected/selected" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = this, n = {
            tabs: [ {
                type: "local",
                options: {
                    uploadLimit: 0,
                    swf: "/uploadify.swf",
                    uploader: "/Upload/images/"
                }
            }, {
                type: "network",
                options: {}
            }, {
                type: "album",
                options: {}
            } ],
            limit: 0,
            selected: []
        };
        t._options = e = o.extend({}, n, e);
        t.el = o(t._make());
        var i = a.create({
            content: t.el[0],
            className: "ui-uploader-box",
            title: "图片选择"
        });
        t.box = i;
        t.box.once("shown", function() {
            t.activateTab(t.tabs[0]);
        });
        t._nodes = l.parse(t.el, !1);
        t.tabs = [];
        t._initTabs();
        var r = new d({
            limit: t._options.limit,
            selected: t._options.selected
        });
        t._nodes.selected.append(r.el);
        t.selected = r;
        t._onEvent();
    }
    e("css!./css/uploader.css");
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/ui/box/1.0.1/box"), s = e("lib/core/1.0.0/utils/util"), l = e("lib/core/1.0.0/dom/build"), u = {};
    u.local = e("./tabs/local/local");
    u.network = e("./tabs/network/network");
    u.album = e("./tabs/album/album");
    var d = e("./selected/selected");
    s.inherits(i, r);
    i._id = 0;
    i.prototype.activateTab = function(e) {
        for (var t = this, n = t.tabs, i = 0, o = n.length; i < o; i++) e === n[i] ? t.tabs[i].activate() : t.tabs[i].deactivate();
        return this;
    };
    i.prototype._initTabs = function() {
        for (var e, t = this, n = t._options.tabs, i = 0, o = n.length; i < o; i++) {
            e = new u[n[i].type](n[i].options);
            t.addTab(e);
        }
    };
    i.prototype.addTab = function(e) {
        var t = this, n = t._isExistTab(e);
        if (!n) {
            t._nodes["tab-title"].append(e.title);
            t._nodes["tab-container"].append(e.container);
            t.tabs.push(e);
        }
        return this;
    };
    i.prototype._isExistTab = function(e) {
        for (var t = this, n = t.tabs, i = 0, o = n.length; i < o; i++) if (n[i] === e) return !0;
        return !1;
    };
    i.prototype.$ = function(e, t) {
        var n = this._nodes || (this._nodes = {}), i = n[e];
        if (!i || t && 0 === i.length) {
            i = this.el.find('[node-type="' + e + '"]');
            t && i.length > 0 && (n[e] = i);
        }
        return !t || i.length ? i : null;
    };
    i.prototype._onEvent = function() {
        for (var e = this, t = e.tabs, n = 0, i = t.length; n < i; n++) !function(n) {
            t[n].title.on("click", function() {
                e.activateTab(t[n]);
            });
            t[n].on("add", function(t) {
                e.selected.add(t);
            });
        }(n);
        e._nodes["btn-ok"].on("click", function() {
            e.emit("ok", e.selected.getUrls());
        });
        e._nodes["btn-cancel"].on("click", function() {
            e.hide();
        });
    };
    i.prototype._offEvent = function() {
        for (var e = this, t = e.tabs, n = 0, i = t.length; n < i; n++) t[n].title.off("click");
        e._nodes["btn-ok"].off("click");
        e._nodes["btn-cancel"].off("click");
    };
    i.prototype.show = function() {
        var e = this;
        e.box.show();
        return this;
    };
    i.prototype.hide = function() {
        var e = this;
        e.destroy();
        return this;
    };
    i.prototype.destroy = function() {
        var e = this;
        e._offEvent();
        e.box.hide();
        return this;
    };
    i.prototype._make = function() {
        var e = "";
        e += '<div class="ui-uploader">';
        e += '    <div class="uploader-main clearfix">';
        e += '        <div class="uploader-tab">';
        e += '            <ul class="tab-title" node-type="tab-title">';
        e += "            </ul>";
        e += '            <div class="tab-container" node-type="tab-container">';
        e += "            </div>";
        e += "        </div>";
        e += '        <div class="selected-box" node-type="selected">';
        e += "        </div>";
        e += "    </div>";
        e += '    <div class="uploader-bottom">';
        e += '        <div class="tips" node-type="tips">copyright zhongzhihui.com</div>';
        e += '        <div class="btns">';
        e += '            <a class="btn btn-primary" node-type="btn-ok" href="javascript:;">确定</a>';
        e += '            <a class="btn btn-default" node-type="btn-cancel" href="javascript:;">取消</a>';
        e += "        </div>";
        e += "    </div>";
        e += "</div>";
        return e;
    };
    n.exports = i;
});

!function(e) {
    "function" == typeof define && define.amd ? define("lib/plugins/validation/1.15.1/jquery-validate", [ "jquery" ], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery);
}(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (this.length) {
                var n = e.data(this[0], "validator");
                if (n) return n;
                this.attr("novalidate", "novalidate");
                n = new e.validator(t, this[0]);
                e.data(this[0], "validator", n);
                if (n.settings.onsubmit) {
                    this.on("click.validate", ":submit", function(t) {
                        n.settings.submitHandler && (n.submitButton = t.target);
                        e(this).hasClass("cancel") && (n.cancelSubmit = !0);
                        void 0 !== e(this).attr("formnovalidate") && (n.cancelSubmit = !0);
                    });
                    this.on("submit.validate", function(t) {
                        function i() {
                            var i, o;
                            if (n.settings.submitHandler) {
                                n.submitButton && (i = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm));
                                o = n.settings.submitHandler.call(n, n.currentForm, t);
                                n.submitButton && i.remove();
                                return void 0 !== o && o;
                            }
                            return !0;
                        }
                        n.settings.debug && t.preventDefault();
                        if (n.cancelSubmit) {
                            n.cancelSubmit = !1;
                            return i();
                        }
                        if (n.form()) {
                            if (n.pendingRequest) {
                                n.formSubmitted = !0;
                                return !1;
                            }
                            return i();
                        }
                        n.focusInvalid();
                        return !1;
                    });
                }
                return n;
            }
            t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
        },
        valid: function() {
            var t, n, i;
            if (e(this[0]).is("form")) t = this.validate().form(); else {
                i = [];
                t = !0;
                n = e(this[0].form).validate();
                this.each(function() {
                    t = n.element(this) && t;
                    t || (i = i.concat(n.errorList));
                });
                n.errorList = i;
            }
            return t;
        },
        rules: function(t, n) {
            var i, o, r, a, s, l, u = this[0];
            if (null != u && null != u.form) {
                if (t) {
                    i = e.data(u.form, "validator").settings;
                    o = i.rules;
                    r = e.validator.staticRules(u);
                    switch (t) {
                      case "add":
                        e.extend(r, e.validator.normalizeRule(n));
                        delete r.messages;
                        o[u.name] = r;
                        n.messages && (i.messages[u.name] = e.extend(i.messages[u.name], n.messages));
                        break;

                      case "remove":
                        if (!n) {
                            delete o[u.name];
                            return r;
                        }
                        l = {};
                        e.each(n.split(/\s/), function(t, n) {
                            l[n] = r[n];
                            delete r[n];
                            "required" === n && e(u).removeAttr("aria-required");
                        });
                        return l;
                    }
                }
                a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(u), e.validator.attributeRules(u), e.validator.dataRules(u), e.validator.staticRules(u)), u);
                if (a.required) {
                    s = a.required;
                    delete a.required;
                    a = e.extend({
                        required: s
                    }, a);
                    e(u).attr("aria-required", "true");
                }
                if (a.remote) {
                    s = a.remote;
                    delete a.remote;
                    a = e.extend(a, {
                        remote: s
                    });
                }
                return a;
            }
        }
    });
    e.extend(e.expr[":"], {
        blank: function(t) {
            return !e.trim("" + e(t).val());
        },
        filled: function(t) {
            var n = e(t).val();
            return null !== n && !!e.trim("" + n);
        },
        unchecked: function(t) {
            return !e(t).prop("checked");
        }
    });
    e.validator = function(t, n) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t);
        this.currentForm = n;
        this.init();
    };
    e.validator.format = function(t, n) {
        if (1 === arguments.length) return function() {
            var n = e.makeArray(arguments);
            n.unshift(t);
            return e.validator.format.apply(this, n);
        };
        if (void 0 === n) return t;
        arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1));
        n.constructor !== Array && (n = [ n ]);
        e.each(n, function(e, n) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                return n;
            });
        });
        return t;
    };
    e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e;
                if (this.settings.focusCleanup) {
                    this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass);
                    this.hideThese(this.errorsFor(e));
                }
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e);
            },
            onkeyup: function(t, n) {
                var i = [ 16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225 ];
                9 === n.which && "" === this.elementValue(t) || e.inArray(n.keyCode, i) !== -1 || (t.name in this.submitted || t.name in this.invalid) && this.element(t);
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode);
            },
            highlight: function(t, n, i) {
                "radio" === t.type ? this.findByName(t.name).addClass(n).removeClass(i) : e(t).addClass(n).removeClass(i);
            },
            unhighlight: function(t, n, i) {
                "radio" === t.type ? this.findByName(t.name).removeClass(n).addClass(i) : e(t).removeClass(n).addClass(i);
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t);
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function t(t) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]);
                    var n = e.data(this.form, "validator"), i = "on" + t.type.replace(/^validate/, ""), o = n.settings;
                    o[i] && !e(this).is(o.ignore) && o[i].call(n, this, t);
                }
                this.labelContainer = e(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm);
                this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var n, i = this.groups = {};
                e.each(this.settings.groups, function(t, n) {
                    "string" == typeof n && (n = n.split(/\s/));
                    e.each(n, function(e, n) {
                        i[n] = t;
                    });
                });
                n = this.settings.rules;
                e.each(n, function(t, i) {
                    n[t] = e.validator.normalizeRule(i);
                });
                e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t);
                this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },
            form: function() {
                this.checkForm();
                e.extend(this.submitted, this.errorMap);
                this.invalid = e.extend({}, this.errorMap);
                this.valid() || e(this.currentForm).triggerHandler("invalid-form", [ this ]);
                this.showErrors();
                return this.valid();
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid();
            },
            element: function(t) {
                var n, i, o = this.clean(t), r = this.validationTargetFor(o), a = this, s = !0;
                if (void 0 === r) delete this.invalid[o.name]; else {
                    this.prepareElement(r);
                    this.currentElements = e(r);
                    i = this.groups[r.name];
                    i && e.each(this.groups, function(e, t) {
                        if (t === i && e !== r.name) {
                            o = a.validationTargetFor(a.clean(a.findByName(e)));
                            if (o && o.name in a.invalid) {
                                a.currentElements.push(o);
                                s = a.check(o) && s;
                            }
                        }
                    });
                    n = this.check(r) !== !1;
                    s = s && n;
                    n ? this.invalid[r.name] = !1 : this.invalid[r.name] = !0;
                    this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers));
                    this.showErrors();
                    e(t).attr("aria-invalid", !n);
                }
                return s;
            },
            showErrors: function(t) {
                if (t) {
                    var n = this;
                    e.extend(this.errorMap, t);
                    this.errorList = e.map(this.errorMap, function(e, t) {
                        return {
                            message: e,
                            element: n.findByName(t)[0]
                        };
                    });
                    this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t);
                    });
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm();
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t);
            },
            resetElements: function(e) {
                var t;
                if (this.settings.unhighlight) for (t = 0; e[t]; t++) {
                    this.settings.unhighlight.call(this, e[t], this.settings.errorClass, "");
                    this.findByName(e[t].name).removeClass(this.settings.validClass);
                } else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },
            objectLength: function(e) {
                var t, n = 0;
                for (t in e) e[t] && n++;
                return n;
            },
            hideErrors: function() {
                this.hideThese(this.toHide);
            },
            hideThese: function(e) {
                e.not(this.containers).text("");
                this.addWrapper(e).hide();
            },
            valid: function() {
                return 0 === this.size();
            },
            size: function() {
                return this.errorList.length;
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function(e) {
                    return e.element.name === t.name;
                }).length && t;
            },
            elements: function() {
                var t = this, n = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var i = this.name || e(this).attr("name");
                    !i && t.settings.debug && window.console && console.error("%o has no name assigned", this);
                    this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]);
                    if (i in n || !t.objectLength(e(this).rules())) return !1;
                    n[i] = !0;
                    return !0;
                });
            },
            clean: function(t) {
                return e(t)[0];
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext);
            },
            resetInternals: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = e([]);
                this.toHide = e([]);
            },
            reset: function() {
                this.resetInternals();
                this.currentElements = e([]);
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function(e) {
                this.reset();
                this.toHide = this.errorsFor(e);
            },
            elementValue: function(t) {
                var n, i, o = e(t), r = t.type;
                if ("radio" === r || "checkbox" === r) return this.findByName(t.name).filter(":checked").val();
                if ("number" === r && "undefined" != typeof t.validity) return t.validity.badInput ? "NaN" : o.val();
                n = t.hasAttribute("contenteditable") ? o.text() : o.val();
                if ("file" === r) {
                    if ("C:\\fakepath\\" === n.substr(0, 12)) return n.substr(12);
                    i = n.lastIndexOf("/");
                    if (i >= 0) return n.substr(i + 1);
                    i = n.lastIndexOf("\\");
                    return i >= 0 ? n.substr(i + 1) : n;
                }
                return "string" == typeof n ? n.replace(/\r/g, "") : n;
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var n, i, o, r = e(t).rules(), a = e.map(r, function(e, t) {
                    return t;
                }).length, s = !1, l = this.elementValue(t);
                if ("function" == typeof r.normalizer) {
                    l = r.normalizer.call(t, l);
                    if ("string" != typeof l) throw new TypeError("The normalizer should return a string value.");
                    delete r.normalizer;
                }
                for (i in r) {
                    o = {
                        method: i,
                        parameters: r[i]
                    };
                    try {
                        n = e.validator.methods[i].call(this, l, t, o.parameters);
                        if ("dependency-mismatch" === n && 1 === a) {
                            s = !0;
                            continue;
                        }
                        s = !1;
                        if ("pending" === n) {
                            this.toHide = this.toHide.not(this.errorsFor(t));
                            return;
                        }
                        if (!n) {
                            this.formatAndAdd(t, o);
                            return !1;
                        }
                    } catch (u) {
                        this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + o.method + "' method.", u);
                        u instanceof TypeError && (u.message += ".  Exception occurred when checking element " + t.id + ", check the '" + o.method + "' method.");
                        throw u;
                    }
                }
                if (!s) {
                    this.objectLength(r) && this.successList.push(t);
                    return !0;
                }
            },
            customDataMessage: function(t, n) {
                return e(t).data("msg" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()) || e(t).data("msg");
            },
            customMessage: function(e, t) {
                var n = this.settings.messages[e];
                return n && (n.constructor === String ? n : n[t]);
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++) if (void 0 !== arguments[e]) return arguments[e];
            },
            defaultMessage: function(t, n) {
                "string" == typeof n && (n = {
                    method: n
                });
                var i = this.findDefined(this.customMessage(t.name, n.method), this.customDataMessage(t, n.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[n.method], "<strong>Warning: No message defined for " + t.name + "</strong>"), o = /\$?\{(\d+)\}/g;
                "function" == typeof i ? i = i.call(this, n.parameters, t) : o.test(i) && (i = e.validator.format(i.replace(o, "{$1}"), n.parameters));
                return i;
            },
            formatAndAdd: function(e, t) {
                var n = this.defaultMessage(e, t);
                this.errorList.push({
                    message: n,
                    element: e,
                    method: t.method
                });
                this.errorMap[e.name] = n;
                this.submitted[e.name] = n;
            },
            addWrapper: function(e) {
                this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper)));
                return e;
            },
            defaultShowErrors: function() {
                var e, t, n;
                for (e = 0; this.errorList[e]; e++) {
                    n = this.errorList[e];
                    this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass);
                    this.showLabel(n.element, n.message);
                }
                this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                if (this.settings.success) for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight) for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element;
                });
            },
            showLabel: function(t, n) {
                var i, o, r, a, s = this.errorsFor(t), l = this.idOrName(t), u = e(t).attr("aria-describedby");
                if (s.length) {
                    s.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    s.html(n);
                } else {
                    s = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(n || "");
                    i = s;
                    this.settings.wrapper && (i = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent());
                    this.labelContainer.length ? this.labelContainer.append(i) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, i, e(t)) : i.insertAfter(t);
                    if (s.is("label")) s.attr("for", l); else if (0 === s.parents("label[for='" + this.escapeCssMeta(l) + "']").length) {
                        r = s.attr("id");
                        u ? u.match(new RegExp("\\b" + this.escapeCssMeta(r) + "\\b")) || (u += " " + r) : u = r;
                        e(t).attr("aria-describedby", u);
                        o = this.groups[t.name];
                        if (o) {
                            a = this;
                            e.each(a.groups, function(t, n) {
                                n === o && e("[name='" + a.escapeCssMeta(t) + "']", a.currentForm).attr("aria-describedby", s.attr("id"));
                            });
                        }
                    }
                }
                if (!n && this.settings.success) {
                    s.text("");
                    "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, t);
                }
                this.toShow = this.toShow.add(s);
            },
            errorsFor: function(t) {
                var n = this.escapeCssMeta(this.idOrName(t)), i = e(t).attr("aria-describedby"), o = "label[for='" + n + "'], label[for='" + n + "'] *";
                i && (o = o + ", #" + this.escapeCssMeta(i).replace(/\s+/g, ", #"));
                return this.errors().filter(o);
            },
            escapeCssMeta: function(e) {
                return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1");
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name);
            },
            validationTargetFor: function(t) {
                this.checkable(t) && (t = this.findByName(t.name));
                return e(t).not(this.settings.ignore)[0];
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type);
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']");
            },
            getLength: function(t, n) {
                switch (n.nodeName.toLowerCase()) {
                  case "select":
                    return e("option:selected", n).length;

                  case "input":
                    if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length;
                }
                return t.length;
            },
            depend: function(e, t) {
                return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t);
            },
            dependTypes: {
                "boolean": function(e) {
                    return e;
                },
                string: function(t, n) {
                    return !!e(t, n.form).length;
                },
                "function": function(e, t) {
                    return e(t);
                }
            },
            optional: function(t) {
                var n = this.elementValue(t);
                return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch";
            },
            startRequest: function(t) {
                if (!this.pending[t.name]) {
                    this.pendingRequest++;
                    e(t).addClass(this.settings.pendingClass);
                    this.pending[t.name] = !0;
                }
            },
            stopRequest: function(t, n) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                e(t).removeClass(this.settings.pendingClass);
                if (n && 0 === this.pendingRequest && this.formSubmitted && this.form()) {
                    e(this.currentForm).submit();
                    this.formSubmitted = !1;
                } else if (!n && 0 === this.pendingRequest && this.formSubmitted) {
                    e(this.currentForm).triggerHandler("invalid-form", [ this ]);
                    this.formSubmitted = !1;
                }
            },
            previousValue: function(t, n) {
                n = "string" == typeof n && n || "remote";
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: n
                    })
                });
            },
            destroy: function() {
                this.resetForm();
                e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur");
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, n) {
            t.constructor === String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t);
        },
        classRules: function(t) {
            var n = {}, i = e(t).attr("class");
            i && e.each(i.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this]);
            });
            return n;
        },
        normalizeAttributeRule: function(e, t, n, i) {
            if (/min|max|step/.test(n) && (null === t || /number|range|text/.test(t))) {
                i = Number(i);
                isNaN(i) && (i = void 0);
            }
            i || 0 === i ? e[n] = i : t === n && "range" !== t && (e[n] = !0);
        },
        attributeRules: function(t) {
            var n, i, o = {}, r = e(t), a = t.getAttribute("type");
            for (n in e.validator.methods) {
                if ("required" === n) {
                    i = t.getAttribute(n);
                    "" === i && (i = !0);
                    i = !!i;
                } else i = r.attr(n);
                this.normalizeAttributeRule(o, a, n, i);
            }
            o.maxlength && /-1|2147483647|524288/.test(o.maxlength) && delete o.maxlength;
            return o;
        },
        dataRules: function(t) {
            var n, i, o = {}, r = e(t), a = t.getAttribute("type");
            for (n in e.validator.methods) {
                i = r.data("rule" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase());
                this.normalizeAttributeRule(o, a, n, i);
            }
            return o;
        },
        staticRules: function(t) {
            var n = {}, i = e.data(t.form, "validator");
            i.settings.rules && (n = e.validator.normalizeRule(i.settings.rules[t.name]) || {});
            return n;
        },
        normalizeRules: function(t, n) {
            e.each(t, function(i, o) {
                if (o !== !1) {
                    if (o.param || o.depends) {
                        var r = !0;
                        switch (typeof o.depends) {
                          case "string":
                            r = !!e(o.depends, n.form).length;
                            break;

                          case "function":
                            r = o.depends.call(n, n);
                        }
                        if (r) t[i] = void 0 === o.param || o.param; else {
                            e.data(n.form, "validator").resetElements(e(n));
                            delete t[i];
                        }
                    }
                } else delete t[i];
            });
            e.each(t, function(i, o) {
                t[i] = e.isFunction(o) && "normalizer" !== i ? o(n) : o;
            });
            e.each([ "minlength", "maxlength" ], function() {
                t[this] && (t[this] = Number(t[this]));
            });
            e.each([ "rangelength", "range" ], function() {
                var n;
                if (t[this]) if (e.isArray(t[this])) t[this] = [ Number(t[this][0]), Number(t[this][1]) ]; else if ("string" == typeof t[this]) {
                    n = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                    t[this] = [ Number(n[0]), Number(n[1]) ];
                }
            });
            if (e.validator.autoCreateRanges) {
                if (null != t.min && null != t.max) {
                    t.range = [ t.min, t.max ];
                    delete t.min;
                    delete t.max;
                }
                if (null != t.minlength && null != t.maxlength) {
                    t.rangelength = [ t.minlength, t.maxlength ];
                    delete t.minlength;
                    delete t.maxlength;
                }
            }
            return t;
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var n = {};
                e.each(t.split(/\s/), function() {
                    n[this] = !0;
                });
                t = n;
            }
            return t;
        },
        addMethod: function(t, n, i) {
            e.validator.methods[t] = n;
            e.validator.messages[t] = void 0 !== i ? i : e.validator.messages[t];
            n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t));
        },
        methods: {
            required: function(t, n, i) {
                if (!this.depend(i, n)) return "dependency-mismatch";
                if ("select" === n.nodeName.toLowerCase()) {
                    var o = e(n).val();
                    return o && o.length > 0;
                }
                return this.checkable(n) ? this.getLength(t, n) > 0 : t.length > 0;
            },
            email: function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e);
            },
            url: function(e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e);
            },
            date: function(e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString());
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e);
            },
            number: function(e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e);
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e);
            },
            minlength: function(t, n, i) {
                var o = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || o >= i;
            },
            maxlength: function(t, n, i) {
                var o = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || o <= i;
            },
            rangelength: function(t, n, i) {
                var o = e.isArray(t) ? t.length : this.getLength(t, n);
                return this.optional(n) || o >= i[0] && o <= i[1];
            },
            min: function(e, t, n) {
                return this.optional(t) || e >= n;
            },
            max: function(e, t, n) {
                return this.optional(t) || e <= n;
            },
            range: function(e, t, n) {
                return this.optional(t) || e >= n[0] && e <= n[1];
            },
            step: function(t, n, i) {
                var o, r = e(n).attr("type"), a = "Step attribute on input type " + r + " is not supported.", s = [ "text", "number", "range" ], l = new RegExp("\\b" + r + "\\b"), u = r && !l.test(s.join()), d = function(e) {
                    var t = ("" + e).match(/(?:\.(\d+))?$/);
                    return t && t[1] ? t[1].length : 0;
                }, c = function(e) {
                    return Math.round(e * Math.pow(10, o));
                }, p = !0;
                if (u) throw new Error(a);
                o = d(i);
                (d(t) > o || c(t) % c(i) !== 0) && (p = !1);
                return this.optional(n) || p;
            },
            equalTo: function(t, n, i) {
                var o = e(i);
                this.settings.onfocusout && o.not(".validate-equalTo-blur").length && o.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    e(n).valid();
                });
                return t === o.val();
            },
            remote: function(t, n, i, o) {
                if (this.optional(n)) return "dependency-mismatch";
                o = "string" == typeof o && o || "remote";
                var r, a, s, l = this.previousValue(n, o);
                this.settings.messages[n.name] || (this.settings.messages[n.name] = {});
                l.originalMessage = l.originalMessage || this.settings.messages[n.name][o];
                this.settings.messages[n.name][o] = l.message;
                i = "string" == typeof i && {
                    url: i
                } || i;
                s = e.param(e.extend({
                    data: t
                }, i.data));
                if (l.old === s) return l.valid;
                l.old = s;
                r = this;
                this.startRequest(n);
                a = {};
                a[n.name] = t;
                e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + n.name,
                    dataType: "json",
                    data: a,
                    context: r.currentForm,
                    success: function(e) {
                        var i, a, s, u = e === !0 || "true" === e;
                        r.settings.messages[n.name][o] = l.originalMessage;
                        if (u) {
                            s = r.formSubmitted;
                            r.resetInternals();
                            r.toHide = r.errorsFor(n);
                            r.formSubmitted = s;
                            r.successList.push(n);
                            r.invalid[n.name] = !1;
                            r.showErrors();
                        } else {
                            i = {};
                            a = e || r.defaultMessage(n, {
                                method: o,
                                parameters: t
                            });
                            i[n.name] = l.message = a;
                            r.invalid[n.name] = !0;
                            r.showErrors(i);
                        }
                        l.valid = u;
                        r.stopRequest(n, u);
                    }
                }, i));
                return "pending";
            }
        }
    });
    var t, n = {};
    if (e.ajaxPrefilter) e.ajaxPrefilter(function(e, t, i) {
        var o = e.port;
        if ("abort" === e.mode) {
            n[o] && n[o].abort();
            n[o] = i;
        }
    }); else {
        t = e.ajax;
        e.ajax = function(i) {
            var o = ("mode" in i ? i : e.ajaxSettings).mode, r = ("port" in i ? i : e.ajaxSettings).port;
            if ("abort" === o) {
                n[r] && n[r].abort();
                n[r] = t.apply(this, arguments);
                return n[r];
            }
            return t.apply(this, arguments);
        };
    }
});

!function(e) {
    "function" == typeof define && define.amd ? define("lib/plugins/validation/1.15.1/localization/messages_zh", [ "jquery", "../jquery-validate" ], e) : e(jQuery);
}(function(e) {
    e.extend(e.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: e.validator.format("最多可以输入 {0} 个字符"),
        minlength: e.validator.format("最少要输入 {0} 个字符"),
        rangelength: e.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: e.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: e.validator.format("请输入不大于 {0} 的数值"),
        min: e.validator.format("请输入不小于 {0} 的数值")
    });
});

define("plugins/validator/1.0.0/validator", [ "require", "exports", "module", "jquery", "lib/plugins/validation/1.15.1/jquery-validate", "lib/plugins/validation/1.15.1/localization/messages_zh" ], function(e, t, n) {
    "use strict";
    function i(e) {
        var t = !0, n = {
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            21: 1,
            22: 1,
            23: 1,
            31: 1,
            32: 1,
            33: 1,
            34: 1,
            35: 1,
            36: 1,
            37: 1,
            41: 1,
            42: 1,
            43: 1,
            44: 1,
            45: 1,
            46: 1,
            50: 1,
            51: 1,
            52: 1,
            53: 1,
            54: 1,
            61: 1,
            62: 1,
            63: 1,
            64: 1,
            65: 1,
            71: 1,
            81: 1,
            82: 1,
            91: 1
        };
        if (e && /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e)) if (n[e.substr(0, 2)]) {
            if (18 == e.length) {
                e = e.split("");
                for (var i = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ], o = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ], r = 0, a = 0, s = 0, l = 0; l < 17; l++) {
                    a = e[l];
                    s = i[l];
                    r += a * s;
                }
                o[r % 11];
                o[r % 11] != e[17] && (t = !1);
            }
        } else t = !1; else t = !1;
        return t;
    }
    var o = e("jquery");
    e("lib/plugins/validation/1.15.1/jquery-validate");
    e("lib/plugins/validation/1.15.1/localization/messages_zh");
    var r = /^(\d{3,4}-?)?\d{7,9}$/, a = /^0?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/, s = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, l = /^\d{5,20}$/, u = [ {
        name: "email",
        text: "请正确填写您的邮箱地址",
        func: function(e, t) {
            return this.optional(t) || s.test(e);
        }
    }, {
        name: "mobile",
        text: "请正确填写您的手机号码",
        func: function(e, t) {
            return this.optional(t) || a.test(e);
        }
    }, {
        name: "phone",
        text: "请正确输入您的电话号码",
        func: function(e, t) {
            return this.optional(t) || r.test(e) || a.test(e);
        }
    }, {
        name: "isIdCardNo",
        text: "请正确输入您的身份证号码",
        func: function(e, t) {
            return this.optional(t) || i(e);
        }
    }, {
        name: "isNoneMalformed",
        text: "请不要输入特殊字符",
        func: function(e, t) {
            return this.optional(t) || !/[\[\]`~!@#$^&*()=|{}'":;,.<>\/?！￥…（）—|【】‘；：“”。，、？%+ 　\\]/.test(e);
        }
    }, {
        name: "isFinanceBankCardno",
        text: "银行卡号格式不正确，请重新输入(不包含空格或者-等连接符号)",
        func: function(e, t) {
            return this.optional(t) || l.test(e);
        }
    }, {
        name: "realname",
        text: "姓名需2-10个汉字之间",
        func: function(e, t) {
            return this.optional(t) || /([\u4e00-\u9fa5]{2,4})/.test(e);
        }
    }, {
        name: "qq",
        text: "请输入5-11位QQ号码",
        func: function(e, t) {
            return this.optional(t) || /^\d{5,11}$/.test(e);
        }
    }, {
        name: "wechat",
        text: "请输入6-20个字母,数字,— ,_以字母开头",
        func: function(e, t) {
            return this.optional(t) || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(e);
        }
    }, {
        name: "password",
        text: "请输入正确的密码",
        func: function(e, t) {
            return this.optional(t) || /^(?=.{6,16}$)(?![0-9]+$)(?!.*(.).*\1)[0-9a-zA-Z]+$/;
        }
    } ];
    o.each(u, function(e, t) {
        o.validator.addMethod(t.name, t.func, t.text);
    });
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), o = e("../utils/util"), r = e("../event/emitter"), a = o.setImmediate, s = o.noop, l = o.extend, u = i.trim, d = i.parseJSON, c = function(e, t, n) {
        return function(i, o) {
            try {
                return e.apply(t, arguments);
            } catch (r) {
                n && n(r, i, o);
            }
        };
    }, p = function(e) {
        return t.emit.apply(t, arguments);
    };
    r.applyTo(t);
    var f = function() {
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
        e = l(t, e);
        delete e.error;
        delete e.success;
        this._opts = e;
    };
    l(h.prototype, {
        send: function() {
            var e = this, t = this._opts, n = l({}, t), i = "jsonp" === n.dataType;
            i && (n.crossDomain = !0);
            n.complete = function(n, o) {
                var r, a = +n.status, s = n.responseJSON, l = {
                    error: "1",
                    msg: "Request error (status: " + (o || a) + ")"
                }, c = 200 === a || "success" === o;
                if (!i && !s) {
                    s = u(n.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = d(s);
                    } catch (p) {}
                }
                c || (s = s || l);
                r = {
                    data: s,
                    xhr: n,
                    origin: t,
                    status: a || o
                };
                c ? e.emit("response", null, r) : e.emit("error", s, r);
                e.emit("end", r);
                e.destroy();
            };
            f(e, n);
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
            p("error", o, n);
            a(function() {
                console.log("%c " + i, "color:#ae0000");
            }, 1);
        }, l = c(t.error || s, null, r), u = c(t.success || s, null, r);
        if (p("request", o, n) !== !1) {
            if (n && (n = i(n))) {
                var d, f, m = "data-async-lock";
                if (1 === +n.attr(m)) return;
                if (f = n.attr("data-async-text")) {
                    d = n.html();
                    n.html(f);
                }
                n.attr(m, 1);
                o.once("response error", function() {
                    if (n) {
                        n.attr(m, 0);
                        f && n.html(d);
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
                p("error", n, t) !== !1 && l(e);
            });
            o.on("response", function(e, t) {
                t = t.data;
                p("response", t) !== !1 && (e ? l(e) : t && 0 === +(t.error || 0) ? u(t) : l(t));
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
            "string" == typeof e ? s.url = e : l(s, e);
            var u = n;
            if ("jsonp" === n) {
                u = "get";
                s.dataType = "jsonp";
            }
            s.type = u;
            return t.ajax(s, a);
        };
    });
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

define("conf/uc/person-info", [ "require", "exports", "module", "jquery", "./common", "lib/core/1.0.0/utils/form", "lib/ui/box/1.0.1/box", "lib/plugins/lazyload/1.9.3/lazyload", "lib/plugins/uploader/1.0.1/uploader", "plugins/validator/1.0.0/validator", "lib/core/1.0.0/io/request", "lib/ui/tab/1.0.0/tab" ], function(e, t, n) {
    "use strict";
    function i() {
        a("#jInfoForm").validate({
            onfocusout: function(e) {
                a(e).valid();
            },
            submitHandler: function(e) {
                var t = l.serializeForm(e);
                c.post($PAGE_DATA.submit, t, function(e) {
                    u.alert("保存成功", function() {
                        window.location.reload();
                    });
                }, function(e) {
                    u.error(e && e.msg || "保存失败");
                });
            },
            rules: {
                password: {
                    minlength: 2,
                    maxlength: 12
                },
                nickName: {
                    required: !0,
                    minlength: 2,
                    maxlength: 12
                },
                realName: {
                    required: !0,
                    realname: !0
                },
                mobile: {
                    required: !0,
                    mobile: !0,
                    minlength: 11
                },
                email: {
                    required: !0,
                    email: !0
                },
                job: {
                    required: !0,
                    minlength: 2,
                    maxlength: 12
                },
                unit: {
                    required: !0,
                    minlength: 2,
                    maxlength: 20
                },
                qq: {
                    qq: !0
                },
                address: {
                    minlength: 2,
                    maxlength: 45
                }
            },
            messages: {
                unit: {
                    required: "请输入您所属的公司名字"
                },
                email: {
                    required: "请输入您的邮箱"
                },
                realName: {
                    required: "请输入您的真实姓名"
                },
                mobile: {
                    required: "请输入您的手机号码"
                },
                job: {
                    required: "请输入您的职业"
                },
                nickName: {
                    required: "请输入您的昵称"
                }
            }
        });
    }
    function o() {
        s.validate({
            onfocusout: function(e) {
                a(e).valid();
            },
            submitHandler: function(e) {
                var t = l.serializeForm(e);
                c.post($PAGE_DATA.editInfo, t, function(e) {
                    u.alert("密码修改成功", function() {
                        window.location.reload();
                    });
                }, function(e) {
                    u.error(e.msg || "保存失败了");
                });
            },
            rules: {
                oldPassword: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16
                },
                newPassword: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16
                },
                rePassword: {
                    required: !0,
                    minlength: 6,
                    maxlength: 16,
                    equalTo: "#nepassword"
                }
            },
            messages: {
                password: {
                    required: "密码格式不正确"
                },
                nepassword: {
                    required: "密码格式不正确",
                    equalTo: "密码输入不一致"
                },
                snewpassword: {
                    required: "密码格式不正确",
                    equalTo: "密码输入不一致"
                }
            }
        });
    }
    function r(e) {
        var t;
        a.ajax({
            url: e,
            dataType: "json",
            type: "POST",
            async: !1,
            success: function(e) {
                t = e.regionInfoList;
            }
        });
        return t;
    }
    var a = e("jquery"), s = a("#jFormPwd");
    e("./common");
    var l = e("lib/core/1.0.0/utils/form"), u = e("lib/ui/box/1.0.1/box"), d = (e("lib/plugins/lazyload/1.9.3/lazyload"), 
    e("lib/plugins/uploader/1.0.1/uploader"));
    e("plugins/validator/1.0.0/validator");
    var c = e("lib/core/1.0.0/io/request"), p = a("#jAvater"), f = a(".jImg");
    e();
    p.on("click", function() {
        var e = new d({
            tabs: [ {
                type: "local",
                options: {
                    fileObjName: "file_data",
                    swf: $PAGE_DATA.swf,
                    uploader: $PAGE_DATA.uploader,
                    formData: a.extend(!0, {}, $PAGE_DATA.uploadData)
                }
            } ],
            limit: 1,
            selected: []
        });
        e.on("ok", function(e) {
            if (e.length > 0) {
                f.attr("src", e[0]);
                p.val(e[0]);
                a("#avatarUrl").val(e[0]);
            }
            this.hide();
        });
        e.show();
    });
    i();
    o();
    a(".jMSubBtn").click(function() {
        a("#jInfoForm").submit();
    });
    a(".jSubBtn").click(function() {
        a("#jFormPwd").submit();
    });
    var h = e("lib/ui/tab/1.0.0/tab"), m = a("#jIfmTab"), g = new h(m);
    g.setCurrent();
    a("base").attr("href");
    a.extend({
        loadAreaSelect: function(e) {
            var t = a("#" + e), n = t.find("select").eq(0), i = n.attr("name"), o = r($PAGE_DATA.location);
            n.empty();
            n.append("<option value='0'>请选择省</option>");
            if (null != o) {
                a.each(o, function(e, t) {
                    n.append("<option value='" + t.id + "'>" + t.name + "</option>");
                });
                var s = a("input[name='" + i + "_hide']").val();
                if ("undefined" != typeof s && "" != s && null != s && "0" != s) {
                    n.val(s);
                    var l = t.find("select").eq(1), u = l.attr("name");
                    l.empty();
                    l.append("<option value='0'>请选择市</option>");
                    var d = r($PAGE_DATA.location + s);
                    if (0 != d) {
                        a.each(d, function(e, t) {
                            l.append("<option value='" + t.id + "'>" + t.name + "</option>");
                        });
                        var c = a("input[name='" + u + "_hide']").val();
                        if ("" != c && "undefined" != typeof c && null != c && "0" != c) {
                            l.val(c);
                            var p = t.find("select").eq(2), f = p.attr("name"), h = a("input[name='" + f + "_hide']").val(), m = r($PAGE_DATA.location + c);
                            p.empty();
                            p.append("<option value='0'>请选择县/区</option>");
                            if (null != m) {
                                a.each(m, function(e, t) {
                                    p.append("<option value='" + t.id + "'>" + t.name + "</option>");
                                });
                                "" != h && "undefined" != typeof h && null != h && "0" != h && p.val(h);
                            }
                        }
                    }
                }
            }
            n.change(function() {
                t.find("select").each(function(e) {
                    switch (e) {
                      case 1:
                        a(this).empty();
                        a(this).append("<option value='0'>请选择市</option>");
                        break;

                      case 2:
                        a(this).empty();
                        a(this).append("<option value='0'>请选择区/县</option>");
                    }
                });
                var e = a(this).val(), n = r($PAGE_DATA.location + e);
                0 != n && a.each(n, function(e, t) {
                    l.append("<option value='" + t.id + "'>" + t.name + "</option>");
                });
            });
            var g = a("#" + n.attr("name") + "_hid").val(), l = t.find("select").eq(1);
            if (null != g && "undefined" != typeof g && "" != g) {
                n.val(g);
                var v = r($PAGE_DATA.location + g);
                l.empty();
                l.append("<option value='0'>请选择市</option>");
                0 != v && a.each(v, function(e, t) {
                    l.append("<option value='" + t.id + "'>" + t.name + "</option>");
                });
            }
            l.change(function() {
                var e = a(this).val(), t = r($PAGE_DATA.location + e);
                p.empty();
                p.append("<option value='0'>请选择县/区</option>");
                null != t && a.each(t, function(e, t) {
                    p.append("<option value='" + t.id + "'>" + t.name + "</option>");
                });
            });
            var b = a("#" + l.attr("name") + "_hid").val(), p = t.find("select").eq(2);
            if (null != b && "undefined" != typeof b && "" != b) {
                l.val(b);
                var m = r($PAGE_DATA.location + b);
                p.empty();
                p.append("<option value='0'>请选择县/区</option>");
                null != m && a.each(m, function(e, t) {
                    p.append("<option value='" + t.id + "'>" + t.name + "</option>");
                });
            }
            var y = a("#" + p.attr("name") + "_hid").val();
            null != y && "undefined" != typeof y && "" != y && p.val(y);
        }
    });
    a.loadAreaSelect("areaSelect");
});

!function(e) {
    var t = document, n = "appendChild", i = "styleSheet", o = t.createElement("style");
    o.type = "text/css";
    t.getElementsByTagName("head")[0][n](o);
    o[i] ? o[i].cssText = e : o[n](t.createTextNode(e));
    return o;
}('/* line 3, uploader.scss */\n.ui-uploader-box * {\n  box-sizing: content-box;\n}\n/* line 6, uploader.scss */\n.ui-uploader-box .btn {\n  display: inline-block;\n  padding: 0 12px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: 400;\n  height: 26px;\n  line-height: 26px;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  user-select: none;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 2px;\n}\n/* line 24, uploader.scss */\n.ui-uploader-box .btn-xs {\n  height: 20px;\n  line-height: 20px;\n  padding: 0 6px;\n}\n/* line 29, uploader.scss */\n.ui-uploader-box .btn-lg {\n  height: 54px;\n  line-height: 54px;\n  padding: 0 20px;\n  font-size: 18px;\n}\n/* line 35, uploader.scss */\n.ui-uploader-box .btn-primary {\n  background-color: #ea3e48;\n  border-color: #ea3e48;\n  color: #fff;\n}\n/* line 40, uploader.scss */\n.ui-uploader-box .btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\n}\n/* line 44, uploader.scss */\n.ui-uploader-box .btn-default:hover {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n/* line 50, uploader.scss */\n.ui-uploader-box .clearfix {\n  zoom: 1;\n}\n/* line 52, uploader.scss */\n.ui-uploader-box .clearfix:after {\n  content: ".";\n  display: block;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n/* line 60, uploader.scss */\n.ui-uploader-box .ui-box-bd {\n  padding: 0;\n}\n/* line 63, uploader.scss */\n.ui-uploader-box .ui-uploader {\n  width: 592px;\n  height: 490px;\n  margin: 5px 0 0 0;\n}\n/* line 67, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main {\n  height: 454px;\n  padding: 5px;\n}\n/* line 70, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab {\n  float: left;\n  width: 470px;\n}\n/* line 73, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-title {\n  height: 26px;\n  position: relative;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  margin: 0;\n}\n/* line 80, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-title li {\n  height: 25px;\n  float: left;\n}\n/* line 84, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-title li.activate a {\n  text-decoration: none;\n  background: #fff;\n  height: 26px;\n}\n/* line 90, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-title li a {\n  display: block;\n  height: 25px;\n  line-height: 24px;\n  margin-right: 5px;\n  border: 1px solid #E1E5E6;\n  border-radius: 2px 2px 0 0;\n  border-bottom: none;\n  overflow: hidden;\n  padding: 0 8px;\n  background: #F6F6F6;\n  color: #000;\n}\n/* line 102, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-title li a:hover {\n  text-decoration: none;\n  background: #fff;\n}\n/* line 109, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container {\n  border: 1px solid #E1E5E6;\n  width: 459px;\n  height: 418px;\n  overflow: hidden;\n}\n/* line 114, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container,\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .network-container,\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .album-container {\n  overflow: hidden;\n  display: none;\n  height: 418px;\n}\n/* line 122, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container {\n  position: relative;\n}\n/* line 124, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-init {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 418px;\n}\n/* line 130, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-init .local-tips {\n  margin: 120px 0 10px;\n  color: #ccc;\n  text-align: center;\n  font-size: 14px;\n}\n/* line 136, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-init .btn {\n  display: block;\n  margin: 0 auto;\n  width: 154px;\n  height: 56px;\n  line-height: 54px;\n  position: relative;\n  padding: 0;\n  background-color: #ea3e48;\n  color: #fff;\n  border: 1px solid #ea3e48;\n  border-radius: 2px;\n  text-align: center;\n}\n/* line 149, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-init .btn button {\n  display: block;\n  margin: 0 auto;\n  width: 152px;\n  height: 54px;\n  line-height: 54px;\n  position: relative;\n  padding: 0;\n  background-color: #ea3e48;\n  color: #fff;\n  border: 1px solid #ea3e48;\n  border-radius: 2px;\n  text-align: center;\n}\n/* line 164, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-init .btn .uploadify-button-wrapper .swfupload {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n/* line 172, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading {\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n/* line 178, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .local-op {\n  width: 100%;\n  height: 25px;\n  line-height: 24px;\n  border-bottom: 1px solid #DEE0E2;\n}\n/* line 183, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .local-op div {\n  float: right;\n  display: block;\n  height: 25px;\n  line-height: 24px;\n}\n/* line 189, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .local-op .btn {\n  float: right;\n  margin: 1px 5px 0 5px;\n}\n/* line 194, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .img-list {\n  height: 391px;\n  overflow-y: scroll;\n  padding: 0 0 5px 0;\n}\n/* line 198, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .img-list li {\n  border: 1px solid #eee;\n  border-radius: 2px;\n  padding: 1px;\n  position: relative;\n  float: left;\n  width: 100px;\n  height: 100px;\n  margin: 5px 0 0 5px;\n}\n/* line 207, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .img-list li .img-name {\n  width: 100px;\n  height: 100px;\n  color: #333;\n  overflow: hidden;\n  padding: 10px 5px;\n}\n/* line 214, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .img-list li .progress-box {\n  width: 100%;\n  height: 5px;\n  border-top: 1px solid #eee;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n}\n/* line 221, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .img-list li .progress-box .progress-line {\n  background-color: #54B5EA;\n  width: 0;\n  height: 5px;\n}\n/* line 227, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container .local-uploading .img-list li .img-cancel {\n  position: absolute;\n  display: block;\n  width: 20px;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n  font-size: 12px;\n  right: 0;\n  top: 0;\n  background-color: #54B5EA;\n  color: #fff;\n}\n/* line 245, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container-uploading .local-init {\n  left: -500px;\n}\n/* line 248, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .local-container-uploading .local-uploading {\n  display: block;\n}\n/* line 254, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .network-container .network-main {\n  padding: 100px 0 0 28px;\n}\n/* line 256, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .network-container .network-main .network-tips {\n  color: #444;\n}\n/* line 259, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .network-container .network-main .network-input {\n  padding: 10px 0 0 0;\n}\n/* line 261, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .network-container .network-main .network-input input {\n  height: 24px;\n  line-height: 24px;\n  color: #999;\n  width: 360px;\n  float: left;\n  border: 1px solid #54B5EA;\n  border-radius: 3px 0 0 3px;\n  padding: 0 5px;\n}\n/* line 271, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .network-container .network-main .network-input a {\n  display: block;\n  float: left;\n  height: 26px;\n  line-height: 26px;\n  padding: 0 8px;\n  background: #54B5EA;\n  color: #fff;\n  border-radius: 0 3px 3px 0;\n}\n/* line 280, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .network-container .network-main .network-input a:hover {\n  background-color: #55BAF1;\n}\n/* line 289, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .album-container .empty {\n  width: 100%;\n  height: 100%;\n  line-height: 416px;\n  text-align: center;\n}\n/* line 295, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .album-container .img-list {\n  height: 386px;\n  overflow-y: scroll;\n  padding: 0 0 5px 0;\n}\n/* line 299, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .album-container .img-list li {\n  border: 1px solid #eee;\n  border-radius: 2px;\n  padding: 1px;\n  position: relative;\n  float: left;\n  width: 100px;\n  height: 100px;\n  margin: 5px 0 0 5px;\n  line-height: 100px;\n  font-size: 0;\n  cursor: pointer;\n}\n/* line 311, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .album-container .img-list li img {\n  max-width: 100px;\n  max-width: 100px;\n  text-align: center;\n  vertical-align: middle;\n}\n/* line 317, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .album-container .img-list li .img-list-mask {\n  width: 102px;\n  height: 102px;\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: url(./images/right.png) 50% 50% no-repeat;\n  display: none;\n}\n/* line 327, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .uploader-tab .tab-container .album-container .img-list li.activate .img-list-mask {\n  display: block;\n}\n/* line 336, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box {\n  float: right;\n  overflow: hidden;\n  width: 110px;\n  border: 1px solid #E1E5E6;\n  height: 443px;\n}\n/* line 342, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-tips {\n  height: 25px;\n  text-align: center;\n  line-height: 24px;\n  border-bottom: 1px solid #DEE0E2;\n}\n/* line 348, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-op {\n  height: 25px;\n  text-align: center;\n  line-height: 24px;\n  border-bottom: 1px solid #DEE0E2;\n}\n/* line 353, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-op a {\n  display: inline-block;\n  line-height: 20px;\n  margin: 0 2px 0 0;\n  color: #527CD2;\n  font-size: 10px;\n}\n/* line 359, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-op a:hover {\n  color: #7DC1EF;\n  text-decoration: none;\n}\n/* line 365, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images {\n  height: 391px;\n  padding: 5px 0 5px 5px;\n  overflow-y: scroll;\n}\n/* line 369, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li {\n  cursor: pointer;\n  margin-bottom: 5px;\n  width: 84px;\n  height: 84px;\n  line-height: 80px;\n  border: 1px solid #eee;\n  position: relative;\n  font-size: 0;\n  text-align: center;\n}\n/* line 379, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li img {\n  max-width: 84px;\n  max-height: 84px;\n  vertical-align: middle;\n}\n/* line 384, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li .selected-images-op,\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li .selected-images-mask {\n  display: none;\n  position: absolute;\n  width: 84px;\n  height: 24px;\n  bottom: 0;\n  left: 0;\n}\n/* line 393, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li .selected-images-op {\n  z-index: 2;\n}\n/* line 395, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li .selected-images-op a {\n  float: right;\n  display: block;\n  height: 24px;\n  line-height: 24px;\n  margin: 0 5px 0 0;\n  color: #ccc;\n  font-size: 10px;\n}\n/* line 403, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li .selected-images-op a:hover {\n  color: #fff;\n  text-decoration: none;\n}\n/* line 409, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li .selected-images-mask {\n  z-index: 1;\n  background-color: #000;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n/* line 416, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li:hover,\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li.activate {\n  border: 1px solid #7DC1EF;\n}\n/* line 418, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li:hover .selected-images-op,\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li:hover .selected-images-mask,\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li.activate .selected-images-op,\n.ui-uploader-box .ui-uploader .uploader-main .selected-box .selected-images li.activate .selected-images-mask {\n  display: block;\n}\n/* line 427, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-bottom {\n  padding: 0 5px;\n  height: 36px;\n  background: #F3F3F3;\n  border-top: 1px solid #E1E5E6;\n}\n/* line 432, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-bottom .tips {\n  float: left;\n  width: 70%;\n  height: 35px;\n  line-height: 35px;\n  color: #444;\n}\n/* line 439, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-bottom .btns {\n  float: right;\n  width: 30%;\n}\n/* line 442, uploader.scss */\n.ui-uploader-box .ui-uploader .uploader-bottom .btns .btn {\n  float: right;\n  margin: 3px 0 0 5px;\n}\n');