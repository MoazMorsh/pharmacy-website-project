// Supabase client initialization
const SUPABASE_URL = "https://kzvtniajqclodwlokxww.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dnRuaWFqcWNsb2R3bG9reHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTQyODUsImV4cCI6MjA1Nzk3MDI4NX0.Q2jWPiZFE371GJaKsPb92yFpLSshiT4laz3wT6gfr4M";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let cart = [];
let allProducts = [];
let currentFilter = '';
let isInitialLoad = true;

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    currentFilter = urlParams.get('search') || '';

    // Load products
    async function loadProducts() {
        try {
            // Only fetch if we haven't loaded products yet
            if (allProducts.length === 0) {
                const { data, error } = await supabase
                    .from("medicine")
                    .select("name, price, active_ingredients, img_URL");

                if (error) {
                    console.error("❌ Error fetching products:", error.message);
                    return;
                }

                if (!data || data.length === 0) {
                    console.warn("⚠️ No products found in the database.");
                    return;
                }

                allProducts = data;
            }

            applyFilter();
            isInitialLoad = false;

        } catch (err) {
            console.error("❌ Unexpected error:", err);
        }
    }

    // Apply filtering
    function applyFilter() {
        const lowerSearchTerm = currentFilter.toLowerCase();
        const filteredProducts = currentFilter
            ? allProducts.filter(med =>
                med.name.toLowerCase().includes(lowerSearchTerm) ||
                med.active_ingredients.toLowerCase().includes(lowerSearchTerm)
            )
            : allProducts;

        console.log("Filtered Products: ", filteredProducts);
        renderProducts(filteredProducts);
    }

    // Render products
    function renderProducts(productList) {
        const container = document.getElementById("product-container");
        if (!container) return;
        
        container.innerHTML = "";

        console.log("Rendering Products: ", productList);

        productList.forEach(medicine => {
            let card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${medicine.img_URL}" alt="${medicine.name}" class="product-img">
                <h3 class="product-name">${medicine.name}</h3>
                <p class="product-price">$${medicine.price}</p>
                <p class="product-ingredients">${medicine.active_ingredients}</p>
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
    }

    // Add to cart
    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCartCounter();
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Update cart counter
    function updateCartCounter() {
        const counter = document.getElementById("cart-counter");
        if (counter) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            counter.textContent = totalItems;
        }
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCounter();
    }

    // Search functionality
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("search-button");

    if (searchBar && searchButton) {
        if (currentFilter) searchBar.value = currentFilter;
        
        searchButton.addEventListener("click", function () {
            const input = searchBar.value.trim();
            currentFilter = input;
            applyFilter();
            
            // Update URL without reload if you want to maintain single-page behavior
            const newUrl = input 
                ? `/src/pages/products.html?search=${encodeURIComponent(input)}`
                : `/src/pages/products.html`;
            window.history.pushState({}, '', newUrl);
        });

        searchBar.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                searchButton.click();
            }
        });
    }

    // Finally, load products
    await loadProducts();
});