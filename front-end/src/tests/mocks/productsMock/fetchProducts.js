const productsMock = require('./productsMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/products':
    return {
      json: async () => (productsMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
