/**
 * Escapes HTML special characters within a string.
 * @param {string} value Value to escape.
 * @returns {string}
 */
const escapeHtml = (value) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return value.replace(/[&<>"']/g, char => map[char]);
};

/**
 * Normalizes a value for insertion into configured HTML.
 * @param {*} value Value to normalize.
 * @returns {string}
 */
const normalizeValue = (value) => {
  if (value === null || typeof value === 'undefined') {
    return '';
  }

  return escapeHtml(`${value}`);
};

/**
 * Replaces configured placeholders with product data.
 * @param {string} htmlContent Configured HTML.
 * @param {Object} variables Variables for replacement.
 * @returns {string}
 */
const formatHtml = (htmlContent, variables) => htmlContent.replace(
  /{\s*(\w+)\s*}/g,
  (match, key) => {
    if (!Object.prototype.hasOwnProperty.call(variables, key)) {
      return match;
    }

    return normalizeValue(variables[key]);
  }
);

export default formatHtml;
