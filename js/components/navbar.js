/**
 * Navigation Component
 * Renders the header and navigation menu
 */

class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const template = `
      <style>
        :host {
          --primary-color: #667eea;
          --secondary-color: #764ba2;
          --text-light: #333;
          --text-dark: #f0f0f0;
          --bg-light: #fff;
          --bg-dark: #1a1a1a;
        }

        header {
          background: var(--bg-light);
          color: var(--text-light);
          padding: 1rem 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        header.dark-mode {
          background: var(--bg-dark);
          color: var(--text-dark);
        }

        nav {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        ul {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        a {
          color: inherit;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        a:hover {
          color: var(--primary-color);
        }

        .theme-toggle {
          padding: 0.5rem 1rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: var(--secondary-color);
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
          }

          ul {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
        }
      </style>

      <header>
        <nav>
          <div class="logo">
            <img src="images/profile.jpg" alt="Amit Singh Profile" loading="lazy">
          </div>
          <ul>
            <li><a href="#home" data-link>Home</a></li>
            <li><a href="#about" data-link>About</a></li>
            <li><a href="#skills" data-link>Skills</a></li>
            <li><a href="#projects" data-link>Projects</a></li>
            <li><a href="blog" data-link>Blog</a></li>
            <li><a href="travel" data-link>Travel</a></li>
            <li><a href="#contact" data-link>Contact</a></li>
          </ul>
          <button class="theme-toggle" aria-label="Toggle dark/light mode">Toggle Mode</button>
        </nav>
      </header>
    `;

    this.shadowRoot.innerHTML = template;
  }

  setupEventListeners() {
    const themeToggle = this.shadowRoot.querySelector('.theme-toggle');
    const header = this.shadowRoot.querySelector('header');
    
    themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Restore theme preference
    const savedTheme = localStorage.getItem(CONSTANTS.STORAGE.THEME) || 'light';
    if (savedTheme === 'dark') {
      this.applyTheme('dark', header);
    }

    // Handle internal links
    this.shadowRoot.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href.startsWith('http')) {
          e.preventDefault();
          window.router?.navigate(href);
        }
      });
    });
  }

  toggleTheme() {
    const header = this.shadowRoot.querySelector('header');
    const isDarkMode = header.classList.contains(CONSTANTS.CLASSES.THEME_DARK);
    const newTheme = isDarkMode ? 'light' : 'dark';
    
    this.applyTheme(newTheme, header);
    localStorage.setItem(CONSTANTS.STORAGE.THEME, newTheme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
  }

  applyTheme(theme, element) {
    if (theme === 'dark') {
      element.classList.add(CONSTANTS.CLASSES.THEME_DARK);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      element.classList.remove(CONSTANTS.CLASSES.THEME_DARK);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}

customElements.define('nav-component', NavbarComponent);
