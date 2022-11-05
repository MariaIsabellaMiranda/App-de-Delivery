import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderTable from '../../components/OrderTable';
import dateFormat from '../../helpers/dateFormat';
import priceFormat from '../../helpers/priceFormat';
import dataTestId from '../../helpers/dataTestIds';
import Header from '../../components/Header';
import easyFetch from '../../helpers/fetch';

function Order({ token, role }) {
  const { orderId } = useParams();
  console.log(role);

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

  useEffect(() => {
    const getOrderDetails = async () => {
      const URL = role === 'customer'
        ? `http://localhost:3001/customer/orders/${orderId}`
        : `http://localhost:3001/seller/orders/${orderId}`;
      const response = await easyFetch(URL, { Authorization: token });
      const responseJSON = await response.json();
      setOrder(responseJSON);
    };
    getOrderDetails();
  }, [orderId, token, role]);

  const { seller, saleDate, status, products, totalPrice } = order;

  const markAsReceived = async () => {
    console.log('ok');
  };

  return (
    <>
      <Header />
      <main>
        Order
        <section>
          <span>
            <h3>Pedido Número</h3>
            <span data-testid={ getDataTestId('37', '53') }>{orderId}</span>
          </span>
          {role === 'customer' && (
            <span>
              <h3>Pessoa Vendedora</h3>
              <span data-testid={ dataTestId('38') }>{seller.name}</span>
            </span>
          )}
          <span data-testid={ getDataTestId('39', '55') }>{dateFormat(saleDate)}</span>
          <span data-testid={ getDataTestId('40', '54') }>{status}</span>
          {role === 'customer' && (
            <button
              type="button"
              onClick={ markAsReceived }
              data-testid={ dataTestId('47') }
              disabled={ status === 'Pendente' }
            >
              Marcar como entregue
            </button>
          )}
          {role === 'seller' && (
            <>
              <button
                type="button"
                onClick={ markAsReceived }
                data-testid={ dataTestId('56') }
                // disabled={ status === 'Pendente' }
              >
                Preparar Pedido
              </button>
              <button
                type="button"
                onClick={ markAsReceived }
                data-testid={ dataTestId('57') }
                disabled={ status !== 'Preparando' }
              >
                Saiu para entrega
              </button>
            </>
          )}
        </section>
        <OrderTable products={ products } />
        <span>
          <span>R$ </span>
          <span data-testid={ getDataTestId('46', '63') }>{priceFormat(totalPrice)}</span>
        </span>
      </main>
    </>
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
