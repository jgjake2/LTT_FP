
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
	var _viewportHeight = 0;
	var _minPlayerSize = 200;
	var usingVelocity = true;
	var scalar = 1;
	function scale(num){return parseInt(num * scalar);}
	
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
		var yOffset = LFPP.getPageYOffset();
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
				return Math.max((_viewportHeight - LFPP.getNavBottom()) - scale(distanceBelowVideoWrapper), _minPlayerSize);
			} else {
				return Math.max(_viewportHeight + scale(LFPP.header.headerTotalActualHeight - distanceBelowVideoWrapper), _minPlayerSize);
			}
		}
	};
	
	var lastPageYOffset = 0;
	player.onScroll = function(e){
		var pinned = LFPP.header.isNavPinned;
		var navBottom = LFPP.getNavBottom();
		//var scrollHeightOrig = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding_top.css('height') || 0);
		var scrollHeightOrig = lastPageYOffset;
		lastPageYOffset = window.pageYOffset;
		
		var scrollDiff = (window.pageYOffset - scrollHeightOrig);
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
		var headlineHeight = parseInt(LFPP.el.LFPP_StickyVideoWrapper_Headline_Content.outerHeight());
		
		if(LFPP.player.settings.enable_dynamic_width_video_animations){
			if(pinned){
				player.setPlayerHeight(newHeight, navBottom);
			} else {
				player.setPlayerHeight(newHeight, Math.max(navBottom - window.pageYOffset, 0));
			}
		} else {
			if(pinned){
				LFPP.el.LFPP_StickyVideoWrapper_Outer.css({'height': newHeight, top: navBottom});
			} else {
				LFPP.el.LFPP_StickyVideoWrapper_Outer.css({'height': newHeight, top: Math.max(navBottom - window.pageYOffset, 0)});
			}
			LFPP.el.LFPP_StickyVideoWrapper_Padding_bottom.css('height', newHeight);
			
		}
		
		if(parseInt(LFPP.el.LFPP_StickyVideoWrapper_Padding_headline.css('height') || 0) !== headlineHeight) LFPP.el.LFPP_StickyVideoWrapper_Padding_headline.css('height', headlineHeight);
		
		LFPP.el.LFPP_StickyVideoWrapper_Padding_header.css('height', (pinned ? navBottom : 0));
		
		var playerTargetRelativeBottomOffset = (newHeight + window.pageYOffset + (pinned ? navBottom : Math.max(navBottom - window.pageYOffset, 0)));// (pinned ? navBottom : 0));
		var playerMinRelativeBottomOffset = (_minPlayerSize + window.pageYOffset + (pinned ? navBottom : Math.max(navBottom - window.pageYOffset, 0)));
		var offsetDiff = Math.abs(playerTargetRelativeBottomOffset - playerMinRelativeBottomOffset);
		
		var playerMaxOffset = Math.min((playerTargetRelativeBottomOffset > playerMinRelativeBottomOffset ? playerTargetRelativeBottomOffset : playerMinRelativeBottomOffset), _viewportHeight - _minPlayerSize - Math.min(headlineHeight, 110) - (pinned ? LFPP.header.topBannerActualHeight : LFPP.header.headerTotalActualHeight));//
		
		var maxScroll = parseInt(Math.min(playerMaxOffset, Math.max(playerTargetRelativeBottomOffset - newHeight - Math.min(headlineHeight, 110), 0)));
		if(
				playerTargetRelativeBottomOffset <= playerMinRelativeBottomOffset
				|| (newHeight - _minPlayerSize) < 10
				|| (scrollDiff > 0 && offsetDiff <= (headlineHeight - 20) && ((playerMinRelativeBottomOffset + headlineHeight) < ((LFPP.el.breadcrumbs.offset().top || 0) - scrollDiff)))
				//|| ((offsetDiff !== 0 && (offsetDiff / playerMinRelativeBottomOffset) < 0.20) && ((playerTargetRelativeBottomOffset + headlineHeight) < (LFPP.el.breadcrumbs.offset().top || 0)))
				//|| Math.abs(playerTargetRelativeBottomOffset - playerMinRelativeBottomOffset) < headlineHeight
			){
			
			if(!LFPP.el.LFPP_StickyVideoWrapper_Outer.hasClass('LFPP_Player_Min')) LFPP.el.LFPP_StickyVideoWrapper_Outer.addClass('LFPP_Player_Min');
			
		} else {
			if(LFPP.el.LFPP_StickyVideoWrapper_Outer.hasClass('LFPP_Player_Min')) LFPP.el.LFPP_StickyVideoWrapper_Outer.removeClass('LFPP_Player_Min');
		}
		/*
		console.log('Calc Maxscroll',
			'\r\n\t_viewportHeight: ', _viewportHeight,
			'\r\n\tpageYOffset: ', window.pageYOffset,
			'\r\n\tnavBottom: ', navBottom,
			'\r\n\tscrollDiff: ', scrollDiff,
			'\r\n\tnewHeight: ', newHeight,
			'\r\n\t_minPlayerSize: ', _minPlayerSize,
			'\r\n\theadlineHeight: ', headlineHeight,
			'\r\n\tnavActualHeight: ', LFPP.header.navActualHeight,
			'\r\n\tplayerTargetRelativeBottomOffset: ', playerTargetRelativeBottomOffset,
			'\r\n\tplayerMinRelativeBottomOffset: ', playerMinRelativeBottomOffset,
			'\r\n\tplayerMaxOffset: ', playerMaxOffset,
			'\r\n\tmaxScroll: ', maxScroll,
			'\r\n\tWrapper_Outer ClassName: ', LFPP.el.LFPP_StickyVideoWrapper_Outer[0].className,
			'\r\n\tbreadcrumbs offset top: ', LFPP.el.breadcrumbs.offset().top,
			'\r\n\tbreadcrumbs offset top - scrollDiff: ', LFPP.el.breadcrumbs.offset().top - scrollDiff,
			'\r\n'
		);
		*/
		
		player.setPlayerPaddingMaxHeight(Math.min(maxScroll, playerMaxOffset));
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
				+ '<div id="LFPP_StickyVideoWrapper_Padding_header" style=""></div>'
				+ '<div id="LFPP_StickyVideoWrapper_Padding_headline" style=""></div>'
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
		LFPP.header.onHeaderStateChange = function(data){
			LFPP.log('VideoPlayer::onHeaderStateChange fired', data);
			setAsap(player.onScroll);
		};
		
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
			
			var videoSizeSettings = getJModSetting('Video_Size', LFPP.getSettingDefault('Video_Size')).split(',');
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
			LFPP.log('Is Not Video Page');
		}
	};


})();
