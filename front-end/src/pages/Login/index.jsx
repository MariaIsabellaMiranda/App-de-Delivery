import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUser } from '../../redux/actions/userAction';
import easyFetch from '../../helpers/fetch';
import dataTestIds from '../../helpers/dataTestIds';

function Login({ dispatch }) {
  const history = useHistory();
  const [apiError, setApiError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChanges = ({ id, value }) => {
    setCredentials({ ...credentials, [id]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const OK = 200;
    const response = await easyFetch(
      'http://localhost:3001/common/login',
      {},
      'POST',
      credentials,
    );
    const userData = await response.json();
    if (response.status !== OK) {
      return setApiError(userData.message);
    }
    dispatch(loginUser(userData));
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
            data-testid={ dataTestIds('1') }
          />
        </label>
        {apiError && (
          <p data-testid={ dataTestIds('5') }>{apiError}</p>
        )}
        <label htmlFor="password">
          Senha:
          <input
            onChange={ ({ target }) => handleChanges(target) }
            value={ credentials.password }
            id="password"
            type="password"
            data-testid={ dataTestIds('2') }
          />
        </label>
        <button
          type="submit"
          value="Login"
          data-testid={ dataTestIds('3') }
          disabled={ !formIsValid }
        >
          Login
        </button>
        <button
          type="button"
          value="Register"
          data-testid={ dataTestIds('4') }
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
