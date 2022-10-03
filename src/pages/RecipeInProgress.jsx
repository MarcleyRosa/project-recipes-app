import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import Buttons from '../components/Buttons';
import '../App.css';

function RecipeInProgress({ history, match: { path, params: { id } } }) {
  const { typeInProgress, detailsAPI } = useContext(RecipesContext);
  //   const [checkbox, setCheckbox] = useState();

  const [ingredients, setIngredients] = useState([]);

  const typeRecipe = path.includes('meals') ? 'meals' : 'drinks';

  //   const amount = Object.entries(detailsAPI)
  //     .filter((e) => e[0].includes('strIngredient'))
  //     .filter((ev) => ev[1]?.length).map((elem) => elem[1]);

  const recInProgress = JSON.parse(localStorage
    .getItem('inProgressRecipes')) || {};

  useEffect(() => {
    if (recInProgress[typeRecipe]) setIngredients(recInProgress[typeRecipe][id]);
  }, [detailsAPI]);

  console.log(recInProgress);

  const handleChecked = ({ target: { checked, name } }) => {
    console.log(checked);
    console.log(name);
  };

  const handleClick = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      <p data-testid="recipe-title">
        { typeInProgress === 'drinks' ? detailsAPI.strDrink : detailsAPI.strMeal }
      </p>
      <img
        className="img"
        src={ typeInProgress === 'drinks'
          ? detailsAPI.strDrinkThumb : detailsAPI.strMealThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <Buttons />
      <h3 data-testid="recipe-category">{detailsAPI.strCategory}</h3>
      { typeInProgress === 'drinks' && <p>{detailsAPI.strAlcoholic}</p> }
      <p data-testid="instructions">{detailsAPI.strInstructions}</p>

      { ingredients?.map((ingredient, index) => (
        <div key={ index }>
          <label
            className="riscar"
            htmlFor="ingredientstep"
          >
            {`${ingredient}: ${detailsAPI[`strMeasure${index + 1}`]}`}
            <input
              id="ingredientstep"
              data-testid={ `${index}-ingredient-step` }
              type="checkbox"
              name={ ingredient }
              onChange={ handleChecked }
            />
          </label>
        </div>
      ))}

      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
