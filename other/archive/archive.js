function openOldClient() {
    // Get the selected version from the dropdown
    const versionSelect = document.getElementById('client-version');
    const selectedVersion = versionSelect.value;

    // Construct the URL based on the selected version
    const url = `https://archive.eaglercraft.rip/EaglercraftX_1.8/client/${selectedVersion}/index.html`;

    // Open the URL in a new window or tab
    window.open(url, '_blank');
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
function openOld15Client() {
    // Get the selected version from the dropdown
    const versionSelect = document.getElementById('client-version');
    const selectedVersion = versionSelect.value;

    // Construct the URL based on the selected version
    const url = `https://archive.eaglercraft.rip/Eaglercraft_1.5/client/${selectedVersion}/index.html`;

    // Open the URL in a new window or tab
    window.open(url, '_blank');
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
function openOldB13Client() {
    // Get the selected version from the dropdown
    const versionSelect = document.getElementById('client-version');
    const selectedVersion = versionSelect.value;

    // Construct the URL based on the selected version
    const url = `https://archive.eaglercraft.rip/Eaglercraft_b1.3/client/${selectedVersion}/index.html`;

    // Open the URL in a new window or tab
    window.open(url, '_blank');
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
