import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import cocktailApi from '../services/cocktailApi';
import { saveCocktailApi } from '../redux/reducer/searchCocktailApi';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const alert = 'Sorry, we haven\'t found any recipes for these filters.';
const maxLength = 12;
const returnCategories = ['Ordinary Drink',
  'Cocktail',
  'Shake',
  'Other/Unknown',
  'Cocoa',
  'Shot',
  'Coffee / Tea',
  'Homemade Liqueur',
  'Punch / Party Drink',
  'Beer',
  'Soft Drink'];

function Drinks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [render, setRender] = useState([]);
  const [toggle, setToggle] = useState(false);

  const storageCocktails = useSelector(
    ({ searchCocktailApi }) => searchCocktailApi.cocktailApi,
  );

  const renderDrinks = async () => {
    const cocktail = await cocktailApi('Name', '');
    dispatch(saveCocktailApi(cocktail));
    setRender(cocktail);
    setToggle(true);
    localStorage.setItem('cocktailApi', JSON.stringify(cocktail));
  };

  useEffect(() => {
    renderDrinks();
  }, []);

  useEffect(() => {
    if (storageCocktails) {
      setRender(storageCocktails);
    }
  }, [storageCocktails]);

  const categoriesFunc = () => {
    const maxLength2 = 5;
    const filteredArray = returnCategories
      && returnCategories
        .filter((ele, pos) => returnCategories.indexOf(ele) === pos)
        .slice(0, maxLength2);
    return filteredArray;
  };

  if (storageCocktails === null) global.alert(alert);

  if (render && render.length === 1) {
    history.push(`/drinks/${storageCocktails[0].idDrink}`);
  }

  const handleClick = (categoryName) => {
    const filter = storageCocktails
      .filter((obj) => (categoryName ? obj.strCategory === categoryName : obj));
    setRender(filter);
  };

  return (
    <div>
      { toggle ? (
        <>
          <Route exact path="/drinks" component={ Header } />
          <div className="componentItem">
            <div className="categories">
              {returnCategories.length > 0
                  && categoriesFunc().map((categoryName, i) => (
                    <button
                      key={ i }
                      type="button"
                      data-testid={ `${categoryName}-category-filter` }
                      onClick={ () => handleClick(categoryName) }
                      className="bg-orange-500 hover:bg-orange-700 ..."
                    >
                      {categoryName}
                    </button>
                  ))}
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ () => handleClick('') }
                className="bg-orange-500 hover:bg-orange-700 ..."
              >
                All
              </button>
            </div>
            <div className="listItems">
              {render.length !== 0
                ? render
                  .slice(0, maxLength)
                  .map((drink, index) => (
                    <Recipes
                      key={ index }
                      recipe={ drink }
                      index={ index }
                      recipes={ render.slice(0, maxLength) }
                    />
                  )) : <h2>could not find</h2>}
            </div>
          </div>
          <Footer />

        </>
      )
        : <Loading />}

    </div>
  );
}

export default Drinks;
