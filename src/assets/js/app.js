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


// signup form validations and API call

document.getElementById('signupForm').addEventListener('submit', async function (e) {
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

  // Validations
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

  // ✅ All good, send data to backend
  try {
    const response = await fetch('http://localhost:8081/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role
      })
    });

    const result = await response.json();

    if (response.ok) {
      showMessage('Registered successfully! 🎉', 'success');
      document.getElementById('signupForm').reset();

      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      showMessage(result.message || 'Registration failed.');
    }

  } catch (err) {
    showMessage('Error connecting to the server.');
    console.error(err);
  }
});

// login form validations

// document.getElementById('loginForm').addEventListener('submit', function (e) {
//   e.preventDefault(); // prevent actual form submission

//   const username = document.getElementById('signupusername').value.trim();
//   const password = document.getElementById('signuppassword').value;
//   const messageBox = document.getElementById('signupMessage');

//   function showMessage(text, type = 'error') {
//     messageBox.textContent = text;
//     messageBox.className = 'form-message ' + type;
//     messageBox.style.display = 'block';

//     // Auto hide after 5 seconds
//     setTimeout(() => {
//       messageBox.style.display = 'none';
//     }, 5000);
//   }

//   // Basic checks
//   if (!username || !password) {
//     showMessage("Please enter both username and password.");
//     return;
//   }

//   // ✅ All good
//   showMessage('Loggedin successfully! 🎉', 'success');

// });