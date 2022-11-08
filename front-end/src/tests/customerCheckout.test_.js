import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import storageOrderMock from './mocks/storageMocks/storageOrder';
import storageLoginMock from './mocks/storageMocks/storageLogin';
import fetchSeller from './mocks/sellerMocks/fecthSeller';
import sellersMock from './mocks/sellerMocks/sellersMocks';
import fetchCustomer from './mocks/customerMocks/fetchCustomer';

describe('Testes da página de checkout do cliente', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify(storageLoginMock));
    window.localStorage.setItem('cart', JSON.stringify(storageOrderMock));
    jest.spyOn(global, 'fetch').mockImplementation(fetchSeller);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`Deve existir uma tabela com o cabeçalho de campos Item, Descrição, Quantidade,
  Valor unitário, Sub-total, Remover Item`, () => {
    renderWithRouter(<App />, '/customer/checkout');

    expect(screen.getByRole('columnheader', { name: 'Item' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Descrição' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Quantidade' }))
      .toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Valor/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Sub-total' }))
      .toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Remover/i }))
      .toBeInTheDocument();
  });

  it('A tabela deve ser alimentada pelo LocalStorage na chave "cart".', () => {
    renderWithRouter(<App />, '/customer/checkout');

    expect(screen.getAllByRole('cell', { name: '1' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Skol Lata 250ml' })[0])
      .toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '3' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'R$ 2,20' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'R$ 6,60' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '2' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Heineken 600ml' })[0])
      .toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '4' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'R$ 7,50' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'R$ 30,00' })[0]).toBeInTheDocument();
  });

  it('Deve existir um campo que exibe a soma total do pedido', () => {
    renderWithRouter(<App />, '/customer/checkout');
    const totalPrice = screen
      .getByTestId('customer_checkout__element-order-total-price');
    expect(totalPrice.innerHTML).toBe('36,60');
  });

  it('Deve existir um campo para escolher o vendedor', async () => {
    renderWithRouter(<App />, '/customer/checkout');
    const inputSeller = await screen.findByRole('combobox', {
      name: /pessoa/i,
    });
    expect(inputSeller).toBeInTheDocument();
    const sellersOptions = within(inputSeller).getAllByRole('option');
    const sellersOptionsvalues = sellersOptions.map((option) => option.innerHTML);
    const sellersNamesList = sellersMock.map((seller) => seller.name);
    await expect(sellersOptionsvalues).toEqual(sellersNamesList);
  });

  it('O botão "Remove item" deve excluir um produto do pedido', async () => {
    renderWithRouter(<App />, '/customer/checkout');
    const removeButton = screen.getByRole('columnheader', { name: /Remover/i };
    const products = lS.get('cart');
    userEvent.click(removeButton);
    await expect(products.length).toBe(products.length - 1);
  });

  it('Deve existir campos para adicionar endereço e número', () => {
    renderWithRouter(<App />, '/customer/checkout');
    const addressInput = screen.getByLabelText('Endereço');
    const numberInput = screen.getByLabelText('Número');
    expect(addressInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
  });

  it('O botão "Finalizar pedido" deve salvar o pedido na banco de dados', async () => {
    const { history } = renderWithRouter(<App />, '/customer/checkout');
    const mockCheckout = jest.spyOn(global, 'fetch').mockImplementation(fetchCustomer);
    const inputSeller = await screen.findByRole('combobox', {
      name: /pessoa/i,
    });
    const orderButton = await screen.findByText(/Finalizar Pedido/i);
    expect(orderButton).toBeInTheDocument();
    const addressInput = screen.findByLabelText('Endereço');
    const numberInput = screen.findByLabelText('Número');

    userEvent.selectOptions(inputSeller, 'Fulana Pereira');
    userEvent.type(addressInput, 'Rua Visconde de Abaeté');
    userEvent.type(numberInput, '450');
    userEvent.click(orderButton);

    await expect(mockCheckout).toBeCalledTimes(2);
    await expect(history.location.pathname).toBe('/customer/orders/1');
  });
});
