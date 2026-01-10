/* =========================
   GLOBAL STATE
========================= */
let issues = JSON.parse(localStorage.getItem("issues")) || [];
const currentUserEmail = localStorage.getItem("currentUserEmail");

if (!currentUserEmail) {
  window.location.href = "login.html";
}

/* =========================
   NAVIGATION
========================= */
function showSection(section) {
  const sections = ["dashboard", "vote", "raise", "notification"];

  sections.forEach((sec) => {
    const el = document.getElementById(sec + "-section");
    if (el) el.style.display = "none";
  });

  document.getElementById(section + "-section").style.display = "block";

  document
    .querySelectorAll("#sidebar ul li")
    .forEach((li) => li.classList.remove("active"));

  const map = { dashboard: 0, vote: 1, raise: 2, notification: 3 };
  const items = document.querySelectorAll("#sidebar ul li");
  if (items[map[section]]) items[map[section]].classList.add("active");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUserEmail");
  window.location.href = "login.html";
}

function goToAdmin() {
  window.location.href = "admin/admin-login.html";
}

function confirmChangeCategories() {
  const ok = confirm(
    "If you change categories, your previous category preferences will be updated. Continue?"
  );
  if (!ok) return;
  window.location.href = "select-categories.html";
}

/* =========================
   RAISE ISSUE
========================= */
const form = document.getElementById("issue-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("issue-title").value.trim();
    const category = document.getElementById("issue-category").value;
    const desc = document.getElementById("issue-desc").value.trim();

    if (!title || !category || !desc) {
      toast("All fields are required");
      return;
    }

    const issue = {
      id: Date.now(),
      title,
      category,
      desc,
      votes: 0,
      status: "Pending",
      votedBy: [],
    };

    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    form.reset();
    updateDashboardStats();
    renderIssues();
    renderRecentIssues();
    showSection("vote");

    toast("Issue raised successfully");
  });
}

/* =========================
   RENDER ISSUES
========================= */
function renderIssues() {
  const issueList = document.getElementById("issue-list");
  if (!issueList) return;

  issueList.innerHTML = "";

  if (issues.length === 0) {
    issueList.innerHTML = `
      <div class="issue-card">
        <h3>No issues yet</h3>
        <p>Be the first to raise an issue.</p>
      </div>`;
    return;
  }

  issues.sort((a, b) => b.votes - a.votes);

  issues.forEach((issue) => {
    const voted = issue.votedBy.includes(currentUserEmail);

    const div = document.createElement("div");
    div.className = "issue-card";

    div.innerHTML = `
      <h3>${issue.title}</h3>
      <span class="badge ${issue.category}">${issue.category}</span>
      <p>${issue.desc}</p>
      <span class="status ${issue.status}">Status: ${issue.status}</span><br>
      <strong>Votes:</strong> ${issue.votes}<br>
      <button ${voted ? "disabled" : ""} onclick="voteIssue(${issue.id})">
        ${voted ? "Voted" : "Vote"}
      </button>
    `;

    issueList.appendChild(div);
  });
}

/* =========================
   VOTING LOGIC (EMAIL BASED)
========================= */
function voteIssue(id) {
  const issue = issues.find((i) => i.id === id);
  if (!issue) return;

  const allCategories =
    JSON.parse(localStorage.getItem("studentCategories")) || {};

  let userCategories = allCategories[currentUserEmail];
  if (!Array.isArray(userCategories)) userCategories = [];

  if (userCategories.length === 0) {
    toast("No categories found. Please select again.");
    window.location.href = "select-categories.html";
    return;
  }

  if (!userCategories.includes(issue.category)) {
    toast("You cannot vote in this category.");
    return;
  }

  if (issue.votedBy.includes(currentUserEmail)) {
    toast("You have already voted on this issue.");
    return;
  }

  issue.votes += 1;
  issue.votedBy.push(currentUserEmail);

  localStorage.setItem("issues", JSON.stringify(issues));

  updateDashboardStats();
  renderIssues();
  renderRecentIssues();

  toast("Vote submitted");
}

/* =========================
   DASHBOARD STATS
========================= */
function updateDashboardStats() {
  const total = issues.length;
  const pending = issues.filter((i) => i.status === "Pending").length;
  const resolved = issues.filter((i) => i.status === "Resolved").length;

  if (document.getElementById("total-issues"))
    document.getElementById("total-issues").innerText = total;
  if (document.getElementById("pending-issues"))
    document.getElementById("pending-issues").innerText = pending;
  if (document.getElementById("resolved-issues"))
    document.getElementById("resolved-issues").innerText = resolved;
}

/* =========================
   SELECTED CATEGORIES (FIX)
========================= */
function renderSelectedCategories() {
  const box = document.getElementById("selected-categories");
  if (!box) return;

  const allCategories =
    JSON.parse(localStorage.getItem("studentCategories")) || {};

  let userCategories = allCategories[currentUserEmail];
  if (!Array.isArray(userCategories)) userCategories = [];

  if (userCategories.length === 0) {
    box.innerHTML = "<p>No categories selected</p>";
    return;
  }

  box.innerHTML = userCategories
    .map((cat) => `<span class="badge ${cat}">${cat}</span>`)
    .join(" ");
}

/* =========================
   RECENT ISSUES
========================= */
function renderRecentIssues() {
  const box = document.getElementById("recent-issues");
  if (!box) return;

  const recent = [...issues].slice(-3).reverse();
  if (recent.length === 0) {
    box.innerHTML = "<p>No issues yet.</p>";
    return;
  }

  box.innerHTML = recent
    .map(
      (i) => `
      <div class="issue-card">
        <strong>${i.title}</strong>
        <span class="badge ${i.category}">${i.category}</span>
        <div>Votes: ${i.votes}</div>
      </div>`
    )
    .join("");
}

/* =========================
   TOAST
========================= */
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerText = msg;
  document.body.appendChild(t);

  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => {
    t.classList.remove("show");
    t.remove();
  }, 2000);
}

/* =========================
   INIT
========================= */
updateDashboardStats();
renderIssues();
renderRecentIssues();
renderSelectedCategories();
