const sellersMock = require('../responseMocks/sellersMocks');
const productsMock = require('../responseMocks/productsMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/products':
    return {
      json: async () => (productsMock),
    };
  case 'http://localhost:3001/seller':
    return {
      json: async () => (sellersMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
