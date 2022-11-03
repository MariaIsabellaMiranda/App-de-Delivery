import { useState } from 'react';
import CheckoutDelivery from '../../components/CheckoutDeliveryData/CheckoutDelivery';
import CheckoutTable from '../../components/CheckoutTable';
import Header from '../../components/Header';
import { getTotalPrice } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';

function Checkout() {
  const [price, setPrice] = useState(getTotalPrice());

  const updatePrice = () => setPrice(getTotalPrice());

  return (
    <>
      <Header />
      <span>Checkout</span>
      <CheckoutTable updatePrice={ updatePrice } />
      <span>
        <span>R$ </span>
        <span data-testid="customer_checkout__element-order-total-price">
          {priceFormat(price)}
        </span>
      </span>
      <CheckoutDelivery />
    </>
  );
}

export default Checkout;
