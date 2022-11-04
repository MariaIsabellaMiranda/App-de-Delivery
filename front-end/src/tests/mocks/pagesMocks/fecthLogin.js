const userLoginMock = require('../responseMocks/userLoginMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/common/login':
    return {
      status: 200,
      json: async () => (userLoginMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
