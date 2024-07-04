let selectedVersion = '';

document.addEventListener('DOMContentLoaded', function() {
    // start scripts here
});

function toggleOptions() {
    document.querySelector('.custom-options').classList.toggle('open');
    document.querySelector('.custom-select').classList.toggle('open');
}

function selectVersion(path, name) {
    selectedVersion = path;
    if (name) {
        document.querySelector('.custom-select').textContent = `Selected: ${name}`;
    } else {
        document.querySelector('.custom-select').textContent = `Selected: ${path}`;
    }
    toggleOptions();
}

function playGame() {
    if (!selectedVersion) {
        alert('Please select a version to play.');
        return;
    }
    window.location.href = selectedVersion;
}

function navigateToHome() {
    window.parent.replaceFullscreenEmbed('/home/');
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