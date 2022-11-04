const priceFormat = (priceNumber) => {
  const originalPrice = String(Number(priceNumber).toFixed(2));
  return originalPrice.replace('.', ',');
};

export default priceFormat;
