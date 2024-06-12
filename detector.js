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
        let profileNameElement = document.getElementById("profile-name");
        if (profileNameElement) profileNameElement.textContent = username;

        let bottomProfileNameElement = document.getElementById("bottom-profile-name");
        if (bottomProfileNameElement) bottomProfileNameElement.textContent = username;
    }

    let modMakerKitEnabled = getCookie("modMakerKitEnabled");
    let modMakerItem = document.getElementById("modMakerItem");
    let apiItem = document.getElementById("apiItem");
    if (modMakerKitEnabled === "true") {
        if (modMakerItem) modMakerItem.style.display = "flex";
        if (apiItem) apiItem.style.display = "flex";
    } else {
        if (modMakerItem) modMakerItem.style.display = "none";
        if (apiItem) apiItem.style.display = "none";
    }
});
