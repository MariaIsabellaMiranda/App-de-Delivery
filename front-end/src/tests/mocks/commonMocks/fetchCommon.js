const loginCustomer = require('./loginMock');
const registerMock = require('./registerMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/common/login':
    return {
      status: 200,
      json: async () => (loginCustomer),
    };
  case 'http://localhost:3001/common/register':
    return {
      status: 201,
      json: async () => (registerMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchMocks;
