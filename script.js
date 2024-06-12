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

