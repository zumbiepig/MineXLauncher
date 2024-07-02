function showTab(tabId) {
    var contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    var activeContent = document.getElementById(tabId);
    activeContent.classList.add('active');

    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('selected');
    });

    var activeTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
    activeTab.classList.add('selected');
}

function launchVersion() {
    var version = document.getElementById('version-home').value;
    alert('Launching version: ' + version);
}
