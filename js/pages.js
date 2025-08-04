// Pages JavaScript Functionality

// Tab Switching
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Show/hide custom date range for reports
    if (tabName === 'sales') {
        const reportType = document.getElementById('reportType');
        if (reportType) {
            toggleCustomDateRange();
        }
    }
}

// Toggle custom date range visibility
function toggleCustomDateRange() {
    const reportType = document.getElementById('reportType');
    const customDateRange = document.getElementById('customDateRange');
    
    if (reportType && customDateRange) {
        if (reportType.value === 'custom') {
            customDateRange.style.display = 'block';
        } else {
            customDateRange.style.display = 'none';
        }
    }
}

// Stock Management Functions
function searchStock() {
    const searchTerm = document.getElementById('stockSearch').value.toLowerCase();
    const results = document.getElementById('stockResults');
    
    // Mock search results
    const mockResults = [
        {
            name: 'Paracetamol 500mg',
            batch: 'PAR001',
            quantity: 50,
            expiry: '2024-12-15',
            status: 'In Stock'
        },
        {
            name: 'Amoxicillin 250mg',
            batch: 'AMX002',
            quantity: 30,
            expiry: '2025-03-20',
            status: 'In Stock'
        },
        {
            name: 'Cough Syrup',
            batch: 'CS003',
            quantity: 5,
            expiry: '2024-11-30',
            status: 'Low Stock'
        }
    ];
    
    const filteredResults = mockResults.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.batch.toLowerCase().includes(searchTerm)
    );
    
    displayStockResults(filteredResults);
}

function displayStockResults(results) {
    const resultsContainer = document.getElementById('stockResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';
    
    results.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item';
        
        const statusClass = item.status === 'Low Stock' ? 'warning' : 'success';
        
        resultDiv.innerHTML = `
            <div class="result-info">
                <h4>${item.name}</h4>
                <p>Batch: ${item.batch} | Quantity: ${item.quantity}</p>
                <p>Expiry: ${item.expiry}</p>
                <span class="status-badge ${statusClass}">${item.status}</span>
            </div>
            <div class="result-actions">
                <button class="btn btn-small btn-outline" onclick="editStock('${item.batch}')">Edit</button>
                <button class="btn btn-small btn-secondary" onclick="viewStock('${item.batch}')">View</button>
            </div>
        `;
        
        resultsContainer.appendChild(resultDiv);
    });
}

function addMedicine() {
    const form = document.getElementById('addMedicineForm');
    if (!form) return;
    
    // Get form data
    const formData = new FormData(form);
    const medicineData = Object.fromEntries(formData);
    
    // Mock success message
    showNotification('Medicine added successfully!', 'success');
    
    // Reset form
    form.reset();
}

function editStock(batchId) {
    // Switch to update tab and populate form
    switchTabByName('update');
    
    // Mock populate form with batch data
    const updateForm = document.getElementById('updateStockForm');
    if (updateForm) {
        // Populate form fields with existing data
        showNotification(`Editing stock for batch: ${batchId}`, 'info');
    }
}

function viewStock(batchId) {
    showNotification(`Viewing details for batch: ${batchId}`, 'info');
}

// Customer Management Functions
function searchCustomers() {
    const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
    const results = document.getElementById('customerResults');
    
    // Mock customer data
    const mockCustomers = [
        {
            name: 'Rajesh Kumar',
            phone: '+91 9876543210',
            email: 'rajesh@email.com',
            totalPurchases: '₹15,420',
            lastVisit: '2024-12-15'
        },
        {
            name: 'Priya Sharma',
            phone: '+91 9876543211',
            email: 'priya@email.com',
            totalPurchases: '₹8,750',
            lastVisit: '2024-12-14'
        },
        {
            name: 'Amit Patel',
            phone: '+91 9876543212',
            email: 'amit@email.com',
            totalPurchases: '₹22,100',
            lastVisit: '2024-12-13'
        }
    ];
    
    const filteredResults = mockCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
    );
    
    displayCustomerResults(filteredResults);
}

function displayCustomerResults(results) {
    const resultsContainer = document.getElementById('customerResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = '';
    
    results.forEach(customer => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item';
        
        resultDiv.innerHTML = `
            <div class="result-info">
                <h4>${customer.name}</h4>
                <p>Phone: ${customer.phone}</p>
                <p>Email: ${customer.email}</p>
                <p>Total Purchases: ${customer.totalPurchases}</p>
                <p>Last Visit: ${customer.lastVisit}</p>
            </div>
            <div class="result-actions">
                <button class="btn btn-small btn-outline" onclick="editCustomer('${customer.phone}')">Edit</button>
                <button class="btn btn-small btn-secondary" onclick="viewPurchaseHistory('${customer.phone}')">History</button>
            </div>
        `;
        
        resultsContainer.appendChild(resultDiv);
    });
}

function addCustomer() {
    const form = document.getElementById('addCustomerForm');
    if (!form) return;
    
    // Get form data
    const formData = new FormData(form);
    const customerData = Object.fromEntries(formData);
    
    // Mock success message
    showNotification('Customer added successfully!', 'success');
    
    // Reset form
    form.reset();
}

function editCustomer(phone) {
    showNotification(`Editing customer: ${phone}`, 'info');
}

function viewPurchaseHistory(phone) {
    // Switch to purchase history tab
    switchTabByName('history');
    showNotification(`Loading purchase history for: ${phone}`, 'info');
}

// Billing Functions
function searchMedicines() {
    const searchTerm = document.getElementById('medicineSearch').value.toLowerCase();
    const suggestions = document.getElementById('medicineSuggestions');
    
    if (searchTerm.length < 2) {
        suggestions.style.display = 'none';
        return;
    }
    
    suggestions.style.display = 'block';
    
    // Filter existing suggestions based on search term
    const suggestionItems = suggestions.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
        const medicineName = item.querySelector('strong').textContent.toLowerCase();
        if (medicineName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function selectMedicine(name, batch, price, stock) {
    // Add medicine to selected list
    const medicineList = document.getElementById('medicineList');
    
    // Check if medicine already exists
    const existingItems = medicineList.querySelectorAll('.medicine-item');
    for (let item of existingItems) {
        if (item.querySelector('h4').textContent === name) {
            showNotification('Medicine already added!', 'warning');
            return;
        }
    }
    
    const medicineItem = document.createElement('div');
    medicineItem.className = 'medicine-item';
    
    medicineItem.innerHTML = `
        <div class="medicine-info">
            <h4>${name}</h4>
            <p>Batch: ${batch} | Available: ${stock}</p>
        </div>
        <div class="medicine-controls">
            <input type="number" value="1" min="1" max="${stock}" class="qty-input" onchange="updateItemTotal(this)">
            <span class="price">₹${price.toFixed(2)}</span>
            <span class="total">₹${price.toFixed(2)}</span>
            <button type="button" class="remove-btn" onclick="removeMedicine(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    medicineList.appendChild(medicineItem);
    
    // Hide suggestions
    document.getElementById('medicineSuggestions').style.display = 'none';
    document.getElementById('medicineSearch').value = '';
    
    // Update totals
    calculateTotal();
}

function removeMedicine(button) {
    button.closest('.medicine-item').remove();
    calculateTotal();
}

function updateItemTotal(input) {
    const medicineItem = input.closest('.medicine-item');
    const price = parseFloat(medicineItem.querySelector('.price').textContent.replace('₹', ''));
    const quantity = parseInt(input.value);
    const total = price * quantity;
    
    medicineItem.querySelector('.total').textContent = `₹${total.toFixed(2)}`;
    calculateTotal();
}

function calculateTotal() {
    const medicineItems = document.querySelectorAll('.medicine-item');
    let subtotal = 0;
    
    medicineItems.forEach(item => {
        const total = parseFloat(item.querySelector('.total').textContent.replace('₹', ''));
        subtotal += total;
    });
    
    const discount = parseFloat(document.getElementById('discount')?.value || 0);
    const taxRate = 0.18; // 18% GST
    const tax = (subtotal - discount) * taxRate;
    const totalAmount = subtotal - discount + tax;
    
    // Update display
    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    }
    if (document.getElementById('tax')) {
        document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    }
    if (document.getElementById('totalAmount')) {
        document.getElementById('totalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
    }
}

function calculateChange() {
    const totalAmount = parseFloat(document.getElementById('totalAmount').textContent.replace('₹', ''));
    const amountReceived = parseFloat(document.getElementById('amountReceived').value || 0);
    const change = amountReceived - totalAmount;
    
    const changeDisplay = document.getElementById('changeDisplay');
    const changeAmount = document.getElementById('changeAmount');
    
    if (change > 0) {
        changeDisplay.style.display = 'block';
        changeAmount.textContent = `₹${change.toFixed(2)}`;
    } else {
        changeDisplay.style.display = 'none';
    }
}

function clearSale() {
    // Clear medicine list
    document.getElementById('medicineList').innerHTML = '';
    
    // Reset form fields
    document.getElementById('billingForm').reset();
    
    // Reset totals
    calculateTotal();
    
    // Hide change display
    document.getElementById('changeDisplay').style.display = 'none';
    
    showNotification('Sale cleared', 'info');
}

function saveDraft() {
    showNotification('Sale saved as draft', 'success');
}

// Reports Functions
function generateSalesReport() {
    const reportType = document.getElementById('reportType').value;
    const reportFormat = document.getElementById('reportFormat').value;
    
    showNotification(`Generating ${reportType} sales report in ${reportFormat} format...`, 'info');
    
    // Mock report generation
    setTimeout(() => {
        showNotification('Sales report generated successfully!', 'success');
    }, 2000);
}

function generateStockReport() {
    const stockReportType = document.getElementById('stockReportType').value;
    const stockFormat = document.getElementById('stockFormat').value;
    
    showNotification(`Generating ${stockReportType} report in ${stockFormat} format...`, 'info');
    
    // Mock report generation
    setTimeout(() => {
        showNotification('Stock report generated successfully!', 'success');
    }, 2000);
}

function showAnalytics(type) {
    showNotification(`Loading ${type} analytics...`, 'info');
    
    // Mock analytics loading
    setTimeout(() => {
        showNotification(`${type} analytics loaded successfully!`, 'success');
    }, 1500);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Utility Functions
function switchTabByName(tabName) {
    const tabBtn = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (tabBtn) {
        tabBtn.click();
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        padding: 16px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add type-specific styling
    switch (type) {
        case 'success':
            notification.style.borderLeftColor = 'var(--success-color)';
            notification.style.borderLeftWidth = '4px';
            break;
        case 'warning':
            notification.style.borderLeftColor = 'var(--warning-color)';
            notification.style.borderLeftWidth = '4px';
            break;
        case 'error':
            notification.style.borderLeftColor = 'var(--danger-color)';
            notification.style.borderLeftWidth = '4px';
            break;
        default:
            notification.style.borderLeftColor = 'var(--info-color)';
            notification.style.borderLeftWidth = '4px';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        default: return 'info-circle';
    }
}

// Chart variables to store chart instances
let salesChart, medicineChart, customerChart, profitChart, inventoryChart, seasonalChart;

// Initialize charts when page loads
function initializeCharts() {
    // Check if we're on the reports page
    if (document.getElementById('salesChart')) {
        initSalesChart();
        initMedicineChart();
        initCustomerChart();
        initProfitChart();
        initInventoryChart();
        initSeasonalChart();
    }
}

// Sales Trend Chart
function initSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Sales (₹)',
                data: [12000, 15000, 18000, 22000],
                borderColor: '#FF6B47',
                backgroundColor: 'rgba(255, 107, 71, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Medicine Performance Chart
function initMedicineChart() {
    const ctx = document.getElementById('medicineChart').getContext('2d');
    medicineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Paracetamol', 'Amoxicillin', 'Cough Syrup', 'Vitamin D', 'Aspirin'],
            datasets: [{
                label: 'Revenue (₹)',
                data: [8500, 6200, 4800, 3500, 2900],
                backgroundColor: [
                    '#FF6B47',
                    '#FF8A65',
                    '#27ae60',
                    '#f39c12',
                    '#3498db'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Customer Analytics Chart
function initCustomerChart() {
    const ctx = document.getElementById('customerChart').getContext('2d');
    customerChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Returning Customers', 'New Customers'],
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#FF6B47', '#FF8A65'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Profit Analysis Chart
function initProfitChart() {
    const ctx = document.getElementById('profitChart').getContext('2d');
    profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [45000, 52000, 48000, 61000, 55000, 67000],
                borderColor: '#FF6B47',
                backgroundColor: 'rgba(255, 107, 71, 0.1)',
                borderWidth: 2,
                fill: false
            }, {
                label: 'Profit',
                data: [12000, 15600, 14400, 18300, 16500, 20100],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Inventory Status Chart
function initInventoryChart() {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    inventoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['In Stock', 'Low Stock', 'Out of Stock', 'Expiring Soon'],
            datasets: [{
                data: [65, 20, 8, 7],
                backgroundColor: [
                    '#27ae60',
                    '#f39c12',
                    '#e74c3c',
                    '#FF6B47'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Seasonal Trends Chart
function initSeasonalChart() {
    const ctx = document.getElementById('seasonalChart').getContext('2d');
    seasonalChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Cold Medicine', 'Pain Relief', 'Vitamins', 'Antibiotics', 'Digestive', 'Skin Care'],
            datasets: [{
                label: 'Winter',
                data: [90, 60, 80, 70, 40, 30],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderWidth: 2
            }, {
                label: 'Summer',
                data: [30, 70, 90, 50, 80, 85],
                borderColor: '#FF6B47',
                backgroundColor: 'rgba(255, 107, 71, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Chart update functions
function updateSalesChart() {
    const period = document.getElementById('salesPeriod').value;
    let newData, newLabels;
    
    switch(period) {
        case '7':
            newLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            newData = [3200, 2800, 4100, 3600, 4800, 5200, 4500];
            break;
        case '30':
            newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            newData = [12000, 15000, 18000, 22000];
            break;
        case '90':
            newLabels = ['Month 1', 'Month 2', 'Month 3'];
            newData = [65000, 72000, 68000];
            break;
    }
    
    salesChart.data.labels = newLabels;
    salesChart.data.datasets[0].data = newData;
    salesChart.update();
}

function updateMedicineChart() {
    const type = document.getElementById('medicineType').value;
    
    if (type === 'quantity') {
        medicineChart.data.datasets[0].label = 'Quantity Sold';
        medicineChart.data.datasets[0].data = [245, 180, 156, 98, 87];
    } else {
        medicineChart.data.datasets[0].label = 'Revenue (₹)';
        medicineChart.data.datasets[0].data = [8500, 6200, 4800, 3500, 2900];
    }
    
    medicineChart.update();
}

function updateCustomerChart() {
    const metric = document.getElementById('customerMetric').value;
    
    if (metric === 'acquisition') {
        customerChart.data.labels = ['This Month', 'Last Month'];
        customerChart.data.datasets[0].data = [45, 38];
    } else {
        customerChart.data.labels = ['Returning Customers', 'New Customers'];
        customerChart.data.datasets[0].data = [75, 25];
    }
    
    customerChart.update();
}

function updateProfitChart() {
    const view = document.getElementById('profitView').value;
    
    if (view === 'category') {
        profitChart.data.labels = ['Tablets', 'Syrups', 'Injections', 'Ointments'];
        profitChart.data.datasets[0].data = [25000, 18000, 12000, 8000];
        profitChart.data.datasets[1].data = [7500, 5400, 3600, 2400];
    } else {
        profitChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        profitChart.data.datasets[0].data = [45000, 52000, 48000, 61000, 55000, 67000];
        profitChart.data.datasets[1].data = [12000, 15600, 14400, 18300, 16500, 20100];
    }
    
    profitChart.update();
}

function refreshInventoryChart() {
    // Simulate data refresh
    const newData = [
        Math.floor(Math.random() * 20) + 60,
        Math.floor(Math.random() * 10) + 15,
        Math.floor(Math.random() * 5) + 5,
        Math.floor(Math.random() * 8) + 5
    ];
    
    inventoryChart.data.datasets[0].data = newData;
    inventoryChart.update();
    
    showNotification('Inventory data refreshed!', 'success');
}

function updateSeasonalChart() {
    const year = document.getElementById('seasonalYear').value;
    
    if (year === '2023') {
        seasonalChart.data.datasets[0].data = [85, 55, 75, 65, 35, 25];
        seasonalChart.data.datasets[1].data = [25, 65, 85, 45, 75, 80];
    } else {
        seasonalChart.data.datasets[0].data = [90, 60, 80, 70, 40, 30];
        seasonalChart.data.datasets[1].data = [30, 70, 90, 50, 80, 85];
    }
    
    seasonalChart.update();
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts if on reports page
    initializeCharts();
    
    // Add event listeners for report type change
    const reportType = document.getElementById('reportType');
    if (reportType) {
        reportType.addEventListener('change', toggleCustomDateRange);
    }
    
    // Add event listeners for form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (form.id === 'billingForm') {
                showNotification('Bill generated successfully!', 'success');
            } else {
                showNotification('Form submitted successfully!', 'success');
            }
        });
    });
    
    // Initialize search functionality
    const searchInputs = document.querySelectorAll('input[type="text"][id*="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.id === 'stockSearch') {
                searchStock();
            } else if (this.id === 'customerSearch') {
                searchCustomers();
            } else if (this.id === 'medicineSearch') {
                searchMedicines();
            }
        });
    });
    
    // Hide medicine suggestions when clicking outside
    document.addEventListener('click', function(e) {
        const suggestions = document.getElementById('medicineSuggestions');
        const searchInput = document.getElementById('medicineSearch');
        
        if (suggestions && searchInput && 
            !suggestions.contains(e.target) && 
            !searchInput.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
    
    // Add click listeners to navigation links to close mobile menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && hamburger && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Close mobile menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    console.log('Pages JavaScript initialized successfully!');
});
