const productsMock = require('../responseMocks/productsMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/products':
    return {
      status: 200,
      json: async () => (productsMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
