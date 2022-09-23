import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

const MIN_LENGTH = 6;

function Login() {
  const [isDisable, setIsDisable] = useState(true);
  const { inputEmail,
    inputPassword,
    setInputEmail,
    setInputPassword } = useContext(RecipesContext);

  const isButtonDisabled = ({ target }) => {
    const validPassword = inputPassword.length >= MIN_LENGTH;
    const validEmail = (/\S+@\S+\.\S+/).test(inputEmail);
    if (validEmail && validPassword) setIsDisable(false);
  };

  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          value={ inputEmail }
          onChange={ isButtonDisabled }
          type="text"
          data-testid="email-input"
          id="email"
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          value={ inputPassword }
          onChange={ isButtonDisabled }
          type="password"
          data-testid="password-input"
          id="password"
        />
      </label>

      <button type="button" data-testid="login-submit-btn" disabled={ isDisable }>
        Enter
      </button>
    </div>
  );
}

export default Login;
