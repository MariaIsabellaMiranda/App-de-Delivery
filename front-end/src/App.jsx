import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/seller/orders">Seller</Route>
      <Route exact path="/admin/manage">Admin</Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}
