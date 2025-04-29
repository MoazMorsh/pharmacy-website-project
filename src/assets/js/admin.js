const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})



function goToHome() {
	let baseUrl = window.location.origin;
  
	// If on GitHub Pages (moazmorsh.github.io), ensure correct project path
	if (baseUrl.includes("moazmorsh.github.io")) {
	  baseUrl += "/pharmacy-website-project";
	}
  
	window.location.href = baseUrl + "/index.html";
  }

// profile icon for user information

const profileIcon = document.getElementById('profileIcon');
const profilePopup = document.getElementById('profilePopup');

profileIcon.addEventListener('click', (e) => {
  e.preventDefault();
  profilePopup.style.display = profilePopup.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', function (e) {
  if (!profileIcon.contains(e.target) && !profilePopup.contains(e.target)) {
    profilePopup.style.display = 'none';
  }
});

function logout() {
	if (confirm('Are you sure you want to logout?')) {
		localStorage.clear();
		sessionStorage.clear();
		console.log("✅ User logged out successfully.");
		window.location.href = '/pages/login.html';
	}
	}

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
  

