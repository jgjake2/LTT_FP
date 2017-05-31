(function(){
	/* Page state and events handler */
	
	// https://cms.linustechtips.com/get/videos/by_guid/awVfKxpdBS
	
	// window.ipsSettings.csrfKey
	
	var videos = LFPP.videos = {
		events: {},
		settings: {}
	};
	
	var videoListLog = LFPP.getLog('VideoList');
	
	function getJModSetting(name, def){var tmp = jMod.Settings.get(name);return (typeof tmp === "undefined" ? def : tmp);}
	   
	Object.defineProperties(LFPP.videos.settings, {
		'add_thumbs_to_video_list': {get: function() {return (getJModSetting('Thumbs_General', LFPP.getSettingDefault('Thumbs_General')).indexOf('add_thumbs_to_video_list') > -1);},enumerable: true, configurable: false},
		'show_preview_on_hover': {get: function() {return (getJModSetting('Thumbs_General', LFPP.getSettingDefault('Thumbs_General')).indexOf('show_preview_on_hover') > -1);},enumerable: true, configurable: false},
		'keep_preview_after_hover': {get: function() {return (getJModSetting('Thumbs_General', LFPP.getSettingDefault('Thumbs_General')).indexOf('keep_preview_after_hover') > -1);},enumerable: true, configurable: false},
		'thumb_animation_speed': {get: function() {
			var tmp = getJModSetting('thumb_animation_speed', LFPP.getSettingDefault('thumb_animation_speed')).trim();
			try{return parseInt(tmp);} catch(e) {}
			return LFPP.getSettingDefault('thumb_animation_speed');
		}, enumerable: true, configurable: false}
	});
	
	
	//LFPP.videos.settings.thumb_animation_speed
	//LFPP.videos.settings.add_thumbs_to_video_list
	//LFPP.videos.settings.show_preview_on_hover
	//LFPP.videos.settings.keep_preview_after_hover
/*
jMod.CSS = `
.LFPP_Video_ThumbPreview {
	opacity:0;
}
.LFPP_Video_Thumb_Wrapper:hover .LFPP_Video_ThumbPreview {
	opacity: 1 !important;
}
`.toString();
*/
jMod.CSS = `
/*
.ipsDataItem_icon {
	padding-top: 0;
	padding-bottom: 0;
}
*/


.LFPP_Video_Thumb_Wrapper {
	display:inline-block;
	width:200px;
	height:112.5px;
	vertical-align:middle;
}

.LFPP_Video_Thumb_Wrapper a {
	display: inline-block;
	vertical-align: middle;
}

.LFPP_Video_Thumb_Container {
	position: absolute;
	width: 200px;
	height: 112.5px;
	top: 0;
	bottom: 0;
	margin: auto 0;
}

.LFPP_Video_Time {
	min-width: 20px;
	height: 14px;
	background-color: black;
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	position: absolute;
	bottom: 2px;
	right: 2px;
	opacity: 0.75;
	color: white;
	font-family: arial,sans-serif;
	font-size: 11px;
	padding: 0 4px;
	line-height: 14px;
}

.LFPP_Video_Thumb_Wrapper:hover .LFPP_Video_Time {
	opacity: 1;
}

.LFPP_Video_Thumb {
	width: 200px;
	height: 112.5px;
	overflow: hidden;
	position: absolute;
}

.LFPP_Video_Thumb img {
	max-width: 200px;
    height: auto;
    width: 200px;
    margin: auto 0;
    top: 0;
    position: absolute;
    bottom: 0;
}

.LFPP_Video_ThumbPreview {
	position:absolute;
	top:0;
	left:0;
	width:200px;
	height:112.5px;
	overflow:hidden;
}

.LFPP_Video_ThumbPreview img {
	height:112.5px;
	width:auto;
	margin-left:0px;
}

.LFPP_Video_Timeline {
	width:100%;
	position:absolute;
	bottom:-10px;
	height:20px;
}

.LFPP_Video_Timeline_Bar {
	width:100%;
	background-color:rgba(128,128,128,0.8);
	height:3px;
	position:absolute;
	bottom:10px;
}

.LFPP_Video_Timeline_Progress {
	width:0px;
	height:3px;
	background-color:red;
	position:absolute;
	left:0;
	bottom:10px;
}


.LFPP_Video_Timeline_Progress::after{
	content: " ";
	height:8px;
	width:8px;
	background-color:red;
	position:absolute;
	right:-2px;
	top:-3px;
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;
	border-bottom-right-radius: 4px;
	border-bottom-left-radius: 4px;
}

.LFPP_Video_Timeline:not(:hover) .LFPP_Video_Timeline_Progress::after {
	display:none;
}

.LFPP_Video_Timeline:hover .LFPP_Video_Timeline_Progress::after {
	display:block !important;
}

`.toString();
	//var _vcache = videos._cache = {};
	
	videos.cache = (function(){
		
		function getCachedJSON(name){
			var tmp = GM_getValue(name, '{}');
			var _json;
			try {
				_json = JSON.parse(tmp);
			} catch(e) {
				_json = {};
			}
			return _json;
		}
		
		function setCache(name, obj){
			var str = JSON.stringify(obj || {});
			GM_setValue(name, str);
			return obj;
		}
		
		function getCachedValue(objName, valName, def){
			var obj = getCachedJSON(objName);
			return (obj[valName] || def);
		}
		
		function setCachedValue(objName, valName, val){
			var obj = getCachedJSON(objName) || {};
			obj[valName] = val;
			setCache(objName, obj);
			return val;
		}
		
		var VideoCache = {
			getPageVideoId: function(url){
				if(url) return getCachedValue('PageVideoId', url);
			},
			setPageVideoId: function(url, id){
				if(url && id) return setCachedValue('PageVideoId', url, id);
			},
			
			getPageIFrameSrc: function(url){
				if(url) return getCachedValue('PageIFrameSrc', url);
			},
			setPageIFrameSrc: function(url, src){
				if(url && src) return setCachedValue('PageIFrameSrc', url, src);
			},
			
			getPageVideoThumbURL: function(url){
				var id = this.getPageVideoId(url);
				if(id){
					return ('https://cms.linustechtips.com/get/thumbnails/by_guid/' + id);
				}
			},
		};
		
		return VideoCache;
	
	})();
	
	Object.defineProperties(LFPP.videos, {
		/*
		'foo': {
			get: function() {},
			set: function(val) {},
			enumerable: true,
			configurable: false
		},
		*/
		'isVideoListPage': {
			get: function() {
				return (/\/forum\/\d+\-the\-floatplane\-club\/?/i.test(window.location.toString()));
			},
			set: function(val) {},
			enumerable: true,
			configurable: false
		},
		
	});
	
	
	var _requestCount = 0;
	var _getVideoPageIFrameURL = {};
	var __getVideoPageIFrameURL = {};
	function getVideoPageIFrameURL(url){
		if(_getVideoPageIFrameURL[url]){
			return _getVideoPageIFrameURL[url];
		}
		
		if(__getVideoPageIFrameURL[url]){
			return Promise.resolve(__getVideoPageIFrameURL[url]);
		}
		
		_getVideoPageIFrameURL[url] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_getVideoPageIFrameURL[url] = null;
						if(b === false){
							return reject(a);
						}
						__getVideoPageIFrameURL[url] = a;
						return resolve(a);
					}
				};
			
			setAsap(function(){
				var cIFrameSrc = videos.cache.getPageIFrameSrc(url);
				
				if(cIFrameSrc) {
					//console.log('Use iFrame cache: "' + url + '" -> "' + cIFrameSrc + '"');
					return respond(cIFrameSrc);
				} else {
					_requestCount++;
					
					function _doRequest(){
						
						$.get({url: url, dataType: 'html'})
							.done(function(data, textStatus, jqXHR) {
								_requestCount--;
								//console.log('url: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								if(data){
									var $iframe = $('.video-container > iframe', data);
									if($iframe && $iframe.length){// && $iframe.attr('src')){
										var _src = $iframe.attr('src');
										if(_src){
											videos.cache.setPageIFrameSrc(url, _src);
											return respond(_src);
										}
									}
									//console.log('error getting iframe: ', url);
									return respond('');
								}
								
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					if(_requestCount > 1){
						setTimeout(_doRequest, 250 * _requestCount); // Prevents LTT "Too Many Requests" Error
					} else {
						_doRequest();
					}
					
				}
			});
			
		});
		
		return _getVideoPageIFrameURL[url];
	}
	
	var _getVideoThumb = {};
	var __getVideoThumb = {};
	function getVideoThumb(url){
		if(_getVideoThumb[url]){
			return _getVideoThumb[url];
		}
		
		if(__getVideoThumb[url]){
			return Promise.resolve(__getVideoThumb[url]);
		}
		
		_getVideoThumb[url] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_getVideoThumb[url] = null;
						if(b === false){
							return reject(a);
						}
						__getVideoThumb[url] = a;
						return resolve(a);
					}
				};
			
			setAsap(function(){
				var cThumbURL = videos.cache.getPageVideoThumbURL(url);
				
				if(cThumbURL) {
					//console.log('Use Thumb cache: "' + url + '" -> "' + cThumbURL + '"');
					return respond(cThumbURL);
				} else {
					getVideoPageIFrameURL(url).then(function(src){
						if(src){
							var match = /\/([^\/\\\?#&]{5,})(?:[\?#]|\/[\?#]|\/?$)/i.exec(src);
							if(match && match.length > 1 && match[1]){
								var videoID = match[1];
								videos.cache.setPageVideoId(url, videoID);
								return respond('https://cms.linustechtips.com/get/thumbnails/by_guid/' + videoID);
							}
						} else if(src === ''){
							respond('');
						}
						respond(src, false);
						
					}, function(e){
						respond(e, false);
					});
				}
				
			});
			
		});
		
		return _getVideoThumb[url];
	}
	
	function processPageVideoThumb($thumb){
		$thumb.addClass('thumb_processed');
		
		var $topicTitleLink = $('.cTopicTitle > a', $thumb);
		if($topicTitleLink && $topicTitleLink.length){
			var topicURL = $topicTitleLink.attr('href') || $topicTitleLink[0].href;
			if(topicURL){
				getVideoThumb(topicURL).then(function(posterURL){
					posterURL = posterURL || '';
					
					var spriteURL = posterURL.replace('/thumbnails/', '/sprite/');
					var vid = /\/by_guid\/(.+)$/i.exec(posterURL);
					if(vid && vid.length > 1 && vid[1]){
						vid = vid[1];
					} else {
						vid = null;
					}
					var $divIcon = $('.ipsDataItem_icon', $thumb);
					var $divIconLink = $('.ipsDataItem_icon > a', $thumb);
					var $thumbfaIcon = $('i.fa-circle', $thumb);
					
					
					if(posterURL && $thumbfaIcon && $thumbfaIcon.length){
						$thumbfaIcon.removeClass('fa-circle').addClass('fa-youtube-play');
					}
					
					$divIcon.css({width: '230px', 'max-width': '230px', 'min-width': '230px'});
					$divIconLink.css({'display': 'inline-block', 'vertical-align': 'middle'});

					$divIcon.append(''
						+ '<div class="LFPP_Video_Thumb_Wrapper">'
							+ '<a class="" href="' + topicURL + '">'
								+ '<div class="LFPP_Video_Thumb_Container">'
									+ '<div class="LFPP_Video_Thumb">'
										+ '<img src="' + posterURL + '">'
									+ '</div>'
									+ '<div class="LFPP_Video_ThumbPreview">'
										+ '<img src="" data-frame="0" style="display:none;">'
									+ '</div>'
									+ '<div class="LFPP_Video_Time" style="display:none;"></div>'
									+ '<div class="LFPP_Video_Timeline" style="display:none;">'
										+ '<div class="LFPP_Video_Timeline_Bar" style=""></div>'
										+ '<div class="LFPP_Video_Timeline_Progress" style=""></div>'
									+ '</div>'
								+ '</div>'
							+ '</a>'
						+ '</div>'
					);
					
					var $LFPP_Video_Time = $('.LFPP_Video_Time', $divIcon);
					
					if(vid){
						LFPP.videoInfo.getVideoDuration(vid).then(function(duration){
							$LFPP_Video_Time.html(duration.minutes + ':' + (duration.seconds < 10 ? '0' : '') + duration.seconds).css('display', 'block');
						}, function(e) {
							console.log(e);
						});
					}
					
					if(LFPP.videos.settings.show_preview_on_hover){
						var $LFPP_Video_Thumb_Wrapper = $('.LFPP_Video_Thumb_Wrapper', $divIcon);
						//var $LFPP_Video_Thumb = $('.LFPP_Video_Thumb', $divIcon);
						//var $LFPP_Video_ThumbPreview = $('.LFPP_Video_ThumbPreview', $divIcon);
						var $LFPP_Video_ThumbPreview_Image = $('.LFPP_Video_ThumbPreview img', $divIcon);
						
						var $LFPP_Video_Timeline = $('.LFPP_Video_Timeline', $divIcon);
						var $LFPP_Video_Timeline_Progress = $('.LFPP_Video_Timeline_Progress', $divIcon);
						
						var thumbPreviewImg = $LFPP_Video_ThumbPreview_Image[0];
						var thumbPreviewWidth, maxThumbFrames;
						
						
						var delayBetweenFrames = parseInt(LFPP.videos.settings.thumb_animation_speed || 300);
						var _stopped = true;
						var _animationTimer = null;
						
						function updateProgress(currentFrame, _maxThumbFrames){
							var pct = Math.min((parseFloat(currentFrame) / parseFloat(_maxThumbFrames || maxThumbFrames || currentFrame)) * 100, 100);
							$LFPP_Video_Timeline_Progress.css('width', pct + '%');
						}
						function animateThumb(){
							_animationTimer = null;
							
							
							var currentFrame = parseInt(thumbPreviewImg.dataset.frame || 0) + 1;
							if(currentFrame > maxThumbFrames){
								currentFrame = 0;
							}
							
							thumbPreviewImg.dataset.frame = currentFrame;
							$LFPP_Video_ThumbPreview_Image.css('margin-left', (currentFrame * -200) + 'px');
							updateProgress(currentFrame, maxThumbFrames);
							if(_stopped) return;
							_animationTimer = setTimeout(animateThumb, delayBetweenFrames);
						}
						function stopAnimateThumb(){
							_stopped = true;
							if(_animationTimer){
								try {
									clearTimeout(_animationTimer);
								} catch(e) {}
								_animationTimer = null;
							}
							if(!LFPP.videos.settings.keep_preview_after_hover){
								$LFPP_Video_ThumbPreview_Image.css('display', 'none');
								$LFPP_Video_Timeline.css('display', 'none');
							}
						}
						function pauseAnimateThumb(){
							_stopped = true;
							if(_animationTimer){
								try {
									clearTimeout(_animationTimer);
								} catch(e) {}
								_animationTimer = null;
							}
						}
						function startAnimateThumb(){
							_animationTimer = null;
							if(!_stopped) return;
							_stopped = false;
							
							if(!thumbPreviewWidth || !maxThumbFrames){
								thumbPreviewWidth = parseInt($LFPP_Video_ThumbPreview_Image.width());
								maxThumbFrames = Math.round(thumbPreviewWidth / 200);
							}
							
							if(thumbPreviewWidth){
								_animationTimer = setTimeout(animateThumb, delayBetweenFrames);
							} else {
								_animationTimer = setTimeout(startAnimateThumb, delayBetweenFrames);
							}
						}
						
						var errored = false;
						$LFPP_Video_Thumb_Wrapper.hover(function(){
							if(errored) return;
							if(!$LFPP_Video_ThumbPreview_Image.attr('src')){
								thumbPreviewImg.addEventListener('load', function(e) {
									//console.log('img load', e);
									if(errored) return;
									$LFPP_Video_ThumbPreview_Image.css('display', 'block');
									$LFPP_Video_Timeline.css('display', 'block');
									thumbPreviewWidth = parseInt($LFPP_Video_ThumbPreview_Image.width());
									maxThumbFrames = Math.round(thumbPreviewWidth / 200);
								});
								thumbPreviewImg.addEventListener('error', function(e) {
									//console.log('img error', e);
									errored = true;
								});
								thumbPreviewImg.setAttribute('src', spriteURL);
								_animationTimer = setTimeout(startAnimateThumb, delayBetweenFrames);
							} else {
								$LFPP_Video_ThumbPreview_Image.css('display', 'block');
								$LFPP_Video_Timeline.css('display', 'block');
								startAnimateThumb();
							}
						}, function(){
							stopAnimateThumb();
						});
						
						$LFPP_Video_Timeline.mousemove(function(e){
							pauseAnimateThumb();
							var x = e.offsetX;
							var width = $LFPP_Video_Timeline.width();
							var frameNum = Math.max(parseInt((x / width) * (maxThumbFrames || 0)), 0);
							thumbPreviewImg.dataset.frame = frameNum;
							animateThumb();
						});
						
						$LFPP_Video_Timeline.hover(function(e){
							pauseAnimateThumb();
							var x = e.offsetX;
							var width = $LFPP_Video_Timeline.width();
							var frameNum = Math.max(parseInt((x / width) * (maxThumbFrames || 0)), 0);
							thumbPreviewImg.dataset.frame = frameNum;
							animateThumb();
						}, function(e){
							if(e.relatedTarget.tagName === 'IMG'){
								startAnimateThumb();
							} else {
								stopAnimateThumb();
							}
						});
					
					}

					
				}, function(e){
					videoListLog('processPageVideoThumb', 'Error: ', topicURL, e);
				});
			}
		}
	}
	
	function processPageVideoThumbs(){
		var $thumbs = $('.ipsBox ol.cTopicList > li.ipsDataItem:not(.thumb_processed)');
		$thumbs.each(function(){
			var $this = $(this);
			setAsap(function(){
				processPageVideoThumb($this);
			});
		});
	}
	
	LFPP.page.onBodyReady = function(){
		//videoListLog('onBodyReady', 'onBodyReady');
		
		if(LFPP.videos.settings.add_thumbs_to_video_list && videos.isVideoListPage){
			videoListLog('onBodyReady', 'is video list page');
			setAsap(processPageVideoThumbs);
			
			LFPP.page.onHistoryEdit = function(e, urlChanged, hashChanged){
				videoListLog('onBodyReady', 'onHistoryEdit fired: ', e, urlChanged, hashChanged);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
			
			//LFPP.page.onHashChange = function(e, urlChanged, hashChanged){
				//console.log('LFPP.page.onHashChange fired: ', e, urlChanged, hashChanged);
			//};
			
			LFPP.page.onPageIndexChange = function(e){
				videoListLog('onBodyReady', 'onPageIndexChange fired: ', e);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
		}
	};


})();