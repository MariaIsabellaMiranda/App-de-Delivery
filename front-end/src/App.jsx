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

function App({ status, role }) {
  console.log('STATUS NO APP', status);
  const routes = {
    customer: '/customer/products',
    seller: '/seller/orders',
    administrator: '/admin/manage',
  };

  const adminOrLogged = !status && role === 'administrator';

  return (
    <Switch>
      <Route exact path="/login">
        {status ? <Redirect to={ routes[role] } /> : <Login />}
      </Route>
      <Route exact path="/register">
        {status ? <Redirect to={ routes[role] } /> : <Register />}
      </Route>
      <Route exact path="/customer/products">
        {!status ? <Redirect to="/" /> : <Products />}
      </Route>
      <Route exact path="/customer/checkout">
        {!status ? <Redirect to="/" /> : <Checkout />}
      </Route>
      <Route exact path="/customer/orders/:orderId">
        {adminOrLogged ? <Redirect to="/" /> : <Order />}
      </Route>
      <Route exact path="/customer/orders">
        {adminOrLogged ? <Redirect to="/" /> : <Orders />}
      </Route>
      <Route exact path="/seller/orders">
        {adminOrLogged ? <Redirect to="/" /> : <Orders />}
      </Route>
      <Route exact path="/seller/orders/:orderId">
        {adminOrLogged ? <Redirect to="/" /> : <Order />}
      </Route>
      <Route exact path="/admin/manage">
        {!status || role !== 'administrator' ? <Redirect to="/" /> : <AdminManage />}
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
