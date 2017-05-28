// ==UserScript==
// @name             LTT_FP++
// @namespace        jgjake2
// @description      LinusTechTips Floatplane Club Enhancer
// @author           jgjake2
// @downloadURL      https://github.com/jgjake2/LTT_FP/raw/master/LTT_FP%2B%2B.user.js
// @updateURL        https://github.com/jgjake2/LTT_FP/raw/master/LTT_FP%2B%2B.user.js
// @homepage         https://github.com/jgjake2/LTT_FP
// @supportURL       https://github.com/jgjake2/LTT_FP/issues
// @include          https://linustechtips.com/main/topic/*
// @include          https://linustechtips.com/main/forum/91-the-floatplane-club
// @include          https://linustechtips.com/main/forum/91-the-floatplane-club/*
// @require          https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require          https://code.jmod.info/velocity.min.js
// @require          https://code.jmod.info/0.0.20/jMod.min.js
// @version          0.4.1
// @grant            unsafeWindow
// @grant            GM_info
// @grant            GM_log
// @grant            GM_addStyle
// @grant            GM_getMetadata
// @grant            GM_xmlhttpRequest
// @grant            GM_registerMenuCommand
// @grant            GM_getValue
// @grant            GM_setValue
// @grant            GM_listValues
// @grant            GM_deleteValue
// @grant            GM_getResourceText
// @grant            GM_getResourceURL
// @unwrap
// @noframes
// @run-at           document-start
// @jMod             {"debug": false, "API": {"log": {"debug": false}}, "script": {"script_name": "LTT_FP++", "username": "jgjake2"}}
// ==/UserScript==

(function($){
const _debug = true;
var uw = (typeof unsafeWindow !== "undefined" ? unsafeWindow : this),
	global = this;

// Promise Polyfill
// https://github.com/taylorhakes/promise-polyfill
!function(a){function b(){}function c(a,b){return function(){a.apply(b,arguments)}}function d(a){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],j(a,this)}function e(a,b){for(;3===a._state;)a=a._value;return 0===a._state?void a._deferreds.push(b):(a._handled=!0,void d._immediateFn(function(){var c=1===a._state?b.onFulfilled:b.onRejected;if(null===c)return void(1===a._state?f:g)(b.promise,a._value);var d;try{d=c(a._value)}catch(a){return void g(b.promise,a)}f(b.promise,d)}))}function f(a,b){try{if(b===a)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"==typeof b||"function"==typeof b)){var e=b.then;if(b instanceof d)return a._state=3,a._value=b,void h(a);if("function"==typeof e)return void j(c(e,b),a)}a._state=1,a._value=b,h(a)}catch(b){g(a,b)}}function g(a,b){a._state=2,a._value=b,h(a)}function h(a){2===a._state&&0===a._deferreds.length&&d._immediateFn(function(){a._handled||d._unhandledRejectionFn(a._value)});for(var b=0,c=a._deferreds.length;b<c;b++)e(a,a._deferreds[b]);a._deferreds=null}function i(a,b,c){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.promise=c}function j(a,b){var c=!1;try{a(function(a){c||(c=!0,f(b,a))},function(a){c||(c=!0,g(b,a))})}catch(a){if(c)return;c=!0,g(b,a)}}var k=setTimeout;d.prototype.catch=function(a){return this.then(null,a)},d.prototype.then=function(a,c){var d=new this.constructor(b);return e(this,new i(a,c,d)),d},d.all=function(a){var b=Array.prototype.slice.call(a);return new d(function(a,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}b[f]=g,0==--e&&a(b)}catch(a){c(a)}}if(0===b.length)return a([]);for(var e=b.length,f=0;f<b.length;f++)d(f,b[f])})},d.resolve=function(a){return a&&"object"==typeof a&&a.constructor===d?a:new d(function(b){b(a)})},d.reject=function(a){return new d(function(b,c){c(a)})},d.race=function(a){return new d(function(b,c){for(var d=0,e=a.length;d<e;d++)a[d].then(b,c)})},d._immediateFn="function"==typeof setImmediate&&function(a){setImmediate(a)}||function(a){k(a,0)},d._unhandledRejectionFn=function(a){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",a)},d._setImmediateFn=function(a){d._immediateFn=a},d._setUnhandledRejectionFn=function(a){d._unhandledRejectionFn=a},a.Promise=d}(this);
// setAsap Polyfill
// https://github.com/taylorhakes/setAsap
!function(e,t){"use strict";function n(){return 9007199254740991===s?0:++s}var o="object"==typeof window&&window||"object"==typeof global&&global||"object"==typeof self&&self||e,r="function"==typeof setImmediate,i="object"==typeof process&&!!process&&"function"==typeof process.nextTick,s=0,a=function(){var e,t,s,a;if(o.MutationObserver)return function(t){e=document.createElement("div"),new MutationObserver(function(){t(),e=null}).observe(e,{attributes:!0}),e.setAttribute("i","1")};if(!r&&o.postMessage&&!o.importScripts&&o.addEventListener){var c="com.setImmediate"+Math.random();a={};var u=function(e){if(e.source===o&&0===e.data.indexOf(c)){var t=e.data.split(":")[1];a[t](),delete a[t]}};return o.addEventListener("message",u,!1),function(e){var t=n();a[t]=e,o.postMessage(c+":"+t,"*")}}return!r&&o.document&&"onreadystatechange"in document.createElement("script")?function(e){t=document.createElement("script"),t.onreadystatechange=function(){t.onreadystatechange=null,t.parentNode.removeChild(t),t=null,e()},document.body.appendChild(t)}:(s=r&&setImmediate||i&&process.nextTick||setTimeout,function(e){s(e)})}();o.setAsap=a}(this);Promise._immediateFn = setAsap;

function isArray(obj){return (obj.constructor === (new Array).constructor ? true : false);}

jMod.CSS = `
#lmgNav {z-index: 1001;}
.jmod-na {z-index: 16400;}
.jmod-na .modal-backdrop {z-index: 16400;}
.jmod-na .modal {z-index: 16500;}
.jmod-na .tooltip {z-index: 16600;}
.jmod-na .form-control.pref[type="text"] {
	display: block;
	width: 100%;
	height: 32px;
	padding: 6px 12px;
	font-size: 13px;
	line-height: 1.42857143;
	color: #555;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ccc;
	transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
	transition: all border-color ease-in-out .15s,box-shadow ease-in-out .15s ease-out;
	max-width:unset;
}
`.toString();

    var jModLogInfo = (function(){
		var infoDefaultStyle = 'display: run-in;',
			fontFamily = 'font-family:"Sansation","Open Sans",Arial;';
			//#DB4105
			//#C73A03
		var headStyle = infoDefaultStyle + 'font-weight:900;font-size:1.45em;color:#DB4105;' + fontFamily,
			titleStyle = infoDefaultStyle + "font-weight:200;font-size:115%;color:green;" + fontFamily,
			textStyle = infoDefaultStyle + "font-weight:normal;font-size:100%;color:blue;";
		function jModLogInfo(title, text) {
			var i = 2,
				tArgs = [ [
					"LTT_FP++",
					"string",
					headStyle
				] ];
			
				//" - ", "string", "display: run-in;color:#000;" ]
			if (typeof text === "string" || typeof text === "number") {
				tArgs = tArgs.concat([ [ title || " ", "%s", titleStyle ], [ " \n", "string" ], [ text || "", "%s", textStyle] ]);
			} else {
				if(arguments.length > 1) i--;
				tArgs = tArgs.concat([ [ title || "", "%s", titleStyle ] ]);
			}
			fmtBuild = new jMod.API.logFormatBuilder(tArgs);
			
			if (arguments.length > i) fmtBuild.add(" \n", "string");
			for (i; i < arguments.length; i++) fmtBuild.add(arguments[i]);
			jMod.Info.apply(jMod.log, fmtBuild.build());
		};
		
		return jModLogInfo;
	})();
	
	var LFPP = {
		el: {},
		log: (_debug ? console.log : function(){})
		//log: (_debug ? jModLogInfo : function(){})
	};
	var _cache = {};
	var _viewportHeight = 0,
		_viewportWidth = 0,
		enabledLogs = [
			['Core', '*'],
			['VideoPlayer', '*'],
			//['PageHandler', '*'],
			//['VideoList', '*']
			['VideoInfo', '*']
		];
		
		
	function addEnabledLog(name){
		enabledLogs.push(name.split('::'));
	}
	function isLoggerEnabled(name){
		var tmp;
		for(var i = 0; i < enabledLogs.length; i++){
			tmp = enabledLogs[i];
			if(tmp[0] === name){
				if(tmp.length === 1 || tmp[1] === '*'){return true;}
				return (new RegExp('(?:^|\\:\\:)' + tmp[1].replace(/\*/gm, '.*'), 'i'));
			}
		}
		return false;
	}
	

	
	LFPP.getLog = function(name){
		var _isEnabled;
		
		function refresh(){
			_isEnabled = isLoggerEnabled(name);
		}
		function isEnabled(fnName){
			if(!_isEnabled) return false;
			if(_isEnabled === true || _isEnabled.test(fnName)) return true
		}
		function customLog(fnName){
			arguments[0] = name + '::' + arguments[0];
			if(_debug && isEnabled(fnName)) {return jModLogInfo.apply(jModLogInfo, arguments);}
		}
		customLog.refresh = refresh;
		customLog.disable = function(){_isEnabled = false;};
		customLog.enable = function(){_isEnabled = true;};
		refresh();
		return customLog;
	};
	var coreLog = LFPP.getLog('Core');
	
	LFPP.addCachedElement = function(name, selector){
		if(!selector) selector = '#' + name;
		Object.defineProperty(LFPP.el, name, {
			get: function() {if(!_cache[name] || !_cache[name].length) _cache[name] = $(selector);return _cache[name];},
			set: function(val) {_cache[name] = val;},
			enumerable: true, configurable: false
		});
	};
	
	LFPP.addCachedElements = function(obj){
		if(isArray(obj)){
			for(var i = 0; i < obj.length; i++){
				LFPP.addCachedElement(obj[i]);
			}
		} else {
			for(var key in obj){
				if(obj[key] && typeof obj[key] === "string"){
					LFPP.addCachedElement(key, obj[key]);
				} else {
					LFPP.addCachedElement(key);
				}
			}
		}
	};
	
	LFPP.addCachedElements([
		'elUserNav', 'ipsLayout_header', 'ipsLayout_body', 'ipsLayout_footer', 'ipsLayout_contentArea', 'ipsLayout_mainArea', 'lmgNav',
		'elFullSettings',
		'LFPP_StickyVideoWrapper_Outer', 'LFPP_StickyVideoWrapper_Inner', 'LFPP_StickyVideoWrapper_Headline', 'LFPP_StickyVideoWrapper_Headline_Content',
		'LFPP_FixedPage_Wrapper', 'LFPP_FixedPage_Padding',
		//'LFPP_StickyVideoWrapper_Padding', 'LFPP_StickyVideoWrapper_Padding_header', 'LFPP_StickyVideoWrapper_Padding_headline', 'LFPP_StickyVideoWrapper_Padding_yscroll', 'LFPP_StickyVideoWrapper_Padding_player'
	]);
	LFPP.addCachedElements({
		'headerBlock': '#ipsLayout_header .ipsResponsive_showDesktop.ipsResponsive_block',
		'videoContainer': '.video-container:has(iframe)',
		'videoContainerIframe': '.video-container > iframe',
		'breadcrumbs': '#ipsLayout_contentWrapper > .ipsBreadcrumb.ipsBreadcrumb_top',
		'pageTitle': '#ipsLayout_mainArea .ipsType_pageTitle > div > span > span',
		'floatplaneDownloadWrapper': '#ipsLayout_mainArea div[id^="floatplaneDownloadWrapper_"]',
		'floatplanePlaybackReportError': '#ipsLayout_mainArea .floatplane-script ~ p:has(a)'
	});
	
	Object.defineProperties(LFPP, {
		'isFPClubPage': {
			get: function() {
				if(!_cache._isFPClubPage){
					var $fpcBreadcrumb = LFPP.el.breadcrumbs.find('li > a[href$="the-floatplane-club/"]');
					_cache._isFPClubPage = ($fpcBreadcrumb && $fpcBreadcrumb.length ? true : false);
				}
				return _cache._isFPClubPage;
			},
			set: function(val) {_cache._isFPClubPage = (val === true);},
			enumerable: true, configurable: false
		},
		
		'isFPClubVideoPage': {
			get: function() {
				if(!_cache._isFPClubVideoPage){
					_cache._isFPClubVideoPage = (LFPP.isFPClubPage && LFPP.el.videoContainerIframe.length ? true : false);
				}
				return _cache._isFPClubVideoPage;
			},
			set: function(val) {_cache._isFPClubVideoPage = (val === true);},
			enumerable: true, configurable: false
		},
		'contentMaxWidth': {
			get: function() {return parseInt(LFPP.el.ipsLayout_body.css('max-width') || -1);},
			enumerable: true, configurable: false
		},
		'contentAreaWidth': {
			get: function() {return parseInt(LFPP.el.ipsLayout_mainArea.css('width'));},
			enumerable: true, configurable: false
		},
		'breadcrumbWidth': {
			get: function() {return parseInt(LFPP.el.breadcrumbs.width());},
			enumerable: true, configurable: false
		},
		
	});
	
	LFPP.getNavHeight = function(){return Math.max(45, (LFPP.el.lmgNav && LFPP.el.lmgNav.length ? parseInt(LFPP.el.lmgNav.height()) : -1));};
	LFPP.getNavBottom = function(){return (parseInt(LFPP.el.lmgNav.height()) + parseInt(LFPP.el.lmgNav.css('top')));};
	
	LFPP.getHeaderBlockHeight = function(){return (LFPP.el.headerBlock && LFPP.el.headerBlock.length ? parseInt(LFPP.el.headerBlock.height()) : -1);};
	
	LFPP.getViewportHeight = function(){return (_viewportHeight = $(window).height());};
	LFPP.getViewportWidth = function(){return (_viewportWidth = $(window).width());};
	LFPP.getPageYOffset = function(){return (window.pageYOffset || unsafeWindow.pageYOffset);};
	
	
	
	var _settingsButtonAdded = false;
	function addSettingsButton(){
		if(_settingsButtonAdded) return;
		coreLog('addSettingsButton', 'Settings Button Added');
		
		if(LFPP.el.elUserNav && LFPP.el.elUserNav.length){
			LFPP.el.elUserNav.prepend(''
				+ '<li class="cJModSettings">'
					+ '<a href="#" id="elFullSettings" data-ipstooltip="" data-ipsmenu="" data-ipsmenu-closeonclick="false" data-ipsmenu-activeclass="lmgNavMenu_active" _title="LTT_FP++ Settings">'
						+ '<i class="fa fa-cog"></i>'
					+ '</a>'
				+ '</li>'
			);
			
			LFPP.el.elFullSettings.click(function(e){
				e.preventDefault();
				jMod.Settings.show();
				return false;
			});
			
			_settingsButtonAdded = true;
		}
	}
	
	
(function(){
	/* Page state and events handler */
	
	var page = LFPP.page = {
		events: {}
	};
	
	var _pcache = page._cache = {};
	var lastFullPageLocation, lastPageLocation, lastPageHash, lastPageIndex;
	var pageLog = LFPP.getLog('PageHandler');
	
	function addEventHandler(eventName){
		if(!page.events[eventName]){
			page.events[eventName] = {
				hasFired: false,
				_count: 0,
				cb: {},
				add: function(fn){
					for(var key in this.cb){
						if(this.cb[key] === fn){
							return console.log('Handler already added: ', eventName, fn);
						}
					}
					this._count++;
					this.cb[this._count] = fn;
					return this.count;
				},
				remove: function(c){
					if(typeof c === "number"){
						if(typeof this.cb[c] === "function"){
							this.cb[c] = undefined;
							try {delete this.cb[c];} catch(e) {}
							
							if(this.cb[c]){ // sometimes requires 2 deletes
								this.cb[c] = undefined;
								try {delete this.cb[c];} catch(e) {}
							}
						}
					} else {
						console.log('invalid callback id: ', c);
					}
				},
				fire: function(){
					this.hasFired = true;
					var r = null;
					for(var key in this.cb){
						if(typeof this.cb[key] === "function"){
							try {
								r = this.cb[key].apply(this, arguments);
								if(r === false){
									this.remove(key);
								}
							} catch(e) {
								console.log(e);
							}
						}
						r = null;
					}
				}
			};
		}
		page.events[eventName] = page.events[eventName] || {cb}
	}
	
	function addEventHandlers(eventNames){for(var i = 0; i < eventNames.length; i++) addEventHandler(eventNames[i]);}
	
	function handleEvent(eventName, cb){
		if(page.events[eventName]){
			page.events[eventName].add(cb);
		} else {
			console.log('event "' + eventName + '" does not exist');
		}
	}
	
	addEventHandlers(['historyEdit', 'hashChange', 'pageIndexChange', 'headerStateChange', 'DOMReady', 'BodyReady', 'FooterReady']);
	
	Object.defineProperties(LFPP.page, {
		/*
		'foo': {
			get: function() {},
			set: function(val) {},
			enumerable: true,
			configurable: false
		},
		*/

		
		'isFPClubPage': {
			get: function() {
				if(!_pcache._isFPClubPage){
					var $fpcBreadcrumb = LFPP.el.breadcrumbs.find('li > a[href$="the-floatplane-club/"]');
					_pcache._isFPClubPage = ($fpcBreadcrumb && $fpcBreadcrumb.length ? true : false);
				}
				return _pcache._isFPClubPage;
			},
			set: function(val) {_pcache._isFPClubPage = (val === true);},
			enumerable: true, configurable: false
		},
		
		'isFPClubVideoPage': {
			get: function() {
				if(!_pcache._isFPClubVideoPage){
					_pcache._isFPClubVideoPage = (LFPP.page.isFPClubPage && LFPP.el.videoContainerIframe.length ? true : false);
				}
				return _pcache._isFPClubVideoPage;
			},
			set: function(val) {_pcache._isFPClubVideoPage = (val === true);},
			enumerable: true, configurable: false
		},
		
		'hasPagination': {
			get: function() {
				var $tmp = $('ul.ipsPagination');
				if($tmp && $tmp.length) return $($tmp[0]);
				return false;
			},
			set: function() {},
			enumerable: true, configurable: false
		},
		
		'activePaginationPageNum': {
			get: function() {
				var $tmp = page.hasPagination;
				if($tmp && $tmp.length){
					var $active = $('li.ipsPagination_active > a', $tmp);
					if($active && $active.length){
						var tNum;
						try {
							tNum = parseInt($active.attr('data-page'));
						} catch(e) {}
						if(typeof tNum === "number"){
							return tNum;
						}
					}
				}
				return -1;
			},
			set: function() {},
			enumerable: true, configurable: false
		},
		
		'maxPaginationPages': {
			get: function() {
				var $tmp = page.hasPagination;
				if($tmp && $tmp.length){
					var tNum;
					try {
						tNum = parseInt($active.attr('data-pages'));
					} catch(e) {}
					if(typeof tNum === "number"){
						return tNum;
					}
					var $liPages = $('li.ipsPagination_page', $tmp);
					if($liPages && $liPages.length) return $liPages.length;
				}
				return -1;
			},
			set: function() {},
			enumerable: true, configurable: false
		},
		
		'pageIndex': {
			get: function() {
				var _currentLocation = ((typeof window.location.search !== "undefined") ? window.location.search : (window.location.query || (window.location.toString().indexOf('?') > -1 ? window.location.toString().split('?', 1)[1] : null)));
				if(_currentLocation){
					var match = /\bpage=(\d+)(?:[&#\?]|$)/i.exec(_currentLocation);
					if(match && match.length > 1 && match[1]){
						var tNum;
						try {
							tNum = parseInt(match[1]);
						} catch(e) {}
						if(typeof tNum === "number"){
							return tNum;
						}
					}
				}
				return page.activePaginationPageNum;
			},
			set: function() {},
			enumerable: true, configurable: false
		},
		

		
		
		
		'onHistoryEdit': {
			get: function() {
				return page.events.historyEdit;
			},
			set: function(val) {
				if(typeof val === "function"){
					handleEvent('historyEdit', val);
				}
			},
			enumerable: true,
			configurable: false
		},
		
		'onHashChange': {
			get: function() {
				return page.events.hashChange;
			},
			set: function(val) {
				if(typeof val === "function"){
					handleEvent('hashChange', val);
				}
			},
			enumerable: true,
			configurable: false
		},
		
		'onPageIndexChange': {
			get: function() {
				return page.events.pageIndexChange;
			},
			set: function(val) {
				if(typeof val === "function"){
					handleEvent('pageIndexChange', val);
				}
			},
			enumerable: true,
			configurable: false
		},
		
		'onHeaderStateChange': {
			get: function() {
				return page.events.headerStateChange;
			},
			set: function(val) {
				if(typeof val === "function"){
					handleEvent('headerStateChange', val);
				}
			},
			enumerable: true,
			configurable: false
		},
		
		'onDOMReady': {
			get: function() {
				return page.events.DOMReady;
			},
			set: function(val) {
				if(typeof val === "function"){
					handleEvent('DOMReady', val);
				}
			},
			enumerable: true,
			configurable: false
		},
		
		'onBodyReady': {
			get: function() {
				return page.events.BodyReady;
			},
			set: function(val) {
				if(typeof val === "function"){
					handleEvent('BodyReady', val);
				}
			},
			enumerable: true,
			configurable: false
		},
		
		'onFooterReady': {
			get: function() {
				return page.events.FooterReady;
			},
			set: function(val) {
				if(typeof val === "function"){
					handleEvent('FooterReady', val);
				}
			},
			enumerable: true,
			configurable: false
		},
	});
	
	
	function updateLastLocation(){
		lastFullPageLocation = window.location.toString();
		lastPageLocation = lastFullPageLocation.split('#')[0];
		lastPageHash = '#' + (lastFullPageLocation.split('#').length > 1 ? lastFullPageLocation.split('#')[1] : '');
		lastPageIndex = page.pageIndex;
	}
	
	function checkLocationChange(){
		var currentFullPageLocation = window.location.toString();
		
		if(currentFullPageLocation !== lastFullPageLocation){
			var currentPageLocation = currentFullPageLocation.split('#')[0];
			var currentPageHash = '#' + (currentFullPageLocation.split('#').length > 1 ? currentFullPageLocation.split('#')[1] : '');
			var currentPageIndex = page.pageIndex;

			
			var _lastFullPageLocation = lastFullPageLocation;
			var _lastPageLocation = lastPageLocation;
			var _lastPageHash = lastPageHash;
			var _lastPageIndex = lastPageIndex;
			
			var urlChanged = (currentPageLocation !== lastPageLocation);
			var hashChanged = (currentPageHash !== lastPageHash);
			updateLastLocation();
			var locArgs = {
				oldURL: {location: _lastFullPageLocation, url: _lastPageLocation, hash: _lastPageHash},
				newURL: {location: currentFullPageLocation, url: currentPageLocation, hash: currentPageHash},
			};
			
			if(urlChanged){
				page.onHistoryEdit.fire(locArgs, urlChanged, hashChanged);
				
				if(currentPageIndex !== _lastPageIndex){
					page.onPageIndexChange.fire({oldIndex: _lastPageIndex, newIndex: currentPageIndex}, urlChanged, hashChanged);
				}
			}
			
			if(hashChanged){
				page.onHashChange.fire(locArgs, urlChanged, hashChanged);
			}
		}
		
	}
	
	var _watchLocationChangeTimer = null;
	function watchLocationChange(){
		if(_watchLocationChangeTimer){
			return;
		}
		
		_watchLocationChangeTimer = setInterval(checkLocationChange, 250);
	}
	
	
	function stopWatchLocationChange(){
		if(_watchLocationChangeTimer){
			clearInterval(_watchLocationChangeTimer);
			_watchLocationChangeTimer = null;
		}
	}
	
	LFPP.page.onBodyReady = function(){
		//pageLog('pageHandler::onBodyReady');
		updateLastLocation();
		setTimeout(watchLocationChange, 100);
	};
	
})();

(function(){
	/* Page state and events handler */
	
	var header = LFPP.header = {
		events: {}
	};
	
	var _hcache = header._cache = {};
	
	Object.defineProperties(LFPP.header, {
		/*
		'foo': {
			get: function() {},
			set: function(val) {},
			enumerable: true,
			configurable: false
		},
		*/
		
		'topBannerActualHeight': {
			get: function() {
				if(!_hcache.topBannerActualHeight){
					_hcache.topBannerActualHeight = LFPP.el.headerBlock.height() || 75;
				}
				return _hcache.topBannerActualHeight;
			},
			enumerable: true,
			configurable: false
		},
		'navActualHeight': {
			get: function() {
				if(!_hcache.navActualHeight){
					_hcache.navActualHeight = LFPP.el.lmgNav.height() || 45;
				}
				return _hcache.navActualHeight;
			},
			enumerable: true,
			configurable: false
		},
		'headerTotalActualHeight': {
			get: function() {
				if(!_hcache.headerTotalActualHeight || !_hcache.topBannerActualHeight || !_hcache.navActualHeight){
					_hcache.headerTotalActualHeight = (header.topBannerActualHeight + header.navActualHeight) || 120;
				}
				return _hcache.headerTotalActualHeight;
			},
			enumerable: true,
			configurable: false
		},
		
		'headerWindowOffsetHeight': {
			get: function() {
				if(header.isNavPinned){
					if(header.isNavScrolled){
						return header.navActualHeight;
					} else {
						return Math.max(header.headerTotalActualHeight - LFPP.getPageYOffset(), header.navActualHeight);
					}
				}
				
				return Math.max(header.headerTotalActualHeight - LFPP.getPageYOffset(), 0);
			},
			enumerable: true,
			configurable: false
		},
		
		
		'isNavPinned': {
			get: function() {return LFPP.el.lmgNav.hasClass('pinned');},
			enumerable: true,
			configurable: false
		},
		'isNavScrolled': {
			get: function() {return (header.isNavPinned && LFPP.el.lmgNav.hasClass('scrolled'));},
			enumerable: true,
			configurable: false
		},
		'isTopBannerVisible': {
			get: function() {
				if(header.isNavScrolled || (!header.isNavPinned && (LFPP.getPageYOffset() >= header.topBannerActualHeight))) return false;
				return true;
				
			},
			enumerable: true,
			configurable: false
		},
		
		
		'onHeaderStateChange': {
			get: function() {
				return LFPP.page.events.headerStateChange;
			},
			set: function(val) {
				LFPP.page.onHeaderStateChange = val;
			},
			enumerable: true,
			configurable: false
		}
	});

	//LFPP.page.onHeaderStateChange
	
	var _lastHeaderWindowOffsetHeight = 0;
	function addObservers(){
		_lastHeaderWindowOffsetHeight = header.headerWindowOffsetHeight;
		// Observe #lmgNav for class changes to indicate a possible height change
		var navObserver = new MutationObserver(function(mutations) {
			for(var i = 0; i < mutations.length; i++){
				if(mutations[i].attributeName === 'class') {
					var o = {oldClass: mutations[i].oldValue, newClass: LFPP.el.lmgNav[0].className, oldOffset: _lastHeaderWindowOffsetHeight};
					o.newOffset = _lastHeaderWindowOffsetHeight = header.headerWindowOffsetHeight;
					
					header.onHeaderStateChange.fire(o);
					break;
				}
			}
		});

		var navObConfig = {attributes: true, attributeOldValue: true, childList: false, characterData: false, subtree: false};

		navObserver.observe(LFPP.el.lmgNav[0], navObConfig);
	}
	
	LFPP.page.onBodyReady = function(){
		//LFPP.log('Header::onBodyReady');
		addObservers();
		
		/*
		header.onHeaderStateChange = function(data){
			LFPP.log('Header::onHeaderStateChange fired', data);
		};
		*/
	};
	
})();



(function(){
	/* Page state and events handler */
	
	var videoInfo = LFPP.videoInfo = {
		events: {}
	};
	
	var _vicache = videoInfo._cache = {};
	var videoInfoLog = LFPP.getLog('VideoInfo');
	
	
	var cache = videoInfo.cache = (function(){
	
		function getCachedJSON(name){
			var tmp = GM_getValue(name, '{}');
			var _json;
			try {
				_json = JSON.parse(tmp);
			} catch(e) {
				_json = {};
			}
			return _json;
		}
		
		function setCache(name, obj){
			var str = JSON.stringify(obj || {});
			GM_setValue(name, str);
			return obj;
		}
		
		function getCachedValue(objName, valName, def){
			var obj = getCachedJSON(objName);
			return (obj[valName] || def);
		}
		
		function setCachedValue(objName, valName, val){
			var obj = getCachedJSON(objName) || {};
			obj[valName] = val;
			setCache(objName, obj);
			return val;
		}
		
		var videoInfoCache = {
			getVideoInfo: function(vid){
				if(vid) return getCachedValue('VideoInfo', vid);
			},
			setVideoInfo: function(vid, obj){
				if(vid && obj) return setCachedValue('VideoInfo', vid, obj);
			},
			
			
			getVideoDuration: function(vid){
				if(vid) return getCachedValue('VideoDuration', vid);
			},
			setVideoDuration: function(vid, val){
				if(vid && val) return setCachedValue('VideoDuration', vid, val);
			},
		};
		
		return videoInfoCache;
	
	})();
	
	
	var _requestCount = 0;
	//var _getVideoPageIFrameURL = {};
	//var __getVideoPageIFrameURL = {};
	_vicache._getVideoDuration = {};
	videoInfo.getVideoDuration = function(vid, skipCache){
		if(_vicache._getVideoDuration[vid]){
			return _vicache._getVideoDuration[vid];
		}
		
		
		_vicache._getVideoDuration[vid] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_vicache._getVideoDuration[vid] = null;
						if(b === false){
							return reject(a);
						}
						return resolve(a);
					}
				};
			
			setAsap(function(){
				
				var cVideoDuration = skipCache ? null : cache.getVideoDuration(vid);
				
				if(cVideoDuration) {
					//console.log('Use getVideoDuration cache: "' + vid + '" -> ', cVideoDuration);
					return respond({duration: cVideoDuration, minutes: parseInt(cVideoDuration / 60), seconds: parseInt(cVideoDuration % 60)});
				} else {
					_requestCount++;
					
					function _doRequest3(url){
						$.get({url: url, dataType: 'text'})
							.done(function(data, textStatus, jqXHR) {
								_requestCount--;
								//console.log('_doRequest3: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								
								if(data){
									var patt = /\#EXTINF\:(\d+\.\d+)\,/gmi;
									var match,
										totalTime = 0.0,
										tmp = 0.0;
									while(match = patt.exec(data)){
										if(match && match.length > 1){
											try {
												tmp = parseFloat(match[1]);
												totalTime += tmp;
											} catch(e) {
												console.log(e);
											}
											tmp = 0.0;
										} else {
											break;
										}
									}
									
									if(totalTime){
										cache.setVideoDuration(vid, totalTime);
										return respond({duration: totalTime, minutes: parseInt(totalTime / 60), seconds: parseInt(totalTime % 60)});
									}
									
								}
								
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					function _doRequest2(url){
						$.get({url: url, dataType: 'text'})
							.done(function(data, textStatus, jqXHR) {
								
								//console.log('_doRequest2: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								
								if(data){
									var match = /(chunk\.m3u8\?nimblesessionid=\d+\&wmsAuthSign=[^\r\n\s]+)/im.exec(data);
									if(match && match.length > 1){
										var newURL = url.replace(/playlist.m3u8.+$/i, match[1]);
										
										return _doRequest3(newURL);
									}
								}
								_requestCount--;
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					function _doRequest(){
						var url = 'https://linustechtips.com/main/applications/floatplane/interface/video_url.php?video_guid=' + vid + '&video_quality=1080';
						$.get({url: url, dataType: 'text'})
							.done(function(data, textStatus, jqXHR) {
								//console.log('_doRequest: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								if(data && /Edge\d+\-\w+\.floatplaneclub\.com/i.test(data)){
									return _doRequest2(data);
								}
								_requestCount--;
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					if(_requestCount > 1){
						setTimeout(_doRequest, 150 * _requestCount); // Prevents LTT "Too Many Requests" Error
					} else {
						_doRequest();
					}
					
				}
			});
			
		});
		
		return _vicache._getVideoDuration[vid];
	};
	
	
	
	_vicache._getVideoInfo = {};
	videoInfo.getVideoInfo = function(vid, skipCache){
		if(_vicache._getVideoInfo[vid]){
			return _vicache._getVideoInfo[vid];
		}
		
		
		_vicache._getVideoInfo[vid] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_vicache._getVideoInfo[vid] = null;
						if(b === false){
							return reject(a);
						}
						return resolve(a);
					}
				};
			
			setAsap(function(){
				
				var cVideoInfo = skipCache ? null : cache.getVideoInfo(vid);
				
				if(cVideoInfo) {
					//console.log('Use getVideoInfo cache: "' + vid + '" -> ', cVideoInfo);
					return respond(cVideoInfo);
				} else {
					_requestCount++;
					
					
					function _doRequest(){
						var url = 'https://cms.linustechtips.com/get/videos/by_guid/' + vid;
						$.get({url: url, dataType: 'json'})
							.done(function(data, textStatus, jqXHR) {
								_requestCount--;
								console.log('_doRequest: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								if(data && data.description){
									cache.setVideoInfo(vid, data);
									return respond(data);
									//return respond('');
								}
								
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					if(_requestCount > 1){
						setTimeout(_doRequest, 150 * _requestCount); // Prevents LTT "Too Many Requests" Error
					} else {
						_doRequest();
					}
				}
				
				
			});
					
		});
		
		return _vicache._getVideoInfo[vid];
	};
	

	LFPP.page.onFooterReady = function(){
		videoInfoLog('VideoInfo::onFooterReady');
		
		
		if(LFPP.page.isFPClubVideoPage){
			if(LFPP.el.videoContainerIframe && LFPP.el.videoContainerIframe.length){
				var iframeSrc = LFPP.el.videoContainerIframe.attr('src');
				var match = /get\/player\/(.+)$/i.exec(iframeSrc || '');
				if(match && match.length > 1){
					var vid = match[1];
					
					//console.log('start getVideoInfo ', vid);
					videoInfo.getVideoInfo(vid).then(function(info){
						//console.log('getVideoInfo success: ', info);
					}, function(e){
						console.log('getVideoInfo fail: ', e);
					});
					
					//console.log('start getVideoDuration ', vid);
					videoInfo.getVideoDuration(vid).then(function(duration){
						//console.log('getVideoDuration success: ', duration);
					}, function(e){
						console.log('getVideoDuration fail: ', e);
					});
					
					
				}
			} else {
				console.log('no iframe');
			}
		}
		
	};
	
})();
(function(){
	/* Page state and events handler */
	
	// https://cms.linustechtips.com/get/videos/by_guid/awVfKxpdBS
	
	// window.ipsSettings.csrfKey
	
	var videos = LFPP.videos = {
		events: {},
		settings: {}
	};
	
	var videoListLog = LFPP.getLog('VideoList');
	
	function getJModSetting(name, def){var tmp = jMod.Settings.get(name);return (typeof tmp === "undefined" ? def : tmp);}
	   
	Object.defineProperties(LFPP.videos.settings, {
		'add_thumbs_to_video_list': {get: function() {return (getJModSetting('Thumbs_General', LFPP.getSettingDefault('Thumbs_General')).indexOf('add_thumbs_to_video_list') > -1);},enumerable: true, configurable: false},
		'show_preview_on_hover': {get: function() {return (getJModSetting('Thumbs_General', LFPP.getSettingDefault('Thumbs_General')).indexOf('show_preview_on_hover') > -1);},enumerable: true, configurable: false},
		'keep_preview_after_hover': {get: function() {return (getJModSetting('Thumbs_General', LFPP.getSettingDefault('Thumbs_General')).indexOf('keep_preview_after_hover') > -1);},enumerable: true, configurable: false},
		'thumb_animation_speed': {get: function() {
			var tmp = getJModSetting('thumb_animation_speed', LFPP.getSettingDefault('thumb_animation_speed')).trim();
			try{return parseInt(tmp);} catch(e) {}
			return LFPP.getSettingDefault('thumb_animation_speed');
		}, enumerable: true, configurable: false}
	});
	
	
	//LFPP.videos.settings.thumb_animation_speed
	//LFPP.videos.settings.add_thumbs_to_video_list
	//LFPP.videos.settings.show_preview_on_hover
	//LFPP.videos.settings.keep_preview_after_hover
/*
jMod.CSS = `
.LFPP_Video_ThumbPreview {
	opacity:0;
}
.LFPP_Video_Thumb_Wrapper:hover .LFPP_Video_ThumbPreview {
	opacity: 1 !important;
}
`.toString();
*/
jMod.CSS = `
/*
.ipsDataItem_icon {
	padding-top: 0;
	padding-bottom: 0;
}
*/


.LFPP_Video_Thumb_Wrapper {
	display:inline-block;
	width:200px;
	height:112.5px;
	vertical-align:middle;
}

.LFPP_Video_Thumb_Wrapper a {
	display: inline-block;
	vertical-align: middle;
}

.LFPP_Video_Thumb_Container {
	position: absolute;
	width: 200px;
	height: 112.5px;
	top: 0;
	bottom: 0;
	margin: auto 0;
}

.LFPP_Video_Time {
	min-width: 20px;
	height: 14px;
	background-color: black;
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	z-index: 10000;
	position: absolute;
	bottom: 2px;
	right: 2px;
	opacity: 0.75;
	color: white;
	font-family: arial,sans-serif;
	font-size: 11px;
	padding: 0 4px;
	line-height: 14px;
}

.LFPP_Video_Thumb_Wrapper:hover .LFPP_Video_Time {
	opacity: 1;
}

.LFPP_Video_Thumb {
	width: 200px;
	height: 112.5px;
	overflow: hidden;
	position: absolute;
}

.LFPP_Video_Thumb img {
	max-width: 200px;
    height: auto;
    width: 200px;
    margin: auto 0;
    top: 0;
    position: absolute;
    bottom: 0;
}

.LFPP_Video_ThumbPreview {
	position:absolute;
	top:0;
	left:0;
	width:200px;
	height:112.5px;
	overflow:hidden;
}

.LFPP_Video_ThumbPreview img {
	height:112.5px;
	width:auto;
	margin-left:0px;
}


`.toString();
	//var _vcache = videos._cache = {};
	
	videos.cache = (function(){
		
		function getCachedJSON(name){
			var tmp = GM_getValue(name, '{}');
			var _json;
			try {
				_json = JSON.parse(tmp);
			} catch(e) {
				_json = {};
			}
			return _json;
		}
		
		function setCache(name, obj){
			var str = JSON.stringify(obj || {});
			GM_setValue(name, str);
			return obj;
		}
		
		function getCachedValue(objName, valName, def){
			var obj = getCachedJSON(objName);
			return (obj[valName] || def);
		}
		
		function setCachedValue(objName, valName, val){
			var obj = getCachedJSON(objName) || {};
			obj[valName] = val;
			setCache(objName, obj);
			return val;
		}
		
		var VideoCache = {
			getPageVideoId: function(url){
				if(url) return getCachedValue('PageVideoId', url);
			},
			setPageVideoId: function(url, id){
				if(url && id) return setCachedValue('PageVideoId', url, id);
			},
			
			getPageIFrameSrc: function(url){
				if(url) return getCachedValue('PageIFrameSrc', url);
			},
			setPageIFrameSrc: function(url, src){
				if(url && src) return setCachedValue('PageIFrameSrc', url, src);
			},
			
			getPageVideoThumbURL: function(url){
				var id = this.getPageVideoId(url);
				if(id){
					return ('https://cms.linustechtips.com/get/thumbnails/by_guid/' + id);
				}
			},
		};
		
		return VideoCache;
	
	})();
	
	Object.defineProperties(LFPP.videos, {
		/*
		'foo': {
			get: function() {},
			set: function(val) {},
			enumerable: true,
			configurable: false
		},
		*/
		'isVideoListPage': {
			get: function() {
				return (/\/forum\/\d+\-the\-floatplane\-club\/?/i.test(window.location.toString()));
			},
			set: function(val) {},
			enumerable: true,
			configurable: false
		},
		
	});
	
	
	var _requestCount = 0;
	var _getVideoPageIFrameURL = {};
	var __getVideoPageIFrameURL = {};
	function getVideoPageIFrameURL(url){
		if(_getVideoPageIFrameURL[url]){
			return _getVideoPageIFrameURL[url];
		}
		
		if(__getVideoPageIFrameURL[url]){
			return Promise.resolve(__getVideoPageIFrameURL[url]);
		}
		
		_getVideoPageIFrameURL[url] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_getVideoPageIFrameURL[url] = null;
						if(b === false){
							return reject(a);
						}
						__getVideoPageIFrameURL[url] = a;
						return resolve(a);
					}
				};
			
			setAsap(function(){
				var cIFrameSrc = videos.cache.getPageIFrameSrc(url);
				
				if(cIFrameSrc) {
					//console.log('Use iFrame cache: "' + url + '" -> "' + cIFrameSrc + '"');
					return respond(cIFrameSrc);
				} else {
					_requestCount++;
					
					function _doRequest(){
						
						$.get({url: url, dataType: 'html'})
							.done(function(data, textStatus, jqXHR) {
								_requestCount--;
								//console.log('url: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								if(data){
									var $iframe = $('.video-container > iframe', data);
									if($iframe && $iframe.length){// && $iframe.attr('src')){
										var _src = $iframe.attr('src');
										if(_src){
											videos.cache.setPageIFrameSrc(url, _src);
											return respond(_src);
										}
									}
									//console.log('error getting iframe: ', url);
									return respond('');
								}
								
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					if(_requestCount > 1){
						setTimeout(_doRequest, 250 * _requestCount); // Prevents LTT "Too Many Requests" Error
					} else {
						_doRequest();
					}
					
				}
			});
			
		});
		
		return _getVideoPageIFrameURL[url];
	}
	
	var _getVideoThumb = {};
	var __getVideoThumb = {};
	function getVideoThumb(url){
		if(_getVideoThumb[url]){
			return _getVideoThumb[url];
		}
		
		if(__getVideoThumb[url]){
			return Promise.resolve(__getVideoThumb[url]);
		}
		
		_getVideoThumb[url] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_getVideoThumb[url] = null;
						if(b === false){
							return reject(a);
						}
						__getVideoThumb[url] = a;
						return resolve(a);
					}
				};
			
			setAsap(function(){
				var cThumbURL = videos.cache.getPageVideoThumbURL(url);
				
				if(cThumbURL) {
					//console.log('Use Thumb cache: "' + url + '" -> "' + cThumbURL + '"');
					return respond(cThumbURL);
				} else {
					getVideoPageIFrameURL(url).then(function(src){
						if(src){
							var match = /\/([^\/\\\?#&]{5,})(?:[\?#]|\/[\?#]|\/?$)/i.exec(src);
							if(match && match.length > 1 && match[1]){
								var videoID = match[1];
								videos.cache.setPageVideoId(url, videoID);
								return respond('https://cms.linustechtips.com/get/thumbnails/by_guid/' + videoID);
							}
						} else if(src === ''){
							respond('');
						}
						respond(src, false);
						
					}, function(e){
						respond(e, false);
					});
				}
				
			});
			
		});
		
		return _getVideoThumb[url];
	}
	
	function processPageVideoThumb($thumb){
		$thumb.addClass('thumb_processed');
		
		var $topicTitleLink = $('.cTopicTitle > a', $thumb);
		if($topicTitleLink && $topicTitleLink.length){
			var topicURL = $topicTitleLink.attr('href') || $topicTitleLink[0].href;
			if(topicURL){
				getVideoThumb(topicURL).then(function(posterURL){
					posterURL = posterURL || '';
					
					var spriteURL = posterURL.replace('/thumbnails/', '/sprite/');
					var vid = /\/by_guid\/(.+)$/i.exec(posterURL);
					if(vid && vid.length > 1 && vid[1]){
						vid = vid[1];
					} else {
						vid = null;
					}
					var $divIcon = $('.ipsDataItem_icon', $thumb);
					var $divIconLink = $('.ipsDataItem_icon > a', $thumb);
					var $thumbfaIcon = $('i.fa-circle', $thumb);
					
					
					if(posterURL && $thumbfaIcon && $thumbfaIcon.length){
						$thumbfaIcon.removeClass('fa-circle').addClass('fa-youtube-play');
					}
					
					$divIcon.css({width: '230px', 'max-width': '230px', 'min-width': '230px'});
					$divIconLink.css({'display': 'inline-block', 'vertical-align': 'middle'});

					$divIcon.append(''
						+ '<div class="LFPP_Video_Thumb_Wrapper">'
							+ '<a class="" href="' + topicURL + '">'
								+ '<div class="LFPP_Video_Thumb_Container">'
									+ '<div class="LFPP_Video_Thumb">'
										+ '<img src="' + posterURL + '">'
									+ '</div>'
									+ '<div class="LFPP_Video_ThumbPreview">'
										+ '<img src="" data-frame="0" style="display:none;">'
									+ '</div>'
									+ '<div class="LFPP_Video_Time" style="display:none;"></div>'
								+ '</div>'
							+ '</a>'
						+ '</div>'
					);
					
					var $LFPP_Video_Time = $('.LFPP_Video_Time', $divIcon);
					
					if(vid){
						LFPP.videoInfo.getVideoDuration(vid).then(function(duration){
							$LFPP_Video_Time.html(duration.minutes + ':' + (duration.seconds < 10 ? '0' : '') + duration.seconds).css('display', 'block');
						}, function(e) {
							console.log(e);
						});
					}
					
					if(LFPP.videos.settings.show_preview_on_hover){
						var $LFPP_Video_Thumb_Wrapper = $('.LFPP_Video_Thumb_Wrapper', $divIcon);
						var $LFPP_Video_Thumb = $('.LFPP_Video_Thumb', $divIcon);
						var $LFPP_Video_ThumbPreview = $('.LFPP_Video_ThumbPreview', $divIcon);
						var $LFPP_Video_ThumbPreview_Image = $('.LFPP_Video_ThumbPreview img', $divIcon);
						
						var thumbPreviewImg = $LFPP_Video_ThumbPreview_Image[0];
						var thumbPreviewWidth, maxThumbFrames;
						
						
						var delayBetweenFrames = parseInt(LFPP.videos.settings.thumb_animation_speed || 300);
						var _stopped = true;
						var _animationTimer = null;
						function animateThumb(){
							_animationTimer = null;
							if(_stopped) return;
							
							var currentFrame = parseInt(thumbPreviewImg.dataset.frame || 0) + 1;
							if(currentFrame > maxThumbFrames){
								currentFrame = 0;
							}
							
							thumbPreviewImg.dataset.frame = currentFrame;
							$LFPP_Video_ThumbPreview_Image.css('margin-left', (currentFrame * -200) + 'px');
							
							_animationTimer = setTimeout(animateThumb, delayBetweenFrames);
						}
						function stopAnimateThumb(){
							_stopped = true;
							if(_animationTimer){
								try {
									clearTimeout(_animationTimer);
								} catch(e) {}
								_animationTimer = null;
							}
							if(!LFPP.videos.settings.keep_preview_after_hover){
								$LFPP_Video_ThumbPreview_Image.css('display', 'none');
							}
						}
						function startAnimateThumb(){
							_animationTimer = null;
							if(!_stopped) return;
							_stopped = false;
							
							if(!thumbPreviewWidth || !maxThumbFrames){
								thumbPreviewWidth = parseInt($LFPP_Video_ThumbPreview_Image.width());
								maxThumbFrames = Math.round(thumbPreviewWidth / 200);
							}
							
							if(thumbPreviewWidth){
								_animationTimer = setTimeout(animateThumb, delayBetweenFrames);
							} else {
								_animationTimer = setTimeout(startAnimateThumb, delayBetweenFrames);
							}
						}
						
						var errored = false;
						$LFPP_Video_Thumb_Wrapper.hover(function(){
							if(errored) return;
							if(!$LFPP_Video_ThumbPreview_Image.attr('src')){
								thumbPreviewImg.addEventListener('load', function(e) {
									//console.log('img load', e);
									if(errored) return;
									$LFPP_Video_ThumbPreview_Image.css('display', 'block');
									thumbPreviewWidth = parseInt($LFPP_Video_ThumbPreview_Image.width());
									maxThumbFrames = Math.round(thumbPreviewWidth / 200);
								});
								thumbPreviewImg.addEventListener('error', function(e) {
									//console.log('img error', e);
									errored = true;
								});
								thumbPreviewImg.setAttribute('src', spriteURL);
								_animationTimer = setTimeout(startAnimateThumb, delayBetweenFrames);
							} else {
								$LFPP_Video_ThumbPreview_Image.css('display', 'block');
								startAnimateThumb();
							}
						}, function(){
							stopAnimateThumb();
						});
					
					}

					
				}, function(e){
					videoListLog('processPageVideoThumb', 'Error: ', topicURL, e);
				});
			}
		}
	}
	
	function processPageVideoThumbs(){
		var $thumbs = $('.ipsBox ol.cTopicList > li.ipsDataItem:not(.thumb_processed)');
		$thumbs.each(function(){
			var $this = $(this);
			setAsap(function(){
				processPageVideoThumb($this);
			});
		});
	}
	
	LFPP.page.onBodyReady = function(){
		//videoListLog('onBodyReady', 'onBodyReady');
		
		if(LFPP.videos.settings.add_thumbs_to_video_list && videos.isVideoListPage){
			videoListLog('onBodyReady', 'is video list page');
			setAsap(processPageVideoThumbs);
			
			LFPP.page.onHistoryEdit = function(e, urlChanged, hashChanged){
				videoListLog('onBodyReady', 'onHistoryEdit fired: ', e, urlChanged, hashChanged);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
			
			//LFPP.page.onHashChange = function(e, urlChanged, hashChanged){
				//console.log('LFPP.page.onHashChange fired: ', e, urlChanged, hashChanged);
			//};
			
			LFPP.page.onPageIndexChange = function(e){
				videoListLog('onBodyReady', 'onPageIndexChange fired: ', e);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
		}
	};


})();

(function(){
	/* Video Player */

/**
 * Add CSS to jMod's CSS pool, which is added as soon as the DOM exists (or immediately if the DOM already exists)
 */
jMod.CSS = `
#ipsLayout_body {
	margin-top:0px;
}

#LFPP_StickyVideoWrapper_Outer {
	position: fixed;
	min-height: 50px;
	height: 200px;
	left: 0;
	width: 100%;
	top: 45px;
	z-index: 1000;
}

#LFPP_StickyVideoWrapper_Inner {
	background-color: black;
	width: 100%;
	height: 100%;
}

#LFPP_StickyVideoWrapper_Headline {
	position: relative;
	display: block;
	width: 100%;
	top: 0;
	height: 0;
	overflow: visible;
}

#LFPP_StickyVideoWrapper_Headline_Content {
	min-height: 45px;
	height: fit-content;
	height: -o-fit-content;
	height: -moz-fit-content;
	height: -webkit-fit-content;
	width: 100%;
	background-color: white;
	padding: 5px 20px;
	margin: 0 auto;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}

#LFPP_StickyVideoWrapper_Headline_Content h1 {
	font-family: "Helvetica Neue", Helvetica, Arial, "Liberation Sans", "Roboto", sans-serif;
	color: rgb(49, 49, 49);
}

#LFPP_StickyVideoWrapper_Headline_Content td > p > a[target="_blank"] {
	color: rgba(128,128,128,0.8);
}

#LFPP_StickyVideoWrapper_Headline_Content td > p > a[target="_blank"]:hover {
	color: rgba(0,0,0,1);
}

#LFPP_StickyVideoWrapper_Headline_Content .ipsButton_split {
	vertical-align: middle;
}

#LFPP_StickyVideoWrapper_Outer .video-container {
	padding: 0;
	height: 100%;
}

#LFPP_StickyVideoWrapper_Outer .video-container > iframe {

}
/*
#LFPP_StickyVideoWrapper_Padding {
	display: block;
	width:100%;
	height: 200px;
	position: relative;
	top: 0;
}
*/



#LFPP_StickyVideoWrapper_Headline_Content, .LFPP_Player_Min #LFPP_StickyVideoWrapper_Headline_Content {
    -webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
    backface-visibility: hidden;
	
	/*
	-webkit-transition: opacity 0.25s ease-in-out, top 0.25 ease-in-out;
	-moz-transition: opacity 0.25s ease-in-out, top 0.25 ease-in-out;
	transition: opacity 0.25s ease-in-out, top 0.25 ease-in-out;
	*/
	-webkit-transition: opacity 0.25s ease-in-out;
	-moz-transition: opacity 0.25s ease-in-out;
	transition: opacity 0.25s ease-in-out;
}

#LFPP_StickyVideoWrapper_Headline_Content {
    -webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
    backface-visibility: hidden;
	
	visibility: visible;
	opacity:1;
	
	/*top:0px;*/
}
.LFPP_Player_Min #LFPP_StickyVideoWrapper_Headline_Content {
    -webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
    backface-visibility: hidden;
	
	visibility: hidden;
	opacity: 0;
	/*top: -100px;*/
	z-index:-1;
}


/* fix for missing css when changing comment pages */
#LFPP_StickyVideoWrapper_Outer .video-container{
	position:relative;
	/*padding-bottom:56.25%;*/
	/*height:0;*/
	overflow:hidden;
}
#LFPP_StickyVideoWrapper_Outer .video-container iframe,
#LFPP_StickyVideoWrapper_Outer .video-container object,
#LFPP_StickyVideoWrapper_Outer .video-container embed {
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
}

`.toString();
	
	
	var player = LFPP.player = {
		settings: {}
	};
	var _vcache = player._cache = {};
	var _minPlayerSize = 200;
	var usingVelocity = true;
	var videoPlayerLog = LFPP.getLog('VideoPlayer');
	
	function getJModSetting(name, def){var tmp = jMod.Settings.get(name);return (typeof tmp === "undefined" ? def : tmp);}
	
	Object.defineProperties(LFPP.player.settings, {
		'enable_video_size_settings': {get: function() {return (getJModSetting('Video_Size', LFPP.getSettingDefault('Video_Size')).indexOf('enable_video_size_settings') > -1);},enumerable: true, configurable: false},
		'enable_dynamic_width_video': {get: function() {return (getJModSetting('Video_Size', LFPP.getSettingDefault('Video_Size')).indexOf('enable_dynamic_width_video') > -1);},enumerable: true, configurable: false},
		'enable_dynamic_width_video_animations': {get: function() {return (getJModSetting('Video_Size', LFPP.getSettingDefault('Video_Size')).indexOf('enable_dynamic_width_video_animations') > -1);},enumerable: true, configurable: false},
		'enable_video_headline': {get: function() {return (getJModSetting('Video_Size', LFPP.getSettingDefault('Video_Size')).indexOf('enable_video_headline') > -1);},enumerable: true, configurable: false},
		'Min_Video_Player_Height': {get: function() {return getJModSetting('Min_Video_Player_Height', LFPP.getSettingDefault('Min_Video_Player_Height')).trim();},enumerable: true, configurable: false}
	});
	
	LFPP.getDefaultAvailableVideoHeight = function(){return (LFPP.getViewportHeight() - LFPP.getNavBottom());};
	//LFPP.getDefaultMaxAvailableVideoHeight = function(){return (LFPP.getViewportHeight() - LFPP.getNavHeight());};
	LFPP.getStickyVideoMinHeight = function(){return parseInt(LFPP.getViewportHeight() / 4);};
	//LFPP.getDistanceTopToVideoWrapperBottom = function(){return (LFPP.el.LFPP_VideoWrapper_Outer.offset().top + LFPP.el.LFPP_VideoWrapper_Outer.height());};
	//LFPP.getDistanceTopToVideoWrapperBottom = function(){return (LFPP.getDefaultAvailableVideoHeight() + LFPP.el.LFPP_StickyVideoWrapper_Outer.height());};
	//LFPP.getDistanceNavBottomToVideoWrapperBottom = function(){return (LFPP.getDistanceTopToVideoWrapperBottom() - LFPP.getNavBottom());};


	function getMinPlayerSizeSetting(){
		var r = function(){return parseInt(LFPP.getViewportHeight() / 4)};
		if(_cache.getMinPlayerSizeSetting) return _cache.getMinPlayerSizeSetting;
		var minHeight = LFPP.player.settings.Min_Video_Player_Height;
		if(minHeight && minHeight.toLowerCase() !== 'default' && /^\s*(\d+(?:\.\d+)?px|\d+\/\d+)\s*$/i.test(minHeight)){
			if(/^\s*\d+(?:\.\d+)?px\s*$/i.test(minHeight)){
				r = function(){return parseInt(minHeight)};
			} else if(/^\d+\/\d+$/i.test(minHeight)){
				var ratio = minHeight.split('/');
				r = function(){return parseInt((LFPP.getViewportHeight() * parseInt(ratio[0])) / parseInt(ratio[1]))};
			}
		}
		return r;
	}
	
	LFPP.getStickyVideoCurrentHeight = function(){
		var pinned = LFPP.header.isNavPinned;
		var yOffset = window.pageYOffset;
		var distanceBelowVideoWrapper;
		if(pinned){
			distanceBelowVideoWrapper = yOffset - (LFPP.getHeaderBlockHeight() + LFPP.getNavHeight());
		} else {
			distanceBelowVideoWrapper = yOffset;
		}
		
		
		if(distanceBelowVideoWrapper <= 0){
			return LFPP.getDefaultAvailableVideoHeight();
		} else {
			if(pinned){
				return Math.max((_viewportHeight - LFPP.getNavBottom()) - (distanceBelowVideoWrapper), _minPlayerSize);
			} else {
				return Math.max(_viewportHeight + (LFPP.header.headerTotalActualHeight - distanceBelowVideoWrapper), _minPlayerSize);
			}
		}
	};
	
	var lastPageYOffset = 0,
		lastVPWidth = 0,
		lastVPHeight = 0;
	
	function getCurrentVals(){
		var r = {
			pageYOffset: window.pageYOffset,
			viewportHeight: _viewportHeight,
			
		};
		
		
		return data;
	}
	
	
	player.updatePageHeight = function(){
		var height = parseInt(LFPP.el.ipsLayout_body.outerHeight() + LFPP.el.ipsLayout_footer.outerHeight() + _viewportHeight + LFPP.header.headerTotalActualHeight) + 'px';
		LFPP.el.LFPP_FixedPage_Padding.css({'min-height': height, height: height});
	};
	
	var prevScrollEventVals = {};
	_vcache.onScroll = 0;
	_vcache.onScrollCooldown = null;
	player.onScroll = function(e, rescroll){
		var pinned = LFPP.header.isNavPinned;
		if(e && typeof e.pageY === "number"){
			//console.log(e);
			var _lastPageY = prevScrollEventVals.pageY;
			prevScrollEventVals.pageY = e.pageY;
			if(typeof _lastPageY === "number" && !prevScrollEventVals.rescroll){
				if(e.pageY > 0 && !pinned){
					var tHeaderHeight = parseInt(LFPP.header.headerTotalActualHeight);
					if(Math.abs(tHeaderHeight - e.pageY) < 10 && (tHeaderHeight - e.pageY) !== 0 && Math.abs(e.pageY - _lastPageY) > 50){
						//console.log('snap to header');
						prevScrollEventVals.rescroll = true;
						e.preventDefault();
						e.stopPropagation();
						return setAsap(function(){window.scrollTo(0, tHeaderHeight);});
					} else if(e.pageY < 10 && _lastPageY - e.pageY > 50) {
						//console.log('snap to top');
						prevScrollEventVals.rescroll = true;
						e.preventDefault();
						e.stopPropagation();
						return setAsap(function(){window.scrollTo(0, 0);});
					}
				
				}
			}
			prevScrollEventVals.rescroll = false;
		}
		var lastPageYOffset_old = 0,
			lastVPWidth_old = 0,
			lastVPHeight_old = 0;
			
		var scrollDiff = 0,
			widthDiff = 0,
			heightDiff = 0;
			
		var yOffset = window.pageYOffset;
		
		function updatePrevVals(){
			lastPageYOffset_old = lastPageYOffset;
			lastVPWidth_old = lastVPWidth;
			lastVPHeight_old = lastVPHeight;
			
			lastPageYOffset = yOffset;
			lastVPWidth = LFPP.getViewportWidth();
			lastVPHeight = LFPP.getViewportHeight();
			
			scrollDiff = (lastPageYOffset - lastPageYOffset_old);
			widthDiff = (lastVPWidth_old - lastVPWidth);
			heightDiff = (lastVPHeight_old - lastVPHeight);
		};
		
		updatePrevVals();
		
		if(_vcache.onScrollCooldown){
			//_vcache.onScroll++;
			if(widthDiff === 0 && heightDiff === 0 && scrollDiff === 0){// Math.abs(scrollDiff) < 10){
				_vcache.onScroll++;
				player.updatePageHeight();
				LFPP.el.LFPP_FixedPage_Wrapper.css({top: (LFPP.getViewportHeight() + parseInt(LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.outerHeight()) + LFPP.header.headerTotalActualHeight - window.scrollY)});
				return;
			} else {
				try {
					clearTimeout(_vcache.onScrollCooldown);
				} catch(e){}
				_vcache.onScrollCooldown = null;
			}
		}
		

		
		function _doOnScroll(die){
			
			
			var navBottom = LFPP.getNavBottom();
			
			//var lastPageYOffset_old = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding_yscroll.css('height') || 0);
			
			
			var newHeight = LFPP.getStickyVideoCurrentHeight();
			var headlineHeight = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.outerHeight());
			
			if(LFPP.player.settings.enable_dynamic_width_video_animations){ // Animations disabled for now
				if(pinned){
					//{pageYOffset: yOffset, viewportHeight: _viewportHeight}
					player.setPlayerHeight(newHeight, navBottom);
				} else {
					player.setPlayerHeight(newHeight, Math.max(navBottom - lastPageYOffset, 0));
				}
			} else {
				if(pinned){
					LFPP.el.LFPP_StickyVideoWrapper_Outer.css({'height': newHeight, top: navBottom});
				} else {
					LFPP.el.LFPP_StickyVideoWrapper_Outer.css({'height': newHeight, top: Math.max(navBottom - lastPageYOffset, 0)});
				}
				//LFPP.el.LFPP_StickyVideoWrapper_Padding_player.css('height', newHeight);
				LFPP.el.LFPP_FixedPage_Wrapper.css({top: (LFPP.getViewportHeight() + headlineHeight + LFPP.header.headerTotalActualHeight - window.scrollY)});
			}
			
			if(newHeight <= _minPlayerSize && (parseInt(LFPP.el.LFPP_FixedPage_Wrapper.css('top')) - newHeight - headlineHeight + 10) <= 0){
				//if(!LFPP.el.LFPP_StickyVideoWrapper_Outer.hasClass('LFPP_Player_Min')) LFPP.el.LFPP_StickyVideoWrapper_Outer.addClass('LFPP_Player_Min');
				LFPP.el.LFPP_StickyVideoWrapper_Outer.addClass('LFPP_Player_Min');
			} else {
				//if(LFPP.el.LFPP_StickyVideoWrapper_Outer.hasClass('LFPP_Player_Min')) LFPP.el.LFPP_StickyVideoWrapper_Outer.removeClass('LFPP_Player_Min');
				LFPP.el.LFPP_StickyVideoWrapper_Outer.removeClass('LFPP_Player_Min');
			}
			
			player.updatePageHeight();
			
			if(!die){
				_vcache.onScrollCooldown = setTimeout(function(){
					_vcache.onScrollCooldown = null;
					if(_vcache.onScroll > 1){
						_vcache.onScroll = 0;
						updatePrevVals();
						_doOnScroll(true);
					}
				}, 1);
			}
		}
		
		_doOnScroll();
		
	};
	
	player.onWindowResize = function(e, a){
		_viewportHeight = LFPP.getViewportHeight();
		_viewportWidth = LFPP.getViewportWidth();
		_minPlayerSize = parseInt(_viewportHeight / 4);
		LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.css({'max-width': LFPP.contentMaxWidth + 'px', width: LFPP.breadcrumbWidth + 'px'});
		player.updatePageHeight();
		player.onScroll();
	};
	
	player.setPlayerHeight = function(newPlayerHeight, newPlayerTop, data){
		if(_vcache.setPlayerHeight){
			if(_vcache.setPlayerHeightCancel){
				if(_vcache.setPlayerHeight_newPlayerHeight !== newPlayerHeight || _vcache.setPlayerHeight_newPlayerTop !== newPlayerTop){
					_vcache.setPlayerHeightCancel();
				} else {
					return _vcache.setPlayerHeight;
				}
			} else {
				return _vcache.setPlayerHeight;
			}
		}
		
		_vcache.setPlayerHeight_newPlayerHeight = newPlayerHeight;
		_vcache.setPlayerHeight_newPlayerTop = newPlayerTop;
		
		_vcache.setPlayerHeight = new Promise(function(resolve, reject) {
		
			var resolved = false,
				canceled = false,
				_resolve = function(){
					if(!resolved && !canceled){
						resolved = true;
						_vcache.setPlayerHeight = null;
						_vcache.setPlayerHeightCancel = null;
						_vcache.setPlayerHeight_newPlayerHeight = null;
						_vcache.setPlayerHeight_newPlayerTop = null;
						resolve(true);
					}
				},
				_cancel = function(){
					if(!resolved && !canceled){
						canceled = true;
						//console.log('canceled');
						_vcache.setPlayerHeight_newPlayerHeight = null;
						_vcache.setPlayerHeight_newPlayerTop = null;
						if(usingVelocity){
							LFPP.el.LFPP_StickyVideoWrapper_Outer.velocity("stop", true);
							LFPP.el.LFPP_FixedPage_Wrapper.velocity("stop", true);
							//LFPP.el.LFPP_StickyVideoWrapper_Padding_player.velocity("stop", true);
						} else {
							LFPP.el.LFPP_StickyVideoWrapper_Outer.stop(true);
							LFPP.el.LFPP_FixedPage_Wrapper.stop(true);
							//LFPP.el.LFPP_StickyVideoWrapper_Padding_player.stop(true);
						}
						resolved = true;
						_vcache.setPlayerHeight = null;
						_vcache.setPlayerHeightCancel = null;
						resolve(false);
					}
				};
				_vcache.setPlayerHeightCancel = _cancel;

				//setAsap(function(){
					//if(canceled) return;
					var wrapperChanges = {height: newPlayerHeight};
					var pageChanges = {top: (LFPP.getViewportHeight() + LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.height() + LFPP.header.headerTotalActualHeight - window.scrollY)};
					
					var oldHeight = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Outer.css('height'));
					var topDiff = 0,
						heightDiff = Math.abs(newPlayerHeight - oldHeight);
						//pHeightDiff = Math.abs(parseInt(LFPP.el.LFPP_StickyVideoWrapper_Outer.css('height')) - newPlayerHeight);
					
					if(typeof newPlayerTop === "number"){
						var wrapperTop = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Outer.css('top'));
						
						if(wrapperTop !== newPlayerTop){
							wrapperChanges.top = newPlayerTop;
							
							topDiff = Math.abs(wrapperTop - newPlayerTop);
						}
					}
					
					if(topDiff === 0 && heightDiff === 0 && parseInt(LFPP.el.LFPP_StickyVideoWrapper_Outer.css('height')) === newPlayerHeight){
						// Skip Animation
						LFPP.el.LFPP_FixedPage_Wrapper.css({top: (LFPP.getViewportHeight() + parseInt(LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.outerHeight()) + LFPP.header.headerTotalActualHeight - window.scrollY)});
						return setAsap(_resolve);
					}
					
					
					//var topSpeed = (topDiff / 75.0) * 0.25;
					//var heightSpeed = Math.min(heightDiff / 300.0, 1.75) * 0.75;
					//var speedRaw = Math.abs((heightSpeed - topSpeed) * 150.0);
					//var speed = parseInt(Math.max((Math.min(speedRaw, 300.0)), 30.0));
					//console.log('speed: \r\n\tspeed:\t\t', speed, '\r\n\traw:\t\t', speedRaw, '\r\n\theightSpeed:\t', heightSpeed, '\r\n\ttopSpeed:\t', topSpeed, '\r\n\theightDiff:\t', heightDiff, '\r\n\ttopDiff:\t', topDiff);
					var speed = 100;

					
					if(usingVelocity){
						
						//if(topDiff || heightDiff){
							LFPP.el.LFPP_StickyVideoWrapper_Outer.velocity(
								wrapperChanges,
								{
									duration: speed,
									easing: 'linear',
									complete: _resolve,
									queue: false
								}
							);
						//}
						
						LFPP.el.LFPP_FixedPage_Wrapper.velocity(
							pageChanges,
							{
								duration: speed,
								easing: 'linear',
								complete: _resolve,
								queue: false
							}
						);
						/*
						LFPP.el.LFPP_StickyVideoWrapper_Padding_player.velocity(
							paddingChanges,
							{
								duration: Math.min(speed, 75),
								easing: 'linear',
								complete: _resolve,
								queue: false
							}
						);
						*/
						
					} else {
						
						//if(topDiff || heightDiff){
							LFPP.el.LFPP_StickyVideoWrapper_Outer.animate(
								wrapperChanges,
								{
									duration: speed,
									easing: 'linear',
									always: _resolve,
									queue: false
								}
							);
						//}
						
						LFPP.el.LFPP_FixedPage_Wrapper.animate(
							pageChanges,
							{
								duration: speed,
								easing: 'linear',
								always: _resolve,
								queue: false
							}
						);
						/*
						LFPP.el.LFPP_StickyVideoWrapper_Padding_player.animate(
							paddingChanges,
							{
								duration: Math.min(speed, 75),
								easing: 'linear',
								always: _resolve,
								queue: false
							}
						);
						*/
					}
				
				//});
		});
		
		return _vcache.setPlayerHeight;
	};
	
	var videoPlayerWrapperAdded = false;
	function addVideoPlayerWrapper(){
		if(videoPlayerWrapperAdded) return;
		videoPlayerLog('onFooterReady', 'addVideoPlayerWrapper');
		//var animate = (jMod.Settings.get('Video_Size').indexOf('enable_dynamic_width_video_animations') > -1);
		LFPP.el.ipsLayout_header.after(''
			+ '<div id="LFPP_StickyVideoWrapper_Outer" style="height:200px;">'
				+ '<div id="LFPP_StickyVideoWrapper_Inner"></div>'
				+ '<div id="LFPP_StickyVideoWrapper_Headline">'
					+ '<div id="LFPP_StickyVideoWrapper_Headline_Content" style="max-width:' + LFPP.contentMaxWidth + 'px;width:' + LFPP.breadcrumbWidth + 'px;"></div>'
				+ '</div>'
			+ '</div>'
			+ '<div id="LFPP_FixedPage_Wrapper" style="display:block;position:fixed;width:100%;"></div>'
			+ '<div id="LFPP_FixedPage_Padding" style="display:block;width:100%;min-height:400vh;"></div>'
			/*
			+ '<div id="LFPP_StickyVideoWrapper_Padding" style="display:none !important;">'
				+ '<div id="LFPP_StickyVideoWrapper_Padding_header" style=""></div>'
				+ '<div id="LFPP_StickyVideoWrapper_Padding_headline" style=""></div>'
				+ '<div id="LFPP_StickyVideoWrapper_Padding_yscroll" style=""></div>'
				+ '<div id="LFPP_StickyVideoWrapper_Padding_player" style=""></div>'
			+ '</div>'
			*/
		);
		
		LFPP.el.LFPP_FixedPage_Wrapper[0].appendChild(document.getElementById('ipsLayout_body'));
		LFPP.el.LFPP_FixedPage_Wrapper[0].appendChild(document.getElementById('ipsLayout_footer'));
		
		var $videoContainer = LFPP.el.videoContainer.detach();
		//LFPP.el.LFPP_StickyVideoWrapper_Inner.append($videoContainer);
		LFPP.el.LFPP_StickyVideoWrapper_Inner[0].appendChild($videoContainer[0]);
		videoPlayerWrapperAdded = true;
		player.updatePageHeight();
		
		LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.append(''
			+ '<table style="width:100%;">'
				+ '<tr>'
					+ '<td style="min-width:50%;">'
						+ '<h1 style="font-size: 26px;font-weight: 400;line-height: 1.2;margin: 0;">' + LFPP.el.pageTitle.text() + '</h1>'
					+ '</td>'
				+ '</tr>'
				+ '<tr></tr>'
			+ '</table>'
		);
		function moveDownloadWrapper(){
				LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.find('table > tr:nth-of-type(1), table > tbody > tr:nth-of-type(1)').append($('<td style="text-align:right;" rowspan="2"></td>').append(LFPP.el.floatplaneDownloadWrapper.detach()));
			
				LFPP.el.floatplaneDownloadWrapper.prepend(LFPP.el.floatplaneDownloadWrapper.children('ul:first').detach());
				LFPP.el.floatplaneDownloadWrapper.children('ul:first').css('vertical-align', 'super').after('<br style="clear:both;" />');
				LFPP.el.floatplaneDownloadWrapper.children('label').attr('title', 'recommended if downloads aren\'t working, or if on mobile').html('Use native downloader').css({'margin-right': '3px', 'vertical-align': 'super'});
				LFPP.el.floatplaneDownloadWrapper.children('span.ipsCustomInput').css('vertical-align', 'super');
				LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.find('table > tr:nth-of-type(2), table > tbody > tr:nth-of-type(2)').append($('<td></td>').append(LFPP.el.floatplanePlaybackReportError.detach()));
		}
		
		function waitForDownloadWrapper(c){
			if((LFPP.el.floatplaneDownloadWrapper && LFPP.el.floatplaneDownloadWrapper.length) || c > 100){
				return moveDownloadWrapper();
			}
			setTimeout(waitForDownloadWrapper, 50, c + 1);
		}
		
		setTimeout(waitForDownloadWrapper, 50, 0);
		LFPP.header.onHeaderStateChange = function(data){
			videoPlayerLog('onHeaderStateChange', 'onHeaderStateChange fired', data);
			setAsap(player.onScroll);
		};
		
		//window.onscroll = player.onScroll;
		window.addEventListener("scroll", player.onScroll, true);
		
		$(window).on('resize orientationChange', player.onWindowResize);
		
		setAsap(player.onScroll);
	}
	
	LFPP.page.onFooterReady = function(){
		//videoPlayerLog('onFooterReady', 'onFooterReady');
		
		if(LFPP.isFPClubVideoPage){
			videoPlayerLog('onFooterReady', 'Is Video Page');
			_viewportHeight = LFPP.getViewportHeight();
			_minPlayerSize = parseInt(_viewportHeight / 4);
			prevScrollEventVals.pageY = window.pageYOffset;

			jMod.CSS = `			
/* Cover up white background when header hides */
#ipsLayout_header::before {
    display: block;
    height: 250px;
    width: 100%;
    background-color: black;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 1000;
}
`.toString();
			
			//var videoSizeSettings = getJModSetting('Video_Size', LFPP.getSettingDefault('Video_Size')).split(',');
			//console.log('Settings "Video_Size": ', getJModSetting('Video_Size', ''));
			
			if(LFPP.player.settings.enable_video_size_settings){
				if(LFPP.player.settings.enable_dynamic_width_video){
					var minPlayerFn = getMinPlayerSizeSetting();
					if(minPlayerFn && typeof minPlayerFn() === "number"){
						LFPP.getStickyVideoMinHeight = minPlayerFn;
					}
					//jMod.API.addStyle(videoPageCSS);
					addVideoPlayerWrapper();
				}
			}
		} else {
			videoPlayerLog('onFooterReady', 'Is Not Video Page');
		}
	};
	
	


})();
	
	var _initialized = false;
	function init(){
		if(_initialized) return;
		coreLog('init', 'initialized');
		
		InitSettings();
		
	}
	
	// Start DOM interactions
	function onDOMReadyCB(){
		coreLog('onDOMReadyCB', 'onDOMReady Fired');
		init();
	}
	
	function onBodyReadyCB(){
		coreLog('onBodyReadyCB', 'onBodyReady Fired');
		addSettingsButton();
	}
	
	function onFooterReadyCB(){
		coreLog('onFooterReadyCB', 'onFooterReady Fired');
		addSettingsButton();
	}
	
	var isChrome = /Chrome/i.test(window.navigator.userAgent) && /Google\s*Inc/i.test(window.navigator.vendor);
	var DOMReady = false,
		BodyReady = false,
		FooterReady = false;
	function onDOMReady(){
		if(DOMReady) return;
		DOMReady = true;
		onDOMReadyCB();
		LFPP.page.onDOMReady.fire();
		if(window.document && document.getElementById('ipsLayout_body')){
			onBodyReady();
			if(!FooterReady && window.document && document.getElementById('ipsLayout_footer')){
				onFooterReady();
			}
		}
	}
	
	function onBodyReady(){
		if(BodyReady) return;
		BodyReady = true;
		if(!DOMReady) onDOMReady();
		onBodyReadyCB();
		LFPP.page.onBodyReady.fire();
		if(window.document && document.getElementById('ipsLayout_footer')){
			onFooterReady();
		}
	}
	
	function onFooterReady(){
		if(FooterReady) return;
		FooterReady = true;
		if(!DOMReady) onDOMReady();
		if(!BodyReady) onBodyReady();
		onFooterReadyCB();
		LFPP.page.onFooterReady.fire();
	}
	
	function checkDocument(){
		
		//coreLog('beforescriptexecute', 'beforescriptexecute Fired', e);
		if(!FooterReady && window.document && window.document.body){
			if(!DOMReady) onDOMReady();
			if(!BodyReady && document.getElementById('ipsLayout_body')){
				onBodyReady();
			}
			if(BodyReady && !FooterReady && document.getElementById('ipsLayout_footer')){
				onFooterReady();
				return true;
			}
		}
		if(DOMReady && BodyReady && FooterReady) return true;
	}
	
	//jMod.onDOMReady = InitSettings;
	jMod.onDOMReady = onDOMReady;
	
	jMod.beforescriptexecute = function(e){
		return checkDocument();
	};
	
	if(isChrome){
		/*
		document.addEventListener('readystatechange', function(e){
			//coreLog('readystatechange', 'readystatechange Fired', document.readyState, e);
			checkDocument();
		}, true);
		*/
		
		var _initCount = 0;
		var _initTimer = null;
		_initTimer = setInterval(function(){
			if(!_initTimer || checkDocument() === true || _initCount > 50){
				try {
					clearInterval(_initTimer);
				} catch(e) {}
				_initTimer = null;
			}
			_initCount++;
		}, 30);
	}
	
	// jMod fully initialized
	/*
	function onReadyCB(){
		coreLog('onReadyCB', 'onReady Fired');
		if(!DOMReady) onDOMReady();
		if(!BodyReady && document.getElementById('ipsLayout_body')){
			onBodyReady();
			if(!FooterReady && document.getElementById('ipsLayout_footer')){
				onFooterReady();
				return true;
			}
		}
	}
	jMod.onReady = onReadyCB;
	*/
	/*
	// Page is ready
	function onPageReadyCB(){
		console.log('onPageReadyCB');
	}
	jMod.onPageReady = onPageReadyCB;

	// Page is loaded
	function loadCB(){
		console.log('loadCB');
	}
	jMod.load = loadCB;
	*/
	//console.log('addGlyphicons');
	//jMod.API.addGlyphicons();
	
	

	
	
	LFPP.SettingOptions = {
		title: 'LTT FP++ Settings',
		settings: [
			{
				name: 'Video_Size',
				description: 'Video Size',
				options: {
					'enable_video_size_settings': {
						label: 'Enable/Disable All Video Size Settings',
						on: 'ON',
						off: 'OFF'
					},
					'enable_dynamic_width_video': {
						label: 'Dynamic Video Player Size',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Full width video that shrinks when you scroll down',
							placement: 'right'
						}
					},
					'enable_dynamic_width_video_animations': {
						label: 'Animate Dynamic Video Player',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Smooth out the height changes with CSS transitions',
							placement: 'right'
						}
					},
					'enable_video_headline': {
						label: 'Show the video headline and download link',
						on: 'ON',
						off: 'OFF'
					}
				},
				tab: 'Tab_Videos',
				section: 'Player',
				type: 'toggle',
				'default': 'enable_video_size_settings,enable_dynamic_width_video,enable_video_headline'
			},
			{
				name: 'Min_Video_Player_Height',
				description: 'Minimum video player height when scrolling down',
				tooltip: {
					innerHTML: 'Valid examples: default, 300px, 1/3',
					placement: 'top-left'
				},
				tab: 'Tab_Videos',
				section: 'Player',
				type: 'input',
				'default': 'default'
			},
			{
				name: 'Thumbs_General',
				description: 'General',
				options: {
					'add_thumbs_to_video_list': {
						label: 'Add thumbnails to FP Club video topics',
						on: 'ON',
						off: 'OFF'
					},
					'show_preview_on_hover': {
						label: 'Show an animated preview on hover',
						on: 'ON',
						off: 'OFF'
					},
					'keep_preview_after_hover': {
						label: 'Keep preview visible after mouse leaves',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Simply keeps the paused animation visible instead of hiding it',
							placement: 'right'
						}
					}
				},
				tab: 'Tab_VideoGallery',
				section: 'Thumbs',
				type: 'toggle',
				'default': 'add_thumbs_to_video_list,show_preview_on_hover'
			},
			{
				name: 'thumb_animation_speed',
				description: 'Thumbnail Animation Speed',
				min: 20,
				max: 1500,
				tooltip: {
					innerHTML: 'Number of milliseconds between frames',
					placement: 'top'
				},
				tab: 'Tab_VideoGallery',
				section: 'Thumbs',
				type: 'range',
				'default': '300'
			}
		],
		tabs: [
			{
				name: 'About',
				innerHTML: [
					{
						type: 'div',
						className: 'row section-title-row',
						innerHTML: {
							type: 'div',
							className: 'col-md-12',
							innerHTML:  {
								type: 'h3',
								innerHTML: '<span>About<span style="text-align:right;float:right;margin-right:5px;opacity: 0.3;letter-spacing:0.1px;"><a href="https://linustechtips.com/main/profile/489159-jgjake2/" style="text-decoration: none;"><span style="color:black !important;">By jgjake2</span></a></span></span>',
								className: 'section-title'
							}
						}
					},
					{
						type: 'div',
						className: 'row form-group section-row',
						innerHTML: [
							'<div class="col-md-7">'
								+ '<h3 style="margin-top: 0;">LinusTechTips Floatplane Club++</h3>'
								+ '<p>A greasemonkey script that make the Floatplane Club feel like a real media platform, rather than a janky add-on</p>'
								+ '<p>If you have any issues, make sure report them on GitHub or in the LTT post.</p>'
							+ '</div>',
							
							'<div class="col-md-5">'
								+ '<u>Script Links</u>'
								+ '<ul style="padding-left: 30px;margin-top: 5px;">'
									+ '<li><a href="https://github.com/jgjake2/LTT_FP">GitHub</a></li>'
									+ '<li><a href="https://linustechtips.com/main/topic/777390-linustechtips-floatplane-club-greasemonkey-script/">LTT Thread</a></li>'
								+ '</ul>'
								+ '<u>Author:</u>'
								+ '<ul style="padding-left: 30px;margin-top: 5px;">'
									+ '<li><a href="https://linustechtips.com/main/profile/489159-jgjake2/">LTT Forum</a></li>'
									+ '<li><a href="https://www.facebook.com/jgjake2">Facebook</a></li>'
									+ '<li><a href="https://github.com/jgjake2">GitHub Profile</a></li>'
								+ '</ul>'
							+ '</div>'
						]
					}
				]
			},
			{
				name: 'Tab_Videos',
				displayName: 'Floatplane Videos',
				content: {
					footer: {
						type: 'div',
						innerHTML: ''
					}
				}
			},
			{
				name: 'Tab_VideoGallery',
				displayName: 'Video Gallery',
				content: {
					footer: {
						type: 'div',
						innerHTML: ''
					}
				}
			}
		],
		// (optional) Change the order of the tabs. Tabs left out will be added after in the order they are referenced by your settings
		tabOrder: ['About', 'Tab_Videos', 'Tab_VideoGallery'],
		// (optional) Set the active tab
		activeTab: 'Tab_Videos',
		// (optional) callback that fires before the settings dialog closes
		onBeforeHide: function(e){
			console.log('Settings on before hide');
		}
	};
	
	LFPP.getSettingDefault = function(name){
		var _settings = LFPP.SettingOptions.settings;
		for(var i = 0; i < _settings.length; i++){
			if(_settings[i].name === name){
				return _settings[i]['default'];
			}
		}
	}
	

	function InitSettings(){
		console.log('jMod.Settings Init');
		
		jMod.Settings(LFPP.SettingOptions);
	}
	
	checkDocument();
	
})($.noConflict());