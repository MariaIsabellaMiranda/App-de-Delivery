import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import dataTestId from '../../helpers/dataTestIds';
import dateFormat from '../../helpers/dateFormat';
import priceFormat from '../../helpers/priceFormat';
import { statusClassName, statusIcon } from '../../helpers/status';
import './styles/OrderCard.css';

function OrderCard({ orderData, role }) {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = orderData;

  const getDataTestId = (forCustomer, forSeller, idForDataTest = '') => {
    if (role === 'customer') return dataTestId(forCustomer, idForDataTest);
    if (role === 'seller') return dataTestId(forSeller, idForDataTest);
  };

  return (
    <Link
      to={ `/${role}/orders/${id}` }
      className={ `_order_card${statusClassName[status]}` }
    >
      <p data-testid={ getDataTestId('33', '48', id) } className="_order_number">
        <span>Pedido</span>
        <span>{` ${id}`}</span>
      </p>
      <div className="_order_details">
        <div className="_order">
          <span className="_order_status">
            <Icon icon={ statusIcon[status] } />
            <p data-testid={ getDataTestId('34', '49', id) }>{status}</p>
          </span>
          <div className="_date_price">
            <p data-testid={ getDataTestId('35', '50', id) }>
              {dateFormat(saleDate)}
            </p>
            <p data-testid={ getDataTestId('36', '51', id) }>
              R$
              {priceFormat(totalPrice)}
            </p>
          </div>
        </div>
        {role === 'seller' && (
          <span data-testid={ dataTestId('52') } className="_order_address">
            {`${deliveryAddress}, ${deliveryNumber}`}
          </span>
        )}
      </div>
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
