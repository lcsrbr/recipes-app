import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import '../styles/recipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/FoodsDrinks.css';

const copy = require('clipboard-copy');

const seis = 6;
const seconds = 3000;
function RecipeDetails({ match }) {
  const [details, setDetails] = useState(null);
  const [recom, setRecom] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setFavotite] = useState(false);
  const divContainer = useRef(null);
  const history = useHistory();

  const verifyFavorite = () => {
    const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!getlocal) return false;
    return getlocal.some(
      ({ id }) => id === history.location.pathname,
    );
  };

  const getApi = () => {
    const foodLocal = JSON.parse(localStorage.getItem('foodApi'));
    const drinckLocal = JSON.parse(localStorage.getItem('cocktailApi'));
    if (history.location.pathname.includes('foods')) {
      setDetails(foodLocal.find(({ idMeal }) => idMeal === match.params.id));
      setRecom(drinckLocal.slice(0, seis));
      return setFavotite(verifyFavorite());
    }
    setDetails(drinckLocal.find(({ idDrink }) => idDrink === match.params.id));
    setRecom(foodLocal.slice(0, seis));
    setFavotite(verifyFavorite());
  };

  useEffect(() => {
    getApi();
  }, []);

  const strIngredient = details
    && Object.keys(details).filter((item) => item.includes('strIngredient'));

  const strMeasure = details
    && Object.keys(details).filter((item) => item.includes('strMeasure'));

  const saveFavoriteLocalStorage = () => {
    const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const local = [
      ...(getlocal || []),
      {
        id: history.location.pathname,
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

  const verifyRecipesDone = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    const some = local && local.some(({ id }) => id === match.params.id);
    return some;
  };
  const verifyRecipesProgress = () => {
    const local = JSON.parse(localStorage.getItem('in-progress'));
    const some = local && local.some(({ id }) => id.includes(history.location.pathname));
    return some;
  };

  return (
    <div
      className="container "
      ref={ divContainer }
    >
      {details && (
        <section>
          <img
            src={ details.strMealThumb || details.strDrinkThumb }
            alt="foto"
            width="150px"
            data-testid="recipe-photo"
            className="recipe-photo mb-5 shadow-md shadow-slate-500"
          />
          <div className="RecipesAndIcons">
            <div>
              <h2 data-testid="recipe-title" className="food-title mr-2">
                {details.strMeal || details.strDrink}
              </h2>
              <p data-testid="recipe-category" className="recipe-category ">
                {history.location.pathname.includes('/foods')
                  ? details.strCategory
                  : details.strAlcoholic}
              </p>
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={ details && saveFavoriteLocalStorage }
              >
                <img
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="fav"
                  data-testid="favorite-btn"
                  className="mb-10 hover:scale-150 transition duration-300"
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
                className="hover:scale-150 transition duration-300"
              >
                <img src={ shareIcon } alt="compartilhar" />
              </button>
              {copied && <p className="mt-5 text-xs -ml-6">Link copied!</p>}
            </div>
          </div>

          <div className="flex flex-col items-center mt-5">
            <div>
              <ul className="ingredients ingrDetails mb-4">
                <h4 className="h4-ingredients mb-3">Ingredients</h4>
                {[...strIngredient].map(
                  (ing, index, arr) => details[ing] && (
                    <li
                      key={ details[ing] }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      className={ `
                    ${index === arr.length - 1 ? 'mb-3' : 'mb-1'} 
                    hover:scale-150 transition duration-200 hover:pt-2 hover:pb-2` }
                    >
                      {details[ing]}
                      {': '}
                      {details[strMeasure[index]]}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="instructions rounded ">
              <h4 className="h4-instructions mb-3">Instructions</h4>
              <p data-testid="instructions">
                {details.strInstructions}
              </p>
            </div>
          </div>
          <p className="h4-instructions mt-5 mb-3">Recomendations</p>

          <div className="recomendacoes mt-2 ">
            <div className="carousel hover:text-white ">
              {recom
                && recom.map((item, index) => (
                  <div
                    data-testid={ `${index}-recomendation-card` }
                    key={ index }
                    className="item"
                  >
                    <p
                      data-testid={ `${index}-recomendation-title` }
                      className=""
                    >
                      {item.strMeal || item.strDrink}
                    </p>
                    <input
                      type="image"
                      src={ item.strMealThumb || item.strDrinkThumb }
                      alt="foto"
                      data-testid="recipe-photo"
                      className="image shadow-sm shadow-slate-600 rounded"
                      onClick={ () => {
                        const url = history.location.pathname.includes('/foods')
                          ? `/drinks/${item.idDrink}`
                          : `/foods/${item.idMeal}`;
                        history.push(url);
                        window.location.reload(false);
                      } }
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
      <button
        type="button"
        className={ `
        flex justify-center container w-30 mt-10
        px-8 py-4 leading-none text-white bg-orange-500
      hover:bg-orange-700 transition duration-300 font-semibold
        rounded shadow` }
        onClick={ () => history.push('/foods') }
      >
        Go Home
      </button>
      <div className="startButton">
        {!verifyRecipesDone() && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ `enabledBtn flex justify-center py-4 leading-none
             text-white  bg-orange-500 hover:bg-orange-700 animate-bounce 
             transition duration-300 font-semibold rounded StartRecipe mb-14 shadow` }
            onClick={ () => {
              history.push(`${history.location.pathname}/in-progress`);
            } }
          >
            {!verifyRecipesProgress() ? 'Start Recipe' : 'Continue Recipe'}
          </button>
        )}
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
// para fazer o carousel usei esse video https://www.youtube.com/watch?v=cX0N3TNxumw
