import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { saveFoodApi } from '../redux/reducer/searchFoodApi';
import foodApi from '../services/foodApi';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import cocktailApi from '../services/cocktailApi';
import Loading from '../components/Loading';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';
const maxLength = 12;
const returnCategories = ['Beef',
  'Breakfast',
  'Chicken',
  'Dessert',
  'Goat',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian'];

function Foods() {
  const dispatch = useDispatch();
  const history = useHistory();
  const storageFoods = useSelector(
    ({ searchFoodApi }) => searchFoodApi.foodApi,
  );
  const [returnFoods, setReturnFoods] = useState(false);
  const [render, setRender] = useState([]);

  const renderFoods = async () => {
    const food = await foodApi('Name', '');
    dispatch(saveFoodApi(food));
    setRender(food);
    setReturnFoods(true);
    localStorage.setItem('foodApi', JSON.stringify(food));
    const cocktail = await cocktailApi('Name', '');
    localStorage.setItem('cocktailApi', JSON.stringify(cocktail));
  };

  useEffect(() => {
    renderFoods();
  }, []);

  useEffect(() => {
    if (storageFoods) {
      setRender(storageFoods);
    }
  }, [storageFoods]);

  const categoriesFunc = () => {
    const maxLength2 = 5;
    const filteredArray = returnCategories
      && returnCategories
        .filter((ele, pos) => returnCategories.indexOf(ele) === pos)
        .slice(0, maxLength2);
    return filteredArray;
  };

  if (storageFoods === null) global.alert(alert);

  if (render && render.length === 1) {
    history.push(`/foods/${render[0].idMeal}`);
  }
  const handleClick = (categoryName) => {
    const filter = storageFoods
      .filter((obj) => (categoryName ? obj.strCategory === categoryName : obj));
    setRender(filter);
  };

  return (
    <div>
      {returnFoods ? (
        <>
          <Route exact path="/foods" component={ Header } />
          <div className="componentItem">
            <div className="categories">
              {returnCategories.length > 0
            && categoriesFunc().map((categoryName, i) => (
              <button
                key={ i }
                type="button"
                data-testid={ `${categoryName}-category-filter` }
                onClick={ () => handleClick(categoryName) }
                className="bg-orange-500 hover:bg-orange-700
              hover:animate-pulse transition duration-300"
              >
                {categoryName}
              </button>
            ))}
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ () => handleClick('') }
                className="bg-orange-500 hover:bg-orange-700
                hover:animate-pulse transition duration-300"
              >
                All
              </button>
            </div>
            <div className="listItems">
              {render.length
                ? render
                  .slice(0, maxLength)
                  .map((food, index) => (
                    <Recipes
                      key={ index }
                      recipe={ food }
                      index={ index }
                      recipes={ render.slice(0, maxLength) }
                    />
                  )) : <h2>could not find</h2>}
            </div>
          </div>
          <Footer />
        </>
      ) : <Loading />}
    </div>
  );
}

export default Foods;
