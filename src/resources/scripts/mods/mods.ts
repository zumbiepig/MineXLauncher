document.addEventListener("DOMContentLoaded", function () {
	fetch("/resources/data/mods.json")
		.then((response) => response.json())
		.then((data: { mods: { [x: string]: string; icon: string; author: string; description: string }[] }) => {
			const modListElement = document.querySelector(".mod-list");
			data.mods.forEach((mod: { [x: string]: string; icon: string; author: string; description: string }) => {
				const modItem = document.createElement("div");
				modItem.classList.add("mod-item");
				modItem.innerHTML = `
          <div class="mod-icon">
            <img src="${mod.icon}" />
          </div>
          <div class="mod-details">
            <h3 class="mod-name">${mod["display-name"] ?? ""}</h3>
            <p class="mod-author">By <a href="${mod["author-link"] ?? ""}" target="_blank">${mod.author}</a></p>
            <p class="mod-description">${mod.description}</p>
            <div class="mod-links">
              <a href="${mod["repo-link"] ?? ""}" class="mod-link" target="_blank">Repository</a>
              <a href="${mod["download-link"] ?? ""}" class="mod-link" download>Download</a>
            </div>
          </div>
        `;
				modListElement?.appendChild(modItem);
			});
		})
		.catch((error: unknown) => {
			console.error("Error fetching mods:", error);
		});
});
