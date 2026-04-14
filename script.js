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

    const filtered = data.items.filter(item => {
      const text = (item.title + " " + item.description).toLowerCase();
      return keywords.some(keyword => text.includes(keyword));
    });

    filtered.slice(0, 8).forEach(item => {
      const article = document.createElement("div");
      article.className = "veille-card";

      article.innerHTML = `
        <h3>${item.title}</h3>
        <img src="${item.thumbnail || ''}" class="rss-img">
        <p>${item.description?.substring(0, 150) || ""}...</p>
        <a href="${item.link}" target="_blank">Lire l'article</a>
      `;

      container.appendChild(article);
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("rss-feed").innerHTML =
      "Erreur de chargement du flux RSS";
  });
