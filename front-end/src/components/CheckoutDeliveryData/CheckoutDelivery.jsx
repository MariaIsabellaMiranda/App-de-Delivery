import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import easyFetch from '../../helpers/easyFetch';
import dataTestIds from '../../helpers/dataTestIds';

function CheckoutDelivery({ totalPrice, cartItems, token }) {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
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
      console.log(sellersJson);
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
      { Authorization: token },
      'POST',
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
          data-testid={ dataTestIds('29') }
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
          data-testid={ dataTestIds('30') }
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
          data-testid={ dataTestIds('31') }
        />
      </label>
      <button
        type="submit"
        onClick={ finalizeOrder }
        data-testid={ dataTestIds('32') }
      >
        Finalizar Pedido
      </button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  token: state.userReducer.token,
});

export default connect(mapStateToProps)(CheckoutDelivery);

CheckoutDelivery.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape).isRequired,
  token: PropTypes.string.isRequired,
};
