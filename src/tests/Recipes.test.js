import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';

describe('Testa os requisitos finais', () => {
  test('Acessa os botões', async () => {
    /* const { history } = renderPath('/meals');
    await waitFor(() => expect(screen.getByText(/corba/i)).toBeInTheDocument(), { timeout: 10000 });
    const corba = screen.getByTestId('0-card-img');
    userEvent.click(corba);
    const details = screen.getByTestId('instructions');
    await waitFor(() => expect(details.innerHTML).not.toBe(''), { timeout: 10000 });
    const favorite = screen.getByTestId('favorite-btn');
    userEvent.click(favorite);
    history.push('/meals');
    const toDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(toDrinks);
    /* const loucura = screen.getByText('hemos');
    const drinkContainer = screen.getByTestId('instructions');
    await waitFor(() => expect(details.innerHTML).not.toBe(''), { timeout: 10000 });
    /* const ordinary = screen.getByTestId('Ordinary Drink-category-filter');
    await waitFor(() => expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument(), { timeout: 10000 });
    const buttons = screen.getAllByRole('button');
    expect(ordinaryDrink).toBeInTheDocument();
    userEvent.click(ordinaryDrink);
    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    userEvent.click(screen.getByRole('button', { name: 'Favorite Recipes' }));
    console.log(history);
    console.log(localStorage.getItem('favoriteRecipes')); */
  });
});
