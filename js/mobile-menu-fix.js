// Mobile Menu Fix - Universal Script
function toggleMobileMenu() {
  const menu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  
  if (!menu) return;
  
  if (menu.style.display === 'flex') {
    // Close menu
    menu.style.display = 'none';
    menu.style.left = '-100%';
    document.body.style.overflow = 'auto';
  } else {
    // Open menu
    menu.style.display = 'flex';
    menu.style.position = 'fixed';
    menu.style.top = '70px';
    menu.style.left = '0';
    menu.style.width = '100%';
    menu.style.height = 'calc(100vh - 70px)';
    menu.style.background = 'white';
    menu.style.flexDirection = 'column';
    menu.style.alignItems = 'center';
    menu.style.padding = '40px 20px';
    menu.style.zIndex = '1000';
    menu.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    document.body.style.overflow = 'hidden';
  }
}

// Close menu when clicking on nav links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const menu = document.getElementById('navMenu');
      if (menu && menu.style.display === 'flex') {
        menu.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  });
});
