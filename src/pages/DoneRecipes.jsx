import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [isShare, setIsShare] = useState(false);
  const getStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const array = getStorage === null ? [] : getStorage;
  const [filter, setFilter] = useState(array);
  const title = 'Done Recipes';

  const shareClick = ({ target }) => {
    const { name } = target;
    copy(`http://localhost:3000${name}`);
    setIsShare(true);
  };

  const filterClick = ({ target }) => {
    const { name } = target;
    if (filter.length > 0) {
      const newFilter = array.filter((ele) => ele.type === name);
      const saveFilter = name === 'all' ? array : newFilter;
      setFilter(saveFilter);
    }
  };

  return (
    <div>
      <Header headers={ title } isRoute={ false } />
      <button
        type="button"
        name="meal"
        onClick={ filterClick }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        type="button"
        name="drink"
        onClick={ filterClick }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <button
        type="button"
        name="all"
        onClick={ filterClick }
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      {filter.map((rec, index) => (
        <div key={ index }>
          <Link to={ rec.link }>
            <img
              src={ rec.image }
              alt={ rec.name }
              width="100px"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { rec.type === 'meal'
              ? `${rec.nationality} - ${rec.category}`
              : rec.alcoholicOrNot }
          </p>
          <Link to={ rec.link }>
            <p data-testid={ `${index}-horizontal-name` }>{ rec.name }</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{ rec.doneDate }</p>
          <button
            type="button"
            src={ shareIcon }
            onClick={ shareClick }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="share button" name={ rec.link } />
          </button>
          { rec.tags.map((ele) => (
            <p key={ ele } data-testid={ `${index}-${ele}-horizontal-tag` }>{ ele }</p>
          )) }
        </div>
      ))}
      { isShare ? <p>Link copied!</p> : ''}
    </div>
  );
}

export default DoneRecipes;
