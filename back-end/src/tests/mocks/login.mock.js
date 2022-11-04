const INVALID_PAYLOAD = {
  email: 'newuser@email',
  password: 'newuser123',
};

const VALID_PAYLOAD = {
  email: 'newuser@email.com',
  password: 'newuser123',
};

const SEQUELIZE_USER = {
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

const BAD_REQUEST_ERROR_JOI = { message: 'Invalid email!' };

const BAD_REQUEST_ERROR_PASS = { message: 'Invalid credentials' };

const NOT_FOUND_ERROR = { message: 'Not found' };

module.exports = {
  INVALID_PAYLOAD,
  VALID_PAYLOAD,
  SEQUELIZE_USER,
  RESPONSE_VALID,
  BAD_REQUEST_ERROR_JOI,
  BAD_REQUEST_ERROR_PASS,
  NOT_FOUND_ERROR,
};
