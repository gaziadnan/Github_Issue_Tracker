const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

function login() {

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if (username === "admin" && password === "admin123") {

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("mainPage").classList.remove("hidden");

loadIssues();

} 
else {

alert("Invalid Credentials");

}

}

async function loadIssues() {

const res = await fetch(API);
const data = await res.json();

allIssues = data.data;

displayIssues(allIssues);

}

function displayIssues(issues) {

const container = document.getElementById("issuesContainer");

document.getElementById("issueCount").innerText = issues.length;

container.innerHTML = "";

issues.forEach(issue => {

const borderClass = issue.status === "open" ? "open-border" : "closed-border";

const iconClass = issue.status === "open" ? "open-icon" : "closed-icon";

const priorityClass = issue.priority.toLowerCase();


/* LABEL GENERATOR */

let labelsHTML = "";

const labels = issue.labels || [];

labels.forEach(label => {

let icon = "🏷";
let className = "label";

if (label.toLowerCase() === "bug") {

icon = "🐞";
className = "label bug";

}

else if (label.toLowerCase() === "help wanted") {

icon = "🖼";
className = "label help";

}

else if (label.toLowerCase() === "enhancement") {

icon = "✨";
className = "label help";

}

labelsHTML += `
<span class="${className}">
${icon} ${label.toUpperCase()}
</span>
`;

});


const card = document.createElement("div");

card.className = `card ${borderClass}`;

card.innerHTML = `

<div class="card-top">

<div class="status-icon ${iconClass}">
${issue.status === "open" ? "✓" : "●"}
</div>

<div class="priority ${priorityClass}">
${issue.priority.toUpperCase()}
</div>

</div>

<h3 onclick="showModal(${issue.id})">${issue.title}</h3>

<p class="desc">${issue.description}</p>

<div class="labels">
${labelsHTML}
</div>

<div class="card-footer">

#${issue.id} by ${issue.author}

<br>

${new Date(issue.createdAt).toLocaleDateString()}

</div>

`;

container.appendChild(card);

});

}

function filterStatus(status, btn) {

setActive(btn);

const filtered = allIssues.filter(issue => issue.status === status);

displayIssues(filtered);

}

function showAll(btn) {

setActive(btn);

displayIssues(allIssues);

}

function setActive(btn) {

document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));

btn.classList.add("active");

}

async function searchIssue() {

const text = document.getElementById("searchInput").value;

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

const data = await res.json();

displayIssues(data.data);

}

async function showModal(id) {

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

const data = await res.json();

const issue = data.data;

document.getElementById("modalBody").innerHTML = `

<h2>${issue.title}</h2>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>

<p>Priority: ${issue.priority}</p>

<p>Author: ${issue.author}</p>

<p>Labels: ${issue.labels}</p>

<p>Date: ${issue.createdAt}</p>

`;

document.getElementById("modal").classList.remove("hidden");

}

function closeModal() {

document.getElementById("modal").classList.add("hidden");

}