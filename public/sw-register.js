if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('Service worker registered with scope:', registration.scope);

				navigator.serviceWorker.addEventListener('message', (event) => {
					if (event.data && event.data.type === 'install-progress') {
						console.log(`Service worker installation progress: ${event.data.msg} assets`);
						// Update your UI with the progress
					} else if (event.data && event.data.type === 'activation-complete') {
						console.log('Service worker installation is complete!');
						alert('Service worker installation is complete!');
					}
				});
			})
			.catch((error) => {
				console.error('Service worker registration failed:', error);
			});
	});
}
