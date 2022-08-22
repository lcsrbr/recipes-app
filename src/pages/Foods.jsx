import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Foods() {
  const storageFoods = useSelector(({ searchFoodApi }) => searchFoodApi.foodApi);
  const history = useHistory();

  if (storageFoods.length === 1) {
    history.push(`/foods/${storageFoods[0].idMeal}`);
  }
  const maxLength = 12;

  return (
    <div>
      <Route exact path="/foods" component={ Header } />
      Foods
      <div>
        { storageFoods && storageFoods.slice(0, maxLength).map((food, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ food.idMeal }>
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>
              {food.strMeal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Foods;
