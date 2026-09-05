/* Comportamiento compartido: header, menú móvil, modal legal, selector de idioma. */
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

const siteHeader = document.getElementById('site-header');
const siteToTop = document.getElementById('toTop');
if (siteHeader && siteToTop) {
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    siteToTop.classList.toggle('show', window.scrollY > 500);
  });
  siteToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const siteBurger = document.getElementById('burgerBtn');
const siteNavLinks = document.getElementById('navLinks');
if (siteBurger && siteNavLinks) {
  siteBurger.addEventListener('click', () => siteNavLinks.classList.toggle('open'));
  siteNavLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => siteNavLinks.classList.remove('open')));
}

/* Modal legal */
const siteLegalModal = document.getElementById('legalModal');
if (siteLegalModal) {
  const legalTabs = document.querySelectorAll('.legal-tab');
  const legalPanels = {
    aviso: document.getElementById('legalPanelAviso'),
    privacidad: document.getElementById('legalPanelPrivacidad'),
    cookies: document.getElementById('legalPanelCookies'),
  };
  function openLegal(tab) {
    siteLegalModal.classList.add('open');
    legalTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-legal-panel') === tab));
    Object.entries(legalPanels).forEach(([key, el]) => el.classList.toggle('active', key === tab));
  }
  document.querySelectorAll('[data-legal-tab]').forEach(btn => {
    btn.addEventListener('click', () => openLegal(btn.getAttribute('data-legal-tab')));
  });
  legalTabs.forEach(btn => {
    btn.addEventListener('click', () => openLegal(btn.getAttribute('data-legal-panel')));
  });
  document.getElementById('legalClose').addEventListener('click', () => siteLegalModal.classList.remove('open'));
  siteLegalModal.addEventListener('click', (e) => { if (e.target === siteLegalModal) siteLegalModal.classList.remove('open'); });
}

/* Selector de idioma (usa window.I18N, cargado desde assets/i18n.js) */
const FLAGS = { es: '🇪🇸', en: '🇬🇧' };
let currentLang = localStorage.getItem('capricho_lang') || 'es';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('capricho_lang', lang);
  document.documentElement.lang = lang;
  const langFlag = document.getElementById('langFlag');
  const langCode = document.getElementById('langCode');
  if (langFlag) langFlag.textContent = FLAGS[lang];
  if (langCode) langCode.textContent = lang.toUpperCase();
  document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang] && I18N[lang][key] !== undefined) el.innerHTML = I18N[lang][key];
  });
  if (typeof onLanguageChange === 'function') onLanguageChange(lang);
}

const siteLangSwitch = document.getElementById('langSwitch');
const siteLangBtn = document.getElementById('langBtn');
if (siteLangSwitch && siteLangBtn) {
  siteLangBtn.addEventListener('click', (e) => { e.stopPropagation(); siteLangSwitch.classList.toggle('open'); });
  document.querySelectorAll('[data-lang]').forEach(b => {
    b.addEventListener('click', () => { setLanguage(b.getAttribute('data-lang')); siteLangSwitch.classList.remove('open'); });
  });
  document.addEventListener('click', () => siteLangSwitch.classList.remove('open'));
}

setLanguage(currentLang);
