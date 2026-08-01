document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // Header
  const updateHeader = () => {
    header.classList.toggle('header-scrolled', window.scrollY > 40);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Mobile menu
  const closeMenu = () => {
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('is-open', isOpen);
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Parallax
  const hero = document.getElementById('hero');
  const parallax = document.querySelector('.hero-parallax');

  const updateParallax = () => {
    if (!hero || !parallax || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, -rect.top / hero.offsetHeight));
    parallax.style.transform = `scale(1.08) translate3d(0, ${progress * 35}px, 0)`;
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // One-time section animations.
  const sections = document.querySelectorAll('.section-reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -7% 0px'
  });

  sections.forEach(section => observer.observe(section));

  // Brands slider
  const brandsSwiper = new Swiper('.brands-swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 34,
    loop: true,
    speed: 700,
    grabCursor: true,
    navigation: {
      prevEl: '.brands-prev',
      nextEl: '.brands-next'
    },
    breakpoints: {
      640: {
        spaceBetween: 44
      },
      1024: {
        spaceBetween: 64
      }
    }
  });

  // Offers slider
  const offersSwiper = new Swiper('.offers-swiper', {
    slidesPerView: 1.08,
    spaceBetween: 16,
    speed: 700,
    grabCursor: true,
    navigation: {
      prevEl: '.offers-prev',
      nextEl: '.offers-next'
    },
    breakpoints: {
      640: {
        slidesPerView: 1.7,
        spaceBetween: 20
      },
      900: {
        slidesPerView: 2.2,
        spaceBetween: 24
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24
      }
    }
  });

  // Offer modal
  const modal = document.getElementById('offer-modal');
  const modalPanel = modal.querySelector('.modal-panel');
  const modalClose = document.getElementById('modal-close');
  const modalContact = document.getElementById('modal-contact');
  const modalKicker = document.getElementById('modal-kicker');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');

  const offers = [
    {
      kicker: 'Предложение 01',
      title: 'Персональный подбор',
      description: 'Расскажите специалисту о вашем помещении, задачах и бюджете. Мы поможем подобрать бытовую и встраиваемую технику и подготовим персональное ценовое предложение. Экспертная консультация предоставляется бесплатно.'
    },
    {
      kicker: 'Предложение 02',
      title: 'Комплексное оснащение',
      description: 'Берём на себя комплексный подбор техники для объектов любого уровня «под ключ». Работаем с архитекторами, дизайнерами интерьеров и производителями корпусной мебели.'
    },
    {
      kicker: 'Предложение 03',
      title: 'Бесплатная доставка',
      description: 'В ТЗ указана бесплатная доставка как одно из преимуществ сервиса. Точные условия, география и ограничения необходимо уточнить у компании перед публикацией.'
    },
    {
      kicker: 'Предложение 04',
      title: 'Промо предложения',
      description: 'Актуальные акции и специальные предложения на отдельные категории техники. Конкретные условия акции необходимо заполнить перед публикацией.'
    }
  ];

  const openModal = (index) => {
    const offer = offers[index];
    if (!offer) return;

    modalKicker.textContent = offer.kicker;
    modalTitle.textContent = offer.title;
    modalDescription.textContent = offer.description;

    modal.classList.remove('pointer-events-none', 'opacity-0');
    modal.classList.add('opacity-100');
    modalPanel.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    modalPanel.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('[data-offer]').forEach(button => {
    button.addEventListener('click', () => openModal(Number(button.dataset.offer)));
  });

  modalClose.addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

  modalContact.addEventListener('click', closeModal);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
});
