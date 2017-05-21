
(function($){
const _debug = true;
var uw = (typeof unsafeWindow !== "undefined" ? unsafeWindow : this),
	global = this;

[["src/lib/*"]]

Promise._immediateFn = setAsap;

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
		'LFPP_StickyVideoWrapper_Padding', 'LFPP_StickyVideoWrapper_Padding_header', 'LFPP_StickyVideoWrapper_Padding_headline', 'LFPP_StickyVideoWrapper_Padding_top', 'LFPP_StickyVideoWrapper_Padding_bottom'
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
	
	[["src/modules/*"]]

	[["src/InitSettings.js"]]
	
	
})($.noConflict());