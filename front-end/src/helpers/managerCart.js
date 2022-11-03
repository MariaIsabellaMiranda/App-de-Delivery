import lS from 'manager-local-storage';

export const removeFromCart = (id) => {
  const currentCart = lS.get('cart') ?? [];
  const newCart = currentCart.filter((cartItem) => cartItem.id !== id);
  if (newCart.length === 0) {
    lS.remove('cart');
  } else {
    lS.set('cart', newCart);
  }
};

export const addToCart = (item) => {
  const currentCart = lS.get('cart') ?? [];
  const lSItem = currentCart.find((cartItem) => cartItem.id === item.id);
  if (item.quantity > 0) {
    if (lSItem) {
      lSItem.quantity = item.quantity;
      lS.set('cart', currentCart);
    } else {
      lS.set('cart', [...currentCart, item]);
    }
  } else {
    removeFromCart(item.id);
  }
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
