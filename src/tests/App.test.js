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

    const pageElement = screen.getByTestId('page-title');
    expect(pageElement).toBeInTheDocument();

    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.click(profileButton);

    const profilePageTitle = screen.getByTestId('page-title');
    expect(profilePageTitle).toBeInTheDocument();
  });
  /*  test('Tela Search', () => {
    render(<App />);
    const inputEmailElement = screen.getByTestId('email-input');
    expect(inputEmailElement).toBeInTheDocument();
  }); */
});
