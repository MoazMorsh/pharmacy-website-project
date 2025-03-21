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

document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const cartCounter = document.getElementById("cart-counter");

    // Reset cart counter to 0 on refresh
    localStorage.setItem("cartCount", 0);
    cartCounter.textContent = "(0)";

    fetch()
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product-service-item", "container-item", "bg-white");

                productDiv.innerHTML = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-category"><strong>Category:</strong> ${product.category}</p>
                            <p class="product-description">${product.description}</p>
                            <p class="product-price">
                                <strong>Price:</strong> <span class="product-unit-price">${product.price.replace("£", "").trim()}</span> £
                            </p>
                            <p class="total-price"><strong>Total:</strong> <span class="product-total-price">${product.price.replace("£", "").trim()}</span> £</p>
                            <div class="quantity-container">
                                <input type="number" class="product-quantity" value="1" min="1" oninput="updateTotalPrice(this)">
                            </div>
                            <a href="#" class="btn btn-blue" onclick="addToCart('${product.name}', this)">Add to Cart</a>
                        </div>
                    </div>
                `;

                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error loading products:", error));
});

// Function to update total price based on quantity
function updateTotalPrice(inputElement) {
    let quantity = parseInt(inputElement.value) || 1; // Default to 1 if invalid
    let productCard = inputElement.closest(".product-card");
    
    let unitPrice = parseFloat(productCard.querySelector(".product-unit-price").textContent);
    let totalPriceElement = productCard.querySelector(".product-total-price");

    let totalPrice = (unitPrice * quantity).toFixed(2); // Calculate total price
    totalPriceElement.textContent = totalPrice; // Update the total price display
}

// Function to handle adding to cart
function addToCart(productName, buttonElement) {
    let cartCounter = document.getElementById("cart-counter");

    // Get the quantity input value
    let quantityInput = buttonElement.previousElementSibling.querySelector(".product-quantity");
    let quantity = parseInt(quantityInput.value) || 1; // Default to 1 if invalid

    // Update cart counter
    let cartCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
    cartCount += quantity;
    
    localStorage.setItem("cartCount", cartCount);
    cartCounter.textContent = `(${cartCount})`;

    // alert(`${quantity} x ${productName} added to cart!`);
}

