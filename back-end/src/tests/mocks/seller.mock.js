const RESPONSE_VALID = [
  {
      "id": 2,
      "name": "Fulana Pereira",
      "email": "fulana@deliveryapp.com",
      "role": "seller"
  }
];

const RESPONSE_VALID_ORDERS = [
  {
    id: 1,
    totalPrice: '100',
    deliveryAddress: 'Rua Abílio Sampaio',
    deliveryNumber: '450',
    saleDate: '2022-11-04T17:09:29.000Z',
    status: 'Pendente',
  },
  {
    id: 2,
    totalPrice: '50',
    deliveryAddress: 'Rua Visconde',
    deliveryNumber: '110',
    saleDate: '2022-11-04T17:09:29.000Z',
    status: 'Pendente',
  },
];

const JWT_VALIDATE_USER = {
  id: 2
};

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY3ODQxODUzLCJleHAiOjE2Njg0NDY2NTN9.sewtbKy1tsArmESZWSu1xnUHe_HBXvyCsmptIBbnxmc';

const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const NOT_FOUND_ERROR_ORDER = { message: 'Order Not Found' };

const UNAUTHORIZED_ERROR_TOKEN = { message: 'Token must be a valid token' };

const NOT_FOUND_ERROR_TOKEN = { message: 'Token not found' };

module.exports = {
  RESPONSE_VALID,
  JWT_VALIDATE_USER,
  VALID_TOKEN,
  INVALID_TOKEN,
  NOT_FOUND_ERROR_ORDER,
  RESPONSE_VALID_ORDERS,
  UNAUTHORIZED_ERROR_TOKEN,
  NOT_FOUND_ERROR_TOKEN,
};
