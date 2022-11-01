import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import lS from 'manager-local-storage';

export default function Register() {
  const history = useHistory();
  const [apiError, setApiError] = useState('');
  const [newRegister, setNewRegister] = useState({ name: '', email: '', password: '' });
  const [registerIsvalid, setregisterIsvalid] = useState(false);
  const history = useHistory();

  const handleChanges = ({ id, value }) => {
    setNewRegister({ ...newRegister, [id]: value });
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const CREATED = 201;
    const response = await fetch(
      'http://localhost:3001/common/register',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newRegister),
      },
    );
    const registerData = await response.json();
    if (response.status !== CREATED) {
      return setApiError(registerData.message);
    }
    lS.set('user', registerData);
    history.push('/customer/products');
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
        setregisterIsvalid(true);
      } else {
        setregisterIsvalid(false);
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
            data-testid="common_register__input-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            onChange={ ({ target }) => handleChanges(target) }
            value={ newRegister.email }
            id="email"
            type="email"
            data-testid="common_register__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            onChange={ ({ target }) => handleChanges(target) }
            value={ newRegister.password }
            id="password"
            type="password"
            data-testid="common_register__input-password"
          />
        </label>
        { apiError
        && <p data-testid="common_register__element-invalid_register">{ apiError }</p> }
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ !registerIsvalid }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
