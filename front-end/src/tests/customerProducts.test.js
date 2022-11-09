import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import lS from 'manager-local-storage';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import storageLogin from './mocks/storageMocks/storageLogin';
import fetchProducts from './mocks/pagesMocks/fetchProducts';
import { storageStateCustomer } from './mocks/storageMocks/storageStatesMock';

const INITIAL_STATE = storageStateCustomer;
const PRODUCT_ROUTE = '/customer/products';

describe('Testa a rota /customer/products', () => {
  beforeEach(() => {
    localStorage.setItem('user', storageLogin);
    jest.spyOn(global, 'fetch').mockImplementation(fetchProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testa página customer/products', () => {
    it(`Testa se a página de Products é renderizada no
      endpoint “/customer/products”`, async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      await waitFor(() => expect(history.location.pathname).toBe('/customer/products'));
    });
  });

  describe('verifica os elementos de produtos', () => {
    it('verifica se renderiza corretamente as imagens', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const produtos = await screen.findAllByRole('img');
      const numeroProdutos = 11;

      expect(produtos).toHaveLength(numeroProdutos);
    });

    it('verifica se renderiza os botões “Add”', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      for(let i = 0; i > 11; i += 1) {
        const addButtons = await screen.findByTestId(`customer_products__button-card-add-item-${[i]}`);

        expect(addButtons).toBeInTheDocument();
      }
    });

    it('verifica se renderiza o botão “Remove”', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      for(let i = 0; i > 11; i += 1) {
        const addButtons = await screen.findByTestId(`customer_products__button-card-rm-item-${[i]}`);

        expect(addButtons).toBeInTheDocument();
      }
    });

    it('verifica se renderiza o campo para quantidade', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const inputsQty = await screen.findAllByPlaceholderText('0');
      const productsQty = 11;

      expect(inputsQty).toHaveLength(productsQty);
    });

    it('verifica funcionamento dos botões', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const addButton = await screen
        .findByTestId('customer_products__button-card-add-item-1');
      const removeButton = await screen
        .findByTestId('customer_products__button-card-rm-item-1');
      const inputQty = await screen
        .findByTestId('customer_products__input-card-quantity-1');
        
        await waitFor(() => expect(inputQty).toHaveValue(0));
      userEvent.click(addButton);
      await waitFor(() => expect(inputQty).toHaveValue(1));
      userEvent.click(removeButton);
      await waitFor(() => expect(inputQty).toHaveValue(0));
    });
  });

  describe('verifica os elementos do cabeçalho', () => {
    it(' o link “Produtos” redireciona para a página de produtos', async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const linkProdutos = await screen.findByRole('link', { name: 'Produtos' });
      userEvent.click(linkProdutos);
      
      expect(history.location.pathname).toBe(PRODUCT_ROUTE);
    });

    it('se o link “Meus pedidos” redireciona para página de pedidos', async () => {
        const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

        const linkMeusPedidos = await screen.findByRole('link', { name: 'Meus Pedidos' });
        userEvent.click(linkMeusPedidos);

        expect(history.location.pathname).toBe('/customer/orders');
    });

    it('verifica se o nome do cliente é renderizado na tela', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const user = lS.get('user');
      const nomeCliente = await screen.findByTestId('customer_products__element-navbar-user-full-name')

      expect(nomeCliente.innerHTML).toBe(user.name);
    });

    it('verifica se o link de logout redireciona para página de login', async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const logout = await screen.findByTestId('customer_products__element-navbar-link-logout');
      userEvent.click(logout);

      expect(history.location.pathname).toBe('/login');
    });

    it('verifica se o link de logout limpa do dados do cliente', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const linkLogout = await screen.findByRole('link', { name: 'Meus Pedidos' });
      userEvent.click(linkLogout);
      const user = lS.get('user');

      waitFor(() => {
        expect(user).toBe(null);
      });
    });
  });

  describe('testa funcionamento do carrinho', () => {
    it('verifica se o carrinho é renderizado e está desabilitado', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const cart = await screen.findByTestId('customer_products__button-cart');

      expect(cart).toBeInTheDocument();
      expect(cart).toBeDisabled();
    });

    it('verifica o funcionamento do carrinho', async () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const totalPrice = await screen
        .findByTestId('customer_products__checkout-bottom-value');
      expect(totalPrice.innerHTML).toBe('0,00');
      const addButton = await screen
        .findByTestId('customer_products__button-card-add-item-1');
      userEvent.click(addButton);
      await waitFor(() =>  expect(totalPrice.innerHTML).toBe('2,20'));
      const removeButton = await screen
        .findByTestId('customer_products__button-card-rm-item-1');
      userEvent.click(removeButton);
      await waitFor(() =>  expect(totalPrice.innerHTML).toBe('0,00'));
    });

    it(`verifica se ao clicar no carrinho é
      encaminhado para a página de checkout`, async () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, PRODUCT_ROUTE);

      const addButton = await screen.findByTestId('customer_products__button-card-add-item-1');
      userEvent.click(addButton);

      const cart = await screen.findByTestId('customer_products__button-cart');
      expect(cart).not.toBeDisabled();

      userEvent.click(cart);

      expect(history.location.pathname).toBe('/customer/checkout');
    });
  });
});