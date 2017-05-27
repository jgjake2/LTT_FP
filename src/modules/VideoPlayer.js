
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
