import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Buttons from '../components/Buttons';
import RecipesContext from '../context/RecipesContext';

const mudaFunção = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
};

function RecipeDetails({ history, match: { url, path, params: { id } } }) {
  const { detailsAPI, setDetailsAPI } = useContext(RecipesContext);
  const [recommendation, setRecommendation] = useState([]);
  const [requestInProgress, setRequestInProgress] = useState(mudaFunção());

  const route = path.includes('meals');

  const domain = route ? 'themealdb' : 'thecocktaildb';
  const identRecipe = route ? 'meals' : 'drinks';
  const idRecipe = route ? 'idMeal' : 'idDrink';

  const title = route ? 'strMeal' : 'strDrink';
  const thumb = route ? 'strMealThumb' : 'strDrinkThumb';

  const domainRec = route ? 'thecocktaildb' : 'themealdb';
  const typeRecomendation = route ? 'drinks' : 'meals';
  const nameRecipe = route ? 'strDrink' : 'strMeal';

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
    +recipe === +id
  ));

  const buttonName = idInProgress ? 'Continue Recipe' : 'Start Recipe';

  const ingredients = Object.entries(detailsAPI)
    .filter((e) => e[0].includes('strIngredient'))
    .filter((ev) => ev[1]?.length).map((elem) => elem[1]);

  useEffect(() => {
    const prevIds = requestInProgress[identRecipe];
    if (requestInProgress && detailsAPI[idRecipe]) {
      setRequestInProgress((prevState) => (
        { ...prevState,
          [identRecipe]: { ...prevIds,
            [detailsAPI[idRecipe]]: ingredients } }));
    }
  }, [detailsAPI]);

  const handleClickStart = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(requestInProgress));
    setRequestInProgress({});
    history.push(`/${identRecipe}/${id}/in-progress`);
  };

  return (
    <div className="mealsContainer">
      <h3 data-testid="recipe-title">{ detailsAPI[title] }</h3>
      <img
        data-testid="recipe-photo"
        className="img"
        src={ detailsAPI[thumb] }
        alt=""
      />
      <Buttons linkCopy={ url } route={ route } />
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
          onClick={ handleClickStart }
        >
          { buttonName }

        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
