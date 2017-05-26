
	
	LFPP.SettingOptions = {
		title: 'LTT FP++ Settings',
		settings: [
			{
				name: 'Video_Size',
				description: 'Video Size',
				options: {
					'enable_video_size_settings': {
						label: 'Enable/Disable All Video Size Settings',
						on: 'ON',
						off: 'OFF'
					},
					'enable_dynamic_width_video': {
						label: 'Dynamic Video Player Size',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Full width video that shrinks when you scroll down',
							placement: 'right'
						}
					},
					'enable_dynamic_width_video_animations': {
						label: 'Animate Dynamic Video Player',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Smooth out the height changes with CSS transitions',
							placement: 'right'
						}
					},
					'enable_video_headline': {
						label: 'Show the video headline and download link',
						on: 'ON',
						off: 'OFF'
					}
				},
				tab: 'Tab_Videos',
				section: 'Player',
				type: 'toggle',
				'default': 'enable_video_size_settings,enable_dynamic_width_video,enable_video_headline'
			},
			{
				name: 'Min_Video_Player_Height',
				description: 'Minimum video player height when scrolling down',
				tooltip: {
					innerHTML: 'Valid examples: default, 300px, 1/3',
					placement: 'top-left'
				},
				tab: 'Tab_Videos',
				section: 'Player',
				type: 'input',
				'default': 'default'
			},
			{
				name: 'Thumbs_General',
				description: 'General',
				options: {
					'add_thumbs_to_video_list': {
						label: 'Add thumbnails to FP Club video topics',
						on: 'ON',
						off: 'OFF'
					},
					'show_preview_on_hover': {
						label: 'Show an animated preview on hover',
						on: 'ON',
						off: 'OFF'
					},
					'keep_preview_after_hover': {
						label: 'Keep preview visible after mouse leaves',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Simply keeps the paused animation visible instead of hiding it',
							placement: 'right'
						}
					}
				},
				tab: 'Tab_VideoGallery',
				section: 'Thumbs',
				type: 'toggle',
				'default': 'add_thumbs_to_video_list,show_preview_on_hover'
			},
			{
				name: 'thumb_animation_speed',
				description: 'Thumbnail Animation Speed',
				min: 20,
				max: 1500,
				tooltip: {
					innerHTML: 'Number of milliseconds between frames',
					placement: 'top'
				},
				tab: 'Tab_VideoGallery',
				section: 'Thumbs',
				type: 'range',
				'default': '300'
			}
		],
		tabs: [
			{
				name: 'About',
				innerHTML: [
					{
						type: 'div',
						className: 'row section-title-row',
						innerHTML: {
							type: 'div',
							className: 'col-md-12',
							innerHTML:  {
								type: 'h3',
								innerHTML: '<span>About<span style="text-align:right;float:right;margin-right:5px;opacity: 0.3;letter-spacing:0.1px;"><a href="https://linustechtips.com/main/profile/489159-jgjake2/" style="text-decoration: none;"><span style="color:black !important;">By jgjake2</span></a></span></span>',
								className: 'section-title'
							}
						}
					},
					{
						type: 'div',
						className: 'row form-group section-row',
						innerHTML: [
							'<div class="col-md-7">'
								+ '<h3 style="margin-top: 0;">LinusTechTips Floatplane Club++</h3>'
								+ '<p>A greasemonkey script that make the Floatplane Club feel like a real media platform, rather than a janky add-on</p>'
								+ '<p>If you have any issues, make sure report them on GitHub or in the LTT post.</p>'
							+ '</div>',
							
							'<div class="col-md-5">'
								+ '<u>Script Links</u>'
								+ '<ul style="padding-left: 30px;margin-top: 5px;">'
									+ '<li><a href="https://github.com/jgjake2/LTT_FP">GitHub</a></li>'
									+ '<li><a href="https://linustechtips.com/main/topic/777390-linustechtips-floatplane-club-greasemonkey-script/">LTT Thread</a></li>'
								+ '</ul>'
								+ '<u>Author:</u>'
								+ '<ul style="padding-left: 30px;margin-top: 5px;">'
									+ '<li><a href="https://linustechtips.com/main/profile/489159-jgjake2/">LTT Forum</a></li>'
									+ '<li><a href="https://www.facebook.com/jgjake2">Facebook</a></li>'
									+ '<li><a href="https://github.com/jgjake2">GitHub Profile</a></li>'
								+ '</ul>'
							+ '</div>'
						]
					}
				]
			},
			{
				name: 'Tab_Videos',
				displayName: 'Floatplane Videos',
				content: {
					footer: {
						type: 'div',
						innerHTML: ''
					}
				}
			},
			{
				name: 'Tab_VideoGallery',
				displayName: 'Video Gallery',
				content: {
					footer: {
						type: 'div',
						innerHTML: ''
					}
				}
			}
		],
		// (optional) Change the order of the tabs. Tabs left out will be added after in the order they are referenced by your settings
		tabOrder: ['About', 'Tab_Videos', 'Tab_VideoGallery'],
		// (optional) Set the active tab
		activeTab: 'Tab_Videos',
		// (optional) callback that fires before the settings dialog closes
		onBeforeHide: function(e){
			console.log('Settings on before hide');
		}
	};
	
	LFPP.getSettingDefault = function(name){
		var _settings = LFPP.SettingOptions.settings;
		for(var i = 0; i < _settings.length; i++){
			if(_settings[i].name === name){
				return _settings[i]['default'];
			}
		}
	}
	

	function InitSettings(){
		console.log('jMod.Settings Init');
		
		jMod.Settings(LFPP.SettingOptions);
	}
