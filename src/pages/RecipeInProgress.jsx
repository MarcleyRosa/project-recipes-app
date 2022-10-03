// import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';
// import RecipesContext from '../context/RecipesContext';
// import Buttons from '../components/Buttons';

// function RecipeInProgress({ history, match: { url, path, params: { id } } }) {
//   const { typeInProgress } = useContext(RecipesContext);
//   const [checkbox, setCheckbox] = useState();
//   // const [inProgess, setInProgress] = useState(JSON
//   //   .parse(localStorage.getItem('inProgressRecipes')) || {});

//   const route = path.includes('meals');

//   // const mealsOrDrinks = path.includes('meals') ? 'meals' : 'drinks';

//   // const InProgress
//   // const ingredients = inProgess[mealsOrDrinks]
//   //   .map((ingredient) => Object.keys(ingredient) === id);

//   const inProgess = [];

//   console.log(id);

//   const handleChecked = () => {
//     if (checkbox === false) {
//       setCheckbox(true);
//     } else {
//       setCheckbox(false);
//     }
//   };

//   const handleClick = () => {
//     history.push('/done-recipes');
//   };

//   return (
//     <div>
//       <p data-testid="recipe-title">
//         { typeInProgress === 'drinks' ? inProgess.strDrink : inProgess.strMeal }
//       </p>
//       <img
//         className="img"
//         src={ typeInProgress === 'drinks'
//           ? inProgess.strDrinkThumb : inProgess.strMealThumb }
//         alt=""
//         data-testid="recipe-photo"
//       />
//       <Buttons linkCopy={ url } route={ route } />
//       <h3 data-testid="recipe-category">{inProgess.strCategory}</h3>
//       { typeInProgress === 'drinks' && <p>{inProgess.strAlcoholic}</p> }
//       <p data-testid="instructions">{inProgess.strInstructions}</p>

//       { ingredients.map((ingredient, index) => (
//         <label
//           key={ index }
//           data-testid={ `${index}-ingredient-step` }
//           htmlFor="ingredient"
//         >
//           {`${ingredient}: ${typeInProgress[`strMeasure${index + 1}`]}`}
//           <input
//             id="igredient"
//             type="checkbox"
//             onChange={ handleChecked }
//           />
//         </label>
//       ))}

//       <button
//         type="button"
//         data-testid="finish-recipe-btn"
//         onClick={ handleClick }
//       >
//         Finalizar Receita
//       </button>
//     </div>
//   );
// }

// RecipeInProgress.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   match: PropTypes.shape({
//     url: PropTypes.string,
//     path: PropTypes.string,
//     params: PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   }).isRequired,
// };

// export default RecipeInProgress;
