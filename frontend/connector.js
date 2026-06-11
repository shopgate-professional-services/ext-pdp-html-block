import { connect } from 'react-redux';
import { getProduct } from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  product: getProduct(state, props),
});

export default connect(mapStateToProps);
