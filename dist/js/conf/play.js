/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

function ckcpt() {
    var t = "";
    t += "drift.swf,0,0,0,0,2,0|";
    return t;
}

function ckstyle() {
    var t = {
        cpath: "style_ex.swf",
        language: "",
        flashvars: "",
        setup: "1,1,1,1,1,2,0,1,2,0,0,1,200,0,2,1,0,1,1,1,2,10,3,0,1,2,3000,0,0,0,1,1,1,1,1,1,1,250,0,90,0,0,0",
        pm_bg: "0x000000,100,230,180",
        mylogo: "null",
        pm_mylogo: "1,1,-100,-55",
        logo: "cklogo.png",
        pm_logo: "2,0,-100,20",
        control_rel: "related.swf,ckplayer/related.xml,0",
        control_pv: "Preview.swf,105,2000",
        pm_repc: "",
        pm_spac: "|",
        pm_fpac: "file->f",
        pm_advtime: "2,0,-110,10,0,300,0",
        pm_advstatus: "1,2,2,-200,-40",
        pm_advjp: "1,1,2,2,-100,-40",
        pm_padvc: "2,0,-10,-10",
        pm_advms: "2,2,-46,-56",
        pm_zip: "1,1,-20,-8,1,0,0",
        pm_advmarquee: "1,2,50,-60,50,20,0,0x000000,50,0,20,1,30,2000",
        pm_glowfilter: "1,0x01485d, 100, 6, 3, 10, 1, 0, 0",
        advmarquee: escape(""),
        mainfuntion: "",
        flashplayer: "",
        calljs: "ckplayer_status,ckadjump,playerstop,ckmarqueeadv",
        myweb: escape("24a16b04af56753148f8597718870707,中智汇,http://www.zhongzhihui.com,v1.0"),
        cpt_lights: "1",
        cpt_share: "ckplayer/share.xml",
        cpt_list: ckcpt(),
        drift_coor: "0,0,5,5|0,1,5,5|2,2,-180,-50",
        drift_html: '{font color="#d9d6c3" size="20px"}[$drift]{/font}',
        drift_time: 3e5
    };
    return t;
}

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return "object" == typeof t && null !== t;
    }
    function o() {}
    function r(t, e) {
        for (var n = t.length, i = -1; ++i < n; ) e(t[i], i);
    }
    function a(t, e) {
        for (var n in t) p.call(t, n) && e(t[n], n, t);
    }
    function s(t, e) {
        if (t && t.forEach) return t.forEach(e);
        h(t) ? r(t, e) : a(t, e);
    }
    function l(t, e) {
        for (var n = -1, i = t.length, o = Array(i); ++n < i; ) o[n] = e(t[n], n, t);
        return o;
    }
    function u(t, e) {
        var n = [];
        s(t, function(t, i, o) {
            n.push(e(t, i, o));
        });
        return n;
    }
    function c(t, e) {
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
    }(), y = d.console || (d.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(t) {
        y[t] || (y[t] = o);
    });
    e.extend = function(t, e) {
        for (var n = [].slice.call(arguments, 1), i = n.length, o = -1; ++o < i; ) c(t, n[o]);
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
    e.each = s;
    e.map = function(t, e) {
        var n = h(t) ? l : u;
        return n(t, e);
    };
    e.filter = function(t, e) {
        var n, i, o = h(t) ? (n = r, i = function(t, e) {
            o.push(e);
        }, []) : (n = a, i = function(t, e) {
            o[t] = e;
        }, {});
        n(t, function(t, n) {
            e(t, n) && i(n, t);
        });
        return o;
    };
    e.mix = function _(t, e, n, i, o) {
        for (var r in e) e.hasOwnProperty(r) && (e[r] && t[r] && n && "object" == typeof e[r] ? _(t[r], e[r], n, i, o) : (void 0 === t[r] || i) && (o && !o(t[r], e[r]) || (t[r] = e[r])));
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
            var r = i || this, a = arguments, s = function() {
                o = null;
                n || t.apply(r, a);
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(s, e);
            l && t.apply(r, a);
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
        return t.replace(s, "ms-").replace(l, u);
    }
    function o(t) {
        try {
            return "true" === t || "false" !== t && ("null" === t ? null : +t + "" === t ? +t : c.test(t) ? a.parseJSON(t) : t);
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
    var a = (window.document, t("jquery")), s = /^-ms-/, l = /-([\da-z])/gi, u = function(t, e) {
        return e.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, d = function(t, e, n) {
        if (!t || 1 !== t.nodeType) throw new TypeError("dataset(): Not a valid DOM element.");
        var a, s, l, u;
        if (1 === arguments.length) {
            if (l = t.dataset) {
                u = {};
                for (s in l) l.hasOwnProperty(s) && (u[s] = o(l[s]));
                return u;
            }
            l = t.attributes;
            a = l.length;
            u = {};
            for (;a--; ) if (l[a]) {
                s = l[a].name;
                if (0 === s.indexOf("data-")) {
                    s = i(s.slice(5));
                    u[s] = o(r(t, s));
                }
            }
            return u;
        }
    };
    n.exports = d;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(t, e, n) {
    "use strict";
    function i(t, e, n, i) {
        i ? t[e] || (t[e] = n) : t[e] ? t[e] = t[e].add(n) : t[e] = r(n);
    }
    var o = window.document, r = t("jquery"), a = function(t, e, n) {
        var a, s, l, u, c, f = function(t) {
            if (n) for (var o in n) l[o] = r(n[o].toString(), t); else {
                l = {};
                u = r("[node-type]", t);
                for (var a, s = -1, c = u.length; ++s < c; ) {
                    a = u[s];
                    o = a.getAttribute("node-type");
                    i(l, o, a, e);
                }
            }
        }, d = function(t) {
            var n, o = l[t];
            if (!o || 0 === o.length) {
                n = r('[node-type="' + t + '"]', a);
                n.length && i(l, t, n, e);
                o = l[t];
            }
            return o;
        };
        void 0 === e && (e = !0);
        a = t;
        if ("string" == typeof t && "<" === t.charAt(0)) {
            a = o.createElement("div");
            a.innerHTML = t;
            s = o.createDocumentFragment();
            for (;c = a.firsChild; ) s.appendChild(c);
        } else {
            a = r(t);
            s = a[0];
        }
        f(a);
        return {
            get: d,
            box: s,
            list: l
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
    }, a = function(t, e, n) {
        n = n || {};
        if (void 0 !== e) {
            n = r(n);
            if (null === e) {
                e = "";
                n.expires = -1;
            }
            if ("number" == typeof n.expires) {
                var a = n.expires, s = n.expires = new Date();
                s.setTime(s.getTime() + 864e5 * a);
            }
            var l = function(t) {
                try {
                    return n.raw ? t : encodeURIComponent(t);
                } catch (e) {}
                return t;
            };
            return i.cookie = [ l(t), "=", l(e), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : "" ].join("");
        }
        for (var e = null, u = i.cookie, c = function(t) {
            return n.raw ? t : decodeURIComponent(t);
        }, f = u ? u.split("; ") : [], d = -1, p = f.length, h = t.length + 1; ++d < p; ) {
            u = o(f[d]);
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
    var i = t("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", s = $PAGE_DATA && $PAGE_DATA[o] || null;
    e.getNick = function() {
        return s;
    };
    e.isLogin = function() {
        return !!i(r);
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
        e.options = o.extend(!0, {}, n, t);
        e.el = o(e.options.selector);
        e._init();
    }
    var o = t("jquery"), r = t("lib/core/1.0.0/dom/build"), a = t("./login");
    i.prototype._init = function() {
        var t = this;
        if (a.isLogin()) {
            var e = a.getNick();
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
            var r = i || this, a = arguments, s = function() {
                o = null;
                n || t.apply(r, a);
            }, l = n && !o;
            clearTimeout(o);
            o = setTimeout(s, e);
            l && t.apply(r, a);
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
                var a = o.call(arguments, 0), s = a[1];
                n && !~e.indexOf(".") && (a[0] = e + "." + n);
                "function" == typeof s && ("on" === t || "once" === t ? a[1] = s.__ || (s.__ = function(t) {
                    t.preventDefault();
                    return s.apply(this, o.call(arguments, 1));
                }) : "un" === t && (a[1] = s.__));
                return i[r].apply(i, a);
            };
        });
        return e;
    }, a = window, s = t(a), l = a.Image, u = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, d = 1, p = 2, h = function(t) {
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
    v.define("image", function(n, i, o, r) {
        if (i) {
            var a = new l(), s = function() {
                a.onload = a.onerror = null;
                a = i = n = r = s = e;
            };
            a.onload = function() {
                var e = t(n), a = o.effect;
                "function" != typeof e[a] && (a = "show");
                e.hide();
                "IMG" === n.nodeName.toUpperCase() ? e.attr("src", i) : e.css("background-image", 'url("' + i + '")');
                e[a](o.effectSpeed);
                r(null, "load");
                s();
            };
            a.onerror = function(t) {
                r(t);
                s();
            };
            a.src = i;
        } else r("error");
    });
    v.define("html", function(t, e, n, i) {
        i();
    });
    var m = function(e, l) {
        l = l || {};
        e = t(e);
        var m = this, w = {
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
        var x = l.type || w.type, A = v.get(x);
        if ("function" != typeof A) throw "Error, cannot found the specific type loader (type: `" + x + "`)";
        "html" === x && (w.placeholder = "");
        l && t.extend(w, l);
        var T = w.container, C = w.event, j = 0 === C.indexOf("scroll"), k = T && T !== a ? t(T) : s, E = function(e) {
            var i = m._list;
            if (i.length > 0) {
                var o = 0;
                n(i.slice(0), function(e, n) {
                    var i = t(n);
                    if (!w.skipInvisible || i.is(":visible")) if (_(n, w) || b(n, w)) ; else if (g(n, w) || y(n, w)) {
                        if (++o > w.failureLimit) return !1;
                    } else {
                        i.trigger("appear");
                        o = 0;
                    }
                });
            } else m.reset();
        }, L = function() {
            m._list = i(m._list, function(t) {
                return !t[c];
            });
        }, $ = function() {
            var e = this, n = t(e), i = n.attr("data-" + w.dataAttribute), o = w.sourceMaker, r = w.appear, a = w.loadingClass, s = e[c];
            if (s === f) {
                e[c] = d;
                a && n.addClass(a);
                o && (i = o(i, e));
                r && r.apply(m, [ e, i ]);
                A.call(m, e, i, w, function(t, o) {
                    if (!m._destroyed) {
                        a && n.removeClass(a);
                        if (t) setTimeout(function() {
                            e[c] = f;
                            m.emit("lazyItemError", e, i, t);
                            e = null;
                        }, 300); else {
                            e[c] = p;
                            L();
                            m.emit("lazyItemReady", e, i, o);
                            var r = w.load;
                            r && r.apply(m, [ e, i, o ]);
                            e = null;
                        }
                        n = null;
                    }
                });
            } else if (s === p) {
                L();
                m.emit("lazyItemReady", e, i);
            }
        }, I = function() {
            this[c] || t(this).trigger("appear");
        }, q = function(e) {
            var n = t(e);
            e[c] = f;
            var i = w.placeholder;
            if (i) if (n.is("img")) {
                var o = n.attr("src");
                o || n.attr("src", i);
            } else "image" === m._.type || n.children()[0] || n.html(i);
            n.on("appear", $);
            j || n.on(C, I);
            m._list.push(e);
        }, S = function(t) {
            t = i(t || [], h);
            if (t.length) {
                n(t, function(t, e) {
                    q(e);
                });
                m._inited || P(m);
            }
        }, P = function(e) {
            if (!e._inited) {
                var i = o(E, 30);
                e._inited = !0;
                j && k.on(C, i);
                s.on("resize", i);
                if (u) {
                    var r = function(i) {
                        i.originalEvent && i.originalEvent.persisted && n(e._list, function(e, n) {
                            t(n).trigger("appear");
                        });
                    };
                    s.on("pageshow", r);
                    e.once("reset", function() {
                        s.off("pageshow", r);
                    });
                }
                e.once("reset", function() {
                    n(e._list, function(t, e) {
                        O(e);
                    });
                    j && k.off(C, i);
                    s.off("resize", i);
                });
                t(document).ready(E);
            }
        }, O = function(e) {
            var n = t(e);
            n.off("appear", $);
            j || n.off(C, I);
        };
        m.on("lazyItemReady", function(t) {
            O(t);
        });
        m.once("destroy", function() {
            S = null;
            E = null;
            L = null;
            $ = null;
            I = null;
        });
        m._ = w;
        m._list = [];
        m.add = function(e) {
            var n = t(e);
            n.length > 0 && S(n);
        };
        m.update = E;
        S(e);
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
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().top + t(o).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return i <= t(e).offset().top - n.threshold;
    }, y = function(e, n) {
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().left + t(o).width() : s.width() + s.scrollLeft();
        return i <= t(e).offset().left - n.threshold;
    }, _ = function(e, n) {
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().top : s.scrollTop();
        return i >= t(e).offset().top + n.threshold + t(e).height();
    }, b = function(e, n) {
        var i, o = n.container;
        i = o && o !== a ? t(o).offset().left : s.scrollLeft();
        return i >= t(e).offset().left + n.threshold + t(e).width();
    }, w = function(t, e) {
        return !(y(t, e) || b(t, e) || g(t, e) || _(t, e));
    };
    m.belowthefold = g;
    m.rightoffold = y;
    m.abovethetop = _;
    m.leftofbegin = b;
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
    var o = t("jquery"), r = t("lib/plugins/lazyload/1.9.3/lazyload"), a = t("lib/core/1.0.0/dom/build");
    i.prototype._init = function() {
        var t = this, e = a.build(t.el[0], !1), n = e.get("footerImg");
        new r(n);
    };
    n.exports = i;
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(t) {
    "use strict";
    var e = t("jquery"), n = e(window), i = e(document), o = "createTouch" in document, r = document.documentElement, a = !("minWidth" in r.style), s = !a && "onlosecapture" in r, l = "setCapture" in r, u = e.noop, c = {
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
        this.onstart = this.onover = this.onend = u;
    };
    d.types = c;
    d.prototype = {
        start: function(t) {
            t = this.startFix(t);
            i.on(c.over, this.over).on(c.end, this.end);
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
            i.off(c.over, this.over).off(c.end, this.end);
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
            s ? this.target.on("losecapture", this.end) : n.on("blur", this.end);
            l && this.target[0].setCapture();
            return t;
        },
        overFix: function(t) {
            t = f(t);
            return t;
        },
        endFix: function(t) {
            t = f(t);
            i.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : n.off("blur", this.end);
            l && this.target[0].releaseCapture();
            return t;
        }
    };
    d.create = function(t, o, r) {
        r = e.extend({
            hook: null,
            onstart: u,
            onover: u,
            onend: u
        }, r);
        var a, s, l, c, f = e(t), p = r.hook ? e(r.hook) : f, h = new d(), v = d.types.start, m = t.className.replace(/^\s|\s.*/g, "") + "-drag-start", g = {
            off: function() {
                p.off(v, h.start);
            }
        };
        h.onstart = function(e) {
            var o = "fixed" === f.css("position"), u = i.scrollLeft(), d = i.scrollTop(), p = f.width(), h = f.height();
            a = 0;
            s = 0;
            l = o ? n.width() - p + a : i.width() - p;
            c = o ? n.height() - h + s : i.height() - h;
            var v = f.offset(), g = this.startLeft = o ? v.left - u : v.left, y = this.startTop = o ? v.top - d : v.top;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            f.addClass(m);
            r.onstart.call(t, e, g, y);
        };
        h.onover = function(e) {
            var n = e.clientX - this.clientX + this.startLeft, i = e.clientY - this.clientY + this.startTop, o = f[0].style;
            n = Math.max(a, Math.min(l, n));
            i = Math.max(s, Math.min(c, i));
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
        return g;
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
    function i() {}
    function o(t, e, n, i) {
        var o = !0;
        if (e) for (var r, a, s, l = -1, u = {
            type: t,
            timeStamp: c()
        }; r = e[++l]; ) {
            a = r[v];
            s = r[m] || i;
            try {
                o = r[g] === h ? a.call(s, u, n) !== !1 && o : a.apply(s, n) !== !1 && o;
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
    function a(t) {
        return "[object Function]" === Object.prototype.toString.call(t);
    }
    function s(t, e) {
        for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
    }
    function l(t, e) {
        t.forEach ? t.forEach(e) : function(t) {
            for (var n = -1, i = t.length; ++n < i; ) e(t[n], n);
        }(t);
    }
    var u = /\s+/, c = Date.now || function() {
        return +new Date();
    }, f = function() {
        return c() * Math.random() & 65535;
    }(), d = function() {
        var t, e, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (t = new WeakMap(), 
        function(e, n) {
            var i = t.get(e);
            return null === n ? void 0 !== i && t["delete"](e) : !i && n ? (t.set(e, i = {}), 
            i) : i;
        }) : (e = c(), n = "__$widΦ" + e.toString(36), t = {}, function(i, o) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === o ? i[n] && (delete t[i[n]], delete i[n]) : (r = i[n] || o && (r = ++e, 
            t[r] = {}, i[n] = r), r && t[r]);
        });
    }(), p = 1, h = 2, v = 0, m = 1, g = 2, y = function(t, e, n) {
        var i = [];
        i[v] = t;
        i[m] = e;
        i[g] = n;
        return i;
    }, _ = i.prototype;
    _.addListener = function(t, e, n, i) {
        var o, r, a, s = p;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
            s = h;
        }
        if (!e) return this;
        o = d(this, 1);
        t = t.split(u);
        for (;r = t.shift(); ) {
            a = !i && o[r] || (o[r] = []);
            a.push(y(e, n, s));
        }
        return this;
    };
    _.on = _.addListener;
    _.once = function(t, e, n) {
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
    _.removeListener = function(t, e, n) {
        var i, o, r, a, l, c;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
        }
        if (!(i = d(this))) return this;
        if (!(t || e || n)) {
            s(i, function(t, e) {
                delete i[e];
            });
            d(this, null);
            return this;
        }
        t = t ? t.split(u) : b(i);
        for (;o = t.shift(); ) {
            r = i[o];
            if (r) if (e || n) for (a = r.length; --a >= 0; ) {
                l = r[a];
                c = l[v];
                e && c !== e && (void 0 === c.guid || c.guid !== e.guid) || n && l[m] !== n || r.splice(a, 1);
            } else delete i[o];
        }
        return this;
    };
    _.un = _.removeListener;
    _.removeAllListeners = function(t) {
        return this.removeListener(t);
    };
    _.emit = function(t) {
        var e, n, i, r, a, s, l = [], c = !0;
        if (!(e = d(this))) return this;
        t = t.split(u);
        for (a = 1, s = arguments.length; a < s; a++) l[a - 1] = arguments[a];
        for (;n = t.shift(); ) {
            (i = e.all) && (i = i.slice());
            (r = e[n]) && (r = r.slice());
            "all" !== n && (c = o(n, r, l, this) && c);
            c = o(n, i, [ n ].concat(l), this) && c;
        }
        return c;
    };
    i.applyTo = function(t) {
        function e(e, i) {
            t[e] = function() {
                var o = n[e].apply(i || t, Array.prototype.slice.call(arguments));
                return o === i ? this : o;
            };
        }
        var n = _, i = b(n);
        a(t) ? l(i, function(e) {
            t.prototype[e] = n[e];
        }) : l(i, function(t) {
            e(t);
        });
    };
    i.listenerCount = function(t, e) {
        return "function" == typeof t.listenerCount ? t.listenerCount(e) : r.call(t, e);
    };
    _.listenerCount = r;
    var b = Object.keys || function(t) {
        var e = [];
        s(t, function(t, n) {
            e.push(n);
        });
        return e;
    };
    n.exports = i;
});

define("lib/core/1.0.0/dom/delegator", [ "require", "exports", "module", "jquery", "../event/emitter" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n, i, r, a = e.currentTarget, s = o(a), l = (e.handleObj || 0).origType || e.type;
        if (!e.isPropagationStopped()) {
            if (!s.attr("disabled") && (n = s.attr("action-type"))) {
                i = s.attr("action-data");
                e.action = n;
                e.data = i;
                r = t.e.emit(l + u + n, e, a);
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
    var o = t("jquery"), r = t("../event/emitter"), a = /\S+/g, s = -1, l = (+new Date()).toString(36), u = "/", c = function() {
        return l + ++s;
    }, f = function(t, e) {
        var n = t.guid || (t.guid = c()), i = function(n, i) {
            return t.call(e || i, n);
        };
        i.guid = n;
        return i;
    }, d = function() {}, p = function(t, e) {
        return "function" == typeof t ? t : e;
    }, h = function(t, e) {
        e = e || {};
        "string" == typeof t && (t = o(t)[0]);
        var n = {}, s = {}, l = new r(), c = e.context, h = {
            o: n,
            opts: e,
            e: l
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
            n = (n || "").match(a) || [];
            for (var r = n.length; r--; ) {
                if (!s[e]) {
                    s[e] = 1;
                    o(t).on(e, "[action-type]", v);
                }
                l.on(e + u + n[r], f(i, c));
            }
            return this;
        };
        n.un = function(e, n, i) {
            if ("function" == typeof n || !n) {
                i = n;
                n = e;
                e = "click";
            }
            n = (n || "").match(a) || [];
            var r, s = n.length;
            for (o(t); s--; ) {
                r = e + u + n[s];
                l.un(r, i);
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
            l.emit(e + u + n, r, i);
        };
        n.destroy = function() {
            var i = o(t);
            o.each(s, function(t, e) {
                delete s[t];
                i.off(t, "[action-type]", v);
            });
            l.un();
            for (var r in n) delete n[r];
            l = void 0;
            e = void 0;
            s = i = t = void 0;
            v = null;
        };
        return n;
    };
    n.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return u("<" + t + "/>")[0];
    }
    function o(t, e, n) {
        t.insertRule ? t.insertRule(e + " {" + n + "}", 0) : t.addRule(e, n, 1);
    }
    function r() {
        var t, e, n, i, o, a = "";
        t = document.body || document.documentElement;
        n = t.style;
        i = "Transition";
        o = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        e = 0;
        for (;e < o.length; ) {
            if (void 0 !== n[o[e] + i]) {
                a = o[e];
                break;
            }
            e++;
        }
        r = function() {
            return a;
        };
        return a;
    }
    function a() {
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
    function l(t, e, n, i, o) {
        var r, a, l = u(t), c = arguments, o = "boolean" == typeof c[c.length - 1] && c[c.length - 1], h = !1, v = function() {
            m();
        }, m = function(t) {
            h || g(!0);
        }, g = function(t) {
            if (!h) {
                h = !0;
                m = f;
                l.off(y, v);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                l.removeClass(a);
                t && i();
                l = null;
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
            a = [ "ui-animated", "ui-speed-" + n, "ui-ani-" + e ].join(" ");
            l.on(y, v);
            r = setTimeout(v, s(n) + 100);
            o === !0 ? d(function() {
                l.addClass(a);
            }) : l.addClass(a);
        } else d(function() {
            i && i();
        });
        return {
            stop: function() {
                g.apply(null, arguments);
                return this;
            }
        };
    }
    var u = t("jquery"), c = t("./util"), f = (c.each, c.noop), d = c.setImmediate, p = a(), h = /\-v\-/g, v = document.getElementsByTagName("head")[0].appendChild(i("style")), m = v.sheet || v.styleSheet, g = {
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
    c.each(g, function(t, e) {
        t && o(m, e, t.replace(h, p));
    });
    e.effect = l;
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
        e._ = t = b(n, t);
        t.fixed = !!t.fixed && j();
        var r = o('<div class="' + v + '" id="' + (t.id || _()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(t.html), a = o("<div />");
        e._popup = r;
        e._mask = e._shadow = a;
        e.node = r[0];
        e.mask = a[0];
        e.on("render", function(t) {
            var n, o = t.className, a = e._mask, s = t.zIndex;
            r.html() || r.html(t.html);
            o && r.addClass(o);
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
                    zIndex: s || i.zIndex,
                    backgroundColor: "#000",
                    opacity: .3
                };
                j() || b(n, {
                    position: "absolute",
                    width: c.width() + "px",
                    height: f.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", x(e.focus, e));
                e._shadow = a.clone(!0);
                a.css(n).addClass(v + "-mask");
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
            var s = x(e.resize, e);
            e.on("render", function() {
                c.on("resize", s);
            });
            e.on("destroy", function() {
                c.off("resize", s);
            });
        }
        e.destroyed = !1;
        e.initialized = !0;
    }
    var o = t("jquery"), r = t("../../../core/1.0.0/utils/util"), a = t("../../../core/1.0.0/utils/css"), s = t("../../../core/1.0.0/event/emitter"), l = window, u = l.document, c = o(l), f = o(u), d = u.documentElement, p = /\S+/g, h = !("minWidth" in d.style), v = "ui-layer", m = l.Math, g = m.max, y = m.ceil, _ = r.guid, b = r.extend, w = r.each, x = function(t, e) {
        return t.bind ? t.bind(e) : function() {
            return t.apply(e, arguments);
        };
    }, A = r.setImmediate, T = function(t) {
        return l.parseInt(t, 10) || 0;
    }, C = function(t) {
        return t && 1 === t.nodeType;
    }, j = function() {
        return j._ || (j._ = function() {
            var t = u.createElement("div"), e = t.cloneNode(!1), n = !1, i = u.body || function() {
                n = !0;
                return d.appendChild(u.createElement("body"));
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
    }, k = function() {
        return {
            x: f.scrollLeft(),
            y: f.scrollTop()
        };
    }, E = function(t) {
        return {
            w: t.width(),
            h: t.height()
        };
    }, L = function() {
        return E(c);
    }, $ = function(t) {
        var e = C(t), n = e ? o(t).offset() : {
            left: t.pageX,
            top: t.pageY
        };
        t = e ? t : t.target;
        var i = t.ownerDocument;
        if (i === l.document) return n;
        var r = i.defaultView || i.parentWindow, a = r.frameElement, s = k(), u = o(a).offset();
        return {
            left: n.left + u.left - s.x,
            top: n.top + u.top - s.y
        };
    }, I = function(t, e) {
        if (t.length) {
            var n = T(t.css(e)) || t[0]["offset" + e.charAt(0).toUpperCase() + e.slice(1)], i = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            w(i[e], function(e, i) {
                n += T(t.css("margin-" + e), 10) || 0;
            });
            return n;
        }
        return 0;
    }, q = function(t) {
        return I(t, "width");
    }, S = function(t) {
        return I(t, "height");
    }, P = function() {
        try {
            var t = u.activeElement, e = t.contentDocument;
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
        for (var i, t = t.length <= 2 ? t.split("") : t.replace(/^\s+|\s+$/g, "").split(" ").slice(0, 2), o = {}, r = {
            t: "t",
            b: "t",
            l: "l",
            r: "l"
        }, a = -1, s = t.length; ++a < s; ) {
            i = t[a].charAt(0);
            if (!i || o[r[i]]) t.splice(a, 1); else {
                t[a] = i;
                o[r[i]] = 1;
            }
        }
        2 === t.length && t[0] === t[1] && t.pop();
        e.align = t;
        return e;
    };
    r.inherits(i, s, {
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
            var n, i = this, o = i._, r = t, s = null, l = i._anim;
            l && l.stop(!0);
            if (i.destroyed || o.showing || i.open) return i;
            e = b({}, i._, e);
            if (void 0 !== r) {
                n = typeof r;
                "boolean" === n ? e.modal = r : r && "object" === n && (C(r) || C(r.target) ? s = r : b(e, r));
            }
            var u = i._popup, c = e.showWithAni, f = function() {
                delete o.showing;
                i.emit("shown");
            };
            if (!i._ready) {
                i.emit("render", e);
                i._ready = !0;
            }
            i.open = !0;
            i.anchor = s;
            i._activeElement = P();
            i.emit("beforeShow", e);
            u.appendTo(e.appendTo).css("display", "block");
            i.emit("show", e);
            o.showing = !0;
            if (c && "none" !== c) {
                var d = c.split(":");
                i._anim = a.effect(i.node, d[0], d[1], f);
            } else f();
            return i;
        },
        hide: function(t) {
            var e, n = this, i = n._, o = n.node, r = i.hideWithAni, s = n._anim;
            s && s.stop(!0);
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
                var l = r.split(":");
                n._anim = a.effect(o, l[0], l[1], e);
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
            var e = this._, n = this.node, r = this._popup, a = i.current, s = e.zIndex;
            a && a !== this && a.blur(!1);
            if (!o.contains(n, P())) {
                var l = r.find("[autofocus]")[0];
                !e.focusing && l ? e.focusing = !0 : l = n;
                this._focus(l);
            }
            if (void 0 === s) {
                s = e.zIndex = i.zIndex++;
                r.css("zIndex", s);
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
            var t = this._popup, e = this._.fixed, n = k(), i = L(), o = E(t), r = e ? 0 : n.x, a = e ? 0 : n.y, s = (i.w - o.w) / 2 + r, l = .382 * (i.h - o.h) + a;
            t.css({
                left: g(T(s), r),
                top: g(T(l), a)
            });
            return this;
        },
        alignTo: function(t, e) {
            var n = this, i = n._, r = n._popup, a = t.parentNode && o(t);
            if (!a) return n;
            var s = a.offset();
            if (s.left * s.top < 0) return n.center();
            e = e || i.align;
            var l = O(e), u = l.align, c = !l.auto;
            u && u.length || (u = [ "b" ]);
            var f = n._dirClass;
            f && r.removeClass(f);
            var d = i.fixed, p = L(), h = k(), m = q(r), g = S(r), _ = $(t), b = q(a), x = S(a), A = _.left, C = _.top, j = d ? A - h.x : A, E = d ? C - h.y : C, I = d ? 0 : h.x, P = d ? 0 : h.y, N = I + p.w - m, V = P + p.h - g, z = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, D = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, H = {}, M = [ {
                t: E - g,
                b: E + x,
                l: j - m,
                r: j + b
            }, {
                t: E,
                b: E - g + x,
                l: j,
                r: j - m + b
            } ], F = {
                l: j + y((b - m) / 2),
                t: E + y((x - g) / 2)
            }, G = {
                left: [ I, N ],
                top: [ P, V ]
            };
            c || w(u, function(t, e) {
                M[e][t] > G[D[t]][1] && (t = u[e] = z[t]);
                M[e][t] < G[D[t]][0] && (u[e] = z[t]);
            });
            var U = u[0];
            if (!u[1]) {
                u[1] = "left" === D[U] ? "t" : "l";
                M[1][u[1]] = F[u[1]];
            }
            M[0][U] = M[0][U] + 10 * ("tl".indexOf(U) !== -1 ? -1 : 1);
            H[D[u[0]]] = T(M[0][u[0]]);
            H[D[u[1]]] = T(M[1][u[1]]);
            var K = v + "-" + U;
            r.css(H).addClass(K);
            n._dirClass = K;
            var R = n.$("arrow", 1), W = n.$("inner", 1);
            if (!R) {
                if (!W) return n;
                R = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(W);
            }
            var B, X, Q = "top" !== D[U], J = [ "v", "h" ][1 ^ Q], Y = q(R), Z = S(R), tt = {}, et = Q ? "left" : "top";
            switch (J) {
              case "h":
                B = y(A + (b - Y) / 2);
                tt.left = B;
                break;

              case "v":
                X = y(C + (x - Z) / 2);
                tt.top = X;
            }
            R.offset(tt).css(et, "");
            return n;
        }
    });
    i.zIndex = 1024;
    i.current = null;
    n.exports = i;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../../../core/1.0.0/utils/util"), r = t("../../../core/1.0.0/dom/delegator"), a = t("./popup"), s = o.extend, l = o.guid, u = o.each, c = window.document, f = {
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
        var e = t || (t = {}), n = t.id || t.id || l(), o = p.get(n) || this;
        "string" != typeof t && 1 !== t.nodeType || (t = {
            content: t
        });
        t = s({}, f, t);
        t.original = e;
        var r, a = t.button || (t.button = []);
        if (!i.isArray(r = a)) {
            r = [];
            a && "object" == typeof a && u(a, function(t, e) {
                t.id = e;
                r.push(t);
            });
            a = t.button = r;
        }
        if (a.length > 0) {
            var c = !1;
            u(a, function(e, n) {
                var i = e.id || l();
                e.autofocus && (c = !0);
                t[i] && s(e, t[i]);
                e.index = n;
            });
            c || (a[a.length - 1].autofocus = !0);
        }
        o.emit("init", t);
        o.initialized ? o.options(t).focus() : o.init(t);
        d[n] = o;
        return o;
    };
    o.inherits(p, a, {
        init: function(t) {
            var e = this;
            a.call(e, t);
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
            u([ "title", "content", "width", "height", "action", "button" ], function(n, i) {
                i = t[n];
                null != i && "function" == typeof e[n] && e[n](i);
            });
            e._freeze(!1).resize();
            t.zIndex && (a.zIndex = t.zIndex);
            return e;
        },
        initComponents: function() {
            var t = this, e = t._;
            t.$("header").hide();
            t.$("footer").hide();
            t.options();
            e.close || t.$("close").css("display", "none");
            e.clickBlankToHide && i(t.mask).on("onmousedown" in c ? "mousedown" : "click", function() {
                t.hide();
                return !1;
            });
            var n = function(e) {
                var n = e.target, i = n.nodeName, o = /^input|textarea$/i, r = a.current === t, s = e.keyCode;
                !r || o.test(i) && "button" !== n.type || 27 === s && t.hide();
            };
            i(c).on("keydown", n);
            t.on("destroy", function() {
                i(c).off("keydown", n);
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
                i.contains(c, t) && this.on("beforeremove", function() {
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
            } else u(t, function(t, a) {
                var s = t.id, l = t.fn || t.callback, u = t.display !== !1, c = t.className || r, f = [ c ];
                t.autofocus && f.push(n.buttonClassLight);
                "function" == typeof l && e.delegate(s, l);
                u && o++;
                i += '<button type="button" action-type="' + s + '"' + (u ? "" : ' style="display:none"') + (' class="' + f.join(" ") + '"') + (t.disabled ? " disabled" : "") + ">" + (t.text || t.value) + "</button>";
            });
            e.$("button").html(i);
            e.$("footer")[o ? "show" : "hide"]();
            e.resize();
            return e;
        },
        action: function(t) {
            var e = this;
            u(t, function(t, n) {
                e.delegate(n, t);
            });
            return e;
        }
    });
    p.getCurrent = function() {
        return a.current;
    };
    p.get = function(t) {
        return void 0 === t ? d : d[t];
    };
    p.config = function(t) {
        t && s(f, t);
    };
    n.exports = p;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../../../core/1.0.0/utils/util"), r = t("./drag"), a = t("./dialog"), s = o.each, l = o.extend, u = window.clearTimeout, c = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var t = i('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + c + '"</i>').appendTo("body");
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
        loading: '<img src="' + c + '" />'
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
    }, g = function(t) {
        var e;
        t.once("init", function(n) {
            var i = {};
            s([ "title", "width", "height", "button" ], function(t) {
                i[t] = n[t];
                delete n[t];
            });
            t.once("load", function() {
                var n = t._;
                s(i, function(i, o) {
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
                e = y(t, n.url);
                t.iframeNode = e;
            }, 30);
            var o = n.original;
            if (!(o instanceof Object)) for (var r = function() {
                t.hide().destroy();
            }, a = 0; a < frames.length; a++) try {
                if (o instanceof frames[a].Object) {
                    i(frames[a]).one("unload", r);
                    break;
                }
            } catch (s) {}
        }).once("beforeremove", function() {
            i(e).attr("src", "about:blank").remove();
        }, !1);
    }, y = function(t, e) {
        var n = t._, o = t.$("content"), r = o.find("iframe"), a = r && r[0], s = function(e) {
            t._freeze(!0);
            if (e) {
                n.width || t.width(e.width);
                n.height || t.height(e.height);
            }
            t.emit("load");
            t._freeze(!1).resize();
            s = null;
            r.removeAttr("style");
            r = a = null;
        }, l = function(e) {
            n.showing ? t.once("shown", e) : e();
        };
        if (!r.length) {
            var u = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), c = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (u ? ' allowtransparency="true"' : "") + ' scrolling="' + n.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + e + '"></iframe>';
            r = i(c.replace(/{id}/g, n.id)).appendTo(o);
            a = r[0];
            n.autoSize ? r.one("load", function() {
                var t, e, n, o = m(a), u = o && i(o);
                if (u) {
                    t = u.width();
                    r.width(t);
                    e = u.height();
                    n = {
                        width: t,
                        height: e
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
    }, _ = function(t) {
        var e = this;
        t = l({}, t);
        var n = t.button || (t.button = []);
        s([ "cancel", "ok" ], function(e, i) {
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
            var u = t.url;
            if (u) {
                var c = t.close !== !1;
                t = l({
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
                    c && e.$("close").show();
                });
                e.on("hidden", function() {
                    e.destroy();
                });
                g(e);
            }
        }
        e = a.call(e, t) || e;
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
    }, b = "__showDelay", w = "__hideTimer";
    o.inherits(_, a, {
        show: function(t, e) {
            var n = this, i = n._, r = [].slice.call(arguments), e = l({}, i, e), a = e.duration || 0, s = e.delay || 0, c = function() {
                o.each([ b, w ], function(t, e) {
                    e = i[t];
                    delete i[t];
                    e && u(e);
                });
            }, f = function() {
                if (a > 0) {
                    i[w] = setTimeout(function() {
                        c();
                        n.hide();
                    }, a);
                    n.once("hide", c);
                }
                _.__super__.show.apply(n, r);
            };
            c();
            s > 0 ? i[b] = setTimeout(f, s) : f();
            return n;
        },
        hide: function() {
            var t = this, e = t._;
            e && o.each([ b, w ], function(t, n) {
                n = e[t];
                delete e[t];
                n && u(n);
            });
            _.__super__.hide.apply(t, arguments);
            return t;
        }
    });
    _.config = a.config;
    _.get = function(t) {
        if (t) {
            var e, n, i = a.get();
            if (t && (e = t.frameElement)) for (var o in i) if (i.hasOwnProperty(o)) {
                n = i[o];
                if (n.iframeNode === e) return n;
            }
            return i[t];
        }
    };
    n.exports = _;
});

define("lib/ui/box/1.0.1/box", [ "require", "exports", "module", "./messagebox", "../../../core/1.0.0/utils/util" ], function(t, e, n) {
    "use strict";
    var i = t("./messagebox"), o = t("../../../core/1.0.0/utils/util"), r = function() {}, a = o.mix, s = function(t, e) {
        var n = function(t, e) {
            return void 0 !== e && null !== e && "" !== e && !("number" == typeof e && isNaN(e));
        };
        return function(t, e) {
            return a(t, e, !0, !0, n);
        };
    }(), l = function(t) {
        return !!(t && t.nodeType && t.tagName);
    }, u = o.guid, c = function() {
        return u("__0x$");
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
        } else if (l(e)) {
            n = e;
            e = {};
        } else "number" == typeof e && (e = {
            duration: e
        });
        e = e || {};
        var i = d(s({
            id: c(),
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
            var n = d(s({
                autofocus: !0,
                autoRelease: !0,
                id: c(),
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
                id: c(),
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
                l(n) ? i = n : o = n;
                n = e;
            }
            if ("function" != typeof e) {
                o = e;
                e = r;
            }
            "function" != typeof n && (n = e);
            var a = function(t) {
                t ? e(t) : n(t);
            };
            o && (i = i || o.sender);
            var u = d(s({
                xtype: "confirm",
                autofocus: !0,
                id: c(),
                modal: !i,
                autoRelease: !0,
                content: "<div>" + t + "</div>",
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
            } else "number" == typeof n ? o.duration = n : o = s(o, n);
            return p(e, o, i);
        };
    });
    h.get = i.get;
    h.config = i.config;
    n.exports = h;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), o = t("../utils/util"), r = t("../event/emitter"), a = o.setImmediate, s = o.noop, l = o.extend, u = i.trim, c = i.parseJSON, f = function(t, e, n) {
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
            a(function() {
                --e;
                r();
            });
        }, r = function() {
            if (n.length > 0 && e < t) {
                var r = n.shift(), a = r[0], s = r[1];
                ++e;
                a.always(o);
                i.ajax(s);
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
        t = l(e, t);
        delete t.error;
        delete t.success;
        this._opts = t;
    };
    l(h.prototype, {
        send: function() {
            var t = this, e = this._opts, n = l({}, e), i = "jsonp" === n.dataType;
            i && (n.crossDomain = !0);
            n.complete = function(n, o) {
                var r, a = +n.status, s = n.responseJSON, l = {
                    error: "1",
                    msg: "Request error (status: " + (o || a) + ")"
                }, f = 200 === a || "success" === o;
                if (!i && !s) {
                    s = u(n.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = c(s);
                    } catch (d) {}
                }
                f || (s = s || l);
                r = {
                    data: s,
                    xhr: n,
                    origin: e,
                    status: a || o
                };
                f ? t.emit("response", null, r) : t.emit("error", s, r);
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
            a(function() {
                console.log("%c " + i, "color:#ae0000");
            }, 1);
        }, l = f(e.error || s, null, r), u = f(e.success || s, null, r);
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
            o.on("error", function(t, e) {
                var n = {
                    code: t.error,
                    message: t.msg,
                    status: e.status,
                    origin: e.origin,
                    response: e.data
                };
                d("error", n, e) !== !1 && l(t);
            });
            o.on("response", function(t, e) {
                e = e.data;
                d("response", e) !== !1 && (t ? l(t) : e && 0 === +(e.error || 0) ? u(e) : l(e));
            });
            return o.send();
        }
    };
    i.each([ "get", "post", "jsonp" ], function(t, n) {
        e[n] = function(t, i, o, r, a) {
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
            "string" == typeof t ? s.url = t : l(s, t);
            var u = n;
            if ("jsonp" === n) {
                u = "get";
                s.dataType = "jsonp";
            }
            s.type = u;
            return e.ajax(s, a);
        };
    });
});

define("lib/ui/tab/1.0.0/tab", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this, i = {
            event: "click"
        };
        n.el = o(t);
        n.options = o.extend(!0, {}, i, e);
        var r = s.build(t, !1);
        n.hd = r.get("hd");
        n.bd = r.get("bd");
        n.hdItems = r.get("hdItem");
        n.containers = r.get("container");
        n._initEvent();
        n._init();
    }
    var o = t("jquery"), r = t("lib/core/1.0.0/event/emitter"), a = t("lib/core/1.0.0/utils/util"), s = t("lib/core/1.0.0/dom/build");
    a.inherits(i, r);
    i.prototype._initEvent = function() {
        var t = this;
        t.hdItems.on(t.options.event, function(e) {
            e.preventDefault();
            var n = o(this);
            n.hasClass("current") || t.setCurrent(n.attr("data-target"));
        });
    };
    i.prototype._init = function() {};
    i.prototype.setCurrent = function(t) {
        var e = this;
        if (void 0 === t) {
            var n = e.hd.find(".current");
            0 == n.length && (n = this.hdItems.eq(0));
            t = n.attr("data-target");
        }
        e.hdItems.removeClass("current");
        var i = e.hd.find("[data-target=" + t + "]");
        i.addClass("current");
        e.containers.removeClass("current");
        var o = e.bd.find("[data-id=" + t + "]");
        o.addClass("current");
        e.emit("change", {
            hd: i,
            body: o
        });
    };
    n.exports = i;
});

!function() {
    function t(t) {
        return t.replace(_, "").replace(b, ",").replace(w, "").replace(x, "").replace(A, "").split(T);
    }
    function e(t) {
        return "'" + t.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
    }
    function n(n, i) {
        function o(t) {
            return d += t.split(/\n/).length - 1, c && (t = t.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), 
            t && (t = y[1] + e(t) + y[2] + "\n"), t;
        }
        function r(e) {
            var n = d;
            if (u ? e = u(e, i) : a && (e = e.replace(/\n/g, function() {
                return d++, "$line=" + d + ";";
            })), 0 === e.indexOf("=")) {
                var o = f && !/^=[=#]/.test(e);
                if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), o) {
                    var r = e.replace(/\s*\([^\)]+\)/, "");
                    p[r] || /^(include|print)$/.test(r) || (e = "$escape(" + e + ")");
                } else e = "$string(" + e + ")";
                e = y[1] + e + y[2];
            }
            return a && (e = "$line=" + n + ";" + e), g(t(e), function(t) {
                if (t && !v[t]) {
                    var e;
                    e = "print" === t ? b : "include" === t ? w : p[t] ? "$utils." + t : h[t] ? "$helpers." + t : "$data." + t, 
                    x += t + "=" + e + ",", v[t] = !0;
                }
            }), e + "\n";
        }
        var a = i.debug, s = i.openTag, l = i.closeTag, u = i.parser, c = i.compress, f = i.escape, d = 1, v = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, m = "".trim, y = m ? [ "$out='';", "$out+=", ";", "$out" ] : [ "$out=[];", "$out.push(", ");", "$out.join('')" ], _ = m ? "$out+=text;return $out;" : "$out.push(text);", b = "function(){var text=''.concat.apply('',arguments);" + _ + "}", w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + _ + "}", x = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0," : ""), A = y[0], T = "return new String(" + y[3] + ");";
        g(n.split(s), function(t) {
            t = t.split(l);
            var e = t[0], n = t[1];
            1 === t.length ? A += o(e) : (A += r(e), n && (A += o(n)));
        });
        var C = x + A + T;
        a && (C = "try{" + C + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + e(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var j = new Function("$data", "$filename", C);
            return j.prototype = p, j;
        } catch (k) {
            throw k.temp = "function anonymous($data,$filename) {" + C + "}", k;
        }
    }
    var i = function(t, e) {
        return "string" == typeof e ? m(e, {
            filename: t
        }) : a(t, e);
    };
    i.version = "3.0.0", i.config = function(t, e) {
        o[t] = e;
    };
    var o = i.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, r = i.cache = {};
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
        if (r[t]) e = r[t]; else if ("object" == typeof document) {
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
    var s = function(t, e) {
        return "string" != typeof t && (e = typeof t, "number" === e ? t += "" : t = "function" === e ? s(t.call(t)) : ""), 
        t;
    }, l = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, u = function(t) {
        return l[t];
    }, c = function(t) {
        return s(t).replace(/&(?![\w#]+;)|[<>"']/g, u);
    }, f = Array.isArray || function(t) {
        return "[object Array]" === {}.toString.call(t);
    }, d = function(t, e) {
        var n, i;
        if (f(t)) for (n = 0, i = t.length; i > n; n++) e.call(t, t[n], n, t); else for (n in t) e.call(t, t[n], n);
    }, p = i.utils = {
        $helpers: {},
        $include: a,
        $string: s,
        $escape: c,
        $each: d
    };
    i.helper = function(t, e) {
        h[t] = e;
    };
    var h = i.helpers = p.$helpers;
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
                return new l(n, s) + "";
            } catch (i) {
                return e.debug ? v(i)() : (e.debug = !0, m(t, e)(n));
            }
        }
        e = e || {};
        for (var a in o) void 0 === e[a] && (e[a] = o[a]);
        var s = e.filename;
        try {
            var l = n(t, e);
        } catch (u) {
            return u.filename = s || "anonymous", u.name = "Syntax Error", v(u);
        }
        return i.prototype = l.prototype, i.toString = function() {
            return l.toString();
        }, s && e.cache && (r[s] = i), i;
    }, g = p.$each, y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", _ = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, b = /[^\w$]+/g, w = new RegExp([ "\\b" + y.replace(/,/g, "\\b|\\b") + "\\b" ].join("|"), "g"), x = /^\d[^,]*|,\d[^,]*/g, A = /^,+|,+$/g, T = /^$|,+/;
    o.openTag = "{{", o.closeTag = "}}";
    var C = function(t, e) {
        var n = e.split(":"), i = n.shift(), o = n.join(":") || "";
        return o && (o = ", " + o), "$helpers." + i + "(" + t + o + ")";
    };
    o.parser = function(t) {
        t = t.replace(/^\s/, "");
        var e = t.split(" "), n = e.shift(), o = e.join(" ");
        switch (n) {
          case "if":
            t = "if(" + o + "){";
            break;

          case "else":
            e = "if" === e.shift() ? " if(" + e.join(" ") + ")" : "", t = "}else" + e + "{";
            break;

          case "/if":
            t = "}";
            break;

          case "each":
            var r = e[0] || "$data", a = e[1] || "as", s = e[2] || "$value", l = e[3] || "$index", u = s + "," + l;
            "as" !== a && (r = "[]"), t = "$each(" + r + ",function(" + u + "){";
            break;

          case "/each":
            t = "});";
            break;

          case "echo":
            t = "print(" + o + ");";
            break;

          case "print":
          case "include":
            t = n + "(" + e.join(",") + ");";
            break;

          default:
            if (/^\s*\|\s*[\w\$]/.test(o)) {
                var c = !0;
                0 === t.indexOf("#") && (t = t.substr(1), c = !1);
                for (var f = 0, d = t.split("|"), p = d.length, h = d[f++]; p > f; f++) h = C(h, d[f]);
                t = (c ? "=" : "=#") + h;
            } else t = i.helpers[n] ? "=#" + n + "(" + e.join(",") + ");" : "=" + t;
        }
        return t;
    }, "function" == typeof define ? define("template", [], function() {
        return i;
    }) : "undefined" != typeof exports ? module.exports = i : this.template = i;
}();

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
        n.options = o.extend(!0, {}, i, e);
        n.options.ajax.url = t;
        n._isLoading = !1;
    }
    var o = t("jquery"), r = t("lib/core/1.0.0/io/request"), a = t("lib/core/1.0.0/event/emitter"), s = t("lib/core/1.0.0/utils/util");
    s.inherits(i, a);
    i.prototype.start = function() {
        var t = this, e = t.options, n = t.options.ajax;
        t._isLoading = !1;
        t._interval || (t._interval = setInterval(function() {
            if (!t._isLoading) {
                t._isLoading = !0;
                r[n.type](n.url, n.data, function(e) {
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
        e.options.ajax.data = o.extend({}, e.options.ajax.data, t);
    };
    n.exports = i;
});

define("plugins/polling-list/1.0.0/polling-list", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "./polling" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this;
        n.el = o(t);
        if (0 == n.el.length) throw new Error("the param [el] is required.");
        n.container = o('<div node-type="container"></div>');
        n.el.html(n.container);
        var i = {
            ajax: {
                url: null,
                type: "get",
                data: null
            }
        };
        n.options = o.extend(!0, {}, i, e);
        n._init();
        n._initEvent();
    }
    var o = t("jquery"), r = (t("lib/core/1.0.0/io/request"), t("lib/core/1.0.0/event/emitter")), a = t("lib/core/1.0.0/utils/util"), s = t("./polling");
    a.inherits(i, r);
    i.prototype._init = function() {
        var t = this;
        t.polling = new s(t.options.ajax.url, {
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

define("module/monitor/1.0.0/question", [ "require", "exports", "module", "jquery", "./../../../plugins/polling-list/1.0.0/polling-list", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "template" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this;
        n.el = o(t);
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
        n.options = o.extend(!0, {}, i, e);
        n._isPulling = !1;
        n._init();
        n._initEvent();
        n.max = 0;
    }
    var o = t("jquery"), r = t("./../../../plugins/polling-list/1.0.0/polling-list"), a = t("lib/core/1.0.0/io/request"), s = t("lib/core/1.0.0/event/emitter"), l = t("lib/core/1.0.0/utils/util"), u = t("template");
    l.inherits(i, s);
    i.prototype._init = function() {
        var t = this;
        t.pollingList = new r(t.el, {
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

define("module/monitor/1.0.0/note", [ "require", "exports", "module", "jquery", "./../../../plugins/polling-list/1.0.0/polling-list", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "template" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this;
        n.el = o(t);
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
        n.options = o.extend(!0, {}, i, e);
        n._isPulling = !1;
        n._init();
        n._initEvent();
        n.max = 0;
    }
    var o = t("jquery"), r = t("./../../../plugins/polling-list/1.0.0/polling-list"), a = t("lib/core/1.0.0/io/request"), s = t("lib/core/1.0.0/event/emitter"), l = t("lib/core/1.0.0/utils/util"), u = t("template");
    l.inherits(i, s);
    i.prototype._init = function() {
        var t = this;
        t.pollingList = new r(t.el, {
            ajax: t.options.pollingAjax,
            data: {
                max: t.max
            }
        });
        t._loadingHtml();
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
        return u("tAnswer", t);
    };
    n.exports = i;
});

!function() {
    var CKobject = {
        _K_: function(t) {
            return document.getElementById(t);
        },
        _T_: !1,
        _M_: !1,
        _G_: !1,
        _Y_: !1,
        _I_: null,
        _J_: 0,
        _O_: {},
        uaMatch: function(t, e, n, i, o, r, a, s, l) {
            var u = e.exec(t);
            if (null != u) return {
                b: "IE",
                v: u[2] || "0"
            };
            u = n.exec(t);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = i.exec(t);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = o.exec(t);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = r.exec(t);
            if (null != u) return {
                b: u[2] || "",
                v: u[1] || "0"
            };
            u = a.exec(t);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = s.exec(t);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = l.exec(t);
            return null != u ? {
                b: u[1] || "",
                v: u[2] || "0"
            } : {
                b: "unknown",
                v: "0"
            };
        },
        browser: function() {
            var t = navigator.userAgent, e = /(msie\s|trident.*rv:)([\w.]+)/, n = /(firefox)\/([\w.]+)/, i = /(opera).+version\/([\w.]+)/, o = /(chrome)\/([\w.]+)/, r = /version\/([\w.]+).*(safari)/, a = /(safari)\/([\w.]+)/, s = /(mozilla)\/([\w.]+)/, l = /(mobile)\/([\w.]+)/, u = t.toLowerCase(), c = this.uaMatch(u, e, n, i, o, r, a, s, l);
            if (c.b) {
                b = c.b;
                v = c.v;
            }
            return {
                B: b,
                V: v
            };
        },
        Platform: function() {
            var t = "", e = navigator.userAgent, n = (navigator.appVersion, {
                iPhone: e.indexOf("iPhone") > -1 || e.indexOf("Mac") > -1,
                iPad: e.indexOf("iPad") > -1,
                ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: e.indexOf("Android") > -1 || e.indexOf("Linux") > -1,
                webKit: e.indexOf("AppleWebKit") > -1,
                trident: e.indexOf("Trident") > -1,
                gecko: e.indexOf("Gecko") > -1 && e.indexOf("KHTML") == -1,
                presto: e.indexOf("Presto") > -1,
                mobile: !!e.match(/AppleWebKit.*Mobile.*/) || !!e.match(/AppleWebKit/),
                webApp: e.indexOf("Safari") == -1
            });
            for (var i in n) if (n[i]) {
                t = i;
                break;
            }
            return t;
        },
        isHTML5: function() {
            return !!document.createElement("video").canPlayType;
        },
        getType: function() {
            return this._T_;
        },
        getVideo: function() {
            var t = "", e = this._E_.v;
            if (e && e.length > 1) for (var n = 0; n < e.length; n++) {
                var i = e[n].split("->");
                i.length >= 1 && "" != i[0] && (t += '<source src="' + i[0] + '"');
                i.length >= 2 && "" != i[1] && (t += ' type="' + i[1] + '"');
                t += ">";
            }
            return t;
        },
        getVars: function(t) {
            var e = this._A_;
            return "undefined" == typeof e ? null : t in e ? e[t] : null;
        },
        getParams: function() {
            var t = "";
            if (this._A_) {
                1 == parseInt(this.getVars("p")) && (t += ' autoplay="autoplay"');
                1 == parseInt(this.getVars("e")) && (t += ' loop="loop"');
                2 == parseInt(this.getVars("p")) && (t += ' preload="metadata"');
                this.getVars("i") && (t += ' poster="' + this.getVars("i") + '"');
            }
            return t;
        },
        getpath: function(t) {
            var e = "CDEFGHIJKLMNOPQRSTUVWXYZcdefghijklmnopqrstuvwxyz", n = t.substr(0, 1);
            if (e.indexOf(n) > -1 && (t.substr(0, 4) == n + "://" || t.substr(0, 4) == n + ":\\")) return t;
            var o = unescape(window.location.href).replace("file:///", ""), r = parseInt(document.location.port), a = document.location.protocol + "//" + document.location.hostname, s = "", l = "", u = "", c = 0, f = unescape(t).split("//");
            f.length > 0 && (s = f[0] + "//");
            var d = "http|https|ftp|rtsp|mms|ftp|rtmp|file", p = d.split("|");
            80 != r && r && (a += ":" + r);
            for (i = 0; i < p.length; i++) if (p[i] + "://" == s) {
                c = 1;
                break;
            }
            if (0 == c) if ("/" == t.substr(0, 1)) u = a + t; else {
                l = o.substring(0, o.lastIndexOf("/") + 1).replace("\\", "/");
                var n = t.replace("../", "./"), a = n.split("./"), h = a.length, f = n.replace("./", ""), v = l.split("/"), m = v.length - h;
                for (i = 0; i < m; i++) u += v[i] + "/";
                u += f;
            } else u = t;
            return u;
        },
        getXhr: function() {
            var t;
            try {
                t = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    t = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    t = !1;
                }
            }
            t || "undefined" == typeof XMLHttpRequest || (t = new XMLHttpRequest());
            return t;
        },
        getX: function() {
            var f = "ckstyle()";
            this.getVars("x") && 1 != parseInt(this.getVars("c")) && (f = this.getVars("x") + "()");
            try {
                "object" == typeof eval(f) && (this._X_ = eval(f));
            } catch (e) {
                try {
                    "object" == typeof eval(ckstyle) && (this._X_ = ckstyle());
                } catch (e) {
                    this._X_ = ckstyle();
                }
            }
        },
        getSn: function(t, e) {
            return e >= 0 ? this._X_[t].split(",")[e] : this._X_[t];
        },
        getUrl: function(t, e) {
            var n = [ "get", "utf-8" ];
            if (t && 2 == t.length) {
                var i = t[0], o = t[1].split("/");
                o.length >= 2 && (n[0] = o[1]);
                o.length >= 3 && (n[1] = o[2]);
                this.ajax(n[0], n[1], i, function(t) {
                    var n = CKobject;
                    if (t && "error" != t) {
                        var i = "", o = t;
                        if (t.indexOf("}") > -1) {
                            for (var r = t.split("}"), a = 0; a < r.length - 1; a++) {
                                i += r[a] + "}";
                                var s = r[a].replace("{", "").split("->");
                                2 == s.length && (n._A_[s[0]] = s[1]);
                            }
                            o = r[r.length - 1];
                        }
                        n._E_.v = o.split(",");
                        if (e) n.showHtml5(); else {
                            n.changeParams(i);
                            n.newAdr();
                        }
                    }
                });
            }
        },
        getflashvars: function(t) {
            var e = "", n = 0;
            if (t) for (var i in t) {
                n > 0 && (e += "&");
                if ("f" == i && t[i] && !this.getSn("pm_repc", -1)) {
                    t[i] = this.getpath(t[i]);
                    t[i].indexOf("&") > -1 && (t[i] = encodeURIComponent(t[i]));
                }
                "y" == i && t[i] && (t[i] = this.getpath(t[i]));
                e += i + "=" + t[i];
                n++;
            }
            return e;
        },
        getparam: function(t) {
            var e = "", n = "", i = {
                allowScriptAccess: "always",
                allowFullScreen: !0,
                quality: "high",
                bgcolor: "#000"
            };
            if (t) for (var o in t) i[o] = t[o];
            for (var r in i) {
                e += r + '="' + i[r] + '" ';
                n += '<param name="' + r + '" value="' + i[r] + '" />';
            }
            e = e.replace("movie=", "src=");
            return {
                w: e,
                v: n
            };
        },
        getObjectById: function(t) {
            if (this._T_) return this;
            var e = null, n = this._K_(t), i = "embed";
            if (n && "OBJECT" == n.nodeName) if ("undefined" != typeof n.SetVariable) e = n; else {
                var o = n.getElementsByTagName(i)[0];
                o && (e = o);
            }
            return e;
        },
        ajax: function(t, e, n, i) {
            var o = this.getXhr(), r = [], a = "";
            if ("get" == t) {
                a = n.indexOf("?") > -1 ? n + "&t=" + new Date().getTime() : n + "?t=" + new Date().getTime();
                o.open("get", a);
            } else {
                r = n.split("?");
                n = r[0], a = r[1];
                o.open("post", n, !0);
            }
            o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            o.setRequestHeader("charset", e);
            "post" == t ? o.send(a) : o.send(null);
            o.onreadystatechange = function() {
                if (4 == o.readyState) {
                    var t = o.responseText;
                    i("" != t ? t : null);
                }
            };
        },
        addListener: function(t, e) {
            var n = CKobject._V_;
            if (n.addEventListener) try {
                n.addEventListener(t, e, !1);
            } catch (t) {
                this.getNot();
            } else if (n.attachEvent) try {
                n.attachEvent("on" + t, e);
            } catch (t) {
                this.getNot();
            } else n["on" + t] = e;
        },
        removeListener: function(t, e) {
            var n = CKobject._V_;
            if (n.removeEventListener) try {
                n.removeEventListener(t, e, !1);
            } catch (t) {
                this.getNot();
            } else if (n.detachEvent) try {
                n.detachEvent("on" + t, e);
            } catch (t) {
                this.getNot();
            } else n["on" + t] = null;
        },
        Flash: function() {
            var t = !1, e = 0;
            if (document.all || this.browser().B.toLowerCase().indexOf("ie") > -1) try {
                var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                t = !0;
                var i = n.GetVariable("$version");
                e = parseInt(i.split(" ")[1].split(",")[0]);
            } catch (o) {} else if (navigator.plugins && navigator.plugins.length > 0) {
                var n = navigator.plugins["Shockwave Flash"];
                if (n) {
                    t = !0;
                    for (var r = n.description.split(" "), a = 0; a < r.length; ++a) isNaN(parseInt(r[a])) || (e = parseInt(r[a]));
                }
            }
            return {
                f: t,
                v: e
            };
        },
        embed: function(t, e, n, i, o, r, a, s, l, u) {
            var c = [ "all" ];
            r ? this.isHTML5() ? this.embedHTML5(e, n, i, o, s, a, c, u) : this.embedSWF(t, e, n, i, o, a, l) : this.Flash().f && parseInt(this.Flash().v) > 10 ? this.embedSWF(t, e, n, i, o, a, l) : this.isHTML5() ? this.embedHTML5(e, n, i, o, s, a, c, u) : this.embedSWF(t, e, n, i, o, a, l);
        },
        embedSWF: function(t, e, n, i, o, r, a) {
            n || (n = "ckplayer_a1");
            a || (a = {
                bgcolor: "#FFF",
                allowFullScreen: !0,
                allowScriptAccess: "always",
                wmode: "transparent"
            });
            this._A_ = r;
            this.getX();
            var s = "undefined", l = !1, u = document, c = "http://www.macromedia.com/go/getflashplayer", f = '<a href="' + c + '" target="_blank">请点击此处下载安装最新的flash插件</a>', p = {
                w: "您的网页不符合w3c标准，无法显示播放器",
                f: "您没有安装flash插件，无法播放视频，" + f,
                v: "您的flash插件版本过低，无法播放视频，" + f
            }, h = typeof u.getElementById != s && typeof u.getElementsByTagName != s && typeof u.createElement != s, v = 'id="' + n + '" name="' + n + '" ', m = "", g = "";
            a.movie = t;
            a.flashvars = this.getflashvars(r);
            if (i == -1) {
                d = !0;
                this._K_(e).style.width = "100%";
                i = "100%";
            }
            m += '<object pluginspage="http://www.macromedia.com/go/getflashplayer" ';
            m += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
            m += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,3,0,0" ';
            m += 'width="' + i + '" ';
            m += 'height="' + o + '" ';
            m += v;
            m += 'align="middle">';
            m += this.getparam(a).v;
            m += "<embed ";
            m += this.getparam(a).w;
            m += ' width="' + i + '" height="' + o + '" name="' + n + '" id="' + n + '" align="middle" ' + v;
            m += 'type="application/x-shockwave-flash" pluginspage="' + c + '" />';
            m += "</object>";
            if (h) if (this.Flash().f) if (this.Flash().v < 11) {
                g = p.v;
                l = !0;
            } else {
                g = m;
                this._T_ = !1;
            } else {
                g = p.f;
                l = !0;
            } else {
                g = p.w;
                l = !0;
            }
            g && (this._K_(e).innerHTML = g);
            if (l) {
                this._K_(e).style.color = "#0066cc";
                this._K_(e).style.lineHeight = this._K_(e).style.height;
                this._K_(e).style.textAlign = "center";
            }
        },
        embedHTML5: function(e, i, o, r, l, u, c, d) {
            this._E_ = {
                c: e,
                p: i,
                w: o,
                h: r,
                v: l,
                s: c,
                j: !(void 0 != d && !d)
            };
            this._A_ = u;
            this.getX();
            b = this.browser().B, v = this.browser().V, x = v.split("."), t = x[0], m = b + v, 
            n = b + t, w = "", s = !1, f = this.Flash().f, a = !1;
            c || (c = [ "iPad", "iPhone", "ios" ]);
            for (var p = 0; p < c.length; p++) {
                w = c[p];
                if ("all" == w.toLowerCase()) {
                    s = !0;
                    break;
                }
                if ("all+false" == w.toLowerCase() && !f) {
                    s = !0;
                    break;
                }
                if (w.indexOf("+") > -1) {
                    w = w.split("+")[0];
                    a = !0;
                } else a = !1;
                if (this.Platform() == w || m == w || n == w || b == w) {
                    if (!a) {
                        s = !0;
                        break;
                    }
                    if (!f) {
                        s = !0;
                        break;
                    }
                }
            }
            if (s) {
                if (l) {
                    var h = l[0].split("->");
                    if (h && 2 == h.length && h[1].indexOf("ajax") > -1) {
                        this.getUrl(h, !0);
                        return;
                    }
                }
                this.showHtml5();
            }
        },
        status: function() {
            this._H_ = parseInt(this.getSn("setup", 20));
            var f = "ckplayer_status";
            "" != this.getSn("calljs", 0) && (f = this.getSn("calljs", 0));
            try {
                if ("function" == typeof eval(f)) {
                    this._L_ = eval(f);
                    this._M_ = !0;
                    return !0;
                }
            } catch (e) {
                try {
                    if ("function" == typeof eval(ckplayer_status)) {
                        this._L_ = ckplayer_status;
                        this._M_ = !0;
                        return !0;
                    }
                } catch (e) {
                    return !1;
                }
            }
            return !1;
        },
        showHtml5: function() {
            var C = CKobject, p = C._E_.p, a = C._E_.v, c = C._E_.c, j = "", b = !1, s = this._E_.v, w = C._E_.w, h = C._E_.h, d = !1, r = "";
            1 == s.length && (r = ' src="' + s[0].split("->")[0] + '"');
            if (w == -1) {
                d = !0;
                C._K_(c).style.width = "100%";
                w = "100%";
            }
            w.toString().indexOf("%") > -1 && (w = "100%");
            h.toString().indexOf("%") > -1 && (h = "100%");
            C._E_.j && (j = 'controls="controls"');
            var v = "<video " + j + r + ' id="' + p + '" width="' + w + '" height="' + h + '"' + C.getParams() + ">" + C.getVideo() + "</video>";
            C._K_(c).innerHTML = v;
            C._K_(c).style.backgroundColor = "#000";
            C._V_ = C._K_(p);
            if (!d) {
                C._K_(c).style.width = C._E_.w.toString().indexOf("%") > -1 ? C._K_(c).offsetWidth * parseInt(C._E_.w) * .01 + "px" : C._V_.width + "px";
                C._K_(c).style.height = C._E_.h.toString().indexOf("%") > -1 ? C._K_(c).offsetHeight * parseInt(C._E_.h) * .01 + "px" : C._V_.height + "px";
            }
            C._P_ = !1;
            C._T_ = !0;
            if ("" != C.getVars("loaded")) {
                var f = C.getVars("loaded") + "()";
                try {
                    "function" == typeof eval(f) && eval(f);
                } catch (e) {
                    try {
                        "function" == typeof eval(loadedHandler) && loadedHandler();
                    } catch (e) {}
                }
            }
            C.status();
            C.addListener("play", C.playHandler);
            C.addListener("pause", C.playHandler);
            C.addListener("error", C.errorHandler);
            C.addListener("emptied", C.errorHandler);
            C.addListener("loadedmetadata", C.loadedMetadataHandler);
            C.addListener("ended", C.endedHandler);
            C.addListener("volumechange", C.volumeChangeHandler);
            ("" != C.getVars("m") && null != C.getVars("m") || parseInt(C.getSn("setup", 0)) > 0) && (C._K_(c).style.cursor = "pointer");
            ("" != C.getVars("m") && null != C.getVars("m") || 1 == parseInt(C.getSn("setup", 1))) && C.addListener("click", C.html5Click);
        },
        videoPlay: function() {
            this._T_ && this._V_.play();
        },
        videoPause: function() {
            this._T_ && this._V_.pause();
        },
        playOrPause: function() {
            this._T_ && (this._V_.paused ? this._V_.play() : this._V_.pause());
        },
        fastNext: function() {
            this._T_ && (this._V_.currentTime = this._V_.currentTime + 10);
        },
        fastBack: function() {
            this._T_ && (this._V_.currentTime = this._V_.currentTime - 10);
        },
        changeVolume: function(t) {
            this._T_ && (this._V_.volume = .01 * t);
        },
        videoSeek: function(t) {
            this._T_ && (this._V_.currentTime = t);
        },
        newAddress: function(t) {
            var e = [];
            if (t) {
                e = this.isHtml5New(t);
                if (e && this._T_) {
                    this.changeParams(t);
                    var n = e[0].split("->");
                    if (n && 2 == n.length && n[1].indexOf("ajax") > -1) {
                        this.getUrl(n, !1);
                        return;
                    }
                    this._E_.v = e;
                    this.newAdr();
                }
            }
        },
        quitFullScreen: function() {
            document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
        },
        changeStatus: function(t) {
            this._H_ = t;
        },
        newAdr: function() {
            var t = this._E_.v;
            this._V_.pause();
            1 == t.length ? this._V_.src = t[0].split("->")[0] : this._V_.innerHTML = this.getVideo();
            this._V_.load();
        },
        isHtml5New: function(t) {
            if (t.indexOf("html5") == -1) return !1;
            for (var e = t.replace(/{/g, ""), n = e.split("}"), i = "", o = 0; o < n.length; o++) if (n[o].indexOf("html5") > -1) {
                i = n[o].replace("html5->", "").split(",");
                break;
            }
            return i;
        },
        changeParams: function(t) {
            if (t) for (var e = t.replace(/{/g, ""), n = e.split("}"), i = 0; i < n.length; i++) {
                var o = n[i].split("->");
                if (2 == o.length) switch (o[0]) {
                  case "p":
                    if (1 == parseInt(o[1])) this._V_.autoplay = !0; else if (2 == parseInt(o[1])) this._V_.preload = "metadata"; else {
                        this._V_.autoplay = !1;
                        if (null != this._I_) {
                            clearInterval(this._I_);
                            this._I_ = null;
                        }
                    }
                    break;

                  case "e":
                    1 == parseInt(o[1]) ? this._V_.loop = !0 : this._V_.loop = !1;
                    break;

                  case "i":
                    this._V_.poster = o[1];
                }
            }
        },
        frontAdPause: function(t) {
            this.getNot();
        },
        frontAdUnload: function() {
            this.getNot();
        },
        changeFace: function(t) {
            this.getNot();
        },
        plugin: function(t, e, n, i, o, r, a) {
            this.getNot();
        },
        videoClear: function() {
            this.getNot();
        },
        videoBrightness: function(t) {
            this.getNot();
        },
        videoContrast: function(t) {
            this.getNot();
        },
        videoSaturation: function(t) {
            this.getNot();
        },
        videoSetHue: function(t) {
            this.getNot();
        },
        videoWAndH: function(t, e) {
            this.getNot();
        },
        videoWHXY: function(t, e, n, i) {
            this.getNot();
        },
        changeFlashvars: function(t) {
            this.getNot();
        },
        changeMyObject: function(t, e) {
            this.getNot();
        },
        getMyObject: function(t, e) {
            this.getNot();
        },
        changeeFace: function() {
            this.getNot();
        },
        changeStyle: function(t, e) {
            this.getNot();
        },
        promptLoad: function() {
            this.getNot();
        },
        promptUnload: function() {
            this.getNot();
        },
        marqueeLoad: function(t, e) {
            this.getNot();
        },
        marqueeClose: function(t) {
            this.getNot();
        },
        getNot: function() {
            var t = "The ckplayer's API for HTML5 does not exist";
            return t;
        },
        volumeChangeHandler: function() {
            var t = CKobject;
            if (t._V_.muted) {
                t.returnStatus("volumechange:0", 1);
                t._O_.volume = 0;
                t._O_.mute = !0;
            } else {
                t._O_.mute = !1;
                t._O_.volume = 100 * t._V_.volume;
                t.returnStatus("volumechange:" + 100 * t._V_.volume, 1);
            }
        },
        endedHandler: function() {
            var C = CKobject, e = parseInt(C.getVars("e"));
            C.returnStatus("ended", 1);
            if (C._I_) {
                clearInterval(C._I_);
                C._I_ = null;
            }
            if (0 == e || 4 == e || 6 == e) {
                6 == e && this.quitFullScreen();
                var f = "playerstop()";
                "" != C.getSn("calljs", 2) && (f = C.getSn("calljs", 2) + "()");
                try {
                    if ("function" == typeof eval(f)) {
                        eval(f);
                        return;
                    }
                } catch (e) {
                    try {
                        if ("function" == typeof eval(playerstop)) {
                            playerstop();
                            return;
                        }
                    } catch (e) {
                        return;
                    }
                }
            }
        },
        loadedMetadataHandler: function() {
            var t = CKobject;
            t.returnStatus("loadedmetadata", 1);
            t._O_.totaltime = t._V_.duration;
            t._O_.width = t._V_.width;
            t._O_.height = t._V_.height;
            t._O_.awidth = t._V_.videoWidth;
            t._O_.aheight = t._V_.videoHeight;
            if (t._V_.defaultMuted) {
                t.returnStatus("volumechange:0", 1);
                t._O_.mute = !0;
                t._O_.volume = 0;
            } else {
                t._O_.mute = !1;
                t._O_.volume = 100 * t._V_.volume;
                t.returnStatus("volumechange:" + 100 * t._V_.volume, 1);
            }
            1 == parseInt(t.getVars("p")) && t.playHandler();
        },
        errorHandler: function() {
            CKobject.returnStatus("error", 1);
        },
        playHandler: function() {
            var t = CKobject;
            if (t._V_.paused) {
                t.returnStatus("pause", 1);
                t.addO("play", !1);
                if (null != t._I_) {
                    clearInterval(t._I_);
                    t._I_ = null;
                }
            } else {
                t.returnStatus("play", 1);
                t.addO("play", !0);
                if (!t._P_) {
                    t.returnStatus("play", 1);
                    t._P_ = !0;
                }
                t._I_ = setInterval(t.playTime, parseInt(t.getSn("setup", 37)));
                if (!t._G_) {
                    t._G_ = !0;
                    for (var e in t._A_) if ("g" == e && t._A_[e]) {
                        var n = parseInt(t._A_[e]);
                        t.videoSeek(n);
                    }
                }
                if (!t._Y_) {
                    t._Y_ = !0;
                    for (var e in t._A_) if ("j" == e && t._A_[e]) {
                        var i = parseInt(t._A_[e]);
                        i > 0 ? t._J_ = i : t._J_ = parseInt(t._O_.totaltime) + i;
                    }
                }
            }
        },
        html5Click: function() {
            var t = CKobject;
            "" != t.getVars("m") && null != t.getVars("m") && window.open(t.getVars("m"));
        },
        returnStatus: function(t, e) {
            var n = t;
            3 == this._H_ && (n = this._E_.p + "->" + n);
            this._M_ && e <= this._H_ && this._L_(n);
        },
        addO: function(t, e) {
            this._O_[t] = e;
        },
        getStatus: function() {
            return this._O_;
        },
        playTime: function() {
            var t = CKobject, e = t._V_.currentTime;
            t._O_.time = e;
            if (t._J_ > 0 && e > t._J_) {
                t._J_ = 0;
                t.videoSeek(t._O_.totaltime);
            }
            t.returnStatus("time:" + e, 1);
        }
    };
    window.CKobject = CKobject;
}();

define("plugins/ckplayer/6.7.0/ckplayer", function() {});

define("plugins/ckplayer/6.7.0/player", [ "require", "exports", "module", "jquery", "./ckplayer", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this;
        if (void 0 === t) throw new Error("the param [selector] is required.");
        n.el = o(t);
        n._id = n.el.attr("id");
        n._playId = "_player-" + n._id;
        n._gLoadedHandler = "gLoadedHandler-" + n._id;
        var i = {
            interval: 1e3,
            swfPlayer: $PAGE_DATA.ckplayer || "",
            embed: {
                width: "100%",
                height: "500"
            },
            params: {
                bgcolor: "#FFF",
                allowFullScreen: !0,
                allowScriptAccess: "always",
                wmode: "transparent"
            },
            flash: {
                f: $PAGE_DATA.m3u8 || "",
                a: $PAGE_DATA.play || "",
                s: "4",
                c: "0",
                x: "",
                i: "",
                u: "",
                r: "",
                t: "",
                y: "",
                z: "",
                e: "0",
                v: "100",
                p: "0",
                h: "0",
                q: "",
                m: "0",
                o: "",
                w: "",
                g: "0",
                j: "",
                wh: "",
                ct: "2",
                drift: "",
                loaded: n._gLoadedHandler,
                my_url: encodeURIComponent(window.location.href)
            }
        };
        n.options = o.extend(!0, {}, i, e);
        CKobject.embedSWF(n.options.swfPlayer, n._id, n._playId, n.options.embed.width, n.options.embed.height, n.options.flash, n.options.params);
        n._init();
        n._initEvent();
    }
    var o = t("jquery");
    t("./ckplayer");
    var r = t("lib/core/1.0.0/event/emitter"), a = t("lib/core/1.0.0/utils/util");
    a.inherits(i, r);
    i.prototype._init = function() {
        var t = this;
        t.CKobject = CKobject;
        t.player = t.get();
        t._embed = t.el.find("embed");
    };
    i.prototype._initEvent = function() {
        var t = this;
        t.options.interval > 0 && setInterval(function() {
            t.emit("time", t.getStatus().time);
        }, t.options.interval);
    };
    i.prototype.play = function() {
        var t = this;
        t.player.videoPlay();
    };
    i.prototype.playOrPause = function() {
        var t = this;
        t.player.playOrPause();
    };
    i.prototype.pause = function() {
        var t = this;
        t.player.videoPause();
    };
    i.prototype.jump = function(t) {
        var e = this;
        t >= 0 && e.player.videoSeek(t);
    };
    i.prototype.go = function(t) {
        if (void 0 === t) throw new Error("this params [url] is require.");
        var e = this;
        e.options.flash.f = t;
        e.player.newAddress(e.options.flash);
    };
    i.prototype.volume = function(t) {
        var e = this;
        0 <= t && t <= 100 && e.player.changeVolume(t);
    };
    i.prototype.width = function(t) {
        var e = this;
        e._embed.width(t || e.options.embed.width);
    };
    i.prototype.height = function(t) {
        var e = this;
        e._embed.width(t || e.options.embed.height);
    };
    i.prototype.getTotalTime = function() {
        var t = this;
        return t.player.getStatus().totalTime;
    };
    i.prototype.getCurrentTime = function() {
        var t = this;
        return t.player.getStatus().time;
    };
    i.prototype.getStatus = function() {
        var t = this;
        return t.player.getStatus();
    };
    i.prototype.get = function() {
        var t = this;
        return t.CKobject.getObjectById(t._playId);
    };
    n.exports = i;
});

define("conf/play", [ "require", "exports", "module", "jquery", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer", "lib/ui/box/1.0.1/box", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/io/request", "lib/ui/tab/1.0.0/tab", "template", "module/monitor/1.0.0/question", "module/monitor/1.0.0/note", "module/login-status/1.0.0/login", "plugins/ckplayer/6.7.0/player" ], function(t, e, n) {
    "use strict";
    function i(t, e, n, i, o) {
        if (t > e) {
            n.addClass("text-error");
            i.addClass("publish-error");
            o.css({
                color: "red"
            });
        } else {
            n.removeClass("text-error");
            i.removeClass("publish-error");
            o.css({
                color: "#666"
            });
        }
        o.children(".num").text(t);
    }
    function o(t, e, n, i, o) {
        "" == t ? m.error("请输入发表内容") : e.hasClass("publish-error") || y.get(n, i, function(t) {
            if (t) if (0 == t.code) {
                m.ok("发表成功");
                o.val("");
            } else m.error(t.msg || "发表失败"); else m.error("发表失败，请重试");
        }, function(t) {
            m.error(t.msg || "网络错误,请重试");
        });
    }
    function r(t, e, n) {
        y.get(t, e, function(t) {
            t ? 0 == t.code ? m.ok(n + "成功") : m.error(t.msg || n + "失败") : m.error(n + "失败，请重试");
        }, function(t) {
            m.error(t.msg || "网络错误,请重试");
        });
    }
    function a(t, e, n, i) {
        var o = m.loading("正在加载...", {
            modal: !1
        });
        y.get(t, e, function(t) {
            if (!f.isEmptyObject(t.data) && t.data && t.data.resultList && t.data.resultList.length > 0) {
                var e = b(n, t.data);
                document.getElementById(i).innerHTML = e;
                l = new g(f("#" + i).find(".jImg"), {
                    mouseWheel: !0,
                    effect: "fadeIn",
                    snap: !0
                });
            } else {
                var e = b("tEmpty", 1);
                document.getElementById(i).innerHTML = e;
            }
            o && o.hide();
        }, function(t) {
            document.getElementById(i).innerHTML = "<div style='color: #000;'>请求超时请重试！<a href=''>刷新</a></div>";
            o && o.hide();
        });
    }
    function s(t) {
        switch (t) {
          case "0":
            var e = {
                id: 0,
                pageSize: 20,
                sortType: 1,
                showType: 1,
                sourceType: 2,
                sourceId: I
            };
            E.show();
            L.hide();
            j.hide();
            k.hide();
            u && u.stop();
            c && c.stop();
            a($PAGE_DATA.note.note, e, "tAnswer", "jNoteTab1");
            break;

          case "1":
            var e = {
                id: 0,
                pageSize: 20,
                sortType: 1,
                showType: 0,
                sourceType: 2,
                sourceId: I
            };
            E.hide();
            L.show();
            j.hide();
            k.hide();
            c || (c = new x("#jNoteTab2", {
                pollingAjax: {
                    url: $PAGE_DATA.note.note,
                    data: e
                },
                pagerAjax: {
                    url: $PAGE_DATA.note.note,
                    data: e
                }
            }));
            u && u.stop();
            c.start();
            break;

          case "2":
            var e = {
                id: 0,
                pageSize: 20,
                sortType: 1,
                showType: 1,
                sourceType: 2,
                sourceId: I
            };
            E.hide();
            L.hide();
            j.show();
            k.hide();
            u && u.stop();
            c && c.stop();
            a($PAGE_DATA.question.question, e, "tQuestion", "jQuestionTab1");
            break;

          case "3":
            var e = {
                id: 0,
                pageSize: 20,
                sortType: 1,
                showType: 0,
                sourceType: 2,
                sourceId: I
            };
            E.hide();
            L.hide();
            j.hide();
            k.show();
            u || (u = new w("#jQuestionTab2", {
                pollingAjax: {
                    url: $PAGE_DATA.question.question,
                    data: e
                },
                pagerAjax: {
                    url: $PAGE_DATA.question.question,
                    data: e
                }
            }));
            u.start();
            c && c.stop();
        }
    }
    var l, u, c, f = t("jquery"), d = t("module/top-search/1.0.0/top-search"), p = t("module/login-status/1.0.0/login-status"), h = t("module/fix-bar/1.0.0/fix-bar"), v = t("module/footer/1.0.0/footer"), m = (new d(), 
    new p(), new h(), new v(), t("lib/ui/box/1.0.1/box")), g = t("lib/plugins/lazyload/1.9.3/lazyload"), y = t("lib/core/1.0.0/io/request"), _ = t("lib/ui/tab/1.0.0/tab"), b = t("template"), w = t("module/monitor/1.0.0/question"), x = t("module/monitor/1.0.0/note"), A = t("module/login-status/1.0.0/login"), T = (f(".jMod-catlog"), 
    f("#jTab")), C = new _(T), j = f("#jQuestionTab1"), k = f("#jQuestionTab2"), E = f("#jNoteTab1"), L = f("#jNoteTab2"), $ = $PAGE_DATA.courseId, I = $PAGE_DATA.lessonId, q = t("plugins/ckplayer/6.7.0/player"), S = new q("#jAudio", {
        swfPlayer: $PAGE_DATA.ckplayer,
        embed: {
            width: "871",
            height: "655"
        },
        flash: {
            i: "",
            g: $PAGE_DATA.startTime || 0,
            f: $PAGE_DATA.m3u8,
            a: $PAGE_DATA.play
        }
    }), P = !0;
    S.on("time", function(t) {
        if (P && t > 0) {
            P = !1;
            var e = f.extend(!0, {}, $PAGE_DATA.setPlayTimeParams, {
                playTime: t,
                duration: S.getTotalTime(),
                courseId: $,
                lessonId: I
            });
            y.get($PAGE_DATA.setPlayTime, e, function(t) {
                P = !0;
            }, function(t) {
                P = !0;
            });
        }
        t == S.getTotalTime();
    });
    var O = f(".jPublishA"), N = f(".jPublishQ"), V = f(".jTxtNumA"), z = f(".jTxtNumQ"), D = f(".jTxtA"), H = f(".jTxtQ");
    T.on("keyup", ".jTxtA", function() {
        var t = f(this).val().length;
        i(t, 500, f(this), O, V);
    });
    T.on("keyup", ".jTxtQ", function() {
        var t = f(this).val().length;
        i(t, 500, f(this), N, z);
    });
    var M = f("#jAnswer"), F = f("#jQues"), G = {
        sourceType: 2,
        sourceId: I,
        content: "",
        showType: 1
    };
    T.on("click", ".jPublishA", function() {
        if (A.isLogin()) {
            var t = D.val();
            G.content = t;
            M.is(":checked") ? G.showType = 1 : G.showType = 2;
            o(t, f(this), $PAGE_DATA.note.publish, G, D);
        } else A.login(window.location.href);
    });
    T.on("click", ".jPublishQ", function() {
        if (A.isLogin()) {
            var t = H.val();
            G.content = t;
            F.is(":checked") ? G.showType = 1 : G.showType = 2;
            o(t, f(this), $PAGE_DATA.question.publish, G, H);
        } else A.login(window.location.href);
    });
    T.on("focus", ".jTxt", function() {
        f(this).addClass("text-focus").attr("placeholder", "");
        f(this).css("color", "#333");
    }).on("blur", ".jTxt", function() {
        if ("" === f(this).val()) {
            f(this).removeClass("text-focus").attr("placeholder", "有疑问?快来记录吧~(限500字)!");
            f(this).css("color", "#ccc");
        }
    });
    T.on("click", ".like", function() {
        if (A.isLogin()) {
            var t, e = f(this).attr("data-dataType"), n = f(this).attr("data-type"), i = f(this).attr("data-value");
            if (f(this).hasClass("activeLike")) {
                t = {
                    dataType: e,
                    type: n,
                    id: i
                };
                r($PAGE_DATA.note.like, t, "取消点赞");
                f(this).removeClass("activeLike");
            } else {
                t = {
                    dataType: e,
                    type: n,
                    id: i
                };
                r($PAGE_DATA.question.like, t, "点赞");
                f(this).addClass("activeLike");
            }
        } else A.login(window.location.href);
    });
    T.on("click", ".jSubNav", function() {
        f(this).addClass("ui-current").siblings().removeClass("ui-current");
        var t = f(this).attr("data-type");
        s(t);
    });
    var U = {
        id: I,
        type: 2,
        pageNo: 1,
        pageSize: 20
    };
    a($PAGE_DATA.dirUrl, U, "tDir", "jDir");
    C.on("change", function(t) {
        var e = t.body.find(".ui-current").attr("data-type");
        s(e);
        var n = t.body.attr("data-id");
        "1" == n && a($PAGE_DATA.dirUrl, U, "tDir", "jDir");
        l.update();
    });
});