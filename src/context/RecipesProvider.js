import propTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [state, setState] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [urlSelect, setUrlSelect] = useState('');
  const [requestAPI, setRequestAPI] = useState({ drinks: [], meals: [] });
  const [isRequest, setIsRequest] = useState(false);

  const contextType = { state,
    setState,
    inputPassword,
    setInputPassword,
    setInputEmail,
    inputEmail,
    searchInput,
    setSearchInput,
    urlSelect,
    setUrlSelect,
    requestAPI,
    setRequestAPI,
    isRequest,
    setIsRequest,
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
