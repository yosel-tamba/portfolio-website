document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return;
  }

  const fadeIn = (element, delay = 0) =>
    element.animate(
      [
        { opacity: 0, transform: "translateY(30px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 800,
        delay,
        easing: "ease-out",
        fill: "both",
      }
    );

  const reveal = (element, delay = 0) => {
    element.style.opacity = "0";
    const animation = fadeIn(element, delay);
    animation.onfinish = () => {
      element.style.opacity = "1";
      animation.cancel();
    };
  };

  const heroElements = document.querySelectorAll(
    ".jumbotron > img, .jumbotron > h1, .jumbotron > p"
  );

  heroElements.forEach((element, index) => {
    reveal(element, index * 200);
  });

  const scrollElements = document.querySelectorAll(
    "#about .container, #projects .container"
  );

  if (!("IntersectionObserver" in window)) {
    scrollElements.forEach((element) => reveal(element));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0,
    }
  );

  scrollElements.forEach((element) => {
    element.style.opacity = "0";
    observer.observe(element);
  });
});
