import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Drinks() {
  const storageCocktails = useSelector(
    ({ searchCocktailApi }) => searchCocktailApi.cocktailApi,
  );
  const history = useHistory();

  if (storageCocktails.length === 1) {
    history.push(`/drinks/${storageCocktails[0].idDrink}`);
  }
  return (
    <div>
      <Route exact path="/drinks" component={ Header } />
      drinks
    </div>
  );
}

export default Drinks;
