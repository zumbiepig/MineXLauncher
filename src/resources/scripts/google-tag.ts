// @ts-nocheck
const script = document.createElement('script');
script.async = true;
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-972V2NZ2ZK';
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag(...args: unknown[]) {
	dataLayer.push(...args);
}
gtag('js', new Date());
gtag('config', 'G-972V2NZ2ZK');
