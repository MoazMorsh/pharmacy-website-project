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

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault(); // prevent real form submission

  const username = document.getElementById('signupusername').value.trim();
  const email = document.getElementById('signupemail').value.trim();
  const password = document.getElementById('signuppassword').value;
  const confirmPassword = document.getElementById('confirmpassword').value;
  const role = document.getElementById('signuprole').value;
  const messageBox = document.getElementById('signupMessage');

  function showMessage(text, type = 'error') {
    messageBox.textContent = text;
    messageBox.className = 'form-message ' + type;
    messageBox.style.display = 'block';
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // ✅ Validation
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

  // ✅ Now send data using AJAX (XMLHttpRequest)

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/auth/register', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (xhr.status === 201) {
      const response = JSON.parse(xhr.responseText);
      console.log('✅ Signup Success:', response);
      showMessage('Signup successful! ✅', 'success');
      // Optionally redirect after success
      // window.location.href = "/login.html";
    } else {
      const response = JSON.parse(xhr.responseText);
      console.error('❌ Signup Error:', response);
      showMessage(response.error || 'Signup failed.');
    }
  };

  xhr.onerror = function () {
    console.error('❌ AJAX Network Error');
    showMessage('Network error. Please try again.');
  };

  xhr.send(JSON.stringify({
    username,
    email,
    password,
    role: role.toLowerCase() // match backend expected 'patient', 'pharmacist', 'admin'
  }));
});


document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // prevent real form submission

  const username = document.getElementById('loginusername').value.trim();
  const password = document.getElementById('loginpassword').value;
  const role = document.getElementById('role').value;
  const messageBox = document.getElementById('signupMessage'); // You can create a new message div for login if needed

  function showMessage(text, type = 'error') {
    messageBox.textContent = text;
    messageBox.className = 'form-message ' + type;
    messageBox.style.display = 'block';
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  }

  // ✅ Validation
  if (!username || !password || !role) {
    showMessage('Please fill out all fields.');
    return;
  }

  if (password.length < 6) {
    showMessage('Password must be at least 6 characters long.');
    return;
  }

  // ✅ Now send login data using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/auth/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (xhr.status === 201) {
      const response = JSON.parse(xhr.responseText);
      console.log('✅ Login Success:', response);
      showMessage('Login successful! ✅', 'success');
      // Optionally save token or redirect
      localStorage.setItem('userToken', response.token);
      window.location.href = "/";
    } else {
      const response = JSON.parse(xhr.responseText);
      console.error('❌ Login Error:', response);
      showMessage(response.error || 'Login failed.');
    }
  };

  xhr.onerror = function () {
    console.error('❌ AJAX Network Error');
    showMessage('Network error. Please try again.');
  };

  xhr.send(JSON.stringify({
    email: username, // here your backend expects 'email', so we send username as email
    password,
    role: role.toLowerCase() // backend expects 'patient', 'pharmacist', 'admin'
  }));
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