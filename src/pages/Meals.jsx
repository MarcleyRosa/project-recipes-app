import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const { requestAPI } = useContext(RecipesContext);
  
  const title = 'Meals';
  return (
    <div>
      <Header headers={ title } isRoute />
      <SearchBar domain="themealdb" typeAPI="meals" />
      { requestAPI.meals.map((meal, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          <img src={ meal.strMealThumb } alt="" data-testid={ `${index}-card-img` } />
        </div>))}
      <Footer />
    </div>
  );
}

export default Meals;
