// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const urlParams = new URLSearchParams(window.location.search);
const mobile = urlParams.get('mobile');
if (mobile === 'true') {
	const script = document.getElementById('mobile-script') as HTMLScriptElement;
	script.src = '/resources/scripts/eagler-launch/1.8.8/eaglerpocketmobile.js';
}
