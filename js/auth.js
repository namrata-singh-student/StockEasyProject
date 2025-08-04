// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginForm();
    initializeRegisterForm();
    initializePasswordValidation();
});

// Login Form Handler
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Register Form Handler
function initializeRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');
        
        if (passwordField && confirmPasswordField) {
            confirmPasswordField.addEventListener('input', validatePasswordMatch);
        }
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    showLoading('Signing you in...');
    
    try {
        // Simulate API call - replace with actual backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        sessionStorage.setItem('userEmail', loginData.email);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        hideLoading();
        showError('Invalid email or password. Please try again.');
    }
}

// Handle Registration
async function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    if (!validateRegistrationForm(formData)) {
        return;
    }
    
    showLoading('Creating your account...');
    
    try {
        // Simulate API call - replace with actual backend
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        hideLoading();
        showSuccess('Account created successfully! Please wait for admin approval.');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        hideLoading();
        showError('Registration failed. Please try again.');
    }
}

// Validate Registration Form
function validateRegistrationForm(formData) {
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const email = formData.get('email');
    const termsAccepted = formData.get('termsAccepted');
    
    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return false;
    }
    
    if (!isValidPassword(password)) {
        showError('Password must be at least 8 characters long with uppercase, lowercase, number, and special character.');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return false;
    }
    
    if (!termsAccepted) {
        showError('Please accept the terms and conditions.');
        return false;
    }
    
    return true;
}

// Password validation
function isValidPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password match validation
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordField = document.getElementById('confirmPassword');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmPasswordField.style.borderColor = '#e74c3c';
    } else {
        confirmPasswordField.style.borderColor = '';
    }
}

// Password visibility toggle
function togglePassword(fieldId = 'password') {
    const field = document.getElementById(fieldId);
    const icon = document.getElementById(fieldId + 'ToggleIcon') || document.getElementById('passwordToggleIcon');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Admin login toggle
function toggleAdminLogin() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('admin=true')) {
        window.location.href = 'login.html';
    } else {
        window.location.href = 'login.html?admin=true';
    }
}

// Initialize password validation
function initializePasswordValidation() {
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            const password = this.value;
            const isValid = isValidPassword(password);
            
            if (password.length > 0) {
                if (isValid) {
                    this.style.borderColor = '#27ae60';
                } else {
                    this.style.borderColor = '#e74c3c';
                }
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

// Show loading overlay
function showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loadingOverlay');
    const messageElement = overlay.querySelector('p');
    if (messageElement) {
        messageElement.textContent = message;
    }
    overlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'none';
}

// Show error message
function showError(message) {
    showNotification(message, 'error');
}

// Show success message
function showSuccess(message) {
    showNotification(message, 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
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

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
    }
`;
document.head.appendChild(style);
