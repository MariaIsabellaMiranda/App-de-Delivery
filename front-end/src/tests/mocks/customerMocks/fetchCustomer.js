const ordersIdMock = require('./ordersIdMock');
const ordersMock = require('./ordersMock');

const fetchCustomer = (url) => {
  switch (url) {
  case 'http://localhost:3001/customer/checkout':
    return {
      json: async () => ({ id: 1 }),
    };
  case 'http://localhost:3001/customer/orders/1':
    return {
      json: async () => (ordersIdMock),
    };
  case 'http://localhost:3001/customer/orders':
    return {
      json: async () => (ordersMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchCustomer;
