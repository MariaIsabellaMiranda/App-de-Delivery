import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouterAndRedux';
import App from '../App';
import fetchRegister from './mocks/pagesMocks/fetchRegister';
import storageRegisterMock from './mocks/storageMocks/storageRegister';
import { storageStateNotLogged } from './mocks/storageMocks/storageStatesMock';

const NAME_VALID = 'Zé Birita de Souza';
const PASSWORD_VALID = '123456';
const EMAIL_VALID = 'zebirita@email.com';
const INITIAL_STATE = storageStateNotLogged;

describe('Testa a rota /register', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchRegister);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testa se a página register é renderizada na rota correta', () => {
    it('Testa se a página Register é renderizada no endpoint "/register"', async () => {
      const { history } = renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      expect(history.location.pathname).toBe('/register');
    });
  });
  
  describe('Verifica os elementos da página Register', () => {
    it('Testa se existe o input name, email e senha', () => {
      renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      const nameInput = screen.getByLabelText('Nome:');
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  
    it('Testa se o input de Email e Password são dos tipos email e password', () => {
      renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(emailInput.type).toBe('email');
      expect(passwordInput.type).toBe('password');
    });
  
    it('Testa se existe o botão de "Cadastrar" e se ele está desabilitado ao renderizar a página"', () => {
      renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      const registerButton = screen.getByRole('button', { name: 'Cadastrar' });
  
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toBeDisabled();
    });
  });
  
  describe('Verifica comportamentos ao digitar nos inputs', () => {
    it('Testa se ao digitar nome, email e senha válidas o botão é habilitado ', () => {
      renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      const nameInput = screen.getByLabelText('Nome:');
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      userEvent.type(nameInput, NAME_VALID);
      userEvent.type(emailInput, EMAIL_VALID);
      userEvent.type(passwordInput, PASSWORD_VALID);
  
      const registerButton = screen.getByRole('button', { name: 'Cadastrar' });
  
      expect(registerButton).not.toBeDisabled();
    });
  
    it('Testa se ao digitar somente o nome inválido o botão continua desabilitado ', () => {
      renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      const nameInput = screen.getByLabelText('Nome:');
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      userEvent.type(nameInput, 'Zé Birita');
      userEvent.type(emailInput, EMAIL_VALID);
      userEvent.type(passwordInput, PASSWORD_VALID);
  
      const registerButton = screen.getByRole('button', { name: 'Cadastrar' });
  
      expect(registerButton).toBeDisabled();
    });
  
    it('Testa se ao digitar somente email inválido o botão continua desabilitado ', () => {
      renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      const nameInput = screen.getByLabelText('Nome:');
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      userEvent.type(nameInput, NAME_VALID);
      userEvent.type(emailInput, 'test.com');
      userEvent.type(passwordInput, PASSWORD_VALID);
  
      const registerButton = screen.getByRole('button', { name: 'Cadastrar' });
  
      expect(registerButton).toBeDisabled();
    });
  
    it(
      'Testa se ao digitar somente password inválido o botão continua desabilitado',
      () => {
        renderWithRouter(<App />, INITIAL_STATE, '/register');
  
        const nameInput = screen.getByLabelText('Nome:');
        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Senha:');
  
        userEvent.type(nameInput, NAME_VALID);
        userEvent.type(emailInput, EMAIL_VALID);
        userEvent.type(passwordInput, 12345);
  
        const registerButton = screen.getByRole('button', { name: 'Cadastrar' });
  
        expect(registerButton).toBeDisabled();
      },
    );
  });
  
  describe('Verifica comportamentos ao clicar no botão "Cadastrar"', () => {
    it(
      'Testa se ao clicar no botão "Cadastrar", o usuário é redirecionado para a rota /customer/products',
      async () => {
        const { history } = renderWithRouter(<App />, INITIAL_STATE, '/register');
  
        const nameInput = screen.getByLabelText('Nome:');
        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Senha:');
  
        userEvent.type(nameInput, NAME_VALID);
        userEvent.type(emailInput, EMAIL_VALID);
        userEvent.type(passwordInput, PASSWORD_VALID);
  
        const registerButton = screen.getByRole('button', { name: 'Cadastrar' });
        userEvent.click(registerButton);
  
        await waitFor(() => {
          expect(history.location.pathname).toBe('/customer/products');
        });
      },
    );
  });
  
  describe('Testa localStorage', () => {
    it('Testa se ao clicar no botão "Cadastrar", o retorno da requisição é salvo no localStorage', async () => {
      renderWithRouter(<App />, INITIAL_STATE, '/register');
  
      const nameInput = screen.getByLabelText('Nome:');
      const emailInput = screen.getByLabelText('Email:');
      const passwordInput = screen.getByLabelText('Senha:');
  
      userEvent.type(nameInput, NAME_VALID);
      userEvent.type(emailInput, EMAIL_VALID);
      userEvent.type(passwordInput, PASSWORD_VALID);
  
      const registerButton = screen.getByRole('button', { name: 'Cadastrar' });
      userEvent.click(registerButton);
  
      await waitFor(() => {
        expect(window.localStorage.getItem('user')).toEqual(storageRegisterMock);
      });
    });
  });
});
