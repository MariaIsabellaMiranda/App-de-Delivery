import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}
