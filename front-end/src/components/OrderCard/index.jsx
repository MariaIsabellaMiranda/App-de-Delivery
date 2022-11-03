import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import priceFormat from '../../helpers/priceFormat';
import './styles/OrderCard.css';

function OrderCard({ orderData }) {
  const { id, status, date, price } = orderData;
  return (
    <Link to={ `localhost:3000/customer/orders/${id}` }>
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
          { date }
        </p>
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          R$
          { priceFormat(price) }
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
    date: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
