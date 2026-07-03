/**
 * About Section Component
 * Displays information about Amit Singh
 */

class AboutSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const template = `
      <style>
        :host {
          --primary-color: #667eea;
        }

        section {
          padding: 6rem 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: var(--primary-color);
          text-align: center;
        }

        .about-content {
          line-height: 1.8;
          font-size: 1.05rem;
          color: #555;
        }

        .about-content p {
          margin-bottom: 1.5rem;
        }

        .highlight {
          color: var(--primary-color);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          section {
            padding: 3rem 1rem;
          }

          h2 {
            font-size: 2rem;
          }

          .about-content {
            font-size: 1rem;
          }
        }
      </style>

      <section id="about" class="section-card" data-aos="fade-right">
        <h2>About Me</h2>
        <div class="about-content">
          <p>
            <span class="highlight">QA Lead & Technology Governance</span> professional with 15+ years of experience 
            in fintech, cloud, and enterprise systems. I specialize in ETL data validation, risk-based testing, 
            AWS cloud solutions, and establishing robust governance frameworks.
          </p>
          <p>
            With a passion for quality excellence, I've led high-impact QA initiatives across enterprise payment 
            systems, cloud migrations, and fintech platforms. My expertise spans automation, CI/CD pipelines, 
            data integrity, and compliance frameworks including GDPR.
          </p>
          <p>
            I'm driven by a commitment to <span class="highlight">zero-defect delivery</span> and continuous improvement, 
            building scalable testing frameworks that align with business objectives and stakeholder expectations.
          </p>
        </div>
      </section>
    `;

        this.shadowRoot.innerHTML = template;
    }
}

customElements.define('about-section', AboutSection);
