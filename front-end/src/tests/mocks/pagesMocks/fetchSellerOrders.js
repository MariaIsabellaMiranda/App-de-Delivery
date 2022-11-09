const sellerOrdersMock = require('../responseMocks/sellerOrdersMock');
const OrdersOneMock = require('../responseMocks/ordersOneMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/seller/orders':
    return {
      json: async () => (sellerOrdersMock),
    };
  case 'http://localhost:3001/seller/orders/1':
    return {
      json: async () => (OrdersOneMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
