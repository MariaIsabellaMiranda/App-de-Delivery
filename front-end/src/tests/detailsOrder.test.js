import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { storageStateCustomer } from './mocks/storageMocks/storageStatesMock';
import fetchMocks from './mocks/pagesMocks/fetchOrdersDetails';
import storageLoginMock from './mocks/storageMocks/storageLogin';

const INITIAL_STATE = storageStateCustomer;
const DETAIL_ORDER_ROUTE = '/customer/orders/1';

describe('Testa a página de detalhes do pedido', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageLoginMock);
    jest.spyOn(global, 'fetch').mockImplementation(fetchMocks);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  
    it('Testa se a página é renderizada na endpoint “customer/order/${id}”', async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, DETAIL_ORDER_ROUTE);
      await waitFor(() => expect(history.location.pathname).toBe(DETAIL_ORDER_ROUTE));
    });

    it('Testa se é exibido o número do pedido', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, DETAIL_ORDER_ROUTE);
      const idOrder = await screen.findByTestId('customer_order_details__element-order-details-label-order-id');
      expect(idOrder).toBeInTheDocument();
      expect(idOrder.innerHTML).toBe('1');
    });
    
    it('Testa se são exibidas corretamente as informações de Vendedor, Data e Status do pedido', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, DETAIL_ORDER_ROUTE);
      const sellerOrder = await screen.findByTestId('customer_order_details__element-order-details-label-seller-name');
      const dateOrder = await screen.findByTestId('customer_order_details__element-order-details-label-order-date');
      const statusOrder = await screen.findByTestId('customer_order_details__element-order-details-label-delivery-status');
      expect(sellerOrder).toBeInTheDocument();
      expect(dateOrder).toBeInTheDocument();
      expect(statusOrder).toBeInTheDocument();
      expect(sellerOrder.innerHTML).toBe('Fulana Pereira');
      expect(dateOrder.innerHTML).toBe('04/11/2022');
      expect(statusOrder.innerHTML).toBe('Pendente');
    });

    it('Verifica se o botão "Marcar como entregue" é renderizado e está desabilitado', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, DETAIL_ORDER_ROUTE);

      const cart = await screen.findByText(/Marcar/i);

      expect(cart).toBeInTheDocument();
      expect(cart).toBeDisabled();
    });

    it(`Deve existir uma tabela com o cabeçalho de campos Item, Descrição, Quantidade,
        Valor unitário, Sub-total`, async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, DETAIL_ORDER_ROUTE);

    expect(await screen.findByRole('columnheader', { name: 'Item' })).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Descrição' }))
      .toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Quantidade' }))
      .toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: /Valor/i }))
      .toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Sub-total' }))
      .toBeInTheDocument();
    });

    it('Os produtos devem ser exibidos corretamente.', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, DETAIL_ORDER_ROUTE);
  
      expect(await screen.findByRole('cell', { name: '1' })).toBeInTheDocument();
      expect(await screen.findByRole('cell', { name: 'Skol Lata 250ml' }))
        .toBeInTheDocument();
      expect(await screen.findByRole('cell', { name: '5' })).toBeInTheDocument();
      expect(await screen.findByRole('cell', { name: 'R$ 2,20' }))
        .toBeInTheDocument();
      expect(await screen.findByRole('cell', { name: 'R$ 11,00' }))
        .toBeInTheDocument();
    });

    it('Deve existir um campo que exibe a soma total do pedido', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, DETAIL_ORDER_ROUTE);
  
      const totalPrice = await screen
        .findByTestId('customer_order_details__element-order-total-price');
  
      expect(totalPrice.innerHTML).toBe('56,00');
    });
  });
