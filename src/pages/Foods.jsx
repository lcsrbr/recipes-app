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

  return (
    <div>
      <Route exact path="/foods" component={ Header } />
      Foods
    </div>
  );
}

export default Foods;
