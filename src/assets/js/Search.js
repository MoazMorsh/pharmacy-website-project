document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const searchButton = document.getElementById("search-button");

    if (searchBar && searchButton) {
        searchButton.addEventListener("click", function () {
            const searchTerm = searchBar.value.toLowerCase();
            if (searchTerm.trim() !== "") {
        // Base path pointing to your project folder
const basePath = "/pharmacy-website-project/";  

// The file path you want to navigate to
const filePath = "src/pages/products.html";

// Ensure that no "src/pages" is added again if already part of the basePath
if (!basePath.endsWith('/')) {
  basePath += '/';  // Make sure basePath ends with a slash
}

// Check if `filePath` contains `src/pages`, if so, remove it from the filePath to avoid duplication
// const finalPath = filePath.replace(/^src\/pages\//, '');

// Navigate to the correct URL
window.location.href = `${basePath}${finalPath}?search=${encodeURIComponent(searchTerm)}`;


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
         // Base path pointing to your project folder
const basePath = "/pharmacy-website-project/";  

// The file path you want to navigate to
const filePath = "src/pages/products.html";

// Ensure that no "src/pages" is added again if already part of the basePath
if (!basePath.endsWith('/')) {
  basePath += '/';  // Make sure basePath ends with a slash
}

// Check if `filePath` contains `src/pages`, if so, remove it from the filePath to avoid duplication
const finalPath = filePath.replace(/^src\/pages\//, '');

// Navigate to the correct URL
window.location.href = `${basePath}${finalPath}?search=${encodeURIComponent(searchTerm)}`;


        }
    });

    document.getElementById("searchBar").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent the page from refreshing
        // Trigger the search button click when Enter key is pressed
        document.getElementById("search-button").click();
    }
    });