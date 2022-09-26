import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa a aplicação', () => {
  test('Tela de login', () => {
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

    userEvent.type(inputSearch, 'aaa');
    userEvent.click(firstLetterRadio);
    userEvent.click(sendButton);

    userEvent.type(inputSearch, 'fish');
    userEvent.click(nameRadio);
    userEvent.click(sendButton);

    userEvent.type(inputSearch, 'rice');
    userEvent.click(ingredientRadio);
    userEvent.click(sendButton);
    expect(sendButton).toBeInTheDocument();
  });
});
