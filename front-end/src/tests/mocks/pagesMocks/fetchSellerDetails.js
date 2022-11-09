const OrdersOneMock = require('../responseMocks/ordersOneMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/seller/orders/1':
    return {
      json: async () => (OrdersOneMock),
    };
  case 'http://localhost:3001/status':
    return {
      json: async () => ({ status: 'Pendente' }),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
