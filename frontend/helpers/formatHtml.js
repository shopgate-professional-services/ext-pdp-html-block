/**
 * Escapes special regular expression characters within a string.
 * @param {string} value Value to escape.
 * @returns {string}
 */
const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Normalizes a value for insertion into configured HTML.
 * @param {*} value Value to normalize.
 * @returns {string}
 */
const normalizeValue = (value) => {
  if (value === null || typeof value === 'undefined') {
    return '';
  }

  return `${value}`;
};

/**
 * Replaces configured placeholders with product data.
 * @param {string} htmlContent Configured HTML.
 * @param {Object} variables Variables for replacement.
 * @returns {string}
 */
const formatHtml = (htmlContent, variables) => Object.keys(variables).reduce(
  (acc, key) => acc.replace(
    new RegExp(`{\\s*${escapeRegExp(key)}\\s*}`, 'g'),
    normalizeValue(variables[key])
  ),
  htmlContent
);

export default formatHtml;
