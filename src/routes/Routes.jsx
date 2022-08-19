import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import SearchBar from '../components/SearchBar';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ SearchBar } />

    </Switch>
  );
}

export default Routes;
