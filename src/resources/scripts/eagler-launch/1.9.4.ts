// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
window.addEventListener('load', () => {
	const relayId = Math.floor(Math.random() * 3);
	window.eaglercraftXOpts = {
		container: 'game_frame',
		assetsURI: 'assets.epk',
		servers: [
			{ addr: 'wss://eagler.xyz', name: 'TemuzX' },
		],
		relays: [
			{ addr: 'wss://relay.deev.is/', comment: 'lax1dude relay #1', primary: relayId == 0 },
			{ addr: 'wss://relay.lax1dude.net/', comment: 'lax1dude relay #2', primary: relayId == 1 },
			{ addr: 'wss://relay.shhnowisnottheti.me/', comment: 'ayunami relay #1', primary: relayId == 2 },
		],
	};

	const urlParams = new URLSearchParams(window.location.search);
	const server = urlParams.get('server');
	if (server) {
		window.eaglercraftXOpts.joinServer = server;
	}
	const mobile = urlParams.get('mobile');
	if (mobile === 'true') {
		const script = document.createElement('script');
		script.src = '/game/web/mobile/eaglerpocketmobile.user.js';
		document.head.appendChild(script);
	}

	main();
});
