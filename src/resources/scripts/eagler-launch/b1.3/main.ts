// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
window.addEventListener('load', function () {
	window.minecraftOpts = ['game_frame', 'assets.epk'];

	const urlParams = new URLSearchParams(window.location.search);
	const server = urlParams.get('server');
	if (server) {
		window.minecraftOpts.push(s);
	}

	main();
});
