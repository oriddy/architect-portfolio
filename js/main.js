/* ============================================================
   WEBB STUDIO — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. CUSTOM CURSOR ──────────────────────────────────── */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .filter-btn, .nav__burger, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }

  /* ── 2. SCROLL PROGRESS BAR ────────────────────────────── */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / max) * 100;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── 3. NAV SCROLL BEHAVIOR ────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('.nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ── 4. MOBILE MENU ────────────────────────────────────── */
  const burger  = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ── 5. PAGE TRANSITIONS ───────────────────────────────── */
  const overlay = document.querySelector('.page-transition');

  function navigateTo(href) {
    if (!overlay) { window.location.href = href; return; }
    overlay.classList.remove('enter');
    overlay.classList.add('exit');
    overlay.style.transform = 'scaleY(0)';
    overlay.style.transformOrigin = 'bottom';
    overlay.style.transition = 'transform 0.5s cubic-bezier(0.77,0,0.18,1)';

    requestAnimationFrame(() => {
      overlay.style.transform = 'scaleY(1)';
    });

    setTimeout(() => {
      window.location.href = href;
    }, 520);
  }

  // Intercept internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('//')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(href);
    });
  });

  // Page enter animation
  if (overlay) {
    overlay.style.transform   = 'scaleY(1)';
    overlay.style.transformOrigin = 'top';
    overlay.style.transition  = 'none';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = 'transform 0.6s cubic-bezier(0.77,0,0.18,1)';
        overlay.style.transform  = 'scaleY(0)';
      });
    });
  }

  /* ── 6. SCROLL REVEAL ──────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, parseFloat(delay) * 1000);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal], [data-stagger], .img-wrap').forEach(el => {
    revealObserver.observe(el);
  });

  /* ── 7. COUNTER ANIMATION ──────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target * 10) / 10;
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ── 8. PARALLAX ───────────────────────────────────────── */
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  if (parallaxEls.length) {
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed  = parseFloat(el.dataset.parallax) || 0.3;
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  /* ── 9. PORTFOLIO FILTER ───────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach((item, i) => {
          const cat = item.dataset.category;
          const show = filter === 'all' || cat === filter;

          if (show) {
            item.classList.remove('hidden');
            item.style.animationDelay = (i * 0.05) + 's';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ── 10. TESTIMONIALS SLIDER ───────────────────────────── */
  const testimonials = document.querySelectorAll('.testimonial__slide');
  const dots = document.querySelectorAll('.testimonial__dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(n) {
    testimonials.forEach((s, i) => {
      s.style.opacity = i === n ? '1' : '0';
      s.style.pointerEvents = i === n ? 'auto' : 'none';
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === n));
    currentSlide = n;
  }

  if (testimonials.length > 1) {
    testimonials.forEach((s, i) => {
      s.style.position = 'absolute';
      s.style.inset = '0';
      s.style.transition = 'opacity 0.7s ease';
      s.style.display = 'flex';
      s.style.flexDirection = 'column';
      s.style.alignItems = 'center';
      s.style.justifyContent = 'center';
    });

    const testimonialWrap = document.querySelector('.testimonial__inner');
    if (testimonialWrap) testimonialWrap.style.position = 'relative';

    showSlide(0);

    slideInterval = setInterval(() => {
      showSlide((currentSlide + 1) % testimonials.length);
    }, 5000);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(i);
        slideInterval = setInterval(() => {
          showSlide((currentSlide + 1) % testimonials.length);
        }, 5000);
      });
    });
  } else if (dots.length === 1) {
    dots[0].classList.add('active');
  }

  /* ── 11. CONTACT FORM ──────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate async send
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
        }
      }, 1200);
    });
  }

  /* ── 12. LEGAL SIDEBAR HIGHLIGHT ──────────────────────── */
  const legalSections = document.querySelectorAll('.legal-content h2[id]');
  const legalNavLinks = document.querySelectorAll('.legal-nav__link');

  if (legalSections.length && legalNavLinks.length) {
    const legObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          legalNavLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    legalSections.forEach(s => legObs.observe(s));
  }

  /* ── 13. SMOOTH ANCHOR SCROLL ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ── 14. HERO IMAGE SUBTLE ZOOM ON LOAD ─────────────────── */
  const heroBgImg = document.querySelector('.hero__bg img');
  if (heroBgImg) {
    heroBgImg.style.transform = 'scale(1.05)';
    heroBgImg.style.transition = 'transform 8s ease';
    setTimeout(() => {
      heroBgImg.style.transform = 'scale(1)';
    }, 100);
  }

  /* ── 15. BUTTON HOVER LIFT ─────────────────────────────── */
  // Clean CSS-only hover — no JS transform conflicts.

})();
