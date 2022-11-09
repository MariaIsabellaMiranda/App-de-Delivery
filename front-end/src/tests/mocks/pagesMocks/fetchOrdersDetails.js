const ordersOneMock = require('../responseMocks/checkoutMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/customer/orders/1':
    return {
      json: async () => (ordersOneMock),
    };
  // case '':
  //   return {
  //     json: async () => (),
  //   };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
