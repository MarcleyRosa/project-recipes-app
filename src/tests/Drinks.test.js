import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a aplicação', () => {
  test('Tela de profile', () => {
    render(<App />);
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
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();

    userEvent.click(drinksButton);

    const drinksTitle = screen.getByRole('heading', { name: /Drinks/i, level: 1 });
    expect(drinksTitle).toBeInTheDocument();
  });
});
