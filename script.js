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

function detection(){
    // Set the username placeholder from the cookie
    let username = getCookie("username");
    if (username != null) {
       document.getElementById("profile-name").textContent = username;
       document.getElementById("bottom-profile-name").textContent = username;
    }

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
document.addEventListener("DOMContentLoaded", function() {
    // Function to get a cookie value by name
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

    // Set the username placeholder from the cookie
    let username = getCookie("username");
    if (username != null) {
        document.getElementById("usernameInput").placeholder = username;
        document.getElementById("profile-name").textContent = username;
    }
    let modMakerKitEnabled = getCookie("modMakerKitEnabled");
    if (modMakerKitEnabled === "true") {
        document.getElementById("modMakerCheckbox").checked = true;
        document.getElementById("modMakerItem").style.display = "flex";
        document.getElementById("apiItem").style.display = "flex";
    } else {
        document.getElementById("modMakerItem").style.display = "none";
        document.getElementById("apiItem").style.display = "none";
    }
    let serverToolEnabled = getCookie("serverToolEnabled");
    if (modMakerKitEnabled === "true") {
        document.getElementById("serverToolCheckbox").checked = true;
        document.getElementById("serverTool").style.display = "flex";
    } else {
        document.getElementById("serverTool").style.display = "none";
    }
    // Set the mod maker checkbox state from the cookie
    
});