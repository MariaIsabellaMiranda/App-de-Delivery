import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import lS from 'manager-local-storage';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import storageSellerMock from './mocks/storageMocks/storageSeller';
import fetchMocks from './mocks/pagesMocks/fetchSellerDetails';
import { storageStateSeller } from './mocks/storageMocks/storageStatesMock';
import { INTEGER } from 'sequelize';

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

  it('Teste', () => {

  });

  // describe('Testa os elementos do Header', () => {
  //   it('Se os elementos existem', async () => {
  //     renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

  //     const myOrders = await screen.findByRole('link', { name: 'Meus Pedidos' });
  //     const name = await screen.findByTestId('customer_products__element-navbar-user-full-name');
  //     const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');

  //     expect(myOrders).toBeInTheDocument();
  //     expect(name).toBeInTheDocument();
  //     expect(logout).toBeInTheDocument();
  //   });

  //   it('se o name exibido é o mesmo salvo no localStorage', async () => {
  //     renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);
  //     const user = lS.get('user');

  //     const name = await screen.findByTestId('customer_products__element-navbar-user-full-name');

  //     expect(name.innerHTML).toBe(user.name);
  //   });

  //   it('se ao clicar no link Meus Pedidos redireciona para a rota /seller/orders', async () => {
  //     const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

  //     const myOrders = await screen.findByRole('link', { name: 'Meus Pedidos' });
  //     userEvent.click(myOrders);

  //     expect(history.location.pathname).toBe('/seller/orders');
  //   });

  //   it('se ao clicar no link de logout redireciona para a rota /login', async () => {
  //     const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

  //     const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');
  //     userEvent.click(logout);

  //     expect(history.location.pathname).toBe('/login');
  //   });
  // });

  // describe('Testa os elementos da página Orders', () => {
  //   it('Se os elementos com id 1 existem', async () => {
  //     renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

  //     const idOrder = await screen.findByTestId('seller_orders__element-order-id-1');
  //     const status = await screen.findByTestId('seller_orders__element-delivery-status-1');
  //     const date = await screen.findByTestId('seller_orders__element-order-date-1');
  //     const totalPrice = await screen.findByTestId('seller_orders__element-card-price-1');
  //     const addrees = await screen.findAllByTestId('seller_orders__element-card-address-');

  //     expect(idOrder).toBeInTheDocument();
  //     expect(status).toBeInTheDocument();
  //     expect(date).toBeInTheDocument();
  //     expect(totalPrice).toBeInTheDocument();
  //     expect(addrees).toHaveLength(2);
  //   });

  //   it('Se os elementos com id 2 existem', async () => {
  //     renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

  //     const idOrder = await screen.findByTestId('seller_orders__element-order-id-2');
  //     const status = await screen.findByTestId('seller_orders__element-delivery-status-2');
  //     const date = await screen.findByTestId('seller_orders__element-order-date-2');
  //     const totalPrice = await screen.findByTestId('seller_orders__element-card-price-2');
  //     const addrees = await screen.findAllByTestId('seller_orders__element-card-address-');

  //     expect(idOrder).toBeInTheDocument();
  //     expect(status).toBeInTheDocument();
  //     expect(date).toBeInTheDocument();
  //     expect(totalPrice).toBeInTheDocument();
  //     expect(addrees).toHaveLength(2);
  //   });

  //   it('Se ao clicar no pedido a página é redirecionado para rota daquele pedido', async () => {
  //     const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ROUTE);

  //     const idOrder = await screen.findByTestId('seller_orders__element-order-id-1');
  //     userEvent.click(idOrder);

  //     expect(history.location.pathname).toBe('/seller/orders/1');
  //   });
  // });
});
