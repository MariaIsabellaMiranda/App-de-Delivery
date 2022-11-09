import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import Orders from './pages/Orders';
import AdminManage from './pages/AdminManage';
import './App.css';

function App({ status, role }) {
  const routes = {
    customer: '/customer/products',
    seller: '/seller/orders',
    administrator: '/admin/manage',
  };

  const sellerLogged = !status || role !== 'seller';
  const customerLogged = !status || role !== 'customer';
  const admLogged = !status || role !== 'administrator';

  return (
    <Switch>
      <Route exact path="/login">
        {status ? <Redirect to={ routes[role] } /> : <Login />}
      </Route>
      <Route exact path="/register">
        {status ? <Redirect to={ routes[role] } /> : <Register />}
      </Route>
      <Route exact path="/customer/products">
        {customerLogged ? <Redirect to="/" /> : <Products />}
      </Route>
      <Route exact path="/customer/checkout">
        {customerLogged ? <Redirect to="/" /> : <Checkout />}
      </Route>
      <Route exact path="/customer/orders/:orderId">
        {customerLogged ? <Redirect to="/" /> : <Order />}
      </Route>
      <Route exact path="/customer/orders">
        {customerLogged ? <Redirect to="/" /> : <Orders />}
      </Route>
      <Route exact path="/seller/orders">
        {sellerLogged ? <Redirect to="/" /> : <Orders />}
      </Route>
      <Route exact path="/seller/orders/:orderId">
        {sellerLogged ? <Redirect to="/" /> : <Order />}
      </Route>
      <Route exact path="/admin/manage">
        {admLogged ? <Redirect to="/" /> : <AdminManage />}
      </Route>
      <Route exact path="/">
        {!status ? <Redirect to="/login" /> : <Redirect to={ routes[role] } />}
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  status: state.userReducer.status,
  role: state.userReducer.role,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  status: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};
