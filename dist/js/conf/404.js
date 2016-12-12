/*! Based on work by Simon Willison: http://gist.github.com/292562 */

define("lib/core/1.0.0/utils/util",["require","exports","module"],function(t,e,n){"use strict";function o(t){return"object"==typeof t&&null!==t}function r(){}function i(t,e){for(var n=t.length,o=-1;++o<n;)e(t[o],o)}function u(t,e){for(var n in t)d.call(t,n)&&e(t[n],n,t)}function a(t,e){return t&&t.forEach?t.forEach(e):void(h(t)?i(t,e):u(t,e))}function s(t,e){for(var n=-1,o=t.length,r=Array(o);++n<o;)r[n]=e(t[n],n,t);return r}function l(t,e){var n=[];return a(t,function(t,o,r){n.push(e(t,o,r))}),n}function c(t,e){if(!e||!o(e))return t;for(var n=m(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}function f(t){"?"===t.charAt(0)&&(t=t.substr(1));for(var e,n={},o=t.split("&"),r=-1,i=o.length;++r<i;)e=o[r].split("="),n[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return n}var p=new Function("return this")(),d=Object.prototype.hasOwnProperty,h=Array.isArray||function(t){return t&&t instanceof Array},v=function(){var t=(+new Date).toString(36),e=-1;return function(n){return(n||"")+t+ ++e}}(),m=Object.keys||function(t){var e=[];return u(t,function(t,n){e.push(n)}),e},g="function"==typeof Object.create?function(t,e){t.__super__=e.prototype,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(){function t(t){this.constructor=t}return function(e,n){e.__super__=n.prototype,t.prototype=n.prototype,e.prototype=new t(e)}}(),y=p.console||(p.console={});i(["log","error","trace","warn","info"],function(t){y[t]||(y[t]=r)}),e.extend=function(t,e){for(var n=[].slice.call(arguments,1),o=n.length,r=-1;++r<o;)c(t,n[r]);return t},e.inherits=function(t,e,n){g(t,e),n&&c(t.prototype,n)},e.impls=function(t,n){return n="function"==typeof n?n.prototype:n,e.mix(t.prototype,n),t},e.parseQuery=f,e.parseParams=f,e.each=a,e.map=function(t,e){var n=h(t)?s:l;return n(t,e)},e.filter=function(t,e){var n,o,r=h(t)?(n=i,o=function(t,e){r.push(e)},[]):(n=u,o=function(t,e){r[t]=e},{});return n(t,function(t,n){e(t,n)&&o(n,t)}),r},e.mix=function t(e,n,o,r,i){for(var u in n)n.hasOwnProperty(u)&&(n[u]&&e[u]&&o&&"object"==typeof n[u]?t(e[u],n[u],o,r,i):(void 0===e[u]||r)&&(i&&!i(e[u],n[u])||(e[u]=n[u])));return e},e.guid=v,e.setImmediate=function(){var t=p.document,e=p.postMessage,n=p.setImmediate;return n?n:"onreadystatechange"in t.createElement("script")?function(e){function n(){o.onreadystatechange=null,o.parentNode.removeChild(o),e()}var o=t.createElement("script");o.onreadystatechange=n,t.documentElement.appendChild(o)}:e?function(t){function n(e){e.data===o&&(p.removeEventListener("message",n,!0),t())}var o=v();p.addEventListener("message",n,!0),e(o,"*")}:function(t){p.setTimeout(t,0)}}(),e.noop=r,e.throttle=function(t,e){if(e=e?e:150,e===-1)return function(){t.apply(this,arguments)};var n;return function(){var o=+new Date;(!n||o-n>e)&&(n=o,t.apply(this,arguments))}},e.debounce=function(t,e,n,o){var r;return function(){var i=o||this,u=arguments,a=function(){r=null,n||t.apply(i,u)},s=n&&!r;clearTimeout(r),r=setTimeout(a,e),s&&t.apply(i,u)}},e.deprecate=function(t,e){function n(){return o||(o=!0),t.apply(this,arguments)}if(p.noDeprecation===!0)return t;var o=!1;return n}}),define("lib/core/1.0.0/dom/dataset",["require","exports","module","jquery"],function(t,e,n){"use strict";function o(t){return t.replace(a,"ms-").replace(s,l)}function r(t){try{return"true"===t||"false"!==t&&("null"===t?null:+t+""===t?+t:c.test(t)?u.parseJSON(t):t)}catch(t){}}function i(t,e,n){var o;return void 0===n&&1===t.nodeType&&(o="data-"+e.replace(f,"-$&").toLowerCase(),n=t.getAttribute(o),"string"!=typeof n&&(n=void 0)),n}var u=(window.document,t("jquery")),a=/^-ms-/,s=/-([\da-z])/gi,l=function(t,e){return e.toUpperCase()},c=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,f=/[A-Z]/g,p=function(t,e,n){if(!t||1!==t.nodeType)throw new TypeError("dataset(): Not a valid DOM element.");var u,a,s,l;if(1===arguments.length){if(s=t.dataset){l={};for(a in s)s.hasOwnProperty(a)&&(l[a]=r(s[a]));return l}for(s=t.attributes,u=s.length,l={};u--;)s[u]&&(a=s[u].name,0===a.indexOf("data-")&&(a=o(a.slice(5)),l[a]=r(i(t,a))));return l}};n.exports=p}),define("lib/core/1.0.0/dom/build",["require","exports","module","jquery","./dataset"],function(t,e,n){"use strict";function o(t,e,n,o){o?t[e]||(t[e]=n):t[e]?t[e]=t[e].add(n):t[e]=i(n)}var r=window.document,i=t("jquery"),u=function(t,e,n){var u,a,s,l,c,f=function(t){if(n)for(var r in n)s[r]=i(n[r].toString(),t);else{s={},l=i("[node-type]",t);for(var u,a=-1,c=l.length;++a<c;)u=l[a],r=u.getAttribute("node-type"),o(s,r,u,e)}},p=function(t){var n,r=s[t];return r&&0!==r.length||(n=i('[node-type="'+t+'"]',u),n.length&&o(s,t,n,e),r=s[t]),r};if(void 0===e&&(e=!0),u=t,"string"==typeof t&&"<"===t.charAt(0))for(u=r.createElement("div"),u.innerHTML=t,a=r.createDocumentFragment();c=u.firsChild;)a.appendChild(c);else u=i(t),a=u[0];return f(u),{get:p,box:a,list:s}};e.build=u,e.parse=function(t,e,n){if("object"==typeof t&&t.length>0&&(t=t[0]),!t||1!==t.nodeType)throw TypeError("parse error, not a valid html element");return"boolean"==typeof n&&(e=n,n=null),u(t,e,n).list},e.dataset=t("./dataset")}),define("module/top-search/1.0.0/top-search",["require","exports","module","jquery","lib/core/1.0.0/utils/util","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function o(t){var e=this,n={activeClass:"focus",selector:"#jTopSearch",url:$PAGE_DATA&&$PAGE_DATA.topSearchUrl||"",data:{},alias:"name"};if(e.options=r.extend(!0,{},n,t),""==e.options.url)throw new Error("the params options.url is required");e.el=r(e.options.selector);var o=i.build(e.el[0],!1);e.ipt=o.get("ipt"),e.btn=o.get("btn"),e.lbl=o.get("lbl"),e._init(),e._initEvent()}var r=t("jquery"),i=(t("lib/core/1.0.0/utils/util"),t("lib/core/1.0.0/dom/build"));o.prototype._initEvent=function(){var t=this;t.ipt.on("focus",function(){t.focus()}),t.ipt.on("blur",function(){0==t.getValue().length&&t.blur()}),t.ipt.on("keydown",function(e){13===e.keyCode&&t.search()}),t.btn.on("click",function(){t.search()})},o.prototype._init=function(){var t=this,e=r.trim(t.ipt.val()),n=t.ipt.attr("data-id");e.length>0&&t.focus(),n&&(t.options.alias=n),t.options.data&&(t.options.data[t.options.alias]=r.trim(t.ipt.val()))},o.prototype.focus=function(){var t=this;t.el.addClass(t.options.activeClass)},o.prototype.blur=function(){var t=this;t.el.removeClass(t.options.activeClass)},o.prototype.getValue=function(){var t=this;return r.trim(t.ipt.val())},o.prototype.search=function(){var t=this;t.options.data[t.options.alias]=t.getValue(),window.location.href=t.options.url+"?"+t._getUrlString()},o.prototype._getUrlString=function(){var t=this,e="",n=0;for(var o in t.options.data)e+=0==n?o+"="+encodeURIComponent(t.options.data[o]):"&"+o+"="+encodeURIComponent(t.options.data[o]),n++;return e},n.exports=o}),define("lib/core/1.0.0/io/cookie",["require","exports","module"],function(t,e,n){"use strict";var o=window.document,r=function(t){if("string"!=typeof t)throw"trim need a string as parameter";for(var e=t.length,n=0,o=e-1,r=/(\u3000|\s|\t|\u00A0)/;n<e&&r.test(t.charAt(n));)++n;for(;o>=0&&r.test(t.charAt(o));)--o;return t.substring(n,o+1)},i=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},u=function(t,e,n){if(n=n||{},void 0!==e){if(n=i(n),null===e&&(e="",n.expires=-1),"number"==typeof n.expires){var u=n.expires,a=n.expires=new Date;a.setTime(a.getTime()+864e5*u)}var s=function(t){try{return n.raw?t:encodeURIComponent(t)}catch(t){}return t};return o.cookie=[s(t),"=",s(e),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}for(var e=null,l=o.cookie,c=function(t){return n.raw?t:decodeURIComponent(t)},f=l?l.split("; "):[],p=-1,d=f.length,h=t.length+1;++p<d;)if(l=r(f[p]),l.substring(0,h)===t+"="){e=c(l.substring(h));break}return e};u.set=function(t,e,n){return u(t,e,n)},u.get=function(t){return u(t)},n.exports=u}),define("module/login-status/1.0.0/login",["require","exports","module","lib/core/1.0.0/io/cookie"],function(t,e,n){"use strict";var o=t("lib/core/1.0.0/io/cookie"),r="_nick",i="_ui_",u=$PAGE_DATA&&$PAGE_DATA.LOGIN_URL||"",a=$PAGE_DATA&&$PAGE_DATA[r]||null;e.getNick=function(){return a},e.isLogin=function(){return!!o(i)},e.login=function(t){u&&(t=t?"?returnUrl="+decodeURIComponent(t):"",window.location.href=u+t)}}),define("module/login-status/1.0.0/login-status",["require","exports","module","jquery","lib/core/1.0.0/dom/build","./login"],function(t,e,n){"use strict";function o(t){var e=this,n={selector:"#jLoginStatus",userCenterUrl:$PAGE_DATA&&$PAGE_DATA.userCenterUrl||"javascript:;",loginOutUrl:$PAGE_DATA&&$PAGE_DATA.loginOutUrl||"javascript:;",menuList:[{title:"编辑资料",url:$PAGE_DATA&&$PAGE_DATA.editUserInfoUrl||"javascript:;"},{title:"学习中心",url:$PAGE_DATA&&$PAGE_DATA.learningCenterUrl||"javascript:;"}]};e.options=r.extend(!0,{},n,t),e.el=r(e.options.selector),e._init()}var r=t("jquery"),i=t("lib/core/1.0.0/dom/build"),u=t("./login");o.prototype._init=function(){var t=this,e=u.getNick();e&&(t.el.html(t._getLoginedHtml(e)),t._initEvent())},o.prototype._initEvent=function(){var t=this,e=!1,n=i.build(t.el[0],!1),o=n.get("userName"),r=n.get("tipsMenu");o.on("mouseenter",function(){e=!0,r.stop().fadeIn(500,function(){r.addClass("active")})}),o.on("mouseleave",function(){e=!1,setTimeout(function(){e||r.stop().fadeOut(500,function(){r.removeClass("active")})},200)}),r.on("mouseenter",function(){e=!0}),r.on("mouseleave",function(){e=!1,r.removeClass("active")})},o.prototype._getLoginedHtml=function(t){var e=this,n=e.options,o=n.menuList,r="";r+='<ul class="logined clearfix" node-type="logined">',r+='    <li class="item">',r+="        <span>您好，</span>",r+="    </li>",r+='    <li class="item tips-menu-box">',r+='        <a href="'+n.userCenterUrl+'" class="user-name txt-overflow" node-type="userName">'+t+"</a>",r+='        <div class="tips-menu" node-type="tipsMenu">',r+='            <div class="arrow"><i></i><b></b></div>',r+='            <ul class="tips-menu-list">';for(var i=0,u=o.length;i<u;i++)r+='            <li class="tips-menu-item"><a href="'+o[i].url+'">'+o[i].title+"</a></li>";return r+="            </ul>",r+="        </div>",r+="    </li>",r+='    <li class="item">',r+='        <a href="'+n.loginOutUrl+'" class="btn">退出</a>',r+="    </li>",r+="</ul>"},n.exports=o}),function(t,e,n){"function"==typeof define&&define.amd?define("lib/plugins/lazyload/1.9.3/lazyload",["jquery"],n):t[e]=n(t.jQuery||t.Zepto)}(this,"Lazyload",function(t,e){"use strict";if(!t)throw"Error: jquery api not implements.";var n=t.each,o=function(t,e){if(t instanceof Array&&t.filter)return t.filter(e);for(var n=[],o=-1,r=t.length;++o<r;)e(t[o],o)&&n.push(t[o]);return n},r=function(t,e,n,o){var r;return function(){var i=o||this,u=arguments,a=function(){r=null,n||t.apply(i,u)},s=n&&!r;clearTimeout(r),r=setTimeout(a,e),s&&t.apply(i,u)}},i=function(e,n){e=e||{};var o=t(e),r=Array.prototype.slice;return n=n||e.name,t.each({on:"on",un:"off",once:"one",emit:"trigger"},function(t,i){e[t]=function(e){var u=r.call(arguments,0),a=u[1];return n&&!~e.indexOf(".")&&(u[0]=e+"."+n),"function"==typeof a&&("on"===t||"once"===t?u[1]=a.__||(a.__=function(t){return t.preventDefault(),a.apply(this,r.call(arguments,1))}):"un"===t&&(u[1]=a.__)),o[i].apply(o,u)}}),e},u=window,a=t(u),s=u.Image,l=/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion),c="__lazy_status__",f=0,p=1,d=2,h=function(t){return t[c]===e},v=function(){var t={},e=function(e,n){"function"==typeof n&&(t[e]=n)},n=function(e){return t[e]};return{define:e,get:n}}();v.define("image",function(n,o,r,i){if(!o)return void i("error");var u=new s,a=function(){u.onload=u.onerror=null,u=o=n=i=a=e};u.onload=function(){var e=t(n),u=r.effect;"function"!=typeof e[u]&&(u="show"),e.hide(),"IMG"===n.nodeName.toUpperCase()?e.attr("src",o):e.css("background-image",'url("'+o+'")'),e[u](r.effectSpeed),i(null,"load"),a()},u.onerror=function(t){i(t),a()},u.src=o}),v.define("html",function(t,e,n,o){o()});var m=function(e,s){s=s||{},e=t(e);var m=this,_={type:"image",threshold:50,failureLimit:0,event:"scroll",effect:"show",container:u,dataAttribute:"src",sourceMaker:null,skipInvisible:!0,appear:null,load:null,loadingClass:"",placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};i(m);var w=s.type||_.type,E=v.get(w);if("function"!=typeof E)throw"Error, cannot found the specific type loader (type: `"+w+"`)";"html"===w&&(_.placeholder=""),s&&t.extend(_,s);var x=_.container,C=_.event,T=0===C.indexOf("scroll"),j=x&&x!==u?t(x):a,U=function(e){var o=m._list;if(o.length>0){var r=0;n(o.slice(0),function(e,n){var o=t(n);if(!_.skipInvisible||o.is(":visible"))if(A(n,_)||b(n,_));else if(g(n,_)||y(n,_)){if(++r>_.failureLimit)return!1}else o.trigger("appear"),r=0})}else m.reset()},q=function(){m._list=o(m._list,function(t){return!t[c]})},D=function(){var e=this,n=t(e),o=n.attr("data-"+_.dataAttribute),r=_.sourceMaker,i=_.appear,u=_.loadingClass,a=e[c];a===f?(e[c]=p,u&&n.addClass(u),r&&(o=r(o,e)),i&&i.apply(m,[e,o]),E.call(m,e,o,_,function(t,r){if(!m._destroyed){if(u&&n.removeClass(u),t)setTimeout(function(){e[c]=f,m.emit("lazyItemError",e,o,t),e=null},300);else{e[c]=d,q(),m.emit("lazyItemReady",e,o,r);var i=_.load;i&&i.apply(m,[e,o,r]),e=null}n=null}})):a===d&&(q(),m.emit("lazyItemReady",e,o))},I=function(){this[c]||t(this).trigger("appear")},P=function(e){var n=t(e);e[c]=f;var o=_.placeholder;if(o)if(n.is("img")){var r=n.attr("src");r||n.attr("src",o)}else"image"===m._.type||n.children()[0]||n.html(o);n.on("appear",D),T||n.on(C,I),m._list.push(e)},k=function(t){t=o(t||[],h),t.length&&(n(t,function(t,e){P(e)}),m._inited||O(m))},O=function(e){if(!e._inited){var o=r(U,30);if(e._inited=!0,T&&j.on(C,o),a.on("resize",o),l){var i=function(o){o.originalEvent&&o.originalEvent.persisted&&n(e._list,function(e,n){t(n).trigger("appear")})};a.on("pageshow",i),e.once("reset",function(){a.off("pageshow",i)})}e.once("reset",function(){n(e._list,function(t,e){L(e)}),T&&j.off(C,o),a.off("resize",o)}),t(document).ready(U)}},L=function(e){var n=t(e);n.off("appear",D),T||n.off(C,I)};m.on("lazyItemReady",function(t){L(t)}),m.once("destroy",function(){k=null,U=null,q=null,D=null,I=null}),m._=_,m._list=[],m.add=function(e){var n=t(e);n.length>0&&k(n)},m.update=U,k(e)};m.prototype={constructor:m,update:function(){},peek:function(){var t=this._list,n=t.length;return n>0?t[0]:e},reset:function(){return this._inited?(this._inited=!1,this.emit("reset"),this._list.length=0,this):this},destroy:function(){this._destroyed||(this._destroyed=!0,this.reset().emit("destroy"),this.un(),this._=null)}},m.define=function(t,e){return v.define(t,e)};var g=function(e,n){var o,r=n.container;return o=r&&r!==u?t(r).offset().top+t(r).height():(u.innerHeight?u.innerHeight:a.height())+a.scrollTop(),o<=t(e).offset().top-n.threshold},y=function(e,n){var o,r=n.container;return o=r&&r!==u?t(r).offset().left+t(r).width():a.width()+a.scrollLeft(),o<=t(e).offset().left-n.threshold},A=function(e,n){var o,r=n.container;return o=r&&r!==u?t(r).offset().top:a.scrollTop(),o>=t(e).offset().top+n.threshold+t(e).height()},b=function(e,n){var o,r=n.container;return o=r&&r!==u?t(r).offset().left:a.scrollLeft(),o>=t(e).offset().left+n.threshold+t(e).width()},_=function(t,e){return!(y(t,e)||b(t,e)||g(t,e)||A(t,e))};return m.belowthefold=g,m.rightoffold=y,m.abovethetop=A,m.leftofbegin=b,m.inviewport=_,m}),define("module/footer/1.0.0/footer",["require","exports","module","jquery","lib/plugins/lazyload/1.9.3/lazyload","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function o(t){var e=this,n={selector:"#jFooter"};if(e.options=r.extend(!0,{},n,t),e.el=r(e.options.selector),0==e.el.length)throw new Error("the params [optins.selector] is required or the [el] is not exist.");e._init()}var r=t("jquery"),i=t("lib/plugins/lazyload/1.9.3/lazyload"),u=t("lib/core/1.0.0/dom/build");o.prototype._init=function(){var t=this,e=u.build(t.el[0],!1),n=e.get("footerImg");new i(n)},n.exports=o}),define("conf/404",["require","exports","module","jquery","module/top-search/1.0.0/top-search","module/login-status/1.0.0/login-status","module/footer/1.0.0/footer"],function(t,e,n){"use strict";var o=(t("jquery"),t("module/top-search/1.0.0/top-search")),r=t("module/login-status/1.0.0/login-status"),i=t("module/footer/1.0.0/footer");new o,new r,new i});