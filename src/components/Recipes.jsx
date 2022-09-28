import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Recipes({ typeAPI }) {
  const { requestAPI } = useContext(RecipesContext);
  const [categoryAPI, setCategoryAPI] = useState('');

  const maxRenderRecipe = 11;
  const maxRenderCategory = 5;
  const thumb = typeAPI === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameRecipe = typeAPI === 'meals' ? 'strMeal' : 'strDrink';
  const urlCategoryMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlCategoryDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    const url = typeAPI === 'drinks' ? urlCategoryDrinks : urlCategoryMeals;
    const fetchAPI = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setCategoryAPI(json);
    };
    fetchAPI();
  }, []);

  return (
    <div>
      { categoryAPI[typeAPI]?.map((category, index) => (
        index < maxRenderCategory && (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            type="button"
          >
            {category.strCategory}

          </button>
        )
      ))}
      { requestAPI[typeAPI]?.map((recipe, index) => (
        index <= maxRenderRecipe && (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{recipe[nameRecipe]}</p>
            <img
              className="img"
              src={ recipe[thumb] }
              alt=""
              data-testid={ `${index}-card-img` }
            />
          </div>)
      ))}
    </div>
  );
}

Recipes.propTypes = {
  typeAPI: PropTypes.string.isRequired,
};

export default Recipes;
