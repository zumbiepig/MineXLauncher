// @ts-nocheck
window.addEventListener('load', () => {
	const relayId = Math.floor(Math.random() * 3);
	window.eaglercraftXOpts = {
		container: 'game_frame',
		assetsURI: 'assets.epk',
		servers: [
			{ addr: 'wss://electronmc.club', name: 'Electron Network' },
			{ addr: 'wss://play.brickmc.net', name: 'BrickMC' },
			{ addr: 'wss://mc.lamplifesteal.xyz', name: 'LampLifesteal' },
		],
		relays: [
			{ addr: 'wss://relay.deev.is/', comment: 'lax1dude relay #1', primary: relayId === 0 },
			{ addr: 'wss://relay.lax1dude.net/', comment: 'lax1dude relay #2', primary: relayId === 1 },
			{ addr: 'wss://relay.shhnowisnottheti.me/', comment: 'ayunami relay #1', primary: relayId === 2 },
		],
	};

	const urlParams = new URLSearchParams(window.location.search);
	window.eaglercraftXOpts.joinServer = urlParams.get('server') ?? undefined;
	window.eaglercraftXOpts.Mods = storage.local.get('mods') || [];

	main();
});
