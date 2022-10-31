import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';

export default function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/seller/orders">Seller</Route>
      <Route path="/admin/manage">Admin</Route>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}
