// Theme management
const theme = {
	load() {
		if (window.location.pathname === '/mobile/') {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = '/resources/styles/mobile.css';
			document.head.appendChild(link);
		}
		const setTheme = cookie.get('minexlauncher.theme');
		if (setTheme === null) {
			this.set('default');
		} else if (setTheme !== 'default') {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = `/resources/styles/${setTheme}.css`;
			document.head.appendChild(link);
		}
	},
	set(setTheme: string) {
		cookie.set('minexlauncher.theme', setTheme, 30);
		window.location.reload();
	},
};

// Version Selector Logic
const versionSelector = {
	open() {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.add('open');
			customSelect.classList.add('open');
		}
	},
	close() {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.remove('open');
			customSelect.classList.remove('open');
		}
	},
	toggle() {
		const customOptions = document.querySelector('.custom-options');
		const customSelect = document.querySelector('.custom-select');
		if (customOptions && customSelect) {
			customOptions.classList.toggle('open');
			customSelect.classList.toggle('open');
		}
	},
};

// Game Logic
const game = {
	play(version?: string) {
		window.open(selectedVersion);
	},
	select(path: string, name: string) {
		selectedVersion = path;
		const selector = document.querySelector('.custom-select');
		if (selector?.textContent) {
			if (name) {
				selector.textContent = `Selected: ${name}`;
			} else {
				selector.textContent = `Selected: ${path}`;
			}
		}
		versionSelector.close();
	},
	archive(client: string) {
		const clients: Record<string, string> = {
			'1.8.8': '18-client-version',
			'1.5': '15-client-version',
			'b1.3': 'b13-client-version',
		};
		const dropdown = clients[client] ? (document.getElementById(clients[client]) as HTMLSelectElement) : null;

		if (dropdown?.value) {
			let url: string;
			switch (client) {
				case '1.8.8':
					url = `https://archive.eaglercraft.rip/EaglercraftX_1.8/client/${dropdown.value}/index.html`;
					break;
				case '1.5':
					url = `https://archive.eaglercraft.rip/Eaglercraft_1.5/client/${dropdown.value}/index.html`;
					break;
				case 'b1.3':
					url = `https://archive.eaglercraft.rip/Eaglercraft_b1.3/client/${dropdown.value}/index.html`;
					break;
				default:
					console.error('Unsupported client version:', client);
					return;
			}
			window.open(url, '_blank');
		} else {
			console.error('Dropdown value is missing for client:', client);
		}
	},
};

// Embed Logic
const embed = {
	create() {
		const iframe = document.createElement('iframe');
		iframe.id = 'embed';
		iframe.style.position = 'fixed';
		iframe.style.top = '0';
		iframe.style.left = '0';
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.style.border = 'none';
		if (isMobile()) {
			iframe.src = '/mobile/';
		} else {
			iframe.src = '/home/';
		}
		document.body.appendChild(iframe);
	},
	remove() {
		const iframe = document.getElementById('embed');
		iframe?.remove();
	},
};

// Cookie Management
const cookie = {
	get(key: string): string | null {
		const cookieStr = document.cookie
			.split('; ')
			.find((row) => row.startsWith(`${encodeURIComponent(key)}=`));
		return cookieStr ? decodeURIComponent(cookieStr.split('=')[1]) : null;
	},
	set(key: string, value: string, days: number) {
		const maxAge = days * 60 * 60 * 24;
		document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; secure`;
	},
	delete(key: string) {
		document.cookie = `${encodeURIComponent(key)}=; max-age=0; path=/`;
	},
};

// Utility Functions
function isMobile(): boolean {
	return /Mobi/i.test(window.navigator.userAgent);
}

let selectedVersion: string;

// Initial Theme Load
theme.load();

// Event Listeners and DOMContentLoaded Logic
document.addEventListener('DOMContentLoaded', function () {
    // Apply the saved background when the page loads
    const savedBackground = cookie.get('minexlauncher.background');
    if (savedBackground) {
        changeBackgroundGif(savedBackground);
    }

    // Background selection functionality
    const backgroundSelect = document.getElementById('background-select');
    const customOptions = document.querySelectorAll('.custom-option');

    if (backgroundSelect && customOptions) {
        if (savedBackground) {
            const displayName = savedBackground.split('/').pop()?.replace('.gif', '');
            backgroundSelect.textContent = `Selected: ${displayName}`;
        }

        backgroundSelect.addEventListener('click', function () {
            versionSelector.toggle();
        });

        customOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                const selectedBackground = target.getAttribute('data-value');
                if (selectedBackground) {
                    const displayName = selectedBackground.replace('.gif', '');
                    backgroundSelect.textContent = `Selected: ${displayName}`;
                    setBackground(selectedBackground);
                    changeBackgroundGif(`/resources/images/backgrounds/${selectedBackground}`);
                    versionSelector.close();
                }
            });
        });
    }

    function changeBackgroundGif(backgroundPath: string) {
        document.documentElement.style.setProperty('--background-image', `url('${backgroundPath}')`);
    }

    function setBackground(background: string) {
        cookie.set('minexlauncher.background', background, 365);
    }
});


// Navigation Logic
const navigate = {
	home: {
		game() {
			window.location.href = '/home/game/';
		},
		clients() {
			window.location.href = '/home/clients/';
		},
		archive() {
			window.location.href = '/home/archive/';
		},
		downloads() {
			window.location.href = '/home/downloads/';
		},
	},
	mods: {
		client() {
			window.location.href = '/mods/client/';
		},
		mods() {
			window.location.href = '/mods/mods/';
		},
		resourcepacks() {
			window.location.href = '/mods/resourcepacks/';
		},
	},
	mobile() {
		window.location.href = '/mobile/';
	},
	updates() {
		window.location.href = '/updates/';
	},
	servers() {
		window.location.href = '/servers/';
	},
	settings() {
		window.location.href = '/settings/';
	},
};

// Query String Utility
const query = {
	get(name: string) {
		const urlParams = new URLSearchParams(top?.location.search);
		return urlParams.get(name);
	},
};

// Background Management Functions
function loadBackground() {
	cookie.get('minexlauncher.background');
}

function setBackground(dynamicUrl: string) {
	cookie.set('minexlauncher.background', dynamicUrl, 365);
}

function changeBackgroundGif(dynamicUrl: string) {
	document.documentElement.style.setProperty('--background-image', `url('${dynamicUrl}')`);
}
