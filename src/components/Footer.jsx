import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import meals from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer">
      <Link to="drinks" data-testid="drinks-bottom-btn">
        <img src={ drinks } alt="toDrinks" />
      </Link>

      <Link to="meals" data-testid="meals-bottom-btn">
        <img src={ meals } alt="toMeals" />
      </Link>
    </div>
  );
}

export default Footer;
