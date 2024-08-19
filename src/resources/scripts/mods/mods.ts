document.addEventListener('DOMContentLoaded', async () => {
	const response = await fetch('/resources/mods/data.json');
	const data = await response.json();
	const modListElement = document.querySelector('.mod-list');

	// @ts-expect-error
	data.mods.forEach(({ id, name, description, author, authorLink, source }) => {
		const div = document.createElement('div');
		div.classList.add('mod-item');
		div.innerHTML = `<div class="mod-icon"><img loading="lazy" src="/resources/mods/icons/${id}.webp" /></div><div class="mod-details"><h3 class="mod-name">${name}</h3><p class="mod-author">By <a href="${authorLink}" target="_blank">${author}</a></p><p class="mod-description">${description}</p><div class="mod-links"><a href="${source}" class="mod-link" target="_blank">Source</a><a href="/resources/mods/downloads/${id}.js" class="mod-link" download>Download</a></div></div>`;
		modListElement?.appendChild(div);
	});
});
