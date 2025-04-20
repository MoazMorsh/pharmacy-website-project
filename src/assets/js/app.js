const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


function goToHome() {
  let baseUrl = window.location.origin;

  // If on GitHub Pages (moazmorsh.github.io), ensure correct project path
  if (baseUrl.includes("moazmorsh.github.io")) {
    baseUrl += "/pharmacy-website-project";
  }

  window.location.href = baseUrl + "/index.html";
}

// show/hide password 
function togglePassword(id, element) {
  const input = document.getElementById(id);
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  element.textContent = isPassword ? '🙈' : '👁️';
}


// signup form validations

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault(); // prevent actual form submission

  const username = document.getElementById('signupusername').value.trim();
  const email = document.getElementById('signupemail').value.trim();
  const password = document.getElementById('signuppassword').value;
  const confirmPassword = document.getElementById('confirmpassword').value;
  const role = document.getElementById('role').value;
  const messageBox = document.getElementById('signupMessage');

  function showMessage(text, type = 'error') {
    messageBox.textContent = text;
    messageBox.className = 'form-message ' + type;
    messageBox.style.display = 'block';

    // Auto hide after 5 seconds
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // Basic checks
  if (!username || !email || !password || !confirmPassword || !role) {
    showMessage('Please fill out all fields.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage('Please enter a valid email.');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('Passwords do not match.');
    return;
  }

  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long.');
    return;
  }

  // ✅ All good
  showMessage('Form submitted successfully! 🎉', 'success');

  document.getElementById('signupForm').reset();

  // Refresh page after 5 seconds (same timing as message)
  setTimeout(() => {
    location.reload();
  }, 1000);
});


// login form validations

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // prevent actual form submission

  const username = document.getElementById('signupusername').value.trim();
  const password = document.getElementById('signuppassword').value;
  const messageBox = document.getElementById('signupMessage');

  function showMessage(text, type = 'error') {
    messageBox.textContent = text;
    messageBox.className = 'form-message ' + type;
    messageBox.style.display = 'block';

    // Auto hide after 5 seconds
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // Basic checks
  if (!username || !password) {
    showMessage("Please enter both username and password.");
    return;
  }

  // ✅ All good
  showMessage('Loggedin successfully! 🎉', 'success');

});