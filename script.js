/* ===== Navigation ===== */
const nav = document.getElementById('nav');
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== Project Case Toggle ===== */
document.querySelectorAll('.project-card').forEach(card => {
  const info = card.querySelector('.project-card__info');
  const preview = card.querySelector('.project-card__preview');
  const caseEl = card.querySelector('.project-card__case');
  const collapseBtn = card.querySelector('.case__collapse-btn');

  const toggleCase = () => {
    const isOpen = caseEl.classList.contains('open');
    document.querySelectorAll('.project-card__case.open').forEach(openCase => {
      openCase.classList.remove('open');
    });
    if (!isOpen) {
      caseEl.classList.add('open');
      setTimeout(() => {
        caseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const collapseCase = (e) => {
    e.stopPropagation();
    caseEl.classList.remove('open');
  };

  info.addEventListener('click', toggleCase);
  preview.addEventListener('click', toggleCase);
  if (collapseBtn) collapseBtn.addEventListener('click', collapseCase);
});

/* ===== Fade-in on Scroll ===== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
