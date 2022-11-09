import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, within } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import lS from 'manager-local-storage';
import storageOrderMock from './mocks/storageMocks/storageOrderMock';
import storageLoginMock from './mocks/storageMocks/storageLogin';
import fetchMocks from './mocks/pagesMocks/fetchCheckout';
import sellersMock from './mocks/responseMocks/sellersMocks';
import { storageStateCustomer } from './mocks/storageMocks/storageStatesMock';

const INITIAL_STATE = storageStateCustomer;

describe('Testes da página de checkout do cliente', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageLoginMock);
    localStorage.setItem('cart', storageOrderMock);
    jest.spyOn(global, 'fetch').mockImplementation(fetchMocks);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Deve existir uma tabela com o cabeçalho de campos Item, Descrição, Quantidade,
  Valor unitário, Sub-total, Remover Item`, async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/customer/checkout');

    expect(await screen.findByRole('columnheader', { name: 'Item' })).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Descrição' }))
      .toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Quantidade' }))
      .toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: /Valor/i }))
      .toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Sub-total' }))
      .toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: /Remover/i }))
      .toBeInTheDocument();
  });

  it('A tabela deve ser alimentada pelo LocalStorage na chave “cart”.', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/customer/checkout');

    expect(await screen.findByRole('cell', { name: '1' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Skol Lata 250ml' }))
      .toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '4' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'R$ 2,20' }))
      .toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'R$ 8,80' }))
      .toBeInTheDocument();
    expect(await screen.findByText('31,27'))
      .toBeInTheDocument();
  });

  it('Deve existir um campo que exibe a soma total do pedido', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/customer/checkout');

    const totalPrice = await screen
      .findByTestId('customer_checkout__element-order-total-price');

    expect(totalPrice.innerHTML).toBe('31,27');
  });

  it('Deve existir um campo para escolher o vendedor', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/customer/checkout');

    const inputSeller = await screen.findByRole('combobox', {
      name: /pessoa/i,
    });

    expect(inputSeller).toBeInTheDocument();

    const sellersOptions = await within(inputSeller).findAllByRole('option');
    const sellersOptionsvalues = sellersOptions.map((option) => option.innerHTML);
    const sellersNamesList = sellersMock.map((seller) => seller.name);

    expect(sellersOptionsvalues).toEqual(sellersNamesList);
  });

  it('O ícone de lixeira deve excluir um produto do pedido', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/customer/checkout');

    const removeButton = await screen.findAllByTestId('button-remove');

    const products = lS.get('cart');
    userEvent.click(removeButton[0]);
    const newCartProducts = lS.get('cart');

    await waitFor(() => {
      expect(newCartProducts.length).toBe(products.length - 1);
    });
  });

  it('Deve existir campos para adicionar endereço e número', async () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/customer/checkout');

    const addressInput = await screen.findByLabelText('Endereço:');
    const numberInput = await screen.findByLabelText('Número:');

    expect(addressInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
  });

  it('O botão “Finalizar pedido” deve redirecionar para página customer/orders/1', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/customer/checkout');

    const inputSeller = await screen.findByRole('combobox', {
      name: /pessoa/i,
    });
    const orderButton = await screen.findByText(/Finalizar Pedido/i);
    expect(orderButton).toBeInTheDocument();
    const addressInput = await screen.findByLabelText('Endereço:');
    const numberInput = await screen.findByLabelText('Número:');

    userEvent.selectOptions(inputSeller, 'Fulana Pereira');
    userEvent.type(addressInput, 'Rua Visconde de Abaeté');
    userEvent.type(numberInput, '450');
    userEvent.click(orderButton);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/orders/1');
    });
  });
});