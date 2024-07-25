let selectedVersion = "";

document.addEventListener("DOMContentLoaded", function () {
	const usernameForm = document.getElementById("username-form") as HTMLFormElement;
	const usernameInput = document.getElementById("username-input") as HTMLInputElement;
	const profileName = document.getElementById("profile-name");

	const savedUsername = cookie.get("launcher_username");
	if (profileName && savedUsername) {
		profileName.textContent = savedUsername;
	} else if (profileName && !savedUsername) {
		profileName.textContent = "Default";
	}

	if (profileName && window.location.pathname === "/settings/") {
		usernameForm.addEventListener("submit", function (event) {
			event.preventDefault();
			const username = usernameInput.value.trim();
			if (username) {
				profileName.textContent = username;
				cookie.set("launcher_username", username, 30);
			}
		});
	}
});

const versionSelector = {
	open() {
		const customOptions = document.querySelector(".custom-options");
		const customSelect = document.querySelector(".custom-select");
		if (customOptions && customSelect) {
			customOptions.classList.add("open");
			customSelect.classList.add("open");
		}
	},
	close() {
		const customOptions = document.querySelector(".custom-options");
		const customSelect = document.querySelector(".custom-select");
		if (customOptions && customSelect) {
			customOptions.classList.remove("open");
			customSelect.classList.remove("open");
		}
	},
	toggle() {
		const customOptions = document.querySelector(".custom-options");
		const customSelect = document.querySelector(".custom-select");
		if (customOptions && customSelect) {
			customOptions.classList.toggle("open");
			customSelect.classList.toggle("open");
		}
	},
};

const game = {
	play(version?: string) {
		if (version) {
			embed.remove();
			// @ts-expect-error 1234567890
			window.top.location.href = version;
		} else if (selectedVersion) {
			embed.remove();
			// @ts-expect-error 1234567890
			window.top.location.href = selectedVersion;
		} else {
			alert("Please select a version to play.");
			return;
		}
	},
	select(path: string, name: string) {
		selectedVersion = path;
		const selector = document.querySelector(".custom-select");
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
			"1.8.8": "18-client-version",
			"1.5.2": "15-client-version",
			"b1.3": "b13-client-version",
		};
		const dropdown = clients[client] ? (document.getElementById(clients[client]) as HTMLSelectElement) : null;
		if (dropdown?.value) {
			selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft${client === "b1.3" ? "_b1.3" : `_${client}`}/client/${dropdown.value}/index.html`;
			game.play();
		}
	},
};

const embed = {
	create() {
		const iframe = document.createElement("iframe");
		iframe.id = "embed";
		iframe.style.position = "fixed";
		iframe.style.top = "0";
		iframe.style.left = "0";
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.style.border = "none";
		if (isMobile()) {
			iframe.src = "/mobile/";
		} else {
			iframe.src = "/home/";
		}
		document.body.appendChild(iframe);
	},
	remove() {
		const iframe = document.getElementById("embed");
		iframe?.remove();
	},
};

const navigate = {
	home: {
		game() {
			window.location.href = "/home/game/";
		},
		clients() {
			window.location.href = "/home/clients/";
		},
		archive() {
			window.location.href = "/home/archive/";
		},
		downloads() {
			window.location.href = "/home/downloads/";
		},
	},
	mods: {
		client() {
			window.location.href = "/mods/client/";
		},
		mods() {
			window.location.href = "/mods/mods/";
		},
		resourcepacks() {
			window.location.href = "/mods/resourcepacks/";
		},
	},
	mobile() {
		window.location.href = "/mobile/";
	},
	updates() {
		window.location.href = "/updates/";
	},
	servers() {
		window.location.href = "/servers/";
	},
	settings() {
		window.location.href = "/settings/";
	},
};

const cookie = {
	get(name: string): string | null {
		const cookieArr = document.cookie.split(";");
		for (const cookie of cookieArr) {
			const cookiePair = cookie.split("=");
			if (name === cookiePair[0]?.trim()) {
				return decodeURIComponent(cookiePair[1] ?? "");
			}
		}
		return null;
	},
	set(name: string, value: string, days: number) {
		let expires = "";
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=" + window.location.hostname.replace(/^www\./, "");
	},
};

const query = {
	get(name: string) {
		const urlParams = new URLSearchParams(top?.location.search);
		return urlParams.get(name);
	},
};

function isMobile(): boolean {
	try {
		document.exitPointerLock();
		return /Mobi/i.test(window.navigator.userAgent);
	} catch (e) {
		return true;
	}
}

if (window.location.hostname === "0.0.0.0") {
	versionSelector;
	game;
	navigate;
	query;
	isMobile;
}
