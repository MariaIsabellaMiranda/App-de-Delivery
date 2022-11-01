import lS from 'manager-local-storage';

export const addToCart = (item) => {
  const currentCart = lS.get('cart') ?? [];
  const lSItem = currentCart.find((cartItem) => cartItem.id === item.id);
  if (lSItem) {
    lSItem.quantity = item.quantity;
    lS.set('cart', currentCart);
  } else {
    lS.set('cart', [...currentCart, item]);
  }
};

export const removeFromCart = (id) => {
  const currentCart = lS.get('cart') ?? [];
  const newCart = currentCart.filter((cartItem) => cartItem.id !== id);
  lS.set('cart', newCart);
};

export const getCurrentQuantity = (id) => {
  const currentCart = lS.get('cart') ?? [];
  const lSItem = currentCart.find((cartItem) => cartItem.id === id);
  if (lSItem) return lSItem.quantity;
  return 0;
};

export const getTotalPrice = () => {
  const cart = lS.get('cart') ?? [];
  return cart.reduce(
    (acc, current) => acc + Number(current.price) * current.quantity,
    0,
  );
};
