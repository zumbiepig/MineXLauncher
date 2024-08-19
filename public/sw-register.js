if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => {
				console.log('Service worker registered with scope:', registration.scope);

				navigator.serviceWorker.addEventListener('message', (event) => {
					if (event.data.title === 'sw-install-progress') {
						console.log(`Service worker installation progress: ${event.data.message} assets downloaded`);
						// Update your UI with the progress
					} else if (event.data.title === 'sw-install-complete') {
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
