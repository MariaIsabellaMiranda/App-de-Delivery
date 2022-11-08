import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUser } from '../../redux/actions/userAction';
import easyFetch from '../../helpers/easyFetch';
import dataTestIds from '../../helpers/dataTestIds';
import { validateLogin } from '../../helpers/validateAccess';

function Login({ dispatch }) {
  const history = useHistory();
  const [apiError, setApiError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChanges = ({ id, value }) => {
    const newValue = { ...credentials, [id]: value };
    setCredentials(newValue);
    setFormIsValid(validateLogin(newValue));
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
