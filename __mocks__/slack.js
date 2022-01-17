module.exports = {
	textPrompt: (text) => ({
		token: 'LPJlq7Mpxb1Uvb5jGtOcPnOo',
		team_id: 'T85170XAM',
		team_domain: 'halagramhalagram',
		channel_id: 'C86CNTH3Q',
		channel_name: 'general',
		user_id: 'U85LLCR6H',
		user_name: 'tonystack',
		command: '/bot',
		text,
		api_app_id: 'A02UAEKQ4N8',
		is_enterprise_install: 'false',
		response_url: 'https://hooks.slack.com/commands/T85170XAM/2984199516272/fY30kQW6sfBBrResQOl0hGRJ',
		trigger_id: '2960464250194.277041031361.0c3efa62695574856ff66cb59c8b3ea6'
	}),
	selectionPrompt: ({ selection, name = 'mood_list' }) => ({
		payload: JSON.stringify({
			type: 'interactive_message',
			actions: [{
				name,
				type: 'select',
				selected_options: [{
					value: selection
				}]
			}],
			callback_id: 'game_selection',
			team: {
				id: 'T85170XAM',
				domain: 'halagramhalagram'
			},
			channel: {
				id: 'C86CNTH3Q',
				name: 'general'
			},
			user: {
				id: 'U85LLCR6H',
				name: 'thor'
			},
			action_ts: '1642372392.952464',
			message_ts: '1642372389.002000',
			attachment_id: '1',
			token: 'LPJlq7Mpxb1Uvb5jGtOcPnOo',
			is_app_unfurl: false,
			enterprise: null,
			is_enterprise_install: false,
			original_message: {
				type: 'message',
				subtype: 'bot_message',
				text: 'Would you like to play a game?',
				ts: '1642372389.002000',
				bot_id: 'B02UXTC2E9E',
				attachments: [{
					id: 1,
					color: '3AA3E3',
					fallback: 'If you could read this message, you\'d be choosing something fun to do right now.',
					text: 'Choose a game to play',
					callback_id: 'game_selection',
					actions: [{
						id: '1',
						name: 'games_list',
						text: 'Pick a game...',
						type: 'select',
						data_source: 'static',
						options: [{
							text: 'Hearts',
							value: 'hearts'
						},
						{
							text: 'Bridge',
							value: 'bridge'
						},
						{
							text: 'Checkers',
							value: 'checkers'
						},
						{
							text: 'Chess',
							value: 'chess'
						},
						{
							text: 'Poker',
							value: 'poker'
						},
						{
							text: 'Falken\'s Maze',
							value: 'maze'
						},
						{
							text: 'Global Thermonuclear War',
							value: 'war'
						}
						]
					}]
				}]
			},
			response_url: 'https:\\/\\/hooks.slack.com\\/actions\\/T85170XAM\\/2960421462130\\/TdoREaJn3P9EexD86lSmJiWe',
			trigger_id: '2984156730560.277041031361.318e80ea1cac07dc74bbe877d261b15d'
		})
	})
};