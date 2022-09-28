import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ domain, typeAPI }) {
  const { setUrlSelect, searchInput, urlSelect,
    setRequestAPI, requestAPI } = useContext(RecipesContext);
  const [nameSearch, setNameSearch] = useState('');
  const [isRequest, setIsRequest] = useState(false);
  const history = useHistory();

  useEffect(() => {
    switch (nameSearch) {
    case 'ingredient':
      setUrlSelect(`https://www.${domain}.com/api/json/v1/1/filter.php?i=`);
      break;
    case 'name':
      setUrlSelect(`https://www.${domain}.com/api/json/v1/1/search.php?s=`);
      break;
    default: setUrlSelect(`https://www.${domain}.com/api/json/v1/1/search.php?f=`);
      break;
    }
  }, [nameSearch]);

  useEffect(() => {
    const fetchApi = async () => {
      if (nameSearch.length || urlSelect.length) {
        const response = await fetch(`${urlSelect}${searchInput}`);
        const json = await response.json();
        if (json?.meals || json?.drinks) setRequestAPI(json);
        else global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    fetchApi();
  }, [isRequest, urlSelect]);

  useEffect(() => {
    if (requestAPI[typeAPI]?.length === 1) {
      const ids = typeAPI === 'meals' ? 'idMeal' : 'idDrink';
      history.push(`/${typeAPI}/${requestAPI[typeAPI][0][ids]}`);
    }
  }, [isRequest, requestAPI]);

  const handleClick = () => {
    if (nameSearch === 'first-letter' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    setIsRequest((prevState) => !prevState);
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
  domain: PropTypes.string.isRequired,
  typeAPI: PropTypes.string.isRequired,
};

export default SearchBar;
