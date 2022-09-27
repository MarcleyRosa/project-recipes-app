import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const { searchInput, urlSelect } = useContext(RecipesContext);
  const [requestAPI, setRequestAPI] = useState([]);
  const [isRequest, setIsRequest] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${urlSelect}${searchInput}`);
      const json = await response.json();
      setRequestAPI(json);
    };
    fetchApi();
  }, [isRequest, requestAPI]);

  const title = 'Meals';
  return (
    <div>
      <Header headers={ title } isRoute />
      <SearchBar request={ setIsRequest } />
      <Footer />
    </div>
  );
}

export default Meals;
