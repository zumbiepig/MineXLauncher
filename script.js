
function playGame() {
    const selectedVersion = document.getElementById('version-select').value;
    window.location.href = selectedVersion;
}
document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'SpeedSlicer'; // Replace with your GitHub username or organization name
    const repoName = 'MineXLauncher'; // Replace with your GitHub repository name

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(releases => {
            const releasesDiv = document.getElementById('github-releases');
            if (releases.length > 0) {
                releasesDiv.innerHTML = '<h3>Latest Releases</h3>';
                const ul = document.createElement('ul');
                releases.slice(0, 5).forEach(release => {
                    const li = document.createElement('li');
                    const releaseLink = document.createElement('a');
                    releaseLink.href = release.html_url;
                    releaseLink.textContent = release.name;
                    li.appendChild(releaseLink);
                    ul.appendChild(li);
                });
                releasesDiv.appendChild(ul);
            } else {
                releasesDiv.innerHTML = '<p>No releases found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching GitHub releases:', error);
            const releasesDiv = document.getElementById('github-releases');
            releasesDiv.innerHTML = '<p>Error fetching releases.</p>';
        });
});
