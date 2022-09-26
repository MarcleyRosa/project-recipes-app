import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa a aplicação', () => {
  test('Tela de login', () => {
    render(<App />);
    const inputEmailElement = screen.getByTestId('email-input');
    const inputPasswordElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByRole('button', { name: /Enter/i });

    expect(inputEmailElement).toBeInTheDocument();
    expect(inputPasswordElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });
});
