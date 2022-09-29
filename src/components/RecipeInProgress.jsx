import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

function RecipeInProgress({ typeAPI }) {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  const urlMeals = `www.themealdb.com/api/json/ v1/1/lookup.php?i=${id}`;
  const urlDrinks = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = typeAPI === 'drinks' ? urlDrinks : urlMeals;

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setRecipe(json);
    };
    fetchAPI();
  }, []);

  return (
    <div>
      <p data-testid="recipe-title">
        { typeAPI === 'drinks' ? recipe?.strDrink : recipe?.strMeal }
      </p>
      <img
        className="img"
        src={ typeAPI === 'drinks' ? recipe?.strDrinkThumb : recipe?.strMealThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h3 data-testid="recipe-category">{recipe?.strCategory}</h3>
      { typeAPI === 'drinks' && <p>{recipe?.strAlcoholic}</p> }
      <p data-testid="instructions">{recipe?.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  typeAPI: PropTypes.string,
};

RecipeInProgress.defaultProps = {
  typeAPI: PropTypes.string,
};

export default RecipeInProgress;
