import PropTypes from 'prop-types';
import priceFormat from '../../helpers/priceFormat';
import dataTestId from '../../helpers/dataTestIds';

function OrderTableItem({ product, index }) {
  const { name, SaleProduct: { quantity }, price } = product;

  return (
    <tr>
      <td
        data-testid={ dataTestId('41', index) }
      >
        {index + 1}
      </td>
      <td
        data-testid={ dataTestId('42', index) }
      >
        {name}
      </td>
      <td
        data-testid={ dataTestId('43', index) }
      >
        {quantity}
      </td>
      <td>
        <span>R$ </span>
        <span
          data-testid={ dataTestId('44', index) }
        >
          {priceFormat(price)}
        </span>
      </td>
      <td>
        <span>R$ </span>
        <span
          data-testid={ dataTestId('45', index) }
        >
          {priceFormat(Number(price) * quantity)}
        </span>
      </td>
    </tr>
  );
}

export default OrderTableItem;

OrderTableItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
