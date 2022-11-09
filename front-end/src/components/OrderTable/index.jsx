import PropTypes from 'prop-types';
import OrderTableItem from '../OrderTableItem';
import './styles/OrderTable.css';

function OrderTable({ products }) {
  return (
    <table className="_order_table">
      <tbody>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        {products.map((product, i) => (
          <OrderTableItem
            product={ product }
            index={ i }
            key={ i }
          />
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;

OrderTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
