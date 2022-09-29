import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function RecipeDetails({ match: { path, params: { id } } }) {
  const [detailsAPI, setDetailsAPI] = useState([]);
  console.log(path);

  const rout = path.split('/')[1];

  const domain = rout === 'meals' ? 'themealdb' : 'thecocktaildb';

  console.log(rout);

  const urlDetails = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(urlDetails);
      const json = await response.json();
      setDetailsAPI(json);
    };
    fetchAPI();
  }, []);

  console.log(detailsAPI);

  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
