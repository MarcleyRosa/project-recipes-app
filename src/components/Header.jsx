import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ headers, isRoute }) {
  const [showSearch, setShowSearch] = useState(false);

  const showOrHide = () => setShowSearch((prevState) => !prevState);

  return (
    <div>
      <h1 data-testid="page-title">{ headers }</h1>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      </Link>
      <button type="button" onClick={ showOrHide }>
        { isRoute && <img data-testid="search-top-btn" src={ searchIcon } alt="" /> }
        { showSearch && <input type="text" data-testid="search-input" />}
      </button>
    </div>
  );
}

Header.propTypes = {
  headers: PropTypes.string.isRequired,
  isRoute: PropTypes.bool.isRequired,
};

export default Header;
