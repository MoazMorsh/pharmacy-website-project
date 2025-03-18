document.addEventListener("DOMContentLoaded", () => {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  sign_up_btn.addEventListener("click", () => {
    console.log("Sign-up button clicked"); // Debugging
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    console.log("Sign-in button clicked"); // Debugging
    container.classList.remove("sign-up-mode");
  });
});

sign_up_btn.addEventListener("touchstart", () => {
  container.classList.add("sign-up-mode");
});
