/* ═══════════════════════════════════════════════════════════════════════════
   APEX ARENA — Preferences Manager
   Handles: Dark/Light Theme + Language (EN / UR / FR)
   Storage:  localStorage  key → 'apexArenaPrefs'
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. DEFAULTS & STORAGE ───────────────────────────────────────────── */
  const STORAGE_KEY = 'apexArenaPrefs';

  const defaults = { theme: 'dark', lang: 'en' };

  function loadPrefs() {
    try { return Object.assign({}, defaults, JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch (e) { return Object.assign({}, defaults); }
  }

  function savePrefs(p) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }

  /* ── 2. TRANSLATIONS ─────────────────────────────────────────────────── */
  const i18n = {
    en: {
      /* nav */
      'nav.home'     : 'Home',
      'nav.schedule' : 'Schedule',
      'nav.players'  : 'Players',
      'nav.contact'  : 'Contact',
      'nav.register' : 'Register',
      'nav.login'    : 'Login',
      'nav.signup'   : 'Sign Up',
      /* hero — index */
      'hero.eyebrow' : 'World Championship 2026',
      'hero.subtitle': 'The Ultimate Tournament — Where Legends Are Forged',
      'hero.cta1'    : 'View Schedule',
      'hero.cta2'    : 'Meet the Players',
      'stat.players' : 'Players',
      'stat.matches' : 'Matches',
      'stat.prize'   : 'Prize Pool',
      'scroll.label' : 'Scroll to Explore',
      /* about */
      'about.tag'    : 'About the Tournament',
      'about.title'  : 'THE GREATEST<br>STAGE ON EARTH',
      'about.p1'     : 'APEX ARENA is the world\'s most prestigious annual championship, bringing together the finest competitors from every corner of the globe to compete for the ultimate title. Since its founding in 1998, the tournament has grown from a regional contest into a worldwide spectacle watched by millions.',
      'about.p2'     : 'Each edition pushes the boundaries of athletic excellence, featuring 128 elite athletes battling through a grueling bracket over 10 days of intense competition. The champion walks away with more than a trophy — they earn a place in history.',
      'about.cta'    : 'See Full Schedule',
      /* info card */
      'info.name.lbl'   : 'Tournament Name',
      'info.name.val'   : 'APEX ARENA World Championship',
      'info.dates.lbl'  : 'Dates',
      'info.dates.val'  : 'March 14 – March 24, 2025',
      'info.venue.lbl'  : 'Venue',
      'info.venue.val'  : 'Grand Coliseum, New York City',
      'info.nations.lbl': 'Nations Represented',
      'info.nations.val': '48 Countries',
      'info.prize.lbl'  : 'Total Prize Pool',
      'info.prize.val'  : '$1,000,000 USD',
      /* footer */
      'footer.copy'  : '© 2026 APEX ARENA World Championship. All rights reserved.',
      /* schedule page */
      'sch.tag'      : 'Tournament Schedule',
      'sch.title'    : 'MATCH<br>SCHEDULE',
      'sch.round1'   : 'Round of 128',
      'sch.round2'   : 'Round of 64',
      'sch.quarter'  : 'Quarterfinals',
      'sch.semi'     : 'Semifinals',
      'sch.final'    : 'Grand Final',
      /* players page */
      'pl.tag'       : 'Tournament Roster',
      'pl.title'     : 'ELITE<br>PLAYERS',
      'pl.search'    : 'Search players…',
      /* contact page */
      'ct.tag'       : 'Get In Touch',
      'ct.title'     : 'CONTACT<br>US',
      'ct.name'      : 'Full Name',
      'ct.email'     : 'Email Address',
      'ct.subject'   : 'Subject',
      'ct.message'   : 'Message',
      'ct.send'      : 'Send Message',
      /* login page */
      'lg.title'     : 'Welcome Back',
      'lg.sub'       : 'Sign in to your APEX ARENA account',
      'lg.email'     : 'Email Address',
      'lg.pass'      : 'Password',
      'lg.btn'       : 'Login',
      'lg.forgot'    : 'Forgot Password?',
      'lg.no_acct'   : "Don't have an account?",
      'lg.signup'    : 'Sign Up',
      /* signup page */
      'su.title'     : 'Create Account',
      'su.sub'       : 'Join the APEX ARENA community',
      'su.fname'     : 'First Name',
      'su.lname'     : 'Last Name',
      'su.email'     : 'Email Address',
      'su.pass'      : 'Password',
      'su.confirm'   : 'Confirm Password',
      'su.btn'       : 'Create Account',
      'su.have_acct' : 'Already have an account?',
      'su.login'     : 'Login',
      /* tournament / register page */
      'tr.tag'       : 'Join the Tournament',
      'tr.title'     : 'REGISTER<br>NOW',
      'tr.btn'       : 'Submit Registration',
      /* prefs panel */
      'pref.title'   : 'Preferences',
      'pref.theme'   : 'Theme',
      'pref.dark'    : 'Dark',
      'pref.light'   : 'Light',
      'pref.lang'    : 'Language',
      'pref.saved'   : 'Preferences saved!',
      'pref.btn'     : '⚙ Preferences',
    },

    ur: {
      /* nav */
      'nav.home'     : 'ہوم',
      'nav.schedule' : 'شیڈول',
      'nav.players'  : 'کھلاڑی',
      'nav.contact'  : 'رابطہ',
      'nav.register' : 'رجسٹر',
      'nav.login'    : 'لاگ ان',
      'nav.signup'   : 'سائن اپ',
      /* hero */
      'hero.eyebrow' : 'عالمی چیمپئن شپ 2026',
      'hero.subtitle': 'حتمی ٹورنامنٹ — جہاں افسانے بنتے ہیں',
      'hero.cta1'    : 'شیڈول دیکھیں',
      'hero.cta2'    : 'کھلاڑیوں سے ملیں',
      'stat.players' : 'کھلاڑی',
      'stat.matches' : 'میچز',
      'stat.prize'   : 'انعامی رقم',
      'scroll.label' : 'مزید دیکھنے کیلئے اسکرول کریں',
      /* about */
      'about.tag'    : 'ٹورنامنٹ کے بارے میں',
      'about.title'  : 'زمین پر<br>سب سے بڑا اسٹیج',
      'about.p1'     : 'ایپکس ارینا دنیا کا سب سے معزز سالانہ چیمپئن شپ ہے، جو دنیا کے ہر کونے سے بہترین مدمقابلوں کو اکٹھا کرتا ہے۔ 1998 میں اپنے قیام کے بعد سے، یہ ٹورنامنٹ ایک علاقائی مقابلے سے لاکھوں لوگوں کے دیکھے جانے والے عالمی تماشے میں تبدیل ہو گیا ہے۔',
      'about.p2'     : 'ہر ایڈیشن ایتھلیٹک کمال کی حدود کو آگے بڑھاتا ہے، جس میں 128 اشرافیہ ایتھلیٹ شدید مقابلے کے 10 دنوں میں مشکل براکٹ کے ذریعے لڑتے ہیں۔ چیمپئن ایک ٹرافی سے زیادہ لے کر جاتا ہے — وہ تاریخ میں جگہ حاصل کرتا ہے۔',
      'about.cta'    : 'مکمل شیڈول دیکھیں',
      /* info card */
      'info.name.lbl'   : 'ٹورنامنٹ کا نام',
      'info.name.val'   : 'ایپکس ارینا ورلڈ چیمپئن شپ',
      'info.dates.lbl'  : 'تاریخیں',
      'info.dates.val'  : '14 مارچ – 24 مارچ 2025',
      'info.venue.lbl'  : 'مقام',
      'info.venue.val'  : 'گرینڈ کولیزیم، نیویارک سٹی',
      'info.nations.lbl': 'نمائندہ ممالک',
      'info.nations.val': '48 ممالک',
      'info.prize.lbl'  : 'کل انعامی رقم',
      'info.prize.val'  : '$1,000,000 USD',
      /* footer */
      'footer.copy'  : '© 2026 ایپکس ارینا ورلڈ چیمپئن شپ۔ تمام حقوق محفوظ ہیں۔',
      /* schedule */
      'sch.tag'      : 'ٹورنامنٹ شیڈول',
      'sch.title'    : 'میچ<br>شیڈول',
      'sch.round1'   : 'پہلا دور',
      'sch.round2'   : 'دوسرا دور',
      'sch.quarter'  : 'کوارٹر فائنل',
      'sch.semi'     : 'سیمی فائنل',
      'sch.final'    : 'گرینڈ فائنل',
      /* players */
      'pl.tag'       : 'ٹورنامنٹ رجسٹر',
      'pl.title'     : 'اشرافیہ<br>کھلاڑی',
      'pl.search'    : 'کھلاڑی تلاش کریں…',
      /* contact */
      'ct.tag'       : 'رابطہ کریں',
      'ct.title'     : 'ہم سے<br>رابطہ کریں',
      'ct.name'      : 'پورا نام',
      'ct.email'     : 'ای میل پتہ',
      'ct.subject'   : 'موضوع',
      'ct.message'   : 'پیغام',
      'ct.send'      : 'پیغام بھیجیں',
      /* login */
      'lg.title'     : 'خوش آمدید',
      'lg.sub'       : 'اپنے ایپکس ارینا اکاؤنٹ میں لاگ ان کریں',
      'lg.email'     : 'ای میل پتہ',
      'lg.pass'      : 'پاس ورڈ',
      'lg.btn'       : 'لاگ ان',
      'lg.forgot'    : 'پاس ورڈ بھول گئے؟',
      'lg.no_acct'   : 'اکاؤنٹ نہیں ہے؟',
      'lg.signup'    : 'سائن اپ',
      /* signup */
      'su.title'     : 'اکاؤنٹ بنائیں',
      'su.sub'       : 'ایپکس ارینا کمیونٹی میں شامل ہوں',
      'su.fname'     : 'پہلا نام',
      'su.lname'     : 'آخری نام',
      'su.email'     : 'ای میل پتہ',
      'su.pass'      : 'پاس ورڈ',
      'su.confirm'   : 'پاس ورڈ کی تصدیق',
      'su.btn'       : 'اکاؤنٹ بنائیں',
      'su.have_acct' : 'پہلے سے اکاؤنٹ ہے؟',
      'su.login'     : 'لاگ ان',
      /* tournament */
      'tr.tag'       : 'ٹورنامنٹ میں شامل ہوں',
      'tr.title'     : 'ابھی<br>رجسٹر کریں',
      'tr.btn'       : 'رجسٹریشن جمع کریں',
      /* prefs panel */
      'pref.title'   : 'ترجیحات',
      'pref.theme'   : 'تھیم',
      'pref.dark'    : 'تاریک',
      'pref.light'   : 'روشن',
      'pref.lang'    : 'زبان',
      'pref.saved'   : 'ترجیحات محفوظ!',
      'pref.btn'     : '⚙ ترجیحات',
    },

    fr: {
      /* nav */
      'nav.home'     : 'Accueil',
      'nav.schedule' : 'Programme',
      'nav.players'  : 'Joueurs',
      'nav.contact'  : 'Contact',
      'nav.register' : "S'inscrire",
      'nav.login'    : 'Connexion',
      'nav.signup'   : 'Créer un compte',
      /* hero */
      'hero.eyebrow' : 'Championnat du Monde 2026',
      'hero.subtitle': 'Le Tournoi Ultime — Là où les Légendes sont Forgées',
      'hero.cta1'    : 'Voir le Programme',
      'hero.cta2'    : 'Rencontrer les Joueurs',
      'stat.players' : 'Joueurs',
      'stat.matches' : 'Matchs',
      'stat.prize'   : 'Prix Total',
      'scroll.label' : 'Défiler pour Explorer',
      /* about */
      'about.tag'    : 'À propos du Tournoi',
      'about.title'  : 'LA PLUS GRANDE<br>SCÈNE DU MONDE',
      'about.p1'     : "APEX ARENA est le championnat annuel le plus prestigieux au monde, réunissant les meilleurs compétiteurs des quatre coins du globe pour s'affronter pour le titre ultime. Depuis sa fondation en 1998, le tournoi est passé d'une compétition régionale à un spectacle mondial suivi par des millions de personnes.",
      'about.p2'     : "Chaque édition repousse les limites de l'excellence sportive, avec 128 athlètes d'élite se battant dans un tableau épuisant sur 10 jours de compétition intense. Le champion repart avec bien plus qu'un trophée — il gagne une place dans l'histoire.",
      'about.cta'    : 'Voir le Programme Complet',
      /* info card */
      'info.name.lbl'   : 'Nom du Tournoi',
      'info.name.val'   : 'Championnat du Monde APEX ARENA',
      'info.dates.lbl'  : 'Dates',
      'info.dates.val'  : '14 mars – 24 mars 2025',
      'info.venue.lbl'  : 'Lieu',
      'info.venue.val'  : 'Grand Colisée, New York',
      'info.nations.lbl': 'Nations Représentées',
      'info.nations.val': '48 Pays',
      'info.prize.lbl'  : 'Prix Total',
      'info.prize.val'  : '$1,000,000 USD',
      /* footer */
      'footer.copy'  : '© 2026 Championnat du Monde APEX ARENA. Tous droits réservés.',
      /* schedule */
      'sch.tag'      : 'Programme du Tournoi',
      'sch.title'    : 'PROGRAMME<br>DES MATCHS',
      'sch.round1'   : 'Tour de 128',
      'sch.round2'   : 'Tour de 64',
      'sch.quarter'  : 'Quarts de finale',
      'sch.semi'     : 'Demi-finales',
      'sch.final'    : 'Grande Finale',
      /* players */
      'pl.tag'       : 'Liste des Joueurs',
      'pl.title'     : 'JOUEURS<br>ÉLITES',
      'pl.search'    : 'Rechercher un joueur…',
      /* contact */
      'ct.tag'       : 'Nous Contacter',
      'ct.title'     : 'CONTACTEZ-<br>NOUS',
      'ct.name'      : 'Nom Complet',
      'ct.email'     : 'Adresse E-mail',
      'ct.subject'   : 'Sujet',
      'ct.message'   : 'Message',
      'ct.send'      : 'Envoyer le Message',
      /* login */
      'lg.title'     : 'Bon Retour',
      'lg.sub'       : 'Connectez-vous à votre compte APEX ARENA',
      'lg.email'     : 'Adresse E-mail',
      'lg.pass'      : 'Mot de passe',
      'lg.btn'       : 'Se Connecter',
      'lg.forgot'    : 'Mot de passe oublié ?',
      'lg.no_acct'   : 'Pas de compte ?',
      'lg.signup'    : 'Créer un compte',
      /* signup */
      'su.title'     : 'Créer un Compte',
      'su.sub'       : 'Rejoignez la communauté APEX ARENA',
      'su.fname'     : 'Prénom',
      'su.lname'     : 'Nom de famille',
      'su.email'     : 'Adresse E-mail',
      'su.pass'      : 'Mot de passe',
      'su.confirm'   : 'Confirmer le mot de passe',
      'su.btn'       : 'Créer le compte',
      'su.have_acct' : 'Déjà un compte ?',
      'su.login'     : 'Se connecter',
      /* tournament */
      'tr.tag'       : 'Rejoindre le Tournoi',
      'tr.title'     : 'INSCRIVEZ-<br>VOUS',
      'tr.btn'       : 'Soumettre l\'inscription',
      /* prefs panel */
      'pref.title'   : 'Préférences',
      'pref.theme'   : 'Thème',
      'pref.dark'    : 'Sombre',
      'pref.light'   : 'Clair',
      'pref.lang'    : 'Langue',
      'pref.saved'   : 'Préférences enregistrées !',
      'pref.btn'     : '⚙ Préférences',
    }
  };

  function t(key, lang) {
    return (i18n[lang] && i18n[lang][key]) || (i18n['en'][key]) || key;
  }

  /* ── 3. APPLY THEME ──────────────────────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /* ── 4. APPLY LANGUAGE ───────────────────────────────────────────────── */
  const RTL_LANGS = ['ur', 'ar'];

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir  = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key, lang);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.innerHTML = val;
      }
    });

    /* update prefs button label */
    var pb = document.getElementById('prefs-btn');
    if (pb) pb.textContent = t('pref.btn', lang);
  }

  /* ── 5. INJECT PANEL HTML ────────────────────────────────────────────── */
  function buildPanel(prefs) {
    var panel = document.createElement('div');
    panel.id = 'prefs-panel';
    panel.innerHTML = `
      <div id="prefs-overlay"></div>
      <aside id="prefs-drawer">
        <div class="prefs-header">
          <span class="prefs-title-text" data-i18n="pref.title">${t('pref.title', prefs.lang)}</span>
          <button id="prefs-close" aria-label="Close">✕</button>
        </div>

        <section class="prefs-section">
          <p class="prefs-label" data-i18n="pref.theme">${t('pref.theme', prefs.lang)}</p>
          <div class="theme-cards">
            <button class="theme-card ${prefs.theme==='dark'?'active':''}" data-theme-pick="dark">
              <div class="theme-preview dark-preview">
                <div class="tp-bar"></div><div class="tp-block"></div><div class="tp-block"></div>
              </div>
              <span data-i18n="pref.dark">${t('pref.dark', prefs.lang)}</span>
            </button>
            <button class="theme-card ${prefs.theme==='light'?'active':''}" data-theme-pick="light">
              <div class="theme-preview light-preview">
                <div class="tp-bar"></div><div class="tp-block"></div><div class="tp-block"></div>
              </div>
              <span data-i18n="pref.light">${t('pref.light', prefs.lang)}</span>
            </button>
          </div>
        </section>

        <section class="prefs-section">
          <p class="prefs-label" data-i18n="pref.lang">${t('pref.lang', prefs.lang)}</p>
          <div class="lang-options">
            <button class="lang-btn ${prefs.lang==='en'?'active':''}" data-lang-pick="en">
              <span class="lang-flag">🇬🇧</span>English
            </button>
            <button class="lang-btn ${prefs.lang==='ur'?'active':''}" data-lang-pick="ur">
              <span class="lang-flag">🇵🇰</span>اردو
            </button>
            <button class="lang-btn ${prefs.lang==='fr'?'active':''}" data-lang-pick="fr">
              <span class="lang-flag">🇫🇷</span>Français
            </button>
          </div>
        </section>
      </aside>`;

    document.body.appendChild(panel);
  }

  /* ── 6. INJECT PANEL STYLES ──────────────────────────────────────────── */
  function injectStyles() {
    var css = `
      /* ── Smooth theme/lang transition ── */
      body, header, section, footer, input, textarea, select, .about-card, .card, table, th, td {
        transition: background 0.35s, color 0.35s, border-color 0.35s;
      }

      /* ── Light mode variables ── */
      [data-theme="light"] {
        --gold:      #1565C0;
        --gold-light:#1E90FF;
        --crimson:   #0D47A1;
        --dark:      #F0F4F8;
        --dark2:     #FFFFFF;
        --dark3:     #E2EAF4;
        --off-white: #0D1525;
        --muted:     #475569;
      }
      [data-theme="light"] body         { background:#F0F4F8; color:#0D1525; }
      [data-theme="light"] header       { background:rgba(240,244,248,0.97); border-bottom:1px solid rgba(21,101,192,0.2); }
      [data-theme="light"] nav a        { color:#1a2540; }
      [data-theme="light"] nav a:hover,
      [data-theme="light"] nav a.active { color:var(--gold); }
      [data-theme="light"] .hero-bg     { background: radial-gradient(ellipse at 70% 50%,rgba(21,101,192,0.15) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(100,160,240,0.1) 0%,transparent 50%),linear-gradient(135deg,rgba(220,232,248,0.75) 0%,rgba(238,243,251,0.7) 100%),url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=80&fit=crop') center/cover no-repeat; }
      [data-theme="light"] .hero-title  { color:#0D1525; }
      [data-theme="light"] .hero-number { color:rgba(21,101,192,0.05); }
      [data-theme="light"] .about-card  { background:#fff; border-color:rgba(21,101,192,0.15); }
      [data-theme="light"] .about-text p{ color:rgba(13,21,37,0.7); }
      [data-theme="light"] footer       { background:#1a2a4a; color:#F0EDE8; border-color:rgba(30,144,255,0.15); }
      [data-theme="light"] footer p,
      [data-theme="light"] footer nav a { color:#c8d8f0; }
      [data-theme="light"] input,
      [data-theme="light"] select,
      [data-theme="light"] textarea     { background:#E2EAF4; color:#0D1525; border-color:rgba(21,101,192,0.3); }
      [data-theme="light"] .btn-secondary { color:#0D1525; border-color:rgba(13,21,37,0.3); }

      /* Schedule Table Visibility Fixes for Light Mode */
      [data-theme="light"] table, 
      [data-theme="light"] th, 
      [data-theme="light"] td           { color: #0D1525; }
      [data-theme="light"] .text-muted  { color: #475569 !important; }
      [data-theme="light"] td:nth-child(1),
      [data-theme="light"] td:nth-child(3),
      [data-theme="light"] td:nth-child(4),
      [data-theme="light"] td:nth-child(5) { color: #475569; }

      /* ── Preferences button in nav ── */
      #prefs-btn {
        background: none;
        border: 1px solid rgba(255,255,255,0.3);
        color: inherit;
        padding: 6px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        transition: background 0.25s, color 0.25s, border-color 0.25s;
        white-space: nowrap;
      }
      #prefs-btn:hover { background:var(--gold); color:#fff; border-color:var(--gold); }
      [data-theme="light"] #prefs-btn  { border-color:rgba(21,101,192,0.4); color:#0D1525; }
      [data-theme="light"] #prefs-btn:hover { background:var(--gold); color:#fff; border-color:var(--gold); }

      /* ── Panel overlay ── */
      #prefs-overlay {
        display: none;
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.45);
        z-index: 998;
        backdrop-filter: blur(3px);
        animation: overlayIn 0.25s ease;
      }
      #prefs-panel.open #prefs-overlay { display: block; }

      /* ── Drawer ── */
      #prefs-drawer {
        position: fixed;
        top: 0; right: -340px;
        width: 320px;
        height: 100dvh;
        background: #0D1525;
        border-left: 1px solid rgba(30,144,255,0.2);
        z-index: 999;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
        overflow-y: auto;
      }
      [data-theme="light"] #prefs-drawer { background:#fff; border-left-color:rgba(21,101,192,0.2); }
      #prefs-panel.open #prefs-drawer    { right: 0; }

      /* RTL: drawer slides from left */
      [dir="rtl"] #prefs-drawer { right:auto; left:-340px; border-left:none; border-right:1px solid rgba(30,144,255,0.2); }
      [dir="rtl"] #prefs-panel.open #prefs-drawer { left:0; }

      .prefs-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(30,144,255,0.15);
        padding-bottom: 1rem;
      }
      [data-theme="light"] .prefs-header { border-bottom-color: rgba(21,101,192,0.15); }

      .prefs-title-text {
        font-family: 'Bebas Neue', cursive, sans-serif;
        font-size: 1.6rem;
        letter-spacing: 0.1em;
        color: var(--gold);
      }

      #prefs-close {
        background: none; border: none;
        color: var(--muted); cursor: pointer;
        font-size: 1.1rem; line-height: 1;
        transition: color 0.2s;
      }
      #prefs-close:hover { color: var(--gold); }

      .prefs-section { display: flex; flex-direction: column; gap: 0.9rem; }

      .prefs-label {
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: var(--muted);
      }

      /* Theme preview cards */
      .theme-cards { display: flex; gap: 1rem; }
      .theme-card {
        flex: 1;
        background: none;
        border: 2px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        transition: border-color 0.25s, transform 0.2s;
        color: var(--off-white);
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 0.85rem;
        letter-spacing: 0.08em;
      }
      [data-theme="light"] .theme-card { border-color:rgba(21,101,192,0.15); color:#0D1525; }
      .theme-card:hover    { transform: translateY(-2px); border-color: var(--gold); }
      .theme-card.active   { border-color: var(--gold); }

      .theme-preview {
        width: 100%; height: 56px;
        border-radius: 6px;
        padding: 8px;
        display: flex; flex-direction: column; gap: 5px;
      }
      .dark-preview  { background: #050810; }
      .light-preview { background: #F0F4F8; }

      .tp-bar {
        height: 8px; border-radius: 3px; width: 100%;
        background: rgba(30,144,255,0.5);
      }
      .dark-preview  .tp-block { height: 10px; border-radius: 3px; background: rgba(255,255,255,0.1); }
      .light-preview .tp-block { height: 10px; border-radius: 3px; background: rgba(0,0,0,0.12); }
      .light-preview .tp-bar   { background: rgba(21,101,192,0.6); }

      /* Language buttons */
      .lang-options { display: flex; flex-direction: column; gap: 0.6rem; }
      .lang-btn {
        display: flex; align-items: center; gap: 0.75rem;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        padding: 10px 14px;
        cursor: pointer;
        color: var(--off-white);
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 1rem;
        letter-spacing: 0.05em;
        transition: border-color 0.25s, background 0.25s;
        text-align: left;
      }
      [dir="rtl"] .lang-btn { text-align: right; }
      [data-theme="light"] .lang-btn { background:rgba(0,0,0,0.03); border-color:rgba(21,101,192,0.15); color:#0D1525; }
      .lang-btn:hover  { border-color: var(--gold); background: rgba(30,144,255,0.08); }
      .lang-btn.active { border-color: var(--gold); background: rgba(30,144,255,0.12); }

      .lang-flag { font-size: 1.4rem; line-height: 1; }

      /* ── Toast notification ── */
      #prefs-toast {
        position: fixed;
        bottom: 2rem; left: 50%;
        transform: translateX(-50%) translateY(80px);
        background: var(--gold);
        color: #fff;
        font-family: 'Barlow Condensed', sans-serif;
        font-size: 0.9rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 0.7rem 2rem;
        border-radius: 30px;
        z-index: 1000;
        opacity: 0;
        transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s;
        pointer-events: none;
      }
      #prefs-toast.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }

      @keyframes overlayIn { from { opacity:0; } to { opacity:1; } }
    `;
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ── 7. TOAST ────────────────────────────────────────────────────────── */
  function showToast(msg) {
    var toast = document.getElementById('prefs-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'prefs-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ── 8. INIT ─────────────────────────────────────────────────────────── */
  var prefs = loadPrefs();

  // Apply theme immediately (before DOMContentLoaded) to prevent flash
  applyTheme(prefs.theme);

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    buildPanel(prefs);

    /* Inject the prefs button into the nav */
    var nav = document.querySelector('header nav');
    if (nav) {
      var btn = document.createElement('button');
      btn.id = 'prefs-btn';
      btn.textContent = t('pref.btn', prefs.lang);
      btn.setAttribute('aria-label', 'Open preferences');
      nav.appendChild(btn);

      btn.addEventListener('click', function () {
        document.getElementById('prefs-panel').classList.toggle('open');
      });
    }

    /* Close on overlay click */
    document.getElementById('prefs-overlay').addEventListener('click', closePanel);
    document.getElementById('prefs-close').addEventListener('click', closePanel);

    function closePanel() {
      document.getElementById('prefs-panel').classList.remove('open');
    }

    /* Theme cards */
    document.querySelectorAll('[data-theme-pick]').forEach(function (card) {
      card.addEventListener('click', function () {
        prefs.theme = this.getAttribute('data-theme-pick');
        applyTheme(prefs.theme);
        savePrefs(prefs);
        document.querySelectorAll('[data-theme-pick]').forEach(function (c) {
          c.classList.toggle('active', c.getAttribute('data-theme-pick') === prefs.theme);
        });
        showToast(t('pref.saved', prefs.lang));
      });
    });

    /* Language buttons */
    document.querySelectorAll('[data-lang-pick]').forEach(function (lb) {
      lb.addEventListener('click', function () {
        prefs.lang = this.getAttribute('data-lang-pick');
        applyLang(prefs.lang);
        savePrefs(prefs);
        document.querySelectorAll('[data-lang-pick]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-lang-pick') === prefs.lang);
        });
        /* update prefs panel labels */
        document.querySelectorAll('#prefs-drawer [data-i18n]').forEach(function (el) {
          el.innerHTML = t(el.getAttribute('data-i18n'), prefs.lang);
        });
        document.getElementById('prefs-btn').textContent = t('pref.btn', prefs.lang);
        showToast(t('pref.saved', prefs.lang));
      });
    });

    /* Apply language on load */
    applyLang(prefs.lang);
  });

})();