import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinks from '../../cypress/mocks/drinks';

const elementSearch = 'search-top-btn';
const elementInput = 'search-input';
const elementNameRadio = 'name-search-radio';
const elementButton = 'exec-search-btn';

const mockValue = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(meals),
  });
};

const cardImg = '0-card-img';

describe('Testa a meals', () => {
  test('Tela meals', async () => {
    mockValue();
    renderPath('/meals');
    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const searchButton = screen.getByTestId(elementSearch);

    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId(elementInput);
    expect(inputSearch).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(elementNameRadio);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    const sendButton = screen.getByTestId(elementButton);

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
});
describe('Testa meals', () => {
  test('Tela one meal', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal).mockResolvedValueOnce(meals),
    });
    const { history } = renderPath('/meals');
    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const searchButton = screen.getByTestId(elementSearch);

    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId(elementInput);
    expect(inputSearch).toBeInTheDocument();

    const nameRadio = screen.getByTestId(elementNameRadio);

    const sendButton = screen.getByTestId(elementButton);

    userEvent.type(inputSearch, 'Corba');
    userEvent.click(nameRadio);
    userEvent.click(sendButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });
});
describe('Testa o componente recipes', () => {
  test('Testa a requisição de APIs', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealCategories),
    });
    renderPath('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const beefElement = await screen.findByTestId('Vegetarian-category-filter');
    userEvent.click(beefElement);
    userEvent.click(beefElement);
    const allButton = screen.getByTestId('All-category-filter');
    userEvent.click(allButton);
    userEvent.click(beefElement);
    const beefMealButton = await screen.findByText('Beef and Mustard Pie');
    userEvent.click(beefMealButton);
    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });
});

describe('Testa o componente recipes', () => {
  test('Testa a requisição de APIs', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks)
        .mockResolvedValueOnce(oneMeal),
    });
    renderPath('/meals/52771');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const firstIngredient = await screen.findByText(/penne rigate/i);
    expect(firstIngredient).toBeInTheDocument();
    // const startButton = screen.getByTestId('start-recipe-btn');
    // userEvent.click(startButton);
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');
    userEvent.click(screen.getByTestId('share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteButton);
    // expect(favoriteButton.children[0]).toHaveProperty('src', 'http://localhost/meals/52771/whiteHeartIcon.svg');
  });
});
