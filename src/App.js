import React from 'react';
import './App.css';
/* import rockGlass from './images/rockGlass.svg'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <RecipesProvider>
      <div className="meals">
        {/* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/meals/:id" component={ NotFound } />
          <Route exact path="/drinks/:id" component={ NotFound } />
          <Route exact path="/meals/:id/in-progress" component={ NotFound } />
          <Route exact path="/drinks/:id/in-progress" component={ NotFound } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </BrowserRouter>
        {/* <Login /> */}
      </div>
    </RecipesProvider>
  );
}

export default App;
