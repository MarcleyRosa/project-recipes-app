import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';

const mockStorage = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];

describe('Testa a aplicação', () => {
  test('Tela de profile', () => {
    renderPath('/profile');
    const profiletitleElement = screen.getByRole('heading', { name: /Profile/i, level: 1 });
    expect(profiletitleElement).toBeInTheDocument();

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();

    const doneRecipesButton = screen.getByRole('button', { name: /Done Recipes/i });
    const favoriteRecipesButton = screen.getByRole('button', { name: /Favorite Recipes/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipesButton).toBeInTheDocument();
    expect(favoriteRecipesButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(favoriteRecipesButton);

    const favoriteRecipesTitle = screen.getByRole('heading', { name: /favorite Recipes/i, level: 1 });
    expect(favoriteRecipesTitle).toBeInTheDocument();
  });
  test('Favorite recipes', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockStorage));

    renderPath('favorite-recipes');
    const favoriteRecipe = screen.getByTestId('0-horizontal-image');
    expect(favoriteRecipe).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteButton);
    /* expect(favoriteRecipe).not.toBeInTheDocument(); */
  });
});
