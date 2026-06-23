import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { css } from 'glamor';
import { useCurrentProduct } from '@shopgate/engage/core';
import { HtmlSanitizer } from '@shopgate/engage/components';
import { getProduct } from '@shopgate/pwa-common-commerce/product/selectors/product';
import config from '../../config.json';
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
 * @returns {Object}
 */
const getProductVariables = (product) => {
  const productNumber = getProductNumber(product);

  return {
    productName: product?.name,
    productId: product?.id,
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
}) => {
  const productProps = useCurrentProduct();
  const product = useSelector(state => getProduct(state, productProps));
  const htmlContent = config.htmlBlocks?.[name];

  if (typeof htmlContent !== 'string' || htmlContent.trim() === '') {
    return null;
  }

  const className = `${styles.container} html-block-${toCssClassName(name)}`;
  const formattedHtml = formatHtml(htmlContent, getProductVariables(product));

  return (
    <HtmlSanitizer
      className={className}
      processStyles
      settings={{
        html: formattedHtml,
        portal: name,
      }}
    >
      {formattedHtml}
    </HtmlSanitizer>
  );
};

HtmlBlock.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HtmlBlock;
