import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  const contextType = {
    inputEmail,
  };

  useEffect(() => {

  }, [inputEmail]);

  return (
    <RecipesContext.Provider value={ contextType }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RecipesProvider;
