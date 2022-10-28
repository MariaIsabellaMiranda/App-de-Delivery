import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
    </Switch>
  );
}
