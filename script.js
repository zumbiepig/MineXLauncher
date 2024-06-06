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
    window.location.href = selectedVersion + '/index.html';
}


function redirectToNews() {
    window.location.href = 'news.html';
}

function redirectToSettings() {
    window.location.href = 'settings.html';
}
function redirectToList() {
    window.location.href = 'serverlist.html';
}
function redirectToMain() {
    window.location.href = 'index.html';
}
