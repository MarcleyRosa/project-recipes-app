import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWith from './helpers/renderWith';

describe('Testa a aplicação', () => {
  test('Tela de profile', () => {
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

    userEvent.click(profileButton);

    const profiletitleElement = screen.getByRole('heading', { name: /Profile/i, level: 1 });
    expect(profiletitleElement).toBeInTheDocument();

    const emailElement = screen.getByRole('heading', { name: /email/i, level: 3 });
    expect(emailElement).toBeInTheDocument();

    const doneRecipesButton = screen.getByRole('button', { name: /Done Recipes/i });
    const favoriteRecipesButton = screen.getByRole('button', { name: /Favorite Recipes/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipesButton).toBeInTheDocument();
    expect(favoriteRecipesButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(doneRecipesButton);

    const doneRecipesTitle = screen.getByRole('heading', { name: /Done Recipes/i, level: 1 });
    expect(doneRecipesTitle).toBeInTheDocument();
  });
});
