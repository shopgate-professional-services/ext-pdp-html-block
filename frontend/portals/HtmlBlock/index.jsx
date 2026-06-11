import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import config from '../../config.json';
import connect from '../../connector';
import formatHtml from '../../helpers/formatHtml';

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
 * Gets the product number from available product fields.
 * @param {Object|null} product Product data.
 * @returns {*}
 */
const getProductNumber = product => product?.identifiers?.sku;

/**
 * Creates the variable map for configured HTML blocks.
 * @param {Object|null} product Product data.
 * @param {string|null|false} productId Product id from route.
 * @returns {Object}
 */
const getProductVariables = (product, productId) => {
  const productNumber = getProductNumber(product);

  return {
    productName: product?.name,
    productId: product?.id || productId,
    productNumber,
  };
};

/**
 * Renders an HTML block based on the provided name prop.
 * @param {Object} props props
 * @returns {JSX.Element|null}
 */
const HtmlBlock = ({
  name,
  product,
  productId,
}) => {
  const htmlContent = config.htmlBlocks?.[name];

  if (typeof htmlContent !== 'string' || htmlContent.trim() === '') {
    return null;
  }

  const className = `${styles.container} html-block-${toCssClassName(name)}`;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: formatHtml(htmlContent, getProductVariables(product, productId)),
      }}
    />
  );
};

HtmlBlock.propTypes = {
  name: PropTypes.string.isRequired,
  product: PropTypes.shape(),
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

HtmlBlock.defaultProps = {
  product: null,
  productId: null,
};

export default connect(HtmlBlock);
