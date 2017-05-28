
(function(){
	/* Page state and events handler */
	
	var videoInfo = LFPP.videoInfo = {
		events: {}
	};
	
	var _vicache = videoInfo._cache = {};
	var videoInfoLog = LFPP.getLog('VideoInfo');
	
	
	var cache = videoInfo.cache = (function(){
	
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
		
		var videoInfoCache = {
			getVideoInfo: function(vid){
				if(vid) return getCachedValue('VideoInfo', vid);
			},
			setVideoInfo: function(vid, obj){
				if(vid && obj) return setCachedValue('VideoInfo', vid, obj);
			},
			
			
			getVideoDuration: function(vid){
				if(vid) return getCachedValue('VideoDuration', vid);
			},
			setVideoDuration: function(vid, val){
				if(vid && val) return setCachedValue('VideoDuration', vid, val);
			},
		};
		
		return videoInfoCache;
	
	})();
	
	
	var _requestCount = 0;
	//var _getVideoPageIFrameURL = {};
	//var __getVideoPageIFrameURL = {};
	_vicache._getVideoDuration = {};
	videoInfo.getVideoDuration = function(vid, skipCache){
		if(_vicache._getVideoDuration[vid]){
			return _vicache._getVideoDuration[vid];
		}
		
		
		_vicache._getVideoDuration[vid] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_vicache._getVideoDuration[vid] = null;
						if(b === false){
							return reject(a);
						}
						return resolve(a);
					}
				};
			
			setAsap(function(){
				
				var cVideoDuration = skipCache ? null : cache.getVideoDuration(vid);
				
				if(cVideoDuration) {
					//console.log('Use getVideoDuration cache: "' + vid + '" -> ', cVideoDuration);
					return respond(cVideoDuration);
				} else {
					_requestCount++;
					
					function _doRequest3(url){
						$.get({url: url, dataType: 'text'})
							.done(function(data, textStatus, jqXHR) {
								_requestCount--;
								//console.log('_doRequest3: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								
								if(data){
									var patt = /\#EXTINF\:(\d+\.\d+)\,/gmi;
									var match,
										totalTime = 0.0,
										tmp = 0.0;
									while(match = patt.exec(data)){
										if(match && match.length > 1){
											try {
												tmp = parseFloat(match[1]);
												totalTime += tmp;
											} catch(e) {
												console.log(e);
											}
											tmp = 0.0;
										} else {
											break;
										}
									}
									
									if(totalTime){
										cache.setVideoDuration(vid, totalTime);
										return respond(totalTime);
									}
									
									return respond(totalTime, false);
								}
								
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					function _doRequest2(url){
						$.get({url: url, dataType: 'text'})
							.done(function(data, textStatus, jqXHR) {
								
								//console.log('_doRequest2: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								
								if(data){
									var match = /(chunk\.m3u8\?nimblesessionid=\d+\&wmsAuthSign=[^\r\n\s]+)/im.exec(data);
									if(match && match.length > 1){
										var newURL = url.replace(/playlist.m3u8.+$/i, match[1]);
										
										return _doRequest3(newURL);
									}
								}
								_requestCount--;
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					function _doRequest(){
						var url = 'https://linustechtips.com/main/applications/floatplane/interface/video_url.php?video_guid=' + vid + '&video_quality=1080';
						$.get({url: url, dataType: 'text'})
							.done(function(data, textStatus, jqXHR) {
								//console.log('_doRequest: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								if(data && /Edge\d+\-\w+\.floatplaneclub\.com/i.test(data)){
									return _doRequest2(data);
								}
								_requestCount--;
								return respond(data, false);
							})
							.fail(function(e, textStatus) {
								_requestCount--;
								//console.log('Error getting page: ', url, e, textStatus);
								return respond(e, false);
							});
					}
					
					if(_requestCount > 1){
						setTimeout(_doRequest, 150 * _requestCount); // Prevents LTT "Too Many Requests" Error
					} else {
						_doRequest();
					}
					
				}
			});
			
		});
		
		return _vicache._getVideoDuration[vid];
	};
	
	
	
	_vicache._getVideoInfo = {};
	videoInfo.getVideoInfo = function(vid, skipCache){
		if(_vicache._getVideoInfo[vid]){
			return _vicache._getVideoInfo[vid];
		}
		
		
		_vicache._getVideoInfo[vid] = new Promise(function(resolve, reject){
			var responded = false,
				respond = function(a, b){
					if(!responded){
						_vicache._getVideoInfo[vid] = null;
						if(b === false){
							return reject(a);
						}
						return resolve(a);
					}
				};
			
			setAsap(function(){
				
				var cVideoInfo = skipCache ? null : cache.getVideoInfo(vid);
				
				if(cVideoInfo) {
					//console.log('Use getVideoInfo cache: "' + vid + '" -> ', cVideoInfo);
					return respond(cVideoInfo);
				} else {
					_requestCount++;
					
					
					function _doRequest(){
						var url = 'https://cms.linustechtips.com/get/videos/by_guid/' + vid;
						$.get({url: url, dataType: 'json'})
							.done(function(data, textStatus, jqXHR) {
								_requestCount--;
								console.log('_doRequest: ', url, ' -- textStatus: ', textStatus, ' -- data: ', data);
								//https://Edge02-na.floatplaneclub.com:443/Videos/vidId/1080.mp4?wmsAuthSign=c2VydmVyX3RpbWU9NS8yOC8yMDE3IDEyOjMxOjMzIFBNJmhhc2hfdmFsdWU9NEIxUGQ1Smk5TG9HQVJxRzZHT01GUT09JnZhbGlkbWludXRlcz0yNDAmaWQ9NDg5MTU5&attachment=true
								if(data && data.description){
									cache.setVideoInfo(vid, data);
									return respond(data);
									//return respond('');
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
						setTimeout(_doRequest, 150 * _requestCount); // Prevents LTT "Too Many Requests" Error
					} else {
						_doRequest();
					}
				}
				
				
			});
					
		});
		
		return _vicache._getVideoInfo[vid];
	};
	

	LFPP.page.onFooterReady = function(){
		videoInfoLog('pageHandler::onFooterReady');
		
		
		if(LFPP.page.isFPClubVideoPage){
			if(LFPP.el.videoContainerIframe && LFPP.el.videoContainerIframe.length){
				var iframeSrc = LFPP.el.videoContainerIframe.attr('src');
				var match = /get\/player\/(.+)$/i.exec(iframeSrc || '');
				if(match && match.length > 1){
					var vid = match[1];
					
					//console.log('start getVideoInfo ', vid);
					videoInfo.getVideoInfo(vid).then(function(info){
						console.log('getVideoInfo success: ', info);
					}, function(e){
						console.log('getVideoInfo fail: ', e);
					});
					
					//console.log('start getVideoDuration ', vid);
					videoInfo.getVideoDuration(vid).then(function(duration){
						console.log('getVideoDuration success: ', duration);
					}, function(e){
						console.log('getVideoDuration fail: ', e);
					});
					
					
				}
			} else {
				console.log('no iframe');
			}
		}
		
	};
	
})();