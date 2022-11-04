const ordersMock = require('../responseMocks/ordersMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/orders':
    return {
      json: async () => (ordersMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
