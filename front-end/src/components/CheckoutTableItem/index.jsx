import PropTypes from 'prop-types';
import { removeFromCart } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';

function CheckoutTableItem({ cartItem, index, updateCartItems }) {
  const { name, quantity, price, id } = cartItem;

  const removeItem = () => {
    removeFromCart(id);
    updateCartItems();
  };

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td>
        <span>R$ </span>
        <span
          data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
        >
          {priceFormat(price)}
        </span>
      </td>
      <td>
        <span>R$ </span>
        <span
          data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
        >
          {priceFormat(Number(price) * quantity)}
        </span>
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      >
        <button type="button" onClick={ removeItem }>Remover</button>
      </td>
    </tr>
  );
}

export default CheckoutTableItem;

CheckoutTableItem.propTypes = {
  cartItem: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateCartItems: PropTypes.func.isRequired,
};
