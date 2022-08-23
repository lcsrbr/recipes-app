import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';
const maxLength = 12;

function Foods() {
  const storageFoods = useSelector(({ searchFoodApi }) => searchFoodApi.foodApi);
  const history = useHistory();

  if (storageFoods === null) global.alert(alert);

  if (storageFoods && storageFoods.length === 1) {
    history.push(`/foods/${storageFoods[0].idMeal}`);
  }

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
      <Route exact path="/foods" component={ Footer } />
    </div>
  );
}

export default Foods;
