import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { removeFromCart } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';
import dataTestId from '../../helpers/dataTestIds';
import './styles/CheckoutTableItem.css';

function CheckoutTableItem({ cartItem, index, updateCartItems }) {
  const { name, quantity, price, id } = cartItem;

  const removeItem = () => {
    removeFromCart(id);
    updateCartItems();
  };

  return (
    <tr className="_checkout_table_item">
      <td data-testid={ dataTestId('22', index) }>{index + 1}</td>
      <td data-testid={ dataTestId('23', index) }>{name}</td>
      <td data-testid={ dataTestId('24', index) }>{quantity}</td>
      <td>
        <span>R$ </span>
        <span data-testid={ dataTestId('25', index) }>{priceFormat(price)}</span>
      </td>
      <td>
        <span>R$ </span>
        <span data-testid={ dataTestId('26', index) }>
          {priceFormat(Number(price) * quantity)}
        </span>
      </td>
      <td data-testid={ dataTestId('27', index) }>
        <button type="button" onClick={ removeItem } className="_remove">
          <Icon icon="fluent:delete-28-filled" />
        </button>
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
