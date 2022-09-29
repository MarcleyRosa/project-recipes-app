import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function RecipeDetails({ match: { params: { id } } }) {
  const history = useHistory();
  console.log(id);
  console.log(history.location.pathname.split('/')[2]);
  return (
    <div>RecipeDetails</div>
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
