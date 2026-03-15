// Auto-add data-i18n attributes to common elements
document.addEventListener('DOMContentLoaded', function() {
  // Navigation
  const navLinks = document.querySelectorAll('.menu__link');
  const navTexts = ['Головна', 'Про нас', 'Асортимент', 'Новини', 'Вакансії', 'Відгуки', 'Контакти'];
  const navKeys = ['nav.home', 'nav.about', 'nav.assortment', 'nav.news', 'nav.vacancies', 'nav.reviews', 'nav.contacts'];
  
  navLinks.forEach((link, index) => {
    if (link.textContent.trim() === navTexts[index]) {
      link.setAttribute('data-i18n', navKeys[index]);
    }
  });
  
  // Order button
  const orderBtn = document.querySelector('.actions-header__button');
  if (orderBtn && orderBtn.textContent.trim() === 'Замовити') {
    orderBtn.setAttribute('data-i18n', 'header.order');
  }
  
  // Footer
  const footerPolicy = document.querySelector('.footer__policy');
  if (footerPolicy && footerPolicy.textContent.includes('Політика конфіденційності')) {
    footerPolicy.setAttribute('data-i18n', 'footer.policy');
  }
  
  const footerCopyright = document.querySelector('.footer__copyright');
  if (footerCopyright && footerCopyright.textContent.includes('Copyright')) {
    footerCopyright.setAttribute('data-i18n', 'footer.copyright');
  }
  
  // Home page specific
  if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    addHomePageAttributes();
  }
  
  // About page specific
  if (window.location.pathname.includes('about.html')) {
    addAboutPageAttributes();
  }
  
  // News page specific
  if (window.location.pathname.includes('news.html')) {
    addNewsPageAttributes();
  }
  
  // Reviews page specific
  if (window.location.pathname.includes('reviews.html')) {
    addReviewsPageAttributes();
  }
  
  // Contact page specific
  if (window.location.pathname.includes('contact.html')) {
    addContactPageAttributes();
  }
  
  // Assortment page specific
  if (window.location.pathname.includes('assortiment.html')) {
    addAssortmentPageAttributes();
  }
  
  // Brand page specific
  if (window.location.pathname.includes('brand.html')) {
    addBrandPageAttributes();
  }
});

function addHomePageAttributes() {
  // Hero section
  const heroCaption = document.querySelector('.main__caption');
  if (heroCaption) heroCaption.setAttribute('data-i18n', 'home.hero.caption');
  
  const heroTitle = document.querySelector('.main__title');
  if (heroTitle && heroTitle.textContent.trim() === 'ASL Company') {
    heroTitle.setAttribute('data-i18n', 'home.hero.title');
  }
  
  const heroText = document.querySelector('.main__text');
  if (heroText && heroText.textContent.includes('Надійний Партнер')) {
    heroText.setAttribute('data-i18n', 'home.hero.text');
  }
  
  const heroButton = document.querySelector('.main__button');
  if (heroButton) heroButton.setAttribute('data-i18n', 'home.hero.button');
  
  // About section
  const aboutTitle = document.querySelector('.about__title');
  if (aboutTitle && aboutTitle.textContent.trim() === 'Про нас') {
    aboutTitle.setAttribute('data-i18n', 'home.about.title');
  }
  
  const aboutTexts = document.querySelectorAll('.about__text p');
  if (aboutTexts.length >= 2) {
    aboutTexts[0].setAttribute('data-i18n', 'home.about.text1');
    aboutTexts[1].setAttribute('data-i18n', 'home.about.text2');
  }
  
  const aboutButton = document.querySelector('.about__button');
  if (aboutButton) aboutButton.setAttribute('data-i18n', 'home.about.button');
  
  // Services section
  const servicesTitle = document.querySelector('.services__title');
  if (servicesTitle && servicesTitle.textContent.includes('категорії')) {
    servicesTitle.setAttribute('data-i18n', 'home.services.title');
  }
  
  const servicesTitles = document.querySelectorAll('.item-services__title');
  const servicesKeys = ['batteries', 'oils', 'greases', 'coolants', 'brakes', 'filters', 'chem', 'washer'];
  servicesTitles.forEach((title, index) => {
    if (servicesKeys[index]) {
      title.setAttribute('data-i18n', `home.services.${servicesKeys[index]}`);
    }
  });
  
  const servicesTexts = document.querySelectorAll('.item-services__text');
  servicesTexts.forEach((text, index) => {
    if (servicesKeys[index]) {
      text.setAttribute('data-i18n', `home.services.${servicesKeys[index]}.text`);
    }
  });
  
  const servicesButtons = document.querySelectorAll('.item-services__button');
  servicesButtons.forEach(btn => {
    btn.setAttribute('data-i18n', 'home.services.view');
  });
  
  // News section
  const newsTitle = document.querySelector('.news__title');
  if (newsTitle && newsTitle.textContent.includes('новини')) {
    newsTitle.setAttribute('data-i18n', 'home.news.title');
  }
  
  const newsButton = document.querySelector('.news__button');
  if (newsButton) newsButton.setAttribute('data-i18n', 'home.news.button');
  
  // Testimonial section
  const testimonialCaption = document.querySelector('.testiomonial__caption');
  if (testimonialCaption) testimonialCaption.setAttribute('data-i18n', 'home.testimonial.caption');
  
  const testimonialQuote = document.querySelector('.testimonial__quote');
  if (testimonialQuote) testimonialQuote.setAttribute('data-i18n', 'home.testimonial.quote');
  
  const testimonialRole = document.querySelector('.item-testimonial__caption');
  if (testimonialRole) testimonialRole.setAttribute('data-i18n', 'home.testimonial.role');
  
  const testimonialButton = document.querySelector('.testimonial__button');
  if (testimonialButton) testimonialButton.setAttribute('data-i18n', 'home.testimonial.button');
  
  // Outro section
  const outroTitle = document.querySelector('.outro__title');
  if (outroTitle) outroTitle.setAttribute('data-i18n', 'home.outro.title');
  
  const outroText = document.querySelector('.outro__text');
  if (outroText) outroText.setAttribute('data-i18n', 'home.outro.text');
  
  const outroButton = document.querySelector('.outro__button');
  if (outroButton) outroButton.setAttribute('data-i18n', 'home.outro.button');
}

function addNewsPageAttributes() {
  const heroTitle = document.querySelector('.main__title');
  if (heroTitle && heroTitle.textContent.trim() === 'Новини') {
    heroTitle.setAttribute('data-i18n', 'news.hero.title');
  }
  
  const heroText = document.querySelector('.main__text_pages');
  if (heroText) heroText.setAttribute('data-i18n', 'news.hero.text');
  
  // Filters
  const filters = document.querySelectorAll('.news-filter');
  const filterKeys = ['all', 'promotions', 'products', 'service'];
  filters.forEach((filter, index) => {
    if (filterKeys[index]) {
      filter.setAttribute('data-i18n', `news.filter.${filterKeys[index]}`);
    }
  });
  
  const outroTitle = document.querySelector('.outro__title');
  if (outroTitle) outroTitle.setAttribute('data-i18n', 'news.outro.title');
  
  const outroText = document.querySelector('.outro__text');
  if (outroText) outroText.setAttribute('data-i18n', 'news.outro.text');
  
  const outroButton = document.querySelector('.outro__button');
  if (outroButton) outroButton.setAttribute('data-i18n', 'news.outro.button');
}

function addReviewsPageAttributes() {
  const heroTitle = document.querySelector('.main__title');
  if (heroTitle && heroTitle.textContent.trim() === 'Відгуки') {
    heroTitle.setAttribute('data-i18n', 'reviews.hero.title');
  }
  
  const heroText = document.querySelector('.main__text_pages');
  if (heroText) heroText.setAttribute('data-i18n', 'reviews.hero.text');
  
  // Stats
  const statsLabels = document.querySelectorAll('.reviews-stats__label');
  const statsKeys = ['clients', 'years', 'brands', 'positive'];
  statsLabels.forEach((label, index) => {
    if (statsKeys[index]) {
      label.setAttribute('data-i18n', `reviews.stats.${statsKeys[index]}`);
    }
  });
  
  const sectionTitle = document.querySelector('.reviews-section__title');
  if (sectionTitle) sectionTitle.setAttribute('data-i18n', 'reviews.section.title');
  
  const outroTitle = document.querySelector('.outro__title');
  if (outroTitle) outroTitle.setAttribute('data-i18n', 'reviews.outro.title');
  
  const outroText = document.querySelector('.outro__text');
  if (outroText) outroText.setAttribute('data-i18n', 'reviews.outro.text');
  
  const outroButton = document.querySelector('.outro__button');
  if (outroButton) outroButton.setAttribute('data-i18n', 'reviews.outro.button');
}

function addContactPageAttributes() {
  const heroTitle = document.querySelector('.main__title');
  if (heroTitle && heroTitle.textContent.trim() === 'Контакти') {
    heroTitle.setAttribute('data-i18n', 'contact.hero.title');
  }
  
  const heroText = document.querySelector('.main__text_pages');
  if (heroText) heroText.setAttribute('data-i18n', 'contact.hero.text');
  
  const contactTitle = document.querySelectorAll('.contact__title');
  contactTitle.forEach((title, index) => {
    if (index === 0) title.setAttribute('data-i18n', 'contact.title');
    if (index === 1) title.setAttribute('data-i18n', 'contact.info.title');
  });
  
  const contactTypes = document.querySelectorAll('.connect-contact__type');
  contactTypes.forEach(type => {
    const text = type.textContent.trim();
    if (text === 'Телефон') type.setAttribute('data-i18n', 'contact.phone');
    if (text === 'Email') type.setAttribute('data-i18n', 'contact.email');
    if (text === 'Адреса') type.setAttribute('data-i18n', 'contact.address');
  });
  
  const contactTexts = document.querySelectorAll('.contact__text p');
  if (contactTexts.length >= 2) {
    contactTexts[0].setAttribute('data-i18n', 'contact.info.text1');
    contactTexts[1].setAttribute('data-i18n', 'contact.info.text2');
  }
}

function addAssortmentPageAttributes() {
  const heroTitle = document.querySelector('.main__title');
  if (heroTitle && heroTitle.textContent.trim() === 'Асортимент') {
    heroTitle.setAttribute('data-i18n', 'assortment.hero.title');
  }
  
  const heroText = document.querySelector('.main__text_pages');
  if (heroText) heroText.setAttribute('data-i18n', 'assortment.hero.text');
  
  const servicesTitles = document.querySelectorAll('.services__title');
  const titlesMap = {
    'Оливи': 'oils',
    'Акумулятори': 'batteries',
    'Автохімія': 'chem',
    'Антифриз': 'coolants',
    'Гальмівні рідини': 'brakes',
    'Фільтри': 'filters',
    'Омивач скла': 'washer',
    'Мастила': 'greases'
  };
  
  servicesTitles.forEach(title => {
    const text = title.textContent.trim();
    if (titlesMap[text]) {
      title.setAttribute('data-i18n', `assortment.${titlesMap[text]}.title`);
    }
  });
  
  const viewAllButtons = document.querySelectorAll('.brand-viewall .button');
  viewAllButtons.forEach(btn => {
    btn.setAttribute('data-i18n', 'assortment.viewall');
  });
  
  const outroTitle = document.querySelector('.outro__title');
  if (outroTitle) outroTitle.setAttribute('data-i18n', 'assortment.outro.title');
  
  const outroText = document.querySelector('.outro__text');
  if (outroText) outroText.setAttribute('data-i18n', 'assortment.outro.text');
  
  const outroButton = document.querySelector('.outro__button');
  if (outroButton) outroButton.setAttribute('data-i18n', 'assortment.outro.button');
}

function addBrandPageAttributes() {
  // Don't translate hero title on brand page - it shows brand name
  const heroTitle = document.querySelector('.main__title');
  // Only translate if it's the default "Бренд" text, not actual brand name
  if (heroTitle && heroTitle.textContent.trim() === 'Бренд') {
    heroTitle.setAttribute('data-i18n', 'brand.hero.title');
  }
  
  const heroText = document.querySelector('.main__text_pages');
  if (heroText && heroText.textContent.includes('Інформація про бренд')) {
    heroText.setAttribute('data-i18n', 'brand.hero.text');
  }
  
  const productsTitle = document.querySelector('.brand__products-title');
  if (productsTitle) productsTitle.setAttribute('data-i18n', 'brand.products.title');
  
  const brandButton = document.querySelector('.brand__button');
  if (brandButton) brandButton.setAttribute('data-i18n', 'brand.button');
  
  const backButton = document.querySelector('.back-button__link');
  if (backButton) backButton.setAttribute('data-i18n', 'brand.back');
}

function addAboutPageAttributes() {
  const heroTitle = document.querySelector('.main__title');
  if (heroTitle && heroTitle.textContent.trim() === 'Про нас') {
    heroTitle.setAttribute('data-i18n', 'about.hero.title');
  }
  
  const heroText = document.querySelector('.main__text_pages');
  if (heroText) heroText.setAttribute('data-i18n', 'about.hero.text');
  
  const historyTitle = document.querySelector('.about__title');
  if (historyTitle) historyTitle.setAttribute('data-i18n', 'about.history.title');
  
  const historyTexts = document.querySelectorAll('.about__text p');
  if (historyTexts.length >= 2) {
    historyTexts[0].setAttribute('data-i18n', 'about.history.text1');
    historyTexts[1].setAttribute('data-i18n', 'about.history.text2');
  }
  
  const aboutButton = document.querySelector('.about__button');
  if (aboutButton) aboutButton.setAttribute('data-i18n', 'about.button');
  
  const outroTitle = document.querySelector('.outro__title');
  if (outroTitle) outroTitle.setAttribute('data-i18n', 'about.outro.title');
  
  const outroText = document.querySelector('.outro__text');
  if (outroText) outroText.setAttribute('data-i18n', 'about.outro.text');
  
  const outroButton = document.querySelector('.outro__button');
  if (outroButton) outroButton.setAttribute('data-i18n', 'about.outro.button');
}
