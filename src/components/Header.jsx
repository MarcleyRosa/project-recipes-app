import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ headers, isRoute }) {
  return (
    <div>
      <h1 data-testid="page-title">{ headers }</h1>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      </Link>
      <Link to="/search">
        { isRoute && <img data-testid="search-top-btn" src={ searchIcon } alt="" /> }
      </Link>
    </div>
  );
}

Header.propTypes = {
  headers: PropTypes.string.isRequired,
  isRoute: PropTypes.bool.isRequired,
};

export default Header;
