import { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ productData }) {
  const { name, price, urlImage, id } = productData;

  const [qtyProduct, setQtyProduct] = useState(0);

  const priceFormat = (priceNumber) => {
    const originalPrice = String(Number(priceNumber).toFixed(2));
    return originalPrice.replace('.', ',');
  };

  const handleQty = ({ target }) => {
    const { value } = target;
    setQtyProduct(Number(value));
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
    setQtyProduct(qtyProduct + 1);
  };

  const decreaseToQty = () => {
    if (qtyProduct > 0) setQtyProduct(qtyProduct - 1);
  };

  return (
    <section>
      <span>
        {'R$ '}
        <span data-testid={ `customer_products__element-card-price-${id}` }>
          {priceFormat(price)}
        </span>
      </span>
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <input
        type="number"
        name="quantity"
        id="quantity"
        placeholder="0"
        onChange={ handleQty }
        onKeyUp={ onKeyUp }
        value={ qtyProduct }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        onClick={ addToQty }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        Add
      </button>
      <button
        type="button"
        onClick={ decreaseToQty }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        Remove
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
};
