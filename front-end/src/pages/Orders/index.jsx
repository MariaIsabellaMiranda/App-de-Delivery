import lS from 'manager-local-storage';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);

  // const ordersMock = [
  //   {
  //     id: 1,
  //     status: 'Pendente',
  //     date: '03/11/2021',
  //     price: 28.30,
  //   },
  //   {
  //     id: 2,
  //     status: 'Finalizado',
  //     date: '02/11/21',
  //     price: 50,
  //   },
  // ];

  useEffect(() => {
    const getOrders = async () => {
      const userData = lS.get('user');
      console.log(userData.token);
      const ordersResponse = await fetch(
        'http://localhost:3001/customer/orders',
        {
          method: 'GET',
          headers: {
            Authorization: userData.token,
          },
        },
      );
      const ordersJson = await ordersResponse.json();
      setOrders(ordersJson);
    };
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      {orders.length > 0 && orders.map((order, index) => (
        <OrderCard
          key={ index }
          orderData={ order }
        />
      ))}
    </div>
  );
}

export default Orders;
