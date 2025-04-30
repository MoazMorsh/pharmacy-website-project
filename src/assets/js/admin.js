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
  




	  document.addEventListener('DOMContentLoaded', function() {
		// DOM Elements
		const addProductBtn = document.getElementById('addProductBtn');
		const productModal = document.getElementById('productModal');
		const productForm = document.getElementById('productForm');
		const productBanners = document.getElementById('productBanners');
		const closeModalBtn = document.querySelector('.close-modal');
		const cancelBtn = document.querySelector('.cancel-btn');
	
		// Sample product data
		let products = [
			{
				id: 1,
				name: "Pain Relief Tablets",
				category: "Painkillers",
				type: "Tablets",
				ingredients: "Paracetamol 500mg",
				price: 12.99,
				quantity: 100,
				image: "https://via.placeholder.com/300x180?text=Pain+Relief",
				prescription: false
			},
			{
				id: 2,
				name: "Vitamin C Supplements",
				category: "Vitamins",
				type: "Capsules",
				ingredients: "Vitamin C 1000mg",
				price: 19.99,
				quantity: 50,
				image: "https://via.placeholder.com/300x180?text=Vitamin+C",
				prescription: false
			}
		];
	
		// Event Listeners
		addProductBtn.addEventListener('click', openAddModal);
		closeModalBtn.addEventListener('click', closeModal);
		cancelBtn.addEventListener('click', closeModal);
		productForm.addEventListener('submit', handleFormSubmit);
	
		// Initialize
		renderProducts();
	
		// Functions
		function openAddModal() {
			document.querySelector('.modal-title').textContent = "Add New Product";
			productForm.reset();
			document.getElementById('productId').value = '';
			productModal.style.display = 'flex';
		}
	
		function openEditModal(productId) {
			const product = products.find(p => p.id === productId);
			if (product) {
				document.querySelector('.modal-title').textContent = "Edit Product";
				document.getElementById('productId').value = product.id;
				document.getElementById('productName').value = product.name;
				document.getElementById('productCategory').value = product.category;
				document.getElementById('productType').value = product.type;
				document.getElementById('activeIngredients').value = product.ingredients;
				document.getElementById('productPrice').value = product.price;
				document.getElementById('productQuantity').value = product.quantity;
				document.getElementById('productImage').value = product.image;
				document.getElementById('prescriptionRequired').checked = product.prescription;
				productModal.style.display = 'flex';
			}
		}
	
		function closeModal() {
			productModal.style.display = 'none';
		}
	
		function handleFormSubmit(e) {
			e.preventDefault();
			saveProduct();
		}
	
		function saveProduct() {
			const productId = document.getElementById('productId').value;
			const productData = {
				name: document.getElementById('productName').value,
				category: document.getElementById('productCategory').value,
				type: document.getElementById('productType').value,
				ingredients: document.getElementById('activeIngredients').value,
				price: parseFloat(document.getElementById('productPrice').value),
				quantity: parseInt(document.getElementById('productQuantity').value),
				image: document.getElementById('productImage').value,
				prescription: document.getElementById('prescriptionRequired').checked
			};
			
			if (productId) {
				// Update existing product
				const index = products.findIndex(p => p.id === parseInt(productId));
				if (index !== -1) {
					products[index] = { ...products[index], ...productData };
				}
			} else {
				// Add new product
				const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
				products.push({ id: newId, ...productData });
			}
			
			renderProducts();
			closeModal();
		}
	
		function deleteProduct(productId) {
			if (confirm('Are you sure you want to delete this product?')) {
				products = products.filter(p => p.id !== productId);
				renderProducts();
			}
		}
	
		function renderProducts() {
			productBanners.innerHTML = '';
			
			products.forEach(product => {
				const banner = document.createElement('div');
				banner.className = 'product-banner';
				banner.innerHTML = `
					<img src="${product.image}" alt="${product.name}" class="banner-image">
					<div class="banner-details">
						<h3 class="banner-title">${product.name}</h3>
						<p class="banner-category">${product.category} • ${product.type}</p>
						<p class="banner-price">$${product.price.toFixed(2)}</p>
						<div class="banner-actions">
							<button class="banner-btn edit-btn">
								<i class='bx bx-edit'></i> Edit
							</button>
							<button class="banner-btn delete-btn">
								<i class='bx bx-trash'></i> Delete
							</button>
						</div>
					</div>
				`;
				
				// Add event listeners to buttons
				banner.querySelector('.edit-btn').addEventListener('click', () => openEditModal(product.id));
				banner.querySelector('.delete-btn').addEventListener('click', () => deleteProduct(product.id));
				
				productBanners.appendChild(banner);
			});
		}
	
		// Close modal when clicking outside
		window.addEventListener('click', function(e) {
			if (e.target === productModal) {
				closeModal();
			}
		});
	});