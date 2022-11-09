import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import OrderTable from '../../components/OrderTable';
import dateFormat from '../../helpers/dateFormat';
import priceFormat from '../../helpers/priceFormat';
import Header from '../../components/Header';
import easyFetch from '../../helpers/easyFetch';
import dataTestId from '../../helpers/dataTestIds';
import { statusIcon } from '../../helpers/status';
import './styles/Order.css';

function Order({ token, role }) {
  const { orderId } = useParams();
  const EM_TRANSITO = 'Em Trânsito';

  const LOADING = 'Loading...';

  const orderDetails = {
    id: 0,
    seller: { name: LOADING },
    saleDate: LOADING,
    status: LOADING,
    products: [
      {
        SaleProduct: {
          quantity: 0,
        },
        price: LOADING,
        name: LOADING,
      },
    ],
  };

  const [order, setOrder] = useState(orderDetails);

  const getDataTestId = (forCustomer, forSeller, idForDataTest = '') => {
    if (role === 'customer') return dataTestId(forCustomer, idForDataTest);
    if (role === 'seller') return dataTestId(forSeller, idForDataTest);
  };

  const updateOrderData = useCallback(async () => {
    const URL = role === 'customer'
      ? `http://localhost:3001/customer/orders/${orderId}`
      : `http://localhost:3001/seller/orders/${orderId}`;
    const response = await easyFetch(URL, { Authorization: token });
    const responseJSON = await response.json();
    setOrder(responseJSON);
  }, [orderId, token, role]);

  useEffect(() => {
    updateOrderData();
  }, [updateOrderData]);

  const { seller, saleDate, status, products, totalPrice } = order;

  const changeStatus = async (newStatus) => {
    await easyFetch(
      'http://localhost:3001/status',
      { Authorization: token },
      'PUT',
      { id: orderId, status: newStatus },
    );
    updateOrderData();
  };

  const getStatusClassName = () => {
    if (status === 'Pendente') return ' pending';
    if (status === 'Preparando') return ' preparing';
    if (status === EM_TRANSITO) return ' road';
    if (status === 'Entregue') return ' received';
  };

  const statusClassName = getStatusClassName();

  return (
    <div className={ `_page_order${statusClassName}` }>
      <Header status={ statusClassName } />
      <main>
        <section className="_header_order">
          <h1>
            <span>Pedido</span>
            <span data-testid={ getDataTestId('37', '53') }>{orderId}</span>
          </h1>
          {role === 'customer' && (
            <span className="_seller">
              <h3>Pessoa Vendedora:</h3>
              <span data-testid={ dataTestId('38') }>{seller.name}</span>
            </span>
          )}
          <span data-testid={ getDataTestId('39', '55') } className="_date">
            {dateFormat(saleDate)}
          </span>
          <span className="_status">
            <Icon icon={ statusIcon[status] } />
            <span
              data-testid={ getDataTestId('40', '54') }
            >
              {status}
            </span>
          </span>
          {role === 'customer' && (
            <button
              type="button"
              onClick={ () => changeStatus('Entregue') }
              data-testid={ dataTestId('47') }
              disabled={ status !== EM_TRANSITO }
              className="_mark_received"
            >
              Marcar como entregue
            </button>
          )}
          {role === 'seller' && (
            <>
              <button
                type="button"
                onClick={ () => changeStatus('Preparando') }
                data-testid={ dataTestId('56') }
                disabled={ status !== 'Pendente' }
              >
                Preparar Pedido
              </button>
              <button
                type="button"
                onClick={ () => changeStatus(EM_TRANSITO) }
                data-testid={ dataTestId('57') }
                disabled={ status !== 'Preparando' }
              >
                Saiu para entrega
              </button>
            </>
          )}
        </section>
        <OrderTable products={ products } />
        <span className="_price">
          <span>Subtotal:</span>
          <span>
            R$
            <span data-testid={ getDataTestId('46', '63') }>
              {priceFormat(totalPrice)}
            </span>
          </span>
        </span>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  role: state.userReducer.role,
});

export default connect(mapStateToProps)(Order);

Order.propTypes = {
  token: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
