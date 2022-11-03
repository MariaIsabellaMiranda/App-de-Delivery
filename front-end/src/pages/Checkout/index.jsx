import { useState } from 'react';
import lS from 'manager-local-storage';
import CheckoutDelivery from '../../components/CheckoutDeliveryData/CheckoutDelivery';
import CheckoutTable from '../../components/CheckoutTable';
import Header from '../../components/Header';
import { getTotalPrice } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';

function Checkout() {
  const [cartItems, setCartItems] = useState(lS.get('cart') ?? []);
  const [price, setPrice] = useState(getTotalPrice());

  const updateCartItems = () => {
    setCartItems(lS.get('cart') ?? []);
    setPrice(getTotalPrice());
  };

  return (
    <>
      <Header />
      <span>Checkout</span>
      <CheckoutTable updateCartItems={ updateCartItems } cartItems={ cartItems } />
      <span>
        <span>R$ </span>
        <span data-testid="customer_checkout__element-order-total-price">
          {priceFormat(price)}
        </span>
      </span>
      <CheckoutDelivery totalPrice={ price } cartItems={ cartItems } />
    </>
  );
}

export default Checkout;
