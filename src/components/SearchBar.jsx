import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ request }) {
  const { setUrlSelect, searchInput } = useContext(RecipesContext);
  const [nameSearch, setNameSearch] = useState('name');

  useEffect(() => {
    switch (nameSearch) {
    case 'ingredient':
      setUrlSelect('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
      break;
    case 'name':
      setUrlSelect('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      break;
    case 'first-letter':
      setUrlSelect('https://www.themealdb.com/api/json/v1/1/search.php?f=');
      break;
    default: break;
    }
  }, [nameSearch]);

  const handleClick = () => {
    if (nameSearch === 'first-letter' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    return request((prevState) => !prevState);
  };

  return (
    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          id="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          name="radio-input"
          value="ingredient"
          onClick={ ({ target: { value } }) => setNameSearch(value) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="radio"
          data-testid="name-search-radio"
          name="radio-input"
          value="name"
          onClick={ ({ target: { value } }) => setNameSearch(value) }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          id="first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-input"
          value="first-letter"
          onClick={ ({ target: { value } }) => setNameSearch(value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Enviar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  request: PropTypes.func.isRequired,
};

export default SearchBar;
