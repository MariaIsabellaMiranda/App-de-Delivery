import lS from 'manager-local-storage';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [apiError, setApiError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChanges = ({ id, value }) => {
    setCredentials({ ...credentials, [id]: value });
  };

  const handleRedirect = (role) => {
    const routes = {
      customer: '/customer/products',
      seller: '/seller/orders',
      administrator: '/admin/manage',
    };
    history.push(routes[role]);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const OK = 200;
    const response = await fetch('http://localhost:3001/common/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const userData = await response.json();
    if (response.status !== OK) {
      return setApiError(userData.message);
    }
    lS.set('user', userData);
    return handleRedirect(userData.role);
  };

  useEffect(() => {
    const validateForm = () => {
      const minLengthPassword = 6;
      const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const emailIsValid = emailFormat.test(credentials.email);
      const passwordIsValid = credentials.password.length >= minLengthPassword;
      if (emailIsValid && passwordIsValid) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    };
    validateForm();
  }, [credentials]);

  return (
    <div>
      <form onSubmit={ onSubmitForm }>
        <label htmlFor="email">
          Login:
          <input
            onChange={ ({ target }) => handleChanges(target) }
            value={ credentials.email }
            id="email"
            type="email"
            data-testid="common_login__input-email"
          />
        </label>
        {apiError && (
          <p data-testid="common_login__element-invalid-email">{apiError}</p>
        )}
        <label htmlFor="password">
          Senha:
          <input
            onChange={ ({ target }) => handleChanges(target) }
            value={ credentials.password }
            id="password"
            type="password"
            data-testid="common_login__input-password"
          />
        </label>
        <button
          type="submit"
          value="Login"
          data-testid="common_login__button-login"
          disabled={ !formIsValid }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}
