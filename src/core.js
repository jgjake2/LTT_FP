
(function($){
const _debug = true;
var uw = (typeof unsafeWindow !== "undefined" ? unsafeWindow : this),
	global = this;

// Promise Polyfill
// https://github.com/taylorhakes/promise-polyfill
!function(a){function b(){}function c(a,b){return function(){a.apply(b,arguments)}}function d(a){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],j(a,this)}function e(a,b){for(;3===a._state;)a=a._value;return 0===a._state?void a._deferreds.push(b):(a._handled=!0,void d._immediateFn(function(){var c=1===a._state?b.onFulfilled:b.onRejected;if(null===c)return void(1===a._state?f:g)(b.promise,a._value);var d;try{d=c(a._value)}catch(a){return void g(b.promise,a)}f(b.promise,d)}))}function f(a,b){try{if(b===a)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"==typeof b||"function"==typeof b)){var e=b.then;if(b instanceof d)return a._state=3,a._value=b,void h(a);if("function"==typeof e)return void j(c(e,b),a)}a._state=1,a._value=b,h(a)}catch(b){g(a,b)}}function g(a,b){a._state=2,a._value=b,h(a)}function h(a){2===a._state&&0===a._deferreds.length&&d._immediateFn(function(){a._handled||d._unhandledRejectionFn(a._value)});for(var b=0,c=a._deferreds.length;b<c;b++)e(a,a._deferreds[b]);a._deferreds=null}function i(a,b,c){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.promise=c}function j(a,b){var c=!1;try{a(function(a){c||(c=!0,f(b,a))},function(a){c||(c=!0,g(b,a))})}catch(a){if(c)return;c=!0,g(b,a)}}var k=setTimeout;d.prototype.catch=function(a){return this.then(null,a)},d.prototype.then=function(a,c){var d=new this.constructor(b);return e(this,new i(a,c,d)),d},d.all=function(a){var b=Array.prototype.slice.call(a);return new d(function(a,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}b[f]=g,0==--e&&a(b)}catch(a){c(a)}}if(0===b.length)return a([]);for(var e=b.length,f=0;f<b.length;f++)d(f,b[f])})},d.resolve=function(a){return a&&"object"==typeof a&&a.constructor===d?a:new d(function(b){b(a)})},d.reject=function(a){return new d(function(b,c){c(a)})},d.race=function(a){return new d(function(b,c){for(var d=0,e=a.length;d<e;d++)a[d].then(b,c)})},d._immediateFn="function"==typeof setImmediate&&function(a){setImmediate(a)}||function(a){k(a,0)},d._unhandledRejectionFn=function(a){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",a)},d._setImmediateFn=function(a){d._immediateFn=a},d._setUnhandledRejectionFn=function(a){d._unhandledRejectionFn=a},a.Promise=d}(this);

// setAsap Polyfill
// https://github.com/taylorhakes/setAsap
!function(e,t){"use strict";function n(){return 9007199254740991===s?0:++s}var o="object"==typeof window&&window||"object"==typeof global&&global||"object"==typeof self&&self||e,r="function"==typeof setImmediate,i="object"==typeof process&&!!process&&"function"==typeof process.nextTick,s=0,a=function(){var e,t,s,a;if(o.MutationObserver)return function(t){e=document.createElement("div"),new MutationObserver(function(){t(),e=null}).observe(e,{attributes:!0}),e.setAttribute("i","1")};if(!r&&o.postMessage&&!o.importScripts&&o.addEventListener){var c="com.setImmediate"+Math.random();a={};var u=function(e){if(e.source===o&&0===e.data.indexOf(c)){var t=e.data.split(":")[1];a[t](),delete a[t]}};return o.addEventListener("message",u,!1),function(e){var t=n();a[t]=e,o.postMessage(c+":"+t,"*")}}return!r&&o.document&&"onreadystatechange"in document.createElement("script")?function(e){t=document.createElement("script"),t.onreadystatechange=function(){t.onreadystatechange=null,t.parentNode.removeChild(t),t=null,e()},document.body.appendChild(t)}:(s=r&&setImmediate||i&&process.nextTick||setTimeout,function(e){s(e)})}();o.setAsap=a}(this);
Promise._immediateFn = setAsap;

function isArray(obj){return (obj.constructor === (new Array).constructor ? true : false);}

jMod.CSS = `
.jmod-na {z-index: 16400;}
.jmod-na .modal-backdrop {z-index: 16400;}
.jmod-na .modal {z-index: 16500;}
`.toString();
	
	var LFPP = {
		el: {},
		log: (_debug ? console.log : function(){})
	};
	var _cache = {};
	
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
		'elUserNav', 'ipsLayout_header', 'ipsLayout_body', 'lmgNav',
		'elFullSettings',
		'LFPP_VideoWrapper_Outer', 'LFPP_VideoWrapper_Inner_Padding', 'LFPP_VideoWrapper_Inner_Container',
		'LFPP_StickyVideoWrapper_Outer', 'LFPP_StickyVideoWrapper_Inner', 'LFPP_StickyVideoWrapper_Headline', 'LFPP_StickyVideoWrapper_Headline_Content', 'LFPP_StickyVideoWrapper_Padding'
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
	});
	
	LFPP.getNavHeight = function(){return Math.max(45, (LFPP.el.lmgNav && LFPP.el.lmgNav.length ? parseInt(LFPP.el.lmgNav.height()) : -1));};
	LFPP.getNavBottom = function(){return (parseInt(LFPP.el.lmgNav.height()) + parseInt(LFPP.el.lmgNav.css('top')));};
	
	LFPP.getHeaderBlockHeight = function(){return (LFPP.el.headerBlock && LFPP.el.headerBlock.length ? parseInt(LFPP.el.headerBlock.height()) : -1);};
	
	LFPP.getViewportHeight = function(){return $(window).height();};
	LFPP.getViewportWidth = function(){return $(window).width();};
	LFPP.getPageYOffset = function(){return (window.pageYOffset || unsafeWindow.pageYOffset);};
	
	
	
	var _settingsButtonAdded = false;
	function addSettingsButton(){
		if(_settingsButtonAdded) return;
		LFPP.log('addSettingsButton');
		
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
	
	var _initialized = false;
	function init(){
		if(_initialized) return;
		LFPP.log('init');
		
		InitSettings();
		addSettingsButton();
	}
	
	// Start DOM interactions
	function onDOMReadyCB(){
		LFPP.log('onDOMReadyCB');
		init();
	}
	//jMod.onDOMReady = InitSettings;
	jMod.onDOMReady = onDOMReadyCB;
	
	/*
	// jMod fully initialized
	function onReadyCB(){
		console.log('onReadyCB');
	}
	jMod.onReady = onReadyCB;

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
	
	[["src/modules/*"]]

	[["src/InitSettings.js"]]
	
	
})($.noConflict());