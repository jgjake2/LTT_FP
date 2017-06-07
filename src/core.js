
(function($){
const _debug = false;
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
	
	[["src/modules/*"]]
	
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
	
	

	[["src/InitSettings.js"]]
	
	checkDocument();
	
})($.noConflict());