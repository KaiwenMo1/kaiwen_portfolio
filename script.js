const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const sectionLinks = new Map(
  [...document.querySelectorAll('nav a[href^="#"]')].map((link) => [
    link.getAttribute('href').slice(1),
    link,
  ])
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      sectionLinks.forEach((link) => {
        link.classList.toggle('current', link === sectionLinks.get(entry.target.id));
      });
    });
  },
  { rootMargin: '-30% 0px -60% 0px' }
);

document.querySelectorAll('main section[id]').forEach((section) => {
  if (sectionLinks.has(section.id)) sectionObserver.observe(section);
});
