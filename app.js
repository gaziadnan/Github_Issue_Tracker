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

let icon = "images/tag.png";
let className = "label";

if (label.toLowerCase() === "bug") {

icon = "images/bug.png";
className = "label bug";

}
else if (label.toLowerCase() === "help wanted") {

icon = "images/help.png";
className = "label help";

}
else if (label.toLowerCase() === "enhancement") {

icon = "images/enhancement.png";
className = "label enhance";

}

labelsHTML += `

<span class="${className}">
<img src="${icon}" class="label-icon">
${label.toUpperCase()}
</span>

`;

});


const card = document.createElement("div");

card.className = `card ${borderClass}`;

/* CARD CLICK করলে MODAL OPEN */

card.onclick = function() {
showModal(issue.id);
};

card.innerHTML = `

<div class="card-top">

<div class="status-icon ${iconClass}">
<img src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" class="status-img">
</div>

<div class="priority ${priorityClass}">
${issue.priority.toUpperCase()}
</div>

</div>

<h3>${issue.title}</h3>

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

const statusClass = issue.status === "open" ? "badge-open" : "badge-closed";

document.getElementById("modalBody").innerHTML = `

<div class="modal-title">
${issue.title}
</div>

<div class="modal-meta">

<span class="${statusClass}">
${issue.status === "open" ? "Opened" : "Closed"}
</span>

<span>•</span>

<span>Opened by ${issue.author}</span>

<span>•</span>

<span>${new Date(issue.createdAt).toLocaleDateString()}</span>

</div>

<div class="labels">
${issue.labels.map(l=>`<span class="label bug">${l}</span>`).join("")}
</div>

<p class="modal-desc">
${issue.description}
</p>

<div class="modal-bottom">

<div>
<b>Assignee:</b>
<br>
${issue.author}
</div>

<div>
<b>Priority:</b>
<br>
<span class="priority-badge">
${issue.priority.toUpperCase()}
</span>
</div>

</div>

<button class="modal-close-btn" onclick="closeModal()">
Close
</button>

`;

document.getElementById("modal").classList.remove("hidden");

}

/* MODAL CLOSE FUNCTION */

function closeModal(){

document.getElementById("modal").classList.add("hidden");

}

/* OUTSIDE CLICK করলে MODAL CLOSE */

document.addEventListener("click",function(e){

const modal = document.getElementById("modal");

if(e.target === modal){
closeModal();
}

});