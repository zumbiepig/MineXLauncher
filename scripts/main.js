let selectedVersion = '';


function toggleOptions() {
    document.querySelector('.custom-options').classList.toggle('open');
    document.querySelector('.custom-select').classList.toggle('open');
}

function selectVersion(path, name) {
    selectedVersion = path;
    document.querySelector('.custom-select').textContent = `Selected: ${name}`;
    toggleOptions();
}

function playGame() {
    if (!selectedVersion) {
        alert('Please select a version to play.');
        return;
    }
    window.location.href = selectedVersion;
}

function createAbout(url, title, favicon) {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    
    if (title) {
        win.document.title = title;
    }

    if (favicon) {
        var favicon = win.document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/x-icon';
        favicon.href = favicon;
        win.document.head.appendChild(favicon);
    }

    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    
    win.document.body.appendChild(iframe);
}

function redirectToMain() {
    window.location.href = '/';
}
function redirectToUpdates() {
    window.location.href = '/updates/';
}
function redirectToSettings() {
    window.location.href = '/settings/';
}
function redirectToList() {
    window.location.href = '/serverlist/';
}
function redirectToClientDownload() {
    window.location.href = '/offline/';
}
function openEaglerForgeModMaker() {
    createAbout('https://eaglerforge-builder.vercel.app', "EaglerForge Builder - Make mods with blocks", "/resources/images/eaglerforge-builder.png")
}
function openEaglerForgeApi() {
    createAbout('https://eaglerforge.github.io/apidocs/', "Mod API | EaglerForge", "/resources/images/eaglerforge-icon.png")
}
function redirectToOtherClients() {
    window.location.href = '/other/';
}
function redirectToArchive() {
    window.location.href ='/other/archive/';
}

