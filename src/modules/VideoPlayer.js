
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
