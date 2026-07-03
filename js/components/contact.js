/**
 * Contact Section Component
 * Handles contact form with email functionality
 */

class ContactSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.emailInitialized = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeEmailJS();
    }

    render() {
        const template = `
      <style>
        :host {
          --primary-color: #667eea;
          --secondary-color: #764ba2;
        }

        section {
          padding: 6rem 2rem;
          max-width: 800px;
          margin: 0 auto;
          background: #f9f9f9;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: var(--primary-color);
          text-align: center;
        }

        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        input, textarea {
          padding: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        input.error, textarea.error {
          border-color: #e74c3c;
        }

        textarea {
          resize: vertical;
          min-height: 150px;
        }

        .btn {
          padding: 1rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .status-message {
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
          display: none;
          margin-top: 1rem;
        }

        .status-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          display: block;
        }

        .status-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          display: block;
        }

        .error-text {
          color: #e74c3c;
          font-size: 0.85rem;
          margin-top: 0.25rem;
          display: none;
        }

        .error-text.show {
          display: block;
        }

        @media (max-width: 768px) {
          section {
            padding: 3rem 1rem;
          }

          h2 {
            font-size: 2rem;
          }

          .form-container {
            padding: 1.5rem;
          }
        }
      </style>

      <section id="contact" class="section-card" data-aos="fade-up" data-aos-delay="300">
        <h2>Get In Touch</h2>
        <div class="form-container">
          <form id="contact-form">
            <div>
              <input type="text" name="name" placeholder="Your Name" required aria-label="Full Name">
              <span class="error-text"></span>
            </div>
            <div>
              <input type="email" name="email" placeholder="Your Email" required aria-label="Email Address">
              <span class="error-text"></span>
            </div>
            <div>
              <textarea name="message" placeholder="Your Message" required aria-label="Message"></textarea>
              <span class="error-text"></span>
            </div>
            <button type="submit" class="btn">Send Message</button>
          </form>
          <div id="status" class="status-message"></div>
        </div>
      </section>
    `;

        this.shadowRoot.innerHTML = template;
    }

    setupEventListeners() {
        const form = this.shadowRoot.querySelector('#contact-form');

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Add real-time validation
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const errorContainer = field.parentElement.querySelector('.error-text');
        let isValid = true;

        if (!Sanitizer.isValidField(value, 1)) {
            errorContainer.textContent = CONSTANTS.MESSAGES.VALIDATION.FIELD_REQUIRED;
            isValid = false;
        } else if (fieldName === 'email' && !Sanitizer.isValidEmail(value)) {
            errorContainer.textContent = CONSTANTS.MESSAGES.VALIDATION.INVALID_EMAIL;
            isValid = false;
        } else if (fieldName === 'message' && value.length < 10) {
            errorContainer.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (isValid) {
            errorContainer.classList.remove('show');
            field.classList.remove('error');
        } else {
            errorContainer.classList.add('show');
            field.classList.add('error');
        }

        return isValid;
    }

    validateForm() {
        const form = this.shadowRoot.querySelector('#contact-form');
        const fields = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    initializeEmailJS() {
        if (typeof emailjs !== 'undefined' && !this.emailInitialized) {
            emailjs.init(CONSTANTS.EMAILJS.PUBLIC_KEY);
            this.emailInitialized = true;
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showStatus(CONSTANTS.MESSAGES.FORM.VALIDATION_ERROR, 'error');
            return;
        }

        const form = this.shadowRoot.querySelector('#contact-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        const statusDiv = this.shadowRoot.querySelector('#status');

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            if (typeof emailjs !== 'undefined') {
                await emailjs.sendForm(
                    CONSTANTS.EMAILJS.SERVICE_ID,
                    CONSTANTS.EMAILJS.TEMPLATE_ID,
                    form,
                    CONSTANTS.EMAILJS.PUBLIC_KEY
                );

                this.showStatus(CONSTANTS.MESSAGES.FORM.SUCCESS, 'success');
                form.reset();
            } else {
                throw new Error('EmailJS not initialized');
            }
        } catch (error) {
            console.error('Email error:', error);
            this.showStatus(CONSTANTS.MESSAGES.FORM.ERROR, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }

    showStatus(message, type) {
        const statusDiv = this.shadowRoot.querySelector('#status');
        statusDiv.textContent = message;
        statusDiv.className = `status-message ${type}`;

        setTimeout(() => {
            statusDiv.className = 'status-message';
        }, 5000);
    }
}

customElements.define('contact-section', ContactSection);
