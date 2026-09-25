function initMainPage() {
  const activeSession = JSON.parse(localStorage.getItem("roblox_active_session"));
  
  const loggedOutView = document.getElementById("logged-out-view");
  const loggedInView = document.getElementById("logged-in-view");

  if (!loggedOutView || !loggedInView) return;

  if (activeSession && activeSession.username) {
    loggedOutView.style.display = "none";
    loggedInView.style.display = "block";
    
    // Inject authorized status panel layout with the Roblox-style Client Launch Button
    loggedInView.innerHTML = `
        <h2>Launcher Authorized</h2>
        <div class="profile-card">
            <p>Player: <strong>${activeSession.username}</strong></p>
            <p style="font-size: 12px; margin-top: 5px; color: #a0a0a0;">Security Session Status: Valid</p>
        </div>
        
        <!-- CLIENT INTERACTIVE IGNITION BUTTON -->
        <button id="btn-launch-game" class="login-btn success-btn" style="margin-bottom: 12px; gap: 8px;">
           🎮 Play Corrupted Escape
        </button>

        <a href="welcome/welcome.html" class="login-btn secondary-btn" style="text-decoration: none; display: block; margin-bottom: 12px;">View Account Profile</a>
        <button id="btn-logout" class="login-btn">Log Out Session</button>
    `;

    // Hook Up Launch Process Loop
    document.getElementById("btn-launch-game").addEventListener("click", triggerGameClientLaunch);

    // Attach standard session exit clean loop
    const logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("roblox_active_session");
        window.location.reload();
      });
    }
  } else {
    loggedOutView.style.display = "block";
    loggedInView.style.display = "none";
  }
}

// ─── CUSTOM DEEP LINK LAUNCH MECHANICS ───
function triggerGameClientLaunch() {
    // 1. Prompt the player using a mini-confirmation prompt modal
    const hasGame = confirm("Is Corrupted Escape installed on this device?");
    
    if (hasGame) {
        console.log("Attempting hand-shake down to game link registry hooks...");
        
        // 2. Fire custom operating system protocol hook to launch the .exe file
        window.location.href = "corrupted-escape://launch";
    } else {
        // 3. User indicates game isn't found, automatically open your Netlify installation portal
        alert("Redirecting to the game installation portal deployment page.");
        window.open("https://netlify.app", "_blank");
    }
}

window.addEventListener("load", initMainPage);