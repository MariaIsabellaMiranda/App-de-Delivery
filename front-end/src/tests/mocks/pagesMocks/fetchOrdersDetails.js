const ordersOneMock = require('../responseMocks/ordersOneMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/customer/orders/1':
    return {
      json: async () => (ordersOneMock),
    };
  default:
  }
};

export default fetchMocks;
