/**
 * Sanitizer Utility
 * Provides security functions for input validation and XSS prevention
 */

const Sanitizer = {
  /**
   * Sanitize HTML input to prevent XSS attacks
   * @param {string} input - Raw HTML input
   * @returns {string} - Sanitized HTML string
   */
  sanitizeHTML: (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  /**
   * Validate email format
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if valid email format
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Validate required field
   * @param {string} value - Field value
   * @param {number} minLength - Minimum length
   * @returns {boolean} - True if valid
   */
  isValidField: (value, minLength = 1) => {
    return value && value.trim().length >= minLength;
  },

  /**
   * Escape special characters for safe display
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  escapeSpecialChars: (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  },

  /**
   * Validate URL
   * @param {string} url - URL to validate
   * @returns {boolean} - True if valid URL
   */
  isValidURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
};

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sanitizer;
}