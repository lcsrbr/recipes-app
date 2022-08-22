import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Drinks() {
  const storageCocktails = useSelector(
    ({ searchCocktailApi }) => searchCocktailApi.cocktailApi,
  );
  const history = useHistory();
  console.log(storageCocktails);
  if (storageCocktails.length === 1) {
    history.push(`/drinks/${storageCocktails[0].idDrink}`);
  }
  const maxLength = 12;
  return (
    <div>
      <Route exact path="/drinks" component={ Header } />
      drinks
      <div>
        { storageCocktails && storageCocktails.slice(0, maxLength).map((drink, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>
              {drink.strDrink}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drinks;
