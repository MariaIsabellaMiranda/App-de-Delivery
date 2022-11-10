import React from 'react';
import userEvent from '@testing-library/user-event';
import { getByLabelText, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import lS from 'manager-local-storage';
import storageAdmMock from './mocks/storageMocks/storageAdm';
import fetchMocks from './mocks/pagesMocks/fetchAdm';
import { storageStateAdm } from './mocks/storageMocks/storageStatesMock';

const INITIAL_STATE = storageStateAdm;
const ROUTE = '/admin/manage';

describe('Testa a página de administrador', () => {
  let fetchTeste;
  beforeEach(() => {
    localStorage.setItem('user', storageAdmMock);
    fetchTeste = jest.spyOn(global, 'fetch').mockImplementation(fetchMocks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testa os elementos do Header', () => {
    it('Se os elementos existem', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
      
      const manager = await screen.findByRole('link', { name: 'Gerenciar Usuários' });
      const name = await screen.findByTestId('customer_products__element-navbar-user-full-name');
      const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');
      
      expect(manager).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(logout).toBeInTheDocument();
    });
    
    it('se o name exibido é o mesmo salvo no localStorage', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
      const user = lS.get('user');

      const name = await screen.findByTestId('customer_products__element-navbar-user-full-name');
      
      expect(name.innerHTML).toBe(user.name);
    });

    it('se ao clicar no link de logout redireciona para a rota /login', async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');
      userEvent.click(logout);
      
      expect(history.location.pathname).toBe('/login');
    });

    it('se ao clicar no link de logout apaga a chave user do localStorage', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');
      userEvent.click(logout);
      
      const user =  localStorage.getItem('user');
      expect(user).toBeNull();
    });
  });

  describe('Testa elementos do campo de registro', () => {
    it('se os elementos existem e o botão "Cadastrar" está desabilitado', () =>{
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const name = screen.getByLabelText('Nome');
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Senha');
      const type = screen.getByRole('combobox', { name: 'Tipo' });
      const button = screen.getByRole('button', { name: 'Cadastrar' });

      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it('se após preencher os campos corretamente o botão é habilitado e seu click chama a api', async () =>{
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const name = screen.getByLabelText('Nome');
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Senha');
      const type = screen.getByRole('combobox', { name: 'Tipo' });
      const button = screen.getByRole('button', { name: 'Cadastrar' });

      userEvent.type(name, 'Trybe Estudant');
      userEvent.type(email, 'trybe@trybe.com');
      userEvent.type(password, '-123456#');
      userEvent.selectOptions(type, 'Vendedor');

      expect(button).not.toBeDisabled();

      userEvent.click(button);

      await expect(fetchTeste).toHaveBeenCalled();
    });
  });

  describe('Testa tabela de pessoas usuárias', () => {
    it('se o cabeçalho da tabela existe', () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const item = screen.getByRole('columnheader', { name: 'Item' });
      const name = screen.getByRole('columnheader', { name: 'Nome' });
      const email = screen.getByRole('columnheader', { name: 'Email' })
      const type = screen.getByRole('columnheader', { name: 'Tipo' });
      const dlt = screen.getByRole('columnheader', { name: 'Excluir' });

      expect(item).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(dlt).toBeInTheDocument();
    });

    it('se existe na tabela os valores que vem da Api', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const itemId = await screen.findByRole('cell', { name: '1' });
      const name = await screen.findByRole('cell', { name: 'Fulana Pereira' });
      const email = await screen.findByRole('cell', { name: 'fulana@deliveryapp.com' });
      const type = await screen.findByRole('cell', { name: 'seller' });

      expect(itemId).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(type).toBeInTheDocument();
    });

    it('se ao clicar no ícone de lixeira chama a Api para deletar um usuário', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
  
      const removeButton = await screen.findAllByTestId('admin_manage__element-user-table-remove-0');
      userEvent.click(removeButton[0]);

      expect(fetchTeste).toHaveBeenCalled();
    });
  });
});