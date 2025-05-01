// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Global chart references
    let salesChart, productsChart, demographicsChart, salesTypeChart;
    
    // Initialize all charts
    initializeCharts();
    
    // Fetch all data
    fetchSummaryData();
    fetchChartData();
    fetchRecentOrders();
    fetchInventoryAlerts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update profile info if user is logged in
    updateProfileInfo();
});

// Initialize all charts with empty data
function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(salesCtx, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: getChartOptions('Sales ($)')
    });
    
    // Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    productsChart = new Chart(productsCtx, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: getChartOptions('Units Sold')
    });
    
    // Demographics Chart
    const demoCtx = document.getElementById('demographicsChart').getContext('2d');
    demographicsChart = new Chart(demoCtx, {
        type: 'doughnut',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' },
                tooltip: { enabled: true },
                datalabels: {
                    formatter: (value, ctx) => {
                        let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        let percentage = (value * 100 / sum).toFixed(1) + "%";
                        return percentage;
                    },
                    color: '#fff',
                    font: { weight: 'bold' }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
    
    // Sales Type Chart
    const salesTypeCtx = document.getElementById('salesTypeChart').getContext('2d');
    salesTypeChart = new Chart(salesTypeCtx, {
        type: 'pie',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' },
                tooltip: { enabled: true },
                datalabels: {
                    formatter: (value, ctx) => {
                        let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        let percentage = (value * 100 / sum).toFixed(1) + "%";
                        return percentage;
                    },
                    color: '#fff',
                    font: { weight: 'bold' }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// Set up common chart options
function getChartOptions(yAxisLabel) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: yAxisLabel }
            }
        }
    };
}

// Set up all event listeners
function setupEventListeners() {
    // Chart filter controls
    document.getElementById('time-period').addEventListener('change', function() {
        fetchSalesData(this.value);
    });
    
    document.getElementById('product-category').addEventListener('change', function() {
        fetchProductsData(this.value);
    });
    
    document.getElementById('demographic-filter').addEventListener('change', function() {
        fetchDemographicsData(this.value);
    });
    
    document.getElementById('sales-type-period').addEventListener('change', function() {
        fetchSalesTypeData(this.value);
    });
    
    // Action buttons
    document.getElementById('export-report').addEventListener('click', exportReport);
    document.getElementById('refresh-inventory').addEventListener('click', fetchInventoryAlerts);
    document.getElementById('order-filter').addEventListener('click', showOrderFilterOptions);
}

// Fetch summary data for the cards
function fetchSummaryData() {
    // In a real app, you would fetch this from your API
    // Example: fetch('/api/analytics/summary').then(...)
    
    // Simulate API call with timeout
    showLoading('#total-orders', true);
    showLoading('#products-sold', true);
    showLoading('#total-revenue', true);
    showLoading('#new-customers', true);
    
    setTimeout(() => {
        // Update with sample data (replace with real API response)
        document.getElementById('total-orders').textContent = '1,245';
        document.getElementById('products-sold').textContent = '3,892';
        document.getElementById('total-revenue').textContent = '$12,543';
        document.getElementById('new-customers').textContent = '248';
        
        // Hide loading states
        showLoading('#total-orders', false);
        showLoading('#products-sold', false);
        showLoading('#total-revenue', false);
        showLoading('#new-customers', false);
    }, 1000);
}

// Fetch all chart data
function fetchChartData() {
    fetchSalesData('month');
    fetchProductsData('all');
    fetchDemographicsData('age');
    fetchSalesTypeData('month');
}

// Fetch sales data based on time period
function fetchSalesData(timePeriod) {
    showLoading('#sales-loading', true);
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Generate sample data based on time period
        const labels = getLabelsForPeriod(timePeriod);
        const prescriptionData = generateRandomData(labels.length, 500, 2500);
        const otcData = generateRandomData(labels.length, 300, 1800);
        
        // Update chart with new data
        salesChart.data.labels = labels;
        salesChart.data.datasets = [
            {
                label: 'Prescription Sales',
                data: prescriptionData,
                borderColor: '#3C91E6',
                backgroundColor: 'rgba(60, 145, 230, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'OTC Sales',
                data: otcData,
                borderColor: '#FFCE26',
                backgroundColor: 'rgba(255, 206, 38, 0.1)',
                tension: 0.3,
                fill: true
            }
        ];
        salesChart.update();
        showLoading('#sales-loading', false);
    }, 800);
}

// Fetch product data based on category
function fetchProductsData(category) {
    showLoading('#products-loading', true);
    
    setTimeout(() => {
        // Sample product data (replace with API call)
        const products = [
            'Paracetamol 500mg', 'Ibuprofen 200mg', 'Vitamin C 1000mg', 
            'Amoxicillin 500mg', 'Cetirizine 10mg', 'Omeprazole 20mg'
        ];
        const data = generateRandomData(products.length, 100, 500);
        
        // Update chart
        productsChart.data.labels = products;
        productsChart.data.datasets = [{
            label: 'Units Sold',
            data: data,
            backgroundColor: [
                'rgba(60, 145, 230, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 38, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(60, 145, 230, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 38, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }];
        productsChart.update();
        showLoading('#products-loading', false);
    }, 700);
}

// Fetch demographics data based on type
function fetchDemographicsData(type) {
    showLoading('#demographics-loading', true);
    
    setTimeout(() => {
        // Generate sample data based on demographic type
        if (type === 'age') {
            demographicsChart.data.labels = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
            demographicsChart.data.datasets = [{
                data: [15, 30, 25, 15, 10, 5],
                backgroundColor: [
                    'rgba(60, 145, 230, 0.7)',
                    'rgba(100, 180, 250, 0.7)',
                    'rgba(140, 210, 255, 0.7)',
                    'rgba(255, 206, 38, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ]
            }];
        } else if (type === 'gender') {
            demographicsChart.data.labels = ['Male', 'Female', 'Other'];
            demographicsChart.data.datasets = [{
                data: [45, 50, 5],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ]
            }];
        } else { // location
            demographicsChart.data.labels = ['Urban', 'Suburban', 'Rural'];
            demographicsChart.data.datasets = [{
                data: [60, 30, 10],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ]
            }];
        }
        
        demographicsChart.update();
        showLoading('#demographics-loading', false);
    }, 600);
}

// Fetch sales type data (prescription vs OTC)
function fetchSalesTypeData(period) {
    showLoading('#sales-type-loading', true);
    
    setTimeout(() => {
        salesTypeChart.data.labels = ['Prescription', 'Over-the-Counter', 'Wellness'];
        
        if (period === 'month') {
            salesTypeChart.data.datasets = [{
                data: [65, 25, 10],
                backgroundColor: [
                    'rgba(60, 145, 230, 0.7)',
                    'rgba(255, 206, 38, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ]
            }];
        } else if (period === 'quarter') {
            salesTypeChart.data.datasets = [{
                data: [60, 30, 10],
                backgroundColor: [
                    'rgba(60, 145, 230, 0.7)',
                    'rgba(255, 206, 38, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ]
            }];
        } else { // year
            salesTypeChart.data.datasets = [{
                data: [55, 35, 10],
                backgroundColor: [
                    'rgba(60, 145, 230, 0.7)',
                    'rgba(255, 206, 38, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ]
            }];
        }
        
        salesTypeChart.update();
        showLoading('#sales-type-loading', false);
    }, 500);
}

// Fetch recent orders data
function fetchRecentOrders() {
    const tbody = document.getElementById('recent-orders-body');
    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-row">
                <i class='bx bx-loader-circle bx-spin'></i>
                <span>Loading recent orders...</span>
            </td>
        </tr>
    `;
    
    setTimeout(() => {
        // Sample order data (replace with API call)
        const orders = [
            { id: '#PH-7845', customer: 'John Smith', date: 'May 12, 2023', amount: '$45.99', status: 'approved' },
            { id: '#PH-7844', customer: 'Sarah Johnson', date: 'May 12, 2023', amount: '$68.50', status: 'pending' },
            { id: '#PH-7843', customer: 'Michael Brown', date: 'May 11, 2023', amount: '$112.25', status: 'approved' },
            { id: '#PH-7842', customer: 'Emily Davis', date: 'May 11, 2023', amount: '$34.99', status: 'rejected' },
            { id: '#PH-7841', customer: 'Robert Wilson', date: 'May 10, 2023', amount: '$89.75', status: 'approved' }
        ];
        
        // Update table
        tbody.innerHTML = '';
        orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>${order.amount}</td>
                <td><span class="status ${order.status}">${
                    order.status === 'approved' ? 'Delivered' : 
                    order.status === 'pending' ? 'Processing' : 'Cancelled'
                }</span></td>
            `;
            tbody.appendChild(tr);
        });
    }, 900);
}

// Fetch inventory alerts
function fetchInventoryAlerts() {
    const alertsList = document.getElementById('inventory-alerts');
    alertsList.innerHTML = `
        <li class="loading">
            <i class='bx bx-loader-circle bx-spin'></i>
            <span>Loading inventory alerts...</span>
        </li>
    `;
    
    setTimeout(() => {
        // Sample alert data (replace with API call)
        const alerts = [
            { type: 'Low Stock', product: 'Paracetamol 500mg', detail: 'Only 12 units left', completed: false },
            { type: 'Expiring Soon', product: 'Amoxicillin Capsules', detail: 'Expires in 15 days', completed: false },
            { type: 'Restocked', product: 'Ibuprofen Tablets', detail: '200 units added', completed: true },
            { type: 'Low Stock', product: 'Vitamin C Supplements', detail: 'Only 8 units left', completed: false }
        ];
        
        // Update alerts list
        alertsList.innerHTML = '';
        alerts.forEach(alert => {
            const li = document.createElement('li');
            li.className = alert.completed ? 'completed' : 'not-completed';
            li.innerHTML = `
                <div class="alert-item">
                    <p><strong>${alert.type}:</strong> ${alert.product}</p>
                    <span>${alert.detail}</span>
                </div>
                <i class='bx ${alert.completed ? 'bxs-check-circle' : 'bxs-bell-ring'}'></i>
            `;
            alertsList.appendChild(li);
        });
    }, 800);
}

// Helper functions
function getLabelsForPeriod(period) {
    if (period === 'week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if (period === 'month') return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    if (period === 'quarter') return ['Month 1', 'Month 2', 'Month 3'];
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function showLoading(elementId, show) {
    const element = document.querySelector(elementId);
    if (!element) return;
    
    if (show) {
        element.classList.add('loading');
        if (element.tagName === 'H3') {
            element.textContent = 'Loading...';
        }
    } else {
        element.classList.remove('loading');
    }
}

function exportReport() {
    // In a real app, this would generate and download a report
    alert('Exporting report... This would generate a PDF/Excel file in a real application.');
}

function showOrderFilterOptions() {
    // In a real app, this would show filtering options
    alert('Show order filter options...');
}

function updateProfileInfo() {
    // Get user data from localStorage or your auth system
    const username = localStorage.getItem('userName') || 'Admin User';
    const email = localStorage.getItem('userEmail') || 'admin@pharmacy.com';
    const role = localStorage.getItem('userRole') || 'Administrator';
    
    // Update profile popup
    const popup = document.getElementById('profilePopup');
    if (popup) {
        const paragraphs = popup.querySelectorAll('p');
        if (paragraphs.length >= 3) {
            paragraphs[0].innerHTML = `<strong>Username:</strong> ${username}`;
            paragraphs[1].innerHTML = `<strong>Email:</strong> ${email}`;
            paragraphs[2].innerHTML = `<strong>Role:</strong> ${role}`;
        }
    }
}