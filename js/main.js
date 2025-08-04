// Main JavaScript for StockEasy
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeFeatureCounters();
    checkUserSession();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Handle scroll for navbar
    window.addEventListener('scroll', handleNavbarScroll);
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .stat, .section-header');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation classes
    addAnimationStyles();
}

// Add animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .feature-card,
        .stat,
        .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card.animate-in,
        .stat.animate-in,
        .section-header.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: white;
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                padding: 20px 0;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu .nav-link {
                padding: 15px;
                display: block;
                border-bottom: 1px solid #eee;
            }
            
            .nav-buttons {
                flex-direction: column;
                gap: 10px;
                margin: 20px 0 0 0;
                padding: 0 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Check user session
function checkUserSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (isLoggedIn === 'true' && userEmail) {
        updateNavForLoggedInUser(userEmail);
    }
}

// Update navigation for logged-in user
function updateNavForLoggedInUser(email) {
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) {
        navButtons.innerHTML = `
            <div class="user-menu">
                <span class="user-email">${email}</span>
                <a href="dashboard.html" class="btn btn-primary">Dashboard</a>
                <button onclick="logout()" class="btn btn-outline">Logout</button>
            </div>
        `;
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    window.location.reload();
}

// Contact form handler (if needed)
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    event.target.reset();
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
        z-index: 10000;
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

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.onclick = scrollToTop;
    
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FF6B47, #FF8A65);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    });
}

// Initialize scroll to top button
addScrollToTopButton();

// Initialize feature counters
function initializeFeatureCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number[data-target]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                });
            }
        });
    }, observerOptions);
    
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        observer.observe(featuresSection);
    }
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            if (target >= 1000) {
                element.textContent = (Math.ceil(current / 100) * 100).toLocaleString();
            } else {
                element.textContent = Math.ceil(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Handle feature card clicks
function handleFeatureClick(feature) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    // Add click animation
    const clickedCard = document.querySelector(`[data-feature="${feature}"]`);
    if (clickedCard) {
        clickedCard.style.transform = 'translateY(-8px) scale(0.98)';
        setTimeout(() => {
            clickedCard.style.transform = '';
        }, 150);
    }
    
    // Feature-specific actions
    switch (feature) {
        case 'stock':
            if (isLoggedIn) {
                window.location.href = 'stock.html';
            } else {
                showFeatureDemo('Stock Management', {
                    title: 'Medicine Inventory System',
                    description: 'Manage your medicine inventory with FEFO (First-Expiry-First-Out) logic. Track stock levels, expiry dates, and get automated alerts.',
                    features: [
                        'Add/Edit/Delete medicines',
                        'Batch tracking with expiry dates',
                        'Low stock alerts',
                        'FEFO priority system',
                        'Barcode scanning support'
                    ],
                    action: 'Try Stock Management',
                    actionUrl: 'register.html'
                });
            }
            break;
            
        case 'alerts':
            if (isLoggedIn) {
                window.location.href = 'stock.html';
            } else {
                showFeatureDemo('Expiry Alert System', {
                    title: 'Smart Expiry Monitoring',
                    description: 'Never lose money on expired medicines again. Our intelligent alert system monitors all your stock and notifies you before medicines expire.',
                    features: [
                        'Real-time expiry monitoring',
                        'Customizable alert thresholds',
                        'Email and SMS notifications',
                        'Priority-based alerts',
                        'Automated disposal tracking'
                    ],
                    action: 'Enable Alerts',
                    actionUrl: 'register.html'
                });
            }
            break;
            
        case 'sales':
            if (isLoggedIn) {
                window.location.href = 'billing.html';
            } else {
                showFeatureDemo('Sales & Billing System', {
                    title: 'Streamlined Sales Process',
                    description: 'Process sales quickly with our intelligent system that suggests oldest stock first and generates professional bills instantly.',
                    features: [
                        'Quick medicine search',
                        'FEFO-based suggestions',
                        'Instant bill generation',
                        'Customer management',
                        'Payment tracking'
                    ],
                    action: 'Start Selling',
                    actionUrl: 'register.html'
                });
            }
            break;
            
        case 'reports':
            if (isLoggedIn) {
                window.location.href = 'reports.html';
            } else {
                showFeatureDemo('Analytics & Reports', {
                    title: 'Business Intelligence',
                    description: 'Make data-driven decisions with comprehensive reports and analytics. Track sales trends, identify best-selling medicines, and optimize your inventory.',
                    features: [
                        'Sales analytics dashboard',
                        'Medicine-wise performance',
                        'Customer insights',
                        'Profit margin analysis',
                        'Export to PDF/Excel'
                    ],
                    action: 'View Analytics',
                    actionUrl: 'register.html'
                });
            }
            break;
            
        case 'security':
            showFeatureDemo('Security Features', {
                title: 'Bank-Level Security',
                description: 'Your data is protected with enterprise-grade security measures. We use the latest encryption and security protocols to keep your business safe.',
                features: [
                    'bcrypt password hashing',
                    'SSL/TLS encryption',
                    'Session management',
                    'Role-based access control',
                    'Audit trail logging'
                ],
                action: 'Learn More',
                actionUrl: 'register.html'
            });
            break;
            
        case 'customer':
            if (isLoggedIn) {
                window.location.href = 'customer.html';
            } else {
                showFeatureDemo('Customer Management', {
                    title: 'Customer Relationship Management',
                    description: 'Build lasting relationships with your customers. Track purchase history, manage contact information, and provide personalized service.',
                    features: [
                        'Customer database management',
                        'Purchase history tracking',
                        'Contact information storage',
                        'Customer insights & analytics',
                        'Loyalty program support'
                    ],
                    action: 'Manage Customers',
                    actionUrl: 'register.html'
                });
            }
            break;
            
        case 'admin':
            if (isLoggedIn) {
                showNotification('Admin access requires special permissions. Contact support.', 'info');
            } else {
                showFeatureDemo('Admin Control Panel', {
                    title: 'Complete System Control',
                    description: 'Comprehensive admin panel for system administrators to manage users, monitor system health, and configure settings.',
                    features: [
                        'User management & approval',
                        'System monitoring',
                        'Configuration settings',
                        'Backup management',
                        'Usage analytics'
                    ],
                    action: 'Admin Login',
                    actionUrl: 'login.html?admin=true'
                });
            }
            break;
    }
}

// Show feature demo modal
function showFeatureDemo(title, data) {
    const modal = document.createElement('div');
    modal.className = 'feature-modal-overlay';
    modal.innerHTML = `
        <div class="feature-modal">
            <div class="feature-modal-header">
                <h2>${title}</h2>
                <button class="feature-modal-close" onclick="closeFeatureModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="feature-modal-content">
                <div class="feature-modal-info">
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <ul class="feature-list">
                        ${data.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="feature-modal-actions">
                    <button class="btn btn-outline" onclick="closeFeatureModal()">Close</button>
                    <a href="${data.actionUrl}" class="btn btn-primary">${data.action}</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
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

// Add mobile menu event listeners when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileMenu);
} else {
    initializeMobileMenu();
}

function initializeMobileMenu() {
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
}

// Close feature demo modal
function closeFeatureModal() {
    const modal = document.querySelector('.feature-modal-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add feature modal styles
function addFeatureModalStyles() {
    if (document.getElementById('featureModalStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'featureModalStyles';
    style.textContent = `
        .feature-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        
        .feature-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .feature-modal {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: translateY(30px) scale(0.9);
            transition: all 0.3s ease;
        }
        
        .feature-modal-overlay.active .feature-modal {
            transform: translateY(0) scale(1);
        }
        
        .feature-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 30px 20px;
            border-bottom: 1px solid #E1E8ED;
        }
        
        .feature-modal-header h2 {
            font-size: 1.75rem;
            font-weight: 700;
            color: #2C3E50;
            margin: 0;
        }
        
        .feature-modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #7F8C8D;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .feature-modal-close:hover {
            color: #FF6B47;
            background: rgba(255, 107, 71, 0.1);
        }
        
        .feature-modal-content {
            padding: 30px;
        }
        
        .feature-modal-info h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2C3E50;
            margin-bottom: 16px;
        }
        
        .feature-modal-info p {
            color: #7F8C8D;
            line-height: 1.6;
            margin-bottom: 24px;
            font-size: 1.1rem;
        }
        
        .feature-list {
            list-style: none;
            margin-bottom: 30px;
        }
        
        .feature-list li {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            color: #2C3E50;
            font-weight: 500;
        }
        
        .feature-list i {
            color: #27ae60;
            font-size: 0.875rem;
        }
        
        .feature-modal-actions {
            display: flex;
            gap: 16px;
            justify-content: flex-end;
            padding-top: 20px;
            border-top: 1px solid #E1E8ED;
        }
        
        @media (max-width: 768px) {
            .feature-modal {
                width: 95%;
                margin: 20px;
            }
            
            .feature-modal-header,
            .feature-modal-content {
                padding: 20px;
            }
            
            .feature-modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('feature-modal-overlay')) {
        closeFeatureModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFeatureModal();
    }
});

// Footer Loading Function
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
}

// Load footer when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});
