import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const array = [];
  const title = 'Done Recipes';
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

      {array.map((rec, index) => (
        <div key={ index }>
          <img src={ rec } alt={ rec } data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>{ rec }</p>
          <p data-testid={ `${index}-horizontal-name` }>{ rec }</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{ rec }</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Share
          </button>
          { /* <p data-testid={ `${index}-${tagName}-horizontal-tag` }>Tags</p> */ }
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
