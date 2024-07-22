let selectedVersion = '';

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname === '/mobile/') {
    game.select('/game/web/mobile/1.8.8/', '1.8.8');
  }

  const usernameForm = document.getElementById('username-form') as HTMLFormElement;
  const usernameInput = document.getElementById('username-input') as HTMLInputElement;
  const profileName = document.getElementById('profile-name');

  const savedUsername = cookie.get('username');
  if (savedUsername && profileName) {
    profileName.textContent = savedUsername;
  }

  if (profileName) {
    usernameForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = usernameInput.value.trim();
      if (username) {
        profileName.textContent = username;
        cookie.set('username', username, 365);
      }
    });
  }
});

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
  }
}

const game = {
  play() {
    if (!selectedVersion) {
      alert('Please select a version to play.');
      return;
    }
    // window.location.href = selectedVersion;
    // @ts-expect-error 1234567890
    window.top.location.href = selectedVersion;
    // window.open('/temp.html');
  },
  select(path: string, name: string) {
    selectedVersion = path;
    const selector = document.querySelector('.custom-select');
    if (selector?.textContent) {
      if (name) {
        selector.textContent = `Selected: ${name}`;
      } else {
        selector.textContent = `Selected: ${path}`;
      };
    }
    versionSelector.close();
  },
  archive(client: string) {
    const clients: Record<string, string> = {
      '1.8.8': '18-client-version',
      '1.5.2': '15-client-version',
      'b1.3': 'b13-client-version'
    };
    const dropdown = clients[client] ? document.getElementById(clients[client]) as HTMLSelectElement : null;
    if (dropdown?.value) {
      selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft${client === 'b1.3' ? '_b1.3' : `_${client}`}/client/${dropdown.value}/index.html`;
      game.play();
    }
  }
}

const navigate = {
  home() { window.location.href = '/home/'; },
  mobile() { window.location.href = '/mobile/'; },
  updates() { window.location.href = '/updates/'; },
  settings() { window.location.href = '/settings/'; },
  servers() { window.location.href = '/servers/'; },
  downloads() { window.location.href = '/downloads/'; },
  clients() { window.location.href = '/clients/'; },
  resource() { window.location.href = '/mods/resourcepacks/'; },
  archive() { window.location.href = '/archive/'; },
  mods() { window.location.href = '/mods/'; },
  modClient() { window.location.href = '/mods/modclient/'; }
}

const cookie = {
  get(name: string): string | null {
    const cookieArr = document.cookie.split(';');
    for (const cookie of cookieArr) {
      const cookiePair = cookie.split('=');
      if (name === cookiePair[0]?.trim()) {
        return decodeURIComponent(cookiePair[1] ?? '');
      }
    }
    return null;
  },
  set(name: string, value: string, days: number) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; domain=' + window.location.hostname.replace(/^www\./, '');
  }
}

const query = {
  get(name: string) {
    const urlParams = new URLSearchParams(top?.location.search);
    return urlParams.get(name);
  }
}

function isMobile(): boolean {
  try {
    document.exitPointerLock();
    return /Mobi/i.test(window.navigator.userAgent);
  } catch (e) {
    return true;
  }
}

if (window.location.hostname === '0.0.0.0') {
  versionSelector
  game
  navigate
  query
  isMobile
}
