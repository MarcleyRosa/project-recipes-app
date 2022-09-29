import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';

const mockValue = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(meals),
  });
};

const cardImg = '0-card-img';

describe('Testa a aplicação', () => {
  test('Tela de login', async () => {
    mockValue();
    renderPath('/meals');
    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    const sendButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'Onion');
    userEvent.click(ingredientRadio);
    userEvent.click(sendButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

    const ingredientElement = await screen.findByTestId(cardImg);
    expect(ingredientElement).toBeInTheDocument();

    userEvent.type(inputSearch, 'Chicken');
    userEvent.click(nameRadio);
    userEvent.click(sendButton);

    const nameElement = await screen.findByTestId(cardImg);
    expect(nameElement).toBeInTheDocument();

    userEvent.type(inputSearch, 'Chicken');
    userEvent.click(firstLetterRadio);
    userEvent.click(sendButton);

    const firstLetterElement = await screen.findByTestId(cardImg);
    expect(firstLetterElement).toBeInTheDocument();
  });
  test('Test NotFound', () => {
    renderPath('/meals/52977');
    const textElement = screen.getByText(/NotFound/i);
    expect(textElement).toBeInTheDocument();
  });
});
describe('Testa a aplicação', () => {
  test('Tela de login', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal).mockResolvedValueOnce(meals),
    });
    const { history } = renderPath('/meals');
    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();

    const nameRadio = screen.getByTestId('name-search-radio');

    const sendButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'Corba');
    userEvent.click(nameRadio);
    userEvent.click(sendButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });
});
