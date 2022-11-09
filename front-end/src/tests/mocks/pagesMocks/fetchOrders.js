const ordersOneMock = require('../responseMocks/ordersOneMock');

const ordersMock = require('../responseMocks/ordersMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/customer/orders':
    return {
      json: async () => (ordersMock),
    };
  case 'http://localhost:3001/customer/orders/1':
    return {
      json: async () => (ordersOneMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
