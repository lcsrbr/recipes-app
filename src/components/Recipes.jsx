import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Recipes({ index, recipe }) {
  const history = useHistory();

  // const objectLiteralseTop = () => ({

  // })[history.location.pathname];

  const { pathname } = history.location;

  const idRecipe = recipe.idMeal || recipe.idDrink;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      key={ idRecipe }
      className="recipesImg border-solid border-orange-500 shadow-grey-500/50
      hover:border-black-500 shadow-lg"
    >
      {/* <Link to={ idRecipe }> */}
      <Link to={ `${pathname}/${idRecipe}` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }

        />
      </Link>
      <p
        data-testid={ `${index}-card-name` }
        className="text-2xl font-light italic mb-4 text"
      >
        {recipe.strMeal || recipe.strDrink}
      </p>
    </div>
  );
}

//      <Link to={ `/foods/${recipe.idMeal}` || `/drinks/${recipe.idDrink}` }>

Recipes.propTypes = {
  index: PropTypes.number.isRequired,
  // recipes: PropTypes.shape({}).isRequired,
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
