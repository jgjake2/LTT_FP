
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