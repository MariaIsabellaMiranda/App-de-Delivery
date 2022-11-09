const userRegisterMock = require('../responseMocks/userRegisterMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/common/register':
    return {
      status: 201,
      json: async () => (userRegisterMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
