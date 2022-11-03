import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import priceFormat from '../../helpers/priceFormat';
import './styles/OrderCard.css';

function OrderCard({ orderData }) {
  const { id, status, saleDate, totalPrice } = orderData;

  return (
    <Link to={ `/customer/orders/${id}` }>
      <div className="orderStyle">
        <p data-testid={ `customer_orders__element-order-id-${id}` }>
          Pedido
          {id}
        </p>
        <p
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </p>
        <p data-testid={ `customer_orders__element-order-date-${id}` }>
          { saleDate }
        </p>
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          R$
          { priceFormat(totalPrice) }
        </p>
      </div>
    </Link>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  orderData: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};
