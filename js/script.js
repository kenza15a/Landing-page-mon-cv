// script.js
const includes = ['hero', 'cta', 'formations', 'experiences', 'references', 'contact', 'header', 'footer'];

includes.forEach(name => {
    fetch(`components/${name}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById(name).innerHTML = html;
            if (name === 'cta') initCounterObserver();
            if (name === 'header') initBurgerToggle();
        })
        .catch(err => console.error(`Erreur de chargement de ${name}:`, err));
});
function animateTimeline() {
    const elements = document.querySelectorAll(".fade-in-right, .fade-in-left");
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", animateTimeline);
window.addEventListener("load", animateTimeline);
function initBurgerToggle() {
    const burgerBtn = document.getElementById("burgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
}
function initCounterObserver() {
    const counter = document.getElementById("counter");
    if (!counter) return;

    let started = false;

    function animateCounter() {
        if (started) return;
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            started = true;
            let count = 0;
            const interval = setInterval(() => {
                if (count < 70) {
                    count++;
                    counter.textContent = count;
                } else {
                    clearInterval(interval);
                }
            }, 40);
        }
    }

    window.addEventListener("scroll", animateCounter);
    animateCounter();
}
