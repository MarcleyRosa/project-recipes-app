
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { requestAPI } = useContext(RecipesContext);
  const title = 'Drinks';
  const maxRenderRecipe = 11;
  console.log(requestAPI);
  return (
    <div>
      <Header headers={ title } isRoute />
      <SearchBar domain="thecocktaildb" typeAPI="drinks" />
      { requestAPI.drinks.map((drink, index) => (
        index <= maxRenderRecipe && (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            <img src={ drink.strDrinkThumb } alt="" data-testid={ `${index}-card-img` } />
          </div>)
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
