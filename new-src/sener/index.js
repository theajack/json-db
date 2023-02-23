import http from"http";import{MiddleWareReturn,praseUrl,parseParam,MiddleWare}from"sener-types";export*from"sener-types";function _regeneratorRuntime(){_regeneratorRuntime=function(){return i};var i={},e=Object.prototype,s=e.hasOwnProperty,c=Object.defineProperty||function(e,t,r){e[t]=r.value},t="function"==typeof Symbol?Symbol:{},n=t.iterator||"@@iterator",r=t.asyncIterator||"@@asyncIterator",o=t.toStringTag||"@@toStringTag";function a(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{a({},"")}catch(e){a=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var o,a,i,u,t=t&&t.prototype instanceof p?t:p,t=Object.create(t.prototype),n=new _(n||[]);return c(t,"_invoke",{value:(o=e,a=r,i=n,u="suspendedStart",function(e,t){if("executing"===u)throw new Error("Generator is already running");if("completed"===u){if("throw"===e)throw t;return k()}for(i.method=e,i.arg=t;;){var r=i.delegate;if(r){r=function e(t,r){var n=r.method,o=t.iterator[n];if(void 0===o)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=void 0,e(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;n=l(o,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,f;o=n.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,f):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,f)}(r,i);if(r){if(r===f)continue;return r}}if("next"===i.method)i.sent=i._sent=i.arg;else if("throw"===i.method){if("suspendedStart"===u)throw u="completed",i.arg;i.dispatchException(i.arg)}else"return"===i.method&&i.abrupt("return",i.arg);u="executing";r=l(o,a,i);if("normal"===r.type){if(u=i.done?"completed":"suspendedYield",r.arg===f)continue;return{value:r.arg,done:i.done}}"throw"===r.type&&(u="completed",i.method="throw",i.arg=r.arg)}})}),t}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}i.wrap=u;var f={};function p(){}function h(){}function d(){}var t={},y=(a(t,n,function(){return this}),Object.getPrototypeOf),y=y&&y(y(x([]))),v=(y&&y!==e&&s.call(y,n)&&(t=y),d.prototype=p.prototype=Object.create(t));function b(e){["next","throw","return"].forEach(function(t){a(e,t,function(e){return this._invoke(t,e)})})}function m(i,u){var t;c(this,"_invoke",{value:function(r,n){function e(){return new u(function(e,t){!function t(e,r,n,o){var a,e=l(i[e],i,r);if("throw"!==e.type)return(r=(a=e.arg).value)&&"object"==typeof r&&s.call(r,"__await")?u.resolve(r.__await).then(function(e){t("next",e,n,o)},function(e){t("throw",e,n,o)}):u.resolve(r).then(function(e){a.value=e,n(a)},function(e){return t("throw",e,n,o)});o(e.arg)}(r,n,e,t)})}return t=t?t.then(e,e):e()}})}function g(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function w(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(g,this),this.reset(!0)}function x(t){if(t){var r,e=t[n];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length))return r=-1,(e=function e(){for(;++r<t.length;)if(s.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e}).next=e}return{next:k}}function k(){return{value:void 0,done:!0}}return c(v,"constructor",{value:h.prototype=d,configurable:!0}),c(d,"constructor",{value:h,configurable:!0}),h.displayName=a(d,o,"GeneratorFunction"),i.isGeneratorFunction=function(e){e="function"==typeof e&&e.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},i.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,d):(e.__proto__=d,a(e,o,"GeneratorFunction")),e.prototype=Object.create(v),e},i.awrap=function(e){return{__await:e}},b(m.prototype),a(m.prototype,r,function(){return this}),i.AsyncIterator=m,i.async=function(e,t,r,n,o){void 0===o&&(o=Promise);var a=new m(u(e,t,r,n),o);return i.isGeneratorFunction(t)?a:a.next().then(function(e){return e.done?e.value:a.next()})},b(v),a(v,o,"Generator"),a(v,n,function(){return this}),a(v,"toString",function(){return"[object Generator]"}),i.keys=function(e){var t,r=Object(e),n=[];for(t in r)n.push(t);return n.reverse(),function e(){for(;n.length;){var t=n.pop();if(t in r)return e.value=t,e.done=!1,e}return e.done=!0,e}},i.values=x,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!e)for(var t in this)"t"===t.charAt(0)&&s.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function e(e,t){return a.type="throw",a.arg=r,n.next=e,t&&(n.method="next",n.arg=void 0),!!t}for(var t=this.tryEntries.length-1;0<=t;--t){var o=this.tryEntries[t],a=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var i=s.call(o,"catchLoc"),u=s.call(o,"finallyLoc");if(i&&u){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&s.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}var a=(o=o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc?null:o)?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),w(r),f}},catch:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r,n,o=this.tryEntries[t];if(o.tryLoc===e)return"throw"===(r=o.completion).type&&(n=r.arg,w(o)),n}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:x(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},i}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,_toPropertyKey(n.key),n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&_setPrototypeOf(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _createSuper(r){var n=_isNativeReflectConstruct();return function(){var e,t=_getPrototypeOf(r);return _possibleConstructorReturn(this,n?(e=_getPrototypeOf(this).constructor,Reflect.construct(t,arguments,e)):t.apply(this,arguments))}}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _unsupportedIterableToArray(e,t){var r;if(e)return"string"==typeof e?_arrayLikeToArray(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _createForOfIteratorHelper(e,t){var r,n,o,a,i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(i)return n=!(r=!0),{s:function(){i=i.call(e)},n:function(){var e=i.next();return r=e.done,e},e:function(e){n=!0,o=e},f:function(){try{r||null==i.return||i.return()}finally{if(n)throw o}}};if(Array.isArray(e)||(i=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length)return i&&(e=i),a=0,{s:t=function(){},n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:t};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0===r)return("string"===t?String:Number)(e);r=r.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==typeof e?e:String(e)}function __awaiter(e,i,u,s){return new(u=u||Promise)(function(r,t){function n(e){try{a(s.next(e))}catch(e){t(e)}}function o(e){try{a(s.throw(e))}catch(e){t(e)}}function a(e){var t;e.done?r(e.value):((t=e.value)instanceof u?t:new u(function(e){e(t)})).then(n,o)}a((s=s.apply(e,i||[])).next())})}var MiddleWareManager=function(){function e(){_classCallCheck(this,e),this.middlewares=[]}return _createClass(e,[{key:"use",value:function(e){if(this.middlewares.includes(e))return console.log("middleware ".concat(e.name," is used"));this.middlewares.push(e)}},{key:"remove",value:function(e){e=this.middlewares.indexOf(e);-1!==e&&this.middlewares.slice(e,1)}},{key:"applyEnter",value:function(o){return __awaiter(this,void 0,void 0,_regeneratorRuntime().mark(function e(){var t,r,n;return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=_createForOfIteratorHelper(this.middlewares),e.prev=1,t.s();case 3:if((r=t.n()).done){e.next=19;break}if((r=r.value).enter){e.next=7;break}return e.abrupt("continue",17);case 7:return e.next=9,r.enter(o);case 9:if((n=e.sent)&&n!==MiddleWareReturn.Continue){e.next=12;break}return e.abrupt("continue",17);case 12:if(n===MiddleWareReturn.Return)return e.abrupt("return",!1);e.next=16;break;case 16:return e.abrupt("break",19);case 17:e.next=3;break;case 19:e.next=24;break;case 21:e.prev=21,e.t0=e.catch(1),t.e(e.t0);case 24:return e.prev=24,t.f(),e.finish(24);case 27:return e.abrupt("return",!0);case 28:case"end":return e.stop()}},e,this,[[1,21,24,27]])}))}},{key:"applyRequest",value:function(o){return __awaiter(this,void 0,void 0,_regeneratorRuntime().mark(function e(){var t,r,n;return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=_createForOfIteratorHelper(this.middlewares),e.prev=1,t.s();case 3:if((r=t.n()).done){e.next=23;break}if((r=r.value).request){e.next=7;break}return e.abrupt("continue",21);case 7:return e.next=9,r.request(o);case 9:if((n=e.sent)&&n!==MiddleWareReturn.Continue){e.next=12;break}return e.abrupt("continue",21);case 12:"object"!==_typeof(n)?e.next=16:(Object.assign(o,n),e.next=21);break;case 16:if(n===MiddleWareReturn.Return)return e.abrupt("return",null);e.next=20;break;case 20:return e.abrupt("break",23);case 21:e.next=3;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(1),t.e(e.t0);case 28:return e.prev=28,t.f(),e.finish(28);case 31:return e.abrupt("return",o);case 32:case"end":return e.stop()}},e,this,[[1,25,28,31]])}))}},{key:"applyResponse",value:function(o){return __awaiter(this,void 0,void 0,_regeneratorRuntime().mark(function e(){var t,r,n;return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=_createForOfIteratorHelper(this.middlewares),e.prev=1,t.s();case 3:if((r=t.n()).done){e.next=23;break}if((r=r.value).response){e.next=7;break}return e.abrupt("continue",21);case 7:return e.next=9,r.response(o);case 9:if((n=e.sent)&&n!==MiddleWareReturn.Continue){e.next=12;break}return e.abrupt("continue",21);case 12:"object"!==_typeof(n)?e.next=16:(Object.assign(o,n),e.next=21);break;case 16:if(n===MiddleWareReturn.Return)return e.abrupt("return",null);e.next=20;break;case 20:return e.abrupt("break",23);case 21:e.next=3;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(1),t.e(e.t0);case 28:return e.prev=28,t.f(),e.finish(28);case 31:return e.abrupt("return",o);case 32:case"end":return e.stop()}},e,this,[[1,25,28,31]])}))}}]),e}(),Server=function(){function r(e){e=e.port;_classCallCheck(this,r),this.helper={},this.middleware=new MiddleWareManager,this.initServer(e)}return _createClass(r,[{key:"injectMiddleWare",value:function(e){e.helper&&(this.helper=Object.assign(this.helper,e.helper()))}},{key:"parseHttpInfo",value:function(r){return new Promise(function(e){var n=r.headers,o=r.method,t=praseUrl(r.url),a=t.url,i=t.query,u=[];r.on("error",function(e){console.error(e)}).on("data",function(e){u.push(e)}).on("end",function(){var t,r=Buffer.concat(u).toString();try{t=JSON.parse(r)}catch(e){t=parseParam(r)}e({requestHeaders:n,method:o,url:a,query:i,body:t})})})}},{key:"initServer",value:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:r.DEFAULT_PORT;console.log("Sener Runing Succeed On: http://localhost:".concat(t)),this.server=http.createServer(function(a,i){return __awaiter(e,void 0,void 0,_regeneratorRuntime().mark(function e(){var t,r,n,o=this;return _regeneratorRuntime().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={send404:function(e){o.send404(i,e)},sendJson:function(e,t){o.sendData({response:i,data:e,statusCode:t})},sendResponse:function(e){o.sendData(Object.assign({response:i},e))},sendText:function(e,t){o.sendText(i,e,t)},sendHtml:function(e){o.sendHtml(i,e)}},t=Object.assign(Object.assign({request:a,response:i},this.helper),t),e.next=4,this.middleware.applyEnter(t);case 4:if(e.sent){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,this.parseHttpInfo(a);case 8:return r=e.sent,e.next=11,this.middleware.applyRequest(Object.assign(Object.assign({},r),t));case 11:if(e.sent){e.next=14;break}return e.abrupt("return");case 14:return e.next=17,this.middleware.applyResponse(Object.assign(Object.assign({data:{},statusCode:200},t),r));case 17:if(n=e.sent){e.next=20;break}return e.abrupt("return");case 20:this.sendData(Object.assign({response:i},n));case 21:case"end":return e.stop()}},e,this)}))}).listen(t)}},{key:"sendHtml",value:function(e,t){this.sendData({response:e,data:t,statusCode:200,headers:{"Content-Type":"text/html; charset=utf-8"}})}},{key:"send404",value:function(e){this.sendText(e,1<arguments.length&&void 0!==arguments[1]?arguments[1]:"Page not found",404)}},{key:"sendText",value:function(e,t){this.sendData({response:e,data:t,statusCode:2<arguments.length&&void 0!==arguments[2]?arguments[2]:200,headers:{"Content-Type":"text/plain; charset=utf-8"}})}},{key:"sendData",value:function(e){var t,r=e.response,n=e.data,o=e.statusCode,o=void 0===o?200:o,e=e.headers,a=void 0===e?{"Content-Type":"application/json;charset=UTF-8"}:e;for(t in a)r.setHeader(t,a[t]);if("string"!=typeof n)try{n=JSON.stringify(n)}catch(e){return r.statusCode=200,r.write(JSON.stringify({error:e.message,success:!1})),void r.end()}r.statusCode=o,r.write(n),r.end()}}]),r}(),Sener=(Server.DEFAULT_PORT=9e3,function(){function r(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.port,e=e.middlewares,e=void 0===e?[]:e;_classCallCheck(this,r),this.server=new Server({port:t}),this.use.apply(this,_toConsumableArray(e))}return _createClass(r,[{key:"use",value:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];for(var n=0,o=t;n<o.length;n++){var a=o[n];this.server.middleware.use(a),this.server.injectMiddleWare(a)}}},{key:"remove",value:function(e){this.server.middleware.remove(e)}}]),r}()),Router=function(){_inherits(n,MiddleWare);var r=_createSuper(n);function n(e){var t;return _classCallCheck(this,n),(t=r.call(this)).routers=e,t}return _createClass(n,[{key:"request",value:function(e){var t=e.url,r=e.method,e=e.send404,n=(r||"get").toLocaleLowerCase(),n="".concat(n,":").concat(t);return this.routers[n]||"GET"===r&&this.routers[t]?MiddleWareReturn.Continue:(e("Page not found: ".concat(t)),MiddleWareReturn.Return)}},{key:"response",value:function(e){var t=this.getRouterHandler(e);return t?t(e):(e.send404("Page not found: ".concat(e.url)),MiddleWareReturn.Return)}},{key:"getRouterHandler",value:function(e){var t=e.method,e=e.url,r="".concat(t.toLocaleLowerCase(),":").concat(e),r=this.routers[r];if(r=r||"GET"!==t?r:this.routers[e])return r||null}}]),n}();export{Router,Sener};
