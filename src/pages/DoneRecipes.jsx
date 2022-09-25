import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const title = 'Done Recipes';
  return (
    <div>
      <Header headers={ title } isRoute={ false } />
    </div>
  );
}

export default DoneRecipes;
