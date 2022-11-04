const ordersOneMock = {
  id: 1,
  userId: 4,
  sellerId: 1,
  totalPrice: '50',
  deliveryAddress: 'Rua Visconde de Abaeté',
  deliveryNumber: '450',
  saleDate: '2022-11-04T17:09:29.000Z',
  status: 'Pendente',
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SaleProduct: {
        quantity: 5,
      },
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SaleProduct: {
        quantity: 6,
      },
    },
  ],
};

module.exports = ordersOneMock;
