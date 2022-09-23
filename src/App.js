import React from 'react';
import './App.css';
/* import rockGlass from './images/rockGlass.svg'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
<<<<<<< HEAD
    <RecipesProvider>
      <div className="meals">
        {/* <span className="logo">TRYBE</span>
=======
    <div className="meals">
      <span className="logo">TRYBE 2.0</span>
>>>>>>> origin
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
        <Login />
      </div>
    </RecipesProvider>
  );
}

export default App;
