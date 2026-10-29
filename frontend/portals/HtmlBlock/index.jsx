import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useCurrentProduct } from '@shopgate/engage/core';
import { HtmlSanitizer } from '@shopgate/engage/components';
import { getBaseProduct } from '@shopgate/engage/product/selectors/product';
import { makeStyles } from '@shopgate/engage/styles';
import config from '../../config.json';
import formatHtml from '../../helpers/formatHtml';

const useStyles = makeStyles()(theme => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const PRODUCT_VARIABLE_PATTERN = /{\s*(productName|productId|productNumber)\s*}/;
const HTML_BLOCK_UPDATED_EVENT = 'pdpHtmlBlock:updated';

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
  const { classes, cx } = useStyles();
  const productProps = useCurrentProduct();
  const product = useSelector(state => getBaseProduct(state, productProps));
  const htmlContent = config.htmlBlocks?.[name];
  const productVariables = useMemo(() => getProductVariables(product), [product]);
  const formattedHtml = useMemo(() => {
    if (typeof htmlContent !== 'string') {
      return '';
    }

    return formatHtml(htmlContent, productVariables);
  }, [htmlContent, productVariables]);
  const hasProductVariables = typeof htmlContent === 'string' &&
    PRODUCT_VARIABLE_PATTERN.test(htmlContent);
  const shouldWaitForProduct = hasProductVariables && !product;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.CustomEvent !== 'function') {
      return;
    }

    if (typeof htmlContent !== 'string' || htmlContent.trim() === '') {
      return;
    }

    if (shouldWaitForProduct) {
      return;
    }

    window.dispatchEvent(new CustomEvent(HTML_BLOCK_UPDATED_EVENT, {
      detail: {
        name,
        html: formattedHtml,
        ...productVariables,
      },
    }));
  }, [
    formattedHtml,
    hasProductVariables,
    htmlContent,
    name,
    product,
    productVariables,
    shouldWaitForProduct,
  ]);

  if (typeof htmlContent !== 'string' || htmlContent.trim() === '') {
    return null;
  }

  if (shouldWaitForProduct) {
    return null;
  }

  return (
    <HtmlSanitizer
      key={name}
      className={cx(classes.container, `html-block-${toCssClassName(name)}`)}
      allowScripts
      processStyles
      settings={{
        extension: 'pdp-html-block',
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
