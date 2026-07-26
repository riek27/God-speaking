// Mobile menu functionality
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

if (mobileMenuBtn && mobileMenu && mobileOverlay && closeMobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('active');
  });

  closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close menu when a link inside it is clicked
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
      setTimeout(closeMobileMenu, 200);
    });
  });
}

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (mobileOverlay) mobileOverlay.classList.remove('active');
}

// Scroll spy for active nav link (works on any page with sections that have IDs)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
  function activateNavOnScroll() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      // Compare the href attribute (which may be a filename or #id) with the current section id
      if (link.getAttribute('href') === '#' + current || link.getAttribute('href') === current + '.html') {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', activateNavOnScroll);
  activateNavOnScroll();
}

// Intersection Observer for fade-in elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in-element').forEach(el => observer.observe(el));
  // Make sure the hero text is visible right away
  setTimeout(() => {
    document.querySelectorAll('#home .fade-in-element, .hero-bg .fade-in-element').forEach(el => el.classList.add('visible'));
  }, 400);
});
