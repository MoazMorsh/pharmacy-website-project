document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("search-button");

    if (searchBar && searchButton) {
        searchButton.addEventListener("click", function () {
            const searchTerm = searchBar.value.toLowerCase();
            if (searchTerm.trim() !== "") {
                const basePath = "/pharmacy-website-project/";  // This is the root directory you want

// Now set the full URL by directly appending the rest
window.location.href = `${basePath}src/pages/products.html?search=${encodeURIComponent(searchTerm)}`;


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
            const basePath = "/pharmacy-website-project/";  // This is the root directory you want

// Now set the full URL by directly appending the rest
window.location.href = `${basePath}src/pages/products.html?search=${encodeURIComponent(searchTerm)}`;


        }
    });

    document.getElementById("searchBar").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent the page from refreshing
        // Trigger the search button click when Enter key is pressed
        document.getElementById("search-button").click();
    }
    });