import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dataTestId from '../../helpers/dataTestIds';
import dateFormat from '../../helpers/dateFormat';
import priceFormat from '../../helpers/priceFormat';
import './styles/OrderCard.css';

function OrderCard({ orderData, type }) {
  const { id, status, saleDate, totalPrice, address, number } = orderData;

  const getDataTestId = (forCustomer, forSeller, idForDataTest = '') => {
    if (type === 'customer') return dataTestId(forCustomer, idForDataTest);
    if (type === 'seller') return dataTestId(forSeller, idForDataTest);
  };

  return (
    <Link to={ `/customer/orders/${id}` }>
      <div className="orderStyle">
        <p
          data-testid={ getDataTestId('33', '48', id) }
        >
          Pedido
          {id}
        </p>
        <p data-testid={ getDataTestId('34', '48', id) }>{status}</p>
        <p data-testid={ getDataTestId('35', '50', id) }>{dateFormat(saleDate)}</p>
        <p data-testid={ getDataTestId('36', '51', id) }>
          R$
          {priceFormat(totalPrice)}
        </p>
      </div>
      {type === 'seller' && (
        <span data-testid={ dataTestId('52') }>{`${address}, ${number}`}</span>
      )}
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
    address: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
