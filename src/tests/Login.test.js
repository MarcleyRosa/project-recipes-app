import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWith from './helpers/renderWith';

describe('Testa a aplicação', () => {
  test('Tela de login', () => {
    renderWith(<App />);
    const inputEmailElement = screen.getByTestId('email-input');
    const inputPasswordElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByRole('button', { name: /Enter/i });

    expect(inputEmailElement).toBeInTheDocument();
    expect(inputPasswordElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });
});
