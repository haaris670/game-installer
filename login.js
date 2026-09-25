function initLogin() {
  const loginForm = document.getElementById("customLoginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;
    const errorDiv = document.getElementById("error-message");

    errorDiv.style.display = "none";

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: emailInput, password: passwordInput })
      });

      const result = await response.json();

      if (!result.success) {
        errorDiv.innerText = result.message;
        errorDiv.style.display = "block";
      } else {
        localStorage.setItem("roblox_active_session", JSON.stringify({
          username: result.username,
          loggedInAt: Date.now()
        }));

        window.location.href = "../";
      }
    } catch (err) {
      errorDiv.innerText = "Error linking login pipeline down to backend server.";
      errorDiv.style.display = "block";
    }
  });
}

window.addEventListener("load", initLogin);