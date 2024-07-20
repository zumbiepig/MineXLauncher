let selectedVersion = "";

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/") {
    if (isMobile()) {
      createFullscreenEmbed("/mobile/");
    } else {
      createFullscreenEmbed("/home/");
    }
  }
  if (window.location.pathname === "/mobile/") {
    selectVersion("/game/web/mobile/1.8.8/", "1.8.8");
    toggleOptions();
  }

  const usernameForm = document.getElementById("username-form") as HTMLFormElement | null;
  const usernameInput = document.getElementById("username-input") as HTMLInputElement | null;
  const profileName = document.getElementById("profile-name");

  const savedUsername = getCookie("username");
  if (savedUsername && profileName) {
    profileName.textContent = savedUsername;
  }

  if (usernameForm && usernameInput && profileName) {
    usernameForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = usernameInput.value.trim();
      if (username) {
        profileName.textContent = username;
        setCookie("username", username, 365);
      }
    });
  }
});

function toggleOptions() {
  const customOptions = document.querySelector(".custom-options");
  const customSelect = document.querySelector(".custom-select");
  if (customOptions) customOptions.classList.toggle("open");
  if (customSelect) customSelect.classList.toggle("open");
}

function selectVersion(path: string, name: string) {
  selectedVersion = path;
  const selector = document.querySelector(".custom-select");
  if (selector?.textContent) {
    selector.textContent = `Selected: ${name}`;
  }
  toggleOptions();
}

function playGame() {
  if (!selectedVersion) {
    alert("Please select a version to play.");
    return;
  }
  replaceFullscreenEmbed(selectedVersion);
  enterFullscreen();
  window.open('/temp.html');
}

function openClientManually(clientName: string) {
  replaceFullscreenEmbed(clientName);
}

function openOldClient(client: string) {
  const clients: Record<string, string> = {
    "1.8.8": "18-client-version",
    "1.5.2": "15-client-version",
    "b1.3": "b13-client-version"
  };

  const dropdown = clients[client] ? document.getElementById(clients[client]) as HTMLSelectElement : null;
  if (dropdown?.value) {
    selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft${client === 'b1.3' ? '_b1.3' : `_${client}`}/client/${dropdown.value}/index.html`;
    playGame();
  }
}

function navigateTo(path: string) {
  window.location.href = path;
}

function navigateToHome() { navigateTo("/home/"); }
function navigateToMobile() { navigateTo("/mobile/"); }
function navigateToUpdates() { navigateTo("/updates/"); }
function navigateToSettings() { navigateTo("/settings/"); }
function navigateToServers() { navigateTo("/servers/"); }
function navigateToDownloads() { navigateTo("/downloads/"); }
function navigateToOther() { navigateTo("/other/"); }
function navigateToResource() { navigateTo("/mods/resourcepacks/"); }
function navigateToArchive() { navigateTo("/archive/"); }
function navigateToMods() { navigateTo("/mods/"); }
function navigateToModClient() { navigateTo("/mods/modclient/"); }

function isMobile(): boolean {
  try {
    document.exitPointerLock();
    return /Mobi/i.test(window.navigator.userAgent);
  } catch (e) {
    return true;
  }
}

function getCookie(name: string): string | null {
  const cookieArr = document.cookie.split(";");
  for (const cookie of cookieArr) {
    const cookiePair = cookie.split("=");
    if (name === cookiePair[0]?.trim()) {
      return decodeURIComponent(cookiePair[1] ?? "");
    }
  }
  return null;
}

function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=" + window.location.hostname.replace(/^www\./, "");
}

function createFullscreenEmbed(url: string) {
  const iframe = document.createElement("iframe");
  iframe.id = "fullscreenEmbed";

  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  iframe.src = url;
  document.body.appendChild(iframe);
}

function replaceFullscreenEmbed(url: string) {
  const fullscreenEmbed = window.parent.document.getElementById("fullscreenEmbed") as HTMLIFrameElement | null;
  if (fullscreenEmbed) {
    fullscreenEmbed.src = url;
    fullscreenEmbed.focus();
  }
}

function removeFullscreenEmbed() {
  const iframe = window.parent.document.getElementById("fullscreenEmbed");
  if (iframe) {
    iframe.remove();
  }
}

function enterFullscreen() {
  const element = document.getElementById("fullscreenEmbed");
  if (!document.fullscreenElement) {
    if (element) {
      void element.requestFullscreen();
    }
  }
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  }
}

if (window.location.hostname === '0.0.0.0') { noUnusedFunctions }
function noUnusedFunctions() {
  openClientManually
  openOldClient
  navigateTo
  getCookie
  setCookie
  removeFullscreenEmbed
  enterFullscreen
  exitFullscreen
  navigateToArchive
  navigateToHome
  navigateToMobile
  navigateToUpdates
  navigateToSettings
  navigateToServers
  navigateToDownloads
  navigateToOther
  navigateToResource
  navigateToMods
  navigateToModClient
}
