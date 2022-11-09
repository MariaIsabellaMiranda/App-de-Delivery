import React from 'react';
import userEvent from '@testing-library/user-event';
import { getByRole, screen } from '@testing-library/react';
import lS from 'manager-local-storage';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import storageSellerMock from './mocks/storageMocks/storageSeller';
import fetchMocks from './mocks/pagesMocks/fetchSellerDetails';
import { storageStateSeller } from './mocks/storageMocks/storageStatesMock';

const INITIAL_STATE = storageStateSeller;
const ROUTE = '/seller/orders/1';

describe('Testa a página de detalhes do pedido do vendedor', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageSellerMock);
    jest.spyOn(global, 'fetch').mockImplementation(fetchMocks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testa os elementos do Header', () => {
    it('Se os elementos existem', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const orders = await screen.findByRole('link', { name: 'Pedidos' });
      const name = await screen.findByTestId('customer_products__element-navbar-user-full-name');
      const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');

      expect(orders).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(logout).toBeInTheDocument();
    });

    it('se o name exibido é o mesmo salvo no localStorage', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
      const user = lS.get('user');

      const name = await screen.findByTestId('customer_products__element-navbar-user-full-name');

      expect(name.innerHTML).toBe(user.name);
    });

    it('se ao clicar no link Meus Pedidos redireciona para a rota /seller/orders', async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const orders = await screen.findByRole('link', { name: 'Pedidos' });
      userEvent.click(orders);

      expect(history.location.pathname).toBe('/seller/orders');
    });

    it('se ao clicar no link de logout redireciona para a rota /login', async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');
      userEvent.click(logout);

      expect(history.location.pathname).toBe('/login');
    });
  });

  describe('Testa os elementos da página de detalhes do pedido', () => {
    it(`Deve existir uma tabela com o cabeçalho de campos Item, Descrição, Quantidade,
        Valor unitário, Sub-total, Remover Item`, async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const item = await screen.findByRole('columnheader', { name: 'Item' });
      const description = await screen.findByRole('columnheader', { name: 'Descrição' });
      const quantity = await screen.findByRole('columnheader', { name: 'Quantidade' })
      const unityValue = await screen.findByRole('columnheader', { name: /Valor/i });
      const total = await screen.findByRole('columnheader', { name: 'Sub-total' });

      expect(item).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(quantity).toBeInTheDocument();
      expect(unityValue).toBeInTheDocument();
      expect(total).toBeInTheDocument();
    });

    it('Testa se existe na tabela os valores que vem da Api', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const itemId = await screen.findByRole('cell', { name: '1' });
      const description = await screen.findByRole('cell', { name: 'Skol Lata 250ml' });
      const quantity = await screen.findByRole('cell', { name: '5' });
      const unityValue = await screen.findByRole('cell', { name: 'R$ 2,20' });
      const total = await screen.findByRole('cell', { name: 'R$ 11,00' });

      expect(itemId).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(quantity).toBeInTheDocument();
      expect(unityValue).toBeInTheDocument();
      expect(total).toBeInTheDocument();
    });

    it('Deve existir um campo que exibe a soma total do pedido', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
  
      const totalPrice = await screen.findByTestId('seller_order_details__element-order-total-price');
  
      expect(totalPrice.innerHTML).toBe('56,00');
    });
  });

  describe('Testa botões de alteração de status', () => {
    it('Para pedidos pendentes deve haver um botão de "Preparar Pedido" habilitado e um de "Saiu para entrega" desabilitado', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

      const status = await screen.findByTestId('seller_order_details__element-order-details-label-delivery-status');
      const buttonPrepare = await screen.findByRole('button', { name: 'Preparar Pedido'});
      const buttonRoad = await screen.findByRole('button', { name: 'Saiu para entrega'});

      expect(status.innerHTML).toBe('Pendente');
      expect(buttonPrepare).not.toBeDisabled();
      expect(buttonRoad).toBeDisabled();
    });
  });
});
