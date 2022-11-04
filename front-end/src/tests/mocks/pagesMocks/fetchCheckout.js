const sellersMock = require('../responseMocks/sellersMocks');

const checkoutMock = require('../responseMocks/checkoutMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/seller':
    return {
      json: async () => (sellersMock),
    };
  case 'http://localhost:3001/customer/checkout':
    return {
      json: async () => (checkoutMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
