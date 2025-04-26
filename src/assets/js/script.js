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
        document.querySelector('.search-icon img').src = "src/assets/images/search-icon.png";
    } else {
        document.querySelector('.search-icon img').src = "src/assets//images/search-icon-dark.png";
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
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active"); // Add 'active' to the current section link
        }
    });
});

// learn more prescription

function openModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
}


window.onclick = function(event) {
    const modal = document.getElementById('uploadModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// upload button
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');

uploadBtn.addEventListener('click', function() {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please choose a file first!');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  fetch('http://localhost:8081', {  
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Upload successful!', data);
    alert('File uploaded successfully!');

    
    fileInput.value = "";
  })
  .catch(error => {
    console.error('Error uploading file:', error);
    alert('Failed to upload file.');
  });
});

// subscribe learn more

function openModal() {
    document.getElementById('subscribeModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('subscribeModal').style.display = 'none';
  }

  function confirmSubscription() {
    alert('Thank you for subscribing!');
    closeModal();
  }

  // Close modal when clicking outside the modal content
  window.onclick = function(event) {
    const modal = document.getElementById('subscribeModal');
    if (event.target == modal) {
      closeModal();
    }
  }



//   pay popup for subscription

function openModal() {
    document.getElementById('subscribeModal').style.display = 'flex';
  }

  function openPaymentModal() {
    document.getElementById('subscribeModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'flex';
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  function confirmPayment() {
    alert('Payment Successful! Thank you for subscribing.');
    closeModal('paymentModal');
  }

  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  }