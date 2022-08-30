import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import recipeDetailsApi from '../services/recipeDetailsApi';
import recommendationsApi from '../services/recommendationsApi';
import '../Css/recipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../Css/FoodsDrinks.css';

const copy = require('clipboard-copy');

const seis = 6;
const seconds = 3000;
function RecipeDetails({ match }) {
  const [details, setDetails] = useState(null);
  const [recom, setRecom] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setFavotite] = useState(false);

  const carousel = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const getApi = async () => {
      const response = await recipeDetailsApi(match.params.id, history.location.pathname);
      setDetails(response);
      const recommendations = await recommendationsApi(history.location.pathname);
      setRecom(recommendations.slice(0, seis));
      const verifyFavorite = () => {
        const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
        if (!getlocal) return false;
        return getlocal.some(({ id }) => id === response.idMeal || response.idDrink);
      };
      setFavotite(verifyFavorite());
    };
    getApi();
  }, [match.params.id, history.location.pathname]);

  const strIngredient = details
  && Object.keys(details).filter((item) => item.includes('strIngredient'));

  const strMeasure = details
    && Object.keys(details).filter((item) => item.includes('strMeasure'));

  const saveFavoriteLocalStorage = () => {
    const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const local = [...(getlocal || []), {
      id: details.idMeal || details.idDrink,
      type: history.location.pathname.includes('/foods')
        ? 'food'
        : 'drink',
      nationality: details.strArea || '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic || '',
      name: details.strMeal || details.strDrink,
      image: details.strMealThumb || details.strDrinkThumb,
    }];
    if (!isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(local));
      return setFavotite(!isFavorite);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(getlocal
      .filter(({ id }) => id !== (details.idDrink || details.idMeal))));
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
    <div className="container">
      {details && (
        <section>

          <img
            src={ details.strMealThumb || details.strDrinkThumb }
            alt="foto"
            width="150px"
            data-testid="recipe-photo"
          />
          <div className="RecipesAndIcons">
            <div>
              <h2 data-testid="recipe-title" className="food-title">
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
                    ? `foods/${match.params.id}` : `drinks/${match.params.id}`;
                  copy(`http://localhost:3000/${url}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), seconds);
                } }
              >
                <img src={ shareIcon } alt="compartilhar" />
              </button>
            </div>
          </div>
          <div>
            {copied && <p>Link copied!</p> }
            <h4 className="h4-ingredients">Ingredients</h4>
            <div className="ingredients ingrDetails">
              {' '}
              {[...strIngredient].map((ing, index) => (
                details[ing] && (
                  <p
                    key={ details[ing] }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {details[ing]}
                    {': '}
                    {details[strMeasure[index]]}
                  </p>
                )
              ))}
            </div>
          </div>

          <div>
            <h4 className="h4-instructions">Instructions</h4>
            <p
              data-testid="instructions"
              className="instructions"
            >
              {details.strInstructions}

            </p>
          </div>
          <p className="h4-instructions">Recomendations</p>
          <div className="recomendacoes">
            <div className="carousel" ref={ carousel }>
              {recom && recom.map((item, index) => (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ index }
                  className="item"
                >
                  <p
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {item.strMeal || item.strDrink}
                  </p>
                  <input
                    type="image"
                    src={ item.strMealThumb || item.strDrinkThumb }
                    alt="foto"
                    data-testid="recipe-photo"
                    className="image"
                    onClick={ () => history.push(history
                      .location.pathname.includes('/foods')
                      ? `/drinks/${item.idDrink}` : `/foods/${item.idMeal}`) }
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <div className="startButton">
        {!verifyRecipesDone() && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ `enabledBtn 
          flex
          justify-center
          py-4
          leading-none
           text-white
            bg-orange-500
             hover:bg-orange-700
             transition
             duration-300
             font-semibold
             rounded
             StartRecipe
             shadow` }
            onClick={ () => {
              history.push(`${history.location.pathname}/in-progress`);
            } }
          >
            {!verifyRecipesProgress()
              ? 'Start Recipe' : 'Continue Recipe'}
          </button>)}
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
