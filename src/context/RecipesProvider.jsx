import propTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [state, setState] = useState('');

  const contextType = {
    state,
    setState,
  };

  return (
    <RecipesContext.Provider value={ contextType }>
      {children}
    </RecipesContext.Provider>

  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};
