import { useState } from 'react';
import PropTypes from 'prop-types';
import priceFormat from '../../helpers/priceFormat';
import {
  addToCart,
  getCurrentQuantity,
  removeFromCart,
} from '../../helpers/managerCart';
import './styles/ProductCard.css';
import dataTestIds from '../../helpers/dataTestIds';

function ProductCard({ productData, updatePrice }) {
  const { name, price, urlImage, id } = productData;

  const [qtyProduct, setQtyProduct] = useState(getCurrentQuantity(id));

  const handleQty = ({ target }) => {
    const { value } = target;
    const qtyValue = Number(value);
    setQtyProduct(qtyValue);
    addToCart({ ...productData, quantity: qtyValue });
    updatePrice();
  };

  const onKeyUp = ({ target }) => {
    const { value } = target;
    const firstNumber = value[0];
    if (firstNumber === '0') {
      const currentValue = value.slice(1, value.length);
      target.value = Number(currentValue);
    }
  };

  const addToQty = () => {
    const qtyValue = qtyProduct + 1;
    addToCart({ ...productData, quantity: qtyValue });
    setQtyProduct(qtyValue);
    updatePrice();
  };

  const decreaseToQty = () => {
    const qtyValue = qtyProduct - 1;
    if (qtyProduct > 0) setQtyProduct(qtyValue);
    if (qtyValue > 0) {
      addToCart({ ...productData, quantity: qtyValue });
    } else {
      removeFromCart(id);
    }
    updatePrice();
  };

  return (
    <section>
      <span>
        {'R$ '}
        <span data-testid={ dataTestIds('16', id) }>
          {priceFormat(price)}
        </span>
      </span>
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ dataTestIds('17', id) }
        className="_image_product_cart"
      />
      <p data-testid={ dataTestIds('15', id) }>{name}</p>
      <button
        type="button"
        onClick={ decreaseToQty }
        data-testid={ dataTestIds('19', id) }
      >
        Remove
      </button>
      <input
        type="number"
        name="quantity"
        id="quantity"
        placeholder="0"
        onChange={ handleQty }
        onKeyUp={ onKeyUp }
        value={ qtyProduct }
        data-testid={ dataTestIds('20', id) }
      />
      <button
        type="button"
        onClick={ addToQty }
        data-testid={ dataTestIds('18', id) }
      >
        Add
      </button>
    </section>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  productData: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  updatePrice: PropTypes.func.isRequired,
};
