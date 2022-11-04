import { useParams } from 'react-router-dom';

function Order() {
  const { orderId } = useParams();
  return (
    <h1>
      Order
      {orderId}
    </h1>
  );
}

export default Order;
