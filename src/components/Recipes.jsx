import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Recipes({ index, recipe }) {
  const history = useHistory();

  const { pathname } = history.location;

  const idRecipe = recipe.idMeal || recipe.idDrink;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      key={ idRecipe }
      className="recipesImg border-solid border-orange-500 shadow-slate-600
      hover:border-black-500 shadow-lg bg-white rounded"
    >
      <Link to={ `${pathname}/${idRecipe}` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          className="rounded"
        />
      </Link>
      <p
        data-testid={ `${index}-card-name` }
        className="text-2xl font-light italic mb-4 text bg-white"
      >
        {recipe.strMeal || recipe.strDrink}
      </p>
    </div>
  );
}

Recipes.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
};

export default Recipes;
