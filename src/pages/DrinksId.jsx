import PropTypes from 'prop-types';
import React from 'react';

function DrinksId({ match }) {
  return (
    <div>{`DrinksId ${match.params.id}`}</div>
  );
}

DrinksId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksId;
