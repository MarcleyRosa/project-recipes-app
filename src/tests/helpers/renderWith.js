import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWith = (
  component, // componente a ser renderizado
  {
    // estado inicial para o nosso reduce

    // caso você passe uma store por parâmetro ela será utilizada
    // caso contrário vai chamar a função createStore e criar uma nova

    // rota inicial da nossa aplicação
    initialEntries = ['/'],

    // caso você passe um history por parâmetro ele será utilizado
    // caso contrário vai chamar a função createMemotryHistory e criar um novo
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({ // arrow function que retorna um objeto

  // spread do retorno do render { getByTestId, getByRole, etc }
  ...render(
    <Router history={ history }>
      {component}
    </Router>,
  ),

  // history usado acima
  history,

  // store usada acima
});

export default renderWith;
