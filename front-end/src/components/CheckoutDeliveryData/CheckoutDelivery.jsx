import {
  // useEffect,
  useState } from 'react';

function CheckoutDelivery() {
  const [sellers,
    // setSellers
  ] = useState([]);

  // useEffect(() => {
  //   const getSellers = async () => {
  //     const sellersResponse = await fetch('http://localhost:3001/sellers');
  //     const sellersJson = await sellersResponse.json();
  //     setSellers(sellersJson);
  //   };
  //   getSellers();
  // }, []);

  const [deliveryData, setDeliveryData] = useState({
    seller: '',
    address: '',
    number: '',
  });

  const { seller, address, number } = deliveryData;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDeliveryData({
      ...deliveryData,
      [name]: value,
    });
  };

  const finalizeOrder = (e) => {
    e.preventDefault();
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
          <option value="" hidden>
            Choose
          </option>
          {sellers.map((sellerData, i) => (
            <option key={ i }>{sellerData.name}</option>
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
