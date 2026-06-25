// Translation Dictionary
const translations = {
  en: {
    logo_title: "STEMQuest Rural",
    nav_home: "Home",
    nav_about: "About Us",
    nav_missions: "STEM Missions",
    nav_labs: "Virtual Labs",
    nav_competitions: "Competitions",
    nav_dashboard: "Dashboard",
    nav_about_us: "Our Story",
    nav_innovation_hub: "Rural Innovation Hub",
    nav_signin: "Sign In",
    tagline: "Learn, Play, Explore, Invent.",
    footer_text: "Making Science, Technology, Engineering, and Mathematics an exciting adventure for every student in rural India.",
    footer_rights: "© 2026 STEMQuest Rural. All rights reserved.",
    footer_quick_links: "Quick Links",
    footer_support: "Support",
    footer_contact: "Contact Us",
    btn_start_learning: "Start Learning",
    btn_explore_missions: "Explore Missions",
    stats_students: "Students Enrolled",
    stats_challenges: "STEM Challenges",
    stats_experiments: "Virtual Experiments",
    stats_schools: "Schools Connected",
    stats_paths: "Career Paths Explored"
  },
  hi: {
    logo_title: "स्टेमक्वेस्ट रूरल",
    nav_home: "मुख्यपृष्ठ",
    nav_about: "हमारे बारे में",
    nav_missions: "स्टेम मिशन्स",
    nav_labs: "वर्चुअल लैब्स",
    nav_competitions: "प्रतियोगिताएं",
    nav_dashboard: "डैशबोर्ड",
    nav_about_us: "हमारी कहानी",
    nav_innovation_hub: "ग्रामीण नवाचार केंद्र",
    nav_signin: "लॉग इन",
    tagline: "सीखें, खेलें, खोजें, आविष्कार करें।",
    footer_text: "ग्रामीण भारत के प्रत्येक छात्र के लिए विज्ञान, प्रौद्योगिकी, इंजीनियरिंग और गणित को एक रोमांचक साहसिक कार्य बनाना।",
    footer_rights: "© 2026 स्टेमक्वेस्ट रूरल। सर्वाधिकार सुरक्षित।",
    footer_quick_links: "त्वरित लिंक्स",
    footer_support: "सहायता",
    footer_contact: "संपर्क करें",
    btn_start_learning: "पढ़ना शुरू करें",
    btn_explore_missions: "मिशन्स देखें",
    stats_students: "नामांकित छात्र",
    stats_challenges: "स्टेम चुनौतियां",
    stats_experiments: "वर्चुअल प्रयोग",
    stats_schools: "जुड़े हुए स्कूल",
    stats_paths: "करियर पथ खोजे गए"
  },
  mr: {
    logo_title: "स्टेमक्वेस्ट रूरल",
    nav_home: "मुख्यपृष्ठ",
    nav_about: "आमच्याबद्दल",
    nav_missions: "स्टेम मिशन्स",
    nav_labs: "व्हर्च्युअल लॅब्स",
    nav_competitions: "स्पर्धा",
    nav_dashboard: "डॅशबोर्ड",
    nav_about_us: "आमची गोष्ट",
    nav_innovation_hub: "ग्रामीण इनोव्हेशन हब",
    nav_signin: "लॉग इन",
    tagline: "शिका, खेळा, शोधा, शोध लावा.",
    footer_text: "ग्रामीण भारतातील प्रत्येक विद्यार्थ्यासाठी विज्ञान, तंत्रज्ञान, अभियांत्रिकी आणि गणित हा एक रोमांचक प्रवास बनवणे.",
    footer_rights: "© 2026 स्टेमक्वेस्ट रूरल. सर्व हक्क राखीव.",
    footer_quick_links: "जलद दुवे",
    footer_support: "मदत",
    footer_contact: "संपर्क साधा",
    btn_start_learning: "शिकण्यास प्रारंभ करा",
    btn_explore_missions: "मिशन एक्सप्लोर करा",
    stats_students: "नोंदणीकृत विद्यार्थी",
    stats_challenges: "स्टेम आव्हाने",
    stats_experiments: "व्हर्च्युअल प्रयोग",
    stats_schools: "जोडलेल्या शाळा",
    stats_paths: "करिअर मार्ग शोधले"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Header
  injectHeader();

  // 2. Inject Footer
  injectFooter();

  // 3. Theme Toggle Setup
  initTheme();

  // 4. Mobile Menu Toggler
  initMobileMenu();

  // 5. Language Switcher Setup
  initLanguage();

  // 6. Statistics Counter Animation (if elements exist on current page)
  animateCounters();

  // 7. Active Nav Highlighting
  highlightActiveNav();
});

// Injects the premium header HTML dynamically
function injectHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  header.innerHTML = `
    <div class="container">
      <nav class="navbar">
        <a href="index.html" class="logo">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4f46e5" />
                <stop offset="100%" stop-color="#06b6d4" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" stroke="url(#logo-grad)" stroke-width="8" stroke-dasharray="180 60"/>
            <polygon points="50,25 70,60 30,60" fill="url(#logo-grad)"/>
            <circle cx="50" cy="50" r="10" fill="#ffffff" class="dark-theme-white-dot"/>
          </svg>
          <span data-lang-key="logo_title">STEMQuest Rural</span>
        </a>

        <div class="nav-links" id="nav-links">
          <a href="index.html" class="nav-item ${currentPath === 'index.html' ? 'active' : ''}" data-lang-key="nav_home">Home</a>
          <div class="dropdown">
            <a href="about.html" class="nav-item ${currentPath === 'about.html' ? 'active' : ''}" data-lang-key="nav_about">About Us</a>
            <div class="dropdown-menu">
              <a href="about.html#story" class="dropdown-item" data-lang-key="nav_about_us">Our Story</a>
              <a href="about.html#innovation-hub" class="dropdown-item" data-lang-key="nav_innovation_hub">Rural Innovation Hub</a>
            </div>
          </div>
          <a href="missions.html" class="nav-item ${currentPath === 'missions.html' ? 'active' : ''}" data-lang-key="nav_missions">STEM Missions</a>
          <a href="labs.html" class="nav-item ${currentPath === 'labs.html' ? 'active' : ''}" data-lang-key="nav_labs">Virtual Labs</a>
          <a href="competitions.html" class="nav-item ${currentPath === 'competitions.html' ? 'active' : ''}" data-lang-key="nav_competitions">Competitions</a>
          <a href="dashboard.html" class="nav-item ${currentPath === 'dashboard.html' ? 'active' : ''}" data-lang-key="nav_dashboard">Dashboard</a>
        </div>

        <div class="nav-actions">
          <select class="lang-selector" id="lang-selector">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>

          <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle Theme">
            <svg class="sun-icon" style="display:none;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>

          <a href="dashboard.html" class="btn btn-primary btn-sm" data-lang-key="nav_signin">Sign In</a>

          <button class="hamburger" id="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </div>
  `;

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Injects the shared footer dynamically
function injectFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <a href="index.html" class="logo" style="margin-bottom:15px;">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:28px;height:28px;">
              <circle cx="50" cy="50" r="40" stroke="url(#logo-grad)" stroke-width="8" stroke-dasharray="180 60"/>
              <polygon points="50,25 70,60 30,60" fill="url(#logo-grad)"/>
            </svg>
            <span data-lang-key="logo_title">STEMQuest Rural</span>
          </a>
          <p data-lang-key="footer_text">Making Science, Technology, Engineering, and Mathematics an exciting adventure for every student in rural India.</p>
          <div class="social-links">
            <a href="#" class="social-icon" aria-label="Facebook">F</a>
            <a href="#" class="social-icon" aria-label="Twitter">T</a>
            <a href="#" class="social-icon" aria-label="YouTube">Y</a>
          </div>
        </div>

        <div>
          <h4 class="footer-title" data-lang-key="footer_quick_links">Quick Links</h4>
          <div class="footer-links">
            <a href="index.html" class="footer-link">Home</a>
            <a href="about.html" class="footer-link">About Us</a>
            <a href="missions.html" class="footer-link">STEM Missions</a>
            <a href="labs.html" class="footer-link">Virtual Labs</a>
          </div>
        </div>

        <div>
          <h4 class="footer-title" data-lang-key="footer_support">Support</h4>
          <div class="footer-links">
            <a href="#" class="footer-link">Offline Guide</a>
            <a href="#" class="footer-link">Teacher Toolkit</a>
            <a href="#" class="footer-link">Parents Resources</a>
            <a href="#" class="footer-link">FAQ</a>
          </div>
        </div>

        <div>
          <h4 class="footer-title" data-lang-key="footer_contact">Contact Us</h4>
          <div class="footer-links" style="color: var(--text-secondary);">
            <p>Email: support@stemquest.org</p>
            <p>Helpline: +91 1800-STEM-RURAL</p>
            <p>Rural Outreach Center, Pune, India</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p data-lang-key="footer_rights">© 2026 STEMQuest Rural. All rights reserved.</p>
        <p>Built with ❤️ for Rural Empowerment</p>
      </div>
    </div>
  `;
}

// Initialise Theme Toggler
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const sunIcon = themeToggle.querySelector(".sun-icon");
  const moonIcon = themeToggle.querySelector(".moon-icon");

  const setDarkTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add("dark-theme");
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
      localStorage.setItem("theme", "light");
    }
  };

  // Check saved choice or system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setDarkTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    setDarkTheme(!isDark);
  });
}

// Mobile Hamburger Menu Actions
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger-menu");
  const navLinks = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking navigation items
  document.querySelectorAll(".nav-item:not(.dropdown > a)").forEach(item => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Regional Language Translation Actions
function initLanguage() {
  const langSelector = document.getElementById("lang-selector");
  if (!langSelector) return;

  const currentLang = localStorage.getItem("language") || "en";
  langSelector.value = currentLang;
  translatePage(currentLang);

  langSelector.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("language", lang);
    translatePage(lang);
    // Raise event for specific script modules (like quizzes) to update
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { language: lang } }));
  });
}

// Translates nodes containing data-lang-key
function translatePage(lang) {
  const elements = document.querySelectorAll("[data-lang-key]");
  elements.forEach(el => {
    const key = el.getAttribute("data-lang-key");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

// Highlights current navigation link
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item").forEach(item => {
    const href = item.getAttribute("href");
    if (href === currentPath) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Animates statistics numbers with increments
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  if (counters.length === 0) return;

  const options = {
    threshold: 0.5,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const speed = 100; // duration factor
        const countTo = parseInt(target.getAttribute("data-count"));

        let count = 0;
        const updateCount = () => {
          const increment = countTo / speed;
          if (count < countTo) {
            count += increment;
            target.textContent = Math.floor(count).toLocaleString() + (target.getAttribute("data-suffix") || "");
            setTimeout(updateCount, 15);
          } else {
            target.textContent = countTo.toLocaleString() + (target.getAttribute("data-suffix") || "");
          }
        };

        updateCount();
        observer.unobserve(target);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));
}
