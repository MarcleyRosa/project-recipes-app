import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          data-testid="search-input"
          name="search"
          value=""
          onChange=""
        />
      </label>
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="radio-input"
          value="ingredient"
          checked=""
          onChange=""
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="radio-input"
          value="name"
          checked=""
          onChange=""
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-input"
          value="first-letter"
          checked=""
          onChange=""
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Enviar
      </button>
    </div>
  );
}

export default SearchBar;
