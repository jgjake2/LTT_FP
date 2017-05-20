(function(){
	/* Page state and events handler */
	
	var videos = LFPP.videos = {
		events: {}
	};
	
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
	
	/*
	var _getVideoPageIFrame = {};
	function getVideoPageIFrame(url){
		if(_getVideoPageIFrame[url]){
			return _getVideoPageIFrame[url];
		}
		
		_getVideoPageIFrame[url] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						if(b === false){
							return reject(a);
						}
						return resolve(a);
					}
				};
			
			setAsap(function(){
				
				
			});
			
		});
		
		return _getVideoPageIFrame[url];
	}
	*/
	
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
					var $divIcon = $('.ipsDataItem_icon', $thumb);
					var $divIconLink = $('.ipsDataItem_icon > a', $thumb);
					
					$divIcon.css({width: '230px', 'max-width': '230px', 'min-width': '230px'});
					$divIconLink.css('display', 'inline-block');
					
					$divIcon.append('<div class="" style="display: inline-block;max-width:200px;height:auto;width:200px;min-height:100px;max-height:500px;">' + (posterURL === '' ? '&nbsp;' : ('<a href="' + topicURL + '"><img src="' + posterURL + '" style="max-width:200px;height:auto;width:200px;"></a>')) + '</div>');
					
				}, function(e){
					//console.log('processPageVideoThumb error: ', topicURL, e);
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
		LFPP.log('VideoList::onDOMReadyCB');
		
		if(videos.isVideoListPage){
			console.log('is video list page');
			setAsap(processPageVideoThumbs);
			
			LFPP.page.onHistoryEdit = function(e, urlChanged, hashChanged){
				console.log('onHistoryEdit fired: ', e, urlChanged, hashChanged);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
			
			//LFPP.page.onHashChange = function(e, urlChanged, hashChanged){
				//console.log('LFPP.page.onHashChange fired: ', e, urlChanged, hashChanged);
			//};
			
			LFPP.page.onPageIndexChange = function(e){
				console.log('onPageIndexChange fired: ', e);
				if(urlChanged && videos.isVideoListPage){
					setTimeout(processPageVideoThumbs, 100);
					setTimeout(processPageVideoThumbs, 1000);
				}
			};
		}
	};


})();