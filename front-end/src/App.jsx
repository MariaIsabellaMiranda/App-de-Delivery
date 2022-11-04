import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import lS from 'manager-local-storage';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import Orders from './pages/Orders';

export default function App() {
  const logged = lS.get('user') !== null;

  return (
    <Switch>
      <Route exact path="/login">
        {logged ? <Redirect to="/customer/products" /> : <Login />}
      </Route>
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders/:orderId" component={ Order } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/seller/orders">Seller</Route>
      <Route exact path="/admin/manage">Admin</Route>
      <Route exact path="/">
        {!logged ? <Redirect to="/login" /> : <Redirect to="/customer/products" />}
      </Route>
    </Switch>
  );
}
