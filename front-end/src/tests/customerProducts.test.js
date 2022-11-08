import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import lS from 'manager-local-storage';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import storageLogin from './mocks/storageMocks/storageLogin';
import fetchProducts from './mocks/productsMock/fetchProducts';
// import storageOrderMock from './mocks/storageMocks/storageOrder';

const initailState = {
  
}
 

const productRoute = '/customer/products';

describe('Testa a rota /customer/products', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify(storageLogin));
    jest.spyOn(global, 'fetch').mockImplementation(fetchProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testa página customer/products', () => {
    it(`Testa se a página de Products é renderizada no
      endpoint "/customer/products"`, async () => {
      const { history } = renderWithRouterAndRedux(<App />, productRoute);
      expect(history.location.pathname).toBe('/customer/products');
    });
  });

  describe('verifica os elementos de produtos', () => {
    it('verifica se renderiza corretamente as imagens', async () => {
      renderWithRouterAndRedux(<App />, productRoute);
      const produtos = await screen.findAllByRole('img');
      const numeroProdutos = 11;
      await expect(produtos.length).toBe(numeroProdutos);
    });

    it('verifica se renderiza o botão "Add"', async () => {
      renderWithRouterAndRedux(<App />, productRoute);
      const addButtons = await screen.findAllByRole('button', { name: 'Add' });
      const productsQty = 11;
      await expect(addButtons.length).toBe(productsQty);
    });

    it('verifica se renderiza o botão "Remove"', async () => {
      renderWithRouterAndRedux(<App />, productRoute);
      const removeButtons = await screen.findAllByRole('button', { name: 'Remove' });
      const productsQty = 11;
      await expect(removeButtons.length).toBe(productsQty);
    });

    it('verifica se renderiza o campo para quantidade', async () => {
      renderWithRouterAndRedux(<App />, productRoute);
      const inputsQty = await screen.findAllByPlaceholderText('0');
      const productsQty = 11;
      await expect(inputsQty.length).toBe(productsQty);
    });

    it('verifica funcionamento dos botões', async () => {
      renderWithRouterAndRedux(<App />, productRoute);
      const addButton = await screen
        .findByTestId('customer_products__button-card-add-item-1');
      const removeButton = await screen
        .findByTestId('customer_products__button-card-rm-item-1');
      const inputQty = await screen
        .findByTestId('customer_products__input-card-quantity-1');
      await expect(inputQty).toHaveValue(0);

      userEvent.click(addButton);
      await expect(inputQty).toHaveValue(1);

      userEvent.click(removeButton);
      await expect(inputQty).toHaveValue(0);
    });
  });

  describe('verifica os elementos do cabeçalho', () => {
    it(' o link "Produtos" redireciona para a página de produtos', async () => {
      const { history } = renderWithRouterAndRedux(<App />, productRoute);
      const linkProdutos = await screen.findByRole('link', { name: 'Produtos' });
      userEvent.click(linkProdutos);
      expect(history.location.pathname).toBe(productRoute);
    });

    it('se o link "Meus pedidos" redireciona para página de pedidos', async () => {
      await act(async () => {
        const { history } = renderWithRouterAndRedux(<App />, productRoute);
        const linkMeusPedidos = screen.getByRole('link', { name: 'Meus pedidos' });
        userEvent.click(linkMeusPedidos);
        expect(history.location.pathname).toBe('/customer/orders');
      });
    });

    it('verifica se o nome do cliente é renderizado na tela', async () => {
      await act(async () => {
        renderWithRouterAndRedux(<App />, productRoute);
      });
      const user = lS.get('user');
      const nomeCliente = screen.getByRole('heading', { level: 2 });
      expect(nomeCliente.innerText).toBe(user.name);
    });

    // it('verifica se o link "Sair" redireciona para página de login', () => {
    //   const { history } = renderWithRouterAndRedux(<App />, '/customer/products');
    //   const linkSair = screen.getByRole('link', { name: 'Sair' });
    //   userEvent.click(linkSair);
    //   expect(history.location.pathname).toBe('/login');
    // });

    it('verifica se o link "Sair" limpa do dados do cliente', async () => {
      await act(async () => {
        renderWithRouterAndRedux(<App />, productRoute);
      });
      const linkSair = screen.getByRole('link', { name: 'Meus pedidos' });
      userEvent.click(linkSair);
      const user = lS.get('user');
      waitFor(() => {
        expect(user).toBe(null);
      });
    });
  });

  describe('testa funcionamento do carrinho', () => {
    it('verifica se o carrinho é renderizado e está desabilitado', async () => {
      await act(async () => {
        renderWithRouterAndRedux(<App />, productRoute);
      });
      const cart = screen.getByText(/Ver/i);
      expect(cart).toBeInTheDocument();
      expect(cart).toBeDisabled();
    });

    it('verifica o funcionamento do carrinho', async () => {
      renderWithRouterAndRedux(<App />, productRoute);
      const totalPrice = await screen
        .findByTestId('customer_products__checkout-bottom-value');
      await expect(totalPrice.innerHTML).toBe('0,00');
      const addButton = await screen
        .findByTestId('customer_products__button-card-add-item-1');
      userEvent.click(addButton);
      await expect(totalPrice.innerHTML).toBe('2,20');
      const removeButton = await screen
        .findByTestId('customer_products__button-card-rm-item-1');
      userEvent.click(removeButton);
      await expect(totalPrice.innerHTML).toBe('0,00');
    });

    // it(`verifica se ao clicar no carrinho é
    //   encaminhado para a página de checkout`, async () => {
    //   let teste = '';
    //   await act(async () => {
    //     const { history } = renderWithRouterAndRedux(<App />, productRoute);
    //     teste = history;
    //   });
    //   const addButton = screen.getByTestId('customer_products__button-card-add-item-1');
    //   userEvent.click(addButton);
    //   const cart = screen.getByRole('button', { name: /Ver/i });
    //   await expect(cart).not.toBeDisabled();
    //   userEvent.click(cart);
    //   await expect(teste.location.pathname).toBe('/customer/checkout');
    // });
  });
});
