
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
	
	jMod.onDOMReady = function(){
		LFPP.log('Header::onPageReady');
		addObservers();
		
		/*
		header.onHeaderStateChange = function(data){
			LFPP.log('Header::onHeaderStateChange fired', data);
		};
		*/
	};
	
})();

