(function(){
	/* Page state and events handler */
	
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
					var $divIcon = $('.ipsDataItem_icon', $thumb);
					var $divIconLink = $('.ipsDataItem_icon > a', $thumb);
					
					$divIcon.css({width: '230px', 'max-width': '230px', 'min-width': '230px'});
					$divIconLink.css({'display': 'inline-block', 'vertical-align': 'middle'});

					$divIcon.append(''
						+ '<div class="LFPP_Video_Thumb_Wrapper" style="display:inline-block;width:200px;height:112.5px;vertical-align:middle;">'
							+ '<a class="" href="' + topicURL + '" style="display: inline-block;vertical-align: middle;">'
								+ '<div style="position:absolute;width:200px;height:112.5px;">'
									+ '<div class="LFPP_Video_Thumb" style="width:200px;height:112.5px;overflow:hidden;">'
										+ '<img src="' + posterURL + '" style="max-width:200px;height:auto;width:200px;">'
									+ '</div>'
									+ '<div class="LFPP_Video_ThumbPreview" style="position:absolute;top:0;left:0;width:200px;height:112.5px;overflow:hidden;">'
										+ '<img src="" style="height:112.5px;width:auto;margin-left:0px;display:none;" data-frame="0" >'
									+ '</div>'
								+ '</div>'
							+ '</a>'
						+ '</div>'
					);
					
					
					if(LFPP.videos.settings.show_preview_on_hover){
						var $LFPP_Video_Thumb_Wrapper = $('.LFPP_Video_Thumb_Wrapper', $divIcon);
						var $LFPP_Video_Thumb = $('.LFPP_Video_Thumb', $divIcon);
						var $LFPP_Video_ThumbPreview = $('.LFPP_Video_ThumbPreview', $divIcon);
						var $LFPP_Video_ThumbPreview_Image = $('.LFPP_Video_ThumbPreview img', $divIcon);
						var thumbPreviewImg = $LFPP_Video_ThumbPreview_Image[0];
						var thumbPreviewWidth, maxThumbFrames;
						
						
						var delayBetweenFrames = parseInt(LFPP.videos.settings.thumb_animation_speed || 300);
						var _stopped = true;
						var _animationTimer = null;
						function animateThumb(){
							_animationTimer = null;
							if(_stopped) return;
							
							var currentFrame = parseInt(thumbPreviewImg.dataset.frame || 0) + 1;
							if(currentFrame > maxThumbFrames){
								currentFrame = 0;
							}
							
							thumbPreviewImg.dataset.frame = currentFrame;
							$LFPP_Video_ThumbPreview_Image.css('margin-left', (currentFrame * -200) + 'px');
							
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
						
						$LFPP_Video_Thumb_Wrapper.hover(function(){
							if(!$LFPP_Video_ThumbPreview_Image.attr('src')){
								thumbPreviewImg.addEventListener('load', function() {
									$LFPP_Video_ThumbPreview_Image.css('display', 'block');
									thumbPreviewWidth = parseInt($LFPP_Video_ThumbPreview_Image.width());
									maxThumbFrames = Math.round(thumbPreviewWidth / 200);
								});
								thumbPreviewImg.setAttribute('src', spriteURL);
								_animationTimer = setTimeout(startAnimateThumb, delayBetweenFrames);
							} else {
								$LFPP_Video_ThumbPreview_Image.css('display', 'block');
								startAnimateThumb();
							}
						}, function(){
							stopAnimateThumb();
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
	
	jMod.onDOMReady = function(){
		videoListLog('onDOMReady', 'onDOMReady');
		
		if(LFPP.videos.settings.add_thumbs_to_video_list && videos.isVideoListPage){
			videoListLog('onDOMReady', 'is video list page');
			setAsap(processPageVideoThumbs);
			
			LFPP.page.onHistoryEdit = function(e, urlChanged, hashChanged){
				videoListLog('onDOMReady', 'onHistoryEdit fired: ', e, urlChanged, hashChanged);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
			
			//LFPP.page.onHashChange = function(e, urlChanged, hashChanged){
				//console.log('LFPP.page.onHashChange fired: ', e, urlChanged, hashChanged);
			//};
			
			LFPP.page.onPageIndexChange = function(e){
				videoListLog('onDOMReady', 'onPageIndexChange fired: ', e);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
		}
	};


})();