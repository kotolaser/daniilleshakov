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
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
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

/* ===== Lightbox ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;

function updateTransform() {
  lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetTransform() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  updateTransform();
}

function openLightbox(src) {
  lightboxImg.src = src;
  resetTransform();
  lightbox.classList.add('lightbox--active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('lightbox--active');
  document.body.style.overflow = '';
}

document.querySelector('.projects__grid').addEventListener('click', (e) => {
  const img = e.target.closest('.project-card img');
  if (img && img.src && !img.closest('.project-card__preview')) {
    openLightbox(img.src);
  }
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

lightbox.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale = Math.max(1, Math.min(5, scale + delta));
  updateTransform();
}, { passive: false });

lightboxImg.addEventListener('dblclick', (e) => {
  if (scale > 1) {
    resetTransform();
  } else {
    scale = 2.5;
    updateTransform();
  }
});

lightboxImg.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  lightboxImg.classList.add('lightbox__image--dragging');
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  updateTransform();
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    lightboxImg.classList.remove('lightbox__image--dragging');
  }
});

let touchStartX, touchStartY, lastTouchDist;
let isPinching = false;

lightboxImg.addEventListener('touchstart', (e) => {
  const touches = e.touches;
  if (touches.length === 1) {
    isDragging = true;
    touchStartX = touches[0].clientX - translateX;
    touchStartY = touches[0].clientY - translateY;
    lightboxImg.classList.add('lightbox__image--dragging');
  } else if (touches.length === 2) {
    isDragging = false;
    isPinching = true;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    lastTouchDist = Math.sqrt(dx * dx + dy * dy);
  }
}, { passive: true });

lightboxImg.addEventListener('touchmove', (e) => {
  const touches = e.touches;
  if (touches.length === 1 && isDragging) {
    translateX = touches[0].clientX - touchStartX;
    translateY = touches[0].clientY - touchStartY;
    updateTransform();
  } else if (touches.length === 2 && isPinching) {
    e.preventDefault();
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    scale = Math.max(1, Math.min(5, scale * (dist / lastTouchDist)));
    lastTouchDist = dist;
    updateTransform();
  }
}, { passive: false });

['touchend', 'touchcancel'].forEach(event => {
  lightboxImg.addEventListener(event, () => {
    isDragging = false;
    isPinching = false;
    lightboxImg.classList.remove('lightbox__image--dragging');
  });
});

/* ===== Zoomable image wrapper ===== */
document.querySelectorAll('.case__block img').forEach(img => {
  if (img.closest('.img-wrap')) return;
  const wrap = document.createElement('div');
  wrap.className = 'img-wrap';
  img.parentNode.insertBefore(wrap, img);
  wrap.appendChild(img);

  const icon = document.createElement('span');
  icon.className = 'img-wrap__icon';
  icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
  wrap.appendChild(icon);
});

/* ===== Copy Button ===== */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy');
    const copyIcon = btn.querySelector('.copy-icon');
    const checkIcon = btn.querySelector('.check-icon');

    try {
      await navigator.clipboard.writeText(text);
      copyIcon.style.display = 'none';
      checkIcon.style.display = 'block';

      setTimeout(() => {
        copyIcon.style.display = 'block';
        checkIcon.style.display = 'none';
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });
});
