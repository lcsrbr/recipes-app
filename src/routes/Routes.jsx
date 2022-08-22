import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodsId from '../pages/FoodsId';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods/:id/in-progress" component={ Foods } />
      <Route exact path="/foods/:id" render={ (props) => <FoodsId { ...props } /> } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks/:id/in-progress" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ Drinks } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
