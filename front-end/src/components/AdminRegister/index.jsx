import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import easyFetch from '../../helpers/easyFetch';
import { validateRegister } from '../../helpers/validateAccess';
import dataTestId from '../../helpers/dataTestIds';
import './styles/AdminRegister.css';

function AdminRegister({ token, updateUsers }) {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [validRegister, setValidRegister] = useState(false);
  const [errorRegister, setErrorRegister] = useState('');

  const handleChange = ({ target }) => {
    const newValues = { ...registerData, [target.name]: target.value };
    setRegisterData(newValues);
    setValidRegister(validateRegister(newValues));
    setErrorRegister('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const CREATED = 201;
    const response = await easyFetch(
      'http://localhost:3001/adm/register',
      { Authorization: token },
      'POST',
      registerData,
    );
    const responseJSON = await response.json();
    if (response.status !== CREATED) return setErrorRegister(responseJSON);
    updateUsers();
  };

  const { name, email, password, role } = registerData;

  return (
    <form action="POST" className="_admin_register">
      <h2>Registrar</h2>
      <label htmlFor="name">
        Nome
        <input
          data-testid={ dataTestId('64') }
          type="text"
          name="name"
          id="name"
          value={ name }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          data-testid={ dataTestId('65') }
          type="text"
          name="email"
          id="email"
          value={ email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          data-testid={ dataTestId('66') }
          type="text"
          name="password"
          id="password"
          value={ password }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="role">
        Tipo
        <select
          name="role"
          id="role"
          value={ role }
          onChange={ handleChange }
          data-testid={ dataTestId('68') }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </select>
      </label>
      <button
        data-testid={ dataTestId('67') }
        type="submit"
        disabled={ !validRegister }
        onClick={ handleSubmit }
        className="_btn_register"
      >
        Cadastrar
      </button>
      <span
        data-testid={ dataTestId('74') }
      >
        {errorRegister.message}
      </span>
    </form>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(AdminRegister);

AdminRegister.propTypes = {
  token: PropTypes.string.isRequired,
  updateUsers: PropTypes.func.isRequired,
};
