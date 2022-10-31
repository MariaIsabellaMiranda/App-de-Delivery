import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import {
  loginAdm,
  loginCustomer,
  loginSeller,
  // storageCustomerMock,
} from './mocks/loginMock';

const PASSWORD_VALID = '1c37466c159755ce1fa181bd247cb925';
const EMAIL_VALID = 'zebirita@email.com';

describe('Testa a rota login', () => {
  it('Testa se a página de Login é renderizada no endpoint "/login"', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  });
});

describe('Verifica os elementos da página de login', () => {
  it('Testa se existe o input login e se ele é do tipo email', () => {
    renderWithRouter(<App />);

    const loginInput = screen.getByLabelText('Login:');

    expect(loginInput).toBeInTheDocument();
    expect(loginInput.type).toBe('email');
  });

  it('Testa se existe o input de Password e se ele é do tipo password', () => {
    renderWithRouter(<App />);

    const passwordInput = screen.getByLabelText('Senha:');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');
  });

  it('Testa se existe os botões de "Login" e "Ainda não tenho conta"', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveValue('Login');
    expect(buttons[1]).toHaveValue('Register');
  });

  it('Testa se o botão de "Login" está desabilitado ao renderizar a página', () => {
    renderWithRouter(<App />);

    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(loginButton).toBeDisabled();
  });
});

describe('Verifica comportamentos ao digitar nos inputs', () => {
  it('Testa se ao digitar email e senha válidas o botão é habilitado ', () => {
    renderWithRouter(<App />);

    const loginInput = screen.getByLabelText('Login:');
    const passwordInput = screen.getByLabelText('Senha:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(loginInput, EMAIL_VALID);
    userEvent.type(passwordInput, PASSWORD_VALID);

    expect(loginButton).not.toBeDisabled();
  });

  it('Testa se ao digitar somente email inválido o botão continua desabilitado ', () => {
    renderWithRouter(<App />);

    const loginInput = screen.getByLabelText('Login:');
    const passwordInput = screen.getByLabelText('Senha:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(loginInput, 'teste@teste');
    userEvent.type(passwordInput, PASSWORD_VALID);

    expect(loginButton).toBeDisabled();
  });

  it(
    'Testa se ao digitar somente password inválido o botão continua desabilitado',
    () => {
      renderWithRouter(<App />);

      const loginInput = screen.getByLabelText('Login:');
      const passwordInput = screen.getByLabelText('Senha:');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      userEvent.type(loginInput, EMAIL_VALID);
      userEvent.type(passwordInput, '12345');

      expect(loginButton).toBeDisabled();
    },
  );
});

describe('Verifica funcionalidade dos botões', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(
    `Testa se ao clicar no botão
    "Ainda não tenho conta", a página é redirecionada para a rota "/register"`,
    () => {
      const { history } = renderWithRouter(<App />);

      const loginButton = screen.getByRole('button', { name: 'Ainda não tenho conta' });

      userEvent.click(loginButton);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/register');
    },
  );

  it('Testa se ao clicar no botão "Login", é feita uma requisição à API', () => {
    renderWithRouter(<App />);

    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(loginCustomer),
    });

    const loginInput = screen.getByLabelText('Login:');
    const passwordInput = screen.getByLabelText('Senha:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(loginInput, EMAIL_VALID);
    userEvent.type(passwordInput, PASSWORD_VALID);
    userEvent.click(loginButton);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it(`Testa se ao clicar no botão "Login", a página é
    redirecionada para a rota de acordo com o role do usuário recebido`, async () => {
    const { history } = renderWithRouter(<App />);

    const mocksLogin = [loginAdm, loginCustomer, loginSeller];

    mocksLogin.forEach(async (mock) => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mock),
      });

      const loginInput = screen.getByLabelText('Login:');
      const passwordInput = screen.getByLabelText('Senha:');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      userEvent.type(loginInput, EMAIL_VALID);
      userEvent.type(passwordInput, PASSWORD_VALID);
      userEvent.click(loginButton);

      if (mock === 'customer') {
        await waitFor(() => {
          expect(history.location.pathname).toBe('/customer/products');
        });
      }
      if (mock === 'seller') {
        await waitFor(() => {
          expect(history.location.pathname).toBe('/seller/orders');
        });
      }
      if (mock === 'administrator') {
        await waitFor(() => {
          expect(history.location.pathname).toBe('/admin/manage');
        });
      }
    });
  });

  // it('Testa se ao clicar no botão "Login", o retorno da requisição é salvo no localStorage', () => {
  //   renderWithRouter(<App />);

  //   const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(loginCustomer)
  //   });

  //   const loginInput = screen.getByLabelText('Login:');
  //   const passwordInput = screen.getByLabelText('Senha:');
  //   const loginButton = screen.getByRole('button', { name: 'Login' });

  //   userEvent.type(loginInput, EMAIL_VALID);
  //   userEvent.type(passwordInput, PASSWORD_VALID);
  //   userEvent.click(loginButton);

  //   expect(window.localStorage.getItem('userData')).toEqual(storageCustomerMock);
  // });
});
