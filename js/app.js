/**
 * Main Application Script
 * Handles routing, theme management, and animations
 */

class AppRouter {
  constructor() {
    this.currentPage = 'home';
    this.pages = ['home', 'blog', 'travel'];
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRouteChange());
    this.handleRouteChange();
  }

  navigate(path) {
    // Remove leading # and /
    const cleanPath = path.replace(/^#?\/?/, '');
    
    if (cleanPath.startsWith('http')) {
      window.open(cleanPath, '_blank', 'noopener,noreferrer');
      return;
    }

    if (cleanPath === '' || cleanPath === 'home' || cleanPath.startsWith('#home')) {
      window.location.hash = '#home';
    } else if (this.pages.includes(cleanPath)) {
      window.location.href = `./${cleanPath}.html`;
    } else if (cleanPath.startsWith('#')) {
      window.location.hash = cleanPath;
    } else {
      window.location.hash = `#${cleanPath}`;
    }
  }

  handleRouteChange() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const section = document.querySelector(`#${hash}`);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }
  }
}

/**
 * Application Initialize
 */
class App {
  static init() {
    // Create global router instance
    window.router = new AppRouter();

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: CONSTANTS.AOS.DURATION,
        once: CONSTANTS.AOS.ONCE,
        offset: CONSTANTS.AOS.OFFSET
      });
    }

    // Restore theme preference
    this.restoreTheme();

    // Listen for theme changes
    window.addEventListener('themeChange', (e) => {
      document.documentElement.setAttribute('data-theme', e.detail.theme);
    });

    // Handle external link security
    this.setupExternalLinkSecurity();

    // Log initialization
    console.log('App initialized successfully');
  }

  static restoreTheme() {
    const savedTheme = localStorage.getItem(CONSTANTS.STORAGE.THEME) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  static setupExternalLinkSecurity() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (link && link.getAttribute('href').startsWith('http') && !link.target) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { App, AppRouter };
}
