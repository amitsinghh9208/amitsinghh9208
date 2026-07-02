/**
 * Application Constants
 * Centralized configuration for the application
 */

const CONSTANTS = {
  // EmailJS Configuration
  EMAILJS: {
    SERVICE_ID: 'service_t92ua1s',
    TEMPLATE_ID: 'template_pbtfazg',
    PUBLIC_KEY: 'J2cBgjw4s8J3_DlZZ',
    TIMEOUT: 10000 // 10 seconds
  },

  // Razorpay Configuration
  RAZORPAY: {
    CHECKOUT_URL: 'https://checkout.razorpay.com/',
    SESSION_PRICE: 199 // ₹199
  },

  // AOS Configuration
  AOS: {
    DURATION: 1000,
    ONCE: true,
    OFFSET: 100
  },

  // Typing Animation Configuration
  TYPING: {
    STRINGS: ['Software Professional', 'Lead QA Analyst', 'Aspiring Architect'],
    TYPE_SPEED: 60,
    BACK_SPEED: 30,
    LOOP: true
  },

  // Google Analytics
  GA: {
    TRACKING_ID: 'G-YLC9XCD134'
  },

  // Messages
  MESSAGES: {
    FORM: {
      SUCCESS: 'Message sent successfully ✅',
      ERROR: 'Failed to send message. Please try again ❌',
      VALIDATION_ERROR: 'Please fill all fields correctly'
    },
    VALIDATION: {
      INVALID_EMAIL: 'Please enter a valid email address',
      FIELD_REQUIRED: 'This field is required',
      MIN_LENGTH: 'Minimum length not met'
    }
  },

  // URLs
  URLs: {
    RESUME: 'assets/Finance_26.pdf',
    BASE_PATH: './'
  },

  // CSS Classes
  CLASSES: {
    THEME_DARK: 'dark-mode',
    THEME_LIGHT: 'light-mode',
    ACTIVE: 'active',
    LOADING: 'loading'
  },

  // Storage Keys
  STORAGE: {
    THEME: 'app-theme',
    USER_PREFERENCES: 'user-preferences'
  },

  // Skill Tags
  SKILLS: [
    'AWS (S3/EC2/IAM)',
    'Python',
    'JavaScript',
    'SQL',
    'Selenium',
    'REST API Testing',
    'CI/CD (Jenkins, Docker)',
    'Data Validation (ETL)',
    'GDPR Compliance',
    'Agile & PMP'
  ],

  // Projects Data
  PROJECTS: [
    {
      title: 'Enterprise Payment Systems QA',
      description: 'Led QA strategy and automation for enterprise payment platforms including cross-border payment systems. Ensured zero-defect delivery using CI/CD pipelines and stakeholder governance.'
    },
    {
      title: 'AWS Cloud Migration (BACIS)',
      description: 'Led QA for large-scale AWS cloud migration, validating ETL pipelines and ensuring financial data integrity across systems.'
    },
    {
      title: 'Loan Management System Automation',
      description: 'Designed Selenium-based automation framework for loan management systems, reducing testing overhead by 40%.'
    },
    {
      title: 'Fintech Data Pipeline Validation',
      description: 'Conducted end-to-end testing of financial ETL pipelines using SQL and API testing across multiple vendor systems.'
    }
  ]
};

// Freeze constants to prevent modification
Object.freeze(CONSTANTS);