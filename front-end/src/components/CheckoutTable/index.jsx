import PropTypes from 'prop-types';
import CheckoutTableItem from '../CheckoutTableItem';
import './styles/CheckoutTable.css';

function CheckoutTable({ cartItems, updateCartItems }) {
  return (
    <table className="_checkout_table">
      <tbody>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
        {cartItems.map((cartItem, i) => (
          <CheckoutTableItem
            cartItem={ cartItem }
            key={ i }
            index={ i }
            updateCartItems={ updateCartItems }
          />
        ))}
      </tbody>
    </table>
  );
}

export default CheckoutTable;

CheckoutTable.propTypes = {
  updateCartItems: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
