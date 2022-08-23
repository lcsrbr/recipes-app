import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// import YouTube from 'react-youtube';
import recipeDetailsApi from '../services/recipeDetailsApi';

function RecipeDetails({ match }) {
  const [details, setDetails] = useState(null);
  const getApi = async () => {
    const response = await recipeDetailsApi(match.params.id, window.location.pathname);
    setDetails(response);
  };
  useEffect(() => {
    getApi();
  }, []);

  // const opts = {
  //   height: '390',
  //   width: '640',
  //   playerVars: {
  //     ply: details && details.strYoutube,
  //     autoplay: 1,
  //   },
  // };

  const strIngredient = details
  && Object.keys(details).filter((item) => item.includes('strIngredient'));

  const strMeasure = details
    && Object.keys(details).filter((item) => item.includes('strMeasure'));

  return (
    <div>
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
          {/* <p>recomendações</p> */}
          <p data-testid="0-recomendation-card">recomendações</p>
          {window.location.pathname.includes('/foods') && (
            <video data-testid="video">
              <track kind="captions" src={ details.strYoutube } />
            </video>)}

        </section>
      )}
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
