import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderPath from './helpers/renderWith';

const meals = require('../../cypress/mocks/meals');

describe('Testa a aplicação', () => {
  test('Tela de login', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderPath('/');
    const inputEmailElement = screen.getByTestId('email-input');
    const inputPasswordElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByRole('button', { name: /Enter/i });

    act(() => {
      userEvent.type(inputEmailElement, 'luisfernandesneto@gmail.com');
      userEvent.type(inputPasswordElement, 'xablaus');
    });

    userEvent.click(buttonElement);

    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');

    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    act(() => {
      userEvent.click(searchButton);
    });
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

    act(() => {
      userEvent.type(inputSearch, 'Chicken');
      userEvent.click(ingredientRadio);
      userEvent.click(sendButton);
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
test.only('xablau', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(meals),
  });
  renderPath('/meals');

  const searchButton = screen.getByTestId('search-top-btn');
  act(() => {
    userEvent.click(searchButton);
  });
  const ingredientRadio = screen.getByTestId('ingredient-search-radio');
  const inputSearch = screen.getByTestId('search-input');
  const sendButton = screen.getByTestId('exec-search-btn');

  act(() => {
    userEvent.type(inputSearch, 'Corba');
    userEvent.click(ingredientRadio);
    userEvent.click(sendButton);
  });
  expect(ingredientRadio).toBeChecked();
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  /* const mealTitle = screen.getByText('Corba'); */
});
