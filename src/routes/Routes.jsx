import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodsId from '../pages/FoodsId';
import DrinksId from '../pages/DrinksId';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/foods/:id/in-progress"
        render={ (props) => <FoodsId { ...props } /> }
      />
      <Route path="/foods/:id" render={ (props) => <FoodsId { ...props } /> } />
      <Route path="/foods" component={ Foods } />
      <Route
        path="/drinks/:id/in-progress"
        render={ (props) => <FoodsId { ...props } /> }
      />
      <Route path="/drinks/:id" render={ (props) => <DrinksId { ...props } /> } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
