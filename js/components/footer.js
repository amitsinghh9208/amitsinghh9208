/**
 * Footer Component
 * Displays footer with social links and copyright
 */

class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const currentYear = new Date().getFullYear();
    const template = `
      <style>
        :host {
          --primary-color: #667eea;
          --secondary-color: #764ba2;
        }

        footer {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .social-links a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .social-links a:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }

        .copyright {
          font-size: 0.9rem;
          opacity: 0.9;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 768px) {
          footer {
            padding: 2rem 1rem;
          }

          .social-links {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }
      </style>

      <footer>
        <div class="footer-content">
          <div class="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">Twitter</a>
            <a href="mailto:contact@example.com" aria-label="Email">Email</a>
          </div>
          <div class="copyright">
            <p>&copy; ${currentYear} Amit Singh. All rights reserved.</p>
            <p>Built with ❤️ using modern web technologies</p>
          </div>
        </div>
      </footer>
    `;

    this.shadowRoot.innerHTML = template;
  }
}

customElements.define('footer-component', FooterComponent);