import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { saveFoodApi } from '../redux/reducer/searchFoodApi';
import foodApi from '../services/foodApi';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';
const maxLength = 12;

function Foods() {
  const dispatch = useDispatch();
  const history = useHistory();
  const storageFoods = useSelector(
    ({ searchFoodApi }) => searchFoodApi.foodApi,
  );
  const [returnCategories, setReturnCategories] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getCategoriesApi = async () => {
      try {
        const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(url, { signal: abortController.signal });
        const data = await response.json();
        const values = data.meals.map((test) => test.strCategory);
        setReturnCategories(values);
      } catch (error) {
        console.log(error);
      }
    };
    const renderFoods = () => foodApi('Name', '')
      .then((item) => dispatch(saveFoodApi(item)));
    renderFoods();
    getCategoriesApi();

    return () => abortController.abort();
  }, []);

  const categoriesFunc = () => {
    const maxLength2 = 5;
    const filteredArray = returnCategories
      && returnCategories
        .filter((ele, pos) => returnCategories.indexOf(ele) === pos)
        .slice(0, maxLength2);
    return filteredArray;
  };

  if (storageFoods === null) global.alert(alert);

  if (toggle && storageFoods && storageFoods.length === 1) {
    history.push(`/foods/${storageFoods[0].idMeal}`);
  }

  const handleClick = (categoryName) => {
    if (toggle === true) {
      foodApi('Categories', categoryName).then((item) => dispatch(saveFoodApi(item)));
      return;
    }
    setToggle(!toggle);
    if (toggle === false) {
      foodApi('Name', '').then((item) => dispatch(saveFoodApi(item)));
      return;
    }
    if (storageFoods.length === 1) {
      setToggle(false);
    }
  };
  return (
    <div>
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
            onClick={ () => cocktailApi('Name', '')
              .then((item) => dispatch(saveCocktailApi(item))) }
            className="bg-orange-500 hover:bg-orange-700
            hover:animate-pulse transition duration-300"
          >
            All
          </button>
        </div>
        <div className="listItems">
          {storageFoods
            && storageFoods
              .slice(0, maxLength)
              .map((food, index) => (
                <Recipes
                  key={ index }
                  recipe={ food }
                  index={ index }
                  recipes={ storageFoods.slice(0, maxLength) }
                />
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
