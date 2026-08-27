document.getElementById("year").textContent = new Date().getFullYear();

/* mobile menu toggle */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* navbar shrink on scroll */
const nav = document.getElementById("siteNav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

/* typed.js hero role text */
if (window.Typed) {
  new Typed(".typed", {
    strings: ["Web Developer", "Game Developer", "UI Designer"],
    typeSpeed: 70,
    backSpeed: 45,
    backDelay: 1200,
    loop: true
  });
}

/* bat-signal flash when the logo is clicked */
const brandLogo = document.getElementById("brandLogo");
const signalFlash = document.getElementById("signalFlash");
brandLogo.addEventListener("click", (e) => {
  signalFlash.classList.add("active");
  setTimeout(() => signalFlash.classList.remove("active"), 450);
});

/* scroll reveal + animated skill bars via IntersectionObserver */
const revealEls = document.querySelectorAll("[data-reveal]");
const skillFills = document.querySelectorAll(".fill");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.level + "%";
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(el => skillObserver.observe(el));

/* active nav link highlight on scroll */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".links a");
window.addEventListener("scroll", () => {
  let current = "top";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});
