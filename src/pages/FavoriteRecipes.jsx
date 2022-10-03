import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import yesFavorite from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const title = 'Favorite Recipes';

  const recipesFavorites = JSON.parse(localStorage
    .getItem('favoriteRecipes')) || [];

  const removeStorage = ({ target }) => {
    const { name } = target;

    const filterRecFavorite = recipesFavorites.filter((rec) => rec.name !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecFavorite));
  };

  return (
    <div>
      <Header headers={ title } isRoute={ false } />

      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      {recipesFavorites.map((rec, index) => (
        <div key={ index }>
          <img
            src={ rec.image }
            alt={ rec.name }
            width="100px"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>{ rec.name }</p>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { rec.type === 'meal'
              ? `${rec.nationality} - ${rec.category}` : rec.alcoholicOrNot }

          </p>
          <button
            type="button"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="share button" />
          </button>

          <button
            type="button"
            src={ yesFavorite }
            data-testid={ `${index}-horizontal-favorite-btn` }
            name={ rec.name }
            onCick={ removeStorage }
          >
            <img src={ yesFavorite } alt="favorite button" />

          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
