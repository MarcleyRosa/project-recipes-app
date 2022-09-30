import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Buttons from '../components/Buttons';

function RecipeDetails({ match: { url, path, params: { id } } }) {
  const [detailsAPI, setDetailsAPI] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const history = useHistory();

  const domain = path.includes('meals') ? 'themealdb' : 'thecocktaildb';
  const identRecipe = path.includes('meals') ? 'meals' : 'drinks';

  const title = path.includes('meals') ? 'strMeal' : 'strDrink';
  const thumb = path.includes('meals') ? 'strMealThumb' : 'strDrinkThumb';

  const domainRec = path.includes('drinks') ? 'themealdb' : 'thecocktaildb';
  const typeRecomendation = path.includes('drinks') ? 'meals' : 'drinks';
  const nameRecipe = path.includes('drinks') ? 'strMeal' : 'strDrink';

  const urlDetails = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;
  const urlRecommendation = `https://www.${domainRec}.com/api/json/v1/1/search.php?s=`;

  const maxNumberRecomendation = 6;

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(urlDetails);
      const json = await response.json();
      setDetailsAPI(json[identRecipe][0]);
    };
    fetchAPI();
    const fetchRecomendation = async () => {
      const response = await fetch(urlRecommendation);
      const json = await response.json();
      setRecommendation(json);
    };
    fetchRecomendation();
  }, []);

  const localStorageDone = JSON.parse(localStorage.getItem('doneRecipes'));

  const doneRecipe = localStorageDone?.some((recipe) => (
    recipe.id === id
  ));

  const localStorageInProg = localStorage
    .getItem('inProgressRecipes')
    ? Object.keys(JSON.parse(localStorage
      .getItem('inProgressRecipes'))[identRecipe]) : [];

  const idInProgress = localStorageInProg?.some((recipe) => (
    recipe === id
  ));

  const buttonName = idInProgress ? 'Continue Recipe' : 'Start Recipe';

  const ingredients = Object.entries(detailsAPI)
    .filter((e) => e[0].includes('strIngredient'))
    .filter((ev) => ev[1]?.length).map((elem) => elem[1]);
  console.log(detailsAPI);

  return (
    <div className="mealsContainer">
      <h3 data-testid="recipe-title">{ detailsAPI[title] }</h3>
      <img
        data-testid="recipe-photo"
        className="img"
        src={ detailsAPI[thumb] }
        alt=""
      />
      <Buttons linkCopy={ url } />
      { path.includes('drinks')
        ? <p data-testid="recipe-category">{ detailsAPI.strAlcoholic }</p>
        : <p data-testid="recipe-category">{ detailsAPI.strCategory }</p>}
      { ingredients.map((ingredient, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`${ingredient}: ${detailsAPI[`strMeasure${index + 1}`]}`}

        </p>
      ))}
      <p data-testid="instructions">{ detailsAPI.strInstructions }</p>
      { path.includes('meals') && <iframe
        title="test"
        width="420"
        height="315"
        data-testid="video"
        src={ detailsAPI.strYoutube }
        frameBorder="0"
      /> }
      <h4>Recomendações</h4>
      <div className="details-card">
        { recommendation[typeRecomendation]?.map((card, index) => (
          index < maxNumberRecomendation && (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <p data-testid={ `${index}-recommendation-title` }>{ card[nameRecipe]}</p>
            </div>
          )
        ))}
      </div>
      { !doneRecipe && (
        <button
          className="button-position"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/${identRecipe}/${id}/in-progress`) }
        >
          { buttonName }

        </button>
      )}
    </div>
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
