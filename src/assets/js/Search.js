document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("search-button");

    if (searchBar && searchButton) {
        searchButton.addEventListener("click", function () {
            const searchTerm = searchBar.value.toLowerCase();
            if (searchTerm.trim() !== "") {
        // Base path for your project (ensure it's correct)
const basePath = "/pharmacy-website-project/";

// The correct file path relative to the project root
const filePath = "src/pages/products.html";

// Get the current URL and check if it's already in the correct format
const currentPath = window.location.pathname;

// If the current path doesn't already include `src/pages/products.html`, append it
if (!currentPath.includes(filePath)) {
  window.location.href = `${basePath}${filePath}?search=${encodeURIComponent(searchTerm)}`;
} else {
  // If already on the correct path, just append the search query
  window.location.href = `${currentPath}?search=${encodeURIComponent(searchTerm)}`;
}

            }
        });

        searchBar.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                searchButton.click();
            }
        });
    }
});
    document.getElementById("search-button").addEventListener("click", function () {
        const searchTerm = document.getElementById("searchBar").value.trim();
        if (searchTerm !== "") {
         // Base path for your project (ensure it's correct)
const basePath = "/pharmacy-website-project/";

// The correct file path relative to the project root
const filePath = "src/pages/products.html";

// Get the current URL and check if it's already in the correct format
const currentPath = window.location.pathname;

// If the current path doesn't already include `src/pages/products.html`, append it
if (!currentPath.includes(filePath)) {
  window.location.href = `${basePath}${filePath}?search=${encodeURIComponent(searchTerm)}`;
} else {
  // If already on the correct path, just append the search query
  window.location.href = `${currentPath}?search=${encodeURIComponent(searchTerm)}`;
}


        }
    });

    document.getElementById("searchBar").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent the page from refreshing
        // Trigger the search button click when Enter key is pressed
        document.getElementById("search-button").click();
    }
    });




  // Supabase client initialization (ensure this is only initialized once globally)
  const SUPABASE_URL = "https://kzvtniajqclodwlokxww.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dnRuaWFqcWNsb2R3bG9reHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTQyODUsImV4cCI6MjA1Nzk3MDI4NX0.Q2jWPiZFE371GJaKsPb92yFpLSshiT4laz3wT6gfr4My";
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  let cart = [];
  let allProducts = [];

  document.addEventListener("DOMContentLoaded", async function () {
      const urlParams = new URLSearchParams(window.location.search);
      const searchTerm = urlParams.get('search') || '';

      // Load products from the database
      async function loadProducts() {
          try {
              const { data, error } = await supabase
                  .from("medicine")
                  .select("name, price, active_ingredients, img_URL");

              if (error) {
                  console.error("❌ Error fetching products:", error.message);
                  return;
              }

              if (data.length === 0) {
                  console.warn("⚠️ No products found in the database.");
                  return;
              }

              allProducts = data;

              // Filter the products based on search term
              const filteredProducts = searchTerm
                  ? data.filter(med =>
                      med.name.toLowerCase().includes(searchTerm) ||
                      med.active_ingredients.toLowerCase().includes(searchTerm)
                  )
                  : data;

              // Log for debugging
              console.log("Filtered Products: ", filteredProducts);

              // Render filtered products
              renderProducts(filteredProducts);

          } catch (err) {
              console.error("❌ Unexpected error:", err);
          }
      }

      // Add item to cart
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

      // Render products to the page
      function renderProducts(productList) {
          const container = document.getElementById("product-container");

          // Clear the container to avoid displaying old products
          container.innerHTML = "";

          // Log the products being rendered for debugging
          console.log("Rendering Products: ", productList);

          // Render each product
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

              // Add event listener for adding items to cart
              const button = card.querySelector(".add-to-cart");
              button.addEventListener("click", () => {
                  const quantity = parseInt(card.querySelector(".product-quantity").value);
                  addToCart(medicine.name, medicine.price, quantity);
              });
          });
      }

      // Update the cart counter
      function updateCartCounter() {
          const counter = document.getElementById("cart-counter");
          const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
          counter.textContent = totalItems;
      }

      // Load cart from localStorage on page load
      document.addEventListener("DOMContentLoaded", () => {
          const savedCart = localStorage.getItem("cart");
          if (savedCart) {
              cart = JSON.parse(savedCart);
              updateCartCounter();
          }
      });

      // Call the loadProducts function when the page is ready
      loadProducts(); // Load products when page is ready
  });