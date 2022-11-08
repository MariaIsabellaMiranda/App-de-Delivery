import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';
import easyFetch from '../../helpers/easyFetch';

function Orders({ token, role }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const URL = role === 'customer'
        ? 'http://localhost:3001/customer/orders'
        : 'http://localhost:3001/seller/orders';
      const response = await easyFetch(
        URL,
        { Authorization: token },
        'GET',
      );
      const ordersJson = await response.json();
      setOrders(ordersJson);
    };
    getOrders();
  }, [role, token]);

  return (
    <div>
      <Header />
      {orders.length > 0
        && orders.map((order, index) => (
          <OrderCard key={ index } orderData={ order } />
        ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
  role: state.userReducer.role,
});

export default connect(mapStateToProps)(Orders);

Orders.propTypes = {
  token: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
