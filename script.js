let selectedVersion = '';


function toggleOptions() {
    document.querySelector('.custom-options').classList.toggle('open');
    document.querySelector('.custom-select').classList.toggle('open');
}

function selectVersion(version) {
    selectedVersion = version;
    document.querySelector('.custom-select').textContent = `Selected: ${version}`;
    toggleOptions();
}

function playGame() {
    if (!selectedVersion) {
        alert('Please select a version to play.');
        return;
    }
    window.location.href = selectedVersion + '/';
}

function createAbout(url, title, faviconURL) {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    
    if (faviconURL) {
        var favicon = win.document.createElement('link');
        favicon.rel = 'shortcut icon';
        favicon.type = 'image/x-icon';
        favicon.href = faviconURL;
        win.document.head.appendChild(favicon);
    }
    
    if (title) {
        win.document.title = title;
    }
    
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    
    win.document.body.appendChild(iframe);
}

// Example usage:
// With title and favicon
// createAbout('about.html', 'About Page', 'path_to_favicon.ico');

// Without title and favicon
// createAbout('about.html');



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
    window.location.href = '/clientdownload/';
}
function openEaglerForgeModMaker() {
    createAbout('https://eaglerforge-builder.vercel.app')
}
function openEaglerForgeApi() {
    createAbout('https://eaglerforge.github.io/apidocs/')
}
function redirectToOtherClients() {
    window.location.href = '/otherclients/';
}

