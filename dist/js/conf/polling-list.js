/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

define("lib/core/1.0.0/utils/util",["require","exports","module"],function(t,e,n){"use strict";function r(t){return"object"==typeof t&&null!==t}function i(){}function o(t,e){for(var n=t.length,r=-1;++r<n;)e(t[r],r)}function a(t,e){for(var n in t)d.call(t,n)&&e(t[n],n,t)}function l(t,e){return t&&t.forEach?t.forEach(e):void(h(t)?o(t,e):a(t,e))}function s(t,e){for(var n=-1,r=t.length,i=Array(r);++n<r;)i[n]=e(t[n],n,t);return i}function u(t,e){var n=[];return l(t,function(t,r,i){n.push(e(t,r,i))}),n}function c(t,e){if(!e||!r(e))return t;for(var n=m(e),i=n.length;i--;)t[n[i]]=e[n[i]];return t}function p(t){"?"===t.charAt(0)&&(t=t.substr(1));for(var e,n={},r=t.split("&"),i=-1,o=r.length;++i<o;)e=r[i].split("="),n[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return n}var f=new Function("return this")(),d=Object.prototype.hasOwnProperty,h=Array.isArray||function(t){return t&&t instanceof Array},v=function(){var t=(+new Date).toString(36),e=-1;return function(n){return(n||"")+t+ ++e}}(),m=Object.keys||function(t){var e=[];return a(t,function(t,n){e.push(n)}),e},g="function"==typeof Object.create?function(t,e){t.__super__=e.prototype,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(){function t(t){this.constructor=t}return function(e,n){e.__super__=n.prototype,t.prototype=n.prototype,e.prototype=new t(e)}}(),y=f.console||(f.console={});o(["log","error","trace","warn","info"],function(t){y[t]||(y[t]=i)}),e.extend=function(t,e){for(var n=[].slice.call(arguments,1),r=n.length,i=-1;++i<r;)c(t,n[i]);return t},e.inherits=function(t,e,n){g(t,e),n&&c(t.prototype,n)},e.impls=function(t,n){return n="function"==typeof n?n.prototype:n,e.mix(t.prototype,n),t},e.parseQuery=p,e.parseParams=p,e.each=l,e.map=function(t,e){var n=h(t)?s:u;return n(t,e)},e.filter=function(t,e){var n,r,i=h(t)?(n=o,r=function(t,e){i.push(e)},[]):(n=a,r=function(t,e){i[t]=e},{});return n(t,function(t,n){e(t,n)&&r(n,t)}),i},e.mix=function t(e,n,r,i,o){for(var a in n)n.hasOwnProperty(a)&&(n[a]&&e[a]&&r&&"object"==typeof n[a]?t(e[a],n[a],r,i,o):(void 0===e[a]||i)&&(o&&!o(e[a],n[a])||(e[a]=n[a])));return e},e.guid=v,e.setImmediate=function(){var t=f.document,e=f.postMessage,n=f.setImmediate;return n?n:"onreadystatechange"in t.createElement("script")?function(e){function n(){r.onreadystatechange=null,r.parentNode.removeChild(r),e()}var r=t.createElement("script");r.onreadystatechange=n,t.documentElement.appendChild(r)}:e?function(t){function n(e){e.data===r&&(f.removeEventListener("message",n,!0),t())}var r=v();f.addEventListener("message",n,!0),e(r,"*")}:function(t){f.setTimeout(t,0)}}(),e.noop=i,e.throttle=function(t,e){if(e=e?e:150,e===-1)return function(){t.apply(this,arguments)};var n;return function(){var r=+new Date;(!n||r-n>e)&&(n=r,t.apply(this,arguments))}},e.debounce=function(t,e,n,r){var i;return function(){var o=r||this,a=arguments,l=function(){i=null,n||t.apply(o,a)},s=n&&!i;clearTimeout(i),i=setTimeout(l,e),s&&t.apply(o,a)}},e.deprecate=function(t,e){function n(){return r||(r=!0),t.apply(this,arguments)}if(f.noDeprecation===!0)return t;var r=!1;return n}}),define("lib/core/1.0.0/dom/dataset",["require","exports","module","jquery"],function(t,e,n){"use strict";function r(t){return t.replace(l,"ms-").replace(s,u)}function i(t){try{return"true"===t||"false"!==t&&("null"===t?null:+t+""===t?+t:c.test(t)?a.parseJSON(t):t)}catch(t){}}function o(t,e,n){var r;return void 0===n&&1===t.nodeType&&(r="data-"+e.replace(p,"-$&").toLowerCase(),n=t.getAttribute(r),"string"!=typeof n&&(n=void 0)),n}var a=(window.document,t("jquery")),l=/^-ms-/,s=/-([\da-z])/gi,u=function(t,e){return e.toUpperCase()},c=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,p=/[A-Z]/g,f=function(t,e,n){if(!t||1!==t.nodeType)throw new TypeError("dataset(): Not a valid DOM element.");var a,l,s,u;if(1===arguments.length){if(s=t.dataset){u={};for(l in s)s.hasOwnProperty(l)&&(u[l]=i(s[l]));return u}for(s=t.attributes,a=s.length,u={};a--;)s[a]&&(l=s[a].name,0===l.indexOf("data-")&&(l=r(l.slice(5)),u[l]=i(o(t,l))));return u}};n.exports=f}),define("lib/core/1.0.0/dom/build",["require","exports","module","jquery","./dataset"],function(t,e,n){"use strict";function r(t,e,n,r){r?t[e]||(t[e]=n):t[e]?t[e]=t[e].add(n):t[e]=o(n)}var i=window.document,o=t("jquery"),a=function(t,e,n){var a,l,s,u,c,p=function(t){if(n)for(var i in n)s[i]=o(n[i].toString(),t);else{s={},u=o("[node-type]",t);for(var a,l=-1,c=u.length;++l<c;)a=u[l],i=a.getAttribute("node-type"),r(s,i,a,e)}},f=function(t){var n,i=s[t];return i&&0!==i.length||(n=o('[node-type="'+t+'"]',a),n.length&&r(s,t,n,e),i=s[t]),i};if(void 0===e&&(e=!0),a=t,"string"==typeof t&&"<"===t.charAt(0))for(a=i.createElement("div"),a.innerHTML=t,l=i.createDocumentFragment();c=a.firsChild;)l.appendChild(c);else a=o(t),l=a[0];return p(a),{get:f,box:l,list:s}};e.build=a,e.parse=function(t,e,n){if("object"==typeof t&&t.length>0&&(t=t[0]),!t||1!==t.nodeType)throw TypeError("parse error, not a valid html element");return"boolean"==typeof n&&(e=n,n=null),a(t,e,n).list},e.dataset=t("./dataset")}),define("module/top-search/1.0.0/top-search",["require","exports","module","jquery","lib/core/1.0.0/utils/util","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function r(t){var e=this,n={activeClass:"focus",selector:"#jTopSearch",url:$PAGE_DATA&&$PAGE_DATA.topSearchUrl||"",data:{},alias:"key"};if(e.options=i.extend(!0,{},n,t),""==e.options.url)throw new Error("the params options.url is required");e.el=i(e.options.selector);var r=o.build(e.el[0],!1);e.ipt=r.get("ipt"),e.btn=r.get("btn"),e.lbl=r.get("lbl"),e._init(),e._initEvent()}var i=t("jquery"),o=(t("lib/core/1.0.0/utils/util"),t("lib/core/1.0.0/dom/build"));r.prototype._initEvent=function(){var t=this;t.ipt.on("focus",function(){t.focus()}),t.ipt.on("blur",function(){0==t.getValue().length&&t.blur()}),t.ipt.on("keydown",function(e){13===e.keyCode&&t.search()}),t.btn.on("click",function(){t.search()})},r.prototype._init=function(){var t=this,e=i.trim(t.ipt.val()),n=t.ipt.attr("data-id");e.length>0&&t.focus(),n&&(t.options.alias=n),t.options.data&&(t.options.data[t.options.alias]=i.trim(t.ipt.val()))},r.prototype.focus=function(){var t=this;t.el.addClass(t.options.activeClass)},r.prototype.blur=function(){var t=this;t.el.removeClass(t.options.activeClass)},r.prototype.getValue=function(){var t=this;return i.trim(t.ipt.val())},r.prototype.search=function(){var t=this;t.options.data[t.options.alias]=t.getValue(),window.location.href=t.options.url+"?"+t._getUrlString()},r.prototype._getUrlString=function(){var t=this,e="",n=0;for(var r in t.options.data)e+=0==n?r+"="+encodeURIComponent(t.options.data[r]):"&"+r+"="+encodeURIComponent(t.options.data[r]),n++;return e},n.exports=r}),define("lib/core/1.0.0/io/cookie",["require","exports","module"],function(t,e,n){"use strict";var r=window.document,i=function(t){if("string"!=typeof t)throw"trim need a string as parameter";for(var e=t.length,n=0,r=e-1,i=/(\u3000|\s|\t|\u00A0)/;n<e&&i.test(t.charAt(n));)++n;for(;r>=0&&i.test(t.charAt(r));)--r;return t.substring(n,r+1)},o=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},a=function(t,e,n){if(n=n||{},void 0!==e){if(n=o(n),null===e&&(e="",n.expires=-1),"number"==typeof n.expires){var a=n.expires,l=n.expires=new Date;l.setTime(l.getTime()+864e5*a)}var s=function(t){try{return n.raw?t:encodeURIComponent(t)}catch(t){}return t};return r.cookie=[s(t),"=",s(e),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}for(var e=null,u=r.cookie,c=function(t){return n.raw?t:decodeURIComponent(t)},p=u?u.split("; "):[],f=-1,d=p.length,h=t.length+1;++f<d;)if(u=i(p[f]),u.substring(0,h)===t+"="){e=c(u.substring(h));break}return e};a.set=function(t,e,n){return a(t,e,n)},a.get=function(t){return a(t)},n.exports=a}),define("module/login-status/1.0.0/login",["require","exports","module","lib/core/1.0.0/io/cookie"],function(t,e,n){"use strict";var r=t("lib/core/1.0.0/io/cookie"),i="_nick",o=$PAGE_DATA&&$PAGE_DATA.LOGIN_URL||"";e.getNick=function(){return r(i)},e.isLogin=function(){return!!r(i)},e.login=function(t){o&&(t=t?"?returnUrl="+t:"",window.location.href=o+t)}}),define("module/login-status/1.0.0/login-status",["require","exports","module","jquery","lib/core/1.0.0/dom/build","./login"],function(t,e,n){"use strict";function r(t){var e=this,n={selector:"#jLoginStatus",userCenterUrl:$PAGE_DATA&&$PAGE_DATA.userCenterUrl||"javascript:;",loginOutUrl:$PAGE_DATA&&$PAGE_DATA.loginOutUrl||"javascript:;",menuList:[{title:"编辑资料",url:$PAGE_DATA&&$PAGE_DATA.editUserInfoUrl||"javascript:;"},{title:"学习中心",url:$PAGE_DATA&&$PAGE_DATA.learningCenterUrl||"javascript:;"}]};e.options=i.extend(!0,{},n,t),e.el=i(e.options.selector),e._init()}var i=t("jquery"),o=t("lib/core/1.0.0/dom/build"),a=t("./login");r.prototype._init=function(){var t=this,e=a.getNick();e&&(t.el.html(t._getLoginedHtml(e)),t._initEvent())},r.prototype._initEvent=function(){var t=this,e=!1,n=o.build(t.el[0],!1),r=n.get("userName"),i=n.get("tipsMenu");r.on("mouseenter",function(){e=!0,i.stop().fadeIn(500,function(){i.addClass("active")})}),r.on("mouseleave",function(){e=!1,setTimeout(function(){e||i.stop().fadeOut(500,function(){i.removeClass("active")})},200)}),i.on("mouseenter",function(){e=!0}),i.on("mouseleave",function(){e=!1,i.removeClass("active")})},r.prototype._getLoginedHtml=function(t){var e=this,n=e.options,r=n.menuList,i="";i+='<ul class="logined clearfix" node-type="logined">',i+='    <li class="item">',i+="        <span>您好，</span>",i+="    </li>",i+='    <li class="item tips-menu-box">',i+='        <a href="'+n.userCenterUrl+'" class="user-name txt-overflow" node-type="userName">'+t+"</a>",i+='        <div class="tips-menu" node-type="tipsMenu">',i+='            <div class="arrow"><i></i><b></b></div>',i+='            <ul class="tips-menu-list">';for(var o=0,a=r.length;o<a;o++)i+='            <li class="tips-menu-item"><a href="'+r[o].url+'">'+r[o].title+"</a></li>";return i+="            </ul>",i+="        </div>",i+="    </li>",i+='    <li class="item">',i+='        <a href="'+n.loginOutUrl+'" class="btn">退出</a>',i+="    </li>",i+="</ul>"},n.exports=r}),define("module/fix-bar/1.0.0/fix-bar",["require","exports","module","jquery","lib/core/1.0.0/utils/util","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function r(t){var e=this,n={onlineServiceUrl:""};e.options=i.extend(!0,{},n,t),e._init(),e._initEvent()}var i=t("jquery");t("lib/core/1.0.0/utils/util"),t("lib/core/1.0.0/dom/build");r.prototype._init=function(){var t=this;t.el=i(t._getTemplete()),i(document.body).append(t.el),t.height=t.el.height(),t.resize()},r.prototype._initEvent=function(){var t=this;i(window).on("resize",function(){t.resize()})},r.prototype.resize=function(){var t=this,e=i(window).height(),n=(e-t.height)/2;n>=0?(t.el.css({top:n}),t.el.addClass("active")):t.el.removeClass("active")},r.prototype._getTemplete=function(){var t=this,e="";return e+='<div class="ui-fix-bar">',e+='    <ul class="list clearfix" node-type="list">',e+='        <li class="jItem item item-service" node-id="service">',e+='            <a href="'+t.options.onlineServiceUrl+'">',e+='                <i class="iyoyo iyoyo-service"></i>',e+="                <span>在线客服</span>",e+="            </a>",e+="        </li>",e+="    </ul>",e+="</div>"},n.exports=r}),function(t,e,n){"function"==typeof define&&define.amd?define("lib/plugins/lazyload/1.9.3/lazyload",["jquery"],n):t[e]=n(t.jQuery||t.Zepto)}(this,"Lazyload",function(t,e){"use strict";if(!t)throw"Error: jquery api not implements.";var n=t.each,r=function(t,e){if(t instanceof Array&&t.filter)return t.filter(e);for(var n=[],r=-1,i=t.length;++r<i;)e(t[r],r)&&n.push(t[r]);return n},i=function(t,e,n,r){var i;return function(){var o=r||this,a=arguments,l=function(){i=null,n||t.apply(o,a)},s=n&&!i;clearTimeout(i),i=setTimeout(l,e),s&&t.apply(o,a)}},o=function(e,n){e=e||{};var r=t(e),i=Array.prototype.slice;return n=n||e.name,t.each({on:"on",un:"off",once:"one",emit:"trigger"},function(t,o){e[t]=function(e){var a=i.call(arguments,0),l=a[1];return n&&!~e.indexOf(".")&&(a[0]=e+"."+n),"function"==typeof l&&("on"===t||"once"===t?a[1]=l.__||(l.__=function(t){return t.preventDefault(),l.apply(this,i.call(arguments,1))}):"un"===t&&(a[1]=l.__)),r[o].apply(r,a)}}),e},a=window,l=t(a),s=a.Image,u=/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion),c="__lazy_status__",p=0,f=1,d=2,h=function(t){return t[c]===e},v=function(){var t={},e=function(e,n){"function"==typeof n&&(t[e]=n)},n=function(e){return t[e]};return{define:e,get:n}}();v.define("image",function(n,r,i,o){if(!r)return void o("error");var a=new s,l=function(){a.onload=a.onerror=null,a=r=n=o=l=e};a.onload=function(){var e=t(n),a=i.effect;"function"!=typeof e[a]&&(a="show"),e.hide(),"IMG"===n.nodeName.toUpperCase()?e.attr("src",r):e.css("background-image",'url("'+r+'")'),e[a](i.effectSpeed),o(null,"load"),l()},a.onerror=function(t){o(t),l()},a.src=r}),v.define("html",function(t,e,n,r){r()});var m=function(e,s){s=s||{},e=t(e);var m=this,x={type:"image",threshold:50,failureLimit:0,event:"scroll",effect:"show",container:a,dataAttribute:"src",sourceMaker:null,skipInvisible:!0,appear:null,load:null,loadingClass:"",placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};o(m);var _=s.type||x.type,w=v.get(_);if("function"!=typeof w)throw"Error, cannot found the specific type loader (type: `"+_+"`)";"html"===_&&(x.placeholder=""),s&&t.extend(x,s);var j=x.container,$=x.event,E=0===$.indexOf("scroll"),T=j&&j!==a?t(j):l,q=function(e){var r=m._list;if(r.length>0){var i=0;n(r.slice(0),function(e,n){var r=t(n);if(!x.skipInvisible||r.is(":visible"))if(b(n,x)||A(n,x));else if(g(n,x)||y(n,x)){if(++i>x.failureLimit)return!1}else r.trigger("appear"),i=0})}else m.reset()},L=function(){m._list=r(m._list,function(t){return!t[c]})},k=function(){var e=this,n=t(e),r=n.attr("data-"+x.dataAttribute),i=x.sourceMaker,o=x.appear,a=x.loadingClass,l=e[c];l===p?(e[c]=f,a&&n.addClass(a),i&&(r=i(r,e)),o&&o.apply(m,[e,r]),w.call(m,e,r,x,function(t,i){if(!m._destroyed){if(a&&n.removeClass(a),t)setTimeout(function(){e[c]=p,m.emit("lazyItemError",e,r,t),e=null},300);else{e[c]=d,L(),m.emit("lazyItemReady",e,r,i);var o=x.load;o&&o.apply(m,[e,r,i]),e=null}n=null}})):l===d&&(L(),m.emit("lazyItemReady",e,r))},C=function(){this[c]||t(this).trigger("appear")},U=function(e){var n=t(e);e[c]=p;var r=x.placeholder;if(r)if(n.is("img")){var i=n.attr("src");i||n.attr("src",r)}else"image"===m._.type||n.children()[0]||n.html(r);n.on("appear",k),E||n.on($,C),m._list.push(e)},S=function(t){t=r(t||[],h),t.length&&(n(t,function(t,e){U(e)}),m._inited||D(m))},D=function(e){if(!e._inited){var r=i(q,30);if(e._inited=!0,E&&T.on($,r),l.on("resize",r),u){var o=function(r){r.originalEvent&&r.originalEvent.persisted&&n(e._list,function(e,n){t(n).trigger("appear")})};l.on("pageshow",o),e.once("reset",function(){l.off("pageshow",o)})}e.once("reset",function(){n(e._list,function(t,e){P(e)}),E&&T.off($,r),l.off("resize",r)}),t(document).ready(q)}},P=function(e){var n=t(e);n.off("appear",k),E||n.off($,C)};m.on("lazyItemReady",function(t){P(t)}),m.once("destroy",function(){S=null,q=null,L=null,k=null,C=null}),m._=x,m._list=[],m.add=function(e){var n=t(e);n.length>0&&S(n)},m.update=q,S(e)};m.prototype={constructor:m,update:function(){},peek:function(){var t=this._list,n=t.length;return n>0?t[0]:e},reset:function(){return this._inited?(this._inited=!1,this.emit("reset"),this._list.length=0,this):this},destroy:function(){this._destroyed||(this._destroyed=!0,this.reset().emit("destroy"),this.un(),this._=null)}},m.define=function(t,e){return v.define(t,e)};var g=function(e,n){var r,i=n.container;return r=i&&i!==a?t(i).offset().top+t(i).height():(a.innerHeight?a.innerHeight:l.height())+l.scrollTop(),r<=t(e).offset().top-n.threshold},y=function(e,n){var r,i=n.container;return r=i&&i!==a?t(i).offset().left+t(i).width():l.width()+l.scrollLeft(),r<=t(e).offset().left-n.threshold},b=function(e,n){var r,i=n.container;return r=i&&i!==a?t(i).offset().top:l.scrollTop(),r>=t(e).offset().top+n.threshold+t(e).height()},A=function(e,n){var r,i=n.container;return r=i&&i!==a?t(i).offset().left:l.scrollLeft(),r>=t(e).offset().left+n.threshold+t(e).width()},x=function(t,e){return!(y(t,e)||A(t,e)||g(t,e)||b(t,e))};return m.belowthefold=g,m.rightoffold=y,m.abovethetop=b,m.leftofbegin=A,m.inviewport=x,m}),define("module/footer/1.0.0/footer",["require","exports","module","jquery","lib/plugins/lazyload/1.9.3/lazyload","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function r(t){var e=this,n={selector:"#jFooter"};if(e.options=i.extend(!0,{},n,t),e.el=i(e.options.selector),0==e.el.length)throw new Error("the params [optins.selector] is required or the [el] is not exist.");e._init()}var i=t("jquery"),o=t("lib/plugins/lazyload/1.9.3/lazyload"),a=t("lib/core/1.0.0/dom/build");r.prototype._init=function(){var t=this,e=a.build(t.el[0],!1),n=e.get("footerImg");new o(n)},n.exports=r}),function(t,e){if("function"==typeof define&&define.amd)define("lib/core/1.0.0/event/emitter",e);else if("undefined"!=typeof module)e(require,module.exports,module);else{var n={exports:{}};e(null,n.exports,n),t.EventEmitter=n.exports}}(this,function(t,e,n){"use strict";function r(){}function i(t,e,n,r){var i=!0;if(e)for(var o,a,l,s=-1,u={type:t,timeStamp:c()};o=e[++s];){a=o[v],l=o[m]||r;try{i=o[g]===h?a.call(l,u,n)!==!1&&i:a.apply(l,n)!==!1&&i}catch(t){setTimeout(function(){console.error(t)},1)}}return i}function o(t){var e,n=f(this);return n?(e=n[t],e.length):0}function a(t){return"[object Function]"===Object.prototype.toString.call(t)}function l(t,e){for(var n in t)t.hasOwnProperty(n)&&e(t[n],n)}function s(t,e){t.forEach?t.forEach(e):function(t){for(var n=-1,r=t.length;++n<r;)e(t[n],n)}(t)}var u=/\s+/,c=Date.now||function(){return+new Date},p=function(){return c()*Math.random()&65535}(),f=function(){var t,e,n;return"function"==typeof WeakMap&&(WeakMap.prototype||0).set?(t=new WeakMap,function(e,n){var r=t.get(e);return null===n?void 0!==r&&t.delete(e):!r&&n?(t.set(e,r={}),r):r}):(e=c(),n="__$widΦ"+e.toString(36),t={},function(r,i){if(!r||"object"!=typeof r)throw TypeError("Invalid value used as weak map key");var o;return null===i?r[n]&&(delete t[r[n]],delete r[n]):(o=r[n]||i&&(o=++e,t[o]={},r[n]=o),o&&t[o])})}(),d=1,h=2,v=0,m=1,g=2,y=function(t,e,n){var r=[];return r[v]=t,r[m]=e,r[g]=n,r},b=r.prototype;b.addListener=function(t,e,n,r){var i,o,a,l=d;if(e&&"object"==typeof e&&(n=e,e=n.handleEvent,l=h),!e)return this;for(i=f(this,1),t=t.split(u);o=t.shift();)a=!r&&i[o]||(i[o]=[]),a.push(y(e,n,l));return this},b.on=b.addListener,b.once=function(t,e,n){var r=!1,i=function(){this.removeListener(t,i),r||(r=!0,e.apply(n||this,arguments))};return i.guid=e.guid||(e.guid=p++),this.on(t,i)},b.removeListener=function(t,e,n){var r,i,o,a,s,c;if(e&&"object"==typeof e&&(n=e,e=n.handleEvent),!(r=f(this)))return this;if(!(t||e||n))return l(r,function(t,e){delete r[e]}),f(this,null),this;for(t=t?t.split(u):A(r);i=t.shift();)if(o=r[i])if(e||n)for(a=o.length;--a>=0;)s=o[a],c=s[v],e&&c!==e&&(void 0===c.guid||c.guid!==e.guid)||n&&s[m]!==n||o.splice(a,1);else delete r[i];return this},b.un=b.removeListener,b.removeAllListeners=function(t){return this.removeListener(t)},b.emit=function(t){var e,n,r,o,a,l,s=[],c=!0;if(!(e=f(this)))return this;for(t=t.split(u),a=1,l=arguments.length;a<l;a++)s[a-1]=arguments[a];for(;n=t.shift();)(r=e.all)&&(r=r.slice()),(o=e[n])&&(o=o.slice()),"all"!==n&&(c=i(n,o,s,this)&&c),c=i(n,r,[n].concat(s),this)&&c;return c},r.applyTo=function(t){function e(e,r){t[e]=function(){var i=n[e].apply(r||t,Array.prototype.slice.call(arguments));return i===r?this:i}}var n=b,r=A(n);a(t)?s(r,function(e){t.prototype[e]=n[e]}):s(r,function(t){e(t)})},r.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):o.call(t,e)},b.listenerCount=o;var A=Object.keys||function(t){var e=[];return l(t,function(t,n){e.push(n)}),e};n.exports=r}),define("lib/core/1.0.0/io/request",["require","exports","module","jquery","../utils/util","../event/emitter"],function(t,e,n){"use strict";var r=t("jquery"),i=t("../utils/util"),o=t("../event/emitter"),a=i.setImmediate,l=i.noop,s=i.extend,u=r.trim,c=r.parseJSON,p=function(t,e,n){return function(r,i){try{return t.apply(e,arguments)}catch(t){n&&n(t,r,i)}}},f=function(t){return e.emit.apply(e,arguments)};o.applyTo(e);var d=function(){var t=5,e=0,n=[],i=function(){a(function(){--e,o()})},o=function(){if(n.length>0&&e<t){var o=n.shift(),a=o[0],l=o[1];++e,a.always(i),r.ajax(l)}};return function(t,e){n.push([t,e]),o()}}(),h=function(t){o.applyTo(this);var e={url:"",type:"GET",data:{},dataType:"json",timeout:3e4,cache:!1};t=s(e,t),delete t.error,delete t.success,this._opts=t};s(h.prototype,{send:function(){var t=this,e=this._opts,n=s({},e),r="jsonp"===n.dataType;return r&&(n.crossDomain=!0),n.complete=function(n,i){var o,a=+n.status,l=n.responseJSON,s={error:"1",msg:"Request error (status: "+(i||a)+")"},p=200===a||"success"===i;if(!r&&!l&&(l=u(n.responseText),l&&"<"!==l.charAt(0)))try{l=c(l)}catch(t){}p||(l=l||s),o={data:l,xhr:n,origin:e,status:a||i},p?t.emit("response",null,o):t.emit("error",l,o),t.emit("end",o),t.destroy()},d(t,n),t},always:function(t){return"function"==typeof t&&this.on("end",t),this},destroy:function(){this.un(),this._opts=null}}),e.on("request",function(t,e){if(e=e&&r(e)){var n="disabled";e.addClass(n).prop("disabled",!0),t.once("end",function(){e.removeClass(n).prop("disabled",!1),e=null})}}),e.ajax=function(t,e,n){"object"==typeof t&&(n=e,e=t,t=void 0),e=e||{},t&&(e.url=t);var i=new h(e),o=function(t,n){var r=t.stack&&t.stack.split("\n").slice(0,2).join("\n")||t,i={stack:r,origin:e,response:n};f("error",i,n),a(function(){console.log("%c "+r,"color:#ae0000")},1)},s=p(e.error||l,null,o),u=p(e.success||l,null,o);if(f("request",i,n)!==!1){if(n&&(n=r(n))){var c,d,v="data-async-lock";if(1===+n.attr(v))return;(d=n.attr("data-async-text"))&&(c=n.html(),n.html(d)),n.attr(v,1),i.once("response error",function(){n&&(n.attr(v,0),d&&n.html(c),n=null)})}return i.on("error",function(t,e){var n={code:t.error,message:t.msg,status:e.status,origin:e.origin,response:e.data};f("error",n,e)!==!1&&s(t)}),i.on("response",function(t,e){if(e=e.data,f("response",e)!==!1)return t?void s(t):void(e&&0===+(e.error||0)?u(e):s(e))}),i.send()}},r.each(["get","post","jsonp"],function(t,n){e[n]=function(t,r,i,o,a){"function"==typeof r&&(a=a||o,o=i,i=r,r=void 0),o&&"function"!=typeof o&&(a=o,o=void 0);var l={data:r,success:i,error:o||i};"string"==typeof t?l.url=t:s(l,t);var u=n;return"jsonp"===n&&(u="get",l.dataType="jsonp"),l.type=u,e.ajax(l,a)}})}),define("plugins/polling-list/1.0.0/polling",["require","exports","module","jquery","lib/core/1.0.0/io/request","lib/core/1.0.0/event/emitter","lib/core/1.0.0/utils/util"],function(t,e,n){"use strict";function r(t,e){var n=this,r={ajax:{type:"get",data:null},time:1e3};n.options=i.extend(!0,{},r,e),n.options.ajax.url=t,n._isLoading=!1}var i=t("jquery"),o=t("lib/core/1.0.0/io/request"),a=t("lib/core/1.0.0/event/emitter"),l=t("lib/core/1.0.0/utils/util");l.inherits(r,a),r.prototype.start=function(){var t=this,e=t.options,n=t.options.ajax;t._isLoading=!1,t._interval||(t._interval=setInterval(function(){t._isLoading||(t._isLoading=!0,o[n.type](n.url,n.data,function(e){t._isLoading=!1,t.emit("success",e)},function(e){t._isLoading=!1,t.emit("error",e)}))},e.time))},r.prototype.stop=function(){var t=this;t.options,t.options.ajax;t._isLoading=!0},r.prototype.setData=function(t){var e=this;e.options.ajax.data=i.extend({},e.options.ajax.data,t)},n.exports=r}),define("plugins/polling-list/1.0.0/polling-list",["require","exports","module","jquery","lib/core/1.0.0/io/request","lib/core/1.0.0/event/emitter","lib/core/1.0.0/utils/util","./polling"],function(t,e,n){"use strict";function r(t,e){var n=this;if(n.el=i(t),0==n.el.length)throw new Error("the param [el] is required.");n.container=i('<div node-type="container"></div>'),n.el.html(n.container);var r={ajax:{url:null,type:"get",data:null}};n.options=i.extend(!0,{},r,e),n._init(),n._initEvent()}var i=t("jquery"),o=(t("lib/core/1.0.0/io/request"),t("lib/core/1.0.0/event/emitter")),a=t("lib/core/1.0.0/utils/util"),l=t("./polling");a.inherits(r,o),r.prototype._init=function(){var t=this;t.polling=new l(t.options.ajax.url,{ajax:t.options.ajax})},r.prototype._initEvent=function(){var t=this;t.polling.on("error",function(e){t.emit("error",e,t.container)}),t.polling.on("success",function(e){t.emit("success",e,t.container)}),t.el.on("scroll",function(e){t.el.scrollTop()+t.el.height()>=t.container.height()&&t.emit("pullup")})},l.prototype.setData=function(t){var e=this;e.polling.setData(t)},r.prototype.destroy=function(){},r.prototype.html=function(t){var e=this;e.container.html(t)},r.prototype.prepend=function(t){var e=this;e.container.prepend(t)},r.prototype.append=function(t){var e=this;e.container.append(t)},r.prototype.start=function(){var t=this;t.polling.start()},r.prototype.stop=function(){var t=this;t.polling.stop()},r.prototype.clear=function(){var t=this;t.container.html("")},r.prototype.scrollTo=function(t){var e=this;e.el.stop().animate({scrollTop:t||0})},n.exports=r}),!function(){function t(t){return t.replace(b,"").replace(A,",").replace(x,"").replace(_,"").replace(w,"").split(j)}function e(t){return"'"+t.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function n(n,r){function i(t){return f+=t.split(/\n/).length-1,c&&(t=t.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),t&&(t=y[1]+e(t)+y[2]+"\n"),t}function o(e){var n=f;if(u?e=u(e,r):a&&(e=e.replace(/\n/g,function(){return f++,"$line="+f+";"})),0===e.indexOf("=")){var i=p&&!/^=[=#]/.test(e);if(e=e.replace(/^=[=#]?|[\s;]*$/g,""),i){var o=e.replace(/\s*\([^\)]+\)/,"");d[o]||/^(include|print)$/.test(o)||(e="$escape("+e+")")}else e="$string("+e+")";e=y[1]+e+y[2]}return a&&(e="$line="+n+";"+e),g(t(e),function(t){if(t&&!v[t]){var e;e="print"===t?A:"include"===t?x:d[t]?"$utils."+t:h[t]?"$helpers."+t:"$data."+t,_+=t+"="+e+",",v[t]=!0}}),e+"\n"}var a=r.debug,l=r.openTag,s=r.closeTag,u=r.parser,c=r.compress,p=r.escape,f=1,v={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},m="".trim,y=m?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],b=m?"$out+=text;return $out;":"$out.push(text);",A="function(){var text=''.concat.apply('',arguments);"+b+"}",x="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+b+"}",_="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(a?"$line=0,":""),w=y[0],j="return new String("+y[3]+");";g(n.split(l),function(t){t=t.split(s);var e=t[0],n=t[1];1===t.length?w+=i(e):(w+=o(e),n&&(w+=i(n)))});var $=_+w+j;a&&($="try{"+$+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+e(n)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var E=new Function("$data","$filename",$);return E.prototype=d,E}catch(t){throw t.temp="function anonymous($data,$filename) {"+$+"}",t}}var r=function(t,e){return"string"==typeof e?m(e,{filename:t}):a(t,e)};r.version="3.0.0",r.config=function(t,e){i[t]=e};var i=r.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},o=r.cache={};r.render=function(t,e){return m(t,e)};var a=r.renderFile=function(t,e){var n=r.get(t)||v({filename:t,name:"Render Error",message:"Template not found"});return e?n(e):n};r.get=function(t){var e;if(o[t])e=o[t];else if("object"==typeof document){var n=document.getElementById(t);if(n){var r=(n.value||n.innerHTML).replace(/^\s*|\s*$/g,"");e=m(r,{filename:t})}}return e};var l=function(t,e){return"string"!=typeof t&&(e=typeof t,"number"===e?t+="":t="function"===e?l(t.call(t)):""),t},s={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},u=function(t){return s[t]},c=function(t){return l(t).replace(/&(?![\w#]+;)|[<>"']/g,u)},p=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},f=function(t,e){var n,r;if(p(t))for(n=0,r=t.length;r>n;n++)e.call(t,t[n],n,t);else for(n in t)e.call(t,t[n],n)},d=r.utils={$helpers:{},$include:a,$string:l,$escape:c,$each:f};r.helper=function(t,e){h[t]=e};var h=r.helpers=d.$helpers;r.onerror=function(t){var e="Template Error\n\n";for(var n in t)e+="<"+n+">\n"+t[n]+"\n\n";"object"==typeof console&&console.error(e)};var v=function(t){return r.onerror(t),function(){return"{Template Error}"}},m=r.compile=function(t,e){function r(n){try{return new s(n,l)+""}catch(r){return e.debug?v(r)():(e.debug=!0,m(t,e)(n))}}e=e||{};for(var a in i)void 0===e[a]&&(e[a]=i[a]);var l=e.filename;try{var s=n(t,e)}catch(t){return t.filename=l||"anonymous",t.name="Syntax Error",v(t)}return r.prototype=s.prototype,r.toString=function(){return s.toString()},l&&e.cache&&(o[l]=r),r},g=d.$each,y="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",b=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,A=/[^\w$]+/g,x=new RegExp(["\\b"+y.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),_=/^\d[^,]*|,\d[^,]*/g,w=/^,+|,+$/g,j=/^$|,+/;i.openTag="{{",i.closeTag="}}";var $=function(t,e){var n=e.split(":"),r=n.shift(),i=n.join(":")||"";return i&&(i=", "+i),"$helpers."+r+"("+t+i+")"};i.parser=function(t){t=t.replace(/^\s/,"");var e=t.split(" "),n=e.shift(),i=e.join(" ");switch(n){case"if":t="if("+i+"){";break;case"else":e="if"===e.shift()?" if("+e.join(" ")+")":"",t="}else"+e+"{";break;case"/if":t="}";break;case"each":var o=e[0]||"$data",a=e[1]||"as",l=e[2]||"$value",s=e[3]||"$index",u=l+","+s;"as"!==a&&(o="[]"),t="$each("+o+",function("+u+"){";break;case"/each":t="});";break;case"echo":t="print("+i+");";break;case"print":case"include":t=n+"("+e.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(i)){var c=!0;0===t.indexOf("#")&&(t=t.substr(1),c=!1);for(var p=0,f=t.split("|"),d=f.length,h=f[p++];d>p;p++)h=$(h,f[p]);t=(c?"=":"=#")+h}else t=r.helpers[n]?"=#"+n+"("+e.join(",")+");":"="+t}return t},"function"==typeof define?define("template",[],function(){return r}):"undefined"!=typeof exports?module.exports=r:this.template=r}(),define("module/monitor/1.0.0/question",["require","exports","module","jquery","./../../../plugins/polling-list/1.0.0/polling-list","lib/core/1.0.0/io/request","lib/core/1.0.0/event/emitter","lib/core/1.0.0/utils/util","template"],function(t,e,n){"use strict";function r(t,e){var n=this;if(n.el=i(t),0==n.el.length)throw new Error("the param [el] is required.");var r={pollingAjax:{url:null,type:"get",data:null},pagerAjax:{url:null,type:"get",data:null}};n.options=i.extend(!0,{},r,e),n._isPulling=!1,n._init(),n._initEvent(),n.max=0}var i=t("jquery"),o=t("./../../../plugins/polling-list/1.0.0/polling-list"),a=t("lib/core/1.0.0/io/request"),l=t("lib/core/1.0.0/event/emitter"),s=t("lib/core/1.0.0/utils/util"),u=t("template");s.inherits(r,l),r.prototype._init=function(){var t=this;t.pollingList=new o(t.el,{ajax:t.options.pollingAjax,data:{max:t.max}}),t._loadingHtml()},r.prototype._initEvent=function(){var t=this,e=(t.options,t.options.pagerAjax);t.pollingList.on("error",function(t){}),t.pollingList.on("success",function(e){e&&e.data&&e.data.resultList&&e.data.resultList.length>0&&t.pollingList.html(t.template(e.data)),t.scrollTo(0)}),t.el.on("mouseenter",function(){t.stop()}),t.el.on("mouseleave",function(){t.start()}),t.pollingList.on("pullup",function(n){t._isPulling||(t._isPulling=!0,a[e.type](e.url,e.data,function(e){
t._isPulling=!1,t.pollingList.append(t.template(e.data))},function(e){t._isPulling=!1}))})},r.prototype._loadingHtml=function(){var t=this,e="";e+='<div class="ui-loading-list">',e+='<div class="img-loading"></div>',e+='\t<div class="txt">',e+="\t正在卖力加载，请稍后",e+="  </div>",e+="</div>",t.pollingList.html(e)},r.prototype.start=function(){var t=this;t.pollingList.start()},r.prototype.stop=function(){var t=this;t.pollingList.stop()},r.prototype.clear=function(){var t=this;t.pollingList.container.html("")},r.prototype.destroy=function(){},r.prototype.scrollTo=function(t){var e=this;e.pollingList.scrollTo(t)},r.prototype.template=function(t){return u("tQuestion",t)},n.exports=r}),define("conf/polling-list",["require","exports","module","jquery","module/top-search/1.0.0/top-search","module/login-status/1.0.0/login-status","module/fix-bar/1.0.0/fix-bar","module/footer/1.0.0/footer","module/monitor/1.0.0/question"],function(t,e,n){"use strict";var r=t("jquery"),i=t("module/top-search/1.0.0/top-search"),o=t("module/login-status/1.0.0/login-status"),a=t("module/fix-bar/1.0.0/fix-bar"),l=t("module/footer/1.0.0/footer"),s=(new i,new o,new a,new l,t("module/monitor/1.0.0/question")),u=new s("#jPollingList1",{pollingAjax:{url:$PAGE_DATA.baseStaticUrl+"/source/api/demo/demo.json"},pagerAjax:{url:$PAGE_DATA.baseStaticUrl+"/source/api/demo/demo.json"}}),c=r("#jAddRecord1"),p=r("#jAddRecord2"),f=r("#jStart1"),d=r("#jStop1"),h=r("#jClear1"),v=0;c.on("click",function(){u.prepend('<div class="item">我是追加内容</div>')}),f.on("click",function(){u.start()}),d.on("click",function(){u.stop()}),h.on("click",function(){u.clear()}),p.on("click",function(){pollingList2.add('<div class="item">'+v++ +"</div>"),pollingList2.scrollTo(0)})});