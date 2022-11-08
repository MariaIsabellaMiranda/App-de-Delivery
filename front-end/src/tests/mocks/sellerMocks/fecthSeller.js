const sellersMock = require('./sellersMocks');

const fetchSeller = (url) => {
  switch (url) {
  case 'http://localhost:3001/seller':
    return {
      json: async () => (sellersMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchSeller;
