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

/* cursor spotlight glow, smoothed with lerp */
const spotlight = document.getElementById("spotlight");
if (spotlight && matchMedia("(hover:hover)").matches) {
  let mouseX = innerWidth / 2, mouseY = innerHeight / 2, curX = mouseX, curY = mouseY;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    spotlight.classList.add("active");
  });
  window.addEventListener("mouseleave", () => spotlight.classList.remove("active"));
  (function loop() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    spotlight.style.setProperty("--x", curX + "px");
    spotlight.style.setProperty("--y", curY + "px");
    requestAnimationFrame(loop);
  })();
}

/* magnetic tilt on hero photo + skill cards */
function addTilt(el, intensity = 10) {
  el.style.transition = "transform .15s ease-out";
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${px * intensity}deg) rotateX(${-py * intensity}deg)`;
  });
  el.addEventListener("mouseleave", () => { el.style.transform = ""; });
}
if (matchMedia("(hover:hover)").matches) {
  document.querySelectorAll(".skill-card").forEach(el => addTilt(el, 8));
  const heroPic = document.querySelector(".hero-pic");
  if (heroPic) addTilt(heroPic, 10);
}

/* count-up animation for stats + skill percentages */
const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.classList.contains("level") ? "%" : "";
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

/* thin progress bar that fills as the page is scrolled */
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  scrollProgress.style.width = pct + "%";
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
