const VALID_PAYLOAD = {
  id: 1,
  status: 'Preparando',
};

const INVALID_PAYLOAD = {
  id: 8,
  status: 'Entregue',
};

const INVALID_JOI_PAYLOAD = {
  id: 1,
};

const RESPONSE_VALID_ORDER = {
    id: 1,
    userId: 1,
    sellerId: 2,
    totalPrice: '100',
    deliveryAddress: 'Rua Abílio Sampaio',
    deliveryNumber: '450',
    saleDate: '2022-11-04T17:09:29.000Z',
    status: 'Pendente',
  };

const RESPONSE_UNAUTHORIZED = {
  id: 1,
  userId: 15,
  sellerId: 10,
  totalPrice: '100',
  deliveryAddress: 'Rua Abílio Sampaio',
  deliveryNumber: '450',
  saleDate: '2022-11-04T17:09:29.000Z',
  status: 'Pendente',
};

const RESPONSE_VALID_UPDATE = 'Pendente';

const JWT_VALIDATE_USER = {
  id: 2
};

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY3ODQxODUzLCJleHAiOjE2Njg0NDY2NTN9.sewtbKy1tsArmESZWSu1xnUHe_HBXvyCsmptIBbnxmc';

const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const NOT_FOUND_ERROR_ORDER = { message: 'Order Not Found' };

const UNAUTHORIZED_ERROR_UPDATE = { message: 'Unauthorized update' };

const UNAUTHORIZED_ERROR_TOKEN = { message: 'Token must be a valid token' };

const NOT_FOUND_ERROR_TOKEN = { message: 'Token not found' };

module.exports = {
  VALID_PAYLOAD,
  INVALID_PAYLOAD,
  INVALID_JOI_PAYLOAD,
  RESPONSE_VALID_UPDATE,
  RESPONSE_VALID_ORDER,
  JWT_VALIDATE_USER,
  VALID_TOKEN,
  INVALID_TOKEN,
  NOT_FOUND_ERROR_ORDER,
  UNAUTHORIZED_ERROR_UPDATE,
  RESPONSE_UNAUTHORIZED,
  UNAUTHORIZED_ERROR_TOKEN,
  NOT_FOUND_ERROR_TOKEN
};
