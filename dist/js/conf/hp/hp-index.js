/*! Based on work by Simon Willison: http://gist.github.com/292562 */

/*! Weakdata - https://gist.github.com/b84827b7af6da78acb67ca75839cf1c6 by @allex | MIT License */

define("lib/core/1.0.0/utils/util",["require","exports","module"],function(t,e,n){"use strict";function r(t){return"object"==typeof t&&null!==t}function o(){}function i(t,e){for(var n=t.length,r=-1;++r<n;)e(t[r],r)}function u(t,e){for(var n in t)d.call(t,n)&&e(t[n],n,t)}function s(t,e){return t&&t.forEach?t.forEach(e):void(h(t)?i(t,e):u(t,e))}function a(t,e){for(var n=-1,r=t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}function l(t,e){var n=[];return s(t,function(t,r,o){n.push(e(t,r,o))}),n}function c(t,e){if(!e||!r(e))return t;for(var n=m(e),o=n.length;o--;)t[n[o]]=e[n[o]];return t}function f(t){"?"===t.charAt(0)&&(t=t.substr(1));for(var e,n={},r=t.split("&"),o=-1,i=r.length;++o<i;)e=r[o].split("="),n[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return n}var p=new Function("return this")(),d=Object.prototype.hasOwnProperty,h=Array.isArray||function(t){return t&&t instanceof Array},v=function(){var t=(+new Date).toString(36),e=-1;return function(n){return(n||"")+t+ ++e}}(),m=Object.keys||function(t){var e=[];return u(t,function(t,n){e.push(n)}),e},y="function"==typeof Object.create?function(t,e){t.__super__=e.prototype,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:function(){function t(t){this.constructor=t}return function(e,n){e.__super__=n.prototype,t.prototype=n.prototype,e.prototype=new t(e)}}(),g=p.console||(p.console={});i(["log","error","trace","warn","info"],function(t){g[t]||(g[t]=o)}),e.extend=function(t,e){for(var n=[].slice.call(arguments,1),r=n.length,o=-1;++o<r;)c(t,n[o]);return t},e.inherits=function(t,e,n){y(t,e),n&&c(t.prototype,n)},e.impls=function(t,n){return n="function"==typeof n?n.prototype:n,e.mix(t.prototype,n),t},e.parseQuery=f,e.parseParams=f,e.each=s,e.map=function(t,e){var n=h(t)?a:l;return n(t,e)},e.filter=function(t,e){var n,r,o=h(t)?(n=i,r=function(t,e){o.push(e)},[]):(n=u,r=function(t,e){o[t]=e},{});return n(t,function(t,n){e(t,n)&&r(n,t)}),o},e.mix=function t(e,n,r,o,i){for(var u in n)n.hasOwnProperty(u)&&(n[u]&&e[u]&&r&&"object"==typeof n[u]?t(e[u],n[u],r,o,i):(void 0===e[u]||o)&&(i&&!i(e[u],n[u])||(e[u]=n[u])));return e},e.guid=v,e.setImmediate=function(){var t=p.document,e=p.postMessage,n=p.setImmediate;return n?n:"onreadystatechange"in t.createElement("script")?function(e){function n(){r.onreadystatechange=null,r.parentNode.removeChild(r),e()}var r=t.createElement("script");r.onreadystatechange=n,t.documentElement.appendChild(r)}:e?function(t){function n(e){e.data===r&&(p.removeEventListener("message",n,!0),t())}var r=v();p.addEventListener("message",n,!0),e(r,"*")}:function(t){p.setTimeout(t,0)}}(),e.noop=o,e.throttle=function(t,e){if(e=e?e:150,e===-1)return function(){t.apply(this,arguments)};var n;return function(){var r=+new Date;(!n||r-n>e)&&(n=r,t.apply(this,arguments))}},e.debounce=function(t,e,n,r){var o;return function(){var i=r||this,u=arguments,s=function(){o=null,n||t.apply(i,u)},a=n&&!o;clearTimeout(o),o=setTimeout(s,e),a&&t.apply(i,u)}},e.deprecate=function(t,e){function n(){return r||(r=!0),t.apply(this,arguments)}if(p.noDeprecation===!0)return t;var r=!1;return n}}),function(t,e){if("function"==typeof define&&define.amd)define("lib/core/1.0.0/event/emitter",e);else if("undefined"!=typeof module)e(require,module.exports,module);else{var n={exports:{}};e(null,n.exports,n),t.EventEmitter=n.exports}}(this,function(t,e,n){"use strict";function r(){}function o(t,e,n,r){var o=!0;if(e)for(var i,u,s,a=-1,l={type:t,timeStamp:c()};i=e[++a];){u=i[v],s=i[m]||r;try{o=i[y]===h?u.call(s,l,n)!==!1&&o:u.apply(s,n)!==!1&&o}catch(t){setTimeout(function(){console.error(t)},1)}}return o}function i(t){var e,n=p(this);return n?(e=n[t],e.length):0}function u(t){return"[object Function]"===Object.prototype.toString.call(t)}function s(t,e){for(var n in t)t.hasOwnProperty(n)&&e(t[n],n)}function a(t,e){t.forEach?t.forEach(e):function(t){for(var n=-1,r=t.length;++n<r;)e(t[n],n)}(t)}var l=/\s+/,c=Date.now||function(){return+new Date},f=function(){return c()*Math.random()&65535}(),p=function(){var t,e,n;return"function"==typeof WeakMap&&(WeakMap.prototype||0).set?(t=new WeakMap,function(e,n){var r=t.get(e);return null===n?void 0!==r&&t.delete(e):!r&&n?(t.set(e,r={}),r):r}):(e=c(),n="__$widΦ"+e.toString(36),t={},function(r,o){if(!r||"object"!=typeof r)throw TypeError("Invalid value used as weak map key");var i;return null===o?r[n]&&(delete t[r[n]],delete r[n]):(i=r[n]||o&&(i=++e,t[i]={},r[n]=i),i&&t[i])})}(),d=1,h=2,v=0,m=1,y=2,g=function(t,e,n){var r=[];return r[v]=t,r[m]=e,r[y]=n,r},A=r.prototype;A.addListener=function(t,e,n,r){var o,i,u,s=d;if(e&&"object"==typeof e&&(n=e,e=n.handleEvent,s=h),!e)return this;for(o=p(this,1),t=t.split(l);i=t.shift();)u=!r&&o[i]||(o[i]=[]),u.push(g(e,n,s));return this},A.on=A.addListener,A.once=function(t,e,n){var r=!1,o=function(){this.removeListener(t,o),r||(r=!0,e.apply(n||this,arguments))};return o.guid=e.guid||(e.guid=f++),this.on(t,o)},A.removeListener=function(t,e,n){var r,o,i,u,a,c;if(e&&"object"==typeof e&&(n=e,e=n.handleEvent),!(r=p(this)))return this;if(!(t||e||n))return s(r,function(t,e){delete r[e]}),p(this,null),this;for(t=t?t.split(l):b(r);o=t.shift();)if(i=r[o])if(e||n)for(u=i.length;--u>=0;)a=i[u],c=a[v],e&&c!==e&&(void 0===c.guid||c.guid!==e.guid)||n&&a[m]!==n||i.splice(u,1);else delete r[o];return this},A.un=A.removeListener,A.removeAllListeners=function(t){return this.removeListener(t)},A.emit=function(t){var e,n,r,i,u,s,a=[],c=!0;if(!(e=p(this)))return this;for(t=t.split(l),u=1,s=arguments.length;u<s;u++)a[u-1]=arguments[u];for(;n=t.shift();)(r=e.all)&&(r=r.slice()),(i=e[n])&&(i=i.slice()),"all"!==n&&(c=o(n,i,a,this)&&c),c=o(n,r,[n].concat(a),this)&&c;return c},r.applyTo=function(t){function e(e,r){t[e]=function(){var o=n[e].apply(r||t,Array.prototype.slice.call(arguments));return o===r?this:o}}var n=A,r=b(n);u(t)?a(r,function(e){t.prototype[e]=n[e]}):a(r,function(t){e(t)})},r.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):i.call(t,e)},A.listenerCount=i;var b=Object.keys||function(t){var e=[];return s(t,function(t,n){e.push(n)}),e};n.exports=r}),define("lib/core/1.0.0/io/request",["require","exports","module","jquery","../utils/util","../event/emitter"],function(t,e,n){"use strict";var r=t("jquery"),o=t("../utils/util"),i=t("../event/emitter"),u=o.setImmediate,s=o.noop,a=o.extend,l=r.trim,c=r.parseJSON,f=function(t,e,n){return function(r,o){try{return t.apply(e,arguments)}catch(t){n&&n(t,r,o)}}},p=function(t){return e.emit.apply(e,arguments)};i.applyTo(e);var d=function(){var t=5,e=0,n=[],o=function(){u(function(){--e,i()})},i=function(){if(n.length>0&&e<t){var i=n.shift(),u=i[0],s=i[1];++e,u.always(o),r.ajax(s)}};return function(t,e){n.push([t,e]),i()}}(),h=function(t){i.applyTo(this);var e={url:"",type:"GET",data:{},dataType:"json",timeout:3e4,cache:!1};t=a(e,t),delete t.error,delete t.success,this._opts=t};a(h.prototype,{send:function(){var t=this,e=this._opts,n=a({},e),r="jsonp"===n.dataType;return r&&(n.crossDomain=!0),n.complete=function(n,o){var i,u=+n.status,s=n.responseJSON,a={error:"1",msg:"Request error (status: "+(o||u)+")"},f=200===u||"success"===o;if(!r&&!s&&(s=l(n.responseText),s&&"<"!==s.charAt(0)))try{s=c(s)}catch(t){}f||(s=s||a),i={data:s,xhr:n,origin:e,status:u||o},f?t.emit("response",null,i):t.emit("error",s,i),t.emit("end",i),t.destroy()},d(t,n),t},always:function(t){return"function"==typeof t&&this.on("end",t),this},destroy:function(){this.un(),this._opts=null}}),e.on("request",function(t,e){if(e=e&&r(e)){var n="disabled";e.addClass(n).prop("disabled",!0),t.once("end",function(){e.removeClass(n).prop("disabled",!1),e=null})}}),e.ajax=function(t,e,n){"object"==typeof t&&(n=e,e=t,t=void 0),e=e||{},t&&(e.url=t);var o=new h(e),i=function(t,n){var r=t.stack&&t.stack.split("\n").slice(0,2).join("\n")||t,o={stack:r,origin:e,response:n};p("error",o,n),u(function(){console.log("%c "+r,"color:#ae0000")},1)},a=f(e.error||s,null,i),l=f(e.success||s,null,i);if(p("request",o,n)!==!1){if(n&&(n=r(n))){var c,d,v="data-async-lock";if(1===+n.attr(v))return;(d=n.attr("data-async-text"))&&(c=n.html(),n.html(d)),n.attr(v,1),o.once("response error",function(){n&&(n.attr(v,0),d&&n.html(c),n=null)})}return o.on("error",function(t,e){var n={code:t.error,message:t.msg,status:e.status,origin:e.origin,response:e.data};p("error",n,e)!==!1&&a(t)}),o.on("response",function(t,e){if(e=e.data,p("response",e)!==!1)return t?void a(t):void(e&&0===+(e.error||0)?l(e):a(e))}),o.send()}},r.each(["get","post","jsonp"],function(t,n){e[n]=function(t,r,o,i,u){"function"==typeof r&&(u=u||i,i=o,o=r,r=void 0),i&&"function"!=typeof i&&(u=i,i=void 0);var s={data:r,success:o,error:i||o};"string"==typeof t?s.url=t:a(s,t);var l=n;return"jsonp"===n&&(l="get",s.dataType="jsonp"),s.type=l,e.ajax(s,u)}})}),define("lib/core/1.0.0/dom/dataset",["require","exports","module","jquery"],function(t,e,n){"use strict";function r(t){return t.replace(s,"ms-").replace(a,l)}function o(t){try{return"true"===t||"false"!==t&&("null"===t?null:+t+""===t?+t:c.test(t)?u.parseJSON(t):t)}catch(t){}}function i(t,e,n){var r;return void 0===n&&1===t.nodeType&&(r="data-"+e.replace(f,"-$&").toLowerCase(),n=t.getAttribute(r),"string"!=typeof n&&(n=void 0)),n}var u=(window.document,t("jquery")),s=/^-ms-/,a=/-([\da-z])/gi,l=function(t,e){return e.toUpperCase()},c=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,f=/[A-Z]/g,p=function(t,e,n){if(!t||1!==t.nodeType)throw new TypeError("dataset(): Not a valid DOM element.");var u,s,a,l;if(1===arguments.length){if(a=t.dataset){l={};for(s in a)a.hasOwnProperty(s)&&(l[s]=o(a[s]));return l}for(a=t.attributes,u=a.length,l={};u--;)a[u]&&(s=a[u].name,0===s.indexOf("data-")&&(s=r(s.slice(5)),l[s]=o(i(t,s))));return l}};n.exports=p}),define("lib/core/1.0.0/dom/build",["require","exports","module","jquery","./dataset"],function(t,e,n){"use strict";function r(t,e,n,r){r?t[e]||(t[e]=n):t[e]?t[e]=t[e].add(n):t[e]=i(n)}var o=window.document,i=t("jquery"),u=function(t,e,n){var u,s,a,l,c,f=function(t){if(n)for(var o in n)a[o]=i(n[o].toString(),t);else{a={},l=i("[node-type]",t);for(var u,s=-1,c=l.length;++s<c;)u=l[s],o=u.getAttribute("node-type"),r(a,o,u,e)}},p=function(t){var n,o=a[t];return o&&0!==o.length||(n=i('[node-type="'+t+'"]',u),n.length&&r(a,t,n,e),o=a[t]),o};if(void 0===e&&(e=!0),u=t,"string"==typeof t&&"<"===t.charAt(0))for(u=o.createElement("div"),u.innerHTML=t,s=o.createDocumentFragment();c=u.firsChild;)s.appendChild(c);else u=i(t),s=u[0];return f(u),{get:p,box:s,list:a}};e.build=u,e.parse=function(t,e,n){if("object"==typeof t&&t.length>0&&(t=t[0]),!t||1!==t.nodeType)throw TypeError("parse error, not a valid html element");return"boolean"==typeof n&&(e=n,n=null),u(t,e,n).list},e.dataset=t("./dataset")}),define("module/top-search/1.0.0/top-search",["require","exports","module","jquery","lib/core/1.0.0/utils/util","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function r(t){var e=this,n={activeClass:"focus",selector:"#jTopSearch",url:$PAGE_DATA&&$PAGE_DATA.topSearchUrl||"",data:{},alias:"name"};if(e.options=o.extend(!0,{},n,t),""==e.options.url)throw new Error("the params options.url is required");e.el=o(e.options.selector);var r=i.build(e.el[0],!1);e.ipt=r.get("ipt"),e.btn=r.get("btn"),e.lbl=r.get("lbl"),e._init(),e._initEvent()}var o=t("jquery"),i=(t("lib/core/1.0.0/utils/util"),t("lib/core/1.0.0/dom/build"));r.prototype._initEvent=function(){var t=this;t.ipt.on("focus",function(){t.focus()}),t.ipt.on("blur",function(){0==t.getValue().length&&t.blur()}),t.ipt.on("keydown",function(e){13===e.keyCode&&t.search()}),t.btn.on("click",function(){t.search()})},r.prototype._init=function(){var t=this,e=o.trim(t.ipt.val()),n=t.ipt.attr("data-id");e.length>0&&t.focus(),n&&(t.options.alias=n),t.options.data&&(t.options.data[t.options.alias]=o.trim(t.ipt.val()))},r.prototype.focus=function(){var t=this;t.el.addClass(t.options.activeClass)},r.prototype.blur=function(){var t=this;t.el.removeClass(t.options.activeClass)},r.prototype.getValue=function(){var t=this;return o.trim(t.ipt.val())},r.prototype.search=function(){var t=this;t.options.data[t.options.alias]=t.getValue(),window.location.href=t.options.url+"?"+t._getUrlString()},r.prototype._getUrlString=function(){var t=this,e="",n=0;for(var r in t.options.data)e+=0==n?r+"="+encodeURIComponent(t.options.data[r]):"&"+r+"="+encodeURIComponent(t.options.data[r]),n++;return e},n.exports=r}),define("lib/core/1.0.0/io/cookie",["require","exports","module"],function(t,e,n){"use strict";var r=window.document,o=function(t){if("string"!=typeof t)throw"trim need a string as parameter";for(var e=t.length,n=0,r=e-1,o=/(\u3000|\s|\t|\u00A0)/;n<e&&o.test(t.charAt(n));)++n;for(;r>=0&&o.test(t.charAt(r));)--r;return t.substring(n,r+1)},i=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},u=function(t,e,n){if(n=n||{},void 0!==e){if(n=i(n),null===e&&(e="",n.expires=-1),"number"==typeof n.expires){var u=n.expires,s=n.expires=new Date;s.setTime(s.getTime()+864e5*u)}var a=function(t){try{return n.raw?t:encodeURIComponent(t)}catch(t){}return t};return r.cookie=[a(t),"=",a(e),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}for(var e=null,l=r.cookie,c=function(t){return n.raw?t:decodeURIComponent(t)},f=l?l.split("; "):[],p=-1,d=f.length,h=t.length+1;++p<d;)if(l=o(f[p]),l.substring(0,h)===t+"="){e=c(l.substring(h));break}return e};u.set=function(t,e,n){return u(t,e,n)},u.get=function(t){return u(t)},n.exports=u}),define("module/login-status/1.0.0/login",["require","exports","module","lib/core/1.0.0/io/cookie"],function(t,e,n){"use strict";var r=t("lib/core/1.0.0/io/cookie"),o="_nick",i="_ui_",u=$PAGE_DATA&&$PAGE_DATA.LOGIN_URL||"",s=$PAGE_DATA&&$PAGE_DATA[o]||null;e.getNick=function(){return s},e.isLogin=function(){return!!r(i)},e.login=function(t){u&&(t=t?"?returnUrl="+decodeURIComponent(t):"",window.location.href=u+t)}}),define("module/login-status/1.0.0/login-status",["require","exports","module","jquery","lib/core/1.0.0/dom/build","./login"],function(t,e,n){"use strict";function r(t){var e=this,n={selector:"#jLoginStatus",userCenterUrl:$PAGE_DATA&&$PAGE_DATA.userCenterUrl||"javascript:;",loginOutUrl:$PAGE_DATA&&$PAGE_DATA.loginOutUrl||"javascript:;",menuList:[{title:"编辑资料",url:$PAGE_DATA&&$PAGE_DATA.editUserInfoUrl||"javascript:;"},{title:"学习中心",url:$PAGE_DATA&&$PAGE_DATA.learningCenterUrl||"javascript:;"}]};e.options=o.extend(!0,{},n,t),e.el=o(e.options.selector),e._init()}var o=t("jquery"),i=t("lib/core/1.0.0/dom/build"),u=t("./login");r.prototype._init=function(){var t=this,e=u.getNick();e&&(t.el.html(t._getLoginedHtml(e)),t._initEvent())},r.prototype._initEvent=function(){var t=this,e=!1,n=i.build(t.el[0],!1),r=n.get("userName"),o=n.get("tipsMenu");r.on("mouseenter",function(){e=!0,o.stop().fadeIn(500,function(){o.addClass("active")})}),r.on("mouseleave",function(){e=!1,setTimeout(function(){e||o.stop().fadeOut(500,function(){o.removeClass("active")})},200)}),o.on("mouseenter",function(){e=!0}),o.on("mouseleave",function(){e=!1,o.removeClass("active")})},r.prototype._getLoginedHtml=function(t){var e=this,n=e.options,r=n.menuList,o="";o+='<ul class="logined clearfix" node-type="logined">',o+='    <li class="item">',o+="        <span>您好，</span>",o+="    </li>",o+='    <li class="item tips-menu-box">',o+='        <a href="'+n.userCenterUrl+'" class="user-name txt-overflow" node-type="userName">'+t+"</a>",o+='        <div class="tips-menu" node-type="tipsMenu">',o+='            <div class="arrow"><i></i><b></b></div>',o+='            <ul class="tips-menu-list">';for(var i=0,u=r.length;i<u;i++)o+='            <li class="tips-menu-item"><a href="'+r[i].url+'">'+r[i].title+"</a></li>";return o+="            </ul>",o+="        </div>",o+="    </li>",o+='    <li class="item">',o+='        <a href="'+n.loginOutUrl+'" class="btn">退出</a>',o+="    </li>",o+="</ul>"},n.exports=r}),define("module/fix-bar/1.0.0/fix-bar",["require","exports","module","jquery","lib/core/1.0.0/utils/util","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function r(t){var e=this,n={onlineServiceUrl:""};e.options=o.extend(!0,{},n,t),e._init(),e._initEvent()}var o=t("jquery");t("lib/core/1.0.0/utils/util"),t("lib/core/1.0.0/dom/build");r.prototype._init=function(){var t=this;t.el=o(t._getTemplete()),o(document.body).append(t.el),t.height=t.el.height(),t.resize()},r.prototype._initEvent=function(){var t=this;o(window).on("resize",function(){t.resize()})},r.prototype.resize=function(){var t=this,e=o(window).height(),n=(e-t.height)/2;n>=0?(t.el.css({top:n}),t.el.addClass("active")):t.el.removeClass("active")},r.prototype._getTemplete=function(){var t=this,e="";return e+='<div class="ui-fix-bar">',e+='    <ul class="list clearfix" node-type="list">',e+='        <li class="jItem item item-service" node-id="service">',e+='            <a href="'+t.options.onlineServiceUrl+'">',e+='                <i class="iyoyo iyoyo-service"></i>',e+="                <span>在线客服</span>",e+="            </a>",e+="        </li>",e+="    </ul>",e+="</div>"},n.exports=r}),function(t,e,n){"function"==typeof define&&define.amd?define("lib/plugins/lazyload/1.9.3/lazyload",["jquery"],n):t[e]=n(t.jQuery||t.Zepto)}(this,"Lazyload",function(t,e){"use strict";if(!t)throw"Error: jquery api not implements.";var n=t.each,r=function(t,e){if(t instanceof Array&&t.filter)return t.filter(e);for(var n=[],r=-1,o=t.length;++r<o;)e(t[r],r)&&n.push(t[r]);return n},o=function(t,e,n,r){var o;return function(){var i=r||this,u=arguments,s=function(){o=null,n||t.apply(i,u)},a=n&&!o;clearTimeout(o),o=setTimeout(s,e),a&&t.apply(i,u)}},i=function(e,n){e=e||{};var r=t(e),o=Array.prototype.slice;return n=n||e.name,t.each({on:"on",un:"off",once:"one",emit:"trigger"},function(t,i){e[t]=function(e){var u=o.call(arguments,0),s=u[1];return n&&!~e.indexOf(".")&&(u[0]=e+"."+n),"function"==typeof s&&("on"===t||"once"===t?u[1]=s.__||(s.__=function(t){return t.preventDefault(),s.apply(this,o.call(arguments,1))}):"un"===t&&(u[1]=s.__)),r[i].apply(r,u)}}),e},u=window,s=t(u),a=u.Image,l=/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion),c="__lazy_status__",f=0,p=1,d=2,h=function(t){return t[c]===e},v=function(){var t={},e=function(e,n){"function"==typeof n&&(t[e]=n)},n=function(e){return t[e]};return{define:e,get:n}}();v.define("image",function(n,r,o,i){if(!r)return void i("error");var u=new a,s=function(){u.onload=u.onerror=null,u=r=n=i=s=e};u.onload=function(){var e=t(n),u=o.effect;"function"!=typeof e[u]&&(u="show"),e.hide(),"IMG"===n.nodeName.toUpperCase()?e.attr("src",r):e.css("background-image",'url("'+r+'")'),e[u](o.effectSpeed),i(null,"load"),s()},u.onerror=function(t){i(t),s()},u.src=r}),v.define("html",function(t,e,n,r){r()});var m=function(e,a){a=a||{},e=t(e);var m=this,_={type:"image",threshold:50,failureLimit:0,event:"scroll",effect:"show",container:u,dataAttribute:"src",sourceMaker:null,skipInvisible:!0,appear:null,load:null,loadingClass:"",placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};i(m);var w=a.type||_.type,x=v.get(w);if("function"!=typeof x)throw"Error, cannot found the specific type loader (type: `"+w+"`)";"html"===w&&(_.placeholder=""),a&&t.extend(_,a);var j=_.container,E=_.event,T=0===E.indexOf("scroll"),C=j&&j!==u?t(j):s,q=function(e){var r=m._list;if(r.length>0){var o=0;n(r.slice(0),function(e,n){var r=t(n);if(!_.skipInvisible||r.is(":visible"))if(A(n,_)||b(n,_));else if(y(n,_)||g(n,_)){if(++o>_.failureLimit)return!1}else r.trigger("appear"),o=0})}else m.reset()},U=function(){m._list=r(m._list,function(t){return!t[c]})},k=function(){var e=this,n=t(e),r=n.attr("data-"+_.dataAttribute),o=_.sourceMaker,i=_.appear,u=_.loadingClass,s=e[c];s===f?(e[c]=p,u&&n.addClass(u),o&&(r=o(r,e)),i&&i.apply(m,[e,r]),x.call(m,e,r,_,function(t,o){if(!m._destroyed){if(u&&n.removeClass(u),t)setTimeout(function(){e[c]=f,m.emit("lazyItemError",e,r,t),e=null},300);else{e[c]=d,U(),m.emit("lazyItemReady",e,r,o);var i=_.load;i&&i.apply(m,[e,r,o]),e=null}n=null}})):s===d&&(U(),m.emit("lazyItemReady",e,r))},D=function(){this[c]||t(this).trigger("appear")},I=function(e){var n=t(e);e[c]=f;var r=_.placeholder;if(r)if(n.is("img")){var o=n.attr("src");o||n.attr("src",r)}else"image"===m._.type||n.children()[0]||n.html(r);n.on("appear",k),T||n.on(E,D),m._list.push(e)},L=function(t){t=r(t||[],h),t.length&&(n(t,function(t,e){I(e)}),m._inited||O(m))},O=function(e){if(!e._inited){var r=o(q,30);if(e._inited=!0,T&&C.on(E,r),s.on("resize",r),l){var i=function(r){r.originalEvent&&r.originalEvent.persisted&&n(e._list,function(e,n){t(n).trigger("appear")})};s.on("pageshow",i),e.once("reset",function(){s.off("pageshow",i)})}e.once("reset",function(){n(e._list,function(t,e){P(e)}),T&&C.off(E,r),s.off("resize",r)}),t(document).ready(q)}},P=function(e){var n=t(e);n.off("appear",k),T||n.off(E,D)};m.on("lazyItemReady",function(t){P(t)}),m.once("destroy",function(){L=null,q=null,U=null,k=null,D=null}),m._=_,m._list=[],m.add=function(e){var n=t(e);n.length>0&&L(n)},m.update=q,L(e)};m.prototype={constructor:m,update:function(){},peek:function(){var t=this._list,n=t.length;return n>0?t[0]:e},reset:function(){return this._inited?(this._inited=!1,this.emit("reset"),this._list.length=0,this):this},destroy:function(){this._destroyed||(this._destroyed=!0,this.reset().emit("destroy"),this.un(),this._=null)}},m.define=function(t,e){return v.define(t,e)};var y=function(e,n){var r,o=n.container;return r=o&&o!==u?t(o).offset().top+t(o).height():(u.innerHeight?u.innerHeight:s.height())+s.scrollTop(),r<=t(e).offset().top-n.threshold},g=function(e,n){var r,o=n.container;return r=o&&o!==u?t(o).offset().left+t(o).width():s.width()+s.scrollLeft(),r<=t(e).offset().left-n.threshold},A=function(e,n){var r,o=n.container;return r=o&&o!==u?t(o).offset().top:s.scrollTop(),r>=t(e).offset().top+n.threshold+t(e).height()},b=function(e,n){var r,o=n.container;return r=o&&o!==u?t(o).offset().left:s.scrollLeft(),r>=t(e).offset().left+n.threshold+t(e).width()},_=function(t,e){return!(g(t,e)||b(t,e)||y(t,e)||A(t,e))};return m.belowthefold=y,m.rightoffold=g,m.abovethetop=A,m.leftofbegin=b,m.inviewport=_,m}),define("module/footer/1.0.0/footer",["require","exports","module","jquery","lib/plugins/lazyload/1.9.3/lazyload","lib/core/1.0.0/dom/build"],function(t,e,n){"use strict";function r(t){var e=this,n={selector:"#jFooter"};if(e.options=o.extend(!0,{},n,t),e.el=o(e.options.selector),0==e.el.length)throw new Error("the params [optins.selector] is required or the [el] is not exist.");e._init()}var o=t("jquery"),i=t("lib/plugins/lazyload/1.9.3/lazyload"),u=t("lib/core/1.0.0/dom/build");r.prototype._init=function(){var t=this,e=u.build(t.el[0],!1),n=e.get("footerImg");new i(n)},n.exports=r}),define("conf/hp/hp-index",["require","exports","module","jquery","lib/core/1.0.0/io/request","module/top-search/1.0.0/top-search","module/login-status/1.0.0/login-status","module/fix-bar/1.0.0/fix-bar","module/footer/1.0.0/footer"],function(t,e,n){"use strict";var r=(t("jquery"),t("lib/core/1.0.0/io/request"),t("module/top-search/1.0.0/top-search")),o=t("module/login-status/1.0.0/login-status"),i=t("module/fix-bar/1.0.0/fix-bar"),u=t("module/footer/1.0.0/footer");new r,new o,new i,new u});