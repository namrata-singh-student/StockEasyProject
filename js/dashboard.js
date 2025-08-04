// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeSidebar();
    checkAuthentication();
    loadUserData();
});

// Initialize dashboard functionality
function initializeDashboard() {
    // Set default active section
    showSection('overview');
    
    // Initialize sidebar menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            setActiveMenuItem(this);
        });
    });
}

// Initialize sidebar functionality
function initializeSidebar() {
    // Mobile sidebar toggle (if needed)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
}

// Check if user is authenticated
function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (!isLoggedIn || !userEmail) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    // Update user display
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = userEmail.split('@')[0];
    }
}

// Load user data and dashboard stats
function loadUserData() {
    // Simulate loading user data and stats
    // In real implementation, this would fetch from backend
    
    // Update stats with animation
    animateCounter('.stat-number', 1000);
    
    // Load recent activities, alerts, etc.
    loadExpiryAlerts();
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update page title
    updatePageTitle(sectionId);
}

// Set active menu item
function setActiveMenuItem(activeItem) {
    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    activeItem.classList.add('active');
}

// Update page title based on section
function updatePageTitle(sectionId) {
    const titles = {
        overview: 'Dashboard Overview',
        stock: 'Medicine Stock',
        sales: 'Sales Management',
        customers: 'Customer Management',
        reports: 'Reports & Analytics',
        profile: 'Profile Settings'
    };
    
    const title = titles[sectionId] || 'Dashboard';
    document.title = `${title} - StockEasy`;
}

// Animate counter numbers
function animateCounter(selector, duration = 1000) {
    const counters = document.querySelectorAll(selector);
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Load expiry alerts
function loadExpiryAlerts() {
    // Simulate loading expiry alerts
    // In real implementation, this would fetch from backend
    
    const alertsData = [
        {
            name: 'Paracetamol 500mg',
            batch: 'PAR001',
            daysToExpiry: 2,
            quantity: 50,
            unit: 'tablets',
            type: 'urgent'
        },
        {
            name: 'Amoxicillin 250mg',
            batch: 'AMX002',
            daysToExpiry: 7,
            quantity: 30,
            unit: 'capsules',
            type: 'warning'
        }
    ];
    
    // Update alerts display
    updateAlertsDisplay(alertsData);
}

// Update alerts display
function updateAlertsDisplay(alerts) {
    const alertsList = document.querySelector('.alert-list');
    if (!alertsList) return;
    
    alertsList.innerHTML = '';
    
    alerts.forEach(alert => {
        const alertElement = createAlertElement(alert);
        alertsList.appendChild(alertElement);
    });
}

// Create alert element
function createAlertElement(alert) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-item ${alert.type}`;
    
    alertDiv.innerHTML = `
        <div class="alert-icon">
            <i class="fas ${alert.type === 'urgent' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle'}"></i>
        </div>
        <div class="alert-content">
            <h4>${alert.name}</h4>
            <p>Expires in ${alert.daysToExpiry} days - Batch: ${alert.batch}</p>
            <span class="alert-quantity">Quantity: ${alert.quantity} ${alert.unit}</span>
        </div>
        <div class="alert-actions">
            <button class="btn-small btn-primary" onclick="markForSale('${alert.batch}')">Mark Sale</button>
            <button class="btn-small btn-outline" onclick="removeFromStock('${alert.batch}')">Remove</button>
        </div>
    `;
    
    return alertDiv;
}

// Mark medicine for sale
function markForSale(batch) {
    showNotification(`Medicine batch ${batch} marked for priority sale`, 'success');
    // In real implementation, this would update the database
}

// Remove from stock
function removeFromStock(batch) {
    if (confirm(`Are you sure you want to remove batch ${batch} from stock?`)) {
        showNotification(`Medicine batch ${batch} removed from stock`, 'info');
        // In real implementation, this would update the database
        
        // Remove the alert from display
        const alertItem = event.target.closest('.alert-item');
        if (alertItem) {
            alertItem.remove();
        }
    }
}

// Show Add Medicine Modal
function showAddMedicineModal() {
    const modal = createModal('Add New Medicine', `
        <form id="addMedicineForm" class="modal-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="medicineName">Medicine Name</label>
                    <input type="text" id="medicineName" name="medicineName" required>
                </div>
                <div class="form-group">
                    <label for="genericName">Generic Name</label>
                    <input type="text" id="genericName" name="genericName">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="batchNumber">Batch Number</label>
                    <input type="text" id="batchNumber" name="batchNumber" required>
                </div>
                <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="expiryDate">Expiry Date</label>
                    <input type="date" id="expiryDate" name="expiryDate" required>
                </div>
                <div class="form-group">
                    <label for="price">Price per Unit</label>
                    <input type="number" id="price" name="price" step="0.01" required>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Add Medicine</button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = modal.querySelector('#addMedicineForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleAddMedicine(new FormData(form));
    });
}

// Show Sale Modal
function showSaleModal() {
    const modal = createModal('New Sale', `
        <form id="saleForm" class="modal-form">
            <div class="form-group">
                <label for="customerName">Customer Name</label>
                <input type="text" id="customerName" name="customerName">
            </div>
            <div class="form-group">
                <label for="medicineSearch">Search Medicine</label>
                <input type="text" id="medicineSearch" name="medicineSearch" placeholder="Type medicine name..." required>
                <div id="medicineSearchResults" class="search-results"></div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="saleQuantity">Quantity</label>
                    <input type="number" id="saleQuantity" name="saleQuantity" required>
                </div>
                <div class="form-group">
                    <label for="unitPrice">Unit Price</label>
                    <input type="number" id="unitPrice" name="unitPrice" step="0.01" readonly>
                </div>
            </div>
            <div class="form-group">
                <label for="totalAmount">Total Amount</label>
                <input type="number" id="totalAmount" name="totalAmount" step="0.01" readonly>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Complete Sale</button>
            </div>
        </form>
    `);
    
    // Handle form submission
    const form = modal.querySelector('#saleForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSale(new FormData(form));
    });
    
    // Add medicine search functionality
    initializeMedicineSearch(modal);
}

// Initialize medicine search
function initializeMedicineSearch(modal) {
    const searchInput = modal.querySelector('#medicineSearch');
    const resultsDiv = modal.querySelector('#medicineSearchResults');
    const quantityInput = modal.querySelector('#saleQuantity');
    const priceInput = modal.querySelector('#unitPrice');
    const totalInput = modal.querySelector('#totalAmount');
    
    // Mock medicine data
    const medicines = [
        { name: 'Paracetamol 500mg', batch: 'PAR001', price: 2.50, stock: 50 },
        { name: 'Amoxicillin 250mg', batch: 'AMX002', price: 5.00, stock: 30 },
        { name: 'Ibuprofen 400mg', batch: 'IBU003', price: 3.75, stock: 75 }
    ];
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const results = medicines.filter(med => 
            med.name.toLowerCase().includes(query)
        );
        
        displaySearchResults(results, resultsDiv, searchInput, priceInput);
    });
    
    // Calculate total when quantity changes
    quantityInput.addEventListener('input', function() {
        const quantity = parseFloat(this.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        totalInput.value = (quantity * price).toFixed(2);
    });
}

// Display search results
function displaySearchResults(results, container, searchInput, priceInput) {
    container.innerHTML = '';
    
    if (results.length === 0) return;
    
    results.forEach(medicine => {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-result-item';
        resultDiv.innerHTML = `
            <div class="result-info">
                <strong>${medicine.name}</strong>
                <span>Batch: ${medicine.batch} | Stock: ${medicine.stock} | ₹${medicine.price}</span>
            </div>
        `;
        
        resultDiv.addEventListener('click', function() {
            searchInput.value = medicine.name;
            priceInput.value = medicine.price;
            container.innerHTML = '';
            
            // Trigger total calculation
            const quantityInput = document.querySelector('#saleQuantity');
            if (quantityInput.value) {
                const totalInput = document.querySelector('#totalAmount');
                totalInput.value = (parseFloat(quantityInput.value) * medicine.price).toFixed(2);
            }
        });
        
        container.appendChild(resultDiv);
    });
}

// Handle add medicine
function handleAddMedicine(formData) {
    const medicineData = {
        name: formData.get('medicineName'),
        genericName: formData.get('genericName'),
        batch: formData.get('batchNumber'),
        quantity: formData.get('quantity'),
        expiryDate: formData.get('expiryDate'),
        price: formData.get('price')
    };
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Medicine added successfully!', 'success');
        closeModal();
        // Refresh dashboard data
        loadUserData();
    }, 1000);
}

// Handle sale
function handleSale(formData) {
    const saleData = {
        customer: formData.get('customerName'),
        medicine: formData.get('medicineSearch'),
        quantity: formData.get('saleQuantity'),
        unitPrice: formData.get('unitPrice'),
        total: formData.get('totalAmount')
    };
    
    // Simulate API call
    setTimeout(() => {
        showNotification(`Sale completed! Total: ₹${saleData.total}`, 'success');
        closeModal();
        // Refresh dashboard data
        loadUserData();
    }, 1000);
}

// Create modal
function createModal(title, content) {
    const modalContainer = document.getElementById('modalContainer');
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    modalContainer.appendChild(modal);
    
    // Add modal styles
    addModalStyles();
    
    return modal;
}

// Close modal
function closeModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = '';
}

// Add modal styles
function addModalStyles() {
    if (document.getElementById('modalStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'modalStyles';
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }
        
        .modal {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 30px;
            border-bottom: 1px solid #E1E8ED;
        }
        
        .modal-header h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2C3E50;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #7F8C8D;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            color: #FF6B47;
            background: rgba(255, 107, 71, 0.1);
        }
        
        .modal-content {
            padding: 30px;
        }
        
        .modal-form .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .modal-form .form-group {
            margin-bottom: 20px;
        }
        
        .modal-form label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #2C3E50;
        }
        
        .modal-form input,
        .modal-form select {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #E1E8ED;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .modal-form input:focus,
        .modal-form select:focus {
            outline: none;
            border-color: #FF6B47;
            box-shadow: 0 0 0 3px rgba(255, 107, 71, 0.1);
        }
        
        .modal-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #E1E8ED;
        }
        
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #E1E8ED;
            border-top: none;
            border-radius: 0 0 8px 8px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
        }
        
        .search-result-item {
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid #F8F9FA;
            transition: background 0.2s ease;
        }
        
        .search-result-item:hover {
            background: #F8F9FA;
        }
        
        .search-result-item:last-child {
            border-bottom: none;
        }
        
        .result-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .result-info span {
            font-size: 12px;
            color: #7F8C8D;
        }
        
        @media (max-width: 768px) {
            .modal-form .form-row {
                grid-template-columns: 1fr;
            }
            
            .modal {
                width: 95%;
                margin: 20px;
            }
            
            .modal-header,
            .modal-content {
                padding: 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
        window.location.href = 'login.html';
    }
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    const bgColor = type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}
