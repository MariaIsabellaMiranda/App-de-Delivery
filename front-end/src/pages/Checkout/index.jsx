import CheckoutTable from '../../components/CheckoutTable';
import Header from '../../components/Header';
import { getTotalPrice } from '../../helpers/managerCart';
import priceFormat from '../../helpers/priceFormat';

function Checkout() {
  return (
    <>
      <Header />
      <span>Checkout</span>
      <CheckoutTable />
      <span>
        <span>R$ </span>
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {priceFormat(getTotalPrice())}
        </span>
      </span>
    </>
  );
}

export default Checkout;
