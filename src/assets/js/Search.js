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