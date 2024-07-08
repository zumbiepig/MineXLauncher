let selectedVersion = '';

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname == '/') {
        createFullscreenEmbed('/home/');
    } else if (window.location.pathname == '/mobile/') {
        selectVersion('/game/web/mobile/1.8.8/', '1.8.8');
        toggleOptions();
    }
});

function toggleOptions() {
    document.querySelector('.custom-options').classList.toggle('open');
    document.querySelector('.custom-select').classList.toggle('open');
}

function selectVersion(path, name) {
    selectedVersion = path;
    if (document.querySelector('.custom-select') != null) {
        document.querySelector('.custom-select').textContent = `Selected: ${name}`;
    }
    toggleOptions();
}

function playGame() {
    if (!selectedVersion || selectedVersion == '') {
        alert('Please select a version to play.');
        return;
    }
    window.parent.replaceFullscreenEmbed(selectedVersion);
}

function openOldClient(client) {
    if (client == '1.8.8') {
        selectedVersion = `https://archive.eaglercraft.rip/EaglercraftX_1.8/client/${document.getElementById('18-client-version').value}/index.html`;
        playGame();
    } else if (client == '1.5.2') {
        selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft_1.5/client/${document.getElementById('15-client-version').value}/index.html`;
        playGame();
    } else if (client == 'b1.3') {
        selectedVersion = `https://archive.eaglercraft.rip/Eaglercraft_b1.3/client/${document.getElementById('b13-client-version').value}/index.html`;
        playGame();
    }
}

function navigateToHome() {
    window.parent.replaceFullscreenEmbed('/home/');
}
function navigateToMobile() {
    window.parent.replaceFullscreenEmbed('/mobile/');
}
function navigateToUpdates() {
    window.parent.replaceFullscreenEmbed('/updates/');
}
function navigateToSettings() {
    window.parent.replaceFullscreenEmbed('/settings/');
}
function navigateToServers() {
    window.parent.replaceFullscreenEmbed('/servers/');
}
function navigateToDownloads() {
    window.parent.replaceFullscreenEmbed('/downloads/');
}
function navigateToOther() {
    window.parent.replaceFullscreenEmbed('/other/');
}
function navigateToArchive() {
    window.parent.replaceFullscreenEmbed('/archive/');
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=" + window.location.hostname.replace(/^www\./, '');
}

function createFullscreenEmbed(url) {
    var iframe = document.createElement('iframe');
    iframe.id = 'fullscreenEmbed';

    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    iframe.src = url;
    document.body.appendChild(iframe);
}

function replaceFullscreenEmbed(url) {
    document.getElementById('fullscreenEmbed').src = url;
}

function removeFullscreenEmbed() {
    document.getElementById('fullscreenEmbed').remove();
}