import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import yesFavorite from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

function Buttons({ linkCopy, route }) {
  const { detailsAPI } = useContext(RecipesContext);
  const [isShare, setIsShare] = useState(false);
  const history = useHistory();
  const [isFavorite, setIsFavorite] = useState(false);
  const [arrayFavorite, setArrayFavorite] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);

  const ids = history.location.pathname.split('/')[2];

  const domain = route ? 'Meal' : 'Drink';
  const typeRec = route ? 'meal' : 'drink';

  const alcolicOrNo = detailsAPI.strAlcoholic || '';
  const nation = detailsAPI.strArea || '';

  const favoriteRecipe = {
    id: detailsAPI[`id${domain}`],
    type: typeRec,
    nationality: nation,
    category: detailsAPI.strCategory,
    alcoholicOrNot: alcolicOrNo,
    name: detailsAPI[`str${domain}`],
    image: detailsAPI[`str${domain}Thumb`],
  };

  const shareClick = () => {
    copy(`http://localhost:3000${linkCopy}`);
    setIsShare(true);
  };

  // useEffect(() => {}, []);

  useEffect(() => {
    setIsFavorite(arrayFavorite?.some((fav) => +fav.id === +ids));
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorite));
  }, [arrayFavorite]);

  const favoriteClick = () => {
    if (isFavorite && favoriteRecipe.id) {
      const requestFavorite = arrayFavorite
        .filter((fav) => +fav.id !== +ids);
      setArrayFavorite(requestFavorite);
    } else if (favoriteRecipe.id) {
      setArrayFavorite((prevState) => [...prevState, favoriteRecipe]);
    }
  };

  return (
    <div>
      <button
        onClick={ shareClick }
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="" />

      </button>

      <button
        onClick={ favoriteClick }
        type="button"
        data-testid="favorite-btn"
        src={ isFavorite ? yesFavorite : notFavorite }
      >
        <img src={ isFavorite ? yesFavorite : notFavorite } alt="" />

      </button>
      { isShare && <p>Link copied!</p> }
    </div>
  );
}

Buttons.propTypes = {
  linkCopy: PropTypes.string.isRequired,
  route: PropTypes.bool.isRequired,
};

export default Buttons;
