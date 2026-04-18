/* ============================================
   MOHIT SANAS — PORTFOLIO JAVASCRIPT
   Simple, clean interactions only
   ============================================ */

// === NAVBAR: Scroll shadow + mobile toggle ===

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Add scrolled class on scroll (for slightly darker bg)
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('open')) {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  }
});


// === CONTACT FORM: Show success message ===

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate a short delay (like an API call)
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      if (formSuccess) {
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
      }
    }, 1200);
  });
}


// === SCROLL REVEAL: Fade in elements on scroll ===

function revealOnScroll() {
  const revealEls = document.querySelectorAll(
    '.project-card, .mini-card, .project-full-card, .skill-category, .contact-card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });
}

// Run after DOM loads
document.addEventListener('DOMContentLoaded', revealOnScroll);


// === SKILL BARS: Animate on scroll ===

function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.getPropertyValue('--w') || '0%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => {
    fill.style.width = '0%';
    observer.observe(fill);
  });
}

document.addEventListener('DOMContentLoaded', animateSkillBars);


// === ACTIVE NAV LINK: Highlight current page ===

(function setActiveLink() {
  const links    = document.querySelectorAll('.nav-link');
  const current  = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();