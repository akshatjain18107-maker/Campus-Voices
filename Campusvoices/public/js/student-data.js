/* =========================
   GLOBAL STATE
========================= */
let issues = JSON.parse(localStorage.getItem("issues")) || [];
let studentCategory = localStorage.getItem("studentCategory") || "";

/* =========================
   NAVIGATION
========================= */
function showSection(section) {
  const sections = ["dashboard", "vote", "raise", "notification"];

  sections.forEach(sec => {
    const el = document.getElementById(sec + "-section");
    if (el) el.style.display = "none";
  });

  document.getElementById(section + "-section").style.display = "block";

  // active sidebar state
  document.querySelectorAll("#sidebar ul li").forEach(li =>
    li.classList.remove("active")
  );

  const map = { dashboard: 0, vote: 1, raise: 2, notification: 3 };
  const items = document.querySelectorAll("#sidebar ul li");
  if (items[map[section]]) items[map[section]].classList.add("active");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

function goToAdmin() {
  window.location.href = "admin/admin-login.html";
}

/* =========================
   CATEGORY
========================= */
function saveCategory() {
  const select = document.getElementById("student-category");
  const value = select.value;

  if (!value) {
    toast("Please select your category");
    return;
  }

  studentCategory = value;
  localStorage.setItem("studentCategory", value);
  toast("Category saved successfully");
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
      votedBy: []
    };

    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    form.reset();
    updateDashboardStats();
    showSection("vote");
    renderIssues();
    toast("Issue raised successfully");
  });
}

/* =========================
   RENDER ISSUES
========================= */
function renderIssues() {
  const issueList = document.getElementById("issue-list");
  issueList.innerHTML = "";

  if (issues.length === 0) {
    issueList.innerHTML = `
      <div class="issue-card">
        <h3>No issues yet</h3>
        <p>Be the first to raise an issue and start the discussion.</p>
      </div>
    `;
    return;
  }

  // Priority sorting
  issues.sort((a, b) => b.votes - a.votes);

  issues.forEach(issue => {
    const voted = issue.votedBy.includes("student");

    const div = document.createElement("div");
    div.className = "issue-card";

    div.innerHTML = `
      <h3>${issue.title}</h3>
      <span class="badge ${issue.category}">${issue.category}</span>
      <p>${issue.desc}</p>

      <span class="status ${issue.status}">
        Status: ${issue.status}
      </span><br>

      <strong>Votes:</strong> ${issue.votes}<br>

      <button ${voted ? "disabled" : ""} onclick="voteIssue(${issue.id})">
        ${voted ? "Voted" : "Vote"}
      </button>
    `;

    issueList.appendChild(div);
  });
}

/* =========================
   VOTING LOGIC
========================= */
function voteIssue(id) {
  const issue = issues.find(i => i.id === id);
  if (!issue) return;

  if (!studentCategory) {
    toast("Please select your category first");
    showSection("dashboard");
    return;
  }

  if (issue.category !== studentCategory) {
    toast("You can only vote on issues from your category");
    return;
  }

  if (issue.votedBy.includes("student")) {
    toast("You have already voted");
    return;
  }

  issue.votes += 1;
  issue.votedBy.push("student");

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
  const pending = issues.filter(i => i.status === "Pending").length;
  const resolved = issues.filter(i => i.status === "Resolved").length;

  const t = document.getElementById("total-issues");
  const p = document.getElementById("pending-issues");
  const r = document.getElementById("resolved-issues");

  if (t) t.innerText = total;
  if (p) p.innerText = pending;
  if (r) r.innerText = resolved;
}

/* =========================
   TOAST NOTIFICATION
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
function renderRecentIssues(){
  const box = document.getElementById("recent-issues");
  if(!box) return;

  const recent = [...issues].slice(-3).reverse();
  if(recent.length === 0){
    box.innerHTML = "<p>No issues yet.</p>";
    return;
  }

  box.innerHTML = recent.map(i=>`
    <div class="issue-card">
      <strong>${i.title}</strong>
      <span class="badge ${i.category}">${i.category}</span>
      <div>Votes: ${i.votes}</div>
    </div>
  `).join("");
}
