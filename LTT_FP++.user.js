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
// @require          https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require          https://code.jmod.info/velocity.min.js
// @require          https://code.jmod.info/0.0.20/jMod.min.js
// @version          0.3
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
// @jMod             {"debug": false, "API": {"log": {"debug": true}}}
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
		'elUserNav', 'ipsLayout_header', 'ipsLayout_body', 'ipsLayout_contentArea', 'ipsLayout_mainArea', 'lmgNav',
		'elFullSettings',
		'LFPP_StickyVideoWrapper_Outer', 'LFPP_StickyVideoWrapper_Inner', 'LFPP_StickyVideoWrapper_Headline', 'LFPP_StickyVideoWrapper_Headline_Content',
		'LFPP_StickyVideoWrapper_Padding', 'LFPP_StickyVideoWrapper_Padding_top', 'LFPP_StickyVideoWrapper_Padding_bottom'
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
	
	
(function(){
	/* Video Player */

/**
 * Add CSS to jMod's CSS pool, which is added as soon as the DOM exists (or immediately if the DOM already exists)
 */
jMod.CSS = `
#ipsLayout_body {
	margin-top:10px;
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


#LFPP_StickyVideoWrapper_Headline_Content {
	opacity:1;
	top:0px;
	transition: opacity 0.2s ease-in-out, top 0.2 ease-in-out;
}
.LFPP_Player_Min #LFPP_StickyVideoWrapper_Headline_Content {
	opacity: 0;
	top: -100px;
	transition: opacity 0.25s ease-in-out, top 0.25 ease-in-out;
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
	var _viewportHeight = 0;
	var _minPlayerSize = 200;
	var usingVelocity = true;
	
	Object.defineProperties(LFPP.player.settings, {
		'enable_video_size_settings': {get: function() {return (jMod.Settings.get('Video_Size').indexOf('enable_video_size_settings') > -1);},enumerable: true, configurable: false},
		'enable_dynamic_width_video': {get: function() {return (jMod.Settings.get('Video_Size').indexOf('enable_dynamic_width_video') > -1);},enumerable: true, configurable: false},
		'enable_dynamic_width_video_animations': {get: function() {return (jMod.Settings.get('Video_Size').indexOf('enable_dynamic_width_video_animations') > -1);},enumerable: true, configurable: false},
		'enable_video_headline': {get: function() {return (jMod.Settings.get('Video_Size').indexOf('enable_video_headline') > -1);},enumerable: true, configurable: false},
		'Min_Video_Player_Height': {get: function() {return jMod.Settings.get('Min_Video_Player_Height').trim();},enumerable: true, configurable: false}
	});
	
	LFPP.getDefaultAvailableVideoHeight = function(){return (LFPP.getViewportHeight() - LFPP.getNavBottom());};
	LFPP.getDefaultMaxAvailableVideoHeight = function(){return (LFPP.getViewportHeight() - LFPP.getNavHeight());};
	LFPP.getStickyVideoMinHeight = function(){return parseInt(LFPP.getViewportHeight() / 4);};
	//LFPP.getDistanceTopToVideoWrapperBottom = function(){return (LFPP.el.LFPP_VideoWrapper_Outer.offset().top + LFPP.el.LFPP_VideoWrapper_Outer.height());};
	LFPP.getDistanceTopToVideoWrapperBottom = function(){return (LFPP.getDefaultAvailableVideoHeight() + LFPP.el.LFPP_StickyVideoWrapper_Outer.height());};
	LFPP.getDistanceNavBottomToVideoWrapperBottom = function(){return (LFPP.getDistanceTopToVideoWrapperBottom() - LFPP.getNavBottom());};


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
		var yOffset = LFPP.getPageYOffset();
		var defHeight = LFPP.getDefaultAvailableVideoHeight();
		var vBottom = _viewportHeight + yOffset;
		var wrapperMaxBottom = (_viewportHeight + LFPP.getHeaderBlockHeight() + LFPP.getNavHeight());
		
		var distanceBelowVideoWrapper = vBottom - wrapperMaxBottom;
		
		
		if(distanceBelowVideoWrapper <= 0){
			return defHeight;
		} else {
			return Math.max((_viewportHeight - LFPP.getNavBottom()) - (distanceBelowVideoWrapper * 2), _minPlayerSize);
		}
	};
	
	player.onScroll = function(e){
		if(LFPP.player.settings.enable_dynamic_width_video_animations){
			if(usingVelocity){
				LFPP.el.LFPP_StickyVideoWrapper_Padding_top.clearQueue().stop();
				LFPP.el.LFPP_StickyVideoWrapper_Padding_top.velocity({'height': window.pageYOffset}, {
					duration: 75,
					easing: 'linear',
					//complete: function(){}
				});
			} else {
				LFPP.el.LFPP_StickyVideoWrapper_Padding_top.velocity("stop", true);
				LFPP.el.LFPP_StickyVideoWrapper_Padding_top.velocity({'height': window.pageYOffset}, {
					duration: 75,
					easing: 'linear',
					//complete: function(){}
				});
			}
		} else {
			LFPP.el.LFPP_StickyVideoWrapper_Padding_top.css('height', window.pageYOffset + 'px');
		}
		
		var newHeight = LFPP.getStickyVideoCurrentHeight();
		if(LFPP.player.settings.enable_dynamic_width_video_animations){
			player.setPlayerHeight(newHeight, LFPP.getNavBottom());
		} else {
			LFPP.el.LFPP_StickyVideoWrapper_Outer.css({'height': newHeight, top: LFPP.getNavBottom()});
			LFPP.el.LFPP_StickyVideoWrapper_Padding_bottom.css('height', newHeight);
		}
		
		var maxScroll = _viewportHeight - ((_minPlayerSize + LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.height()) * 2) + 75;
		player.setPlayerPaddingMaxHeight(maxScroll);
		
		if((maxScroll + parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding_bottom.css('height'))) <= (window.pageYOffset + _minPlayerSize)){
			LFPP.el.LFPP_StickyVideoWrapper_Outer.addClass('LFPP_Player_Min');
		} else {
			
			LFPP.el.LFPP_StickyVideoWrapper_Outer.removeClass('LFPP_Player_Min');
		}
	};
	
	player.onWindowResize = function(e, a){
		_viewportHeight = LFPP.getViewportHeight();
		_minPlayerSize = parseInt(_viewportHeight / 4);
		player.onScroll();
	};
	
	player.setPlayerPaddingMaxHeight = function(paddingMaxHeight){
		if(LFPP.el.LFPP_StickyVideoWrapper_Padding_top.css('max-height') !== (paddingMaxHeight + 'px')){
			LFPP.el.LFPP_StickyVideoWrapper_Padding_top.css('max-height', paddingMaxHeight);
		}
	};
	
	player.setPlayerHeight = function(newPlayerHeight, newPlayerTop){
		if(_cache.setPlayerHeight){
			if(_cache.setPlayerHeightCancel){
				_cache.setPlayerHeightCancel();
			} else {
				return _cache.setPlayerHeight;
			}
		}
		
		_cache.setPlayerHeight = new Promise(function(resolve, reject) {
		
			var resolved = false,
				canceled = false,
				_resolve = function(){
					if(!resolved && !canceled){
						resolved = true;
						_cache.setPlayerHeight = null;
						_cache.setPlayerHeightCancel = null;
						resolve(true);
					}
				},
				_cancel = function(){
					if(!resolved && !canceled){
						canceled = true;
						//console.log('canceled');
						if(usingVelocity){
							LFPP.el.LFPP_StickyVideoWrapper_Outer.velocity("stop", true);
							LFPP.el.LFPP_StickyVideoWrapper_Padding_bottom.velocity("stop", true);
						} else {
							LFPP.el.LFPP_StickyVideoWrapper_Outer.clearQueue().stop();
							LFPP.el.LFPP_StickyVideoWrapper_Padding_bottom.clearQueue().stop();
						}
						resolved = true;
						_cache.setPlayerHeight = null;
						_cache.setPlayerHeightCancel = null;
						resolve(false);
					}
				};
				_cache.setPlayerHeightCancel = _cancel;

				setAsap(function(){
					if(canceled) return;
					var wrapperChanges = {height: newPlayerHeight};
					var paddingChanges = {height: newPlayerHeight};
					if(typeof newPlayerTop === "number" && parseInt(LFPP.el.LFPP_StickyVideoWrapper_Outer.css('top')) !== newPlayerTop){
						wrapperChanges.top = newPlayerTop;
					}
					var speed = 100;
					
					if(usingVelocity){
						
						LFPP.el.LFPP_StickyVideoWrapper_Outer.velocity(
							wrapperChanges,
							{
								duration: speed,
								easing: 'linear',
								complete: _resolve
							}
						);
						
						LFPP.el.LFPP_StickyVideoWrapper_Padding_bottom.velocity(
							paddingChanges,
							{
								duration: speed,
								easing: 'linear',
								complete: _resolve
							}
						);
						
					} else {
						
						LFPP.el.LFPP_StickyVideoWrapper_Outer.animate(
							wrapperChanges,
							{
								duration: speed,
								easing: 'linear',
								always: _resolve
							}
						);
						
						LFPP.el.LFPP_StickyVideoWrapper_Padding_bottom.animate(
							paddingChanges,
							{
								duration: speed,
								easing: 'linear',
								always: _resolve
							}
						);
					}
				
				});
		});
		
		return _cache.setPlayerHeight;
	};
	
	var videoPlayerWrapperAdded = false;
	function addVideoPlayerWrapper(){
		if(videoPlayerWrapperAdded) return;
		LFPP.log('addVideoPlayerWrapper');
		//var animate = (jMod.Settings.get('Video_Size').indexOf('enable_dynamic_width_video_animations') > -1);
		LFPP.el.ipsLayout_header.after(''
			+ '<div id="LFPP_StickyVideoWrapper_Outer" style="height:200px;">'
				+ '<div id="LFPP_StickyVideoWrapper_Inner"></div>'
				+ '<div id="LFPP_StickyVideoWrapper_Headline">'
					+ '<div id="LFPP_StickyVideoWrapper_Headline_Content" style="max-width:' + LFPP.contentMaxWidth + 'px;width:' + LFPP.breadcrumbWidth + 'px;"></div>'
				+ '</div>'
			+ '</div>'
			+ '<div id="LFPP_StickyVideoWrapper_Padding" style="">'
				+ '<div id="LFPP_StickyVideoWrapper_Padding_top" style=""></div>'
				+ '<div id="LFPP_StickyVideoWrapper_Padding_bottom" style=""></div>'
			+ '</div>'
		);
		
		var $videoContainer = LFPP.el.videoContainer.detach();
		LFPP.el.LFPP_StickyVideoWrapper_Inner.append($videoContainer);
		videoPlayerWrapperAdded = true;
		
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
		
		if(!LFPP.player.settings.enable_video_headline){
			LFPP.el.LFPP_StickyVideoWrapper_Headline.css('display', 'none');
		}
		
		var navObserver = new MutationObserver(function(mutations) {
			var _break = false;
			mutations.forEach(function(mutation) {
				if(!_break && mutation.attributeName === 'class') {
					setAsap(player.onScroll);
					_break = true;
				}
			});    
		});

		var navObConfig = {attributes: true, childList: false, characterData: false, subtree: false};

		navObserver.observe(LFPP.el.lmgNav[0], navObConfig);
		
		window.onscroll = player.onScroll;
		
		setAsap(player.onScroll);
		$(window).on('resize orientationChange', player.onWindowResize);
	}
	
	jMod.onDOMReady = function(){
		LFPP.log('VideoPlayer::onDOMReadyCB');
		_viewportHeight = LFPP.getViewportHeight();
		_minPlayerSize = parseInt(_viewportHeight / 4);
		
		if(LFPP.isFPClubVideoPage){
			LFPP.log('Is Video Page');
			
			var videoSizeSettings = jMod.Settings.get('Video_Size').split(',');
			//console.log('Settings "Video_Size": ', jMod.Settings.get('Video_Size'));
			
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
			LFPP.log('Is Not Video Page');
		}
	};


})();
	
	function InitSettings(){
		console.log('jMod.Settings Example');
		var SettingOptions = {
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
					'default': 'enable_video_size_settings,enable_dynamic_width_video,enable_dynamic_width_video_animations,enable_video_headline'
				},
				{
					name: 'Min_Video_Player_Height',
					description: 'Minimum video player height when scrolling down',
					tooltip: {
						innerHTML: 'Valid examples: default, 300px, 1/3',
						placement: 'top-right'
					},
					tab: 'Tab_Videos',
					section: 'Player',
					type: 'input',
					'default': 'default'
				}
			],
			tabs: [
				// (optional) Additional Custom tab
				{
					name: 'About',
					innerHTML: [
						{
							type: 'h1',
							innerHTML: 'About'
						},
						{
							type: 'p',
							innerHTML: 'foo bar'
						}
					]
				},
				// (optional) Adding information about a tab referenced by a setting
				{
					name: 'Tab_Videos',
					displayName: 'Floatplane Videos',
					content: {
						footer: {
							type: 'div',
							innerHTML: ''
						}
					}
				}
			],
			// (optional) Change the order of the tabs. Tabs left out will be added after in the order they are referenced by your settings
			tabOrder: ['About', 'Tab_Videos'],
			// (optional) Set the active tab
			activeTab: 'Tab_Videos',
			// (optional) callback that fires before the settings dialog closes
			onBeforeHide: function(e){
				console.log('Settings on before hide');
			}
		};
		
		jMod.Settings(SettingOptions);
	}
	
	
})($.noConflict());