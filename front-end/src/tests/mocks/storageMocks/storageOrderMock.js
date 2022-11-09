const storageOrderMockJSON = [{
  id: 1,
  name: 'Skol Lata 250ml',
  price: '2.20',
  urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  quantity: 4,
}, {
  id: 2,
  name: 'Heineken 600ml',
  price: '7.50',
  urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  quantity: 2,
}, {
  id: 3,
  name: 'Antarctica Pilsen 300ml',
  price: '2.49',
  urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  quantity: 3,
}];

const storageOrderMock = JSON.stringify(storageOrderMockJSON);

export default storageOrderMock;
