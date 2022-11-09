import React from 'react';
import { findByRole, findByTestId, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { storageStateCustomer } from './mocks/storageMocks/storageStatesMock';
import fetchMocks from './mocks/pagesMocks/fetchOrders';
import storageLoginMock from './mocks/storageMocks/storageLogin';
import userEvent from '@testing-library/user-event';

const INITIAL_STATE = storageStateCustomer;
const ORDERS_ROUTE = '/customer/orders';

describe ('Testa a página de Pedidos', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageLoginMock);
    jest.spyOn(global, 'fetch').mockImplementation(fetchMocks);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se a página é renderizada na endpoint “customer/orders”', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ORDERS_ROUTE);
    await waitFor(() => expect(history.location.pathname).toBe(ORDERS_ROUTE));
  });

  it('Testa se são renderizados todos os pedidos salvos no banco', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, ORDERS_ROUTE);
    const orders = await screen.findAllByTestId(/customer_orders__element-order-id-/i);
    expect(orders).toHaveLength(2);
  });

  it('Ao clicar em um pedido deve ser renderizada a página de detalhes', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, ORDERS_ROUTE);

    const orderLink = await screen.findByTestId('customer_orders__element-order-id-1');
    userEvent.click(orderLink);

    await waitFor(() => { expect(history.location.pathname).toBe('/customer/orders/1')});
  });
});