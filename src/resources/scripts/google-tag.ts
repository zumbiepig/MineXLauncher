// @ts-nocheck
const script = document.createElement('script');
script.async = true;
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-GD4SJRCR7Z';
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag(...args: unknown[]) {
	dataLayer.push(...args);
}
gtag('js', new Date());
gtag('config', 'G-GD4SJRCR7Z');
