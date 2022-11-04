const INVALID_PAYLOAD = {
  totalPrice: 50.00,
  deliveryAddress: 'Rua Abílio Sampaio',
  deliveryNumber: "450",
  products: {},
};

const VALID_PAYLOAD = {
  sellerId: 2,
  totalPrice: 50.00,
  deliveryAddress: 'Rua Abílio Sampaio',
  deliveryNumber: "450",
  products: [{
    id: 1,
    quantity: 5
  },
  {
    id: 2,
    quantity: 6
  }]
};

const SEQUELIZE_CREATED_SALE = {
  id: 1,
};

const RESPONSE_VALID = {
  id: 1,
};

const JWT_VALIDATE_USER = {
  id: 1
}

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY3MzMyODM2LCJleHAiOjE2Njc5Mzc2MzZ9._J2Fc2tu3T2E50AEQKelFMeT6lrhGMwxkPFpoeAu9p4';

const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const UNAUTHORIZED_ERROR_TOKEN = { message: 'Token must be a valid token' };

const NOT_FOUND_ERROR_TOKEN = { message: 'Token not found' };

module.exports = {
  INVALID_PAYLOAD,
  VALID_PAYLOAD,
  SEQUELIZE_CREATED_SALE,
  RESPONSE_VALID,
  JWT_VALIDATE_USER,
  VALID_TOKEN,
  INVALID_TOKEN,
  UNAUTHORIZED_ERROR_TOKEN,
  NOT_FOUND_ERROR_TOKEN,
}