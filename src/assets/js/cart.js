// main page  js
// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
});

// changing search icon image on window resize
window.addEventListener('resize', changeSearchIcon);
function changeSearchIcon(){
    let winSize = window.matchMedia("(min-width: 1200px)");
    if(winSize.matches){
        document.querySelector('.search-icon img').src = "../assets/images/search-icon.png";
    } else {
        document.querySelector('.search-icon img').src = "../assets//images/search-icon-dark.png";
    }
}
changeSearchIcon();

// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});



// Select all sections and navbar links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Adjust based on navbar height
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active"); // Remove 'active' from all links
        if (link.getAttribute("href") === `#£{currentSection}`) {
            link.classList.add("active"); // Add 'active' to the current section link
        }
    });
});

function togglePopup() {
    const popup = document.getElementById('profilePopup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  }

  // Optional: Close the popup if clicked outside
  window.onclick = function(event) {
    const popup = document.getElementById('profilePopup');
    const profileIcon = document.querySelector('.profile-icon');
    if (!popup.contains(event.target) && !profileIcon.contains(event.target)) {
      popup.style.display = 'none';
    }
  }


  function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        sessionStorage.clear();
        console.log("✅ User logged out successfully.");
        window.location.href = '/pages/login.html';
    }
    }


// ---------------------------cart page js----------------------------------------------------------------



