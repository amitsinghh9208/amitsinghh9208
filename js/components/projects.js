/**
 * Projects Section Component
 * Displays portfolio projects
 */

class ProjectsSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const projectsHTML = CONSTANTS.PROJECTS.map(project => `
      <div class="project">
        <h3>${Sanitizer.escapeSpecialChars(project.title)}</h3>
        <p>${Sanitizer.escapeSpecialChars(project.description)}</p>
      </div>
    `).join('');

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
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: var(--primary-color);
          text-align: center;
        }

        .projects-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .project {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border-left: 4px solid var(--primary-color);
        }

        .project:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
        }

        .project h3 {
          color: var(--primary-color);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .project p {
          color: #666;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          section {
            padding: 3rem 1rem;
          }

          h2 {
            font-size: 2rem;
          }

          .projects-container {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <section id="projects" data-aos="fade-up">
        <h2>Featured Projects</h2>
        <div class="projects-container">
          ${projectsHTML}
        </div>
      </section>
    `;

    this.shadowRoot.innerHTML = template;
  }
}

customElements.define('projects-section', ProjectsSection);