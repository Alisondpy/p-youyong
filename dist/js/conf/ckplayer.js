/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*! Based on work by Simon Willison: http://gist.github.com/292562 */

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
        uaMatch: function(e, t, n, i, r, a, o, s, l) {
            var c = t.exec(e);
            if (null != c) return {
                b: "IE",
                v: c[2] || "0"
            };
            c = n.exec(e);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = i.exec(e);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = r.exec(e);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = a.exec(e);
            if (null != c) return {
                b: c[2] || "",
                v: c[1] || "0"
            };
            c = o.exec(e);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = s.exec(e);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = l.exec(e);
            return null != c ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : {
                b: "unknown",
                v: "0"
            };
        },
        browser: function() {
            var e = navigator.userAgent, t = /(msie\s|trident.*rv:)([\w.]+)/, n = /(firefox)\/([\w.]+)/, i = /(opera).+version\/([\w.]+)/, r = /(chrome)\/([\w.]+)/, a = /version\/([\w.]+).*(safari)/, o = /(safari)\/([\w.]+)/, s = /(mozilla)\/([\w.]+)/, l = /(mobile)\/([\w.]+)/, c = e.toLowerCase(), u = this.uaMatch(c, t, n, i, r, a, o, s, l);
            if (u.b) {
                b = u.b;
                v = u.v;
            }
            return {
                B: b,
                V: v
            };
        },
        Platform: function() {
            var e = "", t = navigator.userAgent, n = (navigator.appVersion, {
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
            for (var i in n) if (n[i]) {
                e = i;
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
            if (t && t.length > 1) for (var n = 0; n < t.length; n++) {
                var i = t[n].split("->");
                i.length >= 1 && "" != i[0] && (e += '<source src="' + i[0] + '"');
                i.length >= 2 && "" != i[1] && (e += ' type="' + i[1] + '"');
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
            var r = unescape(window.location.href).replace("file:///", ""), a = parseInt(document.location.port), o = document.location.protocol + "//" + document.location.hostname, s = "", l = "", c = "", u = 0, f = unescape(e).split("//");
            f.length > 0 && (s = f[0] + "//");
            var p = "http|https|ftp|rtsp|mms|ftp|rtmp|file", h = p.split("|");
            80 != a && a && (o += ":" + a);
            for (i = 0; i < h.length; i++) if (h[i] + "://" == s) {
                u = 1;
                break;
            }
            if (0 == u) if ("/" == e.substr(0, 1)) c = o + e; else {
                l = r.substring(0, r.lastIndexOf("/") + 1).replace("\\", "/");
                var n = e.replace("../", "./"), o = n.split("./"), _ = o.length, f = n.replace("./", ""), d = l.split("/"), v = d.length - _;
                for (i = 0; i < v; i++) c += d[i] + "/";
                c += f;
            } else c = e;
            return c;
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
            var n = [ "get", "utf-8" ];
            if (e && 2 == e.length) {
                var i = e[0], r = e[1].split("/");
                r.length >= 2 && (n[0] = r[1]);
                r.length >= 3 && (n[1] = r[2]);
                this.ajax(n[0], n[1], i, function(e) {
                    var n = CKobject;
                    if (e && "error" != e) {
                        var i = "", r = e;
                        if (e.indexOf("}") > -1) {
                            for (var a = e.split("}"), o = 0; o < a.length - 1; o++) {
                                i += a[o] + "}";
                                var s = a[o].replace("{", "").split("->");
                                2 == s.length && (n._A_[s[0]] = s[1]);
                            }
                            r = a[a.length - 1];
                        }
                        n._E_.v = r.split(",");
                        if (t) n.showHtml5(); else {
                            n.changeParams(i);
                            n.newAdr();
                        }
                    }
                });
            }
        },
        getflashvars: function(e) {
            var t = "", n = 0;
            if (e) for (var i in e) {
                n > 0 && (t += "&");
                if ("f" == i && e[i] && !this.getSn("pm_repc", -1)) {
                    e[i] = this.getpath(e[i]);
                    e[i].indexOf("&") > -1 && (e[i] = encodeURIComponent(e[i]));
                }
                "y" == i && e[i] && (e[i] = this.getpath(e[i]));
                t += i + "=" + e[i];
                n++;
            }
            return t;
        },
        getparam: function(e) {
            var t = "", n = "", i = {
                allowScriptAccess: "always",
                allowFullScreen: !0,
                quality: "high",
                bgcolor: "#000"
            };
            if (e) for (var r in e) i[r] = e[r];
            for (var a in i) {
                t += a + '="' + i[a] + '" ';
                n += '<param name="' + a + '" value="' + i[a] + '" />';
            }
            t = t.replace("movie=", "src=");
            return {
                w: t,
                v: n
            };
        },
        getObjectById: function(e) {
            if (this._T_) return this;
            var t = null, n = this._K_(e), i = "embed";
            if (n && "OBJECT" == n.nodeName) if ("undefined" != typeof n.SetVariable) t = n; else {
                var r = n.getElementsByTagName(i)[0];
                r && (t = r);
            }
            return t;
        },
        ajax: function(e, t, n, i) {
            var r = this.getXhr(), a = [], o = "";
            if ("get" == e) {
                o = n.indexOf("?") > -1 ? n + "&t=" + new Date().getTime() : n + "?t=" + new Date().getTime();
                r.open("get", o);
            } else {
                a = n.split("?");
                n = a[0], o = a[1];
                r.open("post", n, !0);
            }
            r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            r.setRequestHeader("charset", t);
            "post" == e ? r.send(o) : r.send(null);
            r.onreadystatechange = function() {
                if (4 == r.readyState) {
                    var e = r.responseText;
                    i("" != e ? e : null);
                }
            };
        },
        addListener: function(e, t) {
            var n = CKobject._V_;
            if (n.addEventListener) try {
                n.addEventListener(e, t, !1);
            } catch (e) {
                this.getNot();
            } else if (n.attachEvent) try {
                n.attachEvent("on" + e, t);
            } catch (e) {
                this.getNot();
            } else n["on" + e] = t;
        },
        removeListener: function(e, t) {
            var n = CKobject._V_;
            if (n.removeEventListener) try {
                n.removeEventListener(e, t, !1);
            } catch (e) {
                this.getNot();
            } else if (n.detachEvent) try {
                n.detachEvent("on" + e, t);
            } catch (e) {
                this.getNot();
            } else n["on" + e] = null;
        },
        Flash: function() {
            var e = !1, t = 0;
            if (document.all || this.browser().B.toLowerCase().indexOf("ie") > -1) try {
                var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                e = !0;
                var i = n.GetVariable("$version");
                t = parseInt(i.split(" ")[1].split(",")[0]);
            } catch (r) {} else if (navigator.plugins && navigator.plugins.length > 0) {
                var n = navigator.plugins["Shockwave Flash"];
                if (n) {
                    e = !0;
                    for (var a = n.description.split(" "), o = 0; o < a.length; ++o) isNaN(parseInt(a[o])) || (t = parseInt(a[o]));
                }
            }
            return {
                f: e,
                v: t
            };
        },
        embed: function(e, t, n, i, r, a, o, s, l, c) {
            var u = [ "all" ];
            a ? this.isHTML5() ? this.embedHTML5(t, n, i, r, s, o, u, c) : this.embedSWF(e, t, n, i, r, o, l) : this.Flash().f && parseInt(this.Flash().v) > 10 ? this.embedSWF(e, t, n, i, r, o, l) : this.isHTML5() ? this.embedHTML5(t, n, i, r, s, o, u, c) : this.embedSWF(e, t, n, i, r, o, l);
        },
        embedSWF: function(e, t, n, i, r, a, o) {
            n || (n = "ckplayer_a1");
            o || (o = {
                bgcolor: "#FFF",
                allowFullScreen: !0,
                allowScriptAccess: "always",
                wmode: "transparent"
            });
            this._A_ = a;
            this.getX();
            var s = "undefined", l = !1, c = document, u = "http://www.macromedia.com/go/getflashplayer", f = '<a href="' + u + '" target="_blank">请点击此处下载安装最新的flash插件</a>', p = {
                w: "您的网页不符合w3c标准，无法显示播放器",
                f: "您没有安装flash插件，无法播放视频，" + f,
                v: "您的flash插件版本过低，无法播放视频，" + f
            }, h = typeof c.getElementById != s && typeof c.getElementsByTagName != s && typeof c.createElement != s, _ = 'id="' + n + '" name="' + n + '" ', v = "", m = "";
            o.movie = e;
            o.flashvars = this.getflashvars(a);
            if (i == -1) {
                d = !0;
                this._K_(t).style.width = "100%";
                i = "100%";
            }
            v += '<object pluginspage="http://www.macromedia.com/go/getflashplayer" ';
            v += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
            v += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,3,0,0" ';
            v += 'width="' + i + '" ';
            v += 'height="' + r + '" ';
            v += _;
            v += 'align="middle">';
            v += this.getparam(o).v;
            v += "<embed ";
            v += this.getparam(o).w;
            v += ' width="' + i + '" height="' + r + '" name="' + n + '" id="' + n + '" align="middle" ' + _;
            v += 'type="application/x-shockwave-flash" pluginspage="' + u + '" />';
            v += "</object>";
            if (h) if (this.Flash().f) if (this.Flash().v < 11) {
                m = p.v;
                l = !0;
            } else {
                m = v;
                this._T_ = !1;
            } else {
                m = p.f;
                l = !0;
            } else {
                m = p.w;
                l = !0;
            }
            m && (this._K_(t).innerHTML = m);
            if (l) {
                this._K_(t).style.color = "#0066cc";
                this._K_(t).style.lineHeight = this._K_(t).style.height;
                this._K_(t).style.textAlign = "center";
            }
        },
        embedHTML5: function(e, i, r, o, l, c, u, p) {
            this._E_ = {
                c: e,
                p: i,
                w: r,
                h: o,
                v: l,
                s: u,
                j: !(void 0 != p && !p)
            };
            this._A_ = c;
            this.getX();
            b = this.browser().B, v = this.browser().V, x = v.split("."), t = x[0], m = b + v, 
            n = b + t, w = "", s = !1, f = this.Flash().f, a = !1;
            u || (u = [ "iPad", "iPhone", "ios" ]);
            for (var h = 0; h < u.length; h++) {
                w = u[h];
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
                    var _ = l[0].split("->");
                    if (_ && 2 == _.length && _[1].indexOf("ajax") > -1) {
                        this.getUrl(_, !0);
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
                    var n = t[0].split("->");
                    if (n && 2 == n.length && n[1].indexOf("ajax") > -1) {
                        this.getUrl(n, !1);
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
            for (var t = e.replace(/{/g, ""), n = t.split("}"), i = "", r = 0; r < n.length; r++) if (n[r].indexOf("html5") > -1) {
                i = n[r].replace("html5->", "").split(",");
                break;
            }
            return i;
        },
        changeParams: function(e) {
            if (e) for (var t = e.replace(/{/g, ""), n = t.split("}"), i = 0; i < n.length; i++) {
                var r = n[i].split("->");
                if (2 == r.length) switch (r[0]) {
                  case "p":
                    if (1 == parseInt(r[1])) this._V_.autoplay = !0; else if (2 == parseInt(r[1])) this._V_.preload = "metadata"; else {
                        this._V_.autoplay = !1;
                        if (null != this._I_) {
                            clearInterval(this._I_);
                            this._I_ = null;
                        }
                    }
                    break;

                  case "e":
                    1 == parseInt(r[1]) ? this._V_.loop = !0 : this._V_.loop = !1;
                    break;

                  case "i":
                    this._V_.poster = r[1];
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
        plugin: function(e, t, n, i, r, a, o) {
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
        videoWHXY: function(e, t, n, i) {
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
                        var n = parseInt(e._A_[t]);
                        e.videoSeek(n);
                    }
                }
                if (!e._Y_) {
                    e._Y_ = !0;
                    for (var t in e._A_) if ("j" == t && e._A_[t]) {
                        var i = parseInt(e._A_[t]);
                        i > 0 ? e._J_ = i : e._J_ = parseInt(e._O_.totaltime) + i;
                    }
                }
            }
        },
        html5Click: function() {
            var e = CKobject;
            "" != e.getVars("m") && null != e.getVars("m") && window.open(e.getVars("m"));
        },
        returnStatus: function(e, t) {
            var n = e;
            3 == this._H_ && (n = this._E_.p + "->" + n);
            this._M_ && t <= this._H_ && this._L_(n);
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
    function r(e, t, n, i) {
        var r = !0;
        if (t) for (var a, o, s, l = -1, c = {
            type: e,
            timeStamp: u()
        }; a = t[++l]; ) {
            o = a[d];
            s = a[v] || i;
            try {
                r = a[m] === _ ? o.call(s, c, n) !== !1 && r : o.apply(s, n) !== !1 && r;
            } catch (f) {
                setTimeout(function() {
                    console.error(f);
                }, 1);
            }
        }
        return r;
    }
    function a(e) {
        var t, n = p(this);
        if (n) {
            t = n[e];
            return t.length;
        }
        return 0;
    }
    function o(e) {
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
    var c = /\s+/, u = Date.now || function() {
        return +new Date();
    }, f = function() {
        return u() * Math.random() & 65535;
    }(), p = function() {
        var e, t, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (e = new WeakMap(), 
        function(t, n) {
            var i = e.get(t);
            return null === n ? void 0 !== i && e["delete"](t) : !i && n ? (e.set(t, i = {}), 
            i) : i;
        }) : (t = u(), n = "__$widΦ" + t.toString(36), e = {}, function(i, r) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var a;
            return null === r ? i[n] && (delete e[i[n]], delete i[n]) : (a = i[n] || r && (a = ++t, 
            e[a] = {}, i[n] = a), a && e[a]);
        });
    }(), h = 1, _ = 2, d = 0, v = 1, m = 2, g = function(e, t, n) {
        var i = [];
        i[d] = e;
        i[v] = t;
        i[m] = n;
        return i;
    }, y = i.prototype;
    y.addListener = function(e, t, n, i) {
        var r, a, o, s = h;
        if (t && "object" == typeof t) {
            n = t;
            t = n.handleEvent;
            s = _;
        }
        if (!t) return this;
        r = p(this, 1);
        e = e.split(c);
        for (;a = e.shift(); ) {
            o = !i && r[a] || (r[a] = []);
            o.push(g(t, n, s));
        }
        return this;
    };
    y.on = y.addListener;
    y.once = function(e, t, n) {
        var i = !1, r = function() {
            this.removeListener(e, r);
            if (!i) {
                i = !0;
                t.apply(n || this, arguments);
            }
        };
        r.guid = t.guid || (t.guid = f++);
        return this.on(e, r);
    };
    y.removeListener = function(e, t, n) {
        var i, r, a, o, l, u;
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
        e = e ? e.split(c) : w(i);
        for (;r = e.shift(); ) {
            a = i[r];
            if (a) if (t || n) for (o = a.length; --o >= 0; ) {
                l = a[o];
                u = l[d];
                t && u !== t && (void 0 === u.guid || u.guid !== t.guid) || n && l[v] !== n || a.splice(o, 1);
            } else delete i[r];
        }
        return this;
    };
    y.un = y.removeListener;
    y.removeAllListeners = function(e) {
        return this.removeListener(e);
    };
    y.emit = function(e) {
        var t, n, i, a, o, s, l = [], u = !0;
        if (!(t = p(this))) return this;
        e = e.split(c);
        for (o = 1, s = arguments.length; o < s; o++) l[o - 1] = arguments[o];
        for (;n = e.shift(); ) {
            (i = t.all) && (i = i.slice());
            (a = t[n]) && (a = a.slice());
            "all" !== n && (u = r(n, a, l, this) && u);
            u = r(n, i, [ n ].concat(l), this) && u;
        }
        return u;
    };
    i.applyTo = function(e) {
        function t(t, i) {
            e[t] = function() {
                var r = n[t].apply(i || e, Array.prototype.slice.call(arguments));
                return r === i ? this : r;
            };
        }
        var n = y, i = w(n);
        o(e) ? l(i, function(t) {
            e.prototype[t] = n[t];
        }) : l(i, function(e) {
            t(e);
        });
    };
    i.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : a.call(e, t);
    };
    y.listenerCount = a;
    var w = Object.keys || function(e) {
        var t = [];
        s(e, function(e, n) {
            t.push(n);
        });
        return t;
    };
    n.exports = i;
});

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(e, t, n) {
    "use strict";
    function i(e) {
        return "object" == typeof e && null !== e;
    }
    function r() {}
    function a(e, t) {
        for (var n = e.length, i = -1; ++i < n; ) t(e[i], i);
    }
    function o(e, t) {
        for (var n in e) h.call(e, n) && t(e[n], n, e);
    }
    function s(e, t) {
        if (e && e.forEach) return e.forEach(t);
        _(e) ? a(e, t) : o(e, t);
    }
    function l(e, t) {
        for (var n = -1, i = e.length, r = Array(i); ++n < i; ) r[n] = t(e[n], n, e);
        return r;
    }
    function c(e, t) {
        var n = [];
        s(e, function(e, i, r) {
            n.push(t(e, i, r));
        });
        return n;
    }
    function u(e, t) {
        if (!t || !i(t)) return e;
        for (var n = v(t), r = n.length; r--; ) e[n[r]] = t[n[r]];
        return e;
    }
    function f(e) {
        "?" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = {}, i = e.split("&"), r = -1, a = i.length; ++r < a; ) {
            t = i[r].split("=");
            n[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
        }
        return n;
    }
    var p = new Function("return this")(), h = Object.prototype.hasOwnProperty, _ = Array.isArray || function(e) {
        return e && e instanceof Array;
    }, d = function() {
        var e = (+new Date()).toString(36), t = -1;
        return function(n) {
            return (n || "") + e + ++t;
        };
    }(), v = Object.keys || function(e) {
        var t = [];
        o(e, function(e, n) {
            t.push(n);
        });
        return t;
    }, m = "function" == typeof Object.create ? function(e, t) {
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
    a([ "log", "error", "trace", "warn", "info" ], function(e) {
        g[e] || (g[e] = r);
    });
    t.extend = function(e, t) {
        for (var n = [].slice.call(arguments, 1), i = n.length, r = -1; ++r < i; ) u(e, n[r]);
        return e;
    };
    t.inherits = function(e, t, n) {
        m(e, t);
        n && u(e.prototype, n);
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
        var n = _(e) ? l : c;
        return n(e, t);
    };
    t.filter = function(e, t) {
        var n, i, r = _(e) ? (n = a, i = function(e, t) {
            r.push(t);
        }, []) : (n = o, i = function(e, t) {
            r[e] = t;
        }, {});
        n(e, function(e, n) {
            t(e, n) && i(n, e);
        });
        return r;
    };
    t.mix = function y(e, t, n, i, r) {
        for (var a in t) t.hasOwnProperty(a) && (t[a] && e[a] && n && "object" == typeof t[a] ? y(e[a], t[a], n, i, r) : (void 0 === e[a] || i) && (r && !r(e[a], t[a]) || (e[a] = t[a])));
        return e;
    };
    t.guid = d;
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
            var i = d();
            p.addEventListener("message", n, !0);
            t(i, "*");
        } : function(e) {
            p.setTimeout(e, 0);
        };
    }();
    t.noop = r;
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
        var r;
        return function() {
            var a = i || this, o = arguments, s = function() {
                r = null;
                n || e.apply(a, o);
            }, l = n && !r;
            clearTimeout(r);
            r = setTimeout(s, t);
            l && e.apply(a, o);
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

define("plugins/ckplayer/6.7.0/player", [ "require", "exports", "module", "jquery", "./ckplayer", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(e, t, n) {
    "use strict";
    function i(e, t) {
        var n = this;
        if (void 0 === e) throw new Error("the param [selector] is required.");
        n.el = r(e);
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
        n.options = r.extend(!0, {}, i, t);
        CKobject.embedSWF(n.options.swfPlayer, n._id, n._playId, n.options.embed.width, n.options.embed.height, n.options.flash, n.options.params);
        n._init();
        n._initEvent();
    }
    var r = e("jquery");
    e("./ckplayer");
    var a = e("lib/core/1.0.0/event/emitter"), o = e("lib/core/1.0.0/utils/util");
    o.inherits(i, a);
    i.prototype._init = function() {
        var e = this;
        e.CKobject = CKobject;
        e.player = e.get();
        e._embed = e.el.find("embed");
    };
    i.prototype._initEvent = function() {
        var e = this;
        e.options.interval > 0 && setInterval(function() {
            e.emit("time", e.getStatus().time);
        }, e.options.interval);
    };
    i.prototype.play = function() {
        var e = this;
        e.player && e.player.videoPlay();
    };
    i.prototype.playOrPause = function() {
        var e = this;
        e.player && e.player.playOrPause();
    };
    i.prototype.pause = function() {
        var e = this;
        e.player && e.player.videoPause();
    };
    i.prototype.jump = function(e) {
        var t = this;
        e >= 0 && t.player && t.player.videoSeek(e);
    };
    i.prototype.go = function(e) {
        if (void 0 === e) throw new Error("this params [url] is require.");
        var t = this;
        t.options.flash.f = e;
        t.player && t.player.newAddress(t.options.flash);
    };
    i.prototype.volume = function(e) {
        var t = this;
        0 <= e && e <= 100 && t.player && t.player.changeVolume(e);
    };
    i.prototype.width = function(e) {
        var t = this;
        t._embed && t._embed.width(e || t.options.embed.width);
    };
    i.prototype.height = function(e) {
        var t = this;
        t._embed && t._embed.width(e || t.options.embed.height);
    };
    i.prototype.getTotalTime = function() {
        var e = this;
        return e.player ? e.player.getStatus().totalTime : 0;
    };
    i.prototype.getCurrentTime = function() {
        var e = this;
        return e.player ? e.player.getStatus().time : 0;
    };
    i.prototype.getStatus = function() {
        var e = this;
        return e.player ? e.player.getStatus() : {};
    };
    i.prototype.get = function() {
        var e = this;
        return e.CKobject.getObjectById(e._playId);
    };
    n.exports = i;
});

define("conf/ckplayer", [ "require", "exports", "module", "jquery", "plugins/ckplayer/6.7.0/player" ], function(e, t, n) {
    "use strict";
    var i = e("jquery"), r = e("plugins/ckplayer/6.7.0/player"), a = new r("#jVideo", {
        swfPlayer: $PAGE_DATA.ckplayer,
        flash: {
            f: $PAGE_DATA.m3u8,
            a: $PAGE_DATA.play
        }
    });
    a.on("time", function(e) {
        console.log(e);
    });
    i(".start").on("click", function() {
        a.play();
    });
    i(".pause").on("click", function() {
        a.pause();
    });
    i(".next").on("click", function() {
        a.go1("http://n03.wbc.zhongzhihui.com/data/client/courseware/50286/2015/7/2015-07-17/ba150a05e1abf0b12e0fa70bf324c48e/t/playlist.m3u8");
        a.play();
    });
    i(".time").on("click", function() {
        a.time();
    });
    i(".continue").on("click", function() {
        a.jump(1e3);
    });
    i(".resize").on("click", function() {
        a.width(1600);
        a.height(900);
    });
});