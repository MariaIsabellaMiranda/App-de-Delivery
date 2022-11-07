const INVALID_PAYLOAD = {
  email: 'newuser@email',
  password: 'newuser123',
};

const VALID_PAYLOAD = {
  name: 'new user account',
  email: 'newuser@email.com',
  password: 'newuser123',
  role: 'seller'
};

const SEQUELIZE_CREATED_USER = {
  id: 8,
  email: 'newuser@email.com',
  name: 'new user account',
  password: '9dd9c2bc527cd3a8c9c7d535f99c2ec6',
  role: 'customer',
};

const RESPONSE_VALID = {
  id: 8,
  name: "new user account",
  email: "newuser@email.com",
  role: "customer",
};

const RESPONSE_VALID_USERS = [
  {
      "id": 2,
      "name": "Fulana Pereira",
      "email": "fulana@deliveryapp.com",
      "role": "seller"
  },
  {
      "id": 3,
      "name": "Cliente Zé Birita",
      "email": "zebirita@email.com",
      "role": "customer"
  }];

const RESPONSE_ADM = {
  id: 8,
  name: "new user account",
  email: "newuser@email.com",
  role: "administrator",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY3MzMyODM2LCJleHAiOjE2Njc5Mzc2MzZ9._J2Fc2tu3T2E50AEQKelFMeT6lrhGMwxkPFpoeAu9p4",
};

const RESPONSE_NOT_ADM = {
  name: "new user account",
  email: "newuser@email.com",
  role: "customer",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY3MzMyODM2LCJleHAiOjE2Njc5Mzc2MzZ9._J2Fc2tu3T2E50AEQKelFMeT6lrhGMwxkPFpoeAu9p4",
};

const JWT_VALIDATE_USER = {
  id: 3
};

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3ODUyMjY0LCJleHAiOjE2Njg0NTcwNjR9.oIR6OeMv7743hS_8aM7xsjEyj7bqw7y95MGPuVjuq2c';

const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const CONFLICT_ERROR = { message: 'An user with that name or email already exists' };

const BAD_REQUEST_ERROR = { message: 'Invalid email!' };

const UNAUTHORIZED_ERROR = { message: 'This user is not an administrator' };

const UNAUTHORIZED_ERROR_TOKEN = { message: 'Token must be a valid token' };

const NOT_FOUND_ERROR_TOKEN = { message: 'Token not found' };

const NOT_FOUND_ERROR_USER = { message: 'User not found' };

module.exports = {
  INVALID_PAYLOAD,
  VALID_PAYLOAD,
  SEQUELIZE_CREATED_USER,
  RESPONSE_ADM,
  RESPONSE_VALID,
  VALID_TOKEN,
  INVALID_TOKEN,
  CONFLICT_ERROR,
  BAD_REQUEST_ERROR,
  JWT_VALIDATE_USER,
  UNAUTHORIZED_ERROR,
  RESPONSE_NOT_ADM,
  UNAUTHORIZED_ERROR_TOKEN,
  NOT_FOUND_ERROR_TOKEN,
  NOT_FOUND_ERROR_USER,
  RESPONSE_VALID_USERS
};
