//  // Api integration with backend

// document.getElementById("signupForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const username = document.getElementById("signupusername").value;
//   const email = document.getElementById("signupemail").value;
//   const password = document.getElementById("signuppassword").value;
//   const confirmPassword = document.getElementById("confirmpassword").value;
//   const role = document.getElementById("role").value.toLowerCase(); // important!

//   if (password !== confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }

//   const res = await fetch("http://localhost:8081/api/auth/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, email, password, role }),
//   });

//   const data = await res.json();
//   if (res.ok) {
//     alert("Signup successful!");
//   } else {
//     alert("Signup failed: " + data.message);
//   }
// }); 