import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lS from 'manager-local-storage';
import OrderTable from '../../components/OrderTable';
import dateFormat from '../../helpers/dateFormat';
import priceFormat from '../../helpers/priceFormat';
import dataTestId from '../../helpers/dataTestIds';
import Header from '../../components/Header';
import easyFetch from '../../helpers/fetch';

function Order() {
  const { orderId } = useParams();
  const { token } = lS.get('user');

  const orderDetails = {
    id: 1,
    seller: { name: 'Gabriel Dias' },
    saleDate: '2022-11-03T17:41:21',
    status: 'Pendente',
    products: [
      {
        SaleProduct: {
          quantity: 2,
        },
        price: '2.35',
        name: 'Skol Lata 250ml',
      },
    ],
  };

  const [order, setOrder] = useState(orderDetails);

  useEffect(() => {
    const getOrderDetails = async () => {
      const response = await easyFetch(
        `http://localhost:3001/customer/orders/${orderId}`,
        { Authorization: token },
      );
      const responseJSON = await response.json();
      setOrder(responseJSON);
    };
    getOrderDetails();
  }, [orderId, token]);

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
            <span data-testid={ dataTestId('37') }>{orderId}</span>
          </span>
          <span>
            <h3>Pessoa Vendedora</h3>
            <span data-testid={ dataTestId('38') }>{seller.name}</span>
          </span>
          <span data-testid={ dataTestId('39') }>{dateFormat(saleDate)}</span>
          <span data-testid={ dataTestId('40') }>{status}</span>
          <button
            type="button"
            onClick={ markAsReceived }
            data-testid={ dataTestId('47') }
          >
            Marcar como entrege
          </button>
        </section>
        <OrderTable products={ products } />
        <span>
          <span>R$ </span>
          <span data-testid={ dataTestId('46') }>{priceFormat(totalPrice)}</span>
        </span>
      </main>
    </>
  );
}

export default Order;
