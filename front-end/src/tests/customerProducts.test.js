import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import { loginCustomer } from './mocks/loginMock';

const userMock = {
  email: 'newuser@email.com',
  name: 'new user account',
  role: 'customer',
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJpZCI6NCwiaWF0IjoxNjY3MzMyODM2LCJleHAiOjE2Njc5Mzc2MzZ9.
  _J2Fc2tu3T2E50AEQKelFMeT6lrhGMwxkPFpoeAu9p4`,
};

describe('Testa a rota customer/products', () => {
  window.localStorage.setItem('user', JSON.stringify(userMock));

  it(`Testa se a página de Products é renderizada no
    endpoint "/customer/products"`, async () => {
    const { history } = renderWithRouter(<App />, '/customer/products');
    expect(history.location.pathname).toBe('/customer/products');
  });
});

describe('Testa os elementos da rota "/customer/products"', () => {
  window.localStorage.setItem('user', JSON.stringify(userMock));
  it('verifica os elementos do cabeçalho', () => {
    renderWithRouter(<App />, '/customer/products');
    const linkProdutos = screen.getByText('Produtos');
    const linkSair = screen.getByText('Sair');
    // const userName = screen.getByRole('p');

    expect(linkProdutos).toBeInTheDocument();
    expect(linkSair).toBeInTheDocument();
  });
});
