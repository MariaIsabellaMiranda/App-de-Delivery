const RESPONSE_VALID_ORDER = {
  "id": 1,
  "userId": 3,
  "sellerId": 2,
  "totalPrice": "50.00",
  "deliveryAddress": "Rfvv tal",
  "deliveryNumber": "450",
  "saleDate": "2022-11-03T21:08:59.000Z",
  "status": "Pendente",
  "products": [{
    "id": 1,
    "name": "Skol Lata 250ml",
    "price": "2.20",
    "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
    "SaleProduct": { "quantity": 5 }
  },
  {
    "id": 2,
    "name": "Heineken 600ml",
    "price": "7.50",
    "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
    "SaleProduct": { "quantity": 6 },   
  }]
};

const RESPONSE_VALID_ORDERS = [
  {
    id: 1,
    userId: 1,
    totalPrice: '100',
    saleDate: '2022-11-04T17:09:29.000Z',
    status: 'Pendente',
  },
  {
    id: 2,
    userId: 1,
    totalPrice: '50',
    saleDate: '2022-11-04T17:09:29.000Z',
    status: 'Pendente',
  },
];

const JWT_VALIDATE_USER = {
  id: 1
};

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjY3MzMyODM2LCJleHAiOjE2Njc5Mzc2MzZ9._J2Fc2tu3T2E50AEQKelFMeT6lrhGMwxkPFpoeAu9p4';

const INVALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

const NOT_FOUND_ERROR_ORDER = { message: 'order Not Found' };

const UNAUTHORIZED_ERROR_TOKEN = { message: 'Token must be a valid token' };

const NOT_FOUND_ERROR_TOKEN = { message: 'Token not found' };

module.exports = {
  RESPONSE_VALID_ORDER,
  JWT_VALIDATE_USER,
  NOT_FOUND_ERROR_ORDER,
  VALID_TOKEN,
  INVALID_TOKEN,
  RESPONSE_VALID_ORDERS,
  UNAUTHORIZED_ERROR_TOKEN,
  NOT_FOUND_ERROR_TOKEN,
};