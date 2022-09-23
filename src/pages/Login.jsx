import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="email">
        Email.
        <input type="text" data-testid="email-input" id="email" />
      </label>

      <label htmlFor="password">
        Senha
        <input type="password" data-testid="password-input" id="password" />
      </label>

      <button type="button" data-testid="login-submit-btn">
        Enter
      </button>
    </div>
  );
}

export default Login;
