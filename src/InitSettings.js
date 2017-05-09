
	function InitSettings(){
		console.log('jMod.Settings Example');
		var SettingOptions = {
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
					'default': 'enable_video_size_settings,enable_dynamic_width_video,enable_dynamic_width_video_animations,enable_video_headline'
				},
				{
					name: 'Min_Video_Player_Height',
					description: 'Minimum video player height when scrolling down',
					tooltip: {
						innerHTML: 'Valid examples: default, 300px, 1/3',
						placement: 'top-right'
					},
					tab: 'Tab_Videos',
					section: 'Player',
					type: 'input',
					'default': 'default'
				}
			],
			tabs: [
				// (optional) Additional Custom tab
				{
					name: 'About',
					innerHTML: [
						{
							type: 'h1',
							innerHTML: 'About'
						},
						{
							type: 'p',
							innerHTML: 'foo bar'
						}
					]
				},
				// (optional) Adding information about a tab referenced by a setting
				{
					name: 'Tab_Videos',
					displayName: 'Floatplane Videos',
					content: {
						footer: {
							type: 'div',
							innerHTML: ''
						}
					}
				}
			],
			// (optional) Change the order of the tabs. Tabs left out will be added after in the order they are referenced by your settings
			tabOrder: ['About', 'Tab_Videos'],
			// (optional) Set the active tab
			activeTab: 'Tab_Videos',
			// (optional) callback that fires before the settings dialog closes
			onBeforeHide: function(e){
				console.log('Settings on before hide');
			}
		};
		
		jMod.Settings(SettingOptions);
	}
