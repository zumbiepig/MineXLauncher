document.addEventListener('DOMContentLoaded', async () => {
	try {
		const response = await fetch('/resources/data/mods.json');
		const data = await response.json();
		const modListElement = document.querySelector('.mod-list');

		data.mods.forEach(({ icon, author, description, displayName, authorLink, repoLink, downloadLink }) => {
			const modItem = document.createElement('div');
			modItem.classList.add('mod-item');
			modItem.innerHTML = `
        <div class="mod-icon">
          <img loading="lazy" src="${icon}" />
        </div>
        <div class="mod-details">
          <h3 class="mod-name">${displayName}</h3>
          <p class="mod-author">By <a href="${authorLink}" target="_blank">${author}</a></p>
          <p class="mod-description">${description}</p>
          <div class="mod-links">
            <a href="${repoLink}" class="mod-link" target="_blank">Repository</a>
            <a href="${downloadLink}" class="mod-link" download>Download</a>
          </div>
        </div>
      `;
			modListElement?.appendChild(modItem);
		});
	} catch (error) {
		console.error('Error fetching mods:', error);
	}
});
