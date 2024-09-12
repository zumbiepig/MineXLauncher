import { inflate } from 'pako';

declare global {
	interface Window {
		eaglercraftXOpts: {
			container: string;
			assetsURI: string;
			localesURI?: string;
			lang?: string;
			joinServer?: string;
			worldsDB?: string;
			resourcePacksDB?: string;
			demoMode?: boolean;
			servers: { addr: string; name: string }[];
			relays: { addr: string; comment: string; primary: boolean }[];
			checkShaderGLErrors?: boolean;
			enableDownloadOfflineButton?: boolean;
			downloadOfflineButtonLink?: string;
			html5CursorSupport?: boolean;
			allowUpdateSvc?: boolean;
			allowUpdateDL?: boolean;
			logInvalidCerts?: boolean;
			enableSignatureBadge?: boolean;
			checkRelaysForUpdates?: boolean;
			allowVoiceClient?: boolean;
			allowFNAWSkins?: boolean;
			localStorageNamespace?: string;
			enableMinceraft?: boolean;
			hooks?: {
				localStorageSaved?: (key: string, data: string) => void;
				localStorageLoaded?: (key: string) => string | null;
			};
			Mods?: string[];
		};
		main: () => void;
	}
}

const storage = {
	local: {
		get: function (key: string) {
			const item = localStorage.getItem('minexlauncher');
			if (item !== null) {
				const json = JSON.parse(base64Gzip.decompress(item));
				if (json[key] !== undefined) {
					return json[key];
				}
				return undefined;
			}
			return undefined;
		},
	},
};

const base64Gzip = {
	decompress: function (string: string): string {
		return inflate(
			Uint8Array.from(atob(string), (c) => c.charCodeAt(0)),
			{ to: 'string' },
		);
	},
};

const randomRelay = Math.floor(Math.random() * 3);
window.eaglercraftXOpts = {
	container: 'game_frame',
	assetsURI: 'assets.epk',
	servers: [
		{ addr: 'wss://temuzx.xyz', name: 'TemuzX' },
		{ addr: 'wss://webmc.xyz/server', name: 'WebMC OneBlock' },
		{ addr: 'wss://mc.ricenetwork.xyz', name: 'Rice Network' },
		{ addr: 'wss://mc.lamplifesteal.xyz', name: 'LampLifesteal' },
		{ addr: 'wss://electronmc.club', name: 'Electron Network' },
		{ addr: 'wss://play.brickmc.net', name: 'BrickMC' },
	],
	relays: [
		{
			addr: 'wss://relay.deev.is',
			comment: 'lax1dude relay #1',
			primary: randomRelay === 0,
		},
		{
			addr: 'wss://relay.lax1dude.net',
			comment: 'lax1dude relay #2',
			primary: randomRelay === 1,
		},
		{
			addr: 'wss://relay.shhnowisnottheti.me',
			comment: 'ayunami relay #1',
			primary: randomRelay === 2,
		},
	],
	Mods: storage.local.get('mods') ?? [],
};

const urlParams = new URLSearchParams(window.location.search);
const server = urlParams.get('server');
if (server) window.eaglercraftXOpts.joinServer = server;

window.onload = () => window.main();
