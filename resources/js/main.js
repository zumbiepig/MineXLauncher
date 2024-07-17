let selectedVersion = "";

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname == "/") {
    if (isMobile()) {
      createFullscreenEmbed("/mobile/");
    } else {
      createFullscreenEmbed("/home/");
    }
  } else {
    // any other page
  }
  if (window.location.pathname == "/mobile/") {
    selectVersion("/game/web/mobile/1.8.8/", "1.8.8");
    toggleOptions();
  }
});

function toggleOptions() {
  document.querySelector(".custom-options").classList.toggle("open");
  document.querySelector(".custom-select").classList.toggle("open");
}

function selectVersion(path, name) {
  selectedVersion = path;
  if (document.querySelector(".custom-select") != null) {
    document.querySelector(".custom-select").textContent = `Selected: ${name}`;
  }
  toggleOptions();
}
function playGame() {
  if (selectedVersion === "") {
    alert("Please select a version to play.");
    return;
  }
  window.open("/temp/");
  replaceFullscreenEmbed(selectedVersion);

   enterFullscreen();

  
  
}



function openOldClient(client) {
  if (client == "1.8.8") {
    selectedVersion = `https://archive.eaglercraft.rip/EaglercraftX_1.8/client/${
      document.getElementById("18-client-version").value
    }/index.html`;
    playGame();
  } else if (client == "1.5.2") {
    selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft_1.5/client/${
      document.getElementById("15-client-version").value
    }/index.html`;
    playGame();
  } else if (client == "b1.3") {
    selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft_b1.3/client/${
      document.getElementById("b13-client-version").value
    }/index.html`;
    playGame();
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

function navigateToArchive() {
  window.location.href = "/archive/";
}
function navigateToMods() {
  window.location.href = "/mods/";
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
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name +
    "=" +
    (value || "") +
    expires +
    "; path=/; domain=" +
    window.location.hostname.replace(/^www\./, "");
}

function createFullscreenEmbed(url) {
  var iframe = document.createElement("iframe");
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
  var fullscreenEmbed = window.parent.document.getElementById("fullscreenEmbed");
  fullscreenEmbed.src = url;
  
  fullscreenEmbed.focus();
}


function removeFullscreenEmbed() {
  window.parent.document.getElementById("fullscreenEmbed").remove();
}
function enterFullscreen() {
  var element = document.getElementById("fullscreenEmbed"); 

  if (element.requestFullscreen) {
    element.requestFullscreen(); 
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();  
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); 
  }
}


function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
