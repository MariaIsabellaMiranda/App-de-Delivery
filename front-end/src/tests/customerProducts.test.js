import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import { loginCustomer } from './mocks/loginMock';
import storageLogin from './mocks/storageMocks/storageLogin';

describe('Testa a rota /customer/products', () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify(storageLogin));
  });

  describe('Testa se a página de Products é renderizada na rota customer/products', () => {
    it(`Testa se a página de Products é renderizada no
      endpoint "/customer/products"`, async () => {
      const { history } = renderWithRouter(<App />, '/customer/products');
      expect(history.location.pathname).toBe('/customer/products');
    });
  });
  
  describe('Testa os elementos da rota "/customer/products"', () => {
    it('verifica os elementos do cabeçalho', () => {
      renderWithRouter(<App />, '/customer/products');
      const linkProdutos = screen.getByText('Produtos');
      const linkSair = screen.getByText('Sair');
      // const userName = screen.getByRole('p');
  
      expect(linkProdutos).toBeInTheDocument();
      expect(linkSair).toBeInTheDocument();
    });
  });
});
