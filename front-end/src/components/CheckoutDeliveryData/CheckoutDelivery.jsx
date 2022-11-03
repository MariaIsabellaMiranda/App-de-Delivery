import { useEffect, useState } from 'react';
import lS from 'manager-local-storage';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import easyFetch from '../../helpers/fetch';

function CheckoutDelivery({ totalPrice, cartItems }) {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const { token } = lS.get('user');
  const [deliveryData, setDeliveryData] = useState({
    seller: 0,
    address: '',
    number: '',
  });

  useEffect(() => {
    const getSellers = async () => {
      const sellersResponse = await fetch('http://localhost:3001/seller');
      const sellersJson = await sellersResponse.json();
      setSellers(sellersJson);
      setDeliveryData({ address: '', number: '', seller: sellersJson[0].id });
    };
    getSellers();
  }, []);

  const { seller, address, number } = deliveryData;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDeliveryData({
      ...deliveryData,
      [name]: value,
    });
  };

  const finalizeOrder = async (e) => {
    e.preventDefault();
    const CREATED = 201;
    const reqCheckoutBody = {
      sellerId: seller,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: number,
      products: cartItems,
    };
    const responseData = await easyFetch(
      'http://localhost:3001/customer/checkout',
      'POST',
      { Authorization: token },
      reqCheckoutBody,
    );
    const { id } = await responseData.json();
    if (responseData.status === CREATED) {
      history.push(`/customer/orders/${id}`);
    }
  };

  return (
    <form>
      <h3>Detalhes e Endereço para Entrega</h3>
      <label htmlFor="seller">
        Pessoa Vendedora Responsável
        <select
          name="seller"
          id="seller"
          onChange={ handleChange }
          value={ seller }
          data-testid="customer_checkout__select-seller"
        >
          {sellers.map((sellerData, i) => (
            <option key={ i } value={ sellerData.id }>
              {sellerData.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          type="text"
          name="address"
          id="address"
          onChange={ handleChange }
          value={ address }
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          type="text"
          name="number"
          id="number"
          onChange={ handleChange }
          value={ number }
          data-testid="customer_checkout__input-address-number"
        />
      </label>
      <button
        type="submit"
        onClick={ finalizeOrder }
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </form>
  );
}

export default CheckoutDelivery;

CheckoutDelivery.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
