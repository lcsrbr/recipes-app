import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Header from '../components/Header';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';
const maxLength = 12;

function Drinks() {
  const storageCocktails = useSelector(
    ({ searchCocktailApi }) => searchCocktailApi.cocktailApi,
  );
  const history = useHistory();

  if (storageCocktails === null) global.alert(alert);

  if (storageCocktails && storageCocktails.length === 1) {
    history.push(`/drinks/${storageCocktails[0].idDrink}`);
  }

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
