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
});

function toggleOptions() {
  document.querySelector(".custom-options")?.classList.toggle("open");
  document.querySelector(".custom-select")?.classList.toggle("open");
}

function selectVersion(path: string, name: string) {
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

function openClientManually(clientName: string) {
  replaceFullscreenEmbed(clientName);
}

function openOldClient(client: string) {
  if (client === "1.8.8") {
    const dropdown = document.getElementById("18-client-version") as HTMLSelectElement;
    if (dropdown.value) {
      selectedVersion = `https://archive.eaglercraft.rip/EaglercraftX_1.8/client/${dropdown.value}/index.html`;
      playGame();
    }
  } else if (client === "1.5.2") {
    const dropdown = document.getElementById("15-client-version") as HTMLSelectElement;
    if (dropdown.value) {
      selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft_1.5/client/${dropdown.value}/index.html`;
      playGame();
    }
  } else if (client === "b1.3") {
    const dropdown = document.getElementById("b13-client-version") as HTMLSelectElement;
    if (dropdown.value) {
      selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft_b1.3/client/${dropdown.value}/index.html`;
      playGame();
    }
  }
}

function navigateToHome() {
  window.location.href = "/home/";
}

function navigateToMobile() {
  window.location.href = "/mobile/";
}

function navigateToUpdates() {
  window.location.href = "/updates/";
}

function navigateToSettings() {
  window.location.href = "/settings/";
}

function navigateToServers() {
  window.location.href = "/servers/";
}

function navigateToDownloads() {
  window.location.href = "/downloads/";
}

function navigateToOther() {
  window.location.href = "/other/";
}

function navigateToResource() {
  window.location.href = "/mods/resourcepacks/";
}

function navigateToArchive() {
  window.location.href = "/archive/";
}

function navigateToMods() {
  window.location.href = "/mods/";
}

function navigateToModClient() {
  window.location.href = "/mods/modclient/";
}

function isMobile() {
  try {
    document.exitPointerLock();
    return /Mobi/i.test(window.navigator.userAgent);
  } catch (e) {
    return true;
  }
}

function getCookie(name: string) {
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
  const fullscreenEmbed = window.parent.document.getElementById("fullscreenEmbed") as HTMLIFrameElement;
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

// so there are no errors just put all functions here
if (window.location.hostname === null) { fuckESLint() };
function fuckESLint() {
  openClientManually
  openOldClient
  navigateToHome
  navigateToArchive
  navigateToDownloads
  navigateToMobile
  navigateToUpdates
  navigateToModClient
  navigateToSettings
  navigateToMods
  getCookie
  navigateToServers
  removeFullscreenEmbed
  enterFullscreen
  navigateToOther
  navigateToResource
  setCookie
  exitFullscreen
  toggleFullScreen
}
