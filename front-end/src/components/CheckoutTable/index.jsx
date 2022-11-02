import PropTypes from 'prop-types';
import lS from 'manager-local-storage';
import { useState } from 'react';
import CheckoutTableItem from '../CheckoutTableItem';

function CheckoutTable({ updatePrice }) {
  const [cartItems, setCartItems] = useState(lS.get('cart') ?? []);

  const updateCartItems = () => {
    setCartItems(lS.get('cart') ?? []);
    updatePrice();
  };

  return (
    <table>
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
  updatePrice: PropTypes.func.isRequired,
};
