// @ts-nocheck
window.addEventListener('load', function () {
	window.minecraftOpts = [
		'game_frame',
		'assets.epk'
	];

	const urlParams = new URLSearchParams(window.location.search);
	window.minecraftOpts.push(urlParams.get('server') ?? undefined);

	main();
});
