/**
 * Hero Section Component
 * Displays the hero/home section with typing animation
 */

class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupAnimations();
  }

  render() {
    const template = `
      <style>
        :host {
          --primary-color: #667eea;
          --secondary-color: #764ba2;
        }

        section {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
        }

        .tag {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: clamp(2rem, 8vw, 4rem);
          margin: 1rem 0;
          font-weight: 700;
        }

        .typing-text {
          font-size: clamp(1.5rem, 6vw, 2.5rem);
          min-height: 3.5rem;
          margin: 2rem 0;
          font-weight: 700;
        }

        .subtitle {
          font-size: 1.25rem;
          opacity: 0.95;
          margin-bottom: 3rem;
        }

        .buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 3rem;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary {
          background: white;
          color: var(--primary-color);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          section {
            min-height: auto;
            padding: 3rem 1rem;
          }

          .buttons {
            flex-direction: column;
            gap: 1rem;
          }

          .btn {
            width: 100%;
          }
        }
      </style>

      <section id="home" data-aos="fade-up">
        <div class="hero-content">
          <p class="tag">WELCOME TO MY TECH SPACE!</p>
          <h1>Hi, I'm Amit Singh</h1>
          <div class="typing-text">
            <span id="typing"></span>
          </div>
          <p class="subtitle">QA Lead | Fintech | Cloud & Data Governance Specialist</p>
          <div class="buttons">
            <a href="#contact" class="btn btn-primary">Get In Touch</a>
            <a href="#projects" class="btn btn-secondary">My Work</a>
            <a href="${CONSTANTS.URLs.RESUME}" class="btn btn-primary" download>Download CV</a>
          </div>
        </div>
      </section>
    `;

    this.shadowRoot.innerHTML = template;
  }

  setupAnimations() {
    // Initialize typing animation
    if (typeof Typed !== 'undefined') {
      const typingElement = this.shadowRoot.querySelector('#typing');
      new Typed(typingElement, {
        strings: CONSTANTS.TYPING.STRINGS,
        typeSpeed: CONSTANTS.TYPING.TYPE_SPEED,
        backSpeed: CONSTANTS.TYPING.BACK_SPEED,
        loop: CONSTANTS.TYPING.LOOP
      });
    }

    // Setup scroll animations
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
}

customElements.define('hero-section', HeroSection);