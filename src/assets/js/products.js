document.addEventListener("DOMContentLoaded", () => {
    const cartCounter = document.getElementById("cart-counter");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCounter();

    fetch("../components/products.json")
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("product-container");
            products.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("product-card");

                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-card-content">
                        <h3>${product.name}</h3>
                        <p>${product.category}</p>
                    </div>
                    <button class="add-to-cart" data-name="${product.name}">Add to Cart</button>
                `;

                container.appendChild(card);
            });

            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", (e) => {
                    const productName = e.target.getAttribute("data-name");
                    addToCart(productName);
                });
            });
        })
        .catch(error => console.error("Error loading products:", error));

    function addToCart(productName) {
        cart.push(productName);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCounter();
    }

    function updateCartCounter() {
        cartCounter.textContent = cart.length;
    }
});
