function initWelcomeDashboard() {
  const activeSession = JSON.parse(localStorage.getItem("roblox_active_session"));
  const usernameDisplay = document.getElementById("username-display");
  const detailsCard = document.getElementById("welcome-profile-card");

  if (activeSession && activeSession.username) {
    usernameDisplay.innerText = activeSession.username + "!";

    detailsCard.style.display = "block";
    detailsCard.innerHTML = `
      <div class="profile-card">
          <p><strong>Username / Email:</strong> ${activeSession.username}</p>
          <p><strong>Status:</strong> ✅ Authenticated Custom Session</p>
      </div>
      <button id="btn-welcome-logout" class="login-btn">Sign Out</button>
    `;

    document.getElementById("btn-welcome-logout").addEventListener("click", () => {
      localStorage.removeItem("roblox_active_session");
      window.location.href = "../";
    });

  } else {
    usernameDisplay.innerText = "Guest Access Denied.";
    detailsCard.innerHTML = `
      <p style="color: #dc3545; margin-bottom: 20px;">You are not authorized to view this page panel layout template without logging in.</p>
      <a href="../" class="login-btn" style="text-decoration: none; display: block;">Return to Homepage</a>
    `;
    detailsCard.style.display = "block";
  }
}

window.addEventListener("load", initWelcomeDashboard);