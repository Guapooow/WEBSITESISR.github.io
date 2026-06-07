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

// ===== VEILLE RSS =====
const FALLBACK_ARTICLES = [
    {
        title: "DDR5 : les prix continuent de baisser en 2025",
        description: "Le marché de la RAM DDR5 poursuit sa chute des prix, portée par une surproduction des fabricants DRAM. Les modules grand public deviennent de plus en plus accessibles.",
        link: "https://www.tomshardware.com"
    },
    {
        title: "Micron annonce une nouvelle génération de mémoire HBM3E",
        description: "Micron entre en production de masse sur sa mémoire HBM3E, destinée aux GPU IA de nouvelle génération. Une capacité et une bande passante en forte hausse par rapport à la génération précédente.",
        link: "https://www.tomshardware.com"
    },
    {
        title: "Samsung et SK Hynix réduisent leur production de DRAM",
        description: "Face à la pression sur les marges, les deux géants coréens annoncent une réduction de leur cadence de production DRAM pour stabiliser les prix sur le marché mondial.",
        link: "https://www.tomshardware.com"
    },
    {
        title: "LPDDR5X : la RAM mobile atteint des débits records",
        description: "La dernière norme LPDDR5X pousse les limites de la mémoire embarquée dans les smartphones et tablettes, avec des débits dépassant les 9,6 Gbps par pin.",
        link: "https://www.tomshardware.com"
    }
];

function renderArticle(title, description, link) {
    const container = document.getElementById("rss-feed");
    if (!container) return;
    const article = document.createElement("div");
    article.className = "veille-card";
    article.innerHTML = `
        <div class="veille-date">Actu</div>
        <div class="veille-content">
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${link}" target="_blank" rel="noopener" style="
                display:inline-block;
                margin-top:10px;
                font-family:var(--font-mono);
                font-size:0.72rem;
                color:var(--yellow);
                text-decoration:none;
                letter-spacing:1px;
            ">Lire l'article →</a>
        </div>
    `;
    container.appendChild(article);
}

function showFallback() {
    FALLBACK_ARTICLES.forEach(a => renderArticle(a.title, a.description, a.link));
}

if (document.getElementById("rss-feed")) {
    const keywords = ["ram","memory","dram","ddr","ddr4","ddr5","hbm","lpddr","semiconductor","micron","hynix","samsung","memory pricing","memory market"];

    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.tomshardware.com/feeds/all")
        .then(r => r.json())
        .then(data => {
            const filtered = (data.items || []).filter(item => {
                const text = (item.title + " " + (item.description || "")).toLowerCase();
                return keywords.some(k => text.includes(k));
            });

            if (filtered.length === 0) {
                showFallback();
                return;
            }

            filtered.slice(0, 8).forEach(item => {
                const desc = item.description
                    ? item.description.replace(/<[^>]*>/g, "").substring(0, 180)
                    : "";
                renderArticle(item.title, desc + "...", item.link);
            });
        })
        .catch(() => showFallback());
}
