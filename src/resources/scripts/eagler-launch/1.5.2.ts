// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
window.addEventListener('load', function () {
	const relayId = Math.floor(Math.random() * 3);
	window.eaglercraftOpts = {
		container: 'game_frame',
		assetsURI: 'assets.epk',
		serverWorkerURI: 'worker_bootstrap.js',
		worldsFolder: 'MAIN',
		servers: [
			/* { serverName: 'put partnered 1.5 servers here', serverAddress: 'wss://example.com', hideAddress: false }, */
		],
		relays: [
			{ addr: 'wss://relay.deev.is/', name: 'lax1dude relay #1', primary: relayId == 0 },
			{ addr: 'wss://relay.lax1dude.net/', name: 'lax1dude relay #2', primary: relayId == 1 },
			{ addr: 'wss://relay.shhnowisnottheti.me/', name: 'ayunami relay #1', primary: relayId == 2 },
		],
		mainMenu: { splashes: ['Darviglet!', 'eaglerenophile!', 'You Eagler!', 'Yeeeeeee!', 'yeee', 'EEEEEEEEE!', 'You Darvig!', 'You Vigg!', ':>', '|>', 'You Yumpster!'], eaglerLogo: false },
	};

	const urlParams = new URLSearchParams(window.location.search);
	const server = urlParams.get('server');
	if (server) {
		window.eaglercraftOpts.joinServer = server;
	}

	main();
});
