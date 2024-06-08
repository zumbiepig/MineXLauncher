document.addEventListener("DOMContentLoaded", () => {
    setupProfile();
    setupServerEmbeds();
});

// Initialize profile based on cookies
function setupProfile() {
    const profileNameElem = document.getElementById("profile-name");
    const username = getCookie("username");
    if (username) {
        profileNameElem.textContent = username;
    }

    const modMakerKitEnabled = getCookie("modMakerKitEnabled");
    const modMakerItem = document.getElementById("modMakerItem");
    const apiItem = document.getElementById("apiItem");

    if (modMakerKitEnabled === "true") {
        modMakerItem.style.display = "flex";
        apiItem.style.display = "flex";
    } else {
        modMakerItem.style.display = "none";
        apiItem.style.display = "none";
    }
}

// Setup server embeds with lazy loading
function setupServerEmbeds() {
    const servers = [
        "wss://zentic.cc",
        "mc.arch.lol",
        "wss://mc.zyth.me",
        "wss://asianf4rmer.minecraft.pe",
        "wss://hoosiertransfer.xyz",
        "wss://eg.cloudwars.club",
        "wss://mc.firenetwork.lol",
        "wss://deercraft.ddns.net",
        "wss://sus.shhnowisnottheti.me",
        "wss://mc.asspixel.net/",
        "wss://aeon-network.net/1.8",
    ];

    const embedContainer = document.getElementById("embed");
    embedContainer.style.display = "flex";
    embedContainer.style.flexWrap = "wrap";

    const fragment = document.createDocumentFragment();
    servers.forEach(server => {
        const serverDiv = createServerEmbed(server);
        fragment.appendChild(serverDiv);

        lazyLoadServerEmbed(serverDiv, server);
    });

    embedContainer.appendChild(fragment);
}

// Create a server embed div
function createServerEmbed(server) {
    const serverDiv = document.createElement("div");
    serverDiv.className = "server-embed";

    const serverInfoDiv = document.createElement("div");
    serverInfoDiv.style.display = "flex";
    serverInfoDiv.style.flexDirection = "row";
    serverInfoDiv.style.alignItems = "center";
    serverInfoDiv.style.marginBottom = "10px";

    const ipSpan = document.createElement("span");
    ipSpan.textContent = `${server} (Server Embed Below) ↓`;

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy IP";
    copyButton.classList.add("minecraft-button");
    copyButton.addEventListener("click", () => copyServerIP(server));

    serverInfoDiv.appendChild(ipSpan);
    serverInfoDiv.appendChild(copyButton);
    serverDiv.appendChild(serverInfoDiv);

    return serverDiv;
}

// Lazy load server embed
function lazyLoadServerEmbed(serverDiv, server) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new ServerEmbed(serverDiv, "75%").ping(server);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(serverDiv);
}

// Copy server IP to clipboard
function copyServerIP(server) {
    navigator.clipboard.writeText(server)
        .then(() => {
            alert("IP address copied to clipboard: " + server);
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
}

// Get cookie value by name
function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
