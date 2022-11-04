import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import easyFetch from '../../helpers/fetch';
import { loginUser } from '../../redux/actions/userAction';
import dataTestIds from '../../helpers/dataTestIds';

function Register({ dispatch }) {
  const [apiError, setApiError] = useState('');
  const [newRegister, setNewRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registerIsValid, setRegisterIsValid] = useState(false);

  const handleChanges = ({ id, value }) => {
    setNewRegister({ ...newRegister, [id]: value });
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

  useEffect(() => {
    const validateForm = () => {
      const minLengthName = 12;
      const minLengthPassword = 6;
      const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const emailIsValid = emailFormat.test(newRegister.email);
      const nameIsValid = newRegister.name.length >= minLengthName;
      const passwordIsValid = newRegister.password.length >= minLengthPassword;
      if (emailIsValid && passwordIsValid && nameIsValid) {
        setRegisterIsValid(true);
      } else {
        setRegisterIsValid(false);
      }
    };
    validateForm();
  }, [newRegister]);

  return (
    <div>
      <form onSubmit={ onSubmitRegister }>
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
        {apiError && (
          <p data-testid={ dataTestIds('10') }>
            {apiError}
          </p>
        )}
        <button
          type="submit"
          data-testid={ dataTestIds('9') }
          disabled={ !registerIsValid }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default connect()(Register);

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
