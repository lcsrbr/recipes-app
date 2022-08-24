import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import recipeDetailsApi from '../services/recipeDetailsApi';
import recommendationsApi from '../services/recommendationsApi';
import '../Css/recipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

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
      .filter(({ id }) => id !== details.idMeal || details.idDrink)));
    setFavotite(!isFavorite);
  };

  useEffect(() => {
    const verifyFavorite = () => {
      const getlocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (!getlocal) return false;
      return getlocal.every(({ id }) => id === details.idMeal || details.idDrink);
    };
    if (details) {
      setFavotite(verifyFavorite());
    }
  }, [details]);
  return (
    <div className="container">
      {details && (
        <section>
          <h2 data-testid="recipe-title">
            {details.strMeal || details.strDrink}
          </h2>
          <img
            src={ details.strMealThumb || details.strDrinkThumb }
            alt="foto"
            width="150px"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">
            {history.location.pathname.includes('/foods')
              ? details.strCategory
              : details.strAlcoholic}
          </p>

          <div>
            <h4>ingredientes</h4>
            {[...strIngredient].map((ing, index) => (
              details[ing] && (
                <p
                  key={ details[ing] }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {details[ing]}
                  <br />
                  {details[strMeasure[index]]}
                </p>
              )
            ))}
          </div>

          <div>
            <h4>instruções</h4>
            <p data-testid="instructions">{details.strInstructions}</p>
          </div>

          <p>recomendações</p>
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
                <img
                  src={ item.strMealThumb || item.strDrinkThumb }
                  alt="foto"
                  data-testid="recipe-photo"
                  className="image"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={ () => {
              carousel.current.scrollLeft -= carousel.current.offsetWidth;
            } }
          >
            Left
          </button>
          <button
            type="button"
            onClick={ () => {
              carousel.current.scrollLeft += carousel.current.offsetWidth;
            } }
          >
            Right
          </button>

          {history.location.pathname.includes('/foods') && (
            <video data-testid="video">
              <track kind="captions" src={ details.strYoutube } />
            </video>)}

        </section>
      )}
      {copied && <p> Link copied!</p> }
      <button
        type="button"
        onClick={ saveFavoriteLocalStorage }
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
          copy(`http://localhost:3000${history.location.pathname}`);
          setCopied(true);
          setTimeout(() => setCopied(false), seconds);
        } }
      >
        <img src={ shareIcon } alt="compartilhar" />
      </button>

      {!localStorage.getItem('doneRecipes') && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="StartRecipe"
          onClick={ () => {
            history.push(`${history.location.pathname}/in-progress`);
          } }
        >
          {!localStorage.getItem('inProgressRecipes')
            ? 'Start Recipe' : 'Continue Recipe'}
        </button>)}
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
