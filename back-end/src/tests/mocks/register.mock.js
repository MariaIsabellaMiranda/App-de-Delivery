const INVALID_PAYLOAD = {
  email: 'newuser@email',
  password: 'newuser123',
};

const VALID_PAYLOAD = {
  email: 'newuser@email.com',
  name: 'new user account',
  password: 'newuser123',
};

const SEQUELIZE_CREATED_USER = {
  id: 4,
  email: 'newuser@email.com',
  name: 'new user account',
  password: '9dd9c2bc527cd3a8c9c7d535f99c2ec6',
  role: 'customer',
};

const RESPONSE_VALID = {
  email: "newuser@email.com",
  name: "new user account",
  role: "customer",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY3MzMyODM2LCJleHAiOjE2Njc5Mzc2MzZ9._J2Fc2tu3T2E50AEQKelFMeT6lrhGMwxkPFpoeAu9p4",
};

const CONFLICT_ERROR = { message: 'User with that credentials already exists' };

const BAD_REQUEST_ERROR = { message: 'Invalid email!' };

module.exports = {
  INVALID_PAYLOAD,
  VALID_PAYLOAD,
  SEQUELIZE_CREATED_USER,
  RESPONSE_VALID,
  CONFLICT_ERROR,
  BAD_REQUEST_ERROR,
};
