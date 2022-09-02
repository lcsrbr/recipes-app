/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Ingredients2 from '../components/Ingredients2';
import '../styles/RecipeInProgress.css';

const copy = require('clipboard-copy');

const seconds = 2000;

function RecipeInProgress({ match }) {
  const [details, setDetails] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setFavotite] = useState(false);
  const [strIngrs, setStrIngrs] = useState([]);
  const [btnFinish, setBtnFinish] = useState(false);
  const [btnFinishRender, setBtnFinishRender] = useState(false);
  const arrayOf = useSelector(({ ingredients }) => ingredients.ingredients);

  const history = useHistory();

  const verifyFavorite = () => {
    const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!getlocal) return false;
    return getlocal.some(
      ({ id }) => history.location.pathname.includes(id),
    );
  };
  const getApi = () => {
    const foodLocal = JSON.parse(localStorage.getItem('foodApi'));
    const drinckLocal = JSON.parse(localStorage.getItem('cocktailApi'));
    if (history.location.pathname.includes('foods')) {
      const food = foodLocal.find(({ idMeal }) => idMeal === match.params.id);
      setDetails(food);
      const strIngredient = foodLocal
        && Object.keys(food).filter((item) => item.includes('strIngredient'));
      setStrIngrs(strIngredient);
      return setFavotite(verifyFavorite());
    }
    const drinck = drinckLocal.find(({ idDrink }) => idDrink === match.params.id);
    setDetails(drinck);
    const strIngredientD = drinckLocal
      && Object.keys(drinck).filter((item) => item.includes('strIngredient'));
    setStrIngrs(strIngredientD);
    setFavotite(verifyFavorite());
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    const getLocalCheck = JSON.parse(localStorage.getItem('in-progress'));
    if (getLocalCheck && strIngrs) {
      getLocalCheck.forEach((obj) => {
        if (obj.id === history.location.pathname) {
          setBtnFinish(obj.arrayOfCheck.length === obj.ings.length);
        }
      });
    }
    setBtnFinishRender(true);
  }, [arrayOf]);

  const saveFavoriteLocalStorage = () => {
    const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const local = [
      ...(getlocal || []),
      {
        id: details.idMeal || details.idDrink,
        type: history.location.pathname.includes('/foods') ? 'food' : 'drink',
        nationality: details.strArea || '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic || '',
        name: details.strMeal || details.strDrink,
        image: details.strMealThumb || details.strDrinkThumb,
      },
    ];
    if (!isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(local));
      return setFavotite(!isFavorite);
    }
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(
        getlocal.filter(({ id }) => id !== (details.idDrink || details.idMeal)),
      ),
    );
    return setFavotite(!isFavorite);
  };

  const doneRecipes = () => {
    const getLocalDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipe = {
      id: details.idDrink || details.idMeal,
      type: history.location.pathname.includes('/foods') ? 'food' : 'drink',
      nationality: details.strArea || '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic || '',
      name: details.strMeal || details.strDrink,
      image: details.strMealThumb || details.strDrinkThumb,
      doneDate: '31/08/22',
      tags: [details.strTags],
    };
    if (!getLocalDone) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    }

    if (getLocalDone) {
      const verify = getLocalDone.some(
        ({ id }) => id === (details.idDrink || details.idMeal),
      );
      if (!verify) {
        localStorage.setItem(
          'doneRecipes',
          JSON.stringify([...getLocalDone, doneRecipe]),
        );
      }
    }
    history.push('/done-recipes');
  };
  return (
    <div>
      {details && (
        <section>
          <img
            src={ details.strMealThumb || details.strDrinkThumb }
            alt="foto"
            className="recipe-photo rounded shadow-lg shadow-slate-800"
            data-testid="recipe-photo"
          />
          <div className="RecipesAndIcons">
            <div className="ml-10">
              <h2 data-testid="recipe-title" className="food-title mt-8">
                {details.strMeal || details.strDrink}
              </h2>
              <p data-testid="recipe-category" className="recipe-category">
                {history.location.pathname.includes('/foods')
                  ? details.strCategory
                  : details.strAlcoholic}
              </p>
            </div>
            <div className="Icons">
              <button
                type="button"
                onClick={ details && saveFavoriteLocalStorage }
                className="mt-10 hover:scale-150 transition "
              >
                <img
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="fav"
                  data-testid="favorite-btn"
                />
              </button>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ () => {
                  const url = history.location.pathname.includes('/foods')
                    ? `foods/${match.params.id}`
                    : `drinks/${match.params.id}`;
                  copy(`http://localhost:3000/${url}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), seconds);
                } }
                className="mt-10 hover:scale-150 transition duration-300"
              >
                <img src={ shareIcon } alt="compartilhar" />
              </button>
              {copied && <p className="mt-3 text-xs">Link copied!</p>}
            </div>
          </div>
          <div>
            <div
              className="ingredients mt-5 transition
              duration-400
              shadow-sm
              shadow-slate-400
              "
            >
              <h4 className="h4-ingredients">Ingredients</h4>
              {details
                && strIngrs.map((ing, index) => (
                  <Ingredients2
                    key={ index }
                    ing={ ing }
                    index={ index }
                    details={ details }
                  />
                ))}
            </div>
          </div>
          <br />
          <div>
            <div className="instructions">
              <h4 className="h4-instructions mb-3">Instructions</h4>
              <p data-testid="instructions">{details.strInstructions}</p>
            </div>
          </div>
        </section>
      )}
      {btnFinishRender && (
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className={ `enabledBtn 
        ${!btnFinish && 'cursor-not-allowed'}
        ${!btnFinish && 'bg-slate-300'}
        ${btnFinish && 'animate-pulse'}
        flex
        justify-center
        container
        w-30
        px-8 py-4
        mt-10
        leading-none
         text-white
          bg-orange-500
          ${btnFinish && 'hover:bg-orange-700'}
           transition
           duration-300
           font-semibold
           shadow
           ` }
          disabled={ !btnFinish }
          onClick={ doneRecipes }
        >
          Finish
        </button>)}
      <button
        type="button"
        className={ ` enabledBtn
        flex justify-center container w-30
        px-8 py-4 leading-none text-white bg-orange-500
      hover:bg-orange-700 transition duration-300 font-semibold
        shadow` }
        onClick={ () => history.goBack() }
      >
        Go back
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
