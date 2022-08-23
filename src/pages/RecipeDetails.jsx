import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import recipeDetailsApi from '../services/recipeDetailsApi';
import recommendationsApi from '../services/recommendationsApi';
import '../Css/recipeDetails.css';

const seis = 6;
function RecipeDetails({ match }) {
  const [details, setDetails] = useState(null);
  const [recom, setRecom] = useState(null);
  const carousel = useRef(null);

  useEffect(() => {
    const getApi = async () => {
      const response = await recipeDetailsApi(match.params.id, window.location.pathname);
      setDetails(response);
      const recommendations = await recommendationsApi(window.location.pathname);
      setRecom(recommendations.slice(0, seis));
    };
    getApi();
  }, [match.params.id]);

  const strIngredient = details
  && Object.keys(details).filter((item) => item.includes('strIngredient'));

  const strMeasure = details
    && Object.keys(details).filter((item) => item.includes('strMeasure'));

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
            {window.location.pathname.includes('/foods')
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

          {window.location.pathname.includes('/foods') && (
            <video data-testid="video">
              <track kind="captions" src={ details.strYoutube } />
            </video>)}

        </section>
      )}
      {!localStorage.getItem('doneRecipes') && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="StartRecipe"
        >
          Start Recipe
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
