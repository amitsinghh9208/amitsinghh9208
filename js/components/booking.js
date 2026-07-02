/**
 * Session Booking Component
 * Displays premium session booking section
 */

class BookingSection extends HTMLElement {
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
        }

        section {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
          padding: 60px 20px;
          text-align: center;
        }

        .booking-container {
          max-width: 500px;
          margin: 0 auto;
          color: white;
        }

        .booking-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        h2 {
          color: white;
          font-size: 32px;
          margin: 20px 0;
          font-weight: 700;
        }

        p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          margin-bottom: 30px;
        }

        .booking-btn {
          display: inline-block;
          background: white;
          color: var(--primary-color);
          padding: 15px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .booking-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          background: #f0f0f0;
        }

        .price-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .booking-btn:hover .price-tooltip {
          opacity: 1;
        }

        @media (max-width: 768px) {
          section {
            padding: 40px 20px;
          }

          h2 {
            font-size: 24px;
          }

          .booking-icon {
            font-size: 36px;
          }
        }
      </style>

      <section class="booking-section" data-aos="fade-up">
        <div class="booking-container">
          <div class="booking-icon">📅</div>
          <h2>Let's Meet — Reserve Your Session Now</h2>
          <p>Book a premium consultation session to discuss your financial aspirations.</p>
          <button class="booking-btn" aria-label="Book premium session">
            Book Now
            <span class="price-tooltip">Unlock Premium Insights — ₹${CONSTANTS.RAZORPAY.SESSION_PRICE}</span>
          </button>
        </div>
      </section>
    `;

    this.shadowRoot.innerHTML = template;
  }

  setupEventListeners() {
    const bookingBtn = this.shadowRoot.querySelector('.booking-btn');
    bookingBtn.addEventListener('click', () => {
      window.open(CONSTANTS.RAZORPAY.CHECKOUT_URL, '_blank', 'noopener,noreferrer');
    });
  }
}

customElements.define('booking-section', BookingSection);