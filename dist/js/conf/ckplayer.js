/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*! Based on work by Simon Willison: http://gist.github.com/292562 */

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
        uaMatch: function(t, e, n, i, r, a, o, s, l) {
            var c = e.exec(t);
            if (null != c) return {
                b: "IE",
                v: c[2] || "0"
            };
            c = n.exec(t);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = i.exec(t);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = r.exec(t);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = a.exec(t);
            if (null != c) return {
                b: c[2] || "",
                v: c[1] || "0"
            };
            c = o.exec(t);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = s.exec(t);
            if (null != c) return {
                b: c[1] || "",
                v: c[2] || "0"
            };
            c = l.exec(t);
            return null != c ? {
                b: c[1] || "",
                v: c[2] || "0"
            } : {
                b: "unknown",
                v: "0"
            };
        },
        browser: function() {
            var t = navigator.userAgent, e = /(msie\s|trident.*rv:)([\w.]+)/, n = /(firefox)\/([\w.]+)/, i = /(opera).+version\/([\w.]+)/, r = /(chrome)\/([\w.]+)/, a = /version\/([\w.]+).*(safari)/, o = /(safari)\/([\w.]+)/, s = /(mozilla)\/([\w.]+)/, l = /(mobile)\/([\w.]+)/, c = t.toLowerCase(), u = this.uaMatch(c, e, n, i, r, a, o, s, l);
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
            var r = unescape(window.location.href).replace("file:///", ""), a = parseInt(document.location.port), o = document.location.protocol + "//" + document.location.hostname, s = "", l = "", c = "", u = 0, f = unescape(t).split("//");
            f.length > 0 && (s = f[0] + "//");
            var p = "http|https|ftp|rtsp|mms|ftp|rtmp|file", h = p.split("|");
            80 != a && a && (o += ":" + a);
            for (i = 0; i < h.length; i++) if (h[i] + "://" == s) {
                u = 1;
                break;
            }
            if (0 == u) if ("/" == t.substr(0, 1)) c = o + t; else {
                l = r.substring(0, r.lastIndexOf("/") + 1).replace("\\", "/");
                var n = t.replace("../", "./"), o = n.split("./"), _ = o.length, f = n.replace("./", ""), d = l.split("/"), v = d.length - _;
                for (i = 0; i < v; i++) c += d[i] + "/";
                c += f;
            } else c = t;
            return c;
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
                var i = t[0], r = t[1].split("/");
                r.length >= 2 && (n[0] = r[1]);
                r.length >= 3 && (n[1] = r[2]);
                this.ajax(n[0], n[1], i, function(t) {
                    var n = CKobject;
                    if (t && "error" != t) {
                        var i = "", r = t;
                        if (t.indexOf("}") > -1) {
                            for (var a = t.split("}"), o = 0; o < a.length - 1; o++) {
                                i += a[o] + "}";
                                var s = a[o].replace("{", "").split("->");
                                2 == s.length && (n._A_[s[0]] = s[1]);
                            }
                            r = a[a.length - 1];
                        }
                        n._E_.v = r.split(",");
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
            if (t) for (var r in t) i[r] = t[r];
            for (var a in i) {
                e += a + '="' + i[a] + '" ';
                n += '<param name="' + a + '" value="' + i[a] + '" />';
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
                var r = n.getElementsByTagName(i)[0];
                r && (e = r);
            }
            return e;
        },
        ajax: function(t, e, n, i) {
            var r = this.getXhr(), a = [], o = "";
            if ("get" == t) {
                o = n.indexOf("?") > -1 ? n + "&t=" + new Date().getTime() : n + "?t=" + new Date().getTime();
                r.open("get", o);
            } else {
                a = n.split("?");
                n = a[0], o = a[1];
                r.open("post", n, !0);
            }
            r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            r.setRequestHeader("charset", e);
            "post" == t ? r.send(o) : r.send(null);
            r.onreadystatechange = function() {
                if (4 == r.readyState) {
                    var t = r.responseText;
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
            } catch (r) {} else if (navigator.plugins && navigator.plugins.length > 0) {
                var n = navigator.plugins["Shockwave Flash"];
                if (n) {
                    t = !0;
                    for (var a = n.description.split(" "), o = 0; o < a.length; ++o) isNaN(parseInt(a[o])) || (e = parseInt(a[o]));
                }
            }
            return {
                f: t,
                v: e
            };
        },
        embed: function(t, e, n, i, r, a, o, s, l, c) {
            var u = [ "all" ];
            a ? this.isHTML5() ? this.embedHTML5(e, n, i, r, s, o, u, c) : this.embedSWF(t, e, n, i, r, o, l) : this.Flash().f && parseInt(this.Flash().v) > 10 ? this.embedSWF(t, e, n, i, r, o, l) : this.isHTML5() ? this.embedHTML5(e, n, i, r, s, o, u, c) : this.embedSWF(t, e, n, i, r, o, l);
        },
        embedSWF: function(t, e, n, i, r, a, o) {
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
            o.movie = t;
            o.flashvars = this.getflashvars(a);
            if (i == -1) {
                d = !0;
                this._K_(e).style.width = "100%";
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
            m && (this._K_(e).innerHTML = m);
            if (l) {
                this._K_(e).style.color = "#0066cc";
                this._K_(e).style.lineHeight = this._K_(e).style.height;
                this._K_(e).style.textAlign = "center";
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
            for (var e = t.replace(/{/g, ""), n = e.split("}"), i = "", r = 0; r < n.length; r++) if (n[r].indexOf("html5") > -1) {
                i = n[r].replace("html5->", "").split(",");
                break;
            }
            return i;
        },
        changeParams: function(t) {
            if (t) for (var e = t.replace(/{/g, ""), n = e.split("}"), i = 0; i < n.length; i++) {
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
        frontAdPause: function(t) {
            this.getNot();
        },
        frontAdUnload: function() {
            this.getNot();
        },
        changeFace: function(t) {
            this.getNot();
        },
        plugin: function(t, e, n, i, r, a, o) {
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
        if (e) for (var a, o, s, l = -1, c = {
            type: t,
            timeStamp: u()
        }; a = e[++l]; ) {
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
    function a(t) {
        var e, n = p(this);
        if (n) {
            e = n[t];
            return e.length;
        }
        return 0;
    }
    function o(t) {
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
    var c = /\s+/, u = Date.now || function() {
        return +new Date();
    }, f = function() {
        return u() * Math.random() & 65535;
    }(), p = function() {
        var t, e, n;
        return "function" == typeof WeakMap && (WeakMap.prototype || 0).set ? (t = new WeakMap(), 
        function(e, n) {
            var i = t.get(e);
            return null === n ? void 0 !== i && t["delete"](e) : !i && n ? (t.set(e, i = {}), 
            i) : i;
        }) : (e = u(), n = "__$widΦ" + e.toString(36), t = {}, function(i, r) {
            if (!i || "object" != typeof i) throw TypeError("Invalid value used as weak map key");
            var a;
            return null === r ? i[n] && (delete t[i[n]], delete i[n]) : (a = i[n] || r && (a = ++e, 
            t[a] = {}, i[n] = a), a && t[a]);
        });
    }(), h = 1, _ = 2, d = 0, v = 1, m = 2, g = function(t, e, n) {
        var i = [];
        i[d] = t;
        i[v] = e;
        i[m] = n;
        return i;
    }, y = i.prototype;
    y.addListener = function(t, e, n, i) {
        var r, a, o, s = h;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
            s = _;
        }
        if (!e) return this;
        r = p(this, 1);
        t = t.split(c);
        for (;a = t.shift(); ) {
            o = !i && r[a] || (r[a] = []);
            o.push(g(e, n, s));
        }
        return this;
    };
    y.on = y.addListener;
    y.once = function(t, e, n) {
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
    y.removeListener = function(t, e, n) {
        var i, r, a, o, l, u;
        if (e && "object" == typeof e) {
            n = e;
            e = n.handleEvent;
        }
        if (!(i = p(this))) return this;
        if (!(t || e || n)) {
            s(i, function(t, e) {
                delete i[e];
            });
            p(this, null);
            return this;
        }
        t = t ? t.split(c) : w(i);
        for (;r = t.shift(); ) {
            a = i[r];
            if (a) if (e || n) for (o = a.length; --o >= 0; ) {
                l = a[o];
                u = l[d];
                e && u !== e && (void 0 === u.guid || u.guid !== e.guid) || n && l[v] !== n || a.splice(o, 1);
            } else delete i[r];
        }
        return this;
    };
    y.un = y.removeListener;
    y.removeAllListeners = function(t) {
        return this.removeListener(t);
    };
    y.emit = function(t) {
        var e, n, i, a, o, s, l = [], u = !0;
        if (!(e = p(this))) return this;
        t = t.split(c);
        for (o = 1, s = arguments.length; o < s; o++) l[o - 1] = arguments[o];
        for (;n = t.shift(); ) {
            (i = e.all) && (i = i.slice());
            (a = e[n]) && (a = a.slice());
            "all" !== n && (u = r(n, a, l, this) && u);
            u = r(n, i, [ n ].concat(l), this) && u;
        }
        return u;
    };
    i.applyTo = function(t) {
        function e(e, i) {
            t[e] = function() {
                var r = n[e].apply(i || t, Array.prototype.slice.call(arguments));
                return r === i ? this : r;
            };
        }
        var n = y, i = w(n);
        o(t) ? l(i, function(e) {
            t.prototype[e] = n[e];
        }) : l(i, function(t) {
            e(t);
        });
    };
    i.listenerCount = function(t, e) {
        return "function" == typeof t.listenerCount ? t.listenerCount(e) : a.call(t, e);
    };
    y.listenerCount = a;
    var w = Object.keys || function(t) {
        var e = [];
        s(t, function(t, n) {
            e.push(n);
        });
        return e;
    };
    n.exports = i;
});

define("lib/core/1.0.0/utils/util", [ "require", "exports", "module" ], function(t, e, n) {
    "use strict";
    function i(t) {
        return "object" == typeof t && null !== t;
    }
    function r() {}
    function a(t, e) {
        for (var n = t.length, i = -1; ++i < n; ) e(t[i], i);
    }
    function o(t, e) {
        for (var n in t) h.call(t, n) && e(t[n], n, t);
    }
    function s(t, e) {
        if (t && t.forEach) return t.forEach(e);
        _(t) ? a(t, e) : o(t, e);
    }
    function l(t, e) {
        for (var n = -1, i = t.length, r = Array(i); ++n < i; ) r[n] = e(t[n], n, t);
        return r;
    }
    function c(t, e) {
        var n = [];
        s(t, function(t, i, r) {
            n.push(e(t, i, r));
        });
        return n;
    }
    function u(t, e) {
        if (!e || !i(e)) return t;
        for (var n = v(e), r = n.length; r--; ) t[n[r]] = e[n[r]];
        return t;
    }
    function f(t) {
        "?" === t.charAt(0) && (t = t.substr(1));
        for (var e, n = {}, i = t.split("&"), r = -1, a = i.length; ++r < a; ) {
            e = i[r].split("=");
            n[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
        }
        return n;
    }
    var p = new Function("return this")(), h = Object.prototype.hasOwnProperty, _ = Array.isArray || function(t) {
        return t && t instanceof Array;
    }, d = function() {
        var t = (+new Date()).toString(36), e = -1;
        return function(n) {
            return (n || "") + t + ++e;
        };
    }(), v = Object.keys || function(t) {
        var e = [];
        o(t, function(t, n) {
            e.push(n);
        });
        return e;
    }, m = "function" == typeof Object.create ? function(t, e) {
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
    }(), g = p.console || (p.console = {});
    a([ "log", "error", "trace", "warn", "info" ], function(t) {
        g[t] || (g[t] = r);
    });
    e.extend = function(t, e) {
        for (var n = [].slice.call(arguments, 1), i = n.length, r = -1; ++r < i; ) u(t, n[r]);
        return t;
    };
    e.inherits = function(t, e, n) {
        m(t, e);
        n && u(t.prototype, n);
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
        var n = _(t) ? l : c;
        return n(t, e);
    };
    e.filter = function(t, e) {
        var n, i, r = _(t) ? (n = a, i = function(t, e) {
            r.push(e);
        }, []) : (n = o, i = function(t, e) {
            r[t] = e;
        }, {});
        n(t, function(t, n) {
            e(t, n) && i(n, t);
        });
        return r;
    };
    e.mix = function y(t, e, n, i, r) {
        for (var a in e) e.hasOwnProperty(a) && (e[a] && t[a] && n && "object" == typeof e[a] ? y(t[a], e[a], n, i, r) : (void 0 === t[a] || i) && (r && !r(t[a], e[a]) || (t[a] = e[a])));
        return t;
    };
    e.guid = d;
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
            var i = d();
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
            var a = i || this, o = arguments, s = function() {
                r = null;
                n || t.apply(a, o);
            }, l = n && !r;
            clearTimeout(r);
            r = setTimeout(s, e);
            l && t.apply(a, o);
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

define("plugins/ckplayer/6.7.0/player", [ "require", "exports", "module", "jquery", "./ckplayer", "lib/core/1.0.0/event/emitter", "lib/core/1.0.0/utils/util" ], function(t, e, n) {
    "use strict";
    function i(t, e) {
        var n = this;
        if (void 0 === t) throw new Error("the param [selector] is required.");
        n.el = r(t);
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
        n.options = r.extend(!0, {}, i, e);
        CKobject.embedSWF(n.options.swfPlayer, n._id, n._playId, n.options.embed.width, n.options.embed.height, n.options.flash, n.options.params);
        n._init();
        n._initEvent();
    }
    var r = t("jquery");
    t("./ckplayer");
    var a = t("lib/core/1.0.0/event/emitter"), o = t("lib/core/1.0.0/utils/util");
    o.inherits(i, a);
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

define("conf/ckplayer", [ "require", "exports", "module", "jquery", "plugins/ckplayer/6.7.0/player" ], function(t, e, n) {
    "use strict";
    var i = t("jquery"), r = t("plugins/ckplayer/6.7.0/player"), a = new r("#jVideo", {
        swfPlayer: $PAGE_DATA.ckplayer,
        flash: {
            f: $PAGE_DATA.m3u8,
            a: $PAGE_DATA.play
        }
    });
    a.on("time", function(t) {
        console.log(t);
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