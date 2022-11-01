import lS from 'manager-local-storage';
import { useState } from 'react';
import priceFormat from '../../helpers/priceFormat';

function CheckoutTable() {
  const [cartItems, setCartItems] = useState(lS.get('cart') ?? []);

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
          <tr key={ i }>
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              {i + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              {cartItem.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              {cartItem.quantity}
            </td>
            <td>
              <span>R$ </span>
              <span
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {priceFormat(cartItem.price)}
              </span>
            </td>
            <td>
              <span>R$ </span>
              <span
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {priceFormat(Number(cartItem.price) * cartItem.quantity)}
              </span>
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
            >
              <button type="button">Remover</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CheckoutTable;
