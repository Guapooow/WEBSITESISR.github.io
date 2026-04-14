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

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.tomshardware.com/feeds/all")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("rss-feed");

    const filtered = data.items.filter(item =>
      item.title.toLowerCase().includes("ram") ||
      item.title.toLowerCase().includes("ddr") ||
      item.title.toLowerCase().includes("memory") ||
      item.description.toLowerCase().includes("ram")
    );

    filtered.slice(0, 5).forEach(item => {
      const article = document.createElement("div");
      article.className = "veille-card";

      article.innerHTML = `
        <h3>${item.title}</h3>
        <img src="${item.thumbnail}" style="max-width:100%">
        <p>${item.description.substring(0, 150)}...</p>
        <a href="${item.link}" target="_blank">Lire l'article</a>
      `;

      container.appendChild(article);
    });
  });
const keywords = [
  "ram",
  "memory",
  "dram",
  "ddr",
  "ddr4",
  "ddr5",
  "hbm",
  "lpddr",
  "semiconductor",
  "micron",
  "hynix",
  "samsung",
  "memory pricing",
  "memory market"
];

const filtered = data.items.filter(item =>
  keywords.some(keyword =>
    item.title.toLowerCase().includes(keyword) ||
    item.description.toLowerCase().includes(keyword)
  )
);
