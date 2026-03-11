document.querySelector(".icon-menu")?.addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

// ========= Language Switcher =========
function initLangSwitcher() {
  const switchers = document.querySelectorAll('.lang-switcher');
  
  switchers.forEach(switcher => {
    const btn = switcher.querySelector('.lang-switcher__btn');
    const items = switcher.querySelectorAll('.lang-switcher__item');
    
    // Toggle dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other switchers
      document.querySelectorAll('.lang-switcher').forEach(s => {
        if (s !== switcher) s.classList.remove('open');
      });
      switcher.classList.toggle('open');
    });
    
    // Language selection
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = item.dataset.lang;
        
        // Close dropdown
        switcher.classList.remove('open');
        
        // Translate page
        if (translations[lang]) {
          translatePage(lang);
          localStorage.setItem('asl-lang', lang);
        } else {
          console.error('Translations not found for language:', lang);
        }
      });
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    switchers.forEach(s => s.classList.remove('open'));
  });
}

document.addEventListener('DOMContentLoaded', initLangSwitcher);

// Simple carousel controls for rows on mobile
function initCarousels() {
  const rows = document.querySelectorAll(".services__row, .news__row");
  rows.forEach((row) => {
    if (row.dataset.carouselInit) return;
    row.dataset.carouselInit = "true";

    // Skip if this is on assortment page (brand carousel will handle it)
    if (document.body.classList.contains('assortment')) {
      return;
    }
    
    // Skip services carousel on homepage - it uses pagination dots instead
    if (row.classList.contains('services__row') && !document.body.classList.contains('assortment')) {
      return;
    }

    const nav = document.createElement("div");
    nav.className = "carousel-nav";
    const prev = document.createElement("button");
    prev.className = "carousel-nav__btn carousel-nav__btn_prev";
    prev.setAttribute("aria-label", "Попереднє");
    prev.innerHTML = "&#10094;"; // «
    const next = document.createElement("button");
    next.className = "carousel-nav__btn carousel-nav__btn_next";
    next.setAttribute("aria-label", "Наступне");
    next.innerHTML = "&#10095;"; // »
    nav.appendChild(prev);
    nav.appendChild(next);

    // insert nav after the row
    row.parentNode.insertBefore(nav, row.nextSibling);

    const scrollByAmount = () => {
      // For news, scroll by one card width
      if (row.classList.contains('news__row')) {
        const firstCard = row.querySelector('.news__column');
        return firstCard ? firstCard.offsetWidth + 16 : row.clientWidth * 0.9;
      }
      return Math.max(row.clientWidth * 0.9, 300);
    };
    
    prev.addEventListener("click", () => {
      row.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
    });
    next.addEventListener("click", () => {
      row.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
    });
  });
}

document.addEventListener("DOMContentLoaded", initCarousels);

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Scroll reveal animations
function initScrollReveal() {
  const targets = document.querySelectorAll(
    [
      ".item-services",
      ".news__item",
      ".about__content",
      ".item-testimonial",
      ".testimonial__quote",
      ".reviews__item",
      ".services-page__item",
      ".gallery__item",
      ".resources__img",
      ".team__item",
      ".outro__text",
      ".contact__text",
      ".connect-contact__item",
      ".contact__form-wrapper",
      ".contact-form__group",
      ".vacancy-card",
    ].join(",")
  );

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // If not supported or user prefers reduced motion, show immediately
    targets.forEach((el) => el.classList.add("in-view"));
    document.querySelectorAll(".about__image").forEach((el) => el.classList.add("in-view"));
    return;
  }

  targets.forEach((el) => { el.classList.add("reveal-up"); });

  // Special handling for about__image to ensure stable animation
  const aboutImages = document.querySelectorAll(".about__image");
  aboutImages.forEach((imageContainer) => {
    imageContainer.classList.add("reveal-up");
    
    // Wait for image to load before observing
    const img = imageContainer.querySelector("img");
    if (img) {
      if (img.complete && img.naturalHeight !== 0) {
        // Image already loaded
        initImageObserver(imageContainer);
      } else {
        // Wait for image to load
        img.addEventListener("load", () => {
          initImageObserver(imageContainer);
        }, { once: true });
        // Fallback in case load event doesn't fire
        img.addEventListener("error", () => {
          initImageObserver(imageContainer);
        }, { once: true });
      }
    } else {
      // No image found, observe immediately
      initImageObserver(imageContainer);
    }
  });

  // Fancy effects for headings (home and common)
  const headingLeft = document.querySelectorAll(
    ".about__title, .news__title, .testiomonial__caption, .about__text, .about__button"
  );
  const headingRight = document.querySelectorAll(
    ".services__title, .outro__title, .contact__title"
  );

  headingLeft.forEach((el) => el.classList.add("reveal-left"));
  headingRight.forEach((el) => el.classList.add("reveal-right"));

  // Staggered character reveal for main section titles
  const charTargets = document.querySelectorAll(
    ".about__title, .services__title, .news__title, .outro__title, .testimonial__title, .contact__title"
  );
  charTargets.forEach((el) => wrapChars(el));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px" }
  );

  const observeThese = [
    ...targets,
    ...headingLeft,
    ...headingRight,
    ...document.querySelectorAll(".reveal-chars")
  ];
  observeThese.forEach((el) => observer.observe(el));
}

// Special observer for about__image with better settings
function initImageObserver(imageContainer) {
  if (!imageContainer || imageContainer.dataset.observed) return;
  imageContainer.dataset.observed = "true";

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          imageObserver.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.2,
      rootMargin: "50px 0px"
    }
  );

  imageObserver.observe(imageContainer);
}

document.addEventListener("DOMContentLoaded", initScrollReveal);

// util: wrap text content of an element into span.reveal-char with staggered delays
function wrapChars(element) {
  if (!element || element.dataset.charsWrapped) return;
  const text = element.textContent;
  element.textContent = "";
  element.classList.add("reveal-chars");
  [...text].forEach((ch, i) => {
    if (ch === " ") {
      element.appendChild(document.createTextNode(" "));
      return;
    }
    const span = document.createElement("span");
    span.className = "reveal-char";
    span.textContent = ch;
    span.style.setProperty("--rd", `${Math.min(i * 0.03, 0.6)}s`);
    element.appendChild(span);
  });
  element.dataset.charsWrapped = "true";
}

// ========= Assortment page: logo-only carousels =========
function initBrandCarousels() {
  const isAssortment = document.body.classList.contains("assortment");
  if (!isAssortment) return;

  const sections = document.querySelectorAll('.page__services.services');
  sections.forEach((section) => {
    if (section.dataset.brandCarouselInit) return;
    section.dataset.brandCarouselInit = 'true';

    // collect logos from existing items
    const items = [...section.querySelectorAll('.services__item')];
    if (items.length === 0) return;
    const logos = items.map((it) => {
      const link = it.querySelector('.item-services__top') || it.querySelector('a') || it;
      const href = link?.getAttribute('href') || '#';
      const img = it.querySelector('.item-services__image img') || it.querySelector('img');
      const src = img?.getAttribute('src');
      const alt = img?.getAttribute('alt') || 'Бренд';
      return { href, src, alt };
    }).filter(v => v.src);

    // build carousel UI
    // Wrapper that centers everything regardless of parent styles
    const carouselWrapper = document.createElement('div');
    carouselWrapper.style.cssText = 'width:100%;display:block;text-align:center;';

    const carousel = document.createElement('div');
    carousel.className = 'brand-carousel';
    carousel.style.cssText = 'position:relative;overflow:visible;margin:2rem auto 0;display:block;';

    const viewport = document.createElement('div');
    viewport.className = 'brand-carousel__viewport';

    carousel.appendChild(viewport);
    carouselWrapper.appendChild(carousel);

    // Navigation buttons container (below carousel)
    const navContainer = document.createElement('div');
    navContainer.className = 'carousel-nav';
    navContainer.style.cssText = 'display:flex;justify-content:center;align-items:center;gap:1rem;margin-top:1.5rem;width:100%;';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'brand-carousel__btn brand-carousel__btn_prev';
    prevBtn.setAttribute('aria-label', 'Попередній бренд');
    prevBtn.innerHTML = '&#10094;';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'brand-carousel__btn brand-carousel__btn_next';
    nextBtn.setAttribute('aria-label', 'Наступний бренд');
    nextBtn.innerHTML = '&#10095;';

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    carouselWrapper.appendChild(navContainer);

    // view all button and list
    const viewAllWrap = document.createElement('div');
    viewAllWrap.className = 'brand-viewall';
    viewAllWrap.style.cssText = 'text-align:center;margin-top:2rem;width:100%;';
    const viewAllBtn = document.createElement('a');
    viewAllBtn.href = '#';
    viewAllBtn.className = 'button';
    viewAllBtn.setAttribute('data-i18n', 'assortment.viewall');
    viewAllBtn.textContent = 'Переглянути всі бренди';
    viewAllWrap.appendChild(viewAllBtn);
    carouselWrapper.appendChild(viewAllWrap);

    const fullList = document.createElement('div');
    fullList.className = 'brand-list';
    logos.forEach(({href, src, alt}) => {
      const item = document.createElement('a');
      item.href = href;
      const im = document.createElement('img');
      im.src = src; im.alt = alt;
      im.style.width = '140px';
      im.style.height = '140px';
      im.style.objectFit = 'cover';
      im.style.borderRadius = '12px';
      item.appendChild(im);
      fullList.appendChild(item);
    });

    section.querySelector('.services__container').appendChild(carouselWrapper);
    section.querySelector('.services__container').appendChild(fullList);

    let index = 0;
    function makeSlide(data) {
      const slide = document.createElement('div');
      slide.className = 'brand-slide';
      const a = document.createElement('a');
      a.href = data.href;
      const img = document.createElement('img');
      img.src = data.src; img.alt = data.alt;
      a.appendChild(img);
      slide.appendChild(a);
      return slide;
    }

    function renderInitial() {
      viewport.innerHTML = '';
      // create 4 persistent slides: peekLeft, mainLeft, mainRight, peekRight
      nodes.peekLeft = makeSlide(logos[(index - 1 + logos.length) % logos.length]);
      nodes.mainLeft = makeSlide(logos[index % logos.length]);
      nodes.mainRight = makeSlide(logos[(index + 1) % logos.length]);
      nodes.peekRight = makeSlide(logos[(index + 2) % logos.length]);
      viewport.appendChild(nodes.peekLeft);
      viewport.appendChild(nodes.mainLeft);
      viewport.appendChild(nodes.mainRight);
      viewport.appendChild(nodes.peekRight);
      layout();
    }
    const nodes = { peekLeft:null, mainLeft:null, mainRight:null, peekRight:null };
    const state = { W: null, GAP: null };
    const PEEK_VISIBLE = 0.60; // видимая доля соседнего логотипа (20%)
    const PEEK_SCALE = 0.82;   // масштаб задних логотипов (меньше = дальше)
    const PEEK_OPACITY = 0.35; // прозрачность задних логотипов
    function getGap(){
      const s = getComputedStyle(carousel).getPropertyValue('--brand-gap');
      const v = parseFloat(s);
      return isNaN(v) ? 30 : v;
    }
    function layout() {
      if (state.GAP == null) state.GAP = getGap();
      const GAP = state.GAP;
      // вимірюємо фактичну ширину логотипа
      if (state.W == null) {
        const anyImg = (nodes.mainLeft && nodes.mainLeft.querySelector('img')) || (nodes.mainRight && nodes.mainRight.querySelector('img'));
        state.W = anyImg ? Math.round(anyImg.getBoundingClientRect().width) : 260;
      }
      const W = state.W;
      const totalW = 2 * W + GAP;

      // Примусово центруємо через inline styles — перебиваємо будь-який CSS
      viewport.style.cssText = `position:relative;left:auto;right:auto;transform:none;width:${totalW}px;height:${W}px;margin:0 auto;overflow:visible;display:block;`;
      carousel.style.width = `${totalW}px`;
      carousel.style.marginLeft = 'auto';
      carousel.style.marginRight = 'auto';
      // кнопки — 100% ширини контейнера, justify-content:center центрує їх по середині сторінки
      navContainer.style.width = '100%';
      navContainer.style.position = 'static';
      navContainer.style.marginLeft = '0';
      navContainer.style.marginRight = '0';

      // offsets from center
      const mainL = - (GAP/2 + W/2);
      const mainR =   (GAP/2 + W/2);
      const peekOffset = W * (1 - PEEK_VISIBLE);
      const peekL = - (GAP/2 + W/2 + peekOffset);
      const peekR =   (GAP/2 + W/2 + peekOffset);

      carousel.style.setProperty('--brand-logo-w', `${W}px`);
      if (nodes.peekLeft)  { nodes.peekLeft.style.transform  = `translateX(${peekL}px) scale(${PEEK_SCALE})`; nodes.peekLeft.style.opacity = PEEK_OPACITY; nodes.peekLeft.style.zIndex = 1; }
      if (nodes.mainLeft)  { nodes.mainLeft.style.transform  = `translateX(${mainL}px) scale(1)`; nodes.mainLeft.style.opacity = 1; nodes.mainLeft.style.zIndex = 3; }
      if (nodes.mainRight) { nodes.mainRight.style.transform = `translateX(${mainR}px) scale(1)`; nodes.mainRight.style.opacity = 1; nodes.mainRight.style.zIndex = 3; }
      if (nodes.peekRight) { nodes.peekRight.style.transform = `translateX(${peekR}px) scale(${PEEK_SCALE})`; nodes.peekRight.style.opacity = PEEK_OPACITY; nodes.peekRight.style.zIndex = 1; }
    }
    renderInitial();
    let animating = false;
    const DURATION = 350;

    const next = () => {
      if (animating) return; animating = true;
      // Precompute what image should be on the new peekRight after rotation (future index = index + 1)
      const futureIndex = (index + 1) % logos.length;
      const futurePeekRightIndex = (futureIndex + 2) % logos.length;
      // rotate roles: PL->PR, ML->PL, MR->ML, PR->MR
      nodes.peekLeft.style.transition = nodes.mainLeft.style.transition = nodes.mainRight.style.transition = nodes.peekRight.style.transition = '';
      const tempPL = nodes.peekLeft;
      nodes.peekLeft = nodes.mainLeft;
      nodes.mainLeft = nodes.mainRight;
      nodes.mainRight = nodes.peekRight;
      nodes.peekRight = tempPL;
      // immediately set the correct image for the new peekRight to avoid any flicker/duplication
      {
        const img = nodes.peekRight.querySelector('img');
        img.src = logos[futurePeekRightIndex].src; img.alt = logos[futurePeekRightIndex].alt;
        const a = nodes.peekRight.querySelector('a'); a.href = logos[futurePeekRightIndex].href;
      }
      layout();
      setTimeout(() => {
        index = (index + 1) % logos.length;
        animating = false;
        layout(); // ensure front logos are fully opaque after transition
      }, DURATION);
    };

    const prev = () => {
      if (animating) return; animating = true;
      // Precompute what image should be on the new peekLeft after rotation (future index = index - 1)
      const futureIndex = (index - 1 + logos.length) % logos.length;
      const futurePeekLeftIndex = (futureIndex - 1 + logos.length) % logos.length;
      // rotate roles: PR->PL, MR->PR, ML->MR, PL->ML
      const tempPR = nodes.peekRight;
      nodes.peekRight = nodes.mainRight;
      nodes.mainRight = nodes.mainLeft;
      nodes.mainLeft = nodes.peekLeft;
      nodes.peekLeft = tempPR;
      // immediately set the correct image for the new peekLeft to avoid any flicker/duplication
      {
        const img = nodes.peekLeft.querySelector('img');
        img.src = logos[futurePeekLeftIndex].src; img.alt = logos[futurePeekLeftIndex].alt;
        const a = nodes.peekLeft.querySelector('a'); a.href = logos[futurePeekLeftIndex].href;
      }
      layout();
      setTimeout(() => {
        index = (index - 1 + logos.length) % logos.length;
        animating = false;
        layout(); // ensure front logos are fully opaque after transition
      }, DURATION);
    };
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // autoplay, pause on hover
    let timer = setInterval(next, 2000);
    carousel.addEventListener('mouseenter', () => { clearInterval(timer); });
    carousel.addEventListener('mouseleave', () => { timer = setInterval(next, 2000); });

    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get category name from section title
      const categoryTitleEl = section.querySelector('.services__title');
      const categoryName = categoryTitleEl ? categoryTitleEl.textContent.trim() : 'Всі бренди';
      
      // Get section ID for anchor link
      const sectionId = section.id || '';
      const anchorLink = sectionId ? `assortiment.html#${sectionId}` : 'assortiment.html';
      
      // Category descriptions
      const categoryDescriptions = {
        'Оливи': 'Моторні, трансмісійні та гідравлічні оливи від провідних виробників для надійної роботи вашого автомобіля.',
        'Акумулятори': 'Якісні автомобільні акумулятори різних ємностей від провідних виробників з гарантією якості.',
        'Автохімія': 'Рідини та засоби для догляду за автомобілем: шампуні, поліролі та спеціальні засоби для очищення.',
        'Антифриз': 'Антифриз та охолоджуючі рідини для ефективної роботи системи охолодження двигуна.',
        'Гальмівні рідини': 'Гальмівні рідини різних класів DOT для безпечної та надійної роботи гальмової системи.',
        'Фільтри': 'Повітряні, масляні та паливні фільтри для якісної очистки та захисту двигуна.',
        'Омивач скла': 'Концентрати та готові рідини для омивача скла, ефективні в будь-яку погоду.',
        'Мастила': 'Пластичні мастила для підшипників, вузлів тертя та спеціальних застосувань.'
      };
      
      // Category background images
      const categoryBackgrounds = {
        'Оливи': 'Materials/oil.webp',
        'Акумулятори': 'Materials/AKM.webp',
        'Автохімія': 'Materials/Avtohim.webp',
        'Антифриз': 'Materials/Antifriz.webp',
        'Гальмівні рідини': 'Materials/tormoz.webp',
        'Фільтри': 'Materials/filter.webp',
        'Омивач скла': 'Materials/steklo.webp',
        'Мастила': 'Materials/ed35faa954b465a3c3ff55526ad27c12.webp'
      };
      
      const categoryDescription = categoryDescriptions[categoryName] || 'Широкий вибір продукції від провідних виробників.';
      const categoryBackground = categoryBackgrounds[categoryName] || 'Materials/fonassortiment.webp';
      
      // Replace current URL (don't add to history)
      const uniqueUrl = `assortiment.html?view=all&category=${sectionId}`;
      history.replaceState({viewAll: true, category: sectionId}, '', uniqueUrl);
      
      // Render all brands grid in the same tab with header
      const title = categoryName;
      const listHtml = logos.map(({href,src,alt}) =>
        `<a href="${href}"><img src="${src}" alt="${alt}"></a>`
      ).join('');
      const html = `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} - ASL Company</title><link rel="stylesheet" href="css/style.css?v=4" /><link rel="stylesheet" href="css/responsive-new.css?v=6" /><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css" /></head><body>
        <div class="wrapper">
        <header class="header">
          <div class="header__container">
            <a href="index.html" class="header__logo logo"><img src="Materials/erasebg-transformed.webp" alt="ASL Company logo" /></a>
            <div class="header__navigation">
              <div class="header__menu menu">
                <nav class="menu__body">
                  <ul class="menu__list">
                    <li class="menu__item"><a href="index.html" class="menu__link">Головна</a></li>
                    <li class="menu__item"><a href="about.html" class="menu__link">Про нас</a></li>
                    <li class="menu__item"><a href="assortiment.html" class="menu__link">Асортимент</a></li>
                    <li class="menu__item"><a href="news.html" class="menu__link">Новини</a></li>
                    <li class="menu__item"><a href="vacancies.html" class="menu__link">Вакансії</a></li>
                    <li class="menu__item"><a href="reviews.html" class="menu__link">Відгуки</a></li>
                    <li class="menu__item"><a href="contact.html" class="menu__link">Контакти</a></li>
                  </ul>
                  <a href="contact.html" class="actions-header__button">Замовити</a>
                </nav>
              </div>
              <div class="header__actions actions-header">
                <div class="lang-switcher">
                  <button type="button" class="lang-switcher__btn" aria-label="Вибрати мову">
                    <span class="lang-switcher__code">UA</span>
                    <span class="lang-switcher__arrow">▼</span>
                  </button>
                  <ul class="lang-switcher__dropdown">
                    <li class="lang-switcher__item lang-switcher__item--active" data-lang="ua">
                      <span class="lang-switcher__flag">ᴜᴀ</span>
                      <span class="lang-switcher__label">Українська</span>
                    </li>
                    <li class="lang-switcher__item" data-lang="ru">
                      <span class="lang-switcher__flag">ʀᴜ</span>
                      <span class="lang-switcher__label">Русский</span>
                    </li>
                    <li class="lang-switcher__item" data-lang="en">
                      <span class="lang-switcher__flag">ᴇɴ</span>
                      <span class="lang-switcher__label">English</span>
                    </li>
                  </ul>
                </div>
                <button type="button" class="menu__icon icon-menu"><span></span></button>
              </div>
            </div>
          </div>
        </header>
        <main class="page">
        <section class="page__main main main_services main_pages" style="background:url('${categoryBackground}') center top/cover no-repeat;">
          <div class="main__container main__container_pages">
            <h1 class="main__title" data-i18n-dynamic="${sectionId}">${title}</h1>
            <div class="main__text main__text_pages" data-i18n-dynamic="${sectionId}-desc">${categoryDescription}</div>
          </div>
        </section>
        <section class="page__services services">
        <div class="services__container">
          <h2 class="services__title title hero-reveal hero-reveal--2" data-i18n="assortment.allbrands">Всі бренди</h2>
          <div class="brands-grid" style="display:grid;grid-template-columns:repeat(auto-fit,152px);gap:35px;justify-content:center;">
            ${logos.map(({href,src,alt}) => {
              const isVegaInBatteries = categoryName === 'Акумулятори' && (alt === 'VEGA' || alt === 'vega' || alt.toLowerCase() === 'vega');
              const isVenolOrKixxInOils = categoryName === 'Оливи' && (alt === 'VENOL' || alt === 'Kixx' || alt.toLowerCase() === 'venol' || alt.toLowerCase() === 'kixx');
              const isKSMInGreases = categoryName === 'Мастила' && (alt === 'KSN' || alt === 'KSM' || alt.toLowerCase() === 'ksn' || alt.toLowerCase() === 'ksm');
              const needsWhiteBg = (isVegaInBatteries || isVenolOrKixxInOils || isKSMInGreases);
              const containerBg = needsWhiteBg ? 'transparent' : '#1a1a1a';
              const imgWrapperStyle = needsWhiteBg ? 'background:#fff;border:1px solid rgba(128, 128, 128, 0.4);border-radius:8px;padding:0;display:block;width:100%;height:142px;position:relative;' : '';
              const imgStyle = needsWhiteBg ? 'width:100%;height:100%;object-fit:contain;border-radius:8px;display:block;' : 'width:100%;height:142px;object-fit:cover;border-radius:8px;';
              const brandMatch = href.match(/brand=([^&]+)/);
              const brandKey = brandMatch ? decodeURIComponent(brandMatch[1]) : '';
              const _cc = {'ADVA':'pl','Venol':'de','Kixx':'kr','K1 Lube':'kr','Topla':'si','autopart':'pl','K2':'pl','Senfineco':'de','Atas':'it','Wix Filters':'pl','Knecht':'de','ADVA-brakes':'pl','Venol-brakes':'de','Venol-coolants':'de','Luksusowy':'pl','RONDEX':'pl','Plax':'pl','Plax-coolants':'pl','Plax-washer':'pl','QUANTUM-washer':'pl','Autoglas':'pl','Кама-coolants':'ua','Quantum-coolants':'ua'}[brandKey] || 'ua';
              const flagHtml = `<span class="fi fi-${_cc}" style="position:absolute;top:4px;right:4px;font-size:16px;border-radius:2px;box-shadow:0 1px 4px rgba(0,0,0,0.4);z-index:2;"></span>`;
              if (needsWhiteBg) {
                return `<a href="${href}" style="display:block;width:152px;border:1px solid #D4AF37;border-radius:12px;padding:8px;background:${containerBg};transition:transform 0.3s ease;"><div style="${imgWrapperStyle}">${flagHtml}<img src="${src}" alt="${alt}" style="${imgStyle}"></div></a>`;
              } else {
                return `<a href="${href}" style="display:block;width:152px;border:1px solid #D4AF37;border-radius:12px;padding:8px;background:${containerBg};transition:transform 0.3s ease;"><div style="position:relative;width:100%;height:142px;border-radius:8px;overflow:hidden;">${flagHtml}<img src="${src}" alt="${alt}" style="${imgStyle}"></div></a>`;
              }
            }).join('')}
          </div>
          <div style="text-align:center;margin-top:40px;">
            <a class="button back-to-assortment" href="${anchorLink}" style="background:transparent;border:2px solid #D4AF37;color:#D4AF37;" data-i18n="assortment.back">Назад до асортименту</a>
          </div>
        </div>
        </section>
        <section class="page__outro outro outro_services">
          <div class="outro__container">
            <h2 class="outro__title title" data-i18n="assortment.outro.title">Зв'яжіться з нами</h2>
            <div class="outro__text" data-i18n="assortment.outro.text">
              Зацікавила наша продукція? Зв'яжіться з нами для отримання додаткової інформації та консультації.
            </div>
            <a href="contact.html" class="outro__button button" data-i18n="assortment.outro.button">Контакти</a>
          </div>
        </section>
        </main>
        <footer class="footer">
          <div class="footer__container">
            <a href="#" class="footer__policy" data-i18n="footer.policy">Політика конфіденційності – Умови використання</a>
            <a href="index.html" class="footer__logo logo"><img src="Materials/erasebg-transformed.webp" alt="ASL Company logo" /></a>
            <div class="footer__copyright" data-i18n="footer.copyright">Copyright © 2025 ASL Company – Всі права захищені</div>
          </div>
        </footer>
        </div>
        <style>
          .back-to-assortment:hover {
            background: #D4AF37 !important;
            color: #0a0a0a !important;
          }
          
          /* Mobile menu styles */
          @media (max-width: 767px) {
            .icon-menu {
              display: block;
              width: 30px;
              height: 22px;
              position: relative;
              cursor: pointer;
              background: none;
              border: none;
              z-index: 1001;
            }
            
            .icon-menu span,
            .icon-menu::before,
            .icon-menu::after {
              content: "";
              position: absolute;
              left: 0;
              width: 100%;
              height: 2px;
              background-color: #D4AF37;
              transition: all 0.3s ease;
            }
            
            .icon-menu::before { top: 0; }
            .icon-menu span { top: 50%; margin-top: -1px; }
            .icon-menu::after { bottom: 0; }
            
            .menu-open .icon-menu span { transform: scale(0); }
            .menu-open .icon-menu::before { top: 50%; transform: rotate(-45deg); margin-top: -1px; }
            .menu-open .icon-menu::after { bottom: 50%; transform: rotate(45deg); margin-bottom: -1px; }
            
            .menu__body {
              position: absolute;
              top: 100%;
              right: 1rem;
              width: 220px;
              max-width: calc(100vw - 2rem);
              margin-top: 0.5rem;
              background: rgba(10, 10, 10, 0.75);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(212, 175, 55, 0.4);
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
              opacity: 0;
              visibility: hidden;
              transform: translateY(-10px);
              transition: all 0.25s ease;
              z-index: 1000;
              padding: 0.5rem 0;
            }
            
            .menu-open .menu__body {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }
            
            .menu__list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            
            .menu__item {
              border-bottom: 1px solid rgba(212, 175, 55, 0.1);
            }
            
            .menu__item:last-child {
              border-bottom: none;
            }
            
            .menu__link {
              display: block;
              padding: 0.875rem 1.25rem;
              color: #e8e8e8;
              text-decoration: none;
              transition: background 0.2s ease;
              font-size: 1rem;
            }
            
            .menu__link:hover {
              background: rgba(212, 175, 55, 0.15);
              color: #D4AF37;
            }
            
            .menu__body .actions-header__button {
              display: block;
              margin: 0.75rem 1.25rem;
              padding: 0.75rem 1.5rem;
              text-align: center;
              background: transparent;
              border: 2px solid #D4AF37;
              color: #D4AF37;
              text-decoration: none;
              border-radius: 8px;
              transition: all 0.3s ease;
            }
            
            .menu__body .actions-header__button:hover {
              background: #D4AF37;
              color: #0a0a0a;
            }
          }
        </style>
        <script>
          document.querySelector(".icon-menu")?.addEventListener("click", function(event) {
            event.preventDefault();
            document.body.classList.toggle("menu-open");
          });
          
          // Close menu when clicking outside
          document.addEventListener('click', function(event) {
            const menuBody = document.querySelector(".menu__body");
            const iconMenu = document.querySelector(".icon-menu");
            const isMenuOpen = document.body.classList.contains("menu-open");
            
            if (isMenuOpen && menuBody && !menuBody.contains(event.target) && !iconMenu.contains(event.target)) {
              document.body.classList.remove("menu-open");
            }
          });
          
          // Close menu when clicking on menu links
          document.querySelectorAll(".menu__link").forEach(link => {
            link.addEventListener("click", function() {
              document.body.classList.remove("menu-open");
            });
          });
        </script>
        <script src="js/translations.js"></script>
        <script src="js/i18n-init.js"></script>
        <script>
          // Initialize language switcher
          function initLangSwitcher() {
            const switchers = document.querySelectorAll('.lang-switcher');
            
            switchers.forEach(switcher => {
              const btn = switcher.querySelector('.lang-switcher__btn');
              const items = switcher.querySelectorAll('.lang-switcher__item');
              
              if (!btn) return;
              
              // Toggle dropdown
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close other switchers
                document.querySelectorAll('.lang-switcher').forEach(s => {
                  if (s !== switcher) s.classList.remove('open');
                });
                switcher.classList.toggle('open');
              });
              
              // Language selection
              items.forEach(item => {
                item.addEventListener('click', (e) => {
                  e.stopPropagation();
                  const lang = item.dataset.lang;
                  
                  // Close dropdown
                  switcher.classList.remove('open');
                  
                  // Translate page
                  if (typeof translations !== 'undefined' && translations[lang]) {
                    translatePage(lang);
                    localStorage.setItem('asl-lang', lang);
                  }
                });
              });
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
              switchers.forEach(s => s.classList.remove('open'));
            });
          }
          
          // Apply saved language on page load
          function applySavedLanguage() {
            const savedLang = localStorage.getItem('asl-lang');
            if (savedLang && typeof translations !== 'undefined' && translations[savedLang]) {
              translatePage(savedLang);
              
              // Update active state in language switcher
              document.querySelectorAll('.lang-switcher__item').forEach(item => {
                if (item.dataset.lang === savedLang) {
                  item.classList.add('lang-switcher__item--active');
                } else {
                  item.classList.remove('lang-switcher__item--active');
                }
              });
              
              // Update button text
              const langCodes = { ua: 'UA', ru: 'RU', en: 'EN' };
              document.querySelectorAll('.lang-switcher__code').forEach(code => {
                code.textContent = langCodes[savedLang] || 'UA';
              });
            }
          }
          
          // Initialize on load
          initLangSwitcher();
          applySavedLanguage();
        </script>
      </body></html>`;
      document.open();
      document.write(html);
      document.close();
    });
  });
}

document.addEventListener('DOMContentLoaded', initBrandCarousels);

// ========= Brand descriptions translations =========
// Brand descriptions are now loaded from js/brand-descriptions.js
// Ukrainian descriptions are taken from brandsData (fallback in updateBrandDescription function)

// ========= Brand page: dynamic content loading =========
function initBrandPage() {
  const isBrandPage = window.location.pathname.includes('brand.html');
  if (!isBrandPage) return;

  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const brandParam = urlParams.get('brand');
  const categoryParam = urlParams.get('category');

  if (!brandParam) return;

  // Brand data - all brands from assortment
  // Make it accessible globally for translation function
  window.brandsData = {
    // Оливи
    'HighWay': {
      name: 'HighWay',
      image: 'Materials/Highway.webp',
      factoryLogo: '',
      productImage1: 'Materials/HW21.webp',
      productImage2: 'Materials/HW22.webp',
      description: 'Оливи HighWay – це асортимент мастильних матеріалів, що включає моторні оливи, трансмісійні рідини та інші продукти для автомобілів і спецтехніки, які виробляються міжнародною асоціацією Delfin Group.\n\nАсортимент продукції HighWay:\n\nТоргова марка HighWay пропонує широкий спектр мастильних матеріалів для різних типів транспортних засобів та обладнання.\n\nМоторні оливи: Доступні в різних класах в`язкості (наприклад, 5W-30, 5W-40, 10W-40) і складах (синтетичні, напівсинтетичні, мінеральні). Вони призначені як для бензинових, так і для дизельних двигунів, у тому числі обладнаних турбонаддувом.\n\nОливи для мотоциклів: Включають оливи для двотактних (2T) і чотиритактних (4T) двигунів.\n\nІнші рідини: Асортимент також охоплює рідини для автоматичних трансмісій, гідравлічні оливи, гальмівні та охолоджуючі рідини (антифризи G11 та G12+).'
    },
    'oil-right': {
      name: 'Oil Right',
      image: 'Materials/oil-right.webp',
      factoryLogo: '',
      productImage1: 'Materials/OR1.webp',
      productImage2: 'Materials/OR2.webp',
      description: 'Oil Right – це бренд бюджетних мінеральних та напівсинтетичних олив, широко представлений на українському ринку і призначений для різних типів транспортних засобів та промислового обладнання. Асортимент продукції включає моторні, трансмісійні, гідравлічні та індустріальні оливи.\n\nМоторні оливи\n\nМоторні оливи Oil Right представлені в основному мінеральними та напівсинтетичними варіантами, розробленими для забезпечення базового захисту двигунів старих автомобілів та бюджетних застосувань.\n\n Oil Right 10W-40 SG/CD:\n\n   Застосування: Напівсинтетична олива, підходить для бензинових та дизельних двигунів, що вимагають специфікацій API SG/CD.\n\n   Переваги: Забезпечує базовий захист двигуна та підходить для використання в широкому діапазоні температур, що робить її універсальним варіантом для всесезонного використання.\n\n  Oil Right М-8ДМ (20л):\n\nВ`язкість: 20W-20.\n\nСклад: Мінеральна олива.\n\nКласифікація API: CD.\n\nТрансмісійні оливиАсортимент трансмісійних олив включає продукти для різних типів зубчастих передач, включаючи гіпоїдні передачі, які працюють в умовах високих швидкостей та ударних навантажень. \n\n  Oil Right ТАД 17и / TAD 17i:\n\n    Характеристики: Універсальна всесезонна мінеральна олива для трансмісій.\n\n    Застосування: Призначена для змащування всіх типів зубчастих передач автомобілів та іншої мобільної техніки, що експлуатується у складних температурних умовах.'
    },
    'luxe': {
      name: 'LUXE',
      image: 'Materials/luxe.webp',
      factoryLogo: '',
      productImage1: 'Materials/LX1.webp',
      productImage2: 'Materials/LX2.webp',
      description: 'Оливи LUXE — це лінійка моторних масел (синтетичних, напівсинтетичних) для бензинових, дизельних двигунів та спецтехніки, що забезпечують захист від зносу, легкий холодний пуск, чистоту двигуна та сумісність із сучасними системами очищення вихлопу, маючи різноманітні в`язкості (5W-30, 10W-40, 15W-40) та класифікації (API, ACEA).\n\nОсновні характеристики та типи оливи LUXE:\n\nУніверсальність: Призначені для легкових авто, LCV, а також для роботи в умовах міста, траси, змішаного циклу та високих температур.\n\nТипи двигунів: Бензинові та дизельні, з турбонаддувом або без, у тому числі для двигунів, що працюють на газі (LPG/CNG).\n\nВ`язкість: Поширені варіанти, як-от 5W-30, 5W-40, 10W-40, 15W-40, що забезпечують різні режими роботи.\n\nСклад: Базова основа може бути як повністю синтетичною, так і напівсинтетичною (поєднання мінеральних фракцій та синтетичних компонентів).\n\nПереваги: Захист від зносу та тертя. Легкий запуск у холодну погоду. Зменшення витрат палива. Підтримання чистоти двигуна завдяки присадкам. Сумісність із каталізаторами.'
    },
    'ADVA': {
      name: 'ADWA',
      image: 'Materials/ADVA.webp',
      factoryLogo: 'Materials/ADV3.webp',
      productImage1: 'Materials/AD1.webp',
      productImage2: 'Materials/AD2.webp',
      website: 'https://adwa.eu',
      description: 'Оливи ADWA  – це асортимент моторних олив, що включає мінеральні, напівсинтетичні та синтетичні варіанти, призначені для різних типів двигунів та умов експлуатації.\n\nЗагальний опис та характеристики: Оливи ADWA виробляються в Польщі і розроблені для забезпечення надійного та довготривалого захисту двигунів. Вони містять сучасні пакети присадок, які сприяють зменшенню тертя, запобіганню утворенню відкладень і боротьбі з корозією.\n\nЗахист двигуна: Оливи ADWA допомагають захистити критичні компоненти двигуна від зносу та пошкоджень, що подовжує термін його служби.\n\nЧистота: Спеціальні диспергуючі та миючі присадки запобігають накопиченню шламу, сажі та інших забруднень.\n\nУніверсальність: В асортименті є продукти для бензинових, дизельних (в тому числі високофорсованих, з безпосереднім уприскуванням) та двотактних двигунів, а також для різної сільськогосподарської та садової техніки.\n\nТемпературний діапазон: Пропонуються різні класи в`язкості (наприклад, 5W-40, 10W-40, 15W-40), що дозволяє підібрати оливу для використання в широкому діапазоні температур, включаючи важкі умови експлуатації.'
    },
    'Venol': {
      name: 'VENOL',
      image: 'Materials/Venol2.webp',
      factoryLogo: 'Materials/VenOil3.webp',
      productImage1: 'Materials/VE1.webp',
      productImage2: 'Materials/VE2.webp',
      website: 'https://venol.de',
      description: 'Оливи VENOL – це лінійка моторних та трансмісійних мастил, що використовують технологію ACTIVE POWER, забезпечуючи захист двигуна від зносу, легкий запуск у холод, підтримку чистоти двигуна та зниження витрат палива, сумісні з різними типами двигунів (бензин, дизель), мають синтетичну, напівсинтетичну основу та різноманітні допуски (API, ACEA, JASO MA).\n\nОсновні характеристики та переваги:\n\nТехнологія ACTIVE POWER: Забезпечує максимальну потужність, легкий запуск та надійний захист при екстремальних температурах.\n\nЗниження зносу: Значно зменшують знос деталей, подовжуючи термін служби двигуна.\n\nЧистота двигуна: Мийні та диспергувальні присадки запобігають утворенню відкладень та підтримують чистоту.\n\nСтабільність в язкості: Оптимальна робота в широкому діапазоні температур, від спеки до морозів.\n\nЕкономія палива: Формула сприяє зниженню витрат пального.\n\nСумісність: Повністю змішуються з іншими високоякісними оливами аналогічних класів.\n\nТипи олив:\n\nМоторні для легкових авто: Синтетичні (5W-30, 5W-40) та напівсинтетичні (10W-40) для бензинових та дизельних двигунів.\n\nТрансмісійні (Gear): Напівсинтетичні 75W-90 GL-4, для механічних коробок передач.'
    },
    'Kixx': {
      name: 'Kixx',
      image: 'Materials/Kixx.webp',
      factoryLogo: 'Materials/GS Caltex.webp',
      productImage1: 'Materials/K1.webp',
      productImage2: 'Materials/K2.webp',
      website: 'https://www.kixxoil.com/en/',
      description: 'Оливи Kixx — це сучасні високоякісні моторні оливи від корейського виробника GS Caltex, створені на основі синтетичних базових олив VHVI та передових пакетів присадок для забезпечення відмінного захисту двигуна, паливної ефективності та довговічності. Вони відповідають міжнародним стандартам API, ILSAC, а також специфікаціям виробників автомобілів, пропонуючи широкий асортимент для бензинових, дизельних двигунів, гібридів та мотоциклів, з акцентом на захист від зносу, чистоту та зниження викидів.\n\nКлючові особливості олив Kixx:\n\nТехнологія VHVI (Very High Viscosity Index): Забезпечує стабільну в`язкість в широкому діапазоні температур та чудовий захист від зсуву.\n\nЗахист від зносу: Формує міцну масляну плівку для захисту деталей при холодному старті та високих навантаженнях.\n\nЕнергозбереження: Знижує втрати на тертя, сприяючи економії палива.\n\nЧистота двигуна: Присадки запобігають утворенню відкладень, шламів та нагару.\n\nВідповідність стандартам: Розраховані на роботу з сучасними двигунами, включаючи турбовані (T-GDI) та гібридні системи.\n\nНизький рівень SAPS: Серії типу D1 RV мають низький вміст сірки, фосфору та золи, що подовжує життя сажевих фільтрів (DPF).'
    },
    'Автохіт': {
      name: 'AUTO HiT',
      image: 'Materials/Автохіт.webp',
      factoryLogo: '',
      productImage1: 'Materials/AH21.webp',
      productImage2: 'Materials/AH22.webp',
      description: 'AUTO HiT — український бренд моторних олив та автомобільної хімії. Продукція виробляється з урахуванням особливостей експлуатації автомобілів в Україні.\n\nДоступні ціни та перевірена якість роблять AUTO HiT популярним вибором серед українських автолюбителів.'
    },
    'AVIS': {
      name: 'AVIS',
      image: 'Materials/AVIS.webp',
      factoryLogo: 'Materials/ENK.webp',
      productImage1: 'Materials/AV11.webp',
      productImage2: 'Materials/AV12.webp',
      website: 'https://enc-oil.com.ua/?:MainPage:Oil:AVIS',
      description: 'Оливи AVIS – це лінійка моторних та індустріальних мастил українського виробництва (бренд Авіс), що пропонують напівсинтетичні (наприклад, 10W-40) та мінеральні варіанти для різних типів двигунів, забезпечуючи захист від зносу, стабілізацію плівки та покращення ефективності роботи двигуна при помірних цінах, підходячи як для бензинових, так і для дизельних двигунів.\n\nОсновні характеристики:\n\nТип: Полусинтетичні (10W-40) та мінеральні (М10Г2К).\n\nЗастосування: Бензинові та дизельні двигуни легкових авто, мікроавтобусів, вантажівок (з турбонаддувом або без).\n\nВластивості: Створюють стабільну захисну плівку, зменшують тертя, підвищують КПД, знижують шум.\n\nВ`язкість: Популярні варіанти включають 10W-40 (SAE) та SAE-30 (для М10Г2К).\n\nСтандарти: Відповідають стандартам API SG/CD.\n\nВиробництво: Україна, бренд AVIS (Авіс).'
    },
    'K1 Lube': {
      name: 'K1 Lube',
      image: 'Materials/K1 Lube.webp',
      factoryLogo: 'Materials/TWC.webp',
      productImage1: 'Materials/K11.webp',
      productImage2: 'Materials/K12.webp',
      website: 'https://www.k1lube.com',
      description: 'Оливи K1 Lube – це високоякісні моторні оливи від провідного корейського бренду (раніше відомого як Kixx), що використовують базові оливи VHVI та сучасні пакети присадок для забезпечення відмінного захисту двигуна, підвищення паливної ефективності та подовження інтервалів заміни масла. Вони розроблені для сучасних бензинових і дизельних двигунів, включно з турбованими, гібридними, GDI/T-GDI (захист від LSPI), та відповідають високим стандартам (API SP, ILSAC GF-6, ACEA C3). Основні переваги включають захист від зносу, термостійкість, ефективність у холодну погоду та сумісність із системами доочищення вихлопних газів.\n\nКлючові характеристики та переваги:\n\nВисокоякісні базові оливи: Використовуються базові оливи групи III (VHVI) та технології PAO- Boosting, що забезпечують відмінну в`язкісно-температурну стабільність та окислювальну стійкість.\n\nЗахист двигуна: Чудовий захист від зносу, зниження тертя, запобігання утворенню шламу та лаку, що подовжує ресурс деталей.\n\nПаливна ефективність: Спеціальні антифрикційні присадки мінімізують втрати енергії та сприяють економії палива.\n\nЗахист систем доочищення: Формули з низьким вмістом SAPS (сульфатної золи, фосфору, сірки) (наприклад, для ACEA C3) захищають сажеві фільтри (DPF) та каталізатори.\n\nЗахист від LSPI: Присадки стримують передчасне займання на низьких швидкостях (LSPI) у двигунах T-GDI.Захист ланцюга ГРМ: Покращені присадки захищають ланцюг газорозподільного механізму від зносу.\n\nШвидкий холодний старт: Гарні низькотемпературні властивості забезпечують миттєву циркуляцію масла в морози. \n\nПризначення: Підходять для широкого спектру сучасних автомобілів (бензин, дизель, гібриди), високопродуктивних автомобілів, а також для мотоциклів.'
    },
    'КАМА': {
      name: 'КАМА',
      image: 'Materials/KAMA.webp',
      factoryLogo: 'Materials/KAMA.webp',
      productImage1: 'Materials/KM11.webp',
      productImage2: 'Materials/KM12.webp',
      description: 'Оливи КАМА – це якісні моторні оливи, що забезпечують надійний захист двигуна та стабільну роботу в різних умовах експлуатації. Продукція відзначається високою якістю та відповідністю міжнародним стандартам.\n\nМоторні оливи КАМА призначені для різних типів двигунів та забезпечують ефективний захист від зносу, корозії та інших пошкоджень.'
    },
    'NAC': {
      name: 'NAC',
      image: 'Materials/NAC.webp',
      factoryLogo: 'Materials/ENK.webp',
      productImage1: 'Materials/N1.webp',
      productImage2: 'Materials/N2.webp',
      description: 'Оливи NAC – це високоякісні моторні оливи, що забезпечують надійний захист двигуна та оптимальну роботу в різних умовах експлуатації. Продукція розроблена з використанням сучасних технологій та відповідає найвищим стандартам якості.\n\nМоторні оливи NAC забезпечують ефективний захист від зносу, підтримують чистоту двигуна та сприяють економії палива.'
    },
    'Caroil': {
      name: 'Car Oil',
      image: 'Materials/Car Oil.webp',
      factoryLogo: 'Materials/ENK.webp',
      productImage1: 'Materials/CO1.webp',
      productImage2: 'Materials/CO2.webp',
      website: 'https://enc-oil.com.ua/?:MainPage:Oil:AVIS',      
      description: 'Car Oil – бренд моторних олив, що забезпечує надійний захист двигуна та стабільну роботу в різних умовах експлуатації. Продукція відзначається якістю та відповідністю міжнародним стандартам.\n\nМоторні оливи Car Oil призначені для бензинових та дизельних двигунів легкових автомобілів і комерційного транспорту. Продукція забезпечує ефективний захист від зносу, підтримує чистоту двигуна та сприяє економії палива.'
    },
    // Акумулятори
    'Quantum': {
      name: 'Quantum',
      image: 'Materials/Quantum1.webp',
      factoryLogo: 'Materials/LEMBERG.webp',
      productImage1: 'Materials/Q11.webp',
      productImage2: 'Materials/Q12.webp',
      website: 'https://lembergbattery.com',
      description: 'QUANTUM — це акумуляторна батарея преміум класу, виготовлена на сучасному та найновішому заводі країни «Лемберг», заснованому в 2014 році у Львові, автомобільні свинцево-кислотні батареї.\n\nОфіційний представник в Україні компанія ASL Company.'
    },
    'FORSE': {
      name: 'Force Racing',
      image: 'Materials/Forse.webp',
      factoryLogo: 'Materials/WESTA.webp',
      productImage1: 'Materials/F1.webp',
      productImage2: 'Materials/F2.webp',
      website: 'https://westa.ua/ua',
      description: 'Force Racing - це надійна лінійка акумуляторів, призначених для забезпечення надійної та стабільної енергії для вашого автомобіля. Як офіційний імпортер Force Racing в Україні, ми представляємо вам цей продукт, який об`єднує якість і доступність. Давайте розглянемо ключові переваги акумулятора, а також принцип його роботи:\n\nЕкономічне рішення:Акумулятори Force Racing являють собою ідеальне економічне рішення для автовласників, які цінують надійність без зайвих витрат. Вони надають доступ до високоякісного акумулятора за доступною ціною.\n\nНадійність Force Racing:Бренд Force Racing відомий своєю надійністю та якістю продукції. Це гарантує, що акумулятор служитиме довго і надійно, навіть в умовах підвищених навантажень.\n\nПростота в обслуговуванні:Акумулятор Force Racing розроблений з урахуванням зручності в обслуговуванні. Він має простий і надійний дизайн, що робить його ідеальним вибором для автовласників, які віддають перевагу самостійному обслуговуванню.\n\nСтабільне Енергопостачання:Акумулятор Force Racing забезпечує стабільне і безпечне енергопостачання для запуску двигуна і роботи електроніки вашого автомобіля. Ви можете бути впевнені, що ваш автомобіль завжди готовий до дорожніх пригод.'
    },
    'FEON': {
      name: 'FEON',
      image: 'Materials/Feon.webp',
      factoryLogo: 'Materials/ISTA.webp',
      productImage1: 'Materials/Fe1.webp',
      productImage2: 'Materials/Fe2.webp',
      website: 'http://ista.com.ua/ua/',
      description: 'Акумулятори Feon - це високотехнологічний АКБ при виробництві якого застосовуються спеціальні домішки кальцію. Ця модель має відмінну якість і має доступну ціну. Батарею можна встановлювати на вантажні авто, автобуси та сільськогосподарську техніку різних марок. Крім цього, акумулятор стійкий до агресивного середовища та глибоких розрядів, а також до вібрацій. За низьких і високих температур зберігає високі показники пускового струму.\n\nЩодо безпеки, то за це в акумуляторі відповідає блок сепараторів, які захищають батарею від коротких замикань. В АКБ FEON застосована гібридна технологія, де литі грати позитивного електрода виготовляються за мало сурм`янистою технологією, а також негативний електрод виготовлений за технологією Expanded Metal. Це дозволяє значно покращити електричні характеристики акб за низьких температур.\n\nАвто акумулятор оснащений свинцевими пластинами, які виготовлені з додаванням таких добавок: 1. Сурма - до 2%, 2. Селен - до 0,02%, 3. Кальцій – до 0,1%. Що з цього випливає, добавки дозволяють значно підвищити стійкість пластин до корозії, але свинець залишається максимально чистим. Технології C++ грати пластин не відливаються, а прокочуються. Внаслідок чого свинцеві пластини набагато краще тримають заряд, і підвищується стійкість до саморуйнування. Термін служби збільшується майже в 1,5 рази, порівняно з батареями, виготовленими за звичайною технологією.\n\nПереваги FEON: Висока вібростійкість; Хороші показники пускового струму за низьких температур; Захист від неправильної полярності; Захист від великих навантажень; Захист від замикання; Достатній запас ємності; Висока якість за доступної ціни.'
    },
    'Topla': {
      name: 'Topla',
      image: 'Materials/Topla.webp',
      factoryLogo: 'Materials/ТАВ.webp',
      productImage1: 'Materials/To1.webp',
      productImage2: 'Materials/To2.webp',
      website: 'https://www.tab.si/ru/',
      description: 'Акумулятори Topla – є надійним джерелом живлення. Вироблений у Словенії і перевірений українськими дорогами і кліматом. Показником якості і надійності даної моделі є – відмінні показники роботи, стабільність утримання заряду і високе віддавання за струмом.\n\nПереваги: Абсолютно необслуговуваний акумулятор з низькою витратою води. Система перфорації «Expanded Metal Technology» збільшує площу електродів і дозволяє досягти високого пускового струму. Впевнено працює від -50°С до + 60°С. Герметизація корпусу акумулятора виключає витікання електроліту під капот або в салон автомобіля, як при русі бездоріжжям, так і при перегріванні. Мінімальне саморозряджання в умовах простою або тривалого зберігання. Швидкий прийом заряду.'
    },
    'VEGA': {
      name: 'VEGA',
      image: 'Materials/vega.webp',
      factoryLogo: 'Materials/WESTA.webp',
      productImage1: 'Materials/V1.webp',
      productImage2: 'Materials/V2.webp',
      website: 'https://westa.ua/ua',
      description: 'Акумулятори «Vega» мають гібридну технологію, при використанні якої, решітки позитивних і негативних електродів виготовляються з різних сплавів. Грати позитивних електродів, виготовлені з свинцево-сурм`янистого сплаву, мають високу міцність, корозійну стійкість, добре переносять глибокі розряди. Грати негативних електродів, виготовлені з свинцево-кальцієвого сплаву, мають меншу питому вагу, мають низький опір, нейтральні до води.\n\nВ результаті застосування даної комбінації отримані універсальні акумулятори, найкращим чином поєднують в собі переваги двох технологій. Високі пускові струми, полегшують пуск двигунів в умовах низьких температур. Стійкі до глибокого розряду, менш чутливі до перепадів бортової напруги. Швидке відновлення заряду. Радіальний профіль решітки позитивного електрода покращує прийом заряду.'
    },
    'WPR': {
      name: 'WPR',
      image: 'Materials/WPR.webp',
      factoryLogo: 'Materials/WESTA.webp',
      productImage1: 'Materials/WP1.webp',
      productImage2: 'Materials/WP2.webp',
      website: 'https://westa.ua/ua',
      description: 'Акумулятори WPR (ВЕСТА Преміум) – це лінійка якісних автомобільних акумуляторів українського виробництва, розроблених для автомобілів з підвищеним споживанням енергії та для суворих кліматичних умов, що відрізняються високим пусковим струмом, покращеною стійкістю до розрядів і тривалим терміном служби завдяки застосуванню кальцієво-свинцевого сплаву та лабіринтової кришки. Вони позиціонуються як преміальний продукт із підвищеною надійністю, розроблений українським виробником МНПК «ВЕСТА».\n\nОсновні характеристики: \n\nЗначення: Легкові автомобілі, особливо ті, що вимагають більше енергії або експлуатуються в складних умовах (мороз, вібрація).\n\nПереваги: Високий пусковий струм (на ~30% вищий за стандартні).Підвищена ємність та стійкість до розрядів. Низький саморозряд під час простою. Довгий ресурс пусків та загальний термін служби. Мінімальна втрата рідини завдяки лабіринтовій кришці та пламегасникам.\n\nТехнологія: використовують запатентований кальцієво-свинцевий сплав з високим вмістом олова, що підвищує стійкість до корозії.'
    },
    'STARTUP': {
      name: 'START UP',
      image: 'Materials/STARTUP.webp',
      factoryLogo: 'Materials/WESTA.webp',
      productImage1: 'Materials/ST1.webp',
      productImage2: 'Materials/ST2.webp',
      description: 'Акумулятори StartUp (виробництва Веста, Україна) — доступні свинцево-кислотні батареї для автомобілів середнього класу з базовим енергоспоживанням. Відрізняються надійним пуском в холодну пору, мають міцний корпус і відкриту систему відведення газів (обслуговуються). Оптимальні для бюджетного сегмента забезпечуючи стабільну роботу.\n\nОсновні характеристики та переваги StartUp:\n\nТип: Свинцево-кислотні, що обслуговуються (наявність пробок для доступу до електроліту).\n\nАвтомобілі середнього класу з невеликою кількістю електроспоживачів.\n\nВиробництво: Україна (Веста), відповідність європейським стандартам.\n\nХороша переносимість низьких температур, стійкий до пошкоджень корпус, низька ціна.\n\nМісткість: Представлені поширені варіанти, включаючи 60Ah, 77Ah, 90Ah, 140Ah.\n\nГарантія: Найчастіше становить 12 місяців.\n\nStartUp — гарний вибір, якщо потрібний надійний, бюджетний акумулятор для повсякденних подорожей.'
    },
    'autopart': {
      name: 'AutoPart',
      image: 'Materials/autopart.webp',
      factoryLogo: 'Materials/atp3.webp',
      productImage1: 'Materials/AP1.webp',
      productImage2: 'Materials/AP2.webp',
      website: 'https://sklep.autopart.pl/akumulatory,cp1,pl.html',
      description: 'Акумулятори AUTOPART (Польща) — це надійні свинцево-кислотні батареї, відомі високою якістю, довговічністю та широким асортиментом для легкових, вантажних авто та спецтехніки (наприклад, серія Galaxy Plus) ucar.net.ua, АКБ ПЛЮС. Вони забезпечують стабільний пусковий струм, стійкі до глибоких розрядів, не потребують обслуговування та мають сертифікати якості ucar.net.ua, alfa.solar.\n\nОсновні характеристики та переваги AUTOPART:\n\nТипи: Виробляються кальцієві (Ca/Ca), а також гелеві (GEL) батареї для вищої витривалості alfa.solar.\n\nПусковий струм: Високі показники струму холодної прокрутки, що гарантує швидкий запуск двигуна навіть у морози ucar.net.ua.\n\nОбслуговування: Більшість сучасних моделей є необслуговуваними (sealed maintenance-free) alfa.solar.\n\nНадійність: Використання технологій, що знижують саморозряд та підвищують стійкість до корозії.\n\nАсортимент: Широкий вибір ємностей (від малолітражок до вантажівок), відповідність європейським стандартам АКБ ПЛЮС.\n\nАкумулятори AUTOPART є чудовим співвідношенням ціни та європейської якості для щоденного використання.'
    },
    // Автохімія
    'K2': {
      name: 'K2',
      image: 'Materials/K2.webp',
      factoryLogo: 'Materials/K23.webp',
      productImage1: 'Materials/K21.webp',
      productImage2: 'Materials/K22.webp',
      website: 'https://www.k2-global.com/ua/',
      description: 'K2 – провідний польський виробник автомобільної хімії та косметики з понад 25-річним досвідом. Наша продукція представлена у понад 90 країнах світу, а довіра мільйонів автовласників підтверджує високу якість кожного продукту.\n\nНаша продукція: Асортимент K2 налічує: автокосметика, ароматизатори, технічні рідини, оливи, присадки та професійні засоби для детейлінгу. Кожен продукт створений з увагою до деталей та адаптований до потреб як звичайних автовласників, так і професіоналів.\n\nГарантія якості: Вся продукція виготовляється з використанням сучасних технологій та проходить ретельне тестування. Наявність сертифікатів ISO 9001 та ISO 14001 підтверджує відповідність найвищим міжнародним стандартам якості.\n\nВизнання: K2 неодноразово нагороджувався престижними відзнаками, включаючи Золоту медаль конкурсу Consumer Laurel та нагороди міжнародних ярмарків інновацій.'
    },
    'Senfineco': {
      name: 'Senfineco',
      image: 'Materials/Senfineco.webp',
      factoryLogo: 'Materials/SE3.webp',
      productImage1: 'Materials/SE2.webp',
      productImage2: 'Materials/SE1.webp',
      website: 'https://www.senfineco.de/de/',
      description: 'Senfineco Germany – торгова марка німецької компанії Service Car Technology Vertriebs GmbH, заснованої у 2009 році. Бренд спеціалізується на розробці та виробництві систем автомобільних компонентів, присадок і мастильних матеріалів для сучасних транспортних засобів.\n\nГлобальна присутність: Дослідницькі центри та виробничі підприємства розташовані у Західній та Східній Європі, Північній та Латинській Америці, Центральній Азії. Така географія забезпечує високі стандарти виробництва та постійний контроль якості на всіх етапах.\n\nТехнології та інновації: Кожен продукт проходить численні випробування на відповідність технічним параметрам. Високий рівень автоматизації виробничих циклів та передова система контролю якості гарантують стабільні експлуатаційні характеристики протягом усього життєвого циклу продукту.\n\nСертифікація: Усі виробничі підприємства сертифіковані відповідно до міжнародного стандарту ISO/TS 16949, що підтверджує найвищу якість продукції та виробничих процесів.\n\nСучасні рішення: Продукція Senfineco Germany розроблена з урахуванням особливостей сучасних двигунів та систем – компактних, енергоефективних та технологічно складних. Присадки та технічні засоби бренду забезпечують ефективне обслуговування та очищення компонентів, допомагаючи уникнути дорогого ремонту.\n\nSenfineco Germany – німецька точність для максимальної продуктивності вашого автомобіля.'
    },
    'Atas': {
      name: 'Atas Plak',
      image: 'Materials/Atas.webp',
      factoryLogo: 'Materials/PA3.webp',
      productImage1: 'Materials/PA1.webp',
      productImage2: 'Materials/PA2.webp',
      website: 'https://www.atassrl.it/en/',
      description: 'Atas Plak – італійський бренд автомобільної хімії та косметики, що поєднує багаторічний досвід та інноваційні розробки. Продукція орієнтована на задоволення потреб як професійних автосервісів та детейлінг-центрів, так і вимогливих автовласників.\n\nЯкість та технології: Продукція Atas Plak виготовляється з використанням сучасних формул та якісної сировини, що забезпечує ефективність застосування та тривалий результат. Кожен продукт розроблений з урахуванням особливостей різних типів поверхонь та матеріалів.\n\nПрофесійний підхід: Бренд Atas Plak користується довірою професіоналів автомобільної індустрії завдяки стабільній якості, ефективності та надійності продукції. Італійські стандарти виробництва гарантують високий рівень кожного засобу.\n\nЗастосування: Продукція підходить для використання як у професійних умовах автомийок, детейлінг-центрів та СТО, так і для самостійного догляду за автомобілем вдома.\n\nAtas Plak – італійська якість для бездоганного вигляду та захисту вашого автомобіля.'
    },
    'Piton': {
      name: 'PiTon',
      image: 'Materials/Piton.webp',
      factoryLogo: 'Materials/P3.webp',
      productImage1: 'Materials/P1.webp',
      productImage2: 'Materials/P2.webp',
      website: 'https://piton.ua/',
      description: 'PiTon – українська торгова марка автохімії та автокосметики з понад 10-річним досвідом роботи на ринку.\n\nФілософія бренду: PiTon поєднує наукові розробки з відповідальним підходом до виробництва. Кожен продукт створюється з урахуванням екологічних стандартів та потреб найвибагливіших споживачів.\n\nАсортимент: Широкий спектр засобів для захисту, очищення, полірування та змащення автомобілів, машин різного призначення та спортивного інвентарю. Продукція розроблена для ефективного догляду та тривалого захисту.\n\nІнновації: Постійне вдосконалення наявної та розробка нової продукції – ключовий пріоритет бренду. Творчі зусилля команди спрямовані на створення рішень, які відповідають сучасним вимогам та стандартам якості.\n\nПринципи роботи: Дотримання етичних стандартів виробництва, свідоме ставлення до сировини та екологічна відповідальність – основа philosophy PiTon. Постійне розширення географії присутності підтверджує довіру споживачів у різних країнах.\n\nPiTon – українська марка, що довела свою якість на міжнародному рівні.'
    },
    'ProfiMax': {
      name: 'PROFI MAX',
      image: 'Materials/ProfiMax.webp',
      factoryLogo: 'Materials/MFC.webp',
      productImage1: 'Materials/PM1.webp',
      productImage2: 'Materials/PM2.webp',
      website: 'https://mfc.com.ua/uk/',
      description: 'Антифриз бренду MFC — це високоякісна охолоджувальна рідина, виготовлена за органічною технологією. Призначений для використання в системах охолодження бензинових і дизельних двигунів легкових і вантажних автомобілів, а також спецтехніки. Продукт ефективно захищає двигун від перегріву, замерзання, корозії, утворення накипу та кавітації.\n\nПереваги антифризу бренду MFC:\n\nВідповідає стандарту G12 (OAT).\nЗахищає до -24°C і до +108°C.\nНе містить шкідливих домішок: фосфатів, нітритів, силікатів.\nДо 5 років стабільної роботи системи охолодження.\nВироблено в Україні з дотриманням європейських норм.\nПоставляється у зручній міцній пластиковій каністрі.\n\nРекомендації щодо використання:\n\nНе сумісний  з іншими класами та кольорами — змішування може знизити ефективність захисту.\nЗаміна рідини рекомендується через 5 років або після 150 000 км.\nПеред заливкою важливо промити систему охолодження, особливо при переході з іншого класу рідини.\nНе доливайте воду — рідина вже готова до використання.\nНе відкривайте кришку радіатора на гарячому двигуні — це може бути небезпечно!\n\nАнтифриз бренду MFC — надійний вибір для довготривалого захисту вашого двигуна в будь-яку пору року.'
    },
    'ACTIVE': {
      name: 'ACTIVE',
      image: 'Materials/Active.webp',
      factoryLogo: 'Materials/MFC.webp',
      productImage1: 'Materials/A1.webp',
      productImage2: 'Materials/A2.webp',
      website: 'https://mfc.com.ua/uk/',
      description: 'Антифриз бренду MFC — це високоякісна охолоджувальна рідина, виготовлена за органічною технологією. Призначений для використання в системах охолодження бензинових і дизельних двигунів легкових і вантажних автомобілів, а також спецтехніки. Продукт ефективно захищає двигун від перегріву, замерзання, корозії, утворення накипу та кавітації.\n\nПереваги антифризу бренду MFC:\n\nВідповідає стандарту G12 (OAT).\nЗахищає до -26°C і до +108°C.\nНе містить шкідливих домішок: фосфатів, нітритів, силікатів.\nДо 5 років стабільної роботи системи охолодження.\nВироблено в Україні з дотриманням європейських норм.\nПоставляється у зручній міцній пластиковій каністрі.\n\nРекомендації щодо використання:\n\nНе сумісний  з іншими класами та кольорами — змішування може знизити ефективність захисту.\nЗаміна рідини рекомендується через 5 років або після 150 000 км.\nПеред заливкою важливо промити систему охолодження, особливо при переході з іншого класу рідини.\nНе доливайте воду — рідина вже готова до використання.\nНе відкривайте кришку радіатора на гарячому двигуні — це може бути небезпечно!\n\nАнтифриз бренду MFC — надійний вибір для довготривалого захисту вашого двигуна в будь-яку пору року.'
    },
    'Тайфун': {
      name: 'Тайфун',
      image: 'Materials/Tayphun.webp',
      factoryLogo: 'Materials/MFC.webp',
      productImage1: 'Materials/T1.webp',
      productImage2: 'Materials/T2.webp',
      website: 'https://mfc.com.ua/uk/',
      description: 'Тосол -40 МФК Тайфун - це високоякісна готова рідина, призначена для універсального застосування в системах охолодження різної техніки: легкових автомобілів, вантажівок, мототранспорту, будівельної і спецтехніки, а також стаціонарних двигунів. Виробляється на основі етиленгліколю та доповнюється пакетом високоактивних присадок, які гарантують стабільну температуру двигуна при будь-якому стилі водіння та надійний комплексний захист системи.\n\nОсновні переваги:\n\nПротикорозійний Захист: Містить потужні протикорозійні присадки, що ефективно захищають від утворення ржавчини та консервують заздалегідь уражені ділянки, запобігаючи сквозній корозії.\n\nСтійкість до Кипіння та Випаровування: Має високу стійкість до кипіння та випаровування, не допускає утворення парових пробок і розгерметизації системи.\n\nЗахист від Перегріву: Забезпечує стабільно-оптимальну температуру силового агрегата, уникуючи його перегріву та пов`язаних з цим порушень у роботі.\n\nЗахист Патрубків і Ущільнювачів: Захищає патрубки і ущільнювачі від висихання і розтріскання.\n\nТосол -40 МФК Тайфун - це надійний вибір для всесезонного застосування при будь-яких кліматичних умовах, забезпечуючи ефективне охолодження і максимальний захист вашої техніки.'
    },
    // Фільтри
    'AF Alpha': {
      name: 'AF ALPHA',
      image: 'Materials/AF Alpha.webp',
      factoryLogo: 'Materials/AF3.webp',
      productImage1: 'Materials/AF1.webp',
      productImage2: 'Materials/AF2.webp',
      website: 'https://alpha-filter.com/',
      description: 'ALPHA FILTER – це інноваційний український виробник автомобільних фільтрів. Досконале поєднання ціни і якості разом з зручними умовами співпраці роблять роботу з нами вигідною та легкою. Продукція створена з використанням передових технологій та відповідає найсуворішим міжнародним стандартам якості.\n\nЯкість фільтрації: Продукція виготовляється з використанням високоякісних фільтруючих матеріалів, що гарантують максимальне затримання забруднень та захист двигуна, системи кондиціонування та інших компонентів від передчасного зносу.\n\nШирока сумісність: Фільтри ALPHA FILTER підходять для легкових автомобілів, позашляховиків, комерційного транспорту та спецтехніки різних марок. Точні геометричні параметри забезпечують ідеальне встановлення та герметичність з`єднань.\n\nОптимальне співвідношення: Бренд пропонує професійну якість фільтрації за доступною ціною. Продукція відповідає вимогам виробників автомобілів та забезпечує стабільну роботу систем протягом всього міжсервісного інтервалу.\n\nALPHA FILTER – чиста робота кожної системи вашого автомобіля.'
    },
    'Wix Filters': {
      name: 'WIX',
      image: 'Materials/Wix Filters.webp',
      factoryLogo: 'Materials/WI3.webp',
      productImage1: 'Materials/WI1.webp',
      productImage2: 'Materials/WI2.webp',
      website: 'https://www.wixfilters.com/uk-ua.html',
      description: 'WIX – один з найвідоміших світових брендів автомобільних фільтрів з понад 85-річною історією. Заснований у Північній Кароліні Джеком Уіксом та Полом Кроушоу, бренд змінив напрям розвитку всієї фільтраційної галузі та встановив стандарти, що використовуються досі.\n\nРеволюційні інновації: У 1954 році WIX запатентував фільтр з нарізним сполученням «Twist of the wrist» («крути зап`ястям»), який став галузевим стандартом у виробництві автокомпонентів. Ця інновація назавжди змінила підхід до конструкції фільтрів.\n\nПеревірено екстримом: Протягом півстоліття WIX тестує свої технології на гоночних трасах. Фільтри встановлюються на спортивні автомобілі та витримують найскладніші умови змагань, допомагаючи кращим гонщикам дійти до фінішу.\n\nКонтроль якості: Багаторічний досвід, компетентні фахівці, сучасні виробничі лінії та лабораторії, постійний контроль на кожному етапі – це основа якості, завдяки якій WIX заслужив світове визнання.\n\nWIX – 85 років надійності, перевіреної часом та мільйонами автомобілів.'
    },
    'Knecht': {
      name: 'KNECHT',
      image: 'Materials/Knecht.webp',
      factoryLogo: 'Materials/KN3.webp',
      productImage1: 'Materials/KN1.webp',
      productImage2: 'Materials/KN2.webp',
      website: 'https://www.knecht.eu/en/',
      description: 'KNECHT – німецький бренд автомобільних фільтрів з багаторічною історією. Продукція поєднує інженерну досконалість, інноваційні технології та безкомпромісну якість, типову для німецького автопрому.\n\nОригінальна якість: Фільтри KNECHT постачаються як оригінальні компоненти для провідних автовиробників світу. Це підтверджує найвищий рівень якості та відповідність найсуворішим технічним вимогам індустрії.\n\nТехнологічне лідерство: Використання передових фільтруючих матеріалів та інноваційних конструкцій забезпечує максимальний ступінь очищення, тривалий термін служби та стабільну роботу систем автомобіля в будь-яких умовах експлуатації.\n\nДовіра професіоналів: KNECHT є першим вибором для СТО, автосервісів та досвідчених механіків, які цінують надійність та передбачуваний результат. Бренд втілює класичні німецькі цінності: точність, довговічність та інженерну досконалість.\n\nKNECHT – коли якість фільтрації не може бути компромісом.'
    },
    'Shikoo': {
      name: 'SHIKOO',
      image: 'Materials/Shikoo.webp',
      factoryLogo: 'Materials/Shikoo.webp',
      productImage1: 'Materials/SH1.webp',
      productImage2: 'Materials/SH2.webp',
      website: 'https://shikoo.com.ua/ua/',
      description: 'SHIKOO – бренд автомобільних фільтрів, що пропонує ефективні рішення для захисту ключових систем автомобіля за оптимальною ціною. Продукція охоплює повний спектр фільтраційних елементів для легкових авто та комерційного транспорту.\n\nЕфективна фільтрація: Фільтруючі елементи SHIKOO затримують забруднення різних фракцій, захищаючи двигун від передчасного зносу, систему подачі палива від засмічення, а салон – від пилу та неприємних запахів.\n\nДоступність якості: Бренд орієнтований на автовласників, які шукають надійне рішення за розумною ціною. SHIKOO забезпечує оптимальний баланс між якістю фільтрації та вартістю, що робить регулярне обслуговування автомобіля доступнішим.\n\nПрактичне рішення: Фільтри SHIKOO підходять для щоденної експлуатації в різних умовах – від міських поїздок до їзди по бездоріжжю. Стабільна якість продукції гарантує спокій за стан систем автомобіля протягом міжсервісного інтервалу.\n\nSHIKOO – розумний вибір для надійного захисту вашого автомобіля.'
    },
    // Мастила
    'KSN': {
      name: 'KSM',
      image: 'Materials/KSN.webp',
      factoryLogo: 'Materials/KS3.webp',
      productImage1: 'Materials/KS1.webp',
      productImage2: 'Materials/KS2.webp',
      website: 'https://ksm.ua/',
      description: 'Мастила KSM Lubes — це широкий асортимент індустріальних та автомобільних мастильних матеріалів (пластичні мастила, оливи), що вирізняються високою ефективністю, водостійкістю та захисними властивостями. Основний фокус виробника — надійний захист вузлів тертя від корозії, зносу та перегріву, підходить для різних типів техніки та промислового обладнання.\n\nПереваги продукції KSM Lubes: Висока антикорозійна та механічна стабільність. Захист від зносу в широкому діапазоні температур. Зручна фасовка: від туб 400 г до великих ємностей 17-170 кг. '
    },
    'Yuko': {
      name: 'YUKO',
      image: 'Materials/Yuko.webp',
      factoryLogo: 'Materials/YK3.webp',
      productImage1: 'Materials/YK1.webp',
      productImage2: 'Materials/YK2.webp',
      website: 'https://yukoil.com/category/type-smazki/',
      description: 'Мастила (пластичні мастила) YUKO – це високоякісні українські мастильні матеріали, розроблені для захисту, зниження тертя та продовження терміну служби механізмів. Вони відрізняються відмінними антифрикційними, антикорозійними характеристиками, високою механічною стабільністю та широким спектром застосування в автомобілях та індустрії.\n\nПереваги продукції YUKO:\n\nНадійність: Забезпечують стабільну роботу при екстремальних навантаженнях та широкому діапазоні температур.\n\nЗахист: Запобігають корозії, окисленню та передчасному зносу деталей.\n\nРізноманітність: Представлені у різних фасуваннях (банки, туби, відра) для різних потреб.\n\nЯкість: Виробляються з використанням якісних базових олій та сучасних присадок.\n\nЛінійка включає спеціалізовані мастила для автомобільної техніки, а також індустріальні мастильні матеріали, що відповідають стандартам якості.'
    },
    'Temol': {
      name: 'TEMOL',
      image: 'Materials/Temol.webp',
      factoryLogo: 'Materials/TM3.webp',
      productImage1: 'Materials/TM1.webp',
      productImage2: 'Materials/TM2.webp',
      website: 'https://temol.ua/lubricants',
      description: 'TEMOL — це український виробник сучасних мастильних матеріалів (олив та пластичних мастил), продукція якого виготовляється на потужностях у Київській області з використанням імпортної сировини та присадок. Асортимент бренду охоплює потреби легкових і вантажних автомобілів, мототехніки, а також промислового обладнання.'
    },
    'AVIS1': {
      name: 'AVIS',
      image: 'Materials/AVIS.webp',
      factoryLogo: 'Materials/ENK.webp',
      productImage1: 'Materials/AV22.webp',
      productImage2: 'Materials/AV21.webp',
      website: 'https://enc-oil.com.ua/?:MainPage:Oil:AVIS',
      description: 'Олії AVIS (Авіс) — це бюджетні українські мастильні матеріали, що включають моторні напівсинтетичні (наприклад, 10W-40 SG/CD) та трансмісійні (Нигрол SAE 140) олії для легкових та вантажних авто. Вони призначені для захисту двигунів та трансмісій, які часто використовуються в техніці старшого покоління.\n\nКлючові характеристики:\n\nЗастосування: Легкові та вантажні автомобілі, у тому числі з великим пробігом.\n\nВ`язкість: Популярні в`язкості: 10W-40, мінеральні склади.\n\nДоступна ціна, широкий вибір фасування (від 0.9 л до 20 л).\n\nПродукція орієнтована на економічне обслуговування техніки, забезпечуючи базовий захист у різних умовах експлуатації.'
    },
    // Гальмівні рідини
    'Venol-brakes': {
      name: 'VENOL DOT 4',
      image: 'Materials/Venol.webp',
      factoryLogo: 'Materials/VenolBr3.webp',
      productImage1: 'Materials/VE31.webp',
      productImage2: 'Materials/VE32.webp',
      website: 'https://venol.de',
      description: 'VENOL – бренд високоякісних технічних рідин, що спеціалізується на виробництві гальмівних рідин, антифризів та інших експлуатаційних матеріалів для автомобілів. Продукція розроблена з урахуванням вимог сучасних гальмівних систем та систем охолодження.\n\nГальмівні рідини: Асортимент охоплює гальмівні рідини різних класів (DOT 3, DOT 4, DOT 5.1), що відповідають міжнародним стандартам та специфікаціям автовиробників. Високі температурні характеристики забезпечують стабільну роботу гальм у будь-яких умовах експлуатації.\n\nНадійність та безпека: Гальмівні рідини VENOL відзначаються високою температурою кипіння, стійкістю до вологопоглинання та відмінними змащувальними властивостями. Це гарантує ефективність гальмування, захист компонентів від корозії та тривалий термін служби системи.\n\nТехнічні рідини: Окрім гальмівних рідин, бренд пропонує антифризи, охолоджувальні рідини та інші експлуатаційні матеріали, необхідні для правильного обслуговування автомобіля та підтримання його технічного стану.\n\nКонтроль якості: Кожен продукт проходить ретельне тестування та відповідає міжнародним стандартам якості. VENOL забезпечує стабільні характеристики рідин протягом всього терміну експлуатації, що критично важливо для безпеки водіння.\n\nVENOL – надійні технічні рідини для безпечної їзди.'
    },
    'ADVA-brakes': {
      name: 'ADWA DOT 4',
      image: 'Materials/ADVA.webp',
      factoryLogo: 'Materials/ADV3.webp',
      productImage1: 'Materials/AD11.webp',
      productImage2: 'Materials/AD22.webp',
      website: 'https://adwa.eu',
      description: 'ADWA – бренд технічних рідин, що забезпечує надійну роботу гальмівних систем сучасних автомобілів. Продукція створена з використанням якісної сировини та відповідає найсуворішим міжнародним стандартам безпеки.\n\nТемпературна стабільність: Гальмівні рідини ADWA підтримують стабільні робочі характеристики в широкому діапазоні температур – від екстремальних морозів до високих навантажень при інтенсивному гальмуванні. Висока температура кипіння запобігає утворенню парових пробок та забезпечує чітку роботу гальм.\n\nЗахисні властивості: Спеціальні присадки в складі рідин ADWA захищають металеві та гумові компоненти гальмівної системи від корозії, окислення та передчасного старіння. Це продовжує термін служби дорогих деталей та знижує витрати на обслуговування.\n\nШирока сумісність: Асортимент включає гальмівні рідини класів DOT 3, DOT 4 та DOT 5.1 для легкових автомобілів, позашляховиків, мікроавтобусів та легкого комерційного транспорту різних марок та років випуску.\n\nБезпека експлуатації: ADWA гарантує передбачувану роботу гальмівної системи в критичних ситуаціях. Низька гігроскопічність рідин уповільнює поглинання вологи з повітря, що підтримує ефективність гальмування протягом тривалого часу.\n\nADWA – ваша впевненість у кожному натисканні педалі гальма.'
    },
    'Експо Хім-brakes': {
      name: 'Експо Хім DOT 4',
      image: 'Materials/Експо Хім.webp',
      factoryLogo: 'Materials/Експо Хім.webp',
      productImage1: 'Materials/EX1.webp',
      productImage2: 'Materials/EX2.webp',
      description: 'Експо Хім – вітчизняний виробник технічних рідин для автомобілів, що спеціалізується на гальмівних рідинах різних класів. Бренд поєднує доступну ціну з надійними експлуатаційними характеристиками, необхідними для безпечної їзди.\n\nВідповідність стандартам: Продукція Експо Хім відповідає міжнародним специфікаціям DOT та вимогам до гальмівних рідин. Рідини пройшли необхідні випробування та підтверджують свою ефективність у різних умовах експлуатації.\n\nПрактичність застосування: Гальмівні рідини підходять для використання в легкових автомобілях, мікроавтобусах та легкому комерційному транспорті. Універсальність формул дозволяє застосовувати продукцію на широкому спектрі моделей різних років випуску.\n\nЗахист системи: Рідини Експо Хім містять пакет присадок, що захищають компоненти гальмівної системи від корозії та зносу. Стабільні характеристики в`язкості забезпечують належну роботу системи в різні сезони року.\n\nДоступне обслуговування: Бренд орієнтований на український ринок, пропонуючи якісний продукт за доступною ціною. Це робить регулярну заміну гальмівної рідини, необхідну для безпеки, економічно виправданою для широкого кола автовласників.\n\nЕкспо Хім – українське виробництво для безпеки на дорогах.'
    },
    'Alyaska-brakes': {
      name: 'АЛЯSКА DOT 4',
      image: 'Materials/Alyaska.webp',
      factoryLogo: 'Materials/AL.webp',
      productImage1: 'Materials/AL1.webp',
      productImage2: 'Materials/AL2.webp',
      description: 'АЛЯSКА – бренд гальмівних рідин, створених для ефективної роботи в екстремальних температурних умовах. Назва бренду відображає здатність продукції зберігати робочі характеристики навіть у найсуворіші морози та спекотні літні дні.\n\nЕкстремальна стійкість: Гальмівні рідини АЛЯSКА розроблені з урахуванням особливостей експлуатації в континентальному кліматі з різкими перепадами температур. Висока температура кипіння та низька температура застигання гарантують стабільну роботу гальм цілий рік.\n\nУніверсальне застосування: Продукція представлена у різних класах (DOT 3, DOT 4) та підходить для легкових автомобілів, мікроавтобусів, позашляховиків та комерційного транспорту. Сумісність з більшістю гальмівних систем спрощує вибір та використання.\n\nАнтикорозійний захист: Спеціальні інгібітори корозії в складі рідин АЛЯSКА захищають металеві деталі гальмівної системи від руйнування, а еластомери та ущільнювачі – від розтріскування та втрати еластичності, що особливо важливо при експлуатації у суворих умовах.\n\nОптимальний вибір: АЛЯSКА пропонує перевірене рішення для автовласників, які потребують надійної гальмівної рідини за розумною ціною. Баланс якості та доступності робить бренд популярним вибором для щоденної експлуатації.\n\nАЛЯSКА – впевнене гальмування від Аляски до пустелі.'
    },
    'Автохіт-brakes': {
      name: 'AUTO HiT DOT 4',
      image: 'Materials/Автохіт.webp',
      factoryLogo: 'Materials/Автохіт.webp',
      productImage1: 'Materials/AT31.webp',
      productImage2: 'Materials/AT32.webp',
      description: 'Гальмівна рідина Auto-Hit DOT-4 0,4 кг — це високоефективна синтетична рідина для гідравлічних гальмівних систем сучасних автомобілів.\n\nРозроблена відповідно до європейських та міжнародних стандартів, забезпечує стабільну роботу гальм у широкому діапазоні температур і підходить як для дискових, так і для барабанних гальм.\n\nМає покращені експлуатаційні властивості, що робить її оптимальним вибором для щоденної експлуатації, а також для підвищених навантажень.'
    },
    'Кама-brakes': {
      name: 'KAMA OIL DOT-4',
      image: 'Materials/KAMA.webp',
      factoryLogo: 'Materials/KAMA.webp',
      productImage1: 'Materials/KM21.webp',
      productImage2: 'Materials/KM22.webp',
      description: 'Гальмівна рідина KAMA OIL DOT-4 — це українська гліколева рідина для гідравлічних гальмівних систем, що відповідає стандарту DOT4. Вона забезпечує надійну роботу при високих температурах (кипіння від), запобігає корозії та випускається в об`ємах 0,4–0,9 кг. Рекомендується для сучасних авто, що потребують синтетичної рідини.\n\nОсновні характеристики та переваги рідини Кама (KAMA OIL DOT-4):\n\nСтандарт: DOT 4 (сумісна з системами, де рекомендовано DOT 3 або DOT 4).\n\nВиробник: Україна.Температура кипіння: від (суха), що забезпечує стабільність при інтенсивному гальмуванні.\n\nТип: Гліколева (синтетична) — має антикорозійні та змащувальні властивості.\n\nФасування: Доступна в тарі 0.4 л, 0.5 л, 0.76 кг, 0.8 кг, 0.91 кг.\n\nВажливі поради:\n\nСумісність: Не змішуйте гліколеві рідини (DOT 3, DOT 4, DOT 5.1) з силіконовими (DOT 5).\n\nЗаміна: Гальмівну рідину слід міняти, коли педаль стає м`якою, або кожні 1-2 роки, оскільки вона поглинає вологу з повітря, що знижує температуру кипіння.\n\nОб`єм: Для повної заміни в легковому авто зазвичай потрібно від 0,5 до 1,5 літра. '
    },
    'High Way-brakes': {
      name: 'HighWay DOT 4',
      image: 'Materials/Highway.webp',
      factoryLogo: 'Materials/Highway.webp',
      productImage1: 'Materials/HW31.webp',
      productImage2: 'Materials/HW32.webp',
      description: 'Гальмівна рідина HighWay DOT-4 — це високоякісна синтетична рідина для гальмівних систем і зчеплень, що забезпечує стабільну роботу при температурах «сухого» кипіння. Вона містить антикорозійні присадки, захищає гумові ущільнювачі та зменшує знос деталей.\n\nОсновні характеристики та переваги HighWay DOT-4:\n\nТип: Повністю синтетична.\n\nТемпература кипіння: Висока, що забезпечує надійність при інтенсивному гальмуванні.\n\nЗахист: Містить пакет антикорозійних та антиокислювальних присадок.\n\nСумісність: Безпечна для гумових деталей та ущільнень.\n\nУніверсальність: Підходить для більшості сучасних гальмівних систем.\n\nОб\'єм: Доступна у фасуваннях 0.5 л та 1 л.\n\nРідина забезпечує миттєву передачу гальмівного зусилля як за низьких, так і за високих температур, підвищуючи безпеку керування.'
    },
    // Охолоджуючі рідини  
    'Alyaska-coolants': {
      name: 'АЛЯSКА',
      image: 'Materials/Alyaska.webp',
      factoryLogo: 'Materials/AL23.webp',
      productImage1: 'Materials/AL21.webp',
      productImage2: 'Materials/AL22.webp',
      description: 'АЛЯSКА – бренд антифризів та охолоджувальних рідин, що забезпечують стабільну роботу системи охолодження в будь-яких кліматичних умовах. Продукція розроблена для ефективного захисту двигуна від перегріву влітку та замерзання взимку.\n\nТемпературний діапазон: Охолоджувальні рідини АЛЯSКА зберігають свої властивості в широкому температурному діапазоні – від сильних морозів до екстремальної спеки. Різні варіанти температури замерзання (-24°C, -40°C) дозволяють підібрати оптимальний продукт для регіону експлуатації.\n\nКомплексний захист: Антифризи містять пакет присадок, що захищають систему охолодження від корозії, кавітації, утворення накипу та відкладень. Це продовжує термін служби радіатора, помпи, термостата та інших компонентів системи.\n\nСумісність з двигунами: Продукція підходить для бензинових та дизельних двигунів легкових автомобілів, позашляховиків, мікроавтобусів та легкого комерційного транспорту. Різні класи рідин (G11, G12, G13) забезпечують сумісність з різними типами систем охолодження.\n\nТривалий термін служби: Охолоджувальні рідини АЛЯSКА зберігають свої захисні властивості протягом тривалого часу, що дозволяє збільшити інтервали між заміною та знизити витрати на обслуговування системи охолодження.\n\nАЛЯSКА – стабільна температура двигуна в будь-яку пору року.'
    },
    'NAVIGATOR': {
      name: 'NAVIGATOR',
      image: 'Materials/NAVIGATOR.webp',
      factoryLogo: 'Materials/NAVIGATOR.webp',
      productImage1: 'Materials/NA1.webp',
      productImage2: 'Materials/NA2.webp',
      description: 'NAVIGATOR – надійний бренд тосолів та охолоджувальних рідин, створений для забезпечення стабільної роботи системи охолодження в будь-яких умовах експлуатації. Продукція поєднує перевірену якість з доступною ціною, що робить її оптимальним вибором для щоденного використання.\n\nУніверсальне застосування: Тосоли NAVIGATOR підходять для легкових автомобілів, мікроавтобусів, вантажного транспорту та спецтехніки з бензиновими та дизельними двигунами. Продукція ефективно працює як у сучасних, так і в класичних системах охолодження.\n\nНадійний захист: Збалансований пакет присадок забезпечує комплексний захист системи охолодження від корозії металевих компонентів, утворення накипу, кавітації та перегріву. Спеціальні інгібітори корозії захищають радіатор, блок циліндрів, помпу та інші елементи системи.\n\nТемпературна стабільність: Охолоджувальні рідини NAVIGATOR зберігають свої робочі характеристики в широкому температурному діапазоні – від -40°C до +108°C. Це гарантує надійний запуск двигуна в морози та ефективне охолодження в спеку.\n\nЗахист ущільнювачів: Формула NAVIGATOR бережно ставиться до гумових та пластикових елементів системи охолодження, запобігаючи їх висиханню, розтріскуванню та втраті еластичності. Це продовжує термін служби патрубків, прокладок та ущільнювачів.\n\nЕкономічне рішення: NAVIGATOR пропонує оптимальне співвідношення ціни та якості для регулярного обслуговування автомобіля. Доступна вартість робить своєчасну заміну охолоджувальної рідини фінансово необтяжливою для широкого кола автовласників.\n\nNAVIGATOR – ваш надійний провідник у світі охолоджувальних рідин.'
    },
    'HighWay-coolants': {
      name: 'HighWay',
      image: 'Materials/Highway.webp',
      factoryLogo: 'Materials/Highway.webp',
      productImage1: 'Materials/HW11.webp',
      productImage2: 'Materials/HW12.webp',
      description: 'HighWay – бренд антифризів, створених для автомобілів, що долають значні відстані. Назва відображає призначення продукції: надійний захист двигуна під час довгих поїздок автострадами та в різних дорожніх умовах.\n\nНадійність у русі: Охолоджувальні рідини HighWay забезпечують стабільну роботу системи охолодження при тривалих навантаженнях – тривалій їзді на високих швидкостях, в гірській місцевості, при буксируванні причепів або в умовах інтенсивного міського трафіку.\n\nЕфективна теплопередача: Спеціальні формули забезпечують оптимальний теплообмін між двигуном та радіатором, запобігаючи перегріву навіть при високих навантаженнях. Це особливо важливо для двигунів сучасних автомобілів з високим ступенем форсування.\n\nАнтикорозійні властивості: Пакет присадок HighWay захищає алюмінієві, мідні, чавунні та сталеві компоненти системи охолодження від корозії та кавітації. Ущільнювачі та патрубки також отримують захист від розтріскування та старіння.\n\nКласи та варіанти: Асортимент включає різні типи охолоджувальних рідин (органічні, гібридні) з різними температурами замерзання, що дозволяє підібрати оптимальний варіант залежно від типу двигуна, регіону експлуатації та стилю водіння.\n\nHighWay – впевненість у кожному кілометрі вашої подорожі.'
    },
    'Експо Хім-coolants': {
      name: 'Експо Хім',
      image: 'Materials/Експо Хім.webp',
      factoryLogo: 'Materials/RUBEG.webp',
      productImage1: 'Materials/EX21.webp',
      productImage2: 'Materials/EX22.webp',
      description: 'Експо Хім – виробник антифризів та охолоджувальних рідин, що пропонує надійні рішення для захисту систем охолодження за доступною ціною. Бренд орієнтований на потреби українських автовласників з урахуванням місцевих кліматичних умов.\n\nЛокальне виробництво: Продукція виготовляється в Україні з дотриманням технологічних стандартів та з використанням якісної сировини. Це забезпечує стабільність поставок та доступність продукції для широкого кола споживачів по всій країні.\n\nЗахист від екстремальних температур: Охолоджувальні рідини Експо Хім ефективно працюють в умовах українського клімату – від зимових морозів до літньої спеки. Різні варіанти температури замерзання дозволяють вибрати оптимальний продукт для регіону експлуатації.\n\nБазовий захист системи: Антифризи містять необхідний пакет присадок для захисту компонентів системи охолодження від корозії, утворення накипу та відкладень. Це забезпечує стабільну роботу двигуна та продовжує термін служби радіатора і помпи.\n\nЕкономічне рішення: Бренд пропонує співвідношення ціни та якості, оптимальне для регулярного обслуговування автомобіля. Доступність продукції робить своєчасну заміну охолоджувальної рідини фінансово необтяжливою для автовласників.\n\nЕкспо Хім – практичне українське рішення для охолодження двигуна.'
    },
    'Автохіт-coolants': {
      name: 'AUTO HiT',
      image: 'Materials/AH3.webp',
      factoryLogo: 'Materials/Автохіт.webp',
      productImage1: 'Materials/AT11.webp',
      productImage2: 'Materials/AT12.webp',
      description: 'AUTO HiT – український бренд охолоджуючих рідин та антифризів, що забезпечує надійну роботу системи охолодження в будь-яких кліматичних умовах. Продукція виробляється з урахуванням особливостей експлуатації автомобілів в Україні.\n\nОхолоджуючі рідини AUTO HiT захищають двигун від перегріву влітку та замерзання взимку. Доступні ціни та перевірена якість роблять AUTO HiT популярним вибором серед українських автолюбителів.'
    },
    'Plax-coolants': {
      name: 'Plax',
      image: 'Materials/Plax.webp',
      factoryLogo: 'Materials/Plax.webp',
      productImage1: '',
      productImage2: '',
      description: 'Plax – бренд антифризів, що поєднує сучасні технології фільтрації та охолодження з надійними захисними властивостями. Продукція розроблена для забезпечення оптимального температурного режиму двигунів різних типів та конструкцій.\n\nТехнологічні рішення: Охолоджувальні рідини Plax виготовляються з використанням сучасних формул, що забезпечують ефективний теплообмін та тривалий захист системи. Різні технології (органічна, гібридна, лобрідна) відповідають вимогам як класичних, так і новітніх двигунів.\n\nВсесезонна надійність: Антифризи зберігають стабільні характеристики протягом усього року – від зимових морозів до літніх температурних піків. Широкий діапазон робочих температур гарантує захист двигуна в будь-яких умовах експлуатації та кліматичних зонах.\n\nУніверсальність застосування: Продукція Plax підходить для легкових автомобілів, кросоверів, мікроавтобусів та комерційного транспорту з бензиновими та дизельними двигунами. Сумісність з різними металами та матеріалами системи охолодження забезпечує універсальне використання.\n\nТривалий ресурс: Якісні присадки підтримують захисні властивості протягом тривалого періоду експлуатації, запобігаючи корозії, кавітації та утворенню відкладень. Це знижує частоту заміни рідини та витрати на обслуговування.\n\nPlax – стабільний захист для безперебійної роботи двигуна.'
    },
    'Venol-coolants': {
      name: 'VENOL',
      image: 'Materials/Venol1.webp',
      factoryLogo: 'Materials/VenAF3.webp',
      productImage1: 'Materials/VE11.webp',
      productImage2: 'Materials/VE22.webp',
      website: 'https://venol.de',
      description: 'VENOL – бренд високоякісних антифризів та охолоджувальних рідин, що відповідають сучасним вимогам автомобільної індустрії. Продукція створена для забезпечення надійного захисту систем охолодження та оптимальної роботи двигунів різних типів.\n\nШирокий асортимент: Лінійка включає охолоджувальні рідини різних класів – від традиційних силікатних (G11) до сучасних органічних (G12, G12+, G12++) та лобрідних (G13) технологій. Це дозволяє підібрати оптимальний варіант для кожного типу двигуна та системи охолодження.\n\nВідповідність специфікаціям: Антифризи VENOL розроблені відповідно до вимог провідних автовиробників та міжнародних стандартів якості. Продукція проходить ретельні випробування та підтверджує свою ефективність у реальних умовах експлуатації.\n\nКомплексний захист: Збалансований пакет присадок забезпечує захист від корозії всіх металів системи охолодження (алюміній, чавун, мідь, сталь), запобігає кавітації, утворенню накипу та захищає гумові елементи від старіння та розтріскування.\n\nСтабільні характеристики: Охолоджувальні рідини VENOL підтримують оптимальну в`язкість та теплопередачу в широкому температурному діапазоні, забезпечуючи ефективне охолодження влітку та надійний захист від замерзання взимку протягом тривалого терміну експлуатації.\n\nVENOL – європейська якість для довговічності вашого двигуна.'
    },
    'Кама-coolants': {
      name: 'КАМА',
      image: 'Materials/KAMA.webp',
      factoryLogo: 'Materials/KAMA.webp',
      productImage1: 'Materials/KM31.webp',
      productImage2: 'Materials/KM32.webp',
      description: 'КАМА – бренд охолоджувальних рідин та антифризів українського виробництва. Продукція забезпечує надійну роботу системи охолодження в будь-яких кліматичних умовах.\n\nОхолоджувальні рідини КАМА захищають двигун від перегріву влітку та замерзання взимку. Доступні ціни та перевірена якість роблять КАМА популярним вибором серед українських автолюбителів.'
    },
    'Quantum-coolants': {
      name: 'QUANTUM',
      image: 'Materials/Quantum.webp',
      factoryLogo: 'Materials/Q23.webp',
      productImage1: 'Materials/Q21.webp',
      productImage2: 'Materials/Q22.webp',
      website: 'https://nanofrost.ua/ua/',
      description: 'QUANTUM – Private Label компанії ASL. Охолоджувальні рідини та антифризи виробляються ТОВ «Науково-виробниче підприємство „Мілі“», яке з 2020 року налагодило фасування антифризів та концентратів власного імпорту внаслідок співпраці з бельгійською компанією Solventis Europe NV. Якість підтверджується міжнародними сертифікатами швейцарської компанії SGS S.A.\n\nАсортимент: антифризи та концентрати G11, G12, G12+, G13, Heavy Duty – високоякісні охолоджуючі рідини для двигунів внутрішнього згорання на основі моноетиленгліколю або пропіленгліколю. Пакети присадок виготовлені за технологією OAT (Organic Acid Technology). Не містять амінів, фосфатів та силікатів, що подовжує термін експлуатації без втрати властивостей.\n\nКольори: рожевий, синій, зелений, жовтий, фіолетовий. Фасування: 1 кг, 1,5 кг, 4 кг, 5 кг, 9 кг, 10 кг, 20 кг. Продукція виготовлена з європейської сировини за передовими технологіями.\n\nСтандарти: AFNOR NF R15-601, ASTM D3306, BS 6580, SAE J 1034, CAT EC-1 та ін. Схвалення виробників: Ford, GM, Mercedes-Benz, Volkswagen (VAG TL 774 D&F), Volvo, Scania, DAF, MAN, Renault, а також Heavy Duty (Cummins, Caterpillar, Paccar, Mack Trucks тощо).'
    },
    // Омивач скла
    'Luksusowy': {
      name: 'Luksusowy',
      image: 'Materials/Luksusowy.webp',
      factoryLogo: 'Materials/Luksusowy.webp',
      productImage1: 'Materials/LK1.webp',
      productImage2: '',
      description: 'Luksusowy – бренд омивачів скла, що забезпечує чисте та яскраве скло в будь-яку погоду. Продукція відзначається високою якістю та ефективністю очищення.\n\nОмивачі скла Luksusowy забезпечують відмінну видимість та захист від забруднень, що робить їзду безпечнішою та комфортнішою.'
    },
    'Autoglas': {
      name: 'Autoglas',
      image: 'Materials/Autoglas.webp',
      factoryLogo: 'Materials/Autoglas.webp',
      productImage1: 'Materials/AG1.webp',
      productImage2: '',
      description: 'Autoglas – бренд омивачів скла, що пропонує якісні рідини для ефективного очищення лобового та бокового скла автомобіля. Продукція розроблена для забезпечення оптимальної видимості в різних умовах експлуатації.\n\nОмивачі скла Autoglas забезпечують чисте скло та сприяють безпеці на дорозі.'
    },
    'ADICS': {
      name: 'ADICS',
      image: 'Materials/ADICS.webp',
      factoryLogo: 'Materials/Adics.webp',
      productImage1: 'Materials/ADI1.webp',
      productImage2: '',
      description: 'ADICS – бренд омивачів скла, що забезпечує надійне та ефективне очищення скла автомобіля. Продукція відзначається високою якістю та доступною ціною.\n\nОмивачі скла ADICS забезпечують чисте скло та відмінну видимість в будь-яку погоду.'
    },
    'Аляsка': {
      name: 'АЛЯSКА',
      image: 'Materials/Alyaska.webp',
      factoryLogo: 'Materials/Alyaska.webp',
      productImage1: '',
      productImage2: '',
      description: 'АЛЯSКА – бренд омивачів скла, що забезпечує ефективне очищення скла в екстремальних температурних умовах. Продукція розроблена для надійної роботи в будь-яку пору року.\n\nОмивачі скла АЛЯSКА забезпечують чисте скло та відмінну видимість навіть у найсуворіші морози та спекотні літні дні.'
    },
    'QUANTUM-washer': {
      name: 'QUANTUM',
      image: 'Materials/Quantum.webp',
      factoryLogo: 'Materials/Q33.webp',
      productImage1: 'Materials/Q31.webp',
      productImage2: 'Materials/Q32.webp',
      description: 'QUANTUM – бренд омивачів скла преміум класу. Продукція забезпечує високоякісне очищення скла та відмінну видимість.\n\nОмивачі скла QUANTUM відзначаються надійністю та ефективністю, що робить їх ідеальним вибором для автовласників, які цінують якість.'
    },
    'Advantage': {
      name: 'Advantage',
      image: 'Materials/ADVANTAGE.webp',
      factoryLogo: 'Materials/ADVANTAGE.webp',
      productImage1: '',
      productImage2: '',
      description: 'Advantage – бренд омивачів скла, що пропонує переваги якості та ефективності. Продукція забезпечує чисте скло та відмінну видимість в різних умовах експлуатації.\n\nОмивачі скла Advantage забезпечують надійне очищення та сприяють безпеці на дорозі.'
    },
    'RONDEX': {
      name: 'RONDEX',
      image: 'Materials/RONDEX.webp',
      factoryLogo: 'Materials/RONDEX.webp',
      productImage1: 'Materials/RO1.webp',
      productImage2: 'Materials/RO2.webp',
      description: 'RONDEX – бренд омивачів скла, що забезпечує якісне очищення скла автомобіля. Продукція відзначається ефективністю та надійністю.\n\nОмивачі скла RONDEX забезпечують чисте скло та відмінну видимість, що робить їзду безпечнішою та комфортнішою.'
    },
    'Plax-washer': {
      name: 'Plax',
      image: 'Materials/Plax.webp',
      factoryLogo: 'Materials/Plax.webp',
      productImage1: 'Materials/PL1.webp',
      productImage2: 'Materials/PL2.webp',
      description: 'Plax – бренд омивачів скла, що поєднує сучасні технології очищення з надійними захисними властивостями. Продукція забезпечує ефективне очищення скла в будь-яку погоду.\n\nОмивачі скла Plax відзначаються високою якістю та забезпечують чисте скло та відмінну видимість, що сприяє безпеці на дорозі.'
    }
  };

  const brandCountryCodes = {
    'HighWay': 'ua', 'oil-right': 'ua', 'luxe': 'ua', 'ADVA': 'pl', 'Venol': 'de',
    'Kixx': 'kr', 'Автохіт': 'ua', 'AVIS': 'ua', 'K1 Lube': 'kr', 'КАМА': 'ua',
    'NAC': 'ua', 'Caroil': 'ua',
    'Quantum': 'ua', 'FORSE': 'ua', 'FEON': 'ua', 'Topla': 'si',
    'VEGA': 'ua', 'WPR': 'ua', 'STARTUP': 'ua', 'autopart': 'pl',
    'K2': 'pl', 'Senfineco': 'de', 'Atas': 'it', 'PiTon': 'ua',
    'ProfiMax': 'ua', 'ACTIVE': 'ua', 'Тайфун': 'ua',
    'Alyaska': 'ua', 'NAVIGATOR': 'ua', 'Експо Хім': 'ua', 'Plax': 'pl', 'МFC': 'ua',
    'AF Alpha': 'ua', 'Wix Filters': 'pl', 'Knecht': 'de', 'Shikoo': 'ua',
    'KSN': 'ua', 'Yuko': 'ua', 'Temol': 'ua', 'AVIS1': 'ua',
    'Venol-brakes': 'de', 'ADVA-brakes': 'pl', 'Експо Хім-brakes': 'ua',
    'Alyaska-brakes': 'ua', 'Автохіт-brakes': 'ua', 'Кама-brakes': 'ua', 'High Way-brakes': 'ua',
    'Alyaska-coolants': 'ua', 'HighWay-coolants': 'ua', 'Експо Хім-coolants': 'ua', 'Автохіт-coolants': 'ua',
    'Plax-coolants': 'pl', 'Venol-coolants': 'de', 'Кама-coolants': 'ua', 'Quantum-coolants': 'ua',
    'Luksusowy': 'pl', 'Autoglas': 'pl', 'ADICS': 'ua', 'Аляsка': 'ua',
    'QUANTUM-washer': 'pl', 'Advantage': 'ua', 'RONDEX': 'pl', 'Plax-washer': 'pl'
  };

  const brandData = window.brandsData[brandParam];
  if (!brandData) return;
  const countryCode = brandCountryCodes[brandParam] || 'ua';

  // Category background images (same as in "view all brands" page)
  const categoryBackgrounds = {
    'batteries': 'Materials/AKM.webp',
    'oils': 'Materials/oil.webp',
    'chem': 'Materials/Avtohim.webp',
    'coolants': 'Materials/Antifriz.webp',
    'brakes': 'Materials/tormoz.webp',
    'filters': 'Materials/filter.webp',
    'washer': 'Materials/steklo.webp',
    'greases': 'Materials/ed35faa954b465a3c3ff55526ad27c12.webp'
  };

  // Apply category background image to hero section
  if (categoryParam && categoryBackgrounds[categoryParam]) {
    const heroSection = document.querySelector('.page__main.main_services');
    if (heroSection) {
      heroSection.style.background = `url('${categoryBackgrounds[categoryParam]}') center top / cover no-repeat`;
    }
  }

  // Update page title
  const titleElement = document.querySelector('.main__title');
  if (titleElement) {
    titleElement.innerHTML = `${brandData.name} <span class="fi fi-${countryCode}" style="margin-left:0.3em;font-size:0.8em;border-radius:3px;"></span>`;
    // Mark this element to not be translated
    titleElement.setAttribute('data-no-translate', 'true');
  }

  // Update document title
  document.title = `ASL Company - ${brandData.name}`;

  // Update brand logo
  const brandLogoElement = document.getElementById('brand-logo');
  if (brandLogoElement) {
    brandLogoElement.src = brandData.image || 'img/home/services_placeholder.webp';
    brandLogoElement.alt = `${brandData.name} логотип`;
  }

  // Update factory logo (use brand image as placeholder if factory logo not provided)
  const factoryLogoElement = document.getElementById('factory-logo');
  if (factoryLogoElement) {
    factoryLogoElement.src = brandData.factoryLogo || brandData.image || 'img/home/services_placeholder.webp';
    factoryLogoElement.alt = `${brandData.name} логотип заводу`;
  }

  // Update product images (use brand image as placeholder if product images not provided)
  const productImage1 = document.getElementById('product-image-1');
  if (productImage1) {
    productImage1.src = brandData.productImage1 || brandData.image || 'img/home/services_placeholder.webp';
    productImage1.alt = `${brandData.name} продукція 1`;
  }

  const productImage2 = document.getElementById('product-image-2');
  if (productImage2) {
    productImage2.src = brandData.productImage2 || brandData.image || 'img/home/services_placeholder.webp';
    productImage2.alt = `${brandData.name} продукція 2`;
  }

  // Update brand name
  const brandNameElement = document.getElementById('brand-name');
  if (brandNameElement) {
    brandNameElement.innerHTML = `${brandData.name} <span class="fi fi-${countryCode}" style="margin-left:0.3em;font-size:0.7em;border-radius:3px;"></span>`;
    // Mark this element to not be translated
    brandNameElement.setAttribute('data-no-translate', 'true');
  }

  // Show distributor info for K1 Lube in hero section
  const heroDistributorElement = document.getElementById('hero-distributor');
  if (heroDistributorElement) {
    if (brandParam === 'K1 Lube' || brandParam === 'K1%20Lube') {
      heroDistributorElement.style.display = 'block';
    } else {
      heroDistributorElement.style.display = 'none';
    }
  }

  // Update description
  const descriptionElement = document.getElementById('brand-description');
  if (descriptionElement) {
    // Get current language from localStorage
    const currentLang = localStorage.getItem('asl-lang') || 'ua';
    
    // Try to get translated description first
    let description = brandData.description;
    if (brandDescriptions[currentLang] && brandDescriptions[currentLang][brandParam]) {
      description = brandDescriptions[currentLang][brandParam];
    }
    
    const paragraphs = description.split('\n\n');
    let html = paragraphs.map(p => `<p>${p}</p>`).join('');
    if (brandData.website) {
      const websiteLabel = currentLang === 'en' ? 'Website' : (currentLang === 'ru' ? 'Сайт' : 'Сайт');
      html += `<p class="brand-site-wrapper"><span data-i18n="brand.website">${websiteLabel}</span> - <a href="${brandData.website}" target="_blank" rel="noopener noreferrer" class="brand-site-link">${brandData.website}</a></p>`;
    }
    descriptionElement.innerHTML = html;
    // Store brand key for later translation
    descriptionElement.setAttribute('data-brand-key', brandParam);
  }

  // Update "Back to assortment" link to scroll to the category
  if (categoryParam) {
    const backButton = document.querySelector('.back-button__link');
    if (backButton) {
      backButton.href = `assortiment.html#${categoryParam}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', initBrandPage);

// ========= Assortment page: add country flags to brand cards =========
function initAssortmentFlags() {
  const isAssortment = document.body.classList.contains("assortment");
  if (!isAssortment) return;

  const countryCodes = {
    'HighWay': 'ua', 'oil-right': 'ua', 'luxe': 'ua', 'ADVA': 'pl', 'Venol': 'de',
    'Kixx': 'kr', 'Автохіт': 'ua', 'AVIS': 'ua', 'K1 Lube': 'kr', 'КАМА': 'ua',
    'NAC': 'ua', 'Caroil': 'ua',
    'Quantum': 'ua', 'FORSE': 'ua', 'FEON': 'ua', 'Topla': 'si',
    'VEGA': 'ua', 'WPR': 'ua', 'STARTUP': 'ua', 'autopart': 'pl',
    'K2': 'pl', 'Senfineco': 'de', 'Atas': 'it', 'PiTon': 'ua',
    'ProfiMax': 'ua', 'ACTIVE': 'ua', 'Тайфун': 'ua',
    'Alyaska': 'ua', 'NAVIGATOR': 'ua', 'Експо Хім': 'ua', 'Plax': 'pl', 'МFC': 'ua',
    'AF Alpha': 'ua', 'Wix Filters': 'pl', 'Knecht': 'de', 'Shikoo': 'ua',
    'KSN': 'ua', 'Yuko': 'ua', 'Temol': 'ua', 'AVIS1': 'ua',
    'Luksusowy': 'pl', 'Autoglas': 'pl', 'ADICS': 'ua', 'Аляsка': 'ua',
    'QUANTUM-washer': 'pl', 'Advantage': 'ua', 'RONDEX': 'pl',
    'Alyaska-coolants': 'ua', 'HighWay-coolants': 'ua', 'Експо Хім-coolants': 'ua', 'Автохіт-coolants': 'ua',
    'Plax-coolants': 'pl', 'Venol-coolants': 'de', 'Кама-coolants': 'ua', 'Quantum-coolants': 'ua',
    'Експо Хім-brakes': 'ua', 'Alyaska-brakes': 'ua', 'ADVA-brakes': 'pl',
    'Venol-brakes': 'de', 'Автохіт-brakes': 'ua', 'Кама-brakes': 'ua', 'High Way-brakes': 'ua',
    'Plax-washer': 'pl'
  };

  document.querySelectorAll('.item-services__top').forEach(link => {
    const href = link.getAttribute('href') || '';
    const match = href.match(/brand=([^&]+)/);
    if (!match) return;
    const brandKey = decodeURIComponent(match[1]);
    const cc = countryCodes[brandKey] || 'ua';
    const imgWrapper = link.querySelector('.item-services__image');
    if (imgWrapper) {
      const flag = document.createElement('span');
      flag.className = `fi fi-${cc}`;
      flag.style.cssText = 'position:absolute;top:8px;right:8px;z-index:3;font-size:24px;border-radius:3px;box-shadow:0 2px 6px rgba(0,0,0,0.4);';
      imgWrapper.appendChild(flag);
    }
  });
}
document.addEventListener('DOMContentLoaded', initAssortmentFlags);

// ========= Assortment page: scroll to anchor on load =========
function initAssortmentScroll() {
  const isAssortment = document.body.classList.contains("assortment");
  if (!isAssortment) return;

  // Check if there's a hash in the URL
  const hash = window.location.hash;
  if (!hash) return;

  // Remove the # symbol
  const targetId = hash.substring(1);
  
  // Find the target element
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  // Wait for page to fully load, then scroll
  setTimeout(() => {
    const headerOffset = 100; // Offset for fixed header if any
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, 100);
}

// Run on page load
document.addEventListener('DOMContentLoaded', initAssortmentScroll);

// Also handle hash changes (if user clicks another anchor link on the same page)
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (!hash) return;
  
  const targetId = hash.substring(1);
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  setTimeout(() => {
    const headerOffset = 100;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, 100);
});


// ========= News page: category filters =========
function initNewsFilters() {
  const isNewsPage = window.location.pathname.includes('news.html');
  if (!isNewsPage) return;

  const filters = document.querySelectorAll('.news-filter');
  const newsCards = document.querySelectorAll('.news-card');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;
      
      // Update active filter
      filters.forEach(f => f.classList.remove('news-filter--active'));
      filter.classList.add('news-filter--active');
      
      // Filter news cards
      newsCards.forEach(card => {
        if (category === 'all') {
          card.classList.remove('hidden');
        } else {
          const cardCategory = card.dataset.category;
          if (cardCategory === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initNewsFilters);

// ========= Brand page: animations =========
function initBrandAnimations() {
  const isBrandPage = window.location.pathname.includes('brand.html');
  if (!isBrandPage) return;

  const logos = document.querySelectorAll('.brand__logo-item');
  const description = document.querySelector('.brand__description');
  const products = document.querySelectorAll('.brand__product-item');
  const contactButton = document.querySelector('.brand__contact-button');

  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    logos.forEach(el => el.style.opacity = '1');
    if (description) description.style.opacity = '1';
    products.forEach(el => el.style.opacity = '1');
    if (contactButton) contactButton.style.opacity = '1';
    return;
  }

  // Add animation classes
  logos.forEach((logo, index) => {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(30px)';
    logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  if (description) {
    description.style.opacity = '0';
    description.style.transform = 'translateY(30px)';
    description.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }

  products.forEach((product, index) => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(30px)';
    product.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  if (contactButton) {
    contactButton.style.opacity = '0';
    contactButton.style.transform = 'translateY(30px)';
    contactButton.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe elements with delays
  logos.forEach((logo, index) => {
    setTimeout(() => observer.observe(logo), index * 100);
  });

  if (description) {
    setTimeout(() => observer.observe(description), logos.length * 100);
  }

  products.forEach((product, index) => {
    setTimeout(() => observer.observe(product), (logos.length + 1) * 100 + index * 150);
  });

  if (contactButton) {
    setTimeout(() => observer.observe(contactButton), (logos.length + products.length + 1) * 100);
  }
}

document.addEventListener('DOMContentLoaded', initBrandAnimations);


// ========= Multi-language support =========
function initLanguageSystem() {
  const savedLang = localStorage.getItem('asl-lang') || 'ua';
  
  // Apply saved language on page load
  if (savedLang && translations[savedLang]) {
    translatePage(savedLang);
  }
  
  // Note: Language switcher click handlers are set up in initLangSwitcher()
  // We don't add them here to avoid duplication
}

function translatePage(lang) {
  
  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    // Skip elements marked as no-translate
    if (element.hasAttribute('data-no-translate')) {
      return;
    }
    
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Check if element has data-i18n-attr to translate attribute instead of text
      const attr = element.getAttribute('data-i18n-attr');
      if (attr) {
        element.setAttribute(attr, translations[lang][key]);
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // Update brand description if on brand page
  if (window.location.pathname.includes('brand.html')) {
    updateBrandDescription(lang);
    // Also update distributor visibility for K1 Lube
    updateDistributorVisibility();
  }
  
  // Update language switcher display
  updateLanguageSwitcher(lang);
}

// Function to update distributor visibility
function updateDistributorVisibility() {
  const urlParams = new URLSearchParams(window.location.search);
  const brandParam = urlParams.get('brand');
  const heroDistributorElement = document.getElementById('hero-distributor');
  
  if (heroDistributorElement) {
    if (brandParam === 'K1 Lube' || brandParam === 'K1%20Lube') {
      heroDistributorElement.style.display = 'block';
    } else {
      heroDistributorElement.style.display = 'none';
    }
  }
}

// Make translatePage globally accessible
window.translatePage = translatePage;

// Function to update brand description on language change
function updateBrandDescription(lang) {
  const descriptionElement = document.getElementById('brand-description');
  if (!descriptionElement) return;
  
  const brandKey = descriptionElement.getAttribute('data-brand-key');
  if (!brandKey) return;
  
  // Get translated description
  const translatedDesc = brandDescriptions[lang] && brandDescriptions[lang][brandKey];
  if (!translatedDesc) {
    // Try to use original description from brandsData
    if (window.brandsData && window.brandsData[brandKey] && window.brandsData[brandKey].description) {
      const paragraphs = window.brandsData[brandKey].description.split('\n\n');
      let html = paragraphs.map(p => `<p>${p}</p>`).join('');
      
      if (window.brandsData[brandKey].website) {
        const websiteLabel = lang === 'en' ? 'Website' : (lang === 'ru' ? 'Сайт' : 'Сайт');
        html += `<p class="brand-site-wrapper"><span data-i18n="brand.website">${websiteLabel}</span> - <a href="${window.brandsData[brandKey].website}" target="_blank" rel="noopener noreferrer" class="brand-site-link">${window.brandsData[brandKey].website}</a></p>`;
      }
      
      descriptionElement.innerHTML = html;
    }
    return;
  }
  
  const paragraphs = translatedDesc.split('\n\n');
  let html = paragraphs.map(p => `<p>${p}</p>`).join('');
  
  // Add website link if exists
  if (window.brandsData && window.brandsData[brandKey] && window.brandsData[brandKey].website) {
    const websiteLabel = lang === 'en' ? 'Website' : (lang === 'ru' ? 'Сайт' : 'Сайт');
    html += `<p class="brand-site-wrapper"><span data-i18n="brand.website">${websiteLabel}</span> - <a href="${window.brandsData[brandKey].website}" target="_blank" rel="noopener noreferrer" class="brand-site-link">${window.brandsData[brandKey].website}</a></p>`;
  }
  
  descriptionElement.innerHTML = html;
}

function updateLanguageSwitcher(lang) {
  const codeMap = {
    'ua': 'UA',
    'ru': 'RU',
    'en': 'EN'
  };
  
  document.querySelectorAll('.lang-switcher').forEach(switcher => {
    const btn = switcher.querySelector('.lang-switcher__btn');
    const codeDisplay = btn ? btn.querySelector('.lang-switcher__code') : null;
    const items = switcher.querySelectorAll('.lang-switcher__item');
    
    // Update button display
    if (codeDisplay) {
      codeDisplay.textContent = codeMap[lang] || lang.toUpperCase();
    }
    
    // Update active state
    items.forEach(item => {
      if (item.dataset.lang === lang) {
        item.classList.add('lang-switcher__item--active');
      } else {
        item.classList.remove('lang-switcher__item--active');
      }
    });
  });
}

// Initialize language system when DOM is ready
document.addEventListener('DOMContentLoaded', initLanguageSystem);

// ========= Services pagination indicators =========
function initServicesPagination() {
  const servicesRow = document.querySelector('.services__row');
  const dots = document.querySelectorAll('.services__dot');
  
  if (!servicesRow || dots.length === 0) return;
  
  const totalItems = 8; // Total number of service items
  
  // Calculate which page we're on based on scroll position
  function updateActiveDot() {
    const scrollLeft = servicesRow.scrollLeft;
    const containerWidth = servicesRow.offsetWidth;
    const scrollWidth = servicesRow.scrollWidth;
    
    // Calculate the width of one item
    const itemWidth = scrollWidth / totalItems;
    
    // Calculate which item is currently at the start of the viewport
    const firstVisibleIndex = Math.round(scrollLeft / itemWidth);
    
    // Calculate how many items fit in the viewport
    const itemsVisible = Math.round(containerWidth / itemWidth);
    
    // Highlight the dots for visible items
    dots.forEach((dot, index) => {
      if (index >= firstVisibleIndex && index < firstVisibleIndex + itemsVisible) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Update on scroll
  servicesRow.addEventListener('scroll', updateActiveDot);
  
  // Update on resize (when orientation changes or window resizes)
  window.addEventListener('resize', updateActiveDot);
  
  // Initial update
  updateActiveDot();
}

document.addEventListener('DOMContentLoaded', initServicesPagination);

// ============== COOKIE BANNER ==============
function initCookieBanner() {
  if (localStorage.getItem('cookieConsent')) return;

  const lang = localStorage.getItem('selectedLanguage') || 'ua';
  const texts = {
    ua: { text: 'Ми використовуємо файли cookie для покращення роботи сайту.', policy: 'Політика конфіденційності', accept: 'Прийняти', decline: 'Відхилити' },
    ru: { text: 'Мы используем файлы cookie для улучшения работы сайта.', policy: 'Политика конфиденциальности', accept: 'Принять', decline: 'Отклонить' },
    en: { text: 'We use cookies to improve your browsing experience.', policy: 'Privacy Policy', accept: 'Accept', decline: 'Decline' }
  };
  const t = texts[lang] || texts.ua;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.innerHTML =
    '<div class="cookie-banner__container">' +
      '<p class="cookie-banner__text">' +
        '<span data-i18n="cookie.text">' + t.text + '</span> ' +
        '<a href="#" class="cookie-banner__link" data-i18n="cookie.policy">' + t.policy + '</a>' +
      '</p>' +
      '<div class="cookie-banner__actions">' +
        '<button class="cookie-banner__accept" data-i18n="cookie.accept">' + t.accept + '</button>' +
        '<button class="cookie-banner__decline" data-i18n="cookie.decline">' + t.decline + '</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      banner.classList.add('cookie-banner--visible');
    });
  });

  banner.querySelector('.cookie-banner__accept').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    closeBanner(banner);
  });

  banner.querySelector('.cookie-banner__decline').addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'declined');
    closeBanner(banner);
  });

  function closeBanner(el) {
    el.classList.remove('cookie-banner--visible');
    el.addEventListener('transitionend', function() { el.remove(); }, { once: true });
  }
}

document.addEventListener('DOMContentLoaded', initCookieBanner);