import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function Buttons({ linkCopy }) {
  console.log(linkCopy);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClick = () => {
    copy(`http://localhost:3000${linkCopy}`);
    setIsFavorite(true);
  };
  return (
    <div>
      <button
        onClick={ handleClick }
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="" />

      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ favoriteIcon } alt="" />

      </button>
      { isFavorite && <p>Link copied!</p> }
    </div>
  );
}

Buttons.propTypes = {
  linkCopy: PropTypes.string.isRequired,
};

export default Buttons;
