import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import cocktailApi from '../services/cocktailApi';
import { saveCocktailApi } from '../redux/reducer/searchCocktailApi';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';
const maxLength = 12;

function Drinks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [returnCategories, setReturnCategories] = useState([]);
  const [toggle, setToggle] = useState(true);

  const storageCocktails = useSelector(({ searchCocktailApi }) => (
    searchCocktailApi.cocktailApi));

  useEffect(() => {
    const getCategoriesApi = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();
      const values = data.drinks.map((test) => test.strCategory);
      setReturnCategories(values);
    };
    const renderDrinks = () => {
      cocktailApi('Name', '').then((item) => dispatch(saveCocktailApi(item)));
    };
    renderDrinks();
    getCategoriesApi();
  }, []);

  const categoriesFunc = () => {
    const maxLength2 = 5;
    const filteredArray = returnCategories
    && returnCategories.filter((ele, pos) => returnCategories.indexOf(ele)
   === pos).slice(0, maxLength2);
    return filteredArray;
  };

  if (storageCocktails === null) global.alert(alert);

  if (toggle && storageCocktails && storageCocktails.length === 1) {
    history.push(`/drinks/${storageCocktails[0].idDrink}`);
  }

  const handleClick = (categoryName) => {
    if (toggle === true) {
      cocktailApi('Categories', categoryName)
        .then((item) => dispatch(saveCocktailApi(item)));
    }
    setToggle(!toggle);
    if (toggle === false) {
      cocktailApi('Name', '')
        .then((item) => dispatch(saveCocktailApi(item)));
    }
  };

  return (
    <div>
      <Route exact path="/drinks" component={ Header } />
      drinks
      <div className="teste">
        { storageCocktails && storageCocktails.slice(0, maxLength).map((drink, index) => (
          <Recipes
            key={ index }
            recipe={ drink }
            index={ index }
            recipes={ storageCocktails.slice(0, maxLength) }
          />
        ))}
        { returnCategories.length > 0 && categoriesFunc().map((categoryName, i) => (
          <button
            key={ i }
            type="button"
            data-testid={ `${categoryName}-category-filter` }
            onClick={ () => handleClick(categoryName) }
          >
            {categoryName}
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => cocktailApi('Name', '')
            .then((item) => dispatch(saveCocktailApi(item))) }
        >
          All
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
