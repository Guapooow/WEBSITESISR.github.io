// Animation apparition au scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".card, .section h2, .section p").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// Effet dynamique logo
const logo = document.querySelector(".logo");

logo.addEventListener("mousemove", () => {
    logo.style.transform = "scale(1.2)";
});

logo.addEventListener("mouseleave", () => {
    logo.style.transform = "scale(1)";
});
