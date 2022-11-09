import { useState } from 'react';
import lS from 'manager-local-storage';
import CheckoutDelivery from '../../components/CheckoutDelivery';
import CheckoutTable from '../../components/CheckoutTable';
import Header from '../../components/Header';
import { getTotalPrice } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';
import dataTestIds from '../../helpers/dataTestIds';
import './styles/Checkout.css';

function Checkout() {
  const [cartItems, setCartItems] = useState(lS.get('cart') ?? []);
  const [price, setPrice] = useState(getTotalPrice());

  const updateCartItems = () => {
    setCartItems(lS.get('cart') ?? []);
    setPrice(getTotalPrice());
  };

  return (
    <div className="_page_checkout">
      <Header />
      <h1>Checkout</h1>
      <main>
        <CheckoutTable updateCartItems={ updateCartItems } cartItems={ cartItems } />
        <span className="_price">
          <span className="_subtotal">Subtotal: </span>
          <span>R$ </span>
          <span data-testid={ dataTestIds('28') }>
            {priceFormat(price)}
          </span>
        </span>
        <CheckoutDelivery totalPrice={ price } cartItems={ cartItems } />
      </main>
    </div>
  );
}

export default Checkout;
