import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dataTestId from '../../helpers/dataTestIds';
import dateFormat from '../../helpers/dateFormat';
import priceFormat from '../../helpers/priceFormat';
import './styles/OrderCard.css';

function OrderCard({ orderData }) {
  const { id, status, saleDate, totalPrice } = orderData;

  return (
    <Link to={ `/customer/orders/${id}` }>
      <div className="orderStyle">
        <p data-testid={ dataTestId('33', id) }>
          Pedido
          {id}
        </p>
        <p
          data-testid={ dataTestId('34', id) }
        >
          { status }
        </p>
        <p data-testid={ dataTestId('35', id) }>
          { dateFormat(saleDate) }
        </p>
        <p data-testid={ dataTestId('36', id) }>
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
