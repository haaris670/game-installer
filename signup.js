function initSignup() {
  const formElement = document.getElementById("signupForm");
  if (!formElement) return;

  formElement.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const emailInput = document.getElementById("signup-email").value;
    const passwordInput = document.getElementById("signup-password").value;
    const errorDiv = document.getElementById("error-message");
    const successDiv = document.getElementById("success-message");

    errorDiv.style.display = "none";
    successDiv.style.display = "none";

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: emailInput, password: passwordInput })
      });

      const result = await response.json();

      if (!result.success) {
        errorDiv.innerText = result.message;
        errorDiv.style.display = "block";
      } else {
        successDiv.innerText = result.message;
        successDiv.style.display = "block";
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 1800);
      }
    } catch (err) {
      errorDiv.innerText = "Could not communicate with authentication server.";
      errorDiv.style.display = "block";
    }
  });
}

window.addEventListener("load", initSignup);