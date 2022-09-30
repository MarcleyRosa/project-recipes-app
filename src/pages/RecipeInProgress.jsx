import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import Buttons from '../components/Buttons';

function RecipeInProgress({ history }) {
  const { typeInProgress } = useContext(RecipesContext);
  const [checkbox, setCheckbox] = useState();
  const recInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const ingredients = Object.entries(recInProgress)
    .filter((e) => e[0].includes('strIngredient'))
    .filter((ev) => ev[1]?.length).map((elem) => elem[1]);

  const handleChecked = () => {
    if (checkbox === false) {
      setCheckbox(true);
    } else {
      setCheckbox(false);
    }
  };

  const handleClick = () => {
    history.push('/done-recipes');
  };

  return (
    <div>
      <p data-testid="recipe-title">
        { typeInProgress === 'drinks' ? recInProgress.strDrink : recInProgress.strMeal }
      </p>
      <img
        className="img"
        src={ typeInProgress === 'drinks'
          ? recInProgress.strDrinkThumb : recInProgress.strMealThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <Buttons />
      <h3 data-testid="recipe-category">{recInProgress.strCategory}</h3>
      { typeInProgress === 'drinks' && <p>{recInProgress.strAlcoholic}</p> }
      <p data-testid="instructions">{recInProgress.strInstructions}</p>

      { ingredients.map((ingredient, index) => (
        <div key={ index }>
          <input
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
            onChange={ handleChecked }
          />
          {`${ingredient}: ${typeInProgress[`strMeasure${index + 1}`]}`}
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
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
