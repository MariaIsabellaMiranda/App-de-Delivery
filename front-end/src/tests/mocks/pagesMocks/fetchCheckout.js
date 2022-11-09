const sellersMock = require('../responseMocks/sellersMocks');
const ordersOneMock = require('../responseMocks/ordersOneMock');
const checkoutMock = require('../responseMocks/checkoutMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/seller':
    return {
      json: async () => (sellersMock),
    };
  case 'http://localhost:3001/customer/checkout':
    return {
      status: 201,
      json: async () => (checkoutMock),
    };
  case 'http://localhost:3001/customer/orders/1':
    return {
      json: async () => (ordersOneMock),
    };
  default:
  }
};

export default fetchMocks;
