

module.exports = class {
	// eslint-disable-next-line no-unused-vars
	static async bot(req, res, next) {
		// eslint-disable-next-line no-console
		console.log(req.body);
		// const command = req.body.text || '';
		res.json({
			text: 'Would you like to play a game?',
			response_type: 'in_channel',
			attachments: [{
				text: 'Choose a game to play',
				fallback: 'If you could read this message, you\'d be choosing something fun to do right now.',
				color: '#3AA3E3',
				attachment_type: 'default',
				callback_id: 'game_selection',
				actions: [{
					name: 'games_list',
					text: 'Pick a game...',
					type: 'select',
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
		});
	}
};
