import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const title = 'Favorite Recipes';
  return (
    <div>
      <Header headers={ title } isRoute={ false } />
    </div>
  );
}

export default FavoriteRecipes;
