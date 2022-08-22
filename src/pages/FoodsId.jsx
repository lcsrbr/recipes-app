import PropTypes from 'prop-types';
import React from 'react';

function FoodsId({ match }) {
  return (
    <div>{`FoodsId ${match.params.id}`}</div>
  );
}

FoodsId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodsId;
