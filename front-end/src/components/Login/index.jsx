import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Login(props) {
  const { history } = props;
  const [apiError, setApiError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChanges = ({ id, value }) => {
    setCredentials({ ...credentials, [id]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const NOT_FOUND = 404;
    const response = await fetch(
      'http://localhost:3001/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    );
    const userData = await response.json();
    if (response.status === NOT_FOUND) {
      return setApiError(userData.message);
    }
    localStorage.setItem('userData', JSON.stringify(userData));
    return history.push('/customer/products');
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
        {
          apiError
          && <p data-testid="common_login__element-invalid-email">{ apiError }</p>
        }
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
          data-testid="common_login__button-login"
          disabled={ !formIsValid }
        >
          Login
        </button>
        <Link to="/register">
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};