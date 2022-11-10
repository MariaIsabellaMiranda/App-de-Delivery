import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import easyFetch from '../../helpers/easyFetch';
import { loginUser } from '../../redux/actions/userAction';
import dataTestIds from '../../helpers/dataTestIds';
import { validateRegister } from '../../helpers/validateAccess';
import logo from '../../helpers/logo';
import './styles/Register.css';

function Register({ dispatch }) {
  const history = useHistory();
  const [apiError, setApiError] = useState('');
  const [newRegister, setNewRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registerIsValid, setRegisterIsValid] = useState(false);

  const handleChanges = ({ id, value }) => {
    const newValues = { ...newRegister, [id]: value };
    setNewRegister(newValues);
    setRegisterIsValid(validateRegister(newValues));
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const CREATED = 201;
    const response = await easyFetch(
      'http://localhost:3001/common/register',
      {},
      'POST',
      newRegister,
    );
    const registerData = await response.json();
    if (response.status !== CREATED) {
      return setApiError(registerData.message);
    }
    dispatch(loginUser(registerData));
  };

  return (
    <div className="_page_register">
      <form onSubmit={ onSubmitRegister } className="_register_form">
        <Icon icon={ logo } className="_logo" />
        <div className="_inputs_area">
          <label htmlFor="name">
            Nome:
            <input
              onChange={ ({ target }) => handleChanges(target) }
              value={ newRegister.name }
              id="name"
              type="text"
              data-testid={ dataTestIds('6') }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              onChange={ ({ target }) => handleChanges(target) }
              value={ newRegister.email }
              id="email"
              type="email"
              data-testid={ dataTestIds('7') }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              onChange={ ({ target }) => handleChanges(target) }
              value={ newRegister.password }
              id="password"
              type="password"
              data-testid={ dataTestIds('8') }
            />
          </label>
        </div>
        {apiError && (
          <p data-testid={ dataTestIds('10') } className="_error_message">
            {apiError}
          </p>
        )}
        <button
          type="submit"
          data-testid={ dataTestIds('9') }
          disabled={ !registerIsValid }
          className="_btn_login"
        >
          Cadastrar
        </button>
        <span className="_btn_register">
          Já possui uma conta?
          <button
            type="button"
            value="Register"
            data-testid={ dataTestIds('4') }
            onClick={ () => history.push('/login') }
          >
            Entre.
          </button>
        </span>
      </form>
    </div>
  );
}

export default connect()(Register);

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
