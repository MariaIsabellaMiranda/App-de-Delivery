import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import storageLoginMock from './mocks/storageMocks/storageLogin';
import fetchCommon from './mocks/commonMocks/fetchCommon';

const PASSWORD_VALID = '123456';
const EMAIL_VALID = 'zebirita@email.com';

describe('Testa a rota /login', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchCommon);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testa se a rota login é renderizado no endpoint correto', () => {
    it('Testa se a página de Login é renderizada no endpoint "/login"', () => {
      const { history } = renderWithRouter(<App />, '/');

      expect(history.location.pathname).toBe('/login');
    });
  });

  describe('Verifica os elementos da página de login', () => {
    it('Testa se existe o input login e se ele é do tipo email', () => {
      renderWithRouter(<App />, '/');

      const loginInput = screen.getByLabelText('Login:');

      expect(loginInput).toBeInTheDocument();
      expect(loginInput.type).toBe('email');
    });

    it('Testa se existe o input de Password e se ele é do tipo password', () => {
      renderWithRouter(<App />, '/');

      const passwordInput = screen.getByLabelText('Senha:');

      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput.type).toBe('password');
    });

    it('Testa se existe os botões de "Login" e "Ainda não tenho conta"', () => {
      renderWithRouter(<App />, '/');

      const buttons = screen.getAllByRole('button');

      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveValue('Login');
      expect(buttons[1]).toHaveValue('Register');
    });

    it('Testa se o botão de "Login" está desabilitado ao renderizar a página', () => {
      renderWithRouter(<App />, '/');

      const loginButton = screen.getByRole('button', { name: 'Login' });

      expect(loginButton).toBeDisabled();
    });
  });
  
  describe('Verifica comportamentos ao digitar nos inputs', () => {
    it('Testa se ao digitar email e senha válidas o botão é habilitado ', () => {
      renderWithRouter(<App />, '/');
  
      const loginInput = screen.getByLabelText('Login:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      userEvent.type(loginInput, EMAIL_VALID);
      userEvent.type(passwordInput, PASSWORD_VALID);
      const loginButton = screen.getByRole('button', { name: 'Login' });
  
      expect(loginButton).not.toBeDisabled();
    });
  
    it('Testa se ao digitar somente email inválido o botão continua desabilitado', () => {
      renderWithRouter(<App />, '/');
  
      const loginInput = screen.getByLabelText('Login:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      userEvent.type(loginInput, 'teste@teste');
      userEvent.type(passwordInput, PASSWORD_VALID);
  
      const loginButton = screen.getByRole('button', { name: 'Login' });
  
      expect(loginButton).toBeDisabled();
    });
  
    it('Testa se ao digitar somente password inválido o botão continua desabilitado', () => {
      renderWithRouter(<App />, '/');
  
      const loginInput = screen.getByLabelText('Login:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      userEvent.type(loginInput, EMAIL_VALID);
      userEvent.type(passwordInput, '12345');
  
      const loginButton = screen.getByRole('button', { name: 'Login' });
  
      expect(loginButton).toBeDisabled();
    });
  });
  
  describe('Verifica funcionalidade dos botões', () => {
    it(`Testa se ao clicar no botão
      "Ainda não tenho conta", a página é redirecionada para a rota "/register"`, () => {
      const { history } = renderWithRouter(<App />, '/');
  
      const loginButton = screen.getByRole('button', {
        name: 'Ainda não tenho conta',
      });
  
      userEvent.click(loginButton);
  
      const {
        location: { pathname },
      } = history;
      expect(pathname).toBe('/register');
    });
  
    it(`Testa se ao clicar no botão "Login", a página é
      redirecionada para a rota de acordo com o role do usuário recebido`, async () => {
      const { history } = renderWithRouter(<App />, '/');

      const loginInput = screen.getByLabelText('Login:');
      const passwordInput = screen.getByLabelText('Senha:');

      userEvent.type(loginInput, EMAIL_VALID);
      userEvent.type(passwordInput, PASSWORD_VALID);

      const loginButton = screen.getByRole('button', { name: 'Login' });

      userEvent.click(loginButton);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/products');
      });
    });

    it('Testa se ao clicar no botão "Login", o retorno da requisição é salvo no localStorage', async () => {
      renderWithRouter(<App />, '/');

      const loginInput = screen.getByLabelText('Login:');
      const passwordInput = screen.getByLabelText('Senha:');

      userEvent.type(loginInput, EMAIL_VALID);
      userEvent.type(passwordInput, PASSWORD_VALID);

      const loginButton = screen.getByRole('button', { name: 'Login' });
      userEvent.click(loginButton);

      await waitFor(() => {
        expect(window.localStorage.getItem('user')).toEqual(storageLoginMock);
      });
    });
  });
});
