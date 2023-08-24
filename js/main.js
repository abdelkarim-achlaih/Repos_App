let input = document.querySelector("input");
let btn = document.querySelector("button");
let reposHolder = document.querySelector(".row.repos");
let owner = document.querySelector(".owner");
let app = document.querySelector(".app-repos");

btn.onclick = fetchRepos;

async function fetchRepos() {
	if (input.value !== "") {
		if (owner.innerHTML !== "") {
			owner.innerHTML = "";
			reposHolder.innerHTML = "";
		}
		app.classList.add("fetched");
		let url = `https://api.github.com/users/${input.value}/repos`;
		let response = await fetch(url);
		let repos = await response.json();
		owner.innerHTML = `
					<div class="avatar">
						<img src="${repos[0].owner.avatar_url}" alt="Owner">
					</div>
					<div class="name text-white fs-4 mt-3 mb-3">${repos[0].owner.login}</div>
					<div class="link"><a href="${repos[0].owner.html_url}" target="_blank">Visit Profile</a></div>
		`;
		repos.forEach((repo) => {
			let div = document.createElement("div");
			div.classList.add("col-lg-4");
			div.innerHTML = `
						<div class="card text-center">
							<div class="card-body">
								<h5 class="card-title fs-3 mb-4">${repo.name}</h5>
								<p class="card-text mb-4">${repo.description}</p>
								<div class="card-stats d-flex justify-content-between">
									<div><i class="fa-solid fa-eye"></i><span>${repo.visibility}</span></div>
									<div><i class="fa-solid fa-code-branch"></i><span>${repo.default_branch}</span></div>
									<div><i class="fa-solid fa-code"></i><span>${repo.language}</span></div>
								</div>
							</div>
						</div>
			`;
			reposHolder.append(div);
		});
	} else {
		input.placeholder = "You didn't enter any username !";
	}
}
