/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

/*! layer-v3.0.1 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */

function ckcpt() {
    var e = "";
    e += "drift.swf,0,0,0,0,2,0|";
    return e;
}

function ckstyle() {
    var e = {
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
    return e;
}

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, i) {
    "use strict";
    function n(e) {
        return "object" == typeof e && null !== e;
    }
    function o() {}
    function r(e, t) {
        for (var i = e.length, n = -1; ++n < i; ) t(e[n], n);
    }
    function a(e, t) {
        for (var i in e) p.call(e, i) && t(e[i], i, e);
    }
    function s(e, t) {
        if (e && e.forEach) return e.forEach(t);
        h(e) ? r(e, t) : a(e, t);
    }
    function l(e, t) {
        for (var i = -1, n = e.length, o = Array(n); ++i < n; ) o[i] = t(e[i], i, e);
        return o;
    }
    function u(e, t) {
        var i = [];
        s(e, function(e, n, o) {
            i.push(t(e, n, o));
        });
        return i;
    }
    function c(e, t) {
        if (!t || !n(t)) return e;
        for (var i = v(t), o = i.length; o--; ) e[i[o]] = t[i[o]];
        return e;
    }
    function f(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, i = {}, n = e.split("&"), o = -1, r = n.length; ++o < r; ) {
            t = n[o].split("=");
            i[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return i;
    }
    var d = new Function("return this")(), p = Object.prototype.hasOwnProperty, h = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, m = function() {
        var e = (+new Date()).toString(36), t = -1;
        return function(i) {
            return (i || "") + e + ++t;
        };
    }(), v = Object.keys || function(e) {
        var t = [];
        a(e, function(e, i) {
            t.push(i);
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
        return function(t, i) {
            t.__super__ = i.prototype;
            e.prototype = i.prototype;
            t.prototype = new e(t);
        };
    }(), g = d.console || (d.console = {});
    r([ "log", "error", "trace", "warn", "info" ], function(e) {
        g[e] || (g[e] = o);
    });
    t.extend = function(e, t) {
        for (var i = [].slice.call(arguments, 1), n = i.length, o = -1; ++o < n; ) c(e, i[o]);
        return e;
    };
    t.inherits = function(e, t, i) {
        y(e, t);
        i && c(e.prototype, i);
    };
    t.impls = function(e, i) {
        i = "function" == typeof i ? i.prototype : i;
        t.mix(e.prototype, i);
        return e;
    };
    t.parseQuery = f;
    t.parseParams = f;
    t.each = s;
    t.map = function(e, t) {
        var i = h(e) ? l : u;
        return i(e, t);
    };
    t.filter = function(e, t) {
        var i, n, o = h(e) ? (i = r, n = function(e, t) {
            o.push(t);
        }, []) : (i = a, n = function(e, t) {
            o[e] = t;
        }, {});
        i(e, function(e, i) {
            t(e, i) && n(i, e);
        });
        return o;
    };
    t.mix = function _(e, t, i, n, o) {
        for (var r in t) t.hasOwnProperty(r) && (t[r] && e[r] && i && "object" == typeof t[r] ? _(e[r], t[r], i, n, o) : (void 0 === e[r] || n) && (o && !o(e[r], t[r]) || (e[r] = t[r])));
        return e;
    };
    t.guid = m;
    t.setImmediate = function() {
        var e = d.document, t = d.postMessage, i = d.setImmediate;
        return i ? i : "onreadystatechange" in e.createElement("script") ? function(t) {
            function i() {
                n.onreadystatechange = null;
                n.parentNode.removeChild(n);
                t();
            }
            var n = e.createElement("script");
            n.onreadystatechange = i;
            e.documentElement.appendChild(n);
        } : t ? function(e) {
            function i(t) {
                if (t.data === n) {
                    d.removeEventListener("message", i, !0);
                    e();
                }
            }
            var n = m();
            d.addEventListener("message", i, !0);
            t(n, "*");
        } : function(e) {
            d.setTimeout(e, 0);
        };
    }();
    t.noop = o;
    t.throttle = function(e, t) {
        t = t ? t : 150;
        if (t === -1) return function() {
            e.apply(this, arguments);
        };
        var i;
        return function() {
            var n = +new Date();
            if (!i || n - i > t) {
                i = n;
                e.apply(this, arguments);
            }
        };
    };
    t.debounce = function(e, t, i, n) {
        var o;
        return function() {
            var r = n || this, a = arguments, s = function() {
                o = null;
                i || e.apply(r, a);
            }, l = i && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            l && e.apply(r, a);
        };
    };
    t.deprecate = function(e, t) {
        function i() {
            n || (n = !0);
            return e.apply(this, arguments);
        }
        if (d.noDeprecation === !0) return e;
        var n = !1;
        return i;
    };
});

define("lib/core/1.0.0/dom/dataset", [ "require", "exports", "module", "jquery" ], function(e, t, i) {
    "use strict";
    function n(e) {
        return e.replace(s, "ms-").replace(l, u);
    }
    function o(e) {
        try {
            return "true" === e || "false" !== e && ("null" === e ? null : +e + "" === e ? +e : c.test(e) ? a.parseJSON(e) : e);
        } catch (t) {}
    }
    function r(e, t, i) {
        var n;
        if (void 0 === i && 1 === e.nodeType) {
            n = "data-" + t.replace(f, "-$&").toLowerCase();
            i = e.getAttribute(n);
            "string" != typeof i && (i = void 0);
        }
        return i;
    }
    var a = (window.document, e("jquery")), s = /^-ms-/, l = /-([\da-z])/gi, u = function(e, t) {
        return t.toUpperCase();
    }, c = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, f = /[A-Z]/g, d = function(e, t, i) {
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
                    s = n(s.slice(5));
                    u[s] = o(r(e, s));
                }
            }
            return u;
        }
    };
    i.exports = d;
});

define("lib/core/1.0.0/dom/build", [ "require", "exports", "module", "jquery", "./dataset" ], function(e, t, i) {
    "use strict";
    function n(e, t, i, n) {
        n ? e[t] || (e[t] = i) : e[t] ? e[t] = e[t].add(i) : e[t] = r(i);
    }
    var o = window.document, r = e("jquery"), a = function(e, t, i) {
        var a, s, l, u, c, f = function(e) {
            if (i) for (var o in i) l[o] = r(i[o].toString(), e); else {
                l = {};
                u = r("[node-type]", e);
                for (var a, s = -1, c = u.length; ++s < c; ) {
                    a = u[s];
                    o = a.getAttribute("node-type");
                    n(l, o, a, t);
                }
            }
        }, d = function(e) {
            var i, o = l[e];
            if (!o || 0 === o.length) {
                i = r('[node-type="' + e + '"]', a);
                i.length && n(l, e, i, t);
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
            for (;c = a.firsChild; ) s.appendChild(c);
        } else {
            a = r(e);
            s = a[0];
        }
        f(a);
        return {
            get: d,
            box: s,
            list: l
        };
    };
    t.build = a, t.parse = function(e, t, i) {
        "object" == typeof e && e.length > 0 && (e = e[0]);
        if (!e || 1 !== e.nodeType) throw TypeError("parse error, not a valid html element");
        if ("boolean" == typeof i) {
            t = i;
            i = null;
        }
        return a(e, t, i).list;
    };
    t.dataset = e("./dataset");
});

define("module/top-search/1.0.0/top-search", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
            activeClass: "focus",
            selector: "#jTopSearch",
            url: $PAGE_DATA && $PAGE_DATA.topSearchUrl || "",
            data: {},
            alias: "name"
        };
        t.options = o.extend(!0, {}, i, e);
        if ("" == t.options.url) throw new Error("the params options.url is required");
        t.el = o(t.options.selector);
        var n = r.build(t.el[0], !1);
        t.ipt = n.get("ipt");
        t.btn = n.get("btn");
        t.lbl = n.get("lbl");
        t._init();
        t._initEvent();
    }
    var o = e("jquery"), r = (e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build"));
    n.prototype._initEvent = function() {
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
    n.prototype._init = function() {
        var e = this, t = o.trim(e.ipt.val()), i = e.ipt.attr("data-id");
        t.length > 0 && e.focus();
        i && (e.options.alias = i);
        e.options.data && (e.options.data[e.options.alias] = o.trim(e.ipt.val()));
    };
    n.prototype.focus = function() {
        var e = this;
        e.el.addClass(e.options.activeClass);
    };
    n.prototype.blur = function() {
        var e = this;
        e.el.removeClass(e.options.activeClass);
    };
    n.prototype.getValue = function() {
        var e = this;
        return o.trim(e.ipt.val());
    };
    n.prototype.search = function() {
        var e = this;
        e.options.data[e.options.alias] = e.getValue();
        window.location.href = e.options.url + "?" + e._getUrlString();
    };
    n.prototype._getUrlString = function() {
        var e = this, t = "", i = 0;
        for (var n in e.options.data) {
            t += 0 == i ? n + "=" + encodeURIComponent(e.options.data[n]) : "&" + n + "=" + encodeURIComponent(e.options.data[n]);
            i++;
        }
        return t;
    };
    i.exports = n;
});

define("lib/core/1.0.0/io/cookie", [ "require", "exports", "module" ], function(e, t, i) {
    "use strict";
    var n = window.document, o = function(e) {
        if ("string" != typeof e) throw "trim need a string as parameter";
        for (var t = e.length, i = 0, n = t - 1, o = /(\u3000|\s|\t|\u00A0)/; i < t && o.test(e.charAt(i)); ) ++i;
        for (;n >= 0 && o.test(e.charAt(n)); ) --n;
        return e.substring(i, n + 1);
    }, r = function(e) {
        var t = {};
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t;
    }, a = function(e, t, i) {
        i = i || {};
        if (void 0 !== t) {
            i = r(i);
            if (null === t) {
                t = "";
                i.expires = -1;
            }
            if ("number" == typeof i.expires) {
                var a = i.expires, s = i.expires = new Date();
                s.setTime(s.getTime() + 864e5 * a);
            }
            var l = function(e) {
                try {
                    return i.raw ? e : encodeURIComponent(e);
                } catch (t) {}
                return e;
            };
            return n.cookie = [ l(e), "=", l(t), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : "" ].join("");
        }
        for (var t = null, u = n.cookie, c = function(e) {
            return i.raw ? e : decodeURIComponent(e);
        }, f = u ? u.split("; ") : [], d = -1, p = f.length, h = e.length + 1; ++d < p; ) {
            u = o(f[d]);
            if (u.substring(0, h) === e + "=") {
                t = c(u.substring(h));
                break;
            }
        }
        return t;
    };
    a.set = function(e, t, i) {
        return a(e, t, i);
    };
    a.get = function(e) {
        return a(e);
    };
    i.exports = a;
});

define("module/login-status/1.0.0/login", [ "require", "exports", "module", "lib/core/1.0.0/io/cookie" ], function(e, t, i) {
    "use strict";
    var n = e("lib/core/1.0.0/io/cookie"), o = "_nick", r = "_ui_", a = $PAGE_DATA && $PAGE_DATA.LOGIN_URL || "", s = $PAGE_DATA && $PAGE_DATA[o] || null;
    t.getNick = function() {
        return s;
    };
    t.isLogin = function() {
        return !!n(r);
    };
    t.login = function(e) {
        if (a) {
            e = e ? "?returnUrl=" + decodeURIComponent(e) : "";
            window.location.href = a + e;
        }
    };
});

define("module/login-status/1.0.0/login-status", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/dom/build", "./login" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
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
        t.options = o.extend(!0, {}, i, e);
        t.el = o(t.options.selector);
        t._init();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/dom/build"), a = e("./login");
    n.prototype._init = function() {
        var e = this;
        if (a.isLogin()) {
            var t = a.getNick();
            e.el.html(e._getLoginedHtml(t));
            e._initEvent();
        }
    };
    n.prototype._initEvent = function() {
        var e = this, t = !1, i = r.build(e.el[0], !1), n = i.get("userName"), o = i.get("tipsMenu");
        n.on("mouseenter", function() {
            t = !0;
            o.stop().fadeIn(500, function() {
                o.addClass("active");
            });
        });
        n.on("mouseleave", function() {
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
    n.prototype._getLoginedHtml = function(e) {
        var t = this, i = t.options, n = i.menuList, o = "";
        o += '<ul class="logined clearfix" node-type="logined">';
        o += '    <li class="item">';
        o += "        <span>您好，</span>";
        o += "    </li>";
        o += '    <li class="item tips-menu-box">';
        o += '        <a href="' + i.userCenterUrl + '" class="user-name txt-overflow" node-type="userName">' + e + "</a>";
        o += '        <div class="tips-menu" node-type="tipsMenu">';
        o += '            <div class="arrow"><i></i><b></b></div>';
        o += '            <ul class="tips-menu-list">';
        for (var r = 0, a = n.length; r < a; r++) o += '            <li class="tips-menu-item"><a href="' + n[r].url + '">' + n[r].title + "</a></li>";
        o += "            </ul>";
        o += "        </div>";
        o += "    </li>";
        o += '    <li class="item">';
        o += '        <a href="' + i.loginOutUrl + '" class="btn">退出</a>';
        o += "    </li>";
        o += "</ul>";
        return o;
    };
    i.exports = n;
});

define("module/fix-bar/1.0.0/fix-bar", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e) {
        return;
    }
    var o = e("jquery");
    e("lib/core/1.0.0/utils/util"), e("lib/core/1.0.0/dom/build");
    n.prototype._init = function() {
        var e = this;
        e.el = o(e._getTemplete());
        o(document.body).append(e.el);
        e.height = e.el.height();
        e.resize();
    };
    n.prototype._initEvent = function() {
        var e = this;
        o(window).on("resize", function() {
            e.resize();
        });
    };
    n.prototype.resize = function() {
        var e = this, t = o(window).height(), i = (t - e.height) / 2;
        if (i >= 0) {
            e.el.css({
                top: i
            });
            e.el.addClass("active");
        } else e.el.removeClass("active");
    };
    n.prototype._getTemplete = function() {
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
    i.exports = n;
});

!function(e, t, i) {
    "function" == typeof define && define.amd ? define("lib/plugins/lazyload/1.9.3/lazyload", [ "jquery" ], i) : e[t] = i(e.jQuery || e.Zepto);
}(this, "Lazyload", function(e, t) {
    "use strict";
    if (!e) throw "Error: jquery api not implements.";
    var i = e.each, n = function(e, t) {
        if (e instanceof Array && e.filter) return e.filter(t);
        for (var i = [], n = -1, o = e.length; ++n < o; ) t(e[n], n) && i.push(e[n]);
        return i;
    }, o = function(e, t, i, n) {
        var o;
        return function() {
            var r = n || this, a = arguments, s = function() {
                o = null;
                i || e.apply(r, a);
            }, l = i && !o;
            clearTimeout(o);
            o = setTimeout(s, t);
            l && e.apply(r, a);
        };
    }, r = function(t, i) {
        t = t || {};
        var n = e(t), o = Array.prototype.slice;
        i = i || t.name;
        e.each({
            on: "on",
            un: "off",
            once: "one",
            emit: "trigger"
        }, function(e, r) {
            t[e] = function(t) {
                var a = o.call(arguments, 0), s = a[1];
                i && !~t.indexOf(".") && (a[0] = t + "." + i);
                "function" == typeof s && ("on" === e || "once" === e ? a[1] = s.__ || (s.__ = function(e) {
                    e.preventDefault();
                    return s.apply(this, o.call(arguments, 1));
                }) : "un" === e && (a[1] = s.__));
                return n[r].apply(n, a);
            };
        });
        return t;
    }, a = window, s = e(a), l = a.Image, u = /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion), c = "__lazy_status__", f = 0, d = 1, p = 2, h = function(e) {
        return e[c] === t;
    }, m = function() {
        var e = {}, t = function(t, i) {
            "function" == typeof i && (e[t] = i);
        }, i = function(t) {
            return e[t];
        };
        return {
            define: t,
            get: i
        };
    }();
    m.define("image", function(i, n, o, r) {
        if (n) {
            var a = new l(), s = function() {
                a.onload = a.onerror = null;
                a = n = i = r = s = t;
            };
            a.onload = function() {
                var t = e(i), a = o.effect;
                "function" != typeof t[a] && (a = "show");
                t.hide();
                "IMG" === i.nodeName.toUpperCase() ? t.attr("src", n) : t.css("background-image", 'url("' + n + '")');
                t[a](o.effectSpeed);
                r(null, "load");
                s();
            };
            a.onerror = function(e) {
                r(e);
                s();
            };
            a.src = n;
        } else r("error");
    });
    m.define("html", function(e, t, i, n) {
        n();
    });
    var v = function(t, l) {
        l = l || {};
        t = e(t);
        var v = this, x = {
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
        r(v);
        var w = l.type || x.type, T = m.get(w);
        if ("function" != typeof T) throw "Error, cannot found the specific type loader (type: `" + w + "`)";
        "html" === w && (x.placeholder = "");
        l && e.extend(x, l);
        var A = x.container, C = x.event, j = 0 === C.indexOf("scroll"), k = A && A !== a ? e(A) : s, E = function(t) {
            var n = v._list;
            if (n.length > 0) {
                var o = 0;
                i(n.slice(0), function(t, i) {
                    var n = e(i);
                    if (!x.skipInvisible || n.is(":visible")) if (_(i, x) || b(i, x)) ; else if (y(i, x) || g(i, x)) {
                        if (++o > x.failureLimit) return !1;
                    } else {
                        n.trigger("appear");
                        o = 0;
                    }
                });
            } else v.reset();
        }, L = function() {
            v._list = n(v._list, function(e) {
                return !e[c];
            });
        }, I = function() {
            var t = this, i = e(t), n = i.attr("data-" + x.dataAttribute), o = x.sourceMaker, r = x.appear, a = x.loadingClass, s = t[c];
            if (s === f) {
                t[c] = d;
                a && i.addClass(a);
                o && (n = o(n, t));
                r && r.apply(v, [ t, n ]);
                T.call(v, t, n, x, function(e, o) {
                    if (!v._destroyed) {
                        a && i.removeClass(a);
                        if (e) setTimeout(function() {
                            t[c] = f;
                            v.emit("lazyItemError", t, n, e);
                            t = null;
                        }, 300); else {
                            t[c] = p;
                            L();
                            v.emit("lazyItemReady", t, n, o);
                            var r = x.load;
                            r && r.apply(v, [ t, n, o ]);
                            t = null;
                        }
                        i = null;
                    }
                });
            } else if (s === p) {
                L();
                v.emit("lazyItemReady", t, n);
            }
        }, $ = function() {
            this[c] || e(this).trigger("appear");
        }, q = function(t) {
            var i = e(t);
            t[c] = f;
            var n = x.placeholder;
            if (n) if (i.is("img")) {
                var o = i.attr("src");
                o || i.attr("src", n);
            } else "image" === v._.type || i.children()[0] || i.html(n);
            i.on("appear", I);
            j || i.on(C, $);
            v._list.push(t);
        }, S = function(e) {
            e = n(e || [], h);
            if (e.length) {
                i(e, function(e, t) {
                    q(t);
                });
                v._inited || P(v);
            }
        }, P = function(t) {
            if (!t._inited) {
                var n = o(E, 30);
                t._inited = !0;
                j && k.on(C, n);
                s.on("resize", n);
                if (u) {
                    var r = function(n) {
                        n.originalEvent && n.originalEvent.persisted && i(t._list, function(t, i) {
                            e(i).trigger("appear");
                        });
                    };
                    s.on("pageshow", r);
                    t.once("reset", function() {
                        s.off("pageshow", r);
                    });
                }
                t.once("reset", function() {
                    i(t._list, function(e, t) {
                        z(t);
                    });
                    j && k.off(C, n);
                    s.off("resize", n);
                });
                e(document).ready(E);
            }
        }, z = function(t) {
            var i = e(t);
            i.off("appear", I);
            j || i.off(C, $);
        };
        v.on("lazyItemReady", function(e) {
            z(e);
        });
        v.once("destroy", function() {
            S = null;
            E = null;
            L = null;
            I = null;
            $ = null;
        });
        v._ = x;
        v._list = [];
        v.add = function(t) {
            var i = e(t);
            i.length > 0 && S(i);
        };
        v.update = E;
        S(t);
    };
    v.prototype = {
        constructor: v,
        update: function() {},
        peek: function() {
            var e = this._list, i = e.length;
            return i > 0 ? e[0] : t;
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
    v.define = function(e, t) {
        return m.define(e, t);
    };
    var y = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().top + e(o).height() : (a.innerHeight ? a.innerHeight : s.height()) + s.scrollTop();
        return n <= e(t).offset().top - i.threshold;
    }, g = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().left + e(o).width() : s.width() + s.scrollLeft();
        return n <= e(t).offset().left - i.threshold;
    }, _ = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().top : s.scrollTop();
        return n >= e(t).offset().top + i.threshold + e(t).height();
    }, b = function(t, i) {
        var n, o = i.container;
        n = o && o !== a ? e(o).offset().left : s.scrollLeft();
        return n >= e(t).offset().left + i.threshold + e(t).width();
    }, x = function(e, t) {
        return !(g(e, t) || b(e, t) || y(e, t) || _(e, t));
    };
    v.belowthefold = y;
    v.rightoffold = g;
    v.abovethetop = _;
    v.leftofbegin = b;
    v.inviewport = x;
    return v;
});

define("module/footer/1.0.0/footer", [ "require", "exports", "module", "jquery", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
            selector: "#jFooter"
        };
        t.options = o.extend(!0, {}, i, e);
        t.el = o(t.options.selector);
        if (0 == t.el.length) throw new Error("the params [optins.selector] is required or the [el] is not exist.");
        t._init();
    }
    var o = e("jquery"), r = e("lib/plugins/lazyload/1.9.3/lazyload"), a = e("lib/core/1.0.0/dom/build");
    n.prototype._init = function() {
        var e = this, t = a.build(e.el[0], !1), i = t.get("footerImg");
        new r(i);
    };
    i.exports = n;
});

define("lib/ui/box/1.0.1/drag", [ "require", "jquery" ], function(e) {
    "use strict";
    var t = e("jquery"), i = t(window), n = t(document), o = "createTouch" in document, r = document.documentElement, a = !("minWidth" in r.style), s = !a && "onlosecapture" in r, l = "setCapture" in r, u = t.noop, c = {
        start: o ? "touchstart" : "mousedown",
        over: o ? "touchmove" : "mousemove",
        end: o ? "touchend" : "mouseup"
    }, f = o ? function(e) {
        e.touches || (e = e.originalEvent.touches.item(0));
        return e;
    } : function(e) {
        return e;
    }, d = function() {
        this.start = t.proxy(this.start, this);
        this.over = t.proxy(this.over, this);
        this.end = t.proxy(this.end, this);
        this.onstart = this.onover = this.onend = u;
    };
    d.types = c;
    d.prototype = {
        start: function(e) {
            e = this.startFix(e);
            n.on(c.over, this.over).on(c.end, this.end);
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
            n.off(c.over, this.over).off(c.end, this.end);
            this.onend(e);
            return !1;
        },
        startFix: function(e) {
            e = f(e);
            this.target = t(e.target);
            this.selectstart = function() {
                return !1;
            };
            n.on("selectstart", this.selectstart).on("dblclick", this.end);
            s ? this.target.on("losecapture", this.end) : i.on("blur", this.end);
            l && this.target[0].setCapture();
            return e;
        },
        overFix: function(e) {
            e = f(e);
            return e;
        },
        endFix: function(e) {
            e = f(e);
            n.off("selectstart", this.selectstart).off("dblclick", this.end);
            s ? this.target.off("losecapture", this.end) : i.off("blur", this.end);
            l && this.target[0].releaseCapture();
            return e;
        }
    };
    d.create = function(e, o, r) {
        r = t.extend({
            hook: null,
            onstart: u,
            onover: u,
            onend: u
        }, r);
        var a, s, l, c, f = t(e), p = r.hook ? t(r.hook) : f, h = new d(), m = d.types.start, v = e.className.replace(/^\s|\s.*/g, "") + "-drag-start", y = {
            off: function() {
                p.off(m, h.start);
            }
        };
        h.onstart = function(t) {
            var o = "fixed" === f.css("position"), u = n.scrollLeft(), d = n.scrollTop(), p = f.width(), h = f.height();
            a = 0;
            s = 0;
            l = o ? i.width() - p + a : n.width() - p;
            c = o ? i.height() - h + s : n.height() - h;
            var m = f.offset(), y = this.startLeft = o ? m.left - u : m.left, g = this.startTop = o ? m.top - d : m.top;
            this.clientX = t.clientX;
            this.clientY = t.clientY;
            f.addClass(v);
            r.onstart.call(e, t, y, g);
        };
        h.onover = function(t) {
            var i = t.clientX - this.clientX + this.startLeft, n = t.clientY - this.clientY + this.startTop, o = f[0].style;
            i = Math.max(a, Math.min(l, i));
            n = Math.max(s, Math.min(c, n));
            o.left = i + "px";
            o.top = n + "px";
            r.onover.call(e, t, i, n);
        };
        h.onend = function(t) {
            var i = f.position(), n = i.left, o = i.top;
            f.removeClass(v);
            r.onend.call(e, t, n, o);
        };
        h.off = function() {
            p.off(m, h.start);
        };
        o ? h.start(o) : p.on(m, h.start);
        return y;
    };
    return d;
});

!function(e, t) {
    if ("function" == typeof define && define.amd) define("lib/core/1.0.0/event/emitter", t); else if ("undefined" != typeof module) t(require, module.exports, module); else {
        var i = {
            exports: {}
        };
        t(null, i.exports, i);
        e.EventEmitter = i.exports;
    }
}(this, function(e, t, i) {
    "use strict";
    function n() {}
    function o(e, t, i, n) {
        var o = !0;
        if (t) for (var r, a, s, l = -1, u = {
            type: e,
            timeStamp: c()
        }; r = t[++l]; ) {
            a = r[m];
            s = r[v] || n;
            try {
                o = r[y] === h ? a.call(s, u, i) !== !1 && o : a.apply(s, i) !== !1 && o;
            } catch (f) {
                setTimeout(function() {
                    console.error(f);
                }, 1);
            }
        }
        return o;
    }
    function r(e) {
        var t, i = d(this);
        if (i) {
            t = i[e];
            return t.length;
        }
        return 0;
    }
    function a(e) {
        return "[object Function]" === Object.prototype.toString.call(e);
    }
    function s(e, t) {
        for (var i in e) e.hasOwnProperty(i) && t(e[i], i);
    }
    function l(e, t) {
        e.forEach ? e.forEach(t) : function(e) {
            for (var i = -1, n = e.length; ++i < n; ) t(e[i], i);
        }(e);
    }
    var u = /\s+/, c = Date.now || function() {
        return +new Date();
    }, f = function() {
        return c() * Math.random() & 65535;
    }(), d = function() {
        var e, t, i;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, i) {
            var n = e.get(t);
            return null === i ? void 0 !== n && e["delete"](t) : !n && i ? (e.set(t, n = {}), 
            n) : n;
        }) : (t = c(), i = "__$widΦ" + t.toString(36), e = {}, function(n, o) {
            if (!n || "object" != typeof n) throw TypeError("Invalid value used as weak map key");
            var r;
            return null === o ? n[i] && (delete e[n[i]], delete n[i]) : (r = n[i] || o && (r = ++t, 
            e[r] = {}, n[i] = r), r && e[r]);
        });
    }(), p = 1, h = 2, m = 0, v = 1, y = 2, g = function(e, t, i) {
        var n = [];
        n[m] = e;
        n[v] = t;
        n[y] = i;
        return n;
    }, _ = n.prototype;
    _.addListener = function(e, t, i, n) {
        var o, r, a, s = p;
        if (t && "object" == typeof t) {
            i = t;
            t = i.handleEvent;
            s = h;
        }
        if (!t) return this;
        o = d(this, 1);
        e = e.split(u);
        for (;r = e.shift(); ) {
            a = !n && o[r] || (o[r] = []);
            a.push(g(t, i, s));
        }
        return this;
    };
    _.on = _.addListener;
    _.once = function(e, t, i) {
        var n = !1, o = function() {
            this.removeListener(e, o);
            if (!n) {
                n = !0;
                t.apply(i || this, arguments);
            }
        };
        o.guid = t.guid || (t.guid = f++);
        return this.on(e, o);
    };
    _.removeListener = function(e, t, i) {
        var n, o, r, a, l, c;
        if (t && "object" == typeof t) {
            i = t;
            t = i.handleEvent;
        }
        if (!(n = d(this))) return this;
        if (!(e || t || i)) {
            s(n, function(e, t) {
                delete n[t];
            });
            d(this, null);
            return this;
        }
        e = e ? e.split(u) : b(n);
        for (;o = e.shift(); ) {
            r = n[o];
            if (r) if (t || i) for (a = r.length; --a >= 0; ) {
                l = r[a];
                c = l[m];
                t && c !== t && (void 0 === c.guid || c.guid !== t.guid) || i && l[v] !== i || r.splice(a, 1);
            } else delete n[o];
        }
        return this;
    };
    _.un = _.removeListener;
    _.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    _.emit = function(e) {
        var t, i, n, r, a, s, l = [], c = !0;
        if (!(t = d(this))) return this;
        e = e.split(u);
        for (a = 1, s = arguments.length; a < s; a++) l[a - 1] = arguments[a];
        for (;i = e.shift(); ) {
            (n = t.all) && (n = n.slice());
            (r = t[i]) && (r = r.slice());
            "all" !== i && (c = o(i, r, l, this) && c);
            c = o(i, n, [ i ].concat(l), this) && c;
        }
        return c;
    };
    n.applyTo = function(e) {
        function t(t, n) {
            e[t] = function() {
                var o = i[t].apply(n || e, Array.prototype.slice.call(arguments));
                return o === n ? this : o;
            };
        }
        var i = _, n = b(i);
        a(e) ? l(n, function(t) {
            e.prototype[t] = i[t];
        }) : l(n, function(e) {
            t(e);
        });
    };
    n.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : r.call(e, t);
    };
    _.listenerCount = r;
    var b = Object.keys || function(e) {
        var t = [];
        s(e, function(e, i) {
            t.push(i);
        });
        return t;
    };
    i.exports = n;
});

define("lib/core/1.0.0/dom/delegator", [ "require", "exports", "module", "jquery", "../event/emitter" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i, n, r, a = t.currentTarget, s = o(a), l = (t.handleObj || 0).origType || t.type;
        if (!t.isPropagationStopped()) {
            if (!s.attr("disabled") && (i = s.attr("action-type"))) {
                n = s.attr("action-data");
                t.action = i;
                t.data = n;
                r = e.e.emit(l + u + i, t, a);
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
    var o = e("jquery"), r = e("../event/emitter"), a = /\S+/g, s = -1, l = (+new Date()).toString(36), u = "/", c = function() {
        return l + ++s;
    }, f = function(e, t) {
        var i = e.guid || (e.guid = c()), n = function(i, n) {
            return e.call(t || n, i);
        };
        n.guid = i;
        return n;
    }, d = function() {}, p = function(e, t) {
        return "function" == typeof e ? e : t;
    }, h = function(e, t) {
        t = t || {};
        "string" == typeof e && (e = o(e)[0]);
        var i = {}, s = {}, l = new r(), c = t.context, h = {
            o: i,
            opts: t,
            e: l
        }, m = function(e) {
            return n(h, e);
        };
        t.onDelegate = p(t.onDelegate, d);
        i.on = function(t, i, n) {
            if ("function" == typeof i) {
                n = i;
                i = t;
                t = "click";
            }
            if ("function" != typeof n) throw Error("The delegate handler should be a valid function");
            i = (i || "").match(a) || [];
            for (var r = i.length; r--; ) {
                if (!s[t]) {
                    s[t] = 1;
                    o(e).on(t, "[action-type]", m);
                }
                l.on(t + u + i[r], f(n, c));
            }
            return this;
        };
        i.un = function(t, i, n) {
            if ("function" == typeof i || !i) {
                n = i;
                i = t;
                t = "click";
            }
            i = (i || "").match(a) || [];
            var r, s = i.length;
            for (o(e); s--; ) {
                r = t + u + i[s];
                l.un(r, n);
            }
            return this;
        };
        i.fire = function(t, i) {
            if (!i) {
                i = t;
                t = "click";
            }
            var n = o('[action-type="' + i + '"]', e)[0] || document, r = new o.Event(t);
            r.currentTarget = r.target = n;
            l.emit(t + u + i, r, n);
        };
        i.destroy = function() {
            var n = o(e);
            o.each(s, function(e, t) {
                delete s[e];
                n.off(e, "[action-type]", m);
            });
            l.un();
            for (var r in i) delete i[r];
            l = void 0;
            t = void 0;
            s = n = e = void 0;
            m = null;
        };
        return i;
    };
    i.exports = h;
});

define("lib/core/1.0.0/utils/css", [ "require", "exports", "module", "jquery", "./util" ], function(e, t, i) {
    "use strict";
    function n(e) {
        return u("<" + e + "/>")[0];
    }
    function o(e, t, i) {
        e.insertRule ? e.insertRule(t + " {" + i + "}", 0) : e.addRule(t, i, 1);
    }
    function r() {
        var e, t, i, n, o, a = "";
        e = document.body || document.documentElement;
        i = e.style;
        n = "Transition";
        o = [ "Moz", "Webkit", "Khtml", "O", "ms" ];
        t = 0;
        for (;t < o.length; ) {
            if (void 0 !== i[o[t] + n]) {
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
    function l(e, t, i, n, o) {
        var r, a, l = u(e), c = arguments, o = "boolean" == typeof c[c.length - 1] && c[c.length - 1], h = !1, m = function() {
            v();
        }, v = function(e) {
            h || y(!0);
        }, y = function(e) {
            if (!h) {
                h = !0;
                v = f;
                l.off(g, m);
                if (r) {
                    clearTimeout(r);
                    r = null;
                }
                l.removeClass(a);
                e && n();
                l = null;
            }
        };
        if ("function" == typeof i) {
            n = i;
            i = void 0;
        }
        n = n || f;
        if (p) {
            i = i || "normal";
            t = t || "shake";
            a = [ "ui-animated", "ui-speed-" + i, "ui-ani-" + t ].join(" ");
            l.on(g, m);
            r = setTimeout(m, s(i) + 100);
            o === !0 ? d(function() {
                l.addClass(a);
            }) : l.addClass(a);
        } else d(function() {
            n && n();
        });
        return {
            stop: function() {
                y.apply(null, arguments);
                return this;
            }
        };
    }
    var u = e("jquery"), c = e("./util"), f = (c.each, c.noop), d = c.setImmediate, p = a(), h = /\-v\-/g, m = document.getElementsByTagName("head")[0].appendChild(n("style")), v = m.sheet || m.styleSheet, y = {
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
    c.each(y, function(e, t) {
        e && o(v, t, e.replace(h, p));
    });
    t.effect = l;
    t.getVendorPrefix = r;
});

define("lib/ui/box/1.0.1/popup", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/utils/css", "../../../core/1.0.0/event/emitter" ], function(e, t, i) {
    "use strict";
    function n(e) {
        var t = this, i = {
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
        t._ = e = b(i, e);
        e.fixed = !!e.fixed && j();
        var r = o('<div class="' + m + '" id="' + (e.id || _()) + '" />').css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(e.html), a = o("<div />");
        t._popup = r;
        t._mask = t._shadow = a;
        t.node = r[0];
        t.mask = a[0];
        t.on("render", function(e) {
            var i, o = e.className, a = t._mask, s = e.zIndex;
            r.html() || r.html(e.html);
            o && r.addClass(o);
            r.css("position", e.fixed ? "fixed" : "absolute");
            s && r.css("zIndex", s);
            if (e.modal) {
                r.addClass(m + "-modal");
                i = {
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    userSelect: "none",
                    zIndex: s || n.zIndex,
                    backgroundColor: "#000",
                    opacity: .3
                };
                j() || b(i, {
                    position: "absolute",
                    width: c.width() + "px",
                    height: f.height() + "px"
                });
                a.attr("tabIndex", 0).on("focus", w(t.focus, t));
                t._shadow = a.clone(!0);
                a.css(i).addClass(m + "-mask");
            }
        });
        t.on("beforeShow", function(e) {
            var i = t.anchor, n = t._dirClass;
            if (!i && n) {
                r.removeClass(n);
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
                c.on("resize", s);
            });
            t.on("destroy", function() {
                c.off("resize", s);
            });
        }
        t.destroyed = !1;
        t.initialized = !0;
    }
    var o = e("jquery"), r = e("../../../core/1.0.0/utils/util"), a = e("../../../core/1.0.0/utils/css"), s = e("../../../core/1.0.0/event/emitter"), l = window, u = l.document, c = o(l), f = o(u), d = u.documentElement, p = /\S+/g, h = !("minWidth" in d.style), m = "ui-layer", v = l.Math, y = v.max, g = v.ceil, _ = r.guid, b = r.extend, x = r.each, w = function(e, t) {
        return e.bind ? e.bind(t) : function() {
            return e.apply(t, arguments);
        };
    }, T = r.setImmediate, A = function(e) {
        return l.parseInt(e, 10) || 0;
    }, C = function(e) {
        return e && 1 === e.nodeType;
    }, j = function() {
        return j._ || (j._ = function() {
            var e = u.createElement("div"), t = e.cloneNode(!1), i = !1, n = u.body || function() {
                i = !0;
                return d.appendChild(u.createElement("body"));
            }();
            e.style.cssText = "position:fixed;top:42px";
            n.appendChild(e);
            n.appendChild(t);
            var o = e.offsetTop !== t.offsetTop;
            n.removeChild(e);
            n.removeChild(t);
            i && d.removeChild(n);
            e = t = null;
            return o;
        }());
    }, k = function() {
        return {
            x: f.scrollLeft(),
            y: f.scrollTop()
        };
    }, E = function(e) {
        return {
            w: e.width(),
            h: e.height()
        };
    }, L = function() {
        return E(c);
    }, I = function(e) {
        var t = C(e), i = t ? o(e).offset() : {
            left: e.pageX,
            top: e.pageY
        };
        e = t ? e : e.target;
        var n = e.ownerDocument;
        if (n === l.document) return i;
        var r = n.defaultView || n.parentWindow, a = r.frameElement, s = k(), u = o(a).offset();
        return {
            left: i.left + u.left - s.x,
            top: i.top + u.top - s.y
        };
    }, $ = function(e, t) {
        if (e.length) {
            var i = A(e.css(t)) || e[0]["offset" + t.charAt(0).toUpperCase() + t.slice(1)], n = {
                width: [ "left", "right" ],
                height: [ "top", "bottom" ]
            };
            x(n[t], function(t, n) {
                i += A(e.css("margin-" + t), 10) || 0;
            });
            return i;
        }
        return 0;
    }, q = function(e) {
        return $(e, "width");
    }, S = function(e) {
        return $(e, "height");
    }, P = function() {
        try {
            var e = u.activeElement, t = e.contentDocument;
            return t && t.activeElement || e;
        } catch (i) {}
    }, z = function(e) {
        e = e || "";
        var t = {
            auto: !0
        }, i = e.slice(-1);
        if ("!" === i) {
            t.auto = !1;
            e = e.slice(0, -1);
        }
        for (var n, e = e.length <= 2 ? e.split("") : e.replace(/^\s+|\s+$/g, "").split(" ").slice(0, 2), o = {}, r = {
            t: "t",
            b: "t",
            l: "l",
            r: "l"
        }, a = -1, s = e.length; ++a < s; ) {
            n = e[a].charAt(0);
            if (!n || o[r[n]]) e.splice(a, 1); else {
                e[a] = n;
                o[r[n]] = 1;
            }
        }
        2 === e.length && e[0] === e[1] && e.pop();
        t.align = e;
        return t;
    };
    r.inherits(n, s, {
        open: !1,
        destroyed: !0,
        node: null,
        mask: null,
        emit: function(e) {
            for (var t = (e || "").match(p) || [], i = t.length; i--; ) {
                var o = this["on" + t[i]], r = Array.prototype.slice.call(arguments, 1);
                "function" == typeof o && o.apply(this, r);
            }
            n.__super__.emit.apply(this, arguments);
        },
        $: function(e, t) {
            var i = this._nodes || (this._nodes = {}), n = i[e];
            if (!n || t && 0 === n.length) {
                n = this._popup.find('[node-type="' + e + '"]');
                t && n.length > 0 && (i[e] = n);
            }
            return !t || n.length ? n : null;
        },
        show: function(e, t) {
            var i, n = this, o = n._, r = e, s = null, l = n._anim;
            l && l.stop(!0);
            if (n.destroyed || o.showing || n.open) return n;
            t = b({}, n._, t);
            if (void 0 !== r) {
                i = typeof r;
                "boolean" === i ? t.modal = r : r && "object" === i && (C(r) || C(r.target) ? s = r : b(t, r));
            }
            var u = n._popup, c = t.showWithAni, f = function() {
                delete o.showing;
                n.emit("shown");
            };
            if (!n._ready) {
                n.emit("render", t);
                n._ready = !0;
            }
            n.open = !0;
            n.anchor = s;
            n._activeElement = P();
            n.emit("beforeShow", t);
            u.appendTo(t.appendTo).css("display", "block");
            n.emit("show", t);
            o.showing = !0;
            if (c && "none" !== c) {
                var d = c.split(":");
                n._anim = a.effect(n.node, d[0], d[1], f);
            } else f();
            return n;
        },
        hide: function(e) {
            var t, i = this, n = i._, o = i.node, r = n.hideWithAni, s = i._anim;
            s && s.stop(!0);
            if (i.destroyed || n.hidding || !i.open) return i;
            i.emit("beforeHide");
            n.hidding = !0;
            t = function() {
                if (n.hidding === !0) {
                    o.parentNode.removeChild(o);
                    i._popup.hide();
                    delete n.hidding;
                    i.open = !1;
                    i.emit("hidden");
                    (e || n.autoRelease) && i.destroy();
                }
            };
            if (r && "none" !== r) {
                var l = r.split(":");
                i._anim = a.effect(o, l[0], l[1], t);
                i.emit("hide");
            } else {
                i.emit("hide");
                T(t);
            }
            return i;
        },
        destroy: function() {
            var e = this;
            if (e.destroyed) return e;
            e.emit("beforeremove");
            n.current === e && (n.current = null);
            e._popup.off().remove();
            e._mask.off().remove();
            e._shadow.off().remove();
            e.emit("destroy");
            e.removeAllListeners();
            x(e, function(t, i) {
                delete e[i];
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
            var t = this._, i = this.node, r = this._popup, a = n.current, s = t.zIndex;
            a && a !== this && a.blur(!1);
            if (!o.contains(i, P())) {
                var l = r.find("[autofocus]")[0];
                !t.focusing && l ? t.focusing = !0 : l = i;
                this._focus(l);
            }
            if (void 0 === s) {
                s = t.zIndex = n.zIndex++;
                r.css("zIndex", s);
                r.addClass(m + "-focus");
            }
            n.current = this;
            this.emit("focus");
            return this;
        },
        blur: function() {
            var e = this._, t = arguments[0], i = this._activeElement;
            if (!i) return this;
            t !== !1 && this._focus(i);
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
            var e = this._popup, t = this._.fixed, i = k(), n = L(), o = E(e), r = t ? 0 : i.x, a = t ? 0 : i.y, s = (n.w - o.w) / 2 + r, l = .382 * (n.h - o.h) + a;
            e.css({
                left: y(A(s), r),
                top: y(A(l), a)
            });
            return this;
        },
        alignTo: function(e, t) {
            var i = this, n = i._, r = i._popup, a = e.parentNode && o(e);
            if (!a) return i;
            var s = a.offset();
            if (s.left * s.top < 0) return i.center();
            t = t || n.align;
            var l = z(t), u = l.align, c = !l.auto;
            u && u.length || (u = [ "b" ]);
            var f = i._dirClass;
            f && r.removeClass(f);
            var d = n.fixed, p = L(), h = k(), v = q(r), y = S(r), _ = I(e), b = q(a), w = S(a), T = _.left, C = _.top, j = d ? T - h.x : T, E = d ? C - h.y : C, $ = d ? 0 : h.x, P = d ? 0 : h.y, O = $ + p.w - v, D = P + p.h - y, F = {
                t: "b",
                b: "t",
                l: "r",
                r: "l"
            }, H = {
                t: "top",
                b: "top",
                l: "left",
                r: "left"
            }, N = {}, V = [ {
                t: E - y,
                b: E + w,
                l: j - v,
                r: j + b
            }, {
                t: E,
                b: E - y + w,
                l: j,
                r: j - v + b
            } ], M = {
                l: j + g((b - v) / 2),
                t: E + g((w - y) / 2)
            }, G = {
                left: [ $, O ],
                top: [ P, D ]
            };
            c || x(u, function(e, t) {
                V[t][e] > G[H[e]][1] && (e = u[t] = F[e]);
                V[t][e] < G[H[e]][0] && (u[t] = F[e]);
            });
            var W = u[0];
            if (!u[1]) {
                u[1] = "left" === H[W] ? "t" : "l";
                V[1][u[1]] = M[u[1]];
            }
            V[0][W] = V[0][W] + 10 * ("tl".indexOf(W) !== -1 ? -1 : 1);
            N[H[u[0]]] = A(V[0][u[0]]);
            N[H[u[1]]] = A(V[1][u[1]]);
            var U = m + "-" + W;
            r.css(N).addClass(U);
            i._dirClass = U;
            var B = i.$("arrow", 1), K = i.$("inner", 1);
            if (!B) {
                if (!K) return i;
                B = o('<div node-type="arrow" class="ui-arrow"><i></i><b></b></div>').appendTo(K);
            }
            var R, X, Q = "top" !== H[W], Y = [ "v", "h" ][1 ^ Q], J = q(B), Z = S(B), ee = {}, te = Q ? "left" : "top";
            switch (Y) {
              case "h":
                R = g(T + (b - J) / 2);
                ee.left = R;
                break;

              case "v":
                X = g(C + (w - Z) / 2);
                ee.top = X;
            }
            B.offset(ee).css(te, "");
            return i;
        }
    });
    n.zIndex = 1024;
    n.current = null;
    i.exports = n;
});

define("lib/ui/box/1.0.1/dialog", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "../../../core/1.0.0/dom/delegator", "./popup" ], function(e, t, i) {
    "use strict";
    var n = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("../../../core/1.0.0/dom/delegator"), a = e("./popup"), s = o.extend, l = o.guid, u = o.each, c = window.document, f = {
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
    }, d = {}, p = function(e) {
        var t = e || (e = {}), i = e.id || e.id || l(), o = p.get(i) || this;
        "string" != typeof e && 1 !== e.nodeType || (e = {
            content: e
        });
        e = s({}, f, e);
        e.original = t;
        var r, a = e.button || (e.button = []);
        if (!n.isArray(r = a)) {
            r = [];
            a && "object" == typeof a && u(a, function(e, t) {
                e.id = t;
                r.push(e);
            });
            a = e.button = r;
        }
        if (a.length > 0) {
            var c = !1;
            u(a, function(t, i) {
                var n = t.id || l();
                t.autofocus && (c = !0);
                e[n] && s(t, e[n]);
                t.index = i;
            });
            c || (a[a.length - 1].autofocus = !0);
        }
        o.emit("init", e);
        o.initialized ? o.options(e).focus() : o.init(e);
        d[i] = o;
        return o;
    };
    o.inherits(p, a, {
        init: function(e) {
            var t = this;
            a.call(t, e);
            var i = function(e) {
                var i = e.actionValue === !1 || e.isDefaultPrevented();
                i || t.hide();
            };
            t._delegator = new r(t.node, {
                context: t,
                onDelegate: i
            });
            t.delegate("close", function(e) {
                t.hide();
            }).once("render", function() {
                t.initComponents();
            }).on("destroy", function() {
                delete d[e.id];
                t._delegator.destroy();
            });
        },
        options: function(e) {
            var t = this, e = s(t._, e);
            t._freeze(!0);
            u([ "title", "content", "width", "height", "action", "button" ], function(i, n) {
                n = e[i];
                null != n && "function" == typeof t[i] && t[i](n);
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
            t.clickBlankToHide && n(e.mask).on("onmousedown" in c ? "mousedown" : "click", function() {
                e.hide();
                return !1;
            });
            var i = function(t) {
                var i = t.target, n = i.nodeName, o = /^input|textarea$/i, r = a.current === e, s = t.keyCode;
                !r || o.test(n) && "button" !== i.type || 27 === s && e.hide();
            };
            n(c).on("keydown", i);
            e.on("destroy", function() {
                n(c).off("keydown", i);
            });
        },
        delegate: function(e, t, i) {
            var n = this._delegator;
            n.on.apply(n, arguments);
            return this;
        },
        undelegate: function(e, t, i) {
            var n = this._delegator;
            n.un.apply(n, arguments);
            return this;
        },
        content: function(e) {
            var t = this.$("content");
            if (e && e.nodeType) {
                n.contains(c, e) && this.on("beforeremove", function() {
                    n("body").append(e.hide());
                });
                e = n(e);
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
            var t = this, i = t._, n = "", o = 0, r = i.buttonClass;
            if ("string" == typeof e) {
                n = e;
                o++;
            } else u(e, function(e, a) {
                var s = e.id, l = e.fn || e.callback, u = e.display !== !1, c = e.className || r, f = [ c ];
                e.autofocus && f.push(i.buttonClassLight);
                "function" == typeof l && t.delegate(s, l);
                u && o++;
                n += '<button type="button" action-type="' + s + '"' + (u ? "" : ' style="display:none"') + (' class="' + f.join(" ") + '"') + (e.disabled ? " disabled" : "") + ">" + (e.text || e.value) + "</button>";
            });
            t.$("button").html(n);
            t.$("footer")[o ? "show" : "hide"]();
            t.resize();
            return t;
        },
        action: function(e) {
            var t = this;
            u(e, function(e, i) {
                t.delegate(i, e);
            });
            return t;
        }
    });
    p.getCurrent = function() {
        return a.current;
    };
    p.get = function(e) {
        return void 0 === e ? d : d[e];
    };
    p.config = function(e) {
        e && s(f, e);
    };
    i.exports = p;
});

define("lib/ui/box/1.0.1/messagebox", [ "require", "exports", "module", "jquery", "../../../core/1.0.0/utils/util", "./drag", "./dialog" ], function(e, t, i) {
    "use strict";
    var n = e("jquery"), o = e("../../../core/1.0.0/utils/util"), r = e("./drag"), a = e("./dialog"), s = o.each, l = o.extend, u = window.clearTimeout, c = "//s1.zhongzhihui.com/lib/assets/images/loading/loading32x32.gif";
    !function() {
        var e = n('<i class="ui-box-iconf" style="position:absolute;left:-999em;top:-999em;">x<img src="' + c + '"</i>').appendTo("body");
        setTimeout(function() {
            e.remove();
            e = null;
        }, 50);
    }();
    var f = {
        info: "&#x69;",
        warn: "&#x21;",
        confirm: "&#x3f;",
        ok: "&#x2714;",
        error: "&#x2718;",
        loading: '<img src="' + c + '" />'
    }, d = function(e) {
        var t = f[e];
        return t ? '<i node-type="icon" class="x-icon ui-box-iconf">' + t + "</i>" : "";
    }, p = o.guid("__x") + "$", h = function(e) {
        return p + e;
    }, m = function(e, t) {
        var i, n = t.xtype, o = n && d(n) || t.iconHTML;
        if (o) {
            i = e ? '<div node-type="text" class="x-text">' + e + "</div>" : "";
            e = [ '<div class="ui-box-x-wrap">', o, i, "</div>" ].join("");
        }
        return e;
    }, v = function(e) {
        var t = e.contentWindow;
        if (t) try {
            return t.document;
        } catch (i) {
            return 0;
        }
    }, y = function(e) {
        var t;
        e.once("init", function(i) {
            var n = {};
            s([ "title", "width", "height", "button" ], function(e) {
                n[e] = i[e];
                delete i[e];
            });
            e.once("load", function() {
                var i = e._;
                s(n, function(n, o) {
                    if (n) if ("title" === o) {
                        if ("auto" === n) try {
                            n = t.contentWindow.document.title || "";
                        } catch (r) {
                            n = "";
                        }
                        n && e.title(n);
                    } else "function" == typeof e[o] ? e[o](n) : i[o] = n;
                });
            });
        }).once("render", function() {
            var i = e._;
            setTimeout(function() {
                t = g(e, i.url);
                e.iframeNode = t;
            }, 30);
            var o = i.original;
            if (!(o instanceof Object)) for (var r = function() {
                e.hide().destroy();
            }, a = 0; a < frames.length; a++) try {
                if (o instanceof frames[a].Object) {
                    n(frames[a]).one("unload", r);
                    break;
                }
            } catch (s) {}
        }).once("beforeremove", function() {
            n(t).attr("src", "about:blank").remove();
        }, !1);
    }, g = function(e, t) {
        var i = e._, o = e.$("content"), r = o.find("iframe"), a = r && r[0], s = function(t) {
            e._freeze(!0);
            if (t) {
                i.width || e.width(t.width);
                i.height || e.height(t.height);
            }
            e.emit("load");
            e._freeze(!1).resize();
            s = null;
            r.removeAttr("style");
            r = a = null;
        }, l = function(t) {
            i.showing ? e.once("shown", t) : t();
        };
        if (!r.length) {
            var u = /(msie) ([\w.]+)/.test(navigator.userAgent.toLowerCase()), c = '<iframe id="{id}-iframe" name="{id}-iframe" class="iframe" frameborder="0" hspace="0"' + (u ? ' allowtransparency="true"' : "") + ' scrolling="' + i.scrolling + '" style="position:absolute;left:-9999em;top:-9999em;" src="' + t + '"></iframe>';
            r = n(c.replace(/{id}/g, i.id)).appendTo(o);
            a = r[0];
            i.autoSize ? r.one("load", function() {
                var e, t, i, o = v(a), u = o && n(o);
                if (u) {
                    e = u.width();
                    r.width(e);
                    t = u.height();
                    i = {
                        width: e,
                        height: t
                    };
                }
                l(function() {
                    s(i);
                });
            }) : l(function() {
                s();
            });
        }
        return a;
    }, _ = function(e) {
        var t = this;
        e = l({}, e);
        var i = e.button || (e.button = []);
        s([ "cancel", "ok" ], function(t, n) {
            var o = e[t];
            if (o && "object" == typeof o) {
                o.id = t;
                i.push(o);
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
                var c = e.close !== !1;
                e = l({
                    modal: !0,
                    close: !1,
                    autoRelease: !0,
                    autoSize: !0,
                    scrolling: "auto"
                }, e);
                var f = n(m("Loading...", {
                    xtype: "loading"
                })).addClass("ui-box-x-loading");
                e.content = f;
                e.className = (e.className || "") + " ui-box-iframe";
                t.once("load", function() {
                    f.remove();
                    f = null;
                    c && t.$("close").show();
                });
                t.on("hidden", function() {
                    t.destroy();
                });
                y(t);
            }
        }
        t = a.call(t, e) || t;
        t._ready || t.once("render", function() {
            var i = t.$("title");
            if (i.length && e.drag !== !1) {
                i.css("cursor", "move");
                r.create(t.node, null, {
                    hook: i,
                    onstart: function() {
                        t.anchor || t.focus();
                    }
                });
            }
        });
        return t;
    }, b = "__showDelay", x = "__hideTimer";
    o.inherits(_, a, {
        show: function(e, t) {
            var i = this, n = i._, r = [].slice.call(arguments), t = l({}, n, t), a = t.duration || 0, s = t.delay || 0, c = function() {
                o.each([ b, x ], function(e, t) {
                    t = n[e];
                    delete n[e];
                    t && u(t);
                });
            }, f = function() {
                if (a > 0) {
                    n[x] = setTimeout(function() {
                        c();
                        i.hide();
                    }, a);
                    i.once("hide", c);
                }
                _.__super__.show.apply(i, r);
            };
            c();
            s > 0 ? n[b] = setTimeout(f, s) : f();
            return i;
        },
        hide: function() {
            var e = this, t = e._;
            t && o.each([ b, x ], function(e, i) {
                i = t[e];
                delete t[e];
                i && u(i);
            });
            _.__super__.hide.apply(e, arguments);
            return e;
        }
    });
    _.config = a.config;
    _.get = function(e) {
        if (e) {
            var t, i, n = a.get();
            if (e && (t = e.frameElement)) for (var o in n) if (n.hasOwnProperty(o)) {
                i = n[o];
                if (i.iframeNode === t) return i;
            }
            return n[e];
        }
    };
    i.exports = _;
});

define("lib/ui/box/1.0.1/box", [ "require", "exports", "module", "./messagebox", "../../../core/1.0.0/utils/util" ], function(e, t, i) {
    "use strict";
    var n = e("./messagebox"), o = e("../../../core/1.0.0/utils/util"), r = function() {}, a = o.mix, s = function(e, t) {
        var i = function(e, t) {
            return void 0 !== t && null !== t && "" !== t && !("number" == typeof t && isNaN(t));
        };
        return function(e, t) {
            return a(e, t, !0, !0, i);
        };
    }(), l = function(e) {
        return !!(e && e.nodeType && e.tagName);
    }, u = o.guid, c = function() {
        return u("__0x$");
    }, f = function(e) {
        var t, i = e[1] || {};
        t = e[0];
        t && ("string" == typeof t ? i.html = t : "object" == typeof t && (i = t));
        var n = i.skin;
        if (n) {
            i.className = n;
            delete i.skin;
        }
        return i;
    }, d = function(e, t) {
        var t = f([ e, t ]);
        return new n(t);
    }, p = function(e, t, i) {
        if ("object" == typeof e) {
            i = t;
            t = e;
            e = "";
        } else if (l(t)) {
            i = t;
            t = {};
        } else "number" == typeof t && (t = {
            duration: t
        });
        t = t || {};
        var n = d(s({
            id: c(),
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
        return t.hide ? n : n.show(i);
    }, h = {
        create: d,
        loadUrl: function(e, t) {
            t = t || {};
            t.url = e;
            var i = d(t);
            return i.show();
        },
        loading: function(e, t) {
            t = t || {};
            var i = d(s({
                autofocus: !0,
                autoRelease: !0,
                id: c(),
                modal: !0,
                close: !1,
                xtype: "loading",
                content: e || ""
            }, t));
            return t.hide ? i : i.show();
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
                id: c(),
                modal: !0,
                autoRelease: !0,
                content: "<div>" + e + "</div>",
                ok: {
                    text: "确定",
                    fn: function() {}
                }
            }, t);
            return d(t).show();
        },
        confirm: function(e, t, i, n) {
            var o;
            if (!n && i && "object" == typeof i) {
                l(i) ? n = i : o = i;
                i = t;
            }
            if ("function" != typeof t) {
                o = t;
                t = r;
            }
            "function" != typeof i && (i = t);
            var a = function(e) {
                e ? t(e) : i(e);
            };
            o && (n = n || o.sender);
            var u = d(s({
                xtype: "confirm",
                autofocus: !0,
                id: c(),
                modal: !n,
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
            return u.show(n);
        },
        bubble: p
    };
    h.tips = h.bubble;
    o.each([ "ok", "info", "warn", "error" ], function(e, t) {
        h[e] = function(t, i, n) {
            var o = {
                xtype: e
            };
            if (i && i.nodeType) {
                n = i;
                i = void 0;
            } else "number" == typeof i ? o.duration = i : o = s(o, i);
            return p(t, o, n);
        };
    });
    h.get = n.get;
    h.config = n.config;
    i.exports = h;
});

define("lib/ui/box/1.0.1/crossbox", [ "require", "exports", "module", "./box" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        return e;
    }
    function o(e) {
        d.push(e);
    }
    function r(e) {
        for (var t = -1, i = d.length; ++t < i; ) d[t](e);
    }
    function a(e) {
        f ? e(s || u) : o(e);
    }
    var s, l = window, u = n({}, e("./box")), c = window.top, f = !1, d = [];
    if (l !== c) try {
        c.require([ "lib/ui/box/1.0.1/crossbox" ], function(e) {
            n(i.exports, e);
            f = !0;
            s = e;
            r(e);
        });
    } catch (p) {
        setTimeout(function() {
            console.warn("Initialize crossbox failed, use inner box instead.");
        }, 1);
    } else {
        f = !0;
        s = u;
    }
    t = i.exports = u;
    t.ready = a;
});

define("lib/core/1.0.0/io/request", [ "require", "exports", "module", "jquery", "../utils/util", "../event/emitter" ], function(e, t, i) {
    "use strict";
    var n = e("jquery"), o = e("../utils/util"), r = e("../event/emitter"), a = o.setImmediate, s = o.noop, l = o.extend, u = n.trim, c = n.parseJSON, f = function(e, t, i) {
        return function(n, o) {
            try {
                return e.apply(t, arguments);
            } catch (r) {
                i && i(r, n, o);
            }
        };
    }, d = function(e) {
        return t.emit.apply(t, arguments);
    };
    r.applyTo(t);
    var p = function() {
        var e = 5, t = 0, i = [], o = function() {
            a(function() {
                --t;
                r();
            });
        }, r = function() {
            if (i.length > 0 && t < e) {
                var r = i.shift(), a = r[0], s = r[1];
                ++t;
                a.always(o);
                n.ajax(s);
            }
        };
        return function(e, t) {
            i.push([ e, t ]);
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
            var e = this, t = this._opts, i = l({}, t), n = "jsonp" === i.dataType;
            n && (i.crossDomain = !0);
            i.complete = function(i, o) {
                var r, a = +i.status, s = i.responseJSON, l = {
                    error: "1",
                    msg: "Request error (status: " + (o || a) + ")"
                }, f = 200 === a || "success" === o;
                if (!n && !s) {
                    s = u(i.responseText);
                    if (s && "<" !== s.charAt(0)) try {
                        s = c(s);
                    } catch (d) {}
                }
                f || (s = s || l);
                r = {
                    data: s,
                    xhr: i,
                    origin: t,
                    status: a || o
                };
                f ? e.emit("response", null, r) : e.emit("error", s, r);
                e.emit("end", r);
                e.destroy();
            };
            p(e, i);
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
        t = t && n(t);
        if (t) {
            var i = "disabled";
            t.addClass(i).prop("disabled", !0);
            e.once("end", function() {
                t.removeClass(i).prop("disabled", !1);
                t = null;
            });
        }
    });
    t.ajax = function(e, t, i) {
        if ("object" == typeof e) {
            i = t;
            t = e;
            e = void 0;
        }
        t = t || {};
        e && (t.url = e);
        var o = new h(t), r = function(e, i) {
            var n = e.stack && e.stack.split("\n").slice(0, 2).join("\n") || e, o = {
                stack: n,
                origin: t,
                response: i
            };
            d("error", o, i);
            a(function() {
                console.log("%c " + n, "color:#ae0000");
            }, 1);
        }, l = f(t.error || s, null, r), u = f(t.success || s, null, r);
        if (d("request", o, i) !== !1) {
            if (i && (i = n(i))) {
                var c, p, m = "data-async-lock";
                if (1 === +i.attr(m)) return;
                if (p = i.attr("data-async-text")) {
                    c = i.html();
                    i.html(p);
                }
                i.attr(m, 1);
                o.once("response error", function() {
                    if (i) {
                        i.attr(m, 0);
                        p && i.html(c);
                        i = null;
                    }
                });
            }
            o.on("error", function(e, t) {
                var i = {
                    code: e.error,
                    message: e.msg,
                    status: t.status,
                    origin: t.origin,
                    response: t.data
                };
                d("error", i, t) !== !1 && l(e);
            });
            o.on("response", function(e, t) {
                t = t.data;
                d("response", t) !== !1 && (e ? l(e) : t && 0 === +(t.error || 0) ? u(t) : l(t));
            });
            return o.send();
        }
    };
    n.each([ "get", "post", "jsonp" ], function(e, i) {
        t[i] = function(e, n, o, r, a) {
            if ("function" == typeof n) {
                a = a || r;
                r = o;
                o = n;
                n = void 0;
            }
            if (r && "function" != typeof r) {
                a = r;
                r = void 0;
            }
            var s = {
                data: n,
                success: o,
                error: r || o
            };
            "string" == typeof e ? s.url = e : l(s, e);
            var u = i;
            if ("jsonp" === i) {
                u = "get";
                s.dataType = "jsonp";
            }
            s.type = u;
            return t.ajax(s, a);
        };
    });
});

define("lib/ui/tab/1.0.0/tab", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "lib/core/1.0.0/dom/build" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = this, n = {
            event: "click"
        };
        i.el = o(e);
        i.options = o.extend(!0, {}, n, t);
        var r = s.build(e, !1);
        i.hd = r.get("hd");
        i.bd = r.get("bd");
        i.hdItems = r.get("hdItem");
        i.containers = r.get("container");
        i._initEvent();
        i._init();
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/utils/util"), s = e("lib/core/1.0.0/dom/build");
    a.inherits(n, r);
    n.prototype._initEvent = function() {
        var e = this;
        e.hdItems.on(e.options.event, function(t) {
            t.preventDefault();
            var i = o(this);
            i.hasClass("current") || e.setCurrent(i.attr("data-target"));
        });
    };
    n.prototype._init = function() {};
    n.prototype.setCurrent = function(e) {
        var t = this;
        if (void 0 === e) {
            var i = t.hd.find(".current");
            0 == i.length && (i = this.hdItems.eq(0));
            e = i.attr("data-target");
        }
        t.hdItems.removeClass("current");
        var n = t.hd.find("[data-target=" + e + "]");
        n.addClass("current");
        t.containers.removeClass("current");
        var o = t.bd.find("[data-id=" + e + "]");
        o.addClass("current");
        t.emit("change", {
            hd: n,
            body: o
        });
    };
    i.exports = n;
});

!function() {
    function e(e) {
        return e.replace(_, "").replace(b, ",").replace(x, "").replace(w, "").replace(T, "").split(A);
    }
    function t(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
    }
    function i(i, n) {
        function o(e) {
            return d += e.split(/\n/).length - 1, c && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), 
            e && (e = g[1] + t(e) + g[2] + "\n"), e;
        }
        function r(t) {
            var i = d;
            if (u ? t = u(t, n) : a && (t = t.replace(/\n/g, function() {
                return d++, "$line=" + d + ";";
            })), 0 === t.indexOf("=")) {
                var o = f && !/^=[=#]/.test(t);
                if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""), o) {
                    var r = t.replace(/\s*\([^\)]+\)/, "");
                    p[r] || /^(include|print)$/.test(r) || (t = "$escape(" + t + ")");
                } else t = "$string(" + t + ")";
                t = g[1] + t + g[2];
            }
            return a && (t = "$line=" + i + ";" + t), y(e(t), function(e) {
                if (e && !m[e]) {
                    var t;
                    t = "print" === e ? b : "include" === e ? x : p[e] ? "$utils." + e : h[e] ? "$helpers." + e : "$data." + e, 
                    w += e + "=" + t + ",", m[e] = !0;
                }
            }), t + "\n";
        }
        var a = n.debug, s = n.openTag, l = n.closeTag, u = n.parser, c = n.compress, f = n.escape, d = 1, m = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, v = "".trim, g = v ? [ "$out='';", "$out+=", ";", "$out" ] : [ "$out=[];", "$out.push(", ");", "$out.join('')" ], _ = v ? "$out+=text;return $out;" : "$out.push(text);", b = "function(){var text=''.concat.apply('',arguments);" + _ + "}", x = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + _ + "}", w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0," : ""), T = g[0], A = "return new String(" + g[3] + ");";
        y(i.split(s), function(e) {
            e = e.split(l);
            var t = e[0], i = e[1];
            1 === e.length ? T += o(t) : (T += r(t), i && (T += o(i)));
        });
        var C = w + T + A;
        a && (C = "try{" + C + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(i) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var j = new Function("$data", "$filename", C);
            return j.prototype = p, j;
        } catch (k) {
            throw k.temp = "function anonymous($data,$filename) {" + C + "}", k;
        }
    }
    var n = function(e, t) {
        return "string" == typeof t ? v(t, {
            filename: e
        }) : a(e, t);
    };
    n.version = "3.0.0", n.config = function(e, t) {
        o[e] = t;
    };
    var o = n.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, r = n.cache = {};
    n.render = function(e, t) {
        return v(e, t);
    };
    var a = n.renderFile = function(e, t) {
        var i = n.get(e) || m({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? i(t) : i;
    };
    n.get = function(e) {
        var t;
        if (r[e]) t = r[e]; else if ("object" == typeof document) {
            var i = document.getElementById(e);
            if (i) {
                var n = (i.value || i.innerHTML).replace(/^\s*|\s*$/g, "");
                t = v(n, {
                    filename: e
                });
            }
        }
        return t;
    };
    var s = function(e, t) {
        return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? s(e.call(e)) : ""), 
        e;
    }, l = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, u = function(e) {
        return l[e];
    }, c = function(e) {
        return s(e).replace(/&(?![\w#]+;)|[<>"']/g, u);
    }, f = Array.isArray || function(e) {
        return "[object Array]" === {}.toString.call(e);
    }, d = function(e, t) {
        var i, n;
        if (f(e)) for (i = 0, n = e.length; n > i; i++) t.call(e, e[i], i, e); else for (i in e) t.call(e, e[i], i);
    }, p = n.utils = {
        $helpers: {},
        $include: a,
        $string: s,
        $escape: c,
        $each: d
    };
    n.helper = function(e, t) {
        h[e] = t;
    };
    var h = n.helpers = p.$helpers;
    n.onerror = function(e) {
        var t = "Template Error\n\n";
        for (var i in e) t += "<" + i + ">\n" + e[i] + "\n\n";
        "object" == typeof console && console.error(t);
    };
    var m = function(e) {
        return n.onerror(e), function() {
            return "{Template Error}";
        };
    }, v = n.compile = function(e, t) {
        function n(i) {
            try {
                return new l(i, s) + "";
            } catch (n) {
                return t.debug ? m(n)() : (t.debug = !0, v(e, t)(i));
            }
        }
        t = t || {};
        for (var a in o) void 0 === t[a] && (t[a] = o[a]);
        var s = t.filename;
        try {
            var l = i(e, t);
        } catch (u) {
            return u.filename = s || "anonymous", u.name = "Syntax Error", m(u);
        }
        return n.prototype = l.prototype, n.toString = function() {
            return l.toString();
        }, s && t.cache && (r[s] = n), n;
    }, y = p.$each, g = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", _ = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, b = /[^\w$]+/g, x = new RegExp([ "\\b" + g.replace(/,/g, "\\b|\\b") + "\\b" ].join("|"), "g"), w = /^\d[^,]*|,\d[^,]*/g, T = /^,+|,+$/g, A = /^$|,+/;
    o.openTag = "{{", o.closeTag = "}}";
    var C = function(e, t) {
        var i = t.split(":"), n = i.shift(), o = i.join(":") || "";
        return o && (o = ", " + o), "$helpers." + n + "(" + e + o + ")";
    };
    o.parser = function(e) {
        e = e.replace(/^\s/, "");
        var t = e.split(" "), i = t.shift(), o = t.join(" ");
        switch (i) {
          case "if":
            e = "if(" + o + "){";
            break;

          case "else":
            t = "if" === t.shift() ? " if(" + t.join(" ") + ")" : "", e = "}else" + t + "{";
            break;

          case "/if":
            e = "}";
            break;

          case "each":
            var r = t[0] || "$data", a = t[1] || "as", s = t[2] || "$value", l = t[3] || "$index", u = s + "," + l;
            "as" !== a && (r = "[]"), e = "$each(" + r + ",function(" + u + "){";
            break;

          case "/each":
            e = "});";
            break;

          case "echo":
            e = "print(" + o + ");";
            break;

          case "print":
          case "include":
            e = i + "(" + t.join(",") + ");";
            break;

          default:
            if (/^\s*\|\s*[\w\$]/.test(o)) {
                var c = !0;
                0 === e.indexOf("#") && (e = e.substr(1), c = !1);
                for (var f = 0, d = e.split("|"), p = d.length, h = d[f++]; p > f; f++) h = C(h, d[f]);
                e = (c ? "=" : "=#") + h;
            } else e = n.helpers[i] ? "=#" + i + "(" + t.join(",") + ");" : "=" + e;
        }
        return e;
    }, "function" == typeof define ? define("template", [], function() {
        return n;
    }) : "undefined" != typeof exports ? module.exports = n : this.template = n;
}();

define("plugins/polling-list/1.0.0/polling", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = this, n = {
            ajax: {
                type: "get",
                data: null
            },
            time: 1e3
        };
        i.options = o.extend(!0, {}, n, t);
        i.options.ajax.url = e;
        i._isLoading = !1;
    }
    var o = e("jquery"), r = e("lib/core/1.0.0/io/request"), a = e("lib/core/1.0.0/event/emitter"), s = e("lib/core/1.0.0/utils/util");
    s.inherits(n, a);
    n.prototype.start = function() {
        var e = this, t = e.options, i = e.options.ajax;
        e._isLoading = !1;
        e._interval || (e._interval = setInterval(function() {
            if (!e._isLoading) {
                e._isLoading = !0;
                r[i.type](i.url, i.data, function(t) {
                    e._isLoading = !1;
                    e.emit("success", t);
                }, function(t) {
                    e._isLoading = !1;
                    e.emit("error", t);
                });
            }
        }, t.time));
    };
    n.prototype.stop = function() {
        var e = this;
        e.options, e.options.ajax;
        e._isLoading = !0;
    };
    n.prototype.setData = function(e) {
        var t = this;
        t.options.ajax.data = o.extend({}, t.options.ajax.data, e);
    };
    i.exports = n;
});

define("plugins/polling-list/1.0.0/polling-list", [ "require", "exports", "module", "jquery", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "./polling" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = this;
        i.el = o(e);
        if (0 == i.el.length) throw new Error("the param [el] is required.");
        i.container = o('<div node-type="container"></div>');
        i.el.html(i.container);
        var n = {
            ajax: {
                url: null,
                type: "get",
                data: null
            }
        };
        i.options = o.extend(!0, {}, n, t);
        i._init();
        i._initEvent();
    }
    var o = e("jquery"), r = (e("lib/core/1.0.0/io/request"), e("lib/core/1.0.0/event/emitter")), a = e("lib/core/1.0.0/utils/util"), s = e("./polling");
    a.inherits(n, r);
    n.prototype._init = function() {
        var e = this;
        e.polling = new s(e.options.ajax.url, {
            ajax: e.options.ajax
        });
    };
    n.prototype._initEvent = function() {
        var e = this;
        e.polling.on("error", function(t) {
            e.emit("error", t, e.container);
        });
        e.polling.on("success", function(t) {
            e.emit("success", t, e.container);
        });
        e.el.on("scroll", function(t) {
            e.el.scrollTop() + e.el.height() >= e.container.height() && e.emit("pullup");
        });
    };
    n.prototype.setData = function(e) {
        var t = this;
        t.polling.setData(e);
    };
    n.prototype.destroy = function() {
    };
    n.prototype.html = function(e) {
        var t = this;
        t.container.html(e);
    };
    n.prototype.prepend = function(e) {
        var t = this;
        t.container.prepend(e);
    };
    n.prototype.append = function(e) {
        var t = this;
        t.container.append(e);
    };
    n.prototype.start = function() {
        var e = this;
        e.polling.start();
    };
    n.prototype.stop = function() {
        var e = this;
        e.polling.stop();
    };
    n.prototype.clear = function() {
        var e = this;
        e.container.html("");
    };
    n.prototype.scrollTo = function(e) {
        var t = this;
        t.el.stop().animate({
            scrollTop: e || 0
        });
    };
    i.exports = n;
});

define("module/monitor/1.0.0/question", [ "require", "exports", "module", "jquery", "./../../../plugins/polling-list/1.0.0/polling-list", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "template" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = this;
        i.el = o(e);
        if (0 == i.el.length) throw new Error("the param [el] is required.");
        var n = {
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
        i.options = o.extend(!0, {}, n, t);
        i._isPulling = !1;
        i._init();
        i._initEvent();
        i.max = 0;
        i.isFist = !0;
    }
    var o = e("jquery"), r = e("./../../../plugins/polling-list/1.0.0/polling-list"), a = e("lib/core/1.0.0/io/request"), s = e("lib/core/1.0.0/event/emitter"), l = e("lib/core/1.0.0/utils/util"), u = e("template");
    l.inherits(n, s);
    n.prototype._init = function() {
        var e = this;
        e.pollingList = new r(e.el, {
            ajax: e.options.pollingAjax,
            data: {
                id: e.max
            }
        });
        e._loadingHtml();
    };
    n.prototype._initEvent = function() {
        var e = this, t = (e.options, e.options.pagerAjax);
        e.pollingList.on("error", function(t) {
            e.pollingList.html(u("tEmpty", 1));
        });
        e.pollingList.on("success", function(t) {
            if (t && t.data && t.data.resultList && t.data.resultList.length > 0) {
                e.pollingList.html(e.template(t.data));
                e.pollingList.setData({
                    id: t.data.resultList[0].id
                });
                e.isFist = !1;
            } else e.isFist && e.pollingList.html(u("tEmpty", 1));
            e.scrollTo(0);
        });
        e.el.on("mouseenter", function() {
            e.stop();
        });
        e.el.on("mouseleave", function() {
            e.start();
        });
        e.pollingList.on("pullup", function(i) {
            if (!e._isPulling) {
                e._isPulling = !0;
                a[t.type](t.url, t.data, function(t) {
                    e._isPulling = !1;
                    e.pollingList.append(e.template(t.data));
                }, function(t) {
                    e._isPulling = !1;
                    e.pollingList.html(u("tEmpty", 1));
                });
            }
        });
    };
    n.prototype._loadingHtml = function() {
        var e = this, t = "";
        t += '<div class="ui-loading-list">';
        t += '<div class="img-loading"></div>';
        t += '\t<div class="txt">';
        t += "\t正在卖力加载，请稍后";
        t += "  </div>";
        t += "</div>";
        e.pollingList.html(t);
    };
    n.prototype.start = function() {
        var e = this;
        e.pollingList.start();
    };
    n.prototype.stop = function() {
        var e = this;
        e.pollingList.stop();
    };
    n.prototype.clear = function() {
        var e = this;
        e.pollingList.container.html("");
    };
    n.prototype.destroy = function() {
    };
    n.prototype.scrollTo = function(e) {
        var t = this;
        t.pollingList.scrollTo(e);
    };
    n.prototype.template = function(e) {
        return u("tQuestion", e);
    };
    i.exports = n;
});

define("module/monitor/1.0.0/note", [ "require", "exports", "module", "jquery", "./../../../plugins/polling-list/1.0.0/polling-list", "lib/core/1.0.0/io/request", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util", "template" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = this;
        i.el = o(e);
        if (0 == i.el.length) throw new Error("the param [el] is required.");
        var n = {
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
        i.options = o.extend(!0, {}, n, t);
        i._isPulling = !1;
        i._init();
        i._initEvent();
        i.max = 0;
        i.isFist = !0;
    }
    var o = e("jquery"), r = e("./../../../plugins/polling-list/1.0.0/polling-list"), a = e("lib/core/1.0.0/io/request"), s = e("lib/core/1.0.0/event/emitter"), l = e("lib/core/1.0.0/utils/util"), u = e("template");
    l.inherits(n, s);
    n.prototype._init = function() {
        var e = this;
        e.pollingList = new r(e.el, {
            ajax: e.options.pollingAjax,
            data: {
                max: e.max
            }
        });
        e._loadingHtml();
    };
    n.prototype._loadingHtml = function() {
        var e = this, t = "";
        t += '<div class="ui-loading-list">';
        t += '<div class="img-loading"></div>';
        t += '\t<div class="txt">';
        t += "\t正在卖力加载，请稍后";
        t += "  </div>";
        t += "</div>";
        e.pollingList.html(t);
    };
    n.prototype._initEvent = function() {
        var e = this, t = (e.options, e.options.pagerAjax);
        e.pollingList.on("error", function(t) {
            e.pollingList.html(u("tEmpty", 1));
        });
        e.pollingList.on("success", function(t) {
            if (t && t.data && t.data.resultList && t.data.resultList.length > 0) {
                e.pollingList.html(e.template(t.data));
                e.pollingList.setData({
                    id: t.data.resultList[0].id
                });
                e.isFist = !1;
            } else e.isFist && e.pollingList.html(u("tEmpty", 1));
            e.scrollTo(0);
        });
        e.el.on("mouseenter", function() {
            e.stop();
        });
        e.el.on("mouseleave", function() {
            e.start();
        });
        e.pollingList.on("pullup", function(i) {
            if (!e._isPulling) {
                e._isPulling = !0;
                a[t.type](t.url, t.data, function(t) {
                    e._isPulling = !1;
                    e.pollingList.append(e.template(t.data));
                }, function(t) {
                    e._isPulling = !1;
                    e.pollingList.html(u("tEmpty", 1));
                });
            }
        });
    };
    n.prototype.start = function() {
        var e = this;
        e.pollingList.start();
    };
    n.prototype.stop = function() {
        var e = this;
        e.pollingList.stop();
    };
    n.prototype.clear = function() {
        var e = this;
        e.pollingList.container.html("");
    };
    n.prototype.destroy = function() {
    };
    n.prototype.scrollTo = function(e) {
        var t = this;
        t.pollingList.scrollTo(e);
    };
    n.prototype.template = function(e) {
        return u("tAnswer", e);
    };
    i.exports = n;
});

!function(e, t) {
    "use strict";
    var i, n, o = e.layui && layui.define, r = {
        getPath: function() {
            var e = document.scripts, t = e[e.length - 1], i = t.src;
            if (!t.getAttribute("merge")) return i.substring(0, i.lastIndexOf("/") + 1);
        }(),
        config: {},
        end: {},
        minIndex: 0,
        minLeft: [],
        btn: [ "&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;" ],
        type: [ "dialog", "page", "iframe", "loading", "tips" ]
    }, a = {
        v: "3.0.1",
        ie: function() {
            var t = navigator.userAgent.toLowerCase();
            return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11");
        }(),
        index: e.layer && e.layer.v ? 1e5 : 0,
        path: r.getPath,
        config: function(e, t) {
            return e = e || {}, a.cache = r.config = i.extend({}, r.config, e), a.path = r.config.path || a.path, 
            "string" == typeof e.extend && (e.extend = [ e.extend ]), r.config.path && a.ready(), 
            e.extend ? (o ? layui.addcss("modules/layer/" + e.extend) : a.link("skin/" + e.extend), 
            this) : this;
        },
        link: function(t, n, o) {
            if (a.path) {
                var r = i("head")[0], s = document.createElement("link");
                "string" == typeof n && (o = n);
                var l = (o || t).replace(/\.|\//g, ""), u = "layuicss-" + l, c = 0;
                s.rel = "stylesheet", s.href = a.path + t, s.id = u, i("#" + u)[0] || r.appendChild(s), 
                "function" == typeof n && !function f() {
                    return ++c > 80 ? e.console && console.error("layer.css: Invalid") : void (1989 === parseInt(i("#" + u).css("width")) ? n() : setTimeout(f, 100));
                }();
            }
        },
        ready: function(e) {
            var t = "skinlayercss", i = "1110";
            return o ? layui.addcss("modules/layer/default/layer.css?v=" + a.v + i, e, t) : a.link("skin/default/layer.css?v=" + a.v + i, e, t), 
            this;
        },
        alert: function(e, t, n) {
            var o = "function" == typeof t;
            return o && (n = t), a.open(i.extend({
                content: e,
                yes: n
            }, o ? {} : t));
        },
        confirm: function(e, t, n, o) {
            var s = "function" == typeof t;
            return s && (o = n, n = t), a.open(i.extend({
                content: e,
                btn: r.btn,
                yes: n,
                btn2: o
            }, s ? {} : t));
        },
        msg: function(e, n, o) {
            var s = "function" == typeof n, u = r.config.skin, c = (u ? u + " " + u + "-msg" : "") || "layui-layer-msg", f = l.anim.length - 1;
            return s && (o = n), a.open(i.extend({
                content: e,
                time: 3e3,
                shade: !1,
                skin: c,
                title: !1,
                closeBtn: !1,
                btn: !1,
                resize: !1,
                end: o
            }, s && !r.config.skin ? {
                skin: c + " layui-layer-hui",
                anim: f
            } : function() {
                return n = n || {}, (n.icon === -1 || n.icon === t && !r.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")), 
                n;
            }()));
        },
        load: function(e, t) {
            return a.open(i.extend({
                type: 3,
                icon: e || 0,
                resize: !1,
                shade: .01
            }, t));
        },
        tips: function(e, t, n) {
            return a.open(i.extend({
                type: 4,
                content: [ e, t ],
                closeBtn: !1,
                time: 3e3,
                shade: !1,
                resize: !1,
                fixed: !1,
                maxWidth: 210
            }, n));
        }
    }, s = function(e) {
        var t = this;
        t.index = ++a.index, t.config = i.extend({}, t.config, r.config, e), document.body ? t.creat() : setTimeout(function() {
            t.creat();
        }, 50);
    };
    s.pt = s.prototype;
    var l = [ "layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close" ];
    l.anim = [ "layer-anim", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06" ], 
    s.pt.config = {
        type: 0,
        shade: .3,
        fixed: !0,
        move: l[1],
        title: "&#x4FE1;&#x606F;",
        offset: "auto",
        area: "auto",
        closeBtn: 1,
        time: 0,
        zIndex: 19891014,
        maxWidth: 360,
        anim: 0,
        icon: -1,
        moveType: 1,
        resize: !0,
        scrollbar: !0,
        tips: 2
    }, s.pt.vessel = function(e, t) {
        var n = this, o = n.index, a = n.config, s = a.zIndex + o, u = "object" == typeof a.title, c = a.maxmin && (1 === a.type || 2 === a.type), f = a.title ? '<div class="layui-layer-title" style="' + (u ? a.title[1] : "") + '">' + (u ? a.title[0] : a.title) + "</div>" : "";
        return a.zIndex = s, t([ a.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + o + '" times="' + o + '" style="' + ("z-index:" + (s - 1) + "; background-color:" + (a.shade[1] || "#000") + "; opacity:" + (a.shade[0] || a.shade) + "; filter:alpha(opacity=" + (100 * a.shade[0] || 100 * a.shade) + ");") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + r.type[a.type]) + (0 != a.type && 2 != a.type || a.shade ? "" : " layui-layer-border") + " " + (a.skin || "") + '" id="' + l[0] + o + '" type="' + r.type[a.type] + '" times="' + o + '" showtime="' + a.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + a.area[0] + ";height:" + a.area[1] + (a.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != a.type ? "" : f) + '<div id="' + (a.id || "") + '" class="layui-layer-content' + (0 == a.type && a.icon !== -1 ? " layui-layer-padding" : "") + (3 == a.type ? " layui-layer-loading" + a.icon : "") + '">' + (0 == a.type && a.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>' : "") + (1 == a.type && e ? "" : a.content || "") + '</div><span class="layui-layer-setwin">' + function() {
            var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
            return a.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (a.title ? a.closeBtn : 4 == a.type ? "1" : "2") + '" href="javascript:;"></a>'), 
            e;
        }() + "</span>" + (a.btn ? function() {
            var e = "";
            "string" == typeof a.btn && (a.btn = [ a.btn ]);
            for (var t = 0, i = a.btn.length; t < i; t++) e += '<a class="' + l[6] + t + '">' + a.btn[t] + "</a>";
            return '<div class="' + l[6] + " layui-layer-btn-" + (a.btnAlign || "") + '">' + e + "</div>";
        }() : "") + (a.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>" ], f, i('<div class="layui-layer-move"></div>')), 
        n;
    }, s.pt.creat = function() {
        var e = this, t = e.config, o = e.index, s = t.content, u = "object" == typeof s, c = i("body");
        if (!i("#" + t.id)[0]) {
            switch ("string" == typeof t.area && (t.area = "auto" === t.area ? [ "", "" ] : [ t.area, "" ]), 
            t.shift && (t.anim = t.shift), 6 == a.ie && (t.fixed = !1), t.type) {
              case 0:
                t.btn = "btn" in t ? t.btn : r.btn[0], a.closeAll("dialog");
                break;

              case 2:
                var s = t.content = u ? t.content : [ t.content || "http://layer.layui.com", "auto" ];
                t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + o + '" name="' + l[4] + o + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
                break;

              case 3:
                delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, a.closeAll("loading");
                break;

              case 4:
                u || (t.content = [ t.content, "body" ]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', 
                delete t.title, t.tips = "object" == typeof t.tips ? t.tips : [ t.tips, !0 ], t.tipsMore || a.closeAll("tips");
            }
            e.vessel(u, function(n, a, f) {
                c.append(n[0]), u ? function() {
                    2 == t.type || 4 == t.type ? function() {
                        i("body").append(n[1]);
                    }() : function() {
                        s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), 
                        i("#" + l[0] + o).find("." + l[5]).before(a));
                    }();
                }() : c.append(n[1]), i(".layui-layer-move")[0] || c.append(r.moveElem = f), e.layero = i("#" + l[0] + o), 
                t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", o);
            }).auto(o), 2 == t.type && 6 == a.ie && e.layero.find("iframe").attr("src", s[0]), 
            4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function() {
                e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(o), 
                4 == t.type && e.tips();
            }), t.time <= 0 || setTimeout(function() {
                a.close(e.index);
            }, t.time), e.move().callback(), l.anim[t.anim] && e.layero.addClass(l.anim[t.anim]).data("anim", !0);
        }
    }, s.pt.auto = function(e) {
        function t(e) {
            e = s.find(e), e.height(u[1] - c - f - 2 * (0 | parseFloat(e.css("padding"))));
        }
        var o = this, r = o.config, s = i("#" + l[0] + e);
        "" === r.area[0] && r.maxWidth > 0 && (a.ie && a.ie < 8 && r.btn && s.width(s.innerWidth()), 
        s.outerWidth() > r.maxWidth && s.width(r.maxWidth));
        var u = [ s.innerWidth(), s.innerHeight() ], c = s.find(l[1]).outerHeight() || 0, f = s.find("." + l[6]).outerHeight() || 0;
        switch (r.type) {
          case 2:
            t("iframe");
            break;

          default:
            "" === r.area[1] ? r.fixed && u[1] >= n.height() && (u[1] = n.height(), t("." + l[5])) : t("." + l[5]);
        }
        return o;
    }, s.pt.offset = function() {
        var e = this, t = e.config, i = e.layero, o = [ i.outerWidth(), i.outerHeight() ], r = "object" == typeof t.offset;
        e.offsetTop = (n.height() - o[1]) / 2, e.offsetLeft = (n.width() - o[0]) / 2, r ? (e.offsetTop = t.offset[0], 
        e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - o[0] : "b" === t.offset ? e.offsetTop = n.height() - o[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, 
        e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - o[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, 
        e.offsetLeft = n.width() - o[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - o[1], 
        e.offsetLeft = n.width() - o[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), 
        e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), 
        e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()), i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), 
        e.offsetLeft = i.css("left")), i.css({
            top: e.offsetTop,
            left: e.offsetLeft
        });
    }, s.pt.tips = function() {
        var e = this, t = e.config, o = e.layero, r = [ o.outerWidth(), o.outerHeight() ], a = i(t.follow);
        a[0] || (a = i("body"));
        var s = {
            width: a.outerWidth(),
            height: a.outerHeight(),
            top: a.offset().top,
            left: a.offset().left
        }, u = o.find(".layui-layer-TipsG"), c = t.tips[0];
        t.tips[1] || u.remove(), s.autoLeft = function() {
            s.left + r[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - r[0], u.css({
                right: 12,
                left: "auto"
            })) : s.tipLeft = s.left;
        }, s.where = [ function() {
            s.autoLeft(), s.tipTop = s.top - r[1] - 10, u.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1]);
        }, function() {
            s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, u.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1]);
        }, function() {
            s.autoLeft(), s.tipTop = s.top + s.height + 10, u.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1]);
        }, function() {
            s.tipLeft = s.left - r[0] - 10, s.tipTop = s.top, u.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1]);
        } ], s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + r[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + r[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + r[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && r[0] + 16 - s.left > 0 && s.where[1](), 
        o.find("." + l[5]).css({
            "background-color": t.tips[1],
            "padding-right": t.closeBtn ? "30px" : ""
        }), o.css({
            left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
            top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
        });
    }, s.pt.move = function() {
        var e = this, t = e.config, o = i(document), s = e.layero, l = s.find(t.move), u = s.find(".layui-layer-resize"), c = {};
        return t.move && l.css("cursor", "move"), l.on("mousedown", function(e) {
            e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [ e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top")) ], 
            r.moveElem.css("cursor", "move").show());
        }), u.on("mousedown", function(e) {
            e.preventDefault(), c.resizeStart = !0, c.offset = [ e.clientX, e.clientY ], c.area = [ s.outerWidth(), s.outerHeight() ], 
            r.moveElem.css("cursor", "se-resize").show();
        }), o.on("mousemove", function(i) {
            if (c.moveStart) {
                var o = i.clientX - c.offset[0], r = i.clientY - c.offset[1], l = "fixed" === s.css("position");
                if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), 
                !t.moveOut) {
                    var u = n.width() - s.outerWidth() + c.stX, f = n.height() - s.outerHeight() + c.stY;
                    o < c.stX && (o = c.stX), o > u && (o = u), r < c.stY && (r = c.stY), r > f && (r = f);
                }
                s.css({
                    left: o,
                    top: r
                });
            }
            if (t.resize && c.resizeStart) {
                var o = i.clientX - c.offset[0], r = i.clientY - c.offset[1];
                i.preventDefault(), a.style(e.index, {
                    width: c.area[0] + o,
                    height: c.area[1] + r
                }), c.isResize = !0;
            }
        }).on("mouseup", function(e) {
            c.moveStart && (delete c.moveStart, r.moveElem.hide(), t.moveEnd && t.moveEnd()), 
            c.resizeStart && (delete c.resizeStart, r.moveElem.hide());
        }), e;
    }, s.pt.callback = function() {
        function e() {
            var e = o.cancel && o.cancel(t.index, n);
            e === !1 || a.close(t.index);
        }
        var t = this, n = t.layero, o = t.config;
        t.openLayer(), o.success && (2 == o.type ? n.find("iframe").on("load", function() {
            o.success(n, t.index);
        }) : o.success(n, t.index)), 6 == a.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function() {
            var e = i(this).index();
            if (0 === e) o.yes ? o.yes(t.index, n) : o.btn1 ? o.btn1(t.index, n) : a.close(t.index); else {
                var r = o["btn" + (e + 1)] && o["btn" + (e + 1)](t.index, n);
                r === !1 || a.close(t.index);
            }
        }), n.find("." + l[7]).on("click", e), o.shadeClose && i("#layui-layer-shade" + t.index).on("click", function() {
            a.close(t.index);
        }), n.find(".layui-layer-min").on("click", function() {
            var e = o.min && o.min(n);
            e === !1 || a.min(t.index, o);
        }), n.find(".layui-layer-max").on("click", function() {
            i(this).hasClass("layui-layer-maxmin") ? (a.restore(t.index), o.restore && o.restore(n)) : (a.full(t.index, o), 
            setTimeout(function() {
                o.full && o.full(n);
            }, 100));
        }), o.end && (r.end[t.index] = o.end);
    }, r.reselect = function() {
        i.each(i("select"), function(e, t) {
            var n = i(this);
            n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), 
            n = null;
        });
    }, s.pt.IE6 = function(e) {
        i("select").each(function(e, t) {
            var n = i(this);
            n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
                layer: "1"
            }).hide(), n = null;
        });
    }, s.pt.openLayer = function() {
        var e = this;
        a.zIndex = e.config.zIndex, a.setTop = function(e) {
            var t = function() {
                a.zIndex++, e.css("z-index", a.zIndex + 1);
            };
            return a.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), a.zIndex;
        };
    }, r.record = function(e) {
        var t = [ e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left")) ];
        e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
            area: t
        });
    }, r.rescollbar = function(e) {
        l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), 
        l.html.removeAttr("layer-full"));
    }, e.layer = a, a.getChildFrame = function(e, t) {
        return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e);
    }, a.getFrameIndex = function(e) {
        return i("#" + e).parents("." + l[4]).attr("times");
    }, a.iframeAuto = function(e) {
        if (e) {
            var t = a.getChildFrame("html", e).outerHeight(), n = i("#" + l[0] + e), o = n.find(l[1]).outerHeight() || 0, r = n.find("." + l[6]).outerHeight() || 0;
            n.css({
                height: t + o + r
            }), n.find("iframe").css({
                height: t
            });
        }
    }, a.iframeSrc = function(e, t) {
        i("#" + l[0] + e).find("iframe").attr("src", t);
    }, a.style = function(e, t, n) {
        var o = i("#" + l[0] + e), a = o.find(".layui-layer-content"), s = o.attr("type"), u = o.find(l[1]).outerHeight() || 0, c = o.find("." + l[6]).outerHeight() || 0;
        o.attr("minLeft");
        s !== r.type[3] && s !== r.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), 
        parseFloat(t.height) - u - c <= 64 && (t.height = 64 + u + c)), o.css(t), c = o.find("." + l[6]).outerHeight(), 
        s === r.type[2] ? o.find("iframe").css({
            height: parseFloat(t.height) - u - c
        }) : a.css({
            height: parseFloat(t.height) - u - c - parseFloat(a.css("padding-top")) - parseFloat(a.css("padding-bottom"))
        }));
    }, a.min = function(e, t) {
        var o = i("#" + l[0] + e), s = o.find(l[1]).outerHeight() || 0, u = o.attr("minLeft") || 181 * r.minIndex + "px", c = o.css("position");
        r.record(o), r.minLeft[0] && (u = r.minLeft[0], r.minLeft.shift()), o.attr("position", c), 
        a.style(e, {
            width: 180,
            height: s,
            left: u,
            top: n.height() - s,
            position: "fixed",
            overflow: "hidden"
        }, !0), o.find(".layui-layer-min").hide(), "page" === o.attr("type") && o.find(l[4]).hide(), 
        r.rescollbar(e), o.attr("minLeft") || r.minIndex++, o.attr("minLeft", u);
    }, a.restore = function(e) {
        var t = i("#" + l[0] + e), n = t.attr("area").split(",");
        t.attr("type");
        a.style(e, {
            width: parseFloat(n[0]),
            height: parseFloat(n[1]),
            top: parseFloat(n[2]),
            left: parseFloat(n[3]),
            position: t.attr("position"),
            overflow: "visible"
        }, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), 
        "page" === t.attr("type") && t.find(l[4]).show(), r.rescollbar(e);
    }, a.full = function(e) {
        var t, o = i("#" + l[0] + e);
        r.record(o), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), 
        clearTimeout(t), t = setTimeout(function() {
            var t = "fixed" === o.css("position");
            a.style(e, {
                top: t ? 0 : n.scrollTop(),
                left: t ? 0 : n.scrollLeft(),
                width: n.width(),
                height: n.height()
            }, !0), o.find(".layui-layer-min").hide();
        }, 100);
    }, a.title = function(e, t) {
        var n = i("#" + l[0] + (t || a.index)).find(l[1]);
        n.html(e);
    }, a.close = function(e) {
        var t = i("#" + l[0] + e), n = t.attr("type"), o = "layer-anim-close";
        if (t[0]) {
            var s = "layui-layer-wrap", u = function() {
                if (n === r.type[1] && "object" === t.attr("conType")) {
                    t.children(":not(." + l[5] + ")").remove();
                    for (var o = t.find("." + s), a = 0; a < 2; a++) o.unwrap();
                    o.css("display", o.data("display")).removeClass(s);
                } else {
                    if (n === r.type[2]) try {
                        var u = i("#" + l[4] + e)[0];
                        u.contentWindow.document.write(""), u.contentWindow.close(), t.find("." + l[5])[0].removeChild(u);
                    } catch (c) {}
                    t[0].innerHTML = "", t.remove();
                }
                "function" == typeof r.end[e] && r.end[e](), delete r.end[e];
            };
            t.data("anim") && t.addClass(o), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 
            6 == a.ie && r.reselect(), r.rescollbar(e), t.attr("minLeft") && (r.minIndex--, 
            r.minLeft.push(t.attr("minLeft"))), setTimeout(function() {
                u();
            }, a.ie && a.ie < 10 || !t.data("anim") ? 0 : 200);
        }
    }, a.closeAll = function(e) {
        i.each(i("." + l[0]), function() {
            var t = i(this), n = e ? t.attr("type") === e : 1;
            n && a.close(t.attr("times")), n = null;
        });
    };
    var u = a.cache || {}, c = function(e) {
        return u.skin ? " " + u.skin + " " + u.skin + "-" + e : "";
    };
    a.prompt = function(e, t) {
        var o = "";
        if (e = e || {}, "function" == typeof e && (t = e), e.area) {
            var r = e.area;
            o = 'style="width: ' + r[0] + "; height: " + r[1] + ';"', delete e.area;
        }
        var s, l = 2 == e.formType ? '<textarea class="layui-layer-input"' + o + ">" + (e.value || "") + "</textarea>" : function() {
            return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">';
        }();
        return a.open(i.extend({
            type: 1,
            btn: [ "&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;" ],
            content: l,
            skin: "layui-layer-prompt" + c("prompt"),
            maxWidth: n.width(),
            success: function(e) {
                s = e.find(".layui-layer-input"), s.focus();
            },
            resize: !1,
            yes: function(i) {
                var n = s.val();
                "" === n ? s.focus() : n.length > (e.maxlength || 500) ? a.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
                    tips: 1
                }) : t && t(n, i, s);
            }
        }, e));
    }, a.tab = function(e) {
        e = e || {};
        var t = e.tab || {};
        return a.open(i.extend({
            type: 1,
            skin: "layui-layer-tab" + c("tab"),
            resize: !1,
            title: function() {
                var e = t.length, i = 1, n = "";
                if (e > 0) for (n = '<span class="layui-layer-tabnow">' + t[0].title + "</span>"; i < e; i++) n += "<span>" + t[i].title + "</span>";
                return n;
            }(),
            content: '<ul class="layui-layer-tabmain">' + function() {
                var e = t.length, i = 1, n = "";
                if (e > 0) for (n = '<li class="layui-layer-tabli xubox_tab_layer">' + (t[0].content || "no content") + "</li>"; i < e; i++) n += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
                return n;
            }() + "</ul>",
            success: function(t) {
                var n = t.find(".layui-layer-title").children(), o = t.find(".layui-layer-tabmain").children();
                n.on("mousedown", function(t) {
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
                    var n = i(this), r = n.index();
                    n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"), o.eq(r).show().siblings().hide(), 
                    "function" == typeof e.change && e.change(r);
                });
            }
        }, e));
    }, a.photos = function(t, n, o) {
        function r(e, t, i) {
            var n = new Image();
            return n.src = e, n.complete ? t(n) : (n.onload = function() {
                n.onload = null, t(n);
            }, void (n.onerror = function(e) {
                n.onerror = null, i(e);
            }));
        }
        var s = {};
        if (t = t || {}, t.photos) {
            var l = t.photos.constructor === Object, u = l ? t.photos : {}, f = u.data || [], d = u.start || 0;
            if (s.imgIndex = (0 | d) + 1, t.img = t.img || "img", l) {
                if (0 === f.length) return a.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;");
            } else {
                var p = i(t.photos), h = function() {
                    f = [], p.find(t.img).each(function(e) {
                        var t = i(this);
                        t.attr("layer-index", e), f.push({
                            alt: t.attr("alt"),
                            pid: t.attr("layer-pid"),
                            src: t.attr("layer-src") || t.attr("src"),
                            thumb: t.attr("src")
                        });
                    });
                };
                if (h(), 0 === f.length) return;
                if (n || p.on("click", t.img, function() {
                    var e = i(this), n = e.attr("layer-index");
                    a.photos(i.extend(t, {
                        photos: {
                            start: n,
                            data: f,
                            tab: t.tab
                        },
                        full: t.full
                    }), !0), h();
                }), !n) return;
            }
            s.imgprev = function(e) {
                s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = f.length), s.tabimg(e);
            }, s.imgnext = function(e, t) {
                s.imgIndex++, s.imgIndex > f.length && (s.imgIndex = 1, t) || s.tabimg(e);
            }, s.keyup = function(e) {
                if (!s.end) {
                    var t = e.keyCode;
                    e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && a.close(s.index);
                }
            }, s.tabimg = function(e) {
                f.length <= 1 || (u.start = s.imgIndex - 1, a.close(s.index), a.photos(t, !0, e));
            }, s.event = function() {
                s.bigimg.hover(function() {
                    s.imgsee.show();
                }, function() {
                    s.imgsee.hide();
                }), s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
                    e.preventDefault(), s.imgprev();
                }), s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
                    e.preventDefault(), s.imgnext();
                }), i(document).on("keyup", s.keyup);
            }, s.loadi = a.load(1, {
                shade: !("shade" in t) && .9,
                scrollbar: !1
            }), r(f[d].src, function(n) {
                a.close(s.loadi), s.index = a.open(i.extend({
                    type: 1,
                    area: function() {
                        var o = [ n.width, n.height ], r = [ i(e).width() - 100, i(e).height() - 100 ];
                        if (!t.full && (o[0] > r[0] || o[1] > r[1])) {
                            var a = [ o[0] / r[0], o[1] / r[1] ];
                            a[0] > a[1] ? (o[0] = o[0] / a[0], o[1] = o[1] / a[0]) : a[0] < a[1] && (o[0] = o[0] / a[1], 
                            o[1] = o[1] / a[1]);
                        }
                        return [ o[0] + "px", o[1] + "px" ];
                    }(),
                    title: !1,
                    shade: .9,
                    shadeClose: !0,
                    closeBtn: !1,
                    move: ".layui-layer-phimg img",
                    moveType: 1,
                    scrollbar: !1,
                    moveOut: !0,
                    anim: 5 * Math.random() | 0,
                    skin: "layui-layer-photos" + c("photos"),
                    content: '<div class="layui-layer-phimg"><img src="' + f[d].src + '" alt="' + (f[d].alt || "") + '" layer-pid="' + f[d].pid + '"><div class="layui-layer-imgsee">' + (f.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (o ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (f[d].alt || "") + "</a><em>" + s.imgIndex + "/" + f.length + "</em></span></div></div></div>",
                    success: function(e, i) {
                        s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), 
                        s.event(e), t.tab && t.tab(f[d], e);
                    },
                    end: function() {
                        s.end = !0, i(document).off("keyup", s.keyup);
                    }
                }, t));
            }, function() {
                a.close(s.loadi), a.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                    time: 3e4,
                    btn: [ "&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;" ],
                    yes: function() {
                        f.length > 1 && s.imgnext(!0, !0);
                    }
                });
            });
        }
    }, r.run = function(t) {
        i = t, n = i(e), l.html = i("html"), a.open = function(e) {
            var t = new s(e);
            return t.index;
        };
    }, e.layui && layui.define ? (a.ready(), layui.define("jquery", function(t) {
        a.path = layui.cache.dir, r.run(layui.jquery), e.layer = a, t("layer", a);
    })) : "function" == typeof define ? define("plugins/layer/layer", [ "jquery" ], function() {
        return r.run(e.jQuery), a;
    }) : function() {
        r.run(e.jQuery), a.ready();
    }();
}(window);

!function() {
    var CKobject = {
        _K_: function(e) {
            return document.getElementById(e);
        },
        _T_: !1,
        _M_: !1,
        _G_: !1,
        _Y_: !1,
        _I_: null,
        _J_: 0,
        _O_: {},
        uaMatch: function(e, t, i, n, o, r, a, s, l) {
            var u = t.exec(e);
            if (null != u) return {
                b: "IE",
                v: u[2] || "0"
            };
            u = i.exec(e);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = n.exec(e);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = o.exec(e);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = r.exec(e);
            if (null != u) return {
                b: u[2] || "",
                v: u[1] || "0"
            };
            u = a.exec(e);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = s.exec(e);
            if (null != u) return {
                b: u[1] || "",
                v: u[2] || "0"
            };
            u = l.exec(e);
            return null != u ? {
                b: u[1] || "",
                v: u[2] || "0"
            } : {
                b: "unknown",
                v: "0"
            };
        },
        browser: function() {
            var e = navigator.userAgent, t = /(msie\s|trident.*rv:)([\w.]+)/, i = /(firefox)\/([\w.]+)/, n = /(opera).+version\/([\w.]+)/, o = /(chrome)\/([\w.]+)/, r = /version\/([\w.]+).*(safari)/, a = /(safari)\/([\w.]+)/, s = /(mozilla)\/([\w.]+)/, l = /(mobile)\/([\w.]+)/, u = e.toLowerCase(), c = this.uaMatch(u, t, i, n, o, r, a, s, l);
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
            var e = "", t = navigator.userAgent, i = (navigator.appVersion, {
                iPhone: t.indexOf("iPhone") > -1 || t.indexOf("Mac") > -1,
                iPad: t.indexOf("iPad") > -1,
                ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: t.indexOf("Android") > -1 || t.indexOf("Linux") > -1,
                webKit: t.indexOf("AppleWebKit") > -1,
                trident: t.indexOf("Trident") > -1,
                gecko: t.indexOf("Gecko") > -1 && t.indexOf("KHTML") == -1,
                presto: t.indexOf("Presto") > -1,
                mobile: !!t.match(/AppleWebKit.*Mobile.*/) || !!t.match(/AppleWebKit/),
                webApp: t.indexOf("Safari") == -1
            });
            for (var n in i) if (i[n]) {
                e = n;
                break;
            }
            return e;
        },
        isHTML5: function() {
            return !!document.createElement("video").canPlayType;
        },
        getType: function() {
            return this._T_;
        },
        getVideo: function() {
            var e = "", t = this._E_.v;
            if (t && t.length > 1) for (var i = 0; i < t.length; i++) {
                var n = t[i].split("->");
                n.length >= 1 && "" != n[0] && (e += '<source src="' + n[0] + '"');
                n.length >= 2 && "" != n[1] && (e += ' type="' + n[1] + '"');
                e += ">";
            }
            return e;
        },
        getVars: function(e) {
            var t = this._A_;
            return "undefined" == typeof t ? null : e in t ? t[e] : null;
        },
        getParams: function() {
            var e = "";
            if (this._A_) {
                1 == parseInt(this.getVars("p")) && (e += ' autoplay="autoplay"');
                1 == parseInt(this.getVars("e")) && (e += ' loop="loop"');
                2 == parseInt(this.getVars("p")) && (e += ' preload="metadata"');
                this.getVars("i") && (e += ' poster="' + this.getVars("i") + '"');
            }
            return e;
        },
        getpath: function(e) {
            var t = "CDEFGHIJKLMNOPQRSTUVWXYZcdefghijklmnopqrstuvwxyz", n = e.substr(0, 1);
            if (t.indexOf(n) > -1 && (e.substr(0, 4) == n + "://" || e.substr(0, 4) == n + ":\\")) return e;
            var o = unescape(window.location.href).replace("file:///", ""), r = parseInt(document.location.port), a = document.location.protocol + "//" + document.location.hostname, s = "", l = "", u = "", c = 0, f = unescape(e).split("//");
            f.length > 0 && (s = f[0] + "//");
            var d = "http|https|ftp|rtsp|mms|ftp|rtmp|file", p = d.split("|");
            80 != r && r && (a += ":" + r);
            for (i = 0; i < p.length; i++) if (p[i] + "://" == s) {
                c = 1;
                break;
            }
            if (0 == c) if ("/" == e.substr(0, 1)) u = a + e; else {
                l = o.substring(0, o.lastIndexOf("/") + 1).replace("\\", "/");
                var n = e.replace("../", "./"), a = n.split("./"), h = a.length, f = n.replace("./", ""), m = l.split("/"), v = m.length - h;
                for (i = 0; i < v; i++) u += m[i] + "/";
                u += f;
            } else u = e;
            return u;
        },
        getXhr: function() {
            var e;
            try {
                e = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (t) {
                try {
                    e = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (t) {
                    e = !1;
                }
            }
            e || "undefined" == typeof XMLHttpRequest || (e = new XMLHttpRequest());
            return e;
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
        getSn: function(e, t) {
            return t >= 0 ? this._X_[e].split(",")[t] : this._X_[e];
        },
        getUrl: function(e, t) {
            var i = [ "get", "utf-8" ];
            if (e && 2 == e.length) {
                var n = e[0], o = e[1].split("/");
                o.length >= 2 && (i[0] = o[1]);
                o.length >= 3 && (i[1] = o[2]);
                this.ajax(i[0], i[1], n, function(e) {
                    var i = CKobject;
                    if (e && "error" != e) {
                        var n = "", o = e;
                        if (e.indexOf("}") > -1) {
                            for (var r = e.split("}"), a = 0; a < r.length - 1; a++) {
                                n += r[a] + "}";
                                var s = r[a].replace("{", "").split("->");
                                2 == s.length && (i._A_[s[0]] = s[1]);
                            }
                            o = r[r.length - 1];
                        }
                        i._E_.v = o.split(",");
                        if (t) i.showHtml5(); else {
                            i.changeParams(n);
                            i.newAdr();
                        }
                    }
                });
            }
        },
        getflashvars: function(e) {
            var t = "", i = 0;
            if (e) for (var n in e) {
                i > 0 && (t += "&");
                if ("f" == n && e[n] && !this.getSn("pm_repc", -1)) {
                    e[n] = this.getpath(e[n]);
                    e[n].indexOf("&") > -1 && (e[n] = encodeURIComponent(e[n]));
                }
                "y" == n && e[n] && (e[n] = this.getpath(e[n]));
                t += n + "=" + e[n];
                i++;
            }
            return t;
        },
        getparam: function(e) {
            var t = "", i = "", n = {
                allowScriptAccess: "always",
                allowFullScreen: !0,
                quality: "high",
                bgcolor: "#000"
            };
            if (e) for (var o in e) n[o] = e[o];
            for (var r in n) {
                t += r + '="' + n[r] + '" ';
                i += '<param name="' + r + '" value="' + n[r] + '" />';
            }
            t = t.replace("movie=", "src=");
            return {
                w: t,
                v: i
            };
        },
        getObjectById: function(e) {
            if (this._T_) return this;
            var t = null, i = this._K_(e), n = "embed";
            if (i && "OBJECT" == i.nodeName) if ("undefined" != typeof i.SetVariable) t = i; else {
                var o = i.getElementsByTagName(n)[0];
                o && (t = o);
            }
            return t;
        },
        ajax: function(e, t, i, n) {
            var o = this.getXhr(), r = [], a = "";
            if ("get" == e) {
                a = i.indexOf("?") > -1 ? i + "&t=" + new Date().getTime() : i + "?t=" + new Date().getTime();
                o.open("get", a);
            } else {
                r = i.split("?");
                i = r[0], a = r[1];
                o.open("post", i, !0);
            }
            o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            o.setRequestHeader("charset", t);
            "post" == e ? o.send(a) : o.send(null);
            o.onreadystatechange = function() {
                if (4 == o.readyState) {
                    var e = o.responseText;
                    n("" != e ? e : null);
                }
            };
        },
        addListener: function(e, t) {
            var i = CKobject._V_;
            if (i.addEventListener) try {
                i.addEventListener(e, t, !1);
            } catch (e) {
                this.getNot();
            } else if (i.attachEvent) try {
                i.attachEvent("on" + e, t);
            } catch (e) {
                this.getNot();
            } else i["on" + e] = t;
        },
        removeListener: function(e, t) {
            var i = CKobject._V_;
            if (i.removeEventListener) try {
                i.removeEventListener(e, t, !1);
            } catch (e) {
                this.getNot();
            } else if (i.detachEvent) try {
                i.detachEvent("on" + e, t);
            } catch (e) {
                this.getNot();
            } else i["on" + e] = null;
        },
        Flash: function() {
            var e = !1, t = 0;
            if (document.all || this.browser().B.toLowerCase().indexOf("ie") > -1) try {
                var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                e = !0;
                var n = i.GetVariable("$version");
                t = parseInt(n.split(" ")[1].split(",")[0]);
            } catch (o) {} else if (navigator.plugins && navigator.plugins.length > 0) {
                var i = navigator.plugins["Shockwave Flash"];
                if (i) {
                    e = !0;
                    for (var r = i.description.split(" "), a = 0; a < r.length; ++a) isNaN(parseInt(r[a])) || (t = parseInt(r[a]));
                }
            }
            return {
                f: e,
                v: t
            };
        },
        embed: function(e, t, i, n, o, r, a, s, l, u) {
            var c = [ "all" ];
            r ? this.isHTML5() ? this.embedHTML5(t, i, n, o, s, a, c, u) : this.embedSWF(e, t, i, n, o, a, l) : this.Flash().f && parseInt(this.Flash().v) > 10 ? this.embedSWF(e, t, i, n, o, a, l) : this.isHTML5() ? this.embedHTML5(t, i, n, o, s, a, c, u) : this.embedSWF(e, t, i, n, o, a, l);
        },
        embedSWF: function(e, t, i, n, o, r, a) {
            i || (i = "ckplayer_a1");
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
            }, h = typeof u.getElementById != s && typeof u.getElementsByTagName != s && typeof u.createElement != s, m = 'id="' + i + '" name="' + i + '" ', v = "", y = "";
            a.movie = e;
            a.flashvars = this.getflashvars(r);
            if (n == -1) {
                d = !0;
                this._K_(t).style.width = "100%";
                n = "100%";
            }
            v += '<object pluginspage="http://www.macromedia.com/go/getflashplayer" ';
            v += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
            v += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,3,0,0" ';
            v += 'width="' + n + '" ';
            v += 'height="' + o + '" ';
            v += m;
            v += 'align="middle">';
            v += this.getparam(a).v;
            v += "<embed ";
            v += this.getparam(a).w;
            v += ' width="' + n + '" height="' + o + '" name="' + i + '" id="' + i + '" align="middle" ' + m;
            v += 'type="application/x-shockwave-flash" pluginspage="' + c + '" />';
            v += "</object>";
            if (h) if (this.Flash().f) if (this.Flash().v < 11) {
                y = p.v;
                l = !0;
            } else {
                y = v;
                this._T_ = !1;
            } else {
                y = p.f;
                l = !0;
            } else {
                y = p.w;
                l = !0;
            }
            y && (this._K_(t).innerHTML = y);
            if (l) {
                this._K_(t).style.color = "#0066cc";
                this._K_(t).style.lineHeight = this._K_(t).style.height;
                this._K_(t).style.textAlign = "center";
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
        changeVolume: function(e) {
            this._T_ && (this._V_.volume = .01 * e);
        },
        videoSeek: function(e) {
            this._T_ && (this._V_.currentTime = e);
        },
        newAddress: function(e) {
            var t = [];
            if (e) {
                t = this.isHtml5New(e);
                if (t && this._T_) {
                    this.changeParams(e);
                    var i = t[0].split("->");
                    if (i && 2 == i.length && i[1].indexOf("ajax") > -1) {
                        this.getUrl(i, !1);
                        return;
                    }
                    this._E_.v = t;
                    this.newAdr();
                }
            }
        },
        quitFullScreen: function() {
            document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
        },
        changeStatus: function(e) {
            this._H_ = e;
        },
        newAdr: function() {
            var e = this._E_.v;
            this._V_.pause();
            1 == e.length ? this._V_.src = e[0].split("->")[0] : this._V_.innerHTML = this.getVideo();
            this._V_.load();
        },
        isHtml5New: function(e) {
            if (e.indexOf("html5") == -1) return !1;
            for (var t = e.replace(/{/g, ""), i = t.split("}"), n = "", o = 0; o < i.length; o++) if (i[o].indexOf("html5") > -1) {
                n = i[o].replace("html5->", "").split(",");
                break;
            }
            return n;
        },
        changeParams: function(e) {
            if (e) for (var t = e.replace(/{/g, ""), i = t.split("}"), n = 0; n < i.length; n++) {
                var o = i[n].split("->");
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
        frontAdPause: function(e) {
            this.getNot();
        },
        frontAdUnload: function() {
            this.getNot();
        },
        changeFace: function(e) {
            this.getNot();
        },
        plugin: function(e, t, i, n, o, r, a) {
            this.getNot();
        },
        videoClear: function() {
            this.getNot();
        },
        videoBrightness: function(e) {
            this.getNot();
        },
        videoContrast: function(e) {
            this.getNot();
        },
        videoSaturation: function(e) {
            this.getNot();
        },
        videoSetHue: function(e) {
            this.getNot();
        },
        videoWAndH: function(e, t) {
            this.getNot();
        },
        videoWHXY: function(e, t, i, n) {
            this.getNot();
        },
        changeFlashvars: function(e) {
            this.getNot();
        },
        changeMyObject: function(e, t) {
            this.getNot();
        },
        getMyObject: function(e, t) {
            this.getNot();
        },
        changeeFace: function() {
            this.getNot();
        },
        changeStyle: function(e, t) {
            this.getNot();
        },
        promptLoad: function() {
            this.getNot();
        },
        promptUnload: function() {
            this.getNot();
        },
        marqueeLoad: function(e, t) {
            this.getNot();
        },
        marqueeClose: function(e) {
            this.getNot();
        },
        getNot: function() {
            var e = "The ckplayer's API for HTML5 does not exist";
            return e;
        },
        volumeChangeHandler: function() {
            var e = CKobject;
            if (e._V_.muted) {
                e.returnStatus("volumechange:0", 1);
                e._O_.volume = 0;
                e._O_.mute = !0;
            } else {
                e._O_.mute = !1;
                e._O_.volume = 100 * e._V_.volume;
                e.returnStatus("volumechange:" + 100 * e._V_.volume, 1);
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
            var e = CKobject;
            e.returnStatus("loadedmetadata", 1);
            e._O_.totaltime = e._V_.duration;
            e._O_.width = e._V_.width;
            e._O_.height = e._V_.height;
            e._O_.awidth = e._V_.videoWidth;
            e._O_.aheight = e._V_.videoHeight;
            if (e._V_.defaultMuted) {
                e.returnStatus("volumechange:0", 1);
                e._O_.mute = !0;
                e._O_.volume = 0;
            } else {
                e._O_.mute = !1;
                e._O_.volume = 100 * e._V_.volume;
                e.returnStatus("volumechange:" + 100 * e._V_.volume, 1);
            }
            1 == parseInt(e.getVars("p")) && e.playHandler();
        },
        errorHandler: function() {
            CKobject.returnStatus("error", 1);
        },
        playHandler: function() {
            var e = CKobject;
            if (e._V_.paused) {
                e.returnStatus("pause", 1);
                e.addO("play", !1);
                if (null != e._I_) {
                    clearInterval(e._I_);
                    e._I_ = null;
                }
            } else {
                e.returnStatus("play", 1);
                e.addO("play", !0);
                if (!e._P_) {
                    e.returnStatus("play", 1);
                    e._P_ = !0;
                }
                e._I_ = setInterval(e.playTime, parseInt(e.getSn("setup", 37)));
                if (!e._G_) {
                    e._G_ = !0;
                    for (var t in e._A_) if ("g" == t && e._A_[t]) {
                        var i = parseInt(e._A_[t]);
                        e.videoSeek(i);
                    }
                }
                if (!e._Y_) {
                    e._Y_ = !0;
                    for (var t in e._A_) if ("j" == t && e._A_[t]) {
                        var n = parseInt(e._A_[t]);
                        n > 0 ? e._J_ = n : e._J_ = parseInt(e._O_.totaltime) + n;
                    }
                }
            }
        },
        html5Click: function() {
            var e = CKobject;
            "" != e.getVars("m") && null != e.getVars("m") && window.open(e.getVars("m"));
        },
        returnStatus: function(e, t) {
            var i = e;
            3 == this._H_ && (i = this._E_.p + "->" + i);
            this._M_ && t <= this._H_ && this._L_(i);
        },
        addO: function(e, t) {
            this._O_[e] = t;
        },
        getStatus: function() {
            return this._O_;
        },
        playTime: function() {
            var e = CKobject, t = e._V_.currentTime;
            e._O_.time = t;
            if (e._J_ > 0 && t > e._J_) {
                e._J_ = 0;
                e.videoSeek(e._O_.totaltime);
            }
            e.returnStatus("time:" + t, 1);
        }
    };
    window.CKobject = CKobject;
}();

define("plugins/ckplayer/6.7.0/ckplayer", function() {});

define("plugins/ckplayer/6.7.0/player", [ "require", "exports", "module", "jquery", "./ckplayer", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = this;
        if (void 0 === e) throw new Error("the param [selector] is required.");
        i.el = o(e);
        i._id = i.el.attr("id");
        i._playId = "_player-" + i._id;
        i._gLoadedHandler = "gLoadedHandler-" + i._id;
        var n = {
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
                loaded: i._gLoadedHandler,
                my_url: encodeURIComponent(window.location.href)
            }
        };
        i.options = o.extend(!0, {}, n, t);
        CKobject.embedSWF(i.options.swfPlayer, i._id, i._playId, i.options.embed.width, i.options.embed.height, i.options.flash, i.options.params);
        i._init();
        i._initEvent();
    }
    var o = e("jquery");
    e("./ckplayer");
    var r = e("lib/core/1.0.0/event/emitter"), a = e("lib/core/1.0.0/utils/util");
    a.inherits(n, r);
    n.prototype._init = function() {
        var e = this;
        e.CKobject = CKobject;
        e.player = e.get();
        e._embed = e.el.find("embed");
    };
    n.prototype._initEvent = function() {
        var e = this;
        e.options.interval > 0 && setInterval(function() {
            e.emit("time", e.getStatus().time);
        }, e.options.interval);
    };
    n.prototype.play = function() {
        var e = this;
        e.player && e.player.videoPlay();
    };
    n.prototype.playOrPause = function() {
        var e = this;
        e.player && e.player.playOrPause();
    };
    n.prototype.pause = function() {
        var e = this;
        e.player && e.player.videoPause();
    };
    n.prototype.jump = function(e) {
        var t = this;
        e >= 0 && t.player && t.player.videoSeek(e);
    };
    n.prototype.go = function(e) {
        if (void 0 === e) throw new Error("this params [url] is require.");
        var t = this;
        t.options.flash.f = e;
        t.player && t.player.newAddress(t.options.flash);
    };
    n.prototype.volume = function(e) {
        var t = this;
        0 <= e && e <= 100 && t.player && t.player.changeVolume(e);
    };
    n.prototype.width = function(e) {
        var t = this;
        t._embed && t._embed.width(e || t.options.embed.width);
    };
    n.prototype.height = function(e) {
        var t = this;
        t._embed && t._embed.width(e || t.options.embed.height);
    };
    n.prototype.getTotalTime = function() {
        var e = this;
        return e.player ? e.player.getStatus().totalTime : 0;
    };
    n.prototype.getCurrentTime = function() {
        var e = this;
        return e.player ? e.player.getStatus().time : 0;
    };
    n.prototype.getStatus = function() {
        var e = this;
        return e.player ? e.player.getStatus() : {};
    };
    n.prototype.get = function() {
        var e = this;
        return e.CKobject.getObjectById(e._playId);
    };
    i.exports = n;
});

define("conf/play", [ "require", "exports", "module", "jquery", "module/top-search/1.0.0/top-search", "module/login-status/1.0.0/login-status", "module/fix-bar/1.0.0/fix-bar", "module/footer/1.0.0/footer", "lib/ui/box/1.0.1/crossbox", "lib/plugins/lazyload/1.9.3/lazyload", "lib/core/1.0.0/io/request", "lib/ui/tab/1.0.0/tab", "template", "module/monitor/1.0.0/question", "module/monitor/1.0.0/note", "module/login-status/1.0.0/login", "plugins/layer/layer", "plugins/ckplayer/6.7.0/player" ], function(e, t, i) {
    "use strict";
    function n(e, t, i, n) {
        var o = p.loading("正在加载...", {
            modal: !1
        });
        m.get(e, t, function(e) {
            if (!l.isEmptyObject(e.data) && e.data && e.data.resultList && e.data.resultList.length > 0) {
                var t = y(i, e.data);
                document.getElementById(n).innerHTML = t;
                var r = l(".jStatus");
                r.each(function() {
                    l(this).attr("data-id") == $ && l(this).find(".iyoyo").attr("class", "").addClass("iyoyo iyoyo-pause");
                });
                w = new h(l("#" + n).find(".jImg"), {
                    mouseWheel: !0,
                    effect: "fadeIn",
                    snap: !0
                });
            } else {
                var t = y("tEmpty", 1);
                document.getElementById(n).innerHTML = t;
            }
            o && o.hide();
        }, function(e) {
            var t = y("tEmpty", 1);
            document.getElementById(n).innerHTML = t;
            o && o.hide();
        });
    }
    function o(e) {
        switch (e) {
          case "0":
            E.show();
            L.hide();
            j.hide();
            k.hide();
            T && T.stop();
            A && A.stop();
            n($PAGE_DATA.note.note, F, "tAnswer", "jNoteTab1");
            break;

          case "1":
            var t = {
                id: 0,
                pageSize: 20,
                sortType: 1,
                showType: 0,
                sourceType: 2,
                sourceId: $
            };
            E.hide();
            L.show();
            j.hide();
            k.hide();
            A || (A = new _("#jNoteTab2", {
                pollingAjax: {
                    url: $PAGE_DATA.note.note,
                    data: t
                },
                pagerAjax: {
                    url: $PAGE_DATA.note.note,
                    data: t
                }
            }));
            T && T.stop();
            A.start();
            break;

          case "2":
            E.hide();
            L.hide();
            j.show();
            k.hide();
            T && T.stop();
            A && A.stop();
            n($PAGE_DATA.question.question, H, "tQuestion", "jQuestionTab1");
            break;

          case "3":
            var t = {
                id: 0,
                pageSize: 20,
                sortType: 1,
                showType: 0,
                sourceType: 2,
                sourceId: $
            };
            E.hide();
            L.hide();
            j.hide();
            k.show();
            T || (T = new g("#jQuestionTab2", {
                pollingAjax: {
                    url: $PAGE_DATA.question.question,
                    data: t
                },
                pagerAjax: {
                    url: $PAGE_DATA.question.question,
                    data: t
                }
            }));
            T.start();
            A && A.stop();
        }
    }
    function r(e, t, i, n, o) {
        if (e > t) {
            i.addClass("text-error");
            n.addClass("publish-error");
            o.css({
                color: "red"
            });
        } else {
            i.removeClass("text-error");
            n.removeClass("publish-error");
            o.css({
                color: "#666"
            });
        }
        o.children(".num").text(e);
    }
    function a(e, t, i, o, r, a) {
        "" == e ? p.error("请输入内容") : t.hasClass("publish-error") || m.get(i, o, function(e) {
            p.ok("发表成功", t[0]);
            r.val("");
            a.children(".num").text("0");
            if (t.hasClass("jPublishA") && K.find(".ui-current").text().indexOf("全部笔记") == -1) n($PAGE_DATA.note.note, F, "tAnswer", "jNoteTab1"); else if (t.hasClass("jPublishQ") && R.find(".ui-current").text().indexOf("全部问答") == -1) {
                X.val("");
                n($PAGE_DATA.question.question, H, "tQuestion", "jQuestionTab1");
            }
        }, function(e) {
            p.error(e.msg || "网络错误,请重试", t[0]);
        });
    }
    function s(e, t, i) {
        m.get(e, t, function(e) {
            p.ok(i + "成功");
            n($PAGE_DATA.note.note, F, "tAnswer", "jNoteTab1");
        }, function(e) {
            p.error(e.msg || "网络错误,请重试");
        });
    }
    var l = e("jquery"), u = e("module/top-search/1.0.0/top-search"), c = e("module/login-status/1.0.0/login-status"), f = e("module/fix-bar/1.0.0/fix-bar"), d = e("module/footer/1.0.0/footer"), p = (new u(), 
    new c(), new f(), new d(), e("lib/ui/box/1.0.1/crossbox")), h = e("lib/plugins/lazyload/1.9.3/lazyload"), m = e("lib/core/1.0.0/io/request"), v = e("lib/ui/tab/1.0.0/tab"), y = e("template"), g = e("module/monitor/1.0.0/question"), _ = e("module/monitor/1.0.0/note"), b = e("module/login-status/1.0.0/login"), x = (l(".jMod-catlog"), 
    l("#jTab"));
    e("plugins/layer/layer");
    var w, T, A, C = new v(x), j = l("#jQuestionTab1"), k = l("#jQuestionTab2"), E = l("#jNoteTab1"), L = l("#jNoteTab2"), I = $PAGE_DATA.courseId, $ = $PAGE_DATA.lessonId, q = $PAGE_DATA.examId, S = e("plugins/ckplayer/6.7.0/player"), P = new S("#jAudio", {
        swfPlayer: $PAGE_DATA.ckplayer,
        embed: {
            width: "871",
            height: "655"
        },
        flash: {
            i: $PAGE_DATA.lessonImageUrl,
            g: $PAGE_DATA.startTime || 0,
            f: $PAGE_DATA.m3u8,
            a: $PAGE_DATA.play
        }
    }), z = !0, O = !1, D = !1;
    P.on("time", function(e) {
        if (z && e > 0) {
            z = !1;
            var t = l.extend(!0, {}, $PAGE_DATA.setPlayTimeParams, {
                playTime: e,
                duration: P.getTotalTime(),
                courseId: I,
                lessonId: $
            });
            m.get($PAGE_DATA.setPlayTime, t, function(e) {
                z = !0;
            }, function(e) {
                z = !0;
            });
        }
        if (P.getTotalTime() && e == P.getTotalTime() && 0 != P.getTotalTime() && "" != q && 0 != e && !O) {
            p.confirm("是否进入考试页面？", function() {
                p.loadUrl($PAGE_DATA.examUrl + "?examId=" + q + "?prepare&bizType=0&bizId=" + $ + "&courseId=" + I, {
                    title: "考试",
                    className: "ui-test-box",
                    fixed: !0,
                    width: l(window).width(),
                    height: l(window).height()
                });
            }, function() {}, this);
            O = !0;
        }
        if (!D && e > 60 && b.isLogin()) {
            P.pause();
            p.confirm("游客只能观看一分钟,是否前往登录？", function() {
                b.login(window.location.href);
            }, function() {}, this);
            D = !0;
        }
    });
    var F = {
        id: 0,
        pageSize: 20,
        sortType: 1,
        showType: 1,
        sourceType: 2,
        sourceId: $
    }, H = {
        id: 0,
        pageSize: 20,
        sortType: 1,
        showType: 1,
        sourceType: 2,
        sourceId: $
    };
    x.on("click", ".jSubNav", function() {
        l(this).addClass("ui-current").siblings().removeClass("ui-current");
        var e = l(this).attr("data-type");
        o(e);
    });
    var N = {
        id: $,
        type: 2,
        pageNo: 1,
        pageSize: 20
    };
    n($PAGE_DATA.dirUrl, N, "tDir", "jDir");
    C.on("change", function(e) {
        var t = e.body.find(".ui-current").attr("data-type");
        o(t);
        var i = e.body.attr("data-id");
        "1" == i && n($PAGE_DATA.dirUrl, N, "tDir", "jDir");
        w.update();
    });
    var V = l(".jPublishA"), M = l(".jPublishQ"), G = l(".jTxtNumA"), W = l(".jTxtNumQ"), U = l(".jTxtA"), B = l(".jTxtQ");
    x.on("input propertychange", ".jTxtA", function() {
        var e = l(this).val().length;
        r(e, 500, l(this), V, G);
    });
    x.on("input propertychange", ".jTxtQ", function() {
        var e = l(this).val().length;
        r(e, 500, l(this), M, W);
    });
    var K, R, X = l("#jQuesTitle");
    l(".jNoteTap").each(function() {
        "2" == l(this).attr("data-id") ? K = l(this) : "3" == l(this).attr("data-id") && (R = l(this));
    });
    var Q = l("#jAnswer"), Y = {
        sourceType: 2,
        sourceId: $,
        content: "",
        showType: 1
    };
    x.on("click", ".jPublishA", function() {
        if (b.isLogin()) {
            var e = U.val();
            Y.content = e;
            Q.is(":checked") ? Y.showType = 1 : Y.showType = 2;
            a(e, l(this), $PAGE_DATA.note.publish, Y, U, G);
        } else b.login(window.location.href);
    });
    x.on("focus", "#jQuesTitle", function() {
        X.removeClass("question-input-error");
    });
    var J = {
        sourceType: 2,
        sourceId: $,
        content: ""
    };
    x.on("click", ".jPublishQ", function() {
        if (b.isLogin()) {
            var e = X.val(), t = B.val();
            if ("" == e) {
                p.error("请输入问题标题");
                X.addClass("question-input-error");
            } else {
                J.title = e;
                J.content = t;
                a(t, l(this), $PAGE_DATA.question.publish, J, B, W);
            }
        } else b.login(window.location.href);
    });
    x.on("focus", ".jTxt", function() {
        l(this).addClass("text-focus");
        l(this).css("color", "#333");
    }).on("blur", ".jTxt", function() {
        if ("" === l(this).val()) {
            l(this).removeClass("text-focus");
            l(this).css("color", "#ccc");
        }
    });
    x.on("click", ".like", function() {
        if (b.isLogin()) {
            var e, t = l(this).find("strong"), i = parseInt(t.text()), n = l(this).attr("data-id");
            if (l(this).hasClass("activeLike")) {
                e = {
                    dataType: 4,
                    type: 1,
                    id: n
                };
                s($PAGE_DATA.note.like, e, "取消点赞");
                l(this).removeClass("activeLike");
                i - 1 >= 0 && t.text(i - 1);
            } else {
                e = {
                    dataType: 4,
                    type: 2,
                    id: n
                };
                s($PAGE_DATA.note.like, e, "点赞");
                l(this).addClass("activeLike");
                t.text(i + 1);
            }
        } else b.login(window.location.href);
    });
});