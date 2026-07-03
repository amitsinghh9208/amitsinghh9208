/**
 * Skills Section Component
 * Displays technical skills as tags
 */

class SkillsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const skillsHTML = CONSTANTS.SKILLS.map(skill => 
      `<span class="skill-tag">${Sanitizer.escapeSpecialChars(skill)}</span>`
    ).join('');

    const template = `
      <style>
        :host {
          --primary-color: #667eea;
          --secondary-color: #764ba2;
        }

        section {
          padding: 6rem 2rem;
          max-width: 1000px;
          margin: 0 auto;
          background: #f9f9f9;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--primary-color);
          text-align: center;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .skill-tag {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        }

        .skill-tag:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          section {
            padding: 3rem 1rem;
          }

          h2 {
            font-size: 2rem;
          }

          .skill-tag {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
        }
      </style>

      <section id="skills" data-aos="zoom-in">
        <h2>Technical Skills</h2>
        <div class="skills-container">
          ${skillsHTML}
        </div>
      </section>
    `;

    this.shadowRoot.innerHTML = template;
  }
}

customElements.define('skills-section', SkillsSection);
