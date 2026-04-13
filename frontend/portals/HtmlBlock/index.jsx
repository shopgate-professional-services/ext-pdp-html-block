import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import config from '../../config.json';

const styles = {
  container: css({ padding: 16 }),
};

/**
 * Converts a string into a CSS class name.
 * @param {*} value The string to convert.
 * @returns {string} The CSS class name.
 */
const toCssClassName = value => value.replace(/[^a-z0-9]/gi, '-').toLowerCase();

/**
 * Renders an HTML block based on the provided name prop.
 * @param {Object} props props
 * @returns {JSX.Element|null}
 */
const HtmlBlock = ({ name }) => {
  const htmlContent = config.htmlBlocks?.[name];

  if (typeof htmlContent !== 'string' || htmlContent.trim() === '') {
    return null;
  }

  const className = `${styles.container} html-block-${toCssClassName(name)}`;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

HtmlBlock.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HtmlBlock;
