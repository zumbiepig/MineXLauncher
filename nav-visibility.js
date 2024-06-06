// Function to get a cookie value by name
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

// Function to update the visibility of navigation items
function updateNavVisibility() {
    let modMakerKitEnabled = getCookie("modMakerKitEnabled");
    if (modMakerKitEnabled === "true") {
        document.getElementById("modMakerItem").style.display = "flex";
        document.getElementById("apiItem").style.display = "flex";
    } else {
        document.getElementById("modMakerItem").style.display = "none";
        document.getElementById("apiItem").style.display = "none";
    }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", function() {
    updateNavVisibility();
});
