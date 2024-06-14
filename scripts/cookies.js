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
        document.getElementById("profile-name").textContent = username;
        document.getElementById("bottom-profile-name").textContent = username;
    }

    // Set the mod maker checkbox state from the cookie
    let modMakerKitEnabled = getCookie("modMakerKitEnabled");
    if (modMakerKitEnabled === "true") {
        document.getElementById("modMakerItem").style.display = "flex";
        document.getElementById("apiItem").style.display = "flex";
    } else {
        document.getElementById("modMakerItem").style.display = "none";
        document.getElementById("apiItem").style.display = "none";
    }
});