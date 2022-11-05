import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dataTestId from '../../helpers/dataTestIds';
import dateFormat from '../../helpers/dateFormat';
import priceFormat from '../../helpers/priceFormat';
import './styles/OrderCard.css';

function OrderCard({ orderData, role }) {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = orderData;

  const getDataTestId = (forCustomer, forSeller, idForDataTest = '') => {
    if (role === 'customer') return dataTestId(forCustomer, idForDataTest);
    if (role === 'seller') return dataTestId(forSeller, idForDataTest);
  };

  return (
    <Link to={ `/${role}/orders/${id}` }>
      <div className="orderStyle">
        <p data-testid={ getDataTestId('33', '48', id) }>
          Pedido
          {id}
        </p>
        <p data-testid={ getDataTestId('34', '49', id) }>{status}</p>
        <p data-testid={ getDataTestId('35', '50', id) }>
          {dateFormat(saleDate)}
        </p>
        <p data-testid={ getDataTestId('36', '51', id) }>
          R$
          {priceFormat(totalPrice)}
        </p>
      </div>
      {role === 'seller' && (
        <span
          data-testid={ dataTestId('52') }
        >
          {`${deliveryAddress}, ${deliveryNumber}`}

        </span>
      )}
    </Link>
  );
}

const mapStateToProps = (state) => ({
  role: state.userReducer.role,
});

export default connect(mapStateToProps)(OrderCard);

OrderCard.propTypes = {
  orderData: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
  role: PropTypes.string.isRequired,
};
