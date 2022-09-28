import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const [meals, setMeals] = useState([]);
  const { requestAPI } = useContext(RecipesContext);
  const title = 'Meals';
  useEffect(() => {
    setMeals(requestAPI.meals);
  }, [requestAPI]);
  return (
    <div className="mealsContainer">
      <Header headers={ title } isRoute />
      <SearchBar domain="themealdb" typeAPI="meals" />
      { meals.map((meal, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          <img
            className="img"
            src={ meal.strMealThumb }
            alt=""
            data-testid={ `${index}-card-img` }
          />
        </div>))}
      <Footer />
    </div>
  );
}

export default Meals;
