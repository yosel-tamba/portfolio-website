const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbar = document.querySelector(".navbar");

const sections = Array.from(navLinks)
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

function setActiveLink(activeLink) {
  navLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle("active", isActive);
    link.classList.toggle("fw-bold", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateActiveNav() {
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const scrollPosition = window.scrollY + navbarHeight + 10;

  let current = sections[0];

  sections.forEach((section) => {
    const sectionTop =
      section.target.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= scrollPosition) {
      current = section;
    }
  });

  const isAtBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (isAtBottom) {
    current = sections[sections.length - 1];
  }

  if (current) {
    setActiveLink(current.link);
  }
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();
