const usersAdmMock = require('../responseMocks/usersAdmMock');

const fetchMocks = (url) => {
  switch (url) {
  case 'http://localhost:3001/adm':
    return {
      json: async () => (usersAdmMock),
    };
  case 'http://localhost:3001/adm/1':
    return {
      status: 201,
      json: async () => ({}),
    };
  case 'http://localhost:3001/adm/register':
    return {
      json: async () => (usersAdmMock[0]),
    };
  default:
  }
};

export default fetchMocks;
