// Dark mode — in-memory state only
const html = document.documentElement;
let currentTheme = 'light';

const toggle = document.getElementById('darkToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', currentTheme);
    toggle.textContent = currentTheme === 'dark' ? '\u2600\ufe0f' : '\ud83c\udf19';
  });
}

// Hamburger
const burger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });
}

// Back to top
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

// FAQ
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(x => x.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Booking multi-step
let currentStep = 1;
const totalSteps = 4;

function goToStep(step) {
  document.querySelectorAll('.form-step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === step);
  });
  document.querySelectorAll('.step-indicator').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 === step) s.classList.add('active');
    if (i + 1 < step) s.classList.add('done');
  });
  currentStep = step;
}

const nextBtns = document.querySelectorAll('[data-next]');
const prevBtns = document.querySelectorAll('[data-prev]');
nextBtns.forEach(b => b.addEventListener('click', () => { if (currentStep < totalSteps) goToStep(currentStep + 1); }));
prevBtns.forEach(b => b.addEventListener('click', () => { if (currentStep > 1) goToStep(currentStep - 1); }));

// Service options
document.querySelectorAll('.service-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

// Admin login
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('adminPassword').value;
    if (pw === 'admin123') {
      document.getElementById('adminLogin').style.display = 'none';
      document.getElementById('adminPanel').style.display = 'block';
    } else {
      const errEl = document.getElementById('loginError');
      if (errEl) errEl.textContent = 'Incorrect password. Try admin123.';
    }
  });
}

// Active nav link
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a, .mobile-menu a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});
