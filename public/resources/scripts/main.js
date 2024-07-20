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

  const usernameForm = document.getElementById("username-form");
  const usernameInput = document.getElementById("username-input");
  const profileName = document.getElementById("profile-name");

  const savedUsername = getCookie("username");
  if (savedUsername) {
    profileName.textContent = savedUsername;
  }

  if (usernameForm) {
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
  document.querySelector(".custom-options")?.classList.toggle("open");
  document.querySelector(".custom-select")?.classList.toggle("open");
}

function selectVersion(path, name) {
  selectedVersion = path;
  const selector = document.querySelector(".custom-select");
  if (selector && selector.textContent) {
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
}

function openClientManually(clientName) {
  replaceFullscreenEmbed(clientName);
}

function openOldClient(client) {
  const clients = {
    "1.8.8": "18-client-version",
    "1.5.2": "15-client-version",
    "b1.3": "b13-client-version"
  };

  const dropdown = document.getElementById(clients[client]);
  if (dropdown && dropdown.value) {
    selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft${client === 'b1.3' ? '_b1.3' : `_${client}`}/client/${dropdown.value}/index.html`;
    playGame();
  }
}

function navigateTo(path) {
  window.location.href = path;
}

function isMobile() {
  try {
    document.exitPointerLock();
    return /Mobi/i.test(window.navigator.userAgent);
  } catch (e) {
    return true;
  }
}

function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  for (const cookie of cookieArr) {
    const cookiePair = cookie.split("=");
    if (name === cookiePair[0]?.trim()) {
      return decodeURIComponent(cookiePair[1] ?? "");
    }
  }
  return null;
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=" + window.location.hostname.replace(/^www\./, "");
}

function createFullscreenEmbed(url) {
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

function replaceFullscreenEmbed(url) {
  const fullscreenEmbed = window.parent.document.getElementById("fullscreenEmbed");
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
  if (element) {
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    }
  }
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

function toggleFullScreen() {
  const element = document.getElementById("fullscreenEmbed");
  if (!document.fullscreenElement) {
    if (element) {
      document.documentElement.requestFullscreen();
    }
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
  }
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
