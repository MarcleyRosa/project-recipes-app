import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mealIngredients } from '../../cypress/mocks/japaneseMeals';
import renderWith from './helpers/renderWith';

/* const alert = global.alert('Sorry, we haven\'t found any recipes for these filters.'); */

describe('Testa a aplicação', () => {
  test('Tela de login', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });
    renderWith(<App />);
    const inputEmailElement = screen.getByTestId('email-input');
    const inputPasswordElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByRole('button', { name: /Enter/i });

    userEvent.type(inputEmailElement, 'luisfernandesneto@gmail.com');
    userEvent.type(inputPasswordElement, 'xablaus');
    userEvent.click(buttonElement);

    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const inputSearch = screen.getByTestId('search-input');

    expect(inputSearch).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    const sendButton = screen.getByTestId('exec-search-btn');
    expect(sendButton).toBeInTheDocument();

    userEvent.type(inputSearch, 'Chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(sendButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
