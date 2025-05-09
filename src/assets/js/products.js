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
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active"); // Add 'active' to the current section link
        }
    });
});

// products page js
document.addEventListener("DOMContentLoaded", async function () {
    const SUPABASE_URL = "https://kzvtniajqclodwlokxww.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dnRuaWFqcWNsb2R3bG9reHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTQyODUsImV4cCI6MjA1Nzk3MDI4NX0.Q2jWPiZFE371GJaKsPb92yFpLSshiT4laz3wT6gfr4M";
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    let cart = [];

    // ✅ Load cart from localStorage ONCE here
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    function updateCartCounter() {
        const counter = document.getElementById("cart-counter");
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;
    }

    updateCartCounter(); // ✅ Call it right after restoring cart

    async function loadProducts(category = "") {
        try {
            let query = supabase.from("medicine").select("name, price, active_ingredients, img_URL, category, type");
    
            if (category) {
                query = query.eq("category", category);
            }
    
            const { data, error } = await query;
    
            if (error) {
                console.error("❌ Error fetching products:", error.message);
                return;
            }
    
            const container = document.getElementById("product-container");
            container.innerHTML = "";
    
            if (data.length === 0) {
                container.innerHTML = "<p>No products found for this category.</p>";
                return;
            }
    
            data.forEach(medicine => {
                let card = document.createElement("div");
                card.classList.add("product-card");
                // Inside your product card creation code, add these data attributes:
                card.dataset.category = medicine.category;
                card.dataset.type = medicine.type;
                card.dataset.ingredients = medicine.active_ingredients;
                card.dataset.price = medicine.price;
    
                card.innerHTML = `
                    <img src="${medicine.img_URL}" alt="${medicine.name}" class="product-img">
                    <h3 class="product-name">${medicine.name}</h3>
                    <p class="product-price">£${medicine.price}</p>
                    <p class="product-ingredients">${medicine.active_ingredients}</p>
                    <p class="category">${medicine.category}</p>
                    <input type="number" min="1" value="1" class="product-quantity">
                    <button class="add-to-cart">Add to Cart</button>
                `;
    
                container.appendChild(card);
    
                const button = card.querySelector(".add-to-cart");
                button.addEventListener("click", () => {
                    const quantity = parseInt(card.querySelector(".product-quantity").value);
                    addToCart(medicine.name, medicine.price, quantity);
                });
            });
    
        } catch (err) {
            console.error("❌ Unexpected error:", err);
        }
    }

    document.getElementById("categoryFilter").addEventListener("change", function () {
        const selectedCategory = this.value;
        loadProducts(selectedCategory);
    });
    

    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }

        updateCartCounter();
        localStorage.setItem("cart", JSON.stringify(cart)); // Store cart in local storage
    }

    loadProducts(); // Load products when page is ready
});
    // document.getElementById('clearSearch').addEventListener('click', function() {
   //  document.getElementById('searchBar').value = '';
    // Clear search functionality
    const clearSearch = document.getElementById('clearSearch');
    const searchBar = document.getElementById('searchBar');
    
    clearSearch.addEventListener('click', () => {
        searchBar.value = '';
        searchBar.focus();
        clearSearch.style.opacity = '0';
        clearSearch.style.pointerEvents = 'none';
    });
    
    searchBar.addEventListener('input', function() {
        const hasText = this.value.length > 0;
        clearSearch.style.opacity = hasText ? '1' : '0';
        clearSearch.style.pointerEvents = hasText ? 'auto' : 'none';
    });
  
    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.clear();
            sessionStorage.clear();
            console.log("✅ User logged out successfully.");
            window.location.href = '/pages/login.html';
        }
        }
