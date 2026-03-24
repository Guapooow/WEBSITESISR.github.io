// Active nav link highlight
(function() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
    });
})();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
if (toggle && navUl) {
    toggle.addEventListener('click', () => {
        navUl.classList.toggle('open');
    });
}

// Scroll-reveal animation
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, entry.target.dataset.delay || 0);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .project-card, .veille-card, .contact-link, .stat-block, .section-header, .section-desc, .about-text, .about-stats, .contact-aside').forEach((el, i) => {
    el.classList.add('hidden');
    el.dataset.delay = (i % 4) * 80;
    observer.observe(el);
});

// Logo hover
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.letterSpacing = '6px';
    });
    logo.addEventListener('mouseleave', () => {
        logo.style.letterSpacing = '4px';
    });
}
