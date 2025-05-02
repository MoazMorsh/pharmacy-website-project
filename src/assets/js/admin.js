// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // SIDEBAR MENU ACTIVE STATE
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    if (allSideMenu.length > 0) {
        allSideMenu.forEach(item => {
            item.addEventListener('click', function() {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                });
                item.parentElement.classList.add('active');
            });
        });
    }

    // TOGGLE SIDEBAR - Single implementation
    const menuToggle = document.querySelector('.bx-menu, #content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('hide');
            
            // Update content area
            const content = document.getElementById('content');
            if (content) {
                content.style.width = sidebar.classList.contains('hide') 
                    ? 'calc(100% - 80px)' 
                    : 'calc(100% - 280px)';
                content.style.left = sidebar.classList.contains('hide') 
                    ? '80px' 
                    : '280px';
            }
        });
    }

    // SEARCH FORM TOGGLE (MOBILE)
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    
    if (searchButton && searchButtonIcon && searchForm) {
        searchButton.addEventListener('click', function(e) {
            if(window.innerWidth < 576) {
                e.preventDefault();
                searchForm.classList.toggle('show');
                searchButtonIcon.classList.toggle('bx-x');
                searchButtonIcon.classList.toggle('bx-search');
            }
        });
    }

    // RESPONSIVE BEHAVIOR
    function handleResponsive() {
        if (!sidebar) return;
        
        if (window.innerWidth < 768) {
            sidebar.classList.add('hide');
            if (searchForm && searchButtonIcon) {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
                searchForm.classList.remove('show');
            }
        } else {
            sidebar.classList.remove('hide');
        }
    }

    // Initial check
    handleResponsive();
    
    // Window resize listener
    window.addEventListener('resize', handleResponsive);

    // DARK MODE TOGGLE
    const switchMode = document.getElementById('switch-mode');
    if (switchMode) {
        switchMode.addEventListener('change', function() {
            document.body.classList.toggle('dark', this.checked);
        });
    }

    // PROFILE POPUP - Single implementation
    const profileIcon = document.querySelector('.profile-icon');
    const profilePopup = document.getElementById('profilePopup');
    
    if (profileIcon && profilePopup) {
        profileIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            profilePopup.style.display = profilePopup.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function(e) {
            if (!profileIcon.contains(e.target) && !profilePopup.contains(e.target)) {
                profilePopup.style.display = 'none';
            }
        });
    }
});

// GLOBAL FUNCTIONS
function goToHome() {
    let baseUrl = window.location.origin;
    if (baseUrl.includes("moazmorsh.github.io")) {
        baseUrl += "/pharmacy-website-project";
    }
    window.location.href = baseUrl + "/index.html";
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/pages/login.html';
    }
}

// PROFILE POPUP - Corrected implementation
const profileIcon = document.querySelector('.profile-icon');
const profilePopup = document.getElementById('profilePopup');

if (profileIcon && profilePopup) {
    // Toggle popup visibility
    const togglePopup = () => {
        profilePopup.style.display = profilePopup.style.display === 'block' ? 'none' : 'block';
    };

    // Click event for profile icon
    profileIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event from bubbling to window
        togglePopup();
    });

    // Click event for document to close when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileIcon.contains(e.target) && !profilePopup.contains(e.target)) {
            profilePopup.style.display = 'none';
        }
    });

    // Close popup when clicking on logout link
    const logoutLink = document.querySelector('.logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            profilePopup.style.display = 'none';
        });
    }
}