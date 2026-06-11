import { connect } from 'react-redux';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import {
  getCurrentParams,
  getCurrentState,
} from '@shopgate/pwa-common/selectors/router';
import { getProduct } from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * Creates selector props with product ids from portal props or the current PDP route.
 * @param {Object} state State.
 * @param {Object} props Props.
 * @returns {Object}
 */
const getProductSelectorProps = (state, props) => {
  const currentRouteParams = getCurrentParams(state);
  const currentRouteState = getCurrentState(state);

  // Not all PDP portals pass product ids
  const productId = props.productId || (
    currentRouteParams?.productId ? hex2bin(currentRouteParams.productId) : null
  );
  const variantId = props.variantId || currentRouteState?.productId;

  return {
    ...props,
    productId,
    variantId,
  };
};

/**
 * Maps state to props.
 * @param {Object} state State.
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => {
  const productSelectorProps = getProductSelectorProps(state, props);

  return {
    product: getProduct(state, productSelectorProps),
    productId: productSelectorProps.productId,
  };
};

export default connect(mapStateToProps);
