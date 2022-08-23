import PropTypes from 'prop-types';
import React from 'react';
// import { useSelector } from 'react-redux';
import recipeDetailsApi from '../services/recipeDetailsApi';

function RecipeDetails({ match }) {
  // const [detail, setDetails] = useState({});
  const getApi = async () => {
    const response = await recipeDetailsApi(match.params.id, window.location.pathname);
    console.log(response);
  };
  getApi();
  return (
    <div>{`FoodsId ${match.params.id}`}</div>
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
