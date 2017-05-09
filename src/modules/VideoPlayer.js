
(function(){
	/* Video Player */

/**
 * Add CSS to jMod's CSS pool, which is added as soon as the DOM exists (or immediately if the DOM already exists)
 */
jMod.CSS = `
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
	background-color: #333;
	padding: 5px 20px;
}

#LFPP_StickyVideoWrapper_Headline_Content h1 {
	font-family: "Helvetica Neue", Helvetica, Arial, "Liberation Sans", "Roboto", sans-serif;
	color: rgba(255,255,255,0.8);
}

#LFPP_StickyVideoWrapper_Headline_Content td > p > a[target="_blank"] {
	color: rgba(128,128,128,1);
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

#LFPP_StickyVideoWrapper_Padding {
	display: block;
	width:100%;
	height: 200px;
	position: relative;
	top: 0;
}
`.toString();
	
	
	var player = LFPP.player = {
		settings: {}
	};
	
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
		var vh = LFPP.getViewportHeight();
		var vBottom = vh + yOffset;
		var wrapperMaxBottom = (vh + LFPP.getHeaderBlockHeight() + LFPP.getNavHeight());
		
		var distanceBelowVideoWrapper = vBottom - wrapperMaxBottom;
		
		
		if(distanceBelowVideoWrapper <= 0){
			return defHeight;
		} else {
			return Math.max((vh - LFPP.getNavBottom()) - (distanceBelowVideoWrapper * 2), LFPP.getStickyVideoMinHeight());
		}
	};
	
	
	var _tPlayerHeight = 0,
		_tPlayerTop = 0,
		_tPaddingHeight = 0,
		_tCount = 0;
	_cache.setVideoPlayerSize = null;
	_cache.videoPlayerSizeCancel = null;
	_cache.videoPlayerSizeDistance = null;
	var usingVelocity = true;
	

	LFPP.setVideoPlayerSize = function(playerHeight, playerTop, paddingHeight){
		//console.log('setVideoPlayerSize', playerHeight, playerTop, paddingHeight);
		if(_cache.setVideoPlayerSize){
			_tCount += (Math.abs(_tPlayerHeight - playerHeight));
			if(_cache.videoPlayerSizeCancel && _tCount > 20){// && Math.abs(needsResize) > 15 && Math.abs(needsResize - _this.working.boxResizeDistance) > 10 )
				_cache.videoPlayerSizeCancel();
			} else {
				return _cache.setVideoPlayerSize;
			}
		}
		_tCount = 0;
		
		_cache.setVideoPlayerSize = new Promise(function(resolve, reject) {
		
			var resolved = false,
				canceled = false,
				_resolve = function(){
					if(!resolved && !canceled){
						resolved = true;
						_cache.setVideoPlayerSize = null;
						_cache.videoPlayerSizeCancel = null;
						_cache.videoPlayerSizeDistance = null;
						
						if(_tCount > 0){
							setTimeout(function(){
								if(!_cache.setVideoPlayerSize){
									LFPP.refreshStickyVideoPosition();
								}
							}, 8);
						}
						resolve(true);
					}
				},
				_cancel = function(){
					if(!resolved && !canceled){
						canceled = true;
						//console.log('canceled');
						if(usingVelocity){
							LFPP.el.LFPP_StickyVideoWrapper_Outer.velocity("stop", true);
							LFPP.el.LFPP_StickyVideoWrapper_Padding.velocity("stop", true);
						} else {
							LFPP.el.LFPP_StickyVideoWrapper_Outer.clearQueue().stop();
							LFPP.el.LFPP_StickyVideoWrapper_Padding.clearQueue().stop();
						}
						resolved = true;
						_cache.setVideoPlayerSize = null;
						_cache.videoPlayerSizeCancel = null;
						_cache.videoPlayerSizeDistance = null;
						resolve(false);
					}
				};
				_cache.videoPlayerSizeCancel = _cancel;
				
				var paddingDirection = (paddingHeight == -1 ? 0 : ((_tPaddingHeight - paddingHeight) >= 0 ? -1 : 1));
				_tPlayerHeight = playerHeight;
				_tPlayerTop = playerTop;
				_tPaddingHeight = paddingHeight > -1 ? paddingHeight : _tPaddingHeight;

				setAsap(function(){
					if(canceled) return;
					var wrapperChanges = {};
					var paddingChanges = {};
					
					wrapperChanges.height = playerHeight;
					
					if(parseInt(LFPP.el.LFPP_StickyVideoWrapper_Outer.css('top')) !== playerTop){
						wrapperChanges.top = playerTop;
					}
					
					paddingChanges.height = paddingHeight;
					
					var wrapperHeightDistance = Math.abs(parseInt(LFPP.el.LFPP_StickyVideoWrapper_Outer.css('height')) - playerHeight);
					
					var speed = Math.min(Math.max(parseInt((180.0 / 80.0) * wrapperHeightDistance), 250), 100);
					
					_cache.videoPlayerSizeDistance = wrapperHeightDistance;
					
					if(usingVelocity){
						LFPP.el.LFPP_StickyVideoWrapper_Outer.velocity(
							wrapperChanges,
							{
								duration: speed,
								easing: 'linear',
								complete: _resolve
							}
						);
						
						
						if(paddingHeight > -1 && parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding.css('height')) !== paddingHeight){
							LFPP.el.LFPP_StickyVideoWrapper_Padding.velocity(
								paddingChanges,
								{
									duration: speed,
									easing: 'linear',
									complete: _resolve
								}
							);
						}
						
						
					} else {
					
					
						LFPP.el.LFPP_StickyVideoWrapper_Outer.animate(wrapperChanges,
							{
								duration: speed,
								//easing: 'swing',
								easing: 'linear',
								//complete: _resolve,
								//fail: _resolve,
								always: _resolve
							}
						);
						
						if(paddingHeight > -1 && parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding.css('height')) !== paddingHeight){
							LFPP.el.LFPP_StickyVideoWrapper_Padding.animate(paddingChanges,
								{
									duration: speed,
									//easing: 'swing',
									easing: 'linear',
									//complete: _resolve,
									//fail: _resolve,
									always: _resolve
								}
							);
						}
						
						
					}
				
				});
		});
		
		return _cache.setVideoPlayerSize;
	};
	
	LFPP.refreshStickyVideoPosition = function(force){
		var newHeight = LFPP.getStickyVideoCurrentHeight();
		//var minHeight = LFPP.getStickyVideoMinHeight();
		
		var prevHeight = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding.attr('prevheight') || 0);
		var prevPadding = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding.attr('prevpadding') || 0);
		var newPadding = (newHeight + LFPP.getPageYOffset() + LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.height() - LFPP.getHeaderBlockHeight());
		
		if(prevHeight !== newHeight) LFPP.el.LFPP_StickyVideoWrapper_Padding.attr('prevheight', newHeight);
		if(prevPadding !== newPadding) LFPP.el.LFPP_StickyVideoWrapper_Padding.attr('prevpadding', newPadding);
		
		
		if(LFPP.player.settings.enable_dynamic_width_video_animations){
			LFPP.setVideoPlayerSize(newHeight, LFPP.getNavBottom(), (prevHeight === newHeight ? -1 : newPadding));
		} else {
			LFPP.el.LFPP_StickyVideoWrapper_Outer.css({'height': newHeight + 'px', top: LFPP.getNavBottom() + 'px'});
			if(prevHeight !== newHeight){
				LFPP.el.LFPP_StickyVideoWrapper_Padding.css('height', newPadding + 'px');
			}
		}
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
					+ '<div id="LFPP_StickyVideoWrapper_Headline_Content"></div>'
				+ '</div>'
			+ '</div>'
			+ '<div id="LFPP_StickyVideoWrapper_Padding" style="height:' + (LFPP.getViewportHeight() - LFPP.getHeaderBlockHeight() - LFPP.getNavHeight()) + 'px;"></div>'
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
					setAsap(LFPP.refreshStickyVideoPosition);
					_break = true;
				}
			});    
		});

		var navObConfig = {attributes: true, childList: false, characterData: false, subtree: false};

		navObserver.observe(LFPP.el.lmgNav[0], navObConfig);
		/*
		var playerObserver = new MutationObserver(function(mutations) {
			var _break = false;
			mutations.forEach(function(mutation) {
				console.log('mutation', mutation);
				if(!_break && mutation.attributeName === 'style') {
					//setAsap(LFPP.refreshStickyVideoPosition);
					LFPP.refreshPaddingHeight();
					_break = true;
				}
			});    
		});

		var playerObConfig = {attributes: true, childList: false, characterData: false, subtree: false};

		playerObserver.observe(LFPP.el.LFPP_StickyVideoWrapper_Outer[0], playerObConfig);
		*/
		
		function _onPageScroll(e){
			//console.log('scroll', e);
			setAsap(LFPP.refreshStickyVideoPosition);
		};
		
		
		//$(window).scroll(function(e) {
			//console.log('$scroll', e);
		//});
		
		window.onscroll = _onPageScroll;
		
		LFPP.refreshStickyVideoPosition();
		setTimeout(LFPP.refreshStickyVideoPosition, 100);
		$(window).on('resize orientationChange', LFPP.refreshStickyVideoPosition);
	}
	
	jMod.onDOMReady = function(){
		LFPP.log('VideoPlayer::onDOMReadyCB');
		
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
