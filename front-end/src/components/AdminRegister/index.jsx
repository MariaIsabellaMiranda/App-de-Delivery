import { useState } from 'react';
import { validateRegister } from '../../helpers/validateAccess';

function AdminRegister() {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [validRegister, setValidRegister] = useState(false);

  const handleChange = ({ target }) => {
    const newValues = { ...registerData, [target.name]: target.value };
    setRegisterData(newValues);
    setValidRegister(validateRegister(newValues));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { name, email, password, role } = registerData;

  return (
    <form action="POST">
      <label htmlFor="name">
        Nome
        <input
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
          type="text"
          name="password"
          id="password"
          value={ password }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="role">
        Tipo
        <select name="role" id="role" value={ role } onChange={ handleChange }>
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
        </select>
      </label>
      <button type="submit" disabled={ !validRegister } onClick={ handleSubmit }>
        Cadastrar
      </button>
    </form>
  );
}

export default AdminRegister;
