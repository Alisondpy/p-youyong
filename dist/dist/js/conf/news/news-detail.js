/*! Based on work by Simon Willison: http://gist.github.com/292562 */

!function(e,t,n){"function"==typeof define&&define.amd?define("lib/plugins/lazyload/1.9.3/lazyload",["jquery"],n):e[t]=n(e.jQuery||e.Zepto)}(this,"Lazyload",function(e,t){"use strict";if(!e)throw"Error: jquery api not implements.";var n=e.each,o=function(e,t){if(e instanceof Array&&e.filter)return e.filter(t);for(var n=[],o=-1,r=e.length;++o<r;)t(e[o],o)&&n.push(e[o]);return n},r=function(e,t,n,o){var r;return function(){var i=o||this,a=arguments,u=function(){r=null,n||e.apply(i,a)},l=n&&!r;clearTimeout(r),r=setTimeout(u,t),l&&e.apply(i,a)}},i=function(t,n){t=t||{};var o=e(t),r=Array.prototype.slice;return n=n||t.name,e.each({on:"on",un:"off",once:"one",emit:"trigger"},function(e,i){t[e]=function(t){var a=r.call(arguments,0),u=a[1];return n&&!~t.indexOf(".")&&(a[0]=t+"."+n),"function"==typeof u&&("on"===e||"once"===e?a[1]=u.__||(u.__=function(e){return e.preventDefault(),u.apply(this,r.call(arguments,1))}):"un"===e&&(a[1]=u.__)),o[i].apply(o,a)}}),t},a=window,u=e(a),l=a.Image,s=/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion),c="__lazy_status__",f=0,p=1,d=2,h=function(e){return e[c]===t},v=function(){var e={},t=function(t,n){"function"==typeof n&&(e[t]=n)},n=function(t){return e[t]};return{define:t,get:n}}();v.define("image",function(n,o,r,i){if(!o)return void i("error");var a=new l,u=function(){a.onload=a.onerror=null,a=o=n=i=u=t};a.onload=function(){var t=e(n),a=r.effect;"function"!=typeof t[a]&&(a="show"),t.hide(),"IMG"===n.nodeName.toUpperCase()?t.attr("src",o):t.css("background-image",'url("'+o+'")'),t[a](r.effectSpeed),i(null,"load"),u()},a.onerror=function(e){i(e),u()},a.src=o}),v.define("html",function(e,t,n,o){o()});var m=function(t,l){l=l||{},t=e(t);var m=this,_={type:"image",threshold:50,failureLimit:0,event:"scroll",effect:"show",container:a,dataAttribute:"src",sourceMaker:null,skipInvisible:!0,appear:null,load:null,loadingClass:"",placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};i(m);var w=l.type||_.type,x=v.get(w);if("function"!=typeof x)throw"Error, cannot found the specific type loader (type: `"+w+"`)";"html"===w&&(_.placeholder=""),l&&e.extend(_,l);var E=_.container,C=_.event,j=0===C.indexOf("scroll"),T=E&&E!==a?e(E):u,U=function(t){var o=m._list;if(o.length>0){var r=0;n(o.slice(0),function(t,n){var o=e(n);if(!_.skipInvisible||o.is(":visible"))if(A(n,_)||b(n,_));else if(y(n,_)||g(n,_)){if(++r>_.failureLimit)return!1}else o.trigger("appear"),r=0})}else m.reset()},q=function(){m._list=o(m._list,function(e){return!e[c]})},z=function(){var t=this,n=e(t),o=n.attr("data-"+_.dataAttribute),r=_.sourceMaker,i=_.appear,a=_.loadingClass,u=t[c];u===f?(t[c]=p,a&&n.addClass(a),r&&(o=r(o,t)),i&&i.apply(m,[t,o]),x.call(m,t,o,_,function(e,r){if(!m._destroyed){if(a&&n.removeClass(a),e)setTimeout(function(){t[c]=f,m.emit("lazyItemError",t,o,e),t=null},300);else{t[c]=d,q(),m.emit("lazyItemReady",t,o,r);var i=_.load;i&&i.apply(m,[t,o,r]),t=null}n=null}})):u===d&&(q(),m.emit("lazyItemReady",t,o))},I=function(){this[c]||e(this).trigger("appear")},k=function(t){var n=e(t);t[c]=f;var o=_.placeholder;if(o)if(n.is("img")){var r=n.attr("src");r||n.attr("src",o)}else"image"===m._.type||n.children()[0]||n.html(o);n.on("appear",z),j||n.on(C,I),m._list.push(t)},D=function(e){e=o(e||[],h),e.length&&(n(e,function(e,t){k(t)}),m._inited||O(m))},O=function(t){if(!t._inited){var o=r(U,30);if(t._inited=!0,j&&T.on(C,o),u.on("resize",o),s){var i=function(o){o.originalEvent&&o.originalEvent.persisted&&n(t._list,function(t,n){e(n).trigger("appear")})};u.on("pageshow",i),t.once("reset",function(){u.off("pageshow",i)})}t.once("reset",function(){n(t._list,function(e,t){P(t)}),j&&T.off(C,o),u.off("resize",o)}),e(document).ready(U)}},P=function(t){var n=e(t);n.off("appear",z),j||n.off(C,I)};m.on("lazyItemReady",function(e){P(e)}),m.once("destroy",function(){D=null,U=null,q=null,z=null,I=null}),m._=_,m._list=[],m.add=function(t){var n=e(t);n.length>0&&D(n)},m.update=U,D(t)};m.prototype={constructor:m,update:function(){},peek:function(){var e=this._list,n=e.length;return n>0?e[0]:t},reset:function(){return this._inited?(this._inited=!1,this.emit("reset"),this._list.length=0,this):this},destroy:function(){this._destroyed||(this._destroyed=!0,this.reset().emit("destroy"),this.un(),this._=null)}},m.define=function(e,t){return v.define(e,t)};var y=function(t,n){var o,r=n.container;return o=r&&r!==a?e(r).offset().top+e(r).height():(a.innerHeight?a.innerHeight:u.height())+u.scrollTop(),o<=e(t).offset().top-n.threshold},g=function(t,n){var o,r=n.container;return o=r&&r!==a?e(r).offset().left+e(r).width():u.width()+u.scrollLeft(),o<=e(t).offset().left-n.threshold},A=function(t,n){var o,r=n.container;return o=r&&r!==a?e(r).offset().top:u.scrollTop(),o>=e(t).offset().top+n.threshold+e(t).height()},b=function(t,n){var o,r=n.container;return o=r&&r!==a?e(r).offset().left:u.scrollLeft(),o>=e(t).offset().left+n.threshold+e(t).width()},_=function(e,t){return!(g(e,t)||b(e,t)||y(e,t)||A(e,t))};return m.belowthefold=y,m.rightoffold=g,m.abovethetop=A,m.leftofbegin=b,m.inviewport=_,m}),define("lib/core/1.0.0/utils/util",["require","exports","module"],function(e,t,n){"use strict";function o(e){return"object"==typeof e&&null!==e}function r(){}function i(e,t){for(var n=e.length,o=-1;++o<n;)t(e[o],o)}function a(e,t){for(var n in e)d.call(e,n)&&t(e[n],n,e)}function u(e,t){return e&&e.forEach?e.forEach(t):void(h(e)?i(e,t):a(e,t))}function l(e,t){for(var n=-1,o=e.length,r=Array(o);++n<o;)r[n]=t(e[n],n,e);return r}function s(e,t){var n=[];return u(e,function(e,o,r){n.push(t(e,o,r))}),n}function c(e,t){if(!t||!o(t))return e;for(var n=m(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}function f(e){"?"===e.charAt(0)&&(e=e.substr(1));for(var t,n={},o=e.split("&"),r=-1,i=o.length;++r<i;)t=o[r].split("="),n[decodeURIComponent(t[0])]=decodeURIComponent(t[1]);return n}var p=new Function("return this")(),d=Object.prototype.hasOwnProperty,h=Array.isArray||function(e){return e&&e instanceof Array},v=function(){var e=(+new Date).toString(36),t=-1;return function(n){return(n||"")+e+ ++t}}(),m=Object.keys||function(e){var t=[];return a(e,function(e,n){t.push(n)}),t},y="function"==typeof Object.create?function(e,t){e.__super__=t.prototype,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(){function e(e){this.constructor=e}return function(t,n){t.__super__=n.prototype,e.prototype=n.prototype,t.prototype=new e(t)}}(),g=p.console||(p.console={});i(["log","error","trace","warn","info"],function(e){g[e]||(g[e]=r)}),t.extend=function(e,t){for(var n=[].slice.call(arguments,1),o=n.length,r=-1;++r<o;)c(e,n[r]);return e},t.inherits=function(e,t,n){y(e,t),n&&c(e.prototype,n)},t.impls=function(e,n){return n="function"==typeof n?n.prototype:n,t.mix(e.prototype,n),e},t.parseQuery=f,t.parseParams=f,t.each=u,t.map=function(e,t){var n=h(e)?l:s;return n(e,t)},t.filter=function(e,t){var n,o,r=h(e)?(n=i,o=function(e,t){r.push(t)},[]):(n=a,o=function(e,t){r[e]=t},{});return n(e,function(e,n){t(e,n)&&o(n,e)}),r},t.mix=function e(t,n,o,r,i){for(var a in n)n.hasOwnProperty(a)&&(n[a]&&t[a]&&o&&"object"==typeof n[a]?e(t[a],n[a],o,r,i):(void 0===t[a]||r)&&(i&&!i(t[a],n[a])||(t[a]=n[a])));return t},t.guid=v,t.setImmediate=function(){var e=p.document,t=p.postMessage,n=p.setImmediate;return n?n:"onreadystatechange"in e.createElement("script")?function(t){function n(){o.onreadystatechange=null,o.parentNode.removeChild(o),t()}var o=e.createElement("script");o.onreadystatechange=n,e.documentElement.appendChild(o)}:t?function(e){function n(t){t.data===o&&(p.removeEventListener("message",n,!0),e())}var o=v();p.addEventListener("message",n,!0),t(o,"*")}:function(e){p.setTimeout(e,0)}}(),t.noop=r,t.throttle=function(e,t){if(t=t?t:150,t===-1)return function(){e.apply(this,arguments)};var n;return function(){var o=+new Date;(!n||o-n>t)&&(n=o,e.apply(this,arguments))}},t.debounce=function(e,t,n,o){var r;return function(){var i=o||this,a=arguments,u=function(){r=null,n||e.apply(i,a)},l=n&&!r;clearTimeout(r),r=setTimeout(u,t),l&&e.apply(i,a)}},t.deprecate=function(e,t){function n(){return o||(o=!0),e.apply(this,arguments)}if(p.noDeprecation===!0)return e;var o=!1;return n}}),define("lib/core/1.0.0/dom/dataset",["require","exports","module","jquery"],function(e,t,n){"use strict";function o(e){return e.replace(u,"ms-").replace(l,s)}function r(e){try{return"true"===e||"false"!==e&&("null"===e?null:+e+""===e?+e:c.test(e)?a.parseJSON(e):e)}catch(e){}}function i(e,t,n){var o;return void 0===n&&1===e.nodeType&&(o="data-"+t.replace(f,"-$&").toLowerCase(),n=e.getAttribute(o),"string"!=typeof n&&(n=void 0)),n}var a=(window.document,e("jquery")),u=/^-ms-/,l=/-([\da-z])/gi,s=function(e,t){return t.toUpperCase()},c=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,f=/[A-Z]/g,p=function(e,t,n){if(!e||1!==e.nodeType)throw new TypeError("dataset(): Not a valid DOM element.");var a,u,l,s;if(1===arguments.length){if(l=e.dataset){s={};for(u in l)l.hasOwnProperty(u)&&(s[u]=r(l[u]));return s}for(l=e.attributes,a=l.length,s={};a--;)l[a]&&(u=l[a].name,0===u.indexOf("data-")&&(u=o(u.slice(5)),s[u]=r(i(e,u))));return s}};n.exports=p}),define("lib/core/1.0.0/dom/build",["require","exports","module","jquery","./dataset"],function(e,t,n){"use strict";function o(e,t,n,o){o?e[t]||(e[t]=n):e[t]?e[t]=e[t].add(n):e[t]=i(n)}var r=window.document,i=e("jquery"),a=function(e,t,n){var a,u,l,s,c,f=function(e){if(n)for(var r in n)l[r]=i(n[r].toString(),e);else{l={},s=i("[node-type]",e);for(var a,u=-1,c=s.length;++u<c;)a=s[u],r=a.getAttribute("node-type"),o(l,r,a,t)}},p=function(e){var n,r=l[e];return r&&0!==r.length||(n=i('[node-type="'+e+'"]',a),n.length&&o(l,e,n,t),r=l[e]),r};if(void 0===t&&(t=!0),a=e,"string"==typeof e&&"<"===e.charAt(0))for(a=r.createElement("div"),a.innerHTML=e,u=r.createDocumentFragment();c=a.firsChild;)u.appendChild(c);else a=i(e),u=a[0];return f(a),{get:p,box:u,list:l}};t.build=a,t.parse=function(e,t,n){if("object"==typeof e&&e.length>0&&(e=e[0]),!e||1!==e.nodeType)throw TypeError("parse error, not a valid html element");return"boolean"==typeof n&&(t=n,n=null),a(e,t,n).list},t.dataset=e("./dataset")}),define("module/top-search/1.0.0/top-search",["require","exports","module","jquery","lib/core/1.0.0/utils/util","lib/core/1.0.0/dom/build"],function(e,t,n){"use strict";function o(e){var t=this,n={activeClass:"focus",selector:"#jTopSearch",url:$PAGE_DATA&&$PAGE_DATA.topSearchUrl||"",data:{},alias:"key"};if(t.options=r.extend(!0,{},n,e),""==t.options.url)throw new Error("the params options.url is required");t.el=r(t.options.selector);var o=i.build(t.el[0],!1);t.ipt=o.get("ipt"),t.btn=o.get("btn"),t.lbl=o.get("lbl"),t._init(),t._initEvent()}var r=e("jquery"),i=(e("lib/core/1.0.0/utils/util"),e("lib/core/1.0.0/dom/build"));o.prototype._initEvent=function(){var e=this;e.ipt.on("focus",function(){e.focus()}),e.ipt.on("blur",function(){0==e.getValue().length&&e.blur()}),e.ipt.on("keydown",function(t){13===t.keyCode&&e.search()}),e.btn.on("click",function(){e.search()})},o.prototype._init=function(){var e=this,t=r.trim(e.ipt.val()),n=e.ipt.attr("data-id");t.length>0&&e.focus(),n&&(e.options.alias=n),e.options.data&&(e.options.data[e.options.alias]=r.trim(e.ipt.val()))},o.prototype.focus=function(){var e=this;e.el.addClass(e.options.activeClass)},o.prototype.blur=function(){var e=this;e.el.removeClass(e.options.activeClass)},o.prototype.getValue=function(){var e=this;return r.trim(e.ipt.val())},o.prototype.search=function(){var e=this;e.options.data[e.options.alias]=e.getValue(),window.location.href=e.options.url+"?"+e._getUrlString()},o.prototype._getUrlString=function(){var e=this,t="",n=0;for(var o in e.options.data)t+=0==n?o+"="+encodeURIComponent(e.options.data[o]):"&"+o+"="+encodeURIComponent(e.options.data[o]),n++;return t},n.exports=o}),define("lib/core/1.0.0/io/cookie",["require","exports","module"],function(e,t,n){"use strict";var o=window.document,r=function(e){if("string"!=typeof e)throw"trim need a string as parameter";for(var t=e.length,n=0,o=t-1,r=/(\u3000|\s|\t|\u00A0)/;n<t&&r.test(e.charAt(n));)++n;for(;o>=0&&r.test(e.charAt(o));)--o;return e.substring(n,o+1)},i=function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},a=function(e,t,n){if(n=n||{},void 0!==t){if(n=i(n),null===t&&(t="",n.expires=-1),"number"==typeof n.expires){var a=n.expires,u=n.expires=new Date;u.setTime(u.getTime()+864e5*a)}var l=function(e){try{return n.raw?e:encodeURIComponent(e)}catch(e){}return e};return o.cookie=[l(e),"=",l(t),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}for(var t=null,s=o.cookie,c=function(e){return n.raw?e:decodeURIComponent(e)},f=s?s.split("; "):[],p=-1,d=f.length,h=e.length+1;++p<d;)if(s=r(f[p]),s.substring(0,h)===e+"="){t=c(s.substring(h));break}return t};a.set=function(e,t,n){return a(e,t,n)},a.get=function(e){return a(e)},n.exports=a}),define("module/login-status/1.0.0/login",["require","exports","module","lib/core/1.0.0/io/cookie"],function(e,t,n){"use strict";var o=e("lib/core/1.0.0/io/cookie"),r="_nick",i=$PAGE_DATA&&$PAGE_DATA.LOGIN_URL||"";t.getNick=function(){return o(r)},t.isLogin=function(){return!!o(r)},t.login=function(e){i&&(e=e?"?returnUrl="+e:"",window.location.href=i+e)}}),define("module/login-status/1.0.0/login-status",["require","exports","module","jquery","lib/core/1.0.0/dom/build","./login"],function(e,t,n){"use strict";function o(e){var t=this,n={selector:"#jLoginStatus",userCenterUrl:$PAGE_DATA&&$PAGE_DATA.userCenterUrl||"javascript:;",loginOutUrl:$PAGE_DATA&&$PAGE_DATA.loginOutUrl||"javascript:;",menuList:[{title:"编辑资料",url:$PAGE_DATA&&$PAGE_DATA.editUserInfoUrl||"javascript:;"},{title:"学习中心",url:$PAGE_DATA&&$PAGE_DATA.learningCenterUrl||"javascript:;"}]};t.options=r.extend(!0,{},n,e),t.el=r(t.options.selector),t._init()}var r=e("jquery"),i=e("lib/core/1.0.0/dom/build"),a=e("./login");o.prototype._init=function(){var e=this,t=a.getNick();t&&(e.el.html(e._getLoginedHtml(t)),e._initEvent())},o.prototype._initEvent=function(){var e=this,t=!1,n=i.build(e.el[0],!1),o=n.get("userName"),r=n.get("tipsMenu");o.on("mouseenter",function(){t=!0,r.stop().fadeIn(500,function(){r.addClass("active")})}),o.on("mouseleave",function(){t=!1,setTimeout(function(){t||r.stop().fadeOut(500,function(){r.removeClass("active")})},200)}),r.on("mouseenter",function(){t=!0}),r.on("mouseleave",function(){t=!1,r.removeClass("active")})},o.prototype._getLoginedHtml=function(e){var t=this,n=t.options,o=n.menuList,r="";r+='<ul class="logined clearfix" node-type="logined">',r+='    <li class="item">',r+="        <span>您好，</span>",r+="    </li>",r+='    <li class="item tips-menu-box">',r+='        <a href="'+n.userCenterUrl+'" class="user-name txt-overflow" node-type="userName">'+e+"</a>",r+='        <div class="tips-menu" node-type="tipsMenu">',r+='            <div class="arrow"><i></i><b></b></div>',r+='            <ul class="tips-menu-list">';for(var i=0,a=o.length;i<a;i++)r+='            <li class="tips-menu-item"><a href="'+o[i].url+'">'+o[i].title+"</a></li>";return r+="            </ul>",r+="        </div>",r+="    </li>",r+='    <li class="item">',r+='        <a href="'+n.loginOutUrl+'" class="btn">退出</a>',r+="    </li>",r+="</ul>"},n.exports=o}),define("module/fix-bar/1.0.0/fix-bar",["require","exports","module","jquery","lib/core/1.0.0/utils/util","lib/core/1.0.0/dom/build"],function(e,t,n){"use strict";function o(e){var t=this,n={onlineServiceUrl:""};t.options=r.extend(!0,{},n,e),t._init(),t._initEvent()}var r=e("jquery");e("lib/core/1.0.0/utils/util"),e("lib/core/1.0.0/dom/build");o.prototype._init=function(){var e=this;e.el=r(e._getTemplete()),r(document.body).append(e.el),e.height=e.el.height(),e.resize()},o.prototype._initEvent=function(){var e=this;r(window).on("resize",function(){e.resize()})},o.prototype.resize=function(){var e=this,t=r(window).height(),n=(t-e.height)/2;n>=0?(e.el.css({top:n}),e.el.addClass("active")):e.el.removeClass("active")},o.prototype._getTemplete=function(){var e=this,t="";return t+='<div class="ui-fix-bar">',t+='    <ul class="list clearfix" node-type="list">',t+='        <li class="jItem item item-service" node-id="service">',t+='            <a href="'+e.options.onlineServiceUrl+'">',t+='                <i class="iyoyo iyoyo-service"></i>',t+="                <span>在线客服</span>",t+="            </a>",t+="        </li>",t+="    </ul>",t+="</div>"},n.exports=o}),define("module/footer/1.0.0/footer",["require","exports","module","jquery","lib/plugins/lazyload/1.9.3/lazyload","lib/core/1.0.0/dom/build"],function(e,t,n){"use strict";function o(e){var t=this,n={selector:"#jFooter"};if(t.options=r.extend(!0,{},n,e),t.el=r(t.options.selector),0==t.el.length)throw new Error("the params [optins.selector] is required or the [el] is not exist.");t._init()}var r=e("jquery"),i=e("lib/plugins/lazyload/1.9.3/lazyload"),a=e("lib/core/1.0.0/dom/build");o.prototype._init=function(){var e=this,t=a.build(e.el[0],!1),n=t.get("footerImg");new i(n)},n.exports=o}),define("conf/news/news-detail",["require","exports","module","jquery","lib/plugins/lazyload/1.9.3/lazyload","module/top-search/1.0.0/top-search","module/login-status/1.0.0/login-status","module/fix-bar/1.0.0/fix-bar","module/footer/1.0.0/footer"],function(e,t,n){"use strict";var o,r=e("jquery"),i=e("lib/plugins/lazyload/1.9.3/lazyload"),a=r("#jHotTrain");o=new i(a.find(".jImg"),{mouseWheel:!0,effect:"fadeIn",snap:!0});var u=e("module/top-search/1.0.0/top-search"),l=e("module/login-status/1.0.0/login-status"),s=e("module/fix-bar/1.0.0/fix-bar"),c=e("module/footer/1.0.0/footer");new u,new l,new s,new c});